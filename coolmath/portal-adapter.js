/* Direct-portal GamePush-compatible facade. No production ad is simulated. */
(() => {
  'use strict';
  const cfg = window.NEON_PORTAL;
  if (!cfg || cfg.sdk === 'gamepush') return;
  const key = 'neondrift.progress.v1';
  const listeners = new Map();
  const emit = (name, value) => (listeners.get(name) || []).forEach(fn => fn(value));
  const on = (name, fn) => listeners.set(name, [...(listeners.get(name) || []), fn]);
  const load = src => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('SDK unavailable: ' + src));
    document.head.append(s);
  });
  const local = {
    getItem: k => { try { return localStorage.getItem(k); } catch { return null; } },
    setItem: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
  };
  let store = local, cloud = null, save = null, reward = null;
  let start = () => {}, stop = () => {}, ready = () => {};
  const ad = (fn, callbacks = {}) => Promise.resolve().then(fn).then(ok => {
    // Completion must be explicitly confirmed by the platform, not merely closed.
    if (ok === true) callbacks.onRewarded?.();
    callbacks.onClose?.(ok === true);
    return ok === true;
  }, () => { callbacks.onClose?.(false); return false; });
  const sdk = {
    language: navigator.language.split('-')[0],
    on,
    sounds: { on },
    storage: { get: k => store.getItem(k), set: (k, v) => store.setItem(k, v) },
    player: {
      ready: Promise.resolve(),
      get: () => cloud,
      set: (k, value) => { if (k === 'progress') cloud = value; },
      sync: async () => { if (save && cloud != null) await save(cloud); }
    },
    ads: { isRewardedAvailable: false },
    gameStart: () => ready(),
    gameplayStart: () => start(),
    gameplayStop: () => stop()
  };
  function enableReward(fn) {
    reward = fn;
    sdk.ads.isRewardedAvailable = true;
    sdk.ads.showRewardedVideo = callbacks => ad(reward, callbacks);
    window.NeonPlatform?.refreshFeatureVisibility?.();
  }
  document.addEventListener('visibilitychange', () => emit(document.hidden ? 'pause' : 'resume'));
  window.addEventListener('blur', () => emit('pause'));
  window.addEventListener('focus', () => emit('resume'));
  async function init() {
    switch (cfg.sdk) {
      case 'yandex': {
        await load('https://yandex.ru/games/sdk/v2');
        const ysdk = await YaGames.init();
        const player = await ysdk.getPlayer().catch(() => null);
        if (player) {
          const data = await player.getData(['progress']);
          cloud = typeof data?.progress === 'string' ? data.progress : null;
          save = value => player.setData({ progress: value }, true);
        }
        sdk.language = ysdk.environment?.i18n?.lang || sdk.language;
        ready = () => ysdk.features?.LoadingAPI?.ready?.();
        start = () => ysdk.features?.GameplayAPI?.start?.();
        stop = () => ysdk.features?.GameplayAPI?.stop?.();
        if (ysdk.adv?.showRewardedVideo) enableReward(() => new Promise(resolve => {
          let earned = false;
          ysdk.adv.showRewardedVideo({ callbacks: {
            onOpen: () => emit('pause'),
            onRewarded: () => { earned = true; },
            onClose: () => { emit('resume'); resolve(earned); },
            onError: () => { emit('resume'); resolve(false); }
          } });
        }));
        break;
      }
      case 'vk': {
        await load('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js');
        const bridge = window.vkBridge;
        await bridge.send('VKWebAppInit');
        const { keys = [] } = await bridge.send('VKWebAppStorageGet', { keys: [key] });
        cloud = keys.find(x => x.key === key)?.value || null;
        save = value => bridge.send('VKWebAppStorageSet', { key, value });
        const panel = () => bridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' });
        const supported = await bridge.supportsAsync('VKWebAppShowNativeAds').catch(() => false);
        if (supported) enableReward(async () => (await panel()).result === true);
        bridge.subscribe(({ detail }) => {
          if (detail?.type === 'VKWebAppViewHide') emit('pause');
          if (detail?.type === 'VKWebAppViewRestore') emit('resume');
        });
        break;
      }
      case 'crazygames': {
        const cg = window.CrazyGames?.SDK;
        if (!cg) throw new Error('CrazyGames SDK missing');
        await cg.init();
        if (!cg.data) throw new Error('CONFIG_REQUIRED: enable CrazyGames Data Module in submission');
        store = cg.data;
        cloud = store.getItem(key);
        save = value => store.setItem(key, value);
        ready = () => cg.game.loadingStop?.();
        start = () => cg.game.gameplayStart?.();
        stop = () => cg.game.gameplayStop?.();
        if (cg.ad?.requestAd) enableReward(() => new Promise(resolve => {
          let earned = false;
          cg.ad.requestAd('rewarded', {
            adStarted: () => emit('pause'),
            adFinished: () => { earned = true; emit('resume'); resolve(earned); },
            adError: () => { emit('resume'); resolve(false); }
          });
        }));
        break;
      }
      case 'gamedistribution': {
        if (!cfg.gameId) throw new Error('CONFIG_REQUIRED: GameDistribution gameId');
        let confirm = null;
        window.GD_OPTIONS = {
          gameId: cfg.gameId,
          onEvent: e => {
            if (e.name === 'SDK_GAME_PAUSE') emit('pause');
            if (e.name === 'SDK_GAME_START') emit('resume');
            if (e.name === 'SDK_REWARDED_WATCH_COMPLETE' && confirm) confirm(true);
            if (e.name === 'SDK_ERROR' && confirm) confirm(false);
          }
        };
        await load('https://html5.api.gamedistribution.com/main.min.js');
        if (window.gdsdk?.showAd) enableReward(() => new Promise(resolve => {
          let completed = false;
          const settle = ok => { if (!confirm) return; confirm = null; completed = ok; resolve(completed); };
          confirm = settle;
          Promise.resolve(window.gdsdk.showAd('rewarded')).catch(() => settle(false));
          // The SDK's showAd promise may resolve on close, not on earned reward.
          setTimeout(() => settle(false), 90000);
        }));
        break;
      }
      case 'gamepix': {
        // GamePix requires its script as the first script in <head> (injected by build generator).
        if (!window.GamePix) throw new Error('GamePix SDK missing');
        store = GamePix.localStorage || local;
        cloud = await store.getItem(key);
        save = value => store.setItem(key, value);
        sdk.language = GamePix.lang?.() || sdk.language;
        ready = () => GamePix.loaded?.();
        if (GamePix.rewardAd) enableReward(async () => (await GamePix.rewardAd()).success === true);
        break;
      }
      case 'y8': {
        // The public landing page names an API but does not provide a script URL,
        // concrete callbacks, or credentials. Do not fabricate an integration.
        break;
      }
      case 'pikabu': {
        await load('https://games.pikabu.ru/sdk/sdk.js');
        if (!window.PkbSDK?.init) throw new Error('Pikabu SDK missing');
        const pk = await PkbSDK.init();
        ready = () => pk.gameStarted();
        if (pk.ads?.rewarded?.isSupported) enableReward(async () => {
          if (!await pk.ads.rewarded.canShow()) return false;
          emit('pause');
          try { return (await pk.ads.rewarded.show()).reward === true; }
          finally { emit('resume'); }
        });
        // Pikabu exposes player ID but no cloud storage. Backend required for sync.
        break;
      }
      default: break; // local-only, without SDK, payments, ads, or claimed cloud saves
    }
  }
  sdk.player.ready = init().catch(err => {
    console.warn('[Portal]', cfg.portal, err);
    sdk.ads.isRewardedAvailable = false;
    delete sdk.ads.showRewardedVideo;
    // A failed cloud read must never overwrite unknown remote data.
    save = null;
  }).then(() => {
    // sdk.player.get is synchronous because the facade waits for SDK init.
    window.__NEON_GP_INSTANCE__ = sdk;
    window.onGPInit?.(sdk);
    window.NeonPlatform?.refreshFeatureVisibility?.();
  });
})();
