import { Hono } from "hono";
import { getTransporter, getSmtpFrom } from "../core/mailer";
import { twoFactorTemplate } from "../core/emailTemplates";
import { EMAIL_REGEX, CODE_REGEX } from "../core/constants";
import { Send2faBody } from "../models/Send2faBody";
import { smtpErrorMessage } from "../utils/smtpErrorUtil";

export const send2faRouter = new Hono();

send2faRouter.post("/", async (c) => {
  let body: Send2faBody;

  try {
    body = await c.req.json<Send2faBody>();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { to, code, appName } = body;

  if (!to || !code) {
    return c.json(
      { error: "Missing required fields", details: "to and code are required" },
      400,
    );
  }

  if (!EMAIL_REGEX.test(to)) {
    return c.json({ error: "Invalid email format" }, 400);
  }

  if (!CODE_REGEX.test(code)) {
    return c.json({ error: "Code must be 6 digits" }, 400);
  }

  const name = appName ?? "Tapiz Labs";

  try {
    const info = await getTransporter().sendMail({
      from:    `"${name}" <${getSmtpFrom()}>`,
      to,
      subject: `${name} — 2FA kod: ${code}`,
      html:    twoFactorTemplate(code, name),
      text:    [
        `Vaš 2FA kod za ${name} je: ${code}`,
        "",
        "Ovaj kod važi narednih 15 minuta.",
        "Ako niste pokušali da se prijavite, ignorišite ovaj email.",
      ].join("\n"),
    });

    console.log(`[Mail Service] Sent to ${to}, messageId: ${info.messageId}`);

    return c.json({
      success:   true,
      messageId: info.messageId,
      message:   "2FA code sent successfully",
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