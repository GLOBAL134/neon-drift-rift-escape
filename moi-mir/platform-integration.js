/**
 * Platform integration for GamePush capabilities that depend on the current platform:
 * rewarded ads, payments, unfinished purchase fulfillment and feature visibility.
 */
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  let gp = null;
  let initialized = false;
  let products = [];
  let featureTimer = 0;
  const consumedThisSession = new Set();
  const fulfillmentInFlight = new Map();

  // These storefronts require real-money purchases to be present for moderation.
  const REQUIRED_PURCHASE_PLATFORMS = ['fotostrana', 'beeline', 'vkplay', 'kongregate'];
  const REQUIRED_CATALOG = [
    { tag: 'CREDITS_500', name: '500 Credits', description: 'Adds 500 Credits to your NEON DRIFT balance.', priceString: 'BUY' },
    { tag: 'STARTER_PACK', name: 'Starter Pack', description: '1,000 Credits + 1 Flight + 1 Shield.', priceString: 'BUY' },
    { tag: 'BOOSTER_PACK', name: 'Booster Pack', description: '2 Flight boosts + 2 Shield boosts.', priceString: 'BUY' }
  ];

  function normalizePlatformName(value) {
    return String(value || '').toLowerCase().replace(/[\s_.-]+/g, '');
  }

  function currentPlatformName() {
    const candidates = [
      gp?.platform?.type,
      gp?.platform?.name,
      gp?.platform?.id,
      gp?.platformType,
      gp?.platform,
      document.referrer,
      location.hostname
    ];
    return candidates.map(normalizePlatformName).find(Boolean) || '';
  }

  function purchasesRequiredHere() {
    const current = currentPlatformName();
    return REQUIRED_PURCHASE_PLATFORMS.some((name) => current.includes(name));
  }

  function rewardedAvailable() {
    const value = gp?.ads?.isRewardedAvailable;
    if (typeof value === 'function') {
      try {
        return Boolean(value.call(gp.ads));
      } catch {
        return false;
      }
    }
    if (typeof value === 'boolean') return value;
    return typeof gp?.ads?.showRewardedVideo === 'function';
  }

  function paymentsAvailable() {
    const value = gp?.payments?.isAvailable;
    if (typeof value === 'function') {
      try {
        return Boolean(value.call(gp.payments));
      } catch {
        return false;
      }
    }
    if (typeof value === 'boolean') return value;
    return typeof gp?.payments?.purchase === 'function';
  }

  function setHidden(id, hidden) {
    const node = $(id);
    if (node) node.hidden = hidden;
  }

  function refreshFeatureVisibility() {
    const ads = rewardedAvailable();
    setHidden('flight-ad', !ads);
    setHidden('shield-ad', !ads);
    setHidden('result-double-reward', !ads);
    setHidden('reward-ad', !ads);

    if (!ads) {
      const status = $('ad-status');
      const doubleStatus = $('double-reward-status');
      if (status) status.textContent = '';
      if (doubleStatus && /ad|advert/i.test(doubleStatus.textContent || '')) doubleStatus.textContent = '';
    }

    const store = $('real-shop-open');
    if (store) {
      const required = purchasesRequiredHere();
      // Hide checkout entirely when the portal has no verified payment API.
      store.hidden = !paymentsAvailable();
      store.dataset.purchaseRequired = required ? '1' : '0';
      store.dataset.paymentsAvailable = paymentsAvailable() ? '1' : '0';
    }
  }

  function productTag(product) {
    return String(product?.tag ?? product?.sku ?? '').trim();
  }

  function productId(product) {
    return product?.id ?? product?.productId ?? null;
  }

  function productTitle(product) {
    const fallback = productTag(product) || 'Premium item';
    return String(product?.name ?? product?.title ?? fallback);
  }

  function productPrice(product) {
    return String(
      product?.priceString
      ?? product?.currencyPrice
      ?? product?.price
      ?? product?.realPrice
      ?? product?.currency
      ?? 'BUY'
    );
  }

  function positiveInt(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : fallback;
  }

  function amountNear(text, keywords) {
    const upper = String(text || '').toUpperCase();
    for (const keyword of keywords) {
      const after = upper.match(new RegExp(`${keyword}[\\s_:-]*(\\d{1,7})`));
      if (after) return positiveInt(after[1]);
      const before = upper.match(new RegExp(`(\\d{1,7})[\\s_:-]*${keyword}`));
      if (before) return positiveInt(before[1]);
    }
    return 0;
  }

  /**
   * Converts a GamePush product tag/name into an in-game consumable reward.
   * The explicit tags below are recommended, while the parser also accepts common variants.
   */
  function rewardForProduct(product) {
    const tag = productTag(product).toUpperCase();
    const searchable = `${tag} ${product?.name || ''} ${product?.description || ''}`.toUpperCase();

    const exact = {
      CREDITS_500: { credits: 500 },
      CREDITS_1500: { credits: 1500 },
      CREDITS_5000: { credits: 5000 },
      FLIGHT_1: { flight: 1 },
      FLIGHT_3: { flight: 3 },
      SHIELD_1: { shield: 1 },
      SHIELD_3: { shield: 3 },
      BOOSTER_PACK: { flight: 2, shield: 2 },
      STARTER_PACK: { credits: 1000, flight: 1, shield: 1 },
      PREMIUM_PACK: { credits: 3000, flight: 3, shield: 3 }
    };
    if (exact[tag]) return { ...exact[tag] };

    const credits = amountNear(searchable, ['CREDITS?', 'COINS?', 'GOLD', 'CR']);
    const flight = amountNear(searchable, ['FLIGHTS?', 'FLIGHT_BOOSTS?']);
    const shield = amountNear(searchable, ['SHIELDS?', 'SHIELD_BOOSTS?']);
    if (credits || flight || shield) return { credits, flight, shield };

    if (/STARTER/.test(searchable)) return { credits: 1000, flight: 1, shield: 1 };
    if (/PREMIUM|MEGA/.test(searchable)) return { credits: 3000, flight: 3, shield: 3 };
    if (/BOOSTER/.test(searchable)) return { flight: 2, shield: 2 };

    // Safe fallback for a configured one-time product whose tag does not follow the recommended naming scheme.
    // The player still receives a real in-game value instead of paying for a no-op item.
    return { credits: 500 };
  }

  function purchaseIdentifier(purchase) {
    return String(purchase?._id ?? purchase?.purchaseId ?? purchase?.id ?? '').trim();
  }

  function purchaseIsPaid(purchase) {
    const status = String(purchase?.orderStatus ?? purchase?.status ?? '').toUpperCase();
    if (!status) return true;
    return ['PAID', 'SUCCESS', 'SUCCEEDED', 'COMPLETE', 'COMPLETED'].includes(status);
  }

  function findProductForPurchase(purchase) {
    const purchaseTag = String(purchase?.tag ?? purchase?.productTag ?? '').trim();
    const purchaseProductId = purchase?.productId ?? purchase?.product?.id ?? null;
    if (purchase?.product && typeof purchase.product === 'object') return purchase.product;

    const configured = products.find((product) => {
      if (purchaseTag && productTag(product) === purchaseTag) return true;
      if (purchaseProductId != null && String(productId(product)) === String(purchaseProductId)) return true;
      return false;
    });
    if (configured) return configured;

    // Pending purchases can arrive before the product catalogue is populated on some adapters.
    // A tagged purchase is still safe to fulfill because the reward mapping is deterministic.
    if (purchaseTag || purchaseProductId != null) {
      return {
        tag: purchaseTag,
        id: purchaseProductId,
        name: purchase?.productName ?? purchaseTag ?? 'Pending purchase',
        description: purchase?.description ?? ''
      };
    }
    return null;
  }

  async function consumePurchase(product, purchase) {
    if (typeof gp?.payments?.consume !== 'function') return false;
    const purchaseId = purchaseIdentifier(purchase);
    const tag = productTag(product);
    if (purchaseId && consumedThisSession.has(purchaseId)) return true;

    try {
      if (purchaseId) {
        await gp.payments.consume({ purchaseId });
        consumedThisSession.add(purchaseId);
        return true;
      }
    } catch {
      // Older GamePush/platform adapters may only accept id/tag. Fall through to a safe fallback.
    }

    try {
      const id = productId(product);
      if (id != null) {
        await gp.payments.consume({ id });
        if (purchaseId) consumedThisSession.add(purchaseId);
        return true;
      }
      if (tag) {
        await gp.payments.consume({ tag });
        if (purchaseId) consumedThisSession.add(purchaseId);
        return true;
      }
    } catch {
    }
    return false;
  }

  async function fulfillPurchase(product, purchase, source = 'purchase') {
    const purchaseId = purchaseIdentifier(purchase);
    if (!purchaseId || !purchaseIsPaid(purchase)) {
      return { ok: false, reason: 'purchase_not_paid_or_missing_id' };
    }

    // The purchase promise and SDK event can arrive at nearly the same time.
    // Serialize fulfillment per transaction so reward/consume can never race each other.
    if (fulfillmentInFlight.has(purchaseId)) return fulfillmentInFlight.get(purchaseId);

    const task = (async () => {
      const reward = rewardForProduct(product);
      if (!reward) return { ok: false, reason: 'unmapped_product' };

      const grantPurchase = window.__NEON__?.actions?.grantPurchase;
      if (typeof grantPurchase !== 'function') {
        return { ok: false, reason: 'game_grant_api_unavailable' };
      }

      const grant = await grantPurchase({
        purchaseId,
        tag: productTag(product),
        ...reward
      });
      if (!grant?.ok) return grant || { ok: false, reason: 'grant_failed' };

      const consumed = await consumePurchase(product, purchase);
      if (!consumed) {
        // The game save contains purchaseId in processedPurchases, so a later launch can safely retry consume.
        return { ok: true, granted: !grant.alreadyProcessed, consumed: false, source };
      }
      return { ok: true, granted: !grant.alreadyProcessed, consumed: true, source };
    })();

    fulfillmentInFlight.set(purchaseId, task);
    try {
      return await task;
    } finally {
      fulfillmentInFlight.delete(purchaseId);
    }
  }

  async function processPendingPurchases() {
    const pending = Array.isArray(gp?.payments?.purchases) ? gp.payments.purchases.slice() : [];
    for (const purchase of pending) {
      const product = findProductForPurchase(purchase);
      if (!product) continue;
      await fulfillPurchase(product, purchase, 'startup');
    }
  }

  function renderProducts() {
    const box = $('real-products');
    if (!box) return;

    const canPay = paymentsAvailable();
    const actualByTag = new Map(products.map((product, index) => [productTag(product), { product, index }]));
    const displayProducts = [];

    // Show every real product returned by GamePush first.
    for (const [index, product] of products.entries()) {
      displayProducts.push({ product, index, configured: true });
    }

    // Keep the three planned store cards visible, but NEVER let a placeholder
    // open checkout. Calling purchase() for a tag that does not exist in the
    // GamePush Purchases catalog causes ERR: product_not_found.
    for (const placeholder of REQUIRED_CATALOG) {
      if (!actualByTag.has(placeholder.tag)) {
        displayProducts.push({ product: { ...placeholder, __fallback: true }, index: -1, configured: false });
      }
    }

    box.replaceChildren();
    for (const entry of displayProducts) {
      const { product, index, configured } = entry;
      const reward = rewardForProduct(product);
      if (!reward) continue;

      const tag = productTag(product);
      const button = document.createElement('button');
      button.className = 'real-product';

      const info = document.createElement('span');
      const title = document.createElement('b');
      const description = document.createElement('small');
      const price = document.createElement('strong');

      title.textContent = productTitle(product);
      description.textContent = String(product?.description || 'Premium consumable');

      const purchasable = configured && canPay && Boolean(tag);
      if (purchasable) {
        button.dataset.i = String(index);
        price.textContent = productPrice(product);
      } else {
        button.disabled = true;
        button.setAttribute('aria-disabled', 'true');
        button.dataset.fallback = product.__fallback ? '1' : '0';
        price.textContent = !configured ? 'NOT CONFIGURED' : !tag ? 'TAG REQUIRED' : 'UNAVAILABLE';
      }

      info.append(title, description);
      button.append(info, price);
      box.append(button);
    }

    const note = document.createElement('p');
    note.className = 'store-catalog-status';
    const missingTags = REQUIRED_CATALOG
      .map((product) => product.tag)
      .filter((tag) => !actualByTag.has(tag));

    if (!canPay) {
      note.textContent = purchasesRequiredHere()
        ? 'Purchases are required on this platform, but the payment API is currently unavailable.'
        : 'Premium items are shown here. Purchases become active on supported platforms.';
    } else if (missingTags.length) {
      note.textContent = `Configure these GamePush purchase tags to enable checkout: ${missingTags.join(', ')}.`;
    } else {
      note.textContent = 'Secure purchases are processed by the connected platform.';
    }
    box.append(note);
  }

  async function loadProducts() {
    if (!paymentsAvailable()) {
      products = [];
      renderProducts();
      refreshFeatureVisibility();
      return;
    }

    try {
      // GamePush loads these lists during SDK initialization. fetchProducts is kept only as a compatibility fallback.
      let list = Array.isArray(gp.payments.products) ? gp.payments.products : [];
      if (!list.length && typeof gp.payments.fetchProducts === 'function') {
        const fetched = await gp.payments.fetchProducts();
        list = Array.isArray(fetched) ? fetched : (fetched?.products || []);
      }
      products = list.slice();
    } catch {
      products = Array.isArray(gp?.payments?.products) ? gp.payments.products.slice() : [];
    }

    // Important: do not inject placeholder products into the purchasable SDK list.
    // The UI can display planned products as disabled placeholders, but checkout must
    // only use products that actually exist in gp.payments.products.

    renderProducts();
    refreshFeatureVisibility();
  }

  async function buyProduct(index) {
    const status = $('purchase-status');
    const product = products[index];
    const tag = productTag(product);
    if (!paymentsAvailable() || !product || product.__fallback || !tag || typeof gp?.payments?.purchase !== 'function') {
      if (status) status.textContent = product?.__fallback
        ? 'This product is not configured in GamePush yet.'
        : !tag
          ? 'This GamePush product needs a tag before it can be purchased.'
          : 'Purchase is unavailable.';
      return false;
    }

    const reward = rewardForProduct(product);
    if (!reward) {
      if (status) status.textContent = 'This product is not mapped to an in-game reward.';
      return false;
    }

    if (status) status.textContent = 'Opening payment window…';
    try {
      const result = await gp.payments.purchase({ tag });
      const purchasedProduct = result?.product || product;
      const purchase = result?.purchase;
      const fulfilled = await fulfillPurchase(purchasedProduct, purchase, 'purchase');
      if (!fulfilled.ok) throw new Error(fulfilled.reason || 'fulfillment_failed');
      if (status) status.textContent = fulfilled.consumed
        ? 'Purchase delivered successfully.'
        : 'Purchase delivered. Confirmation will retry automatically.';
      renderProducts();
      return true;
    } catch {
      if (status) status.textContent = 'Purchase cancelled or unavailable.';
      return false;
    }
  }

  function bindPaymentEvents() {
    if (!gp?.payments?.on || gp.payments.__neonBound) return;
    gp.payments.__neonBound = true;
    gp.payments.on('purchase', async ({ product, purchase } = {}) => {
      if (!product || !purchase) return;
      await fulfillPurchase(product, purchase, 'event');
      renderProducts();
    });
  }

  function bindUi() {
    if (document.documentElement.dataset.neonPlatformBound === '1') return;
    document.documentElement.dataset.neonPlatformBound = '1';

    $('real-shop-open')?.addEventListener('click', () => {
      $('real-shop').hidden = false;
      renderProducts();
      const status = $('purchase-status');
      if (status) {
        if (!gp) status.textContent = 'Connecting to GamePush payments…';
        else if (!paymentsAvailable()) status.textContent = purchasesRequiredHere()
          ? 'Payments are required on this platform but are not available from the SDK.'
          : 'Purchases are unavailable on this platform.';
        else if (!products.length) status.textContent = 'Configure the matching product tags in GamePush to enable checkout.';
        else status.textContent = '';
      }
    });
    $('real-shop-close')?.addEventListener('click', () => {
      $('real-shop').hidden = true;
    });
    $('real-products')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-i]');
      if (button) void buyProduct(Number(button.dataset.i));
    });
  }

  async function initialize(sdk) {
    gp = sdk;
    if (!gp) return false;

    bindUi();
    bindPaymentEvents();
    await loadProducts();
    await processPendingPurchases();
    renderProducts();
    refreshFeatureVisibility();

    if (!initialized) {
      initialized = true;
      featureTimer = window.setInterval(refreshFeatureVisibility, 4000);
      window.addEventListener('pagehide', () => {
        if (featureTimer) window.clearInterval(featureTimer);
      }, { once: true });
    }
    return true;
  }

  // Bind the store UI immediately so the STORE section is always reachable,
  // even while the GamePush SDK is still initializing.
  bindUi();
  renderProducts();
  refreshFeatureVisibility();

  const api = {
    initialize,
    rewardedAvailable,
    paymentsAvailable,
    rewardForProduct,
    fulfillPurchase,
    processPendingPurchases,
    refreshFeatureVisibility,
    purchasesRequiredHere,
    currentPlatformName
  };

  window.NeonPlatform = api;
  window.__NEON_RESOLVE_PLATFORM_READY__?.(api);
})();
