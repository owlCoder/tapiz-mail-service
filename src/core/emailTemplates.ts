import { HEX } from "../core/colors";

export function twoFactorTemplate(code: string, appName = "Tapiz"): string {
  return /* html */ `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .header {
      background-color: ${HEX.primary900};
      color: white;
      padding: 24px 28px;
      text-align: center;
      border-radius: 8px 8px 0 0;
      border-bottom: 3px solid ${HEX.primary};
    }
    .header h2 {
      margin: 0;
      font-size: 20px;
      letter-spacing: 0.3px;
    }
    .header h2 span { color: ${HEX.primary200}; }
    .content {
      background-color: #ffffff;
      padding: 32px 28px;
      border-radius: 0 0 8px 8px;
      border: 1px solid #ddd;
      border-top: none;
    }
    .code {
      font-size: 34px;
      font-weight: bold;
      color: ${HEX.primary};
      text-align: center;
      padding: 20px;
      background-color: ${HEX.primary50};
      border: 1px solid ${HEX.primary200};
      border-radius: 8px;
      letter-spacing: 8px;
      margin: 24px 0;
    }
    p { margin: 0 0 12px; font-size: 15px; }
    .warning {
      background-color: #fff7ed;
      border-left: 3px solid #f97316;
      padding: 10px 14px;
      border-radius: 4px;
      font-size: 13px;
      color: #9a3412;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      margin-top: 28px;
      font-size: 12px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2><span>${appName}</span> — 2FA kod</h2>
  </div>
  <div class="content">
    <p>Poštovani,</p>
    <p>Vaš kod za dvofaktorsku autentifikaciju je:</p>
    <div class="code">${code}</div>
    <p>Ovaj kod važi narednih <strong>15 minuta</strong>.</p>
    <p>Ako niste pokušali da se prijavite, ignorišite ovaj email.</p>
    <div class="warning">
      ⚠️ Nikada ne delite ovaj kod sa drugima.
    </div>
  </div>
  <div class="footer">
    <p>Ovo je automatski generisana poruka. Molimo vas da ne odgovarate na nju.</p>
    <p>&copy; ${new Date().getFullYear()} ${appName}</p>
  </div>
</body>
</html>`;
}
