# 📚 Documentación del Proyecto Buho Market

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Instalación y Configuración](#instalación-y-configuración)
5. [Base de Datos](#base-de-datos)
6. [Funcionalidades](#funcionalidades)
7. [Componentes Principales](#componentes-principales)
8. [Flujo de Autenticación](#flujo-de-autenticación)
9. [Variables de Entorno](#variables-de-entorno)
10. [Scripts Disponibles](#scripts-disponibles)
11. [Despliegue](#despliegue)
12. [Mejoras Futuras](#mejoras-futuras)

---

## 🎯 Descripción General

**Buho Market** es una plataforma web de marketplace (mercadoteca digital) diseñada específicamente para la comunidad estudiantil de la Universidad Centroamericana José Simeón Cañas (UCA).

Permite a los estudiantes comprar y vender artículos de segunda mano, facilitando el intercambio de productos entre la comunidad universitaria de manera segura y accesible.

### Características Principales

- ✅ Autenticación segura con Google OAuth
- ✅ Registro restringido a correos institucionales (@uca.edu.sv)
- ✅ Creación de publicaciones con múltiples imágenes
- ✅ Categorización de productos (Electrónica, Literatura, Accesorios)
- ✅ Búsqueda y filtrado de publicaciones
- ✅ Interfaz responsive para dispositivos móviles

---

## 🛠️ Tecnologías Utilizadas

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.1.1 | Framework principal de UI |
| **Vite** | 7.1.7 | Bundler y servidor de desarrollo |
| **React Router DOM** | 7.9.5 | Gestión de rutas |
| **Styled Components** | 6.1.19 | Estilos dinámicos |
| **CSS Vanilla** | - | Estilos estáticos |

### Backend (BaaS)

| Servicio | Propósito |
|----------|-----------|
| **Supabase** | Backend as a Service |
| **PostgreSQL** | Base de datos relacional |
| **Supabase Auth** | Sistema de autenticación |
| **Supabase Storage** | Almacenamiento de archivos |

### Herramientas de Desarrollo

- **ESLint** (9.36.0) - Linter de código
- **Node.js** (v18+) - Entorno de ejecución
- **Git** - Control de versiones

---

## 📁 Estructura del Proyecto

```
P-web/
└── Buho_Market/
    ├── public/
    │   ├── Img/                        # 36 imágenes (logos, iconos)
    │   │   ├── Logo1.jpg
    │   │   ├── icon-*.svg
    │   │   └── ...
    │   └── vite.svg
    ├── src/
    │   ├── Componets/
    │   │   ├── Pagina_principal/
    │   │   │   ├── Header.jsx         # Barra de navegación
    │   │   │   ├── Hero.jsx           # Banner principal
    │   │   │   ├── Categorias.jsx     # Sección de categorías
    │   │   │   └── Footer.jsx         # Pie de página
    │   │   └── Pagina_publicaciones/
    │   │       └── Publicacion.jsx    # Formulario de publicación
    │   ├── Pages/
    │   │   ├── Home.jsx               # Página principal
    │   │   ├── Login.jsx              # Inicio de sesión
    │   │   ├── Registrarse.jsx        # Registro de usuarios
    │   │   ├── RecuperarContrasena.jsx # Recuperación de contraseña
    │   │   ├── Publicaciones.jsx      # Vista de publicaciones
    │   │   └── Perfil.jsx             # Perfil (sin implementar)
    │   ├── context/
    │   │   └── AuthContext.jsx        # Contexto de autenticación
    │   ├── hook/
    │   │   └── usoPublicaciones.js    # Hook para consultas
    │   ├── routers/
    │   │   └── routes.jsx             # Configuración de rutas
    │   ├── supabase/
    │   │   └── supabase.js            # Cliente de Supabase
    │   ├── Css/
    │   │   ├── HomeStyle.css
    │   │   ├── LoginStyle.css
    │   │   ├── RegistrarseStyle.css
    │   │   ├── RecuperarContraseña.css
    │   │   └── Publicaciones.css
    │   ├── assets/
    │   ├── App.jsx                    # Componente raíz
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx                   # Punto de entrada
    ├── .env                           # Variables de entorno
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── README.md
```

---

## ⚙️ Instalación y Configuración

### Prerrequisitos

- Node.js >= 18.0.0
- npm o yarn
- Cuenta de Supabase configurada

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd P-web/Buho_Market
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear archivo `.env` en la raíz del proyecto:
   ```env
   VITE_APP_SUPABASE_URL=tu_url_de_supabase
   VITE_APP_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

4. **Configurar Supabase** (ver sección [Base de Datos](#base-de-datos))

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

---

## 🗄️ Base de Datos

### Información del Proyecto Supabase

- **Project Reference:** `ndnlciifdevlchnamhfs`
- **URL:** `https://ndnlciifdevlchnamhfs.supabase.co`
- **Dashboard:** [Ver Dashboard](https://supabase.com/dashboard/project/ndnlciifdevlchnamhfs)

### Esquema de Base de Datos

#### Tabla: `categorias`

Almacena las categorías de productos disponibles.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid (PK) | Identificador único |
| `nombre` | varchar | Nombre de la categoría |
| `created_at` | timestamp | Fecha de creación |

**Datos iniciales:**
```sql
INSERT INTO categorias (nombre) VALUES
    ('Electrónica'),
    ('Literatura'),
    ('Accesorios');
```

#### Tabla: `publicaciones`

Almacena las publicaciones de productos creadas por usuarios.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid (PK) | Identificador único |
| `titulo` | varchar | Título del producto |
| `descripcion` | text | Descripción detallada |
| `precio` | numeric | Precio del producto |
| `categoria_id` | uuid (FK) | Referencia a categorías |
| `usuario_id` | uuid (FK) | Referencia a auth.users |
| `estado` | boolean | Activo/Inactivo |
| `created_at` | timestamp | Fecha de creación |

**Relaciones:**
- `categoria_id` → `categorias.id`
- `usuario_id` → `auth.users.id`

#### Tabla: `fotos_publicacion`

Almacena las URLs de las imágenes asociadas a cada publicación.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | uuid (PK) | Identificador único |
| `publicacion_id` | uuid (FK) | Referencia a publicaciones |
| `url_foto` | varchar | URL pública de la imagen |
| `orden` | integer | Orden de visualización (1-5) |
| `created_at` | timestamp | Fecha de creación |

**Relaciones:**
- `publicacion_id` → `publicaciones.id` (ON DELETE CASCADE)

### Storage Buckets

#### Bucket: `fotos-productos`

- **Tipo:** Público
- **Estructura de archivos:** `{usuario_id}/{timestamp}_{index}_{filename}`
- **Formatos permitidos:** JPG, PNG, WEBP
- **Tamaño máximo:** 5 MB por imagen

### Scripts SQL de Migración

```sql
-- Crear tabla de categorías
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de publicaciones
CREATE TABLE publicaciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL,
    categoria_id UUID REFERENCES categorias(id),
    usuario_id UUID REFERENCES auth.users(id),
    estado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de fotos
CREATE TABLE fotos_publicacion (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publicacion_id UUID REFERENCES publicaciones(id) ON DELETE CASCADE,
    url_foto VARCHAR(500) NOT NULL,
    orden INTEGER CHECK (orden >= 1 AND orden <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_publicaciones_categoria ON publicaciones(categoria_id);
CREATE INDEX idx_publicaciones_usuario ON publicaciones(usuario_id);
CREATE INDEX idx_publicaciones_estado ON publicaciones(estado);
CREATE INDEX idx_fotos_publicacion ON fotos_publicacion(publicacion_id);

-- Row Level Security (RLS)
ALTER TABLE publicaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE fotos_publicacion ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (ejemplo básico)
CREATE POLICY "Publicaciones públicas son visibles para todos"
    ON publicaciones FOR SELECT
    USING (estado = true);

CREATE POLICY "Usuarios pueden crear sus propias publicaciones"
    ON publicaciones FOR INSERT
    WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden actualizar sus propias publicaciones"
    ON publicaciones FOR UPDATE
    USING (auth.uid() = usuario_id);
```

---

## ✨ Funcionalidades

### 1. Autenticación de Usuarios

#### Registro
- Formulario de registro con validación
- Restricción a correos institucionales: `*@uca.edu.sv`
- Validación de contraseñas seguras
- Verificación por correo electrónico

**Archivo:** `src/Pages/Registrarse.jsx`

#### Inicio de Sesión
- Login con correo y contraseña
- OAuth con Google (Single Sign-On)
- Redirección automática según estado de sesión

**Archivo:** `src/Pages/Login.jsx`

#### Recuperación de Contraseña
- Envío de correo de recuperación
- Formulario de restablecimiento

**Archivo:** `src/Pages/RecuperarContrasena.jsx`

### 2. Gestión de Publicaciones

#### Crear Publicación
- Formulario con validación de campos obligatorios
- Carga de exactamente 5 imágenes
- Selección de categoría desde base de datos
- Guardado automático en Supabase

**Validaciones:**
- Título: Obligatorio
- Precio: Numérico, obligatorio
- Categoría: Obligatoria
- Imágenes: Exactamente 5 archivos

**Archivo:** `src/Componets/Pagina_publicaciones/Publicacion.jsx`

#### Ver Publicaciones
- Lista de publicaciones ordenadas por fecha
- Filtrado por categoría
- Búsqueda por título
- Carga dinámica desde base de datos

**Hook personalizado:** `src/hook/usoPublicaciones.js`

### 3. Navegación y Búsqueda

#### Header
- Logo y nombre de la marca
- Buscador de productos con autocompletado
- Menú dropdown con navegación
- Información del usuario autenticado
- Botón de cierre de sesión

**Archivo:** `src/Componets/Pagina_principal/Header.jsx`

#### Categorías
- Visualización de 3 categorías principales
- Descripción de cada categoría
- Acceso rápido a productos filtrados

**Archivo:** `src/Componets/Pagina_principal/Categorias.jsx`

---

## 🧩 Componentes Principales

### Header.jsx
**Ubicación:** `src/Componets/Pagina_principal/Header.jsx`

**Responsabilidades:**
- Navegación principal del sitio
- Barra de búsqueda
- Menú de usuario
- Botón de cierre de sesión

**Props:** Ninguna (usa contexto de autenticación)

**Estado:**
- `user` - Usuario autenticado desde AuthContext

### Hero.jsx
**Ubicación:** `src/Componets/Pagina_principal/Hero.jsx`

**Responsabilidades:**
- Banner principal de la página
- Call-to-action para ver publicaciones

**Contenido:**
- Frase promocional
- Botón de navegación

### Categorias.jsx
**Ubicación:** `src/Componets/Pagina_principal/Categorias.jsx`

**Responsabilidades:**
- Mostrar categorías disponibles
- Navegación a productos filtrados

**Categorías:**
1. Electrónica
2. Literatura
3. Accesorios

### Footer.jsx
**Ubicación:** `src/Componets/Pagina_principal/Footer.jsx`

**Responsabilidades:**
- Información institucional
- Enlaces a redes sociales
- Botón de retorno al inicio

**Secciones:**
- Sobre Buho Market
- Ayuda
- Contacto

### Publicacion.jsx
**Ubicación:** `src/Componets/Pagina_publicaciones/Publicacion.jsx`

**Responsabilidades:**
- Formulario de creación de publicaciones
- Validación de datos
- Carga de imágenes a Supabase Storage
- Guardado en base de datos

**Estado local:**
- `titulo` - Título del producto
- `categoriaId` - ID de categoría seleccionada
- `categorias` - Lista de categorías disponibles
- `descripcion` - Descripción del producto
- `precio` - Precio del producto
- `imagenes` - Array de archivos de imágenes

**Funciones:**
- `handleSubmit()` - Procesa el formulario
- `fetchCategorias()` - Carga categorías desde Supabase

---

## 🔐 Flujo de Autenticación

### Diagrama de Flujo

```
Usuario accede a la app
        ↓
App.jsx carga AuthContextProvider
        ↓
AuthContext verifica sesión
        ↓
    ¿Hay sesión activa?
    ├─ NO → Redirige a /login
    │        ↓
    │    Usuario ingresa credenciales
    │        ├─ Opción 1: Email + Contraseña
    │        └─ Opción 2: OAuth con Google
    │        ↓
    │    Supabase valida credenciales
    │        ↓
    │    ¿Dominio @uca.edu.sv?
    │        ├─ NO → Error de validación
    │        └─ SÍ → Crea sesión
    │                ↓
    └─ SÍ → Carga datos del usuario
             ↓
        Redirige a / (Home)
             ↓
        Acceso a todas las funcionalidades
```

### AuthContext.jsx

**Ubicación:** `src/context/AuthContext.jsx`

**Funciones exportadas:**

```javascript
// Hook para acceder al contexto
const { user, signInWithGoogle, signout } = UserAuth();

// Función de login con Google
await signInWithGoogle();

// Función de cierre de sesión
await signout();
```

**Estado global:**
- `user` - Objeto con información del usuario autenticado
  - `id` - UUID del usuario
  - `email` - Correo electrónico
  - `user_metadata` - Información adicional del perfil

**Listeners:**
- `onAuthStateChange()` - Escucha cambios en el estado de autenticación

### Protección de Rutas

Las rutas se protegen verificando la existencia de `user` en el contexto:

```javascript
const ProtectedRoute = ({ children }) => {
    const { user } = UserAuth();
    if (!user) return <Navigate to="/login" />;
    return children;
};
```

---

## 🌍 Variables de Entorno

El proyecto utiliza variables de entorno para configurar la conexión con Supabase.

### Archivo `.env`

```env
# URL del proyecto de Supabase
VITE_APP_SUPABASE_URL=https://ndnlciifdevlchnamhfs.supabase.co

# Clave pública (anon key) de Supabase
VITE_APP_SUPABASE_ANON_KEY=tu_clave_aqui
```

### Obtener Credenciales

1. Accede al [Dashboard de Supabase](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `VITE_APP_SUPABASE_URL`
   - **anon public** → `VITE_APP_SUPABASE_ANON_KEY`

### Seguridad

⚠️ **IMPORTANTE:**
- **NUNCA** commits el archivo `.env` al repositorio
- Verifica que `.env` esté en `.gitignore`
- Usa variables de entorno en producción (Vercel, Netlify, etc.)
- Rota las claves si se exponen accidentalmente

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```
Inicia el servidor de desarrollo con Hot Module Replacement (HMR) en `http://localhost:5173`

### Build de Producción

```bash
npm run build
```
Genera una versión optimizada del proyecto en la carpeta `dist/`

### Preview de Build

```bash
npm run preview
```
Previsualiza la versión de producción localmente antes de desplegar

### Linting

```bash
npm run lint
```
Ejecuta ESLint para detectar errores de código y estilo

---

## 🚀 Despliegue

### Preparación para Producción

1. **Verificar variables de entorno**
   - Asegúrate de que las variables estén configuradas en tu plataforma de hosting

2. **Ejecutar build**
   ```bash
   npm run build
   ```

3. **Probar el build localmente**
   ```bash
   npm run preview
   ```

### Opciones de Hosting

#### Opción 1: Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Configurar variables de entorno en Vercel Dashboard
```

**Configuración:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

#### Opción 2: Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Desplegar
netlify deploy --prod
```

**Archivo `netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

#### Opción 3: GitHub Pages

1. Modificar `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/nombre-del-repo/',
     // ...resto de la configuración
   })
   ```

2. Crear workflow de GitHub Actions

#### Configuración de Dominio Personalizado

1. Configurar DNS en tu proveedor
2. Agregar dominio en plataforma de hosting
3. Actualizar configuración de Supabase:
   - **Authentication** → **URL Configuration**
   - Agregar dominio a **Redirect URLs**

---

## 🔧 Mejoras Futuras

### Funcionalidades Pendientes

- [ ] **Página de Perfil de Usuario**
  - Vista de publicaciones propias
  - Editar información de perfil
  - Historial de transacciones

- [ ] **Sistema de Mensajería**
  - Chat entre comprador y vendedor
  - Notificaciones en tiempo real

- [ ] **Sistema de Favoritos**
  - Guardar publicaciones de interés
  - Lista de deseos

- [ ] **Valoraciones y Reseñas**
  - Sistema de calificación de vendedores
  - Comentarios en publicaciones

- [ ] **Filtros Avanzados**
  - Rango de precios
  - Ordenamiento (menor a mayor precio, fecha, etc.)
  - Búsqueda por múltiples categorías

- [ ] **Edición de Publicaciones**
  - Permitir editar publicaciones existentes
  - Marcar como vendido
  - Eliminar publicaciones

### Mejoras Técnicas

- [ ] **Optimización de Imágenes**
  - Compresión automática al subir
  - Generación de thumbnails
  - Lazy loading de imágenes

- [ ] **Testing**
  - Tests unitarios con Vitest
  - Tests de integración
  - Tests E2E con Playwright

- [ ] **Accesibilidad**
  - Mejorar etiquetas ARIA
  - Navegación por teclado
  - Soporte para lectores de pantalla

- [ ] **Internacionalización (i18n)**
  - Soporte para inglés/español
  - Detección automática de idioma

- [ ] **PWA (Progressive Web App)**
  - Instalación en dispositivos móviles
  - Funcionalidad offline
  - Notificaciones push

- [ ] **Analytics**
  - Google Analytics o Plausible
  - Métricas de uso
  - Tracking de conversiones

### Seguridad

- [ ] **Rate Limiting**
  - Limitar creación de publicaciones
  - Protección contra spam

- [ ] **Validación Backend**
  - Row Level Security (RLS) completo
  - Validaciones con PostgreSQL functions

- [ ] **Moderación de Contenido**
  - Revisión de imágenes
  - Filtro de palabras inapropiadas

---

## 📞 Soporte y Contacto

### Recursos Útiles

- **Documentación de React:** https://react.dev
- **Documentación de Vite:** https://vitejs.dev
- **Documentación de Supabase:** https://supabase.com/docs
- **Dashboard de Supabase:** https://supabase.com/dashboard/project/ndnlciifdevlchnamhfs

### Comunidad UCA

Este proyecto está desarrollado para la comunidad estudiantil de la Universidad Centroamericana José Simeón Cañas (UCA).

---

## 📄 Licencia

Este proyecto es de uso educativo para la comunidad UCA.

---

## 🦉 Acerca de Buho Market

Buho Market nace como una solución digital para facilitar el intercambio comercial entre estudiantes de la UCA, promoviendo el reciclaje, la economía circular y el ahorro en materiales educativos y productos de uso cotidiano.

**Versión:** 0.0.0 (En desarrollo)

**Última actualización:** Noviembre 2025

---

*Documentación generada el 06/11/2025*
