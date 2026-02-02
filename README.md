# PromptOptimizer

**AI 프롬프트 최적화 도구 (PromptOptimizer)**

PromptOptimizer는 사용자의 단순한 프롬프트를 AI 모델(OpenAI, Claude, Gemini)이 가장 잘 이해할 수 있는 형태의 **구조화된 프롬프트로 변환해주는 도구**입니다.
서버로 데이터를 전송하지 않고, **모든 작업이 브라우저 내부에서 수행(Client-side Only)**되므로 데이터 유출 걱정 없이 안전하게 사용할 수 있습니다.

![License](https://img.shields.io/github/license/antigravity/prompt-optimizer)
![Build Status](https://img.shields.io/github/actions/workflow/status/antigravity/prompt-optimizer/playwright.yml)

---

## ✨ Features (주요 기능)

-   **Multi-Model Support**: OpenAI (GPT), Claude, Gemini 각 모델에 특화된 최적화 규칙 적용
-   **Structured Output**: XML 태그, Markdown, JSON 등 명확한 출력 형식 지정
-   **Client-side Only**: 입력된 모든 데이터는 브라우저를 벗어나지 않음 (**No Server Data Transmission**)
-   **Rule-based Engine**: LLM이 아닌, 검증된 프롬프트 엔지니어링 패턴(Rule-based)을 사용하여 즉각적이고 결정적인 결과 제공
-   **Privacy Focused**: 별도 회원가입이나 API 키 필요 없음

## 🚀 How it works (작동 원리)

이 프로젝트는 거대 언어 모델(LLM)을 사용하여 문장을 재작성하는 방식이 아닙니다.
대신, **프롬프트 엔지니어링의 모범 사례(Best Practices)**를 기반으로 한 **템플릿 엔진**입니다.

1.  사용자가 원본 프롬프트를 입력합니다.
2.  선택한 AI 모델(Claude 등)에 맞춰 최적의 페르소나, 맥락(Context), 제약 조건(Constraints)을 자동으로 주입합니다.
3.  구조화된 최종 프롬프트를 생성합니다.

## 🛠 Usage (사용법)

### 로컬 실행 (Development)

```bash
# 1. 저장소 클론
git clone https://github.com/YOUR_USERNAME/prompt-optimizer.git
cd prompt-optimizer

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 테스트 (Testing)

```bash
# E2E 테스트 실행 (Playwright)
npx playwright test
```

## 🔒 Privacy & Security

-   **No Backend**: 이 프로젝트는 Next.js의 Static Export 기능을 사용하며, 별도의 백엔드 API 서버가 없습니다.
-   **Local Processing**: 입력한 텍스트, 설정값 등은 오직 사용자의 브라우저 메모리에서만 처리됩니다.
-   **No Analytics**: 개인을 식별할 수 있는 정보는 수집하지 않습니다.

## 📦 Deployment (배포)

Vercel을 통한 배포를 권장합니다.

1.  GitHub 저장소를 Vercel에 연결합니다.
2.  Framework Preset을 `Next.js`로 설정합니다.
3.  Build Command: `next build` (또는 `npm run build`)
4.  Output Directory: `out` (Static Export 설정 시)
5.  Deploy를 클릭합니다.

## 🤝 Contributing

기여는 언제나 환영합니다! 자세한 내용은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고해주세요.

1.  이 저장소를 Fork 합니다.
2.  새로운 Feature 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`).
3.  변경 사항을 Commit 합니다 (`git commit -m 'Add some AmazingFeature'`).
4.  Branch에 Push 합니다 (`git push origin feature/AmazingFeature`).
5.  Pull Request를 생성합니다.

## 📄 License

이 프로젝트는 [MIT License](LICENSE)에 따라 배포됩니다.
