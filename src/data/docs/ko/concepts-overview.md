---
title: "Architecture & Concepts"
description: "JARFIS 핵심 아키텍처를 이해하세요: 오케스트레이션 모델, 9개 Agent, 9단계 Phase 파이프라인, 3개 Human Gate, 상태 관리, 학습 시스템."
category: "concepts"
order: 1
locale: "ko"
lastUpdated: 2026-03-05
draft: false
---

# Architecture & Concepts

JARFIS가 9개의 전문 AI Agent를 구조화된 Phase 파이프라인으로 조율해 프로덕션 소프트웨어를 출시하는 방법.

## 오케스트레이션 모델

JARFIS는 **Claude Code** 안에서 슬래시 명령어 워크플로우로 동작합니다. 별도 CLI 도구나 외부 서비스가 아니라, Claude Code 환경을 활용해 9개의 전문 Agent를 Phase 파이프라인으로 조율합니다:

```
/jarfis:work [description]
      |
      v
+---------------------------------------------------+
|              JARFIS Orchestrator                   |
|  (Phase pipeline, gate control, state management) |
+---------------------------------------------------+
      |
      |--- Phase T: Triage (classify request)
      |--- Phase 0: Pre-flight (git sync, load learnings)
      |--- Phase 1: Discovery (PO + Architect)
      |       +-- Gate 1: User approval
      |--- Phase 2: Architecture & Planning
      |--- Phase 3: UX Design (conditional)
      |       +-- Gate 2: User approval
      |--- Phase 4: Implementation (parallel BE/FE/DevOps)
      |--- Phase 4.5: Operational Readiness
      |--- Phase 5: Review & QA (parallel reviews)
      |       +-- Gate 3: User approval
      +--- Phase 6: Retrospective
```

## 9개 Agent 역할

각 Agent는 명확하게 정의된 책임 범위를 가집니다. Agent는 역할이 필요한 경우에만 활성화되며, `.jarfis-state.json`의 `required_roles` 필드로 제어됩니다:

| Agent | 주요 책임 |
|-------|-----------|
| **Product Owner (PO)** | 요구사항 명확화를 위한 역질문, Working Backwards 보도자료 작성, PRD 작성 |
| **Architect** | 타당성 평가, 영향 분석, 시스템 아키텍처 설계, ADR 작성 |
| **Tech Lead** | API spec 검토, 태스크 분해, 코드 리뷰, Retrospective 주도 |
| **UX Designer** | 화면 및 인터랙션 설계 (`required_roles.ux`가 true인 경우에만 활성화) |
| **Backend Engineer** | 백엔드 서비스, API, 데이터 모델 구현 |
| **Frontend Engineer** | UI 컴포넌트, 프론트엔드 로직, 통합 구현 |
| **DevOps/SRE** | 인프라, CI/CD 파이프라인, 배포 설정 구성 |
| **QA Engineer** | 테스트 전략 정의, QA 검증 수행 |
| **Security Engineer** | 사전 보안 분석 및 보안 리뷰 수행 |

## 9단계 Phase 파이프라인

JARFIS는 모든 워크플로우를 9개의 정의된 Phase로 구조화합니다. 각 Phase는 특정 입력값, 출력물, 담당 Agent를 가집니다. Phase는 프로젝트 요건에 따라 조건부로 건너뛸 수 있습니다.

### Phase T — Triage
들어온 요청을 A/B/C 유형으로 분류해 적절한 워크플로우 깊이와 필요한 Agent를 결정합니다.

### Phase 0 — Pre-flight
Git 상태를 동기화하고, 작업 브랜치를 생성하며, 학습 파일(`jarfis-learnings.md`, `context.md`, `project-profile.md`)을 로드합니다.

### Phase 1 — Discovery
PO가 역질문으로 요구사항을 완전히 파악한 뒤, Working Backwards 문서와 PRD를 작성합니다. Architect가 타당성을 평가합니다. 이후 **Gate 1** — 사용자가 승인, 수정, 또는 중단을 선택합니다.

### Phase 2 — Architecture & Planning
Architect가 영향 분석과 시스템 설계를 수행합니다. `api_spec_required`가 true이면 API spec을 작성합니다. Tech Lead가 태스크를 분해하고 QA Engineer가 테스트 전략을 정의합니다.

### Phase 3 — UX Design (조건부)
프로젝트에 UI 작업이 필요한 경우(`required_roles.ux`가 true)에만 활성화됩니다. UX Designer가 화면 설계와 인터랙션 명세를 작성합니다. Phase 2와 3 이후 **Gate 2**가 따라옵니다.

### Phase 4 — Implementation
Backend, Frontend, DevOps 엔지니어가 병렬로 작업하며, 각자의 역할에 해당하는 부분만 구현합니다. 진행 상황은 `tasks.md`로 추적합니다.

### Phase 4.5 — Operational Readiness
Review Phase 전에 배포 전략, 롤백 계획, 운영 준비 상태를 점검합니다.

### Phase 5 — Review & QA
API 계약 검증이 먼저 실행된 뒤, Tech Lead, QA Engineer, Security Engineer의 병렬 리뷰가 진행됩니다. **Gate 3** — 사용자가 승인, 수정 후 재검토 요청, 중단, 또는 근본적인 설계 문제 발견 시 설계 재검토를 선택합니다.

### Phase 6 — Retrospective
학습 내용이 전역 `jarfis-learnings.md`와 프로젝트별 `context.md`에 축적되어 향후 워크플로우를 개선합니다.

## 3개의 Human Gate

Gate는 사용자가 워크플로우 방향을 통제하는 필수 승인 체크포인트입니다:

| Gate | 위치 | 선택지 |
|------|------|--------|
| **Gate 1** | Phase 1 이후 | 승인 / 수정 / 중단 |
| **Gate 2** | Phase 2 & 3 이후 | 승인 / 수정 / 중단 |
| **Gate 3** | Phase 5 이후 | 승인 / 수정 후 재검토 / 중단 / 설계 재검토 (근본 설계 문제 시) |

Gate를 통과하기 전까지 어떤 Phase도 진행되지 않습니다.

## 11개 아티팩트

JARFIS 워크플로우는 작업 디렉토리에 최대 11개의 구조화된 문서를 생성합니다:

| 아티팩트 | Phase | 작성자 |
|---------|-------|--------|
| Working Backwards (보도자료) | 1 | PO |
| PRD | 1 | PO |
| 타당성 평가 | 1 | Architect |
| 영향 분석 | 2 | Architect |
| Architecture / ADR | 2 | Architect |
| API specification | 2 | Architect / Tech Lead |
| 태스크 분해 (`tasks.md`) | 2 | Tech Lead |
| 테스트 전략 | 2 | QA Engineer |
| UX specification | 3 | UX Designer |
| 배포 / 롤백 계획 | 4.5 | DevOps/SRE |
| 리뷰 보고서 | 5 | Tech Lead / QA / Security |

## 상태 관리

JARFIS는 프로젝트 루트의 `.jarfis-state.json`에 워크플로우 상태를 추적합니다. 실제 스키마는 다음과 같습니다:

```json
{
  "work_name": "auth-system",
  "docs_dir": ".jarfis/works/2026-03-05/auth-system",
  "branch": "jarfis/auth-system",
  "base_branch": "main",
  "current_phase": 4,
  "required_roles": {
    "backend": true,
    "frontend": true,
    "ux": true,
    "devops": false,
    "security": true
  },
  "api_spec_required": true,
  "workspace": {
    "type": "monorepo",
    "projects": ["packages/api", "packages/web"]
  },
  "phases": {
    "T": { "status": "completed" },
    "0": { "status": "completed" },
    "1": { "status": "completed" },
    "2": { "status": "completed" },
    "3": { "status": "completed" },
    "4": { "status": "in_progress" },
    "4.5": { "status": "pending" },
    "5": { "status": "pending" },
    "6": { "status": "pending" }
  },
  "last_checkpoint": {
    "timestamp": "2026-03-05T14:30:00Z",
    "phase": 4,
    "summary": "Backend API implementation in progress"
  }
}
```

주요 필드:
- **`current_phase`** — 현재 활성 Phase를 나타내는 숫자 또는 `"done"`
- **`required_roles`** — 어떤 Agent를 활성화할지 제어하는 boolean 플래그
- **`api_spec_required`** — API specification 문서 작성 필요 여부
- **`workspace`** — 프로젝트 구조 메타데이터 (monorepo, multi-project 등)
- **`phases`** — Phase별 상태 추적 (pending / in_progress / completed / skipped)
- **`last_checkpoint`** — 마지막으로 저장된 진행 지점의 타임스탬프와 요약

## 학습 시스템

JARFIS는 두 단계의 학습 시스템을 통해 워크플로우를 거듭할수록 발전합니다:

### 전역 학습: `~/.claude/jarfis-learnings.md`
사용자 홈 디렉토리에 저장되어 모든 프로젝트에서 공유됩니다. 다음 내용을 포함합니다:
- **Agent Hints** — Retrospective에서 축적된 행동 규칙
- **Workflow Patterns** — 효과가 검증된 반복 패턴

### 프로젝트 컨텍스트: `.jarfis/context.md`
Agent 프롬프트에 주입되는 프로젝트별 지식:
- 기술 스택 세부 사항과 컨벤션
- 비즈니스 도메인 지식
- 통합 제약 사항과 기존 패턴

### 프로젝트 프로파일: `.jarfis/project-profile.md`
`/jarfis:project-init`으로 생성되고 `/jarfis:project-update`로 갱신됩니다. 프로젝트 구조, 의존성, 설정을 설명합니다.

## 미팅 시스템

`/jarfis:meeting` 명령어는 계획을 위한 구조화된 킥오프 미팅을 시작합니다:

```
/jarfis:meeting Define the authentication strategy for the mobile app
```

미팅 결과는 이후 워크플로우에서 `--meeting` 플래그로 참조할 수 있습니다:

```
/jarfis:work Implement auth system --meeting auth-strategy-meeting
```

이를 통해 미팅에서 결정된 사항이 워크플로우의 입력 컨텍스트로 연결되어, 계획과 실행 간 정렬이 보장됩니다.

## 설계 원칙

1. **전문화** — 각 Agent는 하나의 도메인에서 깊은 전문성을 가집니다. 모든 것을 하려는 Agent는 없습니다
2. **단계적 전달** — 구조화된 Phase는 완전성을 보장합니다. 어떤 단계도 실수로 건너뛰지 않습니다
3. **Human Gate** — 중요한 결정은 3개의 정해진 체크포인트에서 명시적 사용자 승인을 요구합니다
4. **조건부 활성화** — Agent와 Phase는 관련이 있을 때만 활성화됩니다 (예: CLI 도구에는 UX Phase 없음)
5. **Stateful** — 작업은 `.jarfis-state.json`을 통해 세션 경계를 넘어 유지됩니다
6. **지속적 학습** — 모든 Retrospective는 전역 및 프로젝트 학습을 통해 향후 워크플로우를 개선합니다
7. **Claude Code 네이티브** — 외부 서비스 없이 개발 환경 내에서 완전히 실행됩니다

## 다음 단계

- [Quick Start](/ko/docs/getting-started) — JARFIS 설치 및 첫 워크플로우 실행
- [API Reference](/ko/docs/api-reference) — 모든 명령어와 설정 상세 정보
- [Guides & Customization](/ko/docs/guides-customization) — 고급 워크플로우 패턴
