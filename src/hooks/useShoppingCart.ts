import { useContext } from "react";
import { ShoppingCartContext } from "@/context/ShoppingCarContext";

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
  }
  return context; // Aquí ya no hay undefined ✔
}