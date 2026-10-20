import type { ReactNode } from 'react'

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Apple ships novelty voices (Zarvox, Trinoids, Bubbles…) that can be picked when no voice is set.
const NOVELTY =
  /albert|bad news|bahh|bells|boing|bubbles|cellos|eddy|flo|fred|good news|grandma|grandpa|jester|junior|kathy|organ|ralph|reed|rocko|sandy|shelley|superstar|trinoids|whisper|wobble|zarvox/i
// Natural-sounding en-US voices, best first (iOS/macOS, Chrome, Edge/Windows).
const PREFERRED = [
  'Samantha',
  'Ava',
  'Allison',
  'Susan',
  'Nicky',
  'Google US English',
  'Microsoft Aria',
  'Microsoft Jenny',
  'Microsoft Zira',
]

let voice: SpeechSynthesisVoice | null | undefined

function pickVoice(): SpeechSynthesisVoice | null {
  const all = window.speechSynthesis.getVoices()
  const en = all.filter((v) => /^en[-_]US$/i.test(v.lang) && !NOVELTY.test(v.name))
  const score = (v: SpeechSynthesisVoice) => {
    const i = PREFERRED.findIndex((n) => v.name.startsWith(n))
    const rank = i < 0 ? PREFERRED.length : i
    const quality = /premium|enhanced|natural/i.test(v.name) ? 0 : 0.5
    return rank + quality
  }
  return en.sort((a, b) => score(a) - score(b))[0] ?? null
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // Voices load asynchronously in most browsers.
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    voice = pickVoice()
  })
}

export function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  if (!voice) voice = pickVoice()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  if (voice) u.voice = voice
  u.rate = 0.9
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

/** Text for speech: blanks are read as "blank". */
export const speakable = (text: string) => text.replace(/_{3,}/g, ' blank ')

export function SpeakButton({ text, label }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-sky-100 px-3 text-2xl text-sky-800 active:bg-sky-200"
      aria-label={label ?? 'Listen'}
    >
      🔊{label && <span className="text-lg font-semibold">{label}</span>}
    </button>
  )
}

/** Renders `___` as an underlined blank; fills it with `fill` when given. */
export function WithBlanks({ text, fill }: { text: string; fill?: string | string[] }) {
  const parts = text.split(/_{3,}/)
  const out: ReactNode[] = []
  parts.forEach((p, i) => {
    out.push(<span key={`t${i}`}>{p}</span>)
    const f = Array.isArray(fill) ? fill[i] : fill
    if (i < parts.length - 1)
      out.push(
        <span
          key={`b${i}`}
          className={`mx-0.5 inline-block min-w-14 border-b-4 text-center ${
            f ? 'border-emerald-500 font-bold text-emerald-700' : 'border-slate-400'
          }`}
        >
          {f ?? ' '}
        </span>,
      )
  })
  return <>{out}</>
}

export function Card({
  number,
  result,
  children,
}: {
  number: number
  result?: 'correct' | 'wrong' | 'done'
  children: ReactNode
}) {
  const border =
    result === 'correct' || result === 'done'
      ? 'border-emerald-400'
      : result === 'wrong'
        ? 'border-rose-400'
        : 'border-slate-200'
  return (
    <div className={`relative rounded-2xl border-2 bg-white p-4 shadow-sm sm:p-5 ${border}`}>
      <span className="absolute -top-3 -left-3 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow">
        {number}
      </span>
      {children}
    </div>
  )
}

export function Btn({
  children,
  onClick,
  tone = 'plain',
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  tone?: 'plain' | 'primary' | 'good' | 'bad'
  disabled?: boolean
}) {
  const tones = {
    plain: 'bg-slate-100 text-slate-800 active:bg-slate-200',
    primary: 'bg-indigo-600 text-white active:bg-indigo-700',
    good: 'bg-emerald-600 text-white active:bg-emerald-700',
    bad: 'bg-amber-500 text-white active:bg-amber-600',
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-12 rounded-xl px-4 text-lg font-semibold disabled:opacity-40 ${tones[tone]}`}
    >
      {children}
    </button>
  )
}
