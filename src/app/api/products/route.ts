import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const file = formData.get("image") as File;

    if (!title || !description || !category || !file) {
      return NextResponse.json({ error: "Faltan campos o imagen" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;


    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "posts",
      use_filename: true,
      resource_type: "image",
    });

    if (!result.secure_url) {
      return NextResponse.json({ error: "No se pudo subir la imagen" }, { status: 500 });
    }


    return NextResponse.json({ message: "Nuevo evento registrado" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
};
