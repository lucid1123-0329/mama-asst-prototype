# MAMA-ASST
## Matching & Management Assistant
### Bubble.io 데이터타입 설계서 v3.6

작성일: 2025-01-21 | 상태: DB 구축 완료

---

## 📋 변경 이력

| 버전 | 변경 내용 |
|------|-----------|
| v3.5 | 프로토타입 테스트 완료, 38 Data Types 확정 |
| v3.6 | ✅ Bubble.io DB 구축 완료 - 38개 테이블, Privacy Rules 설정 완료 |

---

## ✅ 구축 완료 현황

| 항목 | 목표 | 완료 | 상태 |
|------|------|------|------|
| Option Sets | 13개 | 13개 | ✅ 완료 |
| Data Types | 38개 | 38개 | ✅ 완료 |
| Privacy Rules | 38개 | 38개 | ✅ 완료 |

---

## Data Type 목록 (38개)

| 영역 | Data Types | 개수 |
|------|------------|------|
| 사용자 | User, StudentProfile, InstructorProfile, ParentProfile | 4 |
| 학원 | Academy, Class, ClassStudent | 3 |
| 국어 | KoreanContent, KoreanSession, KoreanSessionResult | 3 |
| 영어 | EnglishWord, EnglishWordStateRecord, EnglishTestSlot, EnglishWeekendClinic, EnglishMonthlyExam | 5 |
| 수학 | MathProblem, MathSession, MathSessionProblem | 3 |
| 성향검사 | TendencySurvey, SurveyResponse, TendencyResult | 3 |
| 학습설정 | StudentLearningConfig, DailyLearningTarget, LearningProgressSnapshot | 3 |
| 상담/평가 | CounselingSession, DailyEvaluation, AIReport, Briefing, Observation | 5 |
| 운영 | Attendance, Homework, HomeworkSubmission, PaymentInvoice, Notification | 5 |
| 시스템 | AIRequestLog, BatchJobLog, AcademyInquiry, Inquiry | 4 |
| **총계** | | **38** |

---

*--- MAMA-ASST Bubble.io 데이터타입 설계서 v3.6 끝 ---*
