const ROAD = '#d4d4d8'
const BUILDING = '#9ca3af'
const PARK = '#86efac'
const WATER = '#7dd3fc'

function Building({
  x,
  y,
  w = 90,
  h = 90,
  label,
}: {
  x: number
  y: number
  w?: number
  h?: number
  label: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={BUILDING}
        stroke="#4b5563"
        strokeWidth={2}
        rx={4}
      />
      <text
        x={x + w / 2}
        y={y + h + 24}
        textAnchor="middle"
        className="fill-slate-900 text-[20px] font-bold"
      >
        {label}
      </text>
    </g>
  )
}

function StreetLabel({
  x,
  y,
  text,
  vertical,
}: {
  x: number
  y: number
  text: string
  vertical?: boolean
}) {
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

function Mystery({
  x,
  y,
  w,
  h,
  letter,
}: {
  x: number
  y: number
  w: number
  h: number
  letter: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={BUILDING}
        stroke="#4b5563"
        strokeWidth={2}
        rx={4}
      />
      <circle cx={x + w / 2} cy={y + h / 2} r={17} fill="#fff" stroke="#4f46e5" strokeWidth={3} />
      <text
        x={x + w / 2}
        y={y + h / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-indigo-700 text-[22px] font-extrabold"
      >
        {letter}
      </text>
    </g>
  )
}

/** IT LAW p.23 "MY MAP", re-drawn. Places without labels are marked A–C for the labeling task. */
export function WorkbookMap() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-300 bg-white">
      <svg
        viewBox="0 0 800 560"
        className="block w-full"
        role="img"
        aria-label="My Map from the workbook"
      >
        <rect width="800" height="560" fill="#fafaf9" />
        {/* streets */}
        <rect x="0" y="195" width="800" height="34" fill={ROAD} />
        <rect x="0" y="395" width="800" height="34" fill={ROAD} />
        <rect x="200" y="0" width="34" height="395" fill={ROAD} />
        <rect x="430" y="0" width="34" height="560" fill={ROAD} />
        <rect x="640" y="229" width="34" height="166" fill={ROAD} />
        <StreetLabel x={555} y={212} text="Main Street" />
        <StreetLabel x={320} y={412} text="First Street" />
        <StreetLabel x={217} y={300} text="Green Street" vertical />
        <StreetLabel x={447} y={300} text="Elm Street" vertical />
        <StreetLabel x={657} y={312} text="Oak Street" vertical />

        {/* title */}
        <circle cx="100" cy="95" r="70" fill="#fff" stroke="#1e293b" strokeWidth={4} />
        <text
          x="100"
          y="88"
          textAnchor="middle"
          className="fill-slate-900 text-[30px] font-extrabold"
        >
          MY
        </text>
        <text
          x="100"
          y="120"
          textAnchor="middle"
          className="fill-slate-900 text-[30px] font-extrabold"
        >
          MAP
        </text>

        <Building x={285} y={50} w={90} h={95} label="Library" />

        {/* Hillside Park */}
        <rect
          x="480"
          y="25"
          width="190"
          height="115"
          rx={18}
          fill={PARK}
          stroke="#15803d"
          strokeWidth={2}
        />
        <text x="575" y="172" textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
          Hillside Park
        </text>
        <Mystery x={695} y={55} w={85} h={95} letter="A" />

        <Building x={45} y={260} w={100} h={90} label="My home" />
        <Building x={270} y={250} w={130} h={85} label="Elm Street" />
        <text x="335" y="383" textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
          School
        </text>
        <Building x={500} y={250} w={100} h={85} label="Grocery" />
        <text x="550" y="383" textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
          Store
        </text>
        <Mystery x={695} y={245} w={60} h={55} letter="B" />
        <Mystery x={720} y={320} w={60} h={60} letter="C" />

        {/* map key */}
        <rect
          x="15"
          y="445"
          width="200"
          height="105"
          rx={10}
          fill="#fff"
          stroke="#1e293b"
          strokeWidth={2}
        />
        <text
          x="115"
          y="468"
          textAnchor="middle"
          className="fill-slate-900 text-[18px] font-extrabold"
        >
          Map Key
        </text>
        <rect x="30" y="480" width="22" height="16" fill={BUILDING} stroke="#4b5563" />
        <text x="60" y="494" className="fill-slate-900 text-[16px]">
          Buildings
        </text>
        <rect x="30" y="502" width="22" height="16" fill={PARK} stroke="#15803d" />
        <text x="60" y="516" className="fill-slate-900 text-[16px]">
          Parks / Fields
        </text>
        <rect x="30" y="524" width="22" height="16" fill={WATER} stroke="#0369a1" />
        <text x="60" y="538" className="fill-slate-900 text-[16px]">
          Water
        </text>

        <circle cx="320" cy="490" r="48" fill="#fff" stroke="#1e293b" strokeWidth={3} />
        <text
          x="320"
          y="484"
          textAnchor="middle"
          className="fill-slate-900 text-[22px] font-extrabold"
        >
          Map
        </text>
        <text
          x="320"
          y="510"
          textAnchor="middle"
          className="fill-slate-900 text-[22px] font-extrabold"
        >
          Key
        </text>
        <Building x={490} y={450} w={80} h={75} label="" />
        <text x="615" y="480" className="fill-slate-900 text-[20px] font-bold">
          Pet
        </text>
        <text x="610" y="505" className="fill-slate-900 text-[20px] font-bold">
          Store
        </text>

        {/* Long Pond */}
        <ellipse cx="725" cy="480" rx="65" ry="45" fill={WATER} stroke="#0369a1" strokeWidth={2} />
        <text x="725" y="548" textAnchor="middle" className="fill-slate-900 text-[20px] font-bold">
          Long Pond
        </text>
      </svg>
    </div>
  )
}
