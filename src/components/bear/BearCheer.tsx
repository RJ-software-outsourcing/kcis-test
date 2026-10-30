import { lazy, Suspense, useMemo } from 'react'

// Loaded only when a test is finished, in its own small chunk.
const BlankieBear = lazy(() => import('./BlankieBear'))

const CHEERS: { min: number; lines: string[] }[] = [
  {
    min: 1,
    lines: [
      "Wow! You got them all right! You're a superstar!",
      "Perfect! Every answer is right! I'm so proud of you!",
      'All correct! Hooray! Give me a big hug!',
    ],
  },
  {
    min: 0.8,
    lines: [
      "Great job! You're getting so good at this!",
      'Awesome work! Just a few more to practice!',
      'You did so well! I knew you could do it!',
    ],
  },
  {
    min: 0.5,
    lines: [
      "Good work! Keep practicing and you'll get even better!",
      "Nice job! Let's fix the tricky ones together!",
      "You're learning so much! Try the tricky ones again!",
    ],
  },
  {
    min: 0,
    lines: [
      "Nice try! Every mistake helps you learn. Let's practice again!",
      'You worked so hard! Practice makes you stronger!',
      "Don't give up! You can do it! I believe in you!",
    ],
  },
]

/** The cheer Blankie Bear says for a score (`correct` of `total`). */
export function cheerFor(correct: number, total: number): string {
  const ratio = total ? correct / total : 0
  const { lines } = CHEERS.find((c) => ratio >= c.min) ?? CHEERS[CHEERS.length - 1]
  return lines[Math.floor(Math.random() * lines.length)]
}

/** 被被熊 flies in when a test is finished and cheers in a cute voice, depending on the score. */
export function BearCheer({ correct, total }: { correct: number; total: number }) {
  const message = useMemo(() => cheerFor(correct, total), [correct, total])
  return (
    <Suspense fallback={null}>
      <BlankieBear message={message} />
    </Suspense>
  )
}
