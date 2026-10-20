import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { Btn } from './util'

/** [x as fraction of width, y in CSS px, line width] */
type Pt = [number, number, number]
type Stroke = Pt[]

// Strokes survive navigating between sections (in-memory only).
const store = new Map<string, Stroke[]>()

export function clearPads(prefix: string) {
  for (const k of [...store.keys()]) if (k.startsWith(prefix)) store.delete(k)
}

const ROW = 96

/**
 * Handwriting canvas. Works with Apple Pencil (pressure-sensitive), finger and mouse.
 * Palm rejection: after a pen touches this pad, finger touches on it are ignored.
 */
export function HandwritingPad({
  id,
  lines = 1,
  mode = 'lines',
}: {
  id: string
  lines?: number
  mode?: 'lines' | 'draw'
}) {
  const height = mode === 'draw' ? 300 : lines * ROW
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, setWidth] = useState(0)
  const strokes = useRef<Stroke[]>(store.get(id) ?? [])
  const penSeen = useRef(false)
  const activePointer = useRef<number | null>(null)
  const [, rerender] = useReducer((x: number) => x + 1, 0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(Math.floor(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const ctx = () => canvasRef.current?.getContext('2d') ?? null

  const segment = useCallback(
    (c: CanvasRenderingContext2D, a: Pt, b: Pt) => {
      c.lineWidth = b[2]
      c.beginPath()
      c.moveTo(a[0] * width, a[1])
      c.lineTo(b[0] * width, b[1])
      c.stroke()
    },
    [width],
  )

  const redraw = useCallback(() => {
    const canvas = canvasRef.current
    const c = ctx()
    if (!canvas || !c || !width) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    c.setTransform(dpr, 0, 0, dpr, 0, 0)
    c.fillStyle = '#fff'
    c.fillRect(0, 0, width, height)
    if (mode === 'lines') {
      for (let i = 0; i < lines; i++) {
        const top = i * ROW
        c.setLineDash([])
        c.lineWidth = 1.5
        c.strokeStyle = '#94a3b8'
        c.beginPath()
        c.moveTo(0, top + 16)
        c.lineTo(width, top + 16)
        c.stroke()
        c.setLineDash([8, 8])
        c.strokeStyle = '#cbd5e1'
        c.beginPath()
        c.moveTo(0, top + 48)
        c.lineTo(width, top + 48)
        c.stroke()
        c.setLineDash([])
        c.lineWidth = 2
        c.strokeStyle = '#64748b'
        c.beginPath()
        c.moveTo(0, top + 80)
        c.lineTo(width, top + 80)
        c.stroke()
      }
    }
    c.setLineDash([])
    c.lineCap = 'round'
    c.lineJoin = 'round'
    c.strokeStyle = '#1e3a8a'
    for (const s of strokes.current) {
      if (s.length === 1) segment(c, s[0], [s[0][0] + 0.0001, s[0][1], s[0][2]])
      for (let i = 1; i < s.length; i++) segment(c, s[i - 1], s[i])
    }
  }, [width, height, lines, mode, segment])

  useEffect(() => {
    redraw()
  }, [redraw])

  const toPt = (e: PointerEvent, rect: DOMRect): Pt => {
    const w =
      e.pointerType === 'pen' ? 1.5 + (e.pressure || 0.5) * 4 : e.pointerType === 'mouse' ? 3 : 4
    return [(e.clientX - rect.left) / rect.width, e.clientY - rect.top, w]
  }

  const onDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === 'pen') penSeen.current = true
    else if (e.pointerType === 'touch' && penSeen.current) return
    if (activePointer.current !== null) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    activePointer.current = e.pointerId
    const p = toPt(e.nativeEvent, e.currentTarget.getBoundingClientRect())
    strokes.current.push([p])
    const c = ctx()
    if (c) segment(c, p, [p[0] + 0.0001, p[1], p[2]])
  }

  const onMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (e.pointerId !== activePointer.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const s = strokes.current[strokes.current.length - 1]
    const c = ctx()
    const events = e.nativeEvent.getCoalescedEvents?.() ?? [e.nativeEvent]
    for (const ev of events.length ? events : [e.nativeEvent]) {
      const p = toPt(ev, rect)
      const prev = s[s.length - 1]
      s.push(p)
      if (c) segment(c, prev, p)
    }
  }

  const onUp = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (e.pointerId !== activePointer.current) return
    activePointer.current = null
    store.set(id, strokes.current)
    rerender()
  }

  const undo = () => {
    strokes.current.pop()
    store.set(id, strokes.current)
    redraw()
    rerender()
  }
  const clear = () => {
    strokes.current = []
    store.set(id, strokes.current)
    redraw()
    rerender()
  }

  return (
    <div>
      <div
        ref={wrapRef}
        className="overflow-hidden rounded-xl border-2 border-slate-300 bg-white"
        style={{ height }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height,
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none',
          }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        />
      </div>
      <div className="mt-2 flex gap-2">
        <Btn onClick={undo} disabled={!strokes.current.length}>
          ↶ Undo
        </Btn>
        <Btn onClick={clear} disabled={!strokes.current.length}>
          🧽 Clear
        </Btn>
      </div>
    </div>
  )
}
