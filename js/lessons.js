/**
 * LESSONS.JS
 * Modular lesson system with multiple interactive component types
 * 
 * LESSON TYPES:
 * - artifact: Real-world ad/offer, find the hook
 * - redpen: Slash predatory clauses under time pressure
 * - bsdetector: Tap when the guru lies
 * - sharklens: Drag magnifier to decode jargon
 * - reverse: Build the trap yourself with sliders
 * - scenario: Mini story with choices
 * - info: Simple info card
 * - weapon: The takeaway tool/rule
 */

const Lessons = {
  // Current lesson state
  current: {
    skill: null,
    lesson: null,
    stepIndex: 0,
    score: 0,
    maxScore: 0,
    weapons: [] // Collected weapons/rules
  },

  /**
   * Start a lesson for a skill
   */
  start(skill) {
    // Check LessonData first for new-style lessons
    let lesson = null;
    
    if (typeof LessonData !== 'undefined' && LessonData[skill.id]) {
      lesson = LessonData[skill.id];
    } else if (skill.lesson) {
      lesson = skill.lesson;
    }
    
    if (!lesson) {
      console.error('No lesson defined for skill:', skill.id);
      alert('Lesson coming soon!');
      return;
    }

    this.current = {
      skill: skill,
      lesson: lesson,
      stepIndex: 0,
      score: 0,
      maxScore: this.calculateMaxScore(lesson),
      weapons: []
    };

    this.showLessonUI();
    this.renderStep();
  },

  /**
   * Calculate max possible score for a lesson
   */
  calculateMaxScore(lesson) {
    return lesson.steps.reduce((total, step) => {
      if (step.points) return total + step.points;
      if (step.type === 'artifact' || step.type === 'scenario') return total + 100;
      if (step.type === 'redpen') return total + (step.clauses?.filter(c => c.isPredatory).length || 3) * 50;
      if (step.type === 'bsdetector') return total + (step.lies?.length || 2) * 50;
      if (step.type === 'sharklens') return total + (step.terms?.length || 3) * 30;
      return total;
    }, 0);
  },

  /**
   * Create and show the lesson UI overlay
   */
  showLessonUI() {
    document.getElementById('lessonOverlay')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'lessonOverlay';
    overlay.className = 'lesson-overlay';
    overlay.innerHTML = `
      <div class="lesson-container">
        <div class="lesson-header">
          <button class="lesson-close" id="lessonClose">✕</button>
          <div class="lesson-progress">
            <div class="lesson-progress-fill" id="lessonProgressFill"></div>
          </div>
          <div class="lesson-score" id="lessonScore">0 pts</div>
        </div>
        <div class="lesson-content" id="lessonContent"></div>
        <div class="lesson-footer" id="lessonFooter">
          <button class="lesson-continue-btn" id="lessonContinue">CONTINUE</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    
    // Play lesson start sound
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play('lessonStart');
    }

    document.getElementById('lessonClose').addEventListener('click', () => {
      if (typeof AudioManager !== 'undefined') AudioManager.play('back');
      if (confirm('Exit lesson? Progress will be lost.')) {
        this.close();
      }
    });

    document.getElementById('lessonContinue').addEventListener('click', (e) => {
      if (typeof AudioManager !== 'undefined') AudioManager.play('stepForward');
      if (typeof Interactions !== 'undefined') Interactions.ripple(e, e.target);
      this.nextStep();
    });
  },

  /**
   * Update progress bar and score
   */
  updateProgress() {
    const progress = ((this.current.stepIndex + 1) / this.current.lesson.steps.length) * 100;
    document.getElementById('lessonProgressFill').style.width = `${progress}%`;
    document.getElementById('lessonScore').textContent = `${this.current.score} pts`;
  },

  /**
   * Render the current step based on type
   */
  renderStep() {
    const step = this.current.lesson.steps[this.current.stepIndex];
    const content = document.getElementById('lessonContent');
    const footer = document.getElementById('lessonFooter');
    const continueBtn = document.getElementById('lessonContinue');

    this.updateProgress();

    // Reset continue button
    continueBtn.disabled = false;
    continueBtn.textContent = 'CONTINUE';
    continueBtn.className = 'lesson-continue-btn';
    footer.classList.remove('hidden');

    // Render based on step type
    switch (step.type) {
      case 'info':
        this.renderInfo(step, content);
        break;
      case 'artifact':
        this.renderArtifact(step, content, continueBtn);
        break;
      case 'redpen':
        this.renderRedPen(step, content, continueBtn);
        break;
      case 'bsdetector':
        this.renderBSDetector(step, content, continueBtn);
        break;
      case 'sharklens':
        this.renderSharkLens(step, content, continueBtn);
        break;
      case 'reverse':
        this.renderReverse(step, content, continueBtn);
        break;
      case 'scenario':
        this.renderScenario(step, content, continueBtn);
        break;
      case 'gauntlet':
        this.renderGauntlet(step, content, continueBtn);
        break;
      case 'weapon':
        this.renderWeapon(step, content);
        break;
      case 'summary':
        this.renderSummary(step, content, continueBtn);
        break;
      default:
        console.error('Unknown step type:', step.type);
    }
  },

  // ============== STEP RENDERERS ==============

  /**
   * INFO - Simple educational card
   */
  renderInfo(step, content) {
    content.innerHTML = `
      <div class="lesson-step info-step">
        ${step.icon ? `<div class="step-icon">${step.icon}</div>` : ''}
        <h2 class="step-title">${step.title}</h2>
        <p class="step-content">${step.content}</p>
        ${step.visual ? `<div class="step-visual ${step.visual}"></div>` : ''}
      </div>
    `;
  },

  /**
   * ARTIFACT - Real-world document, find the hook
   */
  renderArtifact(step, content, continueBtn) {
    continueBtn.disabled = true;
    continueBtn.textContent = 'FIND THE HOOK';

    const hotspots = step.hotspots.map((h, i) => `
      <div class="artifact-hotspot" 
           data-index="${i}" 
           data-correct="${h.isHook}"
           style="left: ${h.x}%; top: ${h.y}%; width: ${h.width}%; height: ${h.height}%;">
      </div>
    `).join('');

    content.innerHTML = `
      <div class="lesson-step artifact-step">
        <div class="artifact-context">
          <span class="context-icon">${step.contextIcon || '📱'}</span>
          <span class="context-text">${step.context}</span>
        </div>
        <div class="artifact-container ${step.artifactType || 'ad'}">
          <div class="artifact-content">
            ${step.artifactHTML}
          </div>
          <div class="artifact-hotspots">${hotspots}</div>
        </div>
        <p class="artifact-prompt">${step.prompt || 'Tap the part that makes this dangerous.'}</p>
        <div class="artifact-feedback hidden" id="artifactFeedback"></div>
      </div>
    `;

    // Add hotspot click handlers
    content.querySelectorAll('.artifact-hotspot').forEach(spot => {
      spot.addEventListener('click', () => this.handleArtifactTap(spot, step, continueBtn));
    });
  },

  handleArtifactTap(spot, step, continueBtn) {
    if (spot.classList.contains('tapped')) return;

    const isCorrect = spot.dataset.correct === 'true';
    const index = parseInt(spot.dataset.index);
    const hotspot = step.hotspots[index];

    spot.classList.add('tapped', isCorrect ? 'correct' : 'wrong');
    
    // Audio and visual feedback
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play(isCorrect ? 'hotspotHook' : 'hotspotReveal');
    }
    if (typeof Interactions !== 'undefined') {
      const rect = spot.getBoundingClientRect();
      if (isCorrect) {
        Interactions.particleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
          colors: ['#c75d5d', '#dc2626', '#f87171'],
          count: 6,
          spread: 40
        });
        Interactions.haptic('medium');
      } else {
        Interactions.haptic('light');
      }
    }

    const feedback = document.getElementById('artifactFeedback');
    feedback.innerHTML = `
      <div class="feedback-icon ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✓' : '✗'}</div>
      <div class="feedback-text">
        <strong>${isCorrect ? 'You found it!' : 'Not quite.'}</strong>
        <p>${hotspot.explanation}</p>
      </div>
    `;
    feedback.classList.remove('hidden');
    feedback.className = `artifact-feedback ${isCorrect ? 'correct' : 'wrong'}`;

    if (isCorrect) {
      this.current.score += step.points || 100;
      this.updateProgress();
      continueBtn.disabled = false;
      continueBtn.textContent = 'CONTINUE';
      
      // Disable other hotspots
      document.querySelectorAll('.artifact-hotspot').forEach(h => {
        h.style.pointerEvents = 'none';
      });
    }
  },

  /**
   * REDPEN - Slash predatory clauses under time pressure
   */
  renderRedPen(step, content, continueBtn) {
    continueBtn.disabled = true;
    continueBtn.textContent = 'SLASH THE TRAPS';

    const clauses = step.clauses.map((c, i) => `
      <div class="contract-clause ${c.isPredatory ? 'predatory' : 'safe'}" data-index="${i}">
        <span class="clause-number">${i + 1}.</span>
        <span class="clause-text">${c.text}</span>
        <div class="slash-mark hidden">✗</div>
      </div>
    `).join('');

    content.innerHTML = `
      <div class="lesson-step redpen-step">
        <div class="redpen-header">
          <h2 class="step-title">🔴 Contract Surgeon</h2>
          <div class="redpen-timer" id="redpenTimer">${step.timeLimit || 30}s</div>
        </div>
        <p class="step-subtitle">${step.instruction || 'Slash the predatory clauses before time runs out!'}</p>
        <div class="contract-document">
          <div class="contract-header">${step.documentTitle || 'STANDARD AGREEMENT'}</div>
          <div class="contract-body">${clauses}</div>
        </div>
        <div class="redpen-score">
          <span id="slashCount">0</span> / ${step.clauses.filter(c => c.isPredatory).length} traps found
        </div>
        <div class="redpen-feedback hidden" id="redpenFeedback"></div>
      </div>
    `;

    // Track state
    let slashed = 0;
    let mistakes = 0;
    const totalPredatory = step.clauses.filter(c => c.isPredatory).length;
    let timeLeft = step.timeLimit || 30;
    
    // Timer
    const timerEl = document.getElementById('redpenTimer');
    const timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `${timeLeft}s`;
      if (timeLeft <= 10) timerEl.classList.add('warning');
      if (timeLeft <= 0) {
        clearInterval(timer);
        this.finishRedPen(step, slashed, mistakes, totalPredatory, continueBtn, false);
      }
    }, 1000);

    // Clause click handlers
    content.querySelectorAll('.contract-clause').forEach(clause => {
      clause.addEventListener('click', () => {
        if (clause.classList.contains('slashed')) return;

        clause.classList.add('slashed');
        clause.querySelector('.slash-mark').classList.remove('hidden');

        if (clause.classList.contains('predatory')) {
          slashed++;
          document.getElementById('slashCount').textContent = slashed;
          this.current.score += 50;
          this.updateProgress();

          if (slashed === totalPredatory) {
            clearInterval(timer);
            this.finishRedPen(step, slashed, mistakes, totalPredatory, continueBtn, true);
          }
        } else {
          mistakes++;
          clause.classList.add('mistake');
        }
      });
    });
  },

  finishRedPen(step, slashed, mistakes, total, continueBtn, completed) {
    const feedback = document.getElementById('redpenFeedback');
    const perfect = slashed === total && mistakes === 0;

    feedback.innerHTML = `
      <div class="redpen-result ${perfect ? 'perfect' : completed ? 'good' : 'failed'}">
        <div class="result-icon">${perfect ? '🎯' : completed ? '✓' : '⏰'}</div>
        <div class="result-text">
          <strong>${perfect ? 'PERFECT!' : completed ? 'Got them!' : 'Time\'s up!'}</strong>
          <p>Found ${slashed}/${total} traps${mistakes > 0 ? `, ${mistakes} false slashes` : ''}</p>
        </div>
      </div>
      ${step.teachAfter ? `<div class="redpen-teach">${step.teachAfter}</div>` : ''}
    `;
    feedback.classList.remove('hidden');

    // Highlight missed predatory clauses
    document.querySelectorAll('.contract-clause.predatory:not(.slashed)').forEach(c => {
      c.classList.add('missed');
    });

    continueBtn.disabled = false;
    continueBtn.textContent = 'CONTINUE';
  },

  /**
   * BSDETECTOR - Tap when the guru lies
   */
  renderBSDetector(step, content, continueBtn) {
    continueBtn.disabled = true;
    continueBtn.textContent = 'WATCH & DETECT';

    content.innerHTML = `
      <div class="lesson-step bsdetector-step">
        <div class="video-container">
          <div class="video-header">
            <span class="platform-icon">${step.platform || '📱'}</span>
            <span class="guru-name">${step.guruName || 'FinanceGuru2024'}</span>
            <span class="guru-badge">💎 Verified</span>
          </div>
          <div class="video-content">
            <div class="guru-avatar">${step.guruAvatar || '🧔'}</div>
            <div class="speech-bubble" id="speechBubble"></div>
          </div>
          <div class="video-progress">
            <div class="video-progress-fill" id="videoProgress"></div>
          </div>
        </div>
        <button class="bs-button" id="bsButton">
          <span class="bs-icon">🚨</span>
          <span class="bs-text">BS!</span>
        </button>
        <div class="bs-score">
          <span id="bsFound">0</span> / ${step.script.filter(s => s.isLie).length} lies caught
        </div>
        <div class="bs-feedback hidden" id="bsFeedback"></div>
      </div>
    `;

    // Play through the script
    let currentLine = 0;
    let liesFound = 0;
    let canTap = false;
    let currentIsLie = false;
    const lines = step.script;
    const totalLies = lines.filter(l => l.isLie).length;
    const speechBubble = document.getElementById('speechBubble');
    const bsButton = document.getElementById('bsButton');
    const progressBar = document.getElementById('videoProgress');

    const showLine = () => {
      if (currentLine >= lines.length) {
        this.finishBSDetector(step, liesFound, totalLies, continueBtn);
        return;
      }

      const line = lines[currentLine];
      speechBubble.textContent = line.text;
      speechBubble.classList.add('speaking');
      canTap = true;
      currentIsLie = line.isLie || false;

      progressBar.style.width = `${((currentLine + 1) / lines.length) * 100}%`;

      // Auto-advance after delay
      setTimeout(() => {
        if (canTap && currentIsLie) {
          // Missed a lie
          speechBubble.classList.add('missed-lie');
        }
        speechBubble.classList.remove('speaking');
        canTap = false;
        currentLine++;
        setTimeout(showLine, 500);
      }, line.duration || 3000);
    };

    // BS button handler
    bsButton.addEventListener('click', () => {
      if (!canTap) return;

      canTap = false;
      const line = lines[currentLine];

      if (currentIsLie) {
        liesFound++;
        document.getElementById('bsFound').textContent = liesFound;
        this.current.score += 50;
        this.updateProgress();
        
        this.showBSFeedback(line.truth, true);
        bsButton.classList.add('correct');
        
        // Audio/visual feedback for catching a lie
        if (typeof AudioManager !== 'undefined') AudioManager.play('lieReveal');
        if (typeof Interactions !== 'undefined') {
          Interactions.correctFlash();
          Interactions.haptic('success');
        }
      } else {
        this.showBSFeedback("That was actually true!", false);
        bsButton.classList.add('wrong');
        
        // Audio/visual feedback for false alarm
        if (typeof AudioManager !== 'undefined') AudioManager.play('incorrect');
        if (typeof Interactions !== 'undefined') {
          Interactions.screenShake(3, 150);
          Interactions.haptic('error');
        }
      }

      setTimeout(() => {
        bsButton.classList.remove('correct', 'wrong');
        document.getElementById('bsFeedback').classList.add('hidden');
        speechBubble.classList.remove('speaking');
        currentLine++;
        setTimeout(showLine, 500);
      }, 2500);
    });

    // Start the video
    setTimeout(showLine, 1000);
  },

  showBSFeedback(text, isCorrect) {
    const feedback = document.getElementById('bsFeedback');
    feedback.innerHTML = `
      <div class="bs-result ${isCorrect ? 'correct' : 'wrong'}">
        <strong>${isCorrect ? '🎯 CAUGHT!' : '❌ False alarm!'}</strong>
        <p>${text}</p>
      </div>
    `;
    feedback.classList.remove('hidden');
  },

  finishBSDetector(step, liesFound, totalLies, continueBtn) {
    const feedback = document.getElementById('bsFeedback');
    const perfect = liesFound === totalLies;

    feedback.innerHTML = `
      <div class="bs-final ${perfect ? 'perfect' : 'done'}">
        <div class="result-icon">${perfect ? '🏆' : '✓'}</div>
        <strong>${perfect ? 'PERFECT DETECTION!' : 'Video Complete'}</strong>
        <p>You caught ${liesFound} of ${totalLies} lies</p>
      </div>
    `;
    feedback.classList.remove('hidden');

    document.getElementById('bsButton').disabled = true;
    continueBtn.disabled = false;
    continueBtn.textContent = 'CONTINUE';
  },

  /**
   * SHARKLENS - Tap terms to decode jargon
   */
  renderSharkLens(step, content, continueBtn) {
    continueBtn.disabled = true;
    continueBtn.textContent = 'DECODE ALL TERMS';

    content.innerHTML = `
      <div class="lesson-step sharklens-step">
        <h2 class="step-title">🔍 Shark Lens</h2>
        <p class="step-subtitle">${step.instruction || 'Tap the highlighted terms to reveal their true meaning'}</p>
        <div class="document-container ${step.documentType || 'statement'}">
          <div class="document-header">${step.documentTitle || 'ACCOUNT STATEMENT'}</div>
          <div class="document-body" id="documentBody">
            ${step.documentText}
          </div>
        </div>
        <div class="decode-counter">
          <span id="decodedCount">0</span> / ${step.terms.length} decoded
        </div>
        <div class="sharklens-reveal hidden" id="sharkReveal"></div>
      </div>
    `;

    let decoded = 0;

    // Replace jargon terms with tappable spans
    const docBody = document.getElementById('documentBody');
    step.terms.forEach((term, i) => {
      const regex = new RegExp(`(${term.jargon})`, 'gi');
      docBody.innerHTML = docBody.innerHTML.replace(regex, 
        `<span class="jargon-term" data-index="${i}">$1</span>`
      );
    });

    docBody.querySelectorAll('.jargon-term').forEach(termEl => {
      termEl.addEventListener('click', () => {
        if (termEl.classList.contains('decoded')) return;

        const index = parseInt(termEl.dataset.index);
        const termData = step.terms[index];

        termEl.classList.add('decoded');

        decoded++;
        document.getElementById('decodedCount').textContent = decoded;
        this.current.score += 30;
        this.updateProgress();

        // Show reveal popup
        const reveal = document.getElementById('sharkReveal');
        reveal.innerHTML = `
          <div class="reveal-content">
            <div class="reveal-original">"${termData.jargon}"</div>
            <div class="reveal-arrow">↓</div>
            <div class="reveal-translation">"${termData.realMeaning}"</div>
          </div>
        `;
        reveal.classList.remove('hidden');

        setTimeout(() => reveal.classList.add('hidden'), 2500);

        if (decoded === step.terms.length) {
          continueBtn.disabled = false;
          continueBtn.textContent = 'CONTINUE';
        }
      });
    });
  },

  /**
   * GAUNTLET - Multi-screen escape challenge
   */
  renderGauntlet(step, content, continueBtn) {
    this.gauntletState = {
      screen: 0,
      trapsTriggered: 0,
      almostRenewed: 0,
      startTime: Date.now(),
      screens: step.screens
    };

    content.innerHTML = `
      <div class="lesson-step gauntlet-step">
        <div class="gauntlet-header">
          <div class="gauntlet-context">${step.context}</div>
          <div class="gauntlet-timer">⏱️ Trial ends in: <span id="gauntletTimer">23:00</span></div>
        </div>
        <div class="gauntlet-screen-container" id="gauntletScreen"></div>
        <div class="gauntlet-status">
          <span>🪤 Traps: <span id="trapCount">0</span></span>
          <span>⚠️ Close calls: <span id="renewCount">0</span></span>
        </div>
      </div>
    `;

    // Start fake countdown
    this.startGauntletTimer();
    
    // Render first screen
    this.renderGauntletScreen(0, continueBtn);
  },

  startGauntletTimer() {
    let minutes = 22;
    let seconds = 59;
    const timerEl = document.getElementById('gauntletTimer');
    
    this.gauntletTimerInterval = setInterval(() => {
      seconds--;
      if (seconds < 0) { seconds = 59; minutes--; }
      if (timerEl) {
        timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (minutes < 5) timerEl.style.color = '#ff4444';
      }
    }, 1000);
  },

  renderGauntletScreen(index, continueBtn) {
    const screen = this.gauntletState.screens[index];
    const container = document.getElementById('gauntletScreen');
    
    if (!screen) {
      this.finishGauntlet(continueBtn);
      return;
    }

    container.innerHTML = `
      <div class="gauntlet-card ${screen.type || ''}">
        ${screen.html}
      </div>
      <div class="gauntlet-feedback hidden" id="gauntletFeedback"></div>
    `;

    // Setup interactions based on screen type
    this.setupGauntletScreen(screen, index, continueBtn);
  },

  setupGauntletScreen(screen, index, continueBtn) {
    const container = document.getElementById('gauntletScreen');
    
    screen.traps?.forEach(trap => {
      const el = container.querySelector(trap.selector);
      if (el) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          if (trap.isCorrect) {
            this.gauntletAdvance(index, trap.successMsg, continueBtn);
          } else {
            this.gauntletTrap(trap.trapType, trap.message);
          }
        });
      }
    });

    // Special screen behaviors
    if (screen.swapButtons) {
      setTimeout(() => {
        const btns = container.querySelectorAll('.swap-btn');
        if (btns.length === 2) {
          const parent = btns[0].parentElement;
          parent.insertBefore(btns[1], btns[0]);
        }
      }, screen.swapDelay || 2000);
    }

    if (screen.hiddenElement) {
      const hidden = container.querySelector(screen.hiddenElement.selector);
      if (hidden) {
        setTimeout(() => {
          hidden.classList.add('barely-visible');
        }, screen.hiddenElement.showAfter || 500);
      }
    }

    if (screen.requiresInput) {
      const input = container.querySelector('input[type="text"]');
      const btn = container.querySelector(screen.requiresInput.buttonSelector);
      if (input && btn) {
        btn.classList.add('disabled');
        input.addEventListener('input', () => {
          if (input.value.length >= 3) {
            btn.classList.remove('disabled');
            btn.addEventListener('click', () => {
              this.gauntletAdvance(index, screen.requiresInput.successMsg, continueBtn);
            });
          }
        });
      }
    }
  },

  gauntletTrap(trapType, message) {
    const feedback = document.getElementById('gauntletFeedback');
    this.gauntletState.trapsTriggered++;
    
    if (trapType === 'renew') {
      this.gauntletState.almostRenewed++;
      document.getElementById('renewCount').textContent = this.gauntletState.almostRenewed;
    }
    
    document.getElementById('trapCount').textContent = this.gauntletState.trapsTriggered;
    
    feedback.innerHTML = `<div class="trap-message">❌ ${message}</div>`;
    feedback.classList.remove('hidden');
    
    setTimeout(() => {
      feedback.classList.add('hidden');
    }, 2500);
  },

  gauntletAdvance(currentIndex, message, continueBtn) {
    const feedback = document.getElementById('gauntletFeedback');
    feedback.innerHTML = `<div class="success-message">✓ ${message}</div>`;
    feedback.classList.remove('hidden');
    
    setTimeout(() => {
      this.gauntletState.screen = currentIndex + 1;
      this.renderGauntletScreen(currentIndex + 1, continueBtn);
    }, 1500);
  },

  finishGauntlet(continueBtn) {
    clearInterval(this.gauntletTimerInterval);
    
    const elapsed = Math.floor((Date.now() - this.gauntletState.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const container = document.getElementById('gauntletScreen');
    container.innerHTML = `
      <div class="gauntlet-complete">
        <div class="gauntlet-victory">🎉 YOU ESCAPED!</div>
        
        <div class="gauntlet-stats">
          <div class="stat-row">
            <span class="stat-label">Time:</span>
            <span class="stat-value">${minutes}:${seconds.toString().padStart(2, '0')}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Traps triggered:</span>
            <span class="stat-value">${this.gauntletState.trapsTriggered}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Almost renewed:</span>
            <span class="stat-value">${this.gauntletState.almostRenewed}</span>
          </div>
        </div>

        <div class="gauntlet-tactics">
          <div class="tactics-header">TACTICS USED AGAINST YOU:</div>
          <div class="tactic-item">✓ Confirm-shaming <span class="tactic-note">("I hate entertainment")</span></div>
          <div class="tactic-item">✓ Fake surveys <span class="tactic-note">(stalling tactic)</span></div>
          <div class="tactic-item">✓ Button-swapping <span class="tactic-note">(misdirection)</span></div>
          <div class="tactic-item">✓ Confusing language <span class="tactic-note">(trick questions)</span></div>
          <div class="tactic-item">✓ Guilt-trip video <span class="tactic-note">(emotional manipulation)</span></div>
          <div class="tactic-item">✓ Friction typing <span class="tactic-note">(exhaustion tactic)</span></div>
        </div>

        <div class="gauntlet-lesson">
          Real companies do ALL of this.<br>
          <strong>Now you know what to expect.</strong>
        </div>
      </div>
    `;

    // Award points based on performance
    const bonus = Math.max(0, 100 - (this.gauntletState.trapsTriggered * 15) - (this.gauntletState.almostRenewed * 25));
    this.current.score += bonus;
    document.getElementById('lessonScore').textContent = this.current.score;

    continueBtn.classList.remove('hidden');
    continueBtn.textContent = 'CONTINUE';
  },
  renderReverse(step, content, continueBtn) {
    content.innerHTML = `
      <div class="lesson-step reverse-step">
        <div class="reverse-header">
          <span class="villain-icon">${step.villainIcon || '🦹'}</span>
          <h2 class="step-title">${step.title || 'Design the Trap'}</h2>
        </div>
        <p class="step-subtitle">${step.instruction}</p>
        
        <div class="trap-builder">
          ${step.sliders.map((s, i) => `
            <div class="slider-group">
              <label>${s.label}</label>
              <input type="range" 
                     id="slider${i}" 
                     min="${s.min}" 
                     max="${s.max}" 
                     value="${s.default}"
                     step="${s.step || 1}">
              <span class="slider-value" id="sliderVal${i}">${s.default}${s.suffix || ''}</span>
            </div>
          `).join('')}
        </div>

        <div class="trap-result">
          <div class="result-row">
            <span class="result-label">${step.resultLabels?.monthly || 'Monthly Payment'}</span>
            <span class="result-value" id="monthlyResult">0</span>
          </div>
          <div class="result-row highlight">
            <span class="result-label">${step.resultLabels?.total || 'Total You\'ll Pay'}</span>
            <span class="result-value" id="totalResult">0</span>
          </div>
          <div class="result-row danger hidden" id="trapReveal">
            <span class="result-label">💀 ${step.resultLabels?.hidden || 'Hidden Cost'}</span>
            <span class="result-value" id="hiddenCost">0</span>
          </div>
        </div>

        <div class="trap-goal">
          <strong>🎯 Your Goal:</strong> ${step.goal}
        </div>
        <div class="trap-feedback hidden" id="trapFeedback"></div>
      </div>
    `;

    let goalMet = false;

    const calculate = () => {
      const values = step.sliders.map((s, i) => {
        const val = parseFloat(document.getElementById(`slider${i}`).value);
        document.getElementById(`sliderVal${i}`).textContent = val + (s.suffix || '');
        return val;
      });

      const result = step.calculate(values);
      
      // Format based on result type (check if it looks like a percentage vs currency)
      const monthlyDisplay = result.monthly < 100 && step.resultLabels?.monthly?.toLowerCase().includes('score') 
        ? result.monthly 
        : `$${result.monthly.toFixed(0)}`;
      const totalDisplay = result.total < 100 && step.resultLabels?.total?.toLowerCase().includes('rate')
        ? `${result.total.toFixed(1)}%`
        : `$${result.total.toLocaleString()}`;
      
      document.getElementById('monthlyResult').textContent = monthlyDisplay;
      document.getElementById('totalResult').textContent = totalDisplay;

      if (result.hidden > 0) {
        document.getElementById('trapReveal').classList.remove('hidden');
        document.getElementById('hiddenCost').textContent = step.resultLabels?.hidden?.toLowerCase().includes('sales')
          ? `+${result.hidden}`
          : `$${result.hidden.toLocaleString()}`;
      }

      // Check if goal met
      if (!goalMet && step.checkGoal(result)) {
        goalMet = true;
        this.showTrapSuccess(step, result, continueBtn);
      }
    };

    // Add slider listeners with audio feedback
    step.sliders.forEach((s, i) => {
      const slider = document.getElementById(`slider${i}`);
      slider.addEventListener('input', calculate);
      
      // Throttled audio feedback for sliders
      let lastSound = 0;
      slider.addEventListener('input', () => {
        const now = Date.now();
        if (now - lastSound > 50 && typeof AudioManager !== 'undefined') {
          AudioManager.play('sliderMove');
          lastSound = now;
        }
      });
    });

    calculate();
  },

  showTrapSuccess(step, result, continueBtn) {
    const feedback = document.getElementById('trapFeedback');
    feedback.innerHTML = `
      <div class="trap-success">
        <div class="success-icon">💡</div>
        <strong>You built the trap!</strong>
        <p>${step.revelation}</p>
      </div>
    `;
    feedback.classList.remove('hidden');

    this.current.score += step.points || 100;
    this.updateProgress();
    continueBtn.disabled = false;
    
    // Audio and visual celebration
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play('correct');
    }
    if (typeof Interactions !== 'undefined') {
      Interactions.correctFlash();
      const feedbackEl = document.getElementById('trapFeedback');
      if (feedbackEl) {
        const rect = feedbackEl.getBoundingClientRect();
        Interactions.particleBurst(rect.left + rect.width / 2, rect.top, {
          count: 10,
          spread: 60
        });
      }
      Interactions.haptic('success');
    }
  },

  /**
   * SCENARIO - Mini story with choices
   */
  renderScenario(step, content, continueBtn) {
    continueBtn.disabled = true;
    continueBtn.textContent = 'CHOOSE';

    content.innerHTML = `
      <div class="lesson-step scenario-step">
        ${step.speaker ? `
          <div class="scenario-speaker">
            <span class="speaker-avatar">${step.speaker.avatar}</span>
            <span class="speaker-name">${step.speaker.name}</span>
          </div>
        ` : ''}
        <div class="scenario-text">${step.content}</div>
        <div class="scenario-choices">
          ${step.choices.map((c, i) => `
            <button class="scenario-choice" data-index="${i}" data-correct="${c.correct}">
              ${c.text}
            </button>
          `).join('')}
        </div>
        <div class="scenario-feedback hidden" id="scenarioFeedback"></div>
      </div>
    `;

    content.querySelectorAll('.scenario-choice').forEach(btn => {
      btn.addEventListener('click', () => this.handleScenarioChoice(btn, step, continueBtn));
    });
  },

  handleScenarioChoice(btn, step, continueBtn) {
    if (document.querySelector('.scenario-choice.selected')) return;

    const isCorrect = btn.dataset.correct === 'true';
    const index = parseInt(btn.dataset.index);
    const choice = step.choices[index];

    btn.classList.add('selected', isCorrect ? 'correct' : 'wrong');
    
    // Audio and visual feedback
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play(isCorrect ? 'correct' : 'incorrect');
    }
    if (typeof Interactions !== 'undefined') {
      if (isCorrect) {
        Interactions.correctFlash();
        Interactions.haptic('success');
        // Particle burst from button
        const rect = btn.getBoundingClientRect();
        Interactions.particleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
          colors: ['#2ab5a0', '#4dd8e8', '#7eecd3'],
          count: 8,
          spread: 50
        });
      } else {
        Interactions.incorrectFlash();
        Interactions.screenShake(4, 200);
        Interactions.haptic('error');
      }
    }

    // Show correct if wrong
    if (!isCorrect) {
      document.querySelectorAll('.scenario-choice').forEach(b => {
        if (b.dataset.correct === 'true') b.classList.add('show-correct');
      });
    } else {
      this.current.score += step.points || 100;
      this.updateProgress();
      
      // Animate score
      if (typeof Interactions !== 'undefined') {
        const scoreEl = document.getElementById('lessonScore');
        scoreEl.style.transition = 'transform 0.2s, color 0.2s';
        scoreEl.style.transform = 'scale(1.2)';
        scoreEl.style.color = '#d4af37';
        setTimeout(() => {
          scoreEl.style.transform = 'scale(1)';
          scoreEl.style.color = '';
        }, 200);
      }
    }

    document.querySelectorAll('.scenario-choice').forEach(b => b.disabled = true);

    const feedback = document.getElementById('scenarioFeedback');
    feedback.innerHTML = `
      <div class="feedback-box ${isCorrect ? 'correct' : 'wrong'}">
        <strong>${isCorrect ? '✓ Correct!' : '✗ Not quite'}</strong>
        <p>${choice.explanation}</p>
      </div>
    `;
    feedback.classList.remove('hidden');

    continueBtn.disabled = false;
    continueBtn.textContent = 'CONTINUE';
  },

  /**
   * WEAPON - The takeaway tool/rule
   */
  renderWeapon(step, content) {
    this.current.weapons.push(step);

    content.innerHTML = `
      <div class="lesson-step weapon-step">
        <div class="weapon-unlock">
          <div class="weapon-icon">⚔️</div>
          <div class="weapon-label">NEW WEAPON ACQUIRED</div>
        </div>
        <div class="weapon-card">
          <div class="weapon-name">${step.name}</div>
          <div class="weapon-description">${step.description}</div>
          ${step.phrase ? `
            <div class="weapon-phrase">
              <span class="phrase-label">Say this:</span>
              <span class="phrase-text">"${step.phrase}"</span>
            </div>
          ` : ''}
        </div>
        <div class="weapon-saved">
          <span>💾</span> Saved to your Arsenal
        </div>
      </div>
    `;
    
    // Play weapon unlock celebration
    if (typeof AudioManager !== 'undefined') {
      AudioManager.play('weaponUnlock');
    }
    if (typeof Interactions !== 'undefined') {
      setTimeout(() => {
        const weaponIcon = content.querySelector('.weapon-icon');
        if (weaponIcon) {
          const rect = weaponIcon.getBoundingClientRect();
          Interactions.celebrate(rect.left + rect.width / 2, rect.top + rect.height / 2, 'weapon');
        }
      }, 300);
    }
  },

  /**
   * SUMMARY - Final summary with score
   */
  renderSummary(step, content, continueBtn) {
    const percentage = Math.round((this.current.score / this.current.maxScore) * 100);
    const grade = percentage >= 90 ? 'S' : percentage >= 70 ? 'A' : percentage >= 50 ? 'B' : 'C';

    continueBtn.textContent = 'COMPLETE';
    continueBtn.classList.add('complete');

    content.innerHTML = `
      <div class="lesson-step summary-step">
        <div class="summary-grade grade-${grade}">${grade}</div>
        <h2 class="summary-title">${step.title || 'Lesson Complete!'}</h2>
        <div class="summary-score">${this.current.score} / ${this.current.maxScore} points</div>
        
        ${this.current.weapons.length > 0 ? `
          <div class="summary-weapons">
            <div class="weapons-label">Weapons Acquired:</div>
            ${this.current.weapons.map(w => `
              <div class="weapon-mini">⚔️ ${w.name}</div>
            `).join('')}
          </div>
        ` : ''}

        ${step.keyTakeaways ? `
          <div class="summary-takeaways">
            <div class="takeaways-label">Key Takeaways:</div>
            <ul>
              ${step.keyTakeaways.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
    
    // Play grade reveal sound and celebration
    setTimeout(() => {
      if (typeof AudioManager !== 'undefined') {
        AudioManager.play(`grade${grade}`);
      }
      if (typeof Interactions !== 'undefined' && grade === 'S') {
        const gradeEl = content.querySelector('.summary-grade');
        if (gradeEl) {
          const rect = gradeEl.getBoundingClientRect();
          Interactions.celebrate(rect.left + rect.width / 2, rect.top + rect.height / 2, 'gradeS');
        }
      }
    }, 400);
  },

  /**
   * Move to next step or complete
   */
  nextStep() {
    if (this.current.stepIndex < this.current.lesson.steps.length - 1) {
      this.current.stepIndex++;
      this.renderStep();
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
    const lesson = this.current.lesson;
    const percentage = Math.round((this.current.score / this.current.maxScore) * 100);

    // Get lesson ID - could be from lesson object or skill id
    const lessonId = lesson.id || `lesson_${skill.id}`;
    
    // Use Economy engine for rewards
    let result;
    if (typeof Economy !== 'undefined') {
      result = Economy.grantLessonReward(skill.id, percentage);
    } else {
      // Fallback if Economy not loaded
      const reward = Math.floor(skill.reward * (percentage / 100));
      State.addCoins(reward);
      result = { coins: reward, xp: 0 };
    }
    
    // Mark lesson complete and activate perk
    State.completeLesson(lessonId, skill.id, 0); // 0 because Economy already granted coins
    if (skill.perk) State.activatePerk(`${skill.id}_perk`);

    this.showCompletion(skill, result, percentage);
  },

  showCompletion(skill, result, percentage) {
    const content = document.getElementById('lessonContent');
    const coins = result.coins || 0;
    const xp = result.xp || 0;
    const leveledUp = result.leveledUp || false;
    
    document.querySelector('.lesson-progress').style.opacity = '0';
    document.getElementById('lessonScore').style.opacity = '0';

    content.innerHTML = `
      <div class="lesson-complete">
        <div class="complete-burst"></div>
        <div class="complete-icon ${percentage >= 90 ? 'perfect' : ''}">${percentage >= 90 ? '🏆' : '✓'}</div>
        <h2 class="complete-title">${percentage >= 90 ? 'MASTERED!' : 'COMPLETE!'}</h2>
        <p class="complete-skill">${skill.name}</p>
        
        <div class="complete-rewards">
          <div class="reward-item">
            <span class="reward-value">+${coins}</span>
            <span class="reward-label">SharkCoins</span>
          </div>
          <div class="reward-item">
            <span class="reward-value">+${xp}</span>
            <span class="reward-label">XP</span>
          </div>
          <div class="reward-item">
            <span class="reward-value">${percentage}%</span>
            <span class="reward-label">Score</span>
          </div>
        </div>

        ${result.multiplier > 1 ? `
          <div class="multiplier-bonus">
            <span>🔥 ${Math.round((result.multiplier - 1) * 100)}% Bonus Applied!</span>
          </div>
        ` : ''}

        ${leveledUp ? `
          <div class="level-up-notice">
            <span>🎉 LEVEL UP! Now Level ${result.newLevel}</span>
          </div>
        ` : ''}

        ${skill.perk ? `
          <div class="complete-perk">
            <div class="perk-unlocked">🔓 PERK UNLOCKED</div>
            <div class="perk-desc">${skill.perk.description}</div>
          </div>
        ` : ''}
      </div>
    `;

    const continueBtn = document.getElementById('lessonContinue');
    continueBtn.textContent = 'RETURN';
    continueBtn.onclick = () => this.close();
  },

  /**
   * Close lesson overlay
   */
  close() {
    const overlay = document.getElementById('lessonOverlay');
    if (overlay) {
      overlay.classList.add('closing');
      setTimeout(() => {
        overlay.remove();
        if (typeof App !== 'undefined') App.setupSkillNodes();
      }, 300);
    }
  }
};

window.Lessons = Lessons;
console.log('lessons.js loaded');
