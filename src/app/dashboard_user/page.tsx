"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // ⏩ Redirigir solo cuando ya se sepa que está desautenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  if (status === "unauthenticated") {
    return null; // Evita renderizar contenido mientras redirige
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">
        Bienvenido, {session?.user?.name || "usuario"} 👋
      </h1>
    </div>
  );
}
