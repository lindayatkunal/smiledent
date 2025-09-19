// src/app/api/contact/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

function jsonError(message, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(req) {
  try {
    // Parse and sanitize body
    const formData = await req.formData().catch(() => null);
    let name = '';
    let phone = '';
    let email = '';
    let services = '';
    let message = '';

    if (formData) {
      name = String(formData.get('name') || '').trim();
      phone = String(formData.get('phone') || '').trim();
      email = String(formData.get('email') || '').trim();
      services = String(formData.get('services') || '').trim();
      message = String(formData.get('message') || '').trim();
    } else {
      const json = await req.json().catch(() => ({}));
      name = String(json?.name || '').trim();
      phone = String(json?.phone || '').trim();
      email = String(json?.email || '').trim();
      services = String(json?.services || '').trim();
      message = String(json?.message || '').trim();
    }

    const phoneDigits = phone.replace(/\D/g, '');

    // Basic validation
    if (!name || phoneDigits.length < 10) {
      return jsonError('Invalid data: name and 10-digit phone required', 400);
    }

    // Env config
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER || '';
    const pass = process.env.SMTP_PASS || '';
    const to = process.env.CONTACT_RECEIVER || user;
    const fromAddr = process.env.FROM_EMAIL || user;

    if (!user || !pass) return jsonError('Server email not configured (SMTP_USER/SMTP_PASS missing)', 500);
    if (!fromAddr) return jsonError('FROM_EMAIL missing and SMTP_USER empty', 500);
    if (!to) return jsonError('CONTACT_RECEIVER missing and SMTP_USER empty', 500);

    // Transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Verify connection
    try {
      await transporter.verify();
    } catch (e) {
      const msg = e?.response || e?.message || String(e);
      console.error('SMTP verify failed:', msg);
      return jsonError(`SMTP verify failed: ${msg}`, 500);
    }

    const html = `
      <h2>New Lead from Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phoneDigits}</p>
      <p><strong>Email:</strong> ${email || '-'}</p>
      <p><strong>Service:</strong> ${services || '-'}</p>
      <p><strong>Message:</strong><br/>${(message || '-').replace(/\n/g, '<br/>')}</p>
    `;

    try {
      const info = await transporter.sendMail({
        from: `"Website Lead" <${fromAddr}>`,
        to,
        subject: `New lead: ${name} (${phoneDigits})`,
        replyTo: email || fromAddr,
        html,
        text: `Name: ${name}
Phone: ${phoneDigits}
Email: ${email}
Service: ${services}
Message:
${message}`,
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
