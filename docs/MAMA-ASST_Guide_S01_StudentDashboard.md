# MAMA-ASST S-01 학생 대시보드 — Bubble.io 구현 가이드

> **버전**: v1.0 | **작성일**: 2025-02-25  
> **선행 완료**: RE_Header, RE_Sidebar (Bubble 구현 완료), C-02 로그인, C-05 비밀번호 변경  
> **목업 파일**: `S01_student_dashboard_mockup.html`  
> **예상 소요**: 약 4시간 (Type A 템플릿 1.5시간 + 콘텐츠 2.5시간)

---

## 📋 목차

1. [페이지 생성 및 기본 설정](#1-페이지-생성-및-기본-설정)
2. [접근 제어 (Page Load)](#2-접근-제어-page-load)
3. [Type A 템플릿 구성](#3-type-a-템플릿-구성)
4. [인사말 섹션](#4-인사말-섹션)
5. [Daily Target 요약 바](#5-daily-target-요약-바)
6. [과목 카드 3개](#6-과목-카드-3개)
7. [XP 카드](#7-xp-카드)
8. [Workflow 정리](#8-workflow-정리)
9. [Conditional 정리](#9-conditional-정리)
10. [테스트 체크리스트](#10-테스트-체크리스트)

---

## 1. 페이지 생성 및 기본 설정

### Bubble Editor 경로

`Pages` → `Add a new page`

### 페이지 설정

| 설정 항목 | 값 | 비고 |
|-----------|-----|------|
| **Page name** | `student-dashboard` | URL: `/student-dashboard` |
| **Page title** | `대시보드 | MAMA-ASST` | 브라우저 탭 |
| **Type of content** | (없음) | |
| **Container layout** | Column | |
| **Width** | `100%` | |
| **Min height** | `100vh` | |
| **Background color** | `#F9FAFB` (Background) | Style Variable |

---

## 2. 접근 제어 (Page Load)

> 비로그인 사용자와 학생이 아닌 사용자 차단

### Page Load Workflow

**Event**: `Page is loaded`

#### WF-LOAD-01: 비로그인 → 로그인 페이지

| 항목 | 값 |
|------|-----|
| **Only when** | `Current User is logged out` |
| **Action** | Navigation > Go to page: `login` |

#### WF-LOAD-02: 학생이 아닌 사용자 → 역할별 라우팅

| 항목 | 값 |
|------|-----|
| **Only when** | `Current User's role is not "STUDENT"` |
| **Action** | Navigation > Go to page: (역할별 분기) |

```
역할별 분기:
  ACADEMY_ADMIN → "admin-dashboard"
  INSTRUCTOR    → "instructor-dashboard"  (MVP 미구현 시 login으로)
```

> ⚠️ Bubble에서 Page Load에 조건부 Go to page를 2개 넣으면 첫 번째 조건이 true일 때만 실행됩니다.
> 두 WF 모두 별도 "Page is loaded" 이벤트로 만들어야 합니다.

---

## 3. Type A 템플릿 구성

> ★ 이 구조는 한 번만 만들면 이후 모든 Type A 페이지에서 복사 재사용합니다.

### 3.1 전체 구조 트리

```
student-dashboard (Page, Column, 100%, min-height: 100vh, BG: #F9FAFB)
│
├── FG_Header (Floating Group)
│   └── RE_Header ← (이미 구현됨)
│       Properties:
│         page_title = "대시보드"
│         notif_count = Search for Notifications [...]  :count
│
├── Group_PageBody (Row, width: 100%, margin-top: 64px)
│   │
│   ├── Group_SidebarWrapper (width: 256px, sticky)
│   │   └── RE_Sidebar ← (이미 구현됨)
│   │       Properties:
│   │         active_page = "student-dashboard"
│   │
│   └── Group_MainContent (Column, flex: 1, min-width: 0)
│       ├── Group_Greeting
│       ├── Group_DailyTarget
│       ├── Group_SubjectCards (Row)
│       │   ├── Group_CardKorean
│       │   ├── Group_CardEnglish
│       │   └── Group_CardMath
│       └── Group_XP
│
└── Group_SidebarOverlay (모바일용, 기본 숨김)
```

### 3.2 FG_Header (Floating Group)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Type** | Floating Group | |
| **Vertically float relative to** | Top | |
| **Float margin** | `0` | |
| **Width** | `100%` | |
| **Height** | `64px` | |
| **Z-index** | 기본값 (Floating Group은 자동 상위) | |

**내부에 RE_Header 배치:**

| RE_Header 속성 | 값 |
|----------------|-----|
| **Width** | `100%` |
| **Height** | `64px` |

**📥 RE_Header Property 설정** (Appearance 탭):

| Property | 값 | 비고 |
|----------|-----|------|
| `page_title` | `대시보드` | 텍스트 직접 입력 |
| `notif_count` | `Search for Notifications` | 아래 상세 |

```
notif_count 검색 설정:
  Type: Notification
  Constraint 1: user_id = Current User
  Constraint 2: is_read = no
  → :count
```

> ⚠️ MVP 단계에서 Notification 데이터가 없으므로 `0`이 표시됩니다.
> 하드코딩하지 말고 검색식을 미리 넣어두면 나중에 자동 동작합니다.

### 3.3 Group_PageBody

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Row | |
| **Width** | `100%` | |
| **Min height** | `calc 방식` | Bubble에서: 페이지 높이 - 64px |
| **Margin top** | `64px` | FG_Header 높이만큼 |
| **Column gap** | `0` | |

### 3.4 Group_SidebarWrapper

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `256px` (Fixed) | 사이드바 너비 |
| **Height** | `calc(100vh - 64px)` | Bubble: "Fit height to content" 해제, 직접 수식 |
| **Make this element fixed-width** | ✅ | |
| **Position** | sticky (CSS로) | `top: 64px` |
| **Overflow** | Hidden | |

> ⚠️ Bubble에서 sticky 포지션:
> Element Inspector에서 `This element is fixed on the page` 체크하지 마세요 (이건 Fixed).
> 대신 HTML 속성 추가 방식: element의 ID를 `sidebarWrapper`로 설정하고,
> Page HTML Header에 CSS 추가:
> ```html
> <style>
>   #sidebarWrapper { position: sticky !important; top: 64px; }
> </style>
> ```

**내부에 RE_Sidebar 배치:**

| RE_Sidebar 속성 | 값 |
|-----------------|-----|
| **Width** | `256px` |
| **Height** | `100%` |

**📥 RE_Sidebar Property 설정** (Appearance 탭):

| Property | 값 |
|----------|-----|
| `active_page` | `student-dashboard` |

### 3.5 Group_MainContent

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Column | |
| **Min width** | `0` | flex 자식 overflow 방지 |
| **Width** | (비움 — flex: 1 자동) | `Make this element fixed-width` 해제 |
| **Height** | `100%` | |
| **Padding** | `28px 32px` | 상하 28, 좌우 32 |
| **Row gap** | `24px` | 내부 섹션 간격 |
| **Overflow** | `Auto (scrolling)` | ★ 메인 콘텐츠 스크롤 |

### 3.6 Group_SidebarOverlay (모바일용)

> 화면 너비 ≤ 1200px에서 사이드바가 열릴 때 뒤에 깔리는 반투명 오버레이

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `100%` | |
| **Height** | `100%` | |
| **Background** | `#000000`, Opacity 50% | |
| **Visible on page load** | ❌ | |
| **Collapse when hidden** | ❌ | (고정 위치이므로) |

**Conditional:**

| 조건 | 속성 | 값 |
|------|------|-----|
| `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "yes"` | Visible | `true` |

**Workflow: Overlay 클릭 시 사이드바 닫기**

| Event | `Group_SidebarOverlay is clicked` |
|-------|-----------------------------------|
| Action | Set state: `RE_Header's sidebar_open` = `no` |

### 3.7 close_requested 신호 처리 (부모 페이지 Workflow)

| Event | `Do when condition is true` |
|-------|----------------------------|
| **Only when** | `RE_Sidebar's close_requested is "yes"` |
| **Action 1** | Set state: `RE_Header's sidebar_open` = `no` |
| **Action 2** | Set state: `RE_Sidebar's close_requested` = `no` |

### 3.8 반응형 Conditional

#### Group_SidebarWrapper

| 조건 | 속성 | 값 | 비고 |
|------|------|-----|------|
| `Current page width ≤ 1200` | Visible | `false` | PC에서만 표시 |

> ⚠️ 모바일에서 사이드바는 Overlay + RE_Sidebar 조합으로 열립니다.
> 별도 모바일 사이드바 Group이 필요합니다:

#### Group_MobileSidebar (모바일 전용)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `256px` | |
| **Height** | `100vh` | |
| **Background** | (없음 — RE_Sidebar가 처리) | |
| **Visible on page load** | ❌ | |
| **Position** | Fixed, left: 0, top: 0 | |
| **Z-index** | Overlay 위 | |

**Conditional:**

| 조건 | 속성 | 값 |
|------|------|-----|
| `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "yes"` | Visible | `true` |

**내부에 RE_Sidebar 두 번째 인스턴스 배치:**

| Property | 값 |
|----------|-----|
| `active_page` | `student-dashboard` |

> 💡 **간소화 방법**: 모바일 사이드바를 별도로 만들기 복잡하다면,
> Group_SidebarWrapper의 Conditional을 아래처럼 변경하는 것도 가능합니다:
>
> | 조건 | 속성 | 값 |
> |------|------|-----|
> | `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "no"` | Visible | `false` |
> | `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "yes"` | Visible | `true`, Position: Fixed |
>
> → 이 방식은 1200px 이하에서 사이드바가 토글됩니다.
> 단, Bubble에서 position을 Conditional로 변경하려면 CSS 추가가 필요합니다.

**🔴 MVP 권장 방식: 심플 구현**

```
[PC: 1200px 초과]
  Group_SidebarWrapper: 항상 표시 (256px 고정)
  Group_SidebarOverlay: 항상 숨김
  햄버거 버튼: 숨김 (RE_Header 내부에서 Conditional 처리됨)

[모바일/태블릿: 1200px 이하]
  Group_SidebarWrapper: 숨김
  → 사이드바 없이 MainContent만 전체 폭으로 표시
  → 햄버거 클릭 시: Group_SidebarOverlay + Group_MobileSidebar 표시

MVP 단계에서는 모바일 사이드바를 생략하고
Group_SidebarWrapper만 숨기는 것도 가능합니다.
(사이드바 없이 대시보드 콘텐츠만 표시)
```

---

## 4. 인사말 섹션

### Group_Greeting

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Row gap** | `4px` |
| **Width** | `100%` |

### Text_GreetingTitle

| 속성 | 값 | 비고 |
|------|-----|------|
| **Content** | 동적 (아래 참조) | |
| **Style** | 직접 설정 (아래) | |
| **Font size** | `24px` | |
| **Font weight** | `700` (Bold) | |
| **Color** | `#1A2E4D` (Navy) | Style Variable |

**동적 텍스트 설정:**

```
"안녕, " + Current User's name + "! 👋"
```

Bubble 표현식:
```
Insert dynamic data → "안녕, "
Insert dynamic data → Current User's name
Insert dynamic data → "! 👋"
```

### Text_GreetingSub

| 속성 | 값 | 비고 |
|------|-----|------|
| **Content** | 동적 (아래 참조) | |
| **Font size** | `15px` | |
| **Color** | `#6B7280` (Text Secondary) | |

**동적 텍스트 설정:**

```
Current date/time:formatted as "YYYY년 M월 D일 dddd" + " · 오늘도 화이팅!"
```

Bubble 날짜 포맷:
```
Insert dynamic data → Current date/time:formatted as yyyy"년 "M"월 "d"일 "dddd
Insert dynamic data → " · 오늘도 화이팅!"
```

> ⚠️ Bubble의 날짜 포맷에서 한글 요일(월/화/수/목/금/토/일)은
> 사용자 브라우저 locale이 한국어면 자동 표시됩니다.
> 확인: Settings > Languages > Default language = Korean

---

## 5. Daily Target 요약 바

### 5.1 데이터 소스

```
DailyLearningTarget 테이블:
  student_id = Current User
  target_date = Current date/time:rounded down to date ★

→ 오늘 날짜의 과목별 목표 3개 (국어/영어/수학)
→ 데이터가 없으면 "학습 목표가 설정되지 않았습니다" 표시
```

### 5.2 Custom States (Page 레벨)

> 반복 검색을 피하기 위해 Page Load 시 Custom State에 저장

| State Name | Type | 용도 |
|------------|------|------|
| `state_today_targets` | List of DailyLearningTargets | 오늘의 학습 목표 3개 |

**Page Load Workflow (WF-LOAD-03):**

| 항목 | 값 |
|------|-----|
| **Event** | Page is loaded |
| **Only when** | Current User is logged in AND Current User's role is "STUDENT" |
| **Action** | Set state: `state_today_targets` = Search for DailyLearningTargets |

```
Search 설정:
  Type: DailyLearningTarget
  Constraint 1: student_id = Current User
  Constraint 2: target_date = Current date/time:rounded down to date
  Sort: (없음)
```

### 5.3 Group_DailyTarget

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Row gap** | `14px` |
| **Width** | `100%` |
| **Background** | `#FFFFFF` (Surface) |
| **Border** | `1px solid #E5E7EB` (Border Light) |
| **Roundness** | `16px` |
| **Padding** | `20px 24px` |

### 5.4 내부 요소

#### Group_DTHeader (Row)

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Justify** | Space between |
| **Align** | Center |

**Text_DTLabel:**

| 속성 | 값 |
|------|-----|
| **Content** | `오늘의 학습 목표` |
| **Font size** | `15px` |
| **Font weight** | `600` |
| **Color** | `#1F2937` (Text Primary) |

**Text_DTCount:**

| 속성 | 값 |
|------|-----|
| **Font size** | `14px` |
| **Color** | `#6B7280` (Text Secondary) |

**동적 텍스트:**

```
완료 합계:
  This page's state_today_targets:each item's completed_count:sum

목표 합계:
  This page's state_today_targets:each item's target_count:sum

표시: "[완료합계] / [목표합계] 완료"
```

> ⚠️ `:each item's completed_count:sum` 사용법:
> Bubble에서 리스트의 각 항목 필드를 합산하려면:
> `state_today_targets:each item's completed_count:sum`
> 이 표현식이 작동하지 않으면 `:count` 등으로 대체하거나
> Backend Workflow에서 미리 계산합니다.
>
> **대안 (간단):** 3개 과목을 각각 검색해서 합산
> ```
> 국어 완료: Search for DailyLearningTargets [...subject=KOREAN]:first item's completed_count
> 영어 완료: Search for DailyLearningTargets [...subject=ENGLISH]:first item's completed_count
> 수학 완료: Search for DailyLearningTargets [...subject=MATH]:first item's completed_count
> ```

#### Shape_DTProgressTrack (진도 바)

| 속성 | 값 |
|------|-----|
| **Type** | Shape (Rectangle) 또는 Group |
| **Width** | `100%` |
| **Height** | `12px` |
| **Background** | `#F3F4F6` |
| **Roundness** | `6px` |

**Shape_DTProgressBar (내부 채우기):**

| 속성 | 값 |
|------|-----|
| **Width** | 동적 (%) | 
| **Height** | `12px` |
| **Background** | `linear-gradient` 또는 `#FF6D4D` (Primary) |
| **Roundness** | `6px` |

**진도 바 너비 계산:**

```
Bubble에서 프로그레스 바 구현 방법:

방법 A — HTML Element:
  <div style="
    width: 100%;
    height: 12px;
    background: #F3F4F6;
    border-radius: 6px;
    overflow: hidden;
  ">
    <div style="
      width: [완료/목표*100]%;
      height: 100%;
      background: linear-gradient(90deg, #FF6D4D, #FF8F73);
      border-radius: 6px;
      transition: width 0.6s;
    "></div>
  </div>

  동적 너비: 
  완료 합계 ÷ 목표 합계 × 100
  → Bubble: state_today_targets:each item's completed_count:sum 
            / state_today_targets:each item's target_count:sum × 100

방법 B — Group 너비 조절:
  외부 Group (100%, 12px, #F3F4F6, rounded 6)
    내부 Group (동적 %, 12px, Primary, rounded 6)
    
  내부 Group의 Width를 퍼센트로 지정:
    → Bubble에서는 비율 너비가 어려우므로 HTML Element 권장

★ 권장: 방법 A (HTML Element)
```

#### Group_DTSubjects (과목별 진도)

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Column gap** | `16px` |

각 과목별로 `Group_DTSubject` 3개:

```
[국어]
  ● (8×8, #4285F4) + "국어 [완료]/[목표]"

[영어]
  ● (8×8, #34A853) + "영어 [완료]/[목표]"

[수학]
  ● (8×8, #FBBC05) + "수학 [완료]/[목표]"
```

**각 과목 데이터 바인딩:**

```
국어 완료:
  Search for DailyLearningTargets
    student_id = Current User
    target_date = Current date/time:rounded down to date
    subject = KOREAN
  :first item's completed_count

국어 목표:
  (위와 동일):first item's target_count
```

> ⚠️ 검색을 6번 하면 부하가 클 수 있습니다.
> **최적화**: 5.2절의 `state_today_targets` Custom State를 활용
> ```
> state_today_targets:filtered (subject = KOREAN):first item's completed_count
> ```
> Bubble의 `:filtered` 연산자는 클라이언트 사이드이므로 추가 서버 호출이 없습니다.

### 5.5 빈 상태 처리

**Group_DTEmpty** (Daily Target이 없을 때):

| 속성 | 값 |
|------|-----|
| **Visible when** | `state_today_targets:count is 0` |
| **Content** | Text: "학습 목표가 설정되지 않았습니다" |
| **Color** | `#9CA3AF` (Text Tertiary) |
| **Font size** | `14px` |
| **Align** | Center |

**Group_DailyTarget (메인) Conditional:**

| 조건 | 속성 | 값 |
|------|------|-----|
| `state_today_targets:count is 0` | 내부 DTHeader, ProgressTrack, DTSubjects | Visible = false |

---

## 6. 과목 카드 3개

### 6.1 Group_SubjectCards (컨테이너)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Row | |
| **Column gap** | `16px` | |
| **Width** | `100%` | |
| **Wrap** | ✅ (Wrapping 허용) | 모바일에서 세로 배치 |

### 6.2 과목 카드 공통 구조

각 카드는 독립 Group으로 만듭니다 (RG가 아닌 수동 배치).

> **이유**: 과목이 3개 고정이고, 각 카드의 아이콘/색상/설명이 다르므로
> Repeating Group보다 각각 만드는 것이 간단합니다.

#### Group_CardKorean / Group_CardEnglish / Group_CardMath

**공통 속성:**

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Column |
| **Width** | `calc((100% - 32px) / 3)` | 3등분 — Bubble: Min width 280, Fixed width 해제 |
| **Min width** | `280px` | 모바일에서 wrap시 전체폭 |
| **Background** | `#FFFFFF` (Surface) |
| **Border** | `1px solid #E5E7EB` |
| **Roundness** | `16px` |
| **Padding** | `24px` |
| **Row gap** | `0` | 내부에서 개별 마진 조정 |

### 6.3 카드 내부 요소 (국어 예시)

```
Group_CardKorean (Column, 24px padding)
│
├── Group_SCTop (Row, justify: space-between, margin-bottom: 16px)
│   ├── Group_SCIcon (48×48, rounded: 14, BG: #4285F4)
│   │   └── Icon: menu_book (24px, white)
│   └── Text_SCBadge ("완료!" or "진행중" or "미시작")
│
├── Text_SCName ("국어", 18px, Bold, margin-bottom: 4px)
│
├── Text_SCDesc ("5단계 구조화 학습", 13px, Text Secondary, margin-bottom: 16px)
│
├── Group_SCProgress (Column, margin-bottom: 16px)
│   ├── Group_SCProgressHeader (Row, justify: space-between)
│   │   ├── Text_SCProgressLabel ("오늘 진도", 12px, Text Secondary)
│   │   └── Text_SCProgressCount ("2 / 2", 13px, Bold, #4285F4)
│   └── Shape_SCProgressTrack (100%, 6px, #F3F4F6, rounded: 3)
│       └── Shape_SCProgressBar (동적%, 6px, #4285F4, rounded: 3)
│
└── Button_StartKorean ("학습하기", play_arrow 아이콘)
```

### 6.4 과목별 색상표

| 과목 | 아이콘 BG | 프로그레스 | 버튼 BG | 버튼 Hover BG | 아이콘 |
|------|-----------|-----------|---------|---------------|--------|
| 국어 | `#4285F4` | `#4285F4` | `#EBF2FE` | `#4285F4` (텍스트: white) | `menu_book` |
| 영어 | `#34A853` | `#34A853` | `#E8F5E9` | `#34A853` (텍스트: white) | `translate` |
| 수학 | `#FBBC05` | `#FBBC05` | `#FFF8E1` | `#FBBC05` (텍스트: #7A5C00) | `calculate` |

### 6.5 상태 뱃지 동적 표시

**Text_SCBadge Conditional:**

각 과목의 DailyLearningTarget 데이터를 기반으로:

```
국어 Target:
  state_today_targets:filtered (subject = KOREAN):first item

조건 판단:
  ① completed_count ≥ target_count → "완료!" (Success)
  ② completed_count > 0 AND < target_count → "진행중" (Info)
  ③ completed_count = 0 → "미시작" (Tertiary)
  ④ Target 없음 → "미설정" (Tertiary)
```

**Conditional 설정 (국어 기준):**

| # | 조건 | 텍스트 | BG | Color |
|---|------|--------|-----|-------|
| 1 | `state_today_targets:filtered(subject=KOREAN):first item's is_achieved is "yes"` | 완료! | `rgba(34,197,94,0.1)` | `#22C55E` |
| 2 | `...completed_count > 0` AND `...is_achieved is "no"` | 진행중 | `rgba(59,130,246,0.1)` | `#3B82F6` |
| 3 | `...completed_count is 0` OR Target 없음 | 미시작 | `#F3F4F6` | `#9CA3AF` |

### 6.6 프로그레스 바 (과목별)

**방법 A — HTML Element (권장):**

```html
<!-- 국어 프로그레스 바 -->
<div style="width:100%;height:6px;background:#F3F4F6;border-radius:3px;overflow:hidden">
  <div style="width:[동적]%;height:100%;background:#4285F4;border-radius:3px;transition:width 0.6s"></div>
</div>
```

동적 너비: 
```
국어 완료 / 국어 목표 × 100

Bubble 표현식:
  state_today_targets:filtered(subject=KOREAN):first item's completed_count 
  / state_today_targets:filtered(subject=KOREAN):first item's target_count 
  × 100

→ 목표가 0이면 NaN 방지: 
  Conditional — target_count is 0 → width: 0%
```

**방법 B — Bubble 기본 Progress Bar** (Bubble에 내장 Progress Bar 플러그인 있으면 활용)

### 6.7 학습하기 버튼

**Button_StartKorean:**

| 속성 | 값 |
|------|-----|
| **Text** | `학습하기` |
| **Icon** | `play_arrow` (왼쪽) |
| **Width** | `100%` |
| **Height** | `42px` |
| **Roundness** | `10px` |
| **Font size** | `14px` |
| **Font weight** | `600` |
| **Background** | `#EBF2FE` (Korean Light) |
| **Color** | `#4285F4` (Korean) |

**Hover Conditional:**

| 조건 | 속성 | 값 |
|------|------|-----|
| `This Button is hovered` | Background | `#4285F4` |
| `This Button is hovered` | Font color | `#FFFFFF` |

**Workflow: Button_StartKorean 클릭**

| Action | Go to page: `subject-korean` |
|--------|------|

> 영어: → `subject-english`
> 수학: → `subject-math`

### 6.8 빈 상태 (DailyLearningTarget 없을 때)

과목 카드는 Daily Target이 없어도 항상 표시합니다.

| 상황 | 표시 |
|------|------|
| Target 없음 | 진도: `0 / 0`, 뱃지: "미설정", 프로그레스: 0% |
| Target 있고 완료 0 | 진도: `0 / [목표]`, 뱃지: "미시작" |
| Target 있고 진행중 | 진도: `[완료] / [목표]`, 뱃지: "진행중" |
| Target 달성 | 진도: `[완료] / [목표]`, 뱃지: "완료!" |

---

## 7. XP 카드

### 7.1 데이터 소스

```
StudentProfile 테이블:
  user_id = Current User

필드:
  total_xp      → 누적 경험치
  current_level  → 현재 레벨
```

### 7.2 Group_XP

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Width** | `100%` |
| **Min height** | `96px` |
| **Background** | Gradient: `#1A2E4D → #2A4060` (135deg) |
| **Roundness** | `16px` |
| **Padding** | `24px` |
| **Column gap** | `16px` |
| **Justify** | Space between |
| **Align** | Center |

> Bubble gradient 설정:
> Background style: Gradient
> Color 1: `#1A2E4D` | Color 2: `#2A4060`
> Direction: `135°`

### 7.3 내부 요소

```
Group_XP (Row, gradient navy BG)
│
├── Group_XPLeft (Row, gap: 16px, align: center)
│   ├── Group_XPLevel (56×56, circle)
│   │   ├── Text_LevelLabel ("Lv.", 10px, white 60%)
│   │   └── Text_LevelNum (동적, 20px, Bold, white)
│   └── Group_XPInfo (Column)
│       ├── Text_XPLabel ("누적 경험치", 11px, white 50%)
│       └── Text_XPValue (동적, 22px, Bold, white)
│
└── Group_XPRight (Row, gap: 24px)
    ├── Group_XPStat1 (연속 학습)
    ├── Group_XPStat2 (이번 주 완료)
    └── Group_XPStat3 (주간 달성률)
```

### 7.4 데이터 바인딩

**Text_LevelNum:**

```
Search for StudentProfiles (user_id = Current User):first item's current_level
```

**Text_XPValue:**

```
Search for StudentProfiles (user_id = Current User):first item's total_xp:formatted as #,###
+ " XP"
```

> 숫자 포맷: Bubble의 `:formatted as` 에서 `#,###` 패턴 사용

### 7.5 Streak (연속 학습) — MVP 간소화

> DB에 streak 전용 필드가 없으므로 MVP에서는 간소화 처리합니다.

**방법 A — 하드코딩 (MVP 최소):**
```
Text_StreakValue: "0일"
→ 학습 기능 완성 후 실제 계산으로 교체
```

**방법 B — 간단 계산 (Day 2 이후 연결):**
```
// DailyLearningTarget에서 연속 달성일 계산은 복잡하므로
// StudentProfile에 streak_days 필드 추가 권장 (number, 기본값: 0)
// 각 학습 완료 시 Workflow에서 업데이트
```

**★ MVP 권장: 방법 A (하드코딩) → 학습 기능 완료 후 교체**

### 7.6 이번 주 완료 / 주간 달성률 — MVP 간소화

| 항목 | MVP 처리 | 향후 교체 |
|------|----------|----------|
| 이번 주 완료 | 하드코딩: `0개` | DailyLearningTarget에서 이번 주 is_achieved = yes 카운트 |
| 주간 달성률 | 하드코딩: `0%` | 완료/목표 비율 계산 |

---

## 8. Workflow 정리

### Page Level Workflows

| # | Event | Only when | Action | 비고 |
|---|-------|-----------|--------|------|
| WF-LOAD-01 | Page is loaded | Current User is logged out | Go to page: login | 접근 제어 |
| WF-LOAD-02 | Page is loaded | Current User's role ≠ STUDENT | Go to page: (역할별) | 접근 제어 |
| WF-LOAD-03 | Page is loaded | Current User is logged in AND role = STUDENT | Set state: state_today_targets | 데이터 로드 |
| WF-SB-01 | Do when condition is true | RE_Sidebar's close_requested = yes | Set state × 2 | 사이드바 닫기 |
| WF-OV-01 | Group_SidebarOverlay clicked | — | Set state: sidebar_open = no | 오버레이 닫기 |

### Button Workflows

| # | Event | Action | 비고 |
|---|-------|--------|------|
| WF-BTN-01 | Button_StartKorean clicked | Go to page: subject-korean | 국어 학습 |
| WF-BTN-02 | Button_StartEnglish clicked | Go to page: subject-english | 영어 학습 |
| WF-BTN-03 | Button_StartMath clicked | Go to page: subject-math | 수학 학습 |

---

## 9. Conditional 정리

### 반응형 (Responsive)

| # | 요소 | 조건 | 변경 | 값 |
|---|------|------|------|-----|
| C-01 | Group_SidebarWrapper | `Current page width ≤ 1200` | Visible | false |
| C-02 | Group_SidebarOverlay | `width ≤ 1200` AND `sidebar_open = yes` | Visible | true |
| C-03 | Group_MobileSidebar | `width ≤ 1200` AND `sidebar_open = yes` | Visible | true |
| C-04 | Group_SubjectCards | `Current page width ≤ 768` | 내부 카드 Min width | 100% |
| C-05 | Group_XP | `Current page width ≤ 768` | Layout | Column (wrap) |

### 과목 뱃지

| # | 요소 | 조건 | 텍스트 | 스타일 |
|---|------|------|--------|--------|
| C-10 | Text_KoreanBadge | `...is_achieved = yes` | 완료! | BG: green 10%, Color: #22C55E |
| C-11 | Text_KoreanBadge | `...completed > 0 AND is_achieved = no` | 진행중 | BG: blue 10%, Color: #3B82F6 |
| C-12 | Text_KoreanBadge | `...completed = 0` | 미시작 | BG: #F3F4F6, Color: #9CA3AF |
| C-13~C-15 | Text_EnglishBadge | (동일 패턴, subject = ENGLISH) | — | — |
| C-16~C-18 | Text_MathBadge | (동일 패턴, subject = MATH) | — | — |

### 버튼 Hover

| # | 요소 | 조건 | BG | Color |
|---|------|------|-----|-------|
| C-20 | Button_StartKorean | hovered | `#4285F4` | white |
| C-21 | Button_StartEnglish | hovered | `#34A853` | white |
| C-22 | Button_StartMath | hovered | `#FBBC05` | `#7A5C00` |

---

## 10. 테스트 체크리스트

### 사전 조건

| 준비 항목 | 설정 |
|-----------|------|
| 테스트 계정 | 01011110000 / mb1234 (is_first_login = no로 변경 필요) |
| StudentProfile | user_id = 테스트학생A, grade = E1, total_xp = 0, current_level = 1 |
| DailyLearningTarget × 3 | student_id = 테스트학생A, target_date = 오늘, subject = KOREAN/ENGLISH/MATH |

> ⚠️ is_first_login이 yes면 change-password로 리다이렉트됩니다.
> 테스트 전 Data 탭에서 테스트학생A의 is_first_login = no로 변경하세요.

### DailyLearningTarget 테스트 데이터 입력

Data 탭 → DailyLearningTarget → `New entry` × 3:

| # | student_id | target_date | subject | target_count | completed_count | is_achieved |
|---|------------|-------------|---------|-------------|----------------|-------------|
| 1 | 테스트학생A | 오늘 날짜 | KOREAN | 2 | 2 | yes |
| 2 | 테스트학생A | 오늘 날짜 | ENGLISH | 3 | 1 | no |
| 3 | 테스트학생A | 오늘 날짜 | MATH | 2 | 1 | no |

### 테스트 항목

```
[접근 제어]
□ 1. 비로그인 → /student-dashboard 접속 → login으로 리다이렉트
□ 2. 관리자 계정 로그인 → /student-dashboard 접속 → admin-dashboard로 리다이렉트
□ 3. 학생 계정 로그인 → 정상 표시

[인사말]
□ 4. "안녕, 테스트학생A! 👋" 표시
□ 5. 오늘 날짜 한글 표시 (2025년 2월 25일 화요일)

[Daily Target]
□ 6. 전체 진도: "4 / 7 완료" 표시
□ 7. 프로그레스 바: 약 57% 채움
□ 8. 과목별 진도: 국어 2/2, 영어 1/3, 수학 1/2

[과목 카드]
□ 9. 국어: "완료!" 뱃지 (초록), 프로그레스 100%
□ 10. 영어: "진행중" 뱃지 (파랑), 프로그레스 33%
□ 11. 수학: "진행중" 뱃지 (파랑), 프로그레스 50%
□ 12. "학습하기" 버튼 호버 → 색상 변경

[XP 카드]
□ 13. 레벨: "1" (StudentProfile current_level)
□ 14. XP: "0 XP" (StudentProfile total_xp)
□ 15. 연속 학습: "0일" (MVP 하드코딩)

[빈 상태]
□ 16. DailyLearningTarget 삭제 후 → "학습 목표가 설정되지 않았습니다"
□ 17. 과목 카드: "미설정" 뱃지, 진도 0/0

[반응형]
□ 18. PC (1200px+): 사이드바 표시, 3열 카드
□ 19. 태블릿 (768~1200px): 사이드바 숨김, 햄버거 표시
□ 20. 모바일 (768px 미만): 카드 1열, XP 카드 세로
```

---

## 📌 Data 탭 검증 테이블

테스트 완료 후 확인:

| Data Type | 확인 항목 | 예상 값 |
|-----------|-----------|---------|
| User (테스트학생A) | role | STUDENT |
| User (테스트학생A) | is_first_login | no (테스트 전 변경) |
| StudentProfile | user_id → 테스트학생A | ✅ |
| StudentProfile | total_xp | 0 |
| StudentProfile | current_level | 1 |
| DailyLearningTarget × 3 | target_date = 오늘 | ✅ |

---

## 🚀 다음 단계

대시보드 완성 후:

```
Day 2: 국어 학습
  - subject-korean (국어 메인: 지문 목록)
  - korean-reading (지문 읽기: 7분 타이머)
  - korean-bridging (O/X 퀴즈)
```

---

*— MAMA-ASST S-01 학생 대시보드 구현 가이드 v1.0 끝 —*
