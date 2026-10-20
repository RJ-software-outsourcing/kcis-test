import { createFileRoute } from '@tanstack/react-router'
import ExamPage from '../exams/formative-test-3/ExamPage'

interface Search {
  mode?: 'extra'
  section?: string
  part?: number
}

// autoCodeSplitting (vite.config.ts) lazy-loads this component per route.
export const Route = createFileRoute('/formative-test-3')({
  validateSearch: (s: Record<string, unknown>): Search => ({
    mode: s.mode === 'extra' ? 'extra' : undefined,
    section: typeof s.section === 'string' ? s.section : undefined,
    part: typeof s.part === 'number' ? s.part : undefined,
  }),
  component: ExamPage,
})
