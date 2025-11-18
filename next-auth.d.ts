import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: string; // <-- lo añadimos
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // <-- también aquí
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string; // 👈 Añadimos el role aquí
  }
}