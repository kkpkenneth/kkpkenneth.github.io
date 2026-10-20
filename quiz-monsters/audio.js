/********************************************************************
 * audio.js
 * Web Audio API 8-Bit Chiptune Synthesizer & Multi-Track BGM Engine
 ********************************************************************/

class ChiptuneAudioEngine {
  constructor() {
    this.ctx = null;
    this.sfxMuted = false;
    this.bgmMuted = false;
    this.currentTrack = null;
    this.bgmInterval = null;
    this.stepIndex = 0;

    this.tracks = {
      TITLE: {
        tempoMs: 210,
        lead: [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 587.33, 659.25, 523.25, 392.00, 440.00, 493.88, 523.25, 659.25, 587.33, 0],
        bass: [261.63, 0, 196.00, 0, 220.00, 0, 196.00, 0, 174.61, 0, 196.00, 0, 261.63, 196.00, 130.81, 0]
      },
      OVERWORLD: {
        tempoMs: 300,
        lead: [
    293.6, 261.6, 246.96, 196, 392, 329.6, 369.92, 329.6, 
    293.6, 0, 246.96, 196, 196, 220, 246.96, 261.6, 
    0, 0, 184.96, 196, 220, 246.96, 0, 261.6, 246.96, 
    220, 0, 0, 293.6, 261.6, 246.96, 293.6, 392, 369.92, 
    369.92, 392, 329.6, 0, 293.6, 293.6, 0, 0, 
    261.6, 246.96, 220, 196, 293.6, 261.6, 246.96, 
    220, 196, 0, 0, 196, 220, 246.96, 261.6, 0, 
    0, 293.6, 0, 261.6, 246.96, 0, 0, 196, 
    220, 246.96, 261.6, 0, 261.6, 0, 293.6, 0, 
    261.6, 293.6, 246.96, 0, 0, 246.96, 220, 196, 
    220, 0, 0, 164.8, 0, 246.96, 0, 220, 0, 
    0, 196, 0, 164.8, 0, 184.96, 0, 0, 196, 
    0, 246.96, 0, 246.96, 0, 0, 220, 0, 0
],
bass: [
    146.83, 146.83, 130.81, 130.81, 196.00, 164.81, 185.00, 164.81,
    146.83, 0,      98.00,  98.00,  110.00, 130.81, 146.83, 92.50,
    0,      0,      130.81, 146.83, 130.81, 110.00, 0, 146.83, 130.81,
    123.47, 0, 0,     196.00, 185.00, 185.00, 196.00, 164.81, 146.83,
    146.83, 130.81, 123.47, 0,      146.83, 146.83, 0,      0,
    130.81, 123.47, 110.00, 98.00,  146.83, 130.81, 123.47,
    110.00, 98.00,  0,      0,      98.00,  110.00, 123.47, 130.81, 0,
    0,      146.83, 0,      130.81, 123.47, 0,      0,      98.00,
    110.00, 123.47, 130.81, 0,      130.81, 0,      146.83, 0,
    130.81, 146.83, 123.47, 0,      0,      123.47, 110.00, 98.00,
    110.00, 0,      0,      82.41,  0,      123.47, 0,      110.00, 0,
    0,      98.00,  0,      82.41,  0,      92.50,  0,      0,      98.00,
    0,      123.47, 0,      123.47, 0,      0,      110.00, 0, 0
]
      },
      BATTLE: {
        tempoMs: 135,
        lead: [
          329.63, 349.23, 392.00, 329.63, 440.00, 329.63, 493.88, 440.00,
          392.00, 349.23, 329.63, 293.66, 329.63, 392.00, 493.88, 587.33,
          523.25, 493.88, 440.00, 392.00, 440.00, 493.88, 523.25, 659.25,
          587.33, 523.25, 493.88, 440.00, 392.00, 493.88, 329.63, 0
        ],
        bass: [
          164.81, 196.00, 164.81, 196.00, 174.61, 220.00, 174.61, 220.00,
          146.83, 196.00, 146.83, 196.00, 164.81, 196.00, 246.94, 196.00,
          220.00, 164.81, 220.00, 164.81, 174.61, 146.83, 174.61, 146.83,
          146.83, 196.00, 146.83, 196.00, 164.81, 123.47, 164.81, 0
        ]
      }
    };
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, duration = 0.08, type = 'square', delay = 0, gainVal = 0.11, isBgm = false) {
    if (isBgm && this.bgmMuted) return;
    if (!isBgm && this.sfxMuted) return;
    this.init();
    if (!this.ctx || freq <= 0) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  startBGM(trackName) {
    this.currentTrack = trackName;
    if (this.bgmInterval) clearInterval(this.bgmInterval);
    if (this.bgmMuted) return;

    const track = this.tracks[trackName];
    if (!track) return;

    this.stepIndex = 0;
    const durSec = (track.tempoMs / 1000) * 0.85;

    this.bgmInterval = setInterval(() => {
      if (this.bgmMuted) return;
      const leadFreq = track.lead[this.stepIndex % track.lead.length];
      const bassFreq = track.bass[this.stepIndex % track.bass.length];

      if (leadFreq > 0) this.playTone(leadFreq, durSec, 'square', 0, 0.045, true);
      if (bassFreq > 0) this.playTone(bassFreq, durSec * 0.95, 'triangle', 0, 0.055, true);
      this.stepIndex++;
    }, track.tempoMs);
  }

  stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  blip() { this.playTone(680, 0.05, 'square', 0, 0.09); }
  stepGrass() { this.playTone(210, 0.035, 'triangle', 0, 0.05); }
  npcChime() {
    this.playTone(587.33, 0.06, 'square', 0, 0.09);
    this.playTone(880.00, 0.09, 'square', 0.06, 0.09);
  }
  encounterSiren() {
    const freqs = [330, 660, 392, 784, 440, 880, 493.88, 987.77];
    freqs.forEach((f, idx) => this.playTone(f, 0.065, 'sawtooth', idx * 0.06, 0.13));
  }
  attackHit(superEffective = false) {
    if (superEffective) {
      this.playTone(523.25, 0.07, 'square', 0, 0.14);
      this.playTone(659.25, 0.07, 'square', 0.06, 0.14);
      this.playTone(783.99, 0.08, 'square', 0.12, 0.15);
      this.playTone(1046.5, 0.16, 'square', 0.18, 0.16);
    } else {
      this.playTone(440, 0.07, 'square', 0, 0.13);
      this.playTone(587.33, 0.12, 'square', 0.06, 0.13);
    }
  }
  wrongBuzzer() {
    this.playTone(190, 0.14, 'sawtooth', 0, 0.14);
    this.playTone(135, 0.25, 'sawtooth', 0.12, 0.15);
  }
  ballThrow() {
    this.playTone(300, 0.06, 'triangle', 0, 0.12);
    this.playTone(450, 0.06, 'triangle', 0.06, 0.12);
    this.playTone(620, 0.08, 'triangle', 0.12, 0.12);
  }
  ballShake() {
    this.playTone(340, 0.06, 'sine', 0, 0.13);
    this.playTone(260, 0.08, 'sine', 0.07, 0.13);
  }
  captureFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
    const times = [0, 0.1, 0.2, 0.32, 0.48, 0.6];
    const durs  = [0.09, 0.09, 0.1, 0.14, 0.1, 0.3];
    notes.forEach((n, i) => this.playTone(n, durs[i], 'square', times[i], 0.14));
  }
}

const sfx = new ChiptuneAudioEngine();