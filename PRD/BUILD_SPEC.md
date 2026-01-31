# BUILD_SPEC (MVP) — PromptOptimizer (No Backend)

## 1. 기술 스택 (Tech Stack)
- Next.js (App Router) + TypeScript
- Tailwind CSS
- 백엔드 없음 (No backend), API 호출 없음 (no API calls)
- 배포: Vercel 정적 배포 최적화
- 저장소: localStorage (히스토리 최대 10개)
- 분석(Analytics): 없음 (MVP). 추후 추가 시에도 원본 프롬프트 텍스트는 전송하지 않음.

## 2. 페이지 (Pages)
- `/` : 메인 페이지 (Single Page App 형태)
- `/faq` : 정적 FAQ 페이지 (하드코딩 또는 MD 파일)

## 3. 데이터 파일 (Data Files)
- `src/data/ruleset.v1.json` : 규칙 + 템플릿 + 모델 렌더링 설정
- `src/data/samples.json` : 샘플 프롬프트

## 4. 핵심 모듈 (Core Modules)
- `src/core/optimizer.ts`
  - `optimize(input: OptimizeInput, ruleset: Ruleset): OptimizeResult`
- `src/core/renderers/openai.ts`
- `src/core/renderers/gemini.ts`
- `src/core/renderers/claude.ts`
- `src/core/diff.ts` (단순 버전)
  - 문장/블록 단위 비교; 추가된 블록 하이라이트
- `src/core/tokenEstimate.ts`
  - 대략적 토큰 추정 (영어: 글자수/4, 한국어: 글자수/2 휴리스틱)
- `src/core/sensitive.ts`
  - 정규식 탐지 + 마스킹 유틸리티
- `src/core/history.ts`
  - localStorage 조회/저장 (스키마 버전 관리)

## 5. UI 컴포넌트 (제안 - UI Components)
- `ModelSelector`
- `PromptInput`
- `OptionsPanel` (기본 Lite; Pro는 접기)
- `BeforeAfter`
- `DiffToggle`
- `TagsBar`
- `WarningsBar` (길이/민감정보)
- `CopyButton`, `DownloadButton`
- `HistoryDrawer` (선택 사항이나 권장)

## 6. MVP 고정 스코프 (확장 금지)
- 모델: `openai`, `claude`, `gemini`
- 출력 타입: `summary` (요약), `marketing_copy` (마케팅 카피), `email_reply` (이메일 답장)
- 기본 모드: `lite`
- 형식: `plain`, `markdown`, `json`

## 7. 입출력 규약 (Output Contract - 프론트 내부)
### OptimizeInput
- `rawPrompt: string`
- `model: 'openai'|'claude'|'gemini'`
- `outputType: 'summary'|'marketing_copy'|'email_reply'`
- `mode: 'lite'|'pro'`
- `tone: 'formal'|'neutral'|'friendly'|'persuasive'`
- `length: 'very_short'|'short'|'medium'`
- `format: 'plain'|'markdown'|'json'`
- `safetyExit: boolean`
- `selfCheck: boolean`
- `userFields?: Record<string,string>` (선택, UI 필수 필드용)

### OptimizeResult
- `optimizedPrompt: string`
- `appliedTags: string[]`
- `warnings: { type: string; message: string }[]`
- `diff?: { before: string; after: string; addedBlocks: { start: number; end: number }[] }`

## 8. 완료 조건 (Definition of Done - MVP QA)
- 로드 후 완전 오프라인 동작 (정적 에셋 외 네트워크 의존성 없음)
- 3개 모델 + 3개 출력 타입에 대해 최적화 프롬프트 생성
- 복사/다운로드 정상 동작
- Diff 토글 시 추가 섹션 하이라이트
- 민감 정보 탐지 + 마스킹 동작
- 새로고침 시 히스토리 유지

## 9. 단순 Diff 요구사항
- 블록 레벨 Diff 허용:
  - 공백 라인 또는 제목/태그로 구분된 섹션을 블록으로 취급
  - 'After'에는 존재하지만 'Before'에는 없는 블록 하이라이트

## 10. 토큰 추정 요구사항
- 근사치 토큰 제공:
  - 영어: ~ 글자수/4
  - 한국어: ~ 글자수/2 (대략적)
- (추정 토큰) > 0.8 * 모델컨텍스트한도 시 경고 표시
  - 모델 컨텍스트 한도는 보수적인 기본값 사용 (설정 파일)
