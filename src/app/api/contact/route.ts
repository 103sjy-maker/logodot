export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

// ── GET: env check ─────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    RESEND_API_KEY:    process.env.RESEND_API_KEY
      ? `set (${process.env.RESEND_API_KEY.slice(0, 8)}...)`
      : 'NOT SET',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL ?? '(fallback) onboarding@resend.dev',
    RESEND_TO_EMAIL:   process.env.RESEND_TO_EMAIL   ?? '(fallback) design@logodot.kr',
  });
}

// ── POST: send email via Resend REST API (no SDK) ──────────────────────────
export async function POST(req: Request) {
  console.log('[contact] POST start');

  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const to     = process.env.RESEND_TO_EMAIL   ?? 'design@logodot.kr';
  console.log('[contact] env — apiKey set:', !!apiKey, '| from:', from, '| to:', to);

  if (!apiKey) {
    return NextResponse.json({ ok: false, debug: 'RESEND_API_KEY not set' }, { status: 500 });
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
    console.log('[contact] body parsed ok');
  } catch {
    return NextResponse.json({ ok: false, debug: 'Invalid JSON body' }, { status: 400 });
  }

  const { projectTypes, budget, timeline, content, name, company, email, phone } =
    body as Record<string, unknown>;

  // Build ASCII-safe subject (strip all non-ASCII)
  const rawName = String(company || name || '');
  const asciiName = rawName.replace(/[^\x20-\x7E]/g, '').trim();
  const subject = `[Logodot] New inquiry${asciiName ? ` from ${asciiName}` : ''}`;
  console.log('[contact] subject:', subject);

  // Validate replyTo (must be a plain ASCII email)
  const replyTo =
    typeof email === 'string' && /^[\x20-\x7E]+$/.test(email) ? email : undefined;
  console.log('[contact] replyTo:', replyTo);

  // Scan all header-level fields for non-ASCII before sending
  const headerFields: Record<string, string> = {
    from:    `Logodot <${from}>`,
    to:      to,
    subject: subject,
    ...(replyTo ? { replyTo } : {}),
  };
  let foundNonAscii = false;
  for (const [field, value] of Object.entries(headerFields)) {
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) > 127) {
        console.error(`[contact] NON-ASCII "${field}" idx=${i} char="${value[i]}" code=${value.charCodeAt(i)}`);
        foundNonAscii = true;
      }
    }
  }
  if (!foundNonAscii) console.log('[contact] all header fields are ASCII-clean');

  // Build HTML body (Korean is fine inside JSON body)
  const html = buildHtml({ projectTypes, budget, timeline, content, name, company, email, phone });

  // Call Resend REST API directly — no SDK, full control over HTTP headers
  const payload = {
    from:     `Logodot <${from}>`,
    to:       [to],
    subject,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  };
  console.log('[contact] calling Resend REST API...');

  let resendRes: Response;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        // All header values are ASCII-only
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(payload),  // Korean goes into the UTF-8 JSON body — safe
    });
  } catch (fetchErr) {
    const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
    console.error('[contact] fetch threw:', msg);
    return NextResponse.json({ ok: false, debug: msg }, { status: 500 });
  }

  const resendBody = await resendRes.json().catch(() => ({}));
  console.log('[contact] Resend status:', resendRes.status, '| body:', JSON.stringify(resendBody));

  if (!resendRes.ok) {
    console.error('[contact] Resend error:', JSON.stringify(resendBody));
    return NextResponse.json({ ok: false, debug: resendBody }, { status: 500 });
  }

  console.log('[contact] success — id:', (resendBody as Record<string, unknown>).id);
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

  return `<table style="font-family:sans-serif;font-size:15px;color:#1E1E1E;max-width:600px;width:100%;border-collapse:collapse;">
    <thead><tr><td colspan="2" style="background:#93D85A;padding:24px 32px;font-size:20px;font-weight:700;border-radius:8px 8px 0 0;">
      New inquiry — Logodot
    </td></tr></thead>
    <tbody>${rows.map(([label, value], i) =>
      `<tr style="border-bottom:1px solid #E5E5E5;${i >= 4 ? 'background:#F8F9FA;' : ''}">
        <td style="padding:16px 32px;width:160px;color:#888;font-weight:600;vertical-align:top;">${label}</td>
        <td style="padding:16px 32px;white-space:pre-wrap;">${value}</td>
      </tr>`).join('')}
    </tbody>
    <tfoot><tr><td colspan="2" style="padding:20px 32px;color:#888;font-size:12px;border-top:1px solid #E5E5E5;">
      Sent from logodot.kr contact form
    </td></tr></tfoot>
  </table>`;
}
