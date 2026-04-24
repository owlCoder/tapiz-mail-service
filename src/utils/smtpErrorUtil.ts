export function smtpErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;
    if (code === "EAUTH")      return "SMTP authentication failed. Check your credentials.";
    if (code === "ECONNECTION") return "Cannot connect to SMTP server.";
    if (code === "ESOCKET")    return "SMTP connection timeout.";
  }
  return "Failed to send email";
}