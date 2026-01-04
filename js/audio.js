// ============================================================
// SHARKFIN AUDIO MANAGER
// Handles all sound effects and audio feedback
// ============================================================

const AudioManager = {
  enabled: true,
  volume: 0.5,
  audioContext: null,
  sounds: {},
  
  // Initialize audio context (must be called after user interaction)
  init() {
    if (this.audioContext) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.loadPreference();
      console.log('🔊 AudioManager initialized');
    } catch (e) {
      console.warn('Web Audio API not supported');
      this.enabled = false;
    }
  },
  
  // Load preference from localStorage
  loadPreference() {
    const saved = localStorage.getItem('sharkfin_audio');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
    const vol = localStorage.getItem('sharkfin_volume');
    if (vol !== null) {
      this.volume = parseFloat(vol);
    }
  },
  
  // Save preference
  savePreference() {
    localStorage.setItem('sharkfin_audio', this.enabled.toString());
    localStorage.setItem('sharkfin_volume', this.volume.toString());
  },
  
  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    this.savePreference();
    
    // Play a test sound when enabling
    if (this.enabled) {
      this.play('click');
    }
    
    return this.enabled;
  },
  
  // Set volume (0-1)
  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.savePreference();
  },
  
  // ============================================================
  // SOUND SYNTHESIS
  // All sounds are generated procedurally - no external files needed
  // ============================================================
  
  play(soundName) {
    if (!this.enabled || !this.audioContext) return;
    
    // Resume context if suspended (browser policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    const soundFn = this.soundLibrary[soundName];
    if (soundFn) {
      try {
        soundFn.call(this);
      } catch (e) {
        console.warn('Sound play error:', e);
      }
    }
  },
  
  // Helper to create oscillator
  createOsc(type, freq, startTime, duration, gain = 0.3) {
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(gain * this.volume, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
    
    return { osc, gainNode };
  },
  
  // Helper to create noise
  createNoise(duration, gain = 0.1) {
    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    noise.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    
    gainNode.gain.setValueAtTime(gain * this.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    noise.start();
    
    return { noise, gainNode };
  },
  
  // ============================================================
  // SOUND LIBRARY
  // ============================================================
  
  soundLibrary: {
    // UI Clicks and Taps
    click() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 800, t, 0.08, 0.15);
      this.createOsc('sine', 1200, t + 0.02, 0.06, 0.1);
    },
    
    tap() {
      const t = this.audioContext.currentTime;
      this.createOsc('triangle', 600, t, 0.05, 0.12);
    },
    
    // Navigation
    navigate() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 400, t, 0.1, 0.12);
      this.createOsc('sine', 600, t + 0.05, 0.1, 0.1);
    },
    
    back() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 600, t, 0.1, 0.12);
      this.createOsc('sine', 400, t + 0.05, 0.1, 0.1);
    },
    
    // Lesson Progression
    stepForward() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 523, t, 0.08, 0.15); // C5
      this.createOsc('sine', 659, t + 0.06, 0.1, 0.12); // E5
    },
    
    lessonStart() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 392, t, 0.15, 0.15); // G4
      this.createOsc('sine', 523, t + 0.1, 0.15, 0.15); // C5
      this.createOsc('sine', 659, t + 0.2, 0.2, 0.12); // E5
    },
    
    // Choice/Answer Feedback
    correct() {
      const t = this.audioContext.currentTime;
      // Bright ascending arpeggio
      this.createOsc('sine', 523, t, 0.12, 0.2); // C5
      this.createOsc('sine', 659, t + 0.08, 0.12, 0.18); // E5
      this.createOsc('sine', 784, t + 0.16, 0.15, 0.15); // G5
      this.createOsc('sine', 1047, t + 0.24, 0.2, 0.12); // C6
    },
    
    incorrect() {
      const t = this.audioContext.currentTime;
      // Low buzzy descend
      this.createOsc('sawtooth', 200, t, 0.15, 0.12);
      this.createOsc('sawtooth', 150, t + 0.1, 0.2, 0.1);
      this.createNoise(0.1, 0.05);
    },
    
    partial() {
      const t = this.audioContext.currentTime;
      // Neutral two-tone
      this.createOsc('triangle', 440, t, 0.12, 0.15);
      this.createOsc('triangle', 392, t + 0.1, 0.15, 0.12);
    },
    
    // Rewards and Achievements
    coinEarn() {
      const t = this.audioContext.currentTime;
      // Classic coin sound
      this.createOsc('square', 988, t, 0.05, 0.15); // B5
      this.createOsc('square', 1319, t + 0.05, 0.15, 0.12); // E6
    },
    
    xpGain() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 659, t, 0.08, 0.12);
      this.createOsc('sine', 880, t + 0.06, 0.12, 0.1);
    },
    
    levelUp() {
      const t = this.audioContext.currentTime;
      // Triumphant fanfare
      this.createOsc('sine', 523, t, 0.15, 0.2); // C5
      this.createOsc('sine', 659, t + 0.12, 0.15, 0.2); // E5
      this.createOsc('sine', 784, t + 0.24, 0.15, 0.2); // G5
      this.createOsc('sine', 1047, t + 0.36, 0.3, 0.25); // C6
      this.createOsc('sine', 1319, t + 0.36, 0.3, 0.15); // E6 (harmony)
    },
    
    weaponUnlock() {
      const t = this.audioContext.currentTime;
      // Epic weapon reveal
      this.createNoise(0.3, 0.08); // Swoosh
      this.createOsc('sine', 220, t, 0.3, 0.15); // Low rumble
      this.createOsc('sine', 440, t + 0.15, 0.15, 0.2);
      this.createOsc('sine', 880, t + 0.25, 0.2, 0.25);
      this.createOsc('sine', 1320, t + 0.35, 0.25, 0.2);
      this.createOsc('triangle', 1760, t + 0.45, 0.3, 0.15); // Shimmer
    },
    
    skillComplete() {
      const t = this.audioContext.currentTime;
      // Completion jingle
      this.createOsc('sine', 523, t, 0.1, 0.2);
      this.createOsc('sine', 659, t + 0.1, 0.1, 0.2);
      this.createOsc('sine', 784, t + 0.2, 0.1, 0.2);
      this.createOsc('sine', 1047, t + 0.3, 0.25, 0.25);
      // Harmony
      this.createOsc('sine', 659, t + 0.3, 0.25, 0.12);
      this.createOsc('sine', 784, t + 0.3, 0.25, 0.12);
    },
    
    // Lesson Complete Grades
    gradeS() {
      const t = this.audioContext.currentTime;
      // Triumphant S-rank fanfare
      this.createOsc('sine', 392, t, 0.12, 0.2);
      this.createOsc('sine', 523, t + 0.1, 0.12, 0.2);
      this.createOsc('sine', 659, t + 0.2, 0.12, 0.2);
      this.createOsc('sine', 784, t + 0.3, 0.15, 0.25);
      this.createOsc('sine', 1047, t + 0.4, 0.3, 0.3);
      // Shimmer
      this.createOsc('triangle', 2093, t + 0.5, 0.2, 0.1);
      this.createOsc('triangle', 2637, t + 0.55, 0.2, 0.08);
    },
    
    gradeA() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 523, t, 0.12, 0.2);
      this.createOsc('sine', 659, t + 0.1, 0.12, 0.2);
      this.createOsc('sine', 784, t + 0.2, 0.15, 0.2);
      this.createOsc('sine', 1047, t + 0.3, 0.25, 0.2);
    },
    
    gradeB() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 440, t, 0.12, 0.15);
      this.createOsc('sine', 523, t + 0.1, 0.12, 0.15);
      this.createOsc('sine', 659, t + 0.2, 0.2, 0.15);
    },
    
    gradeC() {
      const t = this.audioContext.currentTime;
      this.createOsc('triangle', 349, t, 0.15, 0.12);
      this.createOsc('triangle', 440, t + 0.12, 0.2, 0.12);
    },
    
    // Interactive Elements
    sliderMove() {
      const t = this.audioContext.currentTime;
      const freq = 300 + Math.random() * 200;
      this.createOsc('sine', freq, t, 0.03, 0.08);
    },
    
    hotspotReveal() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 600, t, 0.08, 0.12);
      this.createOsc('sine', 900, t + 0.04, 0.1, 0.1);
    },
    
    hotspotHook() {
      const t = this.audioContext.currentTime;
      // Warning/danger hotspot
      this.createOsc('sawtooth', 300, t, 0.08, 0.1);
      this.createOsc('sawtooth', 250, t + 0.06, 0.1, 0.08);
    },
    
    // BS Detector
    lieReveal() {
      const t = this.audioContext.currentTime;
      // Alarm-like reveal
      this.createOsc('square', 440, t, 0.08, 0.12);
      this.createOsc('square', 554, t + 0.08, 0.08, 0.12);
      this.createOsc('square', 440, t + 0.16, 0.08, 0.12);
    },
    
    truthReveal() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 523, t, 0.1, 0.12);
    },
    
    // Gauntlet
    gauntletStart() {
      const t = this.audioContext.currentTime;
      // Tense countdown feel
      this.createOsc('sine', 220, t, 0.2, 0.15);
      this.createOsc('sine', 277, t + 0.15, 0.2, 0.15);
      this.createOsc('sine', 330, t + 0.3, 0.2, 0.15);
      this.createOsc('sine', 440, t + 0.45, 0.3, 0.2);
    },
    
    gauntletAdvance() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 523, t, 0.08, 0.15);
      this.createOsc('sine', 784, t + 0.05, 0.1, 0.12);
    },
    
    gauntletTrap() {
      const t = this.audioContext.currentTime;
      // Trap triggered - warning sound
      this.createOsc('sawtooth', 150, t, 0.15, 0.12);
      this.createNoise(0.1, 0.06);
    },
    
    gauntletEscape() {
      const t = this.audioContext.currentTime;
      // Victory escape
      this.createOsc('sine', 523, t, 0.1, 0.2);
      this.createOsc('sine', 659, t + 0.08, 0.1, 0.2);
      this.createOsc('sine', 784, t + 0.16, 0.1, 0.2);
      this.createOsc('sine', 1047, t + 0.24, 0.2, 0.25);
      this.createNoise(0.15, 0.05); // Celebration burst
    },
    
    // Simulation
    simStart() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 330, t, 0.15, 0.15);
      this.createOsc('sine', 440, t + 0.1, 0.15, 0.15);
      this.createOsc('sine', 550, t + 0.2, 0.2, 0.12);
    },
    
    simEnd() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 550, t, 0.15, 0.15);
      this.createOsc('sine', 440, t + 0.1, 0.15, 0.15);
      this.createOsc('sine', 330, t + 0.2, 0.2, 0.12);
    },
    
    // Typing/Text
    typeChar() {
      const t = this.audioContext.currentTime;
      const freq = 800 + Math.random() * 400;
      this.createOsc('square', freq, t, 0.02, 0.03);
    },
    
    // Alerts/Warnings
    warning() {
      const t = this.audioContext.currentTime;
      this.createOsc('sawtooth', 440, t, 0.1, 0.15);
      this.createOsc('sawtooth', 440, t + 0.15, 0.1, 0.15);
    },
    
    error() {
      const t = this.audioContext.currentTime;
      this.createOsc('sawtooth', 200, t, 0.2, 0.15);
      this.createOsc('sawtooth', 150, t + 0.15, 0.25, 0.12);
    },
    
    // Streak
    streakIncrease() {
      const t = this.audioContext.currentTime;
      this.createOsc('sine', 880, t, 0.08, 0.15);
      this.createOsc('sine', 1174, t + 0.06, 0.12, 0.12);
    }
  }
};

// Auto-init on first user interaction
['click', 'touchstart', 'keydown'].forEach(event => {
  document.addEventListener(event, function initAudio() {
    AudioManager.init();
    document.removeEventListener(event, initAudio);
  }, { once: true });
});

// Export for use
window.AudioManager = AudioManager;s
