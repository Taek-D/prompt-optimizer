# 배포 가이드 (Deployment Guide)

이 문서는 **Vercel**을 통해 PromptOptimizer 프로젝트를 배포하는 절차와 체크리스트를 다룹니다.

## 🚀 배포 환경 (Static Export)

이 프로젝트는 **Next.js Static Export** (`output: 'export'`) 모드로 설정되어 있습니다. 별도 서버 없이 HTML/CSS/JS 파일만으로 호스팅 가능합니다.

### 전제 조건
- **No Backend**: API Routes나 SSR(Server Side Rendering) 기능을 사용하지 않음.
- **Client-Side Build**: 모든 로직이 브라우저에서 실행됨.

## ✅ 배포 전 체크리스트 (Pre-Flight Checks)

배포 버튼을 누르기 전, 다음 항목을 반드시 확인하세요.

### 1. 빌드 및 테스트 검증
- [ ] **프로덕션 빌드 성공**: 로컬에서 `npm run build` 실행 시 에러 없이 `out` 폴더가 생성되어야 함.
- [ ] **린트(Lint) 통과**: `npm run lint` 실행 시 중대한 에러가 없어야 함.
- [ ] **단위 테스트 통과**: `npm test`로 핵심 로직(규칙 엔진, 토큰 계산) 검증.
- [ ] **주요 기능 확인**: 로컬 서버(`npm run start`)에서 다음 기능 동작 확인:
    - [ ] 3가지 모델(GPT, Claude, Gemini) 최적화 동작
    - [ ] 히스토리 저장 및 불러오기
    - [ ] 결과 복사 및 다운로드

### 2. 설정 확인
- [ ] `next.config.ts` 파일에 `output: 'export'` 설정 확인.
- [ ] `package.json`의 `dependencies`가 최신/안정 버전인지 확인.

### 3. 사용자 보호 및 법적 사항 (MVP 기준)
- [ ] **Privacy Notice**: UI 하단에 "서버로 데이터가 전송되지 않음" 문구가 명시되어 있는지 확인.
- [ ] **라이선스**: 프로젝트 루트에 `LICENSE` 파일 확인 (필요 시).

## 📦 Vercel 배포 절차

### 방법 1: Vercel CLI (추천)

1. Vercel CLI 로그인:
   ```bash
   npx vercel login
   ```

2. 배포 실행:
   ```bash
   npx vercel
   ```
   - 질문에 `Y` 또는 기본값(Default)으로 응답합니다.
   - Project Settings에서 `Framework Preset`이 **Next.js**로 자동 감지됩니다.

3. 프로덕션 배포:
   ```bash
   npx vercel --prod
   ```

### 방법 2: GitHub 연동 (자동화)

1. [Vercel Dashboard](https://vercel.com/dashboard)에서 **"Add New..." > "Project"** 선택.
2. GitHub 레포지토리 `prompt-optimizer` 선택 및 Import.
3. **Build and Output Settings** 확인:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` (또는 `npm run build`)
   - **Output Directory**: `out` (Static Export 기본값)
4. **Deploy** 클릭.

## 🛠 문제 해결 (Troubleshooting)

- **404 에러 (새로고침 시)**: 정적 호스팅에서는 라우팅 방식에 따라 새로고침 시 404가 발생할 수 있습니다. Vercel은 이를 자동으로 처리하지만, 만약 문제가 발생하면 `src/app/not-found.tsx` 구현을 검토하세요.
- **이미지 엑박**: `next/image`를 사용하는데 이미지 최적화 서비스 할당량이 초과되거나 설정이 잘못된 경우 발생할 수 있습니다. `next.config.ts`에 `images: { unoptimized: true }`를 추가하여 해결할 수 있습니다.

## 🔄 롤백 (Rollback)

Vercel은 이전 배포 버전을 영구 보존합니다.
1. Vercel 대시보드 > 해당 프로젝트 > **Deployments** 탭.
2. 안정적인 이전 배포 옆의 **...** 메뉴 클릭.
3. **Rollback to this Deployment** 선택. (Instant Rollback)
