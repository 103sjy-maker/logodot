'use client';

import { useState, useRef } from 'react';

// 로컬 개발 전용 페이지 — 프로덕션 배포 후에도 API가 403을 반환하므로 안전합니다.

export default function UploadPage() {
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('cover');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'ok' | 'error'; msg?: string; path?: string }>({ type: 'idle' });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    setFile(f);
    setStatus({ type: 'idle' });
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
      // 파일명에서 이름 추출 (확장자 제외)
      const base = f.name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
      if (!name || name === 'cover') setName(base === '' ? 'cover' : base);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !slug || !name) return;

    setStatus({ type: 'loading' });

    const fd = new FormData();
    fd.append('file', file);
    fd.append('slug', slug);
    fd.append('name', name);

    try {
      const res = await fetch('/api/upload-insight-image', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'ok', msg: `저장 완료 (${data.size}, ${data.dimensions})`, path: data.path });
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
      } else {
        setStatus({ type: 'error', msg: data.error });
      }
    } catch {
      setStatus({ type: 'error', msg: '네트워크 오류' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-start justify-center pt-20 px-5">
      <div className="w-full max-w-[520px]">
        <div className="mb-8">
          <p className="text-xs font-bold text-[#93D85A] tracking-widest uppercase mb-1">로컬 개발 전용</p>
          <h1 className="text-2xl font-bold text-[#1E1E1E]">인사이트 이미지 업로드</h1>
          <p className="text-sm text-[#888] mt-1">
            JPG·PNG → WebP 자동 변환 (최대 1500px · 품질 80%)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-sm">

          {/* Slug */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1E1E1E]">
              Article Slug <span className="text-[#93D85A]">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="why-branding-brand-asset"
              required
              className="h-11 border border-[#E5E5E5] rounded-lg px-4 text-sm text-[#1E1E1E] placeholder:text-[#CCC] focus:outline-none focus:border-[#93D85A]"
            />
            <p className="text-xs text-[#AAA]">md 파일의 slug와 동일하게 입력 (영소문자·숫자·하이픈)</p>
          </div>

          {/* Output filename */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1E1E1E]">
              저장 파일명 <span className="text-[#93D85A]">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="cover"
                required
                className="flex-1 h-11 border border-[#E5E5E5] rounded-lg px-4 text-sm text-[#1E1E1E] placeholder:text-[#CCC] focus:outline-none focus:border-[#93D85A]"
              />
              <span className="text-sm text-[#888] flex-shrink-0">.webp</span>
            </div>
            <p className="text-xs text-[#AAA]">예: cover, gap-logo-redesign, airbnb-logo</p>
          </div>

          {/* File upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[#1E1E1E]">
              이미지 파일 <span className="text-[#93D85A]">*</span>
            </label>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              required
              onChange={e => handleFile(e.target.files?.[0] ?? null)}
              className="text-sm text-[#444] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#F0F0F0] file:text-[#1E1E1E] hover:file:bg-[#E5E5E5] file:cursor-pointer"
            />
            {preview && (
              <img src={preview} alt="preview" className="mt-2 rounded-lg w-full max-h-40 object-cover border border-[#E5E5E5]" />
            )}
          </div>

          {/* Result path preview */}
          {slug && name && (
            <div className="bg-[#F8F9FA] rounded-lg px-4 py-3">
              <p className="text-xs text-[#888] mb-0.5">저장 경로</p>
              <p className="text-sm font-mono text-[#444]">
                public/insights/<strong className="text-[#1E1E1E]">{slug}</strong>/{name}.webp
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status.type === 'loading' || !file}
            className="h-12 bg-[#1E1E1E] text-white text-sm font-semibold rounded-lg hover:bg-[#93D85A] hover:text-[#1E1E1E] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status.type === 'loading' ? '변환 중…' : 'WebP로 변환 후 저장'}
          </button>

          {/* Status */}
          {status.type === 'ok' && (
            <div className="bg-[#DFF8CA] rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-[#1E1E1E]">✓ {status.msg}</p>
              <p className="text-xs font-mono text-[#444] mt-1">{status.path}</p>
              <p className="text-xs text-[#666] mt-2">이제 git add → commit → push → 배포하면 반영됩니다.</p>
            </div>
          )}
          {status.type === 'error' && (
            <div className="bg-[#FEE2E2] rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-red-700">✗ {status.msg}</p>
            </div>
          )}
        </form>

        <p className="text-xs text-[#CCC] text-center mt-6">
          이 페이지는 로컬 개발 환경에서만 작동합니다 · logodot admin
        </p>
      </div>
    </div>
  );
}
