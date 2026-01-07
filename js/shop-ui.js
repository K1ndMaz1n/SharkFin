/**
 * SHOP-UI.JS
 * Sharky's Shop User Interface
 * Renders the shop page with Sharky, items, and all interactions
 */

const ShopUI = {
  currentCategory: 'featured',
  selectedDeal: null,
  sharkyMood: 'neutral', // neutral, happy, sly, caught, respect

  // ============================================================
  // RENDER MAIN SHOP PAGE
  // ============================================================
  
  render() {
    const shopPage = document.getElementById('shopPage');
    if (!shopPage) return;

    Shop.init();
    
    const greeting = Shop.getGreeting();
    const coins = State.current?.sharkCoins || 0;
    const rareEvent = Shop.state.rareEvent;
    
    shopPage.innerHTML = `
      <div class="shop-container">
        <!-- Sharky Section -->
        <div class="sharky-section">
          <div class="sharky-character" id="sharkyCharacter">
            <div class="sharky-sprite ${this.sharkyMood}">🦈</div>
            <div class="sharky-suit"></div>
          </div>
          <div class="sharky-dialogue" id="sharkyDialogue">
            <div class="dialogue-text">${greeting}</div>
          </div>
        </div>

        <!-- Coin Display -->
        <div class="shop-coins">
          <span class="coin-icon">◆</span>
          <span class="coin-amount" id="shopCoins">${coins.toLocaleString()}</span>
          <span class="coin-label">SC</span>
        </div>

        <!-- Rare Event Banner -->
        ${rareEvent ? `
          <div class="rare-event-banner ${rareEvent.isScam ? 'suspicious' : 'genuine'}" id="rareEventBanner">
            <div class="event-icon">${rareEvent.isScam ? '⚡' : '✨'}</div>
            <div class="event-info">
              <div class="event-name">${rareEvent.name}</div>
              <div class="event-desc">${rareEvent.description}</div>
            </div>
            ${rareEvent.isScam ? `
              <button class="call-bs-btn" id="callBSBtn">
                <span>🤔</span>
                <span>Something's off...</span>
              </button>
            ` : ''}
          </div>
        ` : ''}

        <!-- Category Tabs -->
        <div class="shop-tabs">
          <button class="shop-tab ${this.currentCategory === 'featured' ? 'active' : ''}" data-category="featured">
            <span class="tab-icon">⭐</span>
            <span>Featured</span>
          </button>
          <button class="shop-tab ${this.currentCategory === 'cosmetics' ? 'active' : ''}" data-category="cosmetics">
            <span class="tab-icon">✨</span>
            <span>Cosmetics</span>
          </button>
          <button class="shop-tab ${this.currentCategory === 'functional' ? 'active' : ''}" data-category="functional">
            <span class="tab-icon">🛠️</span>
            <span>Boosts</span>
          </button>
          <button class="shop-tab ${this.currentCategory === 'collections' ? 'active' : ''}" data-category="collections">
            <span class="tab-icon">📦</span>
            <span>Sets</span>
          </button>
        </div>

        <!-- Items Grid -->
        <div class="shop-items" id="shopItems">
          ${this.renderCategory(this.currentCategory)}
        </div>
      </div>

      <!-- Item Detail Modal -->
      <div class="item-modal hidden" id="itemModal">
        <div class="modal-backdrop" id="modalBackdrop"></div>
        <div class="modal-content" id="modalContent"></div>
      </div>

      <!-- Wisdom Modal -->
      <div class="wisdom-modal hidden" id="wisdomModal">
        <div class="wisdom-backdrop"></div>
        <div class="wisdom-content" id="wisdomContent"></div>
      </div>
    `;

    this.attachEventListeners();
  },

  // ============================================================
  // RENDER CATEGORY CONTENT
  // ============================================================
  
  renderCategory(category) {
    switch (category) {
      case 'featured':
        return this.renderFeatured();
      case 'cosmetics':
        return this.renderCosmetics();
      case 'functional':
        return this.renderFunctional();
      case 'collections':
        return this.renderCollections();
      default:
        return this.renderFeatured();
    }
  },

  renderFeatured() {
    const deals = Shop.state.featuredDeals || [];
    
    if (deals.length === 0) {
      return `<div class="empty-state">Check back later for featured deals!</div>`;
    }

    return `
      <div class="featured-grid">
        ${deals.map((deal, index) => this.renderDealCard(deal, index)).join('')}
      </div>
    `;
  },

  renderDealCard(deal, index) {
    const item = deal.item;
    const owned = State.current?.ownedItems?.includes(item.id);
    const coins = State.current?.sharkCoins || 0;
    const canAfford = coins >= deal.displayPrice;
    
    let priceDisplay = '';
    let tacticHint = '';
    
    // Render price based on tactic
    switch (deal.tactic) {
      case 'anchoring':
        priceDisplay = `
          <span class="original-price">${deal.tacticData.originalPrice} SC</span>
          <span class="deal-price">${deal.displayPrice} SC</span>
          <span class="savings">Save ${deal.tacticData.savings}!</span>
        `;
        break;
      case 'urgency':
        priceDisplay = `
          <span class="deal-price">${deal.displayPrice} SC</span>
          <span class="urgency-hint">${deal.tacticData.stock} left</span>
        `;
        break;
      case 'socialProof':
        priceDisplay = `
          <span class="deal-price">${deal.displayPrice} SC</span>
          <span class="social-hint">${deal.tacticData.buyers} bought this week</span>
        `;
        break;
      case 'bundle':
        priceDisplay = `
          <span class="bundle-items">${deal.tacticData.items.map(i => i.name).join(' + ')}</span>
          <span class="deal-price">${deal.displayPrice} SC</span>
          <span class="savings">Save ${deal.tacticData.fakeSavings}!</span>
        `;
        break;
      case 'reciprocity':
        priceDisplay = `
          <span class="original-price">${deal.actualValue} SC</span>
          <span class="deal-price">${deal.displayPrice} SC</span>
          <span class="loyalty-hint">Loyalty price</span>
        `;
        break;
      default:
        priceDisplay = `<span class="deal-price">${deal.displayPrice} SC</span>`;
    }

    return `
      <div class="deal-card ${deal.tacticExposed ? 'exposed' : ''} ${owned ? 'owned' : ''} ${!canAfford && !owned ? 'cant-afford' : ''}" 
           data-deal-index="${index}">
        <div class="deal-rarity ${item.rarity}">${item.rarity}</div>
        <div class="deal-icon">${item.icon}</div>
        <div class="deal-name">${item.name}</div>
        <div class="deal-price-area">
          ${priceDisplay}
        </div>
        ${owned ? '<div class="owned-badge">OWNED</div>' : ''}
        ${deal.tacticExposed ? '<div class="exposed-badge">Price adjusted</div>' : ''}
      </div>
    `;
  },

  renderCosmetics() {
    const items = Object.values(Shop.items).filter(i => 
      ['frames', 'titles', 'skins', 'backgrounds'].includes(i.category) &&
      Shop.state.currentStock.includes(i.id)
    );

    const grouped = {
      frames: items.filter(i => i.category === 'frames'),
      titles: items.filter(i => i.category === 'titles'),
      skins: items.filter(i => i.category === 'skins'),
      backgrounds: items.filter(i => i.category === 'backgrounds')
    };

    return `
      ${Object.entries(grouped).map(([cat, catItems]) => catItems.length > 0 ? `
        <div class="category-section">
          <h3 class="category-title">${cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
          <div class="items-grid">
            ${catItems.map(item => this.renderItemCard(item)).join('')}
          </div>
        </div>
      ` : '').join('')}
    `;
  },

  renderFunctional() {
    const items = Object.values(Shop.items).filter(i => 
      i.category === 'functional' &&
      Shop.state.currentStock.includes(i.id)
    );

    return `
      <div class="items-grid functional-grid">
        ${items.map(item => this.renderItemCard(item, true)).join('')}
      </div>
    `;
  },

  renderCollections() {
    // Group items by collection
    const collections = {};
    Object.values(Shop.items).forEach(item => {
      if (item.collection) {
        if (!collections[item.collection]) {
          collections[item.collection] = [];
        }
        collections[item.collection].push(item);
      }
    });

    return `
      ${Object.entries(collections).map(([name, items]) => {
        const owned = items.filter(i => State.current?.ownedItems?.includes(i.id)).length;
        const total = items.length;
        const totalPrice = items.reduce((sum, i) => sum + i.basePrice, 0);
        
        return `
          <div class="collection-card">
            <div class="collection-header">
              <div class="collection-name">${name.charAt(0).toUpperCase() + name.slice(1)} Collection</div>
              <div class="collection-progress">${owned}/${total} owned</div>
            </div>
            <div class="collection-items">
              ${items.map(item => `
                <div class="collection-piece ${State.current?.ownedItems?.includes(item.id) ? 'owned' : ''}">
                  <span class="piece-icon">${item.icon}</span>
                  <span class="piece-name">${item.name}</span>
                  <span class="piece-price">${item.basePrice} SC</span>
                </div>
              `).join('')}
            </div>
            <div class="collection-footer">
              <span class="collection-total">Full set: ${totalPrice} SC</span>
              ${owned === total ? '<span class="collection-complete">✓ Complete!</span>' : ''}
            </div>
          </div>
        `;
      }).join('')}
    `;
  },

  renderItemCard(item, showQuantity = false) {
    const owned = State.current?.ownedItems?.includes(item.id);
    const quantity = State.current?.itemQuantities?.[item.id] || 0;
    const coins = State.current?.sharkCoins || 0;
    const canAfford = coins >= item.basePrice;

    return `
      <div class="item-card ${item.rarity} ${owned && !item.stackable ? 'owned' : ''} ${!canAfford ? 'cant-afford' : ''}" 
           data-item-id="${item.id}">
        <div class="item-rarity">${item.rarity}</div>
        <div class="item-icon">${item.icon}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-price">${item.basePrice} SC</div>
        ${owned && !item.stackable ? '<div class="owned-badge">OWNED</div>' : ''}
        ${showQuantity && quantity > 0 ? `<div class="quantity-badge">×${quantity}</div>` : ''}
      </div>
    `;
  },

  // ============================================================
  // ITEM DETAIL MODAL
  // ============================================================
  
  showItemModal(itemId, dealIndex = null) {
    const item = Shop.items[itemId];
    if (!item) return;

    const deal = dealIndex !== null ? Shop.state.featuredDeals[dealIndex] : null;
    const price = deal ? deal.displayPrice : item.basePrice;
    const owned = State.current?.ownedItems?.includes(item.id);
    const coins = State.current?.sharkCoins || 0;
    const canAfford = coins >= price;

    // Update Sharky's dialogue
    this.updateSharkyDialogue('atItem', { item: item.name });

    const modal = document.getElementById('itemModal');
    const content = document.getElementById('modalContent');

    content.innerHTML = `
      <button class="modal-close" id="modalClose">✕</button>
      <div class="modal-item">
        <div class="modal-icon ${item.rarity}">${item.icon}</div>
        <div class="modal-rarity ${item.rarity}">${item.rarity}</div>
        <h2 class="modal-name">${item.name}</h2>
        <p class="modal-desc">${item.description}</p>
        
        ${deal ? this.renderDealDetails(deal) : ''}
        
        <div class="modal-price-section">
          ${deal && deal.tacticData.originalPrice ? `
            <div class="modal-original-price">${deal.tacticData.originalPrice} SC</div>
          ` : ''}
          <div class="modal-price ${deal ? 'deal' : ''}">${price} SC</div>
        </div>

        ${!owned || item.stackable ? `
          <button class="buy-btn ${!canAfford ? 'disabled' : ''}" 
                  id="buyBtn" 
                  data-item-id="${item.id}" 
                  data-deal-index="${dealIndex}"
                  ${!canAfford ? 'disabled' : ''}>
            ${canAfford ? 'Purchase' : 'Not enough coins'}
          </button>
        ` : `
          <div class="already-owned">You already own this item</div>
        `}
      </div>
    `;

    modal.classList.remove('hidden');
    
    // Attach modal events
    document.getElementById('modalClose')?.addEventListener('click', () => this.closeModal());
    document.getElementById('modalBackdrop')?.addEventListener('click', () => this.closeModal());
    document.getElementById('buyBtn')?.addEventListener('click', (e) => {
      const itemId = e.target.dataset.itemId;
      const dealIdx = e.target.dataset.dealIndex !== 'null' ? parseInt(e.target.dataset.dealIndex) : null;
      this.handlePurchase(itemId, dealIdx);
    });
  },

  renderDealDetails(deal) {
    let details = '';
    
    switch (deal.tactic) {
      case 'urgency':
        details = `<div class="deal-detail urgency">⏱️ Only ${deal.tacticData.stock} left in stock</div>`;
        break;
      case 'socialProof':
        details = `<div class="deal-detail social">🔥 ${deal.tacticData.buyers} sharks bought this recently</div>`;
        break;
      case 'bundle':
        details = `<div class="deal-detail bundle">📦 Bundle: ${deal.tacticData.items.map(i => i.name).join(' + ')}</div>`;
        break;
      case 'reciprocity':
        details = `<div class="deal-detail loyalty">💎 Loyalty customer price</div>`;
        break;
    }
    
    return details;
  },

  closeModal() {
    document.getElementById('itemModal')?.classList.add('hidden');
    this.selectedDeal = null;
  },

  // ============================================================
  // PURCHASE FLOW
  // ============================================================
  
  handlePurchase(itemId, dealIndex) {
    const result = Shop.purchase(itemId, dealIndex);
    
    if (!result.success) {
      this.showToast(result.message, 'error');
      return;
    }

    // Play sound
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play('coinEarn');
    }

    // Visual feedback
    if (typeof Interactions !== 'undefined') {
      Interactions.haptic('success');
    }

    // Update coin display
    this.updateCoins();

    // Close item modal
    this.closeModal();

    // Update Sharky
    this.sharkyMood = 'happy';
    this.updateSharkyDialogue('confirm');

    // Show wisdom if they got played
    if (result.showWisdom && result.wisdom) {
      setTimeout(() => {
        this.showWisdom(result.tactic, result.wisdom);
      }, 500);
    } else {
      // Just show purchase confirmation
      this.showToast(`${result.item.name} acquired!`, 'success');
    }

    // Re-render shop to update owned states
    setTimeout(() => {
      this.render();
    }, 300);
  },

  // ============================================================
  // WISDOM MODAL (Post-purchase education)
  // ============================================================
  
  showWisdom(tactic, wisdomText) {
    const modal = document.getElementById('wisdomModal');
    const content = document.getElementById('wisdomContent');

    const tacticNames = {
      urgency: 'Urgency Manipulation',
      anchoring: 'Price Anchoring',
      socialProof: 'Social Proof',
      bundle: 'Bundle Trap',
      sunkCost: 'Sunk Cost Fallacy',
      decoy: 'Decoy Pricing',
      lossAversion: 'Loss Aversion',
      reciprocity: 'Reciprocity Trick'
    };

    content.innerHTML = `
      <div class="wisdom-card">
        <div class="wisdom-sharky">
          <div class="sharky-sprite teaching">🦈</div>
        </div>
        <div class="wisdom-header">
          <div class="wisdom-icon">💡</div>
          <div class="wisdom-title">Real Talk from Sharky</div>
        </div>
        <div class="wisdom-tactic">
          <span class="tactic-label">Tactic used:</span>
          <span class="tactic-name">${tacticNames[tactic] || tactic}</span>
        </div>
        <div class="wisdom-text">${wisdomText}</div>
        <button class="wisdom-close-btn" id="wisdomCloseBtn">Got it</button>
      </div>
    `;

    modal.classList.remove('hidden');

    // Play a sound
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play('warning');
    }

    document.getElementById('wisdomCloseBtn')?.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  },

  // ============================================================
  // CALL BS ON RARE EVENTS
  // ============================================================
  
  handleCallBS() {
    const event = Shop.state.rareEvent;
    if (!event || !event.isScam) return;

    // They caught the scam!
    this.sharkyMood = 'caught';
    
    const responses = [
      "Ha! You got me. That was a test... which you passed.",
      "Alright, alright. You're sharper than most.",
      "...Fair enough. The 'limited time' thing was fake. Respect.",
      "Okay, you called it. I'll tone it down. For now."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    this.updateSharkyDialogue('custom', { text: response });

    // Remove the rare event
    Shop.state.rareEvent = null;
    Shop.saveState();

    // Play success sound
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play('correct');
    }

    // Visual celebration
    if (typeof Interactions !== 'undefined') {
      const btn = document.getElementById('callBSBtn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        Interactions.particleBurst(rect.left + rect.width / 2, rect.top, {
          colors: ['#d4af37', '#ffd700', '#c9a456'],
          count: 8
        });
      }
    }

    // Award reward for catching the scam
    let result;
    if (typeof Economy !== 'undefined') {
      result = Economy.grantCallBSReward();
      this.showToast(`+${result.coins} SC and +${result.xp} XP for spotting the scam!`, 'success');
    } else {
      State.addCoins(25);
      this.showToast('+25 SC for spotting the scam!', 'success');
    }

    // Re-render
    setTimeout(() => this.render(), 1000);
  },

  // ============================================================
  // SHARKY DIALOGUE UPDATES
  // ============================================================
  
  updateSharkyDialogue(type, data = {}) {
    const dialogueEl = document.getElementById('sharkyDialogue');
    if (!dialogueEl) return;

    let text = '';

    switch (type) {
      case 'atItem':
        const lines = Shop.dialogue.browsing.atItem;
        text = lines[Math.floor(Math.random() * lines.length)].replace('{item}', data.item);
        break;
      case 'confirm':
        const confirmLines = Shop.dialogue.buying.confirm;
        text = confirmLines[Math.floor(Math.random() * confirmLines.length)];
        break;
      case 'leaving':
        const leaveLines = Shop.dialogue.leaving.noPurchase;
        text = leaveLines[Math.floor(Math.random() * leaveLines.length)];
        break;
      case 'custom':
        text = data.text;
        break;
      default:
        text = Shop.getGreeting();
    }

    dialogueEl.querySelector('.dialogue-text').textContent = text;
    
    // Animate
    dialogueEl.classList.add('speaking');
    setTimeout(() => dialogueEl.classList.remove('speaking'), 300);
  },

  // ============================================================
  // UTILITIES
  // ============================================================
  
  updateCoins() {
    const coinsEl = document.getElementById('shopCoins');
    if (coinsEl) {
      const coins = State.current?.sharkCoins || 0;
      if (typeof Interactions !== 'undefined') {
        Interactions.countUp(coinsEl, parseInt(coinsEl.textContent.replace(/,/g, '')), coins, 500);
      } else {
        coinsEl.textContent = coins.toLocaleString();
      }
    }
  },

  showToast(message, type = 'info') {
    const existing = document.querySelector('.shop-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `shop-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },

  // ============================================================
  // EVENT LISTENERS
  // ============================================================
  
  attachEventListeners() {
    // Category tabs
    document.querySelectorAll('.shop-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentCategory = tab.dataset.category;
        this.render();
        
        if (typeof AudioManager !== 'undefined') {
          AudioManager.play('tap');
        }
      });
    });

    // Deal cards
    document.querySelectorAll('.deal-card').forEach(card => {
      card.addEventListener('click', () => {
        const dealIndex = parseInt(card.dataset.dealIndex);
        const deal = Shop.state.featuredDeals[dealIndex];
        if (deal) {
          this.showItemModal(deal.item.id, dealIndex);
        }
        
        if (typeof AudioManager !== 'undefined') {
          AudioManager.play('click');
        }
      });
    });

    // Regular item cards
    document.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', () => {
        const itemId = card.dataset.itemId;
        this.showItemModal(itemId);
        
        if (typeof AudioManager !== 'undefined') {
          AudioManager.play('click');
        }
      });
    });

    // Call BS button
    document.getElementById('callBSBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleCallBS();
    });
  }
};

window.ShopUI = ShopUI;
console.log('shop-ui.js loaded');
