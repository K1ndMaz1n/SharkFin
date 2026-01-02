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
  // WEALTH CURRENTS - 5 LESSONS
  // ============================================================

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
