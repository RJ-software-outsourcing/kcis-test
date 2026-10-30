import { useContext, useEffect, useState } from 'react'
import { BearCheer } from '../bear/BearCheer'
import { clearPads } from './HandwritingPad'
import { ExamIdContext, useMixDone, useProgress } from './progress'
import { Question } from './questions'
import type { Item, Section } from './types'
import { Btn, seededRandom, shuffle } from './util'

/** Item ids in the mixed review start with this, so its results never touch the workbook's. */
export const MIX_PREFIX = 'mix/'

export const MIX_SIZES = [10, 20, 30, 50] as const

interface MixItem {
  item: Item
  /** The item's id in its section (the mix renumbers ids to `mix/<n>`) */
  origId: string
  directions: string
  section: Section
}

/** Answered with Apple Pencil or a finger (spelling, sentences, drawings). */
const isWriting = (it: Item) => it.kind === 'write'

/**
 * Items that make sense on their own; handwriting/drawing tasks only when `open`
 * ("✍️ Writing & drawing") is ticked.
 */
const eligible = (it: Item, open = false) => it.kind !== 'predict' && (open || !isWriting(it))

const poolItems = (s: Section, open = false) =>
  s.readFirst ? [] : s.parts.flatMap((p) => (p.aside ? [] : p.items.filter((i) => eligible(i, open))))

export const mixableSections = (sections: Section[], open = false) =>
  sections.filter((s) => poolItems(s, open).length > 0)

/** Number of questions a section adds to the mixed test (leaving out `done` ones). */
export const sectionPoolSize = (s: Section, open = false, done?: Set<string>) =>
  poolItems(s, open).filter((i) => !done?.has(i.id)).length

/** Number of handwriting/drawing tasks in the sections that can be mixed. */
export const writingTaskCount = (sections: Section[]) =>
  sections.reduce((n, s) => n + poolItems(s, true).filter(isWriting).length, 0)

export const mixPoolSize = (sections: Section[], open = false, done?: Set<string>) =>
  sections.reduce((n, s) => n + sectionPoolSize(s, open, done), 0)

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
export function pickMix(
  sections: Section[],
  n: number,
  seed: number,
  open = false,
  done?: Set<string>,
): MixItem[] {
  const random = seededRandom(seed)
  const perSection = (section: Section) => {
    const parts = section.parts
      .filter((p) => !p.aside)
      .map((p) =>
        shuffle(
          p.items
            .filter((i) => eligible(i, open) && !done?.has(i.id))
            .map((item) => ({ item, origId: item.id, directions: p.title, section })),
          random,
        ),
      )
      .filter((q) => q.length)
    return roundRobin(shuffle(parts, random), Infinity)
  }
  const groups = new Map<string, Section[]>()
  for (const s of mixableSections(sections, open)) {
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

// The questions of the mix in progress, so a reload shows the same ones even though the
// "done" memory has changed since they were picked.
const currentKey = (examId: string) => `kcis:${examId}:mix-current`

function restoreMix(examId: string, seed: number, sections: Section[]): MixItem[] | undefined {
  try {
    const saved = JSON.parse(localStorage.getItem(currentKey(examId)) ?? 'null') as {
      seed: number
      ids: string[]
    } | null
    if (saved?.seed !== seed) return undefined
    const all = new Map<string, Omit<MixItem, 'item'> & { item: Item }>()
    for (const section of sections)
      for (const p of section.parts)
        for (const item of p.items) all.set(item.id, { item, origId: item.id, directions: p.title, section })
    const found = saved.ids.map((id) => all.get(id))
    if (found.some((m) => !m)) return undefined
    return found.map((m, i) => ({ ...m!, item: { ...m!.item, id: `${MIX_PREFIX}${i}` } }))
  } catch {
    return undefined
  }
}

function storeMix(examId: string, seed: number, items: MixItem[]) {
  try {
    localStorage.setItem(currentKey(examId), JSON.stringify({ seed, ids: items.map((m) => m.origId) }))
  } catch {
    // ignore
  }
}

export function MixedQuiz({
  sections,
  size,
  seed,
  open,
  title = 'Mixed review',
  onExit,
  onNew,
}: {
  sections: Section[]
  size: number
  seed: number
  /** Also include open writing/drawing tasks */
  open?: boolean
  title?: string
  onExit: () => void
  onNew: () => void
}) {
  const examId = useContext(ExamIdContext)
  const { progress } = useProgress()
  const mixDone = useMixDone()
  const [items] = useState(() => {
    const restored = restoreMix(examId, seed, sections)
    if (restored) return restored
    const picked = pickMix(sections, size, seed, open, mixDone.done)
    storeMix(examId, seed, picked)
    return picked
  })
  const [index, setIndex] = useState(0)
  const [showResults, setShowResults] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index, showResults])

  const results = items.map((m) => progress[m.item.id])
  const good = results.filter((r) => r === 'correct' || r === 'done').length
  const answered = results.filter(Boolean).length
  const current = items[index]

  // Remember what was answered right, so the next mix brings new questions.
  const rightIds = items.filter((_, i) => results[i] === 'correct' || results[i] === 'done').map((m) => m.origId)
  const rightKey = rightIds.join(',')
  useEffect(() => {
    if (rightIds.length) mixDone.add(rightIds)
  }, [rightKey])

  const go = (i: number) => {
    setIndex(i)
    setShowResults(false)
  }
  const mark = (r: string | undefined) =>
    r === 'correct' || r === 'done' ? ' ✅' : r === 'wrong' ? ' ❌' : ''
  const RESULTS = -1

  // Compact navigation: ◀ [dropdown] ▶ and a thin progress bar (fits any number of questions).
  const nav = (
    <>
      <div className="mt-2 flex items-center gap-2">
        <Btn
          disabled={showResults ? false : index === 0}
          onClick={() => go(showResults ? items.length - 1 : index - 1)}
        >
          ◀
        </Btn>
        <select
          aria-label="Go to question"
          value={showResults ? RESULTS : index}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (v === RESULTS) setShowResults(true)
            else go(v)
          }}
          className="min-h-12 flex-1 rounded-xl border-2 border-slate-300 bg-white px-3 text-lg"
        >
          {items.map((m, i) => (
            <option key={m.item.id} value={i}>
              Question {i + 1} of {items.length}
              {mark(results[i])}
            </option>
          ))}
          <option value={RESULTS}>🏁 My score</option>
        </select>
        <Btn
          disabled={showResults}
          onClick={() => (index < items.length - 1 ? go(index + 1) : setShowResults(true))}
        >
          ▶
        </Btn>
      </div>
      <div className="mt-2 flex h-2 gap-px overflow-hidden rounded-full" aria-hidden>
        {results.map((r, i) => (
          <span
            key={i}
            className={`flex-1 ${
              r === 'correct' || r === 'done'
                ? 'bg-emerald-500'
                : r === 'wrong'
                  ? 'bg-rose-500'
                  : i === index && !showResults
                    ? 'bg-indigo-400'
                    : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </>
  )

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
      <header className="sticky top-0 z-10 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Btn onClick={onExit}>← Back</Btn>
          <h1 className="flex-1 truncate text-2xl font-bold">🔀 {title}</h1>
          <span className="text-lg text-slate-600">
            {good}/{items.length}
          </span>
        </div>
        {nav}
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
          onNext={() => (index < items.length - 1 ? setIndex(index + 1) : setShowResults(true))}
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
            <span
              aria-hidden
              className="anim-countdown absolute inset-0 origin-left bg-indigo-400"
            />
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
  // Blankie Bear comes to cheer once every question has an answer.
  return (
    <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-sm">
      {total > 0 && answered === total && <BearCheer correct={good} total={total} />}
      <div className="text-8xl">{face}</div>
      <p className="mt-3 text-4xl font-bold">
        {good} / {total} correct
      </p>
      {answered < total && (
        <p className="mt-2 text-xl text-slate-600">
          {total - answered} not answered yet — pick a question in the list above to go back.
        </p>
      )}
      {answered > good && (
        <p className="mt-2 text-xl text-slate-600">
          Questions marked ❌ in the list above are not right yet. Try them again!
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
