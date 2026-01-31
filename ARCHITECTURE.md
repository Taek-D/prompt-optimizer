# ARCHITECTURE.md

## 1. 개요
이 문서는 **PromptOptimizer** 프로젝트의 기술적 의사결정, 구조, 컨벤션을 정의합니다.
앞으로의 모든 개발 및 유지보수는 이 문서를 기준으로 진행됩니다.

---

## 2. 기술 스택 (Tech Stack)

| 구분 | 기술 | 비고 |
|---|---|---|
| **Framework** | **Next.js 14+ (App Router)** | 정적 배포(Static Export) 지향 |
| **Language** | **TypeScript** | Strict Mode 적용 |
| **Styling** | **Tailwind CSS** | 유틸리티 퍼스트 |
| **Backend** | **None** (No Backend) | 클라이언트 사이드 로직 100% |
| **Storage** | **localStorage** | 로컬 히스토리 관리 |
| **Deploy** | **Vercel** | Static Site Generation |

---

## 3. 핵심 원칙 (Core Principles)

1.  **MVP 스코프 고정**
    *   **지원 모델**: OpenAI, Claude, Gemini (3종)
    *   **출력 타입**: Summary, Marketing Copy, Email Reply (3종)
    *   **모드**: Lite (기본), Pro (옵션)
2.  **No API Calls**
    *   외부 LLM API 호출을 일절 하지 않는다.
    *   모든 변환 로직은 `src/core/optimizer.ts` 내 규칙 기반 엔진으로 처리한다.
3.  **Privacy First**
    *   사용자의 입력 프롬프트는 절대 서버로 전송되지 않는다.
    *   모든 데이터는 브라우저 메모리 및 localStorage에만 머문다.

---

## 4. 폴더 구조 (Folder Structure)

```text
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # 전역 레이아웃
│   ├── page.tsx          # 메인 페이지 (SPA 형태)
│   └── faq/
│       └── page.tsx      # FAQ 정적 페이지
├── components/           # UI 컴포넌트
│   ├── BeforeAfter.tsx   # 결과 비교 뷰
│   ├── HistoryDrawer.tsx # 히스토리 드로어
│   ├── ModelSelector.tsx # 모델 선택 카드
│   ├── OptionsPanel.tsx  # 옵션 설정 패널
│   ├── PromptInput.tsx   # 프롬프트 입력창
│   └── ...
├── core/                 # 핵심 비즈니스 로직 (Pure TS)
│   ├── renderers/        # 모델별 렌더러 구현체
│   │   ├── openai.ts
│   │   ├── gemini.ts
│   │   └── claude.ts
│   ├── optimizer.ts      # 메인 최적화 엔진
│   ├── tokenEstimate.ts  # 토큰 계산 유틸리티
│   ├── diff.ts           # 텍스트 Diff 로직
│   ├── sensitive.ts      # 민감정보 탐지/마스킹
│   └── history.ts        # localStorage 관리 로직
├── data/                 # 정적 데이터
│   ├── ruleset.v1.json   # 변환 규칙/템플릿 (버전 관리)
│   └── samples.json      # 예시 프롬프트 데이터
└── types/                # 전역/공용 타입 정의 (선택적, src/core/types.ts 대체 가능)
```

---

## 5. 코딩 컨벤션 (Coding Conventions)

### 네이밍 (Naming)
*   **컴포넌트**: `PascalCase` (예: `PromptInput.tsx`, `ModelSelector.tsx`)
*   **함수/변수**: `camelCase` (예: `optimizePrompt`, `handleInputChange`)
*   **상수**: `UPPER_SNAKE_CASE` (예: `MAX_HISTORY_ITEMS`)
*   **파일명**:
    *   React 컴포넌트: `PascalCase.tsx`
    *   유틸리티/로직: `camelCase.ts`

### 타입 정의 (Types)
*   `interface` 사용을 권장합니다.
*   **Props**: `컴포넌트명 + Props` (예: `interface PromptInputProps { ... }`)
*   핵심 도메인 타입(`OptimizeInput`, `Ruleset` 등)은 `src/core/types.ts` (또는 `src/types`)에서 중앙 관리합니다.

### 상태 관리 (State Management)
*   **원칙**: 초기 MVP 단계에서는 `page.tsx` (Container)에서 상태를 관리하고, 컴포넌트에는 Props로 전달합니다. (Prop Drilling 허용)
*   추후 복잡도 증가 시 Context API 또는 Zustand 도입을 고려합니다 (현재는 불필요).

### 렌더링 보안 (Security)
*   **`dangerouslySetInnerHTML` 사용 금지**: XSS 방지를 위해 텍스트 렌더링은 기본적으로 이스케이프 처리된 방식을 사용합니다.
*   단, Diff 하이라이팅 등 불가피한 경우, 철저한 검증(Sanitization) 후 제한적으로 사용하거나 안전한 라이브러리를 사용합니다.

### 에러 처리 (Error Handling)
*   로직 에러 시 사용자에게 조용히(Silent) 실패하기보다, 명확한 **Toast**나 **Alert Message**를 표시합니다 (예: `warnings` 배열 활용).
*   입력 검증 실패(빈 값 등)는 UI에서 즉시 피드백을 줍니다.

---

## 6. 데이터 규칙 (Data Rules)

### Ruleset 관리
*   `src/data/ruleset.v1.json`과 같이 파일명에 버전을 명시합니다.
*   구조 변경이 생길 경우 `v2` 파일을 생성하여 하위 호환성을(또는 마이그레이션을) 고려합니다.

### 스냅샷 테스트 (Snapshot Testing)
*   Ruleset이 변경되면 기존 샘플 프롬프트에 대한 최적화 결과가 달라질 수 있습니다.
*   중요 변경 시 "Golden Sample" (기준 입력/출력) 테스트를 업데이트하여 품질 저하를 방지해야 합니다.

---

## 7. 테스트 전략 (Test Strategy)

| 종류 | 대상 | 도구 | 비고 |
|---|---|---|---|
| **Unit Test** | `src/core/` (optimizer, renderers, diff) | Jest / Vitest | 핵심 로직(순수 함수) 검증 필수 |
| **E2E Test** | 주요 사용자 플로우 (입력 -> 최적화 -> 결과) | Playwright | 실제 브라우저 환경 동작 검증 |

---

## 8. 커밋 규칙 (Commit Rules)

`type: subject` 형식을 따릅니다.

*   `feat`: 새로운 기능 추가 (예: `feat: add Copy button`)
*   `fix`: 버그 수정 (예: `fix: openai renderer logic`)
*   `docs`: 문서 수정 (예: `docs: update ARCHITECTURE.md`)
*   `style`: 코드 포맷팅, 세미콜론 누락 등 (로직 변경 없음)
*   `refactor`: 코드 리팩토링 (기능 변경 없음)
*   `test`: 테스트 코드 추가
*   `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

---

**작성일**: 2026-01-31
**작성자**: Senior Architect (AI)
