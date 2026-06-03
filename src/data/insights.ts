import type { InsightArticle } from '@/types';

const sampleContent = `"저희 로고 변경하고 싶어요"

오늘 미팅 때 클라이언트 분께서 갑자기 로고를 바꾸고 싶다고 하셨다. 그래서 로고를 변경하고 싶은 이유에 대해 여쭤보았다.
"너무 색이 복잡해서 다양한 제품에 적용하기 힘들어요. 만든지 오래돼서 그런지 로고가 나들어 보이기도 하고요."

현재 사용 중인 로고는 색이 너무 많아서 사용하기 불편하고, 다소 적용성이 떨어졌다. 만든지 꽤 오랜 시간이 지나 사세게 주는 이미지가 올드해 현재 기업의 성격과 맞지 않았다.

이처럼 로고를 변경하는 데에는 정확한 목적이 있어야 하고 목적은 브랜드의 정체성과 부합해야 한다.

로고는 브랜드 인지도에 큰 영향을 미친다. 로고는 브랜드를 나타내는 '얼굴'과도 같다. 브랜드가 추구하는 브랜드의 정체성, 자기다움을 시각적으로 명확하게 표현할 수 있어야 한다.
심플한 이미지로 누구나 쉽게 알아볼 수 있어야 하고 하나의 상징체계로서 브랜드의 정체성을 담고 있어야 한다. 그리고 일관성 있는 지속적인 노출을 반복시킬수록 브랜드의 정체성이 뚜렷해진다.

하지만 사회가 변화하여 로고를 변경해야 하는 다양한 이유가 발생한다.
변경하게 되는 이유는 저마다 다르지만 로고가 브랜드의 이미지를 제대로 표현하지 못하는 경우일 때 바뀌는 것이 바람직하다.
갑작스럽게 브랜드 이미지가 변경될 경우 기존에 쌓여있던 인식이 변화하는 데 시간이 걸려 사용자들에게 혼란을 줄 수도 있다."저희 로고 변경하고 싶어요"
오늘 미팅 때 클라이언트 분께서 갑자기 로고를 바꾸고 싶다고 하셨다. 그래서 로고를 변경하고 싶은 이유에 대해 여쭤보았다.
"너무 색이 복잡해서 다양한 제품에 적용하기 힘들어요. 만든지 오래돼서 그런지 로고가 나들어 보이기도 하고요."

현재 사용 중인 로고는 색이 너무 많아서 사용하기 불편하고, 다소 적용성이 떨어졌다. 만든지 꽤 오랜 시간이 지나 사세게 주는 이미지가 올드해 현재 기업의 성격과 맞지 않았다.`;

export const insightArticles: InsightArticle[] = [
  {
    slug: 'why-branding-brand-asset',
    title: '브랜딩을 해야하는 이유, 브랜딩과 브랜드 자산',
    category: '브랜딩 기초',
    categorySlug: '브랜딩 기초',
    date: '2026.1.10',
    thumbnail: null,
    excerpt: '브랜딩이 왜 필요한지, 브랜드 자산이 무엇인지 알아봅니다.',
    content: sampleContent,
    prevSlug: undefined,
    nextSlug: 'logo-brand-building',
  },
  {
    slug: 'logo-brand-building',
    title: '로고만 잘 만든다고 브랜드가 아니다. 1인 기업 브랜드 구축법',
    category: '브랜딩 기초',
    categorySlug: '브랜딩 기초',
    date: '2026.01.01',
    thumbnail: null,
    excerpt: '1인 기업이 브랜드를 구축하는 실질적인 방법을 알아봅니다.',
    content: sampleContent,
    prevSlug: 'why-branding-brand-asset',
    nextSlug: 'fashion-brand-design-process',
  },
  {
    slug: 'fashion-brand-design-process',
    title: '패션 브랜드 디자인 제작기, 브랜드 프로세스 미팅부터 제작까지',
    category: '디자인 실무',
    categorySlug: '디자인 실무',
    date: '2026.01.01',
    thumbnail: null,
    excerpt: '패션 브랜드 디자인 과정을 처음부터 끝까지 공유합니다.',
    content: sampleContent,
    prevSlug: 'logo-brand-building',
    nextSlug: 'free-fonts-commercial',
  },
  {
    slug: 'free-fonts-commercial',
    title: '상업적 이용 가능한, 무료 서체 리스트',
    category: '자료실',
    categorySlug: '자료실',
    date: '2026.01.01',
    thumbnail: null,
    excerpt: '무료로 상업적 이용이 가능한 서체 목록을 정리했습니다.',
    content: sampleContent,
    prevSlug: 'fashion-brand-design-process',
    nextSlug: 'long-title-example',
  },
  {
    slug: 'long-title-example',
    title: '제목은 최대 두줄입니다. 제목이 길어질 경우 이렇게 노출되어야 합니다. 제작 시 참고해...',
    category: '브랜딩 기초',
    categorySlug: '브랜딩 기초',
    date: '2026.01.01',
    thumbnail: null,
    excerpt: '긴 제목이 어떻게 표시되는지 확인하는 예시 글입니다.',
    content: sampleContent,
    prevSlug: 'free-fonts-commercial',
    nextSlug: 'logo-brand-2',
  },
  {
    slug: 'logo-brand-2',
    title: '로고만 잘 만든다고 브랜드가 아니다....',
    category: '브랜딩 기초',
    categorySlug: '브랜딩 기초',
    date: '2026.01.01',
    thumbnail: null,
    excerpt: '브랜드 정체성에 대한 심층 분석.',
    content: sampleContent,
    prevSlug: 'long-title-example',
    nextSlug: 'fashion-brand-2',
  },
  {
    slug: 'fashion-brand-2',
    title: '패션 브랜드 디자인 제작기, 브랜드 프로세스 미팅부터 제작까지',
    category: '디자인 실무',
    categorySlug: '디자인 실무',
    date: '2026.01.01',
    thumbnail: null,
    excerpt: '실무에서 바로 쓸 수 있는 디자인 프로세스 가이드.',
    content: sampleContent,
    prevSlug: 'logo-brand-2',
    nextSlug: 'free-fonts-2',
  },
  {
    slug: 'free-fonts-2',
    title: '상업적 이용 가능한, 무료 서체 리스트',
    category: '자료실',
    categorySlug: '자료실',
    date: '2026.01.01',
    thumbnail: null,
    excerpt: '디자이너가 자주 쓰는 무료 폰트 모음.',
    content: sampleContent,
    prevSlug: 'fashion-brand-2',
    nextSlug: 'why-branding-brand-asset',
  },
];

export const insightCategories = ['전체', '브랜딩 기초', '디자인 실무', '고객 이야기', '자료실'];
