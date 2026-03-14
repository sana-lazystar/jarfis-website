---
title: "빠른 시작"
description: "JARFIS를 설치하고, 9개의 전문 Agent와 구조화된 Phase로 첫 AI 기반 소프트웨어 개발 워크플로우를 실행하세요."
category: "getting-started"
order: 1
locale: "ko"
lastUpdated: 2026-03-05
draft: false
---

# 빠른 시작

AI와 함께 소프트웨어를 출시하세요 — 슬래시 명령어 하나, 9개의 전문 Agent, 사람이 승인하는 Human Gate로 구성된 구조화된 Phase.

## 사전 요건

시작하기 전에 아래 항목을 준비하세요:

- **Claude Code** (Anthropic) — JARFIS는 Claude Code 안에서 슬래시 명령어 워크플로우로 동작합니다
- API 접근 권한이 있는 Claude 계정
- **Git** >= 2.x (Phase 0의 브랜치 관리에 필요)
- [JARFIS GitHub 저장소](https://github.com/sana-lazystar/jarfis)를 클론하거나 접근 가능한 상태

## 설치

JARFIS는 GitHub 저장소의 `install.sh` 스크립트로 설치합니다. 터미널에서 다음 명령어를 실행하세요:

```bash
bash install.sh
```

이 명령어는 Claude Code 환경에 JARFIS 슬래시 명령어를 등록합니다. 설치 후 다음과 같은 프로젝트 구조가 생성됩니다:

```
your-project/
├── .jarfis/
│   ├── context.md             # 프로젝트별 컨텍스트
│   └── project-profile.md     # 프로젝트 프로파일
├── .jarfis-state.json         # 워크플로우 상태 추적
└── ~/.claude/
    └── jarfis-learnings.md    # 전역 학습 파일 (프로젝트 간 공유)
```

> **참고**: `/jarfis:install` 명령어는 존재하지 않습니다. 설치는 반드시 `bash install.sh`로만 진행합니다.

## 첫 워크플로우 실행

Claude Code에서 프로젝트 디렉토리를 열고 워크플로우를 시작하세요:

```
/jarfis:work Build a user authentication system with JWT tokens
```

JARFIS는 요청을 분류(Phase T — Triage)한 뒤, 전문 AI Agent가 담당하는 구조화된 Phase를 순서대로 안내합니다.

## 9개의 Phase

모든 워크플로우는 최대 9개의 Phase를 거칩니다. 해당하지 않는 경우 Phase는 건너뜁니다(예: UI가 필요 없으면 Phase 3 생략):

| Phase | 이름 | 수행 내용 |
|-------|------|-----------|
| T | Triage | 요청을 A/B/C 유형으로 분류 |
| 0 | Pre-flight | Git 동기화, 브랜치 생성, 학습 파일 로드 |
| 1 | Discovery | PO의 역질문, Working Backwards, PRD, 타당성 검토 |
| 2 | Architecture & Planning | 영향 분석, 설계, API spec, 태스크 분해, 테스트 전략 |
| 3 | UX Design | 화면 설계 (조건부 — UI가 필요한 경우에만) |
| 4 | Implementation | BE/FE/DevOps 병렬 구현 |
| 4.5 | Operational Readiness | 배포 전략, 롤백 계획, 운영 준비 |
| 5 | Review & QA | API 계약 검증, Tech Lead + QA + Security 리뷰 |
| 6 | Retrospective | 학습 축적 (전역 learnings + 프로젝트 context) |

## 9개의 Agent

JARFIS는 9개의 전문 Agent를 조율하며, 각 Agent는 현재 Phase와 프로젝트 요건에 맞는 경우에만 활성화됩니다:

| Agent | 역할 |
|-------|------|
| **Product Owner (PO)** | 역질문, Working Backwards, PRD 작성 |
| **Architect** | 타당성 평가, 영향 분석, 아키텍처 설계, ADR |
| **Tech Lead** | API spec 검토, 태스크 분해, 코드 리뷰, Retrospective |
| **UX Designer** | 화면 설계, 인터랙션 설계 |
| **Backend Engineer** | 백엔드 구현 |
| **Frontend Engineer** | 프론트엔드 구현 |
| **DevOps/SRE** | 인프라 및 CI/CD 구현 |
| **QA Engineer** | 테스트 전략, QA 검증 |
| **Security Engineer** | 사전 보안 분석, 보안 리뷰 |

## Human Gate

JARFIS는 다음 단계로 진행하기 전에 명시적 승인이 필요한 3개의 Gate를 포함합니다:

| Gate | 시점 | 선택지 |
|------|------|--------|
| Gate 1 | Phase 1 (Discovery) 이후 | 승인 / 수정 / 중단 |
| Gate 2 | Phase 2 & 3 (Architecture + UX) 이후 | 승인 / 수정 / 중단 |
| Gate 3 | Phase 5 (Review & QA) 이후 | 승인 / 수정 후 재검토 / 중단 / 설계 재검토 |

이 Gate 덕분에 주요 마일스톤마다 방향을 직접 통제할 수 있습니다.

## 다음 단계

- [Architecture & Concepts](/ko/docs/concepts-overview)에서 JARFIS 전체 오케스트레이션 모델을 이해하세요
- [API Reference](/ko/docs/api-reference)에서 모든 명령어와 설정을 확인하세요
- [Guides & Customization](/ko/docs/guides-customization)에서 고급 워크플로우 패턴을 살펴보세요
