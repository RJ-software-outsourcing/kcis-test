import { createFileRoute } from '@tanstack/react-router'
import ExamPage from '../exams/formative-test-3/ExamPage'

// autoCodeSplitting (vite.config.ts) lazy-loads this component per route.
export const Route = createFileRoute('/formative-test-3')({
  component: ExamPage,
})
