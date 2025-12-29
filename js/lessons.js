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
    if (!skill.lesson) {
      console.error('No lesson defined for skill:', skill.id);
      return;
    }

    this.current = {
      skill: skill,
      lesson: skill.lesson,
      stepIndex: 0,
      score: 0,
      maxScore: this.calculateMaxScore(skill.lesson),
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

    document.getElementById('lessonClose').addEventListener('click', () => {
      if (confirm('Exit lesson? Progress will be lost.')) {
        this.close();
      }
    });

    document.getElementById('lessonContinue').addEventListener('click', () => {
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
      } else {
        this.showBSFeedback("That was actually true!", false);
        bsButton.classList.add('wrong');
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
   * REVERSE - Build the trap yourself with sliders
   */
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
            <span class="result-value" id="monthlyResult">$0</span>
          </div>
          <div class="result-row highlight">
            <span class="result-label">${step.resultLabels?.total || 'Total You\'ll Pay'}</span>
            <span class="result-value" id="totalResult">$0</span>
          </div>
          <div class="result-row danger hidden" id="trapReveal">
            <span class="result-label">💀 ${step.resultLabels?.hidden || 'Hidden Cost'}</span>
            <span class="result-value" id="hiddenCost">$0</span>
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
      document.getElementById('monthlyResult').textContent = `$${result.monthly.toFixed(0)}`;
      document.getElementById('totalResult').textContent = `$${result.total.toLocaleString()}`;

      if (result.hidden > 0) {
        document.getElementById('trapReveal').classList.remove('hidden');
        document.getElementById('hiddenCost').textContent = `$${result.hidden.toLocaleString()}`;
      }

      // Check if goal met
      if (!goalMet && step.checkGoal(result)) {
        goalMet = true;
        this.showTrapSuccess(step, result, continueBtn);
      }
    };

    // Add slider listeners
    step.sliders.forEach((s, i) => {
      document.getElementById(`slider${i}`).addEventListener('input', calculate);
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

    // Show correct if wrong
    if (!isCorrect) {
      document.querySelectorAll('.scenario-choice').forEach(b => {
        if (b.dataset.correct === 'true') b.classList.add('show-correct');
      });
    } else {
      this.current.score += step.points || 100;
      this.updateProgress();
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
    const percentage = Math.round((this.current.score / this.current.maxScore) * 100);
    const reward = Math.floor(skill.reward * (percentage / 100));

    State.completeLesson(skill.lesson.id, skill.id, reward);
    if (skill.perk) State.activatePerk(`${skill.id}_perk`);

    this.showCompletion(skill, reward, percentage);
  },

  showCompletion(skill, reward, percentage) {
    const content = document.getElementById('lessonContent');
    
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
            <span class="reward-value">+${reward}</span>
            <span class="reward-label">SharkCoins</span>
          </div>
          <div class="reward-item">
            <span class="reward-value">${percentage}%</span>
            <span class="reward-label">Score</span>
          </div>
        </div>

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
