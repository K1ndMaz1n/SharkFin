/**
 * ECONOMY.JS
 * Central economy engine for SharkFin
 * All XP and coin transactions flow through here
 */

const Economy = {
  // ============================================================
  // BALANCE CONSTANTS (Easy to tune)
  // ============================================================
  
  rates: {
    // Lesson rewards by tier (1-5)
    lesson: {
      xp: [30, 50, 75, 100, 150],
      coins: [50, 100, 150, 200, 300]
    },
    
    // Simulation rewards
    simulation: {
      xp: 100,
      coins: 150,
      perfect: { xp: 50, coins: 75 } // Bonus for perfect score
    },
    
    // Mission rewards
    daily: {
      xp: 25,
      coins: 35
    },
    weekly: {
      xp: 100,
      coins: 150
    },
    
    // Streak bonuses
    streak: {
      milestone7: { xp: 50, coins: 100 },
      milestone30: { xp: 200, coins: 500 },
      milestone100: { xp: 500, coins: 1500 },
      perDayBonus: 0.02 // +2% per day, caps at 50%
    },
    
    // Level up rewards
    levelUp: {
      coins: 50 // coins per level
    },
    
    // Miscellaneous
    callBS: { xp: 10, coins: 25 },
    firstTimeBonus: { xp: 25, coins: 25 }
  },

  // XP required per level (index = level - 1)
  xpTable: [
    0,      // Level 1: 0 XP
    100,    // Level 2: 100 XP
    250,    // Level 3: 250 XP
    450,    // Level 4: 450 XP
    700,    // Level 5: 700 XP
    1000,   // Level 6: 1000 XP
    1400,   // Level 7: 1400 XP
    1900,   // Level 8: 1900 XP
    2500,   // Level 9: 2500 XP
    3200,   // Level 10: 3200 XP
    4000,   // Level 11
    5000,   // Level 12
    6200,   // Level 13
    7600,   // Level 14
    9200,   // Level 15
    11000,  // Level 16
    13000,  // Level 17
    15500,  // Level 18
    18500,  // Level 19
    22000   // Level 20 (max)
  ],

  // Transaction log (kept in memory, optionally persisted)
  transactionLog: [],
  maxLogSize: 100,

  // ============================================================
  // CORE TRANSACTION METHODS
  // ============================================================

  /**
   * Grant XP and/or coins to the player
   * @param {string} source - What generated this reward (lesson, simulation, daily, etc.)
   * @param {object} options - { xp, coins, reason, skipMultipliers, silent }
   * @returns {object} - { xp: actual XP granted, coins: actual coins granted, leveledUp: bool }
   */
  grant(source, options = {}) {
    const {
      xp = 0,
      coins = 0,
      reason = '',
      skipMultipliers = false,
      silent = false
    } = options;

    // Apply multipliers
    const multiplier = skipMultipliers ? 1 : this.getMultiplier();
    const actualXP = Math.floor(xp * multiplier);
    const actualCoins = Math.floor(coins * multiplier);

    // Log transaction
    this.log('grant', source, { xp: actualXP, coins: actualCoins, reason, multiplier });

    // Update state
    const previousLevel = State.current.level;
    
    if (actualXP > 0) {
      State.current.xp += actualXP;
    }
    
    if (actualCoins > 0) {
      State.current.sharkCoins += actualCoins;
      State.current.stats.totalCoinsEarned += actualCoins;
    }

    // Check for level up
    const leveledUp = this.checkLevelUp();
    
    // Save state
    State.save();
    State.updateUI();

    // Visual/audio feedback
    if (!silent) {
      this.showRewardFeedback(actualXP, actualCoins, leveledUp);
    }

    return {
      xp: actualXP,
      coins: actualCoins,
      leveledUp,
      newLevel: State.current.level,
      multiplier
    };
  },

  /**
   * Spend coins
   * @param {string} target - What the coins are being spent on
   * @param {number} amount - How many coins to spend
   * @param {string} reason - Optional description
   * @returns {boolean} - Success or failure
   */
  spend(target, amount, reason = '') {
    if (amount <= 0) {
      console.warn('Economy: Cannot spend <= 0 coins');
      return false;
    }

    if (State.current.sharkCoins < amount) {
      this.log('spend_failed', target, { amount, reason, balance: State.current.sharkCoins });
      return false;
    }

    State.current.sharkCoins -= amount;
    this.log('spend', target, { amount, reason, newBalance: State.current.sharkCoins });
    
    State.save();
    State.updateUI();

    return true;
  },

  /**
   * Check if player can afford something
   */
  canAfford(amount) {
    return State.current.sharkCoins >= amount;
  },

  /**
   * Get current balance
   */
  getBalance() {
    return {
      xp: State.current.xp,
      coins: State.current.sharkCoins,
      level: State.current.level
    };
  },

  // ============================================================
  // MULTIPLIER SYSTEM
  // ============================================================

  /**
   * Calculate total multiplier from all sources
   * @returns {number} - Multiplier (1.0 = no bonus)
   */
  getMultiplier() {
    let multiplier = 1.0;

    // Streak bonus: +2% per day, max 50%
    const streak = State.current.streak || 0;
    const streakBonus = Math.min(streak * this.rates.streak.perDayBonus, 0.5);
    multiplier += streakBonus;

    // Active perks
    const perks = State.current.skills?.activePerks || [];
    perks.forEach(perkId => {
      const perkBonus = this.getPerkBonus(perkId);
      multiplier += perkBonus;
    });

    // Active boost items
    const boosts = this.getActiveBoosts();
    boosts.forEach(boost => {
      if (boost.type === 'xp_multiplier') {
        multiplier += boost.value;
      }
    });

    return multiplier;
  },

  /**
   * Get bonus from a specific perk
   */
  getPerkBonus(perkId) {
    const perkBonuses = {
      'fomo_fundamentals_perk': 0.05,      // +5% from FOMO defense
      'urgency_resistance_perk': 0.10,     // +10% from urgency sims
      'compound_interest_perk': 0.05,      // +5% coins
      'credit_score_decoded_perk': 0.05,   // +5% XP
      // Add more perks as skills are built
    };
    return perkBonuses[perkId] || 0;
  },

  /**
   * Get currently active boost items
   */
  getActiveBoosts() {
    const boosts = [];
    const now = Date.now();
    
    // Check for XP boost
    const xpBoostExpiry = State.current.activeBoosts?.xp_boost;
    if (xpBoostExpiry && xpBoostExpiry > now) {
      boosts.push({ type: 'xp_multiplier', value: 1.0 }); // 2x = +100%
    }

    return boosts;
  },

  // ============================================================
  // LEVEL SYSTEM
  // ============================================================

  /**
   * Check if player should level up
   * @returns {boolean} - Whether a level up occurred
   */
  checkLevelUp() {
    const currentLevel = State.current.level;
    const currentXP = State.current.xp;
    const maxLevel = this.xpTable.length;

    if (currentLevel >= maxLevel) {
      return false; // Already max level
    }

    const xpNeeded = this.xpTable[currentLevel]; // XP needed for next level
    
    if (currentXP >= xpNeeded) {
      State.current.level++;
      
      // Grant level up rewards
      const levelReward = this.rates.levelUp.coins * State.current.level;
      State.current.sharkCoins += levelReward;
      
      this.log('level_up', 'system', { 
        newLevel: State.current.level, 
        reward: levelReward 
      });

      // Unlock new skills based on level
      this.unlockLevelSkills(State.current.level);

      // Check for another level up (in case of big XP gains)
      this.checkLevelUp();
      
      return true;
    }

    return false;
  },

  /**
   * Get XP progress to next level
   */
  getLevelProgress() {
    const level = State.current.level;
    const xp = State.current.xp;
    const maxLevel = this.xpTable.length;

    if (level >= maxLevel) {
      return { current: xp, needed: xp, percent: 100, isMaxLevel: true };
    }

    const previousLevelXP = level > 1 ? this.xpTable[level - 1] : 0;
    const nextLevelXP = this.xpTable[level];
    const xpIntoLevel = xp - previousLevelXP;
    const xpNeededForLevel = nextLevelXP - previousLevelXP;
    const percent = Math.floor((xpIntoLevel / xpNeededForLevel) * 100);

    return {
      current: xpIntoLevel,
      needed: xpNeededForLevel,
      percent,
      isMaxLevel: false
    };
  },

  /**
   * Unlock skills when reaching certain levels
   */
  unlockLevelSkills(level) {
    if (typeof Skills === 'undefined') return;

    Object.values(Skills.nodes).forEach(skill => {
      if (skill.unlockLevel === level) {
        State.unlockNode(skill.id);
      }
    });
  },

  // ============================================================
  // REWARD HELPERS (Convenience methods)
  // ============================================================

  /**
   * Grant rewards for completing a lesson
   */
  grantLessonReward(skillId, scorePercent) {
    const skill = Skills?.nodes?.[skillId];
    const tier = skill?.tier || 1;
    
    // Base rewards from tier
    const baseXP = this.rates.lesson.xp[tier - 1] || this.rates.lesson.xp[0];
    const baseCoins = this.rates.lesson.coins[tier - 1] || this.rates.lesson.coins[0];
    
    // Scale by score percentage
    const scaledXP = Math.floor(baseXP * (scorePercent / 100));
    const scaledCoins = Math.floor(baseCoins * (scorePercent / 100));

    // Perfect score bonus
    const perfectBonus = scorePercent >= 95;
    const bonusXP = perfectBonus ? Math.floor(baseXP * 0.25) : 0;
    const bonusCoins = perfectBonus ? Math.floor(baseCoins * 0.25) : 0;

    return this.grant('lesson', {
      xp: scaledXP + bonusXP,
      coins: scaledCoins + bonusCoins,
      reason: `${skill?.name || skillId} (${scorePercent}%${perfectBonus ? ' PERFECT' : ''})`
    });
  },

  /**
   * Grant rewards for completing a simulation
   */
  grantSimulationReward(simId, scorePercent, isPerfect = false) {
    const baseXP = this.rates.simulation.xp;
    const baseCoins = this.rates.simulation.coins;
    
    const scaledXP = Math.floor(baseXP * (scorePercent / 100));
    const scaledCoins = Math.floor(baseCoins * (scorePercent / 100));

    const bonusXP = isPerfect ? this.rates.simulation.perfect.xp : 0;
    const bonusCoins = isPerfect ? this.rates.simulation.perfect.coins : 0;

    return this.grant('simulation', {
      xp: scaledXP + bonusXP,
      coins: scaledCoins + bonusCoins,
      reason: `${simId} (${scorePercent}%${isPerfect ? ' PERFECT' : ''})`
    });
  },

  /**
   * Grant daily mission reward
   */
  grantDailyReward(missionId) {
    return this.grant('daily', {
      xp: this.rates.daily.xp,
      coins: this.rates.daily.coins,
      reason: missionId
    });
  },

  /**
   * Grant weekly mission reward
   */
  grantWeeklyReward() {
    return this.grant('weekly', {
      xp: this.rates.weekly.xp,
      coins: this.rates.weekly.coins,
      reason: 'Weekly challenge complete'
    });
  },

  /**
   * Grant streak milestone reward
   */
  grantStreakReward(days) {
    let reward = null;
    
    if (days === 7) {
      reward = this.rates.streak.milestone7;
    } else if (days === 30) {
      reward = this.rates.streak.milestone30;
    } else if (days === 100) {
      reward = this.rates.streak.milestone100;
    }

    if (reward) {
      return this.grant('streak', {
        xp: reward.xp,
        coins: reward.coins,
        reason: `${days}-day streak milestone`
      });
    }

    return null;
  },

  /**
   * Grant reward for calling BS on Sharky
   */
  grantCallBSReward() {
    return this.grant('callBS', {
      xp: this.rates.callBS.xp,
      coins: this.rates.callBS.coins,
      reason: 'Spotted Sharky\'s tactic'
    });
  },

  // ============================================================
  // FEEDBACK & LOGGING
  // ============================================================

  /**
   * Show visual feedback for rewards
   */
  showRewardFeedback(xp, coins, leveledUp) {
    // Audio feedback
    if (typeof AudioManager !== 'undefined') {
      if (leveledUp) {
        AudioManager.play('levelUp');
      } else if (coins > 0) {
        AudioManager.play('coinEarn');
      } else if (xp > 0) {
        AudioManager.play('xpGain');
      }
    }

    // Visual feedback
    if (typeof Interactions !== 'undefined') {
      // Floating text for coins
      if (coins > 0) {
        const coinEl = document.getElementById('sharkCoins');
        if (coinEl) {
          const rect = coinEl.getBoundingClientRect();
          Interactions.floatingText(rect.left, rect.top, `+${coins}`, '#d4af37');
        }
      }

      // Level up celebration
      if (leveledUp) {
        Interactions.confetti(window.innerWidth / 2, window.innerHeight / 3);
        Interactions.screenFlash('#d4af37', 300);
      }
    }
  },

  /**
   * Log a transaction
   */
  log(type, source, data) {
    const entry = {
      timestamp: new Date().toISOString(),
      type,
      source,
      ...data
    };

    this.transactionLog.unshift(entry);
    
    // Keep log size manageable
    if (this.transactionLog.length > this.maxLogSize) {
      this.transactionLog.pop();
    }

    // Console log for debugging
    console.log(`💰 Economy [${type}] ${source}:`, data);
  },

  /**
   * Get recent transactions
   */
  getRecentTransactions(count = 10) {
    return this.transactionLog.slice(0, count);
  },

  /**
   * Get transaction summary
   */
  getSummary() {
    const grants = this.transactionLog.filter(t => t.type === 'grant');
    const spends = this.transactionLog.filter(t => t.type === 'spend');

    return {
      totalGranted: {
        xp: grants.reduce((sum, t) => sum + (t.xp || 0), 0),
        coins: grants.reduce((sum, t) => sum + (t.coins || 0), 0)
      },
      totalSpent: spends.reduce((sum, t) => sum + (t.amount || 0), 0),
      transactionCount: this.transactionLog.length,
      currentMultiplier: this.getMultiplier()
    };
  },

  // ============================================================
  // DEV TOOLS
  // ============================================================

  dev: {
    addCoins(amount) {
      Economy.grant('dev', { coins: amount, skipMultipliers: true, reason: 'Dev grant' });
    },
    addXP(amount) {
      Economy.grant('dev', { xp: amount, skipMultipliers: true, reason: 'Dev grant' });
    },
    setLevel(level) {
      State.current.level = level;
      State.current.xp = Economy.xpTable[level - 1] || 0;
      State.save();
      State.updateUI();
      console.log(`Set level to ${level}`);
    },
    showLog() {
      console.table(Economy.transactionLog);
    },
    showSummary() {
      console.log(Economy.getSummary());
    },
    showMultiplier() {
      console.log(`Current multiplier: ${Economy.getMultiplier()}x`);
    }
  }
};

// Export
window.Economy = Economy;
console.log('economy.js loaded');
