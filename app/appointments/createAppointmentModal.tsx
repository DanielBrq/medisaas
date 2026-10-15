'use client'

import { useRef, useState, useTransition } from "react";
import { createAppointent } from "../actions/appointments";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { CreateAppointmentSchema, type CreateAppointmentInput } from "./createAppointment.schema";
import * as v from "valibot";

type FieldErrors = Partial<Record<keyof CreateAppointmentInput, string[]>>

export default function CreateAppointmentModal() {
    const [open, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [errors, setErrors] = useState<FieldErrors>({});
    const formRef = useRef<HTMLFormElement>(null);

    const [formData, setFormData] = useState<Record<string, string>>({
        patientName: "",
        age: "",
        scheduleTime: "",
        reason: "",
        symptoms: "",
        bloodPressure: "",
        heartRate: "",
        temperature: "",
    });

    function resetFields() {
        setFormData({
            patientName: "",
            age: "",
            scheduleTime: "",
            reason: "",
            symptoms: "",
            bloodPressure: "",
            heartRate: "",
            temperature: "",
        });
        setErrors({});
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof CreateAppointmentInput]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = v.safeParse(CreateAppointmentSchema, formData);

        if (!result.success) {
            const { nested } = v.flatten(result.issues);
            setErrors(nested ?? {});
            return;
        }

        setErrors({});
        startTransition(async () => {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            await createAppointent(data);
            resetFields();
            setIsOpen(false);
        });
    }

    function fieldErr(name: keyof CreateAppointmentInput) {
        return {
            name,
            value: formData[name] ?? "",
            onChange: handleChange,
            invalid: !!errors[name],
            errorMessage: errors[name],
        };
    }

    return (
        <>
            <Button onClick={() => setIsOpen(true)} variant="primary" size="md" className="gap-2 shadow-sm shadow-teal-600/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nueva cita médica
            </Button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOpen(false);
                    }}
                >
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold text-slate-800">Registrar nueva cita</h2>
                                    <p className="text-xs text-slate-500">Ingresa los datos del paciente y la consulta</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form ref={formRef} onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
                            <div className="grid grid-cols-2 gap-3.5">
                                <div className="col-span-2">
                                    <Input label="Nombre del paciente" placeholder="Ej. Dr. Mario o Juan Pérez" {...fieldErr("patientName")} />
                                </div>

                                <Input label="Edad" type="number" placeholder="Ej. 34" {...fieldErr("age")} />
                                <Input label="Fecha y hora" type="datetime-local" {...fieldErr("scheduleTime")} />

                                <div className="col-span-2">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                                        Motivo de la consulta
                                    </label>
                                    <textarea
                                        name="reason"
                                        rows={2}
                                        placeholder="Descripción breve de los síntomas o motivo de visita..."
                                        value={formData.reason}
                                        onChange={handleChange}
                                        className={`w-full border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 bg-white shadow-xs transition duration-150 ease-in-out focus:outline-none focus:ring-2 resize-none ${
                                            errors.reason
                                                ? "border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-rose-500/20 focus:border-rose-500"
                                                : "border-slate-200 hover:border-slate-300 focus:ring-teal-500/20 focus:border-teal-600"
                                        }`}
                                    />
                                    {errors.reason && (
                                        <p className="mt-1 text-xs font-medium text-rose-600 flex items-center gap-1">
                                            <span className="inline-block w-1 h-1 rounded-full bg-rose-500"></span>
                                            {errors.reason[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <Input label="Síntomas" placeholder="Separados por coma: fiebre, tos, cefalea..." {...fieldErr("symptoms")} />
                                </div>

                                <div className="col-span-2 pt-1 border-t border-slate-100">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Constantes vitales (Opcional)</span>
                                </div>

                                <Input label="Presión arterial" placeholder="Ej. 120/80 mmHg" {...fieldErr("bloodPressure")} />
                                <Input label="Ritmo cardíaco" type="number" placeholder="Ej. 75 lpm" {...fieldErr("heartRate")} />

                                <div className="col-span-2 sm:col-span-1">
                                    <Input label="Temperatura" type="number" step="0.1" placeholder="Ej. 36.5 °C" {...fieldErr("temperature")} />
                                </div>
                            </div>

                            <div className="flex justify-end items-center gap-2.5 pt-3 border-t border-slate-100">
                                <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="primary" loading={isPending}>
                                    {isPending ? "Guardando..." : "Guardar cita"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}