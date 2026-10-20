import type { ExamMeta } from './types'

// Only meta files are eagerly bundled; exam pages themselves are loaded
// on demand by their route (see src/routes/<slug>.tsx).
const modules = import.meta.glob<{ meta: ExamMeta }>('./*/meta.ts', {
  eager: true,
})

export const exams: ExamMeta[] = Object.values(modules)
  .map((m) => m.meta)
  .sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }))
