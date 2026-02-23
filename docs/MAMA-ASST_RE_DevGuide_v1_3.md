# MAMA-ASST Reusable Elements 상세 개발 가이드

> **버전**: v1.3 | **작성일**: 2025-02-23  
> **범위**: RE_Header + GF_Notification + GF_UserMenu / RE_Sidebar  
> **선행 완료**: 44 Style Variables, 61 Element Styles, RE_Toast, RE_Checkbox, RE_Radio, RE_Loading
>
> ### ⚠️ v1.3 변경사항
> | 항목 | v1.2 | v1.3 | 사유 |
> |------|------|------|------|
> | RE 목록 | 7개 (Header, Sidebar, Modal, Checkbox, Radio, Toast, Loading) | **6개** (Modal 제외) | Popup은 RE로 만들 수 없고, 페이지마다 Body가 다르므로 페이지별 직접 생성 |
> | 모달/팝업 | Section 5: RE_Modal 상세 가이드 | **삭제** → 페이지별 Popup 가이드로 대체 | Element Style(`Popup - Standard`)만 통일, 내부 구조는 자유 |
> | RE 총 개수 | 7개 | **6개**: RE_Header, RE_Sidebar, RE_Checkbox, RE_Radio, RE_Toast, RE_Loading | |

---

## 📌 빠른 참조: Style Variables

본 가이드에서 반복 사용되는 Style Variable 값입니다.

| Variable | HEX | 용도 |
|----------|-----|------|
| Primary | `#FF6D4D` | CTA, 강조, 로고 |
| Primary Hover | `#E55A3C` | Primary hover |
| Navy | `#1A2E4D` | 제목, 사이드바, 네비게이션 |
| Text Primary | `#1F2937` | 본문 텍스트 |
| Text Secondary | `#6B7280` | 보조 텍스트, 아이콘 |
| Text Tertiary | `#9CA3AF` | Placeholder, Disabled |
| Text Inverse | `#FFFFFF` | 어두운 배경 위 텍스트 |
| Border Light | `#E5E7EB` | 기본 테두리 |
| Background | `#F9FAFB` | 페이지 배경 |
| Surface | `#FFFFFF` | 카드, 입력 필드 배경 |
| BG Hover | `#F3F4F6` | 호버 배경 |
| Destructive | `#EF4444` | 에러, 삭제 |
| Error Light | `#FEF2F2` | 에러 배경 |
| Success | `#22C55E` | 성공 |
| Info | `#3B82F6` | 정보 |
| Alert | `#F59E0B` | 경고 |

---

## ⚠️ 핵심 개념: Property vs Custom State

Bubble Reusable Element에는 두 가지 데이터 전달 방식이 있습니다. **반드시 구분**하여 사용하세요.

| | **Property** 📥 | **Custom State** 🔄 |
|---|---|---|
| **설정 위치** | RE 설정 패널 → `+ Add new property` | Element Inspector → `Add a new custom state` |
| **데이터 방향** | **부모 페이지 → RE** (외부에서 주입) | **RE 내부에서 자체 관리** |
| **변경 가능** | ❌ RE 내부에서 변경 불가 | ✅ RE 내부 Workflow에서 Set state로 변경 |
| **부모에서 읽기** | ❌ 부모 페이지에서 읽기 불가 | ✅ 부모 페이지에서 `RE이름's state이름`으로 읽기 가능 |
| **사용 시점** | 부모가 값을 넣어주기만 하면 되는 경우 | RE 내부에서 토글/변경해야 하거나, 부모가 상태를 읽어야 하는 경우 |
| **예시** | 페이지 제목, 알림 수 | 사이드바 열림/닫힘 토글 |

### 판단 기준 흐름

```
Q: RE 내부에서 이 값을 변경해야 하나?
├── YES → Custom State
│         Q: 부모 페이지에서도 이 값을 읽어야 하나?
│         ├── YES → Custom State (양방향 필요)
│         └── NO  → Custom State (내부 전용)
│
└── NO  → Property
          (부모가 넣어주는 읽기 전용 값)
```

### 전체 컴포넌트 Property / Custom State 매핑

| 컴포넌트 | 항목 | 📥 Property | 🔄 Custom State | 이유 |
|----------|------|:-----------:|:---------------:|------|
| **RE_Header** | `page_title` | ✅ | | 부모가 텍스트 주입, RE 내부 변경 없음 |
| **RE_Header** | `notif_count` | ✅ | | 부모가 검색 결과 주입, RE 내부 변경 없음 |
| **RE_Header** | `sidebar_open` | | ✅ | RE 내부 햄버거 클릭으로 토글 + 부모에서 읽기 |
| **RE_Sidebar** | `active_page` | ✅ | | 부모가 페이지명 주입, RE 내부 변경 없음 |
| **RE_Sidebar** | `close_requested` | | ✅ | RE 내부 Close 버튼 클릭 시 `yes` 설정 → 부모가 읽고 sidebar_open 닫기 |

---

# 1. RE_Header (헤더)

RE_Header는 모든 인증된 페이지의 상단에 표시되는 공통 헤더입니다.  
GF_Notification과 GF_UserMenu는 **RE_Header 내부에 포함된** Group Focus이므로, RE_Header를 페이지에 배치하면 자동으로 함께 사용됩니다.

---

## 1.1 Reusable Element 생성

### Bubble Editor 경로
`Reusable elements` 탭 → `New reusable element`

### 기본 설정

| 설정 항목 | 값 | 비고 |
|-----------|-----|------|
| **Element name** | `RE_Header` | |
| **Type of content** | (없음) | 데이터 전달은 Property + Custom State로 처리 |
| **Width** | (비움 — 사용처에서 100% 지정) | |
| **Min height** | `64px` | |
| **Max height** | `64px` | 헤더 높이 고정 |

---

## 1.2 Properties 📥 (부모 페이지에서 주입)

RE_Header 설정 패널 → `+ Add new property` 에서 추가합니다.

> 부모 페이지가 RE_Header를 배치한 후, Appearance 탭에서 값을 설정합니다.  
> RE 내부에서는 `This RE_Header's property이름` 으로 읽기만 가능합니다.

| Property Name | Type | Default Value | 용도 | 부모에서 설정 예시 |
|---------------|------|---------------|------|---------------------|
| `page_title` | text | *(비움)* | 현재 페이지 제목 표시 | `"대시보드"`, `"학생 관리"` |
| `notif_count` | number | `0` | 읽지 않은 알림 수 — Badge 표시 | `Search for Notifications [user_id = Current User, is_read = no]:count` |

**Bubble 설정 화면:**
```
RE_Header 설정 패널 (오른쪽)
├── page_title    text     (no default value)    ← + Add new property
└── notif_count   number   (no default value)    ← + Add new property
```

---

## 1.3 Custom States 🔄 (RE 내부에서 관리)

RE_Header 루트 요소를 선택 → `Element Inspector` (왼쪽 패널) → `Add a new custom state`:

> RE 내부 Workflow에서 Set state로 변경하고, 부모 페이지에서 `RE_Header's sidebar_open` 으로 읽을 수 있습니다.

| State Name | Type | Default Value | 용도 | 왜 Custom State인가? |
|------------|------|---------------|------|----------------------|
| `sidebar_open` | yes/no | `no` | 모바일 사이드바 열림/닫힘 토글 | RE 내부 햄버거 버튼 클릭으로 **값을 변경**해야 하고, 부모 페이지에서 사이드바 표시 여부를 **읽어야** 하므로 |

**Bubble 설정 화면:**
```
Element Inspector (왼쪽)
Custom states
└── sidebar_open   yes/no   Default value: (no)    ← Add a new custom state
```

> ⚠️ **주의**: `page_title`과 `notif_count`를 Custom State에 넣지 마세요!  
> 이 값들은 부모 페이지가 넣어주는 읽기 전용 값이므로 Property가 적합합니다.  
> Custom State로 만들면 `Set state` Workflow를 페이지마다 작성해야 하는 불필요한 작업이 생깁니다.

---

## 1.4 RE_Header 루트 요소 Appearance

| 속성 | 값 | 비고 |
|------|-----|------|
| **Background style** | Flat color | |
| **Background color** | `#FFFFFF` (Surface) | Style Variable |
| **Border style** | — | 하단 border만 설정 |
| **Border - bottom only** | `1px solid #E5E7EB` | Border Light |
| **Roundness** | `0` | |
| **Box shadow - Style** | Outset | |
| **Box shadow - Horizontal** | `0` | |
| **Box shadow - Vertical** | `1` | |
| **Box shadow - Blur** | `3` | |
| **Box shadow - Spread** | `0` | |
| **Box shadow - Color** | `#0000000D` | 5% 검정 |

### RE_Header 루트 Layout

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Row | 수평 배치 |
| **Container alignment** | Center vertically, Space between horizontally | |
| **This element is visible on page load** | ✅ yes | |
| **Padding top** | `0` | |
| **Padding bottom** | `0` | |
| **Padding left** | `24px` | |
| **Padding right** | `24px` | |

---

## 1.5 내부 요소 상세

### 구조 트리

```
RE_Header (루트)
├── Group_Left ─────────── (Row, gap: 12px)
│   ├── Icon_Hamburger ──── (Material: menu, 24px)
│   ├── Group_Logo ──────── (32×32, BG: Primary)
│   └── Text_AppName ────── ("MAMA-ASST")
│
├── Text_PageTitle ──────── (동적 텍스트)
│
├── Group_Right ────────── (Row, gap: 8px)
│   ├── Group_NotifWrap ── (상대 위치)
│   │   ├── Icon_Notification (Material: notifications)
│   │   └── Group_Badge ──── (18×18, absolute)
│   │       └── Text_BadgeNum
│   │
│   └── Group_UserMenuTrigger (Row, gap: 8px, cursor: pointer)
│       ├── Group_Avatar ── (32×32, BG: Primary)
│       │   └── Text_Initial
│       ├── Text_UserName
│       └── Icon_Chevron ── (Material: expand_more)
│
├── GF_Notification ────── (Group Focus, 380px, Reference: Icon_Notification)
│   └── (섹션 2 상세 참조)
│
└── GF_UserMenu ──────── (Group Focus, 240px, Reference: Group_UserMenuTrigger)
    └── (섹션 3 상세 참조)
```

---

### 📦 Group_Left

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Container alignment** | Center vertically |
| **Column gap** | `12px` |
| **Fit width to content** | ✅ |
| **Min height** | `64px` |
| **Background** | None (transparent) |
| **Padding** | `0` |

---

### 🍔 Icon_Hamburger

| 속성 | 값 | 비고 |
|------|-----|------|
| **Element type** | Icon | |
| **Icon source** | Material Icons Round | Bubble Settings에서 추가 |
| **Icon** | `menu` | |
| **Size** | `24px` | Width 24, Height 24 |
| **Color** | `#6B7280` (Text Secondary) | |
| **Cursor** | pointer | |
| **This element is visible on page load** | ❌ **no** | 기본 숨김 — Conditional로 표시 |

**Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Current page width ≤ 1200` | This element is visible | `true` |

**Workflow:**

| Event | Action |
|-------|--------|
| `Icon_Hamburger is clicked` | Set state → `RE_Header`'s `sidebar_open` = `RE_Header's sidebar_open is "no"` *(토글)* |

---

### 🟧 Group_Logo

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `32px` (Fixed) | |
| **Height** | `32px` (Fixed) | |
| **Background color** | `#FF6D4D` (Primary) | |
| **Roundness** | `8` | |
| **Container layout** | Row | |
| **Container alignment** | Center both | 내부 텍스트/아이콘 중앙 정렬 |
| **Cursor** | pointer | 클릭 시 대시보드로 이동 |

**내부 요소 (선택사항):** 로고 이미지 또는 텍스트 "M" (14px, Bold, White)

**Workflow:**

| Event | Action | 비고 |
|-------|--------|------|
| `Group_Logo is clicked` | Go to page → 역할별 대시보드 | Current User's role 기반 분기 |

---

### 📝 Text_AppName

| 속성 | 값 | 비고 |
|------|-----|------|
| **Text** | `MAMA-ASST` | 정적 텍스트 |
| **Font** | Pretendard | App Font |
| **Font size** | `16px` | |
| **Font weight** | `700` (Bold) | |
| **Font color** | `#1A2E4D` (Navy) | |
| **Fit width to content** | ✅ | |
| **Vertical alignment** | Center | |

**Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Current page width ≤ 768` | This element is visible | `false` |

---

### 📄 Text_PageTitle

| 속성 | 값 | 비고 |
|------|-----|------|
| **Text** | 동적: `This RE_Header's page_title` | 📥 Property 바인딩 |
| **Font size** | `18px` | |
| **Font weight** | `600` (SemiBold) | |
| **Font color** | `#1F2937` (Text Primary) | |
| **Fit width to content** | ✅ | |
| **Min width** | `0` | |

> ⚠️ **Layout 배치**: Group_Left와 Group_Right 사이에 위치. 부모(RE_Header 루트)가 Row + Space-between이면 자동으로 가운데 배치됩니다. 혹은 flex-grow: 1로 남는 공간을 차지하게 하고 text-align left를 줄 수도 있습니다.

**Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Current page width ≤ 480` | This element is visible | `false` |

---

### 📦 Group_Right

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Container alignment** | Center vertically |
| **Column gap** | `8px` |
| **Fit width to content** | ✅ |
| **Background** | None (transparent) |

---

### 🔔 Group_NotifWrap

> 알림 아이콘과 배지를 감싸는 래퍼입니다.

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `40px` (Fixed) | |
| **Height** | `40px` (Fixed) | |
| **Container layout** | Align to parent | 배지의 absolute 배치를 위해 |
| **Background** | None | |
| **Roundness** | `8` | |
| **Cursor** | pointer | |

**Hover Conditional (선택사항):**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `This Group_NotifWrap is hovered` | Background color | `#F3F4F6` (BG Hover) |

---

### 🔔 Icon_Notification

| 속성 | 값 |
|------|-----|
| **Icon** | Material: `notifications` |
| **Size** | `24px` |
| **Color** | `#6B7280` (Text Secondary) |
| **Top** | `8px` (Group_NotifWrap 기준 중앙) |
| **Left** | `8px` |

---

### 🔴 Group_Badge (알림 배지)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `18px` (Fixed, 2자리 시 auto) | Fit width to content 가능 |
| **Min width** | `18px` | |
| **Height** | `18px` (Fixed) | |
| **Background** | `#EF4444` (Destructive) | |
| **Roundness** | `9` (50%) | 원형 |
| **Position** | Absolute 또는 Bubble의 Align to parent 사용 | |
| **Top** | `2px` | Group_NotifWrap 기준 |
| **Right** | `2px` | |
| **Padding left/right** | `4px` | 2자리 숫자 대응 |

**내부 Text_BadgeNum:**

| 속성 | 값 |
|------|-----|
| **Text** | 동적: `This RE_Header's notif_count` | 📥 Property 바인딩 |
| **Font size** | `10px` |
| **Font weight** | `700` |
| **Font color** | `#FFFFFF` |
| **Text alignment** | Center |

**Conditional:**

| 조건 | 속성 변경 | 값 | 비고 |
|------|-----------|-----|------|
| `This RE_Header's notif_count = 0` | Group_Badge is visible | `false` | 📥 Property 참조 |
| `This RE_Header's notif_count ≥ 100` | Text_BadgeNum의 text | `99+` | 📥 Property 참조 |

---

### 👤 Group_UserMenuTrigger

> 아바타 + 이름 + 셰브론을 감싸는 클릭 가능 영역

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Column gap** | `8px` |
| **Container alignment** | Center vertically |
| **Fit width to content** | ✅ |
| **Cursor** | pointer |
| **Background** | None |
| **Roundness** | `8` |
| **Padding** | `4px 8px` |

**Hover Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `This Group is hovered` | Background color | `#F3F4F6` (BG Hover) |

---

### 🟠 Group_Avatar (헤더용)

| 속성 | 값 |
|------|-----|
| **Width** | `32px` (Fixed) |
| **Height** | `32px` (Fixed) |
| **Background** | `#FF6D4D` (Primary) |
| **Roundness** | `16` (50% = 원형) |
| **Container layout** | Row |
| **Container alignment** | Center both |

**내부 Text_Initial:**

| 속성 | 값 | 비고 |
|------|-----|------|
| **Text** | 동적: `Current User's name:truncated to 1` | 이름 첫 글자 |
| **Font size** | `14px` | |
| **Font weight** | `600` | |
| **Font color** | `#FFFFFF` | |
| **Text alignment** | Center | |

---

### 📝 Text_UserName

| 속성 | 값 |
|------|-----|
| **Text** | 동적: `Current User's name` |
| **Font size** | `14px` |
| **Font weight** | `500` |
| **Font color** | `#1F2937` (Text Primary) |
| **Fit width to content** | ✅ |
| **Max width** | `100px` (너무 긴 이름 대응) |
| **Truncate text** | ✅ (말줄임) |

**Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Current page width ≤ 768` | This element is visible | `false` |

---

### ▼ Icon_Chevron

| 속성 | 값 |
|------|-----|
| **Icon** | Material: `expand_more` |
| **Size** | `20px` |
| **Color** | `#6B7280` (Text Secondary) |

**Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Current page width ≤ 768` | This element is visible | `false` |

---

## 1.6 RE_Header 전체 Conditional 요약

| # | 조건 | 대상 요소 | 속성 변경 | 값 |
|---|------|-----------|-----------|-----|
| C1 | `Current page width ≤ 1200` | Icon_Hamburger | Visible | `true` |
| C2 | `Current page width ≤ 768` | Text_AppName | Visible | `false` |
| C3 | `Current page width ≤ 768` | Text_UserName | Visible | `false` |
| C4 | `Current page width ≤ 768` | Icon_Chevron | Visible | `false` |
| C5 | `Current page width ≤ 768` | RE_Header 루트 | Padding left | `16px` |
| C6 | `Current page width ≤ 768` | RE_Header 루트 | Padding right | `16px` |
| C7 | `Current page width ≤ 480` | Text_PageTitle | Visible | `false` |
| C8 | `Current page width ≤ 480` | RE_Header 루트 | Padding left | `12px` |
| C9 | `Current page width ≤ 480` | RE_Header 루트 | Padding right | `12px` |
| C10 | `This RE_Header's notif_count = 0` | Group_Badge | Visible | `false` | ← Property 참조 |

---

## 1.7 RE_Header Workflow 요약

| # | Trigger | Condition | Action | 비고 |
|---|---------|-----------|--------|------|
| W1 | Icon_Hamburger is clicked | — | Set state: `sidebar_open` = `sidebar_open is "no"` | 🔄 Custom State 토글 |
| W2 | Icon_Notification (또는 Group_NotifWrap) is clicked | — | Toggle `GF_Notification` | |
| W3 | Group_UserMenuTrigger is clicked | — | Toggle `GF_UserMenu` | |
| W4 | Group_Logo is clicked | — | Go to page (역할별 대시보드) | |

---

## 1.8 RE_Header 페이지 배치 방법

각 페이지에서 RE_Header를 사용할 때의 설정입니다.

### Floating Group 래퍼 생성 (각 페이지에서)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Element type** | Floating Group | |
| **Vertically float relative to** | Top | 상단 고정 |
| **Horizontally float relative to** | Both | 좌우 전체 |
| **Width** | `100%` | |
| **Height** | `64px` | |
| **Background** | `#FFFFFF` | RE_Header와 동일 |
| **z-index** | Bring to front 반복으로 최상단 유지 | Bubble에서 z-200 해당 |

### 내부에 RE_Header 배치

| 속성 | 값 |
|------|-----|
| **Width** | `100%` |
| **Height** | `64px` |

### RE_Header Property 설정 (각 페이지의 Appearance 탭에서)

RE_Header를 페이지에 드래그한 후, 해당 요소의 **Appearance 탭**에서 Property 값을 설정합니다:

| Property | 설정 값 | 비고 |
|----------|---------|------|
| `page_title` | `대시보드` (정적 텍스트) | 페이지마다 다른 제목 |
| `notif_count` | `Search for Notifications [user_id = Current User, is_read = no]:count` | 동적 검색 |

> ⚠️ Property는 Workflow의 `Set state`가 아니라, **요소 Appearance 탭**에서 설정합니다.  
> Set state는 Custom State에만 사용합니다.

---

---

# 2. GF_Notification (알림 드롭다운)

RE_Header의 알림 아이콘 클릭 시 표시되는 Group Focus입니다.  
**RE_Header 내부에 배치**하여 모든 페이지에서 자동으로 사용됩니다.

---

## 2.1 Group Focus 생성

> **✅ 위치**: GF_Notification은 **RE_Header 내부**에 배치합니다. Reference 요소(Icon_Notification)와 같은 컨테이너에 있으므로 정상 동작하며, 페이지마다 반복 생성할 필요가 없습니다.

### Bubble 설정

| 속성 | 값 | 비고 |
|------|-----|------|
| **Element type** | Group Focus | RE_Header 편집 화면에서 추가 |
| **Reference element** | `Icon_Notification` 또는 `Group_NotifWrap` | 같은 RE 내부 요소 |
| **Width** | `380px` (Fixed) | |
| **Max height** | `480px` | 내용 많으면 스크롤 |
| **Background** | `#FFFFFF` (Surface) | |
| **Roundness** | `12` | |
| **Border** | `1px solid #E5E7EB` (Border Light) | |
| **Box shadow** | `0 10px 25px #0000001A, 0 4px 10px #00000006` | Shadow LG |
| **Padding** | `0` | 내부 그룹에서 각각 관리 |
| **Offset top** | `8px` | 헤더와 간격 |
| **Offset left** | `-160px` | 알림 아이콘 기준 좌측 오프셋 (중앙 정렬) |
| **Container layout** | Column | |

### 반응형 Conditional

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Current page width ≤ 480` | Width | `calc(100vw - 24px)` 또는 `340px` |
| `Current page width ≤ 480` | Offset left | 화면 중앙 정렬 계산 |

---

## 2.2 내부 구조 상세

### 구조 트리

```
GF_Notification
├── Group_NotifHeader
│   ├── Text_NotifTitle ("알림")
│   └── Group_NewBadge
│       └── Text_NewCount ("N개 새 알림")
│
├── RG_Notifications (Repeating Group, 스크롤)
│   └── Cell
│       ├── Group_NIcon (아이콘 원형)
│       │   └── Icon_NType
│       ├── Group_NContent
│       │   ├── Text_NTitle
│       │   ├── Text_NDesc
│       │   └── Text_NTime
│       └── Group_UnreadDot
│
├── Group_EmptyState (알림 없을 때)
│   ├── Icon (notifications_off, 48px, #9CA3AF)
│   └── Text "새로운 알림이 없습니다"
│
└── Group_NotifFooter
    └── Link_ViewAll ("전체 알림 보기")
```

---

### 📦 Group_NotifHeader

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Container alignment** | Center vertically, Space between |
| **Padding** | `16px` |
| **Border - bottom** | `1px solid #E5E7EB` |
| **Background** | None |

#### Text_NotifTitle

| 속성 | 값 |
|------|-----|
| **Text** | `알림` |
| **Font size** | `16px` |
| **Font weight** | `700` |
| **Font color** | `#1A2E4D` (Navy) |

#### Group_NewBadge

| 속성 | 값 | 비고 |
|------|-----|------|
| **Fit width to content** | ✅ | |
| **Height** | `24px` | |
| **Background** | `#FF6D4D` (Primary) | |
| **Roundness** | `12` | Pill 모양 |
| **Padding left/right** | `10px` | |
| **Padding top/bottom** | `4px` | |

**내부 Text_NewCount:**

| 속성 | 값 |
|------|-----|
| **Text** | 동적: `Search for Notifications [user_id = Current User, is_read = no]:count` `"개 새 알림"` | Property는 RE 외부에서 읽을 수 없으므로 직접 검색 |
| **Font size** | `12px` |
| **Font weight** | `500` |
| **Font color** | `#FFFFFF` |

**Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Search for Notifications [user_id = Current User, is_read = no]:count = 0` | Group_NewBadge Visible | `false` |

---

### 📋 RG_Notifications (Repeating Group)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Type of content** | `Notification` | Data Type |
| **Data source** | `Search for Notifications` | 아래 검색 조건 참고 |
| **Layout style** | Full list | |
| **Direction** | Column | |
| **Max height** | `360px` | |
| **Vertical scrolling** | ✅ (when content is taller than container) | |
| **Cell's min height** | `72px` | |
| **Separator** | None | Hover로 구분 |

**Data Source 검색 조건:**

```
Search for Notifications:
  Constraint 1: user_id = Current User
  Sort by: sent_at (descending)
  :items until #20
```

> 💡 MVP에서는 최근 20개만 표시합니다. 전체 목록은 notifications 페이지에서.

---

### 📦 Cell 내부 — 각 알림 아이템

#### Cell 전체 Layout

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Column gap** | `12px` |
| **Container alignment** | Start vertically (top-align) |
| **Padding** | `12px 16px` |
| **Cursor** | pointer |

#### Group_NIcon (아이콘 원형)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `36px` (Fixed) | |
| **Height** | `36px` (Fixed) | |
| **Roundness** | `18` (50% 원형) | |
| **Background** | `#FF6D4D` (기본값 — Conditional로 변경) | |
| **Container alignment** | Center both | |

**내부 Icon_NType:**

| 속성 | 값 |
|------|-----|
| **Icon** | Material: `info` (기본값) |
| **Size** | `18px` |
| **Color** | `#FFFFFF` |

**타입별 Conditional:**

| # | 조건 (`Current cell's Notification's notification_type`) | Group_NIcon Background | Icon_NType Icon |
|---|-------|-----|-----|
| 1 | `is "출결"` | `#3B82F6` (Info) | `login` |
| 2 | `is "결제"` | `#F59E0B` (Alert) | `payment` |
| 3 | `is "숙제"` | `#22C55E` (Success) | `assignment_turned_in` |
| 4 | `is "공지"` | `#FF6D4D` (Primary) | `campaign` |
| 5 | (기본값 / "시스템") | `#FF6D4D` (Primary) | `info` |

---

#### Group_NContent

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Row gap** | `2px` |
| **Make this element fixed width** | ❌ (flex: 1, 남는 공간 차지) |

**Text_NTitle:**

| 속성 | 값 |
|------|-----|
| **Text** | 동적: `Current cell's Notification's title` |
| **Font size** | `13px` |
| **Font weight** | `400` (Conditional로 변경) |
| **Font color** | `#1F2937` (Text Primary) |
| **Max number of lines** | `1` (말줄임) |

**Text_NDesc:**

| 속성 | 값 |
|------|-----|
| **Text** | 동적: `Current cell's Notification's content` |
| **Font size** | `12px` |
| **Font weight** | `400` |
| **Font color** | `#6B7280` (Text Secondary) |
| **Max number of lines** | `2` |

**Text_NTime:**

| 속성 | 값 | 비고 |
|------|-----|------|
| **Text** | 동적: `Current cell's Notification's sent_at:formatted as 시간 ago` | "3분 전", "1시간 전" 등 |
| **Font size** | `11px` |
| **Font weight** | `400` |
| **Font color** | `#9CA3AF` (Text Tertiary) |

---

#### Group_UnreadDot

| 속성 | 값 |
|------|-----|
| **Width** | `8px` (Fixed) |
| **Height** | `8px` (Fixed) |
| **Background** | `#FF6D4D` (Primary) |
| **Roundness** | `4` (50% 원형) |
| **Visible on page load** | ✅ |

---

### Cell 읽음/안읽음 Conditional

| # | 조건 | 대상 요소 | 속성 변경 | 값 |
|---|------|-----------|-----------|-----|
| C1 | `Current cell's Notification's is_read is "no"` | Cell 전체 | Background | `#FF6D4D08` (Primary 3% 투명) |
| C2 | `Current cell's Notification's is_read is "no"` | Text_NTitle | Font weight | `600` |
| C3 | `Current cell's Notification's is_read is "no"` | Group_UnreadDot | Visible | `true` |
| C4 | `Current cell's Notification's is_read is "yes"` | Group_UnreadDot | Visible | `false` |
| C5 | (Cell hover) | Cell 전체 | Background | `#F3F4F6` (BG Hover) |

---

### 📦 Group_EmptyState

> RG_Notifications 데이터가 비어있을 때 표시

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Container alignment** | Center both |
| **Padding** | `40px 16px` |
| **Visible on page load** | ❌ (Conditional로 표시) |

| 조건 | Visible |
|------|---------|
| `Search for Notifications [user_id = Current User]:count = 0` | `true` |

내부 요소:
- Icon: `notifications_off`, 48px, `#9CA3AF`
- Text: `새로운 알림이 없습니다`, 14px, `#9CA3AF`, center

---

### 📦 Group_NotifFooter

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Container alignment** | Center both |
| **Padding** | `12px` |
| **Border - top** | `1px solid #E5E7EB` |

**Link_ViewAll:**

| 속성 | 값 |
|------|-----|
| **Text** | `전체 알림 보기` |
| **Font size** | `13px` |
| **Font weight** | `500` |
| **Font color** | `#FF6D4D` (Primary) |
| **Cursor** | pointer |

---

## 2.3 GF_Notification Workflow

| # | Trigger | Action | 비고 |
|---|---------|--------|------|
| W1 | Cell is clicked | Make changes to thing: `Current cell's Notification` → `is_read = yes`, `read_at = Current date/time` | 읽음 처리 |
| W2 | Cell is clicked (Step 2) | Navigation 또는 Custom action (알림 타입별 이동) | 선택사항 |
| W3 | Link_ViewAll is clicked | Go to page: `notifications` | 전체 알림 페이지 |
| W4 | Link_ViewAll is clicked (Step 2) | Hide this Group Focus | 드롭다운 닫기 |

---

---

# 3. GF_UserMenu (유저 메뉴 드롭다운)

RE_Header의 유저 프로필 영역 클릭 시 표시됩니다.  
**RE_Header 내부에 배치**하여 GF_Notification과 동일하게 모든 페이지에서 자동 사용됩니다.

---

## 3.1 Group Focus 생성

> **✅ 위치**: RE_Header 편집 화면에서 추가합니다.

| 속성 | 값 | 비고 |
|------|-----|------|
| **Element type** | Group Focus | RE_Header 내부에 배치 |
| **Reference element** | `Group_UserMenuTrigger` | 같은 RE 내부 요소 |
| **Width** | `240px` (Fixed) | |
| **Background** | `#FFFFFF` (Surface) | |
| **Roundness** | `12` | |
| **Border** | `1px solid #E5E7EB` | |
| **Box shadow** | `0 10px 25px #0000001A, 0 4px 10px #00000006` | |
| **Padding** | `0` | 내부 그룹에서 관리 |
| **Offset top** | `8px` | |
| **Container layout** | Column | |

---

## 3.2 내부 구조 상세

### 구조 트리

```
GF_UserMenu
├── Group_UserInfo
│   ├── Group_UserAvatar (40×40)
│   │   └── Text_UserInitial
│   ├── Text_UserName
│   └── Text_UserRole
│
├── Group_MenuItems
│   ├── Group_MenuItem_MyPage (Row: icon + text)
│   ├── Group_MenuItem_Settings
│   ├── Group_MenuItem_Help
│   ├── Group_Divider
│   └── Group_MenuItem_Logout (Destructive 스타일)
```

---

### 📦 Group_UserInfo

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Row gap** | `4px` |
| **Padding** | `16px` |
| **Border - bottom** | `1px solid #E5E7EB` |
| **Container alignment** | Center horizontally |

#### Group_UserAvatar

| 속성 | 값 |
|------|-----|
| **Width** | `40px` (Fixed) |
| **Height** | `40px` (Fixed) |
| **Background** | `#FF6D4D` (Primary) |
| **Roundness** | `20` (원형) |
| **Container alignment** | Center both |
| **Margin bottom** | `8px` |

**Text_UserInitial:** `Current User's name:truncated to 1`, 16px, 600, White

#### Text_UserName

| 속성 | 값 |
|------|-----|
| **Text** | `Current User's name` |
| **Font size** | `14px` |
| **Font weight** | `600` |
| **Font color** | `#1F2937` |
| **Text alignment** | Center |

#### Text_UserRole

> 💡 로그인은 전화번호 기반이며, B2B 모델에서 관리자가 계정을 생성하므로 이메일 필드가 없습니다. 대신 사용자 역할을 표시합니다.

| 속성 | 값 |
|------|-----|
| **Text** | `Current User's role's Display` |
| **Font size** | `12px` |
| **Font weight** | `400` |
| **Font color** | `#9CA3AF` (Text Tertiary) |
| **Text alignment** | Center |
| **Max number of lines** | `1` |

**역할별 표시값** (UserRole Option Set의 Display):

| role | 표시 텍스트 |
|------|-------------|
| STUDENT | 학생 |
| PARENT | 학부모 |
| INSTRUCTOR | 강사 |
| ACADEMY_ADMIN | 학원관리자 |
| SUPER_ADMIN | 슈퍼관리자 |

---

### 📦 Group_MenuItems

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Row gap** | `0` |
| **Padding** | `8px` |

---

### 📦 메뉴 아이템 공통 (Group_MenuItem_*)

각 메뉴 아이템은 동일한 구조의 Group입니다:

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Row | |
| **Column gap** | `12px` | Icon ↔ Text 간격 |
| **Container alignment** | Center vertically | |
| **Width** | `100%` (stretch) | |
| **Min height** | `40px` | |
| **Padding** | `10px 12px` | |
| **Roundness** | `8` | |
| **Background** | None (transparent) | |
| **Cursor** | pointer | |
| **Transition** | Background 200ms ease | |

**내부 Icon:**

| 속성 | 값 |
|------|-----|
| **Size** | `20px` |
| **Color** | `#6B7280` (Text Secondary) |

**내부 Text:**

| 속성 | 값 |
|------|-----|
| **Font size** | `14px` |
| **Font weight** | `400` |
| **Font color** | `#1F2937` (Text Primary) |

**Hover Conditional (일반 메뉴):**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `This Group is hovered` | Background | `#F3F4F6` (BG Hover) |
| `This Group is hovered` | Icon Color | `#1F2937` (Text Primary) |

---

### 메뉴 아이템 목록

| Group 이름 | Icon (Material) | Text | 이동 페이지 |
|------------|-----------------|------|------------|
| Group_MenuItem_MyPage | `person` | `마이페이지` | mypage (Phase 2) |
| Group_MenuItem_Settings | `settings` | `설정` | 역할별 settings 페이지 |
| Group_MenuItem_Help | `help_outline` | `도움말` | 외부 링크 또는 도움말 페이지 |

---

### Group_Divider

| 속성 | 값 |
|------|-----|
| **Width** | `100%` |
| **Height** | `1px` (Fixed) |
| **Background** | `#E5E7EB` (Border Light) |
| **Margin top** | `4px` |
| **Margin bottom** | `4px` |

---

### 🔴 Group_MenuItem_Logout (특별 스타일)

일반 메뉴와 동일한 구조이지만 색상이 다릅니다:

| 속성 | 기본값 | Hover 시 |
|------|--------|----------|
| **Icon color** | `#EF4444` (Destructive) | `#DC2626` (더 진한 빨강) |
| **Text color** | `#EF4444` (Destructive) | `#DC2626` |
| **Background** | transparent | `#FEF2F2` (Error Light) |

---

## 3.3 GF_UserMenu Workflow

| # | Trigger | Action | 비고 |
|---|---------|--------|------|
| W1 | Group_MenuItem_MyPage clicked | Go to page: `mypage` | Phase 2에서 구현 |
| W2 | Group_MenuItem_Settings clicked | Go to page: `settings` | 역할별 분기 가능 |
| W3 | Group_MenuItem_Help clicked | Open external website (URL) | 또는 내부 도움말 페이지 |
| W4 | Group_MenuItem_Logout clicked | Step 1: Log the user out | |
| | | Step 2: Go to page → `login` | |

---

---

# 4. RE_Sidebar (사이드 네비게이션)

좌측 고정 사이드바입니다. 사용자 역할에 따라 다른 메뉴를 표시합니다.

---

## 4.1 Reusable Element 생성

### Bubble Editor 경로
`Reusable elements` 탭 → `New reusable element`

### 기본 설정

| 설정 항목 | 값 | 비고 |
|-----------|-----|------|
| **Element name** | `RE_Sidebar` | |
| **Type of content** | (없음) | |
| **Width** | `256px` (Fixed) | 사이드바 고정 너비 |
| **Min height** | `100%` | 페이지 전체 높이 |

---

## 4.2 Property 📥 (부모 페이지에서 주입)

RE_Sidebar 설정 패널 → `+ Add new property`:

| Property Name | Type | Default Value | 용도 | 부모에서 설정 예시 |
|---------------|------|---------------|------|---------------------|
| `active_page` | text | *(비움)* | 현재 활성 메뉴 하이라이트 | `"admin-dashboard"`, `"subject-korean"` |

**Bubble 설정 화면:**
```
RE_Sidebar 설정 패널 (오른쪽)
└── active_page   text   (no default value)    ← + Add new property
```

### Custom State 🔄 (RE 내부에서 변경, 부모가 읽기)

RE_Sidebar 선택 → Inspector 패널 → `Add a new custom state`:

| State Name | Type | Default Value | 용도 |
|------------|------|---------------|------|
| `close_requested` | yes/no | `no` | Close 버튼 클릭 시 `yes`로 변경 → 부모 페이지가 감지하여 sidebar_open 닫기 |

**Bubble 설정 화면:**
```
RE_Sidebar Inspector 패널
└── close_requested   yes/no   Default value: (no)    ← Add a new custom state
```

> ⚠️ RE_Sidebar에서 사이드바 열림/닫힘을 **직접** 토글하지 않습니다.  
> `close_requested`는 "닫아달라"는 **신호**일 뿐이며, 실제 열림/닫힘 상태는 RE_Header의 `sidebar_open`이 **단일 진실 공급원(SSOT)**입니다.  
> 부모 페이지가 `close_requested`를 감지하면 RE_Header의 `sidebar_open`을 `no`로 변경하고, `close_requested`를 `no`로 리셋합니다.

### 왜 `close_requested` 패턴이 필요한가?

```
❌ 불가능한 구조:
  [RE_Sidebar 내부]
    Icon_Close 클릭 → Set state: RE_Header's sidebar_open = "no"
    → Bubble에서 한 RE가 다른 RE의 Custom State를 직접 변경할 수 없음!

✅ 올바른 구조 (신호 패턴):
  [RE_Sidebar 내부]
    Icon_Close 클릭 → Set state: RE_Sidebar's close_requested = "yes"   🔄 신호 발신

  [부모 페이지]
    "Do when condition is true": RE_Sidebar's close_requested is "yes"   🔄 신호 감지
      → Action 1: Set state: RE_Header's sidebar_open = "no"            🔄 SSOT 변경
      → Action 2: Set state: RE_Sidebar's close_requested = "no"        🔄 신호 리셋
```

### 사이드바 열림/닫힘 제어 구조

```
[열기: RE_Header 내부]
  햄버거 클릭 → Set state: sidebar_open = toggle    🔄 Custom State 변경

[부모 페이지 레벨 — Conditional]
  When RE_Header's sidebar_open is "yes"              🔄 Custom State 읽기
    → RE_Sidebar wrapper Visible = true
    → Group_SidebarOverlay Visible = true

[닫기 경로 ①: Overlay 클릭 — 부모 페이지 Workflow]
  Overlay 클릭 → Set state: RE_Header's sidebar_open = "no"  🔄 Custom State 변경

[닫기 경로 ②: Close 아이콘 — RE_Sidebar 내부 → 부모 페이지 연계]
  Icon_Close 클릭 → Set state: RE_Sidebar's close_requested = "yes"  🔄 신호 발신
  부모 페이지 "Do when condition is true": close_requested is "yes"   🔄 신호 감지
    → Set state: RE_Header's sidebar_open = "no"                      🔄 SSOT 변경
    → Set state: RE_Sidebar's close_requested = "no"                  🔄 신호 리셋
```

> 💡 **왜 RE_Sidebar에 `is_open` Custom State를 안 만드나요?**  
> RE_Header와 RE_Sidebar는 서로 다른 Reusable Element입니다.  
> Bubble에서 한 RE가 다른 RE의 Custom State를 직접 변경할 수 없습니다.  
> 따라서 **RE_Header의 `sidebar_open`을 단일 진실 공급원(Single Source of Truth)**으로 유지하고,  
> RE_Sidebar 내부의 닫기 동작은 `close_requested` 신호를 통해 부모 페이지가 중재합니다.

---

## 4.3 RE_Sidebar 루트 요소

### Appearance

| 속성 | 값 | 비고 |
|------|-----|------|
| **Background style** | Flat color | |
| **Background color** | `#1A2E4D` (Navy) | Style Variable |
| **Border** | None | |
| **Roundness** | `0` | |
| **Box shadow** | None | |

### Layout

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Column | |
| **Row gap** | `0` | |
| **Container alignment** | Start | |
| **Width** | `256px` (Fixed) | |
| **Min height** | `100%` | |
| **Padding** | `0` | 내부 그룹에서 관리 |

---

## 4.4 내부 요소 상세

### 구조 트리

```
RE_Sidebar (256px, Column, Navy BG)
│
├── Group_SidebarHeader ── (Row, 64px 높이)
│   ├── Group_SBLogo ───── (32×32, Primary BG)
│   ├── Text_SBAppName ─── ("MAMA-ASST", white)
│   └── Icon_Close ──────── (close, white, ≤1200px만 표시)
│
├── Group_UserProfile ──── (Column, border-bottom)
│   ├── Group_SBAvatar ─── (48×48, Primary BG)
│   │   └── Text_SBInitial
│   ├── Text_SBUserName
│   └── Text_SBRole
│
├── Group_NavMenu ─────── (Column, flex: 1, 스크롤)
│   ├── [관리자 메뉴 그룹] ─ Conditional: role = ACADEMY_ADMIN
│   ├── [학생 메뉴 그룹] ── Conditional: role = STUDENT
│   └── [강사 메뉴 그룹] ── Conditional: role = INSTRUCTOR
│
└── Group_SidebarFooter ─ (Column, border-top)
    ├── NavItem_Settings
    └── NavItem_Logout
```

---

### 📦 Group_SidebarHeader

| 속성 | 값 |
|------|-----|
| **Container layout** | Row |
| **Column gap** | `12px` |
| **Container alignment** | Center vertically, Space between |
| **Width** | `100%` |
| **Height** | `64px` (Fixed) — 헤더와 높이 맞춤 |
| **Padding left** | `16px` |
| **Padding right** | `16px` |
| **Padding top/bottom** | `0` |
| **Background** | None (부모 Navy 상속) |

#### Group_SBLogo

| 속성 | 값 |
|------|-----|
| **Width** | `32px` (Fixed) |
| **Height** | `32px` (Fixed) |
| **Background** | `#FF6D4D` (Primary) |
| **Roundness** | `8` |
| **Container alignment** | Center both |

#### Text_SBAppName

| 속성 | 값 |
|------|-----|
| **Text** | `MAMA-ASST` |
| **Font size** | `16px` |
| **Font weight** | `700` |
| **Font color** | `#FFFFFF` |
| **Make this element fixed width** | ❌ (flex: 1) |

#### Icon_Close

| 속성 | 값 | 비고 |
|------|-----|------|
| **Icon** | Material: `close` | |
| **Size** | `24px` | |
| **Color** | `#FFFFFFB3` (70% white) | |
| **Cursor** | pointer | |
| **Visible on page load** | ❌ | ≤1200px에서만 표시 |

**Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `Current page width ≤ 1200` | Visible | `true` |

**Hover Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `This Icon is hovered` | Color | `#FFFFFF` |

**Workflow:**

| Event | Action | 비고 |
|-------|--------|------|
| `Icon_Close clicked` | Set state: `RE_Sidebar's close_requested` = `yes` | 🔄 부모 페이지에서 감지 후 sidebar_open 닫기 |

---

### 📦 Group_UserProfile

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Row gap** | `4px` |
| **Container alignment** | Center horizontally |
| **Width** | `100%` |
| **Padding** | `16px` |
| **Border - bottom** | `1px solid #FFFFFF1A` (10% white) |

#### Group_SBAvatar

| 속성 | 값 |
|------|-----|
| **Width** | `48px` (Fixed) |
| **Height** | `48px` (Fixed) |
| **Background** | `#FF6D4D` (Primary) |
| **Roundness** | `24` (원형) |
| **Container alignment** | Center both |
| **Margin bottom** | `8px` |

**Text_SBInitial:** `Current User's name:truncated to 1`, 18px, 600, White

#### Text_SBUserName

| 속성 | 값 |
|------|-----|
| **Text** | `Current User's name` |
| **Font size** | `14px` |
| **Font weight** | `600` |
| **Font color** | `#FFFFFF` |
| **Text alignment** | Center |

#### Text_SBRole

| 속성 | 값 | 비고 |
|------|-----|------|
| **Text** | 동적: `Current User's role's Display` | Option Set Display 값 |
| **Font size** | `12px` |
| **Font weight** | `400` |
| **Font color** | `#FFFFFFB3` (70% white) |
| **Text alignment** | Center |

---

### 📦 Group_NavMenu

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Column | |
| **Row gap** | `4px` | 메뉴 아이템 간 간격 |
| **Width** | `100%` | |
| **Min height** | `0` | |
| **Make this element fixed height** | ❌ | flex: 1 (남는 공간 차지) |
| **Vertical scrolling** | ✅ when content is taller than container | |
| **Padding** | `8px` | |
| **Background** | None | |

---

### 📦 메뉴 아이템 공통 구조 (NavItem)

각 NavItem은 아래 구조를 반복합니다.

| 속성 | 값 | 비고 |
|------|-----|------|
| **Container layout** | Row | |
| **Column gap** | `12px` | Icon ↔ Text |
| **Container alignment** | Center vertically | |
| **Width** | `100%` | |
| **Min height** | `44px` | 터치 최소 영역 |
| **Padding** | `12px 16px` | |
| **Roundness** | `12` | |
| **Background** | transparent | Default |
| **Cursor** | pointer | |

**Icon 속성:**

| 속성 | 값 |
|------|-----|
| **Source** | Material Icons Round |
| **Size** | `20px` |
| **Color** | `#FFFFFFB3` (70% white) — Default |

**Text 속성:**

| 속성 | 값 |
|------|-----|
| **Font size** | `14px` |
| **Font weight** | `500` — Default |
| **Font color** | `#FFFFFFB3` (70% white) — Default |

---

### NavItem 상태별 Conditional

#### Hover 상태

| 조건 | 대상 | 속성 변경 | 값 |
|------|------|-----------|-----|
| `This Group is hovered` | NavItem Group | Background | `#FFFFFF0D` (5% white) |
| `This Group is hovered` | Icon | Color | `#FFFFFF` |
| `This Group is hovered` | Text | Font color | `#FFFFFF` |

#### Active 상태 (현재 페이지)

각 NavItem에 대응하는 page 이름을 체크합니다.

| 조건 | 대상 | 속성 변경 | 값 |
|------|------|-----------|-----|
| `This RE_Sidebar's active_page is "admin-dashboard"` | NavItem_Dashboard Group | Background | `#FFFFFF1A` (10% white) | ← 📥 Property 참조 |
| (동일 조건) | NavItem_Dashboard Icon | Color | `#FFFFFF` |
| (동일 조건) | NavItem_Dashboard Text | Font color | `#FFFFFF` |
| (동일 조건) | NavItem_Dashboard Text | Font weight | `600` |

> ⚠️ **각 NavItem마다** 해당 page 이름에 맞는 Conditional을 추가해야 합니다.

---

### 역할별 메뉴 그룹

각 역할 메뉴는 **별도 Group**으로 감싸고, Conditional로 표시/숨김합니다.

#### Group_AdminMenu (관리자)

**Conditional:** `Current User's role is ACADEMY_ADMIN` → Visible: `true`  
**기본 Visible:** `false`

| NavItem | Icon (Material) | Text | active_page 값 | Go to page |
|---------|-----------------|------|----------------|------------|
| NavItem_AdminDashboard | `dashboard` | `대시보드` | `admin-dashboard` | admin-dashboard |
| NavItem_AdminStudents | `people` | `학생 관리` | `admin-students` | admin-students |
| NavItem_AdminClasses | `class` | `반 관리` | `admin-classes` | admin-classes |
| NavItem_AdminLearning | `trending_up` | `학습 현황` | `admin-learning-status` | admin-learning-status |

#### Group_StudentMenu (학생)

**Conditional:** `Current User's role is STUDENT` → Visible: `true`  
**기본 Visible:** `false`

| NavItem | Icon | Text | active_page 값 | Go to page |
|---------|------|------|----------------|------------|
| NavItem_StudentHome | `home` | `홈` | `student-dashboard` | student-dashboard |
| NavItem_StudentSubjects | `school` | `학습 도우미` | `subjects` | subjects |
| NavItem_SubKorean | `auto_stories` | `국어` | `subject-korean` | subject-korean |
| NavItem_SubEnglish | `translate` | `영어` | `subject-english` | subject-english |
| NavItem_SubMath | `calculate` | `수학` | `subject-math` | subject-math |

> 💡 과목 메뉴(국어/영어/수학)는 들여쓰기를 줍니다:  
> `Padding left: 32px` (16px 기본 + 16px 들여쓰기)  
> 또는 Group으로 감싸서 `Margin left: 16px`

과목 NavItem의 **추가 Active 조건**: 학습 진행 중 페이지에서도 Active 표시

| 조건 | NavItem |
|------|---------|
| `active_page is "subject-korean" OR active_page is "korean-learning"` | NavItem_SubKorean |
| `active_page is "subject-english" OR active_page is "english-prelearn" OR active_page is "english-test" OR active_page is "english-daily-result"` | NavItem_SubEnglish |
| `active_page is "subject-math" OR active_page is "math-problem" OR active_page is "math-daily-result"` | NavItem_SubMath |

#### Group_InstructorMenu (강사)

**Conditional:** `Current User's role is INSTRUCTOR` → Visible: `true`  
**기본 Visible:** `false`

| NavItem | Icon | Text | active_page 값 | Go to page |
|---------|------|------|----------------|------------|
| NavItem_InsDashboard | `dashboard` | `대시보드` | `instructor-dashboard` | instructor-dashboard |
| NavItem_InsStudents | `people` | `학생 관리` | `instructor-students` | instructor-students |
| NavItem_InsDetail | `person_search` | `학생 상세` | `instructor-student-detail` | instructor-student-detail |

---

### 📦 Group_SidebarFooter

| 속성 | 값 |
|------|-----|
| **Container layout** | Column |
| **Row gap** | `4px` |
| **Width** | `100%` |
| **Padding** | `8px` |
| **Border - top** | `1px solid #FFFFFF1A` |

#### NavItem_Settings

| 속성 | 값 | 비고 |
|------|-----|------|
| Icon | `settings` | |
| Text | `설정` | |
| 스타일 | NavItem 공통과 동일 | |

**Workflow:** Go to page → 역할별 settings (admin-settings / settings)

#### NavItem_Logout

| 속성 | 값 | 비고 |
|------|-----|------|
| Icon | `logout` | |
| Text | `로그아웃` | |
| Icon Color (Default) | `#FFFFFFB3` | 일반 NavItem과 동일 |

**Hover Conditional (로그아웃 전용):**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `This Group is hovered` | Background | `#EF444420` (Destructive 12% 투명) |
| `This Group is hovered` | Icon Color | `#EF4444` |
| `This Group is hovered` | Text Color | `#EF4444` |

**Workflow:**

| Step | Action |
|------|--------|
| 1 | Log the user out |
| 2 | Go to page → `login` |

---

## 4.5 모바일 대응 (≤1200px)

### 개요

PC(>1200px)에서는 사이드바가 항상 보이고, 태블릿/모바일(≤1200px)에서는 기본 숨김 + 햄버거 토글로 동작합니다.

### 방법 1: Conditional Visible (간단)

RE_Sidebar를 각 페이지에 배치할 때:

| 조건 | 속성 변경 | 값 | 비고 |
|------|-----------|-----|------|
| `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "no"` | RE_Sidebar Visible | `false` | 🔄 Custom State 읽기 |
| `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "yes"` | RE_Sidebar Visible | `true` | 🔄 Custom State 읽기 |

### 방법 2: Overlay 추가 (권장)

사이드바가 열릴 때 뒤에 반투명 오버레이를 깔아 나머지 영역 클릭 시 닫히게 합니다.

**Group_SidebarOverlay (각 페이지에 배치):**

| 속성 | 값 | 비고 |
|------|-----|------|
| **Width** | `100%` | |
| **Height** | `100%` | |
| **Background** | `#00000080` (50% 검정) | Overlay Dark |
| **Position** | Fixed (또는 최상위) | z-index: 모달 바로 아래 |
| **Visible on page load** | ❌ | |

**Conditional:**

| 조건 | Visible | 비고 |
|------|---------|------|
| `Current page width ≤ 1200` AND `RE_Header's sidebar_open is "yes"` | `true` | 🔄 Custom State 읽기 |

**Workflow:**

| Event | Action | 비고 |
|-------|--------|------|
| `Group_SidebarOverlay is clicked` | Set state: `RE_Header's sidebar_open` = `no` | 🔄 Custom State 변경 |

**RE_Sidebar Close 버튼 신호 처리 (부모 페이지 Workflow):**

> ⚠️ RE_Sidebar 내부의 Icon_Close는 RE_Header의 Custom State에 직접 접근할 수 없으므로,  
> `close_requested` 신호를 부모 페이지에서 감지하여 처리합니다.

| Event | Action | 비고 |
|-------|--------|------|
| `Do when condition is true`: `RE_Sidebar's close_requested is "yes"` | Action 1: Set state: `RE_Header's sidebar_open` = `no` | 🔄 SSOT 변경 |
| *(위 이벤트 계속)* | Action 2: Set state: `RE_Sidebar's close_requested` = `no` | 🔄 신호 리셋 |

```
Bubble Editor에서 설정:
  ① Workflow 탭 → Click here to add an event
  ② "Do when condition is true" 선택
  ③ Only when: RE_Sidebar's close_requested is "yes"
  ④ Action 1: Element Actions > Set state
      Element: RE_Header  |  State: sidebar_open  |  Value: no
  ⑤ Action 2: Element Actions > Set state
      Element: RE_Sidebar  |  State: close_requested  |  Value: no
```

### Main Content 영역 반응형

| 조건 | MainContent Group | 값 |
|------|-------------------|-----|
| `Current page width > 1200` | Margin left | `256px` (사이드바 너비) |
| `Current page width ≤ 1200` | Margin left | `0` (사이드바 위에 떠있으므로) |

---

## 4.6 RE_Sidebar 페이지 배치 방법

각 Type A 페이지에서:

```
Page (100%, BG: #F9FAFB)
├── FG_Header (Floating Group, top)
│   └── RE_Header
│       ├── (헤더 내부 요소들)
│       ├── GF_Notification ← RE_Header 내부에 포함됨
│       └── GF_UserMenu     ← RE_Header 내부에 포함됨
│
├── Group_PageBody (Row, width: 100%, margin-top: 64px)
│   ├── RE_Sidebar (256px, height: calc(100vh - 64px))
│   │   position: sticky, top: 64px
│   │
│   └── Group_MainContent (flex: 1, padding: 24px)
│       └── [페이지별 콘텐츠]
│
├── Group_SidebarOverlay (모바일용, 기본 숨김)
└── Popup_Modal
```

> ✅ GF_Notification과 GF_UserMenu는 RE_Header 내부에 있으므로 **페이지마다 별도 배치 불필요**합니다.  
> 페이지에서 관리해야 할 것: RE_Header Property 설정, RE_Sidebar Property 설정, Overlay, Popup_Modal

**📥 Property 설정 (요소 Appearance 탭에서 — Workflow 아님!):**

RE_Header와 RE_Sidebar를 페이지에 배치한 후, 각 요소의 Appearance 탭에서 Property를 설정합니다:

| 요소 | Property | 설정 값 |
|------|----------|---------|
| RE_Header | `page_title` | `"대시보드"` |
| RE_Header | `notif_count` | `Search for Notifications [user_id = Current User, is_read = no]:count` |
| RE_Sidebar | `active_page` | `"admin-dashboard"` |

> ⚠️ 위 3개는 모두 **Property**입니다. `Set state` Workflow가 아닙니다!  
> 요소를 클릭 → Appearance 탭에서 직접 값을 입력합니다.

---

---

# 5. 페이지별 Popup (모달) 가이드

> ⚠️ **v1.3 변경**: RE_Modal은 Reusable Element 목록에서 **제외**되었습니다.  
> Bubble Popup은 RE로 만들 수 없고, 각 페이지마다 Body 콘텐츠가 다르기 때문에 **페이지별 직접 생성**합니다.

---

## 5.1 방침

| 항목 | 내용 |
|------|------|
| **스타일 통일** | Element Style `Popup - Standard` 적용 (Roundness 16, Shadow LG, Overlay `#00000080`) |
| **내부 구조** | 각 페이지 용도에 맞게 자유롭게 구성 |
| **Custom States** | 해당 페이지에서 실제 필요한 것만 생성 (5개 고정 아님) |

## 5.2 페이지별 모달 예시

| 페이지 | 모달 용도 | 필요한 Custom State |
|--------|-----------|---------------------|
| admin-students | 학생 삭제 확인 | `target_id` 하나면 충분 |
| admin-classes | 반 생성 폼 | Input 필드 직접 배치, Custom State 불필요 |
| admin-payments | 결제 상세 보기 | 정보 표시만, "확인" 버튼 하나 |

## 5.3 Popup 기본 설정 (공통)

| 속성 | 값 | 비고 |
|------|-----|------|
| **Style** | `Popup - Standard` | 이미 생성된 Element Style 적용 |
| **Container layout** | Column | |
| **Show animation** | Fade & zoom in | |
| **Duration** | `200ms` | |
| **Close on outside click** | ✅ | |

## 5.4 권장 구조 패턴 (참고용)

```
Popup (Style: Popup - Standard)
├── Group_Header (Row, Gap 8px)
│   ├── Text_Title (Heading 4~5)
│   └── Icon_Close (close 아이콘, Ghost 스타일)
│
├── Group_Body (Column)
│   └── (페이지별 자유 구성)
│
└── Group_Footer (Row, Gap 8px, justify: end)
    ├── Button_Cancel (Outline Secondary)
    └── Button_Confirm (Primary 또는 Destructive)
```

> 이 구조는 **강제가 아닌 권장 패턴**입니다. 단순 확인 모달이면 Footer에 버튼 하나만 넣어도 됩니다.


---

# 6. 구현 순서 체크리스트

| # | 작업 | 예상 소요 | 확인 |
|---|------|-----------|------|
| 1 | RE_Header Reusable Element 생성 | 10분 | ☐ |
| 2 | RE_Header 내부 요소 배치 (Group_Left, Text_PageTitle, Group_Right) | 30분 | ☐ |
| 3 | RE_Header Property 설정 (2개: page_title, notif_count) + Custom State 설정 (1개: sidebar_open) | 5분 | ☐ |
| 4 | RE_Header 데이터 바인딩 (UserName, Initial, PageTitle) | 10분 | ☐ |
| 5 | RE_Header Conditional 설정 (10개) | 20분 | ☐ |
| 6 | RE_Header Workflow 설정 (4개) | 10분 | ☐ |
| 7 | GF_Notification Group Focus 생성 (RE_Header 내부) | 10분 | ☐ |
| 8 | GF_Notification 내부 요소 배치 (Header, RG, Footer) | 30분 | ☐ |
| 9 | GF_Notification Repeating Group 데이터 바인딩 | 15분 | ☐ |
| 10 | GF_Notification 타입별/읽음 Conditional | 20분 | ☐ |
| 11 | GF_Notification Workflow (읽음 처리, 전체 보기) | 10분 | ☐ |
| 12 | GF_UserMenu Group Focus 생성 (RE_Header 내부) | 10분 | ☐ |
| 13 | GF_UserMenu 내부 요소 배치 (UserInfo, MenuItems) | 20분 | ☐ |
| 14 | GF_UserMenu 로그아웃 Workflow | 5분 | ☐ |
| 15 | RE_Sidebar Reusable Element 생성 | 10분 | ☐ |
| 16 | RE_Sidebar 내부 요소 배치 (Header, Profile, NavMenu, Footer) | 30분 | ☐ |
| 17 | RE_Sidebar Property 설정 (1개: active_page) + Custom State (1개: close_requested) | 5분 | ☐ |
| 18 | RE_Sidebar 관리자 메뉴 그룹 (4개 NavItem) | 20분 | ☐ |
| 19 | RE_Sidebar 학생 메뉴 그룹 (6개 NavItem) | 25분 | ☐ |
| 20 | RE_Sidebar 강사 메뉴 그룹 (3개 NavItem) | 15분 | ☐ |
| 21 | RE_Sidebar 역할별 Conditional (3개 그룹) | 10분 | ☐ |
| 22 | RE_Sidebar Active 메뉴 Conditional (NavItem별) | 30분 | ☐ |
| 23 | RE_Sidebar Hover Conditional (NavItem별) | 15분 | ☐ |
| 24 | RE_Sidebar Footer Workflow (설정, 로그아웃) | 10분 | ☐ |
| 25 | RE_Sidebar 모바일 대응 (Overlay + 토글) | 20분 | ☐ |
| | **합계** | **약 6.5시간** | |

---

# 7. 주의사항 및 FAQ

### Q1: Property와 Custom State를 언제 사용하나요?

**A:** 아래 표를 참고하세요:

| 상황 | 사용할 것 | 예시 |
|------|-----------|------|
| 부모 페이지가 값을 넣어주기만 하면 됨 | 📥 **Property** | `page_title`, `active_page`, `notif_count` |
| RE 내부에서 값을 변경(토글)해야 함 | 🔄 **Custom State** | `sidebar_open` (햄버거 클릭 토글) |
| 부모 페이지에서 RE의 상태를 읽어야 함 | 🔄 **Custom State** | `sidebar_open` (부모가 사이드바 표시 결정) |
| RE 내부 이벤트를 부모에게 신호로 전달 | 🔄 **Custom State** | `close_requested` (Close 클릭 → 부모가 감지) |
| Popup에서 동적 값 관리 | 🔄 **Custom State** | Popup은 Property 미지원, 각 페이지에서 필요한 것만 생성 |

> ⚠️ **Property는 `Set state`로 설정하지 않습니다!** RE를 페이지에 배치한 후 Appearance 탭에서 직접 값을 입력합니다.

### Q2: Group Focus를 Reusable Element 안에 넣을 수 있나요?
**A:** ✅ 네, 가능합니다! Group Focus의 핵심 조건은 **Reference 요소와 같은 컨테이너에 있어야 한다**는 것입니다. GF_Notification의 Reference인 `Icon_Notification`도, GF_UserMenu의 Reference인 `Group_UserMenuTrigger`도 모두 RE_Header 내부에 있으므로, Group Focus를 RE_Header 안에 배치하면 정상 동작합니다. 이렇게 하면 **페이지마다 반복 생성할 필요 없이** RE_Header를 배치하는 것만으로 알림/유저메뉴 드롭다운이 자동으로 포함됩니다.

### Q3: 사이드바와 헤더 간 sidebar_open 상태 연동은?
**A:** RE_Header의 **Custom State** `sidebar_open`이 SSOT(단일 진실 공급원)이며, 부모 페이지가 중재합니다:

```
[열기 — RE_Header 내부]
  햄버거 클릭 → Set state: sidebar_open = toggle        ← 🔄 Custom State 토글

[부모 페이지 — Conditional로 표시 제어]
  When RE_Header's sidebar_open is "yes"                 ← 🔄 Custom State 읽기
    → RE_Sidebar Visible = true
    → Group_SidebarOverlay Visible = true

[닫기 경로 ① — Overlay 클릭 (부모 페이지)]
  Set state: RE_Header's sidebar_open = "no"             ← 🔄 Custom State 변경

[닫기 경로 ② — Close 아이콘 (RE_Sidebar 내부 → 부모 페이지 연계)]
  RE_Sidebar: Set state: close_requested = "yes"         ← 🔄 신호 발신
  부모 페이지: "Do when condition is true"로 감지
    → Set state: RE_Header's sidebar_open = "no"         ← 🔄 SSOT 변경
    → Set state: RE_Sidebar's close_requested = "no"     ← 🔄 신호 리셋
```

> RE_Sidebar 내부에서 RE_Header의 Custom State를 직접 변경할 수 없으므로, `close_requested` 신호를 부모 페이지가 감지하여 중재합니다.

### Q4: Material Icons Round는 어떻게 설정하나요?
**A:** Bubble Settings → General → Fonts에서 Google Fonts CDN URL 추가:
```
https://fonts.googleapis.com/icon?family=Material+Icons+Round
```
그 후 Icon 요소에서 Custom icon 옵션을 통해 Material Icons를 사용할 수 있습니다. 또는 Bubble의 Ion Icons 대신 HTML 요소로 `<span class="material-icons-round">menu</span>` 형태로 삽입합니다.

### Q5: Pretendard 폰트 설정은?
**A:** Bubble Settings → General → Fonts에서 CDN URL 추가:
```
https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css
```
이후 Font 이름으로 `Pretendard`를 입력합니다.

### Q6: #FFFFFF1A 같은 8자리 HEX(알파 포함)를 Bubble에서 쓸 수 있나요?
**A:** Bubble에서는 8자리 HEX를 직접 지원하지 않을 수 있습니다. 이 경우 `rgba()` 형태로 입력하거나, 가장 가까운 불투명 색상으로 대체합니다:
- `#FFFFFF1A` (10% white) → 네이비 위에서 `#2D426A` 정도
- `#FFFFFF0D` (5% white) → 네이비 위에서 `#23385A` 정도
- `#00000080` (50% black) → Bubble Overlay 색상 설정에서 opacity 조절

---

*— MAMA-ASST RE 상세 개발 가이드 v1.3 끝 —*
