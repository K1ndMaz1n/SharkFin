/**
 * SKILLS.JS
 * Skill tree data structure with all branches, nodes, and lessons
 */

const Skills = {
  // ===== BRANCH DEFINITIONS =====
  branches: {
    defense: {
      id: 'defense',
      name: 'DEFENSE MASTERY',
      tagline: "Don't get eaten",
      icon: '🛡️',
      color: '#2d7a9c',
      description: 'Learn to spot and resist manipulation tactics used by predators.'
    },
    wealth: {
      id: 'wealth',
      name: 'WEALTH BUILDING',
      tagline: 'Make your money work',
      icon: '📈',
      color: '#3d9b7a',
      description: 'Understand how to grow wealth steadily over time.'
    },
    purchase: {
      id: 'purchase',
      name: 'MAJOR PURCHASES',
      tagline: 'Win the big negotiations',
      icon: '🏷️',
      color: '#b86b4d',
      description: 'Master the tactics used in big-ticket negotiations.',
      specializations: {
        vehicles: {
          id: 'vehicles',
          name: 'VEHICLES',
          icon: '🚗',
          unlocksAt: 10
        },
        housing: {
          id: 'housing',
          name: 'HOUSING',
          icon: '🏠',
          unlocksAt: 10
        }
      }
    },
    income: {
      id: 'income',
      name: 'INCOME OPTIMIZATION',
      tagline: 'Earn what you\'re worth',
      icon: '💰',
      color: '#b89b4d',
      description: 'Maximize your earning potential and income streams.',
      specializations: {
        employment: {
          id: 'employment',
          name: 'EMPLOYMENT',
          icon: '💼',
          unlocksAt: 10
        },
        independent: {
          id: 'independent',
          name: 'INDEPENDENT',
          icon: '📱',
          unlocksAt: 10
        }
      }
    },
    systems: {
      id: 'systems',
      name: 'SYSTEMS MASTERY',
      tagline: 'Understand the game',
      icon: '⚙️',
      color: '#6b5b8c',
      description: 'Master the financial systems that shape your life.',
      specializations: {
        credit: {
          id: 'credit',
          name: 'CREDIT & DEBT',
          icon: '💳',
          unlocksAt: 10
        },
        legal: {
          id: 'legal',
          name: 'LEGAL & TAX',
          icon: '📋',
          unlocksAt: 10
        }
      }
    }
  },

  // ===== ALL SKILL NODES =====
  nodes: {
    // ========== DEFENSE MASTERY ==========
    fomo_fundamentals: {
      id: 'fomo_fundamentals',
      name: 'FOMO Fundamentals',
      branch: 'defense',
      tier: 1,
      icon: '😰',
      unlockLevel: 1,
      description: 'Why "limited time" works on your brain',
      tactic: 'Fear of Missing Out',
      quote: '"Only 3 left at this price!"',
      reward: 150,
      perk: {
        type: 'warning',
        description: 'Warning icon appears when FOMO tactic detected in sims'
      },
      lesson: {
        id: 'lesson_fomo',
        title: 'Understanding FOMO',
        steps: [
          {
            type: 'info',
            title: 'What is FOMO?',
            content: 'FOMO (Fear of Missing Out) is a psychological trigger that makes you feel anxious about missing a perceived opportunity.',
            visual: 'fomo_brain'
          },
          {
            type: 'info',
            title: 'Why It Works',
            content: 'Your brain treats potential losses more seriously than equivalent gains. Missing out FEELS worse than the joy of getting something.',
            visual: 'loss_aversion'
          },
          {
            type: 'scenario',
            title: 'Spot the Trigger',
            content: 'You see an ad: "FLASH SALE - 70% OFF - Ends in 2:34:17"',
            question: 'What FOMO trigger is being used?',
            choices: [
              { text: 'Artificial scarcity', correct: false },
              { text: 'Time pressure', correct: true },
              { text: 'Social proof', correct: false }
            ],
            explanation: 'The countdown timer creates time pressure, making you feel like you must act NOW or lose the deal forever.'
          },
          {
            type: 'info',
            title: 'The Defense',
            content: 'Ask yourself: "If this deal disappeared right now, would I actually be worse off?" Usually, the answer is no.',
            visual: 'defense_shield'
          },
          {
            type: 'summary',
            title: 'FOMO Defense Kit',
            points: [
              'Recognize countdown timers and "limited time" as manipulation',
              'Real deals don\'t need artificial urgency',
              'Sleep on big decisions - urgency is often manufactured',
              'If you didn\'t want it yesterday, you don\'t need it today'
            ]
          }
        ]
      },
      prerequisites: [],
      position: { x: 120, y: 160 }
    },

    urgency_resistance: {
      id: 'urgency_resistance',
      name: 'Urgency Tactics',
      branch: 'defense',
      tier: 2,
      icon: '⏰',
      unlockLevel: 3,
      description: 'Fake deadlines and "other buyers"',
      tactic: 'Manufactured Urgency',
      quote: '"I have another buyer coming in an hour..."',
      reward: 200,
      perk: {
        type: 'bonus',
        description: '+10% coins on sims where you resist time pressure'
      },
      lesson: {
        id: 'lesson_urgency',
        title: 'Defeating Urgency Tactics',
        steps: [
          {
            type: 'info',
            title: 'The Urgency Playbook',
            content: 'Salespeople create fake deadlines because they know once you leave, you\'ll think rationally and probably not return.'
          },
          {
            type: 'scenario',
            title: 'Real or Fake?',
            content: '"This price is only good until end of day. My manager approved it just for you, but it expires at 5pm."',
            question: 'Is this likely real or manufactured?',
            choices: [
              { text: 'Real - managers set daily limits', correct: false },
              { text: 'Manufactured - the price will be there tomorrow', correct: true }
            ],
            explanation: 'This is almost always fake. If you walked in tomorrow and offered the same deal, they\'d take it.'
          },
          {
            type: 'info',
            title: 'The Power of Walking Away',
            content: 'The moment you\'re willing to leave is the moment you gain negotiating power. Real deals wait for serious buyers.'
          },
          {
            type: 'summary',
            title: 'Urgency Defense',
            points: [
              '"Other buyers" are usually fictional',
              'End-of-day prices magically extend to next day',
              'Your willingness to walk away is your greatest weapon',
              'Say: "If it\'s gone tomorrow, it wasn\'t meant to be"'
            ]
          }
        ]
      },
      prerequisites: ['fomo_fundamentals'],
      position: { x: 200, y: 200 }
    },

    social_proof_traps: {
      id: 'social_proof_traps',
      name: 'Social Proof Traps',
      branch: 'defense',
      tier: 3,
      icon: '👥',
      unlockLevel: 5,
      description: 'Fake reviews, influencer shills, "everyone\'s buying"',
      tactic: 'Social Proof Manipulation',
      quote: '"10,000 customers can\'t be wrong!"',
      reward: 250,
      perk: {
        type: 'unlock',
        description: 'Unlock: Crypto Rug-Pull simulation'
      },
      lesson: {
        id: 'lesson_social_proof',
        title: 'Seeing Through Social Proof',
        steps: [
          {
            type: 'info',
            title: 'Why We Follow the Crowd',
            content: 'Humans evolved to trust group behavior. If everyone runs, you run. Predators exploit this by manufacturing "crowds."'
          },
          {
            type: 'scenario',
            title: 'Spot the Fake',
            content: 'A product has 4.8 stars with 2,000 reviews. But all 5-star reviews were posted in the same week, and they all say "Great product! Exactly as described!"',
            question: 'What\'s the red flag?',
            choices: [
              { text: 'The rating is too high', correct: false },
              { text: 'Reviews are suspiciously similar and clustered', correct: true },
              { text: '2,000 reviews is too many', correct: false }
            ],
            explanation: 'Fake review campaigns often happen in bursts and use similar language. Real reviews are spread over time with varied opinions.'
          },
          {
            type: 'summary',
            title: 'Social Proof Defense',
            points: [
              'Check review dates - clusters are suspicious',
              'Read negative reviews for real insights',
              'Influencer promotions are paid advertisements',
              '"Best seller" means nothing without context'
            ]
          }
        ]
      },
      prerequisites: ['urgency_resistance'],
      position: { x: 150, y: 280 }
    },

    dark_patterns: {
      id: 'dark_patterns',
      name: 'Dark Patterns',
      branch: 'defense',
      tier: 4,
      icon: '🕳️',
      unlockLevel: 8,
      description: 'Hidden fees, pre-checked boxes, confusing unsubscribe',
      tactic: 'Interface Manipulation',
      quote: 'The "unsubscribe" button is a maze',
      reward: 300,
      perk: {
        type: 'unlock',
        description: 'Unlock: Subscription Trap simulation'
      },
      prerequisites: ['social_proof_traps'],
      position: { x: 100, y: 360 }
    },

    predator_spotting: {
      id: 'predator_spotting',
      name: 'Predator Spotting',
      branch: 'defense',
      tier: 5,
      icon: '🦈',
      unlockLevel: 12,
      description: 'Master skill: Red flags checklist, combo recognition',
      tactic: 'Multi-Vector Attack Recognition',
      quote: 'When it\'s too good to be true...',
      reward: 500,
      perk: {
        type: 'master',
        description: 'SHARK EYES: All manipulation tactics highlighted in sims'
      },
      prerequisites: ['dark_patterns'],
      position: { x: 180, y: 440 },
      isMaster: true
    },

    // ========== MAJOR PURCHASES - CORE ==========
    price_anchoring: {
      id: 'price_anchoring',
      name: 'Price Anchoring',
      branch: 'purchase',
      tier: 1,
      icon: '⚓',
      unlockLevel: 1,
      description: 'First number sets the frame',
      tactic: 'Anchor Price Manipulation',
      quote: '"MSRP is $30,000, but for you..."',
      reward: 150,
      perk: {
        type: 'feature',
        description: 'Counter-anchor suggestions appear in negotiation sims'
      },
      lesson: {
        id: 'lesson_anchoring',
        title: 'Breaking Price Anchors',
        steps: [
          {
            type: 'info',
            title: 'The Anchor Effect',
            content: 'The first number you hear becomes your mental reference point. Everything after is compared to that anchor.'
          },
          {
            type: 'scenario',
            title: 'Anchor in Action',
            content: 'A car has MSRP $32,000. The dealer offers it for $29,000. You feel like you\'re saving $3,000.',
            question: 'But what if the car is actually worth $27,000?',
            choices: [
              { text: 'You\'re still overpaying by $2,000', correct: true },
              { text: 'You got a good deal', correct: false }
            ],
            explanation: 'The MSRP was the anchor. It made $29,000 FEEL like a deal, even though the fair market value is lower.'
          },
          {
            type: 'info',
            title: 'Counter-Anchoring',
            content: 'Research the REAL value before any negotiation. Set YOUR anchor first: "I was thinking more like $26,000."'
          },
          {
            type: 'summary',
            title: 'Anchor Defense',
            points: [
              'Research fair prices BEFORE the conversation',
              'The first number isn\'t the real price',
              'Set your own anchor early in negotiations',
              'Ignore MSRP - it\'s designed to make any discount look good'
            ]
          }
        ]
      },
      prerequisites: [],
      position: { x: 540, y: 160 }
    },

    walk_away_power: {
      id: 'walk_away_power',
      name: 'Walk Away Power',
      branch: 'purchase',
      tier: 2,
      icon: '🚪',
      unlockLevel: 3,
      description: 'BATNA, silence, cooling off',
      tactic: 'Leverage Through Alternatives',
      quote: '"Let me think about it..."',
      reward: 200,
      perk: {
        type: 'stat',
        description: 'Pressure bar fills 25% slower in all sims'
      },
      prerequisites: ['price_anchoring'],
      position: { x: 620, y: 200 }
    },

    financing_tactics: {
      id: 'financing_tactics',
      name: 'Financing Tactics',
      branch: 'purchase',
      tier: 2,
      icon: '💳',
      unlockLevel: 3,
      description: 'APR tricks, term manipulation, dealer vs bank',
      tactic: 'Payment Confusion',
      quote: '"Only $299 a month!"',
      reward: 200,
      perk: {
        type: 'warning',
        description: 'Warning when bad loan terms offered in sims'
      },
      prerequisites: ['price_anchoring'],
      position: { x: 460, y: 220 }
    },

    total_cost_ownership: {
      id: 'total_cost_ownership',
      name: 'Total Cost of Ownership',
      branch: 'purchase',
      tier: 3,
      icon: '📊',
      unlockLevel: 5,
      description: 'Hidden costs, maintenance, depreciation',
      tactic: 'True Cost Awareness',
      quote: 'The sticker price is just the beginning',
      reward: 250,
      perk: {
        type: 'unlock',
        description: 'Unlock: True Cost Calculator tool'
      },
      prerequisites: ['financing_tactics'],
      position: { x: 540, y: 280 }
    },

    // ========== MAJOR PURCHASES - VEHICLES SPECIALIZATION ==========
    four_square_defense: {
      id: 'four_square_defense',
      name: 'Four-Square Defense',
      branch: 'purchase',
      specialization: 'vehicles',
      tier: 4,
      icon: '📋',
      unlockLevel: 10,
      description: 'The dealer\'s 4-box shuffle decoded',
      tactic: 'Four-Square Method',
      quote: '"Let\'s look at these four numbers..."',
      reward: 300,
      perk: {
        type: 'bonus',
        description: '+15% coins on car dealer sims'
      },
      prerequisites: ['total_cost_ownership'],
      position: { x: 440, y: 380 }
    },

    dealer_tactics: {
      id: 'dealer_tactics',
      name: 'Dealer Tactics',
      branch: 'purchase',
      specialization: 'vehicles',
      tier: 5,
      icon: '🎭',
      unlockLevel: 12,
      description: '"Let me talk to my manager" decoded',
      tactic: 'Good Cop / Manager Theater',
      quote: '"I\'m on YOUR side here..."',
      reward: 350,
      perk: {
        type: 'feature',
        description: 'Jake\'s tactics labeled in real-time during car sim'
      },
      prerequisites: ['four_square_defense'],
      position: { x: 380, y: 440 }
    },

    trade_in_traps: {
      id: 'trade_in_traps',
      name: 'Trade-In Traps',
      branch: 'purchase',
      specialization: 'vehicles',
      tier: 5,
      icon: '🔄',
      unlockLevel: 12,
      description: 'Lowball offers and payoff tricks',
      tactic: 'Trade Value Manipulation',
      quote: '"We\'ll pay off your loan!"',
      reward: 350,
      perk: {
        type: 'unlock',
        description: 'Unlock: Trade Value Checker tool'
      },
      prerequisites: ['four_square_defense'],
      position: { x: 500, y: 440 }
    },

    cold_blood: {
      id: 'cold_blood',
      name: 'Cold Blood',
      branch: 'purchase',
      specialization: 'vehicles',
      tier: 6,
      icon: '🧊',
      unlockLevel: 15,
      description: 'MASTER: Complete vehicle negotiation immunity',
      tactic: 'Full Dealer Defense',
      quote: 'You cannot be pressured',
      reward: 500,
      perk: {
        type: 'master',
        description: 'Vehicle sims: Immune to pressure for first 5 choices'
      },
      prerequisites: ['dealer_tactics', 'trade_in_traps'],
      position: { x: 440, y: 520 },
      isMaster: true
    },

    // ========== MAJOR PURCHASES - HOUSING SPECIALIZATION ==========
    home_buying_basics: {
      id: 'home_buying_basics',
      name: 'Home Buying Basics',
      branch: 'purchase',
      specialization: 'housing',
      tier: 4,
      icon: '🏠',
      unlockLevel: 10,
      description: 'Pre-approval, inspections, closing costs',
      tactic: 'Home Buying Process',
      quote: 'The biggest purchase of your life',
      reward: 300,
      perk: {
        type: 'unlock',
        description: 'Unlock: Home Buying simulation'
      },
      prerequisites: ['total_cost_ownership'],
      position: { x: 640, y: 380 }
    },

    mortgage_mastery: {
      id: 'mortgage_mastery',
      name: 'Mortgage Mastery',
      branch: 'purchase',
      specialization: 'housing',
      tier: 5,
      icon: '🏦',
      unlockLevel: 12,
      description: '15 vs 30 year, points, PMI, refinancing',
      tactic: 'Mortgage Terms Decoded',
      quote: 'A 1% rate difference = $50,000+ over the loan',
      reward: 350,
      perk: {
        type: 'unlock',
        description: 'Unlock: Mortgage Comparison tool'
      },
      prerequisites: ['home_buying_basics'],
      position: { x: 700, y: 440 }
    },

    agent_games: {
      id: 'agent_games',
      name: 'Agent Games',
      branch: 'purchase',
      specialization: 'housing',
      tier: 5,
      icon: '🤵',
      unlockLevel: 12,
      description: 'Dual agency, pocket listings, commission pressure',
      tactic: 'Agent Incentive Conflicts',
      quote: '"Trust me, this is a great deal"',
      reward: 350,
      perk: {
        type: 'warning',
        description: 'Agent tactic warnings in housing sims'
      },
      prerequisites: ['home_buying_basics'],
      position: { x: 580, y: 440 }
    },

    home_turf: {
      id: 'home_turf',
      name: 'Home Turf',
      branch: 'purchase',
      specialization: 'housing',
      tier: 6,
      icon: '🏆',
      unlockLevel: 15,
      description: 'MASTER: Housing negotiation mastery',
      tactic: 'Full Housing Defense',
      quote: 'The market doesn\'t pressure you',
      reward: 500,
      perk: {
        type: 'master',
        description: 'Housing sims: See "fair price" estimate before negotiating'
      },
      prerequisites: ['mortgage_mastery', 'agent_games'],
      position: { x: 640, y: 520 },
      isMaster: true
    },

    // ========== WEALTH BUILDING ==========
    compound_interest: {
      id: 'compound_interest',
      name: 'Compound Interest',
      branch: 'wealth',
      tier: 1,
      icon: '📈',
      unlockLevel: 1,
      description: 'The 8th wonder, rule of 72, time > timing',
      tactic: 'Exponential Growth',
      quote: 'Your money makes money makes money',
      reward: 150,
      perk: {
        type: 'unlock',
        description: 'Unlock: Investment Growth Calculator'
      },
      prerequisites: [],
      position: { x: 520, y: 600 }
    },

    index_fund_basics: {
      id: 'index_fund_basics',
      name: 'Index Fund Basics',
      branch: 'wealth',
      tier: 2,
      icon: '📊',
      unlockLevel: 3,
      description: 'What they are, why fees matter, set-and-forget',
      tactic: 'Passive Investing',
      quote: 'Boring is beautiful',
      reward: 200,
      perk: {
        type: 'bonus',
        description: '+15% XP from Wealth Building sims'
      },
      prerequisites: ['compound_interest'],
      position: { x: 600, y: 650 }
    },

    risk_management: {
      id: 'risk_management',
      name: 'Risk Management',
      branch: 'wealth',
      tier: 3,
      icon: '⚖️',
      unlockLevel: 5,
      description: 'Diversification, risk tolerance, age-based allocation',
      tactic: 'Risk-Adjusted Returns',
      quote: 'Don\'t put all your fish in one reef',
      reward: 250,
      perk: {
        type: 'warning',
        description: 'Warning when sim presents high-risk "opportunity"'
      },
      prerequisites: ['index_fund_basics'],
      position: { x: 520, y: 700 }
    },

    investment_traps: {
      id: 'investment_traps',
      name: 'Investment Traps',
      branch: 'wealth',
      tier: 4,
      icon: '🪤',
      unlockLevel: 8,
      description: 'Meme stocks, crypto hype, get-rich-quick',
      tactic: 'Speculative Mania',
      quote: '"This time it\'s different"',
      reward: 300,
      perk: {
        type: 'unlock',
        description: 'Unlock: Meme Stock Mania simulation'
      },
      prerequisites: ['risk_management'],
      position: { x: 600, y: 750 }
    },

    long_game_mastery: {
      id: 'long_game_mastery',
      name: 'Long Game Mastery',
      branch: 'wealth',
      tier: 5,
      icon: '🏆',
      unlockLevel: 12,
      description: 'MASTER: 401k, IRA, tax-advantaged accounts',
      tactic: 'Retirement Optimization',
      quote: 'Time in market beats timing the market',
      reward: 500,
      perk: {
        type: 'master',
        description: 'DIAMOND HANDS: Unlock Portfolio Tracker tool'
      },
      prerequisites: ['investment_traps'],
      position: { x: 520, y: 800 },
      isMaster: true
    },

    // ========== INCOME OPTIMIZATION ==========
    know_your_number: {
      id: 'know_your_number',
      name: 'Know Your Number',
      branch: 'income',
      tier: 1,
      icon: '🔢',
      unlockLevel: 1,
      description: 'Market rate research, total comp',
      tactic: 'Salary Intelligence',
      quote: 'Information is leverage',
      reward: 150,
      perk: {
        type: 'unlock',
        description: 'Unlock: Salary Research tool'
      },
      prerequisites: [],
      position: { x: 100, y: 600 }
    },

    negotiation_openers: {
      id: 'negotiation_openers',
      name: 'Negotiation Openers',
      branch: 'income',
      tier: 2,
      icon: '🎯',
      unlockLevel: 3,
      description: 'Never say first number, anchor high',
      tactic: 'Opening Tactics',
      quote: '"What\'s your salary expectation?" - Deflect.',
      reward: 200,
      perk: {
        type: 'bonus',
        description: '+15% coins on negotiation sims'
      },
      prerequisites: ['know_your_number'],
      position: { x: 180, y: 650 }
    },

    counter_tactics: {
      id: 'counter_tactics',
      name: 'Counter Tactics',
      branch: 'income',
      tier: 3,
      icon: '🔄',
      unlockLevel: 5,
      description: '"The budget is..." responses, competing offers',
      tactic: 'Counter-Offer Strategy',
      quote: 'Their first offer is never their best',
      reward: 250,
      perk: {
        type: 'unlock',
        description: 'Unlock: Salary Negotiation simulation'
      },
      prerequisites: ['negotiation_openers'],
      position: { x: 100, y: 700 }
    },

    side_hustle_math: {
      id: 'side_hustle_math',
      name: 'Side Hustle Math',
      branch: 'income',
      tier: 4,
      icon: '🧮',
      unlockLevel: 8,
      description: 'Time vs money, opportunity cost, scaling',
      tactic: 'Income Stream Analysis',
      quote: 'Not all hours are equal',
      reward: 300,
      perk: {
        type: 'unlock',
        description: 'Unlock: Side Hustle Evaluator tool'
      },
      prerequisites: ['counter_tactics'],
      position: { x: 180, y: 750 }
    },

    income_stacking: {
      id: 'income_stacking',
      name: 'Income Stacking',
      branch: 'income',
      tier: 5,
      icon: '💎',
      unlockLevel: 12,
      description: 'MASTER: Multiple streams, passive income',
      tactic: 'Portfolio Income',
      quote: 'Never depend on a single source',
      reward: 500,
      perk: {
        type: 'master',
        description: 'APEX EARNER: Income Tracker tool unlocked'
      },
      prerequisites: ['side_hustle_math'],
      position: { x: 100, y: 800 },
      isMaster: true
    },

    // ========== SYSTEMS MASTERY ==========
    credit_score_decoded: {
      id: 'credit_score_decoded',
      name: 'Credit Score Decoded',
      branch: 'systems',
      tier: 1,
      icon: '💳',
      unlockLevel: 1,
      description: 'What affects it, how to build, myths',
      tactic: 'Credit System Knowledge',
      quote: 'A 3-digit number that controls your life',
      reward: 150,
      perk: {
        type: 'unlock',
        description: 'Unlock: Credit Score Simulator tool'
      },
      prerequisites: [],
      position: { x: 300, y: 850 }
    },

    tax_fundamentals: {
      id: 'tax_fundamentals',
      name: 'Tax Fundamentals',
      branch: 'systems',
      tier: 2,
      icon: '🏛️',
      unlockLevel: 3,
      description: 'Brackets, deductions, W4 optimization',
      tactic: 'Tax System Navigation',
      quote: 'Marginal vs effective - know the difference',
      reward: 200,
      perk: {
        type: 'bonus',
        description: '+10% XP from all sims'
      },
      prerequisites: ['credit_score_decoded'],
      position: { x: 380, y: 850 }
    },

    insurance_essentials: {
      id: 'insurance_essentials',
      name: 'Insurance Essentials',
      branch: 'systems',
      tier: 3,
      icon: '🛡️',
      unlockLevel: 5,
      description: 'What you need, what\'s a scam, deductibles',
      tactic: 'Risk Transfer Decisions',
      quote: 'Insurance is for catastrophes, not inconveniences',
      reward: 250,
      perk: {
        type: 'warning',
        description: 'Warning when unnecessary insurance pushed in sims'
      },
      prerequisites: ['tax_fundamentals'],
      position: { x: 300, y: 900 }
    },

    contract_red_flags: {
      id: 'contract_red_flags',
      name: 'Contract Red Flags',
      branch: 'systems',
      tier: 4,
      icon: '📜',
      unlockLevel: 8,
      description: 'What to read, cancellation terms, arbitration',
      tactic: 'Legal Defense',
      quote: 'The fine print is where they hide the traps',
      reward: 300,
      perk: {
        type: 'unlock',
        description: 'Unlock: Contract Checker simulation'
      },
      prerequisites: ['insurance_essentials'],
      position: { x: 380, y: 900 }
    },

    budget_architecture: {
      id: 'budget_architecture',
      name: 'Budget Architecture',
      branch: 'systems',
      tier: 5,
      icon: '🏗️',
      unlockLevel: 12,
      description: 'MASTER: 50/30/20, zero-based, anti-budget',
      tactic: 'Money System Design',
      quote: 'A budget is telling your money where to go',
      reward: 500,
      perk: {
        type: 'master',
        description: 'SYSTEM SHARK: All tools unlocked, +25% all coins'
      },
      prerequisites: ['contract_red_flags'],
      position: { x: 340, y: 950 },
      isMaster: true
    }
  },

  // ===== METHODS =====
  
  /**
   * Get all nodes for a branch
   */
  getNodesForBranch(branchId) {
    return Object.values(this.nodes).filter(node => node.branch === branchId);
  },

  /**
   * Get nodes for a specialization
   */
  getNodesForSpecialization(branchId, specId) {
    return Object.values(this.nodes).filter(
      node => node.branch === branchId && node.specialization === specId
    );
  },

  /**
   * Check if a node is unlockable (prerequisites met, level requirement met)
   */
  isNodeUnlockable(nodeId, playerLevel, unlockedNodes) {
    const node = this.nodes[nodeId];
    if (!node) return false;
    
    // Check level requirement
    if (playerLevel < node.unlockLevel) return false;
    
    // Check prerequisites
    for (const prereq of node.prerequisites) {
      if (!unlockedNodes.includes(prereq)) return false;
    }
    
    return true;
  },

  /**
   * Get node state (locked, unlockable, unlocked, mastered)
   */
  getNodeState(nodeId, playerLevel, unlockedNodes, masteredNodes) {
    if (masteredNodes.includes(nodeId)) return 'mastered';
    if (unlockedNodes.includes(nodeId)) return 'unlocked';
    if (this.isNodeUnlockable(nodeId, playerLevel, unlockedNodes)) return 'unlockable';
    return 'locked';
  },

  /**
   * Get recommended next node
   */
  getRecommendedNode(playerLevel, unlockedNodes) {
    // Find unlockable nodes, prioritize lower tier
    const unlockable = Object.values(this.nodes)
      .filter(node => this.isNodeUnlockable(node.id, playerLevel, unlockedNodes) && !unlockedNodes.includes(node.id))
      .sort((a, b) => a.tier - b.tier);
    
    return unlockable[0] || null;
  }
};

// Make available globally
window.Skills = Skills;
console.log('skills.js loaded');
