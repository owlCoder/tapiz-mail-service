export const docsHtml = /* html */ `<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tapiz Mail Service — API Docs</title>
  <style>
    :root {
      --primary:      #a08040;
      --primary-50:   #faf7f2;
      --primary-100:  #f0e8d8;
      --primary-200:  #ddd0b0;
      --primary-700:  #603e18;
      --primary-800:  #503c14;
      --primary-900:  #38280c;
      --primary-950:  #200e04;
      --gray-50:   #f9fafb;
      --gray-100:  #f3f4f6;
      --gray-200:  #e5e7eb;
      --gray-400:  #9ca3af;
      --gray-500:  #6b7280;
      --gray-600:  #4b5563;
      --gray-700:  #374151;
      --gray-800:  #1f2937;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--gray-50);
      color: var(--gray-800);
      line-height: 1.6;
    }

    nav {
      background: var(--primary-900);
      border-bottom: 3px solid var(--primary);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      height: 56px;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    nav .logo { font-size: 1.1rem; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
    nav .logo span { color: var(--primary); }
    nav .badge {
      font-size: 0.65rem;
      background: var(--primary);
      color: #fff;
      padding: 2px 8px;
      border-radius: 999px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    nav .spacer { flex: 1; }
    nav .rate-info { font-size: 0.75rem; color: var(--gray-400); }

    .container { max-width: 820px; margin: 0 auto; padding: 2.5rem 1.5rem 4rem; }

    .hero {
      background: linear-gradient(135deg, var(--primary-800) 0%, var(--primary-900) 100%);
      border-radius: 12px;
      padding: 2rem 2.5rem;
      margin-bottom: 2rem;
      color: #fff;
    }
    .hero h1 { font-size: 1.6rem; font-weight: 700; margin-bottom: 0.4rem; }
    .hero p  { font-size: 0.9rem; color: var(--primary-100); max-width: 480px; }
    .hero .meta {
      display: flex; gap: 1.5rem; margin-top: 1.2rem;
      font-size: 0.8rem; color: var(--primary-100);
    }
    .hero .meta span::before { content: "• "; }

    .section-title {
      font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 1px; color: var(--gray-400); margin: 2.5rem 0 0.75rem;
    }

    .endpoint {
      background: #fff; border: 1px solid var(--gray-200);
      border-radius: 10px; margin-bottom: 1rem; overflow: hidden;
    }
    .endpoint-header {
      display: flex; align-items: center; gap: 0.75rem;
      padding: 1rem 1.25rem; cursor: pointer; user-select: none;
    }
    .endpoint-header:hover { background: var(--gray-50); }
    .method {
      font-size: 0.7rem; font-weight: 700; padding: 3px 10px;
      border-radius: 5px; letter-spacing: 0.5px;
      min-width: 52px; text-align: center;
    }
    .method.post { background: #dbeafe; color: #1d4ed8; }
    .method.get  { background: #d1fae5; color: #065f46; }
    .path {
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.85rem; color: var(--gray-800); font-weight: 500;
    }
    .endpoint-desc { font-size: 0.82rem; color: var(--gray-500); margin-left: auto; }
    .chevron { color: var(--gray-400); font-size: 0.75rem; transition: transform 0.2s; }
    .chevron.open { transform: rotate(90deg); }

    .endpoint-body { display: none; border-top: 1px solid var(--gray-100); padding: 1.25rem; }
    .endpoint-body.open { display: block; }

    .schema-title {
      font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.8px; color: var(--gray-500); margin: 1rem 0 0.5rem;
    }
    .schema-title:first-child { margin-top: 0; }

    table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
    th {
      background: var(--gray-50); text-align: left;
      padding: 0.45rem 0.7rem; font-size: 0.7rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.5px;
      color: var(--gray-500); border-bottom: 1px solid var(--gray-200);
    }
    td { padding: 0.45rem 0.7rem; border-bottom: 1px solid var(--gray-100); vertical-align: top; }
    tr:last-child td { border-bottom: none; }
    code.field {
      background: var(--primary-50); color: var(--primary-700);
      padding: 1px 6px; border-radius: 4px;
      font-family: monospace; font-size: 0.82rem;
    }
    .tag-req {
      display: inline-block; font-size: 0.62rem; font-weight: 700;
      padding: 1px 6px; border-radius: 4px;
      background: #fee2e2; color: #b91c1c; letter-spacing: 0.3px;
    }
    .tag-opt {
      display: inline-block; font-size: 0.62rem; font-weight: 700;
      padding: 1px 6px; border-radius: 4px;
      background: var(--gray-100); color: var(--gray-500); letter-spacing: 0.3px;
    }
    .type { color: var(--gray-400); font-size: 0.78rem; font-family: monospace; }

    pre {
      background: var(--primary-950);
      border-radius: 8px; padding: 1rem 1.2rem;
      overflow-x: auto; font-size: 0.78rem; line-height: 1.7; margin-top: 0.75rem;
    }
    pre code { color: var(--primary-100); font-family: "SFMono-Regular", Consolas, monospace; }

    .rate-box {
      background: var(--primary-50); border: 1px solid var(--primary-200);
      border-left: 4px solid var(--primary); border-radius: 8px;
      padding: 1rem 1.25rem; font-size: 0.83rem;
      color: var(--primary-700); margin-bottom: 1.5rem;
    }
    .rate-box strong { color: var(--primary-800); }

    .response-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem; }
    .res-badge { font-size: 0.75rem; padding: 3px 10px; border-radius: 6px; font-weight: 600; }
    .res-200 { background: #d1fae5; color: #065f46; }
    .res-400 { background: #fef9c3; color: #854d0e; }
    .res-429 { background: #fee2e2; color: #991b1b; }
    .res-500 { background: #f3e8ff; color: #6b21a8; }
  </style>
</head>
<body>

<nav>
  <div class="logo">Tapiz <span>Mail</span></div>
  <div class="badge">v2.0</div>
  <div class="spacer"></div>
  <div class="rate-info">10 req / 15 min per IP</div>
</nav>

<div class="container">
  <div class="hero">
    <h1>Tapiz Mail Service</h1>
    <p>Transactional email microservice — sends 2FA authentication codes via SMTP.</p>
    <div class="meta">
      <span>Hono + TypeScript</span>
      <span>Nodemailer</span>
      <span>Vercel-ready</span>
    </div>
  </div>

  <div class="rate-box">
    <strong>Rate limit:</strong> 10 requests per IP per 15 minutes on all <code>/api/mail/*</code> routes.
    Backed by Valkey/Redis; degrades gracefully to in-memory if unavailable.
    Exceeding the limit returns <strong>HTTP 429</strong>.
  </div>

  <!-- Health -->
  <div class="section-title">Utility</div>

  <div class="endpoint">
    <div class="endpoint-header" onclick="toggle(this)">
      <span class="method get">GET</span>
      <span class="path">/api/mail/health</span>
      <span class="endpoint-desc">Health check</span>
      <span class="chevron">▶</span>
    </div>
    <div class="endpoint-body">
      <p style="font-size:0.85rem;color:var(--gray-600)">Returns <code>{"status":"ok","ts":"&lt;ISO timestamp&gt;"}</code> when the service is running.</p>
      <div class="response-list"><span class="res-badge res-200">200 OK</span></div>
    </div>
  </div>

  <!-- 2FA -->
  <div class="section-title">Authentication Email</div>

  <div class="endpoint">
    <div class="endpoint-header" onclick="toggle(this)">
      <span class="method post">POST</span>
      <span class="path">/api/mail/send-2fa</span>
      <span class="endpoint-desc">Send a 2FA code via email</span>
      <span class="chevron">▶</span>
    </div>
    <div class="endpoint-body">
      <p style="font-size:0.85rem;color:var(--gray-600);margin-bottom:0.75rem">
        Sends a styled HTML email containing a 6-digit 2FA code.
        The email includes a validity notice (15 minutes) and a security warning.
      </p>

      <div class="schema-title">Request body (JSON)</div>
      <table>
        <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code class="field">to</code></td><td class="type">string</td><td><span class="tag-req">req</span></td><td>Recipient email address</td></tr>
          <tr><td><code class="field">code</code></td><td class="type">string</td><td><span class="tag-req">req</span></td><td>6-digit numeric code</td></tr>
          <tr><td><code class="field">appName</code></td><td class="type">string</td><td><span class="tag-opt">opt</span></td><td>Application name shown in the email (default: <code>"Tapiz"</code>)</td></tr>
        </tbody>
      </table>

      <div class="schema-title">Example request</div>
      <pre><code>{
  "to":      "korisnik@uns.ac.rs",
  "code":    "847291",
  "appName": "Tapiz"
}</code></pre>

      <div class="schema-title">Success response (200)</div>
      <pre><code>{
  "success":   true,
  "messageId": "&lt;abc123@smtp.uns.ac.rs&gt;",
  "message":   "2FA code sent successfully"
}</code></pre>

      <div class="schema-title">Validation rules</div>
      <table>
        <thead><tr><th>Field</th><th>Rule</th></tr></thead>
        <tbody>
          <tr><td><code class="field">to</code></td><td>Must be a valid email address</td></tr>
          <tr><td><code class="field">code</code></td><td>Must be exactly 6 digits (<code>/^\d{6}$/</code>)</td></tr>
        </tbody>
      </table>

      <div class="schema-title">SMTP error codes</div>
      <table>
        <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code class="field">EAUTH</code></td><td>SMTP authentication failed — check credentials</td></tr>
          <tr><td><code class="field">ECONNECTION</code></td><td>Cannot connect to SMTP server</td></tr>
          <tr><td><code class="field">ESOCKET</code></td><td>SMTP connection timeout</td></tr>
        </tbody>
      </table>

      <div class="response-list">
        <span class="res-badge res-200">200 — sent</span>
        <span class="res-badge res-400">400 — validation error</span>
        <span class="res-badge res-429">429 — rate limit</span>
        <span class="res-badge res-500">500 — SMTP error</span>
      </div>
    </div>
  </div>
</div>

<script>
  function toggle(header) {
    const body    = header.nextElementSibling;
    const chevron = header.querySelector(".chevron");
    const isOpen  = body.classList.contains("open");
    body.classList.toggle("open", !isOpen);
    chevron.classList.toggle("open", !isOpen);
  }
</script>
</body>
</html>`;
