// Force dynamic — prevent Next.js from statically analysing this route at build time
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  // Initialise inside handler so top-level module evaluation never touches the network
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { projectTypes, budget, timeline, content, name, company, email, phone } =
      await req.json();

    const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
    const to   = process.env.RESEND_TO_EMAIL   ?? 'design@logodot.kr';

    // All header fields (from, subject, replyTo) must be ASCII-only
    const subjectCompany = (company || name || 'Unknown').replace(/[^\x00-\x7F]/g, '');
    const subject = `[Logodot] New inquiry from ${subjectCompany || 'a client'}`;

    const { error } = await resend.emails.send({
      from:    `Logodot <${from}>`,   // ASCII only
      to:      [to],
      replyTo: email,                  // email address is always ASCII
      subject,                         // ASCII only
      html: `
        <table style="font-family:sans-serif;font-size:15px;color:#1E1E1E;max-width:600px;width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <td colspan="2" style="background:#93D85A;padding:24px 32px;font-size:20px;font-weight:700;border-radius:8px 8px 0 0;">
                New inquiry received — Logodot
              </td>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #E5E5E5;">
              <td style="padding:16px 32px;width:160px;color:#888;font-weight:600;">프로젝트 분야</td>
              <td style="padding:16px 32px;">${(projectTypes ?? []).join(', ') || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #E5E5E5;">
              <td style="padding:16px 32px;color:#888;font-weight:600;">프로젝트 예산</td>
              <td style="padding:16px 32px;">${budget || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #E5E5E5;">
              <td style="padding:16px 32px;color:#888;font-weight:600;">프로젝트 기간</td>
              <td style="padding:16px 32px;">${timeline || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #E5E5E5;">
              <td style="padding:16px 32px;color:#888;font-weight:600;vertical-align:top;">프로젝트 내용</td>
              <td style="padding:16px 32px;white-space:pre-wrap;">${content || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #E5E5E5;background:#F8F9FA;">
              <td style="padding:16px 32px;color:#888;font-weight:600;">담당자 이름</td>
              <td style="padding:16px 32px;">${name || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #E5E5E5;background:#F8F9FA;">
              <td style="padding:16px 32px;color:#888;font-weight:600;">회사/브랜드명</td>
              <td style="padding:16px 32px;">${company || '—'}</td>
            </tr>
            <tr style="border-bottom:1px solid #E5E5E5;background:#F8F9FA;">
              <td style="padding:16px 32px;color:#888;font-weight:600;">이메일</td>
              <td style="padding:16px 32px;"><a href="mailto:${email}" style="color:#93D85A;">${email || '—'}</a></td>
            </tr>
            <tr style="background:#F8F9FA;">
              <td style="padding:16px 32px;color:#888;font-weight:600;">연락처</td>
              <td style="padding:16px 32px;">${phone || '—'}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:20px 32px;color:#888;font-size:12px;border-top:1px solid #E5E5E5;">
                This email was sent automatically from logodot.kr contact form.
              </td>
            </tr>
          </tfoot>
        </table>
      `,
    });

    if (error) {
      console.error('[contact] resend error:', error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] unexpected error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
