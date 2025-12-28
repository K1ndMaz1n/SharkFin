/**
 * SIMULATIONS.JS
 * Handles scenario content, simulation flow, and player choices
 */

const Simulations = {
  // All available scenarios
  scenarios: {
    'car_dealer': {
      id: 'car_dealer',
      title: 'Car Dealer Showdown',
      desc: 'Jake has sold 400+ cars. His close rate is 78%. Don\'t become a statistic.',
      reward: 350,
      difficulty: 'MEDIUM',
      time: 10,
      category: 'purchase',
      isJRPG: true  // Flag to use new system
    },
    'crypto_rugpull': {
      id: 'crypto_rugpull',
      title: 'Crypto Rug-Pull Survival',
      desc: 'Navigate a volatile token launch. Spot the warning signs before the founders disappear.',
      reward: 500,
      difficulty: 'HARD',
      time: 12,
      category: 'defense',
      
      // Scenario steps
      steps: [
        {
          id: 1,
          text: "You're scrolling Twitter when you see a post from an influencer you follow:\n\n\"🚀 JUST APED INTO $MOONFISH! Dev is BASED, LP locked, contract renounced. 100x easy. Not financial advice but... this is the one. Only 50k mcap rn. 🐟🌙\"",
          speaker: { name: "CryptoKing_99", avatar: "👑", verified: false },
          choices: [
            { 
              id: 'a', 
              text: "This looks legit! Buy $500 worth immediately",
              isCorrect: false,
              result: {
                title: "You Got Hooked",
                desc: "You bought based on social media hype without any research. Classic FOMO trap.",
                tactic: "Social Proof + FOMO",
                coinsLost: 200
              }
            },
            { 
              id: 'b', 
              text: "Check the contract address and do some research first",
              isCorrect: true,
              result: {
                title: "Good Instinct!",
                desc: "Taking time to research before investing is the first line of defense.",
                tactic: "FOMO Resistance",
                coinsEarned: 50
              }
            },
            { 
              id: 'c', 
              text: "Ignore it completely - you don't invest in crypto",
              isCorrect: true,
              result: {
                title: "Solid Choice",
                desc: "Knowing what you don't invest in is a valid strategy.",
                tactic: "Scope Discipline",
                coinsEarned: 30
              }
            }
          ]
        },
        {
          id: 2,
          text: "You decide to research. You find:\n\n• Token launched 2 hours ago\n• Dev wallet holds 40% of supply\n• \"LP locked\" but only for 7 days\n• Telegram has 5,000 members (was 200 yesterday)\n• Contract has a function called 'excludeFromFee'\n\nThe influencer DMs you: \"Bro you still haven't bought? It's already 3x. Don't miss this.\"",
          speaker: { name: "CryptoKing_99", avatar: "👑", verified: false },
          choices: [
            { 
              id: 'a', 
              text: "3x already?! Buy now before it's too late!",
              isCorrect: false,
              result: {
                title: "FOMO Got You",
                desc: "The rapid price rise is often manufactured to create urgency. 40% dev wallet is a massive red flag.",
                tactic: "Manufactured Urgency",
                coinsLost: 150
              }
            },
            { 
              id: 'b', 
              text: "These are red flags. Walk away.",
              isCorrect: true,
              result: {
                title: "You See Through It",
                desc: "40% dev wallet, short LP lock, and sudden Telegram growth are classic rug-pull indicators.",
                tactic: "Red Flag Recognition",
                coinsEarned: 100
              }
            },
            { 
              id: 'c', 
              text: "Ask the influencer why the dev wallet is so large",
              isCorrect: false,
              result: {
                title: "Engagement Trap",
                desc: "Engaging with the promoter gives them a chance to manipulate you further. The red flags already told you what you need to know.",
                tactic: "Engagement Manipulation",
                coinsLost: 50
              }
            }
          ]
        },
        {
          id: 3,
          text: "24 hours later, you check what happened to $MOONFISH.\n\nThe token crashed 99%. The dev wallet sold everything. The Telegram is now \"read-only\" and the influencer deleted their tweets.\n\nPeople are posting losses of $10,000+.\n\nBut wait - CryptoKing_99 is now promoting a NEW token: \"$FISHREV - the community revival! We're all gonna make it back! 🙏\"",
          speaker: null,
          choices: [
            { 
              id: 'a', 
              text: "Maybe this revival token is my chance to recover losses...",
              isCorrect: false,
              result: {
                title: "Double Rug Incoming",
                desc: "\"Revival\" tokens prey on victims' desire to recover. It's the same scam twice.",
                tactic: "Loss Recovery Manipulation",
                coinsLost: 100
              }
            },
            { 
              id: 'b', 
              text: "Report the influencer and move on",
              isCorrect: true,
              result: {
                title: "Perfect Response",
                desc: "Reporting helps protect others. You can't recover money from scammers by giving them more money.",
                tactic: "Community Protection",
                coinsEarned: 150
              }
            }
          ]
        }
      ],
      
      // Summary shown at end
      summary: {
        tactics: [
          'Social Proof - Using influencer credibility to build trust',
          'FOMO - Creating urgency with rapid price movements',
          'Manufactured Scarcity - "Only 50k mcap" implies limited opportunity',
          'Loss Recovery - Targeting victims again with "revival" schemes'
        ],
        realWorld: 'In 2022, over $2.8 billion was lost to crypto rug-pulls. Always verify: Who are the devs? Is the LP truly locked? What does the contract code do?'
      }
    },

    'car_dealer': {
      id: 'car_dealer',
      title: 'Car Dealer Showdown',
      desc: 'A salesperson is using every trick in the book. Can you get a fair deal?',
      reward: 350,
      difficulty: 'MEDIUM',
      time: 8,
      category: 'purchase',
      
      steps: [
        {
          id: 1,
          text: "You walk into a car dealership. You've researched a specific car - the 2024 Honda Civic - and know it should cost around $26,000.\n\nA salesperson approaches immediately:\n\n\"Welcome! I'm Jake. You've got GREAT timing - we just got a shipment of Civics but they're moving FAST. Had three sold this morning. Let me show you one before they're gone.\"",
          speaker: { name: "Jake", avatar: "🚗", role: "Sales Associate" },
          choices: [
            { 
              id: 'a', 
              text: "Oh no, let's hurry then! Show me what you have.",
              isCorrect: false,
              result: {
                title: "Artificial Urgency",
                desc: "Jake created false scarcity. Dealerships rarely 'run out' of common models.",
                tactic: "False Scarcity",
                coinsLost: 50
              }
            },
            { 
              id: 'b', 
              text: "I'm in no rush. I'm comparing a few dealerships today.",
              isCorrect: true,
              result: {
                title: "Power Move",
                desc: "Showing you have options and time removes their urgency pressure.",
                tactic: "Leverage Establishment",
                coinsEarned: 50
              }
            },
            { 
              id: 'c', 
              text: "Can you tell me the out-the-door price on a base Civic first?",
              isCorrect: true,
              result: {
                title: "Direct and Smart",
                desc: "Asking for the total price upfront prevents hidden fee surprises later.",
                tactic: "Price Anchoring Defense",
                coinsEarned: 75
              }
            }
          ]
        },
        {
          id: 2,
          text: "Jake shows you a Civic with a sticker price of $28,500.\n\n\"This one has the premium package - trust me, it's worth it. The base model doesn't have CarPlay, and you definitely want that. Plus, my manager can probably knock a few hundred off for you today.\"",
          speaker: { name: "Jake", avatar: "🚗", role: "Sales Associate" },
          choices: [
            { 
              id: 'a', 
              text: "A few hundred off sounds good! Let's do it.",
              isCorrect: false,
              result: {
                title: "Upsell Accepted",
                desc: "He shifted you from a $26k car to a $28k car and made $200 off feel like a 'deal.'",
                tactic: "Upselling + Anchoring",
                coinsLost: 75
              }
            },
            { 
              id: 'b', 
              text: "I actually need to see the base model. That's what I came for.",
              isCorrect: true,
              result: {
                title: "Staying on Target",
                desc: "You knew what you wanted and didn't get distracted by the upsell.",
                tactic: "Goal Persistence",
                coinsEarned: 50
              }
            },
            { 
              id: 'c', 
              text: "What's the out-the-door price including all fees?",
              isCorrect: true,
              result: {
                title: "Cutting Through the Fog",
                desc: "The 'sticker price' is never the real price. Always ask for total cost.",
                tactic: "Transparency Demand",
                coinsEarned: 75
              }
            }
          ]
        }
      ],
      
      summary: {
        tactics: [
          'False Scarcity - "Selling fast" creates artificial urgency',
          'Upselling - Showing expensive models first',
          'Anchoring - Making high price seem normal',
          'Hidden Fees - Final price often $2-5k higher than sticker'
        ],
        realWorld: 'The average car buyer pays $1,000+ more than necessary due to dealer tactics. Always get out-the-door pricing in writing before negotiating.'
      }
    }
  },

  // Current simulation state
  current: {
    scenarioId: null,
    stepIndex: 0,
    choices: [],
    totalEarned: 0,
    totalLost: 0
  },

  /**
   * Get the active/next scenario for the home page
   */
  getActiveScenario() {
    // For now, return the first uncompleted scenario, or first scenario if all done
    const scenarioIds = Object.keys(this.scenarios);
    
    for (const id of scenarioIds) {
      if (!State.isScenarioCompleted(id)) {
        return this.scenarios[id];
      }
    }
    
    // All completed - return first for replay
    return this.scenarios[scenarioIds[0]];
  },

  /**
   * Start a simulation
   */
  start(scenarioId) {
    const scenario = this.scenarios[scenarioId];
    if (!scenario) {
      console.error('Scenario not found:', scenarioId);
      return;
    }

    this.current = {
      scenarioId,
      stepIndex: 0,
      choices: [],
      totalEarned: 0,
      totalLost: 0
    };

    App.showPage('simulation');
    this.renderStep();
  },

  /**
   * Render current step
   */
  renderStep() {
    const scenario = this.scenarios[this.current.scenarioId];
    const step = scenario.steps[this.current.stepIndex];
    
    // Update progress
    const progress = ((this.current.stepIndex + 1) / scenario.steps.length) * 100;
    document.getElementById('simProgressFill').style.width = `${progress}%`;
    document.getElementById('simStep').textContent = `${this.current.stepIndex + 1}/${scenario.steps.length}`;
    
    // Render scenario text
    document.getElementById('simScenario').textContent = step.text;
    
    // Render speaker if present
    const speakerEl = document.getElementById('simSpeaker');
    if (step.speaker) {
      speakerEl.innerHTML = `
        <div class="speaker-avatar">${step.speaker.avatar}</div>
        <div class="speaker-name">${step.speaker.name}</div>
        ${step.speaker.role ? `<div class="speaker-role">${step.speaker.role}</div>` : ''}
      `;
      speakerEl.classList.remove('hidden');
    } else {
      speakerEl.classList.add('hidden');
    }
    
    // Render choices
    const choicesEl = document.getElementById('simChoices');
    choicesEl.innerHTML = step.choices.map(choice => `
      <button class="sim-choice" data-choice-id="${choice.id}">
        <span class="choice-letter">${choice.id.toUpperCase()}</span>
        <span class="choice-text">${choice.text}</span>
      </button>
    `).join('');
    
    // Add click handlers
    choicesEl.querySelectorAll('.sim-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        this.makeChoice(btn.dataset.choiceId);
      });
    });
    
    // Hide result, show choices
    document.getElementById('simResult').classList.add('hidden');
    document.getElementById('simChoices').classList.remove('hidden');
    document.querySelector('.sim-content').classList.remove('hidden');
  },

  /**
   * Handle player choice
   */
  makeChoice(choiceId) {
    const scenario = this.scenarios[this.current.scenarioId];
    const step = scenario.steps[this.current.stepIndex];
    const choice = step.choices.find(c => c.id === choiceId);
    
    if (!choice) return;
    
    // Record choice
    this.current.choices.push({
      stepId: step.id,
      choiceId: choice.id,
      isCorrect: choice.isCorrect
    });
    
    // Update totals
    if (choice.result.coinsEarned) {
      this.current.totalEarned += choice.result.coinsEarned;
    }
    if (choice.result.coinsLost) {
      this.current.totalLost += choice.result.coinsLost;
    }
    
    // Show result
    this.showResult(choice);
  },

  /**
   * Show result of a choice
   */
  showResult(choice) {
    const resultEl = document.getElementById('simResult');
    const result = choice.result;
    
    // Update result display
    document.getElementById('resultIcon').textContent = choice.isCorrect ? '✓' : '✗';
    document.getElementById('resultIcon').className = `result-icon ${choice.isCorrect ? 'correct' : 'incorrect'}`;
    document.getElementById('resultTitle').textContent = result.title;
    document.getElementById('resultDesc').textContent = result.desc;
    document.querySelector('.tactic-name').textContent = result.tactic;
    
    // Show/hide coins impact
    const tacticEl = document.getElementById('resultTactic');
    if (result.coinsEarned) {
      tacticEl.innerHTML += `<div class="result-coins earned">+${result.coinsEarned} SC</div>`;
    } else if (result.coinsLost) {
      tacticEl.innerHTML += `<div class="result-coins lost">-${result.coinsLost} SC</div>`;
    }
    
    // Hide choices, show result
    document.getElementById('simChoices').classList.add('hidden');
    resultEl.classList.remove('hidden');
    
    // Update button text for last step
    const scenario = this.scenarios[this.current.scenarioId];
    const isLastStep = this.current.stepIndex >= scenario.steps.length - 1;
    document.getElementById('resultNextBtn').textContent = isLastStep ? 'FINISH' : 'CONTINUE';
  },

  /**
   * Continue to next step or finish
   */
  continue() {
    const scenario = this.scenarios[this.current.scenarioId];
    
    if (this.current.stepIndex < scenario.steps.length - 1) {
      // Next step
      this.current.stepIndex++;
      this.renderStep();
    } else {
      // Finish scenario
      this.finish();
    }
  },

  /**
   * Finish the simulation
   */
  finish() {
    const scenario = this.scenarios[this.current.scenarioId];
    
    // Calculate final reward
    const correctCount = this.current.choices.filter(c => c.isCorrect).length;
    const isPerfect = correctCount === scenario.steps.length;
    const netCoins = this.current.totalEarned - this.current.totalLost + (isPerfect ? scenario.reward : Math.floor(scenario.reward / 2));
    
    // Update state
    State.completeScenario(scenario.id, Math.max(0, netCoins), isPerfect);
    
    // Check mission completion
    Missions.checkScenarioMissions();
    
    // Go home
    App.showPage('home');
    
    // Update threat card with next scenario
    this.updateThreatCard();
  },

  /**
   * Update the threat card on home page
   */
  updateThreatCard() {
    const scenario = this.getActiveScenario();
    if (!scenario) return;
    
    document.getElementById('threatTitle').textContent = scenario.title;
    document.getElementById('threatDesc').textContent = scenario.desc;
    document.getElementById('threatReward').textContent = `+${scenario.reward} SC`;
    document.getElementById('threatDiff').textContent = scenario.difficulty;
    document.getElementById('threatTime').textContent = `${scenario.time} min`;
  }
};

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => Simulations.updateThreatCard(), 20);
});
