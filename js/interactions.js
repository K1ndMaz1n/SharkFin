// ============================================================
// SHARKFIN MICRO-INTERACTIONS
// Handles all visual feedback, celebrations, and polish
// ============================================================

const Interactions = {
  
  // ============================================================
  // PARTICLE SYSTEMS
  // ============================================================
  
  // Create a burst of particles at a position
  particleBurst(x, y, options = {}) {
    const defaults = {
      count: 12,
      colors: ['#4dd8e8', '#2ab5a0', '#7eecd3'],
      size: 8,
      spread: 80,
      duration: 800,
      gravity: 0.5
    };
    const opts = { ...defaults, ...options };
    
    const container = document.createElement('div');
    container.className = 'particle-container';
    container.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < opts.count; i++) {
      const particle = document.createElement('div');
      const angle = (i / opts.count) * Math.PI * 2;
      const velocity = 0.5 + Math.random() * 0.5;
      const color = opts.colors[Math.floor(Math.random() * opts.colors.length)];
      const size = opts.size * (0.5 + Math.random() * 0.5);
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 ${size}px ${color};
      `;
      container.appendChild(particle);
      
      // Animate
      const dx = Math.cos(angle) * opts.spread * velocity;
      const dy = Math.sin(angle) * opts.spread * velocity;
      
      particle.animate([
        { 
          transform: 'translate(0, 0) scale(1)', 
          opacity: 1 
        },
        { 
          transform: `translate(${dx}px, ${dy + opts.gravity * 50}px) scale(0)`, 
          opacity: 0 
        }
      ], {
        duration: opts.duration,
        easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
      });
    }
    
    setTimeout(() => container.remove(), opts.duration);
  },
  
  // Coin/reward burst animation
  coinBurst(x, y, amount = 1) {
    // Create coins
    for (let i = 0; i < Math.min(amount, 8); i++) {
      setTimeout(() => {
        this.createFloatingCoin(x + (Math.random() - 0.5) * 40, y);
      }, i * 50);
    }
    
    // Particle effect
    this.particleBurst(x, y, {
      colors: ['#d4af37', '#c9a456', '#ffd700'],
      count: 8,
      spread: 60
    });
  },
  
  createFloatingCoin(x, y) {
    const coin = document.createElement('div');
    coin.className = 'floating-coin';
    coin.textContent = '◆';
    coin.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: 24px;
      color: #d4af37;
      text-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(coin);
    
    coin.animate([
      { transform: 'translateY(0) scale(1)', opacity: 1 },
      { transform: 'translateY(-80px) scale(0.5)', opacity: 0 }
    ], {
      duration: 800,
      easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
    });
    
    setTimeout(() => coin.remove(), 800);
  },
  
  // XP gain floating text
  floatingText(x, y, text, color = '#4dd8e8') {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.textContent = text;
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-family: 'Orbitron', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: ${color};
      text-shadow: 0 0 10px ${color}40;
      pointer-events: none;
      z-index: 9999;
      transform: translateX(-50%);
    `;
    document.body.appendChild(el);
    
    el.animate([
      { transform: 'translateX(-50%) translateY(0) scale(1)', opacity: 1 },
      { transform: 'translateX(-50%) translateY(-50px) scale(1.2)', opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
    });
    
    setTimeout(() => el.remove(), 1000);
  },
  
  // ============================================================
  // SCREEN EFFECTS
  // ============================================================
  
  // Flash the screen (for correct/incorrect)
  screenFlash(color = 'rgba(42, 181, 160, 0.3)', duration = 300) {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    flash.style.cssText = `
      position: fixed;
      inset: 0;
      background: ${color};
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(flash);
    
    flash.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: duration,
      easing: 'ease-out'
    });
    
    setTimeout(() => flash.remove(), duration);
  },
  
  // Correct answer flash
  correctFlash() {
    this.screenFlash('rgba(42, 181, 160, 0.2)', 400);
  },
  
  // Incorrect answer flash
  incorrectFlash() {
    this.screenFlash('rgba(199, 93, 93, 0.2)', 400);
  },
  
  // Screen shake (for wrong answers or warnings)
  screenShake(intensity = 5, duration = 300) {
    const container = document.querySelector('.lesson-container') || document.body;
    const originalTransform = container.style.transform;
    
    const startTime = Date.now();
    const shake = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const decay = 1 - (elapsed / duration);
        const x = (Math.random() - 0.5) * intensity * decay;
        const y = (Math.random() - 0.5) * intensity * decay;
        container.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(shake);
      } else {
        container.style.transform = originalTransform;
      }
    };
    shake();
  },
  
  // ============================================================
  // BUTTON FEEDBACK
  // ============================================================
  
  // Ripple effect on button click
  ripple(event, element) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    ripple.animate([
      { width: '0px', height: '0px', opacity: 1 },
      { width: '300px', height: '300px', opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out'
    });
    
    setTimeout(() => ripple.remove(), 600);
  },
  
  // Success pulse on element
  successPulse(element) {
    element.animate([
      { boxShadow: '0 0 0 0 rgba(42, 181, 160, 0.7)' },
      { boxShadow: '0 0 0 20px rgba(42, 181, 160, 0)' }
    ], {
      duration: 600,
      easing: 'ease-out'
    });
  },
  
  // ============================================================
  // NUMBER ANIMATIONS
  // ============================================================
  
  // Animate a number counting up
  countUp(element, start, end, duration = 1000, prefix = '', suffix = '') {
    const startTime = Date.now();
    const diff = end - start;
    
    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (diff * eased));
      
      element.textContent = prefix + current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    update();
  },
  
  // Animate score/currency gain
  animateScoreGain(element, amount) {
    const current = parseInt(element.textContent.replace(/,/g, '')) || 0;
    this.countUp(element, current, current + amount, 800);
    
    // Add glow effect
    element.style.transition = 'text-shadow 0.3s';
    element.style.textShadow = '0 0 20px #d4af37';
    setTimeout(() => {
      element.style.textShadow = '';
    }, 500);
  },
  
  // ============================================================
  // LOADING & PROGRESS
  // ============================================================
  
  // Skeleton loading shimmer
  addShimmer(element) {
    element.classList.add('shimmer-loading');
  },
  
  removeShimmer(element) {
    element.classList.remove('shimmer-loading');
  },
  
  // Progress bar animation
  animateProgress(element, targetPercent, duration = 500) {
    element.style.transition = `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.width = targetPercent + '%';
  },
  
  // ============================================================
  // CELEBRATION EFFECTS
  // ============================================================
  
  // Confetti burst for big achievements
  confetti(x, y) {
    const colors = ['#4dd8e8', '#2ab5a0', '#d4af37', '#7eecd3', '#c9a456'];
    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < 30; i++) {
      const confetto = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 4 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const velocity = 2 + Math.random() * 4;
      const dx = Math.cos(angle) * 100 * velocity;
      const dy = Math.sin(angle) * 100 * velocity;
      const rotation = Math.random() * 720 - 360;
      
      confetto.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * 1.5}px;
        background: ${color};
        border-radius: 2px;
      `;
      container.appendChild(confetto);
      
      confetto.animate([
        { 
          transform: 'translate(0, 0) rotate(0deg)', 
          opacity: 1 
        },
        { 
          transform: `translate(${dx}px, ${dy + 200}px) rotate(${rotation}deg)`, 
          opacity: 0 
        }
      ], {
        duration: 1500,
        easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
      });
    }
    
    setTimeout(() => container.remove(), 1500);
  },
  
  // Big celebration for lesson/skill complete
  celebrate(x, y, type = 'normal') {
    switch (type) {
      case 'weapon':
        this.confetti(x, y);
        this.particleBurst(x, y, { 
          colors: ['#d4af37', '#ffd700', '#c9a456'],
          count: 20,
          spread: 120
        });
        AudioManager.play('weaponUnlock');
        break;
        
      case 'skill':
        this.confetti(x, y);
        this.screenFlash('rgba(212, 175, 55, 0.15)', 500);
        AudioManager.play('skillComplete');
        break;
        
      case 'gradeS':
        this.confetti(x, y);
        this.confetti(x - 50, y + 50);
        this.confetti(x + 50, y + 50);
        this.screenFlash('rgba(212, 175, 55, 0.2)', 600);
        AudioManager.play('gradeS');
        break;
        
      default:
        this.particleBurst(x, y);
        AudioManager.play('correct');
    }
  },
  
  // ============================================================
  // HAPTIC FEEDBACK (for mobile)
  // ============================================================
  
  haptic(type = 'light') {
    if (!navigator.vibrate) return;
    
    switch (type) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(25);
        break;
      case 'heavy':
        navigator.vibrate(50);
        break;
      case 'success':
        navigator.vibrate([10, 50, 20]);
        break;
      case 'error':
        navigator.vibrate([50, 30, 50]);
        break;
    }
  },
  
  // ============================================================
  // TYPEWRITER EFFECT
  // ============================================================
  
  typewriter(element, text, speed = 30, callback) {
    element.textContent = '';
    let i = 0;
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        
        // Play typing sound occasionally
        if (i % 3 === 0) {
          AudioManager.play('typeChar');
        }
        
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    };
    
    type();
  },
  
  // ============================================================
  // UTILITY
  // ============================================================
  
  // Get element center position
  getCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  },
  
  // Stagger animation for multiple elements
  staggerIn(elements, delay = 50) {
    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.3s, transform 0.3s';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * delay);
    });
  }
};

// Add shimmer CSS
const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
  .shimmer-loading {
    background: linear-gradient(
      90deg,
      rgba(224, 232, 240, 0.05) 0%,
      rgba(224, 232, 240, 0.1) 50%,
      rgba(224, 232, 240, 0.05) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;
document.head.appendChild(shimmerStyle);

// Export
window.Interactions = Interactions;
