import { getAppointmentsList } from "../actions/appointments"
import { Tables } from "@/lib/database.types"
import UpdateAppointmentModal from "./updateAppointmentModal"

type Appointment = Tables<"appointments">

function getStatusBadge(status: string | null) {
    const s = (status || "scheduled").toLowerCase();
    if (s === "completed" || s === "completada") {
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Completada</span>
    }
    if (s === "cancelled" || s === "cancelada") {
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">Cancelada</span>
    }
    if (s === "in_progress" || s === "en_progreso") {
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">En Consulta</span>
    }
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">Programada</span>
}

function formatDisplayDate(dateStr: string | null | undefined) {
    if (!dateStr) return "Sin programar";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("es-ES", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default async function AppointentList() {
    const appointments: Appointment[] = await getAppointmentsList()

    if (!appointments || appointments.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
                <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-base font-semibold text-slate-800">No hay citas registradas</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Comienza agregando una nueva cita médica para gestionar pacientes y signos vitales.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {appointments.map((item) => {
                const symptomsList = Array.isArray(item.symptoms)
                    ? item.symptoms
                    : typeof item.symptoms === "string"
                    ? (item.symptoms as string).split(",")
                    : [];

                return (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200/80 hover:border-teal-300 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group"
                    >
                        <div>
                            {/* Card Top: Patient Info & Status */}
                            <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-base shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
                                        {item.patient_name ? item.patient_name.charAt(0).toUpperCase() : "P"}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 text-base leading-tight">
                                            {item.patient_name || "Paciente sin nombre"}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                            {item.age != null && <span>{item.age} años</span>}
                                            {item.age != null && <span className="text-slate-300">•</span>}
                                            <span className="font-mono text-[11px] text-slate-400">ID #{item.id.slice(0, 6)}</span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {getStatusBadge(item.status)}
                                </div>
                            </div>

                            {/* Schedule & Reason */}
                            <div className="py-3.5 space-y-2.5">
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <svg className="w-4 h-4 text-teal-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium text-slate-700">{formatDisplayDate(item.scheduled_time)}</span>
                                </div>

                                {item.reason && (
                                    <div className="text-xs text-slate-600 bg-slate-50/70 rounded-lg p-2.5 border border-slate-100">
                                        <span className="font-semibold text-slate-700 block mb-0.5">Motivo:</span>
                                        <p className="line-clamp-2 text-slate-600">{item.reason}</p>
                                    </div>
                                )}

                                {/* Symptoms tags */}
                                {symptomsList.length > 0 && symptomsList[0] !== "" && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {symptomsList.map((sym, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-700 font-medium"
                                            >
                                                {sym.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Vitals Summary Pill Grid */}
                            {(item.blood_pressure || item.heart_rate || item.temperature) && (
                                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-teal-50/40 rounded-xl border border-teal-100/60 mb-3 text-center">
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-teal-800/70 tracking-wider">P. Arterial</div>
                                        <div className="text-xs font-semibold text-slate-800 mt-0.5">{item.blood_pressure || "—"}</div>
                                    </div>
                                    <div className="border-x border-teal-100">
                                        <div className="text-[10px] uppercase font-bold text-teal-800/70 tracking-wider">Ritmo Card.</div>
                                        <div className="text-xs font-semibold text-slate-800 mt-0.5">
                                            {item.heart_rate ? `${item.heart_rate} bpm` : "—"}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-teal-800/70 tracking-wider">Temp.</div>
                                        <div className="text-xs font-semibold text-slate-800 mt-0.5">
                                            {item.temperature ? `${item.temperature} °C` : "—"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card Footer: Action */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">
                                Expediente médico
                            </span>
                            <UpdateAppointmentModal appointment={item} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}