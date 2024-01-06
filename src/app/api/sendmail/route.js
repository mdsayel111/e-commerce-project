import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// creat a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export const SendEmail = async (message) => {
  const result = await transporter.sendMail(message);
};

export async function POST(req) {
  const data = await req.json();
  var message = {
    from: "mdsayel111@gmail.com",
    to: data.userEmail,
    subject: data.subject,
    html: `<p>${data.massage}</p>`,
  };

  const result = await SendEmail(message);

  return NextResponse.json({ message: "email sent successful" });
}
