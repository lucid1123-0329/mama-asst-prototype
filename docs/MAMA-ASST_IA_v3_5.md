# MAMA-ASST
## Matching & Management Assistant
### 정보구조도 (IA) v3.5

작성일: 2025-01-16

---

## 📋 변경 이력

| 버전 | 변경 내용 |
|------|-----------|
| v3.3 | 인증 영역 수정 (회원가입 → 학원 도입 문의) |
| v3.4 | 전체 프로토타입 기준 완전 재작성 (50개 → 88개 화면) |
| v3.5 | 프로토타입 테스트 완료, 전체 산출물 버전 통일 |

---

## ⚠️ 서비스 정책

- ✅ **계정 생성 정책:** 학생/학부모/강사 계정은 학원 관리자가 생성합니다.
- ✅ **소통 정책:** 학부모/학생 ↔ 학원 관리자 소통, 강사는 수업에만 집중합니다.
- ✅ **첫 로그인 정책:** 첫 로그인 시 초기 비밀번호(0000)를 반드시 변경해야 합니다.

---

## 1. 전체 메뉴 구조 요약

| 영역 | 1차 메뉴 | 화면 수 |
|------|----------|---------|
| 공통/인증 | 랜딩 / 로그인 / 학원 도입 문의 / 비밀번호 찾기 / 비밀번호 변경 / 이용약관 | 6 |
| 학생 | 대시보드 / 과목(국어·영어·수학) / 성향검사 / 플래너 / 마이페이지 / AI튜터 | 35 |
| 강사 | 대시보드 / 학생관리 / 일일평가 / 상담 / 숙제배정 / 관찰 / 학원브리핑 | 11 |
| 관리자 | 대시보드 / 사용자 / 반 / 콘텐츠 / 결제 / 상담 / 출결 / 문의 / 설정 | 18 |
| 슈퍼관리자 | 대시보드 / 학원 / 사용자 / 콘텐츠 / 결제 / AI / 문의 / 공지 / 로그 / 설정 | 10 |
| 학부모 | 대시보드 / 자녀현황 / 리포트 / 출결 / 결제 / 학원문의 / 설정 | 7 |
| 키오스크 | 등하원 처리 | 1 |
| **총계** | | **88** |

---

## 2. 공통/인증 영역 (6개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| C-01 | 랜딩 페이지 | index.html | 서비스 소개 |
| C-02 | 로그인 | login.html | |
| C-03 | 학원 도입 문의 | inquiry.html | B2B 영업 |
| C-04 | 비밀번호 찾기 | find-password.html | |
| C-05 | 비밀번호 변경 | change-password.html | 초기PW 변경 |
| C-06 | 이용약관 | terms.html | |

## 3. 학생 영역 (35개)

### 3.1 대시보드/공통 (6개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| S-01 | 학생 대시보드 | student-dashboard.html | |
| S-02 | 과목 선택 | subjects.html | |
| S-03 | 플래너 | planner.html | |
| S-04 | 마이페이지 | mypage.html | |
| S-05 | 설정 | settings.html | |
| S-06 | 알림 | notifications.html | |

### 3.2 국어 학습 (7개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| S-K01 | 국어 메인 | subject-korean.html | |
| S-K02 | 1단계: Reading | korean-step1-reading.html | 지문 읽기 |
| S-K03 | 2단계: Bridging | korean-step2-bridging.html | O/X 퀴즈 |
| S-K04 | 3단계: Structuring | korean-step3-structuring.html | 구조화 |
| S-K05 | 4단계: Verifying | korean-step4-verifying.html | 핵심 확인 |
| S-K06 | 5단계: Summary | korean-step5-summary.html | 요약 작성 |
| S-K07 | 학습 결과 | korean-result.html | |

### 3.3 영어 학습 (6개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| S-E01 | 영어 메인 | subject-english.html | |
| S-E02 | 사전 학습 | english-prelearn.html | |
| S-E03 | 7초 발화 테스트 | english-test.html | |
| S-E04 | 일일 결과 | english-daily-result.html | |
| S-E05 | 주말 클리닉 | english-weekend-clinic.html | 오답 복습 |
| S-E06 | 월간 고사 | english-monthly-exam.html | |

### 3.4 수학 학습 (4개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| S-M01 | 수학 메인 | subject-math.html | |
| S-M02 | 문제 풀이 | math-problem.html | Jump/Anchor |
| S-M03 | 일일 결과 | math-daily-result.html | |
| S-M04 | 취약점 복습 | math-weak-review.html | |

### 3.5 성향검사 (5개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| S-T01 | 성향검사 대시보드 | consultation-dashboard.html | |
| S-T02 | 검사 시작 | consultation-start.html | |
| S-T03 | 검사 결과 | consultation-result.html | |
| S-T04 | 리포트 상세 | consultation-report.html | |
| S-T05 | 리포트 조회 | report.html | |

### 3.6 AI 튜터 (1개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| S-AI01 | AI 튜터 채팅 | ai-tutor.html | 신규 |

### 3.7 게스트 체험 (6개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| G-01 | 게스트 정보 입력 | guest-info.html | 신규 |
| G-02 | 레벨 테스트 선택 | guest-level-select.html | 신규 |
| G-03 | 레벨 테스트 | guest-level-test.html | 신규 |
| G-04 | 성향검사 안내 | guest-tendency-intro.html | 신규 |
| G-05 | 성향검사 진행 | guest-tendency-test.html | 신규 |
| G-06 | 체험 완료 | guest-complete.html | 신규 |

## 4. 강사 영역 (11개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| I-01 | 강사 대시보드 | instructor-dashboard.html | |
| I-02 | 학생 목록 | instructor-students.html | |
| I-03 | 학생 상세 | instructor-student-detail.html | |
| I-04 | 일일 평가 | instructor-evaluation.html | |
| I-05 | 상담 이력 | instructor-counseling-history.html | |
| I-06 | 숙제 배정 | instructor-assignment.html | |
| I-07 | 관찰 입력 | instructor-observation.html | |
| I-08 | 출결 관리 | instructor-attendance.html | |
| I-09 | 시간표 | instructor-schedule.html | |
| I-10 | 학원 브리핑 | instructor-briefing.html | 정책변경 |
| I-11 | (레거시) 학부모 소통 | instructor-messages.html | 미사용 |

## 5. 관리자 영역 (18개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| A-01 | 관리자 대시보드 | admin-dashboard.html | |
| A-02 | 학생 관리 | admin-students.html | |
| A-03 | 학부모 관리 | admin-parents.html | |
| A-04 | 강사 관리 | admin-instructors.html | |
| A-05 | 임시계정 관리 | admin-temp-accounts.html | |
| A-06 | 반 관리 | admin-classes.html | |
| A-07 | 콘텐츠 요청 | admin-content-request.html | |
| A-08 | 결제 관리 | admin-payments.html | |
| A-09 | 매출 리포트 | admin-revenue-report.html | |
| A-10 | 상담 관리 | admin-counseling.html | |
| A-11 | 출결 관리 | admin-attendance.html | |
| A-12 | 숙제 관리 | admin-homework.html | |
| A-13 | 일일평가 관리 | admin-daily-evaluations.html | |
| A-14 | 학습현황 | admin-learning-status.html | |
| A-15 | 학생 리포트 | admin-student-report.html | |
| A-16 | XP 리더보드 | admin-xp-leaderboard.html | |
| A-17 | 문의 관리 | admin-inquiries.html | 정책변경 |
| A-18 | 설정 | admin-settings.html | |

## 6. 슈퍼관리자 영역 (10개) - 신규

> 💡 v3.4에서 완전 신규 추가된 영역입니다. 플랫폼 전체를 관리하는 슈퍼관리자 전용 화면입니다.

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| SA-01 | 슈퍼 대시보드 | super-dashboard.html | 신규 |
| SA-02 | 학원 관리 | super-academies.html | 신규 |
| SA-03 | 사용자 관리 | super-users.html | 신규 |
| SA-04 | 콘텐츠 관리 | super-contents.html | 신규 |
| SA-05 | 결제 관리 | super-payments.html | 신규 |
| SA-06 | AI 사용량 | super-ai-usage.html | 신규 |
| SA-07 | 문의 관리 | super-inquiries.html | 신규 |
| SA-08 | 공지사항 관리 | super-notices.html | 신규 |
| SA-09 | 시스템 로그 | super-logs.html | 신규 |
| SA-10 | 시스템 설정 | super-settings.html | 신규 |

## 7. 학부모 영역 (7개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| P-01 | 학부모 대시보드 | parent-dashboard.html | |
| P-02 | 자녀 현황 | parent-child-status.html | |
| P-03 | 리포트 | parent-report.html | |
| P-04 | 출결 확인 | parent-attendance.html | |
| P-05 | 결제 | parent-payment.html | |
| P-06 | 학원 문의 | parent-inquiry.html | 정책변경 |
| P-07 | 설정 | parent-settings.html | |

## 8. 키오스크 (1개)

| ID | 화면명 | HTML 파일 | 비고 |
|----|--------|-----------|------|
| K-01 | 등하원 키오스크 | kiosk.html | |

---

> 범례: ■ 노란색 (FEF9C3): v3.4 신규 추가 | ■ 파란색 (DBEAFE): 정책 변경으로 수정

---

*--- MAMA-ASST 정보구조도 v3.5 끝 ---*
