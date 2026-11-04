// Web Audio API Ambient Sound Generator for Deep Work and Study Sessions

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private isPlaying = false;
  private currentMode: 'cosmic' | 'alpha' | 'rain' | 'whitenoise' = 'cosmic';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    this.activeNodes.forEach((node) => {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
        try {
          (node as AudioScheduledSourceNode).stop();
        } catch {}
      } else if ('disconnect' in node) {
        try {
          node.disconnect();
        } catch {}
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public play(mode: 'cosmic' | 'alpha' | 'rain' | 'whitenoise') {
    this.initContext();
    this.stop();
    if (!this.ctx || !this.masterGain) return;

    this.currentMode = mode;
    this.isPlaying = true;

    if (mode === 'cosmic') {
      // Cosmic Deep Space Drone: Dual Detuned Sub Oscillators + Lowpass filter
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(65.75, this.ctx.currentTime); // Slight detune for pulsing

      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3 harmonic

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, this.ctx.currentTime);

      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.masterGain);

      osc1.start();
      osc2.start();
      osc3.start();

      this.activeNodes.push(osc1, osc2, osc3, filter, droneGain);
    } else if (mode === 'alpha') {
      // Binaural Alpha Beat: 200Hz in Left Ear, 210Hz in Right Ear (10Hz Alpha Waves)
      const oscL = this.ctx.createOscillator();
      const oscR = this.ctx.createOscillator();
      const merger = this.ctx.createChannelMerger(2);

      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(216, this.ctx.currentTime); // A3

      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(226, this.ctx.currentTime); // 10Hz offset for focus

      const gainL = this.ctx.createGain();
      const gainR = this.ctx.createGain();
      gainL.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gainR.gain.setValueAtTime(0.2, this.ctx.currentTime);

      oscL.connect(gainL);
      gainL.connect(merger, 0, 0);

      oscR.connect(gainR);
      gainR.connect(merger, 0, 1);

      merger.connect(this.masterGain);

      oscL.start();
      oscR.start();

      this.activeNodes.push(oscL, oscR, gainL, gainR, merger);
    } else {
      // White/Pink Rain Ambient Noise Buffer
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (mode === 'rain') {
          // Pink noise filter approximation for rainfall
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.11;
        } else {
          output[i] = white * 0.1;
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = mode === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.setValueAtTime(mode === 'rain' ? 800 : 1200, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.masterGain);
      whiteNoise.start();

      this.activeNodes.push(whiteNoise, filter);
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentMode: this.currentMode,
    };
  }
}

export const ambientSound = new AmbientSoundEngine();
