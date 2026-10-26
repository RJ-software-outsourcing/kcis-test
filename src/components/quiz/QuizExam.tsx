import { Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { CelebrationHost } from '../celebrate'
import { clearPads } from './HandwritingPad'
import { MixPicker } from './MixPicker'
import { MixedQuiz, clearMix } from './MixedQuiz'
import { ExamIdContext, useProgress } from './progress'
import { Question } from './questions'
import type { Section } from './types'
import { Btn } from './util'

/**
 * Parts with a `source` (workbook questions) form the default "workbook" mode;
 * parts without one are shown separately under "extra" practice.
 */
export type Mode = 'workbook' | 'extra' | 'mixed'

export interface ExamNav {
  mode?: Mode
  section?: string
  part?: number
  /** Mixed review: number of questions and the seed that picked them */
  size?: number
  seed?: number
  /** Mixed review: the sections to draw from (undefined = all) */
  pick?: string[]
  /** Mixed review: also include open writing/drawing tasks */
  open?: boolean
}

export interface QuizExamProps {
  examId: string
  title: string
  intro?: ReactNode
  sections: Section[]
  mode?: Mode
  sectionId?: string
  part?: number
  size?: number
  seed?: number
  pick?: string[]
  open?: boolean
  /**
   * Sections without `readFirst` are practiced only through the mixed test
   * (no section cards for them); story sections keep their cards.
   */
  mixOnly?: boolean
  /** Replaces the "← All exams" link (e.g. to go back to a track picker) */
  back?: { label: string; onClick: () => void }
  onNavigate: (nav: ExamNav) => void
}

type Nav = (section?: string, part?: number) => void

const filterMode = (sections: Section[], mode: Mode): Section[] =>
  sections
    .map((s) => ({ ...s, parts: s.parts.filter((p) => (mode === 'workbook') === !!p.source) }))
    .filter((s) => s.parts.length > 0)

/** Generic exam UI: a grid of section cards, and a section view showing one part at a time. */
export function QuizExam(props: QuizExamProps) {
  return (
    <ExamIdContext.Provider value={props.examId}>
      <Inner {...props} />
      <CelebrationHost />
    </ExamIdContext.Provider>
  )
}

function Inner({
  title,
  intro,
  sections,
  mode = 'workbook',
  sectionId,
  part = 0,
  size,
  seed,
  pick,
  open,
  mixOnly,
  back,
  onNavigate,
}: QuizExamProps) {
  const { clear } = useProgress()
  const workbook = useMemo(() => filterMode(sections, 'workbook'), [sections])
  const extra = useMemo(() => filterMode(sections, 'extra'), [sections])
  const list = mode === 'extra' ? extra : workbook
  const idx = list.findIndex((s) => s.id === sectionId)
  const nav: Nav = (section, p) => onNavigate({ mode, section, part: p })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [mode, sectionId, part])
  const startMix = (n: number, only?: string[], withOpen?: boolean) => {
    clearMix(clear)
    onNavigate({
      mode: 'mixed',
      size: n,
      seed: Math.floor(Math.random() * 1e9),
      pick: only,
      open: withOpen || undefined,
    })
  }
  if (mode === 'mixed' && size && seed !== undefined)
    return (
      <MixedQuiz
        sections={pick ? sections.filter((s) => pick.includes(s.id)) : sections}
        size={size}
        seed={seed}
        open={open}
        title={mixOnly ? 'Mixed test' : 'Mixed review'}
        onExit={() => onNavigate({})}
        onNew={() => startMix(size, pick, open)}
      />
    )
  if (idx < 0)
    return (
      <Landing
        title={title}
        intro={intro}
        mode={mode}
        sections={mode === 'mixed' ? workbook : list}
        allSections={sections}
        workbook={workbook}
        hasExtra={extra.length > 0}
        mixOnly={mixOnly}
        back={back}
        onStartMix={startMix}
        onNavigate={onNavigate}
      />
    )
  return (
    <SectionView
      section={list[idx]}
      next={list[idx + 1]}
      part={Math.min(Math.max(part, 0), list[idx].parts.length - 1)}
      onNavigate={nav}
      onFinish={() =>
        onNavigate(mode === 'workbook' && extra.length ? { mode: 'extra' } : { mode })
      }
      finishLabel={
        mode === 'workbook' && extra.length ? '✨ Go to Extra practice →' : '🎉 Back to sections'
      }
    />
  )
}

function useStats(prefix: string, ids: string[]) {
  const { progress } = useProgress()
  const answered = ids.filter((id) => progress[id]).length
  const good = ids.filter((id) => progress[id] === 'correct' || progress[id] === 'done').length
  return { answered, good, total: ids.length, prefix }
}

const itemIds = (s: Section) => s.parts.flatMap((p) => p.items.map((i) => i.id))

function Landing({
  title,
  intro,
  mode,
  sections,
  allSections,
  workbook,
  hasExtra,
  mixOnly,
  back,
  onStartMix,
  onNavigate,
}: Pick<QuizExamProps, 'title' | 'intro' | 'back' | 'onNavigate'> & {
  mode: Mode
  sections: Section[]
  allSections: Section[]
  workbook: Section[]
  hasExtra: boolean
  mixOnly?: boolean
  onStartMix: (n: number, pick?: string[], open?: boolean) => void
}) {
  const { clear } = useProgress()
  const sectionMode = mode === 'extra' ? 'extra' : 'workbook'
  const cards = mixOnly ? sections.filter((s) => s.readFirst) : sections
  const wb = useStats('', (mixOnly ? cards : workbook).flatMap(itemIds))
  const picker = sectionMode === 'workbook' && (
    <MixPicker
      sections={allSections}
      title={mixOnly ? 'Mixed test' : 'Mixed review'}
      onStart={onStartMix}
    />
  )
  const groups = cards.reduce<{ name?: string; sections: Section[] }[]>((acc, s) => {
    const last = acc[acc.length - 1]
    if (last && last.name === s.group) last.sections.push(s)
    else acc.push({ name: s.group, sections: [s] })
    return acc
  }, [])
  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      {back ? (
        <button type="button" onClick={back.onClick} className="min-h-12 text-lg text-indigo-700">
          {back.label}
        </button>
      ) : (
        <Link to="/" className="text-lg text-indigo-700">
          ← All exams
        </Link>
      )}
      <h1 className="mt-2 text-4xl font-bold">{title}</h1>
      {intro && <div className="mt-3 text-xl text-slate-700">{intro}</div>}

      {mixOnly && picker}

      {mixOnly ? null : sectionMode === 'workbook' ? (
        <div className="mt-6 rounded-2xl bg-amber-50 p-4">
          <h2 className="text-2xl font-bold text-amber-900">📘 Workbook review</h2>
          <p className="text-lg text-amber-900/80">
            All the questions from the workbooks. Do these first! ({wb.good} / {wb.total} done)
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl bg-indigo-50 p-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-indigo-900">✨ Extra practice</h2>
            <p className="text-lg text-indigo-900/80">New questions for more practice.</p>
          </div>
          <Btn onClick={() => onNavigate({})}>← Workbook review</Btn>
        </div>
      )}

      {groups.map((g, gi) => (
        <section key={gi} className="mt-6">
          {g.name && <h2 className="text-2xl font-bold text-slate-800">{g.name}</h2>}
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.sections.map((s) => (
              <SectionCard
                key={s.id}
                section={s}
                onOpen={() => onNavigate({ mode: sectionMode, section: s.id, part: 0 })}
              />
            ))}
          </div>
        </section>
      ))}

      {!mixOnly && picker}

      {sectionMode === 'workbook' && hasExtra && (
        <button
          type="button"
          onClick={() => onNavigate({ mode: 'extra' })}
          className="mt-8 flex w-full items-center gap-4 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-5 text-left active:border-indigo-400"
        >
          <span className="text-5xl">✨</span>
          <span className="flex-1">
            <span className="block text-2xl font-bold text-indigo-900">Extra practice</span>
            <span className="block text-lg text-indigo-900/80">
              Finished the workbook? Try new questions on the same topics.
            </span>
          </span>
          <span className="text-3xl text-indigo-700">→</span>
        </button>
      )}

      <div className="mt-8">
        <Btn
          onClick={() => {
            if (confirm('Clear all answers for this exam?')) {
              clear('')
              clearPads('')
            }
          }}
        >
          🗑️ Reset all progress
        </Btn>
      </div>
    </main>
  )
}

function SectionCard({ section, onOpen }: { section: Section; onOpen: () => void }) {
  const { answered, good, total } = useStats(section.id, itemIds(section))
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-sm active:border-indigo-400"
    >
      <span className="text-5xl">{section.emoji}</span>
      <span className="mt-2 text-2xl font-bold">{section.title}</span>
      <span className="text-lg text-slate-600">{section.subtitle}</span>
      {section.readFirst && (
        <span className="mt-2 rounded-lg bg-sky-50 px-2 py-1 text-base text-sky-900">
          📖 Read first: {section.readFirst}
        </span>
      )}
      <span className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <span
          className="block h-full bg-emerald-500"
          style={{ width: `${(good / total) * 100}%` }}
        />
      </span>
      <span className="mt-1 text-base text-slate-500">
        {good} / {total} correct{answered > good && ` · ${answered - good} to try again`}
      </span>
    </button>
  )
}

function SectionView({
  section,
  next,
  part,
  onNavigate,
  onFinish,
  finishLabel,
}: {
  section: Section
  next?: Section
  part: number
  onNavigate: Nav
  onFinish: () => void
  finishLabel: string
}) {
  const { clear } = useProgress()
  const [resetKey, setResetKey] = useState(0)
  const { good, total } = useStats(section.id, itemIds(section))
  const p = section.parts[part]
  const isLast = part === section.parts.length - 1
  const Aside = p.aside
  // With an aside (e.g. a map) on wide screens, items share the page with it: one column.
  const cols = Aside
    ? {
        1: '',
        2: 'md:grid-cols-2 min-[1100px]:grid-cols-1',
        3: 'md:grid-cols-2 min-[1100px]:grid-cols-1',
      }[p.columns ?? 1]
    : { 1: '', 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3' }[p.columns ?? 1]

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <header className="sticky top-0 z-10 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Btn onClick={() => onNavigate()}>← Sections</Btn>
          <h1 className="flex-1 truncate text-2xl font-bold">
            {section.emoji} {section.title}
          </h1>
          <span className="text-lg text-slate-600">
            {good}/{total}
          </span>
        </div>
        <nav className="mt-3 flex gap-2 overflow-x-auto">
          {section.parts.map((sp, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Part ${i + 1}${sp.source ? ` (${sp.source})` : ''}`}
              onClick={() => onNavigate(section.id, i)}
              className={`h-11 w-11 shrink-0 rounded-full border-2 text-lg font-semibold ${
                i === part
                  ? 'border-indigo-600 bg-indigo-600 text-white'
                  : 'border-slate-300 bg-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>
      </header>

      {section.readFirst && part === 0 && (
        <div className="mt-5 rounded-2xl bg-sky-50 p-4 text-xl text-sky-900">
          📖 Read the story first: <b>{section.readFirst}</b>. Then answer the questions.
          {section.links && (
            <div className="mt-2 flex flex-wrap gap-3">
              {section.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center rounded-xl bg-white px-4 text-lg font-semibold text-sky-800 shadow-sm"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      )}
      <h2 className="mt-5 text-2xl font-semibold text-indigo-900">
        {p.source && (
          <span className="mr-2 inline-block rounded-lg bg-amber-100 px-2 py-1 text-lg text-amber-900">
            📘 {p.source}
          </span>
        )}
        <span className="mr-2 rounded-lg bg-indigo-100 px-2 py-1 text-lg">
          {p.source ? 'Directions' : '✨ Extra practice'}
        </span>
        {p.title}
      </h2>
      <div
        className={
          Aside
            ? 'min-[1100px]:grid min-[1100px]:grid-cols-2 min-[1100px]:items-start min-[1100px]:gap-6'
            : ''
        }
      >
        {Aside && (
          <div className="mt-4 min-[1100px]:sticky min-[1100px]:top-32">
            <Aside />
          </div>
        )}
        <div key={`${p.id}:${resetKey}`} className={`mt-6 grid gap-7 ${cols}`}>
          {p.items.map((item, i) => (
            <Question key={item.id} item={item} number={i + 1} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {part > 0 && <Btn onClick={() => onNavigate(section.id, part - 1)}>← Part {part}</Btn>}
        <span className="flex-1" />
        <Btn
          onClick={() => {
            if (confirm('Clear your answers in this part?')) {
              clear(`${p.id}/`)
              clearPads(`${p.id}/`)
              setResetKey((k) => k + 1)
            }
          }}
        >
          🗑️ Reset part
        </Btn>
        {!isLast && (
          <Btn tone="primary" onClick={() => onNavigate(section.id, part + 1)}>
            Part {part + 2} →
          </Btn>
        )}
        {isLast && next && (
          <Btn tone="primary" onClick={() => onNavigate(next.id, 0)}>
            Next: {next.title} →
          </Btn>
        )}
        {isLast && !next && (
          <Btn tone="primary" onClick={onFinish}>
            {finishLabel}
          </Btn>
        )}
      </div>
    </main>
  )
}
