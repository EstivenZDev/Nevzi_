"use client";
import { getCategories } from "@/services/category/category";
import { newProduct } from "@/services/product/product";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CategoryProps {
    _id: string
    name: string
}

export default function CreateProductForm() {
    const [message, setMessage] = useState("");
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            const sendNewProduct = await newProduct(formData)
        } catch (error) {
            console.error("Error al enviar producto:", error);
        } finally{
            setLoading(false)
        }

    };

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories()
            setCategories(categories)
            console.log(categories)
        }
        fetchCategories()

    }, [])



    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[80vh] p-10">

            <div>
                <h2 className="text-3xl font-bold text-center mb-2">Crear producto</h2>
                <p className="text-center text-gray-500 mb-6">Agrega nueva ropa a tu tienda</p>
            </div>
            <div className="flex gap-5 justify-center items-center flex-col ">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-10 ">
                        <div className="flex flex-col gap-5">
                            <input
                                name="name"
                                placeholder="Nombre del producto"
                                className="border p-3 rounded-full"
                                required
                            />

                            <input
                                name="price"
                                type="number"
                                placeholder="Precio"
                                className="border p-3 rounded-full"
                                required
                            />

                            <select
                                name="category"
                                className="border p-3 rounded-full"
                                required
                            >
                                <option value="" hidden>Seleccionar categoria</option>
                                {categories.map((category, key) => (
                                    <option key={key} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>


                        </div>

                        <div className="flex flex-col gap-5 ">

                            <input
                                name="amount"
                                type="number"
                                placeholder="Cantidad disponible"
                                className="border p-3 rounded-full"
                                required
                            />

                            <select
                                name="status"
                                className="border p-3 rounded-full"
                                required
                            >
                                <option value="true">Disponible</option>
                                <option value="false">No disponible</option>
                            </select>

                            <select
                                name="gender"
                                className="border p-3 rounded-full"
                                required
                            >
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <input
                            name="image"
                            type="file"
                            accept="image/*"
                            className="border p-3 rounded-full w-full"

                        />
                    </div>
                </div>

                <div className=" w-full flex justify-center">
                    <button
                        type="submit"
                        className="bg-black text-white p-3 rounded-full cursor-pointer w-[200px] text-center"
                    >
                        {loading ? <Loader2 className="animate-spin h-4 w-4"/>:"Crear producto"}
                    </button>
                </div>
            </div>





        </form>
    );
}
