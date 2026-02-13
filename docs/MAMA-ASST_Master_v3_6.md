# MAMA-ASST
## Matching & Management Assistant
### 마스터 기획서 v3.6

**AI 기반 B2B 학원 관리 플랫폼**

작성일: 2025-01-21 | 버전: 3.6 (MVP) | 작성: 명불허전

---

## 📋 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| v3.5 | 2025-01-16 | 전체 산출물 버전 통일, 88개 화면 프로토타입 테스트 완료 |
| v3.6 | 2025-01-21 | ✅ Bubble.io DB 구축 완료 (Sprint 1) - 38개 테이블, Privacy Rules |

---

## 🚀 개발 로드맵 (업데이트)

| 단계 | 기간 | 내용 | 상태 |
|------|------|------|------|
| Phase 1 | 2025.12 | 기획 및 설계 | ✅ 완료 |
| Phase 2 | 2025.12 | 디자인 시스템 구축 | ✅ 완료 |
| Phase 3 | 2025.12-01 | HTML 프로토타입 개발 | ✅ 완료 |
| Phase 4 | 2025.01 | 프로토타입 테스트 | ✅ 완료 |
| Phase 5 | 2025.01-02 | Bubble.io 구현 | 🔄 진행중 |
| | | └ Sprint 1: DB 구축 | ✅ 완료 |
| | | └ Sprint 2-7: 기능 구현 | ⏳ 대기 |
| Phase 6 | 2025.02-03 | AI 연동 및 테스트 | ⏳ 대기 |
| Phase 7 | 2025.03 | 베타 런칭 | ⏳ 대기 |

---

## ✅ Sprint 1 완료 내역

### Option Sets: 13개 완료

UserRole, Subject, GradeLevel, KoreanStep, EnglishWordState, MathDifficulty, MathHintLevel, TendencySection, AcademyStatus, InquiryStatus, PaymentStatus, AttendanceType, ContentStatus

### Data Types: 38개 완료

- **사용자/학원:** User, Academy, StudentProfile, InstructorProfile, ParentProfile, Class, ClassStudent
- **학습:** KoreanContent/Session/Result, EnglishWord/StateRecord/TestSlot/Clinic/Exam, MathProblem/Session/SessionProblem
- **성향/설정:** TendencySurvey/Result, SurveyResponse, StudentLearningConfig, DailyLearningTarget, LearningProgressSnapshot
- **상담/운영:** Observation, CounselingSession, DailyEvaluation, AIReport, Briefing, Attendance, Homework, HomeworkSubmission, PaymentInvoice, Notification
- **시스템:** AcademyInquiry, Inquiry, AIRequestLog, BatchJobLog

### Privacy Rules: 38개 완료 (역할별 접근 제어)

---

*--- MAMA-ASST 마스터 기획서 v3.6 끝 ---*
