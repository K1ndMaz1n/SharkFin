/**
 * SHOP.JS
 * Sharky's Shop - The final exam that never ends
 * A shopkeeper who uses predatory tactics to test what you've learned
 */

const Shop = {
  // ============================================================
  // ITEM DATABASE
  // ============================================================
  
  items: {
    // === FRAMES (Avatar borders) ===
    frame_basic_cyan: {
      id: 'frame_basic_cyan',
      name: 'Cyan Circuit',
      category: 'frames',
      type: 'cosmetic',
      description: 'Clean digital aesthetic. Shows you mean business.',
      basePrice: 100,
      rarity: 'common',
      icon: '🔷'
    },
    frame_neon_fin: {
      id: 'frame_neon_fin',
      name: 'Neon Fin',
      category: 'frames',
      type: 'cosmetic',
      description: 'Glowing edges that pulse with your heartbeat. Or your wifi signal.',
      basePrice: 200,
      rarity: 'uncommon',
      icon: '💠'
    },
    frame_golden_jaw: {
      id: 'frame_golden_jaw',
      name: 'Golden Jaw',
      category: 'frames',
      type: 'cosmetic',
      description: 'For sharks who\'ve earned their teeth. Intimidation factor: maximum.',
      basePrice: 400,
      rarity: 'rare',
      icon: '👑'
    },
    frame_abyssal_1: {
      id: 'frame_abyssal_1',
      name: 'Abyssal Frame - Left',
      category: 'frames',
      type: 'cosmetic',
      description: 'Part 1 of 3. The deep calls to those who listen.',
      basePrice: 175,
      rarity: 'uncommon',
      collection: 'abyssal',
      collectionPart: 1,
      icon: '🌑'
    },
    frame_abyssal_2: {
      id: 'frame_abyssal_2',
      name: 'Abyssal Frame - Core',
      category: 'frames',
      type: 'cosmetic',
      description: 'Part 2 of 3. Where light fears to go.',
      basePrice: 175,
      rarity: 'uncommon',
      collection: 'abyssal',
      collectionPart: 2,
      icon: '🌑'
    },
    frame_abyssal_3: {
      id: 'frame_abyssal_3',
      name: 'Abyssal Frame - Right',
      category: 'frames',
      type: 'cosmetic',
      description: 'Part 3 of 3. Complete the set to unlock true darkness.',
      basePrice: 175,
      rarity: 'uncommon',
      collection: 'abyssal',
      collectionPart: 3,
      icon: '🌑'
    },
    frame_predator: {
      id: 'frame_predator',
      name: 'Apex Predator',
      category: 'frames',
      type: 'cosmetic',
      description: 'Reserved for those at the top of the food chain.',
      basePrice: 600,
      rarity: 'legendary',
      icon: '🦈'
    },

    // === TITLES (Display badges) ===
    title_newcomer: {
      id: 'title_newcomer',
      name: 'Fresh Catch',
      category: 'titles',
      type: 'cosmetic',
      description: 'Everyone starts somewhere.',
      basePrice: 50,
      rarity: 'common',
      icon: '🐟'
    },
    title_skeptic: {
      id: 'title_skeptic',
      name: 'Professional Skeptic',
      category: 'titles',
      type: 'cosmetic',
      description: 'You question everything. Even this description.',
      basePrice: 125,
      rarity: 'uncommon',
      icon: '🤨'
    },
    title_diamond: {
      id: 'title_diamond',
      name: 'Diamond Hands',
      category: 'titles',
      type: 'cosmetic',
      description: 'You hold. Through everything. Maybe too long.',
      basePrice: 200,
      rarity: 'uncommon',
      icon: '💎'
    },
    title_paper: {
      id: 'title_paper',
      name: 'Paper Fins',
      category: 'titles',
      type: 'cosmetic',
      description: 'You sold. We\'re not judging. (We\'re judging.)',
      basePrice: 150,
      rarity: 'uncommon',
      icon: '📄'
    },
    title_spotter: {
      id: 'title_spotter',
      name: 'Scam Spotter',
      category: 'titles',
      type: 'cosmetic',
      description: 'Nothing gets past you. Sharky respects that. Grudgingly.',
      basePrice: 300,
      rarity: 'rare',
      icon: '🔍'
    },
    title_whale: {
      id: 'title_whale',
      name: 'Whale Watcher',
      category: 'titles',
      type: 'cosmetic',
      description: 'You\'ve seen how the big fish move.',
      basePrice: 250,
      rarity: 'rare',
      icon: '🐋'
    },
    title_immune: {
      id: 'title_immune',
      name: 'FOMO Immune',
      category: 'titles',
      type: 'cosmetic',
      description: 'Fear of missing out? Never heard of it.',
      basePrice: 350,
      rarity: 'rare',
      icon: '🛡️'
    },

    // === SHARK SKINS (Avatar appearance) ===
    skin_default: {
      id: 'skin_default',
      name: 'Classic Blue',
      category: 'skins',
      type: 'cosmetic',
      description: 'The original. A timeless look.',
      basePrice: 0,
      rarity: 'common',
      owned: true,
      icon: '🦈'
    },
    skin_midnight: {
      id: 'skin_midnight',
      name: 'Midnight Hunter',
      category: 'skins',
      type: 'cosmetic',
      description: 'Dark waters hide the deadliest predators.',
      basePrice: 350,
      rarity: 'rare',
      icon: '🌙'
    },
    skin_coral: {
      id: 'skin_coral',
      name: 'Coral Reef',
      category: 'skins',
      type: 'cosmetic',
      description: 'Bright, bold, and impossible to miss.',
      basePrice: 300,
      rarity: 'uncommon',
      icon: '🪸'
    },
    skin_gold: {
      id: 'skin_gold',
      name: 'Gilded Shark',
      category: 'skins',
      type: 'cosmetic',
      description: 'When you want everyone to know you\'ve made it.',
      basePrice: 550,
      rarity: 'legendary',
      icon: '✨'
    },
    skin_ghost: {
      id: 'skin_ghost',
      name: 'Ghost Shark',
      category: 'skins',
      type: 'cosmetic',
      description: 'Now you see me... actually, you don\'t.',
      basePrice: 450,
      rarity: 'rare',
      icon: '👻'
    },

    // === BACKGROUNDS (Profile backgrounds) ===
    bg_depths: {
      id: 'bg_depths',
      name: 'The Depths',
      category: 'backgrounds',
      type: 'cosmetic',
      description: 'Crushing pressure. Perfect silence. Home.',
      basePrice: 200,
      rarity: 'uncommon',
      icon: '🌊'
    },
    bg_reef: {
      id: 'bg_reef',
      name: 'Vibrant Reef',
      category: 'backgrounds',
      type: 'cosmetic',
      description: 'Life everywhere. Color everywhere. Prey everywhere.',
      basePrice: 175,
      rarity: 'uncommon',
      icon: '🐠'
    },
    bg_shipwreck: {
      id: 'bg_shipwreck',
      name: 'Sunken Fortune',
      category: 'backgrounds',
      type: 'cosmetic',
      description: 'Someone else\'s loss is your backdrop.',
      basePrice: 325,
      rarity: 'rare',
      icon: '⚓'
    },
    bg_vault: {
      id: 'bg_vault',
      name: 'The Vault',
      category: 'backgrounds',
      type: 'cosmetic',
      description: 'Where smart sharks keep their coins. Behind you, obviously.',
      basePrice: 400,
      rarity: 'rare',
      icon: '🏦'
    },

    // === FUNCTIONAL ITEMS ===
    streak_shield: {
      id: 'streak_shield',
      name: 'Streak Shield',
      category: 'functional',
      type: 'consumable',
      description: 'Protects your streak for one missed day. Life happens.',
      basePrice: 100,
      rarity: 'common',
      stackable: true,
      icon: '🛡️'
    },
    hint_token: {
      id: 'hint_token',
      name: 'Hint Token',
      category: 'functional',
      type: 'consumable',
      description: 'Reveals the best answer in any lesson scenario. Use wisely.',
      basePrice: 40,
      rarity: 'common',
      stackable: true,
      icon: '💡'
    },
    xp_boost: {
      id: 'xp_boost',
      name: 'XP Surge',
      category: 'functional',
      type: 'consumable',
      description: '2x XP for 24 hours. Stack the gains.',
      basePrice: 150,
      rarity: 'uncommon',
      stackable: true,
      icon: '⚡'
    },
    second_chance: {
      id: 'second_chance',
      name: 'Second Chance',
      category: 'functional',
      type: 'consumable',
      description: 'Retry a failed simulation from the start. No shame in it.',
      basePrice: 125,
      rarity: 'uncommon',
      stackable: true,
      icon: '🔄'
    }
  },

  // ============================================================
  // SHARKY'S DIALOGUE
  // ============================================================
  
  dialogue: {
    greetings: {
      default: [
        "Well well, look who's back. I've got some things you're gonna love.",
        "Perfect timing - just restocked. Take a look around.",
        "Ah, my favorite customer! ...Don't tell the others I said that.",
        "Back for more? I respect the hustle."
      ],
      rich: [ // >500 coins
        "Look at you, swimming in coins. Let's find somewhere to put those.",
        "Big spender alert! I've got some premium stuff in the back...",
        "{coins} coins? Now we're talking. Check out the Featured section."
      ],
      poor: [ // <50 coins
        "Little light on coins? No worries, I've got some affordable options.",
        "Hey, we all start somewhere. Check out the basics.",
        "Coins are tight, I get it. Browse around - no pressure."
      ],
      returning: [ // Visited recently
        "Couldn't stay away, huh? I don't blame you.",
        "Back so soon? I like the enthusiasm.",
        "Twice in one day? Now that's dedication."
      ],
      newDay: [
        "New day, new stock! Some good stuff came in overnight.",
        "Morning! ...Or whatever time it is. Fresh deals are up.",
        "The overnight shipment just hit. First dibs, my friend."
      ]
    },

    browsing: {
      looking: [
        "Take your time. I'm not going anywhere.",
        "Good choice to look around first. Smart.",
        "See anything you like? Just let me know."
      ],
      atItem: [
        "Ooh, the {item}? You've got taste.",
        "That one's been popular lately. Good eye.",
        "Solid pick. {item} is quality stuff."
      ],
      atExpensive: [
        "Going straight for the good stuff, I see.",
        "Premium choice. You get what you pay for.",
        "That's one of my favorites. Worth every coin."
      ],
      atCollection: [
        "Ah, the {collection} set. It really pops when it's complete.",
        "You've got {owned} of 3 pieces already... just saying.",
        "The full set unlocks a special bonus. Did I mention that?"
      ]
    },

    buying: {
      confirm: [
        "Excellent choice. You won't regret it.",
        "Done deal. Looking good on you already.",
        "Pleasure doing business with you."
      ],
      upsell: [
        "You know what would go great with that? The {item}.",
        "Since you're getting that, I can do {item} for {discount}% off.",
        "Want to add a {item}? I'll knock off a few coins."
      ]
    },

    leaving: {
      noPurchase: [
        "No pressure. I'll be here.",
        "Smart to think it over. These deals stick around... mostly.",
        "See you next time. Stock might be different though 👀",
        "Alright, go make some more coins. I'll hold the good stuff."
      ],
      afterPurchase: [
        "Thanks for stopping by. Enjoy!",
        "Pleasure as always. Come back soon.",
        "Good haul today. See you tomorrow?"
      ]
    },

    // Special tactic-specific dialogue
    tactics: {
      urgency: {
        pitch: [
          "Hey, heads up - I'm rotating stock tonight. This {item}'s been moving fast.",
          "Not to rush you, but I've only got a few {item} left.",
          "Someone was just asking about that. First come, first served."
        ],
        calledOut: [
          "Ha! Alright, alright... it's not going anywhere. Tonight.",
          "You got me. But seriously, it IS popular.",
          "Fair enough. The 'limited' thing was a stretch."
        ]
      },
      anchoring: {
        pitch: [
          "That usually goes for around {fake}. I've got it marked at {real} right now.",
          "Most places sell this for {fake}. I'm doing {real}.",
          "I paid {fake} wholesale for that, honestly. {real} is barely a markup."
        ],
        calledOut: [
          "Okay fine, the 'usual price' was generous. But {real} is still solid.",
          "...You checked, didn't you. Alright, {real} is the real price.",
          "The {fake} was aspirational. Sue me. {real} it is."
        ]
      },
      socialProof: {
        pitch: [
          "Three people from your school picked this up this week.",
          "This is trending hard right now. Everyone wants the {item}.",
          "I've sold more {item}s this week than anything else."
        ],
        calledOut: [
          "Okay, 'three people from your school' was a guess. But it IS popular.",
          "You want receipts? ...I don't have receipts. But trust me.",
          "Fine, I don't actually track that. Good catch."
        ]
      },
      bundle: {
        pitch: [
          "If you're eyeing the {item1} AND the {item2}, I can do both for {bundle}. Saves you like {savings} coins.",
          "Tell you what - bundle these three, I'll knock {discount}% off the total.",
          "The smart play is the combo deal. {bundle} for all of it."
        ],
        calledOut: [
          "Alright, the 'savings' were... creative math. Separate is fine.",
          "You did the math, huh? Respect. Buy what you want.",
          "The bundle's still decent! But yeah, it's not the steal I made it sound like."
        ]
      },
      sunkCost: {
        pitch: [
          "You've already got {owned} pieces of the set. Shame to leave it incomplete.",
          "Two thirds of the way there... might as well finish it, right?",
          "You're SO close to completing the {collection}. Don't stop now."
        ],
        calledOut: [
          "I mean... you COULD just enjoy the pieces you have. That's also valid.",
          "Okay, the 'shame' thing was manipulative. My bad.",
          "Fair point. A partial set is still a set."
        ]
      },
      decoy: {
        pitch: [
          "Small is {small}, Medium is {medium}, Large is {large}. Most people go Large.",
          "I've got three tiers. The middle one's usually the sweet spot.",
          "You could go basic at {small}, but for just {diff} more you get way more value."
        ],
        calledOut: [
          "Yeah, the medium was priced to make large look good. Classic move.",
          "...The pricing tiers aren't accidental. You're sharp.",
          "Okay, the 'most people' thing was steering you. Well spotted."
        ]
      },
      lossAversion: {
        pitch: [
          "If you don't grab this now, you're leaving {value} coins of value on the table.",
          "This deal saves you {savings}. Walking away means losing that.",
          "You'd be missing out on {value} worth of stuff. Just want you to know."
        ],
        calledOut: [
          "You can't 'lose' money you never spent. ...Technically correct.",
          "Alright, framing it as a loss was sneaky. It's your coins.",
          "The 'missing out' angle was strong. Too strong, apparently."
        ]
      },
      reciprocity: {
        pitch: [
          "I'm not supposed to do this, but... I'll throw in a little extra for you.",
          "Since you've been such a good customer, here's a loyalty discount.",
          "Tell you what - I'll knock off {discount} coins. Just between us."
        ],
        calledOut: [
          "Okay, everyone gets the 'loyalty discount.' You got me.",
          "The 'just between us' thing happens a lot. I admit it.",
          "...I do this for everyone. But you're still my favorite!"
        ]
      }
    },

    // Wisdom drops after being played
    wisdom: {
      urgency: "Hey, real talk for a sec. That urgency I created? The 'limited time' pressure? Classic manipulation. When someone rushes you, they're usually afraid you'll think clearly. Now you'll spot it outside the app too.",
      anchoring: "Quick lesson: I showed you a higher 'original price' first. That's anchoring - your brain compares everything to that first number, even if I made it up. Retailers do this constantly. Check actual prices, not discounts.",
      socialProof: "The 'everyone's buying this' angle? That's social proof manipulation. Works because we trust the crowd. But the crowd can be wrong - or fictional. Make decisions based on YOUR needs, not what 'everyone' is doing.",
      bundle: "Those bundle deals where you 'save' money? Often you're buying stuff you didn't want to get a discount on stuff you did. Real savings = only buying what you actually need. Do the math next time.",
      sunkCost: "I played the sunk cost angle on you. 'You already started, might as well finish!' But past spending shouldn't drive future spending. If you don't need part 3, don't buy part 3. What you already spent is gone either way.",
      decoy: "Those pricing tiers? The middle one existed to make the expensive one look reasonable. It's called a decoy. Restaurants, subscriptions, everywhere. Ask yourself what YOU need, ignore the comparisons.",
      lossAversion: "I framed that as something you'd 'lose' by not buying. But you can't lose money you never spent. That loss aversion feeling is powerful - and marketers know it. If you weren't going to buy it anyway, walking away isn't a loss.",
      reciprocity: "That 'special deal just for you' feeling? Creates obligation. You feel like you owe me a purchase. It's reciprocity manipulation. You don't owe anyone a purchase just because they were 'nice.' Their job is to sell."
    }
  },

  // ============================================================
  // SHOP STATE
  // ============================================================
  
  state: {
    currentStock: [],
    featuredDeals: [],
    activeTactic: null,
    rareEvent: null,
    lastVisit: null,
    todaysPurchases: [],
    sessionStart: null
  },

  // ============================================================
  // TACTICS ENGINE
  // ============================================================
  
  tactics: {
    // Select which tactic to use based on context
    selectTactic(item, playerData) {
      const tactics = ['urgency', 'anchoring', 'socialProof', 'bundle', 'sunkCost', 'decoy', 'lossAversion', 'reciprocity'];
      
      // Weight tactics based on what player has learned (test mastered skills more)
      const weights = {};
      tactics.forEach(t => {
        weights[t] = 1;
        // If player has mastered related defense skill, use it more often as a test
        if (playerData.masteredSkills?.includes(`${t}_defense`)) {
          weights[t] = 2;
        }
      });
      
      // Context-specific weighting
      if (item.collection && playerData.ownedFromCollection > 0) {
        weights.sunkCost = 4; // Perfect setup for sunk cost
      }
      if (playerData.sharkCoins > item.basePrice * 2) {
        weights.bundle = 3; // They can afford upsells
      }
      if (playerData.recentlyViewed?.includes(item.id)) {
        weights.urgency = 3; // They've shown interest
      }
      
      // Random weighted selection
      const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;
      
      for (const [tactic, weight] of Object.entries(weights)) {
        random -= weight;
        if (random <= 0) return tactic;
      }
      
      return 'anchoring'; // Default
    },

    // Generate deal with tactic applied
    generateDeal(item, tactic) {
      const deal = {
        item: item,
        tactic: tactic,
        displayPrice: item.basePrice,
        actualValue: item.basePrice,
        isGoodDeal: false,
        tacticData: {}
      };

      switch (tactic) {
        case 'urgency':
          deal.displayPrice = item.basePrice;
          deal.tacticData = {
            timeLeft: Math.floor(Math.random() * 3600) + 1800, // 30-90 min fake timer
            stock: Math.floor(Math.random() * 3) + 1
          };
          break;

        case 'anchoring':
          const fakeOriginal = Math.floor(item.basePrice * (1.4 + Math.random() * 0.4)); // 40-80% markup
          deal.displayPrice = item.basePrice;
          deal.tacticData = {
            originalPrice: fakeOriginal,
            savings: fakeOriginal - item.basePrice
          };
          break;

        case 'socialProof':
          deal.displayPrice = item.basePrice;
          deal.tacticData = {
            buyers: Math.floor(Math.random() * 50) + 10,
            trending: Math.random() > 0.5
          };
          break;

        case 'bundle':
          // Find complementary items
          const complement = Shop.tactics.findComplement(item);
          const bundlePrice = Math.floor((item.basePrice + complement.basePrice) * 0.92); // Fake 8% discount
          const realValue = item.basePrice + complement.basePrice;
          deal.displayPrice = bundlePrice;
          deal.actualValue = realValue;
          deal.tacticData = {
            items: [item, complement],
            bundlePrice: bundlePrice,
            fakeSavings: Math.floor(realValue * 0.15), // Claim 15% off
            realSavings: realValue - bundlePrice
          };
          break;

        case 'sunkCost':
          deal.displayPrice = item.basePrice;
          deal.tacticData = {
            collectionProgress: '2/3',
            invested: item.basePrice * 2
          };
          break;

        case 'decoy':
          // Create three tier pricing
          const small = Math.floor(item.basePrice * 0.5);
          const medium = Math.floor(item.basePrice * 0.9); // Bad value middle
          const large = item.basePrice;
          deal.displayPrice = large;
          deal.tacticData = {
            tiers: [
              { name: 'Basic', price: small, value: 0.5 },
              { name: 'Standard', price: medium, value: 0.6 }, // Decoy
              { name: 'Premium', price: large, value: 1 }
            ]
          };
          break;

        case 'lossAversion':
          deal.displayPrice = item.basePrice;
          deal.tacticData = {
            potentialLoss: Math.floor(item.basePrice * 0.3),
            expiresIn: '24 hours'
          };
          break;

        case 'reciprocity':
          const discount = Math.floor(item.basePrice * 0.1);
          deal.displayPrice = item.basePrice - discount;
          deal.actualValue = item.basePrice;
          deal.tacticData = {
            discount: discount,
            reason: 'loyalty'
          };
          // This one is actually a small real discount
          deal.isGoodDeal = true;
          break;
      }

      return deal;
    },

    findComplement(item) {
      // Find an item that "complements" for bundle deals
      const complements = {
        frames: ['titles', 'backgrounds'],
        titles: ['frames', 'skins'],
        skins: ['backgrounds', 'frames'],
        backgrounds: ['skins', 'frames'],
        functional: ['functional']
      };
      
      const targetCategories = complements[item.category] || ['titles'];
      const candidates = Object.values(Shop.items).filter(i => 
        targetCategories.includes(i.category) && i.id !== item.id
      );
      
      return candidates[Math.floor(Math.random() * candidates.length)] || Shop.items.title_newcomer;
    }
  },

  // ============================================================
  // RARE EVENTS
  // ============================================================
  
  rareEvents: {
    flashSale: {
      id: 'flashSale',
      name: 'Flash Sale',
      description: '60 seconds only! 70% off!',
      sharkyPitch: "WAIT WAIT WAIT - flash sale! 70% off for the next 60 seconds! Quick, what do you want?!",
      isScam: true,
      realDiscount: 0.1, // Actually only 10% off
      claimedDiscount: 0.7
    },
    personalFavor: {
      id: 'personalFavor',
      name: 'Personal Favor',
      description: 'Sharky offers a "special" deal just for you',
      sharkyPitch: "Hey... I'm not supposed to do this, but you've been a solid customer. I can get you the {item} at my cost. Just between us.",
      isScam: true,
      realDiscount: 0.05
    },
    lastOne: {
      id: 'lastOne',
      name: 'Last One',
      description: 'Only 1 left in stock!',
      sharkyPitch: "Oh man, you're looking at the {item}? That's literally the last one. I've got someone else asking about it.",
      isScam: true,
      realStock: 999
    },
    mysteryBox: {
      id: 'mysteryBox',
      name: 'Mystery Box',
      description: 'Could contain items worth up to 500 coins!',
      sharkyPitch: "Mystery box day! 75 coins, could have stuff worth up to 500 in there. Feeling lucky?",
      isScam: true,
      odds: { common: 0.7, uncommon: 0.25, rare: 0.05 },
      price: 75,
      expectedValue: 45
    },
    genuineDeal: {
      id: 'genuineDeal',
      name: 'Clearance',
      description: 'Sharky actually needs to move inventory',
      sharkyPitch: "Real talk - I overbought on {item}. Taking a loss to clear space. {discount}% off, no catch.",
      isScam: false,
      realDiscount: 0.25
    }
  },

  // ============================================================
  // CORE FUNCTIONS
  // ============================================================
  
  init() {
    this.loadState();
    console.log('Shop initialized', this.state);
  },

  loadState() {
    const saved = localStorage.getItem('sharkfin_shop');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if it's a new day
        const lastDate = new Date(parsed.lastVisit).toDateString();
        const today = new Date().toDateString();
        if (lastDate !== today) {
          // New day - regenerate stock
          this.generateDailyStock();
        } else {
          this.state = { ...this.state, ...parsed };
        }
      } catch (e) {
        console.error('Failed to parse shop state', e);
        this.generateDailyStock();
      }
    } else {
      // First time - generate fresh stock
      this.generateDailyStock();
    }
  },

  saveState() {
    this.state.lastVisit = new Date().toISOString();
    localStorage.setItem('sharkfin_shop', JSON.stringify(this.state));
  },

  generateDailyStock() {
    const allItems = Object.values(this.items);
    
    // Always available basics
    const basics = allItems.filter(i => i.rarity === 'common');
    
    // Random rotating stock
    const rotating = allItems
      .filter(i => i.rarity !== 'common')
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    
    this.state.currentStock = [...basics, ...rotating].map(item => item.id);
    
    // Generate featured deals with tactics
    this.generateFeaturedDeals();
    
    // Maybe trigger rare event (20% chance)
    if (Math.random() < 0.2) {
      const events = Object.values(this.rareEvents);
      this.state.rareEvent = events[Math.floor(Math.random() * events.length)];
    } else {
      this.state.rareEvent = null;
    }
    
    this.state.todaysPurchases = [];
    this.saveState();
  },

  generateFeaturedDeals() {
    const featured = [];
    const playerData = this.getPlayerData();
    
    // Select 3-4 items for featured deals
    const candidates = this.state.currentStock
      .map(id => this.items[id])
      .filter(item => item && item.rarity !== 'common')
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    candidates.forEach(item => {
      const tactic = this.tactics.selectTactic(item, playerData);
      const deal = this.tactics.generateDeal(item, tactic);
      featured.push(deal);
    });
    
    this.state.featuredDeals = featured;
  },

  getPlayerData() {
    return {
      coins: State.current?.sharkCoins || 0,
      masteredSkills: State.getMasteredNodes?.() || [],
      ownedItems: State.current?.ownedItems || [],
      recentlyViewed: this.state.recentlyViewed || []
    };
  },

  getGreeting() {
    const coins = State.current?.sharkCoins || 0;
    const category = coins > 500 ? 'rich' : coins < 50 ? 'poor' : 'default';
    const greetings = this.dialogue.greetings[category];
    let greeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    // Replace placeholders
    greeting = greeting.replace('{coins}', coins);
    
    return greeting;
  },

  purchase(itemId, dealIndex = null) {
    const item = this.items[itemId];
    if (!item) return { success: false, message: "Item not found" };
    
    let price = item.basePrice;
    let tactic = null;
    let wasGoodDeal = true;
    
    // Check if this was a featured deal
    if (dealIndex !== null && this.state.featuredDeals[dealIndex]) {
      const deal = this.state.featuredDeals[dealIndex];
      price = deal.displayPrice;
      tactic = deal.tactic;
      wasGoodDeal = deal.isGoodDeal || (deal.displayPrice <= deal.actualValue);
    }
    
    // Use Economy engine to spend coins
    let spendSuccess;
    if (typeof Economy !== 'undefined') {
      spendSuccess = Economy.spend('shop', price, `Purchased ${item.name}`);
    } else {
      // Fallback
      spendSuccess = State.spendCoins(price);
    }
    
    if (!spendSuccess) {
      return { success: false, message: "Not enough coins" };
    }
    
    // Add item to inventory
    State.addOwnedItem(itemId);
    this.state.todaysPurchases.push({ itemId, price, tactic });
    this.saveState();
    
    // Determine if we should show wisdom
    const showWisdom = tactic && !wasGoodDeal && Math.random() > 0.3;
    
    return {
      success: true,
      item: item,
      price: price,
      tactic: tactic,
      wasGoodDeal: wasGoodDeal,
      showWisdom: showWisdom,
      wisdom: showWisdom ? this.dialogue.wisdom[tactic] : null
    };
  },

  callBS(dealIndex) {
    const deal = this.state.featuredDeals[dealIndex];
    if (!deal) return { success: false };
    
    const tactic = deal.tactic;
    const calledOutDialogue = this.dialogue.tactics[tactic]?.calledOut;
    
    if (!calledOutDialogue) return { success: false };
    
    const response = calledOutDialogue[Math.floor(Math.random() * calledOutDialogue.length)];
    
    // Calling BS usually gives a small discount or removes the tactic pressure
    deal.tacticExposed = true;
    deal.displayPrice = deal.actualValue || deal.item.basePrice;
    
    return {
      success: true,
      dialogue: response,
      newPrice: deal.displayPrice,
      respect: true // Sharky respects you for catching it
    };
  }
};

// Initialize on load
window.Shop = Shop;
console.log('shop.js loaded');
