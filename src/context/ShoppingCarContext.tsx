import { createContext, ReactNode, useState } from "react";
import { ProductType } from "@/types/ProductType";

// Tipo para el contexto
export type ShoppingCartContextType = {
    productsList: ProductType[];
    total: number;
    setProductsList: React.Dispatch<React.SetStateAction<ProductType[]>>;
    setTotal: React.Dispatch<React.SetStateAction<number>>;
};

// Tipo para las props del Provider
type ShoppingCartProviderProps = {
    children: ReactNode;
};

// Crear el contexto
export const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

// Provider component
export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [productsList, setProductsList] = useState<ProductType[]>([]);
    const [total, setTotal] = useState<number>(0);

    return (
        <ShoppingCartContext.Provider 
            value={{
                productsList,
                setProductsList,
                total,
                setTotal
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};