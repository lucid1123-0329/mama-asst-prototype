# MAMA-ASST 개발 계획서 (Reusable Elements 이후)

**버전**: v1.0  
**작성일**: 2025-02-14  
**범위**: 인증 → 국어 → 영어 → 수학 → 플래너 → 학원관리자  
**전제**: RE_Header, RE_Sidebar, Popup_Modal, RE_Toast, RE_Checkbox, RE_Radio 완료 상태

---

## 📊 전체 요약

| 항목 | 수량 |
|------|------|
| **총 화면 수** | 48개 |
| **총 스프린트** | 6개 |
| **예상 기간** | 8~10주 |
| **사용 Data Type** | 28개 / 38개 |
| **AI 프롬프트** | 7개 / 12개 |
| **외부 연동** | Google Cloud STT |

### 스프린트 개요

| Sprint | 이름 | 화면 | 기간 | 핵심 |
|--------|------|------|------|------|
| **S2** | 인증 + 학생 공통 | 10개 | 1주 | 로그인, 라우팅, 대시보드 |
| **S3** | 국어 5단계 | 8개 | 2주 | 5단계 학습 플로우 + AI 3개 |
| **S4** | 영어 학습 | 6개 | 2주 | 상태 머신 + 7초 발화 + STT |
| **S5** | 수학 학습 | 4개 | 1.5주 | Jump/Anchor + 힌트 + AI 2개 |
| **S6** | 플래너 | 1개 | 0.5주 | 일일 목표 + 진도 추적 |
| **S7** | 학원관리자 | 19개 | 3주 | CRUD 18개 + 대시보드 통계 |

---

## 🏗️ Sprint 2: 인증 + 학생 공통 (1주)

> **목표**: 사용자가 로그인하여 역할별 대시보드에 도달하고, 학생이 과목을 선택할 수 있는 기본 흐름 완성

### 화면 목록

| ID | 화면명 | 유형 | 난이도 |
|----|--------|------|--------|
| C-01 | 랜딩 페이지 | 마케팅 | ★★ |
| C-02 | 로그인 | 인증 | ★★ |
| C-04 | 비밀번호 찾기 | 인증 | ★ |
| C-05 | 비밀번호 변경 (첫 로그인) | 인증 | ★★ |
| C-06 | 이용약관 | 정적 | ★ |
| S-01 | 학생 대시보드 | 대시보드 | ★★★ |
| S-02 | 과목 선택 | 네비게이션 | ★ |
| S-04 | 마이페이지 | 프로필 | ★★ |
| S-05 | 설정 | 설정 | ★ |
| S-06 | 알림 목록 | 목록 | ★★ |

### 사용 Data Type

| Data Type | 용도 |
|-----------|------|
| **User** | 로그인, 세션, 역할 확인 |
| **Academy** | 소속 학원 정보 |
| **StudentProfile** | 학생 프로필, XP, 레벨 |
| **Notification** | 알림 목록 |
| **StudentLearningConfig** | 대시보드 학습 설정 표시 |
| **DailyLearningTarget** | 대시보드 오늘 학습 현황 |

### 핵심 Workflow

#### W-AUTH-01: 로그인

```
1. 전화번호 + 비밀번호 입력
2. Log the user in
3. is_first_login 확인
   → yes → change-password 페이지 이동
   → no → 역할별 라우팅
4. last_login_at 업데이트
```

#### W-AUTH-02: 역할별 라우팅

```
Current User's role 기준:
  STUDENT       → student-dashboard
  PARENT        → parent-dashboard
  INSTRUCTOR    → instructor-dashboard
  ACADEMY_ADMIN → admin-dashboard
  SUPER_ADMIN   → super-dashboard
```

#### W-AUTH-03: 첫 로그인 비밀번호 변경

```
1. 현재 비밀번호(0000) 확인
2. 새 비밀번호 유효성 검증 (8자 이상, 영문+숫자)
3. 비밀번호 변경
4. is_first_login = no
5. 역할별 라우팅
```

#### W-AUTH-04: 페이지 접근 제어

```
각 페이지 Page Load 시:
1. Current User is logged in 확인
   → no → login 페이지 이동
2. Current User's role 확인
   → 해당 역할 아닌 경우 → 자기 대시보드로 이동
```

### 학생 대시보드 구성

| 섹션 | 데이터 소스 | 설명 |
|------|-------------|------|
| 오늘의 학습 목표 | DailyLearningTarget (today) | 과목별 목표/완료 프로그레스 |
| XP & 레벨 | StudentProfile | 현재 XP, 레벨, 다음 레벨까지 |
| 최근 학습 | KoreanSession + MathSession | 최근 3개 활동 |
| 알림 | Notification (unread, top 3) | 미읽음 알림 미리보기 |

### 완료 기준

- [ ] 전화번호로 로그인 성공/실패 처리
- [ ] 첫 로그인 시 비밀번호 변경 강제
- [ ] 역할별 라우팅 정상 동작 (5개 역할)
- [ ] 학생 대시보드에 실시간 학습 현황 표시
- [ ] 비인증 사용자 접근 차단
- [ ] RE_Header + RE_Sidebar 정상 연동

---

## 📘 Sprint 3: 국어 5단계 학습 (2주)

> **목표**: 국어 5단계(Reading → Bridging → Structuring → Verifying → Summary) 전체 플로우와 AI 피드백 완성

### 화면 목록

| ID | 화면명 | 학습 단계 | 난이도 |
|----|--------|-----------|--------|
| S-K01 | 국어 메인 | 진입 | ★★ |
| S-K02 | 1단계: Reading | 지문 읽기 (7분) | ★★ |
| S-K03 | 2단계: Bridging | O/X 퀴즈 5문항 | ★★★ |
| S-K04 | 3단계: Structuring | 구조화 카드 배열 | ★★★★ |
| S-K05 | 4단계: Verifying | 핵심 내용 확인 | ★★ |
| S-K06 | 5단계: Summary | 요약 작성 | ★★★ |
| S-K07 | 학습 결과 | 종합 결과 | ★★ |
| (S-01) | 대시보드 연동 | 국어 진도 반영 | ★ |

### 사용 Data Type

| Data Type | 용도 |
|-----------|------|
| **KoreanContent** | 지문, 퀴즈(JSON), 구조화 카드(JSON), 모범 요약 |
| **KoreanSession** | 세션 생성, 단계 진행, 시간 기록 |
| **KoreanSessionResult** | 퀴즈 점수, 구조화 점수, 요약 점수/피드백 |
| **StudentLearningConfig** | 일일 지문 수 설정 |
| **DailyLearningTarget** | 국어 목표 달성 업데이트 |
| **AIRequestLog** | AI 호출 기록 |

### AI 프롬프트 연동

| ID | 용도 | 모델 | 호출 시점 |
|----|------|------|-----------|
| **KOR-01** | O/X 퀴즈 5문항 생성 | Flash | 콘텐츠 등록 시 (관리자 or 배치) |
| **KOR-02** | 구조화 카드 생성 | Flash | 콘텐츠 등록 시 |
| **KOR-03** | 요약 피드백 생성 | Flash | 5단계 요약 제출 시 (실시간) |
| **REC-01** | 지문 추천 | Flash | 국어 메인 진입 시 |

### 핵심 Workflow

#### W-KOR-01: 학습 세션 시작

```
1. 국어 메인에서 "학습 시작" 클릭
2. AI 추천 또는 지문 목록에서 선택
3. KoreanSession 생성
   - student_id: Current User
   - content_id: 선택된 지문
   - current_step: READING
   - started_at: Current date/time
4. S-K02 (Reading) 페이지로 이동
```

#### W-KOR-02: 단계 전환

```
각 단계 완료 시:
1. step_times_json에 현재 단계 소요시간 기록
2. current_step을 다음 단계로 업데이트
3. 다음 단계 페이지로 이동

단계 순서:
READING → BRIDGING → STRUCTURING → VERIFYING → SUMMARY → 결과
```

#### W-KOR-03: Reading (7분 타이머)

```
1. 지문 표시 (KoreanContent's passage)
2. 7분 카운트다운 타이머 시작
3. 타이머 종료 또는 "다음" 클릭 시
   → 소요시간 기록
   → Bridging 단계로 전환
```

#### W-KOR-04: Bridging (O/X 퀴즈)

```
1. quiz_json에서 5문항 파싱 → 순차 표시
2. 각 문항: O/X 선택 → 즉시 정답 확인 (피드백 표시)
3. 전체 완료 시:
   - quiz_score 계산 (0~5)
   - quiz_answers_json 저장
   → Structuring 단계로 전환
```

#### W-KOR-05: Structuring (카드 배열)

```
1. structure_cards_json에서 카드 파싱 → 랜덤 배열
2. 드래그 앤 드롭으로 올바른 순서 배열
   (Bubble 드래그 미지원 → 클릭 기반 순서 선택 방식)
3. 제출 시:
   - 정답 순서와 비교
   - structure_score 계산
   → Verifying 단계로 전환
```

#### W-KOR-06: Summary (요약 작성 + AI 피드백)

```
1. 학생이 요약 텍스트 작성
2. "제출" 클릭 시:
   - student_summary 저장
   - KOR-03 프롬프트 호출 (Gemini Flash)
     Input: 원문 지문 + 학생 요약
     Output: 피드백 텍스트 + 점수 (0~100)
   - summary_feedback, summary_score 저장
   - AIRequestLog 기록
3. 피드백 표시 후 → 결과 페이지
```

#### W-KOR-07: 결과 + XP 부여

```
1. total_score 계산
   = quiz_score × 가중치 + structure_score × 가중치 + summary_score × 가중치
2. xp_earned 계산 (점수 기반)
3. StudentProfile's total_xp 업데이트
4. DailyLearningTarget 완료 수 +1
5. is_completed = yes, completed_at 기록
```

### Structuring 단계 구현 방안

> Bubble은 네이티브 드래그 앤 드롭을 지원하지 않으므로 대안 필요

**방안: 클릭 순서 선택**
1. 카드들을 Repeating Group으로 셔플 표시
2. 카드 클릭 → "선택된 순서" 영역에 추가 (번호 부여)
3. 실수 시 클릭하여 제거 가능
4. 모든 카드 선택 완료 → 제출

### 1주차 / 2주차 분배

| 주차 | 작업 | 설명 |
|------|------|------|
| **1주차** | 국어 메인 + Reading + Bridging | 지문 목록, 타이머, 퀴즈 |
| **1주차** | AI 파이프라인 기반 구축 | Gemini API 연동, AIRequestLog |
| **2주차** | Structuring + Verifying + Summary | 카드 배열, 확인, 요약 |
| **2주차** | 결과 + XP + 대시보드 연동 | 점수 계산, XP 부여 |

### 완료 기준

- [ ] 지문 목록 표시 + AI 추천 동작
- [ ] 5단계 순차 진행 (이전 단계 미완료 시 진입 불가)
- [ ] Reading 7분 타이머 정상 동작
- [ ] O/X 퀴즈 5문항 정답 확인 + 점수 기록
- [ ] Structuring 카드 순서 배열 + 채점
- [ ] Summary AI 피드백 실시간 수신 표시
- [ ] 결과 화면 총점 + XP 반영
- [ ] AIRequestLog 기록 확인

---

## 📗 Sprint 4: 영어 학습 (2주)

> **목표**: 단어 상태 머신(NOT_STARTED → PASSED/FAILED), 7초 발화 테스트(Google Cloud STT), 주말 클리닉, 월간 고사 완성

### 화면 목록

| ID | 화면명 | 기능 | 난이도 |
|----|--------|------|--------|
| S-E01 | 영어 메인 | 오늘의 단어 + 진도 | ★★ |
| S-E02 | 사전 학습 | 뜻/예문 학습 | ★★ |
| S-E03 | 7초 발화 테스트 | 마이크 + STT | ★★★★★ |
| S-E04 | 일일 결과 | 통과/실패 현황 | ★★ |
| S-E05 | 주말 클리닉 | 실패 단어 복습 | ★★ |
| S-E06 | 월간 고사 | 종합 시험 | ★★★ |

### 사용 Data Type

| Data Type | 용도 |
|-----------|------|
| **EnglishWord** | 단어, 뜻, 발음, 예문 |
| **EnglishWordStateRecord** | 학생별 단어 상태 전이 |
| **EnglishTestSlot** | 일일 20개 슬롯 배정 |
| **EnglishWeekendClinic** | 주말 복습 단어 목록 |
| **EnglishMonthlyExam** | 월간 고사 결과 |
| **AIRequestLog** | AI 호출 기록 |

### AI / 외부 연동

| 연동 | 용도 | 기술 |
|------|------|------|
| **ENG-01** (Flash) | 예문 마커 처리 | 콘텐츠 등록 시 |
| **Google Cloud STT** | 7초 발화 음성 인식 | 실시간 — API 호출 |

### 영어 단어 상태 머신

```
NOT_STARTED → PRELEARNED → TESTED → PASSED ✅
                                  → FAILED → CLINIC_DONE ✅
```

| 상태 전이 | 트리거 | 조건 |
|-----------|--------|------|
| NOT_STARTED → PRELEARNED | 사전 학습 완료 버튼 | 뜻/예문 확인 완료 |
| PRELEARNED → TESTED | 7초 테스트 완료 | 테스트 응시 |
| TESTED → PASSED | 발음 점수 확인 | score ≥ 통과 기준 |
| TESTED → FAILED | 발음 점수 확인 | score < 통과 기준 |
| FAILED → CLINIC_DONE | 주말 클리닉 완료 | 복습 완료 |

### 핵심 Workflow

#### W-ENG-01: 일일 슬롯 생성 (배치 or 첫 접근)

```
매일 오전 또는 영어 메인 첫 접근 시:
1. StudentLearningConfig에서 english_daily_words 확인 (기본 20)
2. 해당 주차/일차의 EnglishWord 검색
3. EnglishTestSlot 20개 생성
   - slot_number: 1~20
   - word_id: 해당 단어
4. 해당 단어들의 EnglishWordStateRecord 생성 (없으면)
   - state: NOT_STARTED
```

#### W-ENG-02: 사전 학습

```
1. 오늘 슬롯의 단어 순차 표시 (뜻, 발음, 예문)
2. TTS로 발음 재생 (Bubble HTML element + Web Audio)
3. "학습 완료" 시:
   - state → PRELEARNED
   - prelearn_at 기록
4. 모든 단어 사전 학습 완료 → 테스트 진입 가능
```

#### W-ENG-03: 7초 발화 테스트 ⭐ 핵심

```
1. 단어 표시 → "시작" 클릭
2. 7초 카운트다운 + 마이크 활성화
3. Google Cloud Speech-to-Text API 호출
   - Audio encoding: LINEAR16 또는 WEBM_OPUS
   - Language: en-US
   - Single utterance: true
4. 인식 결과 텍스트와 원본 단어 비교
   - 일치 → PASSED, pronunciation_score 계산
   - 불일치 → FAILED
5. EnglishWordStateRecord 업데이트
6. attempt_count +1
7. 다음 슬롯으로 이동
```

#### Google Cloud STT 구현 방안

```
[Bubble 측]
1. HTML element에 JavaScript로 마이크 접근 (getUserMedia)
2. MediaRecorder로 음성 녹음 (7초 제한)
3. 녹음 완료 → Base64 인코딩
4. Bubble API Connector로 Google Cloud STT 호출

[API 설정]
- Endpoint: https://speech.googleapis.com/v1/speech:recognize
- Method: POST
- Authentication: API Key (Bubble에 저장)
- Body:
  {
    "config": {
      "encoding": "WEBM_OPUS",
      "sampleRateHertz": 48000,
      "languageCode": "en-US"
    },
    "audio": {
      "content": "<base64_audio>"
    }
  }
```

#### W-ENG-04: 주말 클리닉 자동 생성

```
금요일 학습 완료 시 또는 토요일 접근 시:
1. 이번 주 FAILED 상태인 EnglishWordStateRecord 검색
2. EnglishWeekendClinic 생성
   - words: FAILED 단어 목록
3. 클리닉에서 복습 완료 시:
   - 각 단어 state → CLINIC_DONE
   - is_completed = yes
```

### 1주차 / 2주차 분배

| 주차 | 작업 | 설명 |
|------|------|------|
| **1주차** | 영어 메인 + 사전 학습 | 단어 목록, 슬롯 생성, 사전 학습 UI |
| **1주차** | Google Cloud STT 연동 | API Connector 설정, 마이크 JavaScript |
| **2주차** | 7초 발화 테스트 완성 | 타이머, 녹음, 판정, 결과 표시 |
| **2주차** | 일일 결과 + 주말 클리닉 + 월간 고사 | 상태 집계, 복습, 종합 시험 |

### 완료 기준

- [ ] 일일 단어 20개 슬롯 자동 생성
- [ ] 사전 학습 → 뜻/예문 표시 + TTS 재생
- [ ] 7초 타이머 + 마이크 녹음 정상 동작
- [ ] Google Cloud STT 호출 → 결과 수신
- [ ] 발음 판정 (통과/실패) + 점수 기록
- [ ] 상태 전이 정확 (6개 상태)
- [ ] 주말 클리닉 FAILED 단어 자동 수집
- [ ] 월간 고사 점수 기록

---

## 📙 Sprint 5: 수학 학습 (1.5주)

> **목표**: Jump/Anchor 난이도 시스템, 4단계 힌트, 단계별 풀이 AI 생성 완성

### 화면 목록

| ID | 화면명 | 기능 | 난이도 |
|----|--------|------|--------|
| S-M01 | 수학 메인 | 오늘의 문제 + 진도 | ★★ |
| S-M02 | 문제 풀이 | Jump/Anchor + 힌트 | ★★★★ |
| S-M03 | 일일 결과 | 정답률 + 분석 | ★★ |
| S-M04 | 취약점 복습 | 오답 문제 재풀이 | ★★ |

### 사용 Data Type

| Data Type | 용도 |
|-----------|------|
| **MathProblem** | 문제, 정답, 힌트(JSON), 풀이(JSON) |
| **MathSession** | 세션, 문제 수, 정답 수 |
| **MathSessionProblem** | 세션-문제 매핑, 답안, 힌트 사용 |
| **StudentLearningConfig** | 일일 문제 수, Jump 비율 |
| **AIRequestLog** | AI 호출 기록 |

### AI 프롬프트 연동

| ID | 용도 | 모델 | 호출 시점 |
|----|------|------|-----------|
| **MATH-01** | 단계별 풀이 생성 | Flash | 콘텐츠 등록 시 |
| **MATH-02** | 힌트 생성 | Flash | 콘텐츠 등록 시 |
| **REC-02** | 문제 추천 | Flash | 수학 메인 진입 시 |

### Jump / Anchor 시스템

```
학생별 설정 (StudentLearningConfig):
- math_daily_problems: 10 (기본)
- math_jump_ratio: 30% (기본)

일일 문제 구성 예시 (10문제):
- Jump (도전) 3문제: 현재 학년보다 한 단계 높은 난이도
- Anchor (기본) 7문제: 현재 학년 수준 난이도
```

### 4단계 힌트 시스템

| 레벨 | 이름 | 내용 | XP 감소 |
|------|------|------|---------|
| HINT_1 | 개념 힌트 | 관련 공식/개념 안내 | -10% |
| HINT_2 | 접근 힌트 | 풀이 방향 제시 | -20% |
| HINT_3 | 풀이 힌트 | 풀이 일부 공개 | -40% |
| SOLUTION | 정답 풀이 | 전체 풀이 공개 | -100% |

### 핵심 Workflow

#### W-MATH-01: 일일 세션 생성

```
1. MathSession 생성
2. StudentLearningConfig에서 문제 수, Jump 비율 확인
3. REC-02로 AI 추천 또는 단원/학년 기반 문제 선택
   - Jump 문제: difficulty = JUMP, 비율만큼
   - Anchor 문제: difficulty = ANCHOR, 나머지
4. MathSessionProblem 10개 생성 (order_index: 1~10)
```

#### W-MATH-02: 문제 풀이

```
1. 문제 표시 (LaTeX 렌더링: Bubble HTML element + KaTeX)
2. Jump/Anchor 배지 표시
3. 학생 답안 입력
4. "제출" 시:
   - 정답 비교 → is_correct 기록
   - time_spent_seconds 기록
   - 정답 → 다음 문제
   - 오답 → 오답 표시 + 힌트 버튼 활성화
```

#### W-MATH-03: 힌트 요청

```
1. "힌트" 클릭 → 현재 hint_used_level 확인
2. 다음 레벨 힌트 표시 (hints_json에서 파싱)
   HINT_1 → HINT_2 → HINT_3 → SOLUTION
3. hint_used_level 업데이트
4. SOLUTION 사용 시 → 해당 문제 XP 0
```

#### W-MATH-04: LaTeX 렌더링

```
Bubble HTML element에 삽입:
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex/dist/contrib/auto-render.min.js"></script>

→ MathProblem의 problem_text 내 LaTeX 수식 자동 렌더링
```

### 완료 기준

- [ ] 일일 문제 Jump/Anchor 비율에 맞게 자동 생성
- [ ] LaTeX 수식 정상 렌더링
- [ ] 4단계 힌트 순차 공개 + XP 감소 반영
- [ ] 정답/오답 즉시 피드백
- [ ] 일일 결과 정답률 + 소요 시간 표시
- [ ] 취약점 복습: 오답 문제만 필터링 재풀이

---

## 📓 Sprint 6: 플래너 (0.5주)

> **목표**: 학생이 일일/주간 학습 목표를 확인하고 진도를 추적하는 플래너 완성

### 화면 목록

| ID | 화면명 | 기능 | 난이도 |
|----|--------|------|--------|
| S-03 | 플래너 | 캘린더 + 일일 목표 | ★★★ |

### 사용 Data Type

| Data Type | 용도 |
|-----------|------|
| **DailyLearningTarget** | 일일 과목별 목표/완료 |
| **StudentLearningConfig** | 학습 설정 (일일 목표 수) |
| **LearningProgressSnapshot** | 주간/월간 진도 |
| **Homework** | 숙제 마감일 표시 |
| **HomeworkSubmission** | 숙제 제출 상태 |

### 플래너 UI 구성

| 섹션 | 내용 |
|------|------|
| **월간 캘린더** | 날짜별 학습 완료 여부 (도트 표시: 국어🔵 영어🟢 수학🟡) |
| **오늘의 목표** | 과목별 프로그레스 바 (완료/목표) |
| **주간 요약** | 이번 주 XP, 달성률 |
| **숙제 현황** | 미제출 숙제 목록 + 마감일 |

### 핵심 Workflow

#### W-PLN-01: 일일 목표 자동 생성

```
매일 첫 접근 시 (오늘 DailyLearningTarget 없으면):
1. StudentLearningConfig에서 과목별 목표 수 가져오기
2. DailyLearningTarget 3개 생성 (국어/영어/수학)
   - target_count: 설정값
   - completed_count: 0
```

#### W-PLN-02: 캘린더 날짜 선택

```
1. 날짜 클릭 → 해당 날짜의 DailyLearningTarget 검색
2. 과목별 달성 현황 표시
3. 해당 날짜의 학습 세션 목록 표시
```

### 완료 기준

- [ ] 월간 캘린더 날짜별 학습 도트 표시
- [ ] 오늘의 목표 실시간 프로그레스 업데이트
- [ ] 주간 XP 합산 표시
- [ ] 숙제 마감일 + 제출 상태 표시

---

## 🔧 Sprint 7: 학원관리자 (3주)

> **목표**: 학원 관리자가 사용자/반/콘텐츠/결제/출결/문의를 관리하는 전체 CRUD 완성

### 화면 목록

| ID | 화면명 | 유형 | 난이도 |
|----|--------|------|--------|
| A-01 | 관리자 대시보드 | 통계 | ★★★ |
| A-02 | 학생 관리 | CRUD 목록 | ★★★ |
| A-03 | 학부모 관리 | CRUD 목록 | ★★ |
| A-04 | 강사 관리 | CRUD 목록 | ★★ |
| A-05 | 임시계정 관리 | 목록 | ★★ |
| A-06 | 반 관리 | CRUD + 학생 배정 | ★★★ |
| A-07 | 콘텐츠 요청 | 요청 폼 | ★★ |
| A-08 | 결제 관리 | 청구서 목록 | ★★★ |
| A-09 | 매출 리포트 | 차트 + 통계 | ★★★ |
| A-10 | 상담 관리 | 목록 + 상세 | ★★ |
| A-11 | 출결 관리 | 캘린더 + 목록 | ★★★ |
| A-12 | 숙제 관리 | CRUD | ★★ |
| A-13 | 일일평가 관리 | 목록 + 입력 | ★★ |
| A-14 | 학습현황 | 학생별 진도 | ★★★ |
| A-15 | 학생 리포트 | AI 리포트 | ★★ |
| A-16 | XP 리더보드 | 랭킹 | ★ |
| A-17 | 문의 관리 | 학부모 문의 응대 | ★★ |
| A-18 | 설정 | 학원 설정 | ★★ |
| (A-xx) | 사용자 생성 모달 | Popup_Modal 활용 | ★★★ |

### 사용 Data Type (거의 전체)

| 카테고리 | Data Type |
|----------|-----------|
| 사용자 | User, StudentProfile, InstructorProfile, ParentProfile |
| 학원 | Academy, Class, ClassStudent |
| 학습 | KoreanSession, MathSession, EnglishWordStateRecord |
| 상담/평가 | CounselingSession, DailyEvaluation, AIReport, Observation |
| 운영 | Attendance, Homework, HomeworkSubmission, PaymentInvoice, Notification |
| 문의 | Inquiry |
| 설정 | StudentLearningConfig |

### CRUD 패턴 (공통 적용)

모든 관리 화면은 동일한 패턴을 따릅니다:

```
[목록 화면]
1. 검색 바 (Search Box Standard 스타일)
2. 필터 (드롭다운: 상태, 역할, 반 등)
3. Repeating Group (Dividers 스타일) - 데이터 목록
4. 각 행: 주요 정보 + 액션 버튼 (수정/삭제)
5. 페이지네이션 (10~20개씩)

[생성/수정]
- Popup_Modal 활용
- 폼 입력 → 유효성 검증 → Create/Modify thing
- 성공 → Toast 알림 + 목록 새로고침

[삭제]
- Popup_Modal (확인/취소)
- 실제 삭제 대신 is_active = no (소프트 삭제)
```

### 핵심 Workflow

#### W-ADM-01: 학생 계정 생성 (B2B 핵심)

```
1. "학생 추가" 클릭 → 모달 표시
2. 입력: 이름, 전화번호, 학년, 수강 과목, 학부모 연결
3. "생성" 클릭:
   a. User 생성
      - phone: 입력값 (로그인 ID)
      - password_hash: 0000 (초기 비밀번호)
      - role: STUDENT
      - academy_id: Current User's academy_id
      - is_first_login: yes
   b. StudentProfile 생성
      - user_id: 위 User
      - grade: 선택 학년
      - parent_id: 연결된 학부모
   c. StudentLearningConfig 생성 (기본값)
   d. ClassStudent 생성 (선택 반에 배정)
4. Toast: "학생 계정이 생성되었습니다"
```

#### W-ADM-02: 반 관리 + 학생 배정

```
1. 반 생성: 이름, 과목, 학년, 담당 강사, 정원
2. 학생 배정:
   - 반 상세에서 "학생 추가" 
   - 학원 내 학생 목록에서 선택
   - ClassStudent 생성 (class_id + student_id)
3. 학생 제거:
   - ClassStudent의 is_active = no
```

#### W-ADM-03: 관리자 대시보드 통계

```
[실시간 통계 카드]
- 총 학생 수: Search for Users (role=STUDENT, academy_id=mine):count
- 오늘 출석: Search for Attendances (today, CHECK_IN):count
- 미결제: Search for PaymentInvoices (OVERDUE):count
- 미답변 문의: Search for Inquiries (PENDING):count

[차트]
- 주간 출석률: Attendance 집계 → 차트
- 과목별 학습 현황: Session 집계
```

#### W-ADM-04: 문의 관리 (학부모 ↔ 관리자)

```
1. 문의 목록: Inquiry (academy_id = mine) 표시
2. 상태 필터: PENDING / IN_PROGRESS / RESOLVED / CLOSED
3. 문의 클릭 → 상세 표시
4. 답변 작성 + 상태 변경
   - response 입력
   - responded_by: Current User
   - status: RESOLVED
   - responded_at: now
5. (선택) 알림 발송: Notification 생성 → 학부모에게
```

### 3주 일정 분배

| 주차 | 작업 | 화면 |
|------|------|------|
| **1주차** | 대시보드 + 사용자 관리 | A-01, A-02, A-03, A-04, A-05 |
| **1주차** | 계정 생성 모달 (B2B 핵심) | 생성/수정 모달 |
| **2주차** | 반 관리 + 출결 + 결제 | A-06, A-08, A-09, A-11 |
| **2주차** | 숙제 + 일일평가 | A-12, A-13 |
| **3주차** | 학습현황 + 리포트 + 문의 | A-14, A-15, A-16, A-17 |
| **3주차** | 콘텐츠 요청 + 상담 + 설정 | A-07, A-10, A-18 |

### 완료 기준

- [ ] 학생/학부모/강사 계정 생성 (B2B 정책: 관리자가 생성)
- [ ] 초기 비밀번호 0000, 전화번호 로그인
- [ ] 반 생성 + 학생 배정/해제
- [ ] 대시보드 실시간 통계 표시
- [ ] 출결 캘린더 + 출결 유형별 표시
- [ ] 결제 청구서 CRUD + 상태 관리
- [ ] 학부모 문의 응대 (B2B 정책: 학부모↔관리자)
- [ ] 학습현황 학생별 진도 조회
- [ ] 전체 CRUD soft delete 방식 적용

---

## 🔗 스프린트간 의존성

```
S2 (인증/공통)
 ├── S3 (국어) ─────────┐
 ├── S4 (영어) ─────────┤
 ├── S5 (수학) ─────────┤── S6 (플래너: 3과목 데이터 필요)
 └── S7 (관리자: 독립 진행 가능, 단 계정 생성은 S2 이후)
```

- **S2 완료 필수**: 모든 후속 스프린트의 전제 (로그인, 라우팅, 대시보드)
- **S3/S4/S5 병렬 가능**: 과목 간 의존성 없음 (단, AI 파이프라인은 S3에서 구축)
- **S6은 S3~S5 이후**: 플래너가 3과목 학습 데이터를 집계하므로
- **S7은 S2 이후 언제든**: 관리자 기능은 학생 학습과 독립적

---

## 📋 공통 기술 사항

### Gemini API 연동 (S3에서 구축, 이후 재사용)

```
[Bubble API Connector 설정]
- Name: Gemini_Flash / Gemini_Pro
- Authentication: API Key (Header)
- Base URL: https://generativelanguage.googleapis.com/v1beta
- Endpoint: /models/gemini-2.0-flash:generateContent

[공통 Workflow]
1. 프롬프트 조립 (프롬프트 명세서 기준)
2. API Connector 호출
3. 응답 JSON 파싱
4. 결과 저장 (해당 Data Type)
5. AIRequestLog 기록
   - prompt_id, model, input/output tokens, cost, response_time_ms
```

### XP 시스템 (전 과목 공통)

```
[XP 부여 기준]
- 국어 1세션 완료: 50~100 XP (점수 비례)
- 영어 일일 완료: 30~60 XP (통과율 비례)
- 수학 문제 정답: 5~10 XP/문제 (힌트 사용 시 감소)

[레벨 시스템]
- Level = floor(total_xp / 1000) + 1
- 레벨업 시 Toast 알림
```

### 반응형 처리

```
모든 페이지 공통:
- PC (>1200px): 사이드바 표시, 2~3열 그리드
- Tablet (≤1200px): 사이드바 숨김/햄버거, 2열
- Mobile (≤768px): 1열, 패딩 축소
- Small (≤480px): 최소 패딩, 버튼 13px
```

---

## ✅ 전체 마일스톤

| 마일스톤 | 시점 | 검증 항목 |
|----------|------|-----------|
| **M1: 로그인 가능** | S2 완료 | 5개 역할 로그인 + 라우팅 |
| **M2: 국어 학습 가능** | S3 완료 | 5단계 전체 + AI 피드백 |
| **M3: 영어 발화 가능** | S4 완료 | 7초 녹음 + STT + 판정 |
| **M4: 수학 풀이 가능** | S5 완료 | Jump/Anchor + 힌트 4단계 |
| **M5: 학습 추적 가능** | S6 완료 | 플래너 캘린더 + 진도 |
| **M6: 학원 운영 가능** | S7 완료 | 관리자 CRUD 전체 |

> **M6 완료 = MVP 50명 학생 대상 파일럿 가능**

---

*— MAMA-ASST 개발 계획서 (Post-RE) v1.0 끝 —*
