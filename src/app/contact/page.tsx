'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const projectTypes = [
  '브랜드네이밍',
  '로고 디자인',
  '브랜드 디자인',
  '리브랜딩',
  '응용 디자인',
  '기타',
];

const budgetOptions = [
  '대략적인 예산 범위를 선택해주세요.',
  '50만원 이하',
  '50~100만원',
  '100~200만원',
  '200~400만원',
  '400~800만원',
  '800만원 이상',
  '협의 가능',
];

const timelineOptions = [
  '예상 일정을 선택해 주세요.',
  '1개월 이내',
  '1~2개월',
  '2~3개월',
  '3개월 이상',
  '협의 가능',
];

const inputClass =
  'w-full h-[52px] border border-border rounded-[8px] px-[20px] text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-foreground placeholder:text-muted-light focus:outline-none focus:border-brand bg-white';

export default function ContactPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const toggleType = (type: string) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous state immediately before new request
    setSendError(null);
    setSubmitted(false);
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectTypes: selectedTypes, budget, timeline, content, name, company, email, phone }),
      });
      const data = await res.json().catch(() => ({}));
      console.log('[contact page] response status', res.status);
      console.log('[contact page] response body', data);
      if (!res.ok) {
        const detail = data?.debug ? JSON.stringify(data.debug) : `HTTP ${res.status}`;
        throw new Error(detail);
      }
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '알 수 없는 오류';
      setSendError(msg);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex-1 pt-[100px] flex items-center justify-center px-5">
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mx-auto mb-6">
              <span className="text-brand text-2xl">✓</span>
            </div>
            <h2 className="text-[32px] font-bold text-foreground mb-3 tracking-[-0.64px]">
              상담 요청이 접수되었습니다.
            </h2>
            <p className="text-[18px] text-muted leading-[28px]">담당 디자이너가 영업일 1–2일 이내 연락드립니다.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-[100px]">
        <div className="max-w-[1440px] mx-auto px-[240px] py-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[80px]">

            {/* ── Left column ── */}
            <div className="md:pt-4">
              {/* Figma: Pretendard 700 60px lh=72px ls=-1.2px color=#1E1E1E */}
              {/* Figma: color=#1E1E1E — no green period */}
              <h1 className="text-[60px] leading-[72px] tracking-[-1.2px] font-bold text-foreground">
                브랜드는
                <br />
                대화에서
                <br />
                시작됩니다.
              </h1>
              {/* Figma: Pretendard 400 20px lh=28px ls=-0.4px color=#1E1E1E */}
              <div className="mt-[40px] flex flex-col gap-[24px] text-[20px] leading-[28px] tracking-[-0.4px] font-normal text-foreground">
                <p>
                  간단히 알려주시면,
                  <br />
                  담당 디자이너가 직접 확인 후 연락드립니다.
                </p>
                <p>
                  브랜딩이 처음이어도 괜찮아요.
                  <br />
                  방향 설정부터 차근차근 함께 정리해 드릴게요.
                </p>
              </div>
            </div>

            {/* ── Right column: form ── */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">

              {/* Right heading */}
              {/* Figma: Pretendard 700 32px lh=48px ls=-0.64px */}
              <h2 className="text-[32px] leading-[48px] tracking-[-0.64px] font-bold text-foreground">
                어떤 브랜드를 만들고 싶으신가요?<br />
                최소한의 정보로도 괜찮아요.<br />
                편하게 적어주세요.
              </h2>

              {/* 프로젝트 분야 */}
              <div className="flex flex-col gap-[16px]">
                {/* Figma: Pretendard 700 20px lh=24px ls=-0.4px */}
                <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                  프로젝트 분야 <span className="text-brand">*</span>
                </label>
                {/* Figma: Frame 82 — HORIZONTAL gap=60, items HORIZONTAL gap=8 */}
                <div className="flex flex-wrap gap-x-[40px] gap-y-[12px]">
                  {projectTypes.map((type) => (
                    <label key={type} className="flex items-center gap-[8px] cursor-pointer">
                      <div
                        onClick={() => toggleType(type)}
                        className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 ${
                          selectedTypes.includes(type)
                            ? 'bg-brand border-brand'
                            : 'border-border'
                        }`}
                      >
                        {selectedTypes.includes(type) && (
                          <span className="text-white text-[10px] leading-none">✓</span>
                        )}
                      </div>
                      {/* Figma: Pretendard 500 16px lh=24px ls=-0.32px color=#444444 */}
                      <span className="text-[16px] leading-[24px] tracking-[-0.32px] font-medium text-muted">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
                {/* Figma: Pretendard 400 16px lh=24px ls=-0.32px color=#888888 */}
                <p className="text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-muted-light">
                  해당되는 항목을 선택해주세요. (중복 선택 가능)
                </p>
              </div>

              {/* 예산 + 기간 — Figma: 456px wide each */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                    프로젝트 예산 <span className="text-brand">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt === budgetOptions[0] ? '' : opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground">▾</div>
                  </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                    프로젝트 기간
                  </label>
                  <div className="relative">
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt === timelineOptions[0] ? '' : opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground">▾</div>
                  </div>
                </div>
              </div>
              {/* hint */}
              <p className="-mt-6 text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-muted-light">
                대략적인 범위를 알려주시면 더 정확한 제안이 가능합니다.
              </p>

              {/* 프로젝트 내용 — Figma: Rectangle 67 936×189 r=8 */}
              <div className="flex flex-col gap-[12px]">
                <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                  프로젝트 내용 <span className="text-brand">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="원하시는 스타일, 참고 브랜드, 현재 고민하시는 점을 자유롭게 적어주세요."
                  rows={6}
                  className="w-full border border-border rounded-[8px] px-[20px] py-[16px] text-[16px] leading-[24px] tracking-[-0.32px] font-normal text-foreground placeholder:text-muted-light resize-none focus:outline-none focus:border-brand"
                />
              </div>


              {/* 담당자 이름 + 회사/브랜드명 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                    담당자 이름 <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="성함과 직책을 적어주세요."
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                    회사/브랜드명 <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                    placeholder="브랜드명을 알려주세요."
                    className={inputClass}
                  />
                </div>
              </div>

              {/* 이메일 + 연락처 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                    이메일 <span className="text-brand">*</span>
                  </label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="회신드릴 이메일을 입력해주세요."
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-[12px]">
                  {/* Figma: "연락처" weight=600 (not 700) */}
                  <label className="text-[20px] leading-[24px] tracking-[-0.4px] font-semibold text-foreground">
                    연락처
                  </label>
                  <input
                    type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="빠른 회신을 원하시면 입력해주세요."
                    className={inputClass}
                  />
                </div>
              </div>

              {/* 개인 정보 동의 */}
              <label className="flex items-center gap-[8px] cursor-pointer">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`w-[18px] h-[18px] rounded-[4px] border-2 flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
                    agreed ? 'bg-brand border-brand' : 'border-border'
                  }`}
                >
                  {agreed && <span className="text-white text-[10px] leading-none">✓</span>}
                </div>
                {/* Figma: Pretendard 500 16px lh=24px ls=-0.32px color=#444444 */}
                <span className="text-[16px] leading-[24px] tracking-[-0.32px] font-medium text-muted underline cursor-pointer hover:text-foreground">
                  개인 정보 수집 및 이용에 동의합니다.
                </span>
              </label>

              {/* Submit — Figma Frame 3: 220×60 bg=#1E1E1E r=8 pad=18,40 gap=20
                  Text: Pretendard 500 20px lh=24px ls=-0.4px color=#FFFFFF */}
              {sendError && (
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[15px] text-red-500 leading-[22px]">
                    전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                  </p>
                  <p className="text-[12px] text-red-400 font-mono break-all">
                    {sendError}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center justify-center gap-[20px] bg-foreground text-white
                           hover:bg-brand hover:text-foreground
                           disabled:opacity-60 disabled:cursor-not-allowed
                           text-[20px] leading-[24px] font-medium tracking-[-0.4px]
                           px-[40px] py-[18px] rounded-[8px]
                           transition-[background-color,color] duration-200 w-fit"
              >
                {sending ? '전송 중…' : '상담 요청하기'}
                {!sending && (
                  <span className="text-white group-hover:text-foreground transition-colors duration-200">↗</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
