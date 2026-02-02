# PromptOptimizer (프롬프트 최적화 프로젝트)

**PromptOptimizer**는 사용자가 입력한 프롬프트를 OpenAI(GPT), Claude, Gemini 등 각 LLM 모델이 선호하는 최적의 구조로 변환해주는 웹 도구입니다. 서버로 데이터를 전송하지 않아 프라이버시가 안전하며, 규칙 및 템플릿 기반으로 일관된 고품질 프롬프트를 생성합니다.

> **현재 상태**: ✅ **MVP 개발 완료 (v1.0)** - 기본 최적화 기능, 결과 비교, 히스토리, 설정 기능 구현 완료.
> **현재 상태**: ✅ **MVP 개발 완료 (v1.0)** - 기본 최적화 기능, 결과 비교, 히스토리, 설정 기능 구현 완료.
> **현재 상태**: ✅ **MVP 개발 완료 (v1.0)** - 기본 최적화 기능, 결과 비교, 히스토리, 설정 기능 구현 완료.
> **현재 상태**: ✅ **MVP 개발 완료 (v1.0)** - 기본 최적화 기능, 결과 비교, 히스토리, 설정 기능 구현 완료.
> **최근 업데이트**: 테스트 스위트 구축 (Vitest 단위 테스트 + Playwright E2E 테스트). 코어 로직 스냅샷 검증 및 주요 UI 흐름(Diff/History) 자동화 테스트 적용.


## ✨ 주요 기능

- **모델별 최적화**: OpenAI(지시 우선), Claude(XML 태그), Gemini(역할/맥락 분리) 맞춤형 변환
- **규칙/템플릿 기반**: 요약, 마케팅 카피, 이메일 답장 등 목적에 맞는 템플릿 자동 적용
- **개인정보 보호**: 모든 로직이 브라우저에서 실행(Client-side)되며, 입력 데이터는 서버로 전송되지 않습니다.
- **결과 비교 (Diff)**: 원본과 최적화된 프롬프트를 비교하여 변경된 부분을 하이라이트합니다.
- **로컬 히스토리**: 최근 작업 내역을 브라우저에 저장하여 관리합니다.

## 🛠 기술 스택

- **Framework**: [Next.js 14+](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Style**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com) (Static Export)
- **Data**: JSON 기반 규칙셋 (No Backend)

## 🚀 시작하기

개발 서버를 실행하여 로컬에서 프로젝트를 확인할 수 있습니다.

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드 및 배포

프로덕션용 빌드를 생성하려면 다음 명령어를 실행합니다:

```bash
npm run build
npm run start
```

### 테스트

품질 보증을 위해 다음 테스트 명령어를 실행할 수 있습니다:

```bash
# 코드 스타일 검사
npm run lint

# 유닛 테스트 (Core Logic)
npm test

# E2E 테스트 (UI Interactions)
npx playwright test
```

## 📂 프로젝트 구조

- `src/app`: Next.js 앱 라우터 페이지
- `src/components`: UI 컴포넌트 (Editor, Options, Diff 등)
- `src/core`: 핵심 로직 (Optimizer, Renderers, Tokenizer 등)
- `src/data`: 변환 규칙(Ruleset) 및 샘플 데이터

## 📝 문서

- [ARCHITECTURE.md](./ARCHITECTURE.md): 시스템 아키텍처 및 컨벤션
- [PRD](./PRD/PRD.md): 제품 요구사항 문서 (프롬프트 최적화/PRD/PRD.md)

---
이 프로젝트는 [Next.js](https://nextjs.org)를 기반으로 생성되었습니다.
