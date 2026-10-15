import * as v from 'valibot'

export const CreateAppointmentSchema = v.object({
    patientName: v.pipe(
        v.string(),
        v.nonEmpty('El nombre es obligatorio'),
        v.minLength(2, 'Mínimo 2 caracteres')
    ),
    age: v.pipe(
        v.string(),
        v.nonEmpty('La edad es obligatoria'),
        v.transform((val) => Number(val)),
        v.number('Debe ser un número'),
        v.minValue(0, 'La edad no puede ser negativa'),
        v.maxValue(150, 'Edad no válida')
    ),
    scheduleTime: v.pipe(
        v.string(),
        v.nonEmpty('La fecha y hora son obligatorias')
    ),
    reason: v.pipe(
        v.string(),
        v.nonEmpty('El motivo es obligatorio')
    ),
    symptoms: v.optional(v.string()),
    bloodPressure: v.optional(v.string()),
    heartRate: v.optional(v.string()),
    temperature: v.optional(v.string()),
})

export type CreateAppointmentInput = v.InferInput<typeof CreateAppointmentSchema>
