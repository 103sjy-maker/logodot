export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ version: 'mock-v2' });
}

// POST — returns 200 immediately, no processing, no Resend
export async function POST() {
  console.log('[contact-v2] POST received');
  return NextResponse.json({ ok: true, version: 'mock-v2' });
}
