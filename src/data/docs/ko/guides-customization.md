---
title: "가이드 & 커스터마이징"
description: "고급 JARFIS 패턴: 에이전트 프롬프트 커스터마이징, context.md 설정, 페이즈 건너뛰기, 미팅 진행, 학습 시스템 관리."
category: "guides"
order: 1
locale: "ko"
translationOf: "en/guides-customization"
lastUpdated: 2026-03-05
draft: false
---

# 가이드 & 커스터마이징

실제 프로젝트에서 JARFIS를 최대한 활용하기 위한 고급 패턴.

## 프로젝트 컨텍스트 설정

가장 임팩트 있는 커스터마이징은 잘 작성된 `context.md`입니다. 모든 에이전트는 어떤 액션을 취하기 전에 이 파일을 읽습니다.

### `context.md` 구조

```markdown
# 프로젝트 컨텍스트

## 기술 스택
- 프론트엔드: Next.js 15 (App Router), TypeScript strict, Tailwind CSS 4
- 백엔드: FastAPI (Python 3.12), PostgreSQL 16, Redis
- 인프라: AWS ECS, Terraform, GitHub Actions

## 컨벤션
- API 응답은 RFC 9457 Problem Details 형식 준수
- 모든 데이터베이스 모델은 UUID 기본키 사용
- 프론트엔드 컴포넌트는 아토믹 디자인 (atoms/molecules/organisms) 준수
- 커밋 형식: conventional commits (feat/fix/chore/refactor)

## 비즈니스 도메인
- 법률 문서 관리를 위한 SaaS B2B 플랫폼
- 컴플라이언스 요구 사항: SOC 2 Type II, GDPR
- 주요 사용자: 대기업 (500명 이상) 법무팀

## 통합 제약 사항
- 기존 인증: Auth0 (변경 불가)
- 결제: Stripe (웹훅 이미 설정됨)
- 파일 스토리지: S3 presigned URL
```

`context.md`가 구체적일수록 에이전트 산출물이 더 정확해집니다. JARFIS 워크플로우 시작 전 투자할 수 있는 가장 효과적인 30분입니다.

## 에이전트 동작 커스터마이징

### 페이즈별 에이전트 오버라이드

`.jarfis/CLAUDE.md`에서 에이전트별 지시 사항을 추가할 수 있습니다:

```markdown
## 에이전트 커스터마이징

### PO 에이전트
- 사용자 스토리는 항상 "나는 [역할]로서, [액션]을 원한다. 왜냐하면 [혜택]이기 때문이다" 형식으로 작성
- 인수 기준은 테스트 가능해야 함 (Given/When/Then 형식)
- 기술적 난이도가 아닌 비즈니스 가치 기준으로 우선순위 결정

### Security Engineer
- 모든 의존성을 먼저 내부 취약점 데이터베이스와 대조
- 인증 관련 보안 노트에는 GDPR 조항 참조 필수
- 모든 암호화 연산은 보안 정책에서 승인된 알고리즘 사용

### DevOps/SRE
- terraform-modules/의 Terraform 모듈 라이브러리 활용
- 블루/그린 배포만 허용 가능한 배포 전략
- 모든 모니터링 설정에 PagerDuty 통합 필수
```

### 페이즈 건너뛰기

핫픽스나 소규모 변경의 경우 페이즈를 건너뛸 수 있습니다:

```
/jarfis --skip-phases T,0,1 --start-phase 3 로그인 리다이렉트 버그 수정
```

주의하여 사용하세요 — 페이즈 건너뛰기는 해당 페이즈의 아티팩트가 생성되지 않음을 의미합니다.

## 학습 시스템 활용

### 수동으로 학습 추가

중요한 발견이 있을 때마다 `jarfis-learnings.md`에 추가하세요:

```markdown
## 2026-03-05 — 인증 통합

### 잘 된 것
- 첫 로그인 시 사용자 동기화에 Auth0 Management API 활용
- JWT 검증 미들웨어를 공유 라이브러리로 추출하여 중복 제거

### 피해야 할 것
- Auth0 레거시 `/oauth/token` 엔드포인트 절대 사용 금지 — PKCE 플로우만 사용
- `useUser` 훅은 콜드 스타트 시 2초 지연 — 항상 스켈레톤 표시

### 재사용할 패턴
- `UserProfile` 컴포넌트의 에러 바운더리 + Suspense 패턴이 모든 인증 게이트 페이지에 적합
```

에이전트는 모든 관련 페이즈 시작 시 `jarfis-learnings.md`를 참조하므로, 프로젝트 1의 학습이 프로젝트 2에 직접 적용됩니다.

### 학습 초기화

프로젝트가 아카이브되어 학습 내용이 더 이상 적용되지 않는 경우:

```bash
# 초기화 전 학습 내용 아카이브
cp .jarfis/jarfis-learnings.md .jarfis/archive/jarfis-learnings-2025.md
echo "" > .jarfis/jarfis-learnings.md
```

## 미팅 진행

### 미팅 소집 시기

다음 상황에서 `/jarfis:meeting`을 사용하세요:
- 두 에이전트가 서로 다른 접근 방식을 가질 때 (예: BE와 FE의 API 계약 충돌)
- 중요한 아키텍처 결정에 다중 에이전트 입력이 필요할 때
- 범위 명확화가 필요해 페이즈 산출물이 블로킹될 때
- 페이즈 후 회고가 구조화된 토론을 통해 더 효과적일 때

### 미팅 패턴

**충돌 해결 미팅**:
```
/jarfis:meeting BE와 FE의 페이지네이션 API 설계 충돌 해결
```

**결정 미팅**:
```
/jarfis:meeting 상태 관리 방식 결정: Redux vs Zustand vs Jotai
```

**범위 명확화**:
```
/jarfis:meeting 범위 명확화: "사용자 프로필"에 조직 설정이 포함되는가?
```

미팅 결과는 `review.md`에 자동 기록되고 `.jarfis-state.json`이 업데이트됩니다.

## 다중 기능 병렬 워크플로우

여러 기능이 동시에 진행되는 대규모 프로젝트에서 JARFIS는 병렬 작업 트리를 지원합니다:

```
.jarfis/works/
├── 2026-03-05/
│   ├── feature/auth-system/          # 기능 A: 페이즈 3
│   └── feature/billing-integration/  # 기능 B: 페이즈 1
└── 2026-03-01/
    └── feature/dashboard-redesign/   # 기능 C: 완료
```

진행 중인 작업을 방해하지 않고 새 기능 시작:

```
/jarfis --feature billing-integration Stripe 구독 결제 추가
```

각 기능의 상태는 `.jarfis-state.json`에 독립적으로 추적됩니다.

## 페이즈 게이트 리뷰

페이즈 전환 전에 사람이 검토하는 체크포인트를 삽입할 수 있습니다:

`.jarfis/CLAUDE.md`에서:
```markdown
## 페이즈 게이트

- 페이즈 2 → 3: architecture.md에 대한 명시적인 사람의 승인 필요
- 페이즈 4.5 → 5: 모든 HIGH/CRITICAL 발견에 대한 Security Engineer 사인오프 필요
- 페이즈 5 → 6: 팀 리드의 배포 계획 검토 필요
```

게이트에 도달하면 JARFIS가 일시 중지하고 프롬프트를 표시합니다:

```
페이즈 2 완료. 아키텍처 문서 검토 준비 완료.
페이즈 3으로 진행하려면 'approve'를 입력하거나, 필요한 변경 사항을 설명하세요.
```

## 대규모 코드베이스를 위한 팁

1. **`context.md`를 최신 상태로 유지** — 오래된 컨텍스트는 에이전트가 기존 패턴과 충돌하는 코드를 생성하게 합니다
2. **페이즈 건너뛰기를 신중하게 사용** — 건너뛴 아티팩트는 PreCompact 훅이 복원할 컨텍스트를 줄입니다
3. **오래된 `.jarfis-state.json`을 정기적으로 아카이브** — 큰 상태 파일은 PreCompact 훅을 느리게 만듭니다
4. **`jarfis-learnings.md`를 저장소에 커밋** — 이것은 AI 상태가 아닌 귀중한 프로젝트 지식입니다
5. **승인 전 에이전트 아티팩트 검토** — JARFIS는 생성하고, 사람이 결정합니다

## 다음 단계

- [API 레퍼런스](/ko/docs/api-reference) — 모든 `/jarfis` 커맨드와 설정 옵션
- [아키텍처 & 개념](/ko/docs/concepts-overview) — 심층 아키텍처 분석
