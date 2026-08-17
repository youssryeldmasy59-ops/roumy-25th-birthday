/**
 * =========================================================================
 * 🎂 25th Birthday Interactive Script 💖 (For Roumy from Lark)
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.BIRTHDAY_CONFIG || {};

  // Initialize all features
  initContent(config);
  initParticles();
  initPasscodeGate(config);
  initCountdown(config.targetBirthday);
  initInteractiveCake(config);
  initReasonsGrid(config.reasons);
  initMemoriesGallery(config.memories);
  initLoveLetter(config);
  initWishGenerator();
  initMusicPlayer();
  initLightbox();
});

/**
 * Populate texts and copy from config.js
 */
function initContent(config) {
  if (config.herName) {
    const navName = document.getElementById('nav-her-name');
    if (navName) navName.textContent = `Roumy & Lark ✨`;
  }
  
  if (config.heroBadge) {
    const badgeText = document.querySelector('.badge-25-sub');
    if (badgeText) badgeText.textContent = config.heroBadge;
  }

  if (config.heroTitle) document.getElementById('hero-title').textContent = config.heroTitle;
  if (config.heroSubtitle) document.getElementById('hero-subtitle').textContent = config.heroSubtitle;
  if (config.countdownTitle) {
    const countHeading = document.getElementById('countdown-heading');
    if (countHeading) countHeading.textContent = config.countdownTitle;
  }
  if (config.passcodeHint) {
    const hintBox = document.getElementById('hint-text');
    if (hintBox) hintBox.textContent = config.passcodeHint;
  }
  if (config.reasonsSectionTitle) document.getElementById('reasons-title').textContent = config.reasonsSectionTitle;
  if (config.reasonsSectionSubtitle) document.getElementById('reasons-subtitle').textContent = config.reasonsSectionSubtitle;
  if (config.memoriesTitle) document.getElementById('memories-title').textContent = config.memoriesTitle;
  if (config.memoriesSubtitle) document.getElementById('memories-subtitle').textContent = config.memoriesSubtitle;
  if (config.letterSectionTitle) document.getElementById('letter-section-title').textContent = config.letterSectionTitle;
}

/**
 * -------------------------------------------------------------
 * 🔒 2. Secret Birthday Passcode Gate (Unlocks on 2708 or 27)
 * -------------------------------------------------------------
 */
function initPasscodeGate(config) {
  const lockScreen = document.getElementById('lock-screen');
  const passInput = document.getElementById('passcode-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const errorMsg = document.getElementById('error-message');
  const hintBtn = document.getElementById('hint-btn');
  const hintText = document.getElementById('hint-text');
  const keypadBtns = document.querySelectorAll('.key-btn[data-val]');
  const clearBtn = document.getElementById('clear-btn');
  const submitPinBtn = document.getElementById('submit-pin-btn');

  const acceptedPasscodes = (config.passcodes || ["2708", "27/08", "27"]).map(p => normalizeCode(p));

  function normalizeCode(str) {
    return str.toString().trim().replace(/[\/\-\s]/g, '').toLowerCase();
  }

  function checkPasscode() {
    const entered = normalizeCode(passInput.value);
    
    const isCorrect = acceptedPasscodes.includes(entered) || 
                      entered === '2708' || 
                      entered === '27' || 
                      entered.includes('2708') ||
                      entered === '0827';

    if (isCorrect) {
      errorMsg.classList.add('hidden');
      triggerConfettiBurst();
      playChimeSound();
      
      lockScreen.classList.add('unlocked');
      startRomanticAudio();
    } else {
      errorMsg.classList.remove('hidden');
      const lockCard = document.querySelector('.lock-card');
      lockCard.classList.remove('shake-anim');
      void lockCard.offsetWidth;
      lockCard.classList.add('shake-anim');
      passInput.focus();
    }
  }

  unlockBtn.addEventListener('click', checkPasscode);
  submitPinBtn.addEventListener('click', checkPasscode);
  
  passInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkPasscode();
  });

  keypadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      passInput.value += btn.getAttribute('data-val');
      errorMsg.classList.add('hidden');
    });
  });

  clearBtn.addEventListener('click', () => {
    passInput.value = '';
    errorMsg.classList.add('hidden');
  });

  hintBtn.addEventListener('click', () => {
    hintText.classList.toggle('hidden');
  });
}

/**
 * -------------------------------------------------------------
 * ⏳ 3. Live Countdown Timer (Active until August 27)
 * -------------------------------------------------------------
 */
function initCountdown(targetDateStr) {
  const daysEl = document.getElementById('days-count');
  const hoursEl = document.getElementById('hours-count');
  const minutesEl = document.getElementById('minutes-count');
  const secondsEl = document.getElementById('seconds-count');
  const statusEl = document.getElementById('countdown-status');

  const targetDate = new Date(targetDateStr || '2026-08-27T00:00:00').getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      if (statusEl) statusEl.textContent = "It's Roumy's official 25th Birthday today! Let's celebrate! 🎂✨";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/**
 * -------------------------------------------------------------
 * 🕯️ 4. Interactive Cake Candle Blow
 * -------------------------------------------------------------
 */
function initInteractiveCake(config) {
  const candle = document.getElementById('birthday-candle');
  const flame = document.getElementById('candle-flame');
  const blowBtn = document.getElementById('blow-btn');
  const instruction = document.getElementById('cake-instruction');
  let blown = false;

  function blowOut() {
    if (blown) return;
    blown = true;
    flame.classList.add('blown');
    instruction.textContent = config.candleBlownText || 'May all your wishes come true! 🎉✨';
    blowBtn.style.display = 'none';
    
    triggerHeartConfetti();
    playChimeSound();
  }

  candle.addEventListener('click', blowOut);
  blowBtn.addEventListener('click', blowOut);
}

/**
 * -------------------------------------------------------------
 * 🎴 5. 25 Reasons 3D Flip Cards Grid (Progression from Fun to Deep)
 * -------------------------------------------------------------
 */
function initReasonsGrid(reasons) {
  const grid = document.getElementById('reasons-grid');
  const flipAllBtn = document.getElementById('flip-all-btn');
  if (!grid || !reasons) return;

  grid.innerHTML = '';
  let allFlipped = false;

  reasons.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flip-card';
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div class="card-number-badge">${item.num}</div>
          <h3 class="card-front-title">${item.title}</h3>
          <span class="card-hint-click">Tap to read ✨</span>
        </div>
        <div class="flip-card-back">
          <p class="card-back-text">${item.text}</p>
          <div class="card-back-heart">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#ff7597">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    grid.appendChild(card);
  });

  if (flipAllBtn) {
    flipAllBtn.addEventListener('click', () => {
      allFlipped = !allFlipped;
      const allCards = document.querySelectorAll('.flip-card');
      allCards.forEach(c => {
        if (allFlipped) c.classList.add('flipped');
        else c.classList.remove('flipped');
      });
      flipAllBtn.querySelector('span').textContent = allFlipped ? 'Close All Cards ✨' : 'Flip All Cards ✨';
    });
  }
}

/**
 * -------------------------------------------------------------
 * 📸 6. Clean Polaroid Scrapbook Gallery
 * -------------------------------------------------------------
 */
function initMemoriesGallery(memories) {
  const gallery = document.getElementById('polaroid-gallery');
  if (!gallery || !memories) return;

  gallery.innerHTML = '';

  memories.forEach((mem, index) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card clean-polaroid';
    card.innerHTML = `
      <div class="tape-top"></div>
      <div class="polaroid-img-wrapper">
        <img src="${mem.image}" alt="Memory photo ${index + 1}" loading="lazy">
      </div>
      <div class="polaroid-clean-bottom">
        <span class="polaroid-sparkle-dot">✨</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(mem);
    });

    gallery.appendChild(card);
  });
}

/**
 * -------------------------------------------------------------
 * 🖼️ 7. Lightbox Modal
 * -------------------------------------------------------------
 */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');

  function close() {
    modal.classList.remove('active');
  }

  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function openLightbox(item) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  img.src = item.image;
  modal.classList.add('active');
}

/**
 * -------------------------------------------------------------
 * 💌 8. Wax-Sealed Romantic Letter from Lark
 * -------------------------------------------------------------
 */
function initLoveLetter(config) {
  const waxSeal = document.getElementById('wax-seal');
  const envelope = document.getElementById('envelope');
  const letterBody = document.getElementById('letter-body');
  const letterTitle = document.getElementById('letter-title');
  const letterSig = document.getElementById('letter-sig');

  if (letterTitle && config.letterTitle) letterTitle.textContent = config.letterTitle;
  
  if (letterBody && config.letterContent) {
    const paragraphs = config.letterContent.split('\n\n').filter(p => p.trim());
    letterBody.innerHTML = paragraphs.map(p => `<p class="letter-para">${p.trim()}</p>`).join('');
  }
  
  if (letterSig && config.letterSignature) {
    letterSig.innerHTML = config.letterSignature.replace('\n', '<br>');
  }

  waxSeal.addEventListener('click', () => {
    envelope.classList.add('open');
    triggerHeartConfetti();
    playChimeSound();
  });
}

/**
 * -------------------------------------------------------------
 * ⭐ 9. Wish Upon a Star
 * -------------------------------------------------------------
 */
function initWishGenerator() {
  const input = document.getElementById('user-wish-input');
  const btn = document.getElementById('send-wish-btn');
  const resp = document.getElementById('wish-response');

  btn.addEventListener('click', () => {
    if (!input.value.trim()) return;
    resp.classList.remove('hidden');
    triggerConfettiBurst();
    input.value = '';
  });
}

/**
 * -------------------------------------------------------------
 * 🎶 10. Ambient Romantic Synth & Music Player
 * -------------------------------------------------------------
 */
let audioCtx = null;
let isMusicPlaying = false;
let synthInterval = null;

function initMusicPlayer() {
  const toggleBtn = document.getElementById('music-toggle-btn');
  const waves = document.getElementById('music-waves');
  const label = document.getElementById('music-label');

  toggleBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
      stopRomanticAudio();
      waves.classList.add('paused');
      label.textContent = 'Music';
      isMusicPlaying = false;
    } else {
      startRomanticAudio();
      waves.classList.remove('paused');
      label.textContent = 'Music';
      isMusicPlaying = true;
    }
  });
}

function startRomanticAudio() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    isMusicPlaying = true;
    const waves = document.getElementById('music-waves');
    const label = document.getElementById('music-label');
    if (waves) waves.classList.remove('paused');
    if (label) label.textContent = 'Music';

    const chords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66], // G
    ];

    let chordIdx = 0;
    if (synthInterval) clearInterval(synthInterval);

    synthInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      const currentChord = chords[chordIdx % chords.length];
      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          playBellTone(freq, 1.8);
        }, i * 350);
      });
      chordIdx++;
    }, 2400);

  } catch (e) {
    console.log('Audio policy:', e);
  }
}

function stopRomanticAudio() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

function playBellTone(freq, duration = 1.2) {
  if (!audioCtx || audioCtx.state !== 'running') return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playChimeSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => playBellTone(freq, 1.5), i * 120);
    });
  } catch (e) {}
}

/**
 * -------------------------------------------------------------
 * 🎉 11. Confetti Effects
 * -------------------------------------------------------------
 */
function triggerConfettiBurst() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff5e83', '#fcd34d', '#ffd1dc', '#ffffff', '#e11d48']
    });
  }
}

function triggerHeartConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      spread: 80,
      startVelocity: 30,
      shapes: ['star', 'circle'],
      colors: ['#ff5e83', '#fcd34d', '#ff7597', '#fff']
    });
  }
}

/**
 * -------------------------------------------------------------
 * ✨ 12. Interactive Background Particles Canvas (Lightweight for Mobile)
 * -------------------------------------------------------------
 */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const isMobile = width < 768;
  const particleCount = isMobile ? 22 : 45;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 20;
      this.size = Math.random() * 7 + 4;
      this.speedY = Math.random() * 0.7 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.45 + 0.2;
      this.isHeart = Math.random() > 0.35;
      this.angle = Math.random() * Math.PI * 2;
    }
    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.angle) * 0.4 + this.speedX;
      this.angle += 0.02;
      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#ff5e83';
      
      if (this.isHeart) {
        ctx.translate(this.x, this.y);
        ctx.scale(this.size / 15, this.size / 15);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5, -5, -10, 0, 0, 10);
        ctx.bezierCurveTo(10, 0, 5, -5, 0, 0);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fcd34d';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
