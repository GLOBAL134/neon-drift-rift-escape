/* Menu/HUD bridge: presentation only; gameplay and SDK remain in game.js. */
(function () {
  'use strict';

  const SETTINGS_KEY = 'neondrift.menu.v1';
  const defaults = { sound: true, music: true, graphics: 'high' };
  let settings = loadSettings();
  let sdk = null;
  let rewardBusy = false;

  const $ = (id) => document.getElementById(id);
  const click = (id) => $(id)?.click();
  const tr = (key, fallback = key) => window.NeonI18n?.t?.(key) || fallback;
  const lang = () => window.NeonI18n?.language || document.documentElement.lang || 'en';

  function loadSettings() {
    try {
      const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      return { ...defaults, ...(raw && typeof raw === 'object' ? raw : {}) };
    } catch (_) {
      return { ...defaults };
    }
  }

  function saveSettings(reason = 'change') {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) {}
    applySettings(reason);
  }

  function applySettings(reason = 'load') {
    const graphics = ['high', 'auto', 'low'].includes(settings.graphics) ? settings.graphics : 'high';
    settings.graphics = graphics;
    document.documentElement.dataset.graphics = graphics;
    document.body.dataset.graphics = graphics;
    document.body.classList.toggle('menu-sound-off', !settings.sound);
    document.body.classList.toggle('menu-music-off', !settings.music);

    const detail = { ...settings, reason };
    const runtimeSettings = { sound: settings.sound, music: settings.music, graphics };
    const runtime = window.__NEON__?.actions?.settings;
    if (typeof runtime === 'function') runtime(runtimeSettings);
    else {
      window.NeonRuntimeHooks?.setAudio?.({ sound: settings.sound, music: settings.music });
      window.NeonRuntimeHooks?.setGraphics?.(graphics);
    }
    window.__NEON__?.actions?.save?.();
    window.dispatchEvent(new CustomEvent('neondrift:settings', { detail }));
    syncSettingsControls();
  }

  function syncSettingsControls() {
    document.querySelectorAll('.setting-toggle[data-setting]').forEach((button) => {
      const key = button.dataset.setting;
      const on = !!settings[key];
      button.classList.toggle('on', on);
      button.setAttribute('aria-checked', String(on));
      button.textContent = on ? 'ON' : 'OFF';
    });
    const select = $('graphics-setting');
    if (select) select.value = settings.graphics;
  }

  function closeMenuPanels() {
    ['missions-screen', 'settings-screen'].forEach((id) => { if ($(id)) $(id).hidden = true; });
  }

  function openMenuPanel(id) {
    closeMenuPanels();
    const panel = $(id);
    if (!panel) return;
    panel.hidden = false;
    if (id === 'missions-screen') renderMissions();
    if (id === 'settings-screen') syncSettingsControls();
  }

  function openGarage(focusUpgrades = false) {
    closeMenuPanels();
    if (typeof window.__NEON__?.actions?.garage === 'function') window.__NEON__.actions.garage();
    else click('garage-open');
    if (focusUpgrades) requestAnimationFrame(() => $('upgrades')?.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  }

  function openStore() {
    closeMenuPanels();
    click('real-shop-open');
  }

  function returnHome() {
    closeMenuPanels();
    if (typeof window.__NEON__?.actions?.home === 'function') {
      window.__NEON__.actions.home();
      return;
    }
    const view = window.__NEON__?.view;
    if (view === 'garage') { click('garage-close'); return; }
    if (view === 'result') {
      click('result-home');
      setTimeout(() => click('garage-close'), 0);
      return;
    }
    if (view === 'real-shop') click('real-shop-close');
  }

  function dailyMissions() {
    const list = Array.isArray(window.NeonExpansion?.missions) ? window.NeonExpansion.missions : [];
    if (!list.length) return [];
    const date = new Date().toISOString().slice(0, 10);
    return [
      { ...list[(date.length * 7 + Number(date.replace(/-/g, ''))) % list.length], daily: true },
      { ...list[(Number(date.slice(-2)) + 3) % list.length], daily: true },
    ];
  }

  function riftSave() {
    try {
      const value = JSON.parse(localStorage.getItem('neondrift.rift.v1') || '{}');
      return value && typeof value === 'object' ? value : {};
    } catch (_) { return {}; }
  }

  function missionRow(mission, store, date) {
    const key = mission.daily ? `${date}:${mission.id}` : mission.id;
    const done = mission.daily ? !!store.daily?.[key] : !!store.completed?.[key];
    const row = document.createElement('div');
    row.className = `mission-row${done ? ' done' : ''}`;
    const label = window.NeonI18n?.missionText?.(mission, lang()) || mission.label;
    const state = done ? `✓ ${tr('complete', 'COMPLETE')}` : `${mission.target} ${tr('target', 'TARGET')}`;
    row.innerHTML = `<span>${escapeHTML(label)}</span><b>${escapeHTML(state)}</b><small>+${mission.reward} CR</small>`;
    return row;
  }

  function renderMissions() {
    const store = riftSave();
    const date = new Date().toISOString().slice(0, 10);
    const daily = $('missions-daily');
    const list = $('missions-list');
    if (!daily || !list) return;
    daily.replaceChildren();
    daily.append(Object.assign(document.createElement('h3'), { textContent: `${tr('daily', 'DAILY')} · ${date}` }));
    dailyMissions().forEach((mission) => daily.append(missionRow(mission, store, date)));
    list.replaceChildren();
    const contracts = Array.isArray(window.NeonExpansion?.missions) ? window.NeonExpansion.missions : [];
    contracts.forEach((mission) => list.append(missionRow(mission, store, date)));
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function setStatus(id, text) {
    const node = $(id);
    if (node) node.textContent = text;
  }

  function showRewardedAd(callbacks) {
    return sdk?.ads?.showRewardedVideo?.(callbacks);
  }

  async function doubleReward() {
    if (rewardBusy) return;
    rewardBusy = true;
    const button = $('result-double-reward');
    if (button) button.disabled = true;
    setStatus('double-reward-status', tr('adConnecting', 'Connecting to the rewarded-ad hook…'));

    try {
      const action = window.__NEON__?.actions?.reward;
      if (typeof action === 'function') {
        const granted = await action('double');
        setStatus('double-reward-status', granted ? tr('rewardAdded', 'Reward added.') : tr('adUnavailable', 'AD UNAVAILABLE'));
        return;
      }
      const hook = window.NeonRuntimeHooks?.doubleReward;
      if (typeof hook === 'function') {
        await hook({ source: 'post-run', sdk, showRewardedAd });
        setStatus('double-reward-status', tr('rewardSent', 'Reward request sent.'));
        return;
      }
      let accepted = false;
      const request = {
        sdk,
        showRewardedAd,
        accept() { accepted = true; },
      };
      window.dispatchEvent(new CustomEvent('neondrift:double-reward-request', { detail: request }));
      setStatus('double-reward-status', accepted
        ? tr('rewardSent', 'Reward request sent.')
        : tr('rewardHookMissing', 'Runtime reward hook is required; no ad was started.'));
    } catch (error) {
      setStatus('double-reward-status', tr('rewardUnavailable', 'Reward unavailable. Try again later.'));
      window.dispatchEvent(new CustomEvent('neondrift:double-reward-error', { detail: error }));
    } finally {
      rewardBusy = false;
      if (button) button.disabled = false;
    }
  }

  function syncMobilePowerButtons() {
    document.querySelectorAll('#start i,#daily i,#garage-open i,#resume i,#retry i,#flight-owned i,#shield-owned i').forEach(e=>e.remove());
    for(const b of document.querySelectorAll('[data-upgrade=booster] small'))b.textContent='Faster Nitro recharge · Flight / Shield: 15s';
    for(const b of document.querySelectorAll('[data-upgrade=drone] small'))b.textContent='Longer targeting reach · attack every 15s';
    for(const b of document.querySelectorAll('[data-upgrade=dronePower] small'))b.textContent='More destruction score · Drone Power: 15s';
    const store=$('real-shop-open');if(store&&store.textContent.includes('$'))store.textContent=store.textContent.replace(/\s*\$/,'');
    for (const [mobile, source] of [['mobile-flight', 'flight-owned'], ['mobile-shield', 'shield-owned']]) {
      const target = $(mobile);
      const original = $(source);
      if (!target || !original) continue;
      target.disabled = original.disabled;
      target.setAttribute('aria-disabled', String(original.disabled));
      const count = original.querySelector('small')?.textContent || '';
      target.textContent = `${mobile === 'mobile-flight' ? tr('flight', 'FLIGHT') : tr('shield', 'SHIELD')}${count ? ` · ${count}` : ''}`;
    }
  }

  function bind() {
    const actions = {
      'nav-upgrades': () => openGarage(true),
      'nav-missions': () => openMenuPanel('missions-screen'),
      'nav-settings': () => openMenuPanel('settings-screen'),
      'missions-close': closeMenuPanels,
      'settings-close': closeMenuPanels,
      'result-garage': () => openGarage(false),
      'result-main-menu': returnHome,
      'result-double-reward': doubleReward,
    };
    for (const [id, handler] of Object.entries(actions)) $(id)?.addEventListener('click', handler);

    document.querySelectorAll('.setting-toggle[data-setting]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.setting;
        settings[key] = !settings[key];
        saveSettings(key);
        setStatus('settings-status', tr('savedDevice', 'Saved on this device.'));
      });
    });
    $('graphics-setting')?.addEventListener('change', (event) => {
      settings.graphics = event.target.value;
      saveSettings('graphics');
      setStatus('settings-status', tr('savedDevice', 'Saved on this device.'));
    });

    for (const [mobile, source] of [['mobile-flight', 'flight-owned'], ['mobile-shield', 'shield-owned']]) {
      $(mobile)?.addEventListener('click', () => click(source));
    }
    syncMobilePowerButtons();
    setInterval(syncMobilePowerButtons, 250);
    window.addEventListener('neondrift:gp-ready', (event) => { sdk = event.detail || null; });
    window.addEventListener('neondrift:i18n-applied', () => { renderMissions(); syncMobilePowerButtons(); syncSettingsControls(); });
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') closeMenuPanels();
    });
  }

  window.NeonMenu = {
    get settings() { return { ...settings }; },
    openGarage,
    openMissions: () => openMenuPanel('missions-screen'),
    openSettings: () => openMenuPanel('settings-screen'),
    renderMissions,
    doubleReward,
  };

  document.addEventListener('DOMContentLoaded', () => {
    applySettings();
    bind();
  });
})();
