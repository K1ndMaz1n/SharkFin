/**
 * ONBOARDING.JS
 * New user onboarding flow - assessment and introduction
 */

const Onboarding = {
  currentStep: 0,
  answers: {},
  
  // ============================================================
  // ONBOARDING SCREENS
  // ============================================================
  
  screens: [
    {
      id: 'splash',
      type: 'splash'
    },
    {
      id: 'problem',
      type: 'info',
      title: 'The Problem',
      content: `
        <div class="onboard-stat">$500B+</div>
        <div class="onboard-stat-label">spent yearly by companies learning how to take your money</div>
        <div class="onboard-divider"></div>
        <div class="onboard-question-text">How much have you spent learning to keep it?</div>
      `
    },
    {
      id: 'stakes',
      type: 'info',
      title: 'The Stakes',
      content: `
        <div class="onboard-facts">
          <div class="onboard-fact">
            <span class="fact-icon">🎮</span>
            <span class="fact-text">Gacha games use casino psychology on teens</span>
          </div>
          <div class="onboard-fact">
            <span class="fact-icon">💳</span>
            <span class="fact-text">1 in 5 young adults have debt in collections</span>
          </div>
          <div class="onboard-fact">
            <span class="fact-icon">📱</span>
            <span class="fact-text">BNPL apps hide true costs behind "4 easy payments"</span>
          </div>
          <div class="onboard-fact">
            <span class="fact-icon">🪙</span>
            <span class="fact-text">Crypto scams flood social media with fake FOMO</span>
          </div>
        </div>
        <div class="onboard-hook">By the time mistakes hit your credit report, the damage is done.</div>
      `
    },
    {
      id: 'solution',
      type: 'info',
      title: 'The Solution',
      content: `
        <div class="onboard-solution">
          <div class="solution-shark">🦈</div>
          <div class="solution-text">
            <p>SharkFin trains you the way predatory companies do:</p>
            <p class="solution-highlight">Through repetition, pressure, and consequences.</p>
            <p>Except we're on your side.</p>
          </div>
        </div>
      `
    },
    {
      id: 'assess_intro',
      type: 'info',
      title: 'Quick Assessment',
      content: `
        <div class="assess-intro">
          <div class="assess-icon">🎯</div>
          <div class="assess-text">Let's find your blind spots.</div>
          <div class="assess-subtext">6 quick questions. Be honest - this is just for you.</div>
        </div>
      `
    },
    {
      id: 'q1',
      type: 'question',
      category: 'fomo',
      question: 'Ever bought something because it said "Only 2 left in stock"?',
      options: [
        { text: 'Yes, more than once', value: 3 },
        { text: 'Maybe once or twice', value: 2 },
        { text: 'No, I see through that', value: 0 }
      ]
    },
    {
      id: 'q2',
      type: 'question',
      category: 'urgency',
      question: 'Have you regretted a purchase made under time pressure?',
      subtext: '"Sale ends tonight!" / "Limited time offer!"',
      options: [
        { text: 'Yes, definitely', value: 3 },
        { text: 'Probably once', value: 2 },
        { text: 'No, I always take my time', value: 0 }
      ]
    },
    {
      id: 'q3',
      type: 'question',
      category: 'subscriptions',
      question: 'Ever signed up for a free trial and forgot to cancel?',
      options: [
        { text: 'Yes, lost money to this', value: 3 },
        { text: 'Yes, but caught it in time', value: 1 },
        { text: 'No, I track everything', value: 0 }
      ]
    },
    {
      id: 'q4',
      type: 'question',
      category: 'microtransactions',
      question: 'Have you spent money on in-game purchases?',
      subtext: 'V-Bucks, Robux, gacha pulls, skins, etc.',
      options: [
        { text: 'Yes, more than I planned', value: 3 },
        { text: 'Yes, but I budget for it', value: 1 },
        { text: 'No / Rarely', value: 0 }
      ]
    },
    {
      id: 'q5',
      type: 'question',
      category: 'credit',
      question: 'Do you know what a credit score is and why it matters?',
      options: [
        { text: 'Not really', value: 3 },
        { text: 'Kind of, but not the details', value: 2 },
        { text: 'Yes, I understand it well', value: 0 }
      ]
    },
    {
      id: 'q6',
      type: 'question',
      category: 'investing',
      question: 'Do you know the difference between a stock and an index fund?',
      options: [
        { text: 'No idea', value: 3 },
        { text: 'I\'ve heard of them', value: 2 },
        { text: 'Yes, I could explain it', value: 0 }
      ]
    },
    {
      id: 'results',
      type: 'results'
    },
    {
      id: 'first_lesson',
      type: 'first_lesson'
    }
  ],

  // ============================================================
  // CHECK IF ONBOARDING NEEDED
  // ============================================================
  
  shouldShow() {
    return !localStorage.getItem('sharkfin_onboarding_complete');
  },

  markComplete() {
    localStorage.setItem('sharkfin_onboarding_complete', 'true');
    
    // Save assessment results to state
    if (State.current) {
      State.current.assessment = this.answers;
      State.current.assessmentDate = new Date().toISOString();
      State.save();
    }
  },

  // ============================================================
  // START ONBOARDING
  // ============================================================
  
  start() {
    this.currentStep = 0;
    this.answers = {};
    this.createOverlay();
    this.renderStep();
  },

  createOverlay() {
    // Remove existing if any
    document.getElementById('onboardingOverlay')?.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'onboardingOverlay';
    overlay.className = 'onboarding-overlay';
    overlay.innerHTML = `
      <div class="onboarding-container">
        <div class="onboarding-progress" id="onboardingProgress"></div>
        <div class="onboarding-content" id="onboardingContent"></div>
        <div class="onboarding-actions" id="onboardingActions"></div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger entrance animation
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });
  },

  // ============================================================
  // RENDER CURRENT STEP
  // ============================================================
  
  renderStep() {
    const screen = this.screens[this.currentStep];
    const content = document.getElementById('onboardingContent');
    const actions = document.getElementById('onboardingActions');
    const progress = document.getElementById('onboardingProgress');
    
    // Update progress dots
    this.renderProgress(progress);
    
    // Clear and animate
    content.classList.add('transitioning');
    
    setTimeout(() => {
      switch (screen.type) {
        case 'splash':
          this.renderSplash(content, actions);
          break;
        case 'info':
          this.renderInfo(content, actions, screen);
          break;
        case 'question':
          this.renderQuestion(content, actions, screen);
          break;
        case 'results':
          this.renderResults(content, actions);
          break;
        case 'first_lesson':
          this.renderFirstLesson(content, actions);
          break;
      }
      
      content.classList.remove('transitioning');
    }, 200);
  },

  renderProgress(container) {
    const totalSteps = this.screens.length;
    const dots = this.screens.map((screen, index) => {
      let dotClass = 'progress-dot';
      if (index < this.currentStep) dotClass += ' completed';
      if (index === this.currentStep) dotClass += ' active';
      return `<div class="${dotClass}"></div>`;
    }).join('');
    
    container.innerHTML = dots;
  },

  // ============================================================
  // SCREEN RENDERERS
  // ============================================================
  
  renderSplash(content, actions) {
    content.innerHTML = `
      <div class="splash-screen">
        <div class="splash-logo">
          <div class="splash-shark">🦈</div>
          <div class="splash-ripple"></div>
        </div>
        <h1 class="splash-title">SHARKFIN</h1>
        <p class="splash-tagline">Learn to hunt, not get hunted</p>
      </div>
    `;
    
    actions.innerHTML = `
      <button class="onboard-btn primary" id="onboardNext">GET STARTED</button>
      <button class="onboard-btn text" id="onboardSkip">I've used this before</button>
    `;
    
    this.attachActions();
  },

  renderInfo(content, actions, screen) {
    content.innerHTML = `
      <div class="info-screen">
        <h2 class="info-title">${screen.title}</h2>
        <div class="info-content">${screen.content}</div>
      </div>
    `;
    
    actions.innerHTML = `
      <button class="onboard-btn primary" id="onboardNext">CONTINUE</button>
    `;
    
    this.attachActions();
  },

  renderQuestion(content, actions, screen) {
    content.innerHTML = `
      <div class="question-screen">
        <div class="question-category">${this.getCategoryLabel(screen.category)}</div>
        <h2 class="question-text">${screen.question}</h2>
        ${screen.subtext ? `<p class="question-subtext">${screen.subtext}</p>` : ''}
        <div class="question-options">
          ${screen.options.map((opt, i) => `
            <button class="question-option" data-value="${opt.value}" data-index="${i}">
              ${opt.text}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    
    actions.innerHTML = ''; // No continue button - options advance automatically
    
    // Attach option handlers
    content.querySelectorAll('.question-option').forEach(btn => {
      btn.addEventListener('click', () => {
        // Visual feedback
        content.querySelectorAll('.question-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        // Save answer
        this.answers[screen.category] = parseInt(btn.dataset.value);
        
        // Sound
        if (typeof AudioManager !== 'undefined') {
          AudioManager.play('tap');
        }
        
        // Advance after brief delay
        setTimeout(() => this.nextStep(), 400);
      });
    });
  },

  renderResults(content, actions) {
    const results = this.calculateResults();
    
    content.innerHTML = `
      <div class="results-screen">
        <h2 class="results-title">Your Profile</h2>
        <p class="results-subtitle">Based on your answers...</p>
        
        <div class="results-bars">
          ${results.categories.map(cat => `
            <div class="result-bar">
              <div class="result-info">
                <span class="result-icon">${cat.icon}</span>
                <span class="result-name">${cat.name}</span>
              </div>
              <div class="result-track">
                <div class="result-fill ${cat.level}" style="width: ${cat.percent}%"></div>
              </div>
              <span class="result-level ${cat.level}">${cat.levelText}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="results-insight">
          <div class="insight-icon">💡</div>
          <div class="insight-text">${results.insight}</div>
        </div>
      </div>
    `;
    
    actions.innerHTML = `
      <button class="onboard-btn primary" id="onboardNext">START TRAINING</button>
    `;
    
    this.attachActions();
  },

  renderFirstLesson(content, actions) {
    const recommendedSkill = this.getRecommendedSkill();
    
    content.innerHTML = `
      <div class="first-lesson-screen">
        <p class="first-lesson-intro">Let's start with the #1 tactic used against you:</p>
        
        <div class="first-lesson-card">
          <div class="lesson-card-icon">${recommendedSkill.icon}</div>
          <h2 class="lesson-card-title">${recommendedSkill.name}</h2>
          <p class="lesson-card-desc">${recommendedSkill.description}</p>
          <div class="lesson-card-reward">
            <span class="reward-coins">+${recommendedSkill.reward} SC</span>
            <span class="reward-xp">+XP</span>
          </div>
        </div>
        
        <p class="first-lesson-time">⏱️ Takes about 3-5 minutes</p>
      </div>
    `;
    
    actions.innerHTML = `
      <button class="onboard-btn primary" id="startFirstLesson">BEGIN LESSON</button>
      <button class="onboard-btn text" id="skipToApp">Skip for now</button>
    `;
    
    document.getElementById('startFirstLesson')?.addEventListener('click', () => {
      this.complete();
      // Start the recommended lesson
      if (typeof Lessons !== 'undefined' && typeof Skills !== 'undefined') {
        const skill = Skills.nodes[recommendedSkill.id];
        if (skill) {
          Lessons.start(skill);
        }
      }
    });
    
    document.getElementById('skipToApp')?.addEventListener('click', () => {
      this.complete();
    });
  },

  // ============================================================
  // HELPERS
  // ============================================================
  
  getCategoryLabel(category) {
    const labels = {
      fomo: '🎯 FOMO Defense',
      urgency: '⏰ Urgency Tactics',
      subscriptions: '🔄 Subscription Traps',
      microtransactions: '🎮 Gaming Spending',
      credit: '📊 Credit Knowledge',
      investing: '📈 Investment Basics'
    };
    return labels[category] || category;
  },

  calculateResults() {
    const categories = [
      {
        id: 'defense',
        name: 'Defense',
        icon: '🛡️',
        keys: ['fomo', 'urgency'],
        maxScore: 6
      },
      {
        id: 'awareness',
        name: 'Awareness',
        icon: '👁️',
        keys: ['subscriptions', 'microtransactions'],
        maxScore: 6
      },
      {
        id: 'knowledge',
        name: 'Knowledge',
        icon: '📚',
        keys: ['credit', 'investing'],
        maxScore: 6
      }
    ];
    
    const results = categories.map(cat => {
      const score = cat.keys.reduce((sum, key) => sum + (this.answers[key] || 0), 0);
      const percent = Math.round((score / cat.maxScore) * 100);
      
      let level, levelText;
      if (percent >= 70) {
        level = 'vulnerable';
        levelText = 'VULNERABLE';
      } else if (percent >= 40) {
        level = 'developing';
        levelText = 'DEVELOPING';
      } else {
        level = 'solid';
        levelText = 'SOLID';
      }
      
      return {
        ...cat,
        score,
        percent: Math.min(percent + 20, 100), // Visual minimum
        level,
        levelText
      };
    });
    
    // Generate insight based on weakest area
    const weakest = results.reduce((a, b) => a.score > b.score ? a : b);
    const insights = {
      defense: "You're most vulnerable to pressure tactics. We'll train your resistance first.",
      awareness: "Subscription and gaming traps are your blind spot. Let's fix that.",
      knowledge: "Building financial knowledge will be your foundation. We'll start there."
    };
    
    return {
      categories: results,
      insight: insights[weakest.id] || "Let's build your financial defense system."
    };
  },

  getRecommendedSkill() {
    // Find weakest area and recommend appropriate starting skill
    const defenseScore = (this.answers.fomo || 0) + (this.answers.urgency || 0);
    const awarenessScore = (this.answers.subscriptions || 0) + (this.answers.microtransactions || 0);
    const knowledgeScore = (this.answers.credit || 0) + (this.answers.investing || 0);
    
    // Default to FOMO fundamentals as it's the most universally applicable
    let skillId = 'fomo_fundamentals';
    
    if (knowledgeScore > defenseScore && knowledgeScore > awarenessScore) {
      skillId = 'credit_score_decoded';
    } else if (defenseScore >= awarenessScore) {
      skillId = 'fomo_fundamentals';
    }
    
    // Get skill details
    if (typeof Skills !== 'undefined' && Skills.nodes[skillId]) {
      const skill = Skills.nodes[skillId];
      return {
        id: skillId,
        name: skill.name,
        icon: skill.icon,
        description: skill.description,
        reward: skill.reward
      };
    }
    
    // Fallback
    return {
      id: 'fomo_fundamentals',
      name: 'FOMO Fundamentals',
      icon: '🎯',
      description: 'Fear of Missing Out is costing you real money. Learn to spot it.',
      reward: 100
    };
  },

  // ============================================================
  // NAVIGATION
  // ============================================================
  
  nextStep() {
    if (this.currentStep < this.screens.length - 1) {
      this.currentStep++;
      this.renderStep();
      
      if (typeof AudioManager !== 'undefined') {
        AudioManager.play('stepForward');
      }
    }
  },

  skip() {
    this.complete();
  },

  complete() {
    this.markComplete();
    
    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) {
      overlay.classList.add('closing');
      setTimeout(() => {
        overlay.remove();
        // Refresh home page
        if (typeof App !== 'undefined') {
          App.showPage('home');
        }
      }, 400);
    }
  },

  attachActions() {
    document.getElementById('onboardNext')?.addEventListener('click', () => this.nextStep());
    document.getElementById('onboardSkip')?.addEventListener('click', () => this.skip());
  }
};

// Export
window.Onboarding = Onboarding;
console.log('onboarding.js loaded');
