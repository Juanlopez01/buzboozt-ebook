"use client";

import { useMemo, useState } from "react";

type View = "turnos" | "pacientes" | "historial" | "agenda" | "ficha";
type ToothState = "sano" | "tratado" | "pendiente";
type Specialty = "odontologia" | "medicina" | "kinesiologia" | "nutricion";

interface Patient {
  id: number;
  name: string;
  initials: string;
  lastVisit: string;
  phone: string;
  dni: string;
}

interface Appointment {
  id: number;
  time: string;
  patient: string;
  type: string;
  status: "confirmado" | "pendiente";
}

interface PendingRequest {
  id: number;
  patient: string;
  requestedFor: string;
  type: string;
}

interface HistorialItem {
  id: number;
  date: string;
  patient: string;
  type: string;
  status: "completado" | "cancelado" | "ausente";
}

const SIDEBAR_BG = "#0f1b2d";
const GOLD = "#e8c96a";

const NAV_ITEMS: { id: View; label: string; icon: string }[] = [
  { id: "turnos", label: "Turnos", icon: "📅" },
  { id: "pacientes", label: "Pacientes", icon: "👥" },
  { id: "historial", label: "Historial", icon: "📋" },
  { id: "agenda", label: "Agenda", icon: "🗓️" },
];

const SPECIALTIES: { id: Specialty; label: string }[] = [
  { id: "odontologia", label: "Odontología" },
  { id: "medicina", label: "Medicina Clínica" },
  { id: "kinesiologia", label: "Kinesiología" },
  { id: "nutricion", label: "Nutrición" },
];

// Todos los nombres, turnos y datos de esta demo son ficticios —
// no representan pacientes reales.
const PATIENTS: Patient[] = [
  { id: 1, name: "Martina Ibáñez", initials: "MI", lastVisit: "12/06/2026", phone: "••• •••• 4521", dni: "••.•••.•••" },
  { id: 2, name: "Tomás Duarte", initials: "TD", lastVisit: "03/05/2026", phone: "••• •••• 7788", dni: "••.•••.•••" },
  { id: 3, name: "Sofía Ramírez", initials: "SR", lastVisit: "28/04/2026", phone: "••• •••• 1092", dni: "••.•••.•••" },
  { id: 4, name: "Lucas Fernández", initials: "LF", lastVisit: "15/04/2026", phone: "••• •••• 3345", dni: "••.•••.•••" },
  { id: 5, name: "Valentina Gómez", initials: "VG", lastVisit: "02/04/2026", phone: "••• •••• 9012", dni: "••.•••.•••" },
  { id: 6, name: "Agustín Rojas", initials: "AR", lastVisit: "20/03/2026", phone: "••• •••• 5567", dni: "••.•••.•••" },
  { id: 7, name: "Camila Torres", initials: "CT", lastVisit: "08/03/2026", phone: "••• •••• 2234", dni: "••.•••.•••" },
];

const SPECIALTY_NOTES: Record<Specialty, string[]> = {
  odontologia: [
    "Control de rutina cada 6 meses.",
    "Tratamiento de conducto en pieza 26.",
    "Alergia a la penicilina.",
    "Ortodoncia en curso.",
    "Primera consulta.",
    "Blanqueamiento realizado.",
    "Sensibilidad en pieza 14.",
  ],
  medicina: [
    "Control de presión arterial mensual.",
    "Seguimiento post-operatorio.",
    "Alergia a la penicilina.",
    "Chequeo general anual.",
    "Primera consulta.",
    "Estudios de rutina al día.",
    "Consulta por dolor recurrente.",
  ],
  kinesiologia: [
    "Rehabilitación de hombro, sesión 4 de 10.",
    "Alta médica en dos semanas.",
    "Alergia a la penicilina.",
    "Tratamiento de lumbalgia.",
    "Primera consulta.",
    "Recuperación post esguince de tobillo.",
    "Dolor cervical en seguimiento.",
  ],
  nutricion: [
    "Plan de descenso, control quincenal.",
    "Seguimiento de plan deportivo.",
    "Alergia a la penicilina.",
    "Plan de aumento de masa muscular.",
    "Primera consulta.",
    "Mantenimiento de peso objetivo.",
    "Ajuste de plan por intolerancia.",
  ],
};

const SPECIALTY_WIDGET_LABEL: Record<Specialty, string> = {
  odontologia: "Odontograma",
  medicina: "Signos vitales",
  kinesiologia: "Diagrama corporal",
  nutricion: "Seguimiento nutricional",
};

const TODAY_APPOINTMENTS: Appointment[] = [
  { id: 1, time: "09:00", patient: "Martina I.", type: "Control", status: "confirmado" },
  { id: 2, time: "11:30", patient: "Tomás D.", type: "Limpieza", status: "confirmado" },
  { id: 3, time: "16:00", patient: "Sofía R.", type: "Extracción", status: "pendiente" },
];

const INITIAL_REQUESTS: PendingRequest[] = [
  { id: 101, patient: "Lucas Fernández", requestedFor: "Mañana · 10:00", type: "Consulta" },
  { id: 102, patient: "Valentina Gómez", requestedFor: "Viernes · 15:30", type: "Control" },
];

const HISTORIAL: HistorialItem[] = [
  { id: 1, date: "12/06/2026", patient: "Martina Ibáñez", type: "Control", status: "completado" },
  { id: 2, date: "03/05/2026", patient: "Tomás Duarte", type: "Conducto", status: "completado" },
  { id: 3, date: "28/04/2026", patient: "Sofía Ramírez", type: "Consulta", status: "ausente" },
  { id: 4, date: "15/04/2026", patient: "Lucas Fernández", type: "Ortodoncia", status: "completado" },
  { id: 5, date: "02/04/2026", patient: "Valentina Gómez", type: "Primera consulta", status: "cancelado" },
  { id: 6, date: "20/03/2026", patient: "Agustín Rojas", type: "Blanqueamiento", status: "completado" },
  { id: 7, date: "08/03/2026", patient: "Camila Torres", type: "Control", status: "completado" },
  { id: 8, date: "14/02/2026", patient: "Martina Ibáñez", type: "Limpieza", status: "completado" },
];

const TOOTH_NUMBERS_UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const TOOTH_NUMBERS_LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

const INITIAL_TOOTH_STATE: Record<number, ToothState> = {
  16: "tratado",
  26: "tratado",
  36: "pendiente",
  14: "pendiente",
};

const TOOTH_COLORS: Record<ToothState, string> = {
  sano: "#2a3f5c",
  tratado: GOLD,
  pendiente: "#c0524a",
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <p className="text-[11px] text-white/50">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmado: "bg-emerald-500/15 text-emerald-400",
    pendiente: "bg-amber-500/15 text-amber-400",
    completado: "bg-emerald-500/15 text-emerald-400",
    cancelado: "bg-red-500/15 text-red-400",
    ausente: "bg-white/10 text-white/50",
  };
  return (
    <span
      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
        map[status] ?? "bg-white/10 text-white/50"
      }`}
    >
      {status}
    </span>
  );
}

function Odontogram() {
  const [teeth, setTeeth] = useState<Record<number, ToothState>>(INITIAL_TOOTH_STATE);

  function cycle(n: number) {
    setTeeth((prev) => {
      const current = prev[n] ?? "sano";
      const next: ToothState =
        current === "sano" ? "tratado" : current === "tratado" ? "pendiente" : "sano";
      return { ...prev, [n]: next };
    });
  }

  function renderRow(numbers: number[], y: number) {
    const spacing = 640 / numbers.length;
    return numbers.map((n, i) => {
      const x = i * spacing + spacing / 2;
      const state = teeth[n] ?? "sano";
      return (
        <g key={n} onClick={() => cycle(n)} className="cursor-pointer">
          <rect
            x={x - 14}
            y={y - 14}
            width={28}
            height={28}
            rx={6}
            fill={TOOTH_COLORS[state]}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
          />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill="#fff" opacity={0.8}>
            {n}
          </text>
        </g>
      );
    });
  }

  return (
    <div>
      <div className="overflow-x-auto -mx-1 px-1">
        <svg
          viewBox="0 0 640 140"
          width={640}
          height={140}
          className="h-auto flex-shrink-0"
        >
          {renderRow(TOOTH_NUMBERS_UPPER, 30)}
          {renderRow(TOOTH_NUMBERS_LOWER, 100)}
        </svg>
      </div>
      <p className="mt-1.5 text-[10px] text-white/30">
        Deslizá para ver todas las piezas →
      </p>
      <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3 text-[11px]">
        <span className="flex items-center gap-1.5 text-white/60">
          <span
            className="w-3 h-3 rounded-sm inline-block"
            style={{ background: TOOTH_COLORS.sano }}
          />
          Sano
        </span>
        <span className="flex items-center gap-1.5 text-white/60">
          <span
            className="w-3 h-3 rounded-sm inline-block"
            style={{ background: TOOTH_COLORS.tratado }}
          />
          Tratado
        </span>
        <span className="flex items-center gap-1.5 text-white/60">
          <span
            className="w-3 h-3 rounded-sm inline-block"
            style={{ background: TOOTH_COLORS.pendiente }}
          />
          Pendiente
        </span>
      </div>
      <p className="mt-2 text-[10px] text-white/30">
        Click en una pieza para cambiar su estado (demo interactiva).
      </p>
    </div>
  );
}

function MiniLineChart({ data, color = GOLD }: { data: number[]; color?: string }) {
  const w = 280;
  const h = 80;
  const pad = 8;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = pad + (i * (w - pad * 2)) / (data.length - 1);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return { x, y };
  });
  const pointsStr = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto max-w-xs">
      <polyline points={pointsStr} fill="none" stroke={color} strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
      ))}
    </svg>
  );
}

const VITALS_HISTORY = [
  { date: "12/06/2026", presion: "120/80", peso: 74 },
  { date: "10/04/2026", presion: "118/78", peso: 75 },
  { date: "15/02/2026", presion: "122/82", peso: 76 },
  { date: "20/12/2025", presion: "119/79", peso: 77 },
];

function VitalsHistory() {
  const weightsChronological = VITALS_HISTORY.map((v) => v.peso).slice().reverse();

  return (
    <div>
      <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
        Evolución de peso
      </p>
      <MiniLineChart data={weightsChronological} />
      <p className="text-white/70 text-xs font-semibold mb-2 mt-4 uppercase tracking-wide">
        Últimos controles
      </p>
      <div className="space-y-1.5">
        {VITALS_HISTORY.map((v) => (
          <div
            key={v.date}
            className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs gap-2"
          >
            <span className="text-white/50 flex-shrink-0">{v.date}</span>
            <span className="text-white/60">PA: {v.presion}</span>
            <span className="text-white font-medium">{v.peso} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const BODY_ZONES = [
  { id: "hombro", label: "Hombro", cx: 132, cy: 70 },
  { id: "lumbar", label: "Zona lumbar", cx: 100, cy: 150 },
  { id: "rodilla", label: "Rodilla", cx: 90, cy: 235 },
  { id: "tobillo", label: "Tobillo", cx: 88, cy: 295 },
];

function BodyDiagram() {
  const [affected, setAffected] = useState<Set<string>>(new Set(["hombro"]));

  function toggle(id: string) {
    setAffected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <svg viewBox="0 0 200 320" width={130} height={208} className="flex-shrink-0">
        <circle cx="100" cy="30" r="20" fill="#2a3f5c" stroke="rgba(255,255,255,0.2)" />
        <rect x="70" y="55" width="60" height="100" rx="16" fill="#2a3f5c" stroke="rgba(255,255,255,0.2)" />
        <rect x="55" y="60" width="15" height="90" rx="7" fill="#2a3f5c" stroke="rgba(255,255,255,0.2)" />
        <rect x="130" y="60" width="15" height="90" rx="7" fill="#2a3f5c" stroke="rgba(255,255,255,0.2)" />
        <rect x="78" y="155" width="20" height="110" rx="8" fill="#2a3f5c" stroke="rgba(255,255,255,0.2)" />
        <rect x="102" y="155" width="20" height="110" rx="8" fill="#2a3f5c" stroke="rgba(255,255,255,0.2)" />
        {BODY_ZONES.map((z) => (
          <circle
            key={z.id}
            cx={z.cx}
            cy={z.cy}
            r={11}
            fill={affected.has(z.id) ? "#c0524a" : GOLD}
            stroke={SIDEBAR_BG}
            strokeWidth={2}
            className="cursor-pointer"
            onClick={() => toggle(z.id)}
          />
        ))}
      </svg>
      <div className="flex-1 min-w-0 w-full">
        <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
          Zonas en tratamiento
        </p>
        <ul className="space-y-1 mb-4">
          {BODY_ZONES.filter((z) => affected.has(z.id)).map((z) => (
            <li key={z.id} className="text-white text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#c0524a" }} />
              {z.label}
            </li>
          ))}
          {affected.size === 0 && (
            <li className="text-white/30 text-xs">Sin zonas marcadas.</li>
          )}
        </ul>
        <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
          Progreso del tratamiento
        </p>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-1">
          <div className="h-full rounded-full" style={{ width: "40%", background: GOLD }} />
        </div>
        <p className="text-white/40 text-[10px]">Sesión 4 de 10</p>
        <p className="mt-2 text-[10px] text-white/30">
          Click en una zona del cuerpo para marcarla (demo interactiva).
        </p>
      </div>
    </div>
  );
}

const WEIGHT_TREND = [82, 80, 79, 78, 77, 76];
const MACROS = [
  { label: "Proteínas", pct: 35 },
  { label: "Carbohidratos", pct: 40 },
  { label: "Grasas", pct: 25 },
];

function NutritionProgress() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-4 max-w-xs">
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[10px] text-white/40">Peso actual</p>
          <p className="text-white text-lg font-bold">
            {WEIGHT_TREND[WEIGHT_TREND.length - 1]} kg
          </p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-[10px] text-white/40">Objetivo</p>
          <p className="text-white text-lg font-bold">72 kg</p>
        </div>
      </div>
      <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
        Evolución de peso
      </p>
      <MiniLineChart data={WEIGHT_TREND} />
      <p className="text-white/70 text-xs font-semibold mb-2 mt-4 uppercase tracking-wide">
        Distribución de macros
      </p>
      <div className="space-y-2 max-w-xs">
        {MACROS.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-[10px] text-white/50 mb-0.5">
              <span>{m.label}</span>
              <span>{m.pct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${m.pct}%`, background: GOLD }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniCalendar() {
  const [offset, setOffset] = useState(0);
  const base = new Date(2026, 6, 1);
  const ref = new Date(base.getFullYear(), base.getMonth() + offset, 1);
  const year = ref.getFullYear();
  const month = ref.getMonth();
  const monthLabel = ref.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const markedDays = useMemo(() => {
    const set = new Set<number>();
    for (let d = 1; d <= daysInMonth; d++) {
      if (d % 4 === 0 || d % 7 === 2) set.add(d);
    }
    return set;
  }, [daysInMonth]);

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setOffset((o) => o - 1)}
          className="text-white/50 hover:text-white px-2"
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <p className="text-sm font-semibold text-white capitalize">{monthLabel}</p>
        <button
          onClick={() => setOffset((o) => o + 1)}
          className="text-white/50 hover:text-white px-2"
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-white/40 mb-1">
        {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`aspect-square flex items-center justify-center rounded-md text-[11px] ${
              d === null ? "" : markedDays.has(d) ? "font-bold" : "text-white/60 bg-white/5"
            }`}
            style={
              d !== null && markedDays.has(d)
                ? { background: GOLD, color: SIDEBAR_BG }
                : undefined
            }
          >
            {d ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDemo() {
  const [specialty, setSpecialty] = useState<Specialty>("odontologia");
  const [view, setView] = useState<View>("turnos");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [requests, setRequests] = useState<PendingRequest[]>(INITIAL_REQUESTS);
  const [confirmedFromRequests, setConfirmedFromRequests] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  function handleRequest(id: number, action: "confirmar" | "rechazar") {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setRequests((prev) => prev.filter((r) => r.id !== id));
    if (action === "confirmar") {
      setConfirmedFromRequests((prev) => [
        ...prev,
        { id, time: "—", patient: req.patient, type: req.type, status: "confirmado" },
      ]);
    }
  }

  function openPatient(p: Patient) {
    setSelectedPatient(p);
    setView("ficha");
  }

  const filteredPatients = PATIENTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHistorial = HISTORIAL.filter(
    (h) => statusFilter === "todos" || h.status === statusFilter
  );

  const patientHistorial = selectedPatient
    ? HISTORIAL.filter((h) => h.patient === selectedPatient.name)
    : [];

  const selectedPatientNoteIndex = selectedPatient
    ? PATIENTS.findIndex((p) => p.id === selectedPatient.id)
    : -1;
  const selectedPatientNote =
    selectedPatientNoteIndex >= 0
      ? SPECIALTY_NOTES[specialty][selectedPatientNoteIndex]
      : "";

  const totalPatients = PATIENTS.length;
  const confirmedToday =
    TODAY_APPOINTMENTS.filter((a) => a.status === "confirmado").length +
    confirmedFromRequests.length;

  return (
    <div
      className="flex flex-col w-full h-full text-sm overflow-hidden"
      style={{ background: "#152238" }}
    >
      <div
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 overflow-x-auto border-b border-white/10"
        style={{ background: SIDEBAR_BG }}
      >
        {SPECIALTIES.map((s) => {
          const active = specialty === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSpecialty(s.id)}
              className={`flex-shrink-0 rounded-full px-3 py-1 text-[10px] md:text-xs font-medium transition whitespace-nowrap ${
                active ? "font-semibold" : "text-white/50 hover:text-white"
              }`}
              style={active ? { background: GOLD, color: SIDEBAR_BG } : undefined}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-1 min-h-0">
      <aside
        className="w-14 sm:w-40 md:w-48 flex-shrink-0 flex flex-col py-5 px-2 sm:px-3 gap-1"
        style={{ background: SIDEBAR_BG }}
      >
        <div className="px-1 sm:px-2 mb-6 hidden sm:block">
          <p className="font-serif text-sm font-bold" style={{ color: GOLD }}>
            buzBoozt{" "}
            <span className="text-white/40 font-sans font-normal text-[10px]">admin</span>
          </p>
        </div>
        {NAV_ITEMS.map((item) => {
          const active = view === item.id || (item.id === "pacientes" && view === "ficha");
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center justify-center sm:justify-start gap-2.5 rounded-lg px-2 sm:px-3 py-2.5 text-left text-xs md:text-sm transition ${
                active ? "font-semibold" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              style={active ? { background: GOLD, color: SIDEBAR_BG } : undefined}
            >
              <span>{item.icon}</span>
              <span className="truncate hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </aside>

      <div className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6">
        {view === "turnos" && (
          <div>
            <h3 className="text-white font-bold mb-4">Turnos de hoy</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
              <StatCard label="Pendientes" value={requests.length} />
              <StatCard label="Confirmados hoy" value={confirmedToday} />
              <StatCard label="Esta semana" value={14} />
              <StatCard label="Total pacientes" value={totalPatients} />
            </div>

            <div className="mb-6">
              <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
                Agenda del día
              </p>
              <div className="space-y-2">
                {[...TODAY_APPOINTMENTS, ...confirmedFromRequests].map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2 gap-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-white/50 text-xs w-10 flex-shrink-0">{a.time}</span>
                      <span className="text-white text-xs md:text-sm truncate">{a.patient}</span>
                      <span className="text-white/40 text-[10px] md:text-xs truncate hidden sm:inline">
                        {a.type}
                      </span>
                    </div>
                    <StatusPill status={a.status} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
                Solicitudes pendientes
              </p>
              {requests.length === 0 ? (
                <p className="text-white/30 text-xs">No hay solicitudes pendientes.</p>
              ) : (
                <div className="space-y-2">
                  {requests.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-white text-xs md:text-sm truncate">{r.patient}</p>
                        <p className="text-white/40 text-[10px] md:text-xs truncate">
                          {r.type} · {r.requestedFor}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleRequest(r.id, "confirmar")}
                          className="rounded-md px-2.5 py-1 text-[10px] md:text-xs font-semibold"
                          style={{ background: GOLD, color: SIDEBAR_BG }}
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => handleRequest(r.id, "rechazar")}
                          className="rounded-md px-2.5 py-1 text-[10px] md:text-xs font-semibold text-white/60 border border-white/20 hover:text-white"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {view === "pacientes" && (
          <div>
            <h3 className="text-white font-bold mb-4">Pacientes</h3>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar paciente..."
              className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-white/30 mb-4 focus:outline-none focus:border-white/30"
            />
            <div className="space-y-1.5">
              {filteredPatients.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openPatient(p)}
                  className="w-full flex items-center gap-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-left hover:border-white/30 transition"
                >
                  <span
                    className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: GOLD, color: SIDEBAR_BG }}
                  >
                    {p.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="text-white text-xs md:text-sm truncate">{p.name}</p>
                    <p className="text-white/40 text-[10px]">Última visita: {p.lastVisit}</p>
                  </div>
                </button>
              ))}
              {filteredPatients.length === 0 && (
                <p className="text-white/30 text-xs">No se encontraron pacientes.</p>
              )}
            </div>
          </div>
        )}

        {view === "ficha" && selectedPatient && (
          <div>
            <button
              onClick={() => setView("pacientes")}
              className="text-white/50 hover:text-white text-xs mb-4"
            >
              ← Volver a pacientes
            </button>
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: GOLD, color: SIDEBAR_BG }}
              >
                {selectedPatient.initials}
              </span>
              <div className="min-w-0">
                <p className="text-white font-bold truncate">{selectedPatient.name}</p>
                <p className="text-white/40 text-xs">
                  Última visita: {selectedPatient.lastVisit}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] text-white/40">DNI</p>
                <p className="text-white text-sm">{selectedPatient.dni}</p>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] text-white/40">Teléfono</p>
                <p className="text-white text-sm">{selectedPatient.phone}</p>
              </div>
            </div>

            <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
              {SPECIALTY_WIDGET_LABEL[specialty]}
            </p>
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 mb-6">
              {specialty === "odontologia" && <Odontogram />}
              {specialty === "medicina" && <VitalsHistory />}
              {specialty === "kinesiologia" && <BodyDiagram />}
              {specialty === "nutricion" && <NutritionProgress />}
            </div>

            <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
              Notas
            </p>
            <p className="text-white/60 text-xs mb-6">{selectedPatientNote}</p>

            <p className="text-white/70 text-xs font-semibold mb-2 uppercase tracking-wide">
              Historial de turnos
            </p>
            <div className="space-y-1.5">
              {patientHistorial.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2 gap-2"
                >
                  <span className="text-white/60 text-xs truncate">
                    {h.date} · {h.type}
                  </span>
                  <StatusPill status={h.status} />
                </div>
              ))}
              {patientHistorial.length === 0 && (
                <p className="text-white/30 text-xs">Sin turnos previos registrados.</p>
              )}
            </div>
          </div>
        )}

        {view === "historial" && (
          <div>
            <h3 className="text-white font-bold mb-4">Historial de turnos</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["todos", "completado", "cancelado", "ausente"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-full px-3 py-1 text-[10px] md:text-xs capitalize border transition ${
                    statusFilter === s
                      ? "font-semibold border-transparent"
                      : "text-white/50 border-white/15 hover:text-white"
                  }`}
                  style={statusFilter === s ? { background: GOLD, color: SIDEBAR_BG } : undefined}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              {filteredHistorial.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-white text-xs md:text-sm truncate">{h.patient}</p>
                    <p className="text-white/40 text-[10px] truncate">
                      {h.date} · {h.type}
                    </p>
                  </div>
                  <StatusPill status={h.status} />
                </div>
              ))}
              {filteredHistorial.length === 0 && (
                <p className="text-white/30 text-xs">No hay turnos con ese filtro.</p>
              )}
            </div>
          </div>
        )}

        {view === "agenda" && (
          <div>
            <h3 className="text-white font-bold mb-4">Agenda</h3>
            <MiniCalendar />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
