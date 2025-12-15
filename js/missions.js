/**
 * MISSIONS.JS
 * Handles daily challenges and weekly missions
 */

const Missions = {
  // Daily challenge definitions
  dailyChallenges: [
    {
      id: 'quiz_fomo',
      title: 'FOMO Flash Quiz',
      desc: 'Test your urgency resistance',
      reward: 50,
      type: 'quiz',
      action: () => console.log('Start FOMO quiz') // TODO: Implement quiz
    },
    {
      id: 'complete_scenario',
      title: 'Complete 1 Scenario',
      desc: 'Practice in any simulation',
      reward: 100,
      type: 'scenario',
      checkComplete: () => State.current.stats.scenariosCompleted > 0
    },
    {
      id: 'spot_pattern',
      title: 'Spot a Dark Pattern',
      desc: 'Find one in the wild, snap it',
      reward: 75,
      type: 'real',
      action: () => console.log('Open camera/upload') // TODO: Implement
    }
  ],

  // Weekly challenge definition
  weeklyChallenge: {
    id: 'predator_hunter',
    title: '🦈 Predator Hunter',
    desc: 'Complete 15 scenarios this week',
    target: 15,
    reward: 500
  },

  /**
   * Initialize missions UI
   */
  init() {
    this.renderDailyChallenges();
    this.renderWeeklyChallenge();
    this.startTimers();
  },

  /**
   * Render daily challenges to the DOM
   */
  renderDailyChallenges() {
    const container = document.getElementById('dailyChallenges');
    if (!container) return;

    container.innerHTML = this.dailyChallenges.map(challenge => {
      const isCompleted = State.isDailyMissionCompleted(challenge.id);
      
      return `
        <div class="challenge-card ${isCompleted ? 'completed' : ''}" data-mission-id="${challenge.id}">
          <div class="challenge-check"></div>
          <div class="challenge-content">
            <div class="challenge-title">${challenge.title}</div>
            <div class="challenge-desc">${challenge.desc}</div>
          </div>
          <div class="challenge-reward">
            <div class="reward-xp">+${challenge.reward} SC</div>
            <div class="reward-type ${challenge.type}">${challenge.type.toUpperCase()}</div>
          </div>
        </div>
      `;
    }).join('');

    // Add click handlers
    container.querySelectorAll('.challenge-card').forEach(card => {
      card.addEventListener('click', () => {
        const missionId = card.dataset.missionId;
        this.handleChallengeClick(missionId);
      });
    });
  },

  /**
   * Render weekly challenge to the DOM
   */
  renderWeeklyChallenge() {
    const container = document.getElementById('weeklyChallenge');
    if (!container) return;

    const progress = State.current.weeklyMission.progress;
    const target = this.weeklyChallenge.target;
    const percentage = Math.min((progress / target) * 100, 100);

    container.innerHTML = `
      <div class="weekly-card">
        <div class="weekly-header">
          <div class="weekly-title">${this.weeklyChallenge.title}</div>
          <div class="weekly-reward">+${this.weeklyChallenge.reward} SC</div>
        </div>
        <div class="weekly-progress">
          <div class="weekly-progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="weekly-status">
          Complete <span>${target} scenarios</span> this week — ${progress}/${target} done
        </div>
      </div>
    `;
  },

  /**
   * Handle clicking on a challenge
   */
  handleChallengeClick(missionId) {
    const challenge = this.dailyChallenges.find(c => c.id === missionId);
    if (!challenge) return;

    // If already completed, do nothing
    if (State.isDailyMissionCompleted(missionId)) {
      console.log('Already completed');
      return;
    }

    // If it has an action, run it
    if (challenge.action) {
      challenge.action();
    }

    // For demo: auto-complete on click
    // In real app, this would be triggered by actual completion
    if (challenge.id === 'complete_scenario') {
      // This one is tracked automatically
      return;
    }

    // Complete the mission
    State.completeDailyMission(missionId, challenge.reward);
    this.renderDailyChallenges();
  },

  /**
   * Check and complete scenario-based missions
   */
  checkScenarioMissions() {
    // Check if "complete 1 scenario" daily is done
    const scenarioMission = this.dailyChallenges.find(c => c.id === 'complete_scenario');
    if (scenarioMission && State.current.stats.scenariosCompleted > 0) {
      if (!State.isDailyMissionCompleted('complete_scenario')) {
        State.completeDailyMission('complete_scenario', scenarioMission.reward);
        this.renderDailyChallenges();
      }
    }

    // Check weekly challenge
    this.renderWeeklyChallenge();
    
    // Check if weekly is complete
    if (State.current.weeklyMission.progress >= this.weeklyChallenge.target) {
      // Award weekly bonus if not already awarded
      // TODO: Track weekly reward separately
    }
  },

  /**
   * Start countdown timers
   */
  startTimers() {
    this.updateTimers();
    setInterval(() => this.updateTimers(), 1000);
  },

  /**
   * Update timer displays
   */
  updateTimers() {
    // Daily timer - time until midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const dailyRemaining = midnight - now;
    
    const dailyHours = Math.floor(dailyRemaining / (1000 * 60 * 60));
    const dailyMins = Math.floor((dailyRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const dailySecs = Math.floor((dailyRemaining % (1000 * 60)) / 1000);
    
    const dailyTimerEl = document.getElementById('dailyTimer');
    if (dailyTimerEl) {
      dailyTimerEl.textContent = `${String(dailyHours).padStart(2, '0')}:${String(dailyMins).padStart(2, '0')}:${String(dailySecs).padStart(2, '0')}`;
    }

    // Weekly timer - time until next Monday
    const dayOfWeek = now.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(0, 0, 0, 0);
    
    const weeklyRemaining = nextMonday - now;
    const weeklyDays = Math.floor(weeklyRemaining / (1000 * 60 * 60 * 24));
    const weeklyHours = Math.floor((weeklyRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    const weeklyTimerEl = document.getElementById('weeklyTimer');
    if (weeklyTimerEl) {
      weeklyTimerEl.textContent = `${weeklyDays}d ${weeklyHours}h`;
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a tick for State to initialize first
  setTimeout(() => Missions.init(), 10);
});
