"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { createUser } from "@/services/user/user";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const data = await createUser({ name, email, password })
            const redirectToDashboard = await signIn("credentials", {
                email,
                password,
                redirect: false
            })

            if (redirectToDashboard?.ok) {
                window.location.href = "/dashboard_user";
            }

        } catch (err) {
            setError("Error de conexión con el servidor");
        }
    };

    const handleRegisterGoogle = async () =>{
        try{
            const registerWithGoogle = await signIn("google",{callbackUrl:"/dashboard_user"})
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Crea tu cuenta</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Encuentra la ropa que define tu estilo
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-full text-black px-4 py-2 outline-none "
                        required
                    />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-full text-black px-4 py-2 outline-none"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-full text-black px-4 py-2 outline-none"
                        required
                    />

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <button onClick={handleRegisterGoogle}

                        className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition flex justify-center gap-5"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        /> Registrate con Google
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-full font-medium hover:opacity-90 transition"
                    >
                        Registrarse
                    </button>
                </form>

                <div className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        ¿Ya tienes cuenta?{" "}
                        <Link href={"/login "} className="text-black font-medium hover:underline">Ingresa aqui</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
