"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { formatCOP } from "@/utils/formatPrice";

interface ProductProps {
  image: string;
  title: string;
  price: number;
  status: boolean;
  amount: number;
  category: string;
  gender: string;
}

const Card = ({ image, title, price, status, amount, category, gender }: ProductProps) => {
  const { data: session } = useSession();

  
    const realPrice = formatCOP(price)
  return (
    <div className="w-[230px] bg-white rounded-xl shadow-lg p-3 hover:shadow-2xl transition-all duration-300 flex flex-col">
      
      {/* IMAGEN */}
      <div className="w-full h-[160px] overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* INFO */}
      <div className="mt-3 flex flex-col gap-2 text-sm">
        <h1 className="font-semibold text-lg line-clamp-2">{title}</h1>

        <div className="flex flex-col gap-1">
          <p><span className="font-bold">Cantidad:</span> {amount}</p>
          <p><span className="font-bold">Categoría:</span> {category}</p>
          <p><span className="font-bold">Género:</span> {gender}</p>
        </div>
      </div>

      {/* PRECIO / ESTADO */}
      <div className="flex items-center justify-between mt-4 flex-wrap">
        <h1 className="font-bold text-lg">{realPrice} $</h1>
        <p
          className={`px-3 py-1 rounded-full text-xs font-semibold 
            ${status ? "bg-black text-white" : "bg-gray-300 text-black"}`}
        >
          {status ? "Activo" : "Inactivo"}
        </p>
      </div>

      {/* BOTONES (solo si es admin) */}
      {session?.user?.role === "admin" && (
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-white border border-black text-black hover:bg-black hover:text-white  py-1 rounded-lg text-sm font-light transition">
            Editar
          </button>
          <button className="flex-1 bg-black border hover:bg-white hover:text-black text-white py-1 rounded-lg text-sm font-light transition">
            Borrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
