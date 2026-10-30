// Shared Web Audio helpers: synthesized sounds, no audio files, works offline.

let ctx: AudioContext | null = null

// iOS/iPadOS put Web Audio in the "ambient" session by default: it is muted by Silent mode
// (Control Center bell / ringer switch) while speech (🔊) still plays. "playback" makes the
// effects audible like the speech. Safari 16.4+; ignored elsewhere.
const session =
  typeof navigator === 'undefined'
    ? undefined
    : (navigator as Navigator & { audioSession?: { type: string } }).audioSession
if (session) {
  try {
    session.type = 'playback'
  } catch {
    // ignore
  }
}

export function audio(): AudioContext | null {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return null
  try {
    ctx ??= new AudioContext()
    // iOS starts the context "suspended" and moves it to "interrupted" when other audio
    // (e.g. 🔊 speech) takes over; resuming inside a tap handler brings it back.
    if (ctx.state !== 'running') void ctx.resume().catch(() => {})
    return ctx
  } catch {
    return null
  }
}

/**
 * iOS only unlocks audio from a tap: on every tap, make sure the context is running
 * (playing a silent buffer the first time), so sounds started later (timers, after
 * speech) are heard too.
 */
function unlock() {
  const c = audio()
  if (!c || unlocked) return
  const src = c.createBufferSource()
  src.buffer = c.createBuffer(1, 1, 22050)
  src.connect(c.destination)
  src.start(0)
  unlocked = true
}
let unlocked = false
if (typeof window !== 'undefined') {
  for (const type of ['touchend', 'click', 'keydown'])
    window.addEventListener(type, unlock, { capture: true, passive: true })
}

export interface ToneOpts {
  type?: OscillatorType
  from: number
  to?: number
  start: number
  dur: number
  gain: number
  /** Vibrato: rate in Hz and depth in Hz. */
  vib?: [number, number]
}

export function tone(c: AudioContext, { type = 'sine', from, to = from, start, dur, gain, vib }: ToneOpts) {
  const t0 = c.currentTime + start
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(from, t0)
  osc.frequency.exponentialRampToValueAtTime(to, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g).connect(c.destination)
  if (vib) {
    const lfo = c.createOscillator()
    const depth = c.createGain()
    lfo.frequency.value = vib[0]
    depth.gain.value = vib[1]
    lfo.connect(depth).connect(osc.frequency)
    lfo.start(t0)
    lfo.stop(t0 + dur + 0.05)
  }
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

export interface NoiseOpts {
  start: number
  dur: number
  gain: number
  filter?: BiquadFilterType
  freqFrom: number
  freqTo?: number
  attack?: number
}

let noiseBuffer: AudioBuffer | null = null

export function noise(c: AudioContext, { start, dur, gain, filter = 'lowpass', freqFrom, freqTo = freqFrom, attack = 0.01 }: NoiseOpts) {
  if (!noiseBuffer) {
    noiseBuffer = c.createBuffer(1, c.sampleRate * 2, c.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  }
  const t0 = c.currentTime + start
  const src = c.createBufferSource()
  src.buffer = noiseBuffer
  const f = c.createBiquadFilter()
  f.type = filter
  f.frequency.setValueAtTime(freqFrom, t0)
  f.frequency.exponentialRampToValueAtTime(freqTo, t0 + dur)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(f).connect(g).connect(c.destination)
  src.start(t0)
  src.stop(t0 + dur + 0.05)
}
