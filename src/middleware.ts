import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard"];

export async function middleware(req: NextRequest) {

  //Esta línea intenta leer el token JWT (el “pase de acceso”) del usuario desde las cookies que vienen en la petición req --- Pero para poder leer o descifrar ese token, necesitas una “clave secreta” 🔑 — ahí es donde entra NEXTAUTH_SECRET.
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  console.log("TOKEN EN MIDDLEWARE:", token);

  if (protectedRoutes.includes(pathname)) {
    if (!token) {

      //y se cambia solo el path (/dashboard → /login). es decir, de app/dashboard/ a => app/login
      //.-----------------------Crea la nueva URL
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

//"ejecute este codigo cuando el usuario ingrese a los matchers"
export const config = {
  matcher: ["/dashboard/:path*"],
};

