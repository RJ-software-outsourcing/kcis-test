import { createContext, useContext, useSyncExternalStore } from 'react'
import { celebrate } from '../celebrate'
import type { Result } from './types'

type Progress = Record<string, Result>

const listeners = new Set<() => void>()
const cache = new Map<string, Progress>()
// Bump the version when item ids shift (ids are positional), so old results do not land on new items.
const storageKey = (examId: string) => `kcis:${examId}:progress:v2`

function load(examId: string): Progress {
  let p = cache.get(examId)
  if (!p) {
    p = {}
    try {
      p = JSON.parse(localStorage.getItem(storageKey(examId)) ?? '{}') as Progress
    } catch {
      // storage unavailable (private mode etc.) — progress lives in memory only
    }
    cache.set(examId, p)
  }
  return p
}

function save(examId: string, p: Progress) {
  cache.set(examId, p)
  try {
    localStorage.setItem(storageKey(examId), JSON.stringify(p))
  } catch {
    // ignore
  }
  listeners.forEach((l) => l())
}

function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const ExamIdContext = createContext('default')

export function useProgress() {
  const examId = useContext(ExamIdContext)
  const progress = useSyncExternalStore(subscribe, () => load(examId))
  return {
    progress,
    /** Records a result from the child's answer; plays a celebration or an "oops" scene. */
    setResult(id: string, r: Result | undefined) {
      if (r) celebrate(r !== 'wrong')
      const next = { ...load(examId) }
      if (r) next[id] = r
      else delete next[id]
      save(examId, next)
    },
    clear(prefix: string) {
      const next = Object.fromEntries(
        Object.entries(load(examId)).filter(([k]) => !k.startsWith(prefix)),
      )
      save(examId, next)
    },
  }
}
