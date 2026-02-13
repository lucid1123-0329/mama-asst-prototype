# MAMA-ASST
## Matching & Management Assistant
### ERD v3.5

작성일: 2025-01-16

---

## 📋 변경 이력

| 버전 | 변경 내용 |
|------|-----------|
| v3.2 | 학습 설정 테이블 추가 (StudentLearningConfig, DailyLearningTarget, LearningProgressSnapshot) |
| v3.5 | 프로토타입 테스트 완료, 38개 테이블 확정 |

---

## 범례

- 🟠 주황색: PK (Primary Key)
- 🔵 파란색: FK (Foreign Key)
- 🟣 보라색: JSON 타입
- 🟢 초록색: AI 생성 필드

---

## 테이블 목록 (38개)

| 영역 | 테이블 | 설명 |
|------|--------|------|
| 사용자 | User, StudentProfile, InstructorProfile, ParentProfile | 사용자 기본 정보 |
| 학원 | Academy, Class, ClassStudent | 학원 및 반 관리 |
| 국어 | KoreanContent, KoreanSession, KoreanSessionResult | 국어 학습 데이터 |
| 영어 | EnglishWord, EnglishWordState, EnglishTestSlot, EnglishWeekendClinic | 영어 학습 데이터 |
| 수학 | MathProblem, MathSession, MathSessionProblem | 수학 학습 데이터 |
| 성향검사 | TendencySurvey, SurveyResponse, TendencyResult | 성향검사 데이터 |
| 학습설정 | StudentLearningConfig, DailyLearningTarget, LearningProgressSnapshot | 학습 설정 (v3.2) |
| 상담/평가 | CounselingSession, DailyEvaluation, AIReport | 상담 및 평가 |
| 운영 | Attendance, Homework, PaymentInvoice, Notification | 운영 관리 |
| 시스템 | AIRequestLog, BatchJobLog, AcademyInquiry | 시스템 로그 |

---

*--- MAMA-ASST ERD v3.5 끝 ---*
