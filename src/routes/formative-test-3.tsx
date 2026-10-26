import { createFileRoute } from '@tanstack/react-router'
import ExamPage from '../exams/formative-test-3/ExamPage'

interface Search {
  mode?: 'extra' | 'mixed'
  section?: string
  part?: number
  size?: number
  seed?: number
  /** Mixed review: comma-separated section ids */
  pick?: string
  /** Mixed review: include open writing/drawing tasks */
  open?: boolean
}

// autoCodeSplitting (vite.config.ts) lazy-loads this component per route.
export const Route = createFileRoute('/formative-test-3')({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: s.mode === 'extra' || s.mode === 'mixed' ? s.mode : undefined,
    section: typeof s.section === 'string' ? s.section : undefined,
    part: typeof s.part === 'number' ? s.part : undefined,
    size: typeof s.size === 'number' ? s.size : undefined,
    seed: typeof s.seed === 'number' ? s.seed : undefined,
    pick: typeof s.pick === 'string' && s.pick ? s.pick : undefined,
    open: s.open === true ? true : undefined,
  }),
  component: ExamPage,
})
