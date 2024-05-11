import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions : NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user }: any) {
			const { email, name, image } = user;
			await connectMongoDB();
			const userExists = await User.findOne({ email });

			if (userExists) {
				console.log("user exist");
			} else {
				await User.create({ email, name, image });
			}

			return user;
		},
	},
};