# AGROFIN · Activar la nube (Supabase) — 5 minutos

Esto le da a la app: cuentas reales (email + contraseña), entrar desde cualquier teléfono, respaldo en la nube y recuperar contraseña. Sigue funcionando offline.

## Pasos (los haces tú una sola vez)

1. Entra a **https://supabase.com** → *Start your project* (puedes entrar con GitHub). Es gratis.
2. **New project**:
   - Name: `agrofin`
   - Database Password: pon una y guárdala (no la necesitarás para la app).
   - Region: la más cercana (ej. *East US* o *Mexico* si aparece).
   - *Create new project* y espera ~2 min a que termine.
3. **Crear las tablas**: menú izquierdo → **SQL Editor** → *New query* → pega TODO el contenido de `supabase-schema.sql` → **Run**.
4. **Que el registro sea instantáneo** (sin correo de confirmación): menú → **Authentication → Providers → Email** → desactiva *“Confirm email”* → Save. (Así tu tío crea su cuenta y entra al instante.)
5. **Copia 2 datos**: menú → **Project Settings → API**:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public** key (una cadena larga `eyJ...`)

   > Estos dos son **públicos**, es seguro ponerlos en la app (la seguridad la dan las políticas RLS del SQL).

6. **Pásame esos 2 datos** y yo conecto y pruebo todo. Quedará completa.
