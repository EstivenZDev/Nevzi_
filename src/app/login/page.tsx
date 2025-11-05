"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { sendEmail } from "@/services/sendEmail";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    await sendEmail()

    window.location.href = "/dashboard";

    console.log(result); // 👀 si algo falla, aquí lo verás en consola del navegador
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-sm w-full space-y-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Inicia sesión
        </h2>
        <p className="text-gray-500 text-sm">
          Encuentra la ropa que define tu estilo
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-black font-medium hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
