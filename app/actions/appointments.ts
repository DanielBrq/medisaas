'use server'

import { createClient } from "@/lib/server";
import { revalidatePath } from "next/cache";

export async function createAppointent(formData: FormData) {
    const SUPABASE = await createClient();

    const patientName = formData.get('patientName') as string;
    const age = formData.get('age') as string;
    const schedule_time = formData.get('scheduleTime') as string;
    const reason = formData.get('reason') as string;
    const symptoms = formData.get('symptoms') as string;
    const bloodPressure = formData.get('bloodPressure') as string;
    const heartRate = formData.get('heartRate') as string;
    const temperature = formData.get('temperature') as string;
    const { error } = await SUPABASE.from('appointments').insert({
        patient_name: patientName,
        age: parseInt(age),
        scheduled_time: new Date(schedule_time),
        reason,
        symptoms: symptoms.split(','),
        status: 'waiting',
        blood_pressure: bloodPressure,
        heart_rate: parseInt(heartRate),
        temperature: parseFloat(temperature),
    })

    if (error) throw new Error('Error while creating appointment')

    revalidatePath('/appointments')

}

export async function getAppointmentById(id: string) {
    const SUPABASE = await createClient();

    const { data, error } = await SUPABASE.from('appointments').select('*').eq('id', id).single();

    if (error) throw new Error('Error while getting appointment');
    return data;
}

export async function getAppointmentsList() {
    const SUPABASE = await createClient();

    const { data, error } = await SUPABASE.from('appointments').select('*').order('scheduled_time', { ascending: true });

    if (error) {
        console.error('Supabase error completo:', error)
        throw new Error(`Error while getting appointments: ${error.message}`)
    }
    return data ?? [];
}

export async function updateAppointment(formData: FormData) {
    const SUPABASE = await createClient();

    const id = formData.get('id') as string;
    const patientName = formData.get('patientName') as string;
    const age = formData.get('age') as string;
    const schedule_time = formData.get('scheduleTime') as string;
    const reason = formData.get('reason') as string;
    const symptoms = formData.get('symptoms') as string;
    const bloodPressure = formData.get('bloodPressure') as string;
    const heartRate = formData.get('heartRate') as string;
    const temperature = formData.get('temperature') as string;

    const { error } = await SUPABASE.from('appointments').update({
        patient_name: patientName,
        age: parseInt(age),
        scheduled_time: new Date(schedule_time),
        reason,
        symptoms: symptoms.split(','),
        blood_pressure: bloodPressure,
        heart_rate: parseInt(heartRate),
        temperature: parseFloat(temperature),
    }).eq('id', id);

    if (error) {
        throw new Error('Error while updating appointment')
    }

    revalidatePath('/appointments')
}

export async function updateAppointmentStatus(formData: FormData) {
    const SUPABASE = await createClient();

    const id = formData.get('id') as string;
    const newStatus = formData.get('status') as string;

    const { error } = await SUPABASE.from('appointments').update({ status: newStatus }).eq('id', id);

    if (error) {
        throw new Error('Error while updating status')
    }

    revalidatePath('/appointments')

}

export async function deleteAppointment(id: string) {
    const SUPABASE = await createClient();

    const { error } = await SUPABASE.from('appointments').delete().eq('id', id);

    if (error) throw new Error('Error while deleting appointment');

    revalidatePath('/appointments')
}