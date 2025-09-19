// src/app/api/contact/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

function jsonError(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req) {
  try {
    // Accept multipart/form-data or JSON
    const isForm = req.headers.get('content-type')?.includes('form-data');
    let name = '', phone = '', email = '', services = '', message = '';

    if (isForm) {
      const fd = await req.formData().catch(() => null);
      if (!fd) return jsonError('Invalid form data', 400);
      name = String(fd.get('name') || '').trim();
      phone = String(fd.get('phone') || '').trim();
      email = String(fd.get('email') || '').trim();
      services = String(fd.get('services') || '').trim();
      message = String(fd.get('message') || '').trim();
    } else {
      const body = await req.json().catch(() => ({}));
      name = String(body?.name || '').trim();
      phone = String(body?.phone || '').trim();
      email = String(body?.email || '').trim();
      services = String(body?.services || '').trim();
      message = String(body?.message || '').trim();
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (!name || phoneDigits.length < 10) {
      return jsonError('Invalid data: name and 10-digit phone required', 400);
    }

    // Env
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    const to = process.env.CONTACT_RECEIVER || user;
    const fromAddr = process.env.FROM_EMAIL || user;

    if (!user || !pass) return jsonError('Server email not configured (SMTP_USER/SMTP_PASS missing)', 500);
    if (!fromAddr) return jsonError('FROM_EMAIL missing and SMTP_USER empty', 500);
    if (!to) return jsonError('CONTACT_RECEIVER missing and SMTP_USER empty', 500);

    // Transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    try {
      await transporter.verify();
    } catch (e) {
      const msg = e?.response || e?.message || String(e);
      console.error('SMTP verify failed:', msg);
      return jsonError(`SMTP verify failed: ${msg}`, 500);
    }

    // Sanitize and format message for HTML
    const safeMessageHtml = (message || '-')
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/\n/g,'<br/>');

    // Fresh light theme, mobile-friendly HTML
    const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>New Lead</title>
<style>
  body,table,td,p { margin:0; padding:0; }
  img { border:0; line-height:100%; outline:none; text-decoration:none; }
  table { border-collapse:collapse; }
  .bg { background-color:#F7FAFD; }
  .wrap { width:100%; max-width:640px; margin:0 auto; }
  .card{
    background:#FFFFFF;
    border:1px solid #E7EEF7;
    border-radius:16px;
    box-shadow:0 12px 30px rgba(15,23,42,0.06);
  }
  .ribbon{
    display:inline-block; padding:10px 14px; border-radius:999px;
    background:linear-gradient(90deg,#A7E0FF 0%, #C6F7E2 100%);
    color:#0F172A; font:700 12px/1.2 Inter,Segoe UI,Arial,sans-serif; letter-spacing:0.6px; text-transform:uppercase;
  }
  .heading{ color:#0F172A; font:800 22px/1.3 Inter,Segoe UI,Arial,sans-serif; letter-spacing:0.2px; }
  .subtle { color:#475569; font:400 14px/1.6 Inter,Segoe UI,Arial,sans-serif; }
  .label  { color:#334155; font:700 12px/1 Inter,Segoe UI,Arial,sans-serif; letter-spacing:0.5px; text-transform:uppercase; }
  .value  { color:#0F172A; font:500 16px/1.5 Inter,Segoe UI,Arial,sans-serif; }
  .mono   { font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace; }
  .divider{
    height:1px;
    background:linear-gradient(90deg, rgba(251,191,36,0.55) 0%, rgba(199,210,254,0.4) 100%);
  }
  .row{ padding:14px 0; }
  .chip{
    display:inline-block; padding:6px 10px; border-radius:999px;
    background:#F1F5F9; color:#0F172A; font:700 12px/1 Inter,Segoe UI,Arial,sans-serif;
  }
  .btn{
    display:inline-block; padding:12px 18px;
    background:linear-gradient(90deg,#FBBF24,#F59E0B);
    color:#081226 !important; text-decoration:none; font:800 14px/1 Inter,Segoe UI,Arial,sans-serif;
    border-radius:12px; letter-spacing:0.3px;
  }
  .btn-alt{
    display:inline-block; padding:12px 18px; background:#E6F3FF; color:#0F172A !important;
    text-decoration:none; font:800 14px/1 Inter,Segoe UI,Arial,sans-serif; border-radius:12px; letter-spacing:0.3px; border:1px solid #CFE7FF;
  }
  @media (max-width:480px){
    .heading{ font-size:20px; }
    .value{ font-size:15px; }
    .btn, .btn-alt{ padding:14px 18px; }
  }
  @media (prefers-color-scheme: dark){
    .bg{ background-color:#0B1220; }
    .card{ background:#0F172A; border-color:#1E293B; }
    .heading{ color:#E2E8F0; }
    .subtle{ color:#94A3B8; }
    .label{ color:#C7D2FE; }
    .value{ color:#F8FAFC; }
    .chip{ background:#111827; color:#E5E7EB; }
    .btn-alt{ background:#0B2A45; color:#E5F2FF !important; border-color:#1F3B57; }
  }
</style>
</head>
<body class="bg">
  <table role="presentation" width="100%">
    <tr>
      <td style="padding:28px 16px;">
        <table role="presentation" class="wrap">
          <tr>
            <td style="text-align:center; padding:6px 0 16px;">
              <span class="ribbon">New Website Lead</span>
            </td>
          </tr>
          <tr>
            <td class="card" style="padding:22px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <p class="heading" style="margin:0 0 6px;">Lead Details</p>
                    <p class="subtle" style="margin:0;">A new enquiry has been submitted from the contact form.</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" style="margin-top:14px;">
                <tr>
                  <td style="padding:6px 0;">
                    <span class="chip">Priority: Normal</span>
                    <span style="display:inline-block;width:6px;"></span>
                    <span class="chip">Source: Website</span>
                  </td>
                </tr>
              </table>

              <div class="divider" style="margin:16px 0;"></div>

              <table role="presentation" width="100%">
                <tr class="row">
                  <td width="30%" class="label">Name</td>
                  <td class="value mono">${name}</td>
                </tr>
                <tr class="row">
                  <td width="30%" class="label">Phone</td>
                  <td class="value mono">${phoneDigits}</td>
                </tr>
                <tr class="row">
                  <td width="30%" class="label">Email</td>
                  <td class="value mono">${email || '-'}</td>
                </tr>
                <tr class="row">
                  <td width="30%" class="label">Service</td>
                  <td class="value mono">${services || '-'}</td>
                </tr>
              </table>

              <div class="divider" style="margin:16px 0;"></div>

              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <p class="label" style="margin:0 0 8px;">Message</p>
                    <div class="value" style="white-space:pre-wrap;">${safeMessageHtml}</div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%">
                <tr>
                  <td style="padding-top:18px;">
                    <a class="btn" href="tel:${phoneDigits}" target="_blank" rel="noopener">Call Now</a>
                    <span style="display:inline-block;width:8px;"></span>
                    <a class="btn-alt" href="mailto:${email || fromAddr}" target="_blank" rel="noopener">Reply</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="text-align:center; padding:14px 6px 0;">
              <p class="subtle" style="font-size:12px; margin:0;">Sent automatically from the website contact form.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Plain text fallback
    const text = `Name: ${name}
Phone: ${phoneDigits}
Email: ${email}
Service: ${services}
Message:
${message}`;

    // Unique subject and headers to avoid threading
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const subject = `New lead ${ts}: ${name} (${phoneDigits})`;

    try {
      const info = await transporter.sendMail({
        from: `"Website Lead" <${fromAddr}>`,
        to,
        subject,
        replyTo: email || fromAddr,
        html,
        text,
        headers: {
          'X-Entity-Ref-ID': ts,
          'Message-ID': `<lead-${ts}@${host}>`,
        },
      });
      console.log('Mail sent:', info?.messageId || info);
    } catch (e) {
      const msg = e?.response || e?.message || String(e);
      console.error('Send error:', msg);
      return jsonError(`Send error: ${msg}`, 500);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ ok: false, error: 'Email send failed' }, { status: 500 });
  }
}
