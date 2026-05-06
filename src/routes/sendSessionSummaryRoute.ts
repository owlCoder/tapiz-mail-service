import { Hono } from "hono";
import { getTransporter, getSmtpFrom } from "../core/mailer";
import { sessionSummaryTemplate } from "../core/emailTemplates";
import { EMAIL_REGEX } from "../core/constants";
import { SendSessionSummaryBody } from "../models/SendSessionSummaryBody";
import { smtpErrorMessage } from "../utils/smtpErrorUtil";

export const sendSessionSummaryRouter = new Hono();

sendSessionSummaryRouter.post("/", async (c) => {
  let body: SendSessionSummaryBody;

  try {
    body = await c.req.json<SendSessionSummaryBody>();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  const { to, subjectName, sessionNumber, sessionType, presentCount, absentCount, totalEnrolled, appName } = body;

  if (!to || !subjectName || sessionNumber == null || !sessionType || presentCount == null || absentCount == null || totalEnrolled == null) {
    return c.json({ error: "Missing required fields", details: "to, subjectName, sessionNumber, sessionType, presentCount, absentCount, totalEnrolled are required" }, 400);
  }

  if (!EMAIL_REGEX.test(to)) {
    return c.json({ error: "Invalid email format" }, 400);
  }

  const name = appName ?? "Tapiz Labs";

  try {
    const info = await getTransporter().sendMail({
      from:    `"${name}" <${getSmtpFrom()}>`,
      to,
      subject: `${name} — Izveštaj termina ${sessionNumber}: ${subjectName}`,
      html:    sessionSummaryTemplate(subjectName, sessionNumber, sessionType, presentCount, absentCount, totalEnrolled, name),
      text: [
        `Izveštaj termina ${sessionNumber} — ${subjectName} (${sessionType})`,
        "",
        `Prisutnih:  ${presentCount}`,
        `Odsutnih:   ${absentCount}`,
        `Upisanih:   ${totalEnrolled}`,
        `Stopa prisustva: ${totalEnrolled > 0 ? Math.round((presentCount / totalEnrolled) * 100) : 0}%`,
      ].join("\n"),
    });

    console.log(`[Mail Service] Session summary sent to ${to}, messageId: ${info.messageId}`);

    return c.json({ success: true, messageId: info.messageId, message: "Session summary sent successfully" });
  } catch (err) {
    console.error("[Mail Service] SMTP error:", err);
    return c.json({ error: smtpErrorMessage(err), details: (err instanceof Error ? err.message : String(err)) }, 500);
  }
});
