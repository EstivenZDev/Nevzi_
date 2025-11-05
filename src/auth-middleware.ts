import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// ⚠️ Importa solo la configuración base, sin base de datos ni providers de Node.js
export const { auth } = NextAuth(authConfig);
