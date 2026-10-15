

create type appointment_status as enum ('waiting', 'in_consultation', 'completed', 'cancelled');

create table appointments (
  id uuid default gen_random_uuid() primary key,
  patient_name text not null,
  age int not null,
  scheduled_time timestamp with time zone not null,
  reason text not null,
  symptoms text[],
  status appointment_status default 'waiting',
  blood_pressure text,
  heart_rate int,
  temperature decimal,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into appointments (patient_name, age, scheduled_time, reason, symptoms, status, blood_pressure, heart_rate, temperature)
values 
  ('Carlos Gómez', 32, '2026-10-14 09:00:00-06', 'Severe headache', ARRAY['Fever', 'Dizziness'], 'waiting', '120/80', 75, 37.2),
  ('María Rodríguez', 45, '2026-10-14 09:30:00-06', 'Blood pressure check', ARRAY['Fatigue'], 'in_consultation', '130/85', 80, 36.8);