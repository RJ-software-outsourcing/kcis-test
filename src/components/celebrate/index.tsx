import { useEffect, useState } from 'react'
import Celebration from './Celebration'
import { pickCelebration, pickOops, playSceneSound } from './celebrations'
import type { SceneKind } from './celebrations'

export { pickPraise } from './celebrations'

type Listener = (correct: boolean) => void
const listeners = new Set<Listener>()

/** Plays a celebration (correct) or a gentle "oops" scene (wrong), with its sound. */
export function celebrate(correct: boolean) {
  listeners.forEach((l) => l(correct))
}

/** Renders the scenes requested through `celebrate()`. Mount once per page. */
export function CelebrationHost() {
  const [scene, setScene] = useState<{ kind: SceneKind; id: number } | null>(null)
  useEffect(() => {
    const l: Listener = (correct) => {
      const kind = correct ? pickCelebration() : pickOops()
      playSceneSound(kind)
      setScene({ kind, id: Date.now() })
    }
    listeners.add(l)
    return () => {
      listeners.delete(l)
    }
  }, [])
  return scene && <Celebration key={scene.id} kind={scene.kind} onDone={() => setScene(null)} />
}
