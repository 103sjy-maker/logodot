import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/jpg', 'image/png']);
const SAFE_ID = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/; // slug / filename 검증

export async function POST(request: NextRequest) {
  // 로컬 개발 환경에서만 허용
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: '이미지 업로드는 로컬 개발 환경에서만 사용 가능합니다.' },
      { status: 403 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: '요청 파싱 실패' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  const slug = (formData.get('slug') as string | null)?.trim();
  const name = (formData.get('name') as string | null)?.trim();

  // ── 유효성 검사 ────────────────────────────────────────────────
  if (!file || !slug || !name) {
    return NextResponse.json(
      { error: 'file, slug, name 세 필드가 모두 필요합니다.' },
      { status: 400 },
    );
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: 'jpg, jpeg, png 파일만 허용됩니다.' },
      { status: 400 },
    );
  }

  if (!SAFE_ID.test(slug) || !SAFE_ID.test(name)) {
    return NextResponse.json(
      { error: 'slug와 name은 영소문자·숫자·하이픈만 사용 가능합니다.' },
      { status: 400 },
    );
  }

  // ── 이미지 처리 ────────────────────────────────────────────────
  const bytes = await file.arrayBuffer();
  const inputBuffer = Buffer.from(bytes);

  const outputDir = path.join(process.cwd(), 'public', 'insights', slug);
  fs.mkdirSync(outputDir, { recursive: true });

  const outputFilename = `${name}.webp`;
  const outputPath = path.join(outputDir, outputFilename);

  try {
    const info = await sharp(inputBuffer)
      .resize(1500, undefined, { withoutEnlargement: true }) // 최대 너비 1500px
      .webp({ quality: 80 })                                  // WebP 80%
      .toFile(outputPath);

    return NextResponse.json({
      success: true,
      path: `/insights/${slug}/${outputFilename}`,
      size: `${Math.round(info.size / 1024)}KB`,
      dimensions: `${info.width}×${info.height}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `변환 실패: ${err instanceof Error ? err.message : '알 수 없는 오류'}` },
      { status: 500 },
    );
  }
}
