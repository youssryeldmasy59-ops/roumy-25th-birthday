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
    if (navName) navName.textContent = `Roumy & Lark`;
  }
  
  if (config.heroBadge) {
    const badgeText = document.querySelector('.ribbon-text');
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
      playRomanticMusic();
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
      if (statusEl) statusEl.innerHTML = "✨ 🎉 IT'S OFFICIALLY ROUMY'S 25TH BIRTHDAY TODAY! 🎂 🌹 ✨";
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
    instruction.textContent = config.candleBlownText || 'May every single wish in your heart come true! 🌹✨';
    blowBtn.style.display = 'none';
    
    triggerHeartConfetti();
    playChimeSound();
  }

  candle.addEventListener('click', blowOut);
  blowBtn.addEventListener('click', blowOut);
}

/**
 * -------------------------------------------------------------
 * 🎴 5. 25 Reasons 3D Flip Cards Grid
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
          <span class="card-hint-click">Tap to read 🌹</span>
        </div>
        <div class="flip-card-back">
          <p class="card-back-text">${item.text}</p>
          <div class="card-back-heart">🌹</div>
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
      flipAllBtn.querySelector('span').textContent = allFlipped ? 'Close All Reasons 🌹' : 'Reveal All Reasons 🌹';
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
 * 🎹 10. Deeply Romantic, Emotional & Nostalgic Piano Soundscape
 * (Studio Quality Real Acoustic Grand Piano at Full Volume)
 * -------------------------------------------------------------
 */
let bgAudio = null;
let isMusicPlaying = false;
let pianoMelodyTimeout = null;

function initMusicPlayer() {
  bgAudio = document.getElementById('romantic-audio-element');
  if (bgAudio) {
    bgAudio.volume = 1.0; // 100% Full High Volume & Crystal Clear!
    bgAudio.loop = true;

    // Endless continuous loop safety
    bgAudio.addEventListener('ended', () => {
      if (isMusicPlaying) {
        bgAudio.currentTime = 0;
        bgAudio.play().catch(() => {});
      }
    });

    // Seamless gapless loop turnaround
    bgAudio.addEventListener('timeupdate', () => {
      if (bgAudio.duration && bgAudio.currentTime >= bgAudio.duration - 0.15) {
        if (isMusicPlaying) {
          bgAudio.currentTime = 0;
          bgAudio.play().catch(() => {});
        }
      }
    });
  }

  const toggleBtn = document.getElementById('music-toggle-btn');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (isMusicPlaying) {
        pauseRomanticMusic();
      } else {
        playRomanticMusic();
      }
    });
  }
}

function playRomanticMusic() {
  isMusicPlaying = true;
  const waves = document.getElementById('music-waves');
  const label = document.getElementById('music-label');
  if (waves) waves.classList.remove('paused');
  if (label) label.textContent = 'Playing 🌹';

  if (bgAudio) {
    bgAudio.volume = 1.0;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to synthesized acoustic piano if browser policy blocks audio element
        startNostalgicPiano();
      });
    }
  } else {
    startNostalgicPiano();
  }
}

function pauseRomanticMusic() {
  isMusicPlaying = false;
  const waves = document.getElementById('music-waves');
  const label = document.getElementById('music-label');
  if (waves) waves.classList.add('paused');
  if (label) label.textContent = 'Our Melody';

  if (bgAudio) {
    bgAudio.pause();
  }
  stopNostalgicPiano();
}

function setupAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Create subtle stereo acoustic space & delay
  if (!delayNode) {
    delayNode = audioCtx.createDelay();
    delayNode.delayTime.value = 0.32;

    reverbGain = audioCtx.createGain();
    reverbGain.gain.value = 0.3;

    delayNode.connect(reverbGain);
    reverbGain.connect(delayNode);
    reverbGain.connect(audioCtx.destination);
  }
}

/**
 * Rich Felt Grand Piano Note Synthesizer with Harmonics
 */
function playPianoNote(freq, timeOffset = 0, duration = 3.2, velocity = 0.08) {
  if (!audioCtx || audioCtx.state !== 'running') return;

  const startTime = audioCtx.currentTime + timeOffset;

  // 1. Fundamental Tone (Warm Acoustic Body)
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, startTime);

  // 2. Second Harmonic (Felt Hammer Warmth)
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 2, startTime);

  // Lowpass filter for smooth acoustic piano tone
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, startTime);
  filter.frequency.exponentialRampToValueAtTime(400, startTime + duration);

  // Piano Envelope: Instant soft hammer attack, long singing acoustic decay
  gain1.gain.setValueAtTime(0.0001, startTime);
  gain1.gain.linearRampToValueAtTime(velocity, startTime + 0.035);
  gain1.gain.exponentialRampToValueAtTime(velocity * 0.45, startTime + 0.6);
  gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  gain2.gain.setValueAtTime(0.0001, startTime);
  gain2.gain.linearRampToValueAtTime(velocity * 0.25, startTime + 0.02);
  gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration * 0.6));

  // Connect Nodes
  osc1.connect(gain1);
  gain1.connect(filter);

  osc2.connect(gain2);
  gain2.connect(filter);

  filter.connect(audioCtx.destination);
  if (delayNode) filter.connect(delayNode);

  osc1.start(startTime);
  osc1.stop(startTime + duration);

  osc2.start(startTime);
  osc2.stop(startTime + duration);
}

/**
 * Nostalgic Cello / Strings Warm Bass Resonance
 */
function playWarmPad(freq, timeOffset = 0, duration = 4.5) {
  if (!audioCtx || audioCtx.state !== 'running') return;
  const startTime = audioCtx.currentTime + timeOffset;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(0.045, startTime + 0.8);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(filter);
  filter.connect(audioCtx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

/**
 * Soulful & Nostalgic Piano Song (F# Minor / A Major Romantic Nostalgia Sequence)
 */
const NOSTALGIC_PIANO_SONG = [
  // Section 1: Nostalgic Opening (The Beginning of Our Story)
  { bass: 92.50, pad: 185.00, notes: [{ f: 554.37, t: 0 }, { f: 440.00, t: 0.35 }, { f: 415.30, t: 0.70 }, { f: 440.00, t: 1.05 }, { f: 659.25, t: 1.45 }, { f: 554.37, t: 1.95 }] }, // F#m
  { bass: 73.42, pad: 146.83, notes: [{ f: 440.00, t: 0 }, { f: 493.88, t: 0.40 }, { f: 554.37, t: 0.80 }, { f: 440.00, t: 1.25 }, { f: 369.99, t: 1.70 }, { f: 440.00, t: 2.10 }] }, // D
  { bass: 110.00, pad: 220.00, notes: [{ f: 554.37, t: 0 }, { f: 659.25, t: 0.45 }, { f: 739.99, t: 0.90 }, { f: 659.25, t: 1.35 }, { f: 554.37, t: 1.80 }, { f: 440.00, t: 2.20 }] }, // A
  { bass: 82.41, pad: 164.81, notes: [{ f: 493.88, t: 0 }, { f: 440.00, t: 0.40 }, { f: 415.30, t: 0.80 }, { f: 369.99, t: 1.20 }, { f: 415.30, t: 1.65 }, { f: 493.88, t: 2.10 }] }, // E

  // Section 2: Deep Emotional Core (Reflections & Pure Heart)
  { bass: 92.50, pad: 185.00, notes: [{ f: 739.99, t: 0 }, { f: 659.25, t: 0.40 }, { f: 554.37, t: 0.85 }, { f: 440.00, t: 1.30 }, { f: 493.88, t: 1.75 }, { f: 554.37, t: 2.15 }] }, // F#m
  { bass: 73.42, pad: 146.83, notes: [{ f: 554.37, t: 0 }, { f: 493.88, t: 0.38 }, { f: 440.00, t: 0.76 }, { f: 493.88, t: 1.15 }, { f: 554.37, t: 1.60 }, { f: 659.25, t: 2.10 }] }, // D
  { bass: 110.00, pad: 220.00, notes: [{ f: 659.25, t: 0 }, { f: 554.37, t: 0.45 }, { f: 440.00, t: 0.90 }, { f: 369.99, t: 1.35 }, { f: 440.00, t: 1.80 }, { f: 554.37, t: 2.25 }] }, // A
  { bass: 82.41, pad: 164.81, notes: [{ f: 493.88, t: 0 }, { f: 415.30, t: 0.50 }, { f: 369.99, t: 1.00 }, { f: 329.63, t: 1.45 }, { f: 415.30, t: 1.95 }] }  // E
];

let songBarIdx = 0;

function startNostalgicPiano() {
  try {
    setupAudioContext();
    isMusicPlaying = true;

    const waves = document.getElementById('music-waves');
    const label = document.getElementById('music-label');
    if (waves) waves.classList.remove('paused');
    if (label) label.textContent = 'Playing 🌹';

    function playNextBar() {
      if (!isMusicPlaying) return;

      const bar = NOSTALGIC_PIANO_SONG[songBarIdx % NOSTALGIC_PIANO_SONG.length];
      
      // Warm bass & cello foundation
      playWarmPad(bar.pad, 0, 4.0);
      playPianoNote(bar.bass, 0, 4.0, 0.09);

      // Delicate nostalgic melody notes
      bar.notes.forEach(n => {
        playPianoNote(n.f, n.t, 2.8, 0.065);
      });

      songBarIdx++;
      pianoMelodyTimeout = setTimeout(playNextBar, 2900);
    }

    if (pianoMelodyTimeout) clearTimeout(pianoMelodyTimeout);
    playNextBar();

  } catch (e) {
    console.log('Audio error:', e);
  }
}

function stopNostalgicPiano() {
  if (pianoMelodyTimeout) {
    clearTimeout(pianoMelodyTimeout);
    pianoMelodyTimeout = null;
  }
}

function playChimeSound() {
  try {
    setupAudioContext();
    // Warm emotional chime
    [440.00, 554.37, 659.25, 880.00].forEach((freq, i) => {
      playPianoNote(freq, i * 0.12, 2.5, 0.07);
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
