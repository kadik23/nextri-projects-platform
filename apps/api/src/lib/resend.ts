import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_ACCESS_KEY);

export async function sendEmail(
  email: string,
  subject: string,
  bodyHtml: string
) {
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject,
    html: "",
  });

  if (error) {
    throw error;
  }
}
