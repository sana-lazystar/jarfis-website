---
title: "빠른 시작"
description: "5분 만에 JARFIS를 시작하세요. Claude Code에서 /jarfis를 실행하면 9명의 전문 AI 에이전트가 첫 기능을 함께 만들어 드립니다."
category: "getting-started"
order: 1
locale: "ko"
translationOf: "en/getting-started"
lastUpdated: 2026-03-05
draft: false
---

# 빠른 시작

하나의 슬래시 커맨드로, 9명의 전문 AI 에이전트와 함께 소프트웨어를 5분 만에 시작하세요.

## 사전 요구 사항

시작하기 전에 다음이 준비되어 있는지 확인하세요:

- **Claude Code** (Anthropic) — JARFIS는 Claude Code 내에서 네이티브로 동작합니다
- Claude API 접근 권한이 있는 Claude 계정
- **Git** >= 2.x (프로젝트 초기화용)

> JARFIS는 Claude Code 슬래시 커맨드 워크플로우입니다. 별도의 CLI 설치가 필요하지 않습니다.

## Step 1 — JARFIS 설치

JARFIS는 Claude Code 슬래시 커맨드 패키지로 배포됩니다. Claude Code 내에서 실행하세요:

```
/jarfis:install
```

현재 프로젝트에 JARFIS 워크플로우가 설정되고 다음 파일들이 생성됩니다:

```
your-project/
├── .jarfis/
│   ├── CLAUDE.md              # JARFIS 컨텍스트 & 학습 메모리
│   ├── context.md             # 프로젝트별 AI 컨텍스트
│   ├── jarfis-learnings.md    # 지속 학습 로그
│   └── works/                 # 세션별 생성 아티팩트
├── .jarfis-state.json         # 페이즈 상태 추적
└── CLAUDE.md                  # 루트 Claude Code 컨텍스트
```

## Step 2 — 첫 워크플로우 실행

프로젝트 디렉토리에서 Claude Code를 열고 입력하세요:

```
/jarfis
```

JARFIS가 기능이나 태스크 설명을 요청합니다. 예시:

```
/jarfis JWT 토큰을 사용한 사용자 인증 시스템 구축
```

## Step 3 — 9명의 에이전트가 협업하는 모습 확인

JARFIS는 9명의 전문 AI 에이전트를 8개 이상의 구조화된 페이즈를 통해 조율합니다:

| 페이즈 | 이름 | 수행 내용 |
|--------|------|-----------|
| T | 킥오프 | 요구 사항 수집, 초기 기획 |
| 0 | 기반 정비 | 아키텍처 결정, 기술 스택 선정 |
| 1 | 디자인 | UX 명세, API 계약 정의 |
| 2 | 아키텍처 | 시스템 설계, 데이터 모델 |
| 3 | 구현 | 백엔드 + 프론트엔드 병렬 개발 |
| 4 | 통합 | API 연동, 컴포넌트 통합 |
| 4.5 | QA & 보안 | 테스트 실행, 취약점 검토 |
| 5 | 배포 | 인프라, CI/CD, 릴리즈 노트 |
| 6 | 회고 | 학습 기록, 개선 계획 수립 |

여러분을 대신해 일하는 9명의 에이전트:

| 에이전트 | 역할 |
|----------|------|
| **PO (Product Owner)** | 요구 사항 정의, 사용자 스토리 작성 |
| **Architect** | 시스템 설계, 기술 의사결정 |
| **Tech Lead** | 코드 표준, 리뷰, 에이전트 간 조율 |
| **UX Designer** | 사용자 경험, 와이어프레임, UX 명세 |
| **BE Engineer** | 백엔드 API 구현 |
| **FE Engineer** | 프론트엔드 UI 구현 |
| **DevOps/SRE** | 인프라, CI/CD, 배포 |
| **QA Engineer** | 테스트 전략, 테스트 실행 |
| **Security Engineer** | 보안 검토, 취약점 분석 |

## Step 4 — 아티팩트 검토

완료된 각 페이즈는 `.jarfis/works/{날짜}/{기능명}/`에 구조화된 아티팩트를 생성합니다:

```
.jarfis/works/2026-03-05/feature/auth-system/
├── press-release.md       # 기능 발표문 초안
├── prd.md                 # 제품 요구 사항 문서
├── impact-analysis.md     # 기술 영향 분석
├── architecture.md        # 시스템 아키텍처
├── api-spec.md            # API 계약서
├── tasks.md               # 개발 태스크 분해
├── test-strategy.md       # QA 계획
├── ux-spec.md             # UX 명세서
├── deployment-plan.md     # 릴리즈 계획
├── review.md              # 구현 후 검토
└── retrospective.md       # 학습 & 개선점
```

## Step 5 — 이어서 작업하거나 미팅 소집

이후 세션에서 작업을 이어서 할 때, Claude Code의 PreCompact 훅이 `.jarfis-state.json`에서 JARFIS 상태를 자동으로 복원합니다.

에이전트 간 조율 미팅을 소집하려면:

```
/jarfis:meeting
```

이 명령은 관련 에이전트들을 모아 블로커 해결, 의사결정 정렬, 또는 다음 페이즈 계획을 진행합니다.

## 다음 단계

- [아키텍처 & 개념](/ko/docs/concepts-overview) — JARFIS의 전체 아키텍처를 이해하세요
- [가이드 & 커스터마이징](/ko/docs/guides-customization) — 고급 워크플로우 패턴
- [API 레퍼런스](/ko/docs/api-reference) — 모든 슬래시 커맨드와 설정 옵션
- [GitHub 토론](https://github.com/sana-lazystar/jarfis/discussions) — 커뮤니티 지원

## 문제 해결

**`/jarfis` 커맨드를 찾을 수 없나요?**

프로젝트에 JARFIS가 설치되어 있는지 확인하세요. Claude Code에서 `/jarfis:install`을 다시 실행하세요.

**에이전트가 너무 오래 걸리나요?**

복잡한 기능은 여러 페이즈가 필요할 수 있습니다. `/jarfis:meeting`으로 상태를 확인하거나 에이전트 간 의사결정을 가속할 수 있습니다.

**세션 간 상태가 사라졌나요?**

프로젝트 루트의 `.jarfis-state.json`을 확인하세요. PreCompact 훅이 이 파일을 읽어 컨텍스트를 복원합니다.

**아티팩트가 나타나지 않나요?**

`.jarfis/works/` 디렉토리가 존재하고 Claude Code가 쓰기 권한을 가지고 있는지 확인하세요.
