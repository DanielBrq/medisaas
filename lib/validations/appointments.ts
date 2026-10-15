import * as v from 'valibot';

export const appointmentSchema = v.object({
    patientName: v.pipe(
        v.string(),
        v.nonEmpty("El nombre del paciente es requerido"),
        v.minLength(2, "El nombre del paciente debe tener al menos 2 caracteres"),
        v.trim()
    ),
    age: v.pipe(
        v.number(),
        v.minValue(0, "La edad debe ser mayor o igual a 0"),
        v.maxValue(120, "La edad debe ser menor o igual a 120")
    ),
    scheduleTime: v.pipe(
        v.string(),
        v.nonEmpty("La fecha y hora de la cita son requeridas")
    ),
    reason: v.pipe(
        v.string(),
        v.nonEmpty("El motivo de la cita es requerido")
    ),
    symptoms: v.pipe(
        v.string(),
        v.nonEmpty("Los síntomas son requeridos")
    ),
    bloodPressure: v.pipe(
        v.string(),
        v.nonEmpty("La presión arterial es requerida")
    ),
    heartRate: v.pipe(
        v.number(),
        v.minValue(0),
        v.maxValue(200)
    ),
    temperature: v.pipe(
        v.number(),
        v.minValue(0),
        v.maxValue(200)
    ),
});

export type AppointmentOutput = v.InferOutput<typeof appointmentSchema>;
export type AppointmentInput = v.InferInput<typeof appointmentSchema>;

export function getAppointmentData(data: unknown): AppointmentOutput {
    return v.parse(appointmentSchema, data);
}