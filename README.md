# 🔐 Login Credentials Provider

> A full-stack authentication practice project built with Next.js, Better Auth, and MySQL — implementing email/password authentication, protected routes, and session management from scratch.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-1.6.26-purple)](https://www.better-auth.com/)
[![MySQL](https://img.shields.io/badge/MySQL-2-4479A1?logo=mysql)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

### 📖 Descripción

Este proyecto es una práctica de **autenticación por credenciales (email + contraseña)** construida con el App Router de Next.js. Implementa registro de usuarios, inicio de sesión, manejo de sesiones vía cookies y protección de rutas mediante middleware, usando **MySQL** como base de datos persistente a través de **Better Auth**.

### 🛠️ Stack Tecnológico

- **Framework:** Next.js 16.3.0 (App Router, React Compiler habilitado)
- **UI Library:** React 19.2.8
- **Lenguaje:** TypeScript 5
- **Autenticación:** Better Auth 1.6.26 (`emailAndPassword` provider)
- **Base de datos:** MySQL (vía `mysql2` con connection pooling)
- **Estilos:** Tailwind CSS 4 + `tw-animate-css`
- **Componentes UI:** shadcn/ui (estilo `base-nova`) sobre `@base-ui/react`
- **Iconos:** Lucide React
- **Utilidades de clases:** `class-variance-authority`, `clsx`, `tailwind-merge`
- **Gestor de paquetes:** pnpm 11.21.0

### 📂 Arquitectura del Proyecto

```
├── components/ui/ # Componentes shadcn/ui (Button, Card)
├── better-auth_migrations/ # Migraciones SQL generadas por Better Auth
└── middleware.ts # Protección de rutas /web/* vía cookie de sesión

app/
├── (privada)/web/ # Grupo de rutas privado, protegido por middleware
│ ├── layout.tsx # Layout mínimo para el área autenticada
│ └── page.tsx # Página demo (catálogo) con acción de logout
├── api/auth/[...all]/ # Catch-all handler de Better Auth (GET/POST)
├── registro/page.tsx # Formulario de registro de usuario
├── layout.tsx # Layout raíz (fuentes Geist)
└── page.tsx # Formulario de login

lib/
├── auth.ts # Configuración del servidor de Better Auth (pool MySQL)
├── auth-client.ts # Cliente de Better Auth (signIn, signUp, signOut, useSession)
└── utils.ts # Helper cn() para merge de clases Tailwind

```

**Decisiones de arquitectura destacadas:**
- **Route Groups `(privada)`**: separa visualmente las rutas protegidas sin afectar la URL, manteniendo el layout de la app pública independiente.
- **Middleware basado en cookies**: `getSessionCookie()` evita una consulta a base de datos en cada request; solo valida la presencia de la cookie de sesión antes de dejar pasar a `/web/*`.
- **Catch-all API route** (`[...all]/route.ts`): delega *todo* el manejo de auth (login, registro, logout, sesión) a Better Auth mediante `toNextJsHandler`, evitando reinventar endpoints.

### 🚀 Cómo Levantarlo Localmente

**Requisitos previos:** Node.js 20+, pnpm, una instancia de MySQL corriendo.

```bash
# 1. Clonar el repositorio
git clone git@github.com:luiicode/loginwithdatabase-practice.git
cd login-credentials-provider

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno (.env.local)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=login_credentials_provider
BETTER_AUTH_SECRET=genera_un_secreto_aleatorio
BETTER_AUTH_URL=http://localhost:3000

# 4. Aplicar las migraciones SQL a tu base de datos
# (ejecuta el archivo en better-auth_migrations/*.sql contra tu instancia MySQL)

# 5. Levantar el servidor de desarrollo
pnpm dev
```

La app quedará disponible en `http://localhost:3000`.

### ✨ Funcionalidades Clave

| Funcionalidad | Descripción |
|---|---|
| **Registro** | Formulario en `/registro` con validación de coincidencia de contraseña antes de llamar a `authClient.signUp.email()`. |
| **Login** | Formulario en `/` que autentica contra Better Auth y redirige a `/web` en caso de éxito. |
| **Rutas protegidas** | `middleware.ts` intercepta `/web/*` y redirige a `/` si no existe cookie de sesión válida. |
| **Logout** | `authClient.signOut()` desde la página privada, con redirección posterior al login. |
| **Persistencia** | Better Auth gestiona 4 tablas (`user`, `session`, `account`, `verification`) sobre MySQL, con índices en `userId` e `identifier` para optimizar lookups. |

### ⚠️ Nota de Seguridad

El archivo `.env*` está correctamente excluido en `.gitignore`. **Nunca subas tus credenciales de base de datos ni `BETTER_AUTH_SECRET` al repositorio.**

---

---

### 📖 Overview

This project is a **credentials-based authentication (email + password)** practice built on the Next.js App Router. It implements user registration, login, cookie-based session handling, and route protection via middleware, using **MySQL** as the persistent data store through **Better Auth**.

### 🛠️ Tech Stack

- **Framework:** Next.js 16.3.0 (App Router, React Compiler enabled)
- **UI Library:** React 19.2.8
- **Language:** TypeScript 5
- **Authentication:** Better Auth 1.6.26 (`emailAndPassword` provider)
- **Database:** MySQL (via `mysql2` with connection pooling)
- **Styling:** Tailwind CSS 4 + `tw-animate-css`
- **UI Components:** shadcn/ui (`base-nova` style) on top of `@base-ui/react`
- **Icons:** Lucide React
- **Class utilities:** `class-variance-authority`, `clsx`, `tailwind-merge`
- **Package manager:** pnpm 11.21.0

### 📂 Project Architecture

```
├── components/ui/ # shadcn/ui components (Button, Card)
├── better-auth_migrations/ # SQL migrations generated by Better Auth
└── middleware.ts # Protects /web/* routes via session cookie

app/
├── (privada)/web/ # Private route group, guarded by middleware
│ ├── layout.tsx # Minimal layout for the authenticated area
│ └── page.tsx # Demo page (catalog) with logout action
├── api/auth/[...all]/ # Better Auth catch-all handler (GET/POST)
├── registro/page.tsx # User registration form
├── layout.tsx # Root layout (Geist fonts)
└── page.tsx # Login form

lib/
├── auth.ts # Better Auth server config (MySQL pool)
├── auth-client.ts # Better Auth client (signIn, signUp, signOut, useSession)
└── utils.ts # cn() helper for Tailwind class merging

```

**Notable architecture decisions:**
- **Route Groups `(privada)`**: visually separates protected routes without affecting the URL, keeping the public app layout independent.
- **Cookie-based middleware**: `getSessionCookie()` avoids a database query on every request — it only checks for the presence of a valid session cookie before allowing access to `/web/*`.
- **Catch-all API route** (`[...all]/route.ts`): delegates *all* auth handling (login, sign-up, logout, session) to Better Auth via `toNextJsHandler`, avoiding hand-rolled endpoints.

### 🚀 Getting Started

**Prerequisites:** Node.js 20+, pnpm, a running MySQL instance.

```bash
# 1. Clone the repository
git clone git@github.com:luiicode/loginwithdatabase-practice.git
cd login-credentials-provider

# 2. Install dependencies
pnpm install

# 3. Set up environment variables (.env.local)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=login_credentials_provider
BETTER_AUTH_SECRET=generate_a_random_secret
BETTER_AUTH_URL=http://localhost:3000

# 4. Apply the SQL migrations to your database
# (run the file in better-auth_migrations/*.sql against your MySQL instance)

# 5. Start the development server
pnpm dev
```

The app will be available at `http://localhost:3000`.

### ✨ Key Features

| Feature | Description |
|---|---|
| **Sign-up** | Form at `/registro` validating password confirmation before calling `authClient.signUp.email()`. |
| **Login** | Form at `/` authenticating against Better Auth, redirecting to `/web` on success. |
| **Protected routes** | `middleware.ts` intercepts `/web/*` and redirects to `/` if no valid session cookie exists. |
| **Logout** | `authClient.signOut()` triggered from the private page, followed by a redirect to login. |
| **Persistence** | Better Auth manages 4 tables (`user`, `session`, `account`, `verification`) on MySQL, with indexes on `userId` and `identifier` to optimize lookups. |

### ⚠️ Security Note

The `.env*` file is properly excluded via `.gitignore`. **Never commit your database credentials or `BETTER_AUTH_SECRET` to the repository.**

---

## 📄 License

This is a personal learning/practice project. No license specified.
