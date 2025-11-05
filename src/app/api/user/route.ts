import UsersModel from "@/database/models/user";
import dbConnection from "@/lib/dbConnection";
import { UserProps } from "@/services/user/user.types";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    await dbConnection();

    const data = await UsersModel.find();

    return NextResponse.json({
      ok: true,
      data: data as UserProps[],
    });
    
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    return NextResponse.json(
      { ok: false, message: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}

export 



