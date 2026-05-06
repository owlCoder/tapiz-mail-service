import { HEX } from "../core/colors";

export function twoFactorTemplate(code: string, appName = "Tapiz"): string {
  return /* html */ `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dvofaktorski kod autentifikacije · ${appName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f2f4f8;
      margin: 0;
      padding: 32px 20px;
      line-height: 1.5;
      color: #1e2a3e;
    }

    .container {
      max-width: 560px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
      overflow: hidden;
    }

    .header {
      background: ${HEX.primary900};
      padding: 28px 28px;
      text-align: center;
      border-bottom: 3px solid ${HEX.primary};
    }

    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.2px;
      color: white;
    }

    .header h2 span {
      font-weight: 500;
      opacity: 0.9;
    }

    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 30px;
      padding: 4px 14px;
      font-size: 12px;
      font-weight: 500;
      color: white;
      margin-top: 12px;
      letter-spacing: 0.3px;
    }

    .content {
      padding: 36px 32px 32px;
    }

    .greeting {
      font-size: 16px;
      font-weight: 500;
      color: #0f172a;
      margin-bottom: 8px;
    }

    .instruction {
      color: #334155;
      font-size: 14px;
      margin-bottom: 28px;
      border-left: 3px solid ${HEX.primary200};
      padding-left: 16px;
    }

    .code-card {
      background: #f8fafc;
      border-radius: 16px;
      padding: 8px 20px;
      text-align: center;
      margin: 24px 0 28px;
      border: 1px solid #e2e8f0;
    }

    .code-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      font-weight: 600;
      color: ${HEX.primary};
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      margin-top: 8px;
      background: #ffffff;
    }

    .code {
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace;
      font-size: 44px;
      font-weight: 700;
      letter-spacing: 10px;
      color: ${HEX.primary};
      background: transparent;
      padding: 16px 4px 12px;
      word-break: break-word;
      text-align: center;
    }

    .validity {
      font-size: 13px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 30px;
      padding: 8px 18px;
      text-align: center;
      display: inline-block;
      width: auto;
      margin: 12px auto 0;
      color: #1e293b;
    }

    .validity strong {
      color: ${HEX.primary};
      font-weight: 600;
    }

    .warning {
      background: #fef9e8;
      border-left: 4px solid #d97706;
      border-radius: 12px;
      padding: 14px 18px;
      margin: 32px 0 20px;
      font-size: 13px;
      color: #92400e;
    }

    .footer {
      text-align: center;
      padding: 0 32px 32px;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #eef2f6;
      margin-top: 8px;
      background: #ffffff;
    }

    .footer p {
      margin: 8px 0;
    }

    hr {
      margin: 16px 0 12px;
      border: none;
      height: 1px;
      background: #e2e8f0;
    }

    @media (max-width: 520px) {
      body {
        padding: 16px;
      }
      .content {
        padding: 28px 20px;
      }
      .code {
        font-size: 36px;
        letter-spacing: 6px;
      }
      .header h2 {
        font-size: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2><span>${appName}</span> · Dvofaktorska autentifikacija</h2>
      <div class="badge">Sigurnosni pristupni kod</div>
    </div>
    <div class="content">
      <div class="greeting">Poštovani korisniče,</div>
      <div class="instruction">
        U nastavku se nalazi Vaš jednokratni kod za prijavljivanje.
      </div>

      <div class="code-card">
        <div class="code">${code}</div>
        <div class="code-label">Verifikacioni kod</div>
      </div>

      <div class="validity">
        Ovaj kod ističe za <strong>15 minuta</strong>
      </div>

      <div class="warning">
        Nemojte nikome otkrivati ovaj kod. ${appName} Vas nikada neće pitati za Vaš jednokratni kod.
      </div>

      <p style="font-size: 13px; color: #5b6e8c; margin-top: 24px; text-align: center;">
        Ukoliko niste pokušali da se prijavite, možete bezbedno zanemariti ovu poruku.
      </p>
    </div>
    <div class="footer">
      <p>Automatski generisana poruka · Molimo Vas da ne odgovarate na ovaj e‑mail</p>
      <hr />
      <p>© ${new Date().getFullYear()} ${appName} — Sva prava zadržana.</p>
    </div>
  </div>
</body>
</html>`;
}

export function sessionSummaryTemplate(
  subjectName: string,
  sessionNumber: number,
  sessionType: string,
  presentCount: number,
  absentCount: number,
  totalEnrolled: number,
  appName = "Tapiz",
): string {
  const attendanceRate = totalEnrolled > 0 ? Math.round((presentCount / totalEnrolled) * 100) : 0;
  const rateColor = attendanceRate >= 70 ? "#16a34a" : attendanceRate >= 50 ? "#d97706" : "#dc2626";

  return /* html */ `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Izveštaj termina · ${appName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f2f4f8;
      margin: 0;
      padding: 32px 20px;
      line-height: 1.5;
      color: #1e2a3e;
    }
    .container {
      max-width: 560px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03);
      overflow: hidden;
    }
    .header {
      background: ${HEX.primary900};
      padding: 28px;
      text-align: center;
      border-bottom: 3px solid ${HEX.primary};
    }
    .header h2 { font-size: 20px; font-weight: 600; color: #fff; letter-spacing: -0.2px; }
    .header .badge {
      display: inline-block;
      background: rgba(255,255,255,0.12);
      border-radius: 30px;
      padding: 4px 14px;
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      margin-top: 10px;
    }
    .content { padding: 32px; }
    .subject-label { font-size: 12px; color: ${HEX.primary}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px; }
    .subject-name { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
    .session-meta { font-size: 13px; color: ${HEX.gray500}; margin-bottom: 28px; }
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin: 24px 0;
    }
    .stat-card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 16px 12px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    .stat-value { font-size: 28px; font-weight: 700; }
    .stat-label { font-size: 11px; color: ${HEX.gray500}; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.6px; }
    .stat-present .stat-value { color: #16a34a; }
    .stat-absent  .stat-value { color: #dc2626; }
    .stat-total   .stat-value { color: ${HEX.primary}; }
    .rate-bar-wrapper { margin: 20px 0 8px; }
    .rate-bar-label { display: flex; justify-content: space-between; font-size: 12px; color: ${HEX.gray500}; margin-bottom: 6px; }
    .rate-bar-track { height: 8px; background: #e2e8f0; border-radius: 99px; overflow: hidden; }
    .rate-bar-fill { height: 100%; border-radius: 99px; background: ${rateColor}; width: ${attendanceRate}%; }
    .rate-pct { text-align: center; font-size: 22px; font-weight: 700; color: ${rateColor}; margin-top: 4px; }
    .footer {
      text-align: center;
      padding: 20px 32px 28px;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #eef2f6;
      background: #fff;
    }
    .footer p { margin: 6px 0; }
    hr { margin: 12px 0; border: none; height: 1px; background: #e2e8f0; }
    @media (max-width: 480px) {
      .content { padding: 24px 16px; }
      .stats-grid { grid-template-columns: 1fr 1fr; }
      .stat-total { grid-column: 1 / -1; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${appName} · Izveštaj prisustva</h2>
      <div class="badge">Termin zatvorен</div>
    </div>
    <div class="content">
      <div class="subject-label">Predmet</div>
      <div class="subject-name">${subjectName}</div>
      <div class="session-meta">Termin ${sessionNumber} &nbsp;·&nbsp; ${sessionType}</div>

      <div class="stats-grid">
        <div class="stat-card stat-present">
          <div class="stat-value">${presentCount}</div>
          <div class="stat-label">Prisutnih</div>
        </div>
        <div class="stat-card stat-absent">
          <div class="stat-value">${absentCount}</div>
          <div class="stat-label">Odsutnih</div>
        </div>
        <div class="stat-card stat-total">
          <div class="stat-value">${totalEnrolled}</div>
          <div class="stat-label">Upisanih</div>
        </div>
      </div>

      <div class="rate-bar-wrapper">
        <div class="rate-bar-label">
          <span>Stopa prisustva</span>
          <span style="font-weight:600; color:${rateColor}">${attendanceRate}%</span>
        </div>
        <div class="rate-bar-track">
          <div class="rate-bar-fill"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Automatski generisana poruka · Molimo Vas da ne odgovarate na ovaj e‑mail</p>
      <hr />
      <p>© ${new Date().getFullYear()} ${appName} — Sva prava zadržana.</p>
    </div>
  </div>
</body>
</html>`;
}

export function passwordResetTemplate(link: string, appName = "Tapiz"): string {
  return /* html */ `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resetovanje lozinke · ${appName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f2f4f8;
      margin: 0;
      padding: 32px 20px;
      line-height: 1.5;
      color: #1e2a3e;
    }

    .container {
      max-width: 560px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
      overflow: hidden;
    }

    .header {
      background: ${HEX.primary900};
      padding: 28px 28px;
      text-align: center;
      border-bottom: 3px solid ${HEX.primary};
    }

    .header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.2px;
      color: white;
    }

    .header h2 span {
      font-weight: 500;
      opacity: 0.9;
    }

    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 30px;
      padding: 4px 14px;
      font-size: 12px;
      font-weight: 500;
      color: white;
      margin-top: 12px;
      letter-spacing: 0.3px;
    }

    .content {
      padding: 36px 32px 32px;
    }

    .greeting {
      font-size: 16px;
      font-weight: 500;
      color: #0f172a;
      margin-bottom: 8px;
    }

    .instruction {
      color: #334155;
      font-size: 14px;
      margin-bottom: 28px;
      border-left: 3px solid ${HEX.primary200};
      padding-left: 16px;
    }

    .btn-wrapper {
      text-align: center;
      margin: 28px 0;
    }

    .btn {
      display: inline-block;
      background: ${HEX.primary};
      color: #ffffff !important;
      text-decoration: none;
      font-size: 15px;
      font-weight: 600;
      padding: 14px 32px;
      border-radius: 12px;
      letter-spacing: 0.1px;
    }

    .link-fallback {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 18px;
      margin: 20px 0;
      font-size: 12px;
      color: #64748b;
      word-break: break-all;
    }

    .link-fallback a {
      color: ${HEX.primary};
    }

    .validity {
      font-size: 13px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 30px;
      padding: 8px 18px;
      text-align: center;
      display: inline-block;
      margin: 0 auto;
      color: #1e293b;
    }

    .validity strong {
      color: #d97706;
      font-weight: 600;
    }

    .validity-wrapper {
      text-align: center;
      margin-bottom: 24px;
    }

    .warning {
      background: #fef9e8;
      border-left: 4px solid #d97706;
      border-radius: 12px;
      padding: 14px 18px;
      margin: 24px 0 20px;
      font-size: 13px;
      color: #92400e;
    }

    .footer {
      text-align: center;
      padding: 0 32px 32px;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #eef2f6;
      margin-top: 8px;
      background: #ffffff;
    }

    .footer p {
      margin: 8px 0;
    }

    hr {
      margin: 16px 0 12px;
      border: none;
      height: 1px;
      background: #e2e8f0;
    }

    @media (max-width: 520px) {
      body { padding: 16px; }
      .content { padding: 28px 20px; }
      .header h2 { font-size: 20px; }
      .btn { padding: 12px 24px; font-size: 14px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2><span>${appName}</span> · Resetovanje lozinke</h2>
      <div class="badge">Zahtev za promenu lozinke</div>
    </div>
    <div class="content">
      <div class="greeting">Poštovani korisniče,</div>
      <div class="instruction">
        Primili smo zahtev za resetovanje lozinke na Vašem nalogu. Kliknite na dugme ispod da biste kreirali novu lozinku.
      </div>

      <div class="btn-wrapper">
        <a href="${link}" class="btn">Resetovanje lozinke</a>
      </div>

      <div class="validity-wrapper">
        <div class="validity">
          Link ističe za <strong>30 minuta</strong>
        </div>
      </div>

      <div class="link-fallback">
        Ukoliko dugme ne radi, kopirajte sledeći link u pregledač:<br />
        <a href="${link}">${link}</a>
      </div>

      <div class="warning">
        Ukoliko niste zatražili resetovanje lozinke, možete bezbedno zanemariti ovu poruku. Vaša lozinka neće biti promenjena.
      </div>
    </div>
    <div class="footer">
      <p>Automatski generisana poruka · Molimo Vas da ne odgovarate na ovaj e‑mail</p>
      <hr />
      <p>© ${new Date().getFullYear()} ${appName} — Sva prava zadržana.</p>
    </div>
  </div>
</body>
</html>`;
}