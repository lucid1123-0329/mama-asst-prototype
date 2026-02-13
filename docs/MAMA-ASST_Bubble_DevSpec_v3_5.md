# MAMA-ASST
## Matching & Management Assistant
### Bubble.io 개발 상세 명세서 v3.5

**Option Sets + Data Types + Privacy Rules**

작성일: 2025-01-16

---

## 📑 목차

- Part 1. Option Sets 정의서
- Part 2. Data Type 필드 상세서 (38개 테이블)
- Part 3. Privacy Rules 정의서

---

# Part 1. Option Sets 정의서

## 1.1 UserRole (사용자 역할)

| Option | Display | 설명 | 권한 레벨 |
|--------|---------|------|-----------|
| STUDENT | 학생 | 학습 도우미 사용, 성향검사, 플래너 | 1 |
| PARENT | 학부모 | 자녀 현황 조회, 결제, 학원 문의 | 2 |
| INSTRUCTOR | 강사 | 일일평가, 상담, 숙제배정, 브리핑 수신 | 3 |
| ACADEMY_ADMIN | 학원관리자 | 학원 전체 관리, 사용자 생성, 문의 응대 | 4 |
| SUPER_ADMIN | 슈퍼관리자 | 플랫폼 전체 관리, 학원 승인, AI 모니터링 | 5 |

## 1.2 Subject (과목)

| Option | Display | Primary Color | Light Color |
|--------|---------|---------------|-------------|
| KOREAN | 국어 | #4285F4 | #E8F0FE |
| ENGLISH | 영어 | #34A853 | #E6F4EA |
| MATH | 수학 | #FBBC05 | #FEF7E0 |

## 1.3 KoreanStep (국어 학습 단계)

| Option | Display | 순서 | 설명 |
|--------|---------|------|------|
| READING | 1단계: Reading | 1 | 지문 읽기 (7분) |
| BRIDGING | 2단계: Bridging | 2 | O/X 퀴즈 (5문항) |
| STRUCTURING | 3단계: Structuring | 3 | 구조화 카드 배열 |
| VERIFYING | 4단계: Verifying | 4 | 핵심 내용 확인 |
| SUMMARY | 5단계: Summary | 5 | 요약 작성 |

## 1.4 EnglishWordState (영어 단어 상태)

| Option | Display | 설명 |
|--------|---------|------|
| NOT_STARTED | 미시작 | 아직 학습하지 않음 |
| PRELEARNED | 사전학습완료 | 뜻/예문 학습 완료 |
| TESTED | 테스트완료 | 7초 발화 테스트 완료 |
| PASSED | 통과 | 발음 테스트 통과 |
| FAILED | 실패 | 발음 테스트 실패 → 주말클리닉 |
| CLINIC_DONE | 클리닉완료 | 주말 클리닉 복습 완료 |

## 1.5 MathDifficulty (수학 난이도)

| Option | Display | 설명 |
|--------|---------|------|
| JUMP | Jump | 도전 문제 (상위 난이도) |
| ANCHOR | Anchor | 기본 문제 (현재 수준) |

## 1.6 MathHintLevel (수학 힌트 단계)

| Option | Display | 순서 | 설명 |
|--------|---------|------|------|
| HINT_1 | 개념 힌트 | 1 | 관련 개념/공식 안내 |
| HINT_2 | 접근 힌트 | 2 | 풀이 방향 제시 |
| HINT_3 | 풀이 힌트 | 3 | 단계별 풀이 일부 공개 |
| SOLUTION | 정답 풀이 | 4 | 전체 풀이 공개 |

## 1.7 TendencySection (성향검사 섹션)

| Option | Display | 문항 수 | 설명 |
|--------|---------|---------|------|
| LEARNING_STYLE | 학습 스타일 | 30 | 시각/청각/읽기/운동감각 |
| MOTIVATION | 학습 동기 | 30 | 내재적/외재적 동기 |
| TIME_MANAGEMENT | 시간 관리 | 30 | 계획성/실행력 |
| STRESS_COPING | 스트레스 대처 | 30 | 스트레스 반응 패턴 |
| SOCIAL_LEARNING | 사회적 학습 | 30 | 협동/독립 학습 선호 |

## 1.8 AcademyStatus (학원 상태)

| Option | Display | 설명 |
|--------|---------|------|
| PENDING | 승인대기 | 도입 문의 후 검토 중 |
| APPROVED | 승인완료 | 정상 운영 중 |
| SUSPENDED | 일시정지 | 결제 미납 등으로 일시 정지 |
| TERMINATED | 해지 | 서비스 해지됨 |

## 1.9 InquiryStatus (문의 상태)

| Option | Display | 설명 |
|--------|---------|------|
| PENDING | 대기중 | 답변 대기 |
| IN_PROGRESS | 처리중 | 담당자 검토 중 |
| RESOLVED | 해결됨 | 답변 완료 |
| CLOSED | 종료 | 문의 종료 |

## 1.10 PaymentStatus (결제 상태)

| Option | Display | 설명 |
|--------|---------|------|
| PENDING | 미결제 | 청구서 발행됨, 결제 대기 |
| PAID | 결제완료 | 정상 결제됨 |
| OVERDUE | 연체 | 납부 기한 초과 |
| CANCELLED | 취소 | 청구 취소됨 |
| REFUNDED | 환불 | 환불 처리됨 |

## 1.11 AttendanceType (출결 유형)

| Option | Display | 설명 |
|--------|---------|------|
| CHECK_IN | 등원 | 키오스크 등원 처리 |
| CHECK_OUT | 하원 | 키오스크 하원 처리 |
| LATE | 지각 | 정규 시간 이후 등원 |
| ABSENT | 결석 | 출석하지 않음 |
| EXCUSED | 공결 | 사유 있는 결석 |

## 1.12 ContentStatus (콘텐츠 상태)

| Option | Display | 설명 |
|--------|---------|------|
| DRAFT | 초안 | AI 생성 완료, 검토 대기 |
| REVIEW | 검토중 | 슈퍼관리자 검토 중 |
| APPROVED | 승인 | 사용 가능 |
| REJECTED | 반려 | 수정 필요 |
| ARCHIVED | 보관 | 더 이상 사용하지 않음 |

## 1.13 GradeLevel (학년)

| Option | Display | 학교급 |
|--------|---------|--------|
| E1 | 초1 | 초등 |
| E2 | 초2 | 초등 |
| E3 | 초3 | 초등 |
| E4 | 초4 | 초등 |
| E5 | 초5 | 초등 |
| E6 | 초6 | 초등 |
| M1 | 중1 | 중등 |
| M2 | 중2 | 중등 |
| M3 | 중3 | 중등 |
| H1 | 고1 | 고등 |
| H2 | 고2 | 고등 |
| H3 | 고3 | 고등 |

---

# Part 2. Data Type 필드 상세서

> 범례: 🟠 PK | 🔵 FK | 🟣 JSON | 🟢 AI생성 | ⭐ 필수

## 2.1 User (사용자)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 사용자 고유 ID | 자동생성 |
| ⭐ email | text | 이메일 (로그인 ID) | unique |
| ⭐ password_hash | text | 비밀번호 해시 | 암호화 |
| ⭐ role | UserRole | 사용자 역할 | Option Set |
| ⭐ name | text | 이름 | |
| phone | text | 전화번호 | |
| 🔵 academy_id | Academy | 소속 학원 | FK |
| is_first_login | yes/no | 첫 로그인 여부 | 기본값: yes |
| is_active | yes/no | 활성 상태 | 기본값: yes |
| last_login_at | date | 마지막 로그인 | |
| created_at | date | 생성일시 | 자동 |
| updated_at | date | 수정일시 | 자동 |

## 2.2 Academy (학원)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 학원 고유 ID | 자동생성 |
| ⭐ name | text | 학원명 | |
| ⭐ business_number | text | 사업자등록번호 | unique |
| address | text | 주소 | |
| phone | text | 대표 전화 | |
| ⭐ status | AcademyStatus | 학원 상태 | Option Set |
| 🔵 admin_user_id | User | 관리자 계정 | FK |
| contract_start | date | 계약 시작일 | |
| contract_end | date | 계약 종료일 | |
| monthly_fee | number | 월 이용료 | |
| 🟣 settings_json | text | 학원 설정 | JSON |
| created_at | date | 생성일시 | 자동 |

## 2.3 StudentProfile (학생 프로필)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 프로필 고유 ID | 자동생성 |
| 🔵 user_id | User | 사용자 계정 | FK, unique |
| ⭐ grade | GradeLevel | 학년 | Option Set |
| school_name | text | 학교명 | |
| 🔵 parent_id | User | 학부모 계정 | FK |
| total_xp | number | 누적 경험치 | 기본값: 0 |
| current_level | number | 현재 레벨 | 기본값: 1 |
| 🟣 subjects_json | text | 수강 과목 설정 | JSON |
| 🔵 tendency_result_id | TendencyResult | 성향검사 결과 | FK |
| profile_image_url | text | 프로필 이미지 | |
| memo | text | 관리자 메모 | |

## 2.4 InstructorProfile (강사 프로필)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 프로필 고유 ID | 자동생성 |
| 🔵 user_id | User | 사용자 계정 | FK, unique |
| ⭐ subjects | list of Subject | 담당 과목 | Option Set |
| bio | text | 소개 | |
| 🟣 schedule_json | text | 시간표 | JSON |
| is_head_instructor | yes/no | 수석강사 여부 | 기본값: no |

## 2.5 ParentProfile (학부모 프로필)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 프로필 고유 ID | 자동생성 |
| 🔵 user_id | User | 사용자 계정 | FK, unique |
| 🔵 children | list of User | 자녀 목록 | FK list |
| notification_kakao | yes/no | 카카오 알림 수신 | 기본값: yes |
| notification_sms | yes/no | SMS 알림 수신 | 기본값: yes |

## 2.6 Class (반)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 반 고유 ID | 자동생성 |
| 🔵 academy_id | Academy | 소속 학원 | FK |
| ⭐ name | text | 반 이름 | |
| ⭐ subject | Subject | 과목 | Option Set |
| ⭐ grade | GradeLevel | 대상 학년 | Option Set |
| 🔵 instructor_id | User | 담당 강사 | FK |
| max_students | number | 정원 | |
| 🟣 schedule_json | text | 수업 시간표 | JSON |
| is_active | yes/no | 활성 상태 | 기본값: yes |

## 2.7 ClassStudent (반-학생 매핑)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 매핑 고유 ID | 자동생성 |
| 🔵 class_id | Class | 반 | FK |
| 🔵 student_id | User | 학생 | FK |
| enrolled_at | date | 등록일 | |
| is_active | yes/no | 활성 상태 | 기본값: yes |

## 2.8 KoreanContent (국어 콘텐츠)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 콘텐츠 고유 ID | 자동생성 |
| ⭐ title | text | 지문 제목 | |
| ⭐ passage | text | 지문 본문 | |
| ⭐ grade | GradeLevel | 대상 학년 | Option Set |
| category | text | 지문 유형 | 문학/비문학 |
| difficulty | number | 난이도 (1-5) | |
| 🟢🟣 quiz_json | text | O/X 퀴즈 5문항 | AI생성, JSON |
| 🟢🟣 structure_cards_json | text | 구조화 카드 | AI생성, JSON |
| 🟢 summary_sample | text | 모범 요약 | AI생성 |
| reading_time_minutes | number | 권장 읽기 시간 | 기본값: 7 |
| status | ContentStatus | 상태 | Option Set |
| 🔵 created_by | User | 생성자 | FK |
| created_at | date | 생성일시 | |

## 2.9 KoreanSession (국어 학습 세션)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 세션 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| 🔵 content_id | KoreanContent | 학습 콘텐츠 | FK |
| current_step | KoreanStep | 현재 단계 | Option Set |
| started_at | date | 시작 시간 | |
| completed_at | date | 완료 시간 | |
| is_completed | yes/no | 완료 여부 | 기본값: no |
| 🟣 step_times_json | text | 단계별 소요시간 | JSON |
| xp_earned | number | 획득 XP | |

## 2.10 KoreanSessionResult (국어 학습 결과)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 결과 고유 ID | 자동생성 |
| 🔵 session_id | KoreanSession | 세션 | FK |
| quiz_score | number | 퀴즈 점수 (0-5) | |
| 🟣 quiz_answers_json | text | 퀴즈 답변 | JSON |
| structure_score | number | 구조화 점수 | |
| student_summary | text | 학생 작성 요약 | |
| 🟢 summary_feedback | text | 요약 피드백 | AI생성 |
| 🟢 summary_score | number | 요약 점수 (0-100) | AI생성 |
| total_score | number | 총점 | |

## 2.11 EnglishWord (영어 단어)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 단어 고유 ID | 자동생성 |
| ⭐ word | text | 단어 | |
| ⭐ meaning | text | 뜻 | |
| pronunciation | text | 발음 기호 | |
| 🟢 example_sentence | text | 예문 | AI생성 |
| 🟢 example_sentence_kr | text | 예문 번역 | AI생성 |
| audio_url | text | 발음 오디오 | |
| ⭐ grade | GradeLevel | 대상 학년 | Option Set |
| week_number | number | 주차 | |
| day_number | number | 일차 (1-5) | |
| status | ContentStatus | 상태 | Option Set |

## 2.12 EnglishWordState (영어 단어 학습 상태)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 상태 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| 🔵 word_id | EnglishWord | 단어 | FK |
| state | EnglishWordState | 현재 상태 | Option Set |
| prelearn_at | date | 사전학습 시간 | |
| test_at | date | 테스트 시간 | |
| pronunciation_score | number | 발음 점수 (0-100) | |
| attempt_count | number | 시도 횟수 | |
| clinic_completed_at | date | 클리닉 완료 시간 | |

## 2.13 EnglishTestSlot (영어 테스트 슬롯)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 슬롯 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| test_date | date | 테스트 날짜 | |
| slot_number | number | 슬롯 번호 (1-20) | |
| 🔵 word_id | EnglishWord | 할당 단어 | FK |
| is_completed | yes/no | 완료 여부 | 기본값: no |
| result_score | number | 결과 점수 | |

## 2.14 EnglishWeekendClinic (영어 주말 클리닉)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 클리닉 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| clinic_date | date | 클리닉 날짜 | |
| 🔵 words | list of EnglishWord | 복습 단어 목록 | FK list |
| is_completed | yes/no | 완료 여부 | 기본값: no |
| completed_at | date | 완료 시간 | |

## 2.15 EnglishMonthlyExam (영어 월간 고사)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 시험 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| exam_month | date | 시험 월 | |
| 🔵 words | list of EnglishWord | 시험 단어 목록 | FK list |
| score | number | 점수 | |
| total_words | number | 총 단어 수 | |
| correct_words | number | 정답 수 | |
| completed_at | date | 완료 시간 | |

## 2.16 MathProblem (수학 문제)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 문제 고유 ID | 자동생성 |
| ⭐ problem_text | text | 문제 본문 | LaTeX 지원 |
| ⭐ answer | text | 정답 | |
| ⭐ grade | GradeLevel | 대상 학년 | Option Set |
| ⭐ difficulty | MathDifficulty | 난이도 | Option Set |
| chapter | text | 단원 | |
| concept_tags | list of text | 개념 태그 | |
| 🟢🟣 hints_json | text | 힌트 (4단계) | AI생성, JSON |
| 🟢🟣 solution_json | text | 풀이 과정 | AI생성, JSON |
| image_url | text | 문제 이미지 | |
| status | ContentStatus | 상태 | Option Set |

## 2.17 MathSession (수학 학습 세션)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 세션 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| session_date | date | 학습 날짜 | |
| total_problems | number | 총 문제 수 | |
| solved_problems | number | 푼 문제 수 | |
| correct_problems | number | 정답 수 | |
| started_at | date | 시작 시간 | |
| completed_at | date | 완료 시간 | |
| xp_earned | number | 획득 XP | |

## 2.18 MathSessionProblem (수학 세션-문제 매핑)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 매핑 고유 ID | 자동생성 |
| 🔵 session_id | MathSession | 세션 | FK |
| 🔵 problem_id | MathProblem | 문제 | FK |
| order_index | number | 문제 순서 | |
| student_answer | text | 학생 답안 | |
| is_correct | yes/no | 정답 여부 | |
| hint_used_level | MathHintLevel | 사용한 힌트 레벨 | Option Set |
| time_spent_seconds | number | 소요 시간 (초) | |
| solved_at | date | 풀이 시간 | |

## 2.19 TendencySurvey (성향검사 문항)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 문항 고유 ID | 자동생성 |
| ⭐ section | TendencySection | 섹션 | Option Set |
| ⭐ question_number | number | 문항 번호 (1-30) | |
| ⭐ question_text | text | 질문 내용 | |
| 🟣 options_json | text | 선택지 (5점 척도) | JSON |
| is_reverse | yes/no | 역채점 여부 | 기본값: no |

## 2.20 SurveyResponse (성향검사 응답)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 응답 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| 🔵 result_id | TendencyResult | 결과 | FK |
| 🔵 question_id | TendencySurvey | 문항 | FK |
| answer_value | number | 응답 값 (1-5) | |
| answered_at | date | 응답 시간 | |

## 2.21 TendencyResult (성향검사 결과)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 결과 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| survey_version | text | 검사 버전 | |
| started_at | date | 시작 시간 | |
| completed_at | date | 완료 시간 | |
| is_calibrated | yes/no | 후보정 완료 | 기본값: no |
| 🟣 section_scores_json | text | 섹션별 점수 | JSON |
| 🟢🟣 analysis_json | text | AI 종합 분석 | AI생성, JSON |
| 🟢 summary | text | 요약 텍스트 | AI생성 |
| 🟢🟣 recommendations_json | text | 학습 권고사항 | AI생성, JSON |

## 2.22 Observation (관찰 기록)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 관찰 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| 🔵 instructor_id | User | 강사 | FK |
| observation_date | date | 관찰 날짜 | |
| content | text | 관찰 내용 | |
| category | text | 카테고리 | 학습/태도/기타 |
| is_positive | yes/no | 긍정적 관찰 | |

## 2.23 StudentLearningConfig (학습 설정)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 설정 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK, unique |
| korean_daily_passages | number | 국어 일일 지문 수 | 기본값: 1 |
| english_daily_words | number | 영어 일일 단어 수 | 기본값: 20 |
| math_daily_problems | number | 수학 일일 문제 수 | 기본값: 10 |
| math_jump_ratio | number | Jump 문제 비율 (%) | 기본값: 30 |
| ai_recommendation_enabled | yes/no | AI 추천 활성화 | 기본값: yes |
| updated_at | date | 수정일시 | |

## 2.24 DailyLearningTarget (일일 학습 목표)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 목표 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| target_date | date | 목표 날짜 | |
| ⭐ subject | Subject | 과목 | Option Set |
| target_count | number | 목표 수량 | |
| completed_count | number | 완료 수량 | 기본값: 0 |
| is_achieved | yes/no | 달성 여부 | 기본값: no |

## 2.25 LearningProgressSnapshot (학습 진도 스냅샷)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 스냅샷 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| snapshot_date | date | 스냅샷 날짜 | |
| 🟣 korean_progress_json | text | 국어 진도 | JSON |
| 🟣 english_progress_json | text | 영어 진도 | JSON |
| 🟣 math_progress_json | text | 수학 진도 | JSON |
| weekly_xp | number | 주간 XP | |
| monthly_xp | number | 월간 XP | |

## 2.26 CounselingSession (상담 세션)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 상담 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| 🔵 instructor_id | User | 강사 | FK |
| counseling_date | date | 상담 날짜 | |
| counseling_type | text | 상담 유형 | 정기/긴급/학부모요청 |
| content | text | 상담 내용 | |
| 🟢 ai_summary | text | AI 요약 | AI생성 |
| follow_up_needed | yes/no | 후속 조치 필요 | 기본값: no |
| follow_up_note | text | 후속 조치 메모 | |

## 2.27 DailyEvaluation (일일 평가)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 평가 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| 🔵 instructor_id | User | 강사 | FK |
| 🔵 class_id | Class | 수업 | FK |
| evaluation_date | date | 평가 날짜 | |
| attendance_score | number | 출석 점수 (1-5) | |
| participation_score | number | 참여도 (1-5) | |
| understanding_score | number | 이해도 (1-5) | |
| homework_score | number | 숙제 점수 (1-5) | |
| comment | text | 코멘트 | |

## 2.28 AIReport (AI 리포트)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 리포트 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| report_type | text | 리포트 유형 | 주간/월간 |
| report_period_start | date | 기간 시작 | |
| report_period_end | date | 기간 종료 | |
| 🟢🟣 learning_summary_json | text | 학습 요약 | AI생성, JSON |
| 🟢🟣 strength_weakness_json | text | 강점/약점 분석 | AI생성, JSON |
| 🟢🟣 recommendations_json | text | 학습 권고사항 | AI생성, JSON |
| 🟢 parent_message | text | 학부모용 메시지 | AI생성 |
| generated_at | date | 생성 시간 | |

## 2.29 Briefing (강사 브리핑)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 브리핑 고유 ID | 자동생성 |
| 🔵 academy_id | Academy | 학원 | FK |
| 🔵 instructor_id | User | 대상 강사 | FK |
| briefing_date | date | 브리핑 날짜 | |
| 🟢🟣 content_json | text | 브리핑 내용 | AI생성, JSON |
| 🔵 related_students | list of User | 관련 학생 목록 | FK list |
| is_read | yes/no | 읽음 여부 | 기본값: no |
| read_at | date | 읽은 시간 | |
| 🔵 created_by | User | 생성자 | FK, 관리자/시스템 |

## 2.30 Attendance (출결)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 출결 고유 ID | 자동생성 |
| 🔵 student_id | User | 학생 | FK |
| 🔵 academy_id | Academy | 학원 | FK |
| attendance_date | date | 출결 날짜 | |
| check_in_time | date | 등원 시간 | |
| check_out_time | date | 하원 시간 | |
| attendance_type | AttendanceType | 출결 유형 | Option Set |
| note | text | 비고 | |
| is_notified | yes/no | 알림 발송 여부 | 기본값: no |

## 2.31 Homework (숙제)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 숙제 고유 ID | 자동생성 |
| 🔵 class_id | Class | 반 | FK |
| 🔵 assigned_by | User | 배정 강사 | FK |
| title | text | 숙제 제목 | |
| description | text | 숙제 내용 | |
| subject | Subject | 과목 | Option Set |
| due_date | date | 마감일 | |
| 🟣 attachments_json | text | 첨부파일 | JSON |
| created_at | date | 생성일시 | |

## 2.32 HomeworkSubmission (숙제 제출)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 제출 고유 ID | 자동생성 |
| 🔵 homework_id | Homework | 숙제 | FK |
| 🔵 student_id | User | 학생 | FK |
| submitted_at | date | 제출 시간 | |
| content | text | 제출 내용 | |
| 🟣 attachments_json | text | 첨부파일 | JSON |
| score | number | 점수 | |
| feedback | text | 피드백 | |
| is_late | yes/no | 지각 제출 | |

## 2.33 PaymentInvoice (결제 청구서)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 청구서 고유 ID | 자동생성 |
| 🔵 academy_id | Academy | 학원 | FK |
| 🔵 parent_id | User | 학부모 | FK |
| 🔵 student_id | User | 학생 | FK |
| invoice_month | date | 청구 월 | |
| amount | number | 청구 금액 | |
| status | PaymentStatus | 결제 상태 | Option Set |
| due_date | date | 납부 기한 | |
| paid_at | date | 결제 시간 | |
| payment_method | text | 결제 수단 | |
| paymint_invoice_id | text | 결제선생 청구서 ID | 외부 연동 |
| 🟣 items_json | text | 청구 항목 | JSON |

## 2.34 Notification (알림)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 알림 고유 ID | 자동생성 |
| 🔵 user_id | User | 수신자 | FK |
| title | text | 알림 제목 | |
| content | text | 알림 내용 | |
| notification_type | text | 알림 유형 | 출결/결제/숙제/공지 |
| channel | text | 발송 채널 | in-app/kakao/sms |
| is_read | yes/no | 읽음 여부 | 기본값: no |
| sent_at | date | 발송 시간 | |
| read_at | date | 읽은 시간 | |

## 2.35 AcademyInquiry (학원 도입 문의)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 문의 고유 ID | 자동생성 |
| academy_name | text | 학원명 | |
| contact_name | text | 담당자명 | |
| contact_phone | text | 연락처 | |
| contact_email | text | 이메일 | |
| student_count | number | 학생 수 | |
| message | text | 문의 내용 | |
| status | InquiryStatus | 처리 상태 | Option Set |
| 🔵 assigned_to | User | 담당자 | FK, 슈퍼관리자 |
| response | text | 답변 내용 | |
| created_at | date | 문의 시간 | |

## 2.36 Inquiry (학부모 문의)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 문의 고유 ID | 자동생성 |
| 🔵 academy_id | Academy | 학원 | FK |
| 🔵 parent_id | User | 학부모 | FK |
| 🔵 student_id | User | 관련 학생 | FK |
| title | text | 문의 제목 | |
| content | text | 문의 내용 | |
| status | InquiryStatus | 처리 상태 | Option Set |
| response | text | 답변 내용 | |
| 🔵 responded_by | User | 답변자 | FK, 관리자 |
| created_at | date | 문의 시간 | |
| responded_at | date | 답변 시간 | |

## 2.37 AIRequestLog (AI 호출 로그)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 로그 고유 ID | 자동생성 |
| 🔵 academy_id | Academy | 학원 | FK |
| 🔵 user_id | User | 요청자 | FK |
| prompt_id | text | 프롬프트 ID | KOR-01 등 |
| model | text | 사용 모델 | flash/pro |
| input_tokens | number | 입력 토큰 수 | |
| output_tokens | number | 출력 토큰 수 | |
| cost | number | 비용 (원) | |
| response_time_ms | number | 응답 시간 (ms) | |
| is_success | yes/no | 성공 여부 | |
| error_message | text | 에러 메시지 | |
| created_at | date | 요청 시간 | |

## 2.38 BatchJobLog (배치 작업 로그)

| 필드명 | 타입 | 설명 | 비고 |
|--------|------|------|------|
| 🟠 unique_id | text | 로그 고유 ID | 자동생성 |
| job_name | text | 작업명 | |
| job_type | text | 작업 유형 | daily/weekly/monthly |
| started_at | date | 시작 시간 | |
| completed_at | date | 완료 시간 | |
| status | text | 상태 | running/success/failed |
| records_processed | number | 처리 건수 | |
| error_message | text | 에러 메시지 | |
| 🟣 result_json | text | 결과 상세 | JSON |

---

# Part 3. Privacy Rules 정의서

> 💡 Privacy Rules는 데이터 보안의 핵심입니다. 각 역할별로 접근 가능한 데이터를 명확히 정의합니다.

## 3.1 기본 원칙

- 모든 데이터는 기본적으로 비공개 (Private by default)
- 사용자는 자신의 데이터만 조회 가능
- 상위 역할은 하위 역할 데이터 조회 가능 (같은 학원 내)
- 슈퍼관리자는 모든 데이터 접근 가능

## 3.2 역할별 접근 권한 매트릭스

| Data Type | 학생 | 학부모 | 강사 | 관리자 | 슈퍼 |
|-----------|------|--------|------|--------|------|
| User (본인) | R | R | R | CRUD | CRUD |
| User (타인) | - | - | R (담당) | CRUD (학원) | CRUD |
| Academy | - | R | R | RU | CRUD |
| StudentProfile | RU (본인) | R (자녀) | R (담당) | CRUD | CRUD |
| InstructorProfile | - | - | RU (본인) | CRUD | CRUD |
| ParentProfile | - | RU (본인) | - | CRUD | CRUD |
| Class | - | - | R | CRUD | CRUD |
| ClassStudent | - | - | R | CRUD | CRUD |
| KoreanContent | R | - | R | R | CRUD |
| KoreanSession | CRUD (본인) | R (자녀) | R (담당) | R | R |
| EnglishWord | R | - | R | R | CRUD |
| EnglishWordState | CRUD (본인) | R (자녀) | R (담당) | R | R |
| MathProblem | R | - | R | R | CRUD |
| MathSession | CRUD (본인) | R (자녀) | R (담당) | R | R |
| TendencyResult | R (본인) | R (자녀) | R (담당) | R | R |
| CounselingSession | - | R (자녀) | CRUD (담당) | R | R |
| DailyEvaluation | - | R (자녀) | CRUD | R | R |
| Attendance | R (본인) | R (자녀) | CRUD | CRUD | R |
| Homework | R | R (자녀) | CRUD | CRUD | R |
| PaymentInvoice | - | RU (본인) | - | CRUD | R |
| Notification | R (본인) | R (본인) | R (본인) | CRUD | R |
| Inquiry | - | CRUD (본인) | - | CRUD | R |
| AIRequestLog | - | - | - | R | R |
| BatchJobLog | - | - | - | - | R |

> 범례: C=Create, R=Read, U=Update, D=Delete, -=접근불가

## 3.3 Bubble.io Privacy Rules 설정 예시

### User 테이블 Privacy Rules:

- **Find this in searches:** Current User is this User OR Current User's role is SUPER_ADMIN OR (Current User's role is ACADEMY_ADMIN AND This User's academy_id is Current User's academy_id)
- **View all fields:** (Same as above)
- **Modify:** Current User is this User OR Current User's role is SUPER_ADMIN OR (Current User's role is ACADEMY_ADMIN AND This User's academy_id is Current User's academy_id)

### KoreanSession 테이블 Privacy Rules:

- **Find this in searches:** This KoreanSession's student_id is Current User OR Current User's role is SUPER_ADMIN OR Current User's role is ACADEMY_ADMIN OR (Current User's role is INSTRUCTOR AND This KoreanSession's student_id's academy_id is Current User's academy_id) OR (Current User's role is PARENT AND Current User's ParentProfile's children contains This KoreanSession's student_id)
- **View all fields:** (Same as above)
- **Modify:** This KoreanSession's student_id is Current User

---

*--- MAMA-ASST Bubble.io 개발 상세 명세서 v3.5 끝 ---*
