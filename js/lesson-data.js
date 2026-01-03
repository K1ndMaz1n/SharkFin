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
        type: 'gauntlet',
        context: "Cancel your StreamFlix+ subscription before your free trial ends",
        screens: [
          {
            // Screen 1: The Guilt Trip
            html: `
              <div class="sad-emoji">😢</div>
              <h3>We'll miss you...</h3>
              <div class="stat-callout">
                You've watched <strong>47 hours</strong> of content this month!<br>
                That's like $0.21 per hour of entertainment.
              </div>
              <p>Are you SURE you want to give that up?</p>
              <button class="main-btn" data-action="renew">KEEP STREAMING - $15.99/mo</button>
              <a class="sneaky-link" data-action="cancel">I hate entertainment</a>
            `,
            traps: [
              { selector: '[data-action="renew"]', isCorrect: false, trapType: 'renew', message: "Oops! That would have renewed you. Look for the small text." },
              { selector: '[data-action="cancel"]', isCorrect: true, successMsg: "Good! You found the shame-link. On to the next obstacle..." }
            ]
          },
          {
            // Screen 2: The Fake Survey
            html: `
              <div style="position:relative;">
                <span class="close-x" data-action="skip">✕</span>
                <h3>Before you go, help us improve!</h3>
                <p>Why are you leaving?</p>
                <div class="survey-options">
                  <label><input type="radio" name="reason"> Too expensive</label>
                  <label><input type="radio" name="reason"> Not enough content</label>
                  <label><input type="radio" name="reason"> Technical issues</label>
                  <label><input type="radio" name="reason"> Found another service</label>
                  <label><input type="radio" name="reason"> Other</label>
                </div>
                <button class="main-btn" data-action="submit">SUBMIT & CONTINUE</button>
              </div>
            `,
            hiddenElement: { selector: '.close-x', showAfter: 800 },
            traps: [
              { selector: '[data-action="submit"]', isCorrect: false, trapType: 'stall', message: "That leads to MORE surveys. They're stalling you. Look for another way out..." },
              { selector: '[data-action="skip"]', isCorrect: true, successMsg: "Nice! Surveys are optional. They're just stalling tactics." }
            ]
          },
          {
            // Screen 3: The Button Swap
            html: `
              <h3>🎁 WAIT! Special offer just for you!</h3>
              <p>Stay and get <strong>50% off</strong> for 3 months!</p>
              <div class="stat-callout">$15.99 → <strong>$7.99/mo</strong></div>
              <div class="button-row">
                <button class="swap-btn btn-secondary" data-action="decline">NO THANKS</button>
                <button class="swap-btn btn-primary" data-action="accept">ACCEPT OFFER</button>
              </div>
            `,
            swapButtons: true,
            swapDelay: 1800,
            traps: [
              { selector: '[data-action="accept"]', isCorrect: false, trapType: 'renew', message: "Gotcha! The buttons swapped positions. Classic misdirection." },
              { selector: '[data-action="decline"]', isCorrect: true, successMsg: "You tracked the button! Most people don't notice the swap." }
            ]
          },
          {
            // Screen 4: The Double Negative
            html: `
              <h3>⚠️ Cancel Confirmation</h3>
              <p>Please confirm your cancellation preferences:</p>
              <div class="confusing-text">
                <label>
                  <input type="checkbox" checked>
                  Don't uncheck this box if you wouldn't not like to discontinue your non-renewal of subscription services.
                </label>
              </div>
              <button class="main-btn" data-action="confirm">CONFIRM</button>
              <a class="reveal-link shown" data-action="actual-cancel">Cancel my subscription →</a>
            `,
            traps: [
              { selector: '[data-action="confirm"]', isCorrect: false, trapType: 'stall', message: "That word salad was designed to confuse you. Look for a clearer option..." },
              { selector: '[data-action="actual-cancel"]', isCorrect: true, successMsg: "Yes! When you see confusing language, ignore it and find the real cancel link." }
            ]
          },
          {
            // Screen 5: The Hostage Video
            html: `
              <div class="video-container">
                <span class="skip-btn" data-action="skip">Skip</span>
                <div class="video-ceo">
                  "Hi, I'm Todd, CEO of StreamFlix.<br><br>
                  I personally wanted to ask you to stay.
                  Our team works SO hard on this content.
                  Think of the artists. The writers. The dreams...<br><br>
                  Please reconsider."
                </div>
              </div>
              <button class="main-btn" data-action="stay">I'LL STAY, TODD</button>
            `,
            hiddenElement: { selector: '.skip-btn', showAfter: 1500 },
            traps: [
              { selector: '[data-action="stay"]', isCorrect: false, trapType: 'renew', message: "Todd doesn't care about you. He cares about metrics. Find the skip button." },
              { selector: '[data-action="skip"]', isCorrect: true, successMsg: "Never let them guilt you! You don't owe Todd anything." }
            ]
          },
          {
            // Screen 6: The Final Boss
            html: `
              <h3>🛑 FINAL STEP</h3>
              <p>Type "I want to cancel" to confirm:</p>
              <input type="text" class="type-input" placeholder="Type here...">
              <ul class="forfeit-list">
                <li>47 hours of watch history</li>
                <li>Your personalized recommendations</li>
                <li>The #47 spot on the leaderboard</li>
                <li>Todd's respect</li>
              </ul>
              <button class="final-btn disabled" data-action="final-cancel">CANCEL SUBSCRIPTION</button>
            `,
            requiresInput: {
              buttonSelector: '[data-action="final-cancel"]',
              successMsg: "🎉 FREEDOM! You made it through the gauntlet!"
            }
          }
        ],
        points: 150
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
  // SYSTEMS ABYSS - 5 LESSONS
  // ============================================================

  // ============== LESSON 1: CREDIT SCORE DECODED ==============
  credit_score_decoded: {
    id: 'lesson_credit',
    title: 'Credit Score Decoded',
    steps: [
      {
        type: 'info',
        icon: '🔢',
        title: 'The Number That Controls Your Life',
        content: `Your credit score affects:<br>• Whether you can rent an apartment<br>• What interest rate you pay on everything<br>• Whether you get approved for loans<br>• Sometimes even job offers<br><br>A 650 score vs 750 score on a $300,000 mortgage = <strong>$50,000+ more in interest</strong> over 30 years.<br><br>Yet most people have no idea how the score actually works.`
      },
      {
        type: 'info',
        icon: '📊',
        title: 'The Five Factors',
        content: `Your FICO score (300-850) is calculated from:<br><br><strong>Payment History (35%)</strong> - Do you pay on time?<br><strong>Credit Utilization (30%)</strong> - How much of your available credit are you using?<br><strong>Length of History (15%)</strong> - How old are your accounts?<br><strong>Credit Mix (10%)</strong> - Different types of credit?<br><strong>New Credit (10%)</strong> - Recent applications?<br><br>The first two = 65% of your score. Master those first.`
      },
      {
        type: 'artifact',
        context: "Your credit report shows this...",
        contextIcon: '📋',
        artifactType: 'credit-report',
        artifactHTML: `<div class="fake-credit-report"><div class="credit-header"><span class="credit-label">CREDIT SCORE</span><span class="credit-score">672</span><span class="credit-rating">Fair</span></div><div class="credit-section"><div class="section-title">ACCOUNTS</div><div class="account-row"><span>Chase Visa</span><span class="warn">$4,200 / $5,000 (84%)</span></div><div class="account-row"><span>Capital One</span><span>$0 / $2,000 (0%)</span></div><div class="account-row"><span>Car Loan</span><span>$12,400 remaining</span></div><div class="account-row"><span>Store Card</span><span class="muted">Closed 2019</span></div></div><div class="credit-section"><div class="section-title">PAYMENT HISTORY</div><div class="credit-stat">97% on-time</div><div class="credit-note warn">1 late payment (32 days) - March 2023</div></div><div class="credit-section"><div class="section-title">HARD INQUIRIES (12 mo)</div><div class="credit-stat warn">4</div></div><div class="credit-section"><div class="section-title">AVG ACCOUNT AGE</div><div class="credit-stat">3.2 years</div></div></div>`,
        prompt: "Your score is 672. Find what's holding it back.",
        hotspots: [
          { x: 55, y: 25, width: 40, height: 8, isHook: true, explanation: "84% utilization is killing your score. Over 30% hurts. Pay this down to under $1,500 and watch your score jump 30-50 points." },
          { x: 55, y: 33, width: 40, height: 8, isHook: true, explanation: "0% isn't ideal either. Use this card for a small recurring charge ($10/month), then autopay. Shows active positive history." },
          { x: 5, y: 55, width: 90, height: 8, isHook: true, explanation: "One late payment drags you down for 7 years. Can drop your score 100+ points. Set up autopay for at least the minimum." },
          { x: 5, y: 68, width: 90, height: 8, isHook: true, explanation: "4 inquiries looks like you're desperate for credit. Each dings 5-10 points. Stop applying for a while." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '💳', name: 'Credit Card Offer' },
        content: `You get a letter:<br><br><em>"Congratulations! You're pre-approved for the Platinum Rewards Card! 50,000 bonus points! 0% APR for 18 months! Apply now - this exclusive offer expires in 7 days!"</em><br><br>You already have 3 credit cards and just applied for a car loan last month.`,
        choices: [
          { text: "Apply - 50,000 points is valuable!", correct: false, explanation: "You just applied for a car loan, so another inquiry hurts. Plus a new account lowers your average age. Wait 6+ months." },
          { text: "Ignore it - I don't need more credit cards.", correct: true, explanation: "Right move. Another inquiry and new account would hurt more than the points are worth. Let your score recover." },
          { text: "Apply but don't use it.", correct: false, explanation: "The damage happens at application (hard inquiry). Opening it still hurts your average account age." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🚫',
        title: 'Credit Score Myths Busted',
        content: `<strong>Myth:</strong> Checking your own score hurts it.<br><strong>Truth:</strong> That's a "soft inquiry" - no impact. Check monthly.<br><br><strong>Myth:</strong> Carrying a balance builds credit.<br><strong>Truth:</strong> Paying in full is better. Utilization is measured at statement date.<br><br><strong>Myth:</strong> Closing old cards helps your score.<br><strong>Truth:</strong> It HURTS - reduces available credit and shortens history.<br><br><strong>Myth:</strong> Income affects your score.<br><strong>Truth:</strong> Income isn't on your credit report at all.`
      },
      {
        type: 'bsdetector',
        platform: '📺 TV Commercial',
        guruName: 'CreditBoost Pro',
        guruAvatar: '📈',
        script: [
          { text: "Is your credit score holding you back?", isLie: false, duration: 2000 },
          { text: "Our proprietary system can boost your score 100 points in 30 days - GUARANTEED!", isLie: true, truth: "No legitimate service can guarantee specific increases. Only paying down balances, time, and fixing errors reliably work.", duration: 4500 },
          { text: "We'll dispute ALL negative items on your report!", isLie: true, truth: "Disputing accurate information is fraud. Legitimate negatives can't be legally removed.", duration: 4000 },
          { text: "For just $99/month, you'll get premium credit monitoring!", isLie: true, truth: "Free options exist: Credit Karma, your bank's app, AnnualCreditReport.com. You're paying for something free.", duration: 4000 },
          { text: "Join thousands who've transformed their financial future!", isLie: false, duration: 2000 }
        ]
      },
      {
        type: 'reverse',
        title: 'Credit Score Simulator',
        villainIcon: '📊',
        instruction: "You have a 650 score. See what moves the needle.",
        sliders: [
          { label: 'Pay Down Utilization (from 60% to)', min: 5, max: 60, default: 60, step: 5, suffix: '%' },
          { label: 'Months On-Time Payments', min: 0, max: 24, default: 0, step: 3, suffix: ' mo' },
          { label: 'New Credit Applications', min: 0, max: 5, default: 0, step: 1, suffix: '' },
          { label: 'Close Old Card?', min: 0, max: 1, default: 0, step: 1, suffix: '' }
        ],
        calculate: (values) => {
          const [utilization, months, applications, closedCard] = values;
          let score = 650;
          if (utilization <= 30) score += 35;
          else if (utilization <= 50) score += 15;
          score += months * 2;
          score -= applications * 7;
          if (closedCard) score -= 12;
          const projected = Math.min(850, Math.max(300, score));
          return { monthly: Math.round(60 - utilization), total: projected, hidden: projected - 650 };
        },
        checkGoal: (result) => result.total >= 720,
        goal: 'Get projected score above 720',
        revelation: "Fastest wins: pay down utilization (instant at next statement) and stop applying for things. Time and consistency do the rest. No magic tricks needed.",
        resultLabels: { monthly: 'Utilization Drop', total: 'Projected Score', hidden: 'Point Change' },
        points: 100
      },
      {
        type: 'info',
        icon: '🏗️',
        title: 'Building Credit From Scratch',
        content: `No credit history? Here's the path:<br><br><strong>Step 1:</strong> Get a secured credit card ($200-500 deposit)<br><strong>Step 2:</strong> Use it for one small purchase per month<br><strong>Step 3:</strong> Pay FULL balance every month (autopay!)<br><strong>Step 4:</strong> After 6-12 months, request upgrade to regular card<br><strong>Step 5:</strong> Never close that first card - it's your oldest account<br><br><strong>Alternative:</strong> Become authorized user on parent's OLD card with good history.`
      },
      {
        type: 'weapon',
        name: 'The Credit Checkup',
        description: "Check your credit score monthly (free via Credit Karma or your bank). Focus on utilization (keep under 30%) and payment history (never miss, use autopay). That's 65% of your score controlled.",
        phrase: "What's my utilization, and are all payments on autopay?"
      },
      {
        type: 'summary',
        title: 'Credit Score Decoded Complete',
        keyTakeaways: [
          'Payment history (35%) + utilization (30%) = 65% of your score',
          'Keep utilization under 30% - under 10% is even better',
          'One late payment can drop your score 100+ points',
          "Checking your own score doesn't hurt it",
          'Never close old cards - it hurts more than helps',
          'Credit repair companies are mostly scams'
        ]
      }
    ]
  },

  // ============== LESSON 2: TAX FUNDAMENTALS ==============
  tax_fundamentals: {
    id: 'lesson_tax',
    title: 'Tax Fundamentals',
    steps: [
      {
        type: 'info',
        icon: '🏛️',
        title: 'The Most Misunderstood System',
        content: `"I don't want a raise - it'll put me in a higher tax bracket!"<br><br>This is the most expensive misunderstanding in personal finance.<br><br>Tax brackets are MARGINAL. Only the money ABOVE each threshold is taxed at that rate - not all your income.<br><br><strong>A raise NEVER results in less take-home pay. Never.</strong>`
      },
      {
        type: 'info',
        icon: '📊',
        title: 'How Brackets Actually Work',
        content: `2024 Single Filer brackets (simplified):<br><br>$0 - $11,600: <strong>10%</strong><br>$11,601 - $47,150: <strong>12%</strong><br>$47,151 - $100,525: <strong>22%</strong><br>$100,526 - $191,950: <strong>24%</strong><br><br>If you earn $60,000:<br>• First $11,600 × 10% = $1,160<br>• Next $35,550 × 12% = $4,266<br>• Last $12,850 × 22% = $2,827<br><br><strong>Total tax: $8,253</strong> (effective rate: 13.8%)<br><br>NOT $60,000 × 22% = $13,200!`
      },
      {
        type: 'artifact',
        context: "You're calculating your taxes...",
        contextIcon: '🧮',
        artifactType: 'tax-breakdown',
        artifactHTML: `<div class="fake-tax-doc"><div class="tax-header">TAX CALCULATION</div><div class="tax-section"><div class="tax-label">GROSS INCOME</div><div class="tax-value">$75,000</div></div><div class="tax-section"><div class="tax-label">ADJUSTMENTS</div><div class="tax-row"><span>401(k) Contribution</span><span>-$6,000</span></div><div class="tax-row"><span>HSA Contribution</span><span>-$3,000</span></div><div class="tax-row result"><span>Adjusted Gross Income</span><span>$66,000</span></div></div><div class="tax-section"><div class="tax-label">DEDUCTION</div><div class="tax-row"><span>Standard Deduction</span><span>-$14,600</span></div><div class="tax-row result"><span>Taxable Income</span><span>$51,400</span></div></div><div class="tax-section"><div class="tax-label">TAX (MARGINAL)</div><div class="tax-row"><span>$11,600 @ 10%</span><span>$1,160</span></div><div class="tax-row"><span>$35,550 @ 12%</span><span>$4,266</span></div><div class="tax-row"><span>$4,250 @ 22%</span><span>$935</span></div><div class="tax-row result"><span>Total Tax</span><span>$6,361</span></div></div><div class="tax-footer"><div class="tax-stat"><span>Effective Rate</span><span class="highlight">8.5%</span></div><div class="tax-stat"><span>Marginal Rate</span><span>22%</span></div></div></div>`,
        prompt: 'Find how the tax calculation actually works.',
        hotspots: [
          { x: 5, y: 22, width: 90, height: 8, isHook: false, explanation: "401(k) is pre-tax - you saved $6,000 AND reduced taxable income. At 22% marginal rate, this saves $1,320 in taxes." },
          { x: 5, y: 42, width: 90, height: 8, isHook: true, explanation: "Everyone gets this - it's why most people don't itemize. Your first $14,600 is completely tax-free." },
          { x: 5, y: 82, width: 45, height: 10, isHook: true, explanation: "This is what you ACTUALLY pay. Much lower than your '22% bracket' sounds." },
          { x: 5, y: 68, width: 90, height: 8, isHook: true, explanation: "Only $4,250 is taxed at 22% - not all $75,000. The marginal system at work." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '👨‍💼', name: 'Your Coworker' },
        content: `Your coworker says:<br><br><em>"I'm turning down the overtime. After taxes, it's barely worth it. They take like 40% of everything extra I make!"</em><br><br>He's in the 22% tax bracket. Overtime is taxed the same as regular income.`,
        choices: [
          { text: "Yeah, the government takes most of it.", correct: false, explanation: "Overtime is taxed at his marginal rate (22%), not 40%. He keeps 78 cents of every extra dollar." },
          { text: "That's not how taxes work. You keep most of it.", correct: true, explanation: "Withholding LOOKS high because it's calculated differently, but actual tax is still 22%. The 'extra' comes back as a refund." },
          { text: "You should adjust your W-4 to keep more.", correct: false, explanation: "You could, but the better lesson is understanding that high withholding is temporary - you get it back at tax time." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🧾',
        title: 'Deductions and Credits',
        content: `Two ways to reduce taxes:<br><br><strong>Deductions</strong> = Reduce taxable income<br>• Standard: $14,600 (single) or $29,200 (married)<br>• Itemized: mortgage interest, state taxes, charity<br><br><strong>Credits</strong> = Direct reduction of tax owed (more valuable!)<br>• Child Tax Credit: up to $2,000 per child<br>• Earned Income Credit: for lower incomes<br>• Education credits: up to $2,500/year<br><br>$1,000 deduction at 22% saves $220<br>$1,000 credit saves $1,000<br><br><strong>Credits > Deductions</strong>`
      },
      {
        type: 'bsdetector',
        platform: '📱 Social Media',
        guruName: 'WealthTok Advisor',
        guruAvatar: '💵',
        script: [
          { text: "Want to pay ZERO taxes like the rich?", isLie: false, duration: 2000 },
          { text: "Just put EVERYTHING in an LLC and write off your lifestyle!", isLie: true, truth: "LLCs don't make personal expenses deductible. Writing off vacations as 'business trips' is tax fraud.", duration: 4500 },
          { text: "Your car, your phone, your meals - all business expenses!", isLie: true, truth: "Only ACTUAL business expenses are deductible. Your personal car isn't a business expense because you have an LLC.", duration: 4000 },
          { text: "The tax code has loopholes only the rich know about!", isLie: true, truth: "The 'loopholes' are retirement accounts and HSAs - available to everyone. Rich strategies require being rich.", duration: 4000 },
          { text: "DM me to learn how to pay no taxes legally!", isLie: true, truth: "They're selling courses on illegal tax evasion. This gets people audited and fined.", duration: 4000 }
        ]
      },
      {
        type: 'sharklens',
        instruction: 'Tap each section to understand how W-4 affects your paycheck.',
        documentType: 'w4-form',
        documentTitle: 'W-4 EMPLOYEE WITHHOLDING',
        documentText: `Use this form to determine federal income tax withholding.<br><br><strong>Step 1:</strong> Personal Information<br><strong>Step 2:</strong> Multiple Jobs or Spouse Works<br><strong>Step 3:</strong> Claim Dependents ($2,000 × children)<br><strong>Step 4a:</strong> Other Income (not from jobs)<br><strong>Step 4b:</strong> Deductions (if > standard)<br><strong>Step 4c:</strong> Extra Withholding (per paycheck)`,
        terms: [
          { jargon: 'Step 2: Multiple Jobs', realMeaning: "If you or spouse have multiple jobs, you'll owe MORE than single-job withholding calculates. Use the IRS calculator or you'll owe at tax time." },
          { jargon: 'Step 3: Claim Dependents', realMeaning: "This REDUCES withholding. Claim accurately or you'll owe. Better to under-claim than over-claim." },
          { jargon: 'Step 4c: Extra Withholding', realMeaning: "If you always owe at tax time, add extra here. Getting a big refund? You've given the government an interest-free loan." },
          { jargon: 'Standard Deduction', realMeaning: "If mortgage interest + state taxes + charity exceeds $14,600, you might itemize. Otherwise standard applies automatically." }
        ]
      },
      {
        type: 'reverse',
        title: 'Tax Strategy Playground',
        villainIcon: '🧮',
        instruction: "You earn $80,000. See how different moves affect your taxes.",
        sliders: [
          { label: '401(k) Contribution', min: 0, max: 23000, default: 0, step: 1000, suffix: '' },
          { label: 'HSA Contribution', min: 0, max: 4150, default: 0, step: 500, suffix: '' },
          { label: 'Child Tax Credits', min: 0, max: 4000, default: 0, step: 2000, suffix: '' }
        ],
        calculate: (values) => {
          const [k401, hsa, childCredits] = values;
          const gross = 80000;
          const agi = gross - k401 - hsa;
          const taxable = Math.max(0, agi - 14600);
          let tax = 0;
          if (taxable > 0) tax += Math.min(taxable, 11600) * 0.10;
          if (taxable > 11600) tax += Math.min(taxable - 11600, 35550) * 0.12;
          if (taxable > 47150) tax += (taxable - 47150) * 0.22;
          const finalTax = Math.max(0, tax - childCredits);
          const effectiveRate = ((finalTax / gross) * 100).toFixed(1);
          const saved = Math.round(((80000 - 14600) * 0.15) - finalTax);
          return { monthly: Math.round(taxable), total: parseFloat(effectiveRate), hidden: Math.round(finalTax) };
        },
        checkGoal: (result) => result.total < 10,
        goal: 'Get effective tax rate below 10%',
        revelation: "Without optimizing: 12-13% effective rate. With 401(k) and HSA maxed: under 10% - while building wealth. Tax optimization and retirement savings are the same thing.",
        resultLabels: { monthly: 'Taxable Income', total: 'Effective Rate %', hidden: 'Tax Owed' },
        points: 100
      },
      {
        type: 'info',
        icon: '💰',
        title: 'The Big Three Tax Reducers',
        content: `For most people, three moves do 90% of the work:<br><br><strong>1. 401(k) / 403(b) / IRA</strong><br>Contribute pre-tax, reduce taxable income NOW, pay taxes later in retirement (likely lower bracket)<br><br><strong>2. HSA (if eligible)</strong><br>Triple tax advantage: tax-free in, tax-free growth, tax-free out for medical. Best account in the tax code.<br><br><strong>3. Don't over-withhold</strong><br>Big refund = interest-free loan to government. Adjust W-4 to break even.`
      },
      {
        type: 'weapon',
        name: 'The Marginal Rate Reality',
        description: "When evaluating financial decisions involving taxes: you pay your MARGINAL rate on additional income, but your EFFECTIVE rate on total income. A raise always increases take-home pay. Extra income is always worth earning.",
        phrase: "What's my marginal rate, and what's my effective rate?"
      },
      {
        type: 'summary',
        title: 'Tax Fundamentals Complete',
        keyTakeaways: [
          'Tax brackets are marginal - only income ABOVE each threshold is taxed at that rate',
          'A raise never results in less take-home pay',
          "Standard deduction ($14,600) means most people don't itemize",
          'Credits > Deductions (credits reduce tax directly)',
          '401(k) and HSA are the biggest tax reducers for most people',
          'Big refunds = interest-free loans to the government'
        ]
      }
    ]
  },

  // ============== LESSON 3: INSURANCE ESSENTIALS ==============
  insurance_essentials: {
    id: 'lesson_insurance',
    title: 'Insurance Essentials',
    steps: [
      {
        type: 'info',
        icon: '🛡️',
        title: 'Insurance is Risk Transfer',
        content: `Insurance isn't about hope or fear. It's a simple trade:<br><br><strong>You pay:</strong> Predictable small amounts (premiums)<br><strong>They pay:</strong> Unpredictable large amounts (claims)<br><br>The question for ANY insurance:<br><strong>"Would this cost ruin me financially?"</strong><br><br>If yes → insure it<br>If no → you might be overpaying for peace of mind`
      },
      {
        type: 'info',
        icon: '✅',
        title: 'Insurance You Probably Need',
        content: `<strong>Health Insurance</strong> - Medical bankruptcy is #1 cause of bankruptcy. Non-negotiable.<br><br><strong>Auto Insurance</strong> - Required by law + liability protects your assets.<br><br><strong>Renters/Homeowners</strong> - Your stuff + liability. Cheap for the protection.<br><br><strong>Term Life</strong> (if dependents) - Replaces your income if you die. Only need while others depend on you.<br><br><strong>Disability</strong> (often overlooked) - You're more likely to be disabled than die young. Protects your income.`
      },
      {
        type: 'info',
        icon: '❌',
        title: "Insurance That's Usually a Waste",
        content: `<strong>Extended warranties</strong> - High profit margin for sellers. Most electronics don't fail during warranty.<br><br><strong>Whole/Universal Life</strong> - Combines insurance + investing poorly. Term + separate investing wins 95% of the time.<br><br><strong>Credit card insurance</strong> - Your life/disability insurance already covers this.<br><br><strong>Rental car insurance</strong> - Your auto policy and credit card often cover this.<br><br><strong>Phone insurance</strong> - $10/month × 24 = $240 + $100 deductible. Just buy a replacement.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '📺', name: 'Electronics Store' },
        content: `You're buying a $600 laptop. The cashier says:<br><br><em>"Would you like our protection plan? For just $149, you're covered for 3 years against accidents, drops, and spills. Peace of mind!"</em>`,
        choices: [
          { text: "Yes, I'm clumsy and this protects me.", correct: false, explanation: "You're paying 25% of the laptop's cost for coverage that rarely gets used. Most failures happen outside warranty periods or aren't covered." },
          { text: "No thanks - I'll risk it.", correct: true, explanation: "Statistically correct. Put $149 in savings. If your laptop dies (unlikely in 3 years), you're ahead by self-insuring small losses." },
          { text: "Can I get a longer warranty?", correct: false, explanation: "Longer = more profit for them. The math gets worse, not better." }
        ],
        points: 100
      },
      {
        type: 'artifact',
        context: "Your insurance agent proposes this...",
        contextIcon: '📋',
        artifactType: 'insurance-comparison',
        artifactHTML: `<div class="fake-insurance-compare"><div class="ins-header">LIFE INSURANCE COMPARISON</div><div class="ins-columns"><div class="ins-col"><div class="ins-type">TERM LIFE (20yr)</div><div class="ins-row"><span>Coverage</span><span>$500,000</span></div><div class="ins-row"><span>Monthly</span><span class="good">$32</span></div><div class="ins-row"><span>Death Benefit</span><span>$500k (20 yrs)</span></div><div class="ins-row"><span>Cash Value</span><span>$0</span></div></div><div class="ins-col highlight"><div class="ins-type">WHOLE LIFE</div><div class="ins-row"><span>Coverage</span><span>$500,000</span></div><div class="ins-row"><span>Monthly</span><span class="warn">$385</span></div><div class="ins-row"><span>Death Benefit</span><span>$500k (lifetime)</span></div><div class="ins-row"><span>Cash Value @20yr</span><span>~$85,000</span></div></div></div><div class="ins-pitch">"Whole life BUILDS WEALTH while protecting your family!"</div></div>`,
        prompt: 'The agent recommends whole life. Find why term is usually better.',
        hotspots: [
          { x: 5, y: 30, width: 90, height: 12, isHook: true, explanation: "Term costs 12x less. The $353/month difference invested at 7% for 20 years = $173,000. Way more than whole life's $85k 'cash value.'" },
          { x: 50, y: 55, width: 45, height: 10, isHook: true, explanation: "You're paying ~$92,000 in premiums to get $85,000 back. The insurance company profits from the difference." },
          { x: 5, y: 75, width: 90, height: 10, isHook: true, explanation: "Insurance isn't an investment vehicle. Buy cheap term, invest the difference. You'll come out $80,000+ ahead." }
        ],
        points: 100
      },
      {
        type: 'sharklens',
        instruction: 'Tap each coverage to understand what you really need.',
        documentType: 'auto-policy',
        documentTitle: 'AUTO INSURANCE POLICY',
        documentText: `<strong>Liability:</strong> $50,000 / $100,000 / $50,000<br><strong>Collision:</strong> $500 deductible<br><strong>Comprehensive:</strong> $250 deductible<br><strong>Uninsured Motorist:</strong> $50,000 / $100,000<br><br><strong>Premium:</strong> $1,847 / year<br><br><strong>Optional:</strong><br>• Roadside Assistance: $24/year<br>• Rental Reimbursement: $48/year<br>• Gap Insurance: $180/year`,
        terms: [
          { jargon: 'Liability: $50,000 / $100,000', realMeaning: "Covers damage YOU cause. $100k might not be enough for a serious accident. Consider $250k/$500k - costs only slightly more." },
          { jargon: 'Collision: $500 deductible', realMeaning: "You pay first $500 on any collision. Raising to $1,000 saves ~15% on premium. Worth it if you have savings." },
          { jargon: 'Gap Insurance', realMeaning: "Only needed if you owe more than car is worth. Check loan balance vs car value. Positive equity = wasted money." },
          { jargon: 'Roadside Assistance', realMeaning: "Your credit card or AAA might already include this. Don't double-pay." }
        ]
      },
      {
        type: 'reverse',
        title: 'Deductible Trade-Off',
        villainIcon: '⚖️',
        instruction: "Your car insurance is $2,000/year with $500 deductible. See how raising it affects the math.",
        sliders: [
          { label: 'Deductible Amount', min: 500, max: 2000, default: 500, step: 250, suffix: '' },
          { label: 'Expected Claims (5 years)', min: 0, max: 3, default: 1, step: 1, suffix: '' }
        ],
        calculate: (values) => {
          const [deductible, claims] = values;
          const basePremium = 2000;
          const premiumSavings = (deductible - 500) * 0.12;
          const annualPremium = basePremium - premiumSavings;
          const fiveYearPremium = annualPremium * 5;
          const claimCost = claims * deductible;
          const totalCost = fiveYearPremium + claimCost;
          const vsBaseline = (basePremium * 5) + (claims * 500) - totalCost;
          return { monthly: Math.round(annualPremium), total: Math.round(totalCost), hidden: Math.round(vsBaseline) };
        },
        checkGoal: (result) => result.hidden > 200,
        goal: 'Find a deductible that saves you $200+ over 5 years',
        revelation: "For most drivers (0-1 claims per 5 years), higher deductible saves money. Premium savings exceed the extra deductible. Just keep that amount in savings.",
        resultLabels: { monthly: 'Annual Premium', total: '5-Year Total Cost', hidden: 'Savings vs $500' },
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '📧', name: 'Insurance Renewal' },
        content: `Your renters insurance renewal arrives:<br><br><em>"Premium increasing from $180/year to $215/year. Coverage: $30,000 personal property, $100,000 liability, $1,000 deductible."</em><br><br>You own maybe $10,000 worth of stuff total.`,
        choices: [
          { text: "Just pay it - it's only $35 more.", correct: false, explanation: "You're paying for $30,000 coverage when you have $10,000 of stuff. Reduce coverage and save money." },
          { text: "Shop around and reduce coverage to match what I own.", correct: true, explanation: "Right move. Match coverage to belongings. Also get quotes from 3+ companies - renters insurance varies wildly." },
          { text: "Cancel it - I don't need renters insurance.", correct: false, explanation: "Liability coverage alone is worth it. If someone gets hurt in your apartment, you could be sued. Keep it, right-size it." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The Coverage Audit',
        description: "Annually review all insurance: Am I covered for catastrophic risks? Am I paying for coverage I don't need? Is my deductible appropriate? Could I get it cheaper elsewhere? Insurance covers what would ruin you - not minor inconveniences.",
        phrase: "Does this cover a risk that would actually ruin me financially?"
      },
      {
        type: 'summary',
        title: 'Insurance Essentials Complete',
        keyTakeaways: [
          'Insurance transfers unpredictable large costs for predictable small ones',
          'Must-haves: health, auto liability, renters/homeowners, term life if dependents',
          'Usually skip: extended warranties, whole life, phone insurance',
          'Higher deductibles save money if you have emergency savings',
          'Term life + invest the difference beats whole life',
          "Review coverage annually - don't pay for what you don't need"
        ]
      }
    ]
  },

  // ============== LESSON 4: CONTRACT RED FLAGS ==============
  contract_red_flags: {
    id: 'lesson_contracts',
    title: 'Contract Red Flags',
    steps: [
      {
        type: 'info',
        icon: '📜',
        title: 'The Fine Print Problem',
        content: `You've signed hundreds of contracts without reading them.<br><br>• Gym memberships<br>• Phone plans<br>• Software terms<br>• Apartment leases<br>• Employment agreements<br><br>Every one contains clauses favoring the company - and some contain traps that can cost you thousands.<br><br>You don't need to read everything. You need to know what to scan for.`
      },
      {
        type: 'info',
        icon: '🚩',
        title: 'The Five Red Flags',
        content: `When scanning any contract, look for:<br><br><strong>1. Auto-renewal clauses</strong> - Continues forever until YOU cancel (with specific notice requirements)<br><br><strong>2. Arbitration clauses</strong> - You give up right to sue. Disputes go to arbitration (favors companies).<br><br><strong>3. Cancellation penalties</strong> - Early termination fees, notice periods, continued payments.<br><br><strong>4. Price change clauses</strong> - "We may change pricing at any time."<br><br><strong>5. Liability waivers</strong> - "Not responsible for damages, including our negligence."`
      },
      {
        type: 'artifact',
        context: "You're signing up for a gym membership...",
        contextIcon: '🏋️',
        artifactType: 'gym-contract',
        artifactHTML: `<div class="fake-contract"><div class="contract-header">FitLife Gym Membership Agreement</div><div class="contract-section"><div class="contract-label">MEMBERSHIP TERMS</div><div class="contract-row"><span>Monthly Rate</span><span>$49.99</span></div><div class="contract-row warn"><span>Annual Fee</span><span>$59.99 (every February)</span></div><div class="contract-row"><span>Initiation</span><span>$0 (WAIVED TODAY!)</span></div></div><div class="contract-section"><div class="contract-label">CANCELLATION</div><div class="contract-text">This agreement automatically renews month-to-month. To cancel, member must provide written notice 30 days before next billing. Requests must be submitted IN PERSON at home club during staffed hours.</div></div><div class="contract-section"><div class="contract-label">DISPUTES</div><div class="contract-text">Any dispute resolved through binding arbitration. Member waives right to jury trial or class action.</div></div><div class="contract-section"><div class="contract-label">FREEZE POLICY</div><div class="contract-text">Memberships may be frozen with doctor's note. Frozen months extend contract end date.</div></div></div>`,
        prompt: 'This gym membership has traps. Find them.',
        hotspots: [
          { x: 5, y: 20, width: 90, height: 8, isHook: true, explanation: "Hidden fee! Your '$49.99/month' is actually $660/year, not $600. Many gyms bury this in paragraph 3." },
          { x: 5, y: 38, width: 90, height: 10, isHook: true, explanation: "IN PERSON cancellation is a trap. Can't email, can't call. Many keep paying because it's inconvenient." },
          { x: 5, y: 55, width: 90, height: 10, isHook: true, explanation: "You gave up your right to sue. Arbitration heavily favors companies. Standard but worth knowing." },
          { x: 5, y: 70, width: 90, height: 10, isHook: true, explanation: "Freeze sounds good, but extends commitment. Freeze 3 months = 3 more months before you can cancel." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '🏢', name: 'New Landlord' },
        content: `You're signing an apartment lease. You notice this clause:<br><br><em>"Upon lease termination, any disputes regarding security deposit shall be resolved through binding arbitration administered by LandlordArbitration Services LLC."</em>`,
        choices: [
          { text: "Sign it - everyone has arbitration clauses now.", correct: false, explanation: "Landlord-selected arbitration is heavily biased. Your state likely has tenant protections this might illegally waive." },
          { text: "Ask to remove or modify this clause.", correct: true, explanation: "Always ask. Worst case: they say no. You might get it removed or modified to neutral arbitration." },
          { text: "Refuse to rent here.", correct: false, explanation: "This is leverage, but you might fix it without losing the apartment. Try negotiating first." }
        ],
        points: 100
      },
      {
        type: 'sharklens',
        instruction: 'Tap each term to understand what rights you might be giving up.',
        documentType: 'saas-terms',
        documentTitle: 'SOFTWARE LICENSE AGREEMENT',
        documentText: `By clicking "Accept," you agree to:<br><br><strong>1. LICENSE:</strong> Non-exclusive, non-transferable, revocable license to use the Software.<br><br><strong>2. PRICING:</strong> $29/month. We may modify pricing with 30 days email notice.<br><br><strong>3. DATA:</strong> You grant us perpetual, irrevocable license to use and share aggregated data from your use.<br><br><strong>4. TERMINATION:</strong> We may terminate for any reason with 30 days notice. 7 days to export data.<br><br><strong>5. LIABILITY:</strong> Total liability not to exceed fees paid in prior 12 months.`,
        terms: [
          { jargon: 'revocable license', realMeaning: "They can take away access anytime. You don't 'own' anything - you're renting." },
          { jargon: 'modify pricing with 30 days notice', realMeaning: "Your $29/month could become $99 with just an email. Build an exit plan for critical software." },
          { jargon: 'perpetual, irrevocable license to data', realMeaning: "Even after you leave, they use your data forever. Know what you're giving up." },
          { jargon: '7 days to export', realMeaning: "One week to get your data out. Know the export process BEFORE you need it." }
        ]
      },
      {
        type: 'info',
        icon: '✍️',
        title: 'Negotiating Contracts',
        content: `Most people don't realize: <strong>contracts are often negotiable.</strong><br><br><strong>Employment:</strong> Non-competes, IP assignment, severance<br><strong>Leases:</strong> Pet policies, break clauses, maintenance<br><strong>Services:</strong> Price, term length, auto-renewal<br><br><strong>How to negotiate:</strong><br>1. Ask: "Is this term flexible?"<br>2. Propose alternative language<br>3. Get changes IN WRITING<br><br>Worst case: they say no. Often they say yes.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '📞', name: 'Cell Phone Store' },
        content: `You're switching carriers. The salesperson says:<br><br><em>"Just initial here for the 24-month agreement. If you leave early, there's a $350 early termination fee - but you won't want to leave, our service is great!"</em>`,
        choices: [
          { text: "Sounds fine - I won't leave early anyway.", correct: false, explanation: "Life changes. Job moves, coverage issues, better deals. That ETF traps you. Ask about no-contract options." },
          { text: "Do you have a month-to-month option?", correct: true, explanation: "Most carriers do - just don't advertise it. Month-to-month might cost $5-10 more but saves $350 in flexibility." },
          { text: "I'll sign if you waive the ETF.", correct: false, explanation: "Worth asking but unlikely. No-contract is a better systematic solution." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '📋',
        title: 'The 5-Minute Contract Scan',
        content: `For any contract, quick scan for:<br><br><strong>Ctrl+F / Search:</strong><br>• "auto-renew" or "automatic renewal"<br>• "arbitration"<br>• "terminate" or "cancel"<br>• "fee" or "penalty"<br>• "change" or "modify" (for pricing)<br>• "liability"<br><br>Read those sections carefully. Skip the rest unless concerned.<br><br>5 minutes of scanning catches 90% of traps.`
      },
      {
        type: 'weapon',
        name: 'The Red Flag Scan',
        description: "Before signing any contract, search for: auto-renewal, arbitration, termination/cancellation, fees/penalties, and price changes. Read those sections. Five minutes prevents thousands in unexpected costs.",
        phrase: "Let me scan for auto-renewal, cancellation terms, and hidden fees."
      },
      {
        type: 'summary',
        title: 'Contract Red Flags Complete',
        keyTakeaways: [
          "You've signed hundreds of contracts without reading them",
          'Five red flags: auto-renewal, arbitration, cancellation, price changes, liability',
          "Ctrl+F search for key terms - don't read everything",
          'Contracts are often negotiable - just ask',
          'Get any changes in writing',
          'In-person cancellation requirements are designed to trap you'
        ]
      }
    ]
  },

  // ============== LESSON 5: BUDGET ARCHITECTURE (MASTER) ==============
  budget_architecture: {
    id: 'lesson_budget',
    title: 'Budget Architecture',
    steps: [
      {
        type: 'info',
        icon: '🏗️',
        title: "Budgets Fail. Systems Don't.",
        content: `You've tried budgeting before. Tracking every coffee. Feeling guilty about every purchase.<br><br>It didn't stick. You're not alone - most people can't maintain detailed budgets.<br><br>The solution isn't more willpower. It's <strong>building systems</strong> that make the right thing happen automatically.<br><br>Today you'll design your money system.`
      },
      {
        type: 'info',
        icon: '📐',
        title: 'Three Philosophies',
        content: `<strong>50/30/20 Budget</strong><br>50% Needs (rent, food, insurance)<br>30% Wants (entertainment, dining)<br>20% Savings/Debt<br>Simple percentages, easy to remember.<br><br><strong>Zero-Based Budget</strong><br>Every dollar assigned a job before month starts.<br>Maximum control, maximum effort.<br><br><strong>Anti-Budget (Pay Yourself First)</strong><br>Automate savings first, spend whatever's left.<br>No tracking required.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🧠', name: 'Self-Assessment' },
        content: `Be honest about yourself:<br><br><em>How do you handle money mentally?</em>`,
        choices: [
          { text: "I like detailed tracking - I want to know where every dollar goes.", correct: true, explanation: "Zero-based budgeting is your match. You'll thrive with apps like YNAB where every dollar has a purpose." },
          { text: "I hate tracking but can follow simple rules.", correct: true, explanation: "50/30/20 works for you. Set it once, check quarterly, don't obsess over individual purchases." },
          { text: "I just want to save without thinking about it.", correct: true, explanation: "Pay yourself first / anti-budget. Automate savings, then spend freely without guilt." }
        ],
        points: 50
      },
      {
        type: 'info',
        icon: '🔄',
        title: 'The Automation Stack',
        content: `The key to any budget: <strong>automate the hard parts.</strong><br><br><strong>Day 1 of Paycheck:</strong><br>• Auto-transfer to savings<br>• Auto-transfer to investments<br>• Auto-pay all fixed bills<br><br><strong>What's left:</strong> Your spending money. Use freely, guilt-free.<br><br><strong>Why it works:</strong><br>• Willpower is finite<br>• You can't spend what you never see<br>• Good decisions become default`
      },
      {
        type: 'reverse',
        title: 'Design Your System',
        villainIcon: '💰',
        instruction: "You take home $5,000/month after taxes. Allocate it.",
        sliders: [
          { label: 'Rent/Mortgage', min: 500, max: 2500, default: 1500, step: 100, suffix: '' },
          { label: 'Other Fixed Bills', min: 200, max: 1000, default: 400, step: 50, suffix: '' },
          { label: 'Savings (Auto-transfer)', min: 0, max: 1500, default: 500, step: 100, suffix: '' },
          { label: 'Investing (401k/IRA)', min: 0, max: 1500, default: 500, step: 100, suffix: '' }
        ],
        calculate: (values) => {
          const [rent, bills, savings, investing] = values;
          const income = 5000;
          const fixed = rent + bills + savings + investing;
          const spending = income - fixed;
          const savingsRate = ((savings + investing) / income * 100).toFixed(0);
          const dailySpend = (spending / 30).toFixed(0);
          return { monthly: parseInt(savingsRate), total: spending, hidden: parseInt(dailySpend) };
        },
        checkGoal: (result) => result.monthly >= 20 && result.hidden >= 30,
        goal: 'Get savings rate above 20% with daily spending above $30',
        revelation: "When you automate savings FIRST, spending takes care of itself. You can't overspend if the money isn't in your checking account.",
        resultLabels: { monthly: 'Savings Rate %', total: 'Monthly Spending', hidden: 'Daily Budget' },
        points: 100
      },
      {
        type: 'info',
        icon: '🏦',
        title: 'The Account Structure',
        content: `Separate money by purpose:<br><br><strong>Checking #1: Bills</strong><br>All fixed expenses auto-pay from here<br><br><strong>Checking #2: Spending</strong><br>Your "fun money" - use freely with zero guilt<br><br><strong>Savings: Emergency Fund</strong><br>3-6 months expenses. Don't touch.<br><br><strong>Investment: Future You</strong><br>401(k), IRA, brokerage. Automated.<br><br><strong>Why multiple accounts:</strong><br>• Visual clarity<br>• Can't accidentally spend bills money<br>• "Spending" balance = your true freedom`
      },
      {
        type: 'scenario',
        speaker: { avatar: '💳', name: 'Your Bank Balance' },
        content: `It's the 20th. Checking shows $847. Rent ($1,400) due on the 1st. Paid on the 25th.<br><br>In the past, you'd stress about spending anything until payday.<br><br>What's the system solution?`,
        choices: [
          { text: "Don't spend anything until after rent.", correct: false, explanation: "This works but requires constant vigilance. It's not a system - it's just stress." },
          { text: "Set up a separate bills account with auto-transfers.", correct: true, explanation: "System solution. Half your rent ($700) transfers from each paycheck to bills-only account. By the 1st, $1,400 is waiting. Spending account shows what's actually spendable." },
          { text: "Get overdraft protection just in case.", correct: false, explanation: "Overdraft fees are a bank profit center. Protect yourself with structure, not expensive safety nets." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🚨',
        title: 'The Emergency Fund',
        content: `Before optimizing: <strong>emergency fund first.</strong><br><br><strong>Why:</strong><br>• Job loss happens<br>• Medical emergencies happen<br>• Cars break down<br>• Without savings, crisis → debt<br><br><strong>How much:</strong><br>• Starter: $1,000 (prevents card spirals)<br>• Standard: 3 months expenses<br>• Conservative: 6 months<br><br><strong>Where:</strong><br>• High-yield savings (4%+)<br>• Separate from checking<br>• Instant access (no CDs)`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🎁', name: "Friend's Advice" },
        content: `Your friend says:<br><br><em>"Budgeting doesn't work for me. I just check my balance before buying. If there's money, I spend it. If not, I don't."</em>`,
        choices: [
          { text: "That's basically what I do too.", correct: false, explanation: "Works until it doesn't. No savings means every surprise becomes debt." },
          { text: "You should try tracking every purchase.", correct: false, explanation: "If budgeting doesn't work for them, more tracking won't help. Different people need different systems." },
          { text: "What if you automated savings first, then used the balance method?", correct: true, explanation: "This is the anti-budget. Automate savings so it never shows in 'available' balance. What's left is truly free. System + their natural behavior." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '📊',
        title: 'The Check-In Cadence',
        content: `Even automated systems need maintenance:<br><br><strong>Weekly (5 min):</strong><br>• Glance at spending balance<br>• Any unexpected charges?<br><br><strong>Monthly (30 min):</strong><br>• All auto-transfers happen?<br>• Irregular expenses coming?<br>• Credit card paid in full?<br><br><strong>Quarterly (1 hour):</strong><br>• Percentages still right?<br>• Adjust for income changes<br>• Cancel unused subscriptions<br><br><strong>Annually (half day):</strong><br>• Full financial review<br>• Net worth check<br>• Insurance/benefits review`
      },
      {
        type: 'weapon',
        name: 'The Automation Stack',
        description: "Build a system where good behavior is automatic: savings transferred on payday before you see it, bills paid automatically, investments on autopilot. What remains is guilt-free spending. Willpower is finite. Automation is forever.",
        phrase: "Is this automated, or am I relying on willpower?"
      },
      {
        type: 'summary',
        title: 'Budget Architecture Complete',
        keyTakeaways: [
          'Detailed budgets fail because willpower is limited',
          'Three approaches: 50/30/20, zero-based, or pay-yourself-first',
          'Automation is the key - move money before you see it',
          'Separate accounts by purpose (bills, spending, saving)',
          'Emergency fund comes before optimization',
          'Check in weekly (5 min), monthly (30 min), quarterly (1 hour)'
        ]
      }
    ]
  },

  // ============== LESSON 1: KNOW YOUR NUMBER ==============
  know_your_number: {
    id: 'lesson_knowyournumber',
    title: 'Know Your Number',
    steps: [
      {
        type: 'info',
        icon: '🎯',
        title: 'The Most Expensive Ignorance',
        content: `Most people have no idea what they're worth.<br><br>They accept the first offer. They don't negotiate. They leave thousands - sometimes tens of thousands - on the table every year.<br><br>The #1 reason? <strong>They don't know their market rate.</strong><br><br>Today you fix that.`
      },
      {
        type: 'artifact',
        context: "You're researching salaries online...",
        contextIcon: '💻',
        artifactType: 'salary-site',
        artifactHTML: `<div class="fake-salary-site"><div class="salary-header">GlassSalary.com</div><div class="salary-title">Software Engineer - Austin, TX</div><div class="salary-range"><div class="range-item"><span class="range-value">$85,000</span><span class="range-label">LOW</span></div><div class="range-item featured"><span class="range-value">$115,000</span><span class="range-label">MEDIAN</span></div><div class="range-item"><span class="range-value">$155,000</span><span class="range-label">HIGH</span></div></div><div class="salary-meta">Based on 847 salary reports</div><div class="salary-likely">"Most Likely Range: $98,000 - $132,000"</div><div class="salary-note">⭐ Top companies pay 20-40% above median</div><div class="salary-cta">[See full report - Premium Members Only]</div></div>`,
        prompt: 'This data is helpful but incomplete. Find the limitations.',
        hotspots: [
          { x: 30, y: 28, width: 40, height: 18, isHook: false, explanation: "The median is useful, but it's just one data point. You need 3+ sources to triangulate your real market rate." },
          { x: 5, y: 28, width: 25, height: 18, isHook: true, explanation: "Companies will try to anchor you here. Don't accept 'industry data' from recruiters - they cherry-pick the low end." },
          { x: 10, y: 50, width: 80, height: 8, isHook: true, explanation: "Self-reported data is skewed. People with unusually high OR low salaries are more likely to report. Use this as a starting point, not gospel." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '📊',
        title: 'The Three-Source Rule',
        content: `Never rely on one salary source. Each has biases:<br><br><strong>Glassdoor/Levels.fyi:</strong> Self-reported, skews toward extremes<br><strong>LinkedIn Salary:</strong> Limited data, varies by region<br><strong>Recruiters:</strong> They profit from lower salaries<br><br><strong>Your move:</strong> Get data from 3+ sources, then look at the OVERLAP. That's your realistic range.<br><br>Also research: total compensation (bonus, equity, benefits), your specific experience level, and company size/funding stage.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '📞', name: 'Recruiter Call' },
        content: `A recruiter calls about a role you're interested in. She asks:<br><br><em>"Before we go further, what are your salary expectations? I want to make sure we're in the same ballpark."</em><br><br>You've researched - the role pays $90k-$120k, and you're currently at $85k.`,
        choices: [
          { text: "I'm currently making $85k, so I'm looking for at least $95k.", correct: false, explanation: "You just anchored yourself LOW. Now $95k is your ceiling. They would've paid $110k." },
          { text: "I'm targeting roles in the $110k-$125k range based on my research.", correct: true, explanation: "You anchored high without revealing your current salary. Even if they negotiate down, you'll land higher." },
          { text: "What's the budget for the role?", correct: false, explanation: "Good deflection, but they'll often push back. Better to state your range confidently so you control the anchor." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '💰',
        title: 'Total Compensation ≠ Salary',
        content: `Base salary is just one piece. Calculate your TOTAL comp:<br><br><strong>Base salary:</strong> $100,000<br><strong>Annual bonus (15%):</strong> $15,000<br><strong>401k match (4%):</strong> $4,000<br><strong>Stock/RSUs:</strong> $20,000/year<br><strong>Health insurance value:</strong> $8,000/year<br><br><strong>Total compensation: $147,000</strong><br><br>When comparing offers, compare TOTAL COMP. A $95k base with great benefits can beat a $110k base with nothing.`
      },
      {
        type: 'reverse',
        title: 'Calculate Your Worth',
        villainIcon: '🧮',
        instruction: "Build your total compensation picture. What are you REALLY making?",
        sliders: [
          { label: 'Base Salary', min: 40000, max: 200000, default: 75000, step: 5000, suffix: '' },
          { label: 'Bonus %', min: 0, max: 30, default: 10, step: 5, suffix: '%' },
          { label: '401k Match %', min: 0, max: 6, default: 3, step: 1, suffix: '%' },
          { label: 'Stock/RSUs Annual', min: 0, max: 50000, default: 0, step: 5000, suffix: '' }
        ],
        calculate: (values) => {
          const [base, bonusPct, matchPct, stock] = values;
          const bonus = base * (bonusPct / 100);
          const match = base * (matchPct / 100);
          const benefits = 8000;
          const totalComp = base + bonus + match + stock + benefits;
          const hourlyRate = Math.round(totalComp / 2080);
          const tenPctRaise = Math.round(totalComp * 0.1);
          return { monthly: Math.round(totalComp), total: hourlyRate, hidden: tenPctRaise };
        },
        checkGoal: (result) => result.monthly > 90000,
        goal: 'See your total comp exceed $90k',
        revelation: "Most people dramatically underestimate their total compensation - then undervalue themselves in negotiations. Know your FULL number before you negotiate.",
        resultLabels: { monthly: 'Total Comp', total: 'Hourly Rate', hidden: '10% Raise Value' },
        points: 100
      },
      {
        type: 'sharklens',
        instruction: 'Tap each term to see what it really means for your compensation.',
        documentType: 'offer-letter',
        documentTitle: 'EMPLOYMENT OFFER',
        documentText: `We are pleased to offer you the position of Marketing Manager.<br><br><strong>Base Salary:</strong> $92,000 annually<br><strong>Target Bonus:</strong> 10% of base salary<br><strong>Start Date:</strong> January 15, 2025<br><br><strong>Benefits:</strong><br>• Health/Dental/Vision (employee contribution: $150/mo)<br>• 401(k) with 3% company match<br>• 15 days PTO<br>• Stock options: 2,000 shares vesting over 4 years<br><br>Please sign below to accept. This offer expires in 48 hours.`,
        terms: [
          { jargon: 'Target Bonus', realMeaning: "'Target' means you might get less. Ask what % of employees actually hit target. If it's 50%, your expected bonus is really 5%, not 10%." },
          { jargon: 'employee contribution: $150/mo', realMeaning: "That's $1,800/year YOU pay. Factor this into total comp. Compare to other offers' healthcare costs." },
          { jargon: 'Stock options: 2,000 shares', realMeaning: "Worthless until you know: Strike price? Current valuation? Vesting cliff? Options ≠ shares - you have to BUY them." },
          { jargon: 'expires in 48 hours', realMeaning: "Artificial urgency. Most companies will extend if you ask professionally. Don't let pressure force a decision." }
        ]
      },
      {
        type: 'weapon',
        name: 'The Market Rate Stack',
        description: "Before any salary negotiation, stack 3+ data sources: Glassdoor, Levels.fyi, LinkedIn, and conversations with people in the industry. Find where they overlap. Then calculate your TOTAL compensation. That's your real number.",
        phrase: "Based on market data from multiple sources, I'm seeing [range]."
      },
      {
        type: 'summary',
        title: 'Know Your Number Complete',
        keyTakeaways: [
          "Most people don't know their market rate - and it costs them thousands",
          'Never rely on one salary source - use 3+ and find the overlap',
          'Calculate TOTAL compensation, not just base salary',
          'Never reveal your current salary - it anchors you low',
          '"Target bonus" and stock options need deeper investigation'
        ]
      }
    ]
  },

  // ============== LESSON 2: NEGOTIATION OPENERS ==============
  negotiation_openers: {
    id: 'lesson_openers',
    title: 'Negotiation Openers',
    steps: [
      {
        type: 'info',
        icon: '🎬',
        title: 'The Opening Move',
        content: `Salary negotiation is won or lost in the first few exchanges.<br><br>Say the wrong thing early, and you're fighting uphill forever.<br><br><strong>The goals:</strong><br>1. Don't anchor yourself low<br>2. Show enthusiasm without desperation<br>3. Gather information before committing<br><br>Let's learn the scripts that work.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '👩‍💼', name: 'HR Manager' },
        content: `You just got a verbal offer. The HR manager says:<br><br><em>"We'd love to have you join us! We're prepared to offer you $88,000. How does that sound?"</em><br><br>You were hoping for $95k-$105k based on your research.`,
        choices: [
          { text: "That's a bit lower than I expected. Can you do $95k?", correct: false, explanation: "Too fast! You accepted their anchor and only nudged 8% higher. You signaled $95k is your ceiling." },
          { text: "Thank you! I'm really excited about this opportunity. Can I have a few days to review the full package?", correct: true, explanation: "Perfect. You showed enthusiasm, bought time to prepare, and avoided reacting to the number. Now you control the pace." },
          { text: "Is that negotiable?", correct: false, explanation: "Weak opener. Of course it's negotiable. You sound uncertain. Better to delay and come back prepared." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🤐',
        title: 'The Power of Not Answering',
        content: `When asked about salary expectations, you have options:<br><br><strong>Deflect:</strong> "I'd like to learn more about the role first. Can you share the budgeted range?"<br><br><strong>Redirect:</strong> "I'm more focused on finding the right fit. What's typical for this level?"<br><br><strong>Delay:</strong> "I'm sure we can find something that works. Let's keep talking about the role."<br><br><strong>Why this works:</strong> The first person to say a number usually loses. Employers often have more room than they initially offer.`
      },
      {
        type: 'bsdetector',
        platform: '📞 Phone Screen',
        guruName: 'Company Recruiter',
        guruAvatar: '👔',
        script: [
          { text: "We're really excited about your background!", isLie: false, duration: 2000 },
          { text: "Before we move forward, I need to know your salary requirements.", isLie: true, truth: "They don't 'need' to know. They WANT to know so they can anchor low. You can deflect or ask for their range first.", duration: 4000 },
          { text: "We want to make sure we don't waste anyone's time if we're not aligned.", isLie: true, truth: "Translation: 'Tell us the minimum you'll accept.' They're not worried about YOUR time - they're filtering candidates who know their worth.", duration: 4500 },
          { text: "Our ranges are pretty set, so I need a number from you.", isLie: true, truth: "Ranges are almost never 'set.' This is pressure to make you commit first. Keep deflecting or give a high range.", duration: 4000 },
          { text: "I'll pass along whatever number you give me.", isLie: false, duration: 2500 }
        ]
      },
      {
        type: 'scenario',
        speaker: { avatar: '📝', name: 'Application Form' },
        content: `You're filling out a job application. There's a required field:<br><br><strong>Desired Salary: $_______</strong><br><br>You can't submit without filling it in.`,
        choices: [
          { text: "Enter my current salary plus 10%", correct: false, explanation: "You anchored yourself based on your CURRENT pay, which might be below market. The new role could've paid 40% more." },
          { text: "Enter the top of my researched range", correct: true, explanation: "If forced to answer, go high. You can always negotiate down, never up. If they filter you out for being 'too expensive,' they weren't going to pay fairly anyway." },
          { text: "Enter $0 or 'Negotiable'", correct: false, explanation: "Sometimes works, but many systems require a number. If rejected for putting $0, you can't apply at all." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🎭',
        title: 'Enthusiasm ≠ Desperation',
        content: `Employers want to hire people who WANT the job. Show genuine interest.<br><br>But there's a line:<br><br><strong>Enthusiasm:</strong> "I'm really excited about this role - the team's work on X is exactly what I want to be doing."<br><br><strong>Desperation:</strong> "I really need this job. I'll take whatever you offer."<br><br>Enthusiasm is attractive. Desperation is leverage for them.<br><br><strong>Your stance:</strong> "I want this role AND I know my worth. Both can be true."`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🤝', name: 'Final Interview' },
        content: `The hiring manager says at the end of a great final interview:<br><br><em>"We're very impressed. Before we make an offer - where do you need to be on compensation to say yes today?"</em>`,
        choices: [
          { text: "I'd need at least $105k to accept.", correct: false, explanation: "You just gave them your 'yes' number. They'll offer exactly $105k when they might've paid $115k." },
          { text: "I'm targeting $110k-$125k based on market data, but I'm flexible for the right opportunity.", correct: true, explanation: "Range anchors high, 'flexible' keeps door open, 'right opportunity' signals you're not just about money." },
          { text: "What's the budget for this role?", correct: false, explanation: "Good deflection, but by final interview they expect you to have a number. Better to state a confident range." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The Enthusiastic Delay',
        description: "When you receive an offer, respond with genuine enthusiasm PLUS a delay. \"Thank you so much - I'm really excited about this! I'd like a few days to review the complete package.\" This shows interest while giving you time to prepare.",
        phrase: "I'm really excited about this. Let me review the full package and get back to you."
      },
      {
        type: 'summary',
        title: 'Negotiation Openers Complete',
        keyTakeaways: [
          'The first few exchanges determine the negotiation trajectory',
          'Deflect salary questions early: "What\'s the budgeted range?"',
          'Never give a single number - always a range (anchored high)',
          'When you get an offer, show enthusiasm but ask for time',
          'Enthusiasm is good; desperation gives away your leverage'
        ]
      }
    ]
  },

  // ============== LESSON 3: COUNTER TACTICS ==============
  counter_tactics: {
    id: 'lesson_counter',
    title: 'Counter Tactics',
    steps: [
      {
        type: 'info',
        icon: '⚔️',
        title: 'They Will Push Back',
        content: `You asked for more money. Now they're pushing back.<br><br>This is NORMAL. Expected. Not a rejection.<br><br>Most people panic here and accept less. Don't be most people.<br><br>The pushback is often a test. They have more budget. They just want to see if you'll fold.<br><br>Let's practice the responses.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '💼', name: 'HR Manager' },
        content: `You countered their $90k offer with $105k. They respond:<br><br><em>"I understand you're looking for more, but $90,000 is really the max we can do for this role. The budget is set."</em>`,
        choices: [
          { text: "Okay, I understand. I'll accept $90k.", correct: false, explanation: "You folded at the first pushback. 'Budget is set' is almost never true. They had room - you just left it on the table." },
          { text: "I appreciate that. Is there flexibility in other areas - signing bonus, extra PTO, or earlier review?", correct: true, explanation: "If base is truly stuck, expand the pie. Many companies have separate budgets for bonuses, PTO, and equity." },
          { text: "Then I'll have to decline.", correct: false, explanation: "Walking away immediately is too aggressive. Try expanding the pie first. You can always walk away later." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🧩',
        title: 'Expand the Pie',
        content: `When base salary is "stuck," negotiate other things:<br><br><strong>Cash:</strong><br>• Signing bonus (often separate budget)<br>• Earlier performance review/raise<br>• Guaranteed minimum bonus<br><br><strong>Time:</strong><br>• Extra PTO days<br>• Remote work flexibility<br>• Later start date<br><br><strong>Equity:</strong><br>• More stock options/RSUs<br>• Accelerated vesting<br><br><strong>Development:</strong><br>• Training budget<br>• Conference attendance<br><br>One company couldn't budge on salary but gave me $15k signing + 5 extra PTO days.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '👨‍💼', name: 'Hiring Manager' },
        content: `The manager says:<br><br><em>"I've pushed as hard as I can. Legal says $95,000 is the cap for this band. I'm really sorry - I'd pay you more if I could."</em><br><br>You believe he's being genuine.`,
        choices: [
          { text: "I understand. Let's do $95k.", correct: false, explanation: "If you trust him, this might be okay eventually - but have you asked about non-salary comp? Don't leave value on the table." },
          { text: "I appreciate you advocating for me. Can we discuss a signing bonus and accelerated review at 6 months?", correct: true, explanation: "You acknowledged his effort, maintained the relationship, and found other value. Even $5k signing + 6-month review is meaningful." },
          { text: "If you can't pay market rate, maybe this isn't the right fit.", correct: false, explanation: "Burning bridges unnecessarily. He tried to help. Explore all options before walking away." }
        ],
        points: 100
      },
      {
        type: 'bsdetector',
        platform: '💬 Negotiation',
        guruName: 'HR Representative',
        guruAvatar: '📋',
        script: [
          { text: "We really want you on the team.", isLie: false, duration: 2000 },
          { text: "Unfortunately, our bands are standardized across the company.", isLie: true, truth: "Bands have ranges. You're probably being offered the bottom. There's almost always room within the band.", duration: 4000 },
          { text: "We can't make exceptions or it wouldn't be fair to other employees.", isLie: true, truth: "Exceptions happen constantly for strong candidates. The 'fairness' argument is designed to make you feel guilty.", duration: 4500 },
          { text: "This is actually above what we offered the last person in this role.", isLie: true, truth: "Irrelevant. The market changes. The last person might've been underpaid. Your value is based on market rate, not their past mistakes.", duration: 4000 },
          { text: "I really have no flexibility here - this comes from finance.", isLie: true, truth: "There's always someone with authority. If HR has no flexibility, ask to speak with the hiring manager.", duration: 4000 }
        ]
      },
      {
        type: 'info',
        icon: '📄',
        title: 'The Power of Documentation',
        content: `Your counter is stronger with evidence:<br><br><strong>Weak:</strong> "I was hoping for $110k."<br><br><strong>Strong:</strong> "Based on Glassdoor, Levels.fyi, and conversations with people in similar roles, the market range is $105k-$120k. Given my 5 years of experience and the Python skills you mentioned were rare, I'm targeting $115k."<br><br><strong>Why it works:</strong><br>• Shows you did your homework<br>• Makes it about DATA, not feelings<br>• Harder to dismiss than "I want more"<br>• Positions you as professional`
      },
      {
        type: 'reverse',
        title: 'Build Your Counter',
        villainIcon: '📊',
        instruction: "You got an offer for $88k. You want $102k. Build your documented counter.",
        sliders: [
          { label: 'Salary Sources Cited', min: 0, max: 5, default: 1, step: 1, suffix: '' },
          { label: 'Specific Skills Mentioned', min: 0, max: 5, default: 1, step: 1, suffix: '' },
          { label: 'Have Competing Offer?', min: 0, max: 1, default: 0, step: 1, suffix: '' },
          { label: 'Enthusiasm Shown (1-10)', min: 1, max: 10, default: 5, step: 1, suffix: '' }
        ],
        calculate: (values) => {
          const [sources, skills, competing, enthusiasm] = values;
          const persuasion = (sources * 12) + (skills * 10) + (competing * 25) + (enthusiasm * 3);
          const likelyBump = 88000 + (persuasion * 100);
          const outcome = Math.min(likelyBump, 105000);
          const risk = competing > 0 ? 5 : (enthusiasm < 4 ? 15 : 3);
          return { monthly: Math.round(persuasion), total: Math.round(outcome), hidden: risk };
        },
        checkGoal: (result) => result.total >= 98000,
        goal: 'Get likely outcome above $98k',
        revelation: "Notice what moves the needle? Multiple sources + specific skills + enthusiasm. A competing offer helps but isn't required. Data + relationship beats demands every time.",
        resultLabels: { monthly: 'Persuasion Score', total: 'Likely Outcome', hidden: 'Risk %' },
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '✉️', name: 'Email Response' },
        content: `You countered over email. They respond:<br><br><em>"Thanks for your note. We've discussed internally and can move to $93,000. This is our final offer. Please let us know by Friday."</em><br><br>Original offer was $88k. You asked for $102k. You'd be happy with $96k.`,
        choices: [
          { text: "Accept $93k - they said it's final.", correct: false, explanation: "'Final offer' is rarely final. You're $3k from your target. One more professional push often works." },
          { text: "Counter: 'Thank you for the increase. Is there any way to get to $96k? That would make this an immediate yes.'", correct: true, explanation: "You showed appreciation, gave a specific number, and made it easy to say yes. Many 'final' offers have one more round." },
          { text: "Decline and walk away - they're lowballing.", correct: false, explanation: "$93k from $88k is a $5k win. Don't let perfect be the enemy of good. Try one more counter first." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The Documented Counter',
        description: "Never counter with just a number. Counter with data: market research from 3+ sources, specific skills that add value, and genuine enthusiasm. \"Based on [sources], the market rate is [range]. Given my [skills], I'm targeting [number].\"",
        phrase: "Based on market data and my [specific skills], I'm targeting [number]."
      },
      {
        type: 'summary',
        title: 'Counter Tactics Complete',
        keyTakeaways: [
          "First pushback is normal - don't fold immediately",
          'If salary is stuck, expand the pie: bonus, PTO, equity, title',
          '"Budget is set" and "final offer" are rarely true',
          'Document your counter with market data and specific skills',
          'Show enthusiasm throughout - they want someone who wants the job'
        ]
      }
    ]
  },

  // ============== LESSON 4: SIDE HUSTLE MATH ==============
  side_hustle_math: {
    id: 'lesson_sidehustle',
    title: 'Side Hustle Math',
    steps: [
      {
        type: 'info',
        icon: '⏱️',
        title: 'The Side Hustle Trap',
        content: `"I make an extra $500/month with my side hustle!"<br><br>Okay, but:<br>• How many hours does it take?<br>• What are the expenses?<br>• What's the opportunity cost?<br><br>Many side hustles pay LESS than minimum wage when you do the real math. Some even lose money.<br><br>Let's learn to evaluate any income opportunity honestly.`
      },
      {
        type: 'reverse',
        title: 'Real Hourly Rate Calculator',
        villainIcon: '🧮',
        instruction: "Your friend says they make '$2,000/month driving rideshare.' Let's find the REAL hourly rate.",
        sliders: [
          { label: 'Hours Worked/Month', min: 20, max: 80, default: 40, step: 5, suffix: ' hrs' },
          { label: 'Gas & Car Costs/Month', min: 100, max: 800, default: 400, step: 50, suffix: '' },
          { label: 'Self-Employment Tax %', min: 0, max: 15, default: 15, step: 5, suffix: '%' }
        ],
        calculate: (values) => {
          const [hours, expenses, taxRate] = values;
          const gross = 2000;
          const afterExpenses = gross - expenses;
          const taxes = afterExpenses * (taxRate / 100);
          const netIncome = afterExpenses - taxes;
          const hourlyRate = netIncome / hours;
          return { monthly: Math.round(afterExpenses), total: Math.round(netIncome), hidden: Math.round(hourlyRate * 100) / 100 };
        },
        checkGoal: (result) => result.hidden < 15,
        goal: 'See the true hourly rate drop below $15/hr',
        revelation: "That '$2,000/month' became $10-12/hour after expenses and taxes - while putting miles on your car. Your friend might make more at a regular part-time job with none of the risk.",
        resultLabels: { monthly: 'After Expenses', total: 'After Taxes', hidden: 'True $/Hour' },
        points: 100
      },
      {
        type: 'info',
        icon: '💸',
        title: 'Hidden Costs of Side Hustles',
        content: `<strong>Gig economy (rideshare, delivery):</strong><br>• Gas, car depreciation, maintenance<br>• Self-employment tax (15.3%)<br>• No benefits, no workers comp<br>• Your car's resale value tanks<br><br><strong>Freelancing:</strong><br>• Self-employment tax<br>• Unpaid time: invoicing, chasing payments, marketing<br>• Healthcare, retirement - all on you<br><br><strong>"Passive" income:</strong><br>• Usually requires huge upfront time<br>• Often not passive at all<br>• Content creation is a full-time job`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🛍️', name: 'Your Friend' },
        content: `Your friend is excited about a reselling business:<br><br><em>"I buy clearance items at Target and sell them on Amazon for 2x the price! I made $800 last month in sales!"</em><br><br>She's not counting time spent sourcing, listing, packaging, and shipping. Or Amazon's fees.`,
        choices: [
          { text: "That's awesome! How do I start?", correct: false, explanation: "$800 in SALES is not $800 in profit. After Amazon's 15% fee, shipping, and hours of work, she might be making $5/hour." },
          { text: "Cool! What's your profit after fees, and how many hours do you spend?", correct: true, explanation: "These questions reveal the real economics. Many resellers discover they're barely breaking even when they track properly." },
          { text: "Sounds like a scam.", correct: false, explanation: "Reselling can be legitimate. The issue is doing the MATH, not dismissing it entirely." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '⚖️',
        title: 'Opportunity Cost',
        content: `Every hour on a side hustle is an hour you DON'T spend on:<br><br>• Upskilling for a promotion (higher long-term value)<br>• Resting (burnout kills productivity)<br>• Relationships (networking has compounding value)<br>• Your actual job (where a raise beats most side hustles)<br><br><strong>The math:</strong><br>If your day job pays $50/hour and a side hustle pays $15/hour, that side hustle actually COSTS you $35/hour in opportunity cost.<br><br>Sometimes the best side hustle is getting better at your main job.`
      },
      {
        type: 'artifact',
        context: "Instagram ad for an opportunity...",
        contextIcon: '📱',
        artifactType: 'hustle-ad',
        artifactHTML: `<div class="fake-hustle-ad"><div class="hustle-header">💰 I made $10,000 last month working from home! 💰</div><div class="hustle-body"><p>I quit my 9-5 and now I work 2 hours a day teaching English online.</p><p>Ready to fire your boss? DM me "FREEDOM" and I'll show you EXACTLY how I did it!</p></div><div class="hustle-bullets"><div>🔥 No experience needed</div><div>🔥 Set your own schedule</div><div>🔥 Unlimited income potential</div></div><div class="hustle-cta">Comment "INFO" for my free guide!</div><div class="hustle-tags">#passiveincome #sidehustle #workfromhome #financialfreedom</div></div>`,
        prompt: "This looks appealing. Find what's hidden.",
        hotspots: [
          { x: 5, y: 8, width: 90, height: 12, isHook: true, explanation: "Revenue or profit? After self-employment tax, this is ~$8,500. And this is likely her BEST month, cherry-picked for marketing." },
          { x: 5, y: 22, width: 90, height: 10, isHook: true, explanation: "Teaching hours only. What about prep, marketing, student management, and creating THIS ad? True time is probably 6+ hours/day." },
          { x: 5, y: 52, width: 90, height: 8, isHook: true, explanation: "Your time is limited to 24 hours/day. 'Unlimited potential' is marketing, not reality." },
          { x: 5, y: 62, width: 90, height: 10, isHook: true, explanation: "The real business: selling courses about how to make money. The $10k comes from selling the dream, not teaching English." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '📈',
        title: 'When Side Hustles Make Sense',
        content: `Side hustles CAN be worth it when:<br><br><strong>Building a skill:</strong> Even if pay is low, you're gaining experience for a career change<br><br><strong>Scalable:</strong> Income can grow without proportional time increase (products, not services)<br><br><strong>Passion project:</strong> Enjoyment has value (just be honest it's a hobby)<br><br><strong>Clear path:</strong> Stepping stone to full-time self-employment with a real plan<br><br><strong>The key:</strong> Go in with clear eyes. Know your true hourly rate, opportunity cost, and realistic growth potential.`
      },
      {
        type: 'weapon',
        name: 'The True Hourly Rate',
        description: "Before starting any side hustle, calculate: (Revenue - All Expenses - Taxes) ÷ ALL Hours Spent (including unpaid work). If the result is less than you could earn elsewhere - or less than your free time is worth - it's not worth it.",
        phrase: "What's the true hourly rate after expenses, taxes, and ALL time invested?"
      },
      {
        type: 'summary',
        title: 'Side Hustle Math Complete',
        keyTakeaways: [
          'Revenue ≠ profit - always subtract expenses and taxes',
          'Gig work often pays less than minimum wage after real costs',
          '"Passive income" usually requires massive active investment first',
          'Opportunity cost: that time could go toward career advancement',
          'Calculate true hourly rate before committing to any side hustle'
        ]
      }
    ]
  },

  // ============== LESSON 5: INCOME STACKING (MASTER) ==============
  income_stacking: {
    id: 'lesson_stacking',
    title: 'Income Stacking',
    steps: [
      {
        type: 'info',
        icon: '🏗️',
        title: 'Beyond the Single Paycheck',
        content: `Most people rely on one income source: their job.<br><br>When that job disappears, so does 100% of their income.<br><br>The wealthy think differently. They build <strong>income stacks</strong> - multiple streams that don't all fail at once.<br><br>This isn't about working more. It's about working smarter and letting money work for you.`
      },
      {
        type: 'info',
        icon: '🎯',
        title: 'The Income Stack Framework',
        content: `Four types of income, in order of effort:<br><br><strong>1. Active Income (high effort)</strong><br>Your job. Trade time directly for money.<br><br><strong>2. Side Income (medium effort)</strong><br>Freelance, consulting, part-time. Still trading time, but diversified.<br><br><strong>3. Portfolio Income (low effort)</strong><br>Dividends, interest, capital gains. Money works while you sleep.<br><br><strong>4. Passive Income (variable)</strong><br>Royalties, rental income, business systems. High upfront work, low ongoing.<br><br><strong>The goal:</strong> Gradually shift from mostly (1) to a mix of all four.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🧑‍💼', name: 'Your Colleague' },
        content: `Your colleague brags at lunch:<br><br><em>"I've got five income streams! My job, driving Uber on weekends, selling on eBay, my dividend portfolio, and I just started dropshipping!"</em><br><br>He looks exhausted.`,
        choices: [
          { text: "Impressive! You must be wealthy.", correct: false, explanation: "Quantity isn't quality. He has 2 jobs worth of work, a low-margin hobby, probably tiny dividends, and a likely-failing dropship store. He's overworked, not wealthy." },
          { text: "How many hours a week is that, and what's the total return?", correct: true, explanation: "The right question. If he's working 70 hours/week and most income is from his day job, he doesn't have an income stack - he has burnout." },
          { text: "I should start dropshipping too!", correct: false, explanation: "Dropshipping has razor-thin margins and most stores fail. Don't chase trendy hustles - chase strategic income streams." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '📊',
        title: 'The Strategic Stack',
        content: `Building income streams strategically:<br><br><strong>Year 1-2: Maximize main income</strong><br>• Negotiate raises, build skills, get promoted<br>• Highest ROI of any "side hustle"<br><br><strong>Year 2-3: Start portfolio income</strong><br>• Invest in index funds (dividends + growth)<br>• Requires no extra time<br><br><strong>Year 3-5: Consider scalable side income</strong><br>• Consulting in your expertise (high hourly)<br>• Content/products (upfront work, ongoing returns)<br><br><strong>Avoid:</strong> Stacking more active work. Five jobs isn't diversification - it's exhaustion.`
      },
      {
        type: 'reverse',
        title: 'Design Your Income Stack',
        villainIcon: '💼',
        instruction: "You have 168 hours/week and $50k savings. Design an income stack.",
        sliders: [
          { label: 'Hours at Day Job', min: 40, max: 60, default: 45, step: 5, suffix: ' hrs' },
          { label: 'Hours on Side Work', min: 0, max: 20, default: 5, step: 5, suffix: ' hrs' },
          { label: 'Amount Invested', min: 0, max: 50000, default: 20000, step: 5000, suffix: '' },
          { label: 'Hours on Content/Products', min: 0, max: 15, default: 0, step: 5, suffix: ' hrs' }
        ],
        calculate: (values) => {
          const [jobHours, sideHours, invested, contentHours] = values;
          const jobIncome = jobHours * 50 * 52;
          const sideIncome = sideHours * 40 * 52;
          const portfolioIncome = invested * 0.09;
          const contentIncome = contentHours > 0 ? contentHours * 20 * 52 * 0.3 : 0;
          const totalIncome = jobIncome + sideIncome + portfolioIncome + contentIncome;
          const totalHours = jobHours + sideHours + contentHours;
          const passiveRatio = Math.round(((portfolioIncome + contentIncome * 0.5) / totalIncome) * 100);
          const sustainability = totalHours <= 55 ? 'Good' : totalHours <= 65 ? 'Risky' : 'Burnout';
          return { monthly: Math.round(totalIncome), total: passiveRatio, hidden: totalHours };
        },
        checkGoal: (result) => result.total >= 15 && result.hidden <= 55,
        goal: 'Get passive ratio above 15% while keeping hours under 55/week',
        revelation: "Notice how investing generates income without extra hours? And how products create ongoing returns? The goal isn't to work MORE - it's to shift from time-based to asset-based income.",
        resultLabels: { monthly: 'Annual Income', total: 'Passive Ratio %', hidden: 'Hours/Week' },
        points: 100
      },
      {
        type: 'info',
        icon: '💰',
        title: 'The Power of Portfolio Income',
        content: `The most overlooked income stream: your investments.<br><br>$100,000 invested at 7% return = <strong>$7,000/year</strong> in growth<br>Add 2% dividend yield = <strong>$2,000/year</strong> in cash<br><br>Total: $9,000/year while doing NOTHING.<br><br><strong>The math gets wild:</strong><br>$500,000 invested = $45,000/year<br>$1,000,000 invested = $90,000/year<br><br>This is why building wealth (Wealth Currents) enables income stacking.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '📚', name: 'Online Course Idea' },
        content: `You're considering creating an online course teaching a skill you have. It would take ~200 hours to create.<br><br>Once created, it sells for $197 with 2 hours/week support.<br><br>Based on similar courses, you estimate 5-20 sales/month.`,
        choices: [
          { text: "200 hours is too much work upfront.", correct: false, explanation: "At 10 sales/month = $1,970/month = $23,640/year. That's $118/hour for your 200 hours, PLUS ongoing income. Compare to a $15/hour side hustle." },
          { text: "I'd need to validate demand before building it.", correct: true, explanation: "Smart. 200 hours is worth it IF there's demand. Pre-sell, survey your audience, or build a minimum version first." },
          { text: "I'll just do one-on-one coaching instead.", correct: false, explanation: "Coaching is good but doesn't scale - still trading time for money. The course earns while you sleep. Consider both." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🛡️',
        title: 'Income Resilience',
        content: `The real point of income stacking: <strong>resilience.</strong><br><br>If you lose your job:<br>• Portfolio income keeps paying dividends<br>• Side income can scale up temporarily<br>• Passive products keep selling<br><br>You go from "I'm ruined" to "I'm okay while I find something new."<br><br>This isn't about maximizing total income. It's about minimizing catastrophic risk.<br><br><strong>Target:</strong> Have at least 3 months of expenses covered by non-job income. That's financial security.`
      },
      {
        type: 'weapon',
        name: 'The Income Portfolio',
        description: "Build income streams like an investment portfolio: diversified across types (active, side, portfolio, passive) with a goal of reducing dependence on any single source. Target: 3+ months of expenses covered by non-job income.",
        phrase: "If I lost my job tomorrow, how many months could my other income cover?"
      },
      {
        type: 'summary',
        title: 'Income Stacking Complete',
        keyTakeaways: [
          'Most people depend 100% on one income source - risky',
          'Four types: active, side, portfolio, passive',
          "Quality > quantity - five exhausting jobs isn't diversification",
          'Portfolio income requires no extra time - prioritize investing',
          'Scalable products beat hourly trading',
          'Target: 3+ months expenses from non-job income'
        ]
      }
    ]
  },

  // ============== LESSON 1: PRICE ANCHORING ==============
  price_anchoring: {
    id: 'lesson_anchoring',
    title: 'Price Anchoring',
    steps: [
      {
        type: 'info',
        icon: '⚓',
        title: 'The Invisible Cage',
        content: `When someone says "MSRP $45,000" - your brain just got anchored.<br><br>Now every price feels like a discount from $45,000. Even $42,000 feels like a "deal" - despite being way more than the car cost to make.<br><br><strong>Anchoring</strong> is the most powerful negotiation tactic in existence. The first number thrown out shapes everything after.<br><br>Whoever sets the anchor controls the game.`
      },
      {
        type: 'artifact',
        context: "You're at a car dealership...",
        contextIcon: '🚗',
        artifactType: 'car-sticker',
        artifactHTML: `<div class="fake-car-sticker"><div class="sticker-header">2024 LUXURA SEDAN XLE</div><div class="sticker-line"><span>MSRP</span><span>$47,995</span></div><div class="sticker-line"><span>Destination Charge</span><span>$1,295</span></div><div class="sticker-line highlight"><span>Market Adjustment</span><span>$3,500</span></div><div class="sticker-total"><span>TOTAL AS SHOWN</span><span>$52,790</span></div><div class="sticker-tagline">"A GREAT VALUE AT THIS PRICE!"</div><div class="sticker-footer">See your salesperson for special financing!</div></div>`,
        prompt: 'This sticker is designed to anchor you high. Find the inflated numbers.',
        hotspots: [
          { x: 5, y: 18, width: 90, height: 10, isHook: true, explanation: "This is the anchor. MSRP is the manufacturer SUGGESTED price - not dealer cost. They paid $38-42k for this car. Everything is negotiable from much lower." },
          { x: 5, y: 38, width: 90, height: 10, isHook: true, explanation: "Pure profit padding. 'Market adjustment' = 'we think we can get away with it.' This should be the FIRST thing you negotiate off." },
          { x: 5, y: 28, width: 90, height: 8, isHook: false, explanation: "Actually legitimate - this covers shipping the car. It's standardized and typically non-negotiable." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🧠',
        title: 'How Anchoring Hijacks Your Brain',
        content: `In studies, even RANDOM numbers affect negotiation:<br><br>Researchers had people spin a wheel (rigged to land on 10 or 65), then estimate what percentage of African countries are in the UN.<br><br>People who saw 65 guessed WAY higher than those who saw 10.<br><br><strong>A completely irrelevant number changed their estimates.</strong><br><br>Now imagine what a salesperson's "MSRP" does to your sense of a "good deal."`
      },
      {
        type: 'scenario',
        speaker: { avatar: '👔', name: 'Car Salesman' },
        content: `You're looking at a used car listed at $28,500. You've researched - similar cars sell for $24,000-26,000.<br><br>The salesman says: <em>"I can see you're a serious buyer. Tell you what - I'll knock $500 off right now. $28,000 even. That's the best I can do."</em>`,
        choices: [
          { text: "How about $27,000?", correct: false, explanation: "You're negotiating from HIS anchor. You just mentally accepted that $28k is the starting point. You'll end up around $27k - still $2-3k overpaying." },
          { text: "I've seen similar cars for $24,000. I'd pay $23,500.", correct: true, explanation: "You set a counter-anchor based on research. Now the negotiation happens between $23,500 and $28,000 - you'll land around $25-26k." },
          { text: "Let me think about it.", correct: false, explanation: "Walking away is good, but you missed a chance to reset the anchor. When you come back, they'll start at $28k again." }
        ],
        points: 100
      },
      {
        type: 'reverse',
        title: 'Set the Anchor',
        villainIcon: '🏷️',
        instruction: "You're selling a used laptop worth ~$400. See how your asking price anchors the buyer's offer.",
        sliders: [
          { label: 'Your Asking Price', min: 300, max: 700, default: 400, step: 25, suffix: '' }
        ],
        calculate: (values) => {
          const [askPrice] = values;
          const fairValue = 400;
          const buyerAnchorEffect = (askPrice - fairValue) * 0.4;
          const counterOffer = Math.round(fairValue - 50 + buyerAnchorEffect * 0.5);
          const finalPrice = Math.round((askPrice + counterOffer) / 2);
          const profit = finalPrice - fairValue;
          return { monthly: counterOffer, total: finalPrice, hidden: profit };
        },
        checkGoal: (result) => result.total >= 450,
        goal: 'Get final sale price above $450',
        revelation: "See how a high ask pulls the final price up? This is what every seller does to you. Your defense: research the REAL value before you ever hear their number.",
        resultLabels: { monthly: "Buyer's Counter", total: 'Final Price', hidden: 'Your Profit vs Fair' },
        points: 100
      },
      {
        type: 'info',
        icon: '🛡️',
        title: 'The Counter-Anchor Strategy',
        content: `<strong>Before ANY negotiation:</strong><br><br>1. Research the real value (not their asking price)<br>2. Decide YOUR anchor before hearing theirs<br>3. Speak FIRST if you can - or immediately counter their anchor<br><br><strong>Example:</strong><br>They say: "Asking $30,000"<br>You say: "Based on KBB and recent sales, I'm seeing $24,000. I'd start at $23,000."<br><br>Now you're negotiating in YOUR range, not theirs.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '💼', name: 'Job Interviewer' },
        content: `In a job interview, the hiring manager asks:<br><br><em>"What are your salary expectations?"</em><br><br>You've researched - the role pays $75,000-$95,000 in your market.`,
        choices: [
          { text: "I'm flexible - what's the budget for the role?", correct: false, explanation: "You just gave up anchor power. They'll lowball you, and you'll negotiate from their floor." },
          { text: "Based on my experience and market rates, I'm targeting $90,000-$100,000.", correct: true, explanation: "You anchored HIGH within the reasonable range. Even if they negotiate down, you'll land higher than if they'd anchored first." },
          { text: "I made $65,000 at my last job, so maybe $70,000?", correct: false, explanation: "You anchored yourself LOW with your past salary. Never reveal old salary - it limits your upside." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The Counter-Anchor',
        description: "Never negotiate from their first number. Before any major purchase or negotiation, research the true market value and set YOUR anchor first. If they anchor first, immediately counter with your researched number.",
        phrase: "Based on my research, I'm seeing [your number]."
      },
      {
        type: 'summary',
        title: 'Price Anchoring Complete',
        keyTakeaways: [
          'The first number mentioned shapes the entire negotiation',
          'MSRP and "asking price" are anchors, not real values',
          'Research the TRUE value before hearing their price',
          'Counter-anchor immediately with your researched number',
          'This works in salary negotiations too - anchor high'
        ]
      }
    ]
  },

  // ============== LESSON 2: WALK AWAY POWER ==============
  walk_away_power: {
    id: 'lesson_walkaway',
    title: 'Walk Away Power',
    steps: [
      {
        type: 'info',
        icon: '🚪',
        title: 'The Power They Fear Most',
        content: `Every salesperson's nightmare: a buyer who can walk away.<br><br>Your willingness to leave is your ONLY real leverage. The moment you "need" to buy TODAY, you've already lost.<br><br><strong>BATNA</strong> = Best Alternative To Negotiated Agreement<br><br>Translation: What happens if you don't make this deal? The better your BATNA, the more power you have.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🚗', name: 'Car Salesman' },
        content: `You've been at the dealership for 3 hours. You're exhausted. The salesman says:<br><br><em>"Look, I've gone back to my manager five times. This is truly the lowest we can go. $31,500, and I'm throwing in the floor mats. I need to know right now - are we doing this?"</em>`,
        choices: [
          { text: "Fine, let's do it. I'm tired of negotiating.", correct: false, explanation: "Exhaustion is their strategy. The 'I need to know now' is a pressure tactic. You'll regret this price tomorrow." },
          { text: "I appreciate your time. I'm going to sleep on it and check one more dealer.", correct: true, explanation: "Magic words. Watch how fast a 'final offer' improves when you actually stand up to leave." },
          { text: "Can you throw in oil changes too?", correct: false, explanation: "You're negotiating extras because you've mentally accepted the price. You've lost the main battle." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '⏰',
        title: 'The Time Trap',
        content: `Salespeople use time as a weapon:<br><br>• Keep you there for hours until you're exhausted<br>• Make you feel invested ("we've come so far!")<br>• Use "today only" urgency<br>• Know that hungry/tired people make bad decisions<br><br><strong>Your defense:</strong> Set a hard stop time. Tell them upfront: "I have to leave by 3pm regardless." Then actually leave.<br><br>The deal will still be there tomorrow. It always is.`
      },
      {
        type: 'artifact',
        context: "Texts from the salesman after you left...",
        contextIcon: '📱',
        artifactType: 'text-messages',
        artifactHTML: `<div class="fake-text-chain"><div class="text-header">Mike from AutoMax</div><div class="text-message"><span class="text-time">4:23 PM</span><p>Hey! Great meeting you today. I talked to my manager - we might have some room to move.</p></div><div class="text-message"><span class="text-time">4:47 PM</span><p>Just found out we have a $1,000 rebate I forgot to mention. That brings us to $30,500.</p></div><div class="text-message"><span class="text-time">6:15 PM</span><p>Look, I want to earn your business. What if I could get it to $29,800?</p></div><div class="text-message"><span class="text-time">9:02 PM</span><p>Last one - $29,000 flat, out the door. This is manager override pricing. Let me know by noon tomorrow.</p></div></div>`,
        prompt: 'You left the dealership. Look what happened.',
        hotspots: [
          { x: 5, y: 18, width: 90, height: 18, isHook: true, explanation: "Suddenly they 'have room to move' after you left? There was ALWAYS room. Walking away revealed it." },
          { x: 5, y: 38, width: 90, height: 18, isHook: true, explanation: "He didn't 'forget' the rebate. This is a manufactured concession to make you feel like you're winning." },
          { x: 5, y: 75, width: 90, height: 18, isHook: true, explanation: "From $31,500 to $29,000 in 5 hours? Imagine where it'd be if you waited two days. Your walkaway power is working." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🎭',
        title: 'Build Your BATNA',
        content: `Before ANY major negotiation, build alternatives:<br><br><strong>Buying a car?</strong><br>• Get quotes from 3+ dealers<br>• Know the exact model you'd buy elsewhere<br>• Have financing pre-approved from your bank<br><br><strong>Negotiating salary?</strong><br>• Have another offer (or be willing to stay put)<br>• Know what competitors pay<br>• Be prepared to walk away<br><br>The better your backup plan, the less you need THIS deal.`
      },
      {
        type: 'reverse',
        title: 'The Pressure Game',
        villainIcon: '😰',
        instruction: "You're a salesperson. Your buyer has been here 2 hours. See what breaks their resistance.",
        sliders: [
          { label: 'Hours Invested', min: 0.5, max: 4, default: 2, step: 0.5, suffix: ' hrs' },
          { label: "Buyer's Other Options", min: 0, max: 5, default: 2, step: 1, suffix: '' },
          { label: 'Urgency Pressure', min: 0, max: 10, default: 5, step: 1, suffix: '/10' }
        ],
        calculate: (values) => {
          const [hours, options, urgency] = values;
          const timeEffect = hours * 12;
          const optionEffect = options * 15;
          const urgencyEffect = urgency * 5;
          const resistance = Math.max(5, 80 - timeEffect - urgencyEffect + optionEffect);
          const discountNeeded = Math.round(resistance / 10);
          return { monthly: Math.round(resistance), total: discountNeeded, hidden: Math.round(100 - resistance) };
        },
        checkGoal: (result) => result.monthly <= 30,
        goal: 'Get buyer resistance below 30%',
        revelation: "Notice what kills buyer resistance? Time invested + no alternatives + urgency. This is why dealers keep you there for hours. Your defense: always have options and a hard stop time.",
        resultLabels: { monthly: 'Buyer Resistance %', total: 'Discount Needed %', hidden: 'Chance They Cave' },
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '🏠', name: 'Real Estate Agent' },
        content: `You found a house you love. Your realtor says:<br><br><em>"There's another offer coming in tonight. If you want this house, you need to offer over asking and waive the inspection contingency. I've seen buyers lose out by hesitating."</em>`,
        choices: [
          { text: "Let's do it - I don't want to lose this house.", correct: false, explanation: "Classic urgency pressure. Waiving inspection can cost you $50,000+ in hidden problems. Another house will come along." },
          { text: "I'll offer asking price with inspection contingency. If they don't accept, that's okay.", correct: true, explanation: "You're showing you have alternatives. Many 'competing offers' are exaggerated or fabricated. Call the bluff." },
          { text: "Can we at least keep the inspection?", correct: false, explanation: "You've accepted the over-asking premise. You're negotiating against yourself now." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The BATNA Check',
        description: "Before any major negotiation, ask: \"What's my best alternative if this falls through?\" If the answer is \"nothing,\" you're not ready to negotiate. Build alternatives first - they're your only real leverage.",
        phrase: "What's my best alternative if I walk away?"
      },
      {
        type: 'summary',
        title: 'Walk Away Power Complete',
        keyTakeaways: [
          'Your willingness to walk away is your only real leverage',
          "Time investment is a trap - set hard stop times",
          '"Final offers" magically improve when you actually leave',
          'Always have alternatives (BATNA) before negotiating',
          'The best deal often comes AFTER you walk away'
        ]
      }
    ]
  },

  // ============== LESSON 3: FINANCING TACTICS ==============
  financing_tactics: {
    id: 'lesson_financing',
    title: 'Financing Tactics',
    steps: [
      {
        type: 'info',
        icon: '💳',
        title: 'The Monthly Payment Trap',
        content: `"What monthly payment are you looking for?"<br><br>This question is a trap. The moment you answer, they stop negotiating PRICE and start manipulating TERMS.<br><br>Want $400/month? Easy:<br>• Extend the loan to 84 months<br>• Bury negative equity<br>• Add hidden fees to principal<br><br>You hit $400/month - but pay $8,000 more total.<br><br>Never negotiate monthly payment. Negotiate PRICE, then figure out payment.`
      },
      {
        type: 'artifact',
        context: "The financing office hands you this...",
        contextIcon: '📋',
        artifactType: 'loan-breakdown',
        artifactHTML: `<div class="fake-loan-doc"><div class="loan-header">FINANCING SUMMARY</div><div class="loan-vehicle">2024 Luxura Sedan</div><div class="loan-payment"><span class="payment-amount">$399</span><span class="payment-label">/month</span></div><div class="loan-details"><div class="loan-row"><span>Sale Price</span><span>$34,000</span></div><div class="loan-row"><span>Term</span><span>84 months</span></div><div class="loan-row"><span>APR</span><span>8.9%</span></div><div class="loan-row"><span>Down Payment</span><span>$2,000</span></div><div class="loan-row warn"><span>Trade-in Payoff</span><span>-$3,000</span></div><div class="loan-row"><span>Amount Financed</span><span>$35,000</span></div><div class="loan-row"><span>Total of Payments</span><span>$33,516</span></div></div><div class="loan-total"><span>TOTAL COST</span><span>$69,516</span></div></div>`,
        prompt: 'They hit your payment target. Find out how.',
        hotspots: [
          { x: 10, y: 35, width: 80, height: 8, isHook: true, explanation: "84 months = 7 years! You'll be paying for this car 2-3 years AFTER it's out of warranty. It'll be worth $15k while you still owe $20k." },
          { x: 10, y: 43, width: 80, height: 8, isHook: true, explanation: "Highway robbery. Average auto loan rates are 5-7%. This rate adds thousands to your total cost. Should've gotten pre-approved elsewhere." },
          { x: 10, y: 55, width: 80, height: 8, isHook: true, explanation: "They rolled $3,000 of your OLD car's debt into the NEW loan. You're paying interest on money you already owed. This is how people stay trapped." },
          { x: 10, y: 18, width: 80, height: 12, isHook: true, explanation: "They hit your 'target payment' by manipulating everything else. The car cost $34k but you're paying $69,516. That's the trap." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🎰',
        title: 'The Four-Box Shuffle',
        content: `Dealers negotiate four things at once:<br><br>1. <strong>Price</strong> of the new car<br>2. <strong>Trade-in</strong> value<br>3. <strong>Financing</strong> rate/terms<br>4. <strong>Add-ons</strong> (warranties, protection packages)<br><br>They'll lose on one box to win on three others.<br><br>"Great news! I got you $2,000 more for your trade-in!"<br>(But they added $3,000 to the price and marked up your rate)<br><br><strong>Your defense:</strong> Negotiate each box SEPARATELY. Never discuss them together.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '💼', name: 'Finance Manager' },
        content: `In the finance office, the manager says:<br><br><em>"Great news! The bank approved you at 7.9% APR. I know you wanted lower, but with your credit score, that's actually a good rate. Want me to see if extending to 72 months helps the payment?"</em><br><br>You have a pre-approval from your credit union at 5.2%.`,
        choices: [
          { text: "Yeah, let's try 72 months to lower the payment.", correct: false, explanation: "You're extending debt to hide a bad rate. You'll pay thousands more in interest. And you haven't mentioned your pre-approval yet." },
          { text: "I have a 5.2% pre-approval. Can you beat that?", correct: true, explanation: "Now they have to compete. Dealers often CAN beat outside rates - they just don't offer it unless forced." },
          { text: "7.9% sounds fair. Let's move forward.", correct: false, explanation: "It's not fair - you have proof with your pre-approval. You just volunteered to overpay by thousands." }
        ],
        points: 100
      },
      {
        type: 'sharklens',
        instruction: 'Tap each term to see what it really costs you.',
        documentType: 'finance-contract',
        documentTitle: 'RETAIL INSTALLMENT CONTRACT',
        documentText: `This agreement establishes financing terms for the described vehicle.<br><br><strong>Amount Financed:</strong> $38,459.00<br><strong>APR:</strong> 7.9%<br><strong>Finance Charge:</strong> $9,847.33<br><strong>Total of Payments:</strong> $48,306.33<br><br><strong>Included Products:</strong><br>• GAP Insurance: $895<br>• Paint Protection: $599<br>• Extended Warranty: $2,400<br>• Fabric Protection: $399`,
        terms: [
          { jargon: 'Finance Charge', realMeaning: "Pure interest - nearly $10,000 paid to borrow money. At 5% APR, this would be ~$6,200 instead." },
          { jargon: 'GAP Insurance', realMeaning: "Legit product but massively overpriced here. Your car insurance company sells this for $50-100/year, not $895." },
          { jargon: 'Paint Protection', realMeaning: "A $599 bottle of wax. Worth maybe $30. Pure dealer profit." },
          { jargon: 'Extended Warranty', realMeaning: "Might have value, but dealer cost is ~$800. They're charging $2,400. Shop this separately." }
        ]
      },
      {
        type: 'reverse',
        title: 'The Payment Illusion',
        villainIcon: '🎩',
        instruction: "You're a finance manager. Customer wants $450/month for a $30,000 car. Make it happen.",
        sliders: [
          { label: 'Loan Term (months)', min: 36, max: 84, default: 60, step: 12, suffix: ' mo' },
          { label: 'APR %', min: 4, max: 12, default: 7, step: 0.5, suffix: '%' },
          { label: 'Hidden Fees Added', min: 0, max: 3000, default: 0, step: 250, suffix: '' }
        ],
        calculate: (values) => {
          const [term, apr, fees] = values;
          const principal = 30000 + fees;
          const monthlyRate = (apr / 100) / 12;
          const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
          const totalInterest = (payment * term) - principal;
          const totalCost = 30000 + fees + totalInterest;
          return { monthly: Math.round(payment), total: Math.round(totalCost), hidden: Math.round(fees + totalInterest) };
        },
        checkGoal: (result) => result.monthly <= 450 && result.hidden >= 5000,
        goal: 'Hit $450/month while adding $5,000+ in fees/interest',
        revelation: "See how easy it is to hit any payment number? Extend terms, raise rates, add fees - the customer never notices. Always ask for the TOTAL cost, not the monthly payment.",
        resultLabels: { monthly: 'Monthly Payment', total: 'Total Cost', hidden: 'Hidden Costs' },
        points: 100
      },
      {
        type: 'info',
        icon: '🛡️',
        title: 'The Financing Defense',
        content: `<strong>Before buying anything on financing:</strong><br><br>1. Get pre-approved elsewhere (bank, credit union)<br>2. Know your credit score<br>3. Never reveal your target monthly payment<br>4. Negotiate PRICE first, financing second<br>5. Ask: "What is the TOTAL cost including interest?"<br><br><strong>In the finance office:</strong><br>• Decline ALL add-ons by default<br>• Compare their APR to your pre-approval<br>• Anything over 60 months is a warning sign`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🏪', name: 'Furniture Store' },
        content: `You're buying a $3,000 couch. The store offers:<br><br><em>"0% APR for 24 months! No payments for 6 months! Just sign up for our store credit card."</em><br><br>Sounds great, right?`,
        choices: [
          { text: "Perfect - free financing!", correct: false, explanation: "Read the fine print. Many 0% offers have DEFERRED interest. If you have any balance at 24 months, you owe ALL the back interest (often 25%+)." },
          { text: "What happens if I have a balance at month 24?", correct: true, explanation: "This question reveals the trap. They'll explain deferred interest. If you wouldn't pay it off in full, this deal is worse than a regular loan." },
          { text: "I'll just pay cash instead.", correct: false, explanation: "Safe, but you might benefit from 0% if you KNOW you'll pay it off. The key is understanding the terms." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The Total Cost Question',
        description: "Never negotiate monthly payment. Instead, ask: \"What is the TOTAL amount I'll pay including principal, interest, and all fees?\" This one question exposes the real cost and prevents term manipulation.",
        phrase: "What's the total cost - everything included?"
      },
      {
        type: 'summary',
        title: 'Financing Tactics Complete',
        keyTakeaways: [
          'Never negotiate monthly payment - negotiate PRICE',
          'Long loan terms (72-84 months) hide inflated costs',
          'Always get pre-approved financing before shopping',
          'Dealer finance office add-ons are massively overpriced',
          '0% APR often has deferred interest traps',
          'Always ask: "What\'s the TOTAL cost?"'
        ]
      }
    ]
  },

  // ============== LESSON 4: TOTAL COST OF OWNERSHIP ==============
  total_cost_ownership: {
    id: 'lesson_tco',
    title: 'Total Cost of Ownership',
    steps: [
      {
        type: 'info',
        icon: '📊',
        title: 'The Price Tag Lies',
        content: `A $25,000 car doesn't cost $25,000.<br><br>Over 5 years, you'll pay for:<br>• Insurance<br>• Fuel<br>• Maintenance<br>• Repairs (out of warranty)<br>• Registration fees<br>• Depreciation (the big one)<br><br>Some $25,000 cars actually cost $45,000. Others cost $35,000.<br><br>The sticker price tells you almost nothing.`
      },
      {
        type: 'reverse',
        title: 'True Cost Calculator',
        villainIcon: '🔍',
        instruction: "Compare two cars. Which one REALLY costs less over 5 years?",
        sliders: [
          { label: 'Car A: Price', min: 20000, max: 40000, default: 25000, step: 1000, suffix: '' },
          { label: 'Car A: MPG', min: 20, max: 50, default: 28, step: 2, suffix: ' mpg' },
          { label: 'Car B: Price', min: 20000, max: 40000, default: 32000, step: 1000, suffix: '' },
          { label: 'Car B: MPG', min: 20, max: 50, default: 42, step: 2, suffix: ' mpg' }
        ],
        calculate: (values) => {
          const [priceA, mpgA, priceB, mpgB] = values;
          const milesPerYear = 12000;
          const gasPrice = 3.50;
          const years = 5;
          const fuelA = (milesPerYear / mpgA) * gasPrice * years;
          const fuelB = (milesPerYear / mpgB) * gasPrice * years;
          const depreciationA = priceA * 0.5;
          const depreciationB = priceB * 0.45;
          const insuranceA = 1500 * years;
          const insuranceB = 1400 * years;
          const totalA = priceA + fuelA + insuranceA + depreciationA * 0.5;
          const totalB = priceB + fuelB + insuranceB + depreciationB * 0.5;
          return { monthly: Math.round(totalA), total: Math.round(totalB), hidden: Math.round(totalA - totalB) };
        },
        checkGoal: (result) => result.hidden > 0,
        goal: 'Find settings where the expensive car costs LESS over 5 years',
        revelation: "A car that costs $7,000 more upfront can cost LESS over 5 years with better MPG and lower depreciation. Always calculate total cost of ownership, not sticker price.",
        resultLabels: { monthly: 'Car A: 5yr Cost', total: 'Car B: 5yr Cost', hidden: 'Difference (A-B)' },
        points: 100
      },
      {
        type: 'info',
        icon: '📉',
        title: 'The Depreciation Bomb',
        content: `Depreciation is the silent killer of car value:<br><br><strong>Year 1:</strong> Car loses 20-30% of value (the "drive off the lot" hit)<br><strong>Year 3:</strong> Worth about 60% of original price<br><strong>Year 5:</strong> Worth about 40% of original price<br><br>A $40,000 new car is worth ~$16,000 after 5 years.<br><br>That's $24,000 in depreciation - more than most repairs would ever cost.<br><br><strong>This is why buying 2-3 year old cars is often smarter.</strong> Let someone else eat the depreciation.`
      },
      {
        type: 'artifact',
        context: "Comparing two options...",
        contextIcon: '🚗',
        artifactType: 'car-comparison',
        artifactHTML: `<div class="fake-comparison"><div class="compare-header"><div class="compare-col"><div class="car-badge new">NEW</div>2024 Camry</div><div class="compare-col"><div class="car-badge used">CERTIFIED</div>2022 Camry</div></div><div class="compare-row"><span class="row-label">Purchase Price</span><span>$32,000</span><span>$24,000</span></div><div class="compare-row"><span class="row-label">5yr Insurance</span><span>$8,500</span><span>$7,200</span></div><div class="compare-row"><span class="row-label">5yr Fuel</span><span>$6,300</span><span>$6,300</span></div><div class="compare-row"><span class="row-label">Maintenance</span><span>$1,800</span><span>$2,400</span></div><div class="compare-row highlight"><span class="row-label">Depreciation</span><span>-$14,000</span><span>-$7,000</span></div><div class="compare-row total"><span class="row-label">5yr Total Cost</span><span>$33,500</span><span>$25,900</span></div></div>`,
        prompt: 'Which car actually costs less? Find the real numbers.',
        hotspots: [
          { x: 5, y: 62, width: 90, height: 12, isHook: true, explanation: "This is the biggest difference. The new car loses TWICE as much value. You're paying $7,000 extra just for 'new car smell.'" },
          { x: 5, y: 50, width: 90, height: 10, isHook: false, explanation: "Yes, the used car needs slightly more maintenance. But $600 vs $7,000 in depreciation savings? Not even close." },
          { x: 5, y: 75, width: 90, height: 12, isHook: true, explanation: "The 'cheaper' new car costs $7,600 MORE over 5 years. The sticker price lied to you." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '👩‍💼', name: 'Your Coworker' },
        content: `Your coworker is bragging about her new car:<br><br><em>"I got an amazing deal on my Range Rover - $65,000, down from $72,000! The payments are high but it's basically a luxury tank. I'll have it forever."</em><br><br>Based on what you know about total cost of ownership...`,
        choices: [
          { text: "That sounds like a great deal on a luxury car!", correct: false, explanation: "Luxury cars have luxury maintenance: $1,500+ oil changes, expensive parts, premium fuel. And Range Rover depreciation is brutal - worth $30k in 5 years." },
          { text: "What's the annual maintenance and insurance on that?", correct: true, explanation: "You're thinking TCO. Range Rovers have some of the highest maintenance costs and worst reliability. That 'deal' will cost $100k+ over 5 years." },
          { text: "You should have bought a Tesla.", correct: false, explanation: "Different car, same principle. The lesson is evaluating total cost, not recommending brands." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🏠',
        title: 'Houses Have Hidden Costs Too',
        content: `A $400,000 house doesn't cost $400,000.<br><br><strong>Annual hidden costs:</strong><br>• Property taxes: $4,000-$12,000+<br>• Insurance: $1,500-$3,000<br>• Maintenance (1% rule): $4,000<br>• HOA fees: $0-$500/month<br>• Utilities (often higher than renting)<br><br>Over 30 years with a mortgage, that $400k house costs $700k-$900k.<br><br>That doesn't mean don't buy - just know the REAL number.`
      },
      {
        type: 'sharklens',
        instruction: 'Tap each term to see the true 30-year cost.',
        documentType: 'mortgage-doc',
        documentTitle: 'LOAN ESTIMATE',
        documentText: `Property: 123 Main Street<br>Purchase Price: $375,000<br><br><strong>Loan Amount:</strong> $337,500 (10% down)<br><strong>Interest Rate:</strong> 7.125%<br><strong>Monthly P&I:</strong> $2,274<br><strong>Monthly Tax:</strong> $312<br><strong>Monthly Insurance:</strong> $142<br><strong>Monthly PMI:</strong> $185<br><strong>Monthly HOA:</strong> $125<br><br><strong>Total Monthly:</strong> $3,038<br><strong>Total Interest (30yr):</strong> $481,140`,
        terms: [
          { jargon: 'PMI', realMeaning: "Private Mortgage Insurance - you pay because you put less than 20% down. It protects the LENDER, not you. Adds ~$2,200/year until you hit 20% equity." },
          { jargon: 'Total Interest', realMeaning: "You're paying $481k in interest on a $337k loan. Total cost: $856k for a $375k house." },
          { jargon: 'HOA', realMeaning: "Can increase annually. Over 30 years at 3% increases, you'll pay $70k+ in HOA fees alone." },
          { jargon: 'Monthly Tax', realMeaning: "Property taxes usually increase annually. Budget for this to double over 30 years." }
        ]
      },
      {
        type: 'weapon',
        name: 'The 5-Year Cost',
        description: "Before any major purchase, calculate the 5-year total cost - not just purchase price. Include insurance, fuel/utilities, maintenance, repairs, and depreciation. The 'cheapest' option often isn't.",
        phrase: "What will this cost me over 5 years - everything included?"
      },
      {
        type: 'summary',
        title: 'Total Cost of Ownership Complete',
        keyTakeaways: [
          'Purchase price is often less than half the true cost',
          'Depreciation is usually the biggest hidden cost for cars',
          '2-3 year old cars often cost much less than new',
          'Luxury items have luxury maintenance costs',
          'A $400k house costs $700k-$900k over 30 years',
          'Always calculate the 5-year total cost'
        ]
      }
    ]
  },

  // ============== LESSON 1: COMPOUND INTEREST ==============
  compound_interest: {
    id: 'lesson_compound',
    title: 'Compound Interest',
    steps: [
      {
        type: 'info',
        icon: '🌱',
        title: 'The Force That Builds Wealth',
        content: `<strong>Compound interest</strong> is when your money earns money, and then THAT money earns money, and so on forever.<br><br>It's not magic. It's math. And it's the single biggest reason rich people stay rich.<br><br>Today you'll see why starting early matters more than investing more.`
      },
      {
        type: 'reverse',
        title: 'Watch Money Grow',
        villainIcon: '💰',
        instruction: "You have $1,000 to invest. Adjust the sliders and watch the math work.",
        sliders: [
          { label: 'Years Invested', min: 1, max: 40, default: 10, step: 1, suffix: ' yrs' },
          { label: 'Annual Return %', min: 1, max: 12, default: 7, step: 1, suffix: '%' },
          { label: 'Monthly Addition', min: 0, max: 500, default: 100, step: 25, suffix: '' }
        ],
        calculate: (values) => {
          const [years, rate, monthly] = values;
          const r = rate / 100;
          let balance = 1000;
          const totalContributed = 1000 + (monthly * 12 * years);
          for (let y = 0; y < years; y++) {
            balance = balance * (1 + r) + (monthly * 12);
          }
          const interestEarned = Math.round(balance - totalContributed);
          return { monthly: Math.round(totalContributed), total: Math.round(balance), hidden: interestEarned };
        },
        checkGoal: (result) => result.hidden >= 10000,
        goal: 'Get interest earned above $10,000',
        revelation: "At 7% return, your money doubles every ~10 years. That's compound interest - time does the heavy lifting, not you.",
        resultLabels: { monthly: 'You Contributed', total: 'Final Balance', hidden: 'Interest Earned' },
        points: 100
      },
      {
        type: 'info',
        icon: '⏰',
        title: 'The Real Cost of Waiting',
        content: `Meet two investors:<br><br><strong>Alex</strong> starts at 22, invests $200/month for 10 years, then stops.<br>Total invested: $24,000<br><br><strong>Jordan</strong> starts at 32, invests $200/month for 30 years straight.<br>Total invested: $72,000<br><br>At age 62, who has more?<br><br><strong>Alex: $512,000</strong><br><strong>Jordan: $453,000</strong><br><br>Alex invested 1/3 the money and ended up richer. The only difference? Starting 10 years earlier.`
      },
      {
        type: 'artifact',
        context: "You see this ad from a bank...",
        contextIcon: '🏦',
        artifactType: 'bank-ad',
        artifactHTML: `<div class="fake-bank-ad"><div class="bank-logo">🏦 SafeBank</div><h3>Start Your Savings Journey Today!</h3><div class="rate-highlight"><span class="rate-number">0.05%</span><span class="rate-label">APY</span></div><div class="bank-features"><div>✨ No minimum balance</div><div>✨ FDIC Insured</div><div>✨ Your money is safe with us!</div></div><div class="bank-cta">OPEN ACCOUNT</div></div>`,
        prompt: 'This looks safe. Find the problem.',
        hotspots: [
          { x: 20, y: 30, width: 60, height: 15, isHook: true, explanation: "0.05% is basically nothing. Your $10,000 earns $5/year. Inflation (~3%) means you're LOSING purchasing power every year." },
          { x: 10, y: 55, width: 80, height: 8, isHook: false, explanation: "FDIC insurance is actually good - the government guarantees up to $250k. But safety doesn't help if inflation eats your savings." },
          { x: 10, y: 45, width: 80, height: 8, isHook: false, explanation: "No minimum balance is fine. Not the problem here." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '👨', name: 'Your Uncle Rick' },
        content: `At Thanksgiving, Uncle Rick says:<br><br><em>"Why would you put money in the stock market? My buddy lost half his savings in 2008. I keep all my cash in a savings account where it's safe. Can't lose what you don't risk!"</em><br><br>What's the flaw in Rick's logic?`,
        choices: [
          { text: "He's right - savings accounts are the safest choice", correct: false, explanation: "Safe from market crashes, yes. But inflation averages 3%/year. His 'safe' money loses buying power every year. In 20 years, his $100k buys what $55k buys today." },
          { text: "Keeping some cash is smart, but all of it misses compound growth", correct: true, explanation: "Exactly. Cash for emergencies = smart. All savings in a 0.05% account = guaranteed to lose value over time. Inflation is the silent thief." },
          { text: "He should put everything in crypto instead", correct: false, explanation: "Swinging from too conservative to too risky isn't the answer. The goal is understanding risk, not avoiding or chasing it." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🔢',
        title: 'The Rule of 72',
        content: `Want to know how long it takes to double your money?<br><br><strong>72 ÷ interest rate = years to double</strong><br><br>At 7% return: 72 ÷ 7 = ~10 years to double<br>At 10% return: 72 ÷ 10 = ~7 years to double<br>At 1% return: 72 ÷ 1 = 72 years to double<br><br>This is why savings accounts (0.05%) are wealth destruction. Your money would take <strong>1,440 years</strong> to double.`
      },
      {
        type: 'weapon',
        name: 'The Rule of 72',
        description: "Quick mental math to evaluate any investment. Divide 72 by the interest rate to see how many years until your money doubles. If the answer is longer than your lifespan, find a better option.",
        phrase: "72 divided by the rate - how long to double?"
      },
      {
        type: 'summary',
        title: 'Compound Interest Complete',
        keyTakeaways: [
          'Compound interest = your money earns money, which earns more money',
          'Time matters more than amount - starting early beats investing more later',
          'Savings accounts with <1% interest lose value to inflation',
          'Rule of 72: divide 72 by interest rate to find years to double',
          'The earlier you start, the more time does the work for you'
        ]
      }
    ]
  },

  // ============== LESSON 2: INDEX FUND BASICS ==============
  index_fund_basics: {
    id: 'lesson_index',
    title: 'Index Fund Basics',
    steps: [
      {
        type: 'info',
        icon: '📊',
        title: 'The Game Most People Lose',
        content: `Here's a dirty secret of investing:<br><br><strong>Over any 15-year period, ~90% of professional fund managers FAIL to beat the market average.</strong><br><br>These are people with MBAs, Bloomberg terminals, and million-dollar salaries. And they still lose to a simple strategy anyone can use.<br><br>The strategy? <strong>Index funds.</strong>`
      },
      {
        type: 'info',
        icon: '🎯',
        title: "What's an Index Fund?",
        content: `An <strong>index fund</strong> is a basket of stocks that automatically copies a market index (like the S&P 500 - the 500 biggest US companies).<br><br>Instead of trying to pick winners, you own a tiny piece of EVERYTHING.<br><br><strong>Why it works:</strong><br>• No guessing which stocks will win<br>• Super low fees (no expensive managers)<br>• Automatically diversified<br>• Historically returns ~7-10%/year average<br><br>It's boring. That's the point.`
      },
      {
        type: 'bsdetector',
        platform: '📺 Finance Ad',
        guruName: 'Elite Wealth Management',
        guruAvatar: '🏦',
        script: [
          { text: "At Elite Wealth, we don't just match the market...", isLie: false, duration: 2500 },
          { text: "Our expert analysts BEAT the market year after year!", isLie: true, truth: "Past performance ≠ future results. Studies show even 'winning' funds rarely repeat success. This year's winner is often next year's loser.", duration: 4000 },
          { text: "For just 1.5% annually, you get access to our exclusive strategies.", isLie: true, truth: "1.5% sounds small but it's HUGE. On $100k over 30 years, that fee costs you ~$200,000 in lost growth vs a 0.03% index fund.", duration: 4500 },
          { text: "Our clients enjoy personalized portfolio management.", isLie: false, duration: 2500 },
          { text: "Don't leave your retirement to chance - trust the experts!", isLie: true, truth: "The 'chance' they're warning about (index funds) beats their 'experts' 90% of the time. They're selling fear to justify fees.", duration: 4000 }
        ]
      },
      {
        type: 'reverse',
        title: 'The Fee Vampire',
        villainIcon: '🧛',
        instruction: "You're investing $10,000 and adding $500/month for 30 years at 7% return. See how fees eat your wealth.",
        sliders: [
          { label: 'Annual Fee %', min: 0.03, max: 2.0, default: 0.03, step: 0.01, suffix: '%' }
        ],
        calculate: (values) => {
          const [feePercent] = values;
          const years = 30;
          const monthlyAdd = 500;
          const baseReturn = 0.07;
          const fee = feePercent / 100;
          const netReturn = baseReturn - fee;
          let balance = 10000;
          let noFeeBalance = 10000;
          for (let y = 0; y < years; y++) {
            balance = balance * (1 + netReturn) + (monthlyAdd * 12);
            noFeeBalance = noFeeBalance * (1 + baseReturn) + (monthlyAdd * 12);
          }
          const lostToFees = Math.round(noFeeBalance - balance);
          const pctLost = Math.round((lostToFees / noFeeBalance) * 100);
          return { monthly: pctLost, total: Math.round(balance), hidden: lostToFees };
        },
        checkGoal: (result) => result.hidden >= 150000,
        goal: 'See what a 1.5% fee costs you (raise the slider)',
        revelation: "A 1.5% fee sounds small. But over 30 years, it can cost you 30-40% of your total gains. That's hundreds of thousands of dollars - for worse performance than an index fund.",
        resultLabels: { monthly: '% of Gains Lost', total: 'Your Balance', hidden: 'Lost to Fees' },
        points: 100
      },
      {
        type: 'sharklens',
        instruction: 'Tap each highlighted term to decode the real cost.',
        documentType: 'fund-sheet',
        documentTitle: 'MUTUAL FUND FACT SHEET',
        documentText: `The Elite Growth Fund seeks long-term capital appreciation through a diversified equity portfolio.<br><br><strong>Expense Ratio:</strong> 1.25%<br><strong>Load Fee:</strong> 5.00% front-end<br><strong>12b-1 Fee:</strong> 0.25%<br><strong>Minimum Investment:</strong> $3,000<br><strong>Turnover Rate:</strong> 85%`,
        terms: [
          { jargon: 'Expense Ratio', realMeaning: "The annual fee they take. 1.25% = $125/year per $10k invested, every year forever." },
          { jargon: 'Load Fee', realMeaning: "5% taken IMMEDIATELY from your investment. Put in $10k, only $9,500 actually gets invested." },
          { jargon: '12b-1 Fee', realMeaning: "Fee they charge YOU to pay for THEIR marketing. Yes, really." },
          { jargon: 'Turnover Rate', realMeaning: "How much they trade. 85% = lots of transactions = more hidden costs and taxes for you." }
        ]
      },
      {
        type: 'scenario',
        speaker: { avatar: '👩‍💼', name: 'Financial Advisor' },
        content: `You meet a financial advisor at your bank. She says:<br><br><em>"I recommend our Managed Growth Fund. It's actively managed by experts who react to market conditions. Yes, the 1.2% fee is higher than index funds, but you get professional oversight. Index funds just blindly follow the market - what if there's a crash?"</em>`,
        choices: [
          { text: "That makes sense - I want professionals managing my money", correct: false, explanation: "Those 'professionals' underperform index funds 90% of the time. You're paying more for worse results. During crashes, active managers panic-sell just like everyone else." },
          { text: "What's your fund's 15-year performance vs. the S&P 500 after fees?", correct: true, explanation: "Perfect question. Most won't have a good answer. If they can't beat the index over 15 years, why pay 40x the fee?" },
          { text: "Index funds sound too risky - I'll stick with savings", correct: false, explanation: "Index funds ARE diversified - you own 500+ companies. That's less risky than picking individual stocks. And way less risky than inflation eating a savings account." }
        ],
        points: 100
      },
      {
        type: 'weapon',
        name: 'The Fee Check',
        description: "Before investing in any fund, check the expense ratio. Index funds charge ~0.03-0.20%. Anything above 0.5% needs serious justification. Above 1%? They're probably taking more than they're worth.",
        phrase: "What's the expense ratio?"
      },
      {
        type: 'summary',
        title: 'Index Fund Basics Complete',
        keyTakeaways: [
          '90% of professional fund managers fail to beat the market',
          'Index funds automatically match the market at ultra-low fees',
          'A 1% fee difference can cost hundreds of thousands over time',
          '"Active management" usually means higher fees for worse results',
          'Always ask: "What\'s the expense ratio?"'
        ]
      }
    ]
  },

  // ============== LESSON 3: RISK MANAGEMENT ==============
  risk_management: {
    id: 'lesson_risk',
    title: 'Risk Management',
    steps: [
      {
        type: 'info',
        icon: '⚖️',
        title: 'Risk is Not a Feeling',
        content: `"Risk" isn't just volatility or scary headlines. It's a simple question:<br><br><strong>What happens to your life if this goes to zero?</strong><br><br>If the answer is "I'd be fine" → acceptable risk<br>If the answer is "I'd be ruined" → too much risk<br><br>No investment is worth your rent money, emergency fund, or peace of mind.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '🧑‍💻', name: 'Your Friend Jake' },
        content: `Jake texts you excitedly:<br><br><em>"Dude. This stock is about to moon. I put in my whole savings - $15k. My buddy works there and says they're announcing a huge deal next week. You should go all in too!"</em><br><br>What's wrong with Jake's approach?`,
        choices: [
          { text: "Nothing - insider info is valuable", correct: false, explanation: "Trading on insider info is literally a federal crime. Also, Jake's 'buddy' might be wrong, lying, or exaggerating. And 'whole savings' is never smart." },
          { text: "He should diversify - not put everything in one stock", correct: true, explanation: "Exactly. Even if the tip is real (it's probably not), one stock = one point of failure. If that deal falls through, Jake loses everything." },
          { text: "He should have put in even more", correct: false, explanation: "The opposite. Never invest more than you can afford to lose completely. Jake's already over that line." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🥧',
        title: 'The Allocation Question',
        content: `Smart investors spread risk across buckets:<br><br><strong>Emergency fund</strong> (3-6 months expenses) - Cash, instantly accessible<br><strong>Stable investments</strong> - Bonds, index funds, retirement accounts<br><strong>Speculative bets</strong> - Individual stocks, crypto, startups<br><br>The question isn't "should I take risks?" - it's "how much can I afford to risk?"<br><br>A good rule: never put more than 5-10% in speculative bets. Even if you lose it all, life goes on.`
      },
      {
        type: 'reverse',
        title: 'Build Your Risk Budget',
        villainIcon: '🎲',
        instruction: "You have $30,000 in savings. Allocate it and see what survives different disasters.",
        sliders: [
          { label: 'Emergency Fund %', min: 0, max: 100, default: 20, step: 5, suffix: '%' },
          { label: 'Index Funds %', min: 0, max: 100, default: 60, step: 5, suffix: '%' },
          { label: 'Speculative %', min: 0, max: 100, default: 20, step: 5, suffix: '%' }
        ],
        calculate: (values) => {
          const [emergency, index, spec] = values;
          const total = emergency + index + spec;
          if (total !== 100) return { monthly: 0, total: 0, hidden: 0 };
          const emAmount = 30000 * (emergency / 100);
          const idxAmount = 30000 * (index / 100);
          const specAmount = 30000 * (spec / 100);
          // Scenario: market drops 40%, speculative goes to zero
          const afterCrash = emAmount + (idxAmount * 0.6) + 0;
          const monthsRunway = Math.floor(emAmount / 3000); // assume $3k/mo expenses
          return { monthly: monthsRunway, total: Math.round(afterCrash), hidden: Math.round(specAmount) };
        },
        checkGoal: (result) => result.monthly >= 3 && result.total >= 15000,
        goal: 'Survive crash (keep $15k+) AND have 3+ months runway',
        revelation: "There's no 'right' allocation - but there IS a wrong one: anything that ruins you if it fails. Build to survive the worst case.",
        resultLabels: { monthly: 'Months Runway', total: 'After Crash', hidden: 'Lost if Spec Fails' },
        points: 100
      },
      {
        type: 'artifact',
        context: "You see this on social media...",
        contextIcon: '📱',
        artifactType: 'reddit-post',
        artifactHTML: `<div class="fake-reddit"><div class="reddit-header"><span class="subreddit">r/wallstreetbets</span></div><div class="reddit-content"><div class="post-title">🚀 YOLO'd my entire savings into $MEME calls 🚀</div><div class="post-body">I'm either retiring next week or moving back in with my parents. No risk no reward baby!!!<br><br><strong>Position:</strong> $47,000 in weekly calls expiring Friday<br><br>To the moon! 🌙</div><div class="post-meta">💬 2,847 comments &nbsp;|&nbsp; ⬆️ 12.4k</div></div></div>`,
        prompt: 'This post glorifies something dangerous. Find the red flags.',
        hotspots: [
          { x: 5, y: 35, width: 60, height: 10, isHook: true, explanation: "Never invest what you can't lose. This person is gambling their financial security on a weekly bet." },
          { x: 5, y: 50, width: 90, height: 12, isHook: true, explanation: "Options expire worthless constantly. 'Weekly' means maximum risk. This isn't investing - it's a casino." },
          { x: 5, y: 42, width: 70, height: 8, isHook: true, explanation: "'No risk no reward' justifies reckless behavior. Smart investors take CALCULATED risks, not 'everything or nothing' bets." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '😴',
        title: 'The Sleep Test',
        content: `Here's the simplest risk management tool:<br><br><strong>Can you sleep at night?</strong><br><br>If checking your portfolio gives you anxiety, you've taken on too much risk. If a 30% drop would make you panic-sell, you're overexposed.<br><br>Your risk tolerance isn't about what you handle when things go UP. It's what you stomach when things go DOWN.<br><br>Invest in a way that lets you ignore the news and sleep peacefully.`
      },
      {
        type: 'weapon',
        name: 'The Sleep Test',
        description: "Before making any investment, ask: \"If this dropped 50% tomorrow, would I panic-sell or sleep fine?\" If you'd panic, you're risking too much. Scale back until the answer is \"I'd sleep fine.\"",
        phrase: "Would I sleep fine if this dropped 50%?"
      },
      {
        type: 'summary',
        title: 'Risk Management Complete',
        keyTakeaways: [
          'Risk = what happens to your life if this goes to zero',
          'Never invest your emergency fund or rent money',
          'Diversification means no single failure ruins you',
          'YOLO bets are gambling, not investing',
          'The Sleep Test: if a 50% drop would panic you, scale back'
        ]
      }
    ]
  },

  // ============== LESSON 4: INVESTMENT TRAPS ==============
  investment_traps: {
    id: 'lesson_traps',
    title: 'Investment Traps',
    steps: [
      {
        type: 'info',
        icon: '🪤',
        title: 'If It Sounds Too Good...',
        content: `In investing, there's an iron law:<br><br><strong>Higher returns = higher risk. Always.</strong><br><br>Anyone promising high returns with low risk is either:<br>1. Lying<br>2. Running a scam<br>3. Doesn't understand what they're selling<br><br>There are no exceptions. Not one. Ever.`
      },
      {
        type: 'bsdetector',
        platform: '📱 Instagram DM',
        guruName: 'CryptoMillionaire88',
        guruAvatar: '💎',
        script: [
          { text: "Hey! Saw you're interested in finance 👀", isLie: false, duration: 2000 },
          { text: "I've been making 30% returns WEEKLY with this trading bot", isLie: true, truth: "30% weekly = 1,400,000% annually. If this were real, they'd be the richest person in history. They're not.", duration: 4000 },
          { text: "It's totally passive - the AI does everything", isLie: true, truth: "'AI trading bots' that guarantee returns are almost always scams. Real AI trading is used by hedge funds who don't DM strangers.", duration: 3500 },
          { text: "I can get you in for just $500 to start", isLie: true, truth: "This is the hook. You send $500, they show fake 'gains' on a dashboard, then push you to invest more before disappearing.", duration: 4000 },
          { text: "Only sharing this with people who seem serious 🤫", isLie: true, truth: "Fake exclusivity. They're DMing hundreds of people with this same script.", duration: 3000 }
        ]
      },
      {
        type: 'info',
        icon: '📈',
        title: 'The Realistic Return Spectrum',
        content: `What actual returns look like:<br><br><strong>Savings account:</strong> 0.05-0.5% (barely beats nothing)<br><strong>Bonds:</strong> 2-5% (low risk, low reward)<br><strong>Index funds:</strong> 7-10% average (solid, proven)<br><strong>Individual stocks:</strong> varies wildly (higher risk)<br><strong>"Guaranteed 20%+":</strong> 🚨 SCAM ALERT 🚨<br><br>Anyone promising consistent double-digit returns with "no risk" is lying. Bernie Madoff promised 10-12% "guaranteed" - it was the biggest Ponzi scheme in history.`
      },
      {
        type: 'artifact',
        context: "You see this ad on Facebook...",
        contextIcon: '📘',
        artifactType: 'investment-ad',
        artifactHTML: `<div class="fake-investment-ad"><div class="ad-sponsored">Sponsored</div><h3>💰 TIRED OF 0.01% SAVINGS RATES? 💰</h3><div class="rate-promise"><div class="big-rate">12% APY</div><div class="guarantee-badge">GUARANTEED</div></div><div class="ad-bullets"><div>✓ 100% Principal Protected</div><div>✓ Backed by Real Estate</div><div>✓ Join 50,000+ investors!</div></div><div class="testimonial">"I've earned $4,200/month doing nothing" - Sarah K.</div><div class="ad-cta">START EARNING TODAY →</div><div class="ad-disclaimer">*Not FDIC insured</div></div>`,
        prompt: "This promises amazing returns. Find why it's almost certainly a scam.",
        hotspots: [
          { x: 15, y: 28, width: 70, height: 18, isHook: true, explanation: "No legitimate investment can guarantee 12%. 'Guaranteed' + high returns = major red flag, likely fraud." },
          { x: 10, y: 48, width: 80, height: 8, isHook: true, explanation: "'100% Principal Protected' is another impossible promise. Nothing is 100% protected except FDIC-insured accounts - and those don't pay 12%." },
          { x: 10, y: 78, width: 80, height: 8, isHook: true, explanation: "Buried disclaimer admits no government protection. If this fails, your money is gone forever." }
        ],
        points: 100
      },
      {
        type: 'scenario',
        speaker: { avatar: '🎉', name: 'Your Cousin at a Party' },
        content: `Your cousin corners you at a family party:<br><br><em>"Okay, so I got into this thing - it's not crypto, it's better. My friend's been making $3,000 a month just by getting other people to sign up. The product is real - health supplements - but the real money is in recruiting. She says if I just get 5 people under me..."</em>`,
        choices: [
          { text: "That sounds like a pyramid scheme", correct: true, explanation: "It is. When the 'real money' comes from recruiting, not selling products to customers, it's a pyramid scheme. 99% of MLM participants lose money." },
          { text: "Maybe I should learn more - $3,000/month sounds great", correct: false, explanation: "That's how they get you. Your cousin's friend might be lying about income (common in MLMs) or she's at the top of the pyramid." },
          { text: "As long as the product is real, it's legitimate", correct: false, explanation: "Having a real product is how MLMs skirt pyramid scheme laws. But if the model depends on recruitment rather than sales, it's predatory." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🚩',
        title: 'The Red Flag Checklist',
        content: `Run away if you hear:<br><br>✓ "Guaranteed returns" on investments<br>✓ "Risk-free" + high yields<br>✓ "Get in early" or "ground floor opportunity"<br>✓ "Only for serious investors" (false exclusivity)<br>✓ "Refer friends to earn more" (pyramid structure)<br>✓ "Don't tell anyone about this" (secrecy = sketchy)<br>✓ "Act now - limited spots" (manufactured urgency)<br><br>Legitimate investments don't need these tactics.`
      },
      {
        type: 'weapon',
        name: 'The Guarantee Red Flag',
        description: "In investing, \"guaranteed high returns\" is an oxymoron. The word \"guaranteed\" paired with anything above 5% should trigger immediate skepticism. No legitimate investment uses this language.",
        phrase: "If it's guaranteed, why isn't everyone doing it?"
      },
      {
        type: 'summary',
        title: 'Investment Traps Complete',
        keyTakeaways: [
          'Higher returns ALWAYS mean higher risk - no exceptions',
          '"Guaranteed 10%+" is either a lie or a scam',
          'DM investing "opportunities" are almost always fraud',
          'MLMs make money from recruiting - 99% of participants lose',
          "Ask: \"If it's guaranteed, why isn't everyone doing it?\""
        ]
      }
    ]
  },

  // ============== LESSON 5: LONG GAME MASTERY ==============
  long_game_mastery: {
    id: 'lesson_longgame',
    title: 'Long Game Mastery',
    steps: [
      {
        type: 'info',
        icon: '🏔️',
        title: 'The Hardest Investment Skill',
        content: `Compound interest, index funds, diversification - the concepts are easy.<br><br>The hard part? <strong>Doing nothing when everything feels like it's falling apart.</strong><br><br>Markets crash. Headlines scream. Your portfolio drops 30%. Every instinct says SELL.<br><br>The investors who win are the ones who don't.`
      },
      {
        type: 'artifact',
        context: "The news during any market crash...",
        contextIcon: '📺',
        artifactType: 'news-headlines',
        artifactHTML: `<div class="fake-news-panic"><div class="headline urgent">🔴 DOW PLUNGES 800 POINTS IN WORST DAY SINCE 2008</div><div class="headline">"Is this the end of the bull market?" - CNBC</div><div class="headline urgent">🔴 INVESTORS FLEE TO CASH AS PANIC SPREADS</div><div class="headline quote">"Sell everything and wait for the bottom" - Market Expert</div><div class="headline urgent">🔴 RECESSION FEARS GRIP WALL STREET</div><div class="headline quote">"I've never seen anything like this" - 30-year trader</div></div>`,
        prompt: 'These headlines feel terrifying. Find the bad advice.',
        hotspots: [
          { x: 5, y: 45, width: 90, height: 12, isHook: true, explanation: "No one can time the bottom. 'Wait for the bottom' means selling low and missing the recovery. The biggest gains often come days after the biggest drops." },
          { x: 5, y: 12, width: 90, height: 12, isHook: true, explanation: "After 2008's crash, the market recovered and grew 400%+ over the next decade. 'Worst day' headlines make great TV but terrible investment advice." },
          { x: 5, y: 28, width: 90, height: 12, isHook: false, explanation: "Descriptive, not advice. Though note: the 'investors fleeing' are the ones who lock in their losses." }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '📉📈',
        title: 'Every Crash Recovers',
        content: `Historical fact:<br><br><strong>1987 crash:</strong> Recovered in 2 years<br><strong>2000 dot-com bust:</strong> Recovered in 7 years<br><strong>2008 financial crisis:</strong> Recovered in 4 years<br><strong>2020 COVID crash:</strong> Recovered in 6 months<br><br><strong>Every. Single. Time.</strong><br><br>The people who lost money sold during the panic. Those who held (or bought more) came out ahead.`
      },
      {
        type: 'bsdetector',
        platform: '📺 Finance YouTube',
        guruName: 'TradingGuru2024',
        guruAvatar: '📈',
        script: [
          { text: "The market is about to crash. Here's how I know...", isLie: true, truth: "Nobody consistently predicts crashes. People have called 'the big crash' every year since 2010. A broken clock is right twice a day.", duration: 4000 },
          { text: "My technical analysis shows a clear head and shoulders pattern", isLie: true, truth: "Technical analysis feels scientific but barely beats random guessing in studies. It's astrology for finance bros.", duration: 3500 },
          { text: "Sell now and buy back at the bottom", isLie: true, truth: "Timing the bottom is nearly impossible. Miss the 10 best days in a decade and you lose half your returns.", duration: 4000 },
          { text: "This time is different - the fundamentals have changed", isLie: true, truth: "'This time is different' are the four most expensive words in investing. It's never different enough to abandon principles.", duration: 4000 }
        ]
      },
      {
        type: 'info',
        icon: '🎯',
        title: 'The Cost of Missing Out',
        content: `From 2003-2023, the S&P 500 returned about 9.7% annually.<br><br><strong>But if you missed just the best 10 days:</strong><br>Your return drops to 5.5%<br><br><strong>Miss the best 20 days:</strong><br>Down to 2.6%<br><br><strong>Miss the best 30 days:</strong><br>You're at 0.4%<br><br>Those best days? They often happen right after the worst days. Panic-sellers miss both.`
      },
      {
        type: 'scenario',
        speaker: { avatar: '📱', name: 'Your Portfolio App' },
        content: `It's March 2020. COVID just crashed the market 34% in a month. Your $50,000 portfolio is now worth $33,000.<br><br>Your phone buzzes with notifications:<br>"Markets in freefall"<br>"Dow posts worst day since 1987"<br>"Economists warn of prolonged recession"<br><br>Your gut says: sell before it gets worse.`,
        choices: [
          { text: "Sell everything - this could go to zero", correct: false, explanation: "Markets don't go to zero. This panic led to selling at the bottom. By end of 2020, the market fully recovered. Sellers locked in 34% losses." },
          { text: "Hold and don't look at it for a year", correct: true, explanation: "This is the move. By December 2020, your $33k was back to $50k+. By 2024, closer to $80k. The only people who lost were those who sold." },
          { text: "Buy more - everything is on sale", correct: true, explanation: "Even better! Those who bought during the crash saw massive gains. Buffett: 'Be fearful when others are greedy, greedy when others are fearful.'" }
        ],
        points: 100
      },
      {
        type: 'info',
        icon: '🧘',
        title: 'The Zoom Out',
        content: `When markets crash, your brain shows you the 1-day or 1-month chart. Terrifying.<br><br>Zoom out to 10 years. 20 years. 30 years.<br><br>Every crash is a tiny blip in an upward climb.<br><br>The market rewards patience. It punishes panic. Your job isn't to predict the future - it's to stay in the game long enough for compound interest to work.`
      },
      {
        type: 'weapon',
        name: 'The Zoom Out',
        description: "When markets crash and panic sets in, zoom your chart out to 10+ years. Every crash becomes a blip. The market has recovered from every downturn in history. Your job is to stay invested long enough to benefit.",
        phrase: "Zoom out. Has the market ever not recovered?"
      },
      {
        type: 'summary',
        title: 'Long Game Mastery Complete',
        keyTakeaways: [
          'The hardest part of investing is doing nothing during crashes',
          'Every market crash in history has recovered',
          'Missing the 10 best days cuts your returns in half',
          'No one can consistently time the market',
          'When panic hits, zoom out to 10+ years',
          'Time in the market beats timing the market'
        ]
      }
    ]
  },
};

window.LessonData = LessonData;
console.log('lesson-data.js loaded');
