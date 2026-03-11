---
title: "API Reference"
description: "JARFIS 슬래시 명령어, .jarfis-state.json 스키마, 학습 파일 구조, Phase 명세 완전 참고서."
category: "api-reference"
order: 1
locale: "ko"
lastUpdated: 2026-03-05
draft: false
---

# API Reference

모든 JARFIS 명령어, 상태 스키마, 설정 파일에 대한 완전한 참고서.

## 슬래시 명령어

### `/jarfis:work`

JARFIS 워크플로우를 시작하는 기본 명령어입니다. Triage부터 Retrospective까지 전체 Phase 파이프라인을 실행합니다.

**구문**:
```
/jarfis:work [description]
/jarfis:work [description] --meeting [meeting-name]
```

**파라미터**:

| 파라미터 | 필수 | 설명 |
|---------|------|------|
| `description` | 예 | 구현할 기능 또는 태스크에 대한 자연어 설명 |
| `--meeting` | 아니오 | 입력 컨텍스트로 사용할 이전 `/jarfis:meeting` 세션 이름 |

**예시**:

```
/jarfis:work Build a user authentication system with JWT tokens

/jarfis:work Add Stripe subscription billing --meeting billing-kickoff

/jarfis:work Fix the broken cart calculation on checkout page
```

---

### `/jarfis:meeting`

계획 및 정렬을 위한 구조화된 킥오프 미팅을 시작합니다. 미팅 결과는 저장되어 이후 `/jarfis:work` 세션에서 참조할 수 있습니다.

**구문**:
```
/jarfis:meeting [topic]
```

**파라미터**:

| 파라미터 | 필수 | 설명 |
|---------|------|------|
| `topic` | 예 | 미팅의 주제 또는 안건 |

**예시**:

```
/jarfis:meeting Define the authentication strategy for the mobile app

/jarfis:meeting Decide on database schema for multi-tenant architecture
```

`--meeting`으로 미팅을 참조하면, 상태 파일에 미팅 아티팩트를 연결하는 `meeting_ref`와 `meeting_dir` 필드가 포함됩니다.

---

### `/jarfis:project-init`

현재 코드베이스를 분석해 프로젝트 프로파일을 생성합니다. 프로젝트 구조, 의존성, 컨벤션 정보가 담긴 `.jarfis/project-profile.md`를 생성합니다.

**구문**:
```
/jarfis:project-init
```

---

### `/jarfis:project-update`

마지막 초기화 이후 코드베이스 변경 사항을 반영해 기존 프로젝트 프로파일을 업데이트합니다.

**구문**:
```
/jarfis:project-update
```

---

### `/jarfis:health`

JARFIS 환경의 좀비 프로세스 및 기타 운영 문제를 진단합니다.

**구문**:
```
/jarfis:health
```

---

### `/jarfis:upgrade`

학습 항목을 관리합니다 — 학습 시스템의 항목을 검토, 편집, 정리합니다.

**구문**:
```
/jarfis:upgrade
```

---

### `/jarfis:version`

JARFIS 버전 정보를 표시하고 관리합니다.

**구문**:
```
/jarfis:version
```

---

### `/jarfis:distill`

프롬프트 증류를 수행합니다 — 프롬프트 내용을 최적화하고 압축합니다.

**구문**:
```
/jarfis:distill
```

---

## 상태 파일: `.jarfis-state.json`

상태 파일은 현재 워크플로우 진행 상황을 추적합니다. 프로젝트 루트에 위치합니다.

### 스키마

```json
{
  "work_name": "string",
  "docs_dir": "string (path to artifact directory)",
  "branch": "string (Git branch name)",
  "base_branch": "string (base branch for merge)",
  "current_phase": "number | \"done\"",
  "required_roles": {
    "backend": "boolean",
    "frontend": "boolean",
    "ux": "boolean",
    "devops": "boolean",
    "security": "boolean"
  },
  "api_spec_required": "boolean",
  "workspace": {
    "type": "\"monorepo\" | \"multi-project\"",
    "projects": ["string (project paths)"]
  },
  "phases": {
    "T": { "status": "pending | in_progress | completed | skipped" },
    "0": { "status": "..." },
    "1": { "status": "..." },
    "2": { "status": "..." },
    "3": { "status": "..." },
    "4": { "status": "..." },
    "4.5": { "status": "..." },
    "5": { "status": "..." },
    "6": { "status": "..." }
  },
  "last_checkpoint": {
    "timestamp": "ISO 8601 string",
    "phase": "number",
    "summary": "string"
  },
  "meeting_ref": "string (optional, meeting name)",
  "meeting_dir": "string (optional, path to meeting artifacts)"
}
```

### 필드 참고

| 필드 | 타입 | 설명 |
|------|------|------|
| `work_name` | string | 현재 워크플로우 식별자 |
| `docs_dir` | string | 아티팩트가 저장되는 경로 |
| `branch` | string | 이 워크플로우를 위해 생성된 Git 브랜치 |
| `base_branch` | string | 병합 대상 브랜치 |
| `current_phase` | number 또는 `"done"` | 현재 활성 Phase 번호 |
| `required_roles` | object | 어떤 Agent 역할이 활성화되는지 제어하는 boolean 플래그 |
| `api_spec_required` | boolean | API specification 문서 필요 여부 |
| `workspace` | object | 프로젝트 구조 메타데이터 |
| `phases` | object | Phase별 상태 (pending / in_progress / completed / skipped) |
| `last_checkpoint` | object | 마지막으로 저장된 진행 지점의 타임스탬프와 요약 |
| `meeting_ref` | string | 연결된 미팅 참조 (`--meeting` 사용 시) |
| `meeting_dir` | string | 연결된 미팅 아티팩트 경로 |

---

## 학습 파일

### 전역 학습: `~/.claude/jarfis-learnings.md`

사용자 홈 디렉토리에 위치하며, 모든 프로젝트에서 공유됩니다. 두 가지 주요 섹션을 포함합니다:

- **Agent Hints** — Retrospective에서 축적된 행동 규칙 및 가이드라인
- **Workflow Patterns** — 일반적인 시나리오에 대한 검증된 패턴

이 파일은 모든 워크플로우의 Phase 0 (Pre-flight)에서 로드됩니다.

### 프로젝트 컨텍스트: `.jarfis/context.md`

Agent 프롬프트에 주입되는 프로젝트별 컨텍스트. 기술 스택 세부 사항, 컨벤션, 도메인 지식, 통합 제약 사항을 포함합니다.

### 프로젝트 프로파일: `.jarfis/project-profile.md`

`/jarfis:project-init`으로 자동 생성됩니다. 프로젝트 구조, 의존성, 빌드 도구, 설정을 설명합니다. `/jarfis:project-update`로 갱신합니다.

---

## Phase 참고

| Phase | 이름 | 설명 |
|-------|------|------|
| T | Triage | 요청 분류 (A/B/C 유형 결정) |
| 0 | Pre-flight | Git 동기화, 브랜치 생성, 학습 파일 로드 |
| 1 | Discovery | PO 역질문, Working Backwards, PRD, 타당성 평가 |
| 2 | Architecture & Planning | 영향 분석, 시스템 설계, API spec (조건부), 태스크 분해, 테스트 전략 |
| 3 | UX Design | 화면 설계, 인터랙션 설계 (조건부: UI가 필요한 경우에만) |
| 4 | Implementation | BE/FE/DevOps 병렬 구현 (태스크가 있는 부분만) |
| 4.5 | Operational Readiness | 배포 전략, 롤백 계획, 운영 준비 점검 |
| 5 | Review & QA | API 계약 검증, Tech Lead + QA + Security 병렬 리뷰 |
| 6 | Retrospective | 학습 축적 (전역 learnings + 프로젝트 context) |

## Gate 참고

| Gate | 위치 | 사용자 선택지 |
|------|------|--------------|
| Gate 1 | Phase 1 이후 | 승인 / 수정 / 중단 |
| Gate 2 | Phase 2 & 3 이후 | 승인 / 수정 / 중단 |
| Gate 3 | Phase 5 이후 | 승인 / 수정 후 재검토 / 중단 / 설계 재검토 (근본 설계 문제 시) |

---

## 관련 문서

- [Quick Start](/ko/docs/getting-started) — 설치 및 첫 워크플로우 실행
- [Architecture & Concepts](/ko/docs/concepts-overview) — 오케스트레이션 모델 심층 분석
- [Guides & Customization](/ko/docs/guides-customization) — 고급 워크플로우 패턴
