import CategoryModel from "@/database/models/category";
import { dbConnection } from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import * as yup from "yup"

const categorySchema = yup.object().shape({
    name: yup.string()
    .trim()
    .required("El nombre es necesario")
    .matches(/^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+(?:\s[A-Za-zÁáÉéÍíÓóÚúÜüÑñ]+)*$/, "Formato no válido")
    .min(3)
})


export async function POST(req: Request) {
    const body = await req.json()
    const validateData = await categorySchema.validate(body)

    try {
        await dbConnection()    

        const newCategory = new CategoryModel(validateData)

        const saveCategory = await newCategory.save()

        return NextResponse.json(
            { message: "Categoria creada", data: saveCategory },
            { status: 200 }
        )


    } catch (error: unknown) {

        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        }
        return NextResponse.json({ error: "Error desconocido" });
    }

}

export async function GET() {

    try {
        await dbConnection()
        const data = await CategoryModel.find()

        return NextResponse.json(
            { message: "Categorias obtenidas", data },
            { status: 200 }
        )
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        }
        return NextResponse.json({ error: "Error desconocido" });
    }

}