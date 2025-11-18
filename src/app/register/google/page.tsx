import { auth } from "@/auth"; // tu helper de next-auth
import UsersModel from "@/database/models/user";
import { dbConnection } from "@/lib/dbConnection";
import { redirect } from "next/navigation";

export default async function RegisterWithGooglePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  await dbConnection();

  const existingUser = await UsersModel.findOne({ email: session.user.email });

  if (existingUser) {
    // Ya existe => lo rediriges a login o dashboard
    redirect("/login");
  }

  // Si no existe, lo registras aquí
  await UsersModel.create({
    name: session.user.name,
    email: session.user.email,
    provider: "google",
  });

  redirect("/dashboard_user"); // o donde quieras llevarlo
}
