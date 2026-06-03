export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

// GET — confirm this version is deployed
// Visit https://logodot.kr/api/contact → should return { version: "minimal-v1", ... }
export async function GET() {
  return NextResponse.json({
    version: 'minimal-v1',
    RESEND_API_KEY: process.env.RESEND_API_KEY
      ? `set (${process.env.RESEND_API_KEY.slice(0, 8)}...)`
      : 'NOT SET',
  });
}

// POST — stripped to absolute minimum, hardcoded ASCII-only payload
export async function POST(req: Request) {
  console.log('[contact-v1] start');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'no api key' }, { status: 500 });
  }

  console.log('[contact-v1] calling resend...');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    'Logodot <noreply@logodot.kr>',
        to:      ['design@logodot.kr'],
        subject: 'TEST',
        html:    '<p>test</p>',
      }),
    });

    const data = await res.json().catch(() => ({}));
    console.log('[contact-v1] resend status:', res.status, JSON.stringify(data));

    return NextResponse.json({ ok: res.ok, status: res.status, data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[contact-v1] error:', msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
