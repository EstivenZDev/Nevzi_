import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { createCategory } from '@/services/category/category'

export const FormCategorty = () => {
    const [nameCategory, setNameCategory] = useState("")
  const [loading, setLoading] = useState(false)

    const handelChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNameCategory(
            e.target.value.toLowerCase()
        )
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await createCategory(nameCategory)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }



    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[80vh] p-10">

            <div>
                <h2 className="text-3xl font-bold text-center mb-2">Crear categoria</h2>
            </div>
            <div className="flex gap-5 justify-center items-center flex-col ">

                <input
                    name="category"
                    placeholder="Categoria"
                    className="border p-3 rounded-full"
                    onChange={handelChange}
                    value={nameCategory}
                    required
                />


            </div>

            <div className=" w-full flex justify-center">
                <button
                    type="submit"
                    className="bg-black text-white p-3 rounded-full cursor-pointer w-[200px] text-center"
                >
                    {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Crear categoria"}
                </button>
            </div>
        </form >
    )
}
