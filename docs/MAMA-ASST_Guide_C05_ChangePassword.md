# C-05 비밀번호 변경 페이지 — Bubble 구현 가이드

**페이지**: change-password  
**유형**: Type B (Header/Sidebar 없음, 단독 인증 페이지)  
**소요 시간**: 약 15~20분 (login 페이지 복사 후 수정)  
**참조 목업**: `C05_change_password_mockup.html`

---

## 1. 사전 확인

### 이 페이지의 역할

```
첫 로그인 사용자(is_first_login = yes)가 초기 비밀번호(mb1234)를 
새 비밀번호로 변경하는 페이지.

진입 경로:
  login → 첫 로그인 감지 → change-password로 리다이렉트

완료 후:
  is_first_login = no → 역할별 대시보드로 이동
```

### 접근 제어

```
이 페이지는 로그인된 사용자만 접근 가능:
  → Current User is logged in이 아니면 login으로 리다이렉트
  → Current User's is_first_login이 no이면 이미 변경 완료 → 대시보드로 리다이렉트
```

### 비밀번호 유효성 규칙

```
조건: 영문 + 숫자 포함, 6자 이상
정규식: /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && value.length >= 6

예시:
  "abc123"   → ✅ 유효
  "test1"    → ❌ 5자 미만
  "abcdef"   → ❌ 숫자 없음
  "123456"   → ❌ 영문 없음
  "mb1234"   → ✅ 유효 (영문+숫자, 6자)
```

---

## 2. 페이지 생성

### 2.1 새 페이지 만들기

```
Pages → Add a new page
  Page name: change-password
  Page title: 비밀번호 변경 | MAMA-ASST MVP
  Clone from: login (← 로그인 페이지 복사 후 수정하면 빠름)
  Type of content: (비워둠)
```

> 💡 login 페이지를 복사하면 Page 속성, Group_PageWrapper, 로고 영역, 카드 스타일, 
> 반응형 설정이 이미 적용되어 있습니다. 내부 요소만 교체하면 됩니다.

### 2.2 Page 속성 (login과 동일)

```
Layout:
  Container layout: Column
  H Alignment: Center
  V Alignment: Center
  Apply gap spacing between elements: ✅ (Row gap: 0)
  
Appearance:
  Background: #F9FAFB

Responsive:
  Min width: 320
  Max width: (inf)
  Min height: 100vh
```

---

## 3. 엘리먼트 트리 (전체 구조)

```
Page: change-password
│
├── Group_PageWrapper (Column, 중앙 정렬, max-width 440px)
│   │
│   ├── Group_Logo (Column, Center)
│   │   ├── Group_LogoIcon (64×64, Primary 배경, Roundness 16)
│   │   │   └── Icon_Logo (lock, 32px, white)  ★ school → lock 변경
│   │   ├── Text_PageTitle ("비밀번호 변경")
│   │   └── Text_PageSubtitle ("안전한 사용을 위해 새 비밀번호를 설정하세요")
│   │
│   ├── Group_Card (Column, 카드 스타일)
│   │   │
│   │   ├── Group_Alert (Row, 노란 경고 박스)
│   │   │   ├── Group_AlertIcon (24×24, 원형, Warning 배경)
│   │   │   │   └── Icon_Alert (priority_high, 14px, white)
│   │   │   └── Text_Alert ("현재 초기 비밀번호(mb1234) 사용 중")
│   │   │
│   │   ├── Group_InputNewPassword (Column)
│   │   │   ├── Text_LabelNewPassword ("새 비밀번호")
│   │   │   ├── Group_NewPasswordWrapper (Row)
│   │   │   │   ├── Input_NewPassword
│   │   │   │   └── Button_ToggleNew (visibility_off)
│   │   │   ├── Group_PasswordHint (Row — 실시간 색상 변경)
│   │   │   │   ├── Icon_Hint (info_outline / check_circle / cancel)
│   │   │   │   └── Text_Hint ("영문, 숫자 포함 6자 이상")
│   │   │   └── Group_ErrorNewPassword (Row — 기본 숨김)
│   │   │       ├── Icon_ErrorNew (error_outline, 14px)
│   │   │       └── Text_ErrorNew ("영문, 숫자 포함 6자 이상 입력해주세요")
│   │   │
│   │   ├── Group_InputConfirmPassword (Column)
│   │   │   ├── Text_LabelConfirmPassword ("비밀번호 확인")
│   │   │   ├── Group_ConfirmPasswordWrapper (Row)
│   │   │   │   ├── Input_ConfirmPassword
│   │   │   │   └── Button_ToggleConfirm (visibility_off)
│   │   │   ├── Group_ErrorConfirm (Row — 기본 숨김)
│   │   │   │   ├── Icon_ErrorConfirm (error_outline, 14px)
│   │   │   │   └── Text_ErrorConfirm ("비밀번호가 일치하지 않습니다")
│   │   │   └── Group_SuccessConfirm (Row — 기본 숨김)
│   │   │       ├── Icon_SuccessConfirm (check_circle, 14px)
│   │   │       └── Text_SuccessConfirm ("비밀번호가 일치합니다")
│   │   │
│   │   └── Button_Submit ("변경 완료" + check 아이콘)
│   │
│   └── Text_Copyright ("© 2025 MAMA-ASST. All rights reserved.")
│
└── Popup_Success (성공 모달)
    ├── Group_SuccessCircle (72×72, 원형, Success BG)
    │   └── Icon_SuccessCheck (check, 36px, Success)
    ├── Text_SuccessTitle ("비밀번호가 변경되었습니다!")
    ├── Text_SuccessDesc ("새 비밀번호로 안전하게 로그인할 수 있습니다.")
    └── Button_GoToDashboard ("시작하기")
```

---

## 4. 엘리먼트 상세 설정

### 4.1 Group_PageWrapper (최상위 래퍼 — login과 동일)

```
Type: Group
Layout:
  Container layout: Column
  H Alignment: Center
  V Alignment: Center
  Apply gap: ✅ Row gap: 32

Size:
  Width: 100%
  Min height: 100vh

Responsive:
  Min width: 320
  Max width: 440
  
Padding: 24px (all sides)
```

### 4.2 Group_Logo (로고 영역)

```
Type: Group
Layout:
  Container layout: Column
  H Alignment: Center

Size: Width 100%
```

#### Group_LogoIcon (아이콘 박스)

```
★ login과 동일 스타일, 아이콘만 변경

Size: 64×64 (fixed)
Background: #FF6D4D (Primary)
Roundness: 16
Box Shadow: 0px 4px 12px rgba(255,109,77,0.3)
Margin Bottom: 16px
```

#### Icon_Logo

```
Icon: lock  ★ login의 school → lock 변경
Size: 32px
Color: #FFFFFF
```

#### Text_PageTitle

```
Content: "비밀번호 변경"
Font: Pretendard 24px, Weight 700 (Bold)
Color: #1A2E4D (Navy)
H Alignment: Center
Margin Bottom: 4px
```

#### Text_PageSubtitle

```
Content: "안전한 사용을 위해 새 비밀번호를 설정하세요"
Font: Pretendard 15px, Weight 400
Color: #6B7280 (Text Secondary)
H Alignment: Center
```

### 4.3 Group_Card (카드 — login과 동일 스타일)

```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Roundness: 16
Box Shadow: 0px 1px 3px 0px rgba(0,0,0,0.1)
Width: 100%
Padding: 32px (PC) → 24px (< 480px)
```

### 4.4 Group_Alert (초기 비밀번호 경고 박스) ★

```
Type: Group
Layout:
  Container layout: Row
  V Alignment: Center
  Apply gap: ✅ Column gap: 10

Appearance:
  Background: #FFFBEB (Warning BG)
  Border: 1px solid rgba(245,158,11,0.2)
  Roundness: 8

Size: Width 100%
Padding: 12px 16px
Margin Bottom: 24px
```

#### Group_AlertIcon (경고 원형 아이콘)

```
Type: Group
Size: 24×24 (fixed)
Background: #F59E0B (Warning)
Roundness: 50% (완전 원형)

Layout:
  H Alignment: Center
  V Alignment: Center
```

#### Icon_Alert

```
Icon: priority_high (Material Icons Round)
Size: 14px
Color: #FFFFFF
```

#### Text_Alert

```
Content: "현재 초기 비밀번호(mb1234) 사용 중"
Font: Pretendard 14px, Weight 500
Color: #92400E (Warning Dark)
```

### 4.5 Group_InputNewPassword (새 비밀번호 입력 그룹)

```
Type: Group
Layout:
  Container layout: Column
  Apply gap: ✅ Row gap: 6

Size: Width 100%
Margin Bottom: 20px
```

#### Text_LabelNewPassword

```
Content: "새 비밀번호"
Font: Pretendard 14px, Weight 500
Color: #1F2937 (Text Primary)
```

#### Group_NewPasswordWrapper (Input + 토글 래퍼)

```
Type: Group
Layout: Container layout: Row
Size: Width 100%, Min height 48px
```

#### Input_NewPassword ★

```
Type: Input
Style: Input - Standard

Placeholder: "새 비밀번호 입력"
Content format: Password

Size: Width 100%, Min height 48px
Padding: 12px 48px 12px 16px (right 48px: 토글 공간)

Appearance:
  Font: Pretendard 16px
  Color: #1F2937
  Placeholder: #9CA3AF
  Background: #FFFFFF
  Border: 1px solid #E5E7EB
  Roundness: 8
  Focus: Border #FF6D4D, Shadow 0 0 0 3px rgba(255,109,77,0.1)
```

#### Button_ToggleNew (비밀번호 토글 — login과 동일)

```
Icon: visibility_off, 20px, #9CA3AF
Size: 36×36
Position: Input 우측 12px, 수직 중앙
Background: transparent, Hover: #F9FAFB
Roundness: 8

★ MVP 권장: 토글 생략, v1.1에서 추가
```

#### Group_PasswordHint (비밀번호 조건 힌트) ★ 실시간 색상 변경

```
Type: Group
Layout:
  Container layout: Row
  V Alignment: Center
  Apply gap: ✅ Column gap: 4

Size: Width 100%
```

#### Icon_Hint

```
Icon: (상태에 따라 변경)
  기본: info_outline
  유효: check_circle
  무효: cancel
Size: 14px
Color: (상태에 따라 변경 — 아래 Conditional 참조)
```

#### Text_Hint

```
Content: "영문, 숫자 포함 6자 이상"
Font: Pretendard 12px, Weight 400
Color: (상태에 따라 변경 — 아래 Conditional 참조)
```

#### Group_ErrorNewPassword (에러 메시지 — 기본 숨김)

```
Type: Group (Row, V Center, gap 4px)

★ 기본 숨김 + Collapse when hidden
```

#### Icon_ErrorNew + Text_ErrorNew

```
Icon: error_outline, 14px, #EF4444
Text: "영문, 숫자 포함 6자 이상 입력해주세요", 12px, #EF4444
```

### 4.6 Group_InputConfirmPassword (비밀번호 확인 그룹)

```
Type: Group
Layout:
  Container layout: Column
  Apply gap: ✅ Row gap: 6

Size: Width 100%
Margin Bottom: 20px
```

#### Text_LabelConfirmPassword

```
Content: "비밀번호 확인"
Font: Pretendard 14px, Weight 500
Color: #1F2937
```

#### Group_ConfirmPasswordWrapper + Input_ConfirmPassword + Button_ToggleConfirm

```
새 비밀번호 영역과 동일 구조:
  Input Placeholder: "비밀번호 재입력"
  Content format: Password
  Size/Style: Input_NewPassword와 동일
```

#### Group_ErrorConfirm (불일치 에러 — 기본 숨김)

```
Type: Group (Row, V Center, gap 4px)
  Icon: error_outline, 14px, #EF4444
  Text: "비밀번호가 일치하지 않습니다", 12px, #EF4444

★ 기본 숨김 + Collapse when hidden
```

#### Group_SuccessConfirm (일치 성공 — 기본 숨김) ★

```
Type: Group (Row, V Center, gap 4px)
  Icon: check_circle, 14px, #22C55E (Success)
  Text: "비밀번호가 일치합니다", 12px, #22C55E (Success)

★ 기본 숨김 + Collapse when hidden
```

### 4.7 Button_Submit ★

```
Type: Button
Style: Button - Primary

Content: "변경 완료"

Appearance:
  Background: #FF6D4D (Primary)
  Hover: #E5573D
  Font: Pretendard 16px, Weight 700, #FFFFFF
  Roundness: 12
  Min height: 52px

Size: Width 100%

아이콘:
  Icon: check (Material Icons Round)
  Size: 20px
  Color: #FFFFFF
  Position: Right of the label
```

### 4.8 Text_Copyright

```
Content: "© 2025 MAMA-ASST. All rights reserved."
Font: Pretendard 13px, Weight 400
Color: #9CA3AF (Text Tertiary)
H Alignment: Center
```

### 4.9 Popup_Success (성공 모달) ★

```
Type: Popup
Style: (커스텀)

Overlay:
  Background: rgba(0,0,0,0.4)

Popup Container:
  Background: #FFFFFF
  Roundness: 20
  Padding: 40px 32px
  Max width: 360px
  H Alignment: Center
```

#### Group_SuccessCircle

```
Type: Group
Size: 72×72 (fixed)
Background: #F0FDF4 (Success BG)
Roundness: 50% (완전 원형)
Layout: Center/Center
Margin Bottom: 20px
```

#### Icon_SuccessCheck

```
Icon: check
Size: 36px
Color: #22C55E (Success)
```

#### Text_SuccessTitle

```
Content: "비밀번호가 변경되었습니다!"
Font: Pretendard 20px, Weight 700
Color: #1A2E4D (Navy)
Margin Bottom: 8px
```

#### Text_SuccessDesc

```
Content: "새 비밀번호로 안전하게 로그인할 수 있습니다.\n잠시 후 대시보드로 이동합니다."
Font: Pretendard 14px, Weight 400
Color: #6B7280 (Text Secondary)
Line height: 1.5
Margin Bottom: 24px
```

#### Button_GoToDashboard

```
Type: Button

Content: "시작하기"

Appearance:
  Background: #22C55E (Success)
  Hover: #16A34A
  Font: Pretendard 15px, Weight 600, #FFFFFF
  Roundness: 12

Size: Width 100%, Height 48px
```

---

## 5. Custom State (페이지 상태 관리)

```
Page: change-password에 Custom State 추가:

1. state_password_valid (type: yes/no, default: no)
   → 새 비밀번호가 유효성 조건 충족 시 yes

2. state_passwords_match (type: yes/no, default: no)
   → 새 비밀번호와 확인이 일치 시 yes

3. state_new_error (type: yes/no, default: no)
   → 새 비밀번호 에러 표시

4. state_confirm_error (type: yes/no, default: no)
   → 확인 비밀번호 에러 표시

5. state_loading (type: yes/no, default: no)
   → 제출 중 로딩 상태

6. state_hint_status (type: text, default: "default")
   → 힌트 색상 상태: "default" | "valid" | "invalid"
```

### Conditional 설정

#### Group_PasswordHint + Icon_Hint + Text_Hint (힌트 색상)

```
기본 상태 (state_hint_status = "default"):
  Icon: info_outline
  Color: #9CA3AF (Text Tertiary)

When state_hint_status is "valid":
  Icon: check_circle
  Color: #22C55E (Success)

When state_hint_status is "invalid":
  Icon: cancel
  Color: #EF4444 (Error)
```

#### Input_NewPassword (상태별 스타일)

```
When state_password_valid is "yes":
  → Border color: #22C55E (Success)
  → Background: #F0FDF4 (Success BG)

When state_new_error is "yes":
  → Border color: #EF4444 (Error)
  → Background: #FEF2F2 (Error BG)
```

#### Input_ConfirmPassword (상태별 스타일)

```
When state_passwords_match is "yes":
  → Border color: #22C55E (Success)
  → Background: #F0FDF4 (Success BG)

When state_confirm_error is "yes":
  → Border color: #EF4444 (Error)
  → Background: #FEF2F2 (Error BG)
```

#### Group_ErrorNewPassword (새 비밀번호 에러)

```
When state_new_error is "yes":
  → This element is visible: ✅
```

#### Group_ErrorConfirm (확인 불일치 에러)

```
When state_confirm_error is "yes":
  → This element is visible: ✅
```

#### Group_SuccessConfirm (확인 일치 성공)

```
When state_passwords_match is "yes":
  → This element is visible: ✅
```

#### Button_Submit (로딩 상태)

```
When state_loading is "yes":
  → Background: rgba(255,109,77,0.7)
  → This element isn't clickable: ✅
  → Text: "변경 중..."
```

---

## 6. Workflow (핵심) ★★★

### WF-1: Page Load (접근 제어)

```
Event: Page is loaded (entire)

── Step 1: 비로그인 사용자 → 로그인으로
   Action: Go to page login
   Only when: Current User is not logged in

── Step 2: 이미 비밀번호 변경한 사용자 → 대시보드로
   Action: Go to page student-dashboard
   Only when: Current User is logged in
              AND Current User's is_first_login is "no"
              AND Current User's role is STUDENT

   Action: Go to page admin-dashboard
   Only when: Current User is logged in
              AND Current User's is_first_login is "no"
              AND Current User's role is ACADEMY_ADMIN
```

### WF-2: Input_NewPassword 값 변경 (실시간 유효성 검증) ★

```
Event: When Input_NewPassword's value is changed

── Step 1: 에러 초기화
   Action: Set state
     state_new_error = no

── Step 2: 빈값 → 기본 힌트
   Action: Set state
     state_hint_status = "default"
     state_password_valid = no
   Only when: Input_NewPassword's value is empty

── Step 3: 유효한 비밀번호 → 성공 힌트
   Action: Set state
     state_hint_status = "valid"
     state_password_valid = yes
   Only when: Input_NewPassword's value is not empty
              AND Input_NewPassword's value:length ≥ 6
              AND Input_NewPassword's value contains [regex: 영문 포함]
              AND Input_NewPassword's value contains [regex: 숫자 포함]

── Step 4: 무효한 비밀번호 → 에러 힌트
   Action: Set state
     state_hint_status = "invalid"
     state_password_valid = no
   Only when: Input_NewPassword's value is not empty
              AND (길이 < 6 OR 영문 미포함 OR 숫자 미포함)
```

> ⚠️ **Bubble에서 정규식 검증 방법**:  
> Bubble에는 직접적인 정규식 매칭이 어렵습니다. 대안:
> 
> **방법 A — Regex Plugin 사용** (권장):
> `Input's value matches regex "[a-zA-Z]"` AND `matches regex "[0-9]"`
>
> **방법 B — contains 조합** (플러그인 없이):
> 영문 포함 여부를 개별 문자로 체크하기 어려우므로,
> 서버 사이드 검증(Workflow)에서 처리하고 클라이언트는 길이만 체크.
>
> **방법 C — MVP 간소화** (가장 빠름):
> 길이 6자 이상만 클라이언트에서 체크,
> 영문+숫자 규칙은 안내 텍스트로만 표시.
> 제출 시 서버에서 최종 검증.

### WF-3: Input_ConfirmPassword 값 변경 (실시간 일치 검증) ★

```
Event: When Input_ConfirmPassword's value is changed

── Step 1: 에러/성공 초기화
   Action: Set state
     state_confirm_error = no
     state_passwords_match = no

── Step 2: 빈값 → 초기 상태
   (아무것도 안 함)
   Only when: Input_ConfirmPassword's value is empty

── Step 3: 일치 + 유효 → 성공 표시
   Action: Set state
     state_passwords_match = yes
   Only when: Input_ConfirmPassword's value is not empty
              AND Input_ConfirmPassword's value is Input_NewPassword's value
              AND state_password_valid is yes

── Step 4: 불일치 → 에러 표시
   Action: Set state
     state_confirm_error = yes
   Only when: Input_ConfirmPassword's value is not empty
              AND Input_ConfirmPassword's value is not Input_NewPassword's value
```

### WF-4: Button_Submit 클릭 (제출)

```
Event: When Button_Submit is clicked

── Step 1: 에러 전체 초기화
   Action: Set state
     state_new_error = no
     state_confirm_error = no
     state_passwords_match = no

── Step 2: 새 비밀번호 빈값 검증
   Action: Set state
     state_new_error = yes
   Only when: Input_NewPassword's value is empty

── Step 3: 새 비밀번호 유효성 검증
   Action: Set state
     state_new_error = yes
   Only when: Input_NewPassword's value is not empty
              AND state_password_valid is no

── Step 4: 확인 비밀번호 빈값 검증
   Action: Set state
     state_confirm_error = yes
   Only when: Input_ConfirmPassword's value is empty

── Step 5: 비밀번호 불일치 검증
   Action: Set state
     state_confirm_error = yes
   Only when: Input_ConfirmPassword's value is not empty
              AND Input_ConfirmPassword's value is not Input_NewPassword's value

── Step 6: 모든 검증 통과 시 → 로딩 시작
   Action: Set state
     state_loading = yes
   Only when: state_password_valid is yes
              AND Input_ConfirmPassword's value is Input_NewPassword's value
              AND Input_NewPassword's value is not empty
              AND Input_ConfirmPassword's value is not empty

── Step 7: 비밀번호 변경 실행 ★★★
   Only when: (Step 6과 동일 조건)

   Action: Make changes to Current User
     password = Input_NewPassword's value    ← Bubble 비밀번호 변경
     is_first_login = no                     ← 첫 로그인 플래그 해제

── Step 8: 로딩 해제
   Action: Set state
     state_loading = no

── Step 9: 성공 모달 표시
   Action: Show Popup_Success
```

### WF-5: Button_GoToDashboard 클릭 (성공 모달 → 대시보드)

```
Event: When Button_GoToDashboard is clicked

── Step 1: 학생 → 학생 대시보드
   Action: Go to page student-dashboard
   Only when: Current User's role is STUDENT

── Step 2: 관리자 → 관리자 대시보드
   Action: Go to page admin-dashboard
   Only when: Current User's role is ACADEMY_ADMIN
```

### WF-6: Input 포커스 시 에러 초기화

```
Event: When Input_NewPassword is focused
── Action: Set state state_new_error = no

Event: When Input_ConfirmPassword is focused
── Action: Set state state_confirm_error = no
```

---

## 7. 반응형 설정

```
login 페이지와 동일:

Group_PageWrapper: Max width 440px, Padding 24px
Group_Card: Padding 32px → 24px (< 480px)
Text_PageTitle: 24px → 22px (< 480px)
Button_Submit: Width 100%
Input_NewPassword, Input_ConfirmPassword: Width 100%
Popup_Success > Success Modal: Max width 360px, Width 90%
```

---

## 8. 테스트 체크리스트

```
□ 1. 접근 제어 — 비로그인 상태에서 /change-password 접속
     → login 페이지로 리다이렉트 되는가?

□ 2. 접근 제어 — is_first_login = no 사용자가 접속
     → 대시보드로 리다이렉트 되는가?

□ 3. 초기 비밀번호 경고 — 노란 박스 표시
     → "현재 초기 비밀번호(mb1234) 사용 중" 보이는가?

□ 4. 실시간 힌트 — 빈값
     → 기본 회색 "영문, 숫자 포함 6자 이상" + info_outline 아이콘

□ 5. 실시간 힌트 — 유효한 비밀번호 입력 (예: "abc123")
     → 초록색 + check_circle 아이콘으로 변경되는가?
     → Input 테두리 초록색 + 배경 연한 초록인가?

□ 6. 실시간 힌트 — 무효한 비밀번호 (예: "abc" 또는 "123456")
     → 빨간색 + cancel 아이콘으로 변경되는가?

□ 7. 비밀번호 일치 — 확인 필드에 동일한 유효 비밀번호 입력
     → 초록색 "비밀번호가 일치합니다" + check_circle 표시되는가?
     → 확인 Input 테두리 초록색인가?

□ 8. 비밀번호 불일치 — 확인 필드에 다른 값 입력
     → 빨간색 "비밀번호가 일치하지 않습니다" + error_outline 표시되는가?
     → 확인 Input 테두리 빨간색인가?

□ 9. 빈 값 제출 — 새 비밀번호 비움
     → "새 비밀번호를 입력해주세요" (또는 유효성 에러) 표시되는가?

□ 10. 빈 값 제출 — 확인 비밀번호 비움
      → 에러 메시지 표시되는가?

□ 11. 정상 제출 — 유효 + 일치하는 비밀번호
      → 버튼 "변경 중..." 로딩 상태 되는가?
      → 로딩 중 버튼 재클릭 방지되는가?
      → 성공 모달 표시되는가?

□ 12. 성공 모달 — "시작하기" 버튼 클릭
      → 역할별 대시보드로 이동하는가?
      → (STUDENT → student-dashboard)

□ 13. 성공 후 — is_first_login 필드가 no로 변경되었는가?
      → 다시 /change-password 접속 시 대시보드로 리다이렉트 되는가?
```

---

## 9. 완성 후 다음 단계

```
change-password 완성 → student-dashboard 페이지로 진행

student-dashboard는 Type A 페이지입니다:
- RE_Header + RE_Sidebar 포함
- 학생 대시보드 메인 화면
- Day 2 한국어 학습 기능과 연결

Day 1 완료 범위: login + change-password (인증 플로우 완성)
```

---

## 부록: 목업 ↔ Bubble 엘리먼트 매핑 요약

```
목업 HTML                       → Bubble Element
──────────────────────────────────────────────────────────────
.page-wrapper                    → Group_PageWrapper (Column, Center, max 440px)
.logo-area                       → Group_Logo (Column, Center)
.logo-icon                       → Group_LogoIcon (64×64, #FF6D4D, Roundness 16)
.logo-icon > span                → Icon_Logo (lock, 32px, white)
h1.logo-title                    → Text_PageTitle (24px, Bold, #1A2E4D)
p.logo-subtitle                  → Text_PageSubtitle (15px, #6B7280)
.card                            → Group_Card (Column, Surface, Roundness 16)
.alert-warning                   → Group_Alert (Row, #FFFBEB BG)
.alert-icon                      → Group_AlertIcon (24×24, #F59E0B, 원형)
.alert-icon > icon               → Icon_Alert (priority_high, 14px, white)
.alert-text                      → Text_Alert (14px, Weight 500, #92400E)
.form-group (new pw)             → Group_InputNewPassword (Column, gap 6, mb 20)
.form-label (new pw)             → Text_LabelNewPassword (14px, Weight 500)
.input-wrapper (new pw)          → Group_NewPasswordWrapper (Row)
#newPassword                     → Input_NewPassword (Password, placeholder "새 비밀번호 입력")
.password-toggle (new)           → Button_ToggleNew (visibility_off, 20px)
.form-hint                       → Group_PasswordHint (Row, gap 4)
.form-hint > icon                → Icon_Hint (14px, 상태별 변경)
.form-hint > text                → Text_Hint (12px, "영문, 숫자 포함 6자 이상")
.form-error (new pw)             → Group_ErrorNewPassword (Row, 숨김)
.form-group (confirm)            → Group_InputConfirmPassword (Column, gap 6, mb 20)
.form-label (confirm)            → Text_LabelConfirmPassword (14px, Weight 500)
.input-wrapper (confirm)         → Group_ConfirmPasswordWrapper (Row)
#confirmPassword                 → Input_ConfirmPassword (Password, placeholder "비밀번호 재입력")
.password-toggle (confirm)       → Button_ToggleConfirm (visibility_off, 20px)
.form-error (confirm)            → Group_ErrorConfirm (Row: error_outline + "일치하지 않습니다")
.form-success (confirm)          → Group_SuccessConfirm (Row: check_circle + "일치합니다")
.btn-primary                     → Button_Submit (Primary, 52px, "변경 완료" + check)
.page-footer                     → Text_Copyright (13px, #9CA3AF)
.success-overlay                 → Popup_Success (Bubble Popup)
.success-circle                  → Group_SuccessCircle (72×72, #F0FDF4, 원형)
.success-circle > icon           → Icon_SuccessCheck (check, 36px, #22C55E)
h2.success-title                 → Text_SuccessTitle (20px, Bold, #1A2E4D)
p.success-desc                   → Text_SuccessDesc (14px, #6B7280)
.btn-success                     → Button_GoToDashboard (Success, 48px, "시작하기")
```

---

*— C-05 비밀번호 변경 페이지 구현 가이드 끝 —*
