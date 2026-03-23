// api/send-2fa.js
const nodemailer = require("nodemailer");

// SMTP konfiguracija za uns.ac.rs
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.uns.ac.rs",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true za 465, false za ostale portove
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Za neke servere može biti potrebno
  },
});

// Email template
function generateEmailTemplate(code, appName = "Evidentiraj") {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #175e8d;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #ddd;
          border-top: none;
        }
        .code {
          font-size: 32px;
          font-weight: bold;
          color: #175e8d;
          text-align: center;
          padding: 20px;
          background-color: #e8f0f7;
          border-radius: 8px;
          letter-spacing: 5px;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666;
        }
        .warning {
          color: #dc3545;
          font-size: 12px;
          text-align: center;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>${appName} - 2FA kod</h2>
      </div>
      <div class="content">
        <p>Poštovani,</p>
        <p>Vaš kod za dvofaktorsku autentifikaciju je:</p>
        <div class="code">${code}</div>
        <p>Ovaj kod važi narednih 10 minuta.</p>
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
    </html>
  `;
}

// CORS headers
const setCorsHeaders = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
};

module.exports = async (req, res) => {
  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  // Allow only POST
  if (req.method !== "POST") {
    setCorsHeaders(res);
    return res.status(405).json({ error: "Method not allowed" });
  }

  setCorsHeaders(res);

  try {
    const { to, code, appName } = req.body;

    // Validacija
    if (!to || !code) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        details: "to and code are required" 
      });
    }

    // Validacija email formata
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validacija koda (6 cifara)
    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({ error: "Code must be 6 digits" });
    }

    // Pripremi email
    const mailOptions = {
      from: `"Evidentiraj" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: to,
      subject: `Evidentiraj - 2FA kod: ${code}`,
      html: generateEmailTemplate(code, appName),
      text: `Vaš 2FA kod za Evidentiraj je: ${code}\n\nOvaj kod važi narednih 15 minuta.\n\nAko niste pokušali da se prijavite, ignorišite ovaj email.`,
    };

    // Pošalji email
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${to}, messageId: ${info.messageId}`);

    // Vrati uspešan odgovor
    return res.status(200).json({ 
      success: true, 
      messageId: info.messageId,
      message: "2FA code sent successfully" 
    });

  } catch (err) {
    console.error("Email sending error:", err);
    
    // Detaljnija greška za debugging
    let errorMessage = "Failed to send email";
    if (err.code === 'EAUTH') {
      errorMessage = "SMTP authentication failed. Check your credentials.";
    } else if (err.code === 'ECONNECTION') {
      errorMessage = "Cannot connect to SMTP server.";
    } else if (err.code === 'ESOCKET') {
      errorMessage = "SMTP connection timeout.";
    }
    
    return res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};