// app/dashboard/layout.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const { data: session } = useSession();

  const menu = [
    { name: "Productos", href: "/dashboard/products" },
    { name: "Usuarios", href: "/dashboard/users" },
    { name: "Estadísticas", href: "/dashboard/stats" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white text-black p-5 flex flex-col gap-4 shadow-xl">
        <h2 className="text-4xl font-bold text-black">{session?.user.name}</h2>

        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded-md transition ${
              pathname === item.href ? "bg-white text-black font-semibold" : "hover:bg-black hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
