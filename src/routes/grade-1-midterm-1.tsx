import { createFileRoute } from '@tanstack/react-router'
import ExamPage from '../exams/grade-1-midterm-1/ExamPage'

interface Search {
  track?: 'it' | 'lt'
  mode?: 'mixed'
  section?: string
  part?: number
  size?: number
  seed?: number
  /** Mixed review: comma-separated section ids */
  pick?: string
}

// autoCodeSplitting (vite.config.ts) lazy-loads this component per route.
export const Route = createFileRoute('/grade-1-midterm-1')({
  validateSearch: (s: Record<string, unknown>): Search => ({
    track: s.track === 'it' || s.track === 'lt' ? s.track : undefined,
    mode: s.mode === 'mixed' ? 'mixed' : undefined,
    section: typeof s.section === 'string' ? s.section : undefined,
    part: typeof s.part === 'number' ? s.part : undefined,
    size: typeof s.size === 'number' ? s.size : undefined,
    seed: typeof s.seed === 'number' ? s.seed : undefined,
    pick: typeof s.pick === 'string' && s.pick ? s.pick : undefined,
  }),
  component: ExamPage,
})
