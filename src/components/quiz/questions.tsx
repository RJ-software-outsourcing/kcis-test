import { useMemo, useState } from 'react'
import { pickPraise } from '../celebrate'
import { HandwritingPad } from './HandwritingPad'
import { useProgress } from './progress'
import type {
  ChoiceItem,
  Item,
  MatchItem,
  OrderItem,
  PredictItem,
  SelectItem,
  WriteItem,
} from './types'
import { Btn, Card, SpeakButton, WithBlanks, shuffle, speakable } from './util'

type WithId<T> = T & { id: string }

export function Question({ item, number }: { item: Item; number: number }) {
  switch (item.kind) {
    case 'choice':
      return <Choice item={item} number={number} />
    case 'match':
      return <Match item={item} number={number} />
    case 'write':
      return <Write item={item} number={number} />
    case 'predict':
      return <Predict item={item} number={number} />
    case 'select':
      return <Select item={item} number={number} />
    case 'order':
      return <Order item={item} number={number} />
  }
}

function Picture({ emoji }: { emoji: string }) {
  return (
    <div className="flex justify-center text-7xl leading-none select-none" aria-hidden>
      {emoji}
    </div>
  )
}

function Choice({ item, number }: { item: WithId<ChoiceItem>; number: number }) {
  const { progress, setResult } = useProgress()
  const options = useMemo(() => (item.keepOrder ? item.options : shuffle(item.options)), [item])
  const [picked, setPicked] = useState<string | null>(
    progress[item.id] === 'correct' ? item.answer : null,
  )
  const correct = picked === item.answer
  const praise = useMemo(() => pickPraise(), [picked])
  const speakText = item.noSpeak
    ? undefined
    : (item.speak ?? (item.prompt && speakable(item.prompt)))

  const pick = (o: string) => {
    if (picked) return
    setPicked(o)
    setResult(item.id, o === item.answer ? 'correct' : 'wrong')
  }

  return (
    <Card number={number} result={picked ? (correct ? 'correct' : 'wrong') : undefined}>
      {item.picture && <Picture emoji={item.picture} />}
      {(item.prompt || speakText) && (
        <div className="mt-2 flex items-start gap-3">
          {item.prompt && (
            <p className="flex-1 text-2xl leading-relaxed whitespace-pre-line">
              <WithBlanks
                text={item.prompt}
                fill={correct ? (item.fills ?? item.answer) : undefined}
              />
            </p>
          )}
          {speakText && <SpeakButton text={speakText} />}
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((o) => {
          const state =
            picked === o ? (correct ? 'good' : 'bad') : picked && correct ? 'dim' : 'idle'
          const cls = {
            idle: 'border-slate-300 bg-white active:bg-indigo-50',
            good: 'border-emerald-500 bg-emerald-50 text-emerald-800',
            bad: 'border-rose-500 bg-rose-50 text-rose-800',
            dim: 'border-slate-200 text-slate-400',
          }[state]
          return (
            <button
              key={o}
              type="button"
              onClick={() => pick(o)}
              className={`min-h-14 rounded-xl border-2 px-5 py-2 text-left text-2xl ${cls}`}
            >
              {o}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xl">
          {correct ? (
            <span className="font-semibold text-emerald-700">
              🎉 {praise}{item.reveal && <> — {item.reveal}</>}
            </span>
          ) : (
            <>
              <span className="font-semibold text-rose-700">❌ Not yet.</span>
              <Btn
                tone="bad"
                onClick={() => {
                  setPicked(null)
                  setResult(item.id, undefined)
                }}
              >
                ↺ Try again
              </Btn>
            </>
          )}
        </div>
      )}
    </Card>
  )
}

const PAIR_COLORS = [
  'bg-amber-200',
  'bg-sky-200',
  'bg-lime-200',
  'bg-pink-200',
  'bg-violet-200',
  'bg-orange-200',
  'bg-teal-200',
  'bg-rose-200',
]

function Match({ item, number }: { item: WithId<MatchItem>; number: number }) {
  const { progress, setResult } = useProgress()
  const rights = useMemo(() => shuffle(item.pairs.map((p) => p.right)), [item])
  const done = progress[item.id] === 'correct'
  const [assign, setAssign] = useState<Record<number, string>>(() =>
    done ? Object.fromEntries(item.pairs.map((p, i) => [i, p.right])) : {},
  )
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(done)

  const allAssigned = item.pairs.every((_, i) => assign[i])
  const isRight = (i: number) => assign[i] === item.pairs[i].right
  const allRight = item.pairs.every((_, i) => isRight(i))

  const tapRight = (r: string) => {
    if (checked || selected === null) return
    const next = Object.fromEntries(Object.entries(assign).filter(([, v]) => v !== r))
    next[selected] = r
    setAssign(next)
    setSelected(null)
  }

  const check = () => {
    setChecked(true)
    setResult(item.id, allRight ? 'correct' : 'wrong')
  }
  const retry = () => {
    setAssign(Object.fromEntries(Object.entries(assign).filter(([i]) => isRight(Number(i)))))
    setChecked(false)
    setResult(item.id, undefined)
  }

  return (
    <Card number={number} result={checked ? (allRight ? 'correct' : 'wrong') : undefined}>
      <p className="mb-3 text-lg text-slate-600">Tap a word, then tap what it matches.</p>
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,5fr)] gap-x-4 gap-y-3">
        <div className="space-y-3">
          {item.pairs.map((p, i) => (
            <button
              key={p.left}
              type="button"
              onClick={() => !checked && setSelected(selected === i ? null : i)}
              className={`flex min-h-16 w-full items-center gap-2 rounded-xl border-2 px-3 text-left text-2xl font-semibold ${
                selected === i ? 'border-indigo-600 ring-4 ring-indigo-200' : 'border-slate-300'
              } ${assign[i] ? PAIR_COLORS[i % PAIR_COLORS.length] : 'bg-white'}`}
            >
              <span className="flex-1">{p.left}</span>
              {checked && <span>{isRight(i) ? '✅' : '❌'}</span>}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {rights.map((r) => {
            const owner = Object.entries(assign).find(([, v]) => v === r)?.[0]
            const ownerIdx = owner === undefined ? undefined : Number(owner)
            return (
              <button
                key={r}
                type="button"
                onClick={() => tapRight(r)}
                className={`flex min-h-16 w-full items-center gap-2 rounded-xl border-2 border-slate-300 px-3 py-2 text-left text-lg sm:text-xl ${
                  ownerIdx !== undefined ? PAIR_COLORS[ownerIdx % PAIR_COLORS.length] : 'bg-white'
                } ${selected !== null && !checked ? 'active:border-indigo-500' : ''}`}
              >
                <span className="flex-1">{r}</span>
                {ownerIdx !== undefined && (
                  <span className="rounded-lg bg-white/70 px-2 text-base font-semibold">
                    {item.pairs[ownerIdx].left}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xl">
        {!checked && (
          <Btn tone="primary" onClick={check} disabled={!allAssigned}>
            Check
          </Btn>
        )}
        {checked && allRight && (
          <span className="font-semibold text-emerald-700">✅ All correct!</span>
        )}
        {checked && !allRight && (
          <>
            <span className="font-semibold text-rose-700">❌ Some are not right yet.</span>
            <Btn tone="bad" onClick={retry}>
              ↺ Fix the wrong ones
            </Btn>
          </>
        )}
      </div>
    </Card>
  )
}

function Write({ item, number }: { item: WithId<WriteItem>; number: number }) {
  const { progress, setResult } = useProgress()
  const result = progress[item.id]
  const [revealed, setRevealed] = useState(false)

  return (
    <Card number={number} result={result}>
      {item.picture && <Picture emoji={item.picture} />}
      {item.code && (
        <div className="flex justify-center gap-2">
          {item.code.map((s, i) => (
            <span
              key={i}
              className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-slate-300 text-3xl"
            >
              {s}
            </span>
          ))}
        </div>
      )}
      {(item.prompt || item.speak) && (
        <div className="mt-2 flex items-start gap-3">
          {item.prompt && <p className="flex-1 text-2xl leading-relaxed">{item.prompt}</p>}
          {item.speak && (
            <SpeakButton text={item.speak} label={item.prompt ? undefined : 'Listen'} />
          )}
        </div>
      )}
      {item.lines !== 0 && (
        <div className="mt-3">
          <HandwritingPad id={item.id} lines={item.lines} />
        </div>
      )}
      {item.draw && (
        <div className="mt-3">
          {item.lines !== 0 && <p className="mb-1 text-lg text-slate-600">🎨 Draw a picture:</p>}
          <HandwritingPad id={`${item.id}#draw`} mode="draw" />
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xl">
        {item.answer ? (
          revealed || result ? (
            <>
              <span className="rounded-xl bg-amber-50 px-4 py-2 text-3xl font-bold tracking-wide text-amber-900">
                {item.answer}
              </span>
              {result === 'correct' ? (
                <span className="font-semibold text-emerald-700">✅ You got it!</span>
              ) : (
                <>
                  <Btn tone="good" onClick={() => setResult(item.id, 'correct')}>
                    ✓ I got it
                  </Btn>
                  <Btn
                    tone="bad"
                    onClick={() => {
                      setResult(item.id, 'wrong')
                      setRevealed(false)
                    }}
                  >
                    ↺ Try again
                  </Btn>
                </>
              )}
            </>
          ) : (
            <Btn tone="primary" onClick={() => setRevealed(true)}>
              👀 Show answer
            </Btn>
          )
        ) : result === 'done' ? (
          <span className="font-semibold text-emerald-700">✅ Done!</span>
        ) : (
          <Btn tone="good" onClick={() => setResult(item.id, 'done')}>
            ✓ Done
          </Btn>
        )}
      </div>
    </Card>
  )
}

function Predict({ item, number }: { item: WithId<PredictItem>; number: number }) {
  return item.options ? (
    <PredictChoice item={item} options={item.options} number={number} />
  ) : (
    <PredictWrite item={item} number={number} />
  )
}

function StoryBox({ text, tone }: { text: string; tone: 'before' | 'after' }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl p-4 ${tone === 'before' ? 'bg-amber-50' : 'bg-sky-50'}`}
    >
      <p className="flex-1 text-2xl leading-relaxed">{text}</p>
      <SpeakButton text={text} />
    </div>
  )
}

function PredictQuestion({ text }: { text: string }) {
  return (
    <div className="mt-4 flex items-start gap-3">
      <p className="flex-1 text-2xl font-semibold">🔮 {text}</p>
      <SpeakButton text={text} />
    </div>
  )
}

function PredictChoice({
  item,
  options: rawOptions,
  number,
}: {
  item: WithId<PredictItem>
  options: string[]
  number: number
}) {
  const { setResult } = useProgress()
  const options = useMemo(() => shuffle(rawOptions), [rawOptions])
  const [picked, setPicked] = useState<string | null>(null)
  const right = picked === item.answer

  return (
    <Card number={number} result={picked ? (right ? 'correct' : 'wrong') : undefined}>
      <StoryBox text={item.before} tone="before" />
      <PredictQuestion text={item.question} />
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            disabled={!!picked}
            onClick={() => {
              setPicked(o)
              setResult(item.id, o === item.answer ? 'correct' : 'wrong')
            }}
            className={`min-h-14 rounded-xl border-2 px-5 py-2 text-left text-2xl ${
              picked === o
                ? 'border-indigo-600 bg-indigo-50'
                : picked && o === item.answer
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-300 bg-white'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {picked && (
        <>
          <p className="mt-4 text-lg font-semibold text-slate-600">📖 Read on to check:</p>
          <div className="mt-1">
            <StoryBox text={item.after} tone="after" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xl">
            {right ? (
              <span className="font-semibold text-emerald-700">
                ✅ Your prediction was correct!
              </span>
            ) : (
              <span className="font-semibold text-rose-700">
                ✏️ Let's correct it: <span className="text-slate-900">{item.answer}</span>
              </span>
            )}
            <Btn
              onClick={() => {
                setPicked(null)
                setResult(item.id, undefined)
              }}
            >
              ↺ Try again
            </Btn>
          </div>
        </>
      )}
    </Card>
  )
}

function PredictWrite({ item, number }: { item: WithId<PredictItem>; number: number }) {
  const { progress, setResult } = useProgress()
  const result = progress[item.id]
  const [shown, setShown] = useState(!!result)

  return (
    <Card number={number} result={result ? 'done' : undefined}>
      <StoryBox text={item.before} tone="before" />
      <PredictQuestion text={item.question} />
      <div className="mt-3">
        <HandwritingPad id={item.id} lines={2} />
      </div>
      {!shown ? (
        <div className="mt-3">
          <Btn tone="primary" onClick={() => setShown(true)}>
            📖 Read on
          </Btn>
        </div>
      ) : (
        <>
          <div className="mt-4">
            <StoryBox text={item.after} tone="after" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xl">
            <span className="font-semibold">Was your prediction correct?</span>
            {result ? (
              <span className="font-semibold text-emerald-700">
                {result === 'correct'
                  ? '✅ Yes!'
                  : "✏️ No — that's OK, now you know what happened."}
              </span>
            ) : (
              <>
                <Btn tone="good" onClick={() => setResult(item.id, 'correct')}>
                  Yes
                </Btn>
                <Btn tone="bad" onClick={() => setResult(item.id, 'done')}>
                  No
                </Btn>
              </>
            )}
          </div>
        </>
      )}
    </Card>
  )
}

const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, '')

function Select({ item, number }: { item: WithId<SelectItem>; number: number }) {
  const { progress, setResult } = useProgress()
  const tokens = useMemo(() => item.text.split(/\s+/), [item])
  const targets = useMemo(() => new Set(item.answers.map(norm)), [item])
  const optional = useMemo(() => new Set((item.optional ?? []).map(norm)), [item])
  const isTarget = (i: number) => targets.has(norm(tokens[i]))
  const isOptional = (i: number) => optional.has(norm(tokens[i]))
  const done = progress[item.id] === 'correct'
  const [picked, setPicked] = useState<Set<number>>(
    () => new Set(done ? tokens.map((_, i) => i).filter(isTarget) : []),
  )
  const [checked, setChecked] = useState(done)
  const allRight = tokens.every((_, i) => isOptional(i) || picked.has(i) === isTarget(i))

  const toggle = (i: number) => {
    if (checked) return
    const next = new Set(picked)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setPicked(next)
  }

  return (
    <Card number={number} result={checked ? (allRight ? 'correct' : 'wrong') : undefined}>
      {item.prompt && (
        <div className="flex items-start gap-3">
          <p className="flex-1 text-xl font-semibold text-slate-700">{item.prompt}</p>
          {item.speak && <SpeakButton text={item.text} />}
        </div>
      )}
      <p className="mt-3 flex flex-wrap gap-2 text-2xl leading-relaxed">
        {tokens.map((t, i) => {
          const on = picked.has(i)
          const tone = !checked
            ? on
              ? 'border-indigo-600 bg-indigo-100'
              : 'border-transparent bg-slate-50'
            : on && (isTarget(i) || isOptional(i))
              ? 'border-emerald-500 bg-emerald-100'
              : on
                ? 'border-rose-500 bg-rose-100'
                : 'border-transparent'
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={`min-h-12 rounded-lg border-2 px-2 ${tone}`}
            >
              {t}
            </button>
          )
        })}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xl">
        {!checked && (
          <Btn
            tone="primary"
            disabled={!picked.size}
            onClick={() => {
              setChecked(true)
              setResult(item.id, allRight ? 'correct' : 'wrong')
            }}
          >
            Check
          </Btn>
        )}
        {checked && allRight && <span className="font-semibold text-emerald-700">✅ All correct!</span>}
        {checked && !allRight && (
          <>
            <span className="font-semibold text-rose-700">❌ Not yet.</span>
            <Btn
              tone="bad"
              onClick={() => {
                setPicked(new Set([...picked].filter((i) => isTarget(i) || isOptional(i))))
                setChecked(false)
                setResult(item.id, undefined)
              }}
            >
              ↺ Try again
            </Btn>
          </>
        )}
      </div>
    </Card>
  )
}

function Order({ item, number }: { item: WithId<OrderItem>; number: number }) {
  const { progress, setResult } = useProgress()
  // Pieces are tracked by index, so repeated words (e.g. "the") still work.
  const pool = useMemo(() => shuffle(item.pieces.map((_, i) => i)), [item])
  const done = progress[item.id] === 'correct'
  const [order, setOrder] = useState<number[]>(() => (done ? item.pieces.map((_, i) => i) : []))
  const [checked, setChecked] = useState(done)
  const text = (i: number) => item.pieces[i]
  const allRight = order.every((p, i) => text(p) === item.pieces[i])
  const full = order.length === item.pieces.length
  const v = item.vertical

  const piece = (i: number, onClick: () => void, tone: string) => (
    <button
      key={i}
      type="button"
      onClick={onClick}
      className={`min-h-12 rounded-xl border-2 px-3 py-2 text-left text-2xl ${tone} ${v ? 'w-full' : ''}`}
    >
      {text(i)}
    </button>
  )

  return (
    <Card number={number} result={checked ? (allRight ? 'correct' : 'wrong') : undefined}>
      {item.prompt && <p className="text-xl font-semibold text-slate-700">{item.prompt}</p>}
      <div
        className={`mt-3 flex min-h-16 gap-2 rounded-xl border-2 border-dashed border-slate-300 p-2 ${
          v ? 'flex-col' : 'flex-wrap'
        }`}
      >
        {order.length === 0 && (
          <span className="self-center px-2 text-lg text-slate-400">Tap the pieces below in order.</span>
        )}
        {order.map((p, i) => (
          <div key={p} className={`flex items-center gap-2 ${v ? '' : 'contents'}`}>
            {v && <span className="w-8 text-xl font-bold text-slate-500">{i + 1}.</span>}
            {piece(
              p,
              () => !checked && setOrder(order.filter((x) => x !== p)),
              checked
                ? text(p) === item.pieces[i]
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-rose-500 bg-rose-50'
                : 'border-indigo-400 bg-indigo-50',
            )}
          </div>
        ))}
      </div>
      {!checked && (
        <div className={`mt-3 flex gap-2 ${v ? 'flex-col' : 'flex-wrap'}`}>
          {pool
            .filter((p) => !order.includes(p))
            .map((p) => piece(p, () => setOrder([...order, p]), 'border-slate-300 bg-white'))}
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xl">
        {!checked && (
          <Btn
            tone="primary"
            disabled={!full}
            onClick={() => {
              setChecked(true)
              setResult(item.id, allRight ? 'correct' : 'wrong')
            }}
          >
            Check
          </Btn>
        )}
        {!checked && order.length > 0 && <Btn onClick={() => setOrder([])}>Clear</Btn>}
        {checked && allRight && <span className="font-semibold text-emerald-700">✅ All correct!</span>}
        {checked && !allRight && (
          <>
            <span className="font-semibold text-rose-700">❌ Not yet.</span>
            <Btn
              tone="bad"
              onClick={() => {
                // Keep the correct beginning, return the rest to the pool.
                const keep = order.findIndex((p, i) => text(p) !== item.pieces[i])
                setOrder(order.slice(0, keep))
                setChecked(false)
                setResult(item.id, undefined)
              }}
            >
              ↺ Try again
            </Btn>
          </>
        )}
      </div>
    </Card>
  )
}
