// src/routes/sendResetPasswordRoute.ts
import { Hono } from "hono";
import { getTransporter, SMTP_FROM } from "../core/mailer";
import { passwordResetTemplate } from "../core/emailTemplates";
import { smtpErrorMessage } from "../utils/smtpErrorUtil";
import { EMAIL_REGEX, URL_REGEX } from "../core/constants";
import { SendResetPasswordBody } from "../models/SendResetPasswordBody";

export const sendResetPasswordRouter = new Hono();

sendResetPasswordRouter.post("/", async (c) => {
  let body: SendResetPasswordBody;

  try {
    body = await c.req.json<SendResetPasswordBody>();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { to, link, appName } = body;

  if (!to || !link) {
    return c.json(
      { error: "Missing required fields", details: "to and link are required" },
      400,
    );
  }

  if (!EMAIL_REGEX.test(to)) {
    return c.json({ error: "Invalid email format" }, 400);
  }

  if (!URL_REGEX.test(link)) {
    return c.json({ error: "Invalid reset link URL" }, 400);
  }

  const name = appName ?? "Tapiz Labs";

  try {
    const info = await getTransporter().sendMail({
      from:    `"${name}" <${SMTP_FROM}>`,
      to,
      subject: `${name} — Resetovanje lozinke`,
      html:    passwordResetTemplate(link, name),
      text:    [
        `Poštovani korisniče,`,
        ``,
        `Zahtevano je resetovanje lozinke za nalog na ${name}.`,
        `Kliknite na sledeći link kako biste postavili novu lozinku:`,
        ``,
        `${link}`,
        ``,
        `Ako niste Vi zahtevali resetovanje lozinke, ignorišite ovaj email.`,
        `Link važi narednih 30 minuta.`,
      ].join("\n"),
    });

    console.log(`[Mail Service] Reset password email sent to ${to}, messageId: ${info.messageId}`);

    return c.json({
      success:   true,
      messageId: info.messageId,
      message:   "Reset password email sent successfully",
    });
  } catch (err) {
    console.error("[Mail Service] SMTP error:", err);

    return c.json(
      {
        error:   smtpErrorMessage(err),
        details: (err instanceof Error ? err.message : String(err))
      },
      500,
    );
  }
});