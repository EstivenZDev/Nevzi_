
#  Clase: Middlewares para Autorización de Rutas en Next.js (App Router)

##  Objetivo de la clase
Aprender a usar **middlewares** en Next.js para **proteger rutas autenticadas** y controlar el acceso de usuarios según su sesión.

---

##  Introducción

En Next.js, los **middlewares** permiten **interceptar las solicitudes HTTP antes de que lleguen a las páginas o APIs**.  
Esto los hace ideales para manejar **autenticación y autorización**, ya que podemos revisar si el usuario tiene una sesión activa antes de permitirle acceder a ciertas rutas.

---

##  Paso 1: Crear un proyecto base con NextAuth

Primero, asegúrate de tener instalado `next-auth`:

```bash
npm install next-auth
```
npm install next-auth
Configura un archivo básico en:

📁 `app/api/auth/[...nextauth]/route.ts`

```ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simulación de usuario
        const user = { id: "1", name: "David", email: "david@riwi.com" };

        if (
          credentials?.email === "david@riwi.com" &&
          credentials?.password === "1234"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
```

---

##  Paso 2: Crear el Middleware

Crea el archivo:

 `middleware.ts` en la raíz del proyecto.

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/admin"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
```

 **Explicación:**
- `getToken()` revisa si existe un token de sesión.
- Si el usuario intenta entrar a `/dashboard` o `/admin` sin token, se redirige al login.
- Si está autenticado, el middleware permite continuar.

---

##  Paso 3: Configurar el `SessionProvider` global

Crea o edita el archivo:

 `app/layout.tsx`

```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

---

##  Paso 4: Crear página pública `/login`

 `app/login/page.tsx`

```tsx
"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") router.push("/dashboard");
  }, [status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) setError(result.error);
    else router.push("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
```

---

##  Paso 5: Crear página protegida `/dashboard`

 `app/dashboard/page.tsx`

```tsx
"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Welcome, {session.user?.name}</h2>
      <button
        onClick={async () => {
          await signOut({ redirect: false });
          router.push("/login");
        }}
      >
        Sign out
      </button>
    </div>
  );
}
```

---

##  Ejercicio Final

Crea una **ruta protegida adicional** llamada `/admin` con las siguientes condiciones:

- Solo usuarios con el email `david@riwi.com` pueden entrar.
- Si otro usuario intenta acceder, el middleware debe redirigirlo a `/login` con un mensaje:  
  `"Acceso restringido. Solo administradores."`

**Pistas:**
- Agrega un campo `role` en el objeto del usuario.
- Modifica el middleware para verificar `token?.email` o `token?.role`.
- Renderiza una vista sencilla que diga:  
  `"Bienvenido administrador {nombre}".`

---

##  Aclaración Importante: Uso de process.env vs localStorage

### 1️⃣ `process.env.NEXTAUTH_SECRET`

No guarda el token del usuario.  
Es una **clave privada del servidor**, usada por NextAuth para **firmar y verificar tokens JWT**.

```ts
const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
```

Esta línea **valida la cookie del usuario**, no la guarda.  
El secreto **jamás debe exponerse al cliente**.

---

### 2️⃣ ¿Dónde se guarda el token real?

El **token JWT del usuario se almacena automáticamente en una cookie HTTP-only** (inaccesible por JavaScript).  
NextAuth lo gestiona por ti.

✅ Ventajas:
- Mayor seguridad (no vulnerable a XSS).
- Se envía automáticamente con cada petición.
- Se elimina al cerrar sesión.

---

### 3️⃣ ¿Por qué no usar localStorage para el token?

`localStorage` es visible por cualquier script del navegador.  
Guardar ahí el JWT puede comprometer la seguridad del usuario.

 Solo usa `localStorage` para datos **no sensibles** (modo oscuro, preferencias, etc).

---

##  Flujo de autenticación simplificado

```
Cliente (useSession) 
   ↓
Middleware (getToken con process.env.NEXTAUTH_SECRET)
   ↓
NextAuth API (/api/auth/[...nextauth])
   ↓
Dashboard (rutas protegidas con cookies seguras)
```

---

##  Resumen

| Concepto | Descripción |
|-----------|--------------|
| **Middleware** | Intercepta peticiones y permite o bloquea acceso. |
| **getToken()** | Obtiene el token JWT de sesión generado por NextAuth. |
| **matcher** | Define en qué rutas aplica el middleware. |
| **NextResponse.redirect()** | Redirige a una ruta pública si el usuario no está autenticado. |
| **SessionProvider** | Mantiene el estado global de autenticación en el cliente. |
| **Cookies HTTP-only** | Guardan el token de sesión de forma segura. |

---


