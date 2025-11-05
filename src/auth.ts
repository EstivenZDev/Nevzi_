import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import dbConnection from "./lib/dbConnection";
import UsersModel from "./database/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnection()

                const user = await UsersModel.findOne({ email: credentials?.email });
                if (!user) throw new Error("Usuario no encontrado");

                if (credentials.password !== user.password) {
                    throw new Error("Contraseña incorrecta");
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
});
