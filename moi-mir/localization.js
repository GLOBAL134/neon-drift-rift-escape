/**
 * Runtime UI localization bridge.
 * Keeps the game UI synchronized with GamePush `gp.language` without reloading the page.
 */
(function () {
  'use strict';

  const SUPPORTED = new Set(['en', 'ru', 'uk']);
  let current = 'en';

  const strings = {
    en: {
      policeProtocol: 'POLICE PURSUIT · RIFT PROTOCOL',
      intro: 'You stole the experimental Rift Engine.<br>Outrun the police. Charge it. Reach the next rift.',
      start: 'START RUN', daily: 'DAILY RUN', garage: 'GARAGE', store: 'STORE', upgrades: 'UPGRADES', missions: 'MISSIONS', settings: 'SETTINGS',
      keyHint: '<kbd>A</kbd><kbd>D</kbd> steer <span>·</span><kbd>SPACE</kbd> jump <span>·</span><kbd>R</kbd> overdrive <span>·</span> Discover your Rift abilities on the road',
      touchHint: 'Steer with the arrows · The road teaches your other controls',
      meta1: '01 / BREAK THE CORDON', meta2: 'REACH THE NEXT RIFT · SURVIVE THE CHASE', yourCar: 'YOUR RIFT CAR', riftEngine: 'THE ENGINE RUNS ON RIFT SHARDS.',
      score: 'SCORE', chain: 'CHAIN 5 ACTIONS', pursuit: 'POLICE PURSUIT', onTail: 'ON YOUR TAIL', runTime: 'RUN TIME', distance: 'DISTANCE', hull: 'HULL INTEGRITY', shieldOffline: 'SHIELD OFFLINE', nitro: 'NITRO', jump: 'JUMP', ready: 'READY',
      flight: 'FLIGHT', shield: 'SHIELD', useFlight: 'USE FLIGHT', useShield: 'USE SHIELD', phase: 'PHASE SHIFT', pulse: 'PULSE BREAK',
      pauseEye: 'SIGNAL HELD', pauseTitle: 'TAKE A BREATH.', pauseCopy: 'Your escape is paused.', resume: 'RESUME', restartTutorial: 'RESTART WITH TUTORIAL', endRun: 'END RUN & RETURN', bankRun: 'End the run to bank your score and credits.',
      runAgain: 'RUN AGAIN', mainMenu: 'MAIN MENU', doubleReward: 'DOUBLE REWARD',
      garageEye: 'BUILD YOUR GETAWAY', garageTitle: 'THE GARAGE', selected: 'SELECTED CHASSIS', chooseRide: 'CHOOSE YOUR RIDE', eachChassis: 'Each chassis drives differently', lightSignature: 'LIGHT SIGNATURE', performance: 'PERFORMANCE', performanceSmall: '5 levels · permanent for all your cars', boosterShop: 'BOOSTER SHOP', boosterSmall: 'Single-use items', achievements: 'ACHIEVEMENTS', garageNote: 'Daily challenge uses the stock Vector for everyone. Progress syncs to your player profile when the platform supports it.',
      optionalReward: 'OPTIONAL REWARD', noThanks: 'NO THANKS', connecting: 'Connecting to GamePush…',
      realStore: 'REAL-MONEY STORE', premiumStore: 'PREMIUM STORE', storeNote: 'Products and prices are loaded from the connected platform. Purchases use the platform payment window.',
      graphicsUnavailable: 'GRAPHICS UNAVAILABLE', retryHelp: 'HOW TO RETRY',
      footer: 'RIFT PROTOCOL · NO WAY BACK', progression: 'PROGRESSION', missionsLead: 'Complete these objectives in the existing run systems. Rewards are banked after the run.', contracts: 'RIFT CONTRACTS',
      system: 'SYSTEM', sound: 'SOUND', soundSmall: 'Effects and engine audio', music: 'MUSIC', musicSmall: 'Run soundtrack channel', graphics: 'GRAPHICS', graphicsSmall: 'Rendering profile', settingsNote: 'Settings are saved locally and included in player progress when SDK storage is available. Audio respects platform mute controls.',
      overdrive: 'OVERDRIVE', activateOverdrive: 'R · ACTIVATE', tapOverdrive: 'TAP OVERDRIVE', overdriveActive: 'OVERDRIVE ACTIVE', ghost: 'BEST RUN GHOST',
      complete: 'COMPLETE', target: 'TARGET', saved: 'Saved on this device.',
      nearMisses: 'NEAR MISSES', bestCombo: 'BEST COMBO', topSpeed: 'TOP SPEED', destroyed: 'DESTROYED', xpLevel: 'XP / LEVEL', level: 'LEVEL', lv: 'LV', levelUp: 'LEVEL UP', activate: 'ACTIVATE', bestRunGhost: 'BEST RUN GHOST', even: 'EVEN', adConnecting: 'Connecting to the rewarded-ad hook…', rewardAdded: 'Reward added.', adUnavailable: 'AD UNAVAILABLE', rewardSent: 'Reward request sent.', rewardHookMissing: 'Runtime reward hook is required; no ad was started.', rewardUnavailable: 'Reward unavailable. Try again later.', savedDevice: 'Saved on this device.', dailyComplete: 'DAILY RUN COMPLETE', endlessComplete: 'ENDLESS RUN COMPLETE', newBest: 'NEW PERSONAL BEST.', signalLost: 'SIGNAL LOST.', survived: 'survived', bestChain: 'Best chain', credits: 'CREDITS', missionComplete: 'MISSION COMPLETE', unlocked: 'UNLOCKED'
    },
    ru: {
      policeProtocol: 'ПОГОНЯ ПОЛИЦИИ · ПРОТОКОЛ РАЗЛОМА',
      intro: 'Ты украл экспериментальный двигатель Разлома.<br>Оторвись от полиции. Заряди его. Доберись до следующего портала.',
      start: 'НАЧАТЬ ЗАЕЗД', daily: 'ЕЖЕДНЕВНЫЙ ЗАЕЗД', garage: 'ГАРАЖ', store: 'МАГАЗИН', upgrades: 'УЛУЧШЕНИЯ', missions: 'ЗАДАНИЯ', settings: 'НАСТРОЙКИ',
      keyHint: '<kbd>A</kbd><kbd>D</kbd> поворот <span>·</span><kbd>SPACE</kbd> прыжок <span>·</span><kbd>R</kbd> форсаж <span>·</span> Новые способности открываются по ходу заезда',
      touchHint: 'Поворачивай стрелками · Остальные механики появятся по ходу заезда',
      meta1: '01 / ПРОРВИСЬ ЧЕРЕЗ КОРДОН', meta2: 'ДОБЕРИСЬ ДО РАЗЛОМА · ПЕРЕЖИВИ ПОГОНЮ', yourCar: 'ТВОЯ МАШИНА', riftEngine: 'ДВИГАТЕЛЬ РАБОТАЕТ НА ОСКОЛКАХ РАЗЛОМА.',
      score: 'ОЧКИ', chain: 'ЦЕПОЧКА: 5 ДЕЙСТВИЙ', pursuit: 'ПОГОНЯ', onTail: 'ПОЛИЦИЯ НА ХВОСТЕ', runTime: 'ВРЕМЯ', distance: 'ДИСТАНЦИЯ', hull: 'ПРОЧНОСТЬ', shieldOffline: 'ЩИТ ОТКЛЮЧЁН', nitro: 'НИТРО', jump: 'ПРЫЖОК', ready: 'ГОТОВО',
      flight: 'ПОЛЁТ', shield: 'ЩИТ', useFlight: 'ПОЛЁТ', useShield: 'ЩИТ', phase: 'ФАЗОВЫЙ СДВИГ', pulse: 'ИМПУЛЬС',
      pauseEye: 'СИГНАЛ УДЕРЖАН', pauseTitle: 'ПАУЗА', pauseCopy: 'Заезд приостановлен.', resume: 'ПРОДОЛЖИТЬ', restartTutorial: 'НАЧАТЬ С ОБУЧЕНИЕМ', endRun: 'ЗАВЕРШИТЬ ЗАЕЗД', bankRun: 'Заверши заезд, чтобы сохранить очки и кредиты.',
      runAgain: 'ЕЩЁ РАЗ', mainMenu: 'ГЛАВНОЕ МЕНЮ', doubleReward: 'УДВОИТЬ НАГРАДУ',
      garageEye: 'СОБЕРИ СВОЮ МАШИНУ', garageTitle: 'ГАРАЖ', selected: 'ВЫБРАННАЯ МАШИНА', chooseRide: 'ВЫБЕРИ МАШИНУ', eachChassis: 'У каждой машины свои характеристики', lightSignature: 'ЦВЕТ НЕОНА', performance: 'УЛУЧШЕНИЯ', performanceSmall: '5 уровней · действуют на все машины', boosterShop: 'БУСТЕРЫ', boosterSmall: 'Одноразовые усиления', achievements: 'ДОСТИЖЕНИЯ', garageNote: 'В ежедневном заезде все используют стандартный Vector. Прогресс синхронизируется через SDK, когда хранилище площадки доступно.',
      optionalReward: 'ДОПОЛНИТЕЛЬНАЯ НАГРАДА', noThanks: 'НЕТ, СПАСИБО', connecting: 'Подключение к GamePush…',
      realStore: 'МАГАЗИН ЗА РЕАЛЬНЫЕ ДЕНЬГИ', premiumStore: 'ПРЕМИУМ-МАГАЗИН', storeNote: 'Товары и цены загружаются с площадки. Оплата проходит через окно площадки.',
      graphicsUnavailable: 'ГРАФИКА НЕДОСТУПНА', retryHelp: 'КАК ИСПРАВИТЬ',
      footer: 'ПРОТОКОЛ РАЗЛОМА · ПУТИ НАЗАД НЕТ', progression: 'ПРОГРЕСС', missionsLead: 'Выполняй задания в обычных заездах. Награды сохраняются после завершения заезда.', contracts: 'КОНТРАКТЫ РАЗЛОМА',
      system: 'СИСТЕМА', sound: 'ЗВУК', soundSmall: 'Эффекты и звук двигателя', music: 'МУЗЫКА', musicSmall: 'Музыка во время заезда', graphics: 'ГРАФИКА', graphicsSmall: 'Качество рендера', settingsNote: 'Настройки сохраняются локально и входят в прогресс игрока, когда SDK-хранилище доступно. Звук учитывает настройки площадки.',
      overdrive: 'ФОРСАЖ', activateOverdrive: 'R · АКТИВИРОВАТЬ', tapOverdrive: 'ВКЛЮЧИТЬ ФОРСАЖ', overdriveActive: 'ФОРСАЖ АКТИВЕН', ghost: 'ПРИЗРАК ЛУЧШЕГО ЗАЕЗДА',
      complete: 'ВЫПОЛНЕНО', target: 'ЦЕЛЬ', saved: 'Сохранено на устройстве.',
      nearMisses: 'ОПАСНЫЕ ПРОЕЗДЫ', bestCombo: 'ЛУЧШЕЕ КОМБО', topSpeed: 'МАКС. СКОРОСТЬ', destroyed: 'УНИЧТОЖЕНО', xpLevel: 'ОПЫТ / УРОВЕНЬ', level: 'УРОВЕНЬ', lv: 'УР.', levelUp: 'НОВЫЙ УРОВЕНЬ', activate: 'АКТИВИРОВАТЬ', bestRunGhost: 'ПРИЗРАК ЛУЧШЕГО ЗАЕЗДА', even: 'ВРОВЕНЬ', adConnecting: 'Подключение рекламы…', rewardAdded: 'Награда получена.', adUnavailable: 'РЕКЛАМА НЕДОСТУПНА', rewardSent: 'Запрос награды отправлен.', rewardHookMissing: 'Реклама не запущена: обработчик награды недоступен.', rewardUnavailable: 'Награда недоступна. Попробуй позже.', savedDevice: 'Сохранено на устройстве.', dailyComplete: 'ЕЖЕДНЕВНЫЙ ЗАЕЗД ЗАВЕРШЁН', endlessComplete: 'ЗАЕЗД ЗАВЕРШЁН', newBest: 'НОВЫЙ ЛИЧНЫЙ РЕКОРД.', signalLost: 'СИГНАЛ ПОТЕРЯН.', survived: 'в заезде', bestChain: 'Лучшая серия', credits: 'КРЕДИТЫ', missionComplete: 'ЗАДАНИЕ ВЫПОЛНЕНО', unlocked: 'ОТКРЫТО'
    },
    uk: {
      policeProtocol: 'ПОЛІЦЕЙСЬКА ПОГОНЯ · ПРОТОКОЛ РОЗЛОМУ',
      intro: 'Ти викрав експериментальний двигун Розлому.<br>Відірвися від поліції. Заряди його. Дістанься наступного порталу.',
      start: 'ПОЧАТИ ЗАЇЗД', daily: 'ЩОДЕННИЙ ЗАЇЗД', garage: 'ГАРАЖ', store: 'МАГАЗИН', upgrades: 'ПОКРАЩЕННЯ', missions: 'ЗАВДАННЯ', settings: 'НАЛАШТУВАННЯ',
      keyHint: '<kbd>A</kbd><kbd>D</kbd> поворот <span>·</span><kbd>SPACE</kbd> стрибок <span>·</span><kbd>R</kbd> форсаж <span>·</span> Нові здібності відкриваються під час заїзду',
      touchHint: 'Керуй стрілками · Інші механіки з’являться під час заїзду',
      meta1: '01 / ПРОРВИСЯ КРІЗЬ КОРДОН', meta2: 'ДІСТАНЬСЯ РОЗЛОМУ · ПЕРЕЖИВИ ПОГОНЮ', yourCar: 'ТВОЄ АВТО', riftEngine: 'ДВИГУН ПРАЦЮЄ НА УЛАМКАХ РОЗЛОМУ.',
      score: 'ОЧКИ', chain: 'ЛАНЦЮГ: 5 ДІЙ', pursuit: 'ПОГОНЯ', onTail: 'ПОЛІЦІЯ НА ХВОСТІ', runTime: 'ЧАС', distance: 'ДИСТАНЦІЯ', hull: 'МІЦНІСТЬ', shieldOffline: 'ЩИТ ВИМКНЕНО', nitro: 'НІТРО', jump: 'СТРИБОК', ready: 'ГОТОВО',
      flight: 'ПОЛІТ', shield: 'ЩИТ', useFlight: 'ПОЛІТ', useShield: 'ЩИТ', phase: 'ФАЗОВИЙ ЗСУВ', pulse: 'ІМПУЛЬС',
      pauseEye: 'СИГНАЛ УТРИМАНО', pauseTitle: 'ПАУЗА', pauseCopy: 'Заїзд призупинено.', resume: 'ПРОДОВЖИТИ', restartTutorial: 'ПОЧАТИ З НАВЧАННЯМ', endRun: 'ЗАВЕРШИТИ ЗАЇЗД', bankRun: 'Заверши заїзд, щоб зберегти очки та кредити.',
      runAgain: 'ЩЕ РАЗ', mainMenu: 'ГОЛОВНЕ МЕНЮ', doubleReward: 'ПОДВОЇТИ НАГОРОДУ',
      garageEye: 'ЗБЕРИ СВОЄ АВТО', garageTitle: 'ГАРАЖ', selected: 'ВИБРАНЕ АВТО', chooseRide: 'ОБЕРИ АВТО', eachChassis: 'Кожне авто має власні характеристики', lightSignature: 'КОЛІР НЕОНУ', performance: 'ПОКРАЩЕННЯ', performanceSmall: '5 рівнів · діють на всі авто', boosterShop: 'БУСТЕРИ', boosterSmall: 'Одноразові підсилення', achievements: 'ДОСЯГНЕННЯ', garageNote: 'У щоденному заїзді всі використовують стандартний Vector. Прогрес синхронізується через SDK, коли сховище платформи доступне.',
      optionalReward: 'ДОДАТКОВА НАГОРОДА', noThanks: 'НІ, ДЯКУЮ', connecting: 'Підключення до GamePush…',
      realStore: 'МАГАЗИН ЗА РЕАЛЬНІ ГРОШІ', premiumStore: 'ПРЕМІУМ-МАГАЗИН', storeNote: 'Товари та ціни завантажуються з платформи. Оплата проходить через вікно платформи.',
      graphicsUnavailable: 'ГРАФІКА НЕДОСТУПНА', retryHelp: 'ЯК ВИПРАВИТИ',
      footer: 'ПРОТОКОЛ РОЗЛОМУ · ШЛЯХУ НАЗАД НЕМАЄ', progression: 'ПРОГРЕС', missionsLead: 'Виконуй завдання у звичайних заїздах. Нагороди зберігаються після завершення заїзду.', contracts: 'КОНТРАКТИ РОЗЛОМУ',
      system: 'СИСТЕМА', sound: 'ЗВУК', soundSmall: 'Ефекти та звук двигуна', music: 'МУЗИКА', musicSmall: 'Музика під час заїзду', graphics: 'ГРАФІКА', graphicsSmall: 'Якість рендера', settingsNote: 'Налаштування зберігаються локально та входять до прогресу гравця, коли SDK-сховище доступне. Звук враховує налаштування платформи.',
      overdrive: 'ФОРСАЖ', activateOverdrive: 'R · АКТИВУВАТИ', tapOverdrive: 'УВІМКНУТИ ФОРСАЖ', overdriveActive: 'ФОРСАЖ АКТИВНИЙ', ghost: 'ПРИВИД НАЙКРАЩОГО ЗАЇЗДУ',
      complete: 'ВИКОНАНО', target: 'ЦІЛЬ', saved: 'Збережено на пристрої.',
      nearMisses: 'НЕБЕЗПЕЧНІ ПРОЇЗДИ', bestCombo: 'НАЙКРАЩЕ КОМБО', topSpeed: 'МАКС. ШВИДКІСТЬ', destroyed: 'ЗНИЩЕНО', xpLevel: 'ДОСВІД / РІВЕНЬ', level: 'РІВЕНЬ', lv: 'РІВ.', levelUp: 'НОВИЙ РІВЕНЬ', activate: 'АКТИВУВАТИ', bestRunGhost: 'ПРИВИД НАЙКРАЩОГО ЗАЇЗДУ', even: 'НАРІВНІ', adConnecting: 'Підключення реклами…', rewardAdded: 'Нагороду отримано.', adUnavailable: 'РЕКЛАМА НЕДОСТУПНА', rewardSent: 'Запит нагороди надіслано.', rewardHookMissing: 'Реклама не запущена: обробник нагороди недоступний.', rewardUnavailable: 'Нагорода недоступна. Спробуй пізніше.', savedDevice: 'Збережено на пристрої.', dailyComplete: 'ЩОДЕННИЙ ЗАЇЗД ЗАВЕРШЕНО', endlessComplete: 'ЗАЇЗД ЗАВЕРШЕНО', newBest: 'НОВИЙ ОСОБИСТИЙ РЕКОРД.', signalLost: 'СИГНАЛ ВТРАЧЕНО.', survived: 'у заїзді', bestChain: 'Найкраща серія', credits: 'КРЕДИТИ', missionComplete: 'ЗАВДАННЯ ВИКОНАНО', unlocked: 'ВІДКРИТО'
    }
  };

  const normalize = (lang) => {
    const code = String(lang || '').toLowerCase().replace('_', '-').split('-')[0];
    return SUPPORTED.has(code) ? code : 'en';
  };
  const t = (key, lang = current) => strings[normalize(lang)]?.[key] ?? strings.en[key] ?? key;
  const one = (selector) => document.querySelector(selector);
  const text = (selector, key) => { const n = one(selector); if (n) n.textContent = t(key); };
  const html = (selector, key) => { const n = one(selector); if (n) n.innerHTML = t(key); };

  function apply(lang) {
    current = normalize(lang);
    document.documentElement.lang = current;
    document.title = 'Neon Drift — Rift Escape';

    html('#home .hero .eyebrow', 'policeProtocol');
    const eye = one('#home .hero .eyebrow'); if (eye) eye.innerHTML = `<i></i> ${t('policeProtocol')}`;
    html('#home .hero > p', 'intro');
    text('#start', 'start'); text('#daily', 'daily'); text('#garage-open', 'garage'); text('#real-shop-open', 'store');
    text('#nav-upgrades', 'upgrades'); text('#nav-missions', 'missions'); text('#nav-settings', 'settings');
    html('.key-hint', 'keyHint'); text('.touch-hint', 'touchHint');
    text('.home-meta span:nth-child(1)', 'meta1'); text('.home-meta span:nth-child(2)', 'meta2');
    text('.car-label > span', 'yourCar'); text('.car-label > small', 'riftEngine');

    text('#action-hud > .label', 'score');
    if (one('#action-status')?.textContent === 'CHAIN 5 ACTIONS' || /ЦЕПОЧКА|ЛАНЦЮГ/.test(one('#action-status')?.textContent || '')) text('#action-status', 'chain');
    text('#pursuit-hud > .label', 'pursuit');
    if (!one('#pursuit-state')?.textContent || /ON YOUR TAIL|ПОЛИЦИЯ НА ХВОСТЕ|ПОЛІЦІЯ НА ХВОСТІ/.test(one('#pursuit-state')?.textContent || '')) text('#pursuit-state', 'onTail');
    text('.hud-top > div:first-child > .label', 'runTime'); text('.hud-top .distance > .label', 'distance');
    const hullLabel = one('.hud-bottom .hull > .label');
    if (hullLabel) hullLabel.childNodes[0].nodeValue = t('hull') + ' ';
    const nitroLabel = one('.hud-bottom .nitro > .label');
    if (nitroLabel) nitroLabel.innerHTML = (innerWidth < 700 || matchMedia('(pointer:coarse)').matches) ? t('nitro') : `<b>SHIFT</b> / ${t('nitro')}`;
    const jumpLabel = one('#jump-cooldown > span'); if (jumpLabel) jumpLabel.innerHTML = `<b>SPACE</b> / ${t('jump')}`;
    if (one('#jump-cooldown-text')?.textContent === 'READY' || /ГОТОВО/.test(one('#jump-cooldown-text')?.textContent || '')) text('#jump-cooldown-text', 'ready');
    if (one('#shield-state')?.textContent === 'SHIELD OFFLINE' || /ЩИТ .*КЛЮЧ|ЩИТ ВИМКНЕНО/.test(one('#shield-state')?.textContent || '')) text('#shield-state', 'shieldOffline');
    text('#mobile-jump', 'jump'); const mobileJump = one('#mobile-jump'); if (mobileJump) mobileJump.innerHTML = `${t('jump')} <b>↑</b>`;
    const mobileNitro = one('#mobile-nitro'); if (mobileNitro) mobileNitro.innerHTML = `${t('nitro')} <b>»</b>`;

    text('#pause .eyebrow', 'pauseEye'); text('#pause h2', 'pauseTitle'); text('#pause .panel > p', 'pauseCopy');
    text('#resume', 'resume'); text('#tutorial-replay-pause', 'restartTutorial'); text('#abandon', 'endRun'); text('#pause .panel > small', 'bankRun');
    text('#retry', 'runAgain'); text('#result-garage', 'garage'); text('#result-main-menu', 'mainMenu');
    const dbl = one('#result-double-reward'); if (dbl) dbl.innerHTML = `${t('doubleReward')} <small>AD</small>`;

    text('#garage .panel-heading .eyebrow', 'garageEye'); text('#garage .panel-heading h2', 'garageTitle');
    text('.garage-showcase > div > span', 'selected');
    const garageHeadings = document.querySelectorAll('#garage h3');
    if (garageHeadings[0]) garageHeadings[0].innerHTML = `${t('chooseRide')} <small>${t('eachChassis')}</small>`;
    if (garageHeadings[1]) garageHeadings[1].textContent = t('lightSignature');
    if (garageHeadings[2]) garageHeadings[2].innerHTML = `${t('performance')} <small>${t('performanceSmall')}</small>`;
    if (garageHeadings[3]) garageHeadings[3].innerHTML = `${t('boosterShop')} <small>${t('boosterSmall')}</small>`;
    text('.achievement-heading h3', 'achievements'); text('.garage-note', 'garageNote');

    text('#reward .eyebrow', 'optionalReward'); text('#reward-skip', 'noThanks');
    if (/Connecting to GamePush|Подключение к GamePush|Підключення до GamePush/.test(one('#ad-status')?.textContent || '')) text('#ad-status', 'connecting');
    text('#real-shop .eyebrow', 'realStore'); text('#real-shop h2', 'premiumStore'); text('#real-shop .store-note', 'storeNote');
    text('#failure h2', 'graphicsUnavailable'); text('#failure-retry-info', 'retryHelp');
    text('#home-footer > span:first-child', 'footer');

    text('#missions-screen .eyebrow', 'progression'); text('#missions-screen h2', 'missions'); text('#missions-screen .panel-lede', 'missionsLead');
    const contractHeading = one('#missions-screen .mission-list + h3'); if (contractHeading) contractHeading.textContent = t('contracts');
    text('#settings-screen .eyebrow', 'system'); text('#settings-screen h2', 'settings');
    const rows = document.querySelectorAll('#settings-screen .setting-row');
    if (rows[0]) { const b = rows[0].querySelector('b'); const s = rows[0].querySelector('small'); if (b) b.textContent = t('sound'); if (s) s.textContent = t('soundSmall'); }
    if (rows[1]) { const b = rows[1].querySelector('b'); const s = rows[1].querySelector('small'); if (b) b.textContent = t('music'); if (s) s.textContent = t('musicSmall'); }
    if (rows[2]) { const b = rows[2].querySelector('b'); const s = rows[2].querySelector('small'); if (b) b.textContent = t('graphics'); if (s) s.textContent = t('graphicsSmall'); }
    text('#settings-screen .settings-note', 'settingsNote');

    const od = one('#overdrive-control .od-label span'); if (od) od.textContent = t('overdrive');
    window.dispatchEvent(new CustomEvent('neondrift:i18n-applied', { detail: { language: current } }));
  }

  const missionText = (mission, lang = current) => {
    if (!mission) return '';
    const n = normalize(lang), target = mission.target || 0;
    const map = {
      ru: {
        distance: `Проехать ${(target / 1000).toFixed(1).replace('.', ',')} км`, near: `Сделать ${target} опасных проездов`, phase: `Использовать Phase Shift ${target} раза`, portals: `Войти в ${target} портала`, jump: `Перепрыгнуть ${target} препятствий`, shards: `Собрать ${target} осколков Phase`, clean: `Продержаться ${target} секунд без урона`, events: `Пережить ${target} случайных события`, combo: `Достичь комбо x${target}`, chains: `Завершить ${target} энергетические цепочки`, risk: `Пройти ${target} опасных маршрута`, health: `Собрать ${target} ячейки здоровья`, nitroUse: `Использовать Nitro ${target} раз`, shieldImpact: `Заблокировать Щитом ${target} удара`, flight: `Использовать Flight ${target} раза`, dronePower: `Подобрать Drone Power ${target} раза`, drones: `Уничтожить ${target} препятствий дронами`, chase: 'Пережить погоню', speedrun: `Проехать 3 км быстрее 700 км/ч`
      },
      uk: {
        distance: `Проїхати ${(target / 1000).toFixed(1).replace('.', ',')} км`, near: `Зробити ${target} небезпечних проїздів`, phase: `Використати Phase Shift ${target} рази`, portals: `Увійти в ${target} портали`, jump: `Перестрибнути ${target} перешкод`, shards: `Зібрати ${target} уламків Phase`, clean: `Протриматися ${target} секунд без шкоди`, events: `Пережити ${target} випадкові події`, combo: `Досягти комбо x${target}`, chains: `Завершити ${target} енергетичні ланцюги`, risk: `Пройти ${target} небезпечні маршрути`, health: `Зібрати ${target} комірки здоров'я`, nitroUse: `Використати Nitro ${target} разів`, shieldImpact: `Заблокувати Щитом ${target} удари`, flight: `Використати Flight ${target} рази`, dronePower: `Підібрати Drone Power ${target} рази`, drones: `Знищити ${target} перешкод дронами`, chase: 'Пережити погоню', speedrun: 'Проїхати 3 км швидше 700 км/год'
      }
    };
    return map[n]?.[mission.id] || mission.label || '';
  };

  window.NeonI18n = {
    apply,
    t,
    normalize,
    missionText,
    get language() { return current; }
  };

  window.addEventListener('neondrift:language-changed', (event) => apply(event.detail?.language || event.detail || document.documentElement.lang));
  document.addEventListener('DOMContentLoaded', () => apply(document.documentElement.lang));
})();
