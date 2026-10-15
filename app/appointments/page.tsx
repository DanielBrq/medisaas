import { Suspense } from "react";
import AppointentList from "./appointentList";
import CreateAppointmentModal from "./createAppointmentModal";

export default function AppointmentsPage() {
    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                            Gestión Clínica
                        </span>
                        <span className="text-xs text-slate-400">Citas & Consultas</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">
                        Citas Médicas
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Supervisa, agenda y actualiza las consultas médicas y signos vitales de los pacientes.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <CreateAppointmentModal />
                </div>
            </div>

            {/* Main content list */}
            <Suspense
                fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-slate-100 rounded w-1/2" />
                                        <div className="h-3 bg-slate-100 rounded w-1/4" />
                                    </div>
                                </div>
                                <div className="h-14 bg-slate-50 rounded-xl" />
                                <div className="h-8 bg-slate-100 rounded-lg" />
                            </div>
                        ))}
                    </div>
                }
            >
                <AppointentList />
            </Suspense>
        </div>
    );
}
