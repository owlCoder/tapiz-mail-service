import { Hono } from "hono";
import { getTransporter, SMTP_FROM } from "../core/mailer";
import { twoFactorTemplate } from "../core/emailTemplates";

interface Send2faBody {
  to:       string;
  code:     string;
  appName?: string;
}

const EMAIL_REGEX = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
const CODE_REGEX  = /^\d{6}$/;

function smtpErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;
    if (code === "EAUTH")      return "SMTP authentication failed. Check your credentials.";
    if (code === "ECONNECTION") return "Cannot connect to SMTP server.";
    if (code === "ESOCKET")    return "SMTP connection timeout.";
  }
  return "Failed to send email";
}

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

  const name = appName ?? "Tapiz";

  try {
    const info = await getTransporter().sendMail({
      from:    `"${name}" <${SMTP_FROM}>`,
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
        details: process.env.NODE_ENV === "development"
          ? (err instanceof Error ? err.message : String(err))
          : undefined,
      },
      500,
    );
  }
});
