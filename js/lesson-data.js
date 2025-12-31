/**
 * LESSON-DATA.JS
 * Full lesson content for all skills
 * Lessons are keyed by skill ID and looked up by Lessons.start()
 */

const LessonData = {
  
  // ============== FOMO FUNDAMENTALS ==============
  fomo_fundamentals: {
    id: 'lesson_fomo',
    title: 'FOMO Fundamentals',
    steps: [
      // STEP 1: INFO - Intro
      {
        type: 'info',
        icon: '😰',
        title: 'The Fear That Empties Wallets',
        content: `FOMO - Fear Of Missing Out - is the anxious feeling that others are experiencing something you're not.<br><br>
          Marketers have weaponized this. They don't sell products. They sell the fear of <em>not</em> having them.<br><br>
          That knot in your stomach when you see "LIMITED TIME"? That's not excitement. <strong>That's manipulation.</strong>`
      },

      // STEP 2: ARTIFACT - Instagram Ad
      {
        type: 'artifact',
        context: "You're scrolling Instagram and see this ad...",
        contextIcon: '📱',
        artifactType: 'social-ad',
        artifactHTML: `
          <div class="fake-instagram-ad">
            <div class="ad-header">
              <span class="sponsored">SPONSORED</span>
            </div>
            <div class="ad-content">
              <div class="fire-banner">🔥 FLASH SALE - 73% OFF 🔥</div>
              <div class="product-name">CloudComfort™ Sneakers</div>
              <div class="product-tagline">"The shoe that broke the internet"</div>
              <div class="price-row">
                <span class="old-price">$249</span>
                <span class="new-price">$67</span>
              </div>
              <div class="urgency-timer">⚡ Sale ends in <strong>2:47:33</strong></div>
              <div class="scarcity-warning">⚠️ Only 4 left at this price</div>
              <div class="cta-button">SHOP NOW</div>
            </div>
            <div class="ad-footer">❤️ 12,847 likes</div>
          </div>
        `,
        prompt: 'This ad is designed to trigger FOMO. Tap the hook.',
        hotspots: [
          { 
            x: 15, y: 22, width: 70, height: 8,
            isHook: false, 
            explanation: "Discounts feel urgent, but this isn't the main hook. The original $249 price is probably inflated anyway."
          },
          { 
            x: 10, y: 55, width: 80, height: 8,
            isHook: true, 
            explanation: "FOUND IT. The countdown timer is fake - it resets when it hits zero, or shows different times to different people. It exists only to make you panic."
          },
          { 
            x: 10, y: 65, width: 80, height: 8,
            isHook: true, 
            explanation: "Manufactured scarcity. They're not running out. This number is designed to trigger loss aversion - the fear of missing out."
          }
        ],
        points: 100
      },

      // STEP 3: INFO - Brain Science
      {
        type: 'info',
        icon: '🧠',
        title: 'Your Brain on FOMO',
        content: `When you see "Only 3 left!" your amygdala fires a <strong>threat response</strong>.<br><br>
          Your brain literally thinks you're about to lose something - even though you never had it.<br><br>
          This is called <strong>loss aversion</strong>. Losing feels 2x worse than gaining feels good.<br><br>
          That countdown timer isn't tracking real inventory. It's hacking your threat detection system.`
      },

      // STEP 4: ARTIFACT - Amazon Listing
      {
        type: 'artifact',
        context: "Now you're shopping on Amazon...",
        contextIcon: '🛒',
        artifactType: 'product-listing',
        artifactHTML: `
          <div class="fake-amazon-listing">
            <div class="product-title">Wireless Earbuds Pro X</div>
            <div class="rating">⭐⭐⭐⭐☆ (2,847 reviews)</div>
            <div class="price">$79.99</div>
            <div class="prime">✓ Prime FREE delivery tomorrow</div>
            <div class="stock-warning">🔴 Only 2 left in stock - order soon</div>
            <div class="more-coming">"More on the way"</div>
            <div class="buttons">
              <div class="cart-btn">Add to Cart</div>
              <div class="buy-btn">Buy Now</div>
            </div>
            <div class="social-proof">
              <div>📦 Frequently bought together</div>
              <div>👥 847 people are viewing this right now</div>
            </div>
          </div>
        `,
        prompt: 'Find the FOMO triggers hiding in this listing.',
        hotspots: [
          { 
            x: 5, y: 48, width: 90, height: 8,
            isHook: true, 
            explanation: "Classic artificial scarcity. Amazon shows this on tons of products. Check back tomorrow - there will magically still be '2 left.'"
          },
          { 
            x: 5, y: 82, width: 90, height: 8,
            isHook: true, 
            explanation: "Social pressure tactic. This number is often inflated or made up. It's designed to make you feel like you're in a race."
          },
          { 
            x: 5, y: 38, width: 70, height: 6,
            isHook: false, 
            explanation: "This is just shipping info - not a manipulation tactic. Prime delivery is actually useful."
          }
        ],
        points: 100
      },

      // STEP 5: REVERSE - Build the FOMO Machine
      {
        type: 'reverse',
        title: 'Build the FOMO Machine',
        villainIcon: '🎰',
        instruction: "You're a marketer. Your job: make people panic-buy a $50 t-shirt. Adjust the sliders to maximize FOMO.",
        sliders: [
          { label: 'Countdown Timer', min: 0, max: 3, default: 0, step: 1, suffix: ' hrs' },
          { label: '"Only X Left" Stock', min: 1, max: 100, default: 50, step: 1, suffix: ' left' },
          { label: '"X People Viewing"', min: 0, max: 500, default: 0, step: 10, suffix: ' viewing' }
        ],
        calculate: (values) => {
          const [timer, stock, viewing] = values;
          let fomoScore = 0;
          fomoScore += timer > 0 ? 30 : 0;
          fomoScore += stock <= 5 ? 40 : stock <= 15 ? 25 : stock <= 30 ? 10 : 0;
          fomoScore += viewing >= 200 ? 30 : viewing >= 50 ? 15 : 0;
          const conversionRate = 2 + (fomoScore * 0.12);
          return {
            monthly: fomoScore,
            total: conversionRate,
            hidden: Math.round((conversionRate - 2) * 1000)
          };
        },
        checkGoal: (result) => result.total >= 10,
        goal: 'Get conversion rate above 10%',
        revelation: "See how easy that was? You just turned a mediocre product into an 'urgent' buy. None of those numbers have to be real. Now you know what they're doing to you.",
        resultLabels: {
          monthly: 'FOMO Score',
          total: 'Conversion Rate',
          hidden: 'Extra Sales per 1000 visitors'
        },
        points: 100
      },

      // STEP 6: INFO - Defense Stack
      {
        type: 'info',
        icon: '🛡️',
        title: 'The FOMO Defense Stack',
        content: `Three questions to kill FOMO instantly:<br><br>
          <strong>1. "Will this exist tomorrow?"</strong><br>
          Most "limited" things aren't. Sales come back. Stock replenishes.<br><br>
          <strong>2. "Did I want this BEFORE I saw the urgency?"</strong><br>
          If no, the urgency is manufacturing desire.<br><br>
          <strong>3. "What's the worst case if I miss it?"</strong><br>
          Usually: nothing. You just... don't have the thing you didn't know you wanted.`
      },

      // STEP 7: SCENARIO - Email
      {
        type: 'scenario',
        speaker: { avatar: '📧', name: 'Email Notification' },
        content: `You get an email from a course you looked at once:<br><br>
          <strong>"FINAL NOTICE: Enrollment closes at MIDNIGHT"</strong><br><br>
          <em>"This is your LAST CHANCE to join Financial Freedom Academy. After tonight, the doors close and won't reopen until next year. 847 students already enrolled. Don't be left behind."</em><br><br>
          You kinda wanted to take a finance course eventually...`,
        choices: [
          {
            text: "Sign up before midnight - I've been meaning to learn this",
            correct: false,
            explanation: "'Doors close' is fake scarcity. Digital courses don't run out. They're using a deadline to prevent you from researching competitors. The 'LAST CHANCE' will come again in 2 weeks."
          },
          {
            text: "Google '[course name] review' before deciding",
            correct: true,
            explanation: "Smart. Taking 10 minutes to research can save you hundreds. And if the reviews are bad, that 'last chance' just protected you."
          },
          {
            text: "Unsubscribe - done with manipulative emails",
            correct: true,
            explanation: "Also valid. A course using these tactics probably uses similar manipulation in its content. The unsubscribe button is underrated."
          }
        ],
        points: 100
      },

      // STEP 8: WEAPON
      {
        type: 'weapon',
        name: 'The 24-Hour Rule',
        description: "When you feel urgency to buy something, wait 24 hours. If it's gone tomorrow, it wasn't meant to be. If it's still there, the 'urgency' was fake.",
        phrase: "If it's a good deal today, it'll be a good deal tomorrow."
      },

      // STEP 9: SUMMARY
      {
        type: 'summary',
        title: 'FOMO Fundamentals Complete',
        keyTakeaways: [
          'Countdown timers and "only X left" are usually fake',
          'Your brain treats "missing out" like physical danger - it\'s not',
          'Ask: "Did I want this BEFORE I saw the urgency?"',
          'The 24-Hour Rule kills most impulse purchases',
          'Real opportunities don\'t require panic'
        ]
      }
    ]
  },

  // ============== FINANCING TACTICS (existing) ==============
  financing_tactics: {
    id: 'lesson_financing',
    title: 'The 0% APR Trap',
    steps: [
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
      {
        type: 'info',
        icon: '💡',
        title: 'Deferred Interest: The Hidden Bomb',
        content: `Here's how they get you:<br><br>
          <strong>You think:</strong> "0% for 12 months = free money!"<br><br>
          <strong>Reality:</strong> Interest is BUILDING silently. If you owe even $1 on month 13, you pay ALL the built-up interest at once.<br><br>
          On a $2,000 purchase at 24.99% APR, that's <strong>$500+ in instant charges.</strong>`
      },
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
          const monthlyMin = Math.max(25, price * 0.02);
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
      {
        type: 'weapon',
        name: 'The Deferred Interest Question',
        description: 'Before signing any 0% financing deal, ask this question to reveal the trap.',
        phrase: 'Is this interest WAIVED or DEFERRED? What happens if I have any balance at the end?'
      },
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

  // ============== CONTRACT RED FLAGS (existing) ==============
  contract_red_flags: {
    id: 'lesson_contracts',
    title: 'Contract Surgeon',
    steps: [
      {
        type: 'info',
        icon: '📜',
        title: 'The Fine Print Trap',
        content: 'Companies bury dangerous clauses in walls of text, betting you won\'t read them. Today you learn to spot the traps in seconds.'
      },
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
      {
        type: 'weapon',
        name: 'The Take-Home Rule',
        description: 'Never sign anything the same day you receive it. Pressure to "sign now" is always a red flag.',
        phrase: 'I\'ll need to take this home and review it before signing.'
      },
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

  // ============== TAX FUNDAMENTALS (existing) ==============
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
