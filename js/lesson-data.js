/**
 * LESSON-DATA.JS
 * Example lessons using the modular lesson components
 * These get attached to skills in skills.js
 */

const LessonData = {
  
  // ============== FINANCING TACTICS LESSON ==============
  financing_tactics: {
    id: 'lesson_financing',
    title: 'The 0% APR Trap',
    steps: [
      // Step 1: THE BAIT - Real artifact
      {
        type: 'artifact',
        context: 'You see this ad while browsing...',
        contextIcon: '📱',
        artifactType: 'ad',
        artifactHTML: `
          <div class="fake-ad credit-card">
            <div class="ad-badge">SPONSORED</div>
            <div class="ad-headline">🎉 GET APPROVED TODAY!</div>
            <div class="ad-product">SkyMiles Platinum Card</div>
            <div class="ad-offer">
              <div class="big-zero">0%</div>
              <div class="apr-text">APR for 12 months!</div>
            </div>
            <div class="ad-details">
              <div class="detail-row">✓ No annual fee first year</div>
              <div class="detail-row">✓ $200 signup bonus</div>
              <div class="detail-row fine-print">*See terms. 24.99% APR after promotional period. Deferred interest applies.</div>
            </div>
            <div class="ad-cta">APPLY NOW →</div>
          </div>
        `,
        prompt: 'This looks like a great deal. But there\'s a hook. Tap the dangerous part.',
        hotspots: [
          { x: 25, y: 30, width: 50, height: 20, isHook: false, explanation: 'The 0% sounds good, but it\'s not the trap itself. Keep looking.' },
          { x: 10, y: 50, width: 80, height: 8, isHook: false, explanation: 'No annual fee is actually fine. The trap is elsewhere.' },
          { x: 10, y: 70, width: 80, height: 12, isHook: true, explanation: 'FOUND IT! "Deferred interest" means if you have ANY balance left after 12 months, you owe interest on the ENTIRE original amount, retroactively.' }
        ],
        points: 100
      },

      // Step 2: THE REVEAL - Info with visual
      {
        type: 'info',
        icon: '💡',
        title: 'Deferred Interest: The Hidden Bomb',
        content: `Here's how they get you:<br><br>
          <strong>You think:</strong> "0% for 12 months = free money!"<br><br>
          <strong>Reality:</strong> Interest is BUILDING silently. If you owe even $1 on month 13, you pay ALL the built-up interest at once.<br><br>
          On a $2,000 purchase at 24.99% APR, that's <strong>$500+ in instant charges.</strong>`
      },

      // Step 3: BUILD THE TRAP - Reverse engineer
      {
        type: 'reverse',
        title: 'Build the Trap Yourself',
        villainIcon: '🏦',
        instruction: 'You\'re the bank. Design a loan that looks cheap but maximizes your profit.',
        sliders: [
          { label: 'Purchase Price', min: 1000, max: 5000, default: 2000, step: 100, suffix: '' },
          { label: 'Promo Period (months)', min: 6, max: 24, default: 12, step: 1, suffix: ' mo' },
          { label: 'APR After Promo', min: 15, max: 30, default: 25, step: 1, suffix: '%' }
        ],
        calculate: (values) => {
          const [price, months, apr] = values;
          const monthlyMin = Math.max(25, price * 0.02); // Minimum payment
          const paidDuringPromo = monthlyMin * months;
          const remainingBalance = Math.max(0, price - paidDuringPromo);
          const deferredInterest = remainingBalance > 0 ? price * (apr / 100) * (months / 12) : 0;
          return {
            monthly: monthlyMin,
            total: price + deferredInterest,
            hidden: Math.round(deferredInterest)
          };
        },
        checkGoal: (result) => result.hidden >= 400,
        goal: 'Make the hidden interest hit $400+',
        revelation: 'See how easy it is? They WANT you to carry a small balance. That\'s when the trap springs.',
        resultLabels: {
          monthly: 'Min. Payment',
          total: 'Total If Balance Remains',
          hidden: 'Deferred Interest Bomb'
        },
        points: 100
      },

      // Step 4: SCENARIO - Test understanding
      {
        type: 'scenario',
        speaker: { avatar: '🛒', name: 'Store Clerk' },
        content: 'You\'re buying a $1,500 laptop. The clerk says: "You can do our 0% financing for 18 months! Only $84/month, and if you pay it off, you pay zero interest!"',
        choices: [
          { 
            text: 'Sounds perfect! Sign me up.',
            correct: false,
            explanation: 'They said "if you pay it off" - that\'s the catch. $84 x 18 = $1,512. Close, but you need to pay MORE than minimum to actually pay it off.'
          },
          {
            text: 'What happens if I have a balance left after 18 months?',
            correct: true,
            explanation: 'Perfect question! This forces them to reveal the deferred interest. Now you can do the math and decide with full information.'
          },
          {
            text: 'I\'ll just put it on my credit card instead.',
            correct: false,
            explanation: 'Not necessarily better - your credit card might have 20%+ APR too. The key is understanding the terms, not avoiding all financing.'
          }
        ],
        points: 100
      },

      // Step 5: THE WEAPON
      {
        type: 'weapon',
        name: 'The Deferred Interest Question',
        description: 'Before signing any 0% financing deal, ask this question to reveal the trap.',
        phrase: 'Is this interest WAIVED or DEFERRED? What happens if I have any balance at the end?'
      },

      // Step 6: SUMMARY
      {
        type: 'summary',
        title: 'Financing Tactics Complete',
        keyTakeaways: [
          '"0% APR" often means deferred interest, not waived interest',
          'Interest builds silently during the promo period',
          'Even $1 remaining balance can trigger the full interest bomb',
          'Always ask: "Waived or deferred?" before signing'
        ]
      }
    ]
  },

  // ============== CONTRACT RED FLAGS LESSON ==============
  contract_red_flags: {
    id: 'lesson_contracts',
    title: 'Contract Surgeon',
    steps: [
      // Step 1: Intro
      {
        type: 'info',
        icon: '📜',
        title: 'The Fine Print Trap',
        content: 'Companies bury dangerous clauses in walls of text, betting you won\'t read them. Today you learn to spot the traps in seconds.'
      },

      // Step 2: SHARKLENS - Decode jargon
      {
        type: 'sharklens',
        instruction: 'Tap each highlighted term to see what it REALLY means.',
        documentType: 'contract',
        documentTitle: 'GYM MEMBERSHIP AGREEMENT',
        documentText: `
          This agreement constitutes a binding contract between Member and FitLife Gym ("Company").
          <br><br>
          <strong>1. Term:</strong> This membership has Automatic Renewal and will continue until cancelled in writing.
          <br><br>
          <strong>2. Disputes:</strong> Member agrees to Mandatory Arbitration for all claims. Member waives right to Class Action participation.
          <br><br>
          <strong>3. Cancellation:</strong> 30-day written notice required. Early Termination Fee of $150 applies.
          <br><br>
          <strong>4. Fees:</strong> Company reserves right to Annual Rate Adjustment not exceeding 10% per year.
        `,
        terms: [
          { jargon: 'Automatic Renewal', realMeaning: 'They\'ll keep charging you forever until YOU stop them' },
          { jargon: 'Mandatory Arbitration', realMeaning: 'You can\'t sue them in real court, only their private judge' },
          { jargon: 'Class Action', realMeaning: 'You can\'t team up with other victims to sue' },
          { jargon: 'Early Termination Fee', realMeaning: 'Penalty for escaping the contract' },
          { jargon: 'Annual Rate Adjustment', realMeaning: 'They can raise prices 10% every year forever' }
        ]
      },

      // Step 3: REDPEN - Slash the traps
      {
        type: 'redpen',
        documentTitle: 'APARTMENT LEASE AGREEMENT',
        instruction: 'You have 30 seconds. Slash the predatory clauses!',
        timeLimit: 30,
        clauses: [
          { text: 'Rent is due on the 1st of each month.', isPredatory: false },
          { text: 'Tenant agrees to Mandatory Arbitration for all disputes.', isPredatory: true },
          { text: 'Security deposit of one month\'s rent required.', isPredatory: false },
          { text: 'Landlord may enter without notice for "emergencies" as solely determined by Landlord.', isPredatory: true },
          { text: 'Tenant responsible for normal wear and tear repairs.', isPredatory: true },
          { text: 'Lease term is 12 months beginning on move-in date.', isPredatory: false },
          { text: 'Tenant waives right to jury trial.', isPredatory: true }
        ],
        teachAfter: 'In most states, you CAN cross out clauses before signing. If they refuse to negotiate, that\'s a red flag about the landlord.'
      },

      // Step 4: WEAPON
      {
        type: 'weapon',
        name: 'The Take-Home Rule',
        description: 'Never sign anything the same day you receive it. Pressure to "sign now" is always a red flag.',
        phrase: 'I\'ll need to take this home and review it before signing.'
      },

      // Step 5: SUMMARY
      {
        type: 'summary',
        title: 'Contract Red Flags Complete',
        keyTakeaways: [
          'Always read the cancellation, dispute, and fee sections first',
          'Mandatory arbitration = you lose your right to sue',
          'You can often cross out clauses before signing',
          'Never sign same-day - take it home'
        ]
      }
    ]
  },

  // ============== TAX FUNDAMENTALS - BS DETECTOR ==============
  tax_fundamentals: {
    id: 'lesson_tax',
    title: 'Tax Myth Busters',
    steps: [
      {
        type: 'info',
        icon: '🏛️',
        title: 'Tax Lies Are Everywhere',
        content: 'Social media is full of "gurus" spreading tax misinformation. Let\'s train your BS detector.'
      },

      // BS DETECTOR
      {
        type: 'bsdetector',
        platform: '📱 TikTok',
        guruName: 'WealthHacks247',
        guruAvatar: '🧔‍♂️',
        script: [
          { 
            text: 'Yo what\'s up! Let me put you on game about taxes...',
            isLie: false,
            duration: 2500
          },
          { 
            text: 'If you make $95,000, you\'re in the 22% tax bracket, so you pay $20,900 in taxes.',
            isLie: true,
            truth: 'WRONG! Tax brackets are MARGINAL. You only pay 22% on income ABOVE $44,725. Your actual tax would be ~$15,000.',
            duration: 4000
          },
          {
            text: 'The IRS taxes your income, not your wealth.',
            isLie: false,
            duration: 2500
          },
          { 
            text: 'Write off your G-Wagon and the government basically pays for it!',
            isLie: true,
            truth: 'A write-off reduces TAXABLE INCOME, not your tax bill. A $100k write-off might save you $30k in taxes. You still paid $70k.',
            duration: 3500
          },
          {
            text: 'You can deduct business expenses if you have a legitimate business.',
            isLie: false,
            duration: 2500
          },
          { 
            text: 'Put everything in an LLC and you never pay taxes!',
            isLie: true,
            truth: 'LLCs are "pass-through" entities. The income still flows to YOUR tax return. An LLC is for liability protection, not tax evasion.',
            duration: 3500
          }
        ]
      },

      // WEAPON
      {
        type: 'weapon',
        name: 'The Marginal Rate Reality Check',
        description: 'When someone quotes tax percentages, ask yourself: "Is that the marginal rate or effective rate?"',
        phrase: 'What\'s your EFFECTIVE tax rate, not your marginal bracket?'
      },

      {
        type: 'summary',
        title: 'Tax Fundamentals Complete',
        keyTakeaways: [
          'Tax brackets are marginal - you don\'t pay the top rate on ALL income',
          'Write-offs reduce taxable income, not your actual tax bill',
          'LLCs don\'t magically eliminate taxes',
          'Most social media tax advice is oversimplified or wrong'
        ]
      }
    ]
  }
};

// Export for use
window.LessonData = LessonData;
console.log('lesson-data.js loaded');
