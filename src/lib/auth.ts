import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins";
import { sendEmail } from "./auth-email";
import {
	user,
	session,
	account,
	verification,
} from "@/db/(schema)/auth-schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user,
			session,
			account,
			verification,
		},
	}),
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},

	plugins: [
		magicLink({
			async sendMagicLink({ email, url }) {
				// Send an email to the user with a magic link
				await sendEmail({
					to: email,
					subject: "Your magic link",
					text: url,
				});
			},
		}),
		nextCookies(),
	],
});
