export interface ExamMeta {
  /** Route path segment, must equal the exam folder name, e.g. "formative-test-3" */
  slug: string
  title: string
  description?: string
}
