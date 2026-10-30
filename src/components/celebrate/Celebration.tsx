import { useEffect, useRef, type CSSProperties, type JSX, type ReactNode } from 'react'
import type { SceneKind } from './celebrations'

const DURATION_MS = 2600
const COLORS = ['#f43f5e', '#f59e0b', '#22c55e', '#0ea5e9', '#a855f7', '#facc15']

// CSS custom properties consumed by the keyframes in index.css.
const vars = (v: Record<string, string | number>) => v as CSSProperties

function Fireworks() {
  const bursts = [
    { x: 25, y: 28, delay: 0 },
    { x: 75, y: 20, delay: 0.45 },
    { x: 50, y: 45, delay: 0.9 },
    { x: 20, y: 62, delay: 1.2 },
    { x: 80, y: 58, delay: 1.35 },
  ]
  return (
    <>
      {bursts.map((b, bi) => (
        <div key={bi} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i / 20) * Math.PI * 2
            const r = 130 + (i % 2) * 50
            const color = COLORS[(i + bi) % COLORS.length]
            return (
              <span
                key={i}
                className="cel-spark absolute -mt-2 -ml-2 size-4 rounded-full"
                style={vars({
                  background: color,
                  boxShadow: `0 0 10px 3px ${color}`,
                  '--dx': `${Math.cos(angle) * r}px`,
                  '--dy': `${Math.sin(angle) * r}px`,
                  animationDelay: `${b.delay}s`,
                })}
              />
            )
          })}
        </div>
      ))}
    </>
  )
}

function Rocket() {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="cel-smoke absolute bottom-0 size-20 rounded-full bg-slate-200"
          style={vars({ left: `calc(50% - 40px + ${(i - 2.5) * 28}px)`, animationDelay: `${0.05 * i}s` })}
        />
      ))}
      <span className="cel-rocket absolute bottom-0 left-1/2 text-8xl">🚀</span>
    </>
  )
}

function Whale() {
  return (
    <>
      <span className="cel-whale absolute bottom-16 left-1/2 text-9xl">🐋</span>
      {Array.from({ length: 6 }, (_, i) => (
        <span
          key={i}
          className="cel-drop absolute bottom-24 text-4xl"
          style={vars({
            left: `calc(25% + ${i * 14}px)`,
            '--dx': `${(i - 2.5) * 30}px`,
            animationDelay: '1.5s',
          })}
        >
          💧
        </span>
      ))}
      <div className="cel-wave absolute inset-x-0 bottom-0 h-28 rounded-t-[50%] bg-sky-400/80" />
    </>
  )
}

function Balloons() {
  const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈']
  return (
    <>
      {balloons.map((b, i) => (
        <span
          key={i}
          className="cel-balloon absolute -bottom-28 text-8xl"
          style={vars({
            left: `${8 + i * 13}%`,
            animationDelay: `${(i % 3) * 0.2 + (i % 2) * 0.1}s`,
            filter: `hue-rotate(${i * 50}deg)`,
          })}
        >
          {b}
        </span>
      ))}
    </>
  )
}

function Rainbow() {
  const stars = [
    { x: 15, y: 25 },
    { x: 80, y: 20 },
    { x: 25, y: 60 },
    { x: 75, y: 58 },
    { x: 50, y: 15 },
    { x: 10, y: 45 },
    { x: 88, y: 42 },
  ]
  return (
    <>
      <span className="cel-pop absolute top-1/2 left-1/2 text-[10rem]">🌈</span>
      {stars.map((s, i) => (
        <span
          key={i}
          className="cel-star absolute text-6xl"
          style={vars({ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${0.15 * i}s` })}
        >
          {i % 2 ? '✨' : '⭐'}
        </span>
      ))}
    </>
  )
}

/**
 * Moves its child across the screen horizontally (`from` -> `to`, e.g. '110vw' -> '-30vw'),
 * while the child runs its own inner animation (hop, bob, ...).
 */
function Across({
  top,
  from,
  to,
  dur = '2.4s',
  delay = '0s',
  inner = 'cel-bob',
  flip = false,
  className = 'text-8xl',
  children,
}: {
  top: string
  from: string
  to: string
  dur?: string
  delay?: string
  inner?: string
  flip?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className="cel-across absolute left-0"
      style={vars({ top, '--from': from, '--to': to, '--dur': dur, animationDelay: delay })}
    >
      <span className={`block ${inner} ${className}`} style={{ animationDelay: delay }}>
        <span className="block" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
          {children}
        </span>
      </span>
    </span>
  )
}

function Ufo() {
  const planets = [
    { e: '🪐', x: 10, y: 10, size: 'text-7xl' },
    { e: '🌍', x: 82, y: 50, size: 'text-6xl' },
    { e: '🌕', x: 85, y: 8, size: 'text-5xl' },
    { e: '⭐', x: 30, y: 6, size: 'text-4xl' },
    { e: '✨', x: 12, y: 55, size: 'text-4xl' },
    { e: '⭐', x: 65, y: 30, size: 'text-3xl' },
  ]
  return (
    <>
      {planets.map((p, i) => (
        <span
          key={i}
          className={`cel-star absolute ${p.size}`}
          style={vars({ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${i * 0.1}s`, '--dur': '2.4s' })}
        >
          {p.e}
        </span>
      ))}
      <div className="cel-beam absolute top-[calc(18%+70px)] left-1/2 h-[50vh] w-56" />
      <span className="cel-abduct absolute bottom-[14%] left-1/2 text-7xl">👽</span>
      <span className="cel-ufo absolute top-[18%] left-1/2 text-9xl">🛸</span>
    </>
  )
}

function Unicorn() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className="cel-star absolute text-4xl"
          style={vars({ left: `${90 - i * 12}%`, top: `${48 + (i % 2) * 8}%`, animationDelay: `${0.2 + i * 0.22}s` })}
        >
          {i % 2 ? '✨' : '💖'}
        </span>
      ))}
      <Across top="38%" from="105vw" to="-35vw" inner="cel-gallop" className="text-9xl">
        🦄
      </Across>
    </>
  )
}

function Butterflies() {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={i}
          className="cel-flutter absolute -bottom-20 text-7xl"
          style={vars({ left: `${6 + i * 14}%`, animationDelay: `${(i % 3) * 0.25}s`, '--dur': `${2 + (i % 2) * 0.4}s` })}
        >
          🦋
        </span>
      ))}
    </>
  )
}

function Fish() {
  const rows = [
    { e: '🐠', top: '25%', delay: '0s', dur: '2.2s' },
    { e: '🐟', top: '45%', delay: '0.3s', dur: '2s' },
    { e: '🐡', top: '62%', delay: '0.15s', dur: '2.3s' },
    { e: '🐠', top: '78%', delay: '0.5s', dur: '1.9s' },
  ]
  return (
    <>
      <div className="cel-fade absolute inset-0 bg-sky-300/25" />
      {rows.map((r, i) => (
        <Across key={i} top={r.top} from="105vw" to="-30vw" dur={r.dur} delay={r.delay} className="text-8xl">
          {r.e}
        </Across>
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="cel-rise absolute bottom-0 text-4xl"
          style={vars({ left: `${5 + i * 10}%`, animationDelay: `${(i % 4) * 0.3}s`, '--rise': '-80vh' })}
        >
          🫧
        </span>
      ))}
    </>
  )
}

function Party() {
  const pieces = (side: 'left' | 'right') =>
    Array.from({ length: 22 }, (_, i) => {
      const dir = side === 'left' ? 1 : -1
      const dx = dir * (80 + ((i * 37) % 260))
      const dy = -(260 + ((i * 53) % 340))
      return (
        <span
          key={`${side}${i}`}
          className="cel-confetti absolute bottom-24 h-4 w-2.5 rounded-sm"
          style={vars({
            [side]: '12%',
            background: COLORS[i % COLORS.length],
            '--dx': `${dx}px`,
            '--dy': `${dy}px`,
            '--rot': `${dir * (180 + i * 20)}deg`,
            animationDelay: `${side === 'left' ? 0 : 0.15}s`,
          })}
        />
      )
    })
  return (
    <>
      {pieces('left')}
      {pieces('right')}
      <span className="cel-pop-in absolute bottom-6 left-[6%] text-8xl">🎉</span>
      <span className="cel-pop-in absolute right-[6%] bottom-6 text-8xl" style={{ animationDelay: '0.15s' }}>
        <span className="block" style={{ transform: 'scaleX(-1)' }}>
          🎉
        </span>
      </span>
    </>
  )
}

function ShootingStars() {
  const stars = [
    { x: 70, y: -5, delay: 0 },
    { x: 95, y: 10, delay: 0.3 },
    { x: 55, y: -10, delay: 0.6 },
    { x: 85, y: 30, delay: 0.9 },
    { x: 100, y: -5, delay: 1.2 },
  ]
  return (
    <>
      <div className="cel-fade absolute inset-0 bg-indigo-950/30" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="cel-shoot absolute text-8xl"
          style={vars({ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.delay}s` })}
        >
          🌠
        </span>
      ))}
    </>
  )
}

function Trophy() {
  return (
    <>
      <div className="absolute top-1/2 left-1/2">
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2
          return (
            <span
              key={i}
              className="cel-spark absolute -mt-6 -ml-6 text-5xl"
              style={vars({
                '--dx': `${Math.cos(angle) * 220}px`,
                '--dy': `${Math.sin(angle) * 220}px`,
                animationDelay: '0.6s',
              })}
            >
              {i % 2 ? '⭐' : '🌟'}
            </span>
          )
        })}
      </div>
      <span className="cel-pop absolute top-1/2 left-1/2 text-[10rem]">🏆</span>
    </>
  )
}

function Dinosaur() {
  return (
    <>
      {[0.1, 0.55, 1.0, 1.45].map((t, i) => (
        <span
          key={i}
          className="cel-puff absolute bottom-4 text-5xl"
          style={vars({ left: `${78 - i * 20}%`, animationDelay: `${t + 0.1}s` })}
        >
          💨
        </span>
      ))}
      <Across top="calc(100% - 13rem)" from="105vw" to="-35vw" inner="cel-stomp" className="text-[9rem]">
        🦖
      </Across>
    </>
  )
}

function Bunny() {
  return (
    <>
      <span className="cel-pop-in absolute bottom-6 left-[12%] text-6xl" style={{ animationDelay: '1.6s' }}>
        🥕
      </span>
      <Across top="calc(100% - 12rem)" from="105vw" to="-30vw" dur="2.4s" inner="cel-hop" className="text-9xl">
        🐇
      </Across>
    </>
  )
}

function Flowers() {
  const flowers = ['🌷', '🌻', '🌸', '🌼', '🌹', '🌺', '🌷']
  return (
    <>
      {flowers.map((f, i) => (
        <span
          key={i}
          className="cel-grow absolute bottom-2 text-8xl"
          style={vars({ left: `${2 + i * 14}%`, animationDelay: `${i * 0.12}s` })}
        >
          {f}
        </span>
      ))}
      <Across top="35%" from="105vw" to="-20vw" dur="2.4s" className="text-7xl">
        🐝
      </Across>
    </>
  )
}

/** Sparkle positions reused by several scenes (percent of the screen). */
const TWINKLES = [
  { x: 12, y: 18 },
  { x: 82, y: 14 },
  { x: 30, y: 8 },
  { x: 68, y: 32 },
  { x: 8, y: 42 },
  { x: 90, y: 46 },
  { x: 48, y: 6 },
]

/** A burst of emoji flying out from (x%, y%) after `delay` seconds. */
function EmojiBurst({
  x,
  y,
  delay,
  emoji,
  count = 10,
  r = 220,
  size = 'text-5xl',
}: {
  x: string
  y: string
  delay: number
  emoji: string[]
  count?: number
  r?: number
  size?: string
}) {
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + delay
        const dist = r * (0.75 + (i % 3) * 0.15)
        return (
          <span
            key={i}
            className={`cel-spark absolute -mt-6 -ml-6 ${size}`}
            style={vars({
              '--dx': `${Math.cos(angle) * dist}px`,
              '--dy': `${Math.sin(angle) * dist}px`,
              animationDelay: `${delay}s`,
            })}
          >
            {emoji[i % emoji.length]}
          </span>
        )
      })}
    </div>
  )
}

function Penguin() {
  return (
    <>
      <div className="cel-wave absolute inset-x-0 bottom-0 h-40 rounded-t-[40%] bg-cyan-100/90" />
      {[18, 42, 66, 88].map((x, i) => (
        <span
          key={i}
          className="cel-star absolute bottom-10 text-5xl"
          style={vars({ left: `${x}%`, animationDelay: `${0.3 + i * 0.3}s` })}
        >
          ✨
        </span>
      ))}
      <Across top="calc(100% - 12rem)" from="105vw" to="-35vw" dur="1.6s" inner="cel-slide" className="text-9xl">
        🐧
      </Across>
      <Across top="calc(100% - 11rem)" from="105vw" to="-35vw" dur="1.6s" delay="0.8s" inner="cel-slide" className="text-8xl">
        🐧
      </Across>
    </>
  )
}

function Panda() {
  return (
    <>
      <span className="cel-grow absolute bottom-0 left-[3%] text-[9rem]">🎋</span>
      <span className="cel-grow absolute right-[3%] bottom-0 text-[9rem]" style={{ animationDelay: '0.15s' }}>
        🎋
      </span>
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className="cel-fall absolute -top-16 text-5xl"
          style={vars({
            left: `${6 + i * 12}%`,
            animationDelay: `${0.3 + (i % 4) * 0.3}s`,
            '--fall': '95vh',
            '--dur': '1.3s',
          })}
        >
          🍃
        </span>
      ))}
      <span className="cel-pop absolute top-[52%] left-1/2 text-[10rem]">
        <span className="cel-wiggle block">🐼</span>
      </span>
      {[42, 58].map((x, i) => (
        <span
          key={i}
          className="cel-rise absolute top-[40%] text-5xl"
          style={vars({ left: `${x}%`, animationDelay: `${0.7 + i * 0.4}s`, '--rise': '-30vh', '--dur': '1.4s' })}
        >
          💚
        </span>
      ))}
    </>
  )
}

function Cat() {
  // The cat is 0.3 s behind the yarn; paw prints appear as it runs past.
  const paws = [80, 60, 40, 20]
  return (
    <>
      {paws.map((x, i) => (
        <span
          key={i}
          className="cel-pop-in absolute bottom-3 text-5xl"
          style={{ left: `${x}%`, animationDelay: `${0.8 + i * 0.29}s`, animationDuration: '0.9s' }}
        >
          🐾
        </span>
      ))}
      <Across top="calc(100% - 8rem)" from="105vw" to="-25vw" dur="2s" inner="cel-roll" className="text-7xl">
        🧶
      </Across>
      <Across top="calc(100% - 12rem)" from="115vw" to="-35vw" dur="2.2s" delay="0.3s" inner="cel-gallop" className="text-9xl">
        🐈
      </Across>
    </>
  )
}

function Snowman() {
  return (
    <>
      <div className="cel-fade absolute inset-0 bg-sky-200/30" />
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          className={`cel-fall absolute -top-16 ${i % 2 ? 'text-4xl' : 'text-5xl'}`}
          style={vars({
            left: `${3 + i * 7}%`,
            animationDelay: `${(i % 5) * 0.15}s`,
            '--fall': '105vh',
            '--dur': `${1.6 + (i % 3) * 0.2}s`,
          })}
        >
          ❄️
        </span>
      ))}
      <div className="cel-wave absolute inset-x-0 bottom-0 h-28 rounded-t-[50%] bg-white/90" />
      <span className="cel-grow absolute bottom-10 left-1/2 -translate-x-1/2 text-[10rem]">⛄</span>
    </>
  )
}

function Octopus() {
  return (
    <>
      <span className="cel-grow absolute bottom-0 left-[6%] text-8xl">🪸</span>
      <span className="cel-grow absolute right-[8%] bottom-0 text-7xl" style={{ animationDelay: '0.2s' }}>
        🐚
      </span>
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className="cel-rise absolute top-[45%] text-4xl"
          style={vars({
            left: `${36 + (i % 5) * 7}%`,
            animationDelay: `${0.4 + i * 0.15}s`,
            '--rise': '-45vh',
            '--dur': '1.2s',
          })}
        >
          🫧
        </span>
      ))}
      <span className="cel-pop absolute top-[55%] left-1/2 text-[10rem]">
        <span className="cel-wiggle block">🐙</span>
      </span>
    </>
  )
}

function Train() {
  return (
    <>
      <div className="cel-fade absolute inset-x-0 bottom-6 h-3 rounded bg-stone-500/80" />
      <Across
        top="calc(100% - 8.5rem)"
        from="100vw"
        to="-100%"
        dur="2.5s"
        inner="cel-chug"
        className="text-8xl whitespace-nowrap"
      >
        <span className="relative inline-block">
          🚂
          {[0, 0.2, 0.4].map((d) => (
            <span key={d} className="cel-steam absolute -top-12 left-4 text-5xl" style={{ animationDelay: `${d}s` }}>
              ☁️
            </span>
          ))}
        </span>
        🚃🚃🚃
      </Across>
    </>
  )
}

function Airplane() {
  // Hearts pop out as the plane's tail passes them.
  const hearts = [5, 17, 29, 41, 53, 65, 77]
  return (
    <>
      {hearts.map((x, i) => (
        <span
          key={i}
          className="cel-trail absolute text-5xl"
          style={vars({
            left: `${x}%`,
            top: `calc(22% + ${3 + (i % 2) * 1.5}rem)`,
            animationDelay: `${((x + 25) / 135) * 2.2}s`,
          })}
        >
          {['💖', '❤️', '💕'][i % 3]}
        </span>
      ))}
      <Across top="22%" from="-25vw" to="110vw" dur="2.2s" className="text-8xl">
        <span className="block rotate-45">✈️</span>
      </Across>
    </>
  )
}

function MagicWand() {
  return (
    <>
      <div className="cel-fade absolute inset-0 bg-purple-300/20" />
      {[0.3, 0.9, 1.5].map((d, i) => (
        <EmojiBurst key={i} x="56%" y="40%" delay={d} emoji={['⭐', '✨', '🌟', '💫']} r={200 + i * 30} />
      ))}
      <span className="cel-pop-in absolute top-[42%] left-[38%] text-[9rem]" style={{ animationDuration: '2.5s' }}>
        <span className="cel-wand block">🪄</span>
      </span>
    </>
  )
}

function Cake() {
  return (
    <>
      {[44, 50, 56, 47, 53].map((x, i) => (
        <span
          key={i}
          className="cel-star absolute top-[26%] text-5xl"
          style={vars({ left: `${x}%`, animationDelay: `${0.4 + i * 0.3}s`, '--dur': '0.9s' })}
        >
          ✨
        </span>
      ))}
      <span className="cel-pop absolute top-[55%] left-1/2 text-[10rem]">🎂</span>
      <span className="cel-pop-in absolute bottom-6 left-[6%] text-8xl">
        <span className="cel-hop block">🥳</span>
      </span>
      <span className="cel-pop-in absolute right-[6%] bottom-6 text-8xl" style={{ animationDelay: '0.24s' }}>
        <span className="cel-hop block" style={{ animationDelay: '0.24s' }}>
          🥳
        </span>
      </span>
    </>
  )
}

function Frog() {
  // The frog lands every 0.48 s; its x position then is 105vw - 27vw * k.
  const pads = [78, 51, 24]
  return (
    <>
      <div className="cel-wave absolute inset-x-0 bottom-0 h-20 bg-sky-400/60" />
      {pads.map((x, i) => (
        <div
          key={i}
          className="cel-pop-in absolute bottom-6 h-10 w-36 rounded-[50%] bg-green-500"
          style={{ left: `calc(${x}vw - 0.5rem)`, animationDelay: `${i * 0.05}s`, animationDuration: '2.5s' }}
        />
      ))}
      <span className="cel-pop-in absolute bottom-4 left-[2%] text-6xl" style={{ animationDuration: '2.5s' }}>
        🪷
      </span>
      <Across top="calc(100% - 10rem)" from="105vw" to="-30vw" dur="2.4s" inner="cel-hop" className="text-9xl">
        🐸
      </Across>
    </>
  )
}

function Bees() {
  const bees = [
    { r: '10rem', dur: '1.3s', delay: '0s' },
    { r: '14rem', dur: '1.8s', delay: '-0.6s' },
    { r: '18rem', dur: '2.2s', delay: '-1.4s' },
  ]
  return (
    <>
      <span className="cel-pop absolute top-1/2 left-1/2 text-[9rem]">🍯</span>
      {bees.map((b, i) => (
        <div key={i} className="cel-fade absolute top-1/2 left-1/2">
          <div className="cel-orbit" style={vars({ '--dur': b.dur, animationDelay: b.delay })}>
            {/* Facing "up" at the right edge of a counter-clockwise orbit, so the bee flies forward. */}
            <span className="absolute -mt-8 -ml-8 text-7xl" style={{ transform: `translateX(${b.r}) rotate(90deg)` }}>
              🐝
            </span>
          </div>
        </div>
      ))}
      {TWINKLES.slice(0, 4).map((s, i) => (
        <span
          key={i}
          className="cel-star absolute text-5xl"
          style={vars({ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${0.5 + i * 0.3}s` })}
        >
          💛
        </span>
      ))}
    </>
  )
}

function Kite() {
  return (
    <>
      <Across top="10%" from="105vw" to="-30vw" dur="2.5s" inner="" className="text-8xl">
        ☁️
      </Across>
      <Across top="32%" from="110vw" to="-30vw" dur="2.2s" delay="0.3s" inner="" className="text-7xl">
        ☁️
      </Across>
      <span className="cel-pop-in absolute bottom-4 left-[6%] text-8xl" style={{ animationDuration: '2.5s' }}>
        🧒
      </span>
      <span className="cel-kite absolute top-0 left-0 text-9xl">🪁</span>
    </>
  )
}

function Dolphin() {
  const splash = (left: string, delay: string) =>
    Array.from({ length: 5 }, (_, i) => (
      <span
        key={`${left}${i}`}
        className="cel-drop absolute bottom-24 text-4xl"
        style={vars({ left: `calc(${left} + ${i * 14}px)`, '--dx': `${(i - 2) * 35}px`, animationDelay: delay })}
      >
        💦
      </span>
    ))
  return (
    <>
      {TWINKLES.slice(0, 5).map((s, i) => (
        <span
          key={i}
          className="cel-star absolute text-5xl"
          style={vars({ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${0.3 + i * 0.3}s` })}
        >
          ✨
        </span>
      ))}
      <span className="cel-dolphin absolute bottom-16 left-1/2 text-9xl">🐬</span>
      {splash('80%', '0s')}
      {splash('46%', '1.1s')}
      <div className="cel-wave absolute inset-x-0 bottom-0 h-28 rounded-t-[50%] bg-sky-400/80" />
    </>
  )
}

function Owl() {
  return (
    <>
      <div className="cel-fade absolute inset-0 bg-indigo-950/40" />
      <span className="cel-pop-in absolute top-[6%] right-[10%] text-8xl" style={{ animationDuration: '2.5s' }}>
        🌙
      </span>
      {TWINKLES.map((s, i) => (
        <span
          key={i}
          className="cel-star absolute text-4xl"
          style={vars({ left: `${s.x}%`, top: `${s.y + 4}%`, animationDelay: `${i * 0.2}s`, '--dur': '1.1s' })}
        >
          {i % 2 ? '✨' : '⭐'}
        </span>
      ))}
      <span className="cel-pop absolute top-[55%] left-1/2 text-[10rem]">
        <span className="cel-blink block">🦉</span>
      </span>
    </>
  )
}

function Robot() {
  return (
    <>
      <span className="cel-pop-in absolute top-[4%] left-1/2 -translate-x-1/2 text-8xl" style={{ animationDuration: '2.5s' }}>
        <span className="cel-wiggle block">🪩</span>
      </span>
      {Array.from({ length: 8 }, (_, i) => (
        <span
          key={i}
          className="cel-rise absolute bottom-[22%] text-5xl"
          style={vars({
            left: `${12 + i * 10 + (i > 3 ? 8 : 0)}%`,
            animationDelay: `${0.2 + (i % 4) * 0.3}s`,
            '--rise': '-40vh',
            '--dur': '1.3s',
          })}
        >
          {i % 2 ? '🎶' : '🎵'}
        </span>
      ))}
      <span className="cel-pop absolute top-[55%] left-1/2 text-[10rem]">
        <span className="cel-dance block">🤖</span>
      </span>
    </>
  )
}

function Gift() {
  return (
    <>
      <span className="cel-gift absolute top-1/2 left-1/2 text-[10rem]">🎁</span>
      <EmojiBurst x="50%" y="50%" delay={1} emoji={['⭐', '🌟', '✨', '🎈']} count={14} r={260} />
      <span
        className="cel-pop-in absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem]"
        style={{ animationDelay: '1s', animationDuration: '1.5s' }}
      >
        🧸
      </span>
    </>
  )
}

function Chick() {
  return (
    <>
      <span className="cel-hatch absolute top-[55%] left-1/2 text-[10rem]">🥚</span>
      <EmojiBurst x="50%" y="55%" delay={1.05} emoji={['✨', '💛']} count={10} r={200} />
      <span
        className="cel-pop-in absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem]"
        style={{ animationDelay: '1.05s', animationDuration: '1.5s' }}
      >
        🐣
      </span>
      {['left-[12%]', 'right-[12%]'].map((pos, i) => (
        <span
          key={pos}
          className={`cel-pop-in absolute bottom-6 ${pos} text-7xl`}
          style={{ animationDelay: `${1.4 + i * 0.15}s`, animationDuration: '1.1s' }}
        >
          <span className="cel-hop block">🐥</span>
        </span>
      ))}
    </>
  )
}

function Astronaut() {
  return (
    <>
      <div className="cel-fade absolute inset-0 bg-indigo-950/35" />
      {TWINKLES.map((s, i) => (
        <span
          key={i}
          className="cel-star absolute text-4xl"
          style={vars({ left: `${s.x}%`, top: `${s.y + 30}%`, animationDelay: `${i * 0.25}s`, '--dur': '1.1s' })}
        >
          {i % 2 ? '✨' : '⭐'}
        </span>
      ))}
      <span className="cel-pop-in absolute right-[6%] bottom-[6%] text-8xl" style={{ animationDuration: '2.5s' }}>
        🌎
      </span>
      <Across top="8%" from="-20vw" to="110vw" dur="2.4s" className="text-6xl">
        🛰️
      </Across>
      <span className="cel-float absolute top-0 left-0 text-[9rem]">🧑‍🚀</span>
    </>
  )
}

function IceCream() {
  const scoop = (color: string) => ({
    background: `radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.55) 0 12%, transparent 13%), ${color}`,
  })
  const scoops = [
    { color: '#f9a8d4', delay: 0.4 },
    { color: '#6ee7b7', delay: 0.8 },
    { color: '#a16207', delay: 1.2 },
  ]
  return (
    <>
      <div className="cel-out absolute bottom-[6%] left-1/2 flex -translate-x-1/2 flex-col-reverse items-center">
        <div
          className="cel-stack h-48 w-36"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            background:
              'repeating-linear-gradient(45deg, #d97706 0 4px, transparent 4px 22px), repeating-linear-gradient(-45deg, #d97706 0 4px, transparent 4px 22px), #fbbf24',
          }}
        />
        {scoops.map((s, i) => (
          <div
            key={i}
            className="cel-stack -mb-14 h-36 w-40 rounded-[50%]"
            style={{ ...scoop(s.color), animationDelay: `${s.delay}s` }}
          />
        ))}
        <span className="cel-stack -mb-8 text-7xl" style={{ animationDelay: '1.6s' }}>
          🍒
        </span>
      </div>
      {TWINKLES.slice(0, 6).map((s, i) => (
        <span
          key={i}
          className="cel-star absolute text-5xl"
          style={vars({ left: `${s.x}%`, top: `${s.y + 10}%`, animationDelay: `${1.9 + (i % 3) * 0.1}s`, '--dur': '0.6s' })}
        >
          {i % 2 ? '✨' : '⭐'}
        </span>
      ))}
    </>
  )
}

function RaceCar() {
  return (
    <>
      <div className="cel-wave absolute inset-x-0 bottom-0 h-56 bg-slate-500/85">
        <div className="absolute inset-x-0 top-1/2 border-t-8 border-dashed border-white/80" />
      </div>
      {[75, 50, 25].map((x, i) => (
        <span
          key={i}
          className="cel-puff absolute bottom-36 text-5xl"
          style={vars({ left: `${x + 8}%`, animationDelay: `${0.2 + ((105 - x) / 140) * 1.5}s` })}
        >
          💨
        </span>
      ))}
      <Across top="calc(100% - 15rem)" from="105vw" to="-35vw" dur="1.5s" delay="0.2s" inner="cel-vroom" className="text-9xl">
        🏎️
      </Across>
      <Across top="calc(100% - 8rem)" from="105vw" to="-35vw" dur="1.8s" delay="0.35s" inner="cel-vroom" className="text-9xl">
        <span className="block" style={{ filter: 'hue-rotate(200deg)' }}>
          🏎️
        </span>
      </Across>
      <span
        className="cel-pop-in absolute top-[12%] left-1/2 -translate-x-1/2 text-[9rem]"
        style={{ animationDelay: '1.2s', animationDuration: '1.4s' }}
      >
        <span className="cel-wiggle block">🏁</span>
      </span>
      <EmojiBurst x="50%" y="22%" delay={1.3} emoji={['⭐', '✨']} count={8} r={180} size="text-4xl" />
    </>
  )
}

// ---------- Oops (wrong answer): gentle and cute, never scary ----------

function Monkey() {
  return <span className="cel-peek absolute bottom-0 left-1/2 text-[9rem]">🙈</span>
}

function Puppy() {
  return (
    <>
      <span className="cel-rise absolute bottom-[38%] left-[58%] text-6xl" style={vars({ animationDelay: '0.4s', '--rise': '-12vh' })}>
        ❓
      </span>
      <span className="cel-peek absolute bottom-0 left-1/2 text-[9rem]">
        <span className="cel-tilt block">🐶</span>
      </span>
    </>
  )
}

function RainCloud() {
  return (
    <>
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={i}
          className="cel-fall absolute top-[24%] text-3xl"
          style={vars({ left: `calc(50% - 90px + ${i * 28}px)`, animationDelay: `${0.4 + (i % 3) * 0.25}s`, '--fall': '45vh' })}
        >
          💧
        </span>
      ))}
      <span className="cel-drift absolute top-[10%] left-1/2 text-[9rem]">🌧️</span>
    </>
  )
}

const SCENES: Record<SceneKind, () => JSX.Element> = {
  fireworks: Fireworks,
  rocket: Rocket,
  whale: Whale,
  balloons: Balloons,
  rainbow: Rainbow,
  ufo: Ufo,
  unicorn: Unicorn,
  butterflies: Butterflies,
  fish: Fish,
  party: Party,
  shootingStars: ShootingStars,
  trophy: Trophy,
  dinosaur: Dinosaur,
  bunny: Bunny,
  flowers: Flowers,
  penguin: Penguin,
  panda: Panda,
  cat: Cat,
  snowman: Snowman,
  octopus: Octopus,
  train: Train,
  airplane: Airplane,
  magicWand: MagicWand,
  cake: Cake,
  frog: Frog,
  bees: Bees,
  kite: Kite,
  dolphin: Dolphin,
  owl: Owl,
  robot: Robot,
  gift: Gift,
  chick: Chick,
  astronaut: Astronaut,
  iceCream: IceCream,
  raceCar: RaceCar,
  monkey: Monkey,
  puppy: Puppy,
  rainCloud: RainCloud,
}

/** A short, non-blocking full-screen animation; taps pass through to the page. */
export default function Celebration({ kind, onDone }: { kind: SceneKind; onDone: () => void }) {
  const done = useRef(onDone)
  done.current = onDone
  useEffect(() => {
    const id = setTimeout(() => done.current(), DURATION_MS)
    return () => clearTimeout(id)
  }, [])

  const Scene = SCENES[kind]
  return (
    <div aria-hidden className="cel-root pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <Scene />
    </div>
  )
}
