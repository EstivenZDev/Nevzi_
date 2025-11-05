"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X, CircleUser, ShoppingCart } from "lucide-react";
import style from "./navbar.module.css";

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  // 🔥 Cierra el menú si se agranda la pantalla a más de 900px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative w-full">
      <div className="px-40 flex justify-around items-center h-[70px]">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <p className="text-4xl font-bold text-black">NEVZI</p>
        </div>

        {/* Botón hamburguesa */}
        <button
          onClick={toggleMenu}
          className="[@media(min-width:900px)]:hidden focus:outline-none transition-all duration-300 ease-in-out"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Links escritorio */}
        <div
          className={`${style["font-color-two"]} flex items-center gap-10 transition-all duration-300 ease-in-out max-[900px]:hidden`}
        >
          <Link href="">Inicio</Link>
          <Link href="">Tienda</Link>
          <Link href="">Nosotros</Link>
          <Link href="">Contacto</Link>
        </div>

        {/* Iconos */}
        <div className="car-profile [@media(max-width:900px)]:hidden flex items-center gap-5">
          <Link href="/login"><CircleUser className="text-black" /></Link>
          <ShoppingCart className="text-black" />
        </div>
      </div>

      {/* Menú hamburguesa */}
      {open && (
        <div className="absolute top-[70px] left-0 w-full bg-black border-t border-gray-700 transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-4 px-6 py-4 text-white">
            <Link href="" onClick={() => setOpen(false)}>
              Inicio
            </Link>
            <Link href="" onClick={() => setOpen(false)}>
              Tienda
            </Link>
            <Link href="" onClick={() => setOpen(false)}>
              Nosotros
            </Link>
            <Link href="" onClick={() => setOpen(false)}>
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
