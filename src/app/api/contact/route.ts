export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ── GET: quick env-check without submitting the form ──────────────────────
// Visit https://logodot.kr/api/contact in browser to verify config
export async function GET() {
  return NextResponse.json({
    RESEND_API_KEY:    process.env.RESEND_API_KEY
      ? `set (${process.env.RESEND_API_KEY.slice(0, 8)}...)`
      : 'NOT SET ❌',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? '(fallback) onboarding@resend.dev',
    RESEND_TO_EMAIL:   process.env.RESEND_TO_EMAIL   ?? '(fallback) design@logodot.kr',
  });
}

// ── POST: send enquiry email ───────────────────────────────────────────────
export async function POST(req: Request) {
  // 1. Log env state on every invocation
  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const to     = process.env.RESEND_TO_EMAIL   ?? 'design@logodot.kr';

  console.log('[contact] ENV —', {
    apiKey:  apiKey ? `set (${apiKey.slice(0, 8)}...)` : 'NOT SET',
    from,
    to,
  });

  // 2. Guard: no API key → fail fast with clear message
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json(
      { ok: false, debug: 'RESEND_API_KEY is not configured on this server' },
      { status: 500 },
    );
  }

  // 3. Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch (parseErr) {
    console.error('[contact] body parse error:', parseErr);
    return NextResponse.json({ ok: false, debug: 'Invalid request body' }, { status: 400 });
  }

  const { projectTypes, budget, timeline, content, name, company, email, phone } = body as Record<string, unknown>;

  // 4. Build ASCII-safe email headers
  const subjectName = String(company || name || 'a client').replace(/[^\x00-\x7F]/g, '').trim();
  const subject     = `[Logodot] New inquiry from ${subjectName || 'a client'}`;
  const replyTo     = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? email
    : undefined;

  console.log('[contact] sending — subject:', subject, '| to:', to, '| from:', from, '| replyTo:', replyTo);

  // 5. Send
  let sendResult;
  try {
    const resend = new Resend(apiKey);
    sendResult = await resend.emails.send({
      from:    `Logodot <${from}>`,
      to:      [to],
      ...(replyTo ? { replyTo } : {}),
      subject,
      html: buildHtml({ projectTypes, budget, timeline, content, name, company, email, phone }),
    });
  } catch (sendErr) {
    const msg = sendErr instanceof Error ? sendErr.message : String(sendErr);
    console.error('[contact] resend.send() threw:', msg, sendErr);
    return NextResponse.json({ ok: false, debug: msg }, { status: 500 });
  }

  // 6. Log full Resend response
  console.log('[contact] resend result:', JSON.stringify(sendResult));

  if (sendResult.error) {
    console.error('[contact] resend API error:', JSON.stringify(sendResult.error));
    return NextResponse.json({ ok: false, debug: sendResult.error }, { status: 500 });
  }

  console.log('[contact] success — email id:', sendResult.data?.id);
  return NextResponse.json({ ok: true });
}

// ── HTML builder ───────────────────────────────────────────────────────────
function buildHtml(d: Record<string, unknown>) {
  const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]).join(', ') : '—');
  const str = (v: unknown) => (v ? String(v) : '—');

  const rows: [string, string][] = [
    ['프로젝트 분야', arr(d.projectTypes)],
    ['프로젝트 예산', str(d.budget)],
    ['프로젝트 기간', str(d.timeline)],
    ['프로젝트 내용', str(d.content)],
    ['담당자 이름',   str(d.name)],
    ['회사/브랜드명', str(d.company)],
    ['이메일',        str(d.email)],
    ['연락처',        str(d.phone)],
  ];

  const rowsHtml = rows.map(([label, value], i) => `
    <tr style="border-bottom:1px solid #E5E5E5;${i >= 4 ? 'background:#F8F9FA;' : ''}">
      <td style="padding:16px 32px;width:160px;color:#888;font-weight:600;vertical-align:top;">${label}</td>
      <td style="padding:16px 32px;white-space:pre-wrap;">${value}</td>
    </tr>`).join('');

  return `
    <table style="font-family:sans-serif;font-size:15px;color:#1E1E1E;max-width:600px;width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <td colspan="2" style="background:#93D85A;padding:24px 32px;font-size:20px;font-weight:700;border-radius:8px 8px 0 0;">
            New inquiry — Logodot
          </td>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding:20px 32px;color:#888;font-size:12px;border-top:1px solid #E5E5E5;">
            Sent from logodot.kr contact form
          </td>
        </tr>
      </tfoot>
    </table>`;
}
