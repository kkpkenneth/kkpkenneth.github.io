/********************************************************************
 * audio.js
 * Web Audio API 8-Bit Chiptune Synthesizer, Multi-Biome BGM & Cries
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
        tempoMs: 280,
        lead: [
          293.6, 261.6, 246.96, 196, 392, 329.6, 369.92, 329.6,
          293.6, 0, 246.96, 196, 196, 220, 246.96, 261.6,
          0, 0, 184.96, 196, 220, 246.96, 0, 261.6, 246.96,
          220, 0, 0, 293.6, 261.6, 246.96, 293.6, 392, 369.92,
          369.92, 392, 329.6, 0, 293.6, 293.6, 0, 0
        ],
        bass: [
          146.83, 146.83, 130.81, 130.81, 196.00, 164.81, 185.00, 164.81,
          146.83, 0, 98.00, 98.00, 110.00, 130.81, 146.83, 92.50,
          0, 0, 130.81, 146.83, 130.81, 110.00, 0, 146.83, 130.81,
          123.47, 0, 0, 196.00, 185.00, 185.00, 196.00, 164.81, 146.83,
          146.83, 130.81, 123.47, 0, 146.83, 146.83, 0, 0
        ]
      },
      MOUNTAIN: {
        tempoMs: 250,
        lead: [220.00, 261.63, 293.66, 329.63, 392.00, 329.63, 293.66, 261.63, 196.00, 246.94, 293.66, 392.00, 329.63, 293.66, 220.00, 0],
        bass: [110.00, 0, 130.81, 0, 146.83, 0, 130.81, 0, 98.00, 0, 123.47, 0, 110.00, 98.00, 110.00, 0]
      },
      DESERT: {
        tempoMs: 210,
        lead: [293.66, 311.13, 369.99, 392.00, 440.00, 392.00, 369.99, 311.13, 293.66, 0, 369.99, 392.00, 311.13, 293.66, 261.63, 0],
        bass: [146.83, 0, 146.83, 220.00, 146.83, 0, 155.56, 0, 146.83, 0, 185.00, 0, 155.56, 146.83, 130.81, 0]
      },
      BEACH: {
        tempoMs: 220,
        lead: [392.00, 493.88, 587.33, 659.25, 587.33, 493.88, 523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88, 392.00, 0],
        bass: [196.00, 0, 246.94, 0, 293.66, 0, 261.63, 0, 196.00, 0, 293.66, 0, 261.63, 246.94, 196.00, 0]
      },
      FOREST: {
        tempoMs: 200,
        lead: [329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 261.63, 293.66, 329.63, 392.00, 440.00, 392.00, 329.63, 293.66, 0],
        bass: [164.81, 0, 196.00, 0, 220.00, 0, 164.81, 0, 146.83, 0, 196.00, 0, 164.81, 146.83, 130.81, 0]
      },
      GLACIER: {
        tempoMs: 240,
        lead: [523.25, 659.25, 783.99, 987.77, 783.99, 659.25, 587.33, 783.99, 659.25, 523.25, 493.88, 587.33, 523.25, 0, 392.00, 0],
        bass: [261.63, 0, 329.63, 0, 196.00, 0, 246.94, 0, 220.00, 0, 196.00, 0, 174.61, 196.00, 261.63, 0]
      },
      VOLCANO: {
        tempoMs: 175,
        lead: [196.00, 233.08, 261.63, 277.18, 261.63, 233.08, 196.00, 174.61, 196.00, 261.63, 311.13, 293.66, 261.63, 233.08, 196.00, 0],
        bass: [98.00, 98.00, 116.54, 98.00, 130.81, 98.00, 138.59, 130.81, 98.00, 98.00, 116.54, 130.81, 98.00, 87.31, 98.00, 0]
      },
      JUNGLE: {
        tempoMs: 190,
        lead: [392.00, 440.00, 523.25, 587.33, 659.25, 523.25, 440.00, 392.00, 349.23, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 0],
        bass: [196.00, 220.00, 196.00, 146.83, 196.00, 220.00, 164.81, 146.83, 174.61, 196.00, 220.00, 196.00, 174.61, 146.83, 130.81, 0]
      },
      METRO: {
        tempoMs: 185,
        lead: [440.00, 523.25, 659.25, 587.33, 523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88, 440.00, 523.25, 587.33, 659.25, 0],
        bass: [220.00, 0, 220.00, 261.63, 196.00, 0, 196.00, 246.94, 174.61, 0, 174.61, 220.00, 164.81, 196.00, 220.00, 0]
      },
      BATTLE: {
        tempoMs: 105,
        lead: [
          392, 0, 392, 0, 392, 0, 0, 392, 415.36, 466.24, 392, 0, 0, 0, 415.36, 0,
          415.36, 0, 415.36, 0, 277.12, 0, 0, 0, 392, 0, 369.92, 0, 329.6, 0, 392, 0,
          440, 0, 369.92, 0, 392, 0, 369.92, 392, 369.92, 0, 0, 261.6, 0, 233.12, 0, 207.68,
          0, 277.12, 0, 261.6, 0, 233.12, 0, 349.28, 329.6, 293.6, 261.6, 233.12, 261.6, 293.6, 369.92, 415.36
        ],
        bass: [
          196.0, 0, 196.0, 0, 196.0, 0, 196.0, 0, 207.65, 0, 233.12, 0, 196.0, 0, 207.65, 0,
          207.65, 0, 207.65, 0, 138.59, 0, 138.59, 0, 196.0, 0, 184.97, 0, 164.81, 0, 196.0, 0,
          220.0, 0, 184.97, 0, 196.0, 0, 184.97, 196.0, 184.97, 0, 130.81, 0, 116.54, 0, 103.83, 0,
          138.59, 0, 130.81, 0, 116.54, 0, 174.61, 164.81, 146.83, 130.81, 116.54, 130.81, 146.83, 184.97, 207.65, 0
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
    let resolved = trackName;
    if (trackName === 'OVERWORLD' && typeof state !== 'undefined' && state.currentMapId) {
      resolved = this.tracks[state.currentMapId] ? state.currentMapId : 'OVERWORLD';
    }
    this.currentTrack = resolved;
    if (this.bgmInterval) clearInterval(this.bgmInterval);
    if (this.bgmMuted) return;

    const track = this.tracks[resolved] || this.tracks.OVERWORLD;
    if (!track) return;

    this.stepIndex = 0;
    const durSec = (track.tempoMs / 1000) * 0.85;

    this.bgmInterval = setInterval(() => {
      if (this.bgmMuted) return;
      const leadFreq = track.lead[this.stepIndex % track.lead.length];
      const bassFreq = track.bass[this.stepIndex % track.bass.length];

      if (leadFreq > 0) this.playTone(leadFreq, durSec, 'square', 0, 0.04, true);
      if (bassFreq > 0) this.playTone(bassFreq, durSec * 0.95, 'triangle', 0, 0.05, true);
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
  heal() {
    const lead = [392, 0, 392, 0, 392, 329.6, 523.25];
    const bass = [196, 0, 196, 0, 164.8, 164.8, 261.6];
    lead.forEach((f, idx) => {
      if (f > 0) this.playTone(f, 0.22, 'sine', idx * 0.16, 0.14);
      if (bass[idx] > 0) this.playTone(bass[idx], 0.22, 'triangle', idx * 0.16, 0.10);
    });
  }
  pokemonCry(monId = 'pikachu') {
    let hash = 0;
    for (let i = 0; i < monId.length; i++) hash = (hash * 31 + monId.charCodeAt(i)) % 500;
    const base = 340 + (hash % 360);
    // Double-chirp vocal cry matching "Name! Name~"
    this.playTone(base, 0.07, 'square', 0, 0.11);
    this.playTone(base * 1.25, 0.09, 'square', 0.06, 0.12);
    this.playTone(base * 1.05, 0.07, 'square', 0.20, 0.11);
    this.playTone(base * 1.42, 0.15, 'triangle', 0.27, 0.13);
  }
  encounterSiren() {
    const freqs = [392, 369.92, 349.28, 329.6, 392, 369.92, 349.28, 329.6, 392, 369.92, 349.28, 329.6, 392];
    freqs.forEach((f, idx) => this.playTone(f, 0.06, 'sawtooth', idx * 0.055, 0.12));
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
  grandVictoryFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1174.66, 1318.51, 1567.98, 2093.00];
    notes.forEach((n, i) => this.playTone(n, 0.16, 'square', i * 0.13, 0.15));
  }
}

const sfx = new ChiptuneAudioEngine();