import nodemailer from "nodemailer";
import { env } from "node:process";

export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: process.env.SMTP_SECURE === "true",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

export async function sendEmail({
	to,
	subject,
	text,
}: {
	to: string;
	subject: string;
	text: string;
}) {
	await transporter.sendMail({
		from: env.EMAIL_FROM,
		to,
		subject,
		html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Sign in to your account</h2>
      <p>You requested a magic link to sign in to your account.</p>
      <p style="margin: 20px 0;">
        <a href="${text}" 
           style="background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Sign in
        </a>
      </p>
      <p style="color: #666; font-size: 14px;">
        If you did not request this magic link, please ignore this email. The link will expire in 15 minutes.
      </p>
      <hr style="border: 1px solid #eee; margin: 20px 0;">
      <p style="color: #999; font-size: 12px;">
        This is an automated message, please do not reply to this email.
      </p>
    </div>
  `,
	});
}
