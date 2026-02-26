# MAMA-ASST S-01 학생 대시보드 — Bubble.io 구현 가이드

> **버전**: v1.2 | **작성일**: 2025-02-25  
> **참조 문서**: RE_DevGuide v1.3, RE_UpdateGuide v1.4, PageDevPlan v2.2  
> **선행 완료**: RE_Header, RE_Sidebar (Bubble 구현 완료), C-02 로그인, C-05 비밀번호 변경  
> **목업 파일**: `S01_student_dashboard_mockup.html`, `RE_Header_Sidebar_mockup.html`  
> **예상 소요**: 약 4시간 (Type A 템플릿 1.5시간 + 콘텐츠 2.5시간)
>
> ### v1.2 변경사항 (vs v1.1)
> | 항목 | v1.1 (잘못됨) | v1.2 (수정) |
> |------|-------------|------------|
> | Page layout | Column | ★ **Row** (사이드바 + 메인영역 가로) |
> | Header 배치 | FG_Header (Floating Group, 전체 너비) | ★ **일반 RE 배치** (MainArea Column 안) |
> | 구조 | Page > FG_Header > PageBody(Row) > Sidebar+Main | ★ **Page(Row) > Sidebar + MainArea(Column) > Header+Main** |
> | Page HTML Header CSS | sticky CSS 포함 | ★ sticky 삭제 (불필요) |
> | Conditional 수 | 19개 | 18개 (XP 반응형 제거) |

---

## 📋 목차

1. [페이지 생성 및 기본 설정](#1-페이지-생성-및-기본-설정)
2. [Page HTML Header (CSS)](#2-page-html-header)
3. [접근 제어 (Page Load)](#3-접근-제어)
4. [Type A 템플릿 구성](#4-type-a-템플릿-구성)
5. [스타일 매핑 총정리](#5-스타일-매핑-총정리)
6. [인사말 섹션](#6-인사말-섹션)
7. [Daily Target 요약 바](#7-daily-target-요약-바)
8. [과목 카드 3개](#8-과목-카드-3개)
9. [XP 카드](#9-xp-카드)
10. [Workflow 총정리](#10-workflow-총정리)
11. [Conditional 총정리](#11-conditional-총정리)
12. [테스트 데이터 및 체크리스트](#12-테스트-데이터-및-체크리스트)

---

## 1. 페이지 생성 및 기본 설정

### Bubble Editor 경로

`Pages` → `Add a new page`

| 설정 항목 | 값 | 비고 |
|-----------|-----|------|
| **Page name** | `student-dashboard` | URL: `/student-dashboard` |
| **Page title** | `대시보드 \| MAMA-ASST` | 브라우저 탭 |
| **Type of content** | (없음) | |
| **Container layout** | ★ **Row** | 사이드바 + 메인영역 가로 배치 |
| **Width** | `100%` | |
| **Height** | `100vh` | ★ Min height 아님, 고정 높이 |
| **Background color** | `#F9FAFB` (Background) | Style Variable |

> ⚠️ Page layout이 **Row**인 것이 핵심입니다.
> 사이드바(왼쪽 256px)와 메인영역(오른쪽 flex: 1)이 가로로 나란히 배치됩니다.

---

## 2. Page HTML Header

> Settings → SEO / metatags → Script/meta tags in header

```html
<style>
  /* ===== XP 카드 그래디언트 ===== */
  #xpCard {
    background: linear-gradient(135deg, #1A2E4D 0%, #2A4060 100%) !important;
  }
</style>
```

> v1.2에서 프로그레스 바 CSS 클래스 삭제 — **인라인 스타일로 HTML Element 내부에서 완결**
> Bubble HTML Element는 Page Header CSS가 내부에 적용되지 않는 경우가 있어, 인라인 방식이 안정적입니다.

---

## 3. 접근 제어

### WF-LOAD-01: 비로그인 → 로그인

| 항목 | 값 |
|------|-----|
| **Event** | Page is loaded |
| **Only when** | `Current User is logged out` |
| **Action** | Navigation > Go to page: `login` |

### WF-LOAD-02: 비학생 → 역할별 라우팅

| 항목 | 값 |
|------|-----|
| **Event** | Page is loaded *(별도 이벤트로 생성)* |
| **Only when** | `Current User is logged in` AND `Current User's role is not "STUDENT"` |
| **Action** | Navigation > Go to page: (아래 분기) |

```
역할별 분기:
  ACADEMY_ADMIN → "admin-dashboard"
  INSTRUCTOR    → "instructor-dashboard" (미구현 시 "login")
```

> ⚠️ Bubble에서 Page is loaded 이벤트를 **2개 별도로** 만들어야 합니다.
> 하나의 이벤트에 Only when 조건 2개를 넣으면 첫 번째만 실행됩니다.

---

## 4. Type A 템플릿 구성

> ★ 이 구조는 **한 번만 만들면 이후 모든 Type A 페이지에서 복사** 재사용합니다.

### 4.1 레이아웃 개념도

```
┌────────────────────────────────────────────────────────┐
│                    Page (Row, 100vh)                    │
│                                                        │
│  ┌──────────┬─────────────────────────────────────┐   │
│  │          │  Group_MainArea (Column, flex:1)     │   │
│  │  Group   │  ┌───────────────────────────────┐  │   │
│  │  Sidebar │  │ RE_Header (64px)              │  │   │
│  │  Wrapper │  │ page_title="대시보드"          │  │   │
│  │          │  ├───────────────────────────────┤  │   │
│  │  256px   │  │                               │  │   │
│  │  100vh   │  │ Group_MainContent (scroll)    │  │   │
│  │          │  │  ├ 인사말                      │  │   │
│  │  RE_     │  │  ├ Daily Target               │  │   │
│  │  Sidebar │  │  ├ 과목 카드 3개              │  │   │
│  │          │  │  └ XP 카드                     │  │   │
│  │          │  │                               │  │   │
│  │          │  └───────────────────────────────┘  │   │
│  └──────────┴─────────────────────────────────────┘   │
│                                                        │
│  + FG_MobileSidebar (Floating, left, 기본 숨김)        │
│  + Group_SidebarOverlay (기본 숨김)                    │
└────────────────────────────────────────────────────────┘

PC (> 1200px):
  사이드바 표시, 햄버거 숨김
  헤더는 사이드바 오른쪽에만 존재

모바일 (≤ 1200px):
  사이드바 숨김 → MainArea가 전체 폭
  헤더에 햄버거 표시
  햄버거 클릭 → FG_MobileSidebar 표시
```

### 4.2 전체 구조 트리

```
student-dashboard (Page, ★ Row, 100% × 100vh, BG: #F9FAFB)
│
├── Group_SidebarWrapper ──────── 256px × 100vh (Fixed width, Collapse when hidden ✅)
│   └── RE_Sidebar
│       📥 active_page = "student-dashboard"
│
├── Group_MainArea ────────────── Column (flex: 1, 100vh)
│   │
│   ├── RE_Header ─────────────── 64px (일반 배치, Floating Group 아님!)
│   │   📥 page_title = "대시보드"
│   │   📥 notif_count = Search for Notifications:count
│   │
│   └── Group_MainContent ─────── Column (flex: 1, scroll, padding: 28 32, gap: 24)
│       │
│       ├── Group_Greeting ────── Column (Transparent, gap: 4)
│       │   ├── Text_GreetingTitle ── Heading 3 ✅ | "안녕, [name]! 👋"
│       │   └── Text_GreetingSub ──── Body 14 ⚙️ color→Secondary | "[날짜] · 오늘도 화이팅!"
│       │
│       ├── Group_DailyTarget ──── Column (Card Bordered ⚙️ roundness→16, gap: 14, pad: 20 24)
│       │   ├── Group_DTHeader ────── Row (space-between)
│       │   │   ├── Text_DTLabel ──── Label ⚙️ weight→600 | "오늘의 학습 목표"
│       │   │   └── Text_DTCount ──── Body 14 ⚙️ color→Secondary | "[완료] / [목표] 완료"
│       │   ├── HTML_DTProgress ───── HTML Element (인라인 스타일, height: 12px)
│       │   ├── Group_DTSubjects ──── Row (gap: 16)
│       │   │   ├── Text_SubKorean ── Caption ✅ | "● 국어 [완료]/[목표]"
│       │   │   ├── Text_SubEnglish ─ Caption ✅ | "● 영어 [완료]/[목표]"
│       │   │   └── Text_SubMath ──── Caption ✅ | "● 수학 [완료]/[목표]"
│       │   └── Group_DTEmpty ─────── Body 14 ⚙️ color→Tertiary (빈 상태, 기본 숨김)
│       │
│       ├── Group_SubjectCards ──── Row (Transparent, gap: 16)
│       │   │
│       │   ├── Group_CardKorean ──── Card Bordered ⚙️ roundness→16, pad: 24
│       │   │   ├── Group_SCTop ──────── Row (space-between)
│       │   │   │   ├── Group_SCIcon ──── 48×48, rounded: 14, BG: #4285F4
│       │   │   │   │   └── Icon ──────── menu_book (24px, white)
│       │   │   │   └── Text_SCBadge ──── 커스텀 (11px, 600) + Conditional 3개
│       │   │   ├── Text_SCName ──────── Heading 5 ⚙️ color→Navy | "국어"
│       │   │   ├── Text_SCDesc ──────── 커스텀 (13px, 400, Secondary) | "5단계 구조화 학습"
│       │   │   ├── Group_SCProgress ──── Column
│       │   │   │   ├── Group_SCProgressHeader ── Row
│       │   │   │   │   ├── Text_Label ── Caption ✅ | "오늘 진도"
│       │   │   │   │   └── Text_Count ── 커스텀 (13px, 700, #4285F4) | "2 / 2"
│       │   │   │   └── HTML_Progress ── HTML Element (인라인 스타일, height: 6px)
│       │   │   └── Button_StartKorean ── 커스텀 Tonal (BG: #EBF2FE, Color: #4285F4)
│       │   │       Icon: play_arrow | "학습하기" → Go to page: subject-korean
│       │   │
│       │   ├── Group_CardEnglish ──── (국어와 동일 구조)
│       │   │   └── 차이: translate, #34A853, "7초 발음 테스트"
│       │   │
│       │   └── Group_CardMath ──────── (국어와 동일 구조)
│       │       └── 차이: calculate, #FBBC05, "Jump/Anchor 문제풀이"
│       │
│       └── Group_XP ──────────── 커스텀 (Row, id="xpCard", Navy gradient, rounded: 16)
│           ├── Group_XPLeft ────── Row (gap: 16, align: center)
│           │   ├── Group_XPLevel ── 56×56, circle, BG: #FFFFFF1A, Border: 2px #FFFFFF33
│           │   │   ├── Text ─────── 커스텀 (10px, 500, #FFFFFF99) | "Lv."
│           │   │   └── Text_LevelNum 커스텀 (20px, 800, #FFF) | 동적: current_level
│           │   └── Group_XPInfo ──── Column
│           │       ├── Text ─────── 커스텀 (11px, 400, #FFFFFF80) | "누적 경험치"
│           │       └── Text_XPValue 커스텀 (22px, 700, #FFF) | 동적: total_xp + " XP"
│           └── Group_XPRight ────── Row (gap: 24)
│               ├── Group_Stat1 ──── Column (center)
│               │   ├── Text ─────── 24px | "🔥"
│               │   ├── Text ─────── 커스텀 (16px, 700, #FFF) | "0일" (MVP 하드코딩)
│               │   └── Text ─────── 커스텀 (11px, 400, #FFFFFF80) | "연속 학습"
│               ├── Group_Stat2 ──── Column (center)
│               │   ├── Text ─────── 24px | "⭐"
│               │   ├── Text ─────── 커스텀 (16px, 700, #FFF) | "0개" (MVP 하드코딩)
│               │   └── Text ─────── 커스텀 (11px, 400, #FFFFFF80) | "이번 주 완료"
│               └── Group_Stat3 ──── Column (center)
│                   ├── Text ─────── 24px | "📊"
│                   ├── Text ─────── 커스텀 (16px, 700, #FFF) | "0%" (MVP 하드코딩)
│                   └── Text ─────── 커스텀 (11px, 400, #FFFFFF80) | "주간 달성률"
│
├── FG_MobileSidebar ──────────── Floating Group (left, 256px, 기본 숨김)
│   └── RE_Sidebar
│       📥 active_page = "student-dashboard"
│
└── Group_SidebarOverlay ──────── 반투명 BG: #00000080 (기본 숨김)
```

> ★ **핵심 차이** (v1.1과 비교):
> - Page가 **Row** (Column 아님)
> - 헤더가 **일반 RE 배치** (Floating Group 아님)
> - 헤더는 사이드바 옆 MainArea 안에만 존재
> - 사이드바가 화면 전체 높이 (100vh)

### 4.3 Group_SidebarWrapper

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Column | |
| **Width** | `256px` (Fixed) | |
| **Make this element fixed-width** | ✅ | |
| **Height** | `100vh` 또는 `100%` | 페이지 전체 높이 |
| **Make this element fixed-height** | ✅ | |
| **Background** | (없음 — RE_Sidebar Navy가 처리) | |
| **Overflow** | Hidden | |
| **Collapse when hidden** | ✅ | ★ 모바일에서 숨길 때 공간 반납 |

**내부: RE_Sidebar** (256px × 100%)

📥 **Property 설정** (Appearance 탭):

| Property | 값 |
|----------|-----|
| `active_page` | `student-dashboard` |

> ★ RE v1.4에서 active_page가 "student-dashboard"이면 사이드바의 **"홈"** NavItem이 하이라이트됩니다.

**반응형 Conditional:**

| 조건 | 속성 | 값 |
|------|------|-----|
| `Current page width ≤ 1200` | Visible | `false` |

> Collapse when hidden = ✅ 이므로, 숨기면 256px 공간이 사라지고
> Group_MainArea가 전체 폭을 차지합니다.

### 4.4 Group_MainArea

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Column | |
| **Make this element fixed-width** | ❌ | flex: 1 (남은 너비 차지) |
| **Min width** | `0` | flex 자식 overflow 방지 |
| **Height** | `100vh` 또는 `100%` | |
| **Row gap** | `0` | Header와 MainContent 사이 간격 없음 |

### 4.5 RE_Header (일반 배치)

> ★ Floating Group이 **아닙니다**! Group_MainArea Column의 **첫 번째 자식**으로 배치합니다.

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `100%` | MainArea 전체 폭 |
| **Height** | `64px` (Fixed) | |
| **Make this element fixed-height** | ✅ | |

📥 **Property 설정** (Appearance 탭):

| Property | 값 | 비고 |
|----------|-----|------|
| `page_title` | `대시보드` | 텍스트 직접 입력 |
| `notif_count` | `Search for Notifications` | 아래 참조 |

```
notif_count 검색 설정:
  Type: Notification
  Constraint 1: user_id = Current User
  Constraint 2: is_read = no
  → :count

→ MVP에서 Notification 데이터 없으면 0 표시 (정상)
→ 하드코딩 NO — 검색식 미리 넣어두면 향후 자동 작동
```

> 💡 **왜 Floating Group이 아닌가?**
> - Floating Group으로 만들면 헤더가 **사이드바 위에도 걸쳐서** 표시됩니다.
> - 목업처럼 헤더가 **사이드바 옆(오른쪽)에만** 있으려면 MainArea Column 안에 일반 배치해야 합니다.
> - MainArea가 Column이고 Height가 100vh이므로 헤더는 자연스럽게 상단 고정됩니다.

### 4.6 Group_MainContent

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Column | |
| **Make this element fixed-width** | ❌ | (부모 100% 상속) |
| **Make this element fixed-height** | ❌ | flex: 1 (남은 높이 차지) |
| **Min width** | `0` | |
| **Padding** | 상 `28px`, 좌우 `32px`, 하 `28px` | |
| **Row gap** | `24px` | 내부 섹션 간격 |
| **Vertical scrolling** | ✅ when content is taller | ★ 이 영역만 스크롤 |

> 💡 Header는 스크롤되지 않고 고정, MainContent만 스크롤되는 구조입니다.
> 이는 MainArea가 Column이고 Header가 fixed-height이기 때문에 자연스럽게 작동합니다.

### 4.7 모바일 사이드바 (≤ 1200px)

#### FG_MobileSidebar

| 속성 | 값 | 비고 |
|------|-----|------|
| **Type** | Floating Group | |
| **Horizontally float relative to** | Left | |
| **Float margin** | `0` | |
| **Width** | `256px` | |
| **Height** | `100%` | |
| **Visible on page load** | ❌ | |
| **Background** | (없음 — RE_Sidebar Navy가 처리) | |

**내부: RE_Sidebar** (256px × 100%)

📥 `active_page` = `student-dashboard`

**Conditional:**

| 조건 | 속성 | 값 |
|------|------|-----|
| `RE_Header's sidebar_open is "yes"` | Visible | `true` |

> PC에서는 Group_SidebarWrapper가 같은 위치에 있어 FG가 보여도 뒤에 가려집니다.
> 모바일에서는 SidebarWrapper가 숨겨져 있으므로 FG만 표시됩니다.

#### Group_SidebarOverlay

| 속성 | 값 |
|------|-----|
| **Width** | `100%` |
| **Height** | `100%` |
| **Background** | `#000000`, Opacity `50%` |
| **Visible on page load** | ❌ |

**Conditional:**

| 조건 | 속성 | 값 |
|------|------|-----|
| `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "yes"` | Visible | `true` |

**Workflow: Overlay 클릭**

| Action | Set state: `RE_Header's sidebar_open` = `no` |
|--------|------|

### 4.8 close_requested 신호 처리

| Event | `Do when condition is true` |
|-------|----------------------------|
| **Only when** | `RE_Sidebar's close_requested is "yes"` |
| **Action 1** | Set state: `RE_Header's sidebar_open` = `no` |
| **Action 2** | Set state: `RE_Sidebar's close_requested` = `no` |

> FG_MobileSidebar 안의 RE_Sidebar에서도 close_requested가 발생하며,
> 부모 페이지에서 감지하므로 **두 RE_Sidebar 인스턴스 모두** 처리됩니다.

---

## 5. 스타일 매핑 총정리

> ★ Element Styles에 이미 **반응형 Conditional(브레이크포인트별 폰트 크기)**이 포함되어 있으므로,
> 스타일을 적용하면 별도 폰트 크기 Conditional이 **불필요**합니다.

### 5.1 Text 스타일 매핑

| 요소 | Element Style | 비고 |
|------|-------------|------|
| Text_GreetingTitle | **Heading 3** (24px, 600, Navy) | 반응형: 24→22→20→18 자동 |
| Text_GreetingSub | **Body 14** + color 커스텀 | 색상 `#6B7280` (Text Secondary)로 오버라이드 |
| Text_DTLabel | **Label** + weight 커스텀 | 14px→15px 불가, 14px 500 기반 + weight 600 오버라이드 |
| Text_DTCount | **Body 14** + color 커스텀 | 색상 `#6B7280` (Text Secondary)로 오버라이드 |
| Text_SCName | **Heading 5** + color 커스텀 | 18px, 600 일치. 색상 Navy로 오버라이드 |
| Text_SCDesc | 커스텀 | 13px 스타일 없음. 수동: 13px, 400, `#6B7280` |
| Text_SCBadge | **Badge** + Conditional | 12px, 500 기반. 11px 차이 → 수동 11px 오버라이드 |
| Text_SCProgressLabel | **Caption** ✅ | 12px, 400, Text Secondary — 정확히 일치 |
| Text_SCProgressCount | 커스텀 | 13px, 700, 과목 색상. 수동 설정 |
| Text_DTSubjectLabel | **Caption** ✅ | 12px, 400, Text Secondary — 정확히 일치 |
| 빈 상태 텍스트 | **Body 14** + color 커스텀 | 색상 `#9CA3AF` (Text Tertiary) |

### 5.2 XP 카드 내부 (다크 배경 — 모두 커스텀)

> XP 카드는 Navy 그래디언트 배경 위 흰색 텍스트이므로 기존 Element Style 적용 불가.
> 모든 텍스트를 **커스텀**으로 수동 설정합니다.

| 요소 | 스펙 | 비고 |
|------|------|------|
| "Lv." 라벨 | 10px, 500, `#FFFFFF99` | 커스텀 |
| Text_LevelNum | 20px, 800, `#FFFFFF` | 커스텀 |
| "누적 경험치" | 11px, 400, `#FFFFFF80` | 커스텀 |
| Text_XPValue | 22px, 700, `#FFFFFF` | 커스텀 |
| Stat 이모지 | 24px | 커스텀 (텍스트 요소) |
| Stat 값 (16px) | 16px, 700, `#FFFFFF` | 커스텀 |
| Stat 라벨 (11px) | 11px, 400, `#FFFFFF80` | 커스텀 |

### 5.3 Group 스타일 매핑

| 요소 | Element Style | 차이점 |
|------|-------------|--------|
| Group_DailyTarget | **Card Bordered** + roundness 커스텀 | 스타일: roundness 12 → 목업: 16으로 오버라이드 |
| Group_CardKorean/English/Math | **Card Bordered** + roundness 커스텀 | 동일: roundness 12 → 16으로 오버라이드 |
| Group_XP | 커스텀 | Navy gradient (CSS), roundness 16 |
| Group_Greeting | **Transparent** ✅ | 정확히 일치 |
| Group_SubjectCards | **Transparent** ✅ | 정확히 일치 |

### 5.4 Button 스타일 매핑

| 요소 | Element Style | 차이점 |
|------|-------------|--------|
| Button_StartKorean | 커스텀 (Tonal) | Light BG `#EBF2FE` + colored text — 기존 Filled/Outline과 다름 |
| Button_StartEnglish | 커스텀 (Tonal) | Light BG `#E8F5E9` + colored text |
| Button_StartMath | 커스텀 (Tonal) | Light BG `#FFF8E1` + colored text |

> 💡 기존 **Filled Korean** 스타일은 진한 BG(`#4285F4`) + 흰색 텍스트입니다.
> 대시보드 버튼은 연한 BG + 진한 텍스트(Tonal)이므로 커스텀 처리합니다.
> Hover 시 Filled 스타일로 전환되는 패턴입니다.

---

## 6. 인사말 섹션

### Group_Greeting

| 속성 | Element Style |
|------|-------------|
| **Style** | **Group - Transparent** |
| **Container layout** | Column |
| **Row gap** | `4px` |
| **Width** | `100%` |

### Text_GreetingTitle

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Heading 3** ✅ |
| 추가 설정 없음 | 24px, 600, Navy + 반응형 Conditional 모두 스타일에 포함 |

**동적 텍스트:**

```
"안녕, " + Current User's name + "! 👋"
```

Bubble Editor에서:
1. `Insert dynamic data` → 텍스트 `안녕, `
2. `Insert dynamic data` → `Current User's name`
3. `Insert dynamic data` → 텍스트 `! 👋`

### Text_GreetingSub

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Body 14** |
| **Color** | `#6B7280` (Text Secondary) ← 커스텀 오버라이드 |

> Body 14 기본 색상은 Text Primary(`#1F2937`)이므로 색상만 변경합니다.

**동적 텍스트:**

```
Current date/time:formatted as yyyy"년 "M"월 "d"일 "dddd + " · 오늘도 화이팅!"
```

> Settings > Languages > Default language = Korean 설정 시 요일이 한글로 표시됩니다.

---

## 7. Daily Target 요약 바

### 7.1 Custom State (Page 레벨)

> 반복 검색 방지를 위해 Page Load 시 한 번만 검색하여 Custom State에 저장합니다.

| State Name | Type | Default |
|------------|------|---------|
| `state_today_targets` | List of DailyLearningTargets | (비움) |

### WF-LOAD-03: 데이터 로드

| 항목 | 값 |
|------|-----|
| **Event** | Page is loaded |
| **Only when** | `Current User is logged in` AND `Current User's role is "STUDENT"` |
| **Action** | Set state → `state_today_targets` |

```
Set state 값:
  Search for DailyLearningTargets
    Constraint 1: student_id = Current User
    Constraint 2: target_date = Current date/time:rounded down to date
```

### 7.2 Group_DailyTarget

| 속성 | 값 |
|------|-----|
| **Style** | **Group - Card Bordered** |
| **Container layout** | Column |
| **Row gap** | `14px` |
| **Width** | `100%` |
| **Roundness** | `16` ← 커스텀 오버라이드 (기본 12) |
| **Padding** | `20px 24px` ← 커스텀 오버라이드 (기본 24) |

### 7.3 Group_DTHeader (Row)

**Text_DTLabel:**

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Label** |
| 텍스트 | `오늘의 학습 목표` |
| **Font weight** | `600` ← 커스텀 오버라이드 (기본 500) |

**Text_DTCount:**

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Body 14** |
| **Color** | `#6B7280` (Text Secondary) ← 커스텀 오버라이드 |

동적 텍스트 — 완료/목표 합산:

```
완료 합계 표현식:
  state_today_targets:each item's completed_count:sum

목표 합계 표현식:
  state_today_targets:each item's target_count:sum

표시: [완료합계] + " / " + [목표합계] + " 완료"
```

> ⚠️ Bubble에서 `:each item's field:sum`이 작동하지 않는 경우가 있습니다.
> **대안**: 과목별 개별 검색 후 합산 (7.5절 참조)

### 7.4 프로그레스 바 (HTML Element)

> ★ Bubble HTML Element는 Page Header CSS가 내부에 적용되지 않으므로 **인라인 스타일**을 사용합니다.

**HTML Element 추가:**
- Bubble Editor → Visual elements → HTML
- Width: 100%, **Min height: 12px**

**HTML 코드 (그대로 복사):**

```html
<div style="width:100%; height:12px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:linear-gradient(90deg,#FF6D4D,#FF8F73); border-radius:999px; transition:width 0.6s ease;"></div>
</div>
```

**동적 너비 설정 방법:**

`[동적]` 부분을 Bubble 표현식으로 교체:

```
width: Insert dynamic data

표현식:
  state_today_targets:each item's completed_count:sum
  /
  state_today_targets:each item's target_count:sum
  * 100
  :formatted as #

결과 예시: width: 57%
```

> ⚠️ 목표 합계가 0이면 NaN 방지 필요:
> **가장 안전한 방법**: Conditional로 분기
> - state_today_targets:count is 0 → HTML에서 width: 0%
> - state_today_targets:count > 0 → 정상 계산

### 7.5 과목별 소진도 (Row)

#### Group_DTSubjects (Row, gap: 16px)

3개 과목별 텍스트:

```
● 국어 [완료]/[목표]     ● (8×8, #4285F4)
● 영어 [완료]/[목표]     ● (8×8, #34A853)
● 수학 [완료]/[목표]     ● (8×8, #FBBC05)
```

**각 라벨 텍스트:**

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Caption** ✅ | 
| 추가 설정 없음 | 12px, 400, Text Secondary — 정확히 일치 |

**각 과목 데이터 바인딩 (국어 예시):**

```
국어 완료:
  state_today_targets :filtered
    Advanced: This DailyLearningTarget's subject is KOREAN
  :first item's completed_count

국어 목표:
  (동일 필터) :first item's target_count
```

> ★ `:filtered`는 클라이언트 사이드 연산이므로 **추가 서버 호출이 없습니다.**

### 7.6 빈 상태

**Group_DTEmpty** (state_today_targets:count is 0 일 때):

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Body 14** |
| **Text** | `학습 목표가 설정되지 않았습니다` |
| **Color** | `#9CA3AF` (Text Tertiary) ← 커스텀 오버라이드 |
| **Align** | Center |
| **Visible when** | `state_today_targets:count is 0` |

Group_DTHeader / HTML 프로그레스 / Group_DTSubjects → `state_today_targets:count is 0` 일 때 Visible = false

---

## 8. 과목 카드 3개

### 8.1 Group_SubjectCards (컨테이너)

| 속성 | Element Style |
|------|-------------|
| **Style** | **Group - Transparent** |
| **Container layout** | Row |
| **Column gap** | `16px` |
| **Width** | `100%` |

> 각 카드는 **독립 Group**으로 만듭니다 (과목이 3개 고정이고, 색상/아이콘이 다르므로 RG보다 간단).

### 8.2 카드 공통 구조 (국어 기준)

```
Group_CardKorean (Card Bordered, roundness 16)
│
├── Group_SCTop ────────── Row (justify: space-between)
│   ├── Group_SCIcon ───── 48×48, rounded: 14, BG: #4285F4
│   │   └── Icon: menu_book (24px, white)
│   └── Text_SCBadge ──── Badge 커스텀 (11px, 600)
│
├── Text_SCName ─────────── Heading 5 (18px, 600, Navy 오버라이드)
├── Text_SCDesc ─────────── 커스텀 (13px, 400, Secondary)
│
├── Group_SCProgress ────── Column
│   ├── Group_SCProgressHeader ── Row
│   │   ├── Text_Label ──── Caption ✅ (12px, 400, Secondary)
│   │   └── Text_Count ──── 커스텀 (13px, 700, 과목색상)
│   └── HTML_ProgressBar ── HTML Element (인라인 스타일)
│
└── Button_StartKorean ──── 커스텀 Tonal (Light BG → Hover: Filled)
```

### 8.3 카드 Group

| 속성 | 값 |
|------|-----|
| **Style** | **Group - Card Bordered** |
| **Width** | (비움 — Row 안에서 3등분) |
| **Min width** | `280px` |
| **Roundness** | `16` ← 커스텀 오버라이드 (기본 12) |
| **Padding** | `24px` (기본과 동일) |

### 8.4 카드 내부 텍스트

**Text_SCName (과목명 "국어"):**

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Heading 5** |
| **Color** | `#1A2E4D` (Navy) ← 커스텀 오버라이드 (기본 Text Primary) |

> 반응형: 18px→16px (≤1024) 자동 적용

**Text_SCDesc (설명 "5단계 구조화 학습"):**

| 속성 | 값 |
|------|-----|
| **Style** | 커스텀 (스타일 없음) |
| **Font size** | `13px` |
| **Font weight** | `400` |
| **Color** | `#6B7280` (Text Secondary) |
| **Margin bottom** | `16px` |

**과목별 설명 텍스트:**

| 과목 | Text_SCDesc |
|------|------------|
| 국어 | 5단계 구조화 학습 |
| 영어 | 7초 발음 테스트 |
| 수학 | Jump/Anchor 문제풀이 |

**Text_SCProgressLabel ("오늘 진도"):**

| 속성 | 값 |
|------|-----|
| **Style** | **Text - Caption** ✅ |
| 추가 설정 없음 | 12px, 400, Text Secondary — 정확히 일치 |

**Text_SCProgressCount ("2 / 2"):**

| 속성 | 값 |
|------|-----|
| **Style** | 커스텀 (스타일 없음) |
| **Font size** | `13px` |
| **Font weight** | `700` |
| **Color** | 과목별 색상 (아래 표) |

### 8.5 과목별 색상표

| 과목 | 아이콘 | 아이콘 BG | Text_SCProgressCount Color | 프로그레스 색상 |
|------|--------|-----------|---------------------------|---------------|
| 국어 | `menu_book` | `#4285F4` | `#4285F4` | `#4285F4` |
| 영어 | `translate` | `#34A853` | `#34A853` | `#34A853` |
| 수학 | `calculate` | `#FBBC05` | `#E6A800` | `#FBBC05` |

### 8.6 상태 뱃지 (Text_SCBadge)

| 속성 | 값 |
|------|-----|
| **Style** | 커스텀 (Badge 12px 기반이나 11px 필요) |
| **Font size** | `11px` |
| **Font weight** | `600` |
| **Padding** | `4px 10px` |
| **Roundness** | `20` |

**Conditional 3개 (국어 기준):**

```
데이터 참조:
  state_today_targets :filtered (subject = KOREAN) :first item
```

| # | 조건 | 텍스트 | BG | Text Color |
|---|------|--------|-----|-----------|
| 1 | `...:first item's is_achieved is "yes"` | 완료! | `#DCFCE7` | `#22C55E` |
| 2 | `...:first item's completed_count > 0` AND `is_achieved is "no"` | 진행중 | `#DBEAFE` | `#3B82F6` |
| 3 | `...:first item's completed_count is 0` OR count = 0 | 미시작 | `#F3F4F6` | `#9CA3AF` |

### 8.7 과목 프로그레스 바 (HTML Element)

각 카드 안에 HTML Element 1개 (Min height: 6px):

```html
<!-- 국어 (그대로 복사) -->
<div style="width:100%; height:6px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:#4285F4; border-radius:999px; transition:width 0.6s ease;"></div>
</div>

<!-- 영어 — background만 변경 -->
<div style="width:100%; height:6px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:#34A853; border-radius:999px; transition:width 0.6s ease;"></div>
</div>

<!-- 수학 — background만 변경 -->
<div style="width:100%; height:6px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:#FBBC05; border-radius:999px; transition:width 0.6s ease;"></div>
</div>
```

> ★ 과목별 차이는 **내부 div의 `background` 색상**만 다릅니다.

### 8.8 학습하기 버튼

| 속성 | 값 |
|------|-----|
| **Style** | 커스텀 (Tonal — 기존 버튼 스타일과 다름) |
| **Width** | `100%` |
| **Height** | `42px` |
| **Roundness** | `10` |
| **Font size** | `14px` |
| **Font weight** | `600` |
| **Icon** | `play_arrow` (왼쪽) |

**과목별 색상:**

| 과목 | 기본 BG | 기본 Color | Hover BG | Hover Color |
|------|---------|-----------|----------|------------|
| 국어 | `#EBF2FE` | `#4285F4` | `#4285F4` | `#FFFFFF` |
| 영어 | `#E8F5E9` | `#34A853` | `#34A853` | `#FFFFFF` |
| 수학 | `#FFF8E1` | `#E6A800` | `#FBBC05` | `#7A5C00` |

**Workflow:**

| 버튼 | Action |
|------|--------|
| Button_StartKorean | Go to page: `subject-korean` |
| Button_StartEnglish | Go to page: `subject-english` |
| Button_StartMath | Go to page: `subject-math` |

### 8.9 카드 빈 상태

DailyLearningTarget이 없어도 **카드는 항상 표시**합니다.

| 상황 | 뱃지 | 진도 | 프로그레스 |
|------|------|------|----------|
| Target 없음 | "미시작" | `- / -` | 0% |
| Target 있고 완료 0 | "미시작" | `0 / [목표]` | 0% |
| 진행중 | "진행중" | `[완료] / [목표]` | 계산% |
| 달성 | "완료!" | `[완료] / [목표]` | 100% |

### 8.10 반응형

| 조건 | 변경 |
|------|------|
| `Current page width ≤ 900` | 각 카드 Min width = `100%` → 세로 1열 |

> ★ 텍스트 반응형은 Element Style이 처리하므로 별도 Conditional 불필요

---

## 9. XP 카드

### 9.1 데이터 소스

```
StudentProfile 테이블:
  Search for StudentProfiles
    Constraint: user_id = Current User
  :first item

필드: total_xp, current_level
```

### 9.2 Group_XP

| 속성 | 값 |
|------|-----|
| **Style** | 커스텀 (Navy gradient) |
| **ID attribute** | `xpCard` |
| **Container layout** | Row |
| **Width** | `100%` |
| **Min height** | `96px` |
| **Background** | `#1A2E4D` (Bubble) + CSS gradient 오버라이드 |
| **Roundness** | `16` |
| **Padding** | `24px` |
| **Column gap** | `16px` |

> gradient는 Section 2의 `#xpCard` CSS가 처리합니다.

### 9.3 내부 구조 (모두 커스텀)

> ★ XP 카드는 다크 배경이므로 **모든 텍스트가 커스텀**입니다.

```
Group_XP (Row, justify: space-between, align: center)
│
├── Group_XPLeft (Row, gap: 16px, align: center)
│   ├── Group_XPLevel ─── 56×56, circle
│   │   │  BG: #FFFFFF1A, Border: 2px #FFFFFF33
│   │   ├── Text "Lv."     커스텀 (10px, 500, #FFFFFF99)
│   │   └── Text_LevelNum  커스텀 (20px, 800, #FFFFFF) ← 동적
│   └── Group_XPInfo (Column)
│       ├── Text "누적 경험치"  커스텀 (11px, 400, #FFFFFF80)
│       └── Text_XPValue       커스텀 (22px, 700, #FFFFFF) ← 동적
│
└── Group_XPRight (Row, gap: 24px)
    ├── Stat: 🔥 / 커스텀 (16px, 700, #FFF) / 커스텀 (11px, 400, #FFFFFF80)
    ├── Stat: ⭐ / 커스텀 (16px, 700, #FFF) / 커스텀 (11px, 400, #FFFFFF80)
    └── Stat: 📊 / 커스텀 (16px, 700, #FFF) / 커스텀 (11px, 400, #FFFFFF80)
```

### 9.4 데이터 바인딩

| 요소 | 표현식 |
|------|--------|
| Text_LevelNum | `Search for StudentProfiles (user_id=Current User) :first item's current_level` |
| Text_XPValue | `...:first item's total_xp:formatted as #,###` + ` XP` |

### 9.5 Streak / 이번 주 / 주간 달성률 — MVP 하드코딩

| 항목 | MVP 값 | 향후 교체 방법 |
|------|--------|---------------|
| 연속 학습 | `0일` | StudentProfile에 `streak_days` 필드 추가 |
| 이번 주 완료 | `0개` | DailyLearningTarget (이번 주, is_achieved=yes):count |
| 주간 달성률 | `0%` | 완료/목표 비율 계산 |

> ★ Day 2 이후 학습 기능 완성되면 실제 계산으로 교체합니다.

---

## 10. Workflow 총정리

### Page Load (3개)

| # | Event | Only when | Action |
|---|-------|-----------|--------|
| WF-LOAD-01 | Page is loaded | Current User is logged out | Go to page: `login` |
| WF-LOAD-02 | Page is loaded | role ≠ STUDENT | Go to page: 역할별 |
| WF-LOAD-03 | Page is loaded | role = STUDENT | Set state: `state_today_targets` |

### 사이드바 연동 (2개)

| # | Event | Action |
|---|-------|--------|
| WF-SB-01 | Do when: `RE_Sidebar's close_requested = yes` | Set state: sidebar_open = no → close_requested = no |
| WF-OV-01 | Group_SidebarOverlay clicked | Set state: sidebar_open = no |

### 버튼 (3개)

| # | Event | Action |
|---|-------|--------|
| WF-BTN-01 | Button_StartKorean clicked | Go to page: `subject-korean` |
| WF-BTN-02 | Button_StartEnglish clicked | Go to page: `subject-english` |
| WF-BTN-03 | Button_StartMath clicked | Go to page: `subject-math` |

**총 Workflow: 8개**

---

## 11. Conditional 총정리

### 반응형 (4개)

| # | 요소 | 조건 | 변경 |
|---|------|------|------|
| C-01 | Group_SidebarWrapper | `width ≤ 1200` | Visible = false (Collapse when hidden = ✅) |
| C-02 | FG_MobileSidebar | `sidebar_open = yes` | Visible = true |
| C-03 | Group_SidebarOverlay | `width ≤ 1200` AND `sidebar_open = yes` | Visible = true |
| C-04 | Group_SubjectCards 내부 카드 | `width ≤ 900` | Min width = 100% |

### Daily Target 빈 상태 (2개)

| # | 요소 | 조건 | 변경 |
|---|------|------|------|
| C-06 | Group_DTEmpty | `state_today_targets:count is 0` | Visible = true |
| C-07 | DTHeader + Progress + DTSubjects | `state_today_targets:count is 0` | Visible = false |

### 과목 뱃지 (9개 — 과목당 3개)

| # | 과목 | 조건 | 텍스트 | BG / Color |
|---|------|------|--------|-----------|
| C-10 | 국어 | is_achieved = yes | 완료! | `#DCFCE7` / `#22C55E` |
| C-11 | 국어 | completed > 0 AND not achieved | 진행중 | `#DBEAFE` / `#3B82F6` |
| C-12 | 국어 | completed = 0 또는 없음 | 미시작 | `#F3F4F6` / `#9CA3AF` |
| C-13~15 | 영어 | (동일 패턴) | — | — |
| C-16~18 | 수학 | (동일 패턴) | — | — |

### 버튼 Hover (3개)

| # | 요소 | 조건 | BG | Color |
|---|------|------|-----|-------|
| C-20 | Button_StartKorean | hovered | `#4285F4` | white |
| C-21 | Button_StartEnglish | hovered | `#34A853` | white |
| C-22 | Button_StartMath | hovered | `#FBBC05` | `#7A5C00` |

**총 Conditional: 18개**

---

## 12. 테스트 데이터 및 체크리스트

### 12.1 사전 준비

| 준비 항목 | 설정 |
|-----------|------|
| 테스트 계정 | 01011110000 / mb1234 |
| User.is_first_login | ★ `no`로 변경 (Data 탭에서) |
| StudentProfile | user_id = 테스트학생A, grade = E1, total_xp = 0, current_level = 1 |

### 12.2 DailyLearningTarget 테스트 데이터

Data 탭 → DailyLearningTarget → `New entry` × 3:

| # | student_id | target_date | subject | target_count | completed_count | is_achieved |
|---|------------|-------------|---------|-------------|----------------|-------------|
| 1 | 테스트학생A | 오늘 | KOREAN | 2 | 2 | yes |
| 2 | 테스트학생A | 오늘 | ENGLISH | 3 | 1 | no |
| 3 | 테스트학생A | 오늘 | MATH | 2 | 1 | no |

### 12.3 테스트 체크리스트 (20항목)

```
[접근 제어]
□ 1.  비로그인 → /student-dashboard → login 리다이렉트
□ 2.  관리자(01099990000) 로그인 → /student-dashboard → admin-dashboard 리다이렉트
□ 3.  학생(01011110000) 로그인 → 정상 표시

[Type A 템플릿]
□ 4.  FG_Header: "대시보드" 텍스트 표시
□ 5.  RE_Sidebar: "홈" NavItem 하이라이트 (active)
□ 6.  사이드바 메뉴: [학습] 홈/국어/영어/수학 + [관리] 플래너/리포트

[인사말]
□ 7.  "안녕, 테스트학생A! 👋" 표시
□ 8.  오늘 날짜 한글 표시 (YYYY년 M월 D일 요일)

[Daily Target]
□ 9.  전체 진도: "4 / 7 완료"
□ 10. 프로그레스 바: 약 57% 채움
□ 11. 과목별: 국어 2/2, 영어 1/3, 수학 1/2

[과목 카드]
□ 12. 국어: "완료!" 뱃지 (초록), 100%
□ 13. 영어: "진행중" 뱃지 (파랑), 33%
□ 14. 수학: "진행중" 뱃지 (파랑), 50%
□ 15. "학습하기" 버튼 호버 → 색상 변경

[XP 카드]
□ 16. 레벨: "1", XP: "0 XP"
□ 17. Streak/이번주/달성률: "0일" / "0개" / "0%"

[빈 상태]
□ 18. DailyLearningTarget 3개 삭제 → "학습 목표가 설정되지 않았습니다"

[반응형]
□ 19. 1200px 이하: 사이드바 숨김, 햄버거 클릭 → 모바일 사이드바
□ 20. 768px 이하: 카드 1열, XP 카드 세로
```

### 12.4 Data 탭 검증

| Data Type | 확인 항목 | 예상 값 |
|-----------|-----------|---------|
| User (테스트학생A) | role | STUDENT |
| User (테스트학생A) | is_first_login | no |
| StudentProfile | total_xp / current_level | 0 / 1 |
| DailyLearningTarget × 3 | target_date = 오늘 | ✅ |

---

## 📌 Quick Reference — 복사용

### Element Style 매핑 (빠른 참조)

```
✅ = 정확히 일치 (추가 설정 불필요)
⚙️ = 스타일 적용 후 일부 오버라이드

Text_GreetingTitle  → ✅ Heading 3
Text_GreetingSub    → ⚙️ Body 14 (color → Text Secondary)
Text_DTLabel        → ⚙️ Label (weight → 600)
Text_DTCount        → ⚙️ Body 14 (color → Text Secondary)
Text_SCName         → ⚙️ Heading 5 (color → Navy)
Text_SCDesc         → ❌ 커스텀 (13px, 400, Secondary)
Text_SCBadge        → ❌ 커스텀 (11px, 600, Conditional)
Text_SCProgressLabel→ ✅ Caption
Text_SCProgressCount→ ❌ 커스텀 (13px, 700, 과목색상)
빈 상태 텍스트       → ⚙️ Body 14 (color → Text Tertiary)
XP 카드 전체 텍스트  → ❌ 모두 커스텀 (다크 배경)

Group_DailyTarget   → ⚙️ Card Bordered (roundness → 16)
Group_Card*         → ⚙️ Card Bordered (roundness → 16)
Group_XP            → ❌ 커스텀 (gradient)
Button_Start*       → ❌ 커스텀 Tonal (Light BG + Hover: Filled)
```

### RE Property 설정 (요소 Appearance 탭)

```
RE_Header (Group_MainArea 안에 일반 배치):
  page_title  = "대시보드"
  notif_count = Search for Notifications [user_id=Current User, is_read=no]:count

RE_Sidebar (× 2개 인스턴스: SidebarWrapper + MobileSidebar):
  active_page = "student-dashboard"
```

### Page HTML Header (그대로 복사)

```html
<style>
#xpCard{background:linear-gradient(135deg,#1A2E4D 0%,#2A4060 100%)!important}
</style>
```

### 프로그레스 바 HTML (인라인 스타일 — 카드에 복사)

```html
<!-- Daily Target (height: 12px) -->
<div style="width:100%; height:12px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:linear-gradient(90deg,#FF6D4D,#FF8F73); border-radius:999px; transition:width 0.6s ease;"></div>
</div>

<!-- 국어 (height: 6px, background: #4285F4) -->
<div style="width:100%; height:6px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:#4285F4; border-radius:999px; transition:width 0.6s ease;"></div>
</div>

<!-- 영어 (background: #34A853) -->
<div style="width:100%; height:6px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:#34A853; border-radius:999px; transition:width 0.6s ease;"></div>
</div>

<!-- 수학 (background: #FBBC05) -->
<div style="width:100%; height:6px; background:#F3F4F6; border-radius:999px; overflow:hidden;">
  <div style="width:[동적]%; height:100%; background:#FBBC05; border-radius:999px; transition:width 0.6s ease;"></div>
</div>
```

---

## 🚀 다음 단계

```
Day 2: 국어 학습
  - subject-korean (국어 메인: 지문 목록)
  - korean-reading (지문 읽기: 7분 타이머)
  - korean-bridging (O/X 퀴즈)
```

---

*— MAMA-ASST S-01 학생 대시보드 구현 가이드 v1.2 끝 —*
