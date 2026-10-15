import { ReactNode } from "react"
import Link from "next/link"

export default function AppointmentLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50/85 text-slate-800 flex flex-col">

            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs group-hover:bg-teal-700 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div>
                                <span className="font-bold text-lg text-slate-900 tracking-tight block leading-tight">
                                    Medi<span className="text-teal-600">SaaS</span>
                                </span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block leading-none">
                                    Portal Clínico
                                </span>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href="/appointments"
                                className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-teal-800 bg-teal-50 border border-teal-200/50"
                            >
                                Citas Médicas
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/60">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Sistema activo</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content body */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    )
}