import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import UsersModel from "./database/models/user";
import { dbConnection } from "./lib/dbConnection";
import Google from "next-auth/providers/google";
import { Providers } from './app/providers';

export const authConfig: NextAuthConfig = {
	session: {
		strategy: "jwt",
	},
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				await dbConnection()

				if (!credentials?.email || !credentials?.password) {
					throw new Error("Faltan credenciales");
				}

				const user = await UsersModel.findOne({ email: credentials.email }).lean(); // 👈 lean() devuelve un objeto plano

				if (!user) throw new Error("Usuario no encontrado");

				if (user.password !== String(credentials.password)) {
					throw new Error("Contraseña incorrecta");
				}

				// 👇 Devolvemos solo los campos necesarios y serializables
				return {
					id: user._id.toString(),
					name: user.name,
					email: user.email,
					role: user.role
				};
			},
		}),

		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			await dbConnection();

			// 👉 Si viene desde Google
			if (account?.provider === "google") {
				const existingUser = await UsersModel.findOne({ email: user.email });

				if (!existingUser) {
					// Crear el usuario automáticamente
					await UsersModel.create({
						name: user.name,
						email: user.email,
						provider: "google",
					});
				}
			}

			// ✅ Permitir login en cualquier caso
			return true;
		},
		async jwt({ token, user }) {
			// 👇 Esto corre solo en el primer login
			if (user) {
				token.role = user.role;
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.role = token.role ?? "";
			}
			return session;
		}
	},



	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};


