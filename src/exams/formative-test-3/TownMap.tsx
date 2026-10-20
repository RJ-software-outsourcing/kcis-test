const ROAD = '#d4d4d8'
const BUILDING = '#9ca3af'
const PARK = '#86efac'
const WATER = '#7dd3fc'

function Building({ x, y, w = 90, h = 90, label }: { x: number; y: number; w?: number; h?: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={BUILDING} stroke="#4b5563" strokeWidth={2} rx={4} />
      <text x={x + w / 2} y={y + h + 24} textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
        {label}
      </text>
    </g>
  )
}

function StreetLabel({ x, y, text, vertical }: { x: number; y: number; text: string; vertical?: boolean }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      transform={vertical ? `rotate(-90 ${x} ${y})` : undefined}
      className="fill-slate-700 text-[17px] font-semibold"
    >
      {text}
    </text>
  )
}

/** Town map for the "Read a Map" section (find graphics: labels, streets, map key). */
export function TownMap() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
      <svg viewBox="0 0 800 560" className="block w-full" role="img" aria-label="Map of Our Town">
        <rect width="800" height="560" fill="#fafaf9" />
        {/* streets */}
        <rect x="0" y="185" width="800" height="36" fill={ROAD} />
        <rect x="0" y="395" width="800" height="36" fill={ROAD} />
        <rect x="230" y="0" width="36" height="560" fill={ROAD} />
        <rect x="530" y="0" width="36" height="560" fill={ROAD} />
        <StreetLabel x={115} y={203} text="Main Street" />
        <StreetLabel x={680} y={203} text="Main Street" />
        <StreetLabel x={400} y={413} text="First Street" />
        <StreetLabel x={248} y={110} text="Green Street" vertical />
        <StreetLabel x={248} y={310} text="Green Street" vertical />
        <StreetLabel x={548} y={110} text="Elm Street" vertical />
        <StreetLabel x={548} y={310} text="Elm Street" vertical />

        {/* title */}
        <circle cx="112" cy="90" r="70" fill="#fff" stroke="#1e293b" strokeWidth={4} />
        <text x="112" y="82" textAnchor="middle" className="fill-slate-900 text-[28px] font-extrabold">
          OUR
        </text>
        <text x="112" y="114" textAnchor="middle" className="fill-slate-900 text-[28px] font-extrabold">
          TOWN
        </text>

        <Building x={350} y={40} label="Library" />

        {/* park */}
        <rect x="590" y="25" width="190" height="125" rx={18} fill={PARK} stroke="#15803d" strokeWidth={2} />
        <text x="630" y="85" className="text-[30px]">🌳</text>
        <text x="700" y="110" className="text-[26px]">🌳</text>
        <text x="685" y="175" textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
          Sunny Park
        </text>

        <Building x={70} y={245} w={90} h={90} label="My Home" />
        <Building x={350} y={245} w={100} h={90} label="School" />
        <Building x={585} y={245} w={80} h={80} label="Grocery" />
        <text x="625" y="372" textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
          Store
        </text>
        <Building x={695} y={255} w={70} h={70} label="Toy Store" />

        {/* map key */}
        <rect x="15" y="445" width="200" height="105" rx={10} fill="#fff" stroke="#1e293b" strokeWidth={2} />
        <text x="115" y="468" textAnchor="middle" className="fill-slate-900 text-[18px] font-extrabold">
          Map Key
        </text>
        <rect x="30" y="480" width="22" height="16" fill={BUILDING} stroke="#4b5563" />
        <text x="60" y="494" className="fill-slate-900 text-[16px]">Buildings</text>
        <rect x="30" y="502" width="22" height="16" fill={PARK} stroke="#15803d" />
        <text x="60" y="516" className="fill-slate-900 text-[16px]">Parks / Fields</text>
        <rect x="30" y="524" width="22" height="16" fill={WATER} stroke="#0369a1" />
        <text x="60" y="538" className="fill-slate-900 text-[16px]">Water</text>

        <Building x={355} y={448} w={80} h={70} label="Pet Store" />

        {/* pond */}
        <ellipse cx="680" cy="485" rx="95" ry="45" fill={WATER} stroke="#0369a1" strokeWidth={2} />
        <text x="700" y="490" className="text-[26px]">🦆</text>
        <text x="640" y="492" textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
          Duck Pond
        </text>
      </svg>
    </div>
  )
}
