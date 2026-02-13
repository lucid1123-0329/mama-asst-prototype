# MAMA-ASST
## Matching & Management Assistant
### Bubble.io Element Styles 설계서 v3.6
### 검토 완료 최종본

작성일: 2025-01-21

---

## 📋 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v3.5 | 2025-01-16 | 프로토타입 테스트 완료, 61개 Element Styles 확정 |
| v3.6 | 2025-01-21 | 검토 반영 최종본: Primary Lightest 수정(#FFF0ED), Input Height 48px, Pretendard 폰트, Style Variables 44개 확장, Z-Index/Transitions 추가 |

---

## 📑 목차

| Part | 내용 | 스타일 수 |
|------|------|-----------|
| Part 1 | 기준 정보 (Style Variables, 브레이크포인트, Z-Index, Transitions) | 44개 변수 |
| Part 2 | Text 스타일 | 17개 |
| Part 3 | Button 스타일 | 12개 |
| Part 4 | Input 스타일 | 6개 |
| Part 5 | Checkbox & Radio (커스텀 Reusable Element) | 2개 |
| Part 6 | Alert 스타일 | 4개 |
| Part 7 | Group 스타일 | 6개 |
| Part 8 | Floating Group | 2개 |
| Part 9 | Link 스타일 | 3개 |
| Part 10 | Icon 스타일 | 3개 |
| Part 11 | Repeating Group | 2개 |
| Part 12 | 기타 (Popup, File Uploader, Slider, Page) | 4개 |
| **총계** | | **61개 Element Styles** |

---

## 📐 Part 1: 기준 정보

### 1.1 폰트 시스템

> ⚠️ 디자인 가이드 v3.5에 따라 Pretendard를 Primary 폰트로 사용합니다. (v3.6 변경)

| 용도 | 폰트 | Fallback | 비고 |
|------|------|----------|------|
| Primary | Pretendard | Apple SD Gothic Neo, Malgun Gothic, sans-serif | Settings > Fonts 등록 |
| Code/숫자 | JetBrains Mono | Consolas, monospace | 학습 결과 숫자 표시 |
| LaTeX 수식 | KaTeX 기본 | - | 수학 문제 렌더링 |

CDN URL: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`

### 1.2 색상 표기 규칙

모든 색상은 HEX 코드로 표기. rgba 사용 시 아래 변환표 참조:

| rgba 표기 | HEX 변환 | 용도 |
|-----------|----------|------|
| rgba(0,0,0,0.05) | #0000000D | 약한 그림자 (5%) |
| rgba(0,0,0,0.1) | #0000001A | 표준 그림자 (10%) |
| rgba(0,0,0,0.15) | #00000026 | 강한 그림자 (15%) |
| rgba(0,0,0,0.5) | #00000080 | 오버레이 (50%) |
| rgba(255,255,255,0.7) | #FFFFFFB3 | Nav 텍스트 (70%) |
| rgba(255,109,77,0.1) | #FF6D4D1A | Input 포커스 링 |

### 1.3 반응형 브레이크포인트

| 디바이스 | 조건 | Conditional 작성법 | 주요 변경 |
|----------|------|-------------------|-----------|
| PC | > 1200px | (기본값) | Container max-width: 1200px |
| Tablet | ≤ 1200px | Current page width ≤ 1200 | Sidebar 숨김, 햄버거 메뉴 |
| Mobile Landscape | ≤ 1024px | Current page width ≤ 1024 | 그리드 1fr 변경 |
| Mobile Portrait | ≤ 768px | Current page width ≤ 768 | Stats 카드 1열 |
| Small Mobile | ≤ 480px | Current page width ≤ 480 | 최소 패딩, 버튼 13px |

### 1.4 Z-Index 시스템 (v3.6 신규)

Bubble.io의 Bring to front/Send to back 참고용:

| 레벨 | 값 | 용도 | 예시 |
|------|-----|------|------|
| z-dropdown | 100 | 드롭다운 메뉴 | Dropdown, Select 옵션 |
| z-sticky | 200 | 고정 헤더 | Header, Floating Group |
| z-modal-backdrop | 300 | 모달 배경 | Popup overlay |
| z-modal | 400 | 모달 콘텐츠 | Popup content |
| z-toast | 500 | 토스트 알림 | 최상단 알림 |

### 1.5 Transitions 설정 (v3.6 신규)

모든 인터랙티브 요소에 적용되는 트랜지션:

| 속성 | Duration | Easing | 적용 대상 |
|------|----------|--------|-----------|
| Background style transition | 200ms | Ease | 버튼 배경, 카드 호버 |
| Border color transition | 200ms | Ease | Input focus, 버튼 테두리 |
| Font color transition | 200ms | Ease | 링크, 텍스트 색상 변경 |
| Transform transition | 200ms | Ease | 카드 hover (translateY) |
| Box-shadow transition | 200ms | Ease | 그림자 변화 |
| Opacity transition | 150ms | Ease | 페이드 인/아웃 |

### 1.6 Style Variables (44개)

Settings > Style variables에서 생성. v3.6에서 40개 → 44개로 확장.

#### ▸ Primary 계열 (5개)

| Variable | HEX | 용도 |
|----------|-----|------|
| Primary | #FF6D4D | CTA 버튼, 강조, 로고, 활성 상태 |
| Primary Lightest | #FFF0ED | Outline 버튼 hover 배경 (v3.6 수정: #FFF5F2→#FFF0ED) |
| Primary Light | #FFF0ED | Outline 버튼 pressed 배경 |
| Primary Hover | #E55A3C | Primary 버튼 hover |
| Primary Active | #CC4A2F | Primary 버튼 pressed |

#### ▸ Navy 계열 (3개)

| Variable | HEX | 용도 |
|----------|-----|------|
| Navy | #1A2E4D | 제목, 사이드바, Secondary 버튼, 네비게이션 |
| Navy Medium | #2C4872 | Secondary 버튼 hover |
| Navy Light | #3D5A80 | Secondary 버튼 pressed |

#### ▸ Text 계열 (4개)

| Variable | HEX | 용도 |
|----------|-----|------|
| Text Primary | #1F2937 | 본문 텍스트, 기본 폰트 색상 |
| Text Secondary | #6B7280 | 보조 텍스트, 캡션, 아이콘 |
| Text Tertiary | #9CA3AF | Placeholder, Disabled 텍스트 |
| Text Inverse | #FFFFFF | 버튼 텍스트 (어두운 배경 위) |

#### ▸ Border & Background (5개)

| Variable | HEX | 용도 |
|----------|-----|------|
| Border Light | #E5E7EB | 기본 테두리, Input 기본 border |
| Border Medium | #D1D5DB | 강조 테두리, Outline 버튼 border |
| Background | #F9FAFB | 페이지 배경 |
| Surface | #FFFFFF | 카드, 입력 필드, 모달 배경 |
| BG Hover | #F3F4F6 | Ghost 버튼 hover, 테이블 행 hover |

#### ▸ 과목별 컬러 (8개)

| Variable | HEX | Light 버전 | 용도 |
|----------|-----|------------|------|
| Korean | #4285F4 | Korean Light: #E8F0FE | 국어 학습 도우미 |
| English | #34A853 | English Light: #E6F4EA | 영어 학습 도우미 |
| Math | #FBBC05 | Math Light: #FEF7E0 | 수학 학습 도우미 |
| Planner | #9C27B0 | Planner Light: #F3E5F5 | 플래너, 성향검사 |

#### ▸ Super Admin (3개)

| Variable | HEX | 용도 |
|----------|-----|------|
| Super | #6366F1 | 슈퍼관리자 Primary |
| Super Dark | #4F46E5 | 슈퍼관리자 Hover |
| Super Light | #EEF2FF | 슈퍼관리자 배경 |

#### ▸ Semantic 컬러 (8개)

| Variable | HEX | Light 버전 | 용도 |
|----------|-----|------------|------|
| Success | #22C55E | Success Light: #F0FDF4 | 정답, 완료, 성공 메시지 |
| Destructive | #EF4444 | Error Light: #FEF2F2 | 오답, 에러, 삭제 버튼 |
| Alert | #F59E0B | Warning Light: #FFFBEB | 주의, 부분 성공 |
| Info | #3B82F6 | Info Light: #EFF6FF | 안내, 정보성 메시지 |

#### ▸ Shadow & Gradient (v3.6 신규 8개)

| Variable | 값 | 용도 |
|----------|-----|------|
| Shadow Card | 0 1px 3px #0000001A, 0 1px 2px #0000000F | 카드 기본 그림자 |
| Shadow Card Hover | 0 4px 6px #0000001A, 0 2px 4px #0000000F | 카드 호버 그림자 |
| Shadow LG | 0 10px 25px #0000001A, 0 4px 10px #00000006 | 팝업, 드롭다운 |
| Shadow Focus | 0 0 0 3px #FF6D4D1A | Input 포커스 링 |
| Gradient Primary | linear-gradient(135deg, #FF6D4D 0%, #FF8A6A 100%) | 버튼 그라디언트 |
| Gradient Super | linear-gradient(135deg, #6366F1 0%, #818CF8 100%) | 슈퍼관리자 그라디언트 |
| Gradient BG Warm | linear-gradient(180deg, #FFF5F2 0%, #FDFBFA 50%, #F9FAFB 100%) | 인증 페이지 배경 |
| Overlay Dark | #00000080 | 모달 오버레이 |

---

## 📝 Part 2: Text 스타일 (17개)

### 2.1 Display (랜딩/마케팅용) - 2개

#### ● Text - Display 1

| 속성 | PC (>1200) | ≤1200 | ≤1024 | ≤768 | ≤480 |
|------|-----------|-------|-------|------|------|
| Font Size | 56px | 48px | 44px | 36px | 32px |
| Font Weight | 700 (Bold) | - | - | - | - |
| Font Color | Navy (#1A2E4D) | - | - | - | - |
| Line Height | 1.2 | - | - | - | - |
| Letter Spacing | -0.02em | - | - | - | - |

#### ● Text - Display 2

| 속성 | PC (>1200) | ≤1200 | ≤1024 | ≤768 | ≤480 |
|------|-----------|-------|-------|------|------|
| Font Size | 48px | 40px | 36px | 32px | 28px |
| Font Weight | 700 (Bold) | - | - | - | - |
| Font Color | Navy (#1A2E4D) | - | - | - | - |
| Line Height | 1.2 | - | - | - | - |

### 2.2 Heading (UI용) - 6개

#### ● Text - Heading 1 ⭐ Default

| 속성 | PC (>1200) | ≤1200 | ≤1024 | ≤768 | ≤480 |
|------|-----------|-------|-------|------|------|
| Font Size | 36px | 32px | 30px | 28px | 24px |
| Font Weight | 700 (Bold) | - | - | - | - |
| Font Color | Navy (#1A2E4D) | - | - | - | - |
| Line Height | 1.3 | - | - | - | - |

나머지 Heading 스타일 요약:

| 스타일 | Font Size (PC) | 반응형 축소 | Weight | Color |
|--------|---------------|------------|--------|-------|
| Heading 2 | 28px | ≤1200→26, ≤1024→24, ≤768→22, ≤480→20 | 700 | Navy |
| Heading 3 | 24px | ≤1200→22, ≤1024→20, ≤768→18 | 600 | Navy |
| Heading 4 | 20px | ≤1024→18, ≤480→16 | 600 | Text Primary |
| Heading 5 | 18px | ≤1024→16 | 600 | Text Primary |
| Heading 6 | 16px | ≤768→14 | 600 | Text Primary |

### 2.3 Body - 4개

| 스타일 | Font Size | 반응형 | Weight | Color | Line Height |
|--------|-----------|--------|--------|-------|-------------|
| Body 18 | 18px | ≤768→16px | 400 | Text Primary | 1.6 |
| Body 16 ⭐ | 16px | ≤480→14px | 400 | Text Primary | 1.6 |
| Body 14 | 14px | (고정) | 400 | Text Primary | 1.6 |
| Body 12 | 12px | (고정) | 400 | Text Secondary | 1.6 |

### 2.4 Utility - 5개

| 스타일 | Font Size | Weight | Color | 용도 |
|--------|-----------|--------|-------|------|
| Caption | 12px | 400 | Text Secondary (#6B7280) | 이미지 캡션, 부가 설명 |
| Label | 14px | 500 | Text Primary (#1F2937) | 폼 라벨 |
| Error | 12px | 400 | Destructive (#EF4444) | 에러 메시지 |
| Nav Text | 14px | 500 | #FFFFFFB3 | 사이드바 메뉴 (Hover: #FFFFFF) |
| Badge | 12px | 500 | (배경색에 따름) | 배지/태그 텍스트 |

---

## 🔘 Part 3: Button 스타일 (12개)

### 3.1 버튼 공통 설정

**▸ Appearance 기본값:**

| 속성 | 값 | 비고 |
|------|-----|------|
| Font | Pretendard | Style Variables의 기본 폰트 상속 |
| Font Size | 14px | |
| Font Weight | 600 (Semi-Bold) | |
| Line Spacing | 1.4 | |
| Text Alignment | Center | |
| Icon Size | 24px | |
| Roundness | 8 | |

**▸ Layout 기본값:**

| 속성 | 값 | 비고 |
|------|-----|------|
| Min Height | 44px | 터치 영역 최소 기준 |
| Padding Top/Bottom | 12px | |
| Padding Left/Right | 24px | |

**▸ Shadow 설정 (Filled 버튼용):**

| 상태 | H-offset | V-offset | Blur | Spread | Color |
|------|----------|----------|------|--------|-------|
| Default | 0 | 1 | 3 | 0 | #0000001A |
| Hover | 0 | 4 | 6 | -1 | #0000001A |
| Pressed | 0 | 1 | 2 | 0 | #0000001A |
| Disabled | 0 | 0 | 0 | 0 | (None) |

**▸ 반응형 Conditional:**

| 조건 | 변경 속성 | 값 |
|------|-----------|-----|
| Current page width ≤ 768px | Padding Left/Right | 20px |
| Current page width ≤ 480px | Padding Left/Right | 16px |
| Current page width ≤ 480px | Font Size | 13px |

### 3.2 Filled 버튼 (7개)

| 스타일 | Default BG | Hover BG | Pressed BG | Font Color |
|--------|-----------|----------|------------|------------|
| Primary ⭐ Default | #FF6D4D | #E55A3C | #CC4A2F | #FFFFFF |
| Secondary | #1A2E4D | #2C4872 | #3D5A80 | #FFFFFF |
| Destructive | #EF4444 | #DC2626 | #B91C1C | #FFFFFF |
| Korean | #4285F4 | #3B78E7 | #2D6AD4 | #FFFFFF |
| English | #34A853 | #2E9A4B | #278C42 | #FFFFFF |
| Math | #FBBC05 | #E5AB00 | #CC9900 | #1A2E4D |
| Super | #6366F1 | #4F46E5 | #4338CA | #FFFFFF |

> ※ 모든 Filled 버튼 Disabled: Background #E5E7EB, Font Color #9CA3AF, Shadow 없음

### 3.3 Outline 버튼 (3개)

> 공통: Border Width 1px, Shadow None, Background transparent (기본)

| 스타일 | Border/Font | Hover BG | Pressed BG | Disabled |
|--------|------------|----------|------------|----------|
| Outline Primary | #FF6D4D | #FFF0ED | #FFF0ED | Border:#E5E7EB, Font:#9CA3AF |
| Outline Destructive | #EF4444 | #FEF2F2 | #FEE2E2 | Border:#E5E7EB, Font:#9CA3AF |
| Outline Secondary | Border:#D1D5DB, Font:#1A2E4D | #F3F4F6 | #E5E7EB | Border:#E5E7EB, Font:#9CA3AF |

### 3.4 기타 버튼 (2개)

| 스타일 | Background | Font Color | 특징 |
|--------|-----------|------------|------|
| Link | None | #FF6D4D | Padding 0, Weight 500, Hover시 underline |
| Ghost | transparent | #6B7280 | Weight 500, Hover시 BG:#F3F4F6, Font:#1F2937 |

#### ● Button - Icon Only (Ghost 변형)

| 속성 | 값 |
|------|-----|
| Width / Height | 40px / 40px |
| Padding | 8px (all) |
| Icon Size | 24px |
| Icon Color | #6B7280 → Hover: #1F2937 |
| Hover Background | #F3F4F6 |
| Roundness | 8 |

---

## 📝 Part 4: Input 스타일 (6개)

### 4.1 Input 공통 설정

> ⚠️ v3.6 변경: Min Height 44px → 48px (터치 영역 최적화, iOS 자동확대 방지)

| 속성 | 값 | 비고 |
|------|-----|------|
| Font Size | 16px | iOS 자동확대 방지 (16px 이상 필수) |
| Font Weight | 400 | |
| Font Color | Text Primary (#1F2937) | |
| Background | Surface (#FFFFFF) | |
| Border | 1px solid #E5E7EB | Border Light |
| Roundness | 8 | |
| Min Height | 48px | v3.6 수정 (기존 44px) |
| Padding | 12px 16px | |
| Placeholder Color | Text Tertiary (#9CA3AF) | |
| Focused Border | 2px solid #FF6D4D | Primary |
| Focused Shadow | 0 0 0 3px #FF6D4D1A | Shadow Focus |

### 4.2 Input 스타일 목록

| 스타일 | 특이 설정 | 용도 |
|--------|-----------|------|
| Standard ⭐ Default | 공통 설정 그대로 | 일반 텍스트 입력 |
| Error | Border: 2px #EF4444, BG: #FEF2F2 | 검증 실패 시 |
| Multiline Standard ⭐ | Min Height: 120px | textarea, 긴 텍스트 입력 |
| Search Box Standard ⭐ | Roundness: 22px, Padding: 12px 16px 12px 44px | 검색창 (좌측 아이콘 공간) |
| Dropdown Standard ⭐ | 공통 설정 그대로 | 드롭다운 선택 |
| Date/Time Picker ⭐ | 공통 설정 그대로 | 날짜/시간 선택 |

---

## ✅ Part 5: Checkbox & Radio (커스텀)

> ⚠️ Bubble 기본 Checkbox/Radio 대신 Reusable Element로 구현하여 스타일 완전 제어

### 5.1 RE_Checkbox (커스텀 체크박스)

**▸ 구조:**

| Element | Type | 설명 |
|---------|------|------|
| RE_Checkbox | Reusable Element | 전체 컨테이너 (Row layout) |
| └ checkbox-box | Group | 체크박스 박스 (20×20) |
| └ check-icon | Icon | 체크 아이콘 (조건부 표시) |
| └ checkbox-label | Text | 라벨 텍스트 (14px, Text Primary) |

**▸ Custom States:**

| State Name | Type | Default | 용도 |
|------------|------|---------|------|
| is_checked | yes/no | no | 체크 상태 |
| is_disabled | yes/no | no | 비활성화 상태 |

**▸ checkbox-box 상태별 스타일:**

| 속성 | Unchecked | Checked | Disabled |
|------|-----------|---------|----------|
| Width / Height | 20px / 20px | - | - |
| Background | #FFFFFF | #FF6D4D (Primary) | #F3F4F6 |
| Border | 2px solid #D1D5DB | 2px solid #FF6D4D | 2px solid #E5E7EB |
| Roundness | 4 | - | - |
| Cursor | pointer | - | not-allowed |

**▸ check-icon 스타일:**

| 속성 | 값 |
|------|-----|
| Icon | feather / check |
| Size | 14px |
| Color | #FFFFFF (Text Inverse) |
| Visible 조건 | When This Reusable Element's is_checked is yes |

### 5.2 RE_Radio (커스텀 라디오 버튼)

**▸ 구조:**

| Element | Type | 설명 |
|---------|------|------|
| RE_Radio | Reusable Element | 전체 컨테이너 (Row layout) |
| └ radio-outer | Group | 외부 원 (20×20) |
| └ radio-inner | Group | 내부 점 (10×10, 조건부 표시) |
| └ radio-label | Text | 라벨 텍스트 (14px, Text Primary) |

**▸ radio-outer 상태별 스타일:**

| 속성 | Unselected | Selected | Disabled |
|------|-----------|----------|----------|
| Width / Height | 20px / 20px | - | - |
| Background | #FFFFFF | #FFFFFF | #F3F4F6 |
| Border | 2px solid #D1D5DB | 2px solid #FF6D4D | 2px solid #E5E7EB |
| Roundness | 10 (50%) | - | - |

**▸ radio-inner 스타일:**

| 속성 | 값 |
|------|-----|
| Width / Height | 10px / 10px |
| Background | #FF6D4D (Primary) |
| Roundness | 5 (50%) |
| Visible 조건 | When This Reusable Element's is_selected is yes |

**▸ Reusable Element 파라미터:**

| Component | Parameter | Type | 용도 |
|-----------|-----------|------|------|
| RE_Checkbox | label | text | 라벨 텍스트 |
| RE_Checkbox | initial_value | yes/no | 초기 체크 상태 |
| RE_Checkbox | disabled | yes/no | 비활성화 여부 |
| RE_Radio | label | text | 라벨 텍스트 |
| RE_Radio | value | text | 선택 시 반환값 |
| RE_Radio | group_name | text | 라디오 그룹명 (동일 그룹 내 단일 선택) |
| RE_Radio | disabled | yes/no | 비활성화 여부 |

---

## 🔔 Part 6: Alert 스타일 (4개)

### 6.1 Alert 공통 설정

| 속성 | 값 |
|------|-----|
| Font Size | 14px |
| Font Weight | 500 (Medium) |
| Roundness | 8 |
| Padding | 12px 16px |
| Border Width | 1px |

### 6.2 Alert 유형

| 스타일 | Font Color | Background | Border Color |
|--------|-----------|------------|-------------|
| Info | #3B82F6 (Info) | #EFF6FF (Info Light) | #3B82F6 |
| Success ⭐ Default | #22C55E (Success) | #F0FDF4 (Success Light) | #22C55E |
| Warning | #F59E0B (Alert) | #FFFBEB (Warning Light) | #F59E0B |
| Error | #EF4444 (Destructive) | #FEF2F2 (Error Light) | #EF4444 |

---

## 📦 Part 7: Group 스타일 (6개)

| 스타일 | Background | Border | Roundness | 기타 |
|--------|-----------|--------|-----------|------|
| Transparent ⭐ | transparent | None | - | - |
| Card | #FFFFFF (Surface) | None | 12 | Shadow Card, Padding 24px |
| Card Bordered | #FFFFFF (Surface) | 1px #E5E7EB | 12 | Padding 24px |
| Sidebar | #1A2E4D (Navy) | - | - | Width 256px (PC), 숨김 (≤1200) |
| Sidebar Super | #6366F1 (Super) | - | - | Width 256px (PC) |
| Section | #F9FAFB (Background) | - | - | Padding: 48px 24px (PC), 32px 16px (Mobile) |

> Card Shadow: 0 1px 3px #0000001A, 0 1px 2px #0000000F / Hover: 0 4px 6px #0000001A, 0 2px 4px #0000000F

---

## 🔝 Part 8: Floating Group (2개)

| 스타일 | Background | Border | Height | Shadow |
|--------|-----------|--------|--------|--------|
| Header ⭐ | #FFFFFF (Surface) | Bottom: 1px #E5E7EB | 64px | 0 1px 3px #0000000D |
| Toast | #1A2E4D (Navy) | - | auto | 0 4px 12px #00000026 |

> Toast: Roundness 8, Padding 12px 16px, Font Color #FFFFFF

---

## 🔗 Part 9: Link 스타일 (3개)

> 공통: Font Size 14px, Font Weight 500, Text Decoration None (기본)

| 스타일 | Font Color | Hover | 용도 |
|--------|-----------|-------|------|
| Primary ⭐ | #FF6D4D (Primary) | underline | 일반 링크 |
| Secondary | #1A2E4D (Navy) | underline | 내비게이션 링크 |
| Nav | #FFFFFFB3 | Color: #FFFFFF | 사이드바 메뉴 |

---

## 🎯 Part 10: Icon 스타일 (3개)

| 스타일 | Size | Color | 용도 |
|--------|------|-------|------|
| Standard ⭐ | 24px × 24px | Text Secondary (#6B7280) | 일반 아이콘 |
| Primary | 24px × 24px | Primary (#FF6D4D) | 강조 아이콘 |
| Nav | 20px × 20px | #FFFFFFB3 | 사이드바 메뉴 아이콘 |

---

## 📋 Part 11: Repeating Group (2개)

| 스타일 | 설정 | 용도 |
|--------|------|------|
| Transparent ⭐ | Background: transparent | 기본 목록 |
| Dividers | Cell Border Bottom: 1px solid #E5E7EB | 구분선 있는 목록 |

---

## 🎨 Part 12: 기타 스타일 (4개)

### Popup - Standard ⭐ Default

| 속성 | 값 |
|------|-----|
| Background | Surface (#FFFFFF) |
| Roundness | 16 |
| Shadow | 0 20px 25px #0000001A, 0 10px 10px #0000000A |
| Overlay Background | #00000080 (Overlay Dark) |
| Max Width | 560px |
| Padding | 24px |
| 반응형 (≤768) | Width: 90vw, Padding: 16px |

### File Uploader - Standard ⭐ Default

| 속성 | 값 |
|------|-----|
| Font Size | 14px |
| Background | #F9FAFB (Background) |
| Border | 2px dashed #D1D5DB (Border Medium) |
| Roundness | 8 |
| Padding | 32px |
| Hover Border | #FF6D4D (Primary) |
| Hover Background | #FFF0ED (Primary Lightest) |

### Slider Input - Standard ⭐ Default

| 속성 | 값 |
|------|-----|
| Track Height | 6px |
| Track Background | #E5E7EB (Border Light) |
| Progress Color | #FF6D4D (Primary) |
| Handle Size | 20px × 20px |
| Handle Background | #FF6D4D (Primary) |
| Handle Border | 2px solid #FFFFFF |
| Handle Shadow | 0 1px 3px #0000001A |

### Page - Standard ⭐ Default

| 속성 | 값 |
|------|-----|
| Background | Background (#F9FAFB) |

---

## 📊 최종 요약

| 카테고리 | 스타일 수 | Default 표시 |
|----------|-----------|-------------|
| Style Variables | 44개 | Part 1 상세 |
| Text | 17개 | Heading 1, Body 16 |
| Button | 12개 | Primary |
| Input | 6개 | Standard, Multiline, Search Box, Dropdown, Date/Time |
| Checkbox/Radio (RE) | 2개 | RE_Checkbox, RE_Radio |
| Alert | 4개 | Success |
| Group | 6개 | Transparent |
| Floating Group | 2개 | Header |
| Link | 3개 | Primary |
| Icon | 3개 | Standard |
| Repeating Group | 2개 | Transparent |
| Popup | 1개 | Standard |
| File Uploader | 1개 | Standard |
| Slider Input | 1개 | Standard |
| Page | 1개 | Standard |
| **총계** | **61개 Element Styles** | **+ 44개 Style Variables** |

---

## v3.5 → v3.6 변경 사항

| 항목 | v3.5 | v3.6 | 변경 사유 |
|------|------|------|-----------|
| Primary Lightest | #FFF5F2 | #FFF0ED | 프로토타입 CSS (--color-coral-light)와 일치 |
| Input Min Height | 44px | 48px | 터치 영역 최적화, iOS 자동확대 방지 |
| Primary 폰트 | Noto Sans KR | Pretendard | 디자인 가이드 v3.5 기준 |
| Style Variables | 40개 | 44개 | Shadow, Gradient 등 8개 추가 |
| Z-Index 시스템 | - | 5단계 정의 | Bubble.io 레이어 관리 표준화 |
| Transitions | 기본 3개 | 6개로 확장 | Transform, Opacity 추가 |

---

## Bubble.io 구현 권장 순서

| 순서 | 작업 | 수량 | 예상 소요 |
|------|------|------|-----------|
| 1 | Style Variables 생성 (Settings > Style variables) | 44개 | 30분 |
| 2 | Text 스타일 생성 | 17개 | 20분 |
| 3 | Button 스타일 생성 (4개 상태 각각) | 12개 | 40분 |
| 4 | Input 스타일 생성 | 6개 | 15분 |
| 5 | RE_Checkbox, RE_Radio Reusable Element 생성 | 2개 | 30분 |
| 6 | Alert, Group, Floating Group 스타일 | 12개 | 20분 |
| 7 | Link, Icon, Repeating Group 스타일 | 8개 | 15분 |
| 8 | 기타 (Popup, File Uploader, Slider, Page) | 4개 | 10분 |
| **합계** | | **105개 항목** | **약 3시간** |

---

*--- MAMA-ASST Bubble.io Element Styles 설계서 v3.6 끝 ---*
