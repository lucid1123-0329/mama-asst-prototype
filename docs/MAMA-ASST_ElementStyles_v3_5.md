# MAMA-ASST
## Matching & Management Assistant
### Bubble.io Element Styles 설계서 v3.5

작성일: 2025-01-16

> ⚠️ **참고:** v3.6이 최신 버전입니다. 이 문서는 아카이브 용도입니다.

---

## 📋 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v3.5 | 2025-01-16 | 프로토타입 테스트 완료, 61개 Element Styles 확정 |

---

## 📑 목차

| Part | 내용 | 스타일 수 |
|------|------|-----------|
| Part 1 | 기준 정보 (Style Variables, 브레이크포인트) | - |
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
| **총계** | | **61개** |

---

## 📐 Part 1: 기준 정보

### 1.1 색상 표기 규칙

모든 색상은 HEX 코드로 표기합니다. (rgba 사용 금지)

| rgba 표기 | HEX 변환 | 용도 |
|-----------|----------|------|
| rgba(0,0,0,0.05) | #0000000D | 약한 그림자 (5%) |
| rgba(0,0,0,0.1) | #0000001A | 표준 그림자 (10%) |
| rgba(0,0,0,0.15) | #00000026 | 강한 그림자 (15%) |
| rgba(0,0,0,0.5) | #00000080 | 오버레이 (50%) |
| rgba(255,255,255,0.7) | #FFFFFFB3 | Nav 텍스트 (70%) |
| rgba(255,255,255,0.1) | #FFFFFF1A | Nav hover 배경 (10%) |

### 1.2 반응형 브레이크포인트

| 디바이스 | 조건 | Conditional 작성 |
|----------|------|-------------------|
| PC | > 1200px | (기본값 - Conditional 불필요) |
| Tablet | ≤ 1200px | Current page width ≤ 1200 |
| Mobile Landscape | ≤ 1024px | Current page width ≤ 1024 |
| Mobile Portrait | ≤ 768px | Current page width ≤ 768 |
| Small Mobile | ≤ 480px | Current page width ≤ 480 |

### 1.3 Style Variables (40개)

#### Primary 계열

| Variable | HEX | 용도 |
|----------|-----|------|
| Primary | #FF6D4D | CTA 버튼, 강조, 로고 |
| Primary Lightest | #FFF5F2 | Outline 버튼 hover 배경 |
| Primary Light | #FFF0ED | Outline 버튼 pressed 배경 |
| Primary Hover | #E55A3C | Primary 버튼 hover |
| Primary Active | #CC4A2F | Primary 버튼 pressed |

#### Navy 계열

| Variable | HEX | 용도 |
|----------|-----|------|
| Navy | #1A2E4D | 제목, 사이드바, Secondary 버튼 |
| Navy Medium | #2C4872 | Secondary hover |
| Navy Light | #3D5A80 | Secondary pressed |

#### Text 계열

| Variable | HEX | 용도 |
|----------|-----|------|
| Text Primary | #1F2937 | 본문 텍스트 |
| Text Secondary | #6B7280 | 보조 텍스트, 캡션 |
| Text Tertiary | #9CA3AF | Placeholder, Disabled 텍스트 |
| Text Inverse | #FFFFFF | 버튼 텍스트 (어두운 배경) |

#### Border & Background

| Variable | HEX | 용도 |
|----------|-----|------|
| Border Light | #E5E7EB | 기본 테두리 |
| Border Medium | #D1D5DB | 강조 테두리 |
| Background | #F9FAFB | 페이지 배경 |
| Surface | #FFFFFF | 카드, 입력 필드 배경 |
| BG Hover | #F3F4F6 | Ghost 버튼 hover |

#### 과목별 컬러

| Variable | HEX | Light 버전 |
|----------|-----|------------|
| Korean | #4285F4 | Korean Light: #E8F0FE |
| English | #34A853 | English Light: #E6F4EA |
| Math | #FBBC05 | Math Light: #FEF7E0 |
| Planner | #9C27B0 | Planner Light: #F3E5F5 |

#### 슈퍼관리자 & 상태 컬러

| Variable | HEX | Light/Dark 버전 |
|----------|-----|-----------------|
| Super | #6366F1 | Super Dark: #4F46E5, Super Light: #EEF2FF |
| Success | #22C55E | Success Light: #F0FDF4 |
| Destructive | #EF4444 | Error Light: #FEF2F2 |
| Alert | #F59E0B | Warning Light: #FFFBEB |
| Info | #3B82F6 | Info Light: #EFF6FF |

---

## 📝 Part 2: Text 스타일 (17개)

### 2.1 Display (랜딩/마케팅용)

#### Text - Display 1

| 속성 | PC (>1200) | Tablet | M.Land | Mobile | Small |
|------|-----------|--------|--------|--------|-------|
| Font Size | 56px | 48px | 44px | 36px | 32px |
| Font Weight | 700 | - | - | - | - |
| Color | Navy (#1A2E4D) | - | - | - | - |
| Line Height | 1.2 | - | - | - | - |
| Letter Spacing | -0.02em | - | - | - | - |

#### Text - Display 2

| 속성 | PC (>1200) | Tablet | M.Land | Mobile | Small |
|------|-----------|--------|--------|--------|-------|
| Font Size | 48px | 40px | 36px | 32px | 28px |
| Font Weight | 700 | - | - | - | - |
| Color | Navy (#1A2E4D) | - | - | - | - |
| Line Height | 1.2 | - | - | - | - |

### 2.2 Heading (UI용)

#### Text - Heading 1 ⭐ Default

| 속성 | PC (>1200) | ≤1200 | ≤1024 | ≤768 | ≤480 |
|------|-----------|-------|-------|------|------|
| Font Size | 36px | 32px | 30px | 28px | 24px |
| Font Weight | 700 | - | - | - | - |
| Color | Navy (#1A2E4D) | - | - | - | - |
| Line Height | 1.3 | - | - | - | - |

#### Heading 2~6 요약

| 스타일 | Font Size | 반응형 | Font Weight | Color |
|--------|-----------|--------|-------------|-------|
| Heading 2 | 28px | ≤1200→26, ≤1024→24, ≤768→22, ≤480→20 | 700 | Navy |
| Heading 3 | 24px | ≤1200→22, ≤1024→20, ≤768→18 | 600 | Navy |
| Heading 4 | 20px | ≤1024→18px, ≤480→16px | 600 | Text Primary (#1F2937) |
| Heading 5 | 18px | ≤1024→16px | 600 | Text Primary (#1F2937) |
| Heading 6 | 16px | ≤768→14px | 600 | Text Primary (#1F2937) |

### 2.3 Body

| 스타일 | Font Size | 반응형 | Weight | Color | Line Height |
|--------|-----------|--------|--------|-------|-------------|
| Body 18 | 18px | ≤768→16px | 400 | Text Primary | 1.6 |
| Body 16 ⭐ | 16px | ≤480→14px | 400 | Text Primary | 1.6 |
| Body 14 | 14px | (고정) | 400 | Text Primary | 1.6 |
| Body 12 | 12px | (고정) | 400 | Text Secondary | 1.6 |

### 2.4 Utility

| 스타일 | Font Size | Font Weight | Color | 용도 |
|--------|-----------|-------------|-------|------|
| Caption | 12px | 400 | Text Secondary (#6B7280) | 이미지 캡션, 부가 설명 |
| Label | 14px | 500 | Text Primary (#1F2937) | 폼 라벨 |
| Error | 12px | 400 | Destructive (#EF4444) | 에러 메시지 |

---

## 🔘 Part 3: Button 스타일 (12개)

### 3.1 버튼 공통 설정

**Appearance 기본값:**

| 속성 | 값 |
|------|-----|
| Font | App Font (Noto Sans KR) |
| Font Size | 14px |
| Font Weight | 600 |
| Line Spacing | 1.4 |
| Text Alignment | Center |
| Icon Size | 24px |
| Roundness | 8 |

**Layout 기본값:**

| 속성 | 값 |
|------|-----|
| Min Height | 44px |
| Padding Top/Bottom | 12px |
| Padding Left/Right | 24px |

**Shadow 설정 (표준):**

| 상태 | H-offset | V-offset | Blur | Spread | Color |
|------|----------|----------|------|--------|-------|
| Default | 0 | 1 | 3 | 0 | #0000001A |
| Hover | 0 | 4 | 6 | -1 | #0000001A |
| Pressed | 0 | 1 | 2 | 0 | #0000001A |
| Disabled | 0 | 0 | 0 | 0 | #00000000 |

### 3.2 Filled 버튼 (7개)

| 스타일 | Default BG | Hover BG | Pressed BG | Font Color |
|--------|-----------|----------|------------|------------|
| Primary ⭐ | #FF6D4D | #E55A3C | #CC4A2F | #FFFFFF |
| Secondary | #1A2E4D | #2C4872 | #3D5A80 | #FFFFFF |
| Destructive | #EF4444 | #DC2626 | #B91C1C | #FFFFFF |
| Korean | #4285F4 | #3B78E7 | #2D6AD4 | #FFFFFF |
| English | #34A853 | #2E9A4B | #278C42 | #FFFFFF |
| Math | #FBBC05 | #E5AB00 | #CC9900 | #1A2E4D |
| Super | #6366F1 | #4F46E5 | #4338CA | #FFFFFF |

> 모든 Filled 버튼 Disabled 상태: Background #E5E7EB, Font Color #9CA3AF, Shadow 없음

### 3.3 Outline 버튼 (3개)

| 스타일 | Border/Font | Hover BG | Pressed BG | Disabled |
|--------|------------|----------|------------|----------|
| Outline Primary | #FF6D4D | #FFF5F2 | #FFF0ED | Border: #E5E7EB |
| Outline Destructive | #EF4444 | #FEF2F2 | #FEE2E2 | Font: #9CA3AF |
| Outline Secondary | #D1D5DB / #1A2E4D | #F3F4F6 | #E5E7EB | |

### 3.4 기타 버튼 (2개)

| 스타일 | Background | Font Color | 특징 |
|--------|-----------|------------|------|
| Link | None | #FF6D4D | Padding 0, Weight 500, Hover시 underline |
| Ghost | transparent | #6B7280 | Weight 500, Hover시 BG #F3F4F6 |

#### Button - Icon Only (Ghost 변형)

| 속성 | 값 |
|------|-----|
| Width / Height | 40px / 40px |
| Padding | 8px (all) |
| Icon Size | 24px |
| Icon Color | #6B7280 (Hover: #1F2937) |
| Hover Background | #F3F4F6 |

---

## 📝 Part 4: Input 스타일 (6개)

### 4.1 Input 공통 설정

| 속성 | 값 |
|------|-----|
| Font Size | 16px (iOS 자동확대 방지) |
| Font Weight | 400 |
| Font Color | Text Primary (#1F2937) |
| Background | Surface (#FFFFFF) |
| Border | 1px solid Border Light (#E5E7EB) |
| Roundness | 8 |
| Min Height | 44px |
| Padding | 12px 16px |
| Placeholder Color | Text Tertiary (#9CA3AF) |
| Focused | Border: 2px solid Primary (#FF6D4D) |

### 4.2 Input 스타일 목록

| 스타일 | 특이 설정 | 비고 |
|--------|-----------|------|
| Standard ⭐ Default | 공통 설정 그대로 | - |
| Error | Border: 2px #EF4444, BG: #FEF2F2 | 검증 실패 시 |
| Multiline Standard ⭐ | Min Height: 120px | textarea용 |
| Search Box Standard ⭐ | Roundness: 22px (pill), Padding: 12px 16px 12px 44px | 검색창 |
| Dropdown Standard ⭐ | 공통 설정 그대로 | 드롭다운 선택 |
| Date/Time Picker ⭐ | 공통 설정 그대로 | 날짜/시간 선택 |

---

## ✅ Part 5~12: 기타 스타일

> 상세 내용은 v3.6 문서를 참조하세요. v3.5와 동일한 구조에 추가 개선사항이 반영되어 있습니다.

---

## 📊 최종 요약

| 카테고리 | 스타일 수 | Default 표시 |
|----------|-----------|-------------|
| Text | 17개 | Heading 1, Body 16 |
| Button | 12개 | Primary |
| Input | 6개 | Standard, Multiline, Search Box, Dropdown, Date/Time |
| Checkbox/Radio | 2개 (RE) | RE_Checkbox, RE_Radio (커스텀) |
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
| **총계** | **61개** | |

---

*--- MAMA-ASST Bubble.io Element Styles 설계서 v3.5 끝 ---*
