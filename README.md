# MediSaaS

Proyecto de práctica para desarrollar un SaaS de gestión médica con **Next.js** y **Supabase**. La aplicación está orientada a organizar citas, pacientes y consultas médicas.

## Tecnologías

- Next.js 16
- React 19
- Supabase
- Tailwind CSS 4
- TypeScript

## Desarrollo local

Requisitos: Node.js y pnpm.

1. Instala las dependencias:

   ```bash
   pnpm install
   ```

2. Crea un archivo `.env.local` en la raíz con las credenciales de tu proyecto Supabase:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```