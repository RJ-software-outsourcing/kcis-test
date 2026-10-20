import { defineSection } from '../../../components/quiz/types'
import type { ChoiceItem, WriteItem } from '../../../components/quiz/types'

const CODE: Record<string, string> = {
  q: '⭐',
  u: '🌙',
  i: '❤️',
  z: '⚡',
  t: '🌸',
  a: '🍀',
  c: '🔺',
  k: '🔷',
  e: '🟡',
  n: '🎈',
  l: '🍄',
}

// Phonics p.25 key (symbols re-drawn with Unicode dingbats).
const WORKBOOK_CODE: Record<string, string> = {
  a: '✿',
  b: '✪',
  c: '❋',
  d: '❄',
  e: '✓',
  f: '❆',
  g: '✳',
  h: '✴',
  i: '✼',
  j: '✺',
  k: '✱',
  l: '●',
  m: '○',
  n: '■',
  o: '❑',
  p: '✕',
  q: '✖',
  r: '✚',
  s: '†',
  t: '✌\uFE0E',
  u: '✛',
  v: '❖',
  w: '◗',
  x: '|',
  y: '▌',
  z: '▐',
}

function KeyGrid({ code }: { code: Record<string, string> }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-3">
      {Object.entries(code).map(([letter, sym]) => (
        <div key={letter} className="flex w-12 flex-col items-center rounded-lg bg-slate-50 py-1">
          <span className="text-2xl font-bold">{letter}</span>
          <span className="text-2xl">{sym}</span>
        </div>
      ))}
    </div>
  )
}

const WorkbookCodeKey = () => <KeyGrid code={WORKBOOK_CODE} />

const workbookCoded = (word: string): WriteItem => ({
  kind: 'write',
  code: word.split('').map((ch) => WORKBOOK_CODE[ch]),
  answer: word,
})

function CodeKey() {
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white p-3">
      {Object.entries(CODE).map(([letter, sym]) => (
        <div key={letter} className="flex w-14 flex-col items-center rounded-lg bg-slate-50 py-1">
          <span className="text-2xl font-bold">{letter}</span>
          <span className="text-2xl">{sym}</span>
        </div>
      ))}
    </div>
  )
}

const coded = (word: string): WriteItem => ({
  kind: 'write',
  code: word.split('').map((ch) => CODE[ch]),
  answer: word,
})

const beginsLikeQuit = (word: string, yes: boolean, picture?: string): ChoiceItem => ({
  kind: 'choice',
  picture,
  prompt: picture ? undefined : word,
  reveal: picture ? `${picture} ${word}` : undefined,
  noSpeak: !!picture,
  options: ['Yes', 'No'],
  keepOrder: true,
  answer: yes ? 'Yes' : 'No',
})

const fill = (prompt: string, answer: string, options: string[]): ChoiceItem => ({
  kind: 'choice',
  prompt,
  options,
  answer,
})

export const qu = defineSection({
  id: 'qu',
  title: 'Qu / qu',
  subtitle: 'Week 8 Phonics · quiz, quit',
  emoji: '👸',
  parts: [
    {
      source: 'Phonics p.22',
      title: 'Say the picture name. Does it begin the same as quit (qu)?',
      columns: 3,
      items: [
        beginsLikeQuit('queen', true, '👸'),
        beginsLikeQuit('ladybug', false, '🐞'),
        beginsLikeQuit('bird', false, '🐦'),
        beginsLikeQuit('quiz', true, '📝'),
        beginsLikeQuit('quarter', true, '🪙'),
        beginsLikeQuit('quilt', true),
        beginsLikeQuit('question mark', true, '❓'),
        beginsLikeQuit('candle', false, '🕯️'),
      ],
    },
    {
      source: 'Phonics p.25',
      title: 'Use the code to find the qu words. Write each word.',
      aside: WorkbookCodeKey,
      columns: 2,
      items: [
        'quit',
        'queen',
        'quiz',
        'quilt',
        'quack',
        'quill',
        'quick',
        'quiet',
        'quail',
        'question',
      ].map(workbookCoded),
    },
    {
      title: 'Does it begin with the same sound as quit? Choose Yes or No.',
      columns: 3,
      items: [
        beginsLikeQuit('queen', true, '👸'),
        beginsLikeQuit('ladybug', false, '🐞'),
        beginsLikeQuit('question', true, '❓'),
        beginsLikeQuit('bird', false, '🐦'),
        beginsLikeQuit('candle', false, '🕯️'),
        beginsLikeQuit('quiz', true),
        beginsLikeQuit('kit', false),
        beginsLikeQuit('quack', true),
        beginsLikeQuit('win', false),
      ],
    },
    {
      title: 'A new code! Use it to find the qu words. Write each word.',
      aside: CodeKey,
      columns: 2,
      items: [
        coded('quiz'),
        coded('quit'),
        coded('quack'),
        coded('queen'),
        coded('quilt'),
        coded('quick'),
      ],
    },
    {
      title: 'Choose the qu word that completes the sentence.',
      columns: 2,
      items: [
        fill('The duck says, "___!"', 'quack', ['quack', 'queen', 'quiz']),
        fill('We have a spelling ___ on Friday.', 'quiz', ['quit', 'quiz', 'quack']),
        fill('The ___ has a big crown.', 'queen', ['quilt', 'quick', 'queen']),
        fill('Mom put a warm ___ on my bed.', 'quilt', ['quiz', 'quilt', 'queen']),
        fill('The rabbit is very ___.', 'quick', ['quick', 'quilt', 'quack']),
        fill('Do not ___! You can do it!', 'quit', ['queen', 'quiz', 'quit']),
      ],
    },
  ],
})
