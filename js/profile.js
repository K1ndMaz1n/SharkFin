/**
 * PROFILE.JS
 * Profile page - stats, cosmetics, achievements, settings
 */

const Profile = {
  // ============================================================
  // ACHIEVEMENTS DEFINITIONS
  // ============================================================
  
  achievements: {
    // Streak achievements
    streak_3: {
      id: 'streak_3',
      name: 'Getting Started',
      description: '3-day streak',
      icon: '🔥',
      category: 'streak',
      requirement: { type: 'streak', value: 3 }
    },
    streak_7: {
      id: 'streak_7',
      name: 'Week Warrior',
      description: '7-day streak',
      icon: '🔥',
      category: 'streak',
      requirement: { type: 'streak', value: 7 }
    },
    streak_30: {
      id: 'streak_30',
      name: 'Monthly Master',
      description: '30-day streak',
      icon: '🔥',
      category: 'streak',
      requirement: { type: 'streak', value: 30 }
    },
    streak_100: {
      id: 'streak_100',
      name: 'Centurion',
      description: '100-day streak',
      icon: '💯',
      category: 'streak',
      requirement: { type: 'streak', value: 100 }
    },

    // Lesson achievements
    first_lesson: {
      id: 'first_lesson',
      name: 'First Blood',
      description: 'Complete your first lesson',
      icon: '📚',
      category: 'lessons',
      requirement: { type: 'lessons', value: 1 }
    },
    lessons_10: {
      id: 'lessons_10',
      name: 'Eager Learner',
      description: 'Complete 10 lessons',
      icon: '📖',
      category: 'lessons',
      requirement: { type: 'lessons', value: 10 }
    },
    lessons_25: {
      id: 'lessons_25',
      name: 'Knowledge Seeker',
      description: 'Complete 25 lessons',
      icon: '🎓',
      category: 'lessons',
      requirement: { type: 'lessons', value: 25 }
    },

    // Grade achievements
    first_s_rank: {
      id: 'first_s_rank',
      name: 'Perfectionist',
      description: 'Get your first S-rank',
      icon: '⭐',
      category: 'grades',
      requirement: { type: 'perfect', value: 1 }
    },
    s_rank_5: {
      id: 's_rank_5',
      name: 'Overachiever',
      description: 'Get 5 S-ranks',
      icon: '🌟',
      category: 'grades',
      requirement: { type: 'perfect', value: 5 }
    },
    s_rank_10: {
      id: 's_rank_10',
      name: 'Excellence',
      description: 'Get 10 S-ranks',
      icon: '💫',
      category: 'grades',
      requirement: { type: 'perfect', value: 10 }
    },

    // Coin achievements
    coins_1000: {
      id: 'coins_1000',
      name: 'Saver',
      description: 'Earn 1,000 total coins',
      icon: '💰',
      category: 'coins',
      requirement: { type: 'totalCoins', value: 1000 }
    },
    coins_5000: {
      id: 'coins_5000',
      name: 'Wealthy',
      description: 'Earn 5,000 total coins',
      icon: '💎',
      category: 'coins',
      requirement: { type: 'totalCoins', value: 5000 }
    },
    coins_10000: {
      id: 'coins_10000',
      name: 'Shark Tank',
      description: 'Earn 10,000 total coins',
      icon: '🏦',
      category: 'coins',
      requirement: { type: 'totalCoins', value: 10000 }
    },

    // Level achievements
    level_5: {
      id: 'level_5',
      name: 'Rising Shark',
      description: 'Reach Level 5',
      icon: '📈',
      category: 'level',
      requirement: { type: 'level', value: 5 }
    },
    level_10: {
      id: 'level_10',
      name: 'Tiger Shark',
      description: 'Reach Level 10',
      icon: '🦈',
      category: 'level',
      requirement: { type: 'level', value: 10 }
    },
    level_20: {
      id: 'level_20',
      name: 'Great White',
      description: 'Reach Level 20',
      icon: '👑',
      category: 'level',
      requirement: { type: 'level', value: 20 }
    },

    // Branch mastery achievements
    defense_master: {
      id: 'defense_master',
      name: 'Defense Master',
      description: 'Master all Defense skills',
      icon: '🛡️',
      category: 'mastery',
      requirement: { type: 'branch', value: 'defense' }
    },
    wealth_master: {
      id: 'wealth_master',
      name: 'Wealth Builder',
      description: 'Master all Wealth skills',
      icon: '💹',
      category: 'mastery',
      requirement: { type: 'branch', value: 'wealth' }
    },
    purchase_master: {
      id: 'purchase_master',
      name: 'Smart Shopper',
      description: 'Master all Purchase skills',
      icon: '🛒',
      category: 'mastery',
      requirement: { type: 'branch', value: 'purchase' }
    },
    income_master: {
      id: 'income_master',
      name: 'Income Optimizer',
      description: 'Master all Income skills',
      icon: '💵',
      category: 'mastery',
      requirement: { type: 'branch', value: 'income' }
    },
    systems_master: {
      id: 'systems_master',
      name: 'Systems Expert',
      description: 'Master all Systems skills',
      icon: '⚙️',
      category: 'mastery',
      requirement: { type: 'branch', value: 'systems' }
    },

    // Special achievements
    call_bs_first: {
      id: 'call_bs_first',
      name: 'Skeptic',
      description: 'Call BS on Sharky for the first time',
      icon: '🤔',
      category: 'special',
      requirement: { type: 'callBS', value: 1 }
    },
    call_bs_10: {
      id: 'call_bs_10',
      name: 'Scam Spotter',
      description: 'Call BS on Sharky 10 times',
      icon: '🔍',
      category: 'special',
      requirement: { type: 'callBS', value: 10 }
    },
    first_purchase: {
      id: 'first_purchase',
      name: 'Window Shopper',
      description: 'Make your first shop purchase',
      icon: '🛍️',
      category: 'special',
      requirement: { type: 'purchases', value: 1 }
    }
  },

  // ============================================================
  // RANK TITLES BY LEVEL
  // ============================================================
  
  rankTitles: {
    1: 'Minnow',
    2: 'Guppy',
    3: 'Sardine',
    4: 'Mackerel',
    5: 'Barracuda',
    6: 'Blue Shark',
    7: 'Mako Shark',
    8: 'Hammerhead',
    9: 'Bull Shark',
    10: 'Tiger Shark',
    11: 'Thresher',
    12: 'Whale Shark',
    13: 'Megamouth',
    14: 'Goblin Shark',
    15: 'Great White',
    16: 'Apex Predator',
    17: 'Ocean Master',
    18: 'Leviathan',
    19: 'Sea Legend',
    20: 'Megalodon'
  },

  // ============================================================
  // RENDER PROFILE PAGE
  // ============================================================
  
  render() {
    const profilePage = document.getElementById('profilePage');
    if (!profilePage) return;

    const state = State.current;
    const level = state.level || 1;
    const xp = state.xp || 0;
    const coins = state.sharkCoins || 0;
    const streak = state.streak || 0;
    const stats = state.stats || {};
    
    // Get level progress
    const levelProgress = typeof Economy !== 'undefined' 
      ? Economy.getLevelProgress() 
      : { current: 0, needed: 100, percent: 0 };
    
    // Get rank title
    const rankTitle = this.rankTitles[level] || 'Shark';
    
    // Get equipped cosmetics
    const equipped = this.getEquippedCosmetics();
    
    // Get unlocked achievements
    const unlockedAchievements = this.getUnlockedAchievements();
    
    // Calculate multiplier
    const multiplier = typeof Economy !== 'undefined' ? Economy.getMultiplier() : 1;

    profilePage.innerHTML = `
      <div class="profile-container">
        <!-- Avatar Section -->
        <div class="profile-avatar-section">
          <div class="profile-avatar ${equipped.frame ? 'has-frame' : ''}" data-frame="${equipped.frame || ''}">
            <div class="avatar-shark ${equipped.skin || 'default'}">🦈</div>
            ${equipped.frame ? `<div class="avatar-frame frame-${equipped.frame}"></div>` : ''}
          </div>
          
          ${equipped.title ? `
            <div class="profile-title">${this.getTitleName(equipped.title)}</div>
          ` : ''}
          
          <div class="profile-rank">
            <span class="rank-level">LV.${level}</span>
            <span class="rank-title">${rankTitle.toUpperCase()}</span>
          </div>
          
          <div class="profile-xp-bar">
            <div class="xp-fill" style="width: ${levelProgress.percent}%"></div>
            <span class="xp-text">${levelProgress.current} / ${levelProgress.needed} XP</span>
          </div>
          
          <div class="profile-currency-row">
            <div class="currency-item coins">
              <span class="currency-icon">◆</span>
              <span class="currency-value">${coins.toLocaleString()}</span>
              <span class="currency-label">SC</span>
            </div>
            <div class="currency-item streak ${streak >= 7 ? 'hot' : ''}">
              <span class="currency-icon">🔥</span>
              <span class="currency-value">${streak}</span>
              <span class="currency-label">day${streak !== 1 ? 's' : ''}</span>
            </div>
            ${multiplier > 1 ? `
              <div class="currency-item multiplier">
                <span class="currency-icon">⚡</span>
                <span class="currency-value">${Math.round(multiplier * 100)}%</span>
                <span class="currency-label">bonus</span>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Stats Section -->
        <div class="profile-section">
          <div class="section-header">
            <span class="section-title">STATS</span>
          </div>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">${stats.lessonsCompleted || 0}</span>
              <span class="stat-label">Lessons</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${stats.tacticsResisted || 0}</span>
              <span class="stat-label">Tactics Resisted</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${stats.perfectScenarios || 0}</span>
              <span class="stat-label">Perfect Scores</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">${(stats.totalCoinsEarned || 0).toLocaleString()}</span>
              <span class="stat-label">Total Earned</span>
            </div>
          </div>
        </div>

        <!-- Branch Progress Section -->
        <div class="profile-section">
          <div class="section-header">
            <span class="section-title">SKILL BRANCHES</span>
          </div>
          <div class="branch-progress-list">
            ${this.renderBranchProgress()}
          </div>
        </div>

        <!-- Achievements Section -->
        <div class="profile-section">
          <div class="section-header">
            <span class="section-title">ACHIEVEMENTS</span>
            <span class="section-count">${unlockedAchievements.length} / ${Object.keys(this.achievements).length}</span>
          </div>
          <div class="achievements-grid">
            ${this.renderAchievements(unlockedAchievements)}
          </div>
        </div>

        <!-- Equipped Cosmetics Section -->
        <div class="profile-section">
          <div class="section-header">
            <span class="section-title">EQUIPPED</span>
            <button class="section-action" id="customizeBtn">Customize →</button>
          </div>
          <div class="equipped-list">
            <div class="equipped-item">
              <span class="equipped-label">Frame</span>
              <span class="equipped-value">${equipped.frame ? this.getItemName(equipped.frame) : 'None'}</span>
            </div>
            <div class="equipped-item">
              <span class="equipped-label">Title</span>
              <span class="equipped-value">${equipped.title ? this.getTitleName(equipped.title) : 'None'}</span>
            </div>
            <div class="equipped-item">
              <span class="equipped-label">Skin</span>
              <span class="equipped-value">${equipped.skin ? this.getItemName(equipped.skin) : 'Classic Blue'}</span>
            </div>
            <div class="equipped-item">
              <span class="equipped-label">Background</span>
              <span class="equipped-value">${equipped.background ? this.getItemName(equipped.background) : 'Default'}</span>
            </div>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="profile-section">
          <div class="section-header">
            <span class="section-title">SETTINGS</span>
          </div>
          <div class="settings-list">
            <div class="setting-item" id="soundSetting">
              <span class="setting-icon">🔊</span>
              <span class="setting-label">Sound</span>
              <span class="setting-value">${typeof AudioManager !== 'undefined' && AudioManager.enabled ? 'ON' : 'OFF'}</span>
              <div class="setting-toggle ${typeof AudioManager !== 'undefined' && AudioManager.enabled ? 'on' : ''}"></div>
            </div>
            <div class="setting-item danger" id="resetProgress">
              <span class="setting-icon">🗑️</span>
              <span class="setting-label">Reset All Progress</span>
              <span class="setting-arrow">→</span>
            </div>
          </div>
        </div>

        <!-- App Info -->
        <div class="profile-footer">
          <div class="app-version">SharkFin v1.0</div>
          <div class="app-tagline">Hunt, don't get hunted.</div>
        </div>
      </div>

      <!-- Customize Modal -->
      <div class="customize-modal hidden" id="customizeModal">
        <div class="modal-backdrop" id="customizeBackdrop"></div>
        <div class="modal-content" id="customizeContent"></div>
      </div>
    `;

    this.attachEventListeners();
  },

  // ============================================================
  // RENDER HELPERS
  // ============================================================
  
  renderBranchProgress() {
    const branches = [
      { id: 'defense', name: 'Defense', icon: '🛡️', color: '#c75d5d' },
      { id: 'wealth', name: 'Wealth', icon: '💹', color: '#2ab5a0' },
      { id: 'purchase', name: 'Purchase', icon: '🛒', color: '#d4af37' },
      { id: 'income', name: 'Income', icon: '💵', color: '#4dd8e8' },
      { id: 'systems', name: 'Systems', icon: '⚙️', color: '#6b5b8c' }
    ];

    return branches.map(branch => {
      const progress = this.getBranchProgress(branch.id);
      return `
        <div class="branch-progress-item">
          <div class="branch-info">
            <span class="branch-icon">${branch.icon}</span>
            <span class="branch-name">${branch.name}</span>
          </div>
          <div class="branch-bar">
            <div class="branch-fill" style="width: ${progress.percent}%; background: ${branch.color}"></div>
          </div>
          <span class="branch-count">${progress.mastered}/${progress.total}</span>
        </div>
      `;
    }).join('');
  },

  getBranchProgress(branchId) {
    if (typeof Skills === 'undefined') return { mastered: 0, total: 0, percent: 0 };
    
    const branchSkills = Object.values(Skills.nodes).filter(s => s.branch === branchId);
    const masteredSkills = State.getMasteredNodes?.() || [];
    const mastered = branchSkills.filter(s => masteredSkills.includes(s.id)).length;
    const total = branchSkills.length;
    const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
    
    return { mastered, total, percent };
  },

  renderAchievements(unlocked) {
    const achievementList = Object.values(this.achievements);
    
    // Show first 8 achievements (mix of unlocked and locked)
    const displayed = achievementList.slice(0, 12);
    
    return displayed.map(achievement => {
      const isUnlocked = unlocked.includes(achievement.id);
      return `
        <div class="achievement-badge ${isUnlocked ? 'unlocked' : 'locked'}" 
             title="${achievement.name}: ${achievement.description}">
          <span class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</span>
        </div>
      `;
    }).join('');
  },

  // ============================================================
  // ACHIEVEMENT CHECKING
  // ============================================================
  
  getUnlockedAchievements() {
    const unlocked = [];
    const state = State.current;
    const stats = state.stats || {};
    const masteredNodes = State.getMasteredNodes?.() || [];

    Object.values(this.achievements).forEach(achievement => {
      const req = achievement.requirement;
      let isUnlocked = false;

      switch (req.type) {
        case 'streak':
          // Check max streak ever (we'd need to track this, using current for now)
          isUnlocked = (state.streak || 0) >= req.value;
          break;
        case 'lessons':
          isUnlocked = (stats.lessonsCompleted || 0) >= req.value;
          break;
        case 'perfect':
          isUnlocked = (stats.perfectScenarios || 0) >= req.value;
          break;
        case 'totalCoins':
          isUnlocked = (stats.totalCoinsEarned || 0) >= req.value;
          break;
        case 'level':
          isUnlocked = (state.level || 1) >= req.value;
          break;
        case 'branch':
          const branchProgress = this.getBranchProgress(req.value);
          isUnlocked = branchProgress.mastered === branchProgress.total && branchProgress.total > 0;
          break;
        case 'callBS':
          isUnlocked = (stats.callBSCount || 0) >= req.value;
          break;
        case 'purchases':
          isUnlocked = (state.ownedItems?.length || 0) >= req.value;
          break;
      }

      if (isUnlocked) {
        unlocked.push(achievement.id);
      }
    });

    return unlocked;
  },

  // ============================================================
  // COSMETICS
  // ============================================================
  
  getEquippedCosmetics() {
    return State.current.equipped || {
      frame: null,
      title: null,
      skin: null,
      background: null
    };
  },

  getItemName(itemId) {
    if (typeof Shop !== 'undefined' && Shop.items[itemId]) {
      return Shop.items[itemId].name;
    }
    return itemId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  },

  getTitleName(titleId) {
    if (typeof Shop !== 'undefined' && Shop.items[titleId]) {
      return Shop.items[titleId].name;
    }
    return titleId.replace('title_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  },

  // ============================================================
  // CUSTOMIZE MODAL
  // ============================================================
  
  showCustomizeModal() {
    const modal = document.getElementById('customizeModal');
    const content = document.getElementById('customizeContent');
    
    const ownedItems = State.current.ownedItems || [];
    const equipped = this.getEquippedCosmetics();
    
    // Group owned items by category
    const frames = ownedItems.filter(id => id.startsWith('frame_'));
    const titles = ownedItems.filter(id => id.startsWith('title_'));
    const skins = ownedItems.filter(id => id.startsWith('skin_'));
    const backgrounds = ownedItems.filter(id => id.startsWith('bg_'));

    content.innerHTML = `
      <button class="modal-close" id="customizeClose">✕</button>
      <h2 class="customize-title">Customize</h2>
      
      <div class="customize-section">
        <h3 class="customize-label">Frame</h3>
        <div class="customize-options">
          <div class="customize-option ${!equipped.frame ? 'selected' : ''}" data-type="frame" data-value="">
            <span>None</span>
          </div>
          ${frames.map(id => `
            <div class="customize-option ${equipped.frame === id ? 'selected' : ''}" data-type="frame" data-value="${id}">
              <span>${this.getItemName(id)}</span>
            </div>
          `).join('')}
          ${frames.length === 0 ? '<div class="customize-empty">No frames owned yet</div>' : ''}
        </div>
      </div>

      <div class="customize-section">
        <h3 class="customize-label">Title</h3>
        <div class="customize-options">
          <div class="customize-option ${!equipped.title ? 'selected' : ''}" data-type="title" data-value="">
            <span>None</span>
          </div>
          ${titles.map(id => `
            <div class="customize-option ${equipped.title === id ? 'selected' : ''}" data-type="title" data-value="${id}">
              <span>${this.getTitleName(id)}</span>
            </div>
          `).join('')}
          ${titles.length === 0 ? '<div class="customize-empty">No titles owned yet</div>' : ''}
        </div>
      </div>

      <div class="customize-section">
        <h3 class="customize-label">Shark Skin</h3>
        <div class="customize-options">
          <div class="customize-option ${!equipped.skin ? 'selected' : ''}" data-type="skin" data-value="">
            <span>Classic Blue</span>
          </div>
          ${skins.map(id => `
            <div class="customize-option ${equipped.skin === id ? 'selected' : ''}" data-type="skin" data-value="${id}">
              <span>${this.getItemName(id)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="customize-section">
        <h3 class="customize-label">Background</h3>
        <div class="customize-options">
          <div class="customize-option ${!equipped.background ? 'selected' : ''}" data-type="background" data-value="">
            <span>Default</span>
          </div>
          ${backgrounds.map(id => `
            <div class="customize-option ${equipped.background === id ? 'selected' : ''}" data-type="background" data-value="${id}">
              <span>${this.getItemName(id)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <button class="customize-save-btn" id="customizeSave">Save Changes</button>
    `;

    modal.classList.remove('hidden');
    
    // Attach modal events
    document.getElementById('customizeClose')?.addEventListener('click', () => this.closeCustomizeModal());
    document.getElementById('customizeBackdrop')?.addEventListener('click', () => this.closeCustomizeModal());
    
    // Option selection
    content.querySelectorAll('.customize-option').forEach(option => {
      option.addEventListener('click', () => {
        const type = option.dataset.type;
        // Deselect others in same category
        content.querySelectorAll(`.customize-option[data-type="${type}"]`).forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        
        if (typeof AudioManager !== 'undefined') AudioManager.play('tap');
      });
    });
    
    // Save button
    document.getElementById('customizeSave')?.addEventListener('click', () => {
      this.saveCustomization(content);
    });
  },

  closeCustomizeModal() {
    document.getElementById('customizeModal')?.classList.add('hidden');
  },

  saveCustomization(content) {
    const equipped = {
      frame: null,
      title: null,
      skin: null,
      background: null
    };
    
    content.querySelectorAll('.customize-option.selected').forEach(option => {
      const type = option.dataset.type;
      const value = option.dataset.value || null;
      equipped[type] = value;
    });
    
    State.current.equipped = equipped;
    State.save();
    
    if (typeof AudioManager !== 'undefined') AudioManager.play('correct');
    
    this.closeCustomizeModal();
    this.render();
  },

  // ============================================================
  // SETTINGS
  // ============================================================
  
  toggleSound() {
    if (typeof AudioManager !== 'undefined') {
      AudioManager.toggle();
      this.render();
    }
  },

  resetProgress() {
    const confirmed = confirm('Are you sure you want to reset ALL progress? This cannot be undone!');
    if (!confirmed) return;
    
    const doubleConfirm = confirm('Really? You will lose everything - levels, coins, skills, achievements. Type OK to confirm.');
    if (!doubleConfirm) return;
    
    // Clear all localStorage
    localStorage.removeItem('sharkfin_state');
    localStorage.removeItem('sharkfin_shop');
    localStorage.removeItem('sharkfin_audio');
    
    // Reload the page
    window.location.reload();
  },

  // ============================================================
  // EVENT LISTENERS
  // ============================================================
  
  attachEventListeners() {
    // Customize button
    document.getElementById('customizeBtn')?.addEventListener('click', () => {
      this.showCustomizeModal();
      if (typeof AudioManager !== 'undefined') AudioManager.play('click');
    });
    
    // Sound setting
    document.getElementById('soundSetting')?.addEventListener('click', () => {
      this.toggleSound();
    });
    
    // Reset progress
    document.getElementById('resetProgress')?.addEventListener('click', () => {
      this.resetProgress();
    });
  }
};

// Export
window.Profile = Profile;
console.log('profile.js loaded');
