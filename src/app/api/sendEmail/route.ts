import nodemailer from "nodemailer";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();

    const userMail = process.env.EMAIL_USER;
    const passMail = process.env.EMAIL_PASS;

    if (!userMail || !passMail) {
      throw new Error("Faltan EMAIL_USER o EMAIL_PASS en las variables de entorno");
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

    const test = await transporter.verify();
    console.log("✅ Servidor SMTP listo:", test);

    await transporter.sendMail({
      from: `"Nevzi" <${userMail}>`,
      to: `${session?.user?.email}` ,
      subject: "Registro en Nevzi",
      html: `<div style="margin:0; padding:0; background:#ffffff; font-family:Arial, sans-serif; color:#000000;">

  <div style="width:100%; display:flex; justify-content:center; padding:40px 0;">
    <div style="
      width:90%;
      max-width:600px;
      border:1px solid #e5e5e5;
      border-radius:20px;
      padding:40px;
      background:#ffffff;
    ">

      <!-- Título -->
      <h1 style="
        font-size:28px;
        font-weight:800;
        margin:0 0 20px 0;
        text-transform:uppercase;
        color:#000;
      ">
        Bienvenid@ a Nevzi
      </h1>

      <!-- Saludo -->
      <p style="font-size:16px; line-height:1.6; opacity:0.85; margin:0 0 20px 0;">
        ¡Hola <strong>${session?.user.name}</strong>!
      </p>

      <!-- Texto -->
      <p style="font-size:16px; line-height:1.6; opacity:0.85; margin:20px 0;">
        Queremos informarte que tu registro en <strong>Nevzi</strong> ha sido exitoso.  
      </p>

      <!-- Botón -->
      <a href="#"
        style="
          display:inline-block;
          margin-top:30px;
          padding:12px 24px;
          background:#000000;
          color:#ffffff;
          text-decoration:none;
          border-radius:30px;
          font-weight:bold;
        ">
        Ir al panel
      </a>

      <!-- Separador -->
      <div style="width:100%; height:1px; background:rgba(0,0,0,0.1); margin:40px 0;"></div>

      <!-- Footer -->
      <p style="text-align:center; font-size:13px; line-height:1.5; opacity:0.6; margin:0;">
        Nevzi © 2025 — Moda minimalista y moderna<br />
        Este es un mensaje automático, por favor no respondas.
      </p>

    </div>
  </div>

</div>`,
    });

    return Response.json({ res: "Mensaje enviado" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error en sendEmail:", error);
      return Response.json(
        { error: "Error enviando correo", details: error.message },
        { status: 500 }
      );
    }
    console.error("❌ Error desconocido:", error);
    return Response.json(
      { error: "Error enviando correo", details: "Error desconocido" },
      { status: 500 }
    );

  }
}
