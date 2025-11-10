# 🔧 GUÍA DE CONFIGURACIÓN DE SUPABASE PARA PERFIL DE USUARIO

## 📋 PASOS A SEGUIR

### 1️⃣ CREAR TABLA DE PERFILES

Ve a tu dashboard de Supabase → **SQL Editor** y ejecuta el siguiente script:

```sql
-- Crear tabla de perfiles de usuario
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
```

---

### 2️⃣ CREAR BUCKET DE STORAGE PARA FOTOS DE PERFIL

#### A) Crear el Bucket

1. Ve a **Storage** en el menú lateral de Supabase
2. Haz clic en **"Create a new bucket"**
3. Configura así:
   - **Name:** `fotos-perfil`
   - **Public bucket:** ✅ **SÍ** (para que las fotos sean visibles públicamente)
   - Haz clic en **"Create bucket"**

#### B) Configurar las Políticas del Bucket

Las políticas controlan quién puede hacer qué con los archivos. Aquí está la explicación:

---

## 🔐 ¿QUÉ SON LAS POLÍTICAS DE STORAGE?

Las políticas de Storage son reglas de seguridad que controlan:
- **Quién** puede subir archivos
- **Quién** puede ver archivos
- **Quién** puede actualizar archivos
- **Quién** puede eliminar archivos

---

## 📝 POLÍTICAS NECESARIAS PARA FOTOS DE PERFIL

### 1. **Política INSERT (Subir archivos)**

**¿Qué hace?** Permite que los usuarios suban fotos **solo a su propia carpeta** (identificada por su user ID).

**¿Dónde se configura?**
1. Ve a **Storage** → Haz clic en el bucket `fotos-perfil`
2. Ve a la pestaña **"Policies"**
3. Haz clic en **"New Policy"** → **"For full customization"**
4. Selecciona **INSERT**
5. Configura así:

**Policy name:** `Usuarios pueden subir sus propias fotos`

**Target roles:** `authenticated`

**USING expression (para INSERT no se usa):** Dejar vacío

**WITH CHECK expression:**
```sql
bucket_id = 'fotos-perfil'
AND (storage.foldername(name))[1] = auth.uid()::text
```

**¿Qué significa?**
- `bucket_id = 'fotos-perfil'` → Solo aplica al bucket de fotos de perfil
- `(storage.foldername(name))[1]` → Obtiene el primer nivel de carpeta del path
- `auth.uid()::text` → El ID del usuario autenticado
- **Resultado:** Solo puedes subir archivos a tu propia carpeta (ej: `mi-user-id/foto.jpg`)

---

### 2. **Política SELECT (Ver/Descargar archivos)**

**¿Qué hace?** Permite que **cualquier persona** vea las fotos de perfil (son públicas).

**Configuración:**

**Policy name:** `Fotos de perfil son publicas`

**Target roles:** `public` (o `anon, authenticated` si quieres que solo usuarios logueados las vean)

**USING expression:**
```sql
bucket_id = 'fotos-perfil'
```

**¿Qué significa?**
- Cualquier persona puede ver todas las fotos del bucket `fotos-perfil`
- Necesario para que las fotos se muestren en la app

---

### 3. **Política UPDATE (Actualizar archivos)**

**¿Qué hace?** Permite que los usuarios actualicen **solo sus propias fotos**.

**Configuración:**

**Policy name:** `Usuarios pueden actualizar sus propias fotos`

**Target roles:** `authenticated`

**USING expression:**
```sql
bucket_id = 'fotos-perfil'
AND (storage.foldername(name))[1] = auth.uid()::text
```

**¿Qué significa?**
- Solo puedes actualizar archivos en tu propia carpeta

---

### 4. **Política DELETE (Eliminar archivos)**

**¿Qué hace?** Permite que los usuarios eliminen **solo sus propias fotos**.

**Configuración:**

**Policy name:** `Usuarios pueden eliminar sus propias fotos`

**Target roles:** `authenticated`

**USING expression:**
```sql
bucket_id = 'fotos-perfil'
AND (storage.foldername(name))[1] = auth.uid()::text
```

**¿Qué significa?**
- Solo puedes eliminar archivos en tu propia carpeta

---

## 🎯 RESUMEN VISUAL

```
📁 fotos-perfil (bucket público)
│
├── 🔒 INSERT: Solo puedes subir a TU carpeta (user-id/)
├── 🌍 SELECT: Todos pueden ver todas las fotos
├── 🔒 UPDATE: Solo puedes actualizar TUS archivos
└── 🔒 DELETE: Solo puedes eliminar TUS archivos
```

---

## ⚠️ ¿POR QUÉ ES IMPORTANTE?

Sin estas políticas:
- ❌ Los usuarios no podrán subir fotos → Error 403
- ❌ Las fotos no se verán → Error de acceso
- ❌ Cualquiera podría borrar las fotos de otros

Con estas políticas:
- ✅ Cada usuario solo accede a sus archivos
- ✅ Las fotos son públicamente visibles
- ✅ Seguridad garantizada

---

## 🚀 VERIFICAR QUE TODO FUNCIONA

1. Inicia sesión en tu app
2. Ve a la página de perfil
3. Selecciona una imagen
4. Haz clic en "Guardar Foto"
5. Si ves "✅ Foto actualizada exitosamente" → **¡Funciona!**
6. Si ves un error → Revisa las políticas en Supabase Storage

---

## 🛠️ ALTERNATIVA RÁPIDA: USAR SQL

Si prefieres configurar todo por SQL, ejecuta esto en el **SQL Editor**:

```sql
-- Política INSERT
INSERT INTO storage.policies (bucket_id, name, definition, policy_for, roles)
VALUES (
  'fotos-perfil',
  'Usuarios pueden subir sus propias fotos',
  'bucket_id = ''fotos-perfil'' AND (storage.foldername(name))[1] = auth.uid()::text',
  'INSERT',
  '{authenticated}'
);

-- Política SELECT (público)
INSERT INTO storage.policies (bucket_id, name, definition, policy_for, roles)
VALUES (
  'fotos-perfil',
  'Fotos de perfil son publicas',
  'bucket_id = ''fotos-perfil''',
  'SELECT',
  '{public}'
);

-- Política UPDATE
INSERT INTO storage.policies (bucket_id, name, definition, policy_for, roles)
VALUES (
  'fotos-perfil',
  'Usuarios pueden actualizar sus propias fotos',
  'bucket_id = ''fotos-perfil'' AND (storage.foldername(name))[1] = auth.uid()::text',
  'UPDATE',
  '{authenticated}'
);

-- Política DELETE
INSERT INTO storage.policies (bucket_id, name, definition, policy_for, roles)
VALUES (
  'fotos-perfil',
  'Usuarios pueden eliminar sus propias fotos',
  'bucket_id = ''fotos-perfil'' AND (storage.foldername(name))[1] = auth.uid()::text',
  'DELETE',
  '{authenticated}'
);
```

---

## ✅ ¡LISTO!

Ahora tu sistema de perfil de usuario está completamente configurado y seguro.
