import ProductModel from "@/database/models/product";
import { dbConnection } from "@/lib/dbConnection";
import cloudinary from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { formatCOP } from "@/utils/formatPrice";


export async function GET() {
    try {
        await dbConnection()
        const data = await ProductModel.find();

        return NextResponse.json(
            { message: "Categorias obtenidas", data },
            { status: 200 }
        )
    } catch (error:unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message });
        }
        return NextResponse.json({ error: "Error desconocido" });
    }
}

export async function POST(req: NextRequest) {

    try {
        const formData = await req.formData()
        const body = Object.fromEntries(formData.entries())

        //extraer el file del formdata
        const file = body.image as File;
        const buffer = await file.arrayBuffer();
        const dataUri = `data:${file.type};base64,${Buffer.from(buffer).toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(dataUri, {
            folder: "nevzi",
            resource_type: "image",
        });


        if (uploadResult.secure_url) {


            await dbConnection();
            const newProduct = new ProductModel({
                name: body.name,
                price: Number(body.price),
                amount: Number(body.amount),
                category: body.category,
                image: uploadResult.secure_url,
                gender: body.gender,
                status: body.status == "true"
            });

            const savedProdcut = await newProduct.save();

            return NextResponse.json(
                {
                    success: true,
                    message: "Producto creado correctamente",
                    data: savedProdcut,
                },
                { status: 201 }
            );
        }
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message }
            )
        } else {
            return NextResponse.json(
                { error: "Error desconocido" }
            )
        }
    }



}