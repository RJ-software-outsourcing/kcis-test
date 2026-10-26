import { useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { MIX_SIZES, mixPoolSize, mixableSections, openTaskCount, sectionPoolSize } from './MixedQuiz'
import { ExamIdContext } from './progress'
import type { Section } from './types'
import { Btn } from './util'

// Remembers what was left out (not what was picked), so new sections start included.
const storageKey = (examId: string) => `kcis:${examId}:mix-excluded`
const openKey = (examId: string) => `kcis:${examId}:mix-open`

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // storage unavailable — the choice lasts for this visit only
  }
}

function loadExcluded(examId: string): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(storageKey(examId)) ?? '[]') as string[])
  } catch {
    return new Set()
  }
}

/**
 * Mixed test setup: tick what to include (everything by default), then pick how many
 * questions. `onStart` gets the size, the chosen section ids (undefined = all) and
 * whether open writing/drawing tasks are included (off by default).
 */
export function MixPicker({
  sections,
  title,
  onStart,
}: {
  sections: Section[]
  title: string
  onStart: (size: number, pick?: string[], open?: boolean) => void
}) {
  const examId = useContext(ExamIdContext)
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem(openKey(examId)) === '1'
    } catch {
      return false
    }
  })
  const all = mixableSections(sections, true)
  const openTasks = openTaskCount(all)
  const [excluded, setExcluded] = useState(() => loadExcluded(examId))
  const save = (next: Set<string>) => {
    setExcluded(next)
    store(storageKey(examId), JSON.stringify([...next]))
  }
  const picked = all.filter((s) => !excluded.has(s.id))
  const pool = mixPoolSize(picked, open)
  const groups = all.reduce<{ name?: string; sections: Section[] }[]>((acc, s) => {
    const g = acc.find((x) => x.name === s.group)
    if (g) g.sections.push(s)
    else acc.push({ name: s.group, sections: [s] })
    return acc
  }, [])

  const toggle = (ids: string[], on: boolean) => {
    const next = new Set(excluded)
    for (const id of ids) {
      if (on) next.delete(id)
      else next.add(id)
    }
    save(next)
  }
  const start = (n: number) =>
    onStart(n, picked.length === all.length ? undefined : picked.map((s) => s.id), open)

  if (!all.length) return null
  return (
    <div className="mt-6 rounded-2xl border-2 border-violet-200 bg-violet-50 p-5">
      <div className="flex items-center gap-4">
        <span className="text-5xl">🔀</span>
        <span className="flex-1">
          <span className="block text-2xl font-bold text-violet-900">{title}</span>
          <span className="block text-lg text-violet-900/80">
            Questions that don't need the myView story, all mixed up. Tick what to include.
          </span>
        </span>
      </div>

      {groups.map((g) => {
        const ids = g.sections.map((s) => s.id)
        const on = ids.filter((id) => !excluded.has(id)).length
        return (
          <div key={g.name ?? ids[0]} className="mt-5">
            {g.name && (
              <Check
                checked={on === ids.length}
                mixed={on > 0 && on < ids.length}
                onChange={(v) => toggle(ids, v)}
                className="text-xl font-bold text-violet-900"
              >
                {g.name}
              </Check>
            )}
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {g.sections.map((s) => (
                <Check
                  key={s.id}
                  checked={!excluded.has(s.id)}
                  onChange={(v) => toggle([s.id], v)}
                  className="rounded-xl bg-white px-3 text-lg"
                >
                  <span className="flex-1">
                    {s.emoji} {s.title}
                  </span>
                  <span className="text-base text-slate-500">{sectionPoolSize(s, open)}</span>
                </Check>
              ))}
            </div>
          </div>
        )
      })}

      {openTasks > 0 && (
        <div className="mt-5">
          <Check
            checked={open}
            onChange={(v) => {
              setOpen(v)
              store(openKey(examId), v ? '1' : '0')
            }}
            className="rounded-xl bg-white px-3 text-lg"
          >
            <span className="flex-1">
              ✍️ Writing &amp; drawing
              <span className="block text-base text-slate-500">
                Open tasks with no answer key (write a sentence, draw a picture). Tap Done when
                finished.
              </span>
            </span>
          </Check>
        </div>
      )}

      <p className="mt-5 text-lg font-semibold text-violet-900">How many questions?</p>
      <div className="mt-2 flex flex-wrap gap-3">
        {MIX_SIZES.filter((n) => n < pool).map((n) => (
          <Btn key={n} tone="primary" onClick={() => start(n)}>
            {n}
          </Btn>
        ))}
        <Btn tone="primary" disabled={!pool} onClick={() => start(pool)}>
          All {pool}
        </Btn>
      </div>
    </div>
  )
}

function Check({
  checked,
  mixed,
  onChange,
  className,
  children,
}: {
  checked: boolean
  mixed?: boolean
  onChange: (checked: boolean) => void
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={mixed ? 'mixed' : checked}
      onClick={() => onChange(!checked)}
      className={`flex min-h-12 w-full items-center gap-3 text-left ${className ?? ''}`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 text-lg font-bold text-white ${
          checked || mixed ? 'border-violet-600 bg-violet-600' : 'border-slate-400 bg-white'
        }`}
      >
        {checked ? '✓' : mixed ? '–' : ''}
      </span>
      {children}
    </button>
  )
}
