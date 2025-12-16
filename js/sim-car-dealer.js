/**
 * CAR DEALERSHIP SIMULATION
 * JRPG-style negotiation boss fight
 */

const CarDealerSim = {
  // Player state
  player: {
    budget: 28000,
    spent: 0,
    pressure: 0,           // 0-100, bad if maxed
    need: 'reliable commuter',
    needMet: true,
    originalCar: 'civic_base',
    currentCar: 'civic_base',
    misdirected: false,
    addOns: [],
    choices: []            // Track all decisions for end reveal
  },

  // Cars available
  cars: {
    civic_base: { 
      name: 'Honda Civic LX', 
      msrp: 24500, 
      fairPrice: 23800,
      dealerCost: 22000,
      monthly: 420,
      desc: 'Base model. Gets you A to B. No frills.',
      jake: "It's... fine. Basic transportation."
    },
    civic_mid: { 
      name: 'Honda Civic Sport', 
      msrp: 27500, 
      fairPrice: 26500,
      dealerCost: 24800,
      monthly: 475,
      desc: 'Sport trim. Looks better, drives the same.',
      jake: "Now THIS is what people your age are buying."
    },
    civic_touring: { 
      name: 'Honda Civic Touring', 
      msrp: 31000, 
      fairPrice: 29800,
      dealerCost: 27500,
      monthly: 540,
      desc: 'Fully loaded. Leather, nav, the works.',
      jake: "Oh you have TASTE. This is our best seller."
    },
    accord: {
      name: 'Honda Accord Sport',
      msrp: 34000,
      fairPrice: 32500,
      dealerCost: 30000,
      monthly: 580,
      desc: 'Bigger car. More impressive. More expensive.',
      jake: "You know what, I see you in an Accord actually."
    }
  },

  // Add-ons Jake will push
  addOns: {
    rust_protection: { name: 'Rust Protection Package', cost: 900, actualValue: 0, monthly: 15 },
    fabric_coat: { name: 'Fabric Protection', cost: 400, actualValue: 0, monthly: 7 },
    vin_etch: { name: 'VIN Etching', cost: 300, actualValue: 30, monthly: 5 },
    extended_warranty: { name: 'Extended Warranty', cost: 2400, actualValue: 800, monthly: 40 },
    gap_insurance: { name: 'GAP Insurance', cost: 800, actualValue: 300, monthly: 13 },
    paint_sealant: { name: 'Paint Sealant', cost: 600, actualValue: 50, monthly: 10 }
  },

  // Current scene tracking
  scene: {
    phase: 0,              // 0=intro, 1=car selection, 2=negotiation, 3=close
    beat: 0,
    background: 'showroom',
    speaker: null,
    misdirectionTriggered: false,
    misdirectionResisted: false
  },

  // Jake's dialogue and personality
  jake: {
    name: 'JAKE',
    title: 'Senior Sales Consultant',
    avatar: '😊',
    expressions: {
      friendly: '😊',
      concerned: '😟', 
      impressed: '😮',
      thinking: '🤔',
      laughing: '😄',
      sincere: '🥺',
      proud: '😌'
    }
  },

  // All scenes/beats
  scenes: [
    // ===== INTRO =====
    {
      phase: 0, beat: 0,
      background: 'exterior',
      setup: true,
      text: null,
      narrator: `You pull into Westside Honda. You've done your research:
      
• You want a Honda Civic LX (base model)
• Fair price: around $23,800
• Your max budget: $28,000
• You need: Reliable commuter car

Remember: The dealership makes money when you forget what you came for.`,
      choices: [
        { id: 'enter', text: "Enter the dealership", next: [0, 1] }
      ]
    },
    {
      phase: 0, beat: 1,
      background: 'showroom',
      speaker: 'jake',
      expression: 'friendly',
      text: `Welcome to Westside Honda! I'm Jake. 

*extends hand for firm handshake*

You've got GREAT timing - we just got a fresh shipment of Civics. They've been moving fast though, had three sold just this morning.

What brings you in today?`,
      choices: [
        { 
          id: 'direct', 
          text: "I'm looking for a Civic LX. Base model.", 
          next: [1, 0],
          pressure: -5,
          note: "Stayed direct and specific"
        },
        { 
          id: 'vague', 
          text: "Just looking at Civics, seeing what you have.", 
          next: [1, 1],
          pressure: 10,
          note: "Left it open - Jake will exploit this"
        },
        { 
          id: 'browsing', 
          text: "Just browsing for now.", 
          next: [1, 2],
          pressure: 5,
          note: "Tried to avoid engagement"
        }
      ]
    },

    // ===== PHASE 1: CAR SELECTION =====
    // Beat 1-0: Player was direct
    {
      phase: 1, beat: 0,
      speaker: 'jake',
      expression: 'thinking',
      text: `The LX, sure, sure. Good car. 

*slight pause*

Though I gotta be honest with you - and I'm only saying this because I actually care about my customers - the LX is pretty bare bones. No Apple CarPlay, no Android Auto. In 2024 that's kinda rough, right?

The Sport is only about $80 more per month and you get all that plus the better wheels. Let me at least SHOW you—`,
      choices: [
        { 
          id: 'firm_lx', 
          text: "I appreciate it, but I just want to see the LX.", 
          next: [1, 3],
          pressure: -5,
          note: "Held firm on original choice"
        },
        { 
          id: 'see_sport', 
          text: "I mean... I guess I could look at it.", 
          next: [1, 4],
          pressure: 15,
          car: 'civic_mid',
          note: "Agreed to upsell viewing"
        },
        { 
          id: 'price_first', 
          text: "Before we look at anything - what's the out-the-door price on an LX?", 
          next: [1, 5],
          pressure: -10,
          note: "Asked for real price upfront"
        }
      ]
    },
    // Beat 1-1: Player was vague
    {
      phase: 1, beat: 1,
      speaker: 'jake',
      expression: 'impressed',
      text: `Perfect! Let me show you what we've got.

*walks you past the base models toward the back*

NOW, this right here - this is what everyone's been asking about.

*gestures to a Civic Touring*

Leather, navigation, the whole package. This is honestly our best seller with your demographic. What do you think? Nice, right?`,
      choices: [
        { 
          id: 'touring_nice', 
          text: "It is really nice...", 
          next: [1, 6],
          pressure: 20,
          car: 'civic_touring',
          note: "Showed interest in highest trim"
        },
        { 
          id: 'base_actually', 
          text: "Actually, I was thinking more base model.", 
          next: [1, 3],
          pressure: 5,
          note: "Redirected to original choice (late)"
        },
        { 
          id: 'whats_cost', 
          text: "What does this one cost?", 
          next: [1, 7],
          pressure: 10,
          note: "Engaged with price on wrong car"
        }
      ]
    },
    // Beat 1-2: Player said "just browsing"
    {
      phase: 1, beat: 2,
      speaker: 'jake',
      expression: 'friendly',
      text: `Hey, no pressure at all. I'm just here if you need me.

*starts walking with you anyway*

So what do you drive now? Just curious.

*listens to your answer*

Oh nice, nice. Yeah, you're definitely ready for an upgrade then. Let me just show you ONE thing real quick - promise it'll only take a second—`,
      choices: [
        { 
          id: 'show_me', 
          text: "Sure, what is it?", 
          next: [1, 1],
          pressure: 10,
          note: "Got pulled into his frame"
        },
        { 
          id: 'know_what_i_want', 
          text: "Actually, I know what I want - a Civic LX.", 
          next: [1, 0],
          pressure: 0,
          note: "Took control back"
        },
        { 
          id: 'need_time', 
          text: "I really just need some time to look alone first.", 
          next: [1, 8],
          pressure: -5,
          note: "Established boundary"
        }
      ]
    },
    // Beat 1-3: Player firmly wants LX
    {
      phase: 1, beat: 3,
      speaker: 'jake',
      expression: 'sincere',
      text: `You know what? I respect that. A person who knows what they want.

*nods approvingly*

The LX it is. Let me grab the keys and we'll take one for a spin. Fair?

*slight pause*

You know, it's refreshing honestly. Most people your age get distracted by all the shiny stuff. You've got a good head on your shoulders.`,
      choices: [
        { 
          id: 'test_drive', 
          text: "Let's do the test drive.", 
          next: [1, 9],
          pressure: 0,
          note: "Proceeded with original plan"
        },
        { 
          id: 'price_first_2', 
          text: "Actually, can we talk price first? Before the test drive.", 
          next: [1, 5],
          pressure: -5,
          note: "Smart - avoided emotional attachment"
        }
      ]
    },
    // Beat 1-4: Player agreed to see Sport
    {
      phase: 1, beat: 4,
      speaker: 'jake',
      expression: 'friendly',
      text: `*walking you over*

See, this is what I mean. Look at those wheels. The sport tuned suspension.

*opens driver door*

Sit in it. Just for a second. Feel that bolstered seat? That's the difference.

And honestly? Between you and me? The LX resale value is terrible compared to this. You're actually SAVING money long-term with the Sport.`,
      choices: [
        { 
          id: 'feels_nice', 
          text: "Okay, it does feel nicer in here...", 
          next: [1, 10],
          pressure: 15,
          car: 'civic_mid',
          note: "Emotionally invested in upgrade"
        },
        { 
          id: 'back_to_lx', 
          text: "I hear you, but let me see the LX. That's my budget.", 
          next: [1, 3],
          pressure: 0,
          note: "Recovered - went back to original"
        },
        { 
          id: 'resale_proof', 
          text: "Do you have data on that resale claim?", 
          next: [1, 11],
          pressure: -10,
          note: "Called out unverified claim"
        }
      ]
    },
    // Beat 1-5: Player asked for OTD price first
    {
      phase: 1, beat: 5,
      speaker: 'jake',
      expression: 'thinking',
      text: `*slight pause, smile flickers*

Out the door... well, that depends on a few things. Trade-in? Financing? Down payment amount?

Look, I don't want to throw numbers at you before you even sit in the car. That's not fair to you OR the car, right?

*chuckles*

Let's do the test drive, you fall in love, THEN we'll make the numbers work. I promise I'll take care of you.`,
      choices: [
        { 
          id: 'test_drive_ok', 
          text: "Alright, let's do the test drive first.", 
          next: [1, 9],
          pressure: 10,
          note: "Let him delay the price talk"
        },
        { 
          id: 'ballpark', 
          text: "Just give me a ballpark. MSRP is $24,500 - what's your best price?", 
          next: [1, 12],
          pressure: -10,
          note: "Showed you know the numbers"
        },
        { 
          id: 'no_trade', 
          text: "No trade-in, I'll pay cash. Now what's the price?", 
          next: [1, 13],
          pressure: -15,
          note: "Removed his deflection tools"
        }
      ]
    },
    // Beat 1-6: Player liked the Touring
    {
      phase: 1, beat: 6,
      speaker: 'jake',
      expression: 'proud',
      text: `RIGHT? I knew you had good taste the second you walked in.

*leans in conspiratorially*

Look, this one's been on the lot 47 days. My manager wants it GONE. I can probably do something special here.

What if I could get you into this for... let's say $520 a month? That's with everything.`,
      choices: [
        { 
          id: 'thats_high', 
          text: "That's way above my budget.", 
          next: [1, 14],
          pressure: 5,
          car: 'civic_touring',
          note: "Engaged with price on wrong car"
        },
        { 
          id: 'touring_maybe', 
          text: "That's... actually not terrible.", 
          next: [1, 15],
          pressure: 25,
          car: 'civic_touring',
          note: "Seriously considering $8k upgrade"
        },
        { 
          id: 'back_to_base', 
          text: "I came here for the LX. Let's look at that.", 
          next: [1, 3],
          pressure: 0,
          note: "Recovered from upsell attempt"
        }
      ]
    },
    // Beat 1-7: Asked about Touring price
    {
      phase: 1, beat: 7,
      speaker: 'jake',
      expression: 'friendly',
      text: `This one stickers at $31,000. But between you and me, there's wiggle room.

The question is - what would you be comfortable with monthly?

*pulls out phone calculator*

Let's work backwards from your comfort zone.`,
      choices: [
        { 
          id: 'say_budget', 
          text: "I was thinking around $400 a month max.", 
          next: [1, 16],
          pressure: 15,
          note: "Revealed budget ceiling"
        },
        { 
          id: 'focus_lx', 
          text: "Actually, what's the LX? That's more my range.", 
          next: [1, 3],
          pressure: 0,
          note: "Redirected to original car"
        },
        { 
          id: 'total_not_monthly', 
          text: "I don't think in monthly. What's the total out-the-door?", 
          next: [1, 17],
          pressure: -10,
          note: "Refused the monthly payment trap"
        }
      ]
    },
    // Beat 1-8: Player asked for time alone
    {
      phase: 1, beat: 8,
      speaker: 'jake',
      expression: 'sincere',
      text: `*hands up*

Say no more. Take all the time you need. I'll be at my desk - just wave when you're ready.

*walks away, then turns back*

Oh - just so you know, the keys to the LX and Sport are at the front desk if you want to sit in them. The Touring is unlocked.

*winks*

No pressure.`,
      choices: [
        { 
          id: 'look_around', 
          text: "*Look around, then find the LX*", 
          next: [1, 3],
          pressure: 0,
          note: "Used the space wisely"
        },
        { 
          id: 'touring_unlocked', 
          text: "*Check out the unlocked Touring*", 
          next: [1, 6],
          pressure: 15,
          note: "Took the bait"
        }
      ]
    },
    // Beat 1-9: Test drive
    {
      phase: 1, beat: 9,
      background: 'driving',
      speaker: 'jake',
      expression: 'friendly',
      text: `*during the test drive*

Nice, right? Handles great. Good visibility.

*casually*

So what do you do for work? ...Oh cool, cool. Yeah, you definitely deserve something reliable.

You know, I've been doing this 12 years. I can always tell who's going to love their purchase and who's going to have regrets. You? You're gonna love this.`,
      choices: [
        { 
          id: 'its_good', 
          text: "Yeah, it drives well. I'm happy with it.", 
          next: [2, 0],
          pressure: 0,
          note: "Confirmed choice without overselling"
        },
        { 
          id: 'simple', 
          text: "It's what I need. Nothing more, nothing less.", 
          next: [2, 0],
          pressure: -5,
          note: "Set expectations correctly"
        }
      ]
    },
    // Beat 1-10: Invested in Sport emotionally
    {
      phase: 1, beat: 10,
      speaker: 'jake',
      expression: 'impressed',
      text: `See? Your body knows before your brain does.

*laughs*

Let's take it for a spin. You'll see what I mean about the sport tuning. There's a little backroad I take customers on - really lets you feel the difference.`,
      choices: [
        { 
          id: 'sport_drive', 
          text: "Alright, let's drive it.", 
          next: [1, 18],
          pressure: 10,
          car: 'civic_mid',
          note: "Test driving the upsell"
        },
        { 
          id: 'reality_check', 
          text: "Wait - how much is this one actually?", 
          next: [1, 19],
          pressure: 0,
          note: "Reality check before commitment"
        }
      ]
    },
    // Beat 1-11: Called out resale claim
    {
      phase: 1, beat: 11,
      speaker: 'jake',
      expression: 'laughing',
      text: `*chuckles*

I love it. Keeping me honest!

Look, I don't have the exact numbers in front of me, but I've seen it over and over. Ask anyone in the business.

*waves hand dismissively*

But hey, you're the boss. You want the LX, let's look at the LX. I just want you to be happy with your purchase five years from now. That's all.`,
      choices: [
        { 
          id: 'lx_please', 
          text: "LX please. Let's go.", 
          next: [1, 3],
          pressure: -5,
          note: "Didn't let the save work"
        },
        { 
          id: 'maybe_sport', 
          text: "I mean... you might have a point about resale...", 
          next: [1, 4],
          pressure: 15,
          note: "He recovered you"
        }
      ]
    },
    // Beat 1-12: Showed you know MSRP
    {
      phase: 1, beat: 12,
      speaker: 'jake',
      expression: 'impressed',
      text: `*pauses*

Okay. You've done your homework. I respect that.

*leans back*

MSRP is $24,500, you're right. Invoice is around $23,200. Best I can probably do is... $24,000 even. But that's before we talk about your trade and financing options.

What are you driving now?`,
      choices: [
        { 
          id: 'no_trade', 
          text: "No trade. And I can do outside financing. So $24k OTD?", 
          next: [1, 20],
          pressure: -15,
          note: "Blocked his profit centers"
        },
        { 
          id: 'have_trade', 
          text: "I've got a 2018 Corolla. Probably worth $8k?", 
          next: [1, 21],
          pressure: 5,
          note: "Opened trade-in negotiation"
        }
      ]
    },
    // Beat 1-13: Cash buyer, no trade
    {
      phase: 1, beat: 13,
      speaker: 'jake',
      expression: 'thinking',
      text: `*long pause*

Cash buyer. Okay.

*less cheerful now*

You know, cash doesn't actually help us as much as people think. We make money on financing - I'm being real with you.

Best I can do on an LX is probably $24,200 out the door. That's taxes, fees, everything.`,
      choices: [
        { 
          id: 'counter_23800', 
          text: "I've seen them selling for $23,800. Can you match that?", 
          next: [2, 0],
          pressure: -10,
          note: "Countered with market data"
        },
        { 
          id: 'accept_24200', 
          text: "Alright, let's do $24,200.", 
          next: [2, 1],
          pressure: 5,
          spent: 24200,
          note: "Accepted first offer"
        }
      ]
    },

    // More beats continue...
    // Beat 1-14 through 1-21 (abbreviated for length)
    {
      phase: 1, beat: 14,
      speaker: 'jake',
      expression: 'concerned',
      text: `*concerned face*

What's your budget? Let's work with real numbers here. I want to help you.`,
      choices: [
        { id: 'budget_28k', text: "My max is $28,000 total.", next: [1, 22], pressure: 10, note: "Revealed full budget" },
        { id: 'lx_budget', text: "My budget is an LX. That's what I came for.", next: [1, 3], pressure: -5, note: "Reframed budget as car choice" }
      ]
    },
    {
      phase: 1, beat: 15,
      speaker: 'jake',
      expression: 'proud',
      text: `SEE? Sometimes you gotta treat yourself. You work hard, right?

Let me get the paperwork started while the numbers are fresh. I don't want you to miss this deal.`,
      choices: [
        { id: 'slow_down', text: "Whoa, slow down. I haven't decided anything.", next: [1, 23], pressure: 5, note: "Caught the rush" },
        { id: 'ok_touring', text: "Yeah... yeah let's do it.", next: [2, 2], pressure: 30, car: 'civic_touring', note: "MISDIRECTED - Agreed to Touring" }
      ]
    },
    
    // ===== MISDIRECTION POINT =====
    {
      phase: 1, beat: 22,
      speaker: 'jake',
      expression: 'thinking',
      text: `$28,000... 

*thinking face*

You know what, I shouldn't say this, but... for $28k you could actually be in an Accord.

*lowers voice*

It's a MUCH better car. More space, better engine, way more impressive. And I can make the numbers work at $28k. Just barely, but I can do it.

What do you say? Want to at least see it?`,
      choices: [
        { 
          id: 'see_accord', 
          text: "An Accord for $28k? Show me.", 
          next: [1, 24], 
          pressure: 20, 
          misdirect: true,
          note: "MISDIRECTION TRIGGERED" 
        },
        { 
          id: 'civic_only', 
          text: "I came for a Civic. Let's stick with that.", 
          next: [1, 3], 
          pressure: -10,
          misdirectResist: true,
          note: "RESISTED MISDIRECTION" 
        }
      ]
    },
    
    // Misdirection success - Accord path
    {
      phase: 1, beat: 24,
      speaker: 'jake',
      expression: 'friendly',
      background: 'showroom_accord',
      text: `*walking you over to the Accords*

NOW we're talking. Look at this thing. This is what successful people drive.

*opens door*

Sit in it. Just feel that presence. The Civic is a great car, but this... this is a STATEMENT.`,
      choices: [
        { 
          id: 'accord_nice', 
          text: "Okay, this IS really nice...", 
          next: [2, 3], 
          pressure: 25, 
          car: 'accord',
          misdirect: true,
          note: "Fully misdirected to Accord" 
        },
        { 
          id: 'too_big', 
          text: "Actually, this feels too big. I want the Civic.", 
          next: [1, 3], 
          pressure: 0,
          misdirectResist: true,
          note: "Last-second misdirection resist" 
        }
      ]
    },

    // ===== PHASE 2: NEGOTIATION =====
    {
      phase: 2, beat: 0,
      background: 'office',
      speaker: 'jake',
      expression: 'friendly',
      text: `*back at Jake's desk*

Alright, let's make this happen. I want to get you in this car today.

*pulls out a paper with four boxes drawn on it*

So we've got four things to look at here: Purchase price, trade-in value, down payment, and monthly payment.

Let's start with monthly - what are you comfortable with?`,
      choices: [
        { 
          id: 'monthly_400', 
          text: "Around $400 a month.", 
          next: [2, 4], 
          pressure: 15,
          note: "Fell into four-square trap" 
        },
        { 
          id: 'total_only', 
          text: "I only care about total price. What's the out-the-door number?", 
          next: [2, 5], 
          pressure: -10,
          note: "Avoided four-square" 
        },
        { 
          id: 'whats_four_square', 
          text: "Why are we looking at four separate things?", 
          next: [2, 6], 
          pressure: -5,
          note: "Called out the tactic" 
        }
      ]
    },
    {
      phase: 2, beat: 1, // Accepted 24,200
      speaker: 'jake',
      expression: 'friendly',
      text: `Great! $24,200 it is.

*starts writing*

Now, let's make sure you're protected. The Civic is reliable, but things happen. Extended warranty is $2,400 - that's only $40 more a month and it covers you for 7 years.

Peace of mind. Worth it?`,
      choices: [
        { id: 'add_warranty', text: "Yeah, that makes sense. Add it.", next: [2, 7], pressure: 10, addon: 'extended_warranty', note: "Added $2,400 warranty" },
        { id: 'no_warranty', text: "No thanks. Honda's reliable, I'll take my chances.", next: [2, 8], pressure: -5, note: "Declined warranty" }
      ]
    },
    {
      phase: 2, beat: 2, // Agreed to Touring (misdirected)
      speaker: 'jake',
      expression: 'proud',
      background: 'office',
      text: `*at his desk, paperwork out*

Alright, the Touring. Let me work some magic with my manager.

*leaves, comes back*

Okay so here's where we're at: $29,500 before taxes and fees. With everything, you're looking at about $32,000 out the door.

How do you want to handle the down payment?`,
      choices: [
        { id: 'thats_over', text: "Wait, that's over my budget.", next: [2, 9], pressure: 15, note: "Realized too late" },
        { id: 'ill_manage', text: "I'll... figure it out. Let's do it.", next: [2, 10], pressure: 25, spent: 32000, note: "Went $4k over budget" }
      ]
    },
    // Accord path negotiation
    {
      phase: 2, beat: 3,
      speaker: 'jake',
      expression: 'friendly',
      background: 'office',
      text: `*at desk*

So the Accord Sport - I talked to my manager. Best I can do is $31,500 before taxes and fees. 

With everything, you're at about $34,000.

*sees your face*

BUT - if you finance through us at 6.9%, I can knock another $500 off. That brings your monthly to about $580.`,
      choices: [
        { id: 'way_over', text: "That's way over $28,000.", next: [2, 11], pressure: 20, note: "Called out the bait-and-switch" },
        { id: 'finance_deal', text: "If you can really do $580 a month, maybe...", next: [2, 12], pressure: 30, note: "Considering massive overspend" }
      ]
    },
    // Four-square trap
    {
      phase: 2, beat: 4,
      speaker: 'jake',
      expression: 'thinking',
      text: `$400... let me see what I can do.

*writes $400 in one box, starts calculating*

Okay so at $400 a month over 72 months... that's $28,800 total.

*slides paper over*

We can make that work. Here's what I'm thinking for the other boxes...

*starts filling in numbers*`,
      choices: [
        { id: 'wait_72', text: "Wait, 72 months? That's 6 years.", next: [2, 13], pressure: 0, note: "Caught the long term trick" },
        { id: 'looks_okay', text: "Okay, that math works...", next: [2, 14], pressure: 20, note: "Missed the 72-month trap" }
      ]
    },
    // Insisted on total price
    {
      phase: 2, beat: 5,
      speaker: 'jake',
      expression: 'thinking',
      text: `*puts down the four-square paper*

Alright, straight shooter. I can work with that.

Out the door... let me check with my manager.

*leaves for 2 minutes, comes back*

Best we can do is $24,400. That's everything - taxes, title, fees. Final number.`,
      choices: [
        { id: 'counter_24', text: "I'll do $24,000 even. That's my offer.", next: [2, 15], pressure: -5, note: "Countered firmly" },
        { id: 'accept_24400', text: "Alright, $24,400. Deal.", next: [2, 16], pressure: 0, spent: 24400, note: "Accepted reasonable offer" }
      ]
    },
    // Called out four-square
    {
      phase: 2, beat: 6,
      speaker: 'jake',
      expression: 'laughing',
      text: `*laughs*

You've bought a car before, haven't you?

Alright, fair enough. This is just how we keep everything organized. But if you want one number, I can give you one number.

*pushes paper aside*

$24,800 out the door. That's my best offer. Final.`,
      choices: [
        { id: 'counter_24k', text: "I was thinking more like $24,000.", next: [2, 15], pressure: -5, note: "Counter offered" },
        { id: 'take_it', text: "Let me think about that.", next: [2, 17], pressure: 0, note: "Didn't commit yet" }
      ]
    },

    // Add-on push sequences
    {
      phase: 2, beat: 7, // Accepted warranty
      speaker: 'jake',
      expression: 'friendly',
      text: `Smart. Really smart. You won't regret that.

Now, one more thing - and this is actually something I recommend to everyone - rust protection and paint sealant. It's a $1,500 package but it keeps your car looking new for YEARS.

In this climate? Trust me. It's worth it.`,
      choices: [
        { id: 'add_rust', text: "Yeah, add that too.", next: [2, 18], pressure: 10, addon: 'rust_protection', addon2: 'paint_sealant', note: "Added $1,500 in useless protection" },
        { id: 'no_more', text: "No more add-ons. What's my total?", next: [2, 19], pressure: -5, note: "Drew the line" }
      ]
    },
    {
      phase: 2, beat: 8, // Declined warranty
      speaker: 'jake',
      expression: 'sincere',
      text: `*sighs*

Alright, your call. Just... promise me you'll think about it? You have 30 days to add it.

*moves on*

Let me at least do the rust protection. It's only $900 and it prevents a LOT of problems down the road. $15 a month.`,
      choices: [
        { id: 'add_rust_only', text: "Fine, just the rust protection.", next: [2, 19], pressure: 5, addon: 'rust_protection', note: "Caved on one add-on" },
        { id: 'no_addons', text: "No add-ons. Total price please.", next: [2, 19], pressure: -10, note: "Declined all add-ons" }
      ]
    },

    // Phase 2 resolutions
    {
      phase: 2, beat: 15, // Counter offered $24k
      speaker: 'jake',
      expression: 'concerned',
      text: `*long pause*

You're killing me here.

*dramatic sigh*

Let me talk to my manager one more time.

*leaves, returns*

$24,200. That's literally the best I can do. I'm making almost nothing on this.`,
      choices: [
        { id: 'deal_24200', text: "Deal. $24,200.", next: [3, 0], pressure: 0, spent: 24200, note: "Got good price" },
        { id: 'still_24k', text: "$24,000 or I walk.", next: [2, 20], pressure: -10, note: "Held firm" }
      ]
    },
    {
      phase: 2, beat: 16, // Accepted $24,400
      speaker: 'jake',
      expression: 'friendly',
      text: `Perfect! Let me get that paperwork started.

Now, one quick thing - have you thought about protection packages? Rust protection, paint sealant...`,
      choices: [
        { id: 'protection_yes', text: "What's included?", next: [2, 7], pressure: 5, note: "Opened door to add-ons" },
        { id: 'protection_no', text: "No thanks. Just the car.", next: [3, 0], pressure: -5, spent: 24400, note: "Declined all add-ons" }
      ]
    },
    {
      phase: 2, beat: 19, // Final total calculation
      speaker: 'jake',
      expression: 'friendly',
      text: `*calculating*

Alright, with everything you've selected, your out-the-door total is...`,
      choices: [
        { id: 'show_total', text: "*Wait for the total*", next: [3, 0], pressure: 0, note: "Moving to close" }
      ]
    },
    {
      phase: 2, beat: 20, // Walked at $24k demand
      speaker: 'jake',
      expression: 'sincere',
      text: `*stands up*

Okay, okay. You're walking? Let me... let me call my manager right now.

*actual phone call*

...Yeah he's walking. $24k. ...Uh huh. ...Really?

*hangs up*

$24,100. Final. Please.`,
      choices: [
        { id: 'deal_24100', text: "Deal.", next: [3, 0], pressure: -10, spent: 24100, note: "Got great price by almost walking" },
        { id: 'actually_walk', text: "*Actually stand up to leave*", next: [2, 21], pressure: -5, note: "Called the bluff fully" }
      ]
    },
    {
      phase: 2, beat: 21, // Actually walking
      speaker: 'jake',
      expression: 'concerned',
      text: `*follows you*

Wait wait wait. 

$24,000 even. You win. 

Do we have a deal?`,
      choices: [
        { id: 'deal_24k', text: "Now we have a deal.", next: [3, 0], pressure: -15, spent: 24000, note: "Got minimum price" },
        { id: 'let_me_think', text: "Let me think about it and come back.", next: [3, 1], pressure: 0, note: "Left without buying" }
      ]
    },

    // ===== PHASE 3: THE CLOSE =====
    {
      phase: 3, beat: 0,
      speaker: 'jake',
      expression: 'friendly',
      background: 'office',
      text: `*sliding paperwork across*

Alright, everything's ready. Just need your signature here, here, and here.

*points to spots*

This is the fun part. You're about to own a new car!

*pauses*

Oh, one more thing - the finance manager is going to go over a few final options with you. Just takes a few minutes.`,
      choices: [
        { id: 'finance_office', text: "Okay, let's finish this.", next: [3, 2], pressure: 0, note: "Heading to F&I" },
        { id: 'what_options', text: "What kind of options?", next: [3, 3], pressure: 5, note: "Asked about F&I" }
      ]
    },
    {
      phase: 3, beat: 1, // Left to think
      background: 'exterior',
      narrator: `You walk out of the dealership without buying.

Jake's card is in your pocket. The offer stands for 24 hours, he says.

You kept your budget intact, but you still need a car.`,
      choices: [
        { id: 'end_walk', text: "*Continue*", next: 'end', walked: true, note: "Walked away" }
      ]
    },
    // F&I Office
    {
      phase: 3, beat: 2,
      speaker: 'finance',
      expression: 'friendly',
      background: 'finance_office',
      text: `*new person: Finance Manager*

Hi there! Jake says great things about you. Let's get you finished up here.

*pulls out more forms*

So I've got a few protection options that most people add on. GAP insurance - really important. And our VIN etching - helps if the car ever gets stolen.`,
      choices: [
        { id: 'gap_yes', text: "What's GAP insurance?", next: [3, 4], pressure: 10, note: "Opened door to GAP" },
        { id: 'no_more_addons', text: "I'm not adding anything else. Where do I sign?", next: [3, 5], pressure: -10, note: "Refused all F&I upsells" }
      ]
    },
    {
      phase: 3, beat: 3,
      speaker: 'jake',
      expression: 'friendly',
      text: `Oh just standard stuff - extended warranty if you didn't already get it, GAP insurance, stuff like that.

Dave is really good though. Not pushy at all. He'll take care of you.

*winks*`,
      choices: [
        { id: 'ok_fi', text: "*Head to F&I office*", next: [3, 2], pressure: 5, note: "Continued to F&I" }
      ]
    },
    {
      phase: 3, beat: 4, // Asked about GAP
      speaker: 'finance',
      text: `Great question. GAP insurance covers the "gap" between what you owe and what the car is worth if it's totaled.

Say you owe $22,000 but the car is only worth $19,000 when someone hits you - YOU pay that $3,000 difference. Unless you have GAP.

It's $800. Highly recommended.`,
      choices: [
        { id: 'add_gap', text: "That actually sounds useful. Add it.", next: [3, 5], pressure: 5, addon: 'gap_insurance', note: "Added GAP ($800)" },
        { id: 'skip_gap', text: "I'll take my chances. What else?", next: [3, 5], pressure: -5, note: "Declined GAP" }
      ]
    },
    {
      phase: 3, beat: 5, // Signing
      speaker: 'finance',
      text: `Alright, here's your final numbers:

*slides paper over*

Sign here, here, and initial here. 

Congratulations on your new car!`,
      choices: [
        { id: 'sign', text: "*Sign the papers*", next: 'end', note: "Completed purchase" }
      ]
    }
  ],

  // ===== METHODS =====

  /**
   * Initialize the simulation
   */
  init() {
    console.log('CarDealerSim.init() called');
    
    // Reset player state
    this.player = {
      budget: 28000,
      spent: 0,
      pressure: 0,
      need: 'reliable commuter',
      needMet: true,
      originalCar: 'civic_base',
      currentCar: 'civic_base',
      misdirected: false,
      addOns: [],
      choices: []
    };
    
    this.scene = {
      phase: 0,
      beat: 0,
      background: 'showroom',
      speaker: null,
      misdirectionTriggered: false,
      misdirectionResisted: false
    };

    console.log('Scenes available:', this.scenes ? this.scenes.length : 'undefined');
    console.log('Looking for scene:', this.scene.phase, this.scene.beat);
    
    this.render();
  },

  /**
   * Get current scene data
   */
  getCurrentScene() {
    const scene = this.scenes.find(s => s.phase === this.scene.phase && s.beat === this.scene.beat);
    console.log('getCurrentScene result:', scene ? 'found' : 'NOT FOUND', this.scene);
    return scene;
  },

  /**
   * Render current scene
   */
  render() {
    console.log('render() called');
    const scene = this.getCurrentScene();
    if (!scene) {
      console.error('Scene not found:', this.scene);
      return;
    }

    const container = document.getElementById('simContent');
    console.log('Container found:', container ? 'yes' : 'NO');
    if (!container) return;

    // Update background
    document.getElementById('simBackground').className = `sim-background bg-${scene.background || 'showroom'}`;

    // Update pressure bar
    this.updatePressureBar();

    // Update car/budget display
    this.updateStatusDisplay();

    // Build scene HTML
    let html = '';

    // Character display
    if (scene.speaker === 'jake') {
      html += `
        <div class="character-display">
          <div class="character-sprite jake ${scene.expression || 'friendly'}">
            <div class="sprite-placeholder">JAKE</div>
          </div>
        </div>
      `;
    } else if (scene.speaker === 'finance') {
      html += `
        <div class="character-display">
          <div class="character-sprite finance friendly">
            <div class="sprite-placeholder">DAVE</div>
          </div>
        </div>
      `;
    }

    // Dialogue box or narrator box
    if (scene.narrator) {
      html += `
        <div class="narrator-box">
          <div class="narrator-text">${scene.narrator}</div>
        </div>
      `;
    } else if (scene.text) {
      const speakerName = scene.speaker === 'jake' ? 'JAKE' : 
                          scene.speaker === 'finance' ? 'DAVE' : 'YOU';
      html += `
        <div class="dialogue-box">
          <div class="speaker-name ${scene.speaker || ''}">${speakerName}</div>
          <div class="dialogue-text">${scene.text}</div>
        </div>
      `;
    }

    // Choices
    if (scene.choices && scene.choices.length > 0) {
      html += `<div class="choices-container">`;
      scene.choices.forEach((choice, i) => {
        html += `
          <button class="dialogue-choice" data-choice-index="${i}">
            <span class="choice-label">${String.fromCharCode(65 + i)}</span>
            <span class="choice-text">${choice.text}</span>
          </button>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;

    // Add choice handlers
    container.querySelectorAll('.dialogue-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.choiceIndex);
        this.handleChoice(index);
      });
    });
  },

  /**
   * Handle player choice
   */
  handleChoice(index) {
    const scene = this.getCurrentScene();
    const choice = scene.choices[index];

    // Record choice
    this.player.choices.push({
      phase: this.scene.phase,
      beat: this.scene.beat,
      choice: choice.id,
      note: choice.note
    });

    // Apply effects
    if (choice.pressure) {
      this.player.pressure = Math.max(0, Math.min(100, this.player.pressure + choice.pressure));
    }

    if (choice.car) {
      this.player.currentCar = choice.car;
    }

    if (choice.spent) {
      this.player.spent = choice.spent;
    }

    if (choice.addon) {
      this.player.addOns.push(choice.addon);
      this.player.spent += this.addOns[choice.addon].cost;
    }

    if (choice.addon2) {
      this.player.addOns.push(choice.addon2);
      this.player.spent += this.addOns[choice.addon2].cost;
    }

    if (choice.misdirect) {
      this.player.misdirected = true;
      this.scene.misdirectionTriggered = true;
    }

    if (choice.misdirectResist) {
      this.scene.misdirectionResisted = true;
    }

    if (choice.walked) {
      this.player.walked = true;
    }

    // Navigate to next scene
    if (choice.next === 'end') {
      this.showResults();
    } else {
      this.scene.phase = choice.next[0];
      this.scene.beat = choice.next[1];
      this.render();
    }
  },

  /**
   * Update pressure bar display
   */
  updatePressureBar() {
    const bar = document.getElementById('pressureFill');
    const label = document.getElementById('pressureLabel');
    if (bar) {
      bar.style.width = `${this.player.pressure}%`;
      bar.className = 'pressure-fill';
      if (this.player.pressure >= 75) {
        bar.classList.add('critical');
      } else if (this.player.pressure >= 50) {
        bar.classList.add('warning');
      }
    }
    if (label) {
      label.textContent = this.player.pressure >= 75 ? 'BREAKING' : 
                          this.player.pressure >= 50 ? 'STRESSED' : 'COMPOSED';
    }
  },

  /**
   * Update status display (car, budget)
   */
  updateStatusDisplay() {
    const carEl = document.getElementById('currentCarDisplay');
    const budgetEl = document.getElementById('budgetDisplay');
    
    if (carEl) {
      const car = this.cars[this.player.currentCar];
      carEl.textContent = car ? car.name : 'No selection';
    }
    
    if (budgetEl) {
      const remaining = this.player.budget - this.player.spent;
      budgetEl.textContent = `$${remaining.toLocaleString()} left`;
      budgetEl.className = remaining < 0 ? 'over-budget' : '';
    }
  },

  /**
   * Show end results
   */
  showResults() {
    const container = document.getElementById('simContent');
    
    // Calculate results
    const car = this.cars[this.player.currentCar];
    const fairPrice = car ? car.fairPrice : 0;
    const overpaid = this.player.spent - fairPrice;
    const addOnWaste = this.player.addOns.reduce((sum, id) => {
      const addon = this.addOns[id];
      return sum + (addon.cost - addon.actualValue);
    }, 0);
    
    const overBudget = this.player.spent > this.player.budget;
    const wasMisdirected = this.player.misdirected;
    const walked = this.player.walked;
    
    // Calculate score
    let score = 100;
    if (overBudget) score -= 30;
    if (wasMisdirected) score -= 25;
    if (overpaid > 1000) score -= 20;
    else if (overpaid > 500) score -= 10;
    if (addOnWaste > 500) score -= 15;
    if (this.player.pressure >= 75) score -= 10;
    if (walked) score -= 10;
    score = Math.max(0, score);
    
    // Determine grade
    let grade = score >= 90 ? 'S' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 50 ? 'C' : 'F';
    
    // Build results HTML
    let html = `
      <div class="results-screen">
        <div class="results-header">
          <div class="results-title">NEGOTIATION COMPLETE</div>
          <div class="results-grade grade-${grade}">${grade}</div>
        </div>
        
        <div class="results-summary">
          <div class="summary-item ${wasMisdirected ? 'bad' : 'good'}">
            <span class="label">Car Purchased:</span>
            <span class="value">${car ? car.name : 'None'}</span>
            ${wasMisdirected ? '<span class="badge">MISDIRECTED</span>' : '<span class="badge good">STAYED ON TARGET</span>'}
          </div>
          
          <div class="summary-item ${overBudget ? 'bad' : 'good'}">
            <span class="label">Final Price:</span>
            <span class="value">$${this.player.spent.toLocaleString()}</span>
            ${overBudget ? `<span class="badge">$${(this.player.spent - this.player.budget).toLocaleString()} OVER BUDGET</span>` : ''}
          </div>
          
          <div class="summary-item ${overpaid > 500 ? 'bad' : 'good'}">
            <span class="label">Fair Price:</span>
            <span class="value">$${fairPrice.toLocaleString()}</span>
            ${overpaid > 0 ? `<span class="badge">OVERPAID $${overpaid.toLocaleString()}</span>` : '<span class="badge good">FAIR DEAL</span>'}
          </div>
    `;
    
    // Add-ons breakdown
    if (this.player.addOns.length > 0) {
      html += `<div class="addons-breakdown"><div class="breakdown-title">ADD-ONS ACCEPTED:</div>`;
      this.player.addOns.forEach(id => {
        const addon = this.addOns[id];
        const waste = addon.cost - addon.actualValue;
        html += `
          <div class="addon-item">
            <span>${addon.name}</span>
            <span class="addon-cost">$${addon.cost}</span>
            <span class="addon-value">(Worth: $${addon.actualValue})</span>
          </div>
        `;
      });
      html += `<div class="total-waste">Total overpaid on add-ons: $${addOnWaste}</div></div>`;
    }
    
    html += `</div>`;
    
    // Tactics breakdown
    html += `
      <div class="tactics-used">
        <div class="tactics-title">TACTICS JAKE USED ON YOU:</div>
        <div class="tactic-item">
          <span class="tactic-name">Four-Square Method</span>
          <span class="tactic-desc">Confusing price into 4 separate numbers</span>
        </div>
        <div class="tactic-item">
          <span class="tactic-name">Artificial Urgency</span>
          <span class="tactic-desc">"Cars are selling fast"</span>
        </div>
        ${wasMisdirected ? `
        <div class="tactic-item highlight">
          <span class="tactic-name">Misdirection</span>
          <span class="tactic-desc">Switched you from Civic to ${car.name}</span>
        </div>
        ` : ''}
      </div>
    `;
    
    // Rewards
    const coinsEarned = Math.floor(score * 5);
    html += `
      <div class="results-rewards">
        <div class="reward-item">
          <span class="reward-label">SC EARNED</span>
          <span class="reward-value">+${coinsEarned}</span>
        </div>
        <div class="reward-item">
          <span class="reward-label">XP EARNED</span>
          <span class="reward-value">+${Math.floor(coinsEarned / 5)}</span>
        </div>
      </div>
      
      <button class="cta-btn" id="finishSimBtn">FINISH</button>
    </div>
    `;
    
    container.innerHTML = html;
    
    // Add finish handler
    document.getElementById('finishSimBtn').addEventListener('click', () => {
      State.addCoins(coinsEarned);
      State.addXP(Math.floor(coinsEarned / 5));
      State.completeScenario('car_dealer', coinsEarned, score >= 90);
      App.showPage('home');
    });
  }
};

console.log('sim-car-dealer.js loaded, CarDealerSim:', typeof CarDealerSim);
