import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { QuizExam } from '../../components/quiz/QuizExam'
import type { Section } from '../../components/quiz/types'
import { itSections } from './it'
import { ltSections } from './lt'
import { meta } from './meta'

interface Track {
  id: 'it' | 'lt'
  title: string
  teacher: string
  date: string
  emoji: string
  topics: string
  sections: Section[]
}

const TRACKS: Track[] = [
  {
    id: 'lt',
    title: 'LT Midterm',
    teacher: 'Local Teacher',
    date: 'Wednesday, November 4',
    emoji: '🏘️',
    topics: 'Vocabulary · Grammar · Garden Party · Click, Clack, Click! · Look Both Ways!',
    sections: ltSections,
  },
  {
    id: 'it',
    title: 'IT Midterm',
    teacher: 'International Teacher',
    date: 'Thursday, November 5',
    emoji: '🌍',
    topics: 'Phonics (short a, e, i, o, u, qu) · Words to Know · Vocabulary · The Blackout · Henry on Wheels · Making a Map',
    sections: itSections,
  },
]

export default function ExamPage() {
  const { track, mode, section, part, size, seed, pick } = useSearch({ from: '/grade-1-midterm-1' })
  const navigate = useNavigate({ from: '/grade-1-midterm-1' })
  const t = TRACKS.find((x) => x.id === track)
  if (!t) return <TrackPicker />
  return (
    <QuizExam
      key={t.id}
      examId={`${meta.slug}-${t.id}`}
      title={`${t.emoji} ${t.title}`}
      intro={
        <>
          <p>
            {t.teacher} · Test day: <b>{t.date}</b>
          </p>
          <p className="mt-1 text-lg text-slate-500">
            📖 Story sections: read the story in myView first, then answer. ✍️ Writing works with
            Apple Pencil or your finger. 🔊 Tap the speaker to listen.
          </p>
        </>
      }
      sections={t.sections}
      mode={mode ?? 'workbook'}
      sectionId={section}
      part={part}
      size={size}
      seed={seed}
      pick={pick?.split(',')}
      mixOnly
      back={{ label: '← IT / LT', onClick: () => navigate({ search: {} }) }}
      onNavigate={(n) =>
        navigate({
          search: {
            track: t.id,
            mode: n.mode === 'mixed' ? 'mixed' : undefined,
            section: n.section,
            part: n.part || undefined,
            size: n.size,
            seed: n.seed,
            pick: n.pick?.join(','),
          },
        })
      }
    />
  )
}

function TrackPicker() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Link to="/" className="text-lg text-indigo-700">
        ← All exams
      </Link>
      <h1 className="mt-2 text-4xl font-bold">{meta.title}</h1>
      <p className="mt-3 text-xl text-slate-700">There are two tests. Which one do you want to practice?</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {TRACKS.map((t) => (
          <Link
            key={t.id}
            to="/grade-1-midterm-1"
            search={{ track: t.id }}
            className="flex flex-col rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm active:border-indigo-400"
          >
            <span className="text-6xl">{t.emoji}</span>
            <span className="mt-3 text-3xl font-bold">{t.title}</span>
            <span className="text-xl text-slate-600">{t.teacher}</span>
            <span className="mt-2 text-xl font-semibold text-rose-600">📅 {t.date}</span>
            <span className="mt-3 text-lg text-slate-500">{t.topics}</span>
          </Link>
        ))}
      </div>
    </main>
  )
}
