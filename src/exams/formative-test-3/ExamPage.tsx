import { useNavigate, useSearch } from '@tanstack/react-router'
import { QuizExam } from '../../components/quiz/QuizExam'
import { letters } from './data/letters'
import { map } from './data/map'
import { predictions } from './data/predictions'
import { qu } from './data/qu'
import { reading } from './data/reading'
import { shortU } from './data/shortU'
import { vocab1, vocab2 } from './data/vocab'
import { words } from './data/words'
import { meta } from './meta'

const sections = [shortU, letters, qu, words, vocab1, vocab2, reading, map, predictions]

export default function ExamPage() {
  const { mode, section, part, size, seed } = useSearch({ from: '/formative-test-3' })
  const navigate = useNavigate({ from: '/formative-test-3' })
  return (
    <QuizExam
      examId={meta.slug}
      title={meta.title}
      intro={
        <>
          <p>
            Unit 3, Weeks 7–8 · Story: <i>Making a Map</i> · Test day: <b>Friday, October 23</b>
          </p>
          <p className="mt-1 text-lg text-slate-500">
            ✍️ Writing questions work with Apple Pencil or your finger. 🔊 Tap the speaker to
            listen.
          </p>
        </>
      }
      sections={sections}
      mode={mode ?? 'workbook'}
      sectionId={section}
      part={part}
      size={size}
      seed={seed}
      onNavigate={(n) =>
        navigate({
          search: {
            mode: n.mode === 'workbook' ? undefined : n.mode,
            section: n.section,
            part: n.part || undefined,
            size: n.size,
            seed: n.seed,
          },
        })
      }
    />
  )
}
