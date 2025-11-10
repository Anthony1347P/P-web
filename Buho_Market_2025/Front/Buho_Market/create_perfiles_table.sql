-- Crear tabla de perfiles de usuario
-- Ejecuta este script en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS public.perfiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT,
    foto_perfil_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas más rápidas
CREATE INDEX IF NOT EXISTS idx_perfiles_id ON public.perfiles(id);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden ver su propio perfil
CREATE POLICY "Los usuarios pueden ver su propio perfil"
ON public.perfiles
FOR SELECT
USING (auth.uid() = id);

-- Política: Los usuarios pueden insertar su propio perfil
CREATE POLICY "Los usuarios pueden crear su propio perfil"
ON public.perfiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Política: Los usuarios pueden actualizar su propio perfil
CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
ON public.perfiles
FOR UPDATE
USING (auth.uid() = id);

-- Política: Los usuarios pueden eliminar su propio perfil
CREATE POLICY "Los usuarios pueden eliminar su propio perfil"
ON public.perfiles
FOR DELETE
USING (auth.uid() = id);

-- Crear bucket de storage para fotos de perfil (si no existe)
-- Esto debe ejecutarse en el Storage del dashboard de Supabase
-- o puedes crearlo manualmente en Storage > Create new bucket
-- Nombre del bucket: "fotos-perfil"
-- Public: true

-- Comentario: Después de crear el bucket, configura las políticas de storage:
-- INSERT: auth.uid() = (bucket_id, name, owner)
-- SELECT: public (para que las fotos sean visibles)
-- UPDATE: auth.uid() = owner
-- DELETE: auth.uid() = owner
