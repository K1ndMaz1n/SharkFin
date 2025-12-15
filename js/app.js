/**
 * APP.JS
 * Main application controller
 * Handles navigation, UI interactions, and ties everything together
 */

const App = {
  // Current active page
  currentPage: 'home',

  /**
   * Initialize the app
   */
  init() {
    this.setupNavigation();
    this.setupEventListeners();
    this.setupSimulationPage();
    this.setupSkillTree();
    console.log('SharkFin App initialized');
  },

  /**
   * Setup bottom navigation
   */
  setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        this.showPage(page);
      });
    });
  },

  /**
   * Show a specific page
   */
  showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show target page
    const pageMap = {
      'home': 'homePage',
      'simulation': 'simulationPage',
      'intel': 'intelPage',
      'shop': 'shopPage',
      'profile': 'profilePage',
      'pod': 'shopPage' // Placeholder - pod goes to shop for now
    };

    const targetId = pageMap[pageName];
    if (targetId) {
      document.getElementById(targetId).classList.add('active');
    }

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.page === pageName) {
        item.classList.add('active');
      }
    });

    // Hide nav on simulation page
    const nav = document.querySelector('.bottom-nav');
    if (pageName === 'simulation') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
    }

    // Center skill tree when opening intel page
    if (pageName === 'intel') {
      setTimeout(() => {
        const gridScroll = document.getElementById('gridScroll');
        if (gridScroll) {
          gridScroll.scrollLeft = 400 - (gridScroll.offsetWidth / 2);
          gridScroll.scrollTop = 450 - (gridScroll.offsetHeight / 2);
        }
      }, 50);
    }

    this.currentPage = pageName;
  },

  /**
   * Setup general event listeners
   */
  setupEventListeners() {
    // Enter Simulation button
    document.getElementById('enterSimBtn')?.addEventListener('click', () => {
      const scenario = Simulations.getActiveScenario();
      if (scenario) {
        Simulations.start(scenario.id);
      }
    });

    // Skill tree button
    document.getElementById('skillTreeBtn')?.addEventListener('click', () => {
      this.showPage('intel');
    });

    // Radar card click (if unlocked)
    document.getElementById('radarCard')?.addEventListener('click', (e) => {
      const radarCard = document.getElementById('radarCard');
      if (!radarCard.classList.contains('radar-locked')) {
        this.showPage('intel');
      }
    });

    // Back buttons
    document.getElementById('intelBackBtn')?.addEventListener('click', () => {
      this.showPage('home');
    });
  },

  /**
   * Setup simulation page interactions
   */
  setupSimulationPage() {
    // Back button
    document.getElementById('simBackBtn')?.addEventListener('click', () => {
      if (confirm('Exit simulation? Progress will be lost.')) {
        this.showPage('home');
      }
    });

    // Continue/Finish button
    document.getElementById('resultNextBtn')?.addEventListener('click', () => {
      Simulations.continue();
    });
  },

  /**
   * Setup skill tree / intel page
   */
  setupSkillTree() {
    this.setupZoomControls();
    this.setupDragScroll();
    this.setupSkillNodes();
    this.setupDetailPanel();
  },

  /**
   * Zoom controls for skill tree
   */
  setupZoomControls() {
    const zoomContainer = document.getElementById('zoomContainer');
    const gridScroll = document.getElementById('gridScroll');
    let currentZoom = 1;
    const minZoom = 0.4;
    const maxZoom = 1.5;
    const zoomStep = 0.15;

    const setZoom = (newZoom) => {
      currentZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
      if (zoomContainer) {
        zoomContainer.style.transform = `scale(${currentZoom})`;
      }
      const zoomLevel = document.getElementById('zoomLevel');
      if (zoomLevel) {
        zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
      }
    };

    document.getElementById('zoomIn')?.addEventListener('click', () => setZoom(currentZoom + zoomStep));
    document.getElementById('zoomOut')?.addEventListener('click', () => setZoom(currentZoom - zoomStep));
    document.getElementById('zoomReset')?.addEventListener('click', () => {
      setZoom(1);
      if (gridScroll) {
        gridScroll.scrollLeft = 400 - gridScroll.clientWidth / 2;
        gridScroll.scrollTop = 450 - gridScroll.clientHeight / 2;
      }
    });

    // Pinch to zoom
    let initialPinchDistance = 0;
    let initialPinchZoom = 1;

    gridScroll?.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
        initialPinchZoom = currentZoom;
      }
    }, { passive: true });

    gridScroll?.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = distance / initialPinchDistance;
        setZoom(initialPinchZoom * scale);
      }
    }, { passive: true });
  },

  /**
   * Drag to scroll skill tree
   */
  setupDragScroll() {
    const gridScroll = document.getElementById('gridScroll');
    if (!gridScroll) return;

    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    gridScroll.addEventListener('mousedown', (e) => {
      if (e.target.closest('.snode')) return;
      isDragging = true;
      gridScroll.style.cursor = 'grabbing';
      startX = e.pageX;
      startY = e.pageY;
      scrollLeft = gridScroll.scrollLeft;
      scrollTop = gridScroll.scrollTop;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      gridScroll.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      gridScroll.scrollLeft = scrollLeft - (e.pageX - startX);
      gridScroll.scrollTop = scrollTop - (e.pageY - startY);
    });

    // Touch drag
    let touchStartX, touchStartY;
    gridScroll.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      touchStartX = e.touches[0].pageX;
      touchStartY = e.touches[0].pageY;
      scrollLeft = gridScroll.scrollLeft;
      scrollTop = gridScroll.scrollTop;
    }, { passive: true });

    gridScroll.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 1) return;
      gridScroll.scrollLeft = scrollLeft - (e.touches[0].pageX - touchStartX);
      gridScroll.scrollTop = scrollTop - (e.touches[0].pageY - touchStartY);
    }, { passive: true });
  },

  /**
   * Setup skill node interactions
   */
  setupSkillNodes() {
    // Define skills
    const skills = [
      // Defense territory (top-left)
      { id: 'fomo', icon: '😰', name: 'FOMO Defense', tier: 'TIER 2 • DEFENSE', x: 120, y: 160, state: 'unlocked' },
      { id: 'urgency', icon: '⏰', name: 'Urgency Tactics', tier: 'TIER 1 • DEFENSE', x: 200, y: 200, state: 'mastered' },
      { id: 'scarcity', icon: '📦', name: 'Artificial Scarcity', tier: 'TIER 2 • DEFENSE', x: 280, y: 170, state: 'unlocked' },
      { id: 'social', icon: '👥', name: 'Social Proof', tier: 'TIER 3 • DEFENSE', x: 150, y: 260, state: 'locked' },
      
      // Wealth territory (top-right)
      { id: 'compound', icon: '📈', name: 'Compound Interest', tier: 'TIER 1 • WEALTH', x: 520, y: 170, state: 'recommended' },
      { id: 'index', icon: '📊', name: 'Index Funds', tier: 'TIER 2 • WEALTH', x: 600, y: 200, state: 'locked' },
      { id: 'diversify', icon: '🎯', name: 'Diversification', tier: 'TIER 2 • WEALTH', x: 550, y: 260, state: 'locked' },
      
      // Income territory (bottom-left)
      { id: 'paycheck', icon: '💵', name: 'Paycheck Anatomy', tier: 'TIER 1 • INCOME', x: 100, y: 610, state: 'unlocked' },
      { id: 'taxes', icon: '🏛️', name: 'Tax Basics', tier: 'TIER 2 • INCOME', x: 180, y: 660, state: 'locked' },
      { id: 'negotiate', icon: '🤝', name: 'Salary Negotiation', tier: 'TIER 3 • INCOME', x: 260, y: 620, state: 'locked' },
      
      // Purchase territory (bottom-right)
      { id: 'anchoring', icon: '⚓', name: 'Price Anchoring', tier: 'TIER 1 • PURCHASE', x: 540, y: 620, state: 'unlocked' },
      { id: 'upsell', icon: '📢', name: 'Upsell Defense', tier: 'TIER 2 • PURCHASE', x: 620, y: 660, state: 'locked' },
      { id: 'warranty', icon: '🛡️', name: 'Warranty Traps', tier: 'TIER 2 • PURCHASE', x: 660, y: 610, state: 'locked' },
      
      // Systems territory (bottom-center)
      { id: 'credit', icon: '💳', name: 'Credit Scores', tier: 'TIER 1 • SYSTEMS', x: 350, y: 780, state: 'unlocked' },
      { id: 'insurance', icon: '🔒', name: 'Insurance Basics', tier: 'TIER 2 • SYSTEMS', x: 450, y: 780, state: 'locked' }
    ];

    // Render skills
    const skillMap = document.getElementById('skillMap');
    if (!skillMap) return;

    // Add background elements first
    skillMap.innerHTML = `
      <div class="map-grid"></div>
      <div class="center-emblem">🦈</div>
    `;

    // Add skill nodes
    skills.forEach(skill => {
      const node = document.createElement('div');
      node.className = `snode ${skill.state}`;
      node.style.cssText = `top: ${skill.y}px; left: ${skill.x}px;`;
      node.dataset.skillId = skill.id;
      node.innerHTML = `<div class="snode-shape">${skill.icon}</div>`;
      skillMap.appendChild(node);

      // Store skill data for detail panel
      node._skillData = skill;
    });

    // Add click handlers
    skillMap.querySelectorAll('.snode').forEach(node => {
      node.addEventListener('click', () => {
        this.showSkillDetail(node._skillData, node.classList.contains('locked'));
      });
    });
  },

  /**
   * Show skill detail panel
   */
  showSkillDetail(skill, isLocked) {
    document.getElementById('detailIcon').textContent = skill.icon;
    document.getElementById('detailName').textContent = skill.name;
    document.getElementById('detailTier').textContent = skill.tier;
    document.getElementById('detailReward').textContent = '+350 SC'; // TODO: Dynamic

    const startBtn = document.getElementById('startSkillBtn');
    if (isLocked) {
      startBtn.textContent = '🔒 LOCKED';
      startBtn.classList.add('locked-btn');
    } else {
      startBtn.innerHTML = 'BEGIN TRAINING <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      startBtn.classList.remove('locked-btn');
    }

    document.getElementById('detailPanel').classList.add('open');
  },

  /**
   * Setup detail panel
   */
  setupDetailPanel() {
    // Close button
    document.getElementById('panelX')?.addEventListener('click', () => {
      document.getElementById('detailPanel').classList.remove('open');
    });

    // Start training button
    document.getElementById('startSkillBtn')?.addEventListener('click', () => {
      const btn = document.getElementById('startSkillBtn');
      if (!btn.classList.contains('locked-btn')) {
        // TODO: Start skill-specific training
        document.getElementById('detailPanel').classList.remove('open');
        Simulations.start('crypto_rugpull'); // Placeholder
      }
    });

    // Heat map toggle
    document.getElementById('heatBtn')?.addEventListener('click', function() {
      this.classList.toggle('on');
      document.getElementById('gridArea')?.classList.toggle('heatmap');
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for other modules to initialize
  setTimeout(() => App.init(), 30);
});
