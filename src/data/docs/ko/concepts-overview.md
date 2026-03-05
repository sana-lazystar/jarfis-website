---
title: "아키텍처 & 개념"
description: "JARFIS 핵심 아키텍처: 9명의 전문 에이전트, 8개 이상의 구조화된 페이즈, 11개 아티팩트, PreCompact 상태 시스템을 이해하세요."
category: "concepts"
order: 1
locale: "ko"
translationOf: "en/concepts-overview"
lastUpdated: 2026-03-05
draft: false
---

# 아키텍처 & 개념

JARFIS가 9명의 전문 AI 에이전트를 조율해 프로덕션 소프트웨어를 배포하는 방법.

## 오케스트레이션 모델

JARFIS는 **Claude Code를 오케스트레이터**로 활용합니다. 단일 에이전트 시스템과 달리, JARFIS는 9명의 전문 에이전트를 — 각기 고유한 역할을 가진 — 구조화된 페이즈 파이프라인을 통해 조율합니다:

```
/jarfis 커맨드
      │
      ▼
┌─────────────────────────────────────────────────────┐
│              JARFIS 오케스트레이터                    │
│  (페이즈 조율, 아티팩트 라우팅, 상태 관리)             │
└─────────────────────────────────────────────────────┘
      │
      ├──► PO 에이전트          (요구 사항, 사용자 스토리)
      ├──► Architect           (시스템 설계, ADR)
      ├──► Tech Lead           (표준, 리뷰, 조율)
      ├──► UX Designer         (와이어프레임, UX 명세)
      ├──► BE Engineer         (백엔드 구현)
      ├──► FE Engineer         (프론트엔드 구현)
      ├──► DevOps/SRE          (인프라, CI/CD)
      ├──► QA Engineer         (테스트, 품질 게이트)
      └──► Security Engineer   (보안 검토, CVE 분석)
```

## 9명의 에이전트 역할

| 에이전트 | 주요 책임 | 핵심 아티팩트 |
|----------|-----------|--------------|
| **Product Owner (PO)** | 요구 사항 정의, 사용자 스토리 작성, 백로그 우선순위 | `press-release.md`, `prd.md` |
| **Architect** | 시스템 설계, 기술 결정, ADR 문서화 | `architecture.md`, `impact-analysis.md` |
| **Tech Lead** | 코드 표준, PR 리뷰 기준, 에이전트 간 조율 | `tasks.md`, `review.md` |
| **UX Designer** | 사용자 흐름, 와이어프레임, 컴포넌트 명세 | `ux-spec.md` |
| **BE Engineer** | API 구현, 데이터 모델, 백엔드 서비스 | `api-spec.md`, 백엔드 코드 |
| **FE Engineer** | UI 컴포넌트, 상태 관리, 프론트엔드 통합 | 프론트엔드 코드 |
| **DevOps/SRE** | 인프라 코드, CI/CD 파이프라인, 배포 | `deployment-plan.md` |
| **QA Engineer** | 테스트 전략, 테스트 케이스 작성, 품질 게이트 | `test-strategy.md` |
| **Security Engineer** | 위협 모델링, 취약점 검토, 컴플라이언스 | `review.md` 내 보안 리뷰 |

## 페이즈 파이프라인 (8개 이상)

JARFIS는 모든 기능 개발을 정의된 페이즈를 통해 구조화합니다. 각 페이즈는 특정 에이전트, 입력값, 필수 출력물을 가집니다:

### 페이즈 T — 킥오프
**목적**: 기능 범위를 확립하고 요구 사항을 수집합니다.
**에이전트**: PO, Architect
**산출물**: 초기 `press-release.md`, 초안 `prd.md`

### 페이즈 0 — 기반 정비
**목적**: 기술 및 아키텍처 결정.
**에이전트**: Architect, Tech Lead
**산출물**: `impact-analysis.md`, 초기 `architecture.md`

### 페이즈 1 — 디자인
**목적**: UX 명세 및 API 계약 정의.
**에이전트**: UX Designer, Architect, BE Engineer
**산출물**: `ux-spec.md`, `api-spec.md` 스켈레톤

### 페이즈 2 — 아키텍처
**목적**: 전체 시스템 설계, 데이터 모델, 서비스 경계.
**에이전트**: Architect, BE Engineer, FE Engineer
**산출물**: 최종 `architecture.md`, `api-spec.md`

### 페이즈 3 — 구현
**목적**: 백엔드와 프론트엔드 병렬 개발.
**에이전트**: BE Engineer, FE Engineer (병렬 실행)
**산출물**: 소스 코드, `tasks.md` 진행 업데이트

### 페이즈 4 — 통합
**목적**: API 연동, 엔드투엔드 통합.
**에이전트**: BE Engineer, FE Engineer, Tech Lead
**산출물**: 통합된 코드, 통합 `review.md`

### 페이즈 4.5 — QA & 보안
**목적**: 테스트 실행, 보안 감사.
**에이전트**: QA Engineer, Security Engineer
**산출물**: `test-strategy.md`, `review.md` 내 보안 결과

### 페이즈 5 — 배포
**목적**: 프로덕션 배포, 모니터링 설정.
**에이전트**: DevOps/SRE, Tech Lead
**산출물**: `deployment-plan.md`, 인프라 코드

### 페이즈 6 — 회고
**목적**: 학습 기록, 향후 반복 개선.
**에이전트**: 모든 에이전트 참여
**산출물**: `retrospective.md`, `jarfis-learnings.md` 업데이트

## 11개 아티팩트

모든 JARFIS 워크플로우는 `.jarfis/works/{날짜}/{기능명}/`에 최대 11개의 구조화된 아티팩트를 생성합니다:

| 아티팩트 | 목적 | 주요 작성자 |
|---------|------|------------|
| `press-release.md` | 고객 언어로 작성된 기능 발표문 | PO |
| `prd.md` | 제품 요구 사항 문서 | PO |
| `impact-analysis.md` | 기술적 위험 및 범위 분석 | Architect |
| `architecture.md` | 시스템 설계, 컴포넌트 다이어그램, ADR | Architect |
| `api-spec.md` | API 계약 (엔드포인트, 타입, 인증) | Architect / BE |
| `tasks.md` | 페이즈별 개발 태스크 분해 | Tech Lead |
| `test-strategy.md` | 테스트 계획, 커버리지 목표, 테스트 케이스 | QA Engineer |
| `ux-spec.md` | 와이어프레임, 컴포넌트 명세, 인터랙션 디자인 | UX Designer |
| `deployment-plan.md` | 릴리즈 계획, 롤백 전략, 모니터링 | DevOps/SRE |
| `review.md` | 구현 후 코드 & 보안 리뷰 | Tech Lead / Security |
| `retrospective.md` | 페이즈 학습 및 개선 액션 | 모든 에이전트 |

## 상태 관리: `.jarfis-state.json`

JARFIS는 프로젝트 루트의 `.jarfis-state.json`에 워크플로우 상태를 저장합니다:

```json
{
  "feature": "auth-system",
  "currentPhase": "4",
  "completedPhases": ["T", "0", "1", "2", "3"],
  "agentContext": {
    "po": "prd-approved",
    "architect": "architecture-finalized",
    "be": "api-implemented",
    "fe": "components-built"
  },
  "artifactsGenerated": [
    "prd.md", "architecture.md", "api-spec.md", "tasks.md", "ux-spec.md"
  ]
}
```

이 파일은 모든 Claude Code 세션 시작 시 **PreCompact 훅**에 의해 읽혀, 정확한 페이즈와 컨텍스트를 복원합니다. 여러 세션에 걸쳐 작업을 이어가도 상태가 유지됩니다.

## PreCompact 훅

PreCompact 훅은 컨텍스트 압축 전에 실행되는 Claude Code 생명주기 통합입니다:

1. 현재 페이즈와 에이전트 상태를 `.jarfis-state.json`에서 **읽습니다**
2. 관련 아티팩트 요약을 압축된 컨텍스트에 **주입합니다**
3. `jarfis-learnings.md`의 중요한 결정 사항과 학습을 **보존합니다**
4. 현재 페이즈에 맞는 활성 에이전트 관점을 **복원합니다**

이를 통해 여러 세션에 걸쳐 진행되는 장기 기능 개발에서도 중요한 컨텍스트가 손실되지 않습니다.

## 학습 시스템

JARFIS는 두 가지 학습 메커니즘을 통해 지속적으로 개선됩니다:

### `jarfis-learnings.md`
페이즈 6 회고 이후 업데이트되는 프로젝트 수준의 지식 베이스. 다음을 포함합니다:
- 이 코드베이스에서 잘 작동하는 반복 패턴
- 피해야 할 안티패턴
- 팀 선호도와 컨벤션

### `context.md`
모든 에이전트 프롬프트에 주입되는 프로젝트별 컨텍스트:
- 기술 스택 세부 사항
- 기존 컨벤션
- 비즈니스 도메인 지식
- 통합 제약 조건

## 미팅 시스템 (`/jarfis:meeting`)

에이전트들이 블로커를 해결하거나, 공동 결정을 내리거나, 범위를 정렬해야 할 때 구조화된 미팅을 소집할 수 있습니다:

```
/jarfis:meeting
```

미팅 시스템은:
- 현재 블로커에 관련된 에이전트를 식별합니다
- 에이전트 관점 간의 진행 토론을 구조화합니다
- `review.md` 또는 관련 아티팩트에 결정 사항을 기록합니다
- 해결된 항목으로 `.jarfis-state.json`을 업데이트합니다

## 설계 원칙

1. **전문화** — 각 에이전트는 한 도메인에서 깊은 전문성을 가집니다. 모든 것을 하려는 에이전트는 없습니다
2. **아티팩트 중심** — 모든 페이즈는 검토 가능한, 사람이 읽을 수 있는 산출물을 생성합니다
3. **페이즈 게이트** — 이전 페이즈의 아티팩트 없이는 다음 페이즈가 시작되지 않습니다
4. **상태 유지** — 작업은 `.jarfis-state.json`을 통해 세션 경계를 넘어 유지됩니다
5. **학습** — 모든 프로젝트는 학습 시스템을 통해 다음 프로젝트를 더 빠르게 만듭니다
6. **Claude Code 네이티브** — 외부 서비스 없이 개발 환경 내에서 완전히 실행됩니다

## 다음 단계

- [빠른 시작](/ko/docs/getting-started) — 첫 `/jarfis` 워크플로우 실행
- [가이드 & 커스터마이징](/ko/docs/guides-customization) — 고급 설정 패턴
- [API 레퍼런스](/ko/docs/api-reference) — 모든 커맨드와 옵션
