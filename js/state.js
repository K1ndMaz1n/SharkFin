/**
 * STATE.JS
 * Manages all user data, progress, and localStorage persistence
 * This is the "brain" that remembers everything
 */

const State = {
  // Default state for new users
  defaults: {
    level: 1,
    xp: 0,
    sharkCoins: 100,  // Starting bonus
    streak: 0,
    lastPlayedDate: null,
    
    // Completed scenarios (by ID)
    completedScenarios: [],
    
    // Skill progress: { skillId: { unlocked: bool, mastered: bool, progress: 0-100 } }
    skills: {},
    
    // Mission progress
    dailyMissions: {
      lastReset: null,
      completed: []
    },
    weeklyMission: {
      lastReset: null,
      progress: 0
    },
    
    // Stats
    stats: {
      scenariosCompleted: 0,
      tacticsResisted: 0,
      totalCoinsEarned: 0,
      perfectScenarios: 0
    }
  },

  // Current state (loaded from localStorage or defaults)
  current: null,

  /**
   * Initialize state - call this on app start
   */
  init() {
    const saved = localStorage.getItem('sharkfin_state');
    if (saved) {
      try {
        this.current = JSON.parse(saved);
        // Merge with defaults in case we added new fields
        this.current = { ...this.defaults, ...this.current };
      } catch (e) {
        console.error('Failed to parse saved state, using defaults');
        this.current = { ...this.defaults };
      }
    } else {
      this.current = { ...this.defaults };
    }
    
    // Check if we need to reset daily/weekly missions
    this.checkMissionResets();
    
    // Update streak
    this.updateStreak();
    
    // Save and update UI
    this.save();
    this.updateUI();
    
    console.log('State initialized:', this.current);
  },

  /**
   * Save current state to localStorage
   */
  save() {
    localStorage.setItem('sharkfin_state', JSON.stringify(this.current));
  },

  /**
   * Update all UI elements that display state
   */
  updateUI() {
    // Level & Rank
    const levelEl = document.getElementById('userLevel');
    const rankEl = document.getElementById('userRank');
    if (levelEl) levelEl.textContent = `LV.${String(this.current.level).padStart(2, '0')}`;
    if (rankEl) rankEl.textContent = this.getRankName(this.current.level);
    
    // Currency
    const coinsEl = document.getElementById('sharkCoins');
    const streakEl = document.getElementById('streak');
    if (coinsEl) coinsEl.textContent = this.current.sharkCoins.toLocaleString();
    if (streakEl) streakEl.textContent = this.current.streak;
    
    // Unlock radar if level 5+
    const radarCard = document.getElementById('radarCard');
    if (radarCard && this.current.level >= 5) {
      radarCard.classList.remove('radar-locked');
    }
  },

  /**
   * Get rank name based on level
   */
  getRankName(level) {
    const ranks = [
      { min: 1, name: 'GUPPY' },
      { min: 3, name: 'MINNOW' },
      { min: 5, name: 'BARRACUDA' },
      { min: 10, name: 'TIGER SHARK' },
      { min: 15, name: 'GREAT WHITE' },
      { min: 20, name: 'MEGALODON' },
      { min: 25, name: 'APEX PREDATOR' }
    ];
    
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (level >= ranks[i].min) return ranks[i].name;
    }
    return 'GUPPY';
  },

  /**
   * Add XP and handle level ups
   */
  addXP(amount) {
    this.current.xp += amount;
    
    // Check for level up (100 XP per level, scaling)
    const xpNeeded = this.current.level * 100;
    while (this.current.xp >= xpNeeded) {
      this.current.xp -= xpNeeded;
      this.current.level++;
      this.onLevelUp();
    }
    
    this.save();
    this.updateUI();
  },

  /**
   * Called when player levels up
   */
  onLevelUp() {
    // Could trigger animation, unlock notification, etc.
    console.log(`Level up! Now level ${this.current.level}`);
    
    // Bonus coins on level up
    this.addCoins(50 * this.current.level);
  },

  /**
   * Add SharkCoins
   */
  addCoins(amount) {
    this.current.sharkCoins += amount;
    this.current.stats.totalCoinsEarned += amount;
    this.save();
    this.updateUI();
  },

  /**
   * Spend SharkCoins (returns false if not enough)
   */
  spendCoins(amount) {
    if (this.current.sharkCoins < amount) return false;
    this.current.sharkCoins -= amount;
    this.save();
    this.updateUI();
    return true;
  },

  /**
   * Mark a scenario as completed
   */
  completeScenario(scenarioId, earnedCoins, wasPerfect = false) {
    if (!this.current.completedScenarios.includes(scenarioId)) {
      this.current.completedScenarios.push(scenarioId);
    }
    
    this.current.stats.scenariosCompleted++;
    if (wasPerfect) this.current.stats.perfectScenarios++;
    
    this.addCoins(earnedCoins);
    this.addXP(earnedCoins / 5); // XP is 1/5 of coins
    
    // Update weekly mission progress
    this.current.weeklyMission.progress++;
    
    this.save();
  },

  /**
   * Check if a scenario is completed
   */
  isScenarioCompleted(scenarioId) {
    return this.current.completedScenarios.includes(scenarioId);
  },

  /**
   * Update streak based on last played date
   */
  updateStreak() {
    const today = new Date().toDateString();
    const lastPlayed = this.current.lastPlayedDate;
    
    if (!lastPlayed) {
      // First time playing
      this.current.streak = 1;
    } else if (lastPlayed === today) {
      // Already played today, streak unchanged
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastPlayed === yesterday.toDateString()) {
        // Played yesterday, increment streak
        this.current.streak++;
      } else {
        // Missed a day, reset streak
        this.current.streak = 1;
      }
    }
    
    this.current.lastPlayedDate = today;
    this.save();
  },

  /**
   * Check and reset daily/weekly missions if needed
   */
  checkMissionResets() {
    const now = new Date();
    const today = now.toDateString();
    
    // Daily reset
    if (this.current.dailyMissions.lastReset !== today) {
      this.current.dailyMissions = {
        lastReset: today,
        completed: []
      };
    }
    
    // Weekly reset (Monday)
    const lastWeeklyReset = this.current.weeklyMission.lastReset 
      ? new Date(this.current.weeklyMission.lastReset) 
      : null;
    
    const daysSinceMonday = (now.getDay() + 6) % 7;
    const thisMonday = new Date(now);
    thisMonday.setDate(now.getDate() - daysSinceMonday);
    thisMonday.setHours(0, 0, 0, 0);
    
    if (!lastWeeklyReset || lastWeeklyReset < thisMonday) {
      this.current.weeklyMission = {
        lastReset: thisMonday.toISOString(),
        progress: 0
      };
    }
    
    this.save();
  },

  /**
   * Complete a daily mission
   */
  completeDailyMission(missionId, reward) {
    if (!this.current.dailyMissions.completed.includes(missionId)) {
      this.current.dailyMissions.completed.push(missionId);
      this.addCoins(reward);
      this.save();
      return true;
    }
    return false;
  },

  /**
   * Check if daily mission is completed
   */
  isDailyMissionCompleted(missionId) {
    return this.current.dailyMissions.completed.includes(missionId);
  },

  /**
   * Get skill progress
   */
  getSkillProgress(skillId) {
    return this.current.skills[skillId] || { unlocked: false, mastered: false, progress: 0 };
  },

  /**
   * Update skill progress
   */
  updateSkillProgress(skillId, updates) {
    if (!this.current.skills[skillId]) {
      this.current.skills[skillId] = { unlocked: false, mastered: false, progress: 0 };
    }
    this.current.skills[skillId] = { ...this.current.skills[skillId], ...updates };
    this.save();
  },

  /**
   * Reset all progress (for testing)
   */
  reset() {
    localStorage.removeItem('sharkfin_state');
    this.current = { ...this.defaults };
    this.save();
    this.updateUI();
    console.log('State reset to defaults');
  },

  // ===== DEV MODE =====
  // Type these in browser console to test:
  // State.dev.addCoins(500)
  // State.dev.addXP(200)
  // State.dev.setLevel(5)
  // State.dev.reset()
  
  dev: {
    addCoins(amount) {
      State.addCoins(amount);
      console.log(`Added ${amount} SC. Total: ${State.current.sharkCoins}`);
    },
    addXP(amount) {
      State.addXP(amount);
      console.log(`Added ${amount} XP. Level: ${State.current.level}`);
    },
    setLevel(level) {
      State.current.level = level;
      State.current.xp = 0;
      State.save();
      State.updateUI();
      console.log(`Set level to ${level}`);
    },
    maxOut() {
      State.current.level = 25;
      State.current.sharkCoins = 99999;
      State.current.streak = 30;
      State.save();
      State.updateUI();
      console.log('Maxed out stats');
    },
    reset() {
      State.reset();
      console.log('Reset to defaults');
    },
    unlock() {
      // Unlock radar (set level 5+)
      State.current.level = 5;
      State.save();
      State.updateUI();
      console.log('Unlocked radar');
    }
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => State.init());

// Make dev commands available globally
window.State = State;
