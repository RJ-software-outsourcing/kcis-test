import { Link, createFileRoute } from '@tanstack/react-router'
import { exams } from '../exams'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Exams</h1>
      <ul className="mt-6 space-y-3">
        {exams.map((exam) => (
          <li key={exam.slug}>
            {/* exam.slug is dynamic, so the typed `to` is widened */}
            <Link
              to={`/${exam.slug}` as string}
              className="block rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-400"
            >
              <div className="font-semibold">{exam.title}</div>
              {exam.description && (
                <div className="text-sm text-slate-600">{exam.description}</div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
