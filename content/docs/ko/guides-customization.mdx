---
title: "Guides & Customization"
description: "JARFIS 고급 패턴: Meeting-to-Work 연결, role 설정, 프로젝트 프로파일, Gate 활용, 학습 시스템 관리."
category: "guides"
order: 1
locale: "ko"
lastUpdated: 2026-03-05
draft: false
---

# Guides & Customization

실제 프로젝트에서 JARFIS를 최대한 활용하기 위한 실용적인 패턴.

## Meeting-to-Work 연결

JARFIS의 가장 강력한 패턴 중 하나는 킥오프 미팅을 워크 세션의 컨텍스트로 연결하는 것입니다. 계획 결정과 실제 구현 사이의 정렬이 보장됩니다.

### Step 1: 킥오프 미팅 진행

```
/jarfis:meeting Define the authentication strategy for the mobile app
```

미팅은 구조화된 결정 사항과 아티팩트를 미팅 디렉토리에 저장합니다.

### Step 2: 미팅 참조와 함께 작업 시작

```
/jarfis:work Implement mobile auth with biometric login --meeting auth-strategy-meeting
```

`--meeting` 플래그는 미팅 출력물을 입력 컨텍스트로 연결합니다. 상태 파일에 `meeting_ref`와 `meeting_dir` 필드가 포함되고, Agent들은 워크플로우 전반에 걸쳐 미팅 결정 사항을 참조합니다.

이 패턴은 구현 전에 여러 이해관계자의 정렬이 필요한 복잡한 기능에 특히 유용합니다.

## `required_roles`로 Role 설정

모든 프로젝트가 9개의 Agent를 전부 필요로 하지는 않습니다. JARFIS는 `.jarfis-state.json`의 `required_roles` 필드로 어떤 Agent를 활성화할지 제어합니다:

```json
{
  "required_roles": {
    "backend": true,
    "frontend": true,
    "ux": false,
    "devops": false,
    "security": true
  }
}
```

### 일반적인 Role 패턴

**프론트엔드 전용 프로젝트** (예: 랜딩 페이지 리디자인):
```json
{
  "required_roles": {
    "backend": false,
    "frontend": true,
    "ux": true,
    "devops": false,
    "security": false
  }
}
```
Phase 3 (UX Design)이 활성화됩니다. Phase 4는 Frontend Engineer만 실행합니다. Backend와 DevOps Agent는 호출되지 않습니다.

**보안 요건이 있는 풀스택 프로젝트**:
```json
{
  "required_roles": {
    "backend": true,
    "frontend": true,
    "ux": true,
    "devops": true,
    "security": true
  }
}
```
모든 Phase가 활성화됩니다. Phase 4에서 BE, FE, DevOps가 병렬로 실행됩니다. Phase 5에 Security Engineer 리뷰가 포함됩니다.

**백엔드 API 전용 프로젝트**:
```json
{
  "required_roles": {
    "backend": true,
    "frontend": false,
    "ux": false,
    "devops": true,
    "security": true
  }
}
```
Phase 3 (UX Design)이 완전히 건너뜁니다. Phase 4에서 Backend와 DevOps만 실행됩니다.

JARFIS는 Phase T (Triage)에서 이 role을 자동으로 결정하지만, 필요에 따라 조정할 수 있습니다.

## 프로젝트 프로파일

프로젝트 프로파일은 JARFIS가 코드베이스 구조와 컨벤션을 깊이 이해할 수 있게 해줍니다.

### 프로파일 초기화

```
/jarfis:project-init
```

프로젝트를 분석하고 다음 내용이 담긴 `.jarfis/project-profile.md`를 생성합니다:
- 저장소 구조와 조직
- 의존성과 버전
- 빌드 도구와 스크립트
- 감지된 컨벤션과 패턴

### 프로파일 최신 상태 유지

프로젝트 구조가 크게 변경된 경우 (새 패키지 추가, 주요 의존성 업데이트 등):

```
/jarfis:project-update
```

수동으로 추가한 컨텍스트를 잃지 않으면서 프로파일을 갱신합니다.

## Gate 활용

Gate는 필수 사람 체크포인트입니다. 효과적으로 활용하는 방법을 소개합니다.

### Gate 1 — Discovery 이후

Gate 1에서 PRD와 타당성 평가를 검토합니다. 선택지:

- **승인**: Architecture & Planning (Phase 2)으로 진행
- **수정**: 구체적인 피드백 제공. PO와 Architect가 출력물을 수정하고 재제출
- **중단**: 워크플로우 전체 취소

**팁**: 방향을 바꾸기 가장 저렴한 지점입니다. Gate 1에서의 수정은 수 분이 걸리지만, Gate 3에서의 수정은 수 시간이 걸릴 수 있습니다.

### Gate 2 — Architecture & UX 이후

Gate 2에서 아키텍처 설계, 태스크 분해, (해당하는 경우) UX 명세를 검토합니다. 선택지:

- **승인**: Implementation (Phase 4)으로 진행
- **수정**: 아키텍처, 태스크 범위, UX 설계에 대한 변경 요청
- **중단**: 워크플로우 취소

**팁**: `tasks.md`를 꼼꼼히 확인하세요 — 여기서 구현될 내용이 정확히 정의됩니다. 여기서 누락된 태스크는 나중에 누락된 기능이 됩니다.

### Gate 3 — Review & QA 이후

Gate 3에서 완성된 구현, 테스트 결과, 보안 발견 사항을 검토합니다. 선택지:

- **승인**: Retrospective (Phase 6)으로 진행하고 마무리
- **수정 후 재검토**: 수정을 요청하고 또 다른 리뷰 사이클 실행
- **중단**: 워크플로우 취소
- **설계 재검토**: 리뷰 중 발견된 근본적인 설계 문제(병리적 패턴)에 대해 Phase 2로 복귀

## 학습 시스템 관리

JARFIS의 학습 시스템이 각 워크플로우를 이전보다 더 나아지게 만듭니다.

### 전역 학습: `~/.claude/jarfis-learnings.md`

홈 디렉토리에 위치하며 모든 프로젝트에서 공유됩니다. 다음 내용을 포함합니다:

- **Agent Hints**: "새로운 미들웨어를 생성하기 전 기존 미들웨어를 먼저 확인하라" 또는 "unhandled rejection을 방지하기 위해 `mutateAsync`는 try-catch와 함께 사용하라" 같은 행동 규칙
- **Workflow Patterns**: "monorepo 프로젝트는 패키지별로 영향 분석을 실행하라" 같은 검증된 접근 방식

이 파일은 모든 워크플로우의 Phase 0에서 로드되고 Phase 6 (Retrospective)에서 업데이트됩니다.

### 프로젝트 컨텍스트: `.jarfis/context.md`

Agent들이 워크플로우 전반에 걸쳐 참조하는 프로젝트별 지식:

```markdown
# Project Context

## Tech Stack
- Frontend: Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4
- Backend: FastAPI (Python 3.12), PostgreSQL 16, Redis
- Infrastructure: AWS ECS, Terraform, GitHub Actions

## Conventions
- API responses follow RFC 9457 Problem Details format
- All database models use UUID primary keys
- Frontend components follow atomic design
- Commit format: conventional commits (feat/fix/chore)

## Business Domain
- SaaS B2B platform for legal document management
- Compliance: SOC 2 Type II, GDPR

## Integration Constraints
- Auth: Auth0 (cannot change)
- Payment: Stripe (webhooks configured)
- Storage: S3 with presigned URLs
```

`context.md`가 구체적일수록 Agent 출력이 더 정확해집니다. 워크플로우 시작 전 투자할 수 있는 가장 효과적인 단일 작업입니다.

### `/jarfis:upgrade`로 학습 정리

시간이 지나면 `jarfis-learnings.md`에 오래되거나 중복된 항목이 쌓일 수 있습니다. upgrade 명령어로 검토하고 정리하세요:

```
/jarfis:upgrade
```

기존 학습 항목을 하나씩 검토하며 유지, 편집, 삭제를 선택할 수 있습니다.

## 컨텍스트 압축 이후 워크플로우 재개

장기 실행 워크플로우에서 Claude Code 컨텍스트 압축이 발생할 수 있습니다. JARFIS는 이로부터 복구하도록 설계되어 있습니다:

1. `.jarfis-state.json` 파일이 정확한 Phase와 진행 상태를 유지합니다
2. `last_checkpoint` 필드가 압축 전 진행 상황을 기록합니다
3. 디스크의 학습 파일과 아티팩트는 컨텍스트 압축의 영향을 받지 않습니다

컨텍스트 초기화 이후 재개하려면, 동일한 설명으로 `/jarfis:work`를 다시 실행하면 됩니다. JARFIS가 기존 `.jarfis-state.json`을 감지하고 처음부터 다시 시작하는 대신 마지막 체크포인트에서 재개합니다.

## 실용 예시

### 예시 1: 프론트엔드 전용 기능

```
/jarfis:work Redesign the dashboard with new chart components
```

JARFIS가 `required_roles.backend`를 false로 설정하고 백엔드 관련 작업을 건너뜁니다. Phase 3 (UX Design)이 활성화되고, Phase 4에서는 Frontend Engineer만 호출됩니다.

### 예시 2: 미팅 입력이 있는 풀스택

```
/jarfis:meeting Plan the multi-tenant architecture migration
/jarfis:work Implement multi-tenant data isolation --meeting tenant-architecture
```

미팅 결정 사항(예: "PostgreSQL에서 row-level security 사용")이 워크 세션으로 전달되어, Architect와 Backend Engineer가 합의된 접근 방식을 따르도록 보장합니다.

### 예시 3: 최소 오버헤드의 빠른 수정

```
/jarfis:work Fix the broken pagination on the orders list
```

단순한 버그 수정의 경우, JARFIS의 Triage Phase (Phase T)가 이를 Type C(단순 수정)로 분류하고 Phase 파이프라인을 간소화하여 UX Design이나 Operational Readiness 같은 무거운 Phase를 건너뜁니다.

### 예시 4: 문제 진단

```
/jarfis:health
```

워크플로우가 멈추거나 예상치 못한 동작을 보이면, health 명령어로 좀비 프로세스 및 기타 운영 문제를 진단합니다.

## 다음 단계

- [API Reference](/ko/docs/api-reference) — 완전한 명령어 및 설정 참고서
- [Architecture & Concepts](/ko/docs/concepts-overview) — 오케스트레이션 모델 심층 분석
- [Quick Start](/ko/docs/getting-started) — 설치 및 첫 워크플로우
