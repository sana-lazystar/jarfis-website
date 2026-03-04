---
title: "빠른 시작"
description: "5분 이내에 JARFIS를 실행하세요. CLI를 설치하고, 프로젝트를 초기화하고, 첫 AI 워크플로우를 실행하세요."
category: "getting-started"
order: 1
locale: "ko"
translationOf: "en/getting-started"
lastUpdated: 2026-03-04
draft: false
---

# 빠른 시작

5분 이내에 JARFIS를 실행하세요.

## 사전 요구 사항

시작하기 전에 다음이 설치되어 있는지 확인하세요:

- **Node.js** >= 18 ([nodejs.org](https://nodejs.org))
- **Git** >= 2.x
- LLM API 키 (OpenAI, Anthropic 또는 호환 가능한 API)

## Step 1 — CLI 설치

```bash
npm install -g @jarfis/cli
```

예상 시간: ~30초

설치 확인:

```bash
jarfis --version
# JARFIS CLI v1.0.0
```

## Step 2 — 프로젝트 초기화

```bash
jarfis init my-project
cd my-project
```

다음과 같은 프로젝트 구조가 생성됩니다:

```
my-project/
├── .jarfis/
│   └── config.yaml      # JARFIS 설정
├── jarfis.config.ts     # 워크플로우 설정
└── README.md
```

## Step 3 — LLM 설정

`.jarfis/config.yaml`을 열고 LLM 프로바이더를 설정하세요:

```yaml
llm:
  provider: openai          # openai | anthropic | ollama
  model: gpt-4o
  api_key: ${OPENAI_API_KEY}  # 환경 변수 사용

agents:
  - po
  - ux
  - frontend
  - qa
```

API 키를 환경 변수로 설정하세요:

```bash
export OPENAI_API_KEY=your-api-key-here
```

## Step 4 — 첫 태스크 작성

프로젝트에 `task.md` 파일을 생성하세요:

```markdown
# 태스크: 랜딩 페이지 구축

"Cloudify"라는 SaaS 제품을 위한 간단한 랜딩 페이지를 만들어 주세요.

## 요구 사항
- 태그라인과 CTA가 있는 Hero 섹션
- 3가지 주요 이점이 있는 Features 섹션
- 3단계 요금제가 있는 Pricing 섹션
- 링크가 있는 Footer
```

## Step 5 — JARFIS 실행

```bash
jarfis run task.md
```

JARFIS가 수행하는 작업:
1. **PO 에이전트**가 요구 사항을 읽고 정제
2. **UX 에이전트**가 와이어프레임과 사용자 흐름 생성
3. **FE 에이전트**가 실제 컴포넌트 구축
4. **QA 에이전트**가 출력물 검토 및 검증

터미널에서 에이전트들이 실시간으로 협업하는 모습을 확인하세요.

## Step 6 — 결과 확인

완료되면 결과물이 `output/` 디렉토리에 생성됩니다:

```
output/
├── index.html
├── styles.css
└── app.js
```

브라우저에서 `output/index.html`을 열어 결과를 확인하세요.

## 다음 단계

- [개념 및 아키텍처](/ko/docs/concepts-overview)를 읽어 JARFIS 구조를 이해하세요
- [가이드](/ko/docs)에서 더 복잡한 워크플로우를 살펴보세요
- [GitHub 토론](https://github.com/sana-lazystar/jarfis/discussions)에서 커뮤니티 지원을 받으세요
