import { useEffect, useMemo, useState } from 'react'
import { clearPads } from './HandwritingPad'
import { useProgress } from './progress'
import { Question } from './questions'
import type { Item, Section } from './types'
import { Btn, seededRandom, shuffle } from './util'

/** Item ids in the mixed review start with this, so its results never touch the workbook's. */
export const MIX_PREFIX = 'mix/'

export const MIX_SIZES = [10, 20, 30, 50] as const

interface MixItem {
  item: Item
  directions: string
  section: Section
}

/** Items that make sense on their own: auto-checked or with an answer to self-check against. */
const eligible = (it: Item) => it.kind !== 'predict' && (it.kind !== 'write' || !!it.answer)

export const mixableSections = (sections: Section[]) =>
  sections.filter(
    (s) => !s.readFirst && s.parts.some((p) => !p.aside && p.items.some(eligible)),
  )

/** Number of questions a section adds to the mixed test. */
export const sectionPoolSize = (s: Section) =>
  s.parts.reduce((m, p) => m + (p.aside ? 0 : p.items.filter(eligible).length), 0)

export const mixPoolSize = (sections: Section[]) =>
  mixableSections(sections).reduce((n, s) => n + sectionPoolSize(s), 0)

/** Round-robin over the queues until `n` items are taken (or all queues are empty). */
function roundRobin<T>(queues: T[][], n: number): T[] {
  const qs = queues.map((q) => [...q])
  const out: T[] = []
  while (out.length < n && qs.some((q) => q.length))
    for (const q of qs) if (q.length && out.length < n) out.push(q.shift()!)
  return out
}

/**
 * Picks `n` items spread as evenly as possible: over the section groups (the test's
 * categories), inside a group over its sections, and inside a section over its parts.
 * The same seed always gives the same questions.
 */
export function pickMix(sections: Section[], n: number, seed: number): MixItem[] {
  const random = seededRandom(seed)
  const perSection = (section: Section) => {
    const parts = section.parts
      .filter((p) => !p.aside)
      .map((p) =>
        shuffle(
          p.items.filter(eligible).map((item) => ({ item, directions: p.title, section })),
          random,
        ),
      )
      .filter((q) => q.length)
    return roundRobin(shuffle(parts, random), Infinity)
  }
  const groups = new Map<string, Section[]>()
  for (const s of mixableSections(sections)) {
    const key = s.group ?? s.id
    groups.set(key, [...(groups.get(key) ?? []), s])
  }
  const perGroup = [...groups.values()].map((g) =>
    roundRobin(shuffle(g.map(perSection), random), Infinity),
  )
  const picked = roundRobin(shuffle(perGroup, random), n)
  return shuffle(picked, random).map((m, i) => ({
    ...m,
    item: { ...m.item, id: `${MIX_PREFIX}${i}` },
  }))
}

export function clearMix(clear: (prefix: string) => void) {
  clear(MIX_PREFIX)
  clearPads(MIX_PREFIX)
}

export function MixedQuiz({
  sections,
  size,
  seed,
  onExit,
  onNew,
}: {
  sections: Section[]
  size: number
  seed: number
  onExit: () => void
  onNew: () => void
}) {
  const { progress } = useProgress()
  const items = useMemo(() => pickMix(sections, size, seed), [sections, size, seed])
  const [index, setIndex] = useState(0)
  const [showResults, setShowResults] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index, showResults])

  const results = items.map((m) => progress[m.item.id])
  const good = results.filter((r) => r === 'correct' || r === 'done').length
  const answered = results.filter(Boolean).length
  const current = items[index]

  const dots = (
    <nav className="mt-3 flex flex-wrap gap-2">
      {items.map((m, i) => {
        const r = results[i]
        const tone =
          r === 'correct' || r === 'done'
            ? 'border-emerald-500 bg-emerald-100'
            : r === 'wrong'
              ? 'border-rose-500 bg-rose-100'
              : 'border-slate-300 bg-white'
        return (
          <button
            key={m.item.id}
            type="button"
            aria-label={`Question ${i + 1}`}
            onClick={() => {
              setIndex(i)
              setShowResults(false)
            }}
            className={`h-11 w-11 shrink-0 rounded-full border-2 text-lg font-semibold ${
              i === index && !showResults ? 'ring-4 ring-indigo-300' : ''
            } ${tone}`}
          >
            {i + 1}
          </button>
        )
      })}
    </nav>
  )

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
      <header className="sticky top-0 z-10 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Btn onClick={onExit}>← Back</Btn>
          <h1 className="flex-1 truncate text-2xl font-bold">🔀 Mixed review</h1>
          <span className="text-lg text-slate-600">
            {good}/{items.length}
          </span>
        </div>
        {dots}
      </header>

      {showResults || !current ? (
        <Results
          good={good}
          total={items.length}
          answered={answered}
          onNew={onNew}
          onExit={onExit}
        />
      ) : (
        <Step
          key={current.item.id}
          mix={current}
          number={index + 1}
          isLast={index === items.length - 1}
          onBack={index > 0 ? () => setIndex(index - 1) : undefined}
          onNext={() =>
            index < items.length - 1 ? setIndex(index + 1) : setShowResults(true)
          }
        />
      )}
    </main>
  )
}

/** Seconds before moving on by itself after a correct answer (matches .anim-countdown). */
const AUTO_NEXT_SECONDS = 3

function Step({
  mix,
  number,
  isLast,
  onBack,
  onNext,
}: {
  mix: MixItem
  number: number
  isLast: boolean
  onBack?: () => void
  onNext: () => void
}) {
  const { progress } = useProgress()
  const result = progress[mix.item.id]
  // Only count down when the answer was given here, not when coming back to an answered one.
  const [initial] = useState(result)
  const autoNext = result === 'correct' && initial !== 'correct'
  useEffect(() => {
    if (!autoNext) return
    const t = setTimeout(onNext, AUTO_NEXT_SECONDS * 1000)
    return () => clearTimeout(t)
  }, [autoNext])

  return (
    <>
      <p className="mt-5 text-lg text-slate-600">
        {mix.section.emoji} {mix.section.title}
      </p>
      <h2 className="mt-1 text-2xl font-semibold text-indigo-900">{mix.directions}</h2>
      <div className="mt-6">
        <Question item={mix.item} number={number} />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {onBack && <Btn onClick={onBack}>← Back</Btn>}
        <span className="flex-1" />
        <button
          type="button"
          onClick={onNext}
          className="relative min-h-12 overflow-hidden rounded-xl bg-indigo-600 px-5 text-lg font-semibold text-white active:bg-indigo-700"
        >
          {autoNext && (
            <span aria-hidden className="anim-countdown absolute inset-0 origin-left bg-indigo-400" />
          )}
          <span className="relative">
            {isLast ? '🏁 See my score' : result ? 'Next →' : 'Skip →'}
          </span>
        </button>
      </div>
    </>
  )
}

function Results({
  good,
  total,
  answered,
  onNew,
  onExit,
}: {
  good: number
  total: number
  answered: number
  onNew: () => void
  onExit: () => void
}) {
  const pct = total ? good / total : 0
  const face = pct === 1 ? '🏆' : pct >= 0.8 ? '🌟' : pct >= 0.5 ? '👍' : '💪'
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-sm">
      <div className="text-8xl">{face}</div>
      <p className="mt-3 text-4xl font-bold">
        {good} / {total} correct
      </p>
      {answered < total && (
        <p className="mt-2 text-xl text-slate-600">
          {total - answered} not answered yet — tap a number above to go back.
        </p>
      )}
      {answered > good && (
        <p className="mt-2 text-xl text-slate-600">
          Red numbers are not right yet. Tap one to try it again!
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Btn tone="primary" onClick={onNew}>
          🔀 New mix
        </Btn>
        <Btn onClick={onExit}>← Back</Btn>
      </div>
    </div>
  )
}
