/**
 * LESSONS.JS
 * Duolingo-style mini-lesson system
 * Flow: Info cards → Scenario question → Summary → Complete
 */

const Lessons = {
  // Current lesson state
  current: {
    skill: null,
    lesson: null,
    stepIndex: 0,
    correctAnswers: 0,
    totalQuestions: 0
  },

  /**
   * Start a lesson for a skill
   */
  start(skill) {
    if (!skill.lesson) {
      console.error('No lesson defined for skill:', skill.id);
      return;
    }

    this.current = {
      skill: skill,
      lesson: skill.lesson,
      stepIndex: 0,
      correctAnswers: 0,
      totalQuestions: skill.lesson.steps.filter(s => s.type === 'scenario').length
    };

    // Show lesson UI
    this.showLessonUI();
    this.renderStep();
  },

  /**
   * Create and show the lesson UI overlay
   */
  showLessonUI() {
    // Remove existing if any
    document.getElementById('lessonOverlay')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'lessonOverlay';
    overlay.className = 'lesson-overlay';
    overlay.innerHTML = `
      <div class="lesson-container">
        <!-- Header -->
        <div class="lesson-header">
          <button class="lesson-close" id="lessonClose">✕</button>
          <div class="lesson-progress">
            <div class="lesson-progress-fill" id="lessonProgressFill"></div>
          </div>
          <div class="lesson-step-count" id="lessonStepCount">1/${this.current.lesson.steps.length}</div>
        </div>

        <!-- Content area -->
        <div class="lesson-content" id="lessonContent">
          <!-- Populated by renderStep -->
        </div>

        <!-- Footer with continue button -->
        <div class="lesson-footer">
          <button class="lesson-continue-btn" id="lessonContinue">CONTINUE</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Setup event listeners
    document.getElementById('lessonClose').addEventListener('click', () => {
      if (confirm('Exit lesson? Your progress will be lost.')) {
        this.close();
      }
    });

    document.getElementById('lessonContinue').addEventListener('click', () => {
      this.nextStep();
    });
  },

  /**
   * Render the current step
   */
  renderStep() {
    const step = this.current.lesson.steps[this.current.stepIndex];
    const content = document.getElementById('lessonContent');
    const continueBtn = document.getElementById('lessonContinue');

    // Update progress
    const progress = ((this.current.stepIndex + 1) / this.current.lesson.steps.length) * 100;
    document.getElementById('lessonProgressFill').style.width = `${progress}%`;
    document.getElementById('lessonStepCount').textContent = 
      `${this.current.stepIndex + 1}/${this.current.lesson.steps.length}`;

    // Reset continue button
    continueBtn.disabled = false;
    continueBtn.textContent = 'CONTINUE';
    continueBtn.className = 'lesson-continue-btn';

    // Render based on step type
    switch (step.type) {
      case 'info':
        this.renderInfoStep(step, content);
        break;
      case 'scenario':
        this.renderScenarioStep(step, content, continueBtn);
        break;
      case 'summary':
        this.renderSummaryStep(step, content, continueBtn);
        break;
      default:
        console.error('Unknown step type:', step.type);
    }
  },

  /**
   * Render an info/learn step
   */
  renderInfoStep(step, content) {
    content.innerHTML = `
      <div class="lesson-info-step">
        <div class="lesson-icon">💡</div>
        <h2 class="lesson-title">${step.title}</h2>
        <p class="lesson-text">${step.content}</p>
        ${step.visual ? `<div class="lesson-visual" data-visual="${step.visual}"></div>` : ''}
      </div>
    `;
  },

  /**
   * Render a scenario/question step
   */
  renderScenarioStep(step, content, continueBtn) {
    // Disable continue until answer selected
    continueBtn.disabled = true;
    continueBtn.textContent = 'SELECT AN ANSWER';

    content.innerHTML = `
      <div class="lesson-scenario-step">
        <div class="lesson-icon">🎯</div>
        <h2 class="lesson-title">${step.title}</h2>
        <div class="lesson-scenario-box">
          <p class="lesson-scenario-text">${step.content}</p>
        </div>
        ${step.question ? `<p class="lesson-question">${step.question}</p>` : ''}
        <div class="lesson-choices" id="lessonChoices">
          ${step.choices.map((choice, i) => `
            <button class="lesson-choice" data-index="${i}" data-correct="${choice.correct}">
              ${choice.text}
            </button>
          `).join('')}
        </div>
        <div class="lesson-feedback hidden" id="lessonFeedback"></div>
      </div>
    `;

    // Add choice handlers
    document.querySelectorAll('.lesson-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleAnswer(btn, step, continueBtn);
      });
    });
  },

  /**
   * Handle answer selection
   */
  handleAnswer(btn, step, continueBtn) {
    // Prevent multiple selections
    if (document.querySelector('.lesson-choice.selected')) return;

    const isCorrect = btn.dataset.correct === 'true';
    btn.classList.add('selected', isCorrect ? 'correct' : 'incorrect');

    // Show correct answer if wrong
    if (!isCorrect) {
      document.querySelectorAll('.lesson-choice').forEach(b => {
        if (b.dataset.correct === 'true') {
          b.classList.add('show-correct');
        }
      });
    } else {
      this.current.correctAnswers++;
    }

    // Disable all choices
    document.querySelectorAll('.lesson-choice').forEach(b => {
      b.disabled = true;
    });

    // Show feedback
    const feedback = document.getElementById('lessonFeedback');
    feedback.innerHTML = `
      <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
      <div class="feedback-text">
        <strong>${isCorrect ? 'Correct!' : 'Not quite.'}</strong>
        <p>${step.explanation}</p>
      </div>
    `;
    feedback.classList.remove('hidden');
    feedback.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Enable continue
    continueBtn.disabled = false;
    continueBtn.textContent = 'CONTINUE';
  },

  /**
   * Render summary step
   */
  renderSummaryStep(step, content, continueBtn) {
    continueBtn.textContent = 'COMPLETE LESSON';
    continueBtn.classList.add('complete');

    content.innerHTML = `
      <div class="lesson-summary-step">
        <div class="lesson-icon">📋</div>
        <h2 class="lesson-title">${step.title}</h2>
        <div class="lesson-summary-card">
          <ul class="lesson-points">
            ${step.points.map(point => `<li>${point}</li>`).join('')}
          </ul>
        </div>
        <div class="lesson-save-hint">
          <span>💾</span> This info is saved to your Intel database
        </div>
      </div>
    `;
  },

  /**
   * Move to next step or complete
   */
  nextStep() {
    if (this.current.stepIndex < this.current.lesson.steps.length - 1) {
      this.current.stepIndex++;
      this.renderStep();
      
      // Scroll to top of content
      document.getElementById('lessonContent').scrollTop = 0;
    } else {
      this.complete();
    }
  },

  /**
   * Complete the lesson
   */
  complete() {
    const skill = this.current.skill;
    const score = this.current.correctAnswers;
    const total = this.current.totalQuestions;
    const isPerfect = score === total;

    // Calculate reward (base + bonus for perfect)
    const baseReward = skill.reward;
    const bonusMultiplier = isPerfect ? 1.5 : 1;
    const finalReward = Math.floor(baseReward * bonusMultiplier);

    // Update state
    State.completeLesson(skill.lesson.id, skill.id, finalReward);

    // Activate perk if any
    if (skill.perk) {
      State.activatePerk(`${skill.id}_perk`);
    }

    // Show completion screen
    this.showCompletionScreen(skill, score, total, finalReward, isPerfect);
  },

  /**
   * Show the completion screen
   */
  showCompletionScreen(skill, score, total, reward, isPerfect) {
    const content = document.getElementById('lessonContent');
    const continueBtn = document.getElementById('lessonContinue');
    
    continueBtn.textContent = 'RETURN TO GRID';
    continueBtn.onclick = () => this.close();

    // Hide progress bar
    document.querySelector('.lesson-progress').style.opacity = '0';
    document.getElementById('lessonStepCount').style.opacity = '0';

    content.innerHTML = `
      <div class="lesson-complete">
        <div class="complete-icon ${isPerfect ? 'perfect' : ''}">${isPerfect ? '🏆' : '✓'}</div>
        <h2 class="complete-title">${isPerfect ? 'PERFECT!' : 'LESSON COMPLETE!'}</h2>
        <p class="complete-skill">${skill.name} Mastered</p>
        
        <div class="complete-stats">
          <div class="stat">
            <div class="stat-value">${score}/${total}</div>
            <div class="stat-label">Correct</div>
          </div>
          <div class="stat highlight">
            <div class="stat-value">+${reward}</div>
            <div class="stat-label">SharkCoins</div>
          </div>
        </div>

        ${skill.perk ? `
          <div class="complete-perk">
            <div class="perk-label">NEW PERK UNLOCKED</div>
            <div class="perk-name">${skill.perk.description}</div>
          </div>
        ` : ''}

        ${isPerfect ? `
          <div class="perfect-bonus">
            <span>⭐</span> Perfect Score Bonus: +50%
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Close the lesson overlay
   */
  close() {
    const overlay = document.getElementById('lessonOverlay');
    if (overlay) {
      overlay.classList.add('closing');
      setTimeout(() => {
        overlay.remove();
        // Refresh skill tree to show updated state
        if (typeof App !== 'undefined') {
          App.setupSkillNodes();
        }
      }, 300);
    }
  }
};

// Make available globally
window.Lessons = Lessons;
console.log('lessons.js loaded');
