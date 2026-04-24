import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let _transporter: Transporter | null = null;

export function getTransporter(): Transporter {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST ?? "smtp.uns.ac.rs",
      port:   parseInt(process.env.SMTP_PORT ?? "587", 10),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return _transporter;
}

export const SMTP_FROM =
  process.env.SMTP_FROM ?? process.env.SMTP_USER ?? "noreply@tapiz.rs";
