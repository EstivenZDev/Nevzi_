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
      to: `${session?.user?.email}`,
      subject: "Notificación de inicio de sesión",
      text: `¡Hola ${session?.user?.name}! Iniciaste sesión en tu cuenta de Nevzi.`,
    });

    return Response.json({ res: "Mensaje enviado" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en sendEmail:", error);
    return Response.json(
      { error: "Error enviando correo", details: error.message },
      { status: 500 }
    );
  }
}
