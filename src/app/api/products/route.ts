import ProductModel from "@/database/models/product";
import { dbConnection } from "@/lib/dbConnection";
import cloudinary from "@/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { formatCOP } from "@/utils/formatPrice";


export async function GET(request: NextRequest) {
    try {
        await dbConnection();

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1");
        const perPage = parseInt(searchParams.get("perPage") || "2");
        const search = searchParams.get("search") || "";

        const validPage = Math.max(1, Number.isNaN(page) ? 1 : page);
        const validPerPage = Math.max(1, Math.min(100, Number.isNaN(perPage) ? 10 : perPage));

        const filter = search
            ? { name: { $regex: search, $options: "i" } }
            : {};

        const total = await ProductModel.countDocuments(filter);
        const skip = (validPage - 1) * validPerPage;


        const products = await ProductModel.find(filter)
            .skip(skip)
            .limit(validPerPage)
            .sort({ createdAt: -1, _id: -1 });

        const totalPages = Math.ceil(total / validPerPage);

        console.log(`✅ Devolviendo ${products.length} productos. Total páginas: ${totalPages}`);

        return NextResponse.json(
            {
                success: true,
                data: products,
                pagination: {
                    page: validPage,
                    perPage: validPerPage,
                    total,
                    totalPages,
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Error al obtener productos:", error);
        if (error instanceof Error) {
            return NextResponse.json({ success: false, message: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: false, message: "Error desconocido" }, { status: 500 });
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