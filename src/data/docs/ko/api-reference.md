---
title: "API 레퍼런스"
description: "JARFIS 슬래시 커맨드, 설정 옵션, .jarfis-state.json 스키마, 아티팩트 프론트매터 명세 완전 참고서."
category: "api-reference"
order: 1
locale: "ko"
translationOf: "en/api-reference"
lastUpdated: 2026-03-05
draft: false
---

# API 레퍼런스

모든 JARFIS 커맨드, 설정 파일, 스키마에 대한 완전한 참고서.

## 슬래시 커맨드

### `/jarfis`

기능 또는 태스크에 대한 새 JARFIS 워크플로우를 시작합니다.

**구문**:
```
/jarfis [옵션] <설명>
```

**옵션**:

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `--feature <이름>` | string | 자동 생성 | 아티팩트 저장을 위한 기능 식별자 |
| `--skip-phases <목록>` | string | 없음 | 건너뛸 페이즈 목록 (예: `T,0`) |
| `--start-phase <ID>` | string | `T` | 시작할 페이즈 (T, 0, 1, 2, 3, 4, 4.5, 5, 6) |
| `--agents <목록>` | string | 전체 | 활성화할 에이전트 목록 |
| `--dry-run` | boolean | false | 실행 없이 페이즈만 계획 |

**예시**:

```
/jarfis OAuth2를 사용한 사용자 인증 시스템 구축

/jarfis --feature payment-v2 --start-phase 3 Stripe 체크아웃 구현

/jarfis --skip-phases T,0,1 --agents be,fe,qa 장바구니 계산 버그 수정
```

---

### `/jarfis:install`

현재 프로젝트에 JARFIS를 초기화합니다.

**구문**:
```
/jarfis:install [--force]
```

**생성 파일**:
- `.jarfis/CLAUDE.md` — JARFIS 컨텍스트 파일
- `.jarfis/context.md` — 프로젝트 컨텍스트 템플릿
- `.jarfis/jarfis-learnings.md` — 빈 학습 로그
- `.jarfis/works/` — 아티팩트 저장 디렉토리
- `.jarfis-state.json` — 상태 파일 (초기 빈 상태)

---

### `/jarfis:meeting`

구조화된 다중 에이전트 미팅을 소집합니다.

**구문**:
```
/jarfis:meeting [주제]
```

**예시**:

```
/jarfis:meeting

/jarfis:meeting 사용자 권한 데이터베이스 스키마 결정

/jarfis:meeting 충돌 해결: FE는 REST를 원하고 BE는 GraphQL을 선호
```

**출력**: `review.md`에 결정 요약이 추가됩니다. `.jarfis-state.json`이 업데이트됩니다.

---

### `/jarfis:status`

현재 워크플로우 상태를 표시합니다.

**구문**:
```
/jarfis:status [--feature <이름>]
```

---

### `/jarfis:resume`

마지막으로 저장된 페이즈에서 중단된 워크플로우를 재개합니다.

**구문**:
```
/jarfis:resume [--feature <이름>]
```

---

### `/jarfis:retrospective`

현재 기능에 대한 페이즈 6(회고)을 실행합니다.

**구문**:
```
/jarfis:retrospective [--feature <이름>]
```

`retrospective.md`를 생성하고 `jarfis-learnings.md`를 업데이트합니다.

---

## 설정 파일

### `.jarfis/CLAUDE.md`

메인 JARFIS 설정 파일. 모든 에이전트가 모든 세션 시작 시 읽습니다.

**지원 섹션**:

```markdown
## 에이전트 커스터마이징
에이전트별 지시 오버라이드

## 페이즈 게이트
페이즈 전환 전 사람 승인 요구 사항

## 아티팩트 템플릿
커스텀 템플릿 파일 참조

## 전역 규칙
모든 페이즈의 모든 에이전트에 적용되는 규칙
```

---

### `.jarfis/context.md`

모든 에이전트 프롬프트에 주입되는 프로젝트 컨텍스트. 최신 상태를 유지하세요.

**권장 섹션**:

```markdown
## 기술 스택
## 컨벤션
## 비즈니스 도메인
## 통합 제약 사항
## 팀 선호도
```

---

## `.jarfis-state.json` 스키마

```typescript
interface JarfisState {
  // 단일 기능 모드
  feature?: string;
  currentPhase?: Phase;
  completedPhases?: Phase[];
  agentContext?: Record<AgentId, string>;
  artifactsGenerated?: ArtifactName[];

  // 다중 기능 모드
  features?: Record<string, FeatureState>;
  activeFeature?: string;
}

type Phase = 'T' | '0' | '1' | '2' | '3' | '4' | '4.5' | '5' | '6';

type AgentId =
  | 'po' | 'architect' | 'tech-lead' | 'ux'
  | 'be' | 'fe' | 'devops' | 'qa' | 'security';

type ArtifactName =
  | 'press-release.md' | 'prd.md' | 'impact-analysis.md'
  | 'architecture.md' | 'api-spec.md' | 'tasks.md'
  | 'test-strategy.md' | 'ux-spec.md' | 'deployment-plan.md'
  | 'review.md' | 'retrospective.md';
```

---

## 페이즈 레퍼런스

### 페이즈 ID 및 설명

| ID | 이름 | 설명 |
|----|------|------|
| `T` | 킥오프 | 요구 사항 수집, press-release, 초기 PRD |
| `0` | 기반 정비 | 영향 분석, 기술 결정, 위험 평가 |
| `1` | 디자인 | UX 명세, API 계약 스켈레톤 |
| `2` | 아키텍처 | 전체 시스템 설계, 데이터 모델 |
| `3` | 구현 | 병렬 BE + FE 개발 |
| `4` | 통합 | API 연동, 엔드투엔드 통합 |
| `4.5` | QA & 보안 | 테스트 실행, 보안 감사 |
| `5` | 배포 | 인프라, CI/CD, 릴리즈 |
| `6` | 회고 | 학습 기록, 회고 |

---

## 다음 단계

- [빠른 시작](/ko/docs/getting-started) — 5분 만에 시작하기
- [아키텍처 & 개념](/ko/docs/concepts-overview) — 아키텍처 심층 분석
- [가이드 & 커스터마이징](/ko/docs/guides-customization) — 고급 패턴
- [GitHub](https://github.com/sana-lazystar/jarfis) — 소스 코드 및 이슈
