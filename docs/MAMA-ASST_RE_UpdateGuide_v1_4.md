# MAMA-ASST RE_Header / RE_Sidebar — MVP 업데이트 가이드

> **버전**: v1.4 (RE_DevGuide v1.3 보완)  
> **작성일**: 2025-02-25  
> **목적**: MVP에서 subjects 페이지 삭제에 따른 사이드바 메뉴 구조 변경  
> **목업 파일**: `RE_Header_Sidebar_mockup.html`

---

## 📋 변경 이력

| 버전 | 변경 내용 |
|------|-----------|
| v1.3 | RE_Header + RE_Sidebar 상세 개발 가이드 (원본) |
| **v1.4** | ★ MVP 메뉴 구조 변경: subjects 페이지 삭제 → 과목 직접 접근 |

---

## 1. 변경 배경

PageDevPlan v2.2에서 결정:

```
[변경] 과목 선택 별도 페이지(subjects.html) 삭제
      → 대시보드에 과목 카드 + Daily Target 통합
      → 학생은 대시보드에서 직접 국어/영어/수학으로 이동
```

이로 인해 RE_Sidebar의 학생 메뉴 구조가 변경됩니다.

---

## 2. 학생 메뉴 변경 내역

### v1.3 (기존)

```
Group_StudentMenu (6개 NavItem)
├── NavItem_StudentHome     → home     → "홈"        → student-dashboard
├── NavItem_StudentSubjects → school   → "학습 도우미" → subjects ← ❌ 삭제됨
├── NavItem_SubKorean       → auto_stories → "국어"  → subject-korean (들여쓰기)
├── NavItem_SubEnglish      → translate    → "영어"  → subject-english (들여쓰기)
├── NavItem_SubMath         → calculate    → "수학"  → subject-math (들여쓰기)
└── (6번째 미정)
```

### v1.4 (MVP 변경)

```
Group_StudentMenu (8개 NavItem, 2개 섹션 라벨)
│
├── Text_SectionLabel: "학습"
├── NavItem_StudentHome   → home       → "홈"    → student-dashboard
├── NavItem_SubKorean     → menu_book  → "국어"  → subject-korean  (들여쓰기)
├── NavItem_SubEnglish    → translate  → "영어"  → subject-english (들여쓰기)
├── NavItem_SubMath       → calculate  → "수학"  → subject-math   (들여쓰기)
│
├── Text_SectionLabel: "관리"
├── NavItem_Planner       → event_note → "플래너" → planner
└── NavItem_Report        → insights   → "리포트" → report
```

### 변경 요약

| 항목 | v1.3 (기존) | v1.4 (MVP) |
|------|-------------|------------|
| **NavItem_StudentSubjects** | `school` / "학습 도우미" → subjects | ❌ **삭제** (subjects 페이지 없음) |
| **과목 아이콘 변경** | `auto_stories` (국어) | `menu_book` (국어) ★ |
| **섹션 라벨** | 없음 | "학습" / "관리" 2개 추가 |
| **플래너** | 미정 | `event_note` / "플래너" → planner |
| **리포트** | 미정 | `insights` / "리포트" → report |
| **NavItem 총 수** | 6개 | **8개** (+ 섹션 라벨 2개) |

---

## 3. Bubble 수정 방법

### 3.1 NavItem_StudentSubjects 삭제 (또는 숨김)

```
방법 A — 삭제 (권장, MVP):
  RE_Sidebar → Group_StudentMenu 안에서
  NavItem_StudentSubjects 그룹 삭제

방법 B — 숨김 (향후 복원 대비):
  NavItem_StudentSubjects에 Conditional 추가:
  Visible = false (항상 숨김)
```

### 3.2 섹션 라벨 추가

Group_StudentMenu 내부에 Text 요소 2개 추가:

#### Text_SectionLabel_Learning ("학습")

| 속성 | 값 |
|------|-----|
| **Text** | `학습` |
| **Font size** | `11px` |
| **Font weight** | `600` |
| **Font color** | `rgba(255,255,255,0.3)` = `#FFFFFF4D` |
| **Text transform** | Uppercase |
| **Letter spacing** | `0.05em` |
| **Padding** | `12px 16px 6px` |

#### Text_SectionLabel_Manage ("관리")

| 속성 | 값 |
|------|-----|
| **Text** | `관리` |
| (나머지 동일) | |

### 3.3 NavItem_Planner 추가

| 속성 | 값 | 비고 |
|------|-----|------|
| **아이콘** | Material: `event_note` | |
| **텍스트** | `플래너` | |
| **active_page 값** | `planner` | |
| **Go to page** | `planner` | Day 7에서 구현 |
| **구조** | NavItem 공통과 동일 | 들여쓰기 없음 |

**Active Conditional:**

| 조건 | 속성 변경 | 값 |
|------|-----------|-----|
| `active_page is "planner"` | Background | `#FFFFFF1A` |
| (동일) | Icon Color | `#FFFFFF` |
| (동일) | Text Color | `#FFFFFF` |
| (동일) | Font weight | `600` |

### 3.4 NavItem_Report 추가

| 속성 | 값 | 비고 |
|------|-----|------|
| **아이콘** | Material: `insights` | |
| **텍스트** | `리포트` | |
| **active_page 값** | `report` | |
| **Go to page** | `report` | Phase B 이후 |
| **구조** | NavItem 공통과 동일 | 들여쓰기 없음 |

**Active Conditional:** (planner와 동일 패턴)

### 3.5 국어 아이콘 변경

| 항목 | v1.3 | v1.4 |
|------|------|------|
| NavItem_SubKorean 아이콘 | `auto_stories` | `menu_book` ★ |

> `menu_book`이 대시보드 과목 카드와 통일됩니다.

---

## 4. 과목 하위 메뉴 들여쓰기 유지

과목 NavItem은 "학습" 섹션 라벨 아래에서 **들여쓰기**로 하위 항목임을 표시합니다.

```
구현 방법:
  NavItem_SubKorean / SubEnglish / SubMath 그룹의
  Padding left = 32px (기본 16px + 들여쓰기 16px)
```

### 과목 Active 조건 (v1.3과 동일)

| 조건 | NavItem |
|------|---------|
| `active_page is "subject-korean"` OR `active_page is "korean-learning"` 등 | NavItem_SubKorean |
| `active_page is "subject-english"` OR `active_page is "english-prelearn"` 등 | NavItem_SubEnglish |
| `active_page is "subject-math"` OR `active_page is "math-problem"` 등 | NavItem_SubMath |

---

## 5. 관리자 / 강사 메뉴 — 변경 없음

| 역할 | NavItem 수 | 변경 |
|------|-----------|------|
| 관리자 (ACADEMY_ADMIN) | 4개 | ❌ 없음 |
| 강사 (INSTRUCTOR) | 3개 | ❌ 없음 |

```
관리자:
  대시보드 / 학생 관리 / 반 관리 / 학습 현황

강사:
  대시보드 / 학생 관리 / 학생 상세
```

---

## 6. RE_Header — 변경 없음

RE_Header는 v1.3과 동일합니다. 변경 사항 없습니다.

| 항목 | 값 |
|------|-----|
| Properties | page_title (text), notif_count (number) |
| Custom State | sidebar_open (yes/no) |
| GF_Notification | RG + 읽음 처리 |
| GF_UserMenu | 마이페이지, 설정, 도움말, 로그아웃 |

---

## 7. 전체 active_page 값 매핑 (MVP)

> 각 페이지에서 RE_Sidebar의 `active_page` Property에 넣을 값

### 학생 페이지

| 페이지 | active_page 값 | 하이라이트 NavItem |
|--------|----------------|-------------------|
| student-dashboard | `student-dashboard` | 홈 |
| subject-korean | `subject-korean` | 국어 |
| korean-reading | `subject-korean` | 국어 (학습 중에도) |
| korean-bridging | `subject-korean` | 국어 |
| korean-structuring | `subject-korean` | 국어 |
| korean-review | `subject-korean` | 국어 |
| korean-daily-result | `subject-korean` | 국어 |
| subject-english | `subject-english` | 영어 |
| english-prelearn | `subject-english` | 영어 |
| english-test | `subject-english` | 영어 |
| english-daily-result | `subject-english` | 영어 |
| subject-math | `subject-math` | 수학 |
| math-problem | `subject-math` | 수학 |
| math-daily-result | `subject-math` | 수학 |
| planner | `planner` | 플래너 |
| report | `report` | 리포트 |

### 관리자 페이지

| 페이지 | active_page 값 | 하이라이트 NavItem |
|--------|----------------|-------------------|
| admin-dashboard | `admin-dashboard` | 대시보드 |
| admin-students | `admin-students` | 학생 관리 |
| admin-student-detail | `admin-students` | 학생 관리 (상세도 동일) |
| admin-classes | `admin-classes` | 반 관리 |
| admin-learning-status | `admin-learning-status` | 학습 현황 |

### 강사 페이지

| 페이지 | active_page 값 | 하이라이트 NavItem |
|--------|----------------|-------------------|
| instructor-dashboard | `instructor-dashboard` | 대시보드 |
| instructor-students | `instructor-students` | 학생 관리 |
| instructor-student-detail | `instructor-student-detail` | 학생 상세 |

---

## 8. 구현 체크리스트

```
RE_Sidebar 수정:
  □ 1. NavItem_StudentSubjects ("학습 도우미") 삭제/숨김
  □ 2. Text_SectionLabel_Learning ("학습") 추가
  □ 3. Text_SectionLabel_Manage ("관리") 추가
  □ 4. NavItem_SubKorean 아이콘: auto_stories → menu_book
  □ 5. NavItem_Planner 추가 (event_note / "플래너")
  □ 6. NavItem_Report 추가 (insights / "리포트")
  □ 7. NavItem_Planner Active Conditional 추가
  □ 8. NavItem_Report Active Conditional 추가

검증:
  □ 9.  학생 로그인 → 메뉴 8개 표시 (홈/국어/영어/수학/플래너/리포트 + 설정/로그아웃)
  □ 10. 관리자 로그인 → 메뉴 4개 표시 (대시보드/학생관리/반관리/학습현황 + 설정/로그아웃)
  □ 11. 강사 로그인 → 메뉴 3개 표시 (대시보드/학생관리/학생상세 + 설정/로그아웃)
  □ 12. 과목 들여쓰기 (padding-left: 32px) 확인
  □ 13. 학생대시보드에서 active_page = "student-dashboard" → "홈" 하이라이트
  □ 14. 모바일(≤1200px) 햄버거 → 사이드바 오픈/닫기
```

---

## 📌 목업 비교

| 파일 | 내용 |
|------|------|
| `RE_Header_Sidebar_mockup.html` | RE 독립 목업 — 3개 역할 전환, GF_Notification/UserMenu, 모바일 반응형 |
| `S01_student_dashboard_mockup.html` | 학생 대시보드 — 업데이트된 사이드바 + Daily Target + 과목 카드 + XP |

---

*— MAMA-ASST RE_Header / RE_Sidebar MVP 업데이트 가이드 v1.4 끝 —*
