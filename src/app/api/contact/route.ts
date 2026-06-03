export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? '(fallback) onboarding@resend.dev',
    RESEND_TO_EMAIL:   process.env.RESEND_TO_EMAIL   ?? '(fallback) design@logodot.kr',
    RESEND_API_KEY:    process.env.RESEND_API_KEY ? 'set' : 'NOT SET',
  });
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const to     = process.env.RESEND_TO_EMAIL   ?? 'design@logodot.kr';

  if (!apiKey) {
    return NextResponse.json({ ok: false, debug: 'RESEND_API_KEY not set' }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, debug: 'Invalid JSON body' }, { status: 400 });
  }

  const { projectTypes, budget, timeline, content, name, company, email, phone } =
    body as Record<string, unknown>;

  // ASCII-only subject — strip all non-ASCII from company/name
  const displayName = String(company || name || '')
    .replace(/[^\x20-\x7E]/g, '')
    .trim();
  const subject = `[Logodot] New inquiry from ${displayName || 'a client'}`;

  // replyTo only if valid ASCII email
  const replyTo =
    typeof email === 'string' && /^[\x20-\x7E]+@[\x20-\x7E]+$/.test(email)
      ? email
      : undefined;

  // Korean content lives entirely inside the JSON body (html) — safe from ByteString error
  const html = `
    <table style="font-family:sans-serif;font-size:15px;color:#1E1E1E;max-width:600px;width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <td colspan="2" style="background:#93D85A;padding:24px 32px;font-size:20px;font-weight:700;border-radius:8px 8px 0 0;">
            New inquiry — Logodot
          </td>
        </tr>
      </thead>
      <tbody>
        ${[
          ['프로젝트 분야', Array.isArray(projectTypes) ? projectTypes.join(', ') : '—'],
          ['프로젝트 예산', String(budget  || '—')],
          ['프로젝트 기간', String(timeline || '—')],
          ['프로젝트 내용', String(content  || '—')],
          ['담당자 이름',   String(name     || '—')],
          ['회사/브랜드명', String(company  || '—')],
          ['이메일',        String(email    || '—')],
          ['연락처',        String(phone    || '—')],
        ].map(([label, value], i) => `
          <tr style="border-bottom:1px solid #E5E5E5;${i >= 4 ? 'background:#F8F9FA;' : ''}">
            <td style="padding:16px 32px;width:160px;color:#888;font-weight:600;vertical-align:top;">${label}</td>
            <td style="padding:16px 32px;white-space:pre-wrap;">${value}</td>
          </tr>`).join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding:20px 32px;color:#888;font-size:12px;border-top:1px solid #E5E5E5;">
            Sent from logodot.kr contact form
          </td>
        </tr>
      </tfoot>
    </table>`;

  // Edge Runtime: JSON.stringify keeps Korean as raw Unicode (not \uXXXX),
  // and passing that string directly to fetch() body causes a ByteString error.
  // Fix: encode to UTF-8 bytes first with TextEncoder.
  const bodyJSON = JSON.stringify({
    from,
    to:      [to],
    subject,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  });
  const bodyBytes = new TextEncoder().encode(bodyJSON);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: bodyBytes,  // Uint8Array — safe in all runtimes
    });

    const data = await res.json().catch(() => ({})) as Record<string, unknown>;
    console.log('[contact] resend status:', res.status, JSON.stringify(data));

    if (!res.ok) {
      console.error('[contact] resend error:', JSON.stringify(data));
      return NextResponse.json({ ok: false, debug: data }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[contact] fetch error:', msg);
    return NextResponse.json({ ok: false, debug: msg }, { status: 500 });
  }
}
