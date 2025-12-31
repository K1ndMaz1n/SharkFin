/**
 * LESSON-DATA.JS
 * Full lesson content for all skills
 * Lessons are keyed by skill ID and looked up by Lessons.start()
 */

const LessonData = {
  
  // ============================================================
  // DEFENSE REEF - 5 LESSONS
  // ============================================================

  // ============== LESSON 1: FOMO FUNDAMENTALS ==============
  fomo_fundamentals: {
    id: 'lesson_fomo',
    title: 'FOMO Fundamentals',
    steps: [
      {
        type: 'info',
        icon: '😰',
        title: 'The Fear That Empties Wallets',
        content: `FOMO - Fear Of Missing Out - is the anxious feeling that others are experiencing something you're not.<br><br>Marketers have weaponized this. They don't sell products. They sell the fear of <em>not</em> having them.<br><br>That knot in your stomach when you see "LIMITED TIME"? That's not excitement. <strong>That's manipulation.</strong>`
      },
      {
        type: 'artifact',
        context: "You're scrolling Instagram and see this ad...",
        contextIcon: '📱',
        artifactType: 'social-ad',
        artifactHTML: `<div class="fake-instagram-ad"><div class="ad-header"><span class="sponsored">SPONSORED</span></div><div class="ad-content"><div class="fire-banner">🔥 FLASH SALE - 73% OFF 🔥</div><div class="product-name">CloudComfort™ Sneakers</div><div class="product-tagline">"The shoe that broke the internet"</div><div class="price-row"><span class="old-price">$249</span><span class="new-price">$67</span></div><div class="urgency-timer">⚡ Sale ends in <strong>2:47:33</strong></div><div class="scarcity-warning">⚠️ Only 4 left at this price</div><div class="cta-button">SHOP NOW</div></div><div class="ad-footer">❤️ 12,847 likes</div></div>`,
        prompt: 'This ad is designed to trigger FOMO. Tap the hook.',
        hotspots: [
          { x: 15, y: 22, width: 70, height: 8, isHook: false, explanation: "Discounts feel urgent, but this isn't the main hook. The original $249 price is probably inflated anyway." },
          { x: 10, y: 55, width: 80, height: 8, isHook: true, explanation: "FOUND IT. The countdown timer is fake - it resets when it hits zero, or shows different times to different people. It exists only to make you panic." },
          { x: 10, y: 65, width: 80, height: 8, isHook: true, explanation: "Manufactured scarcity. They're not running out. This number is designed to trigger loss aversion - the fear of missing out." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🧠',
        title: 'Your Brain on FOMO',
        content: `When you see "Only 3 left!" your amygdala fires a <strong>threat response</strong>.<br><br>Your brain literally thinks you're about to lose something - even though you never had it.<br><br>This is called <strong>loss aversion</strong>. Losing feels 2x worse than gaining feels good.<br><br>That countdown timer isn't tracking real inventory. It's hacking your threat detection system.`
      },
      {
        type: 'artifact',
        context: "Now you're shopping on Amazon...",
        contextIcon: '🛒',
        artifactType: 'product-listing',
        artifactHTML: `<div class="fake-amazon-listing"><div class="product-title">Wireless Earbuds Pro X</div><div class="rating">⭐⭐⭐⭐☆ (2,847 reviews)</div><div class="price">$79.99</div><div class="prime">✓ Prime FREE delivery tomorrow</div><div class="stock-warning">🔴 Only 2 left in stock - order soon</div><div class="more-coming">"More on the way"</div><div class="buttons"><div class="cart-btn">Add to Cart</div><div class="buy-btn">Buy Now</div></div><div class="social-proof"><div>📦 Frequently bought together</div><div>👥 847 people are viewing this right now</div></div></div>`,
        prompt: 'Find the FOMO triggers hiding in this listing.',
        hotspots: [
          { x: 5, y: 48, width: 90, height: 8, isHook: true, explanation: "Classic artificial scarcity. Amazon shows this on tons of products. Check back tomorrow - there will magically still be '2 left.'" },
          { x: 5, y: 82, width: 90, height: 8, isHook: true, explanation: "Social pressure tactic. This number is often inflated or made up. It's designed to make you feel like you're in a race." },
          { x: 5, y: 38, width: 70, height: 6, isHook: false, explanation: "This is just shipping info - not a manipulation tactic. Prime delivery is actually useful." }
        ],
        points: 100
      },
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
          return { monthly: fomoScore, total: conversionRate, hidden: Math.round((conversionRate - 2) * 1000) };
        },
        checkGoal: (result) => result.total >= 10,
        goal: 'Get conversion rate above 10%',
        revelation: "See how easy that was? You just turned a mediocre product into an 'urgent' buy. None of those numbers have to be real. Now you know what they're doing to you.",
        resultLabels: { monthly: 'FOMO Score', total: 'Conversion Rate', hidden: 'Extra Sales per 1000 visitors' },
        points: 100
      },
      {
        type: 'info',
        icon: '🛡️',
        title: 'The FOMO Defense Stack',
        content: `Three questions to kill FOMO instantly:<br><br><strong>1. "Will this exist tomorrow?"</strong><br>Most "limited" things aren't. Sales come back. Stock replenishes.<br><br><strong>2. "Did I want this BEFORE I saw the urgency?"</strong><br>If no, the urgency is manufacturing desire.<br><br><strong>3. "What's the worst case if I miss it?"</strong><br>Usually: nothing. You just... don't have the thing you didn't know you wanted.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '📧', name: 'Email Notification' },
        content: `You get an email from a course you looked at once:<br><br><strong>"FINAL NOTICE: Enrollment closes at MIDNIGHT"</strong><br><br><em>"This is your LAST CHANCE to join Financial Freedom Academy. After tonight, the doors close and won't reopen until next year. 847 students already enrolled. Don't be left behind."</em><br><br>You kinda wanted to take a finance course eventually...`,
        choices: [
          { text: "Sign up before midnight - I've been meaning to learn this", correct: false, explanation: "'Doors close' is fake scarcity. Digital courses don't run out. They're using a deadline to prevent you from researching competitors. The 'LAST CHANCE' will come again in 2 weeks." },
          { text: "Google '[course name] review' before deciding", correct: true, explanation: "Smart. Taking 10 minutes to research can save you hundreds. And if the reviews are bad, that 'last chance' just protected you." },
          { text: "Unsubscribe - done with manipulative emails", correct: true, explanation: "Also valid. A course using these tactics probably uses similar manipulation in its content. The unsubscribe button is underrated." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The 24-Hour Rule',
        description: "When you feel urgency to buy something, wait 24 hours. If it's gone tomorrow, it wasn't meant to be. If it's still there, the 'urgency' was fake.",
        phrase: "If it's a good deal today, it'll be a good deal tomorrow."
      },
      {
        type: 'summary',
        title: 'FOMO Fundamentals Complete',
        keyTakeaways: [
          'Countdown timers and "only X left" are usually fake',
          "Your brain treats 'missing out' like physical danger - it's not",
          'Ask: "Did I want this BEFORE I saw the urgency?"',
          'The 24-Hour Rule kills most impulse purchases',
          "Real opportunities don't require panic"
        ]
      }
    ]
  },

  // ============== LESSON 2: URGENCY RESISTANCE ==============
  urgency_resistance: {
    id: 'lesson_urgency',
    title: 'Urgency Resistance',
    steps: [
      {
        type: 'info',
        icon: '⏰',
        title: 'The Fake Deadline Factory',
        content: `"Act now!" "Limited time!" "Offer expires tonight!"<br><br>These phrases exist for one reason: <strong>to stop you from thinking.</strong><br><br>Real deadlines are rare. Fake ones are everywhere. Today you learn to tell the difference.`
      },
      {
        type: 'bsdetector',
        platform: '📺 Car Commercial',
        guruName: 'Dealership Dan',
        guruAvatar: '🚗',
        script: [
          { text: "Come on down to Honest Dan's Auto!", isLie: false, duration: 2000 },
          { text: "This weekend ONLY - zero down, zero interest!", isLie: true, truth: "This 'weekend only' sale has run every weekend for 3 years. Check their old ads.", duration: 3500 },
          { text: "We've got over 500 vehicles in stock!", isLie: false, duration: 2000 },
          { text: "But at these prices, they're FLYING off the lot!", isLie: true, truth: "If they had 500 in stock and they were 'flying off,' they'd be out by now. The urgency is manufactured.", duration: 3500 },
          { text: "Come in before Saturday or you'll miss out!", isLie: true, truth: "Miss out on what? The same sale they'll run next weekend? Real scarcity doesn't need to be shouted.", duration: 3500 }
        ]
      },
      {
        type: 'info',
        icon: '🎭',
        title: 'Real vs. Fake Urgency',
        content: `<strong>REAL urgency:</strong><br>• Concert tickets (finite seats, one date)<br>• Seasonal items (actual end of season)<br>• Expiring food (literal deadline)<br><br><strong>FAKE urgency:</strong><br>• "Sale ends tonight!" (resets tomorrow)<br>• "Only 3 left!" (restocked hourly)<br>• "Price goes up Monday!" (been saying that for months)<br><br>The test: <strong>Does the deadline exist for a real reason, or just to pressure you?</strong>`
      },
      {
        type: 'artifact',
        context: "You get this text from a store you browsed once...",
        contextIcon: '💬',
        artifactType: 'sms-message',
        artifactHTML: `<div class="fake-sms"><div class="sms-header">72635</div><div class="sms-bubble"><p>⚠️ <strong>URGENT:</strong> Your cart is expiring!</p><p>The items you saved are almost gone. Complete your purchase in the next <strong>2 HOURS</strong> or lose them forever.</p><p>Use code SAVE20 for 20% off - expires TONIGHT</p><p class="sms-link">Tap to buy: [link]</p><p class="sms-small">Reply STOP to unsubscribe</p></div></div>`,
        prompt: 'This text wants you to panic. Find the fake urgency.',
        hotspots: [
          { x: 10, y: 25, width: 80, height: 12, isHook: true, explanation: "Carts don't 'expire.' This is manufactured urgency. Your items will still be there next week." },
          { x: 10, y: 42, width: 80, height: 10, isHook: true, explanation: "This timer is fake. They send this same message every few days to everyone on their list." },
          { x: 10, y: 55, width: 80, height: 10, isHook: false, explanation: "Discount codes do expire, but they usually come back. This isn't the main manipulation." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '👔', name: 'Sales Rep (Phone)' },
        content: `You're on the phone with a solar panel company. You said you'd think about it.<br><br><em>"I totally understand wanting to think it over. But I should tell you - this price is only guaranteed until end of business today. After that, I can't promise anything. My manager approved this special rate just for you, and these quotes expire at 5pm."</em>`,
        choices: [
          { text: "Okay, I don't want to lose the deal. Let's do it.", correct: false, explanation: "Classic pressure tactic. If the price was real, they'd honor it tomorrow. They want to stop you from getting competing quotes." },
          { text: "If the price changes, I'll pass. Email me the quote and I'll decide this week.", correct: true, explanation: "Perfect. You called their bluff. If they really want your business, they'll hold the price. If they don't, the 'deal' was fake." },
          { text: "Can I talk to your manager about extending it?", correct: false, explanation: "You're negotiating within their frame. The deadline itself is the problem. Don't legitimize it." }
        ],
        points: 100
      },
      {
        type: 'artifact',
        context: "Browsing an online course...",
        contextIcon: '💻',
        artifactType: 'landing-page',
        artifactHTML: `<div class="fake-landing-page"><div class="countdown-box"><div class="countdown-label">🔒 ENROLLMENT CLOSES IN:</div><div class="countdown-timer">02 : 47 : 33</div><div class="countdown-units">hrs &nbsp;&nbsp; min &nbsp;&nbsp; sec</div></div><div class="social-proof-line">"Join 10,000+ students who transformed their careers"</div><div class="price-compare"><span class="reg-price">Regular Price: $997</span><span class="sale-price">TODAY ONLY: $197</span></div><div class="cta-btn">ENROLL NOW - SAVE $800</div><p class="warning-text">⚠️ After this timer hits zero, the price returns to $997 and won't drop again until next year.</p></div>`,
        prompt: 'This page is designed to make you buy NOW. Find the pressure tactics.',
        hotspots: [
          { x: 10, y: 8, width: 80, height: 22, isHook: true, explanation: "This timer is fake. Refresh the page in incognito mode - it resets. Or come back tomorrow - there will be a new 'deadline.'" },
          { x: 10, y: 45, width: 80, height: 12, isHook: true, explanation: "The $997 price probably never existed. It's an anchor to make $197 feel like a steal. Search for reviews - people rarely pay 'full price.'" },
          { x: 10, y: 32, width: 80, height: 8, isHook: false, explanation: "Social proof, but not urgency manipulation. This might even be true." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🛡️',
        title: 'The Urgency Killer',
        content: `One question destroys fake urgency:<br><br><strong>"Will this deal exist tomorrow?"</strong><br><br>If yes → the deadline is fake, take your time<br><br>If no → ask yourself: do I actually want this, or just fear missing it?<br><br>Real opportunities don't require panic. Companies that pressure you are betting you won't think clearly.`
      },
      {
        type: 'weapon',
        name: 'The Tomorrow Test',
        description: "When pressured to decide NOW, ask: \"Will this offer exist tomorrow?\" If they say no, call their bluff - walk away and check back in 24 hours. 90% of the time, the deal is still there.",
        phrase: "I'll check back tomorrow. If it's gone, it wasn't meant to be."
      },
      {
        type: 'summary',
        title: 'Urgency Resistance Complete',
        keyTakeaways: [
          "Most 'limited time' offers aren't limited",
          'Countdown timers often reset or are completely fake',
          "Real urgency is rare and doesn't need to be shouted",
          'Ask: "Will this deal exist tomorrow?"',
          'Pressure to decide NOW = reason to walk away'
        ]
      }
    ]
  },

  // ============== LESSON 3: SOCIAL PROOF TRAPS ==============
  social_proof_traps: {
    id: 'lesson_social_proof',
    title: 'Social Proof Traps',
    steps: [
      {
        type: 'info',
        icon: '👥',
        title: 'The Trust Hack',
        content: `"50,000 happy customers!"<br>"★★★★★ 4.9 stars!"<br>"Everyone's buying this!"<br><br>We're wired to trust the crowd. If everyone else likes it, it must be good... right?<br><br>Marketers know this. And they exploit it with fake reviews, paid testimonials, and manufactured popularity.`
      },
      {
        type: 'artifact',
        context: "You're looking at a product on Amazon...",
        contextIcon: '🛒',
        artifactType: 'amazon-reviews',
        artifactHTML: `<div class="fake-amazon-reviews"><div class="review"><div class="review-stars">★★★★★</div><div class="review-title">"AMAZING PRODUCT!!!"</div><div class="review-meta">Verified Purchase | 2 days ago</div><div class="review-body">This is the BEST purchase I've ever made!!! I was skeptical at first but WOW it exceeded all my expectations. My whole family loves it. Already ordered two more for gifts!!! 🎁 Highly recommend to EVERYONE!!!</div><div class="review-helpful">👍 847 people found this helpful</div></div><div class="review-divider"></div><div class="review"><div class="review-stars">★★★★★</div><div class="review-title">"Life changing"</div><div class="review-meta">Verified Purchase | 3 days ago</div><div class="review-body">I can't believe I waited so long to buy this. It's absolutely perfect. Five stars isn't enough. Will be buying more!!</div></div></div>`,
        prompt: 'These reviews feel off. Find the signs of fakes.',
        hotspots: [
          { x: 5, y: 18, width: 90, height: 18, isHook: true, explanation: "Excessive enthusiasm with multiple exclamation marks is a red flag. Real reviews are specific. Fake ones are vague and emotional." },
          { x: 5, y: 38, width: 90, height: 8, isHook: true, explanation: "Helpful votes can be purchased in bulk. A 2-day-old review with 847 upvotes? Suspicious." },
          { x: 5, y: 48, width: 50, height: 6, isHook: false, explanation: "'Verified Purchase' just means someone bought it. Sellers often buy their own products to leave fake verified reviews." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🔍',
        title: 'Fake Review Red Flags',
        content: `<strong>Signs of fake reviews:</strong><br><br>• All 5 stars, posted within days of each other<br>• Vague praise ("amazing!" "life changing!") with no specifics<br>• Reviewer has only reviewed this one product<br>• Suspiciously similar language across reviews<br>• Photos that look professional, not user-taken<br><br><strong>The trick:</strong> Sort by 3-star reviews. Real customers with mixed feelings give honest details.`
      },
      {
        type: 'sharklens',
        instruction: 'Tap each highlighted term to see what it REALLY means.',
        documentType: 'social-post',
        documentTitle: 'INSTAGRAM POST',
        documentText: `Okay I'm OBSESSED with this skincare brand 😍 I've been using it for a week and my skin has literally never looked better!<br><br>Use my code SARAH20 for 20% off - link in bio!<br><br>#gifted #skincare #glowup #ad`,
        terms: [
          { jargon: 'OBSESSED', realMeaning: "Standard influencer hyperbole. They say this about every product." },
          { jargon: '#gifted', realMeaning: "They got this for FREE. Their opinion is not unbiased." },
          { jargon: '#ad', realMeaning: "They're being PAID to say this. Legally required disclosure." },
          { jargon: 'link in bio', realMeaning: "They earn commission on every sale. Direct financial incentive to hype." }
        ]
      },
      {
        type: 'scenario',
        speaker: { avatar: '👨‍💼', name: 'Your Coworker Dave' },
        content: `Dave stops by your desk:<br><br><em>"Hey, you should really check out this investment app my friend told me about. He's already made like $2,000 this month! A bunch of people at his gym are using it too. Super easy passive income."</em>`,
        choices: [
          { text: "That sounds great! What's the app called?", correct: false, explanation: "You're accepting social proof without verification. Dave's friend could be exaggerating, lying, or unknowingly in a scam." },
          { text: "How long has your friend been using it? What are the fees?", correct: true, explanation: "Good skepticism. $2,000/month sounds amazing until you learn he put in $50,000 and there's a 20% withdrawal fee." },
          { text: "Sounds like a pyramid scheme, Dave.", correct: false, explanation: "Maybe too aggressive. It might be legit. The issue is trusting social proof without investigating." }
        ],
        points: 100
      },
      {
        type: 'artifact',
        context: "You see this ad on Facebook...",
        contextIcon: '📘',
        artifactType: 'facebook-ad',
        artifactHTML: `<div class="fake-facebook-ad"><div class="fb-sponsored">Sponsored</div><div class="fb-content"><div class="fb-headline">🏆 "Join 100,000+ entrepreneurs who've taken our course!"</div><div class="fb-testimonials"><div>⭐⭐⭐⭐⭐ "This course changed my life" - Mike R.</div><div>⭐⭐⭐⭐⭐ "Made my money back in a week" - Jennifer S.</div><div>⭐⭐⭐⭐⭐ "Finally quit my 9-5!" - Anonymous</div></div><div class="fb-stat">📈 Average student earns $5,000/month in passive income</div><div class="fb-cta">START YOUR FREE TRIAL →</div></div></div>`,
        prompt: "This ad uses social proof to build trust. What can't you verify?",
        hotspots: [
          { x: 5, y: 18, width: 90, height: 10, isHook: true, explanation: "Unverifiable. They could count anyone who clicked the site. Big number = trust hack." },
          { x: 5, y: 30, width: 90, height: 25, isHook: true, explanation: "These testimonials can't be verified. No last names, no way to check if they're real people." },
          { x: 5, y: 58, width: 90, height: 10, isHook: true, explanation: "'Average' is doing a lot of work here. Includes survivorship bias - they only count people who stuck around." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🛡️',
        title: 'The Social Proof Defense',
        content: `<strong>Before trusting the crowd, ask:</strong><br><br><strong>1. Can I verify this?</strong><br>Real names? Links to profiles? Third-party reviews?<br><br><strong>2. Who benefits?</strong><br>Are they paid? Gifted? Getting a commission?<br><br><strong>3. What do the critics say?</strong><br>3-star reviews tell the truth. Ignore 5-star and 1-star extremes.<br><br>The crowd can be bought. Your skepticism can't.`
      },
      {
        type: 'weapon',
        name: 'The 3-Star Truth',
        description: "When researching any product or service, skip the 5-star raves and 1-star rants. Go straight to 3-star reviews - they're from real people with balanced takes who'll tell you the actual pros and cons.",
        phrase: "What do the 3-star reviews say?"
      },
      {
        type: 'summary',
        title: 'Social Proof Traps Complete',
        keyTakeaways: [
          'Fake reviews are everywhere - look for red flags',
          '#ad and #gifted mean paid promotion, not honest opinion',
          'Testimonials without verifiable names are worthless',
          'Big numbers ("100,000 customers!") are often unverifiable',
          'The 3-star reviews tell the truth'
        ]
      }
    ]
  },

  // ============== LESSON 4: DARK PATTERNS ==============
  dark_patterns: {
    id: 'lesson_dark_patterns',
    title: 'Dark Patterns',
    steps: [
      {
        type: 'info',
        icon: '🕳️',
        title: 'Design Against You',
        content: `Dark patterns are tricks built into websites and apps that manipulate you into doing things you didn't mean to do.<br><br>• Subscribing when you meant to cancel<br>• Sharing data you meant to keep private<br>• Buying things you didn't want<br><br>These aren't accidents. They're designed by teams of people whose job is to trick you.`
      },
      {
        type: 'artifact',
        context: "You're trying to unsubscribe from an email list...",
        contextIcon: '📧',
        artifactType: 'unsubscribe-page',
        artifactHTML: `<div class="fake-unsubscribe"><div class="unsub-sad">😢 We're sad to see you go!</div><div class="unsub-guilt"><p>Are you sure you want to miss out on:</p><ul><li>Exclusive deals (save up to 70%!)</li><li>Early access to new products</li><li>Members-only content</li></ul></div><div class="unsub-buttons"><div class="unsub-yes">Yes, unsubscribe me</div><div class="unsub-no">NO, KEEP MY SUBSCRIPTION!</div></div><p class="unsub-fine-print">By unsubscribing you confirm you no longer wish to receive special offers and understand you may miss important account updates.</p></div>`,
        prompt: 'You just want to unsubscribe. Find the dark patterns making it hard.',
        hotspots: [
          { x: 5, y: 58, width: 90, height: 8, isHook: true, explanation: "The action you WANT is hidden in small, gray text. The action THEY want is big and colorful. This is 'confirm-shaming.'" },
          { x: 5, y: 68, width: 90, height: 10, isHook: true, explanation: "Notice how 'NO' means stay subscribed? They reversed the logic to confuse you." },
          { x: 5, y: 80, width: 90, height: 12, isHook: true, explanation: "Fear tactic. 'Important account updates' aren't sent via marketing emails. They're legally required to contact you other ways." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🎨',
        title: 'The Dark Pattern Playbook',
        content: `<strong>Common dark patterns:</strong><br><br><strong>Confirm-shaming:</strong> "No thanks, I don't want to save money"<br><br><strong>Hidden costs:</strong> Fees revealed only at checkout<br><br><strong>Roach motel:</strong> Easy to sign up, nightmare to cancel<br><br><strong>Misdirection:</strong> Bright button does what THEY want, tiny link does what YOU want<br><br><strong>Forced continuity:</strong> Free trial → auto-charges your card<br><br><strong>Trick questions:</strong> Confusing double-negatives`
      },
      {
        type: 'artifact',
        context: "You're checking out online...",
        contextIcon: '🛒',
        artifactType: 'checkout-page',
        artifactHTML: `<div class="fake-checkout"><div class="checkout-header">Checkout - Step 3 of 3</div><div class="checkout-summary"><div class="line-item"><span>Widget Pro</span><span>$49.99</span></div><div class="line-item"><span>Shipping</span><span>$5.99</span></div><div class="line-item subtotal"><span>Subtotal:</span><span>$55.98</span></div></div><div class="checkout-extras"><label class="checked"><input type="checkbox" checked> Add 2-year protection plan (+$12.99)</label><label class="checked"><input type="checkbox" checked> Add gift wrapping (+$4.99)</label><label><input type="checkbox"> Opt OUT of promotional emails</label></div><div class="checkout-btn">COMPLETE PURCHASE - $73.96</div><p class="checkout-terms">By completing this purchase you agree to our Terms of Service and acknowledge enrollment in Widget+ Rewards (first month free, then $9.99/mo, cancel anytime).</p></div>`,
        prompt: 'Your $49.99 widget is now $73.96. Find out why.',
        hotspots: [
          { x: 5, y: 42, width: 90, height: 14, isHook: true, explanation: "Pre-selected to charge you more. Many people don't notice. This is 'sneak into basket.'" },
          { x: 5, y: 58, width: 90, height: 6, isHook: true, explanation: "Double negative. You have to CHECK the box to NOT get emails. Confusing by design." },
          { x: 5, y: 75, width: 90, height: 15, isHook: true, explanation: "Buried subscription! You're signing up for $9.99/month hidden in the terms. Classic forced continuity." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '💻', name: 'Streaming Service Website' },
        content: `You signed up for a free trial 2 weeks ago. You want to cancel before it charges.<br><br>You click "Account" → "Subscription" → "Manage Plan"<br><br>The page shows:<br><strong>"Are you sure? You'll lose access to:"</strong><br>• 10,000+ movies and shows<br>• Ad-free streaming<br>• Downloads for offline viewing<br><br><strong>[KEEP MY SUBSCRIPTION]</strong> ← Big red button<br><br><em>"I understand I'll lose everything"</em> ← Small underlined text<br><br>Then another page asking why you're leaving. Then another with a "special offer." Then finally a confirmation.`,
        choices: [
          { text: "This is annoying but I'll click through all of it", correct: true, explanation: "Yes, this is the 'roach motel' pattern. Keep clicking the small text until you're actually canceled. Don't give up." },
          { text: "I'll just let it charge and cancel next month", correct: false, explanation: "That's what they want. You'll pay this month and probably forget again next month. Canceling now is worth 5 minutes of frustration." },
          { text: "Maybe I should keep it since canceling is so hard", correct: false, explanation: "This is exactly why dark patterns work. The difficulty is manufactured. The service isn't worth more just because leaving is hard." }
        ],
        points: 100
      },
      {
        type: 'redpen',
        documentTitle: 'WEBSITE COOKIE POPUP',
        instruction: 'You have 20 seconds. Find the dark patterns!',
        timeLimit: 20,
        clauses: [
          { text: 'We value your privacy', isPredatory: false },
          { text: '[ACCEPT ALL COOKIES] - Big green button', isPredatory: true },
          { text: '"Manage Preferences" - Small gray text', isPredatory: true },
          { text: '"Reject All" - Hidden in sub-menu', isPredatory: true },
          { text: 'We use cookies to improve your experience', isPredatory: false },
          { text: 'By continuing to browse, you accept all cookies', isPredatory: true }
        ],
        teachAfter: "The EU requires a 'Reject All' option as easy to find as 'Accept All.' Many sites hide it anyway, betting most people won't bother."
      },
      {
        type: 'info',
        icon: '👁️',
        title: 'How to See Through Dark Patterns',
        content: `<strong>The Gray Text Rule:</strong><br><br>Whatever they're hiding in small, gray, or hard-to-find text is what they don't want you to notice.<br><br>That text is <em>always</em> worth reading.<br><br>When confused by a page's design, ask:<br><strong>"What do they WANT me to click vs. what do I WANT to click?"</strong><br><br>If those are different, you've found a dark pattern.`
      },
      {
        type: 'weapon',
        name: 'The Gray Text Rule',
        description: "Before clicking anything, find the smallest, grayest, most hidden text on the page. That's where they hide what they don't want you to see: the unsubscribe, the opt-out, the real terms.",
        phrase: "What's in the gray text?"
      },
      {
        type: 'summary',
        title: 'Dark Patterns Complete',
        keyTakeaways: [
          'Dark patterns are intentional design tricks, not accidents',
          'Bright buttons do what THEY want, tiny links do what YOU want',
          'Pre-checked boxes = hidden charges',
          '"Roach motel" = easy to enter, hard to leave',
          'Always read the small gray text'
        ]
      }
    ]
  },

  // ============== LESSON 5: PREDATOR SPOTTING (MASTER) ==============
  predator_spotting: {
    id: 'lesson_predator',
    title: 'Predator Spotting',
    steps: [
      {
        type: 'info',
        icon: '🦈',
        title: 'See the Whole Game',
        content: `You've learned the individual tactics:<br>• FOMO (fear of missing out)<br>• Urgency (fake deadlines)<br>• Social Proof (manufactured trust)<br>• Dark Patterns (design tricks)<br><br>Now let's put it together. Predators don't use one trick - they stack them. Once you see the pattern, you can't unsee it.`
      },
      {
        type: 'artifact',
        context: "You receive this DM on Instagram...",
        contextIcon: '📱',
        artifactType: 'instagram-dm',
        artifactHTML: `<div class="fake-instagram-dm"><div class="dm-header"><div class="dm-avatar">💰</div><div class="dm-name">CryptoKing_2024</div></div><div class="dm-messages"><div class="dm-bubble">Hey! 👋</div><div class="dm-bubble">I noticed you follow some finance accounts - you seem smart about money.</div><div class="dm-bubble">I've been making CRAZY returns with this trading group. Like $500-800/week with just 30 min of work. 📈</div><div class="dm-bubble">The group is normally $299 to join but my mentor is letting in 5 more people this week at $99.</div><div class="dm-bubble">I can send you the link if you want? No pressure but spots fill up fast! ⏰</div><div class="dm-bubble">Let me know! 🙌</div></div></div>`,
        prompt: 'This message stacks multiple manipulation tactics. Find them all.',
        hotspots: [
          { x: 5, y: 22, width: 90, height: 8, isHook: true, explanation: "Flattery to lower your guard. Predators make you feel special." },
          { x: 5, y: 32, width: 90, height: 12, isHook: true, explanation: "If this were real, why would strangers share it? The returns are the bait." },
          { x: 5, y: 46, width: 90, height: 10, isHook: true, explanation: "Price anchoring + urgency. Classic stack. $299 → $99 makes it feel like a deal." },
          { x: 5, y: 58, width: 90, height: 12, isHook: true, explanation: "Artificial scarcity + urgency. '5 more people' and 'spots fill up fast.' You've seen this before." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🎯',
        title: 'The Predator Stack',
        content: `Notice how that message used EVERY tactic:<br><br>✓ <strong>Flattery</strong> - "you seem smart"<br>✓ <strong>Social proof</strong> - implied successful group<br>✓ <strong>Anchoring</strong> - $299 → $99<br>✓ <strong>Urgency</strong> - "this week only"<br>✓ <strong>Scarcity</strong> - "5 more people"<br>✓ <strong>False intimacy</strong> - "no pressure" (while applying pressure)<br><br>One tactic might be coincidence.<br><strong>Multiple tactics stacked = intentional manipulation.</strong>`
      },
      {
        type: 'bsdetector',
        platform: '🎤 MLM Recruitment',
        guruName: 'Your Old Friend Sarah',
        guruAvatar: '💅',
        script: [
          { text: "Oh my god it's been SO long! How are you??", isLie: false, duration: 2500 },
          { text: "So I started this business and it's literally changed my life", isLie: false, duration: 3000 },
          { text: "I'm basically my own boss now, working from my phone, making passive income", isLie: true, truth: "MLM participants work constantly recruiting, not passively. 99% lose money according to FTC studies.", duration: 4000 },
          { text: "The products basically sell themselves!", isLie: true, truth: "If products sold themselves, they wouldn't need recruiters. MLMs make money from recruitment, not product sales.", duration: 3500 },
          { text: "You'd be perfect for this! You know so many people!", isLie: true, truth: "Translation: they want access to your network. You're the product, not the customer.", duration: 3500 },
          { text: "It's not a pyramid scheme - those are illegal. This is network marketing.", isLie: true, truth: "The shape of the compensation structure IS a pyramid. 'Network marketing' is the rebrand.", duration: 4000 }
        ]
      },
      {
        type: 'scenario',
        speaker: { avatar: '👨‍💻', name: 'Online Guru Ad' },
        content: `You see an ad for a "free masterclass" on making money online. You sign up. The masterclass is 90 minutes and actually has some good info.<br><br>At minute 85, the pitch:<br><br><em>"Everything I just showed you? It's in my complete course. Normally $2,997, but for the next 48 hours - for people who showed up live - I'm offering it for just $497. Payment plans available. But this offer disappears when the timer hits zero."</em><br><br>You think: "The free content was pretty good..."`,
        choices: [
          { text: "The free content was valuable, so the course must be worth it. I should buy before the timer ends.", correct: false, explanation: "Classic funnel. Free content builds trust, then urgency + anchoring ($2997 → $497) closes the sale. The deadline is fake - this exact offer will run again next month." },
          { text: "I'll write down what I learned for free and research the course reviews later.", correct: true, explanation: "Perfect. Take the free value, ignore the pressure. If the course is good, it'll still be good next week at whatever the real price is." },
          { text: "This feels like a scam. Everything he taught was probably lies.", correct: false, explanation: "Not necessarily. The free content might be legit. That's what makes it effective. Good free content + manipulative sales tactics can coexist." }
        ],
        points: 100
      },
      {
        type: 'reverse',
        title: 'Build a Scam Funnel',
        villainIcon: '🦹',
        instruction: "You're a predator. Design a manipulation funnel to sell a $500 course. Stack the tactics.",
        sliders: [
          { label: 'Free Content Quality', min: 0, max: 10, default: 5, step: 1, suffix: '/10' },
          { label: 'Urgency Tactics', min: 0, max: 10, default: 3, step: 1, suffix: '/10' },
          { label: 'Price Anchor Multiplier', min: 1, max: 10, default: 2, step: 1, suffix: 'x' },
          { label: 'Scarcity Claims', min: 0, max: 10, default: 3, step: 1, suffix: '/10' }
        ],
        calculate: (values) => {
          const [quality, urgency, anchor, scarcity] = values;
          const trust = quality * 10;
          const pressure = (urgency + scarcity) * 5;
          const perceived = anchor * 20;
          const conversion = 1 + (trust * 0.08) + (pressure * 0.04) + (perceived * 0.015);
          return { monthly: Math.round(trust), total: conversion, hidden: Math.round(pressure) };
        },
        checkGoal: (result) => result.total >= 8,
        goal: 'Get conversion rate above 8%',
        revelation: "See the formula? This is how the machine works. It can sell good products or bad ones - the tactics don't tell you which. But stacked pressure is always a warning sign. Good products don't need panic to sell.",
        resultLabels: { monthly: 'Trust Built', total: 'Conversion Rate', hidden: 'Pressure Applied' },
        points: 100
      },
      {
        type: 'info',
        icon: '🔑',
        title: 'The Master Key',
        content: `When you feel pressured to act NOW on an opportunity that seems TOO good, ask one question:<br><br><strong>"Who profits if I believe this?"</strong><br><br>• They profit → be skeptical<br>• You clearly profit → might be real<br>• "We both profit!" → probably them more than you<br><br>Every predator needs you to believe them. That belief is worth money.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🏨', name: 'Hotel Conference Room' },
        content: `You're at a free "real estate investing seminar."<br><br>For 2 hours, a charismatic speaker shows success stories: regular people who now own 10+ properties and "retired in 3 years."<br><br>Now comes the pitch: A 3-day intensive workshop for $1,997. "But if you sign up tonight - right now in this room - it's only $497. We can't offer this price once you leave."<br><br>People around you are lining up with credit cards.`,
        choices: [
          { text: "Everyone else is signing up - this must be legit", correct: false, explanation: "Social proof in action. Those people might be plants. Or they're making the same mistake. The crowd isn't proof of quality." },
          { text: "I'll research the company and speaker tonight before deciding", correct: true, explanation: "Yes. Any legitimate opportunity will exist tomorrow. If the price is 'only available now,' that's a sign the product can't sell on its merits." },
          { text: "I'll sign up - I can always get a refund if it's bad", correct: false, explanation: "Refund policies at these seminars are notoriously difficult. You'll be in another high-pressure room being upsold to more expensive programs." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The Profit Question',
        description: "When any opportunity seems too good, ask: \"Who profits if I believe this?\" Follow the money. If their profit depends on your belief (not your success), you're the product, not the customer.",
        phrase: "Who profits if I believe this?"
      },
      {
        type: 'summary',
        title: 'Predator Spotting Complete',
        keyTakeaways: [
          'Predators stack multiple tactics (FOMO + urgency + social proof + anchoring)',
          '"Free" valuable content often leads to high-pressure funnels',
          'MLMs make money from recruitment, not products',
          'Seminar upsells rely on room pressure + fake deadlines',
          'The Profit Question: "Who profits if I believe this?"'
        ]
      }
    ]
  },

  // ============================================================
  // PLACEHOLDER LESSONS FOR OTHER BRANCHES
  // ============================================================

  financing_tactics: {
    id: 'lesson_financing',
    title: 'The 0% APR Trap',
    steps: [
      { type: 'info', icon: '💳', title: 'Coming Soon', content: 'This lesson is under construction.' },
      { type: 'summary', title: 'Placeholder', keyTakeaways: ['Lesson not yet built'] }
    ]
  },

  contract_red_flags: {
    id: 'lesson_contracts', 
    title: 'Contract Surgeon',
    steps: [
      { type: 'info', icon: '📜', title: 'Coming Soon', content: 'This lesson is under construction.' },
      { type: 'summary', title: 'Placeholder', keyTakeaways: ['Lesson not yet built'] }
    ]
  },

  tax_fundamentals: {
    id: 'lesson_tax',
    title: 'Tax Myth Busters', 
    steps: [
      { type: 'info', icon: '🏛️', title: 'Coming Soon', content: 'This lesson is under construction.' },
      { type: 'summary', title: 'Placeholder', keyTakeaways: ['Lesson not yet built'] }
    ]
  }
};

window.LessonData = LessonData;
console.log('lesson-data.js loaded');
