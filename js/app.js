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
    // Enter Simulation button - launches JRPG sim
    document.getElementById('enterSimBtn')?.addEventListener('click', () => {
      this.launchJRPGSim();
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
    
    // JRPG Sim exit button
    document.getElementById('simExitBtn')?.addEventListener('click', () => {
      if (confirm('Exit simulation? Progress will be lost.')) {
        this.closeJRPGSim();
      }
    });
  },

  /**
   * Launch JRPG style simulation
   */
  launchJRPGSim() {
    console.log('launchJRPGSim called');
    const simContainer = document.getElementById('jrpgSim');
    console.log('simContainer found:', simContainer ? 'yes' : 'no');
    
    if (simContainer) {
      simContainer.classList.remove('hidden');
      document.querySelector('.bottom-nav').style.display = 'none';
      
      // Setup exit button listener
      const exitBtn = document.getElementById('simExitBtn');
      if (exitBtn) {
        // Remove old listeners by cloning
        const newExitBtn = exitBtn.cloneNode(true);
        exitBtn.parentNode.replaceChild(newExitBtn, exitBtn);
        
        // Add new listener
        newExitBtn.addEventListener('click', () => {
          console.log('Exit button clicked');
          if (confirm('Exit simulation? Progress will be lost.')) {
            this.closeJRPGSim();
          }
        });
      }
      
      // Initialize the car dealer sim
      console.log('CarDealerSim exists:', typeof CarDealerSim !== 'undefined');
      if (typeof CarDealerSim !== 'undefined') {
        CarDealerSim.init();
      } else {
        console.error('CarDealerSim not found!');
      }
    }
  },

  /**
   * Close JRPG simulation
   */
  closeJRPGSim() {
    const simContainer = document.getElementById('jrpgSim');
    if (simContainer) {
      simContainer.classList.add('hidden');
      document.querySelector('.bottom-nav').style.display = 'flex';
    }
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
    const skillMap = document.getElementById('skillMap');
    if (!skillMap) return;

    // Check if Skills module is loaded
    if (typeof Skills === 'undefined') {
      console.error('Skills module not loaded');
      return;
    }

    // Clear and setup base structure
    skillMap.innerHTML = `
      <div class="map-grid"></div>
      <svg class="connection-lines" id="connectionLines"></svg>
      <div class="branch-labels"></div>
      <div class="center-emblem">🦈</div>
    `;

    // Get player state
    const playerLevel = State.current?.level || 1;
    const unlockedNodes = State.getUnlockedNodes();
    const masteredNodes = State.getMasteredNodes();

    // Get recommended node
    const recommended = Skills.getRecommendedNode(playerLevel, unlockedNodes);

    // Render all skill nodes
    const nodeElements = {};
    Object.values(Skills.nodes).forEach(skill => {
      // Determine node state
      let nodeState = Skills.getNodeState(skill.id, playerLevel, unlockedNodes, masteredNodes);
      
      // Mark recommended
      if (recommended && recommended.id === skill.id) {
        nodeState = 'recommended';
      }

      const node = document.createElement('div');
      node.className = `snode ${nodeState}`;
      if (skill.isMaster) node.classList.add('master-node');
      if (skill.specialization) node.classList.add(`spec-${skill.specialization}`);
      node.style.cssText = `top: ${skill.position.y}px; left: ${skill.position.x}px;`;
      node.dataset.skillId = skill.id;
      node.dataset.branch = skill.branch;
      node.innerHTML = `<div class="snode-shape">${skill.icon}</div>`;
      skillMap.appendChild(node);

      // Store for connection lines
      nodeElements[skill.id] = {
        el: node,
        x: skill.position.x + 27, // center of node
        y: skill.position.y + 27,
        skill: skill
      };

      // Store skill data for detail panel
      node._skillData = skill;
      node._nodeState = nodeState;
    });

    // Draw connection lines
    this.drawConnectionLines(nodeElements);

    // Add branch labels
    this.addBranchLabels(skillMap);

    // Add click handlers
    skillMap.querySelectorAll('.snode').forEach(node => {
      node.addEventListener('click', () => {
        this.showSkillDetail(node._skillData, node._nodeState);
      });
    });
  },

  /**
   * Draw SVG connection lines between nodes
   */
  drawConnectionLines(nodeElements) {
    const svg = document.getElementById('connectionLines');
    if (!svg) return;

    let paths = '';
    
    // Branch colors
    const branchColors = {
      defense: 'rgba(45, 122, 156, 0.6)',
      wealth: 'rgba(61, 155, 122, 0.6)',
      purchase: 'rgba(184, 107, 77, 0.6)',
      income: 'rgba(184, 155, 77, 0.6)',
      systems: 'rgba(107, 91, 140, 0.6)'
    };

    Object.values(Skills.nodes).forEach(skill => {
      if (skill.prerequisites && skill.prerequisites.length > 0) {
        const toNode = nodeElements[skill.id];
        if (!toNode) return;

        skill.prerequisites.forEach(prereqId => {
          const fromNode = nodeElements[prereqId];
          if (!fromNode) return;

          const color = branchColors[skill.branch] || 'rgba(77, 216, 232, 0.4)';
          
          // Draw curved line
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const cx = fromNode.x + dx / 2;
          const cy = fromNode.y + dy / 2;

          paths += `
            <path 
              d="M ${fromNode.x} ${fromNode.y} Q ${cx} ${fromNode.y}, ${cx} ${cy} T ${toNode.x} ${toNode.y}"
              stroke="${color}"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
            />
          `;
        });
      }
    });

    svg.innerHTML = paths;
  },

  /**
   * Add branch labels to the skill map
   */
  addBranchLabels(skillMap) {
    const labels = [
      { branch: 'defense', text: '🛡️ DEFENSE', x: 50, y: 60, color: '#2d7a9c' },
      { branch: 'wealth', text: '📈 WEALTH', x: 170, y: 60, color: '#3d9b7a' },
      { branch: 'purchase', text: '🏷️ PURCHASES', x: 350, y: 60, color: '#b86b4d' },
      { branch: 'income', text: '💰 INCOME', x: 530, y: 60, color: '#b89b4d' },
      { branch: 'systems', text: '⚙️ SYSTEMS', x: 650, y: 60, color: '#6b5b8c' }
    ];

    const labelContainer = skillMap.querySelector('.branch-labels');
    if (!labelContainer) return;

    labels.forEach(label => {
      const el = document.createElement('div');
      el.className = 'branch-label';
      el.style.cssText = `
        position: absolute;
        left: ${label.x}px;
        top: ${label.y}px;
        font-family: 'Orbitron', sans-serif;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: ${label.color};
        text-shadow: 0 0 10px ${label.color}40;
        white-space: nowrap;
      `;
      el.textContent = label.text;
      labelContainer.appendChild(el);
    });

    // Add specialization labels for Purchase branch
    const specLabels = [
      { text: '🚗', x: 310, y: 295, tip: 'Vehicles' },
      { text: '🏠', x: 450, y: 295, tip: 'Housing' }
    ];

    specLabels.forEach(spec => {
      const el = document.createElement('div');
      el.className = 'spec-label';
      el.style.cssText = `
        position: absolute;
        left: ${spec.x}px;
        top: ${spec.y}px;
        font-size: 16px;
        opacity: 0.7;
      `;
      el.textContent = spec.text;
      el.title = spec.tip;
      labelContainer.appendChild(el);
    });
  },

  /**
   * Show skill detail panel
   */
  showSkillDetail(skill, nodeState) {
    document.getElementById('detailIcon').textContent = skill.icon;
    document.getElementById('detailName').textContent = skill.name;
    document.getElementById('detailTier').textContent = `TIER ${skill.tier} • ${skill.branch.toUpperCase()}`;
    document.getElementById('detailReward').textContent = `+${skill.reward} SC`;
    
    // Update threat box with tactic info
    const threatNm = document.getElementById('detailThreat');
    const threatQt = document.getElementById('detailQuote');
    if (threatNm) threatNm.textContent = skill.tactic || 'Manipulation Tactic';
    if (threatQt) threatQt.textContent = skill.quote ? `"${skill.quote}"` : '';

    const startBtn = document.getElementById('startSkillBtn');
    
    if (nodeState === 'locked') {
      startBtn.textContent = `🔒 UNLOCK AT LEVEL ${skill.unlockLevel}`;
      startBtn.classList.add('locked-btn');
    } else if (nodeState === 'mastered') {
      startBtn.innerHTML = '✓ MASTERED';
      startBtn.classList.add('locked-btn');
    } else {
      startBtn.innerHTML = 'BEGIN TRAINING <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
      startBtn.classList.remove('locked-btn');
      startBtn.onclick = () => {
        document.getElementById('detailPanel').classList.remove('open');
        this.startLesson(skill);
      };
    }

    document.getElementById('detailPanel').classList.add('open');
  },

  /**
   * Start a lesson for a skill
   */
  startLesson(skill) {
    if (skill.lesson) {
      // Launch lesson system
      if (typeof Lessons !== 'undefined') {
        Lessons.start(skill);
      } else {
        console.log('Lesson system not implemented yet. Skill:', skill.id);
        // For now, just mark it as complete for testing
        // State.completeLesson(skill.lesson.id, skill.id, skill.reward);
        alert(`Lesson "${skill.lesson.title}" coming soon!`);
      }
    } else {
      alert('This skill has no lesson yet.');
    }
  },

  /**
   * Setup detail panel
   */
  setupDetailPanel() {
    // Close button
    document.getElementById('panelX')?.addEventListener('click', () => {
      document.getElementById('detailPanel').classList.remove('open');
    });

    // Start training button - handler is set dynamically in showSkillDetail

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
