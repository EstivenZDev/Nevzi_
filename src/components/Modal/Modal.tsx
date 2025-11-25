"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;               // Controla si se ve o no el modal
  onClose: () => void;           // Función para cerrarlo
  children: React.ReactNode;     // Contenido interno (formulario, texto, etc)
  title?: string;                // Título opcional
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl  shadow-xl  max-h-[95vh] relative  "  onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
      </div>
    </div>
  );
};


