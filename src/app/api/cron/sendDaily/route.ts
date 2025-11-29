import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

// Ruta protegida para enviar un correo diario
// Protegida mediante ?secret=YOUR_SECRET (env: CRON_SECRET)

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const secret = url.searchParams.get("secret");

    if (!process.env.CRON_SECRET) {
      console.error("CRON_SECRET no está configurado en las variables de entorno");
      return NextResponse.json({ success: false, message: "CRON_SECRET not configured" }, { status: 500 });
    }

    if (!secret || secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userMail = process.env.EMAIL_USER;
    const passMail = process.env.EMAIL_PASS;

    if (!userMail || !passMail) {
      console.error("Faltan EMAIL_USER o EMAIL_PASS en variables de entorno");
      return NextResponse.json({ success: false, message: "Email credentials not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: userMail,
        pass: passMail,
      },
    });

    // destino fijo solicitado
    const toAddress = "exmyn7375@gmail.com";

    await transporter.sendMail({
      from: `"Nevzi" <${userMail}>`,
      to: toAddress,
      subject: "Correo diario de Nevzi",
      html: `<p>Hola — este es el correo diario enviado automáticamente por Nevzi.</p>`,
    });

    console.log(`Correo enviado a ${toAddress}`);
    return NextResponse.json({ success: true, message: `Correo enviado a ${toAddress}` }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error enviando correo cron:", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Error desconocido" }, { status: 500 });
  }
}
