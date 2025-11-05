// para que VSCode ayude con autocompletado y valide que tu objeto de configuración tenga la estructura correcta (páginas, callbacks, providers, etc.).
import type { NextAuthConfig } from "next-auth";


//exportando el objeto authConfig, que contiene toda la configuración base de NextAuth.
export const authConfig = {
  //Esta sección le dice a NextAuth qué rutas usar para páginas especiales.
  pages: {
    signIn: "/login", // ruta personalizada para el inicio de sesión. (Por defecto /api/auth/signin)
    error: "/login", //a dónde redirigir si ocurre un error
  },

  //Esta es una función de control de acceso
  callbacks: {
    //auth: contiene información del usuario si está logueado (auth.user). ----- nextUrl: es la URL a la que el usuario intenta acceder.
    authorized({ auth, request: { nextUrl } }) {
      //                 !! convierte el valor en booleano
      const isLoggedIn = !!auth?.user;

      //Esto devuelve true si la ruta empieza con /dashboard
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard && !isLoggedIn) return false; // Si no está logueado, bloquea
      return true; // Permite el acceso
    },

    
  },

  //Aquí defines los métodos de autenticación (por ejemplo, con credenciales, Google, GitHub, etc.).
  providers: [], 

  //Verifica que este objeto cumple con el tipo NextAuthConfig
} satisfies NextAuthConfig;
