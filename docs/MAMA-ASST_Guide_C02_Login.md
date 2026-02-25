# C-02 로그인 페이지 — Bubble 구현 가이드

**페이지**: login  
**유형**: Type B (Header/Sidebar 없음, 단독 인증 페이지)  
**소요 시간**: 약 30분  
**참조 목업**: `C02_login_mockup.html`

---

## 1. 사전 확인

### Bubble 로그인 방식 주의사항

Bubble의 내장 인증은 **email 필드**를 로그인 ID로 사용합니다.  
우리 서비스는 **전화번호**로 로그인하므로, 아래 방식을 사용합니다:

```
전화번호 로그인 전략:
- Bubble은 email 필드가 필수이고 이메일 형식 검증이 있음
- 따라서 "전화번호@더미도메인" 형태로 email 필드에 저장
- 더미 도메인: mama.app (또는 원하는 도메인)

예시:
  사용자 입력: "01011110000" 또는 "010-1111-0000"
  email 필드 저장값: "01011110000@mama.app"
  phone 필드 저장값: "01011110000" (표시용)

관리자가 학생 생성 시:
  → email = "01011110000@mama.app"
  → phone = "01011110000"
  → password = "mb1234"```

> ⚠️ 테스트 계정의 email 필드가 `01011110000@mama.app` 형태인지 확인하세요.  
> 기존에 다른 이메일이 들어가 있다면 이 형태로 변경해야 합니다.  
> 더미 도메인은 실제 존재하지 않아도 상관없습니다 (이메일 발송을 안 하므로).

---

## 2. 페이지 생성

### 2.1 새 페이지 만들기

```
Pages → Add a new page
  Page name: login
  Page title: 로그인 | MAMA-ASST MVP
  Clone from: (없음, 새로 생성)
  Type of content: (비워둠)
```

### 2.2 Page 속성

```
Layout:
  Container layout: Column
  H Alignment: Center
  V Alignment: Center (← 수직 중앙 정렬 핵심)
  Apply gap spacing between elements: ✅ (Row gap: 0)
  
Appearance:
  Style: Page - Standard (Background #F9FAFB)
  ✅ 또는 직접 배경색 설정: #F9FAFB

Responsive:
  Min width: 320
  Max width: (inf, 비워둠)
  Min height: 100vh (Fit height to content 체크 해제)
```

---

## 3. 엘리먼트 트리 (전체 구조)

```
Page: login
│
├── Group_LoginWrapper (Column, 중앙 정렬, max-width 440px)
│   │
│   ├── Group_Logo (Column, Center)
│   │   ├── Group_LogoIcon (64×64, Primary 배경, Roundness 16)
│   │   │   └── Icon_Logo (school, 32px, white)
│   │   ├── Text_LogoTitle ("MAMA-ASST")
│   │   └── Text_LogoSubtitle ("학습 관리 시작하기")
│   │
│   ├── Group_LoginCard (Column, 카드 스타일)
│   │   │
│   │   ├── Group_LoginError (Row, 에러 박스 — 기본 숨김) ★ form 최상단
│   │   │   ├── Icon_ErrorAlert (error_outline, 18px)
│   │   │   └── Text_LoginError ("전화번호 또는 비밀번호를 확인해주세요")
│   │   │
│   │   ├── Group_InputPhone (Column)
│   │   │   ├── Text_LabelPhone ("전화번호")
│   │   │   ├── Input_Phone
│   │   │   └── Group_ErrorPhone (Row — 기본 숨김)
│   │   │       ├── Icon_ErrorPhone (error_outline, 14px)
│   │   │       └── Text_ErrorPhone ("전화번호를 입력해주세요")
│   │   │
│   │   ├── Group_InputPassword (Column)
│   │   │   ├── Text_LabelPassword ("비밀번호")
│   │   │   ├── Group_PasswordWrapper (Row, 상대 위치)
│   │   │   │   ├── Input_Password
│   │   │   │   └── Button_TogglePassword (visibility_off 아이콘)
│   │   │   └── Group_ErrorPassword (Row — 기본 숨김)
│   │   │       ├── Icon_ErrorPassword (error_outline, 14px)
│   │   │       └── Text_ErrorPassword ("비밀번호를 입력해주세요")
│   │   │
│   │   └── Button_Login ("로그인" + arrow_forward 아이콘)
│   │
│   └── Text_Copyright ("© 2025 MAMA-ASST. All rights reserved.")
│
└── (Popup 없음)
```

---

## 4. 엘리먼트 상세 설정

### 4.1 Group_LoginWrapper (최상위 래퍼)

```
Type: Group
Layout:
  Container layout: Column
  H Alignment: Center
  V Alignment: Center (← 수직 가운데 정렬 핵심)
  Apply gap: ✅ Row gap: 32

Appearance:
  Background: None (transparent)

Size:
  Width: 100%
  Min height: 100vh (← Page의 높이를 채우도록)

Responsive:
  ✅ Make this element fixed-width 해제
  Min width: 320
  Max width: 440 (← 목업 기준)
  
Padding:
  24px (all sides)
```

### 4.2 Group_Logo (로고 영역)

```
Type: Group
Layout:
  Container layout: Column
  H Alignment: Center
  Apply gap: ✅ Row gap: 0 (내부 마진으로 제어)

Size:
  Width: 100%
```

#### Group_LogoIcon (아이콘 박스) ★

```
Type: Group
Layout:
  H Alignment: Center
  V Alignment: Center

Size:
  Width: 64px (fixed)
  Height: 64px (fixed)

Appearance:
  Background: #FF6D4D (Primary)
  ★ 목업은 linear-gradient(135deg, #FF6D4D, #FF8F75)
    Bubble에서는 단색 #FF6D4D로 대체 OK, 그라데이션은 v1.1에서 HTML element로 구현
  Roundness: 16
  Box Shadow: 0px 4px 12px rgba(255,109,77,0.3)

Margin:
  Bottom: 16px
```

#### Icon_Logo

```
Type: Icon (Material Icons Round)
  Icon: school
  Size: 32px
  Color: #FFFFFF (white)
```

#### Text_LogoTitle

```
Type: Text
  Content: "MAMA-ASST"
  Font: Pretendard 24px, Weight 700 (Bold)
  Color: #1A2E4D (Navy) ★ Primary(#FF6D4D)가 아님!
  H Alignment: Center

Margin:
  Bottom: 4px
```

#### Text_LogoSubtitle

```
Type: Text
  Content: "학습 관리 시작하기"
  Font: Pretendard 15px, Weight 400
  Color: #6B7280 (Text Secondary)
  H Alignment: Center
```

### 4.3 Group_LoginCard (로그인 카드)

```
Type: Group
Layout:
  Container layout: Column
  Apply gap: ✅ Row gap: 0 (내부 margin-bottom으로 간격 제어)

Appearance:
  Background: #FFFFFF (Surface)
  Border: 1px solid #E5E7EB (Border Light)
  Roundness: 16
  Box Shadow: 0px 1px 3px 0px rgba(0,0,0,0.1) (Shadow Card)
  
Size:
  Width: 100%

Padding:
  32px (all sides)
  
  모바일 Conditional (Current page width < 480):
  Padding: 24px
```

### 4.4 Group_LoginError (로그인 실패 에러 박스) ★ 카드 최상단 위치

```
Type: Group
Layout:
  Container layout: Row
  H Alignment: Center
  V Alignment: Center
  Apply gap: ✅ Column gap: 6

Appearance:
  Background: #FEF2F2 (Error BG)
  Border: 1px solid rgba(239,68,68,0.2)
  Roundness: 8

Size:
  Width: 100%

Padding:
  12px 16px

Margin:
  Bottom: 20px

★ 기본 숨김:
  This element is visible on page load: 체크 해제
  Collapse when hidden: ✅ (숨기면 공간도 사라지도록)
```

#### Icon_ErrorAlert

```
Type: Icon (Material Icons Round)
  Icon: error_outline
  Size: 18px
  Color: #EF4444 (Error)
```

#### Text_LoginError

```
Type: Text
  Content: "전화번호 또는 비밀번호를 확인해주세요"
  Font: Pretendard 14px, Weight 400
  Color: #EF4444 (Error)
```

### 4.5 Group_InputPhone (전화번호 입력 그룹)

```
Type: Group
Layout:
  Container layout: Column
  Apply gap: ✅ Row gap: 6

Size:
  Width: 100%

Margin:
  Bottom: 20px
```

#### Text_LabelPhone

```
Type: Text
  Content: "전화번호"
  Font: Pretendard 14px, Weight 500
  Color: #1F2937 (Text Primary)
```

#### Input_Phone ★

```
Type: Input
Style: Input - Standard
  
Placeholder: "01012345678"
Content format: Text
Max length: 13

This input should not be empty: 아니오 (커스텀 검증 사용)

Size:
  Width: 100%
  Min height: 48px

Appearance (Style로 적용됨):
  Font: Pretendard 16px (iOS 확대 방지)
  Color: #1F2937 (Text Primary)
  Placeholder Color: #9CA3AF (Text Tertiary)
  Background: #FFFFFF (Surface)
  Border: 1px solid #E5E7EB (Border Light)
  Roundness: 8
  Padding: 12px 16px
  Focus: Border #FF6D4D, Shadow 0 0 0 3px rgba(255,109,77,0.1)
```

#### Group_ErrorPhone (에러 메시지 — 아이콘 + 텍스트) ★

```
Type: Group
Layout:
  Container layout: Row
  V Alignment: Center
  Apply gap: ✅ Column gap: 4

★ 기본 숨김:
  This element is visible on page load: 체크 해제
  Collapse when hidden: ✅
```

#### Icon_ErrorPhone

```
Type: Icon (Material Icons Round)
  Icon: error_outline
  Size: 14px
  Color: #EF4444 (Error)
```

#### Text_ErrorPhone

```
Type: Text
  Content: "전화번호를 입력해주세요"
  Font: Pretendard 12px, Weight 400
  Color: #EF4444 (Error)
```

### 4.6 Group_InputPassword (비밀번호 입력 그룹)

```
Type: Group
Layout:
  Container layout: Column
  Apply gap: ✅ Row gap: 6

Size:
  Width: 100%

Margin:
  Bottom: 20px
```

#### Text_LabelPassword

```
Type: Text
  Content: "비밀번호"
  Font: Pretendard 14px, Weight 500
  Color: #1F2937 (Text Primary)
```

#### Group_PasswordWrapper (Input + 토글 버튼 래퍼) ★

```
Type: Group
Layout:
  Container layout: Row

Size:
  Width: 100%
  Min height: 48px

★ Bubble 구현:
  Input_Password를 width 100%로 놓고,
  padding-right: 48px으로 설정하여 토글 버튼 공간 확보.
  Button_TogglePassword를 같은 Group 안에서 absolute 우측 배치.
```

#### Input_Password ★

```
Type: Input
Style: Input - Standard
  
Placeholder: "비밀번호를 입력하세요"
Content format: Password (← 이것 중요!)

Size:
  Width: 100%
  Min height: 48px

Padding:
  12px 48px 12px 16px (← right 48px: 토글 버튼 공간)
```

#### Button_TogglePassword (비밀번호 표시/숨김 토글) ★

```
Type: Icon (또는 Group + Icon)
  Icon: visibility_off (기본) / visibility (토글 시)
  Size: 20px
  Color: #9CA3AF (Text Tertiary)
  Hover Color: #6B7280 (Text Secondary)

Size:
  Width: 36px
  Height: 36px

Position:
  Input_Password 우측 12px
  수직 중앙 정렬

Appearance:
  Background: transparent
  Hover Background: #F9FAFB (Background)
  Roundness: 8

★ Bubble 구현 방법 (2가지 중 택1):

  방법 A — Custom State 토글:
  Page에 state_show_password (yes/no, default: no) 추가
  아이콘 클릭 시 state_show_password 토글
  Input_Password에 Conditional:
    When state_show_password is yes → Content format: Text
    (Bubble에서 동적 전환이 제한적일 수 있음)
  
  방법 B — MVP 간소화 (권장):
  비밀번호 토글 생략. Input_Password만 사용.
  v1.1에서 JavaScript로 추가.
```

#### Group_ErrorPassword (에러 메시지 — 아이콘 + 텍스트)

```
Group_ErrorPhone과 동일 구조:

Type: Group (Row, V Alignment Center, gap 4px)
  Icon: error_outline, 14px, #EF4444
  Text: "비밀번호를 입력해주세요", 12px, #EF4444

★ 기본 숨김 + Collapse when hidden
```

### 4.7 Button_Login ★

```
Type: Button
Style: Button - Primary

Content: "로그인"

Appearance (Style로 적용됨):
  Background: #FF6D4D (Primary)
  Hover Background: #E5573D (Primary Hover)
  Font: Pretendard 16px, Weight 700 (Bold), #FFFFFF
  Roundness: 12
  Min height: 52px

Size:
  Width: 100%
  Min height: 52px

아이콘:
  Icon: arrow_forward (Material Icons Round)
  Icon Size: 20px
  Icon Color: #FFFFFF
  Icon 위치: Right of the label
  
  ★ Bubble에서 Button에 아이콘 추가하는 법:
  Button 설정에서 Icon 영역에서 Material Icon 선택 가능.
  또는 Button 대신 Group(Row) + Text + Icon 조합으로 구현.
```

### 4.8 Text_Copyright (하단 푸터)

```
Type: Text
  Content: "© 2025 MAMA-ASST. All rights reserved."
  Font: Pretendard 13px, Weight 400
  Color: #9CA3AF (Text Tertiary)
  H Alignment: Center
```

---

## 5. Custom State (페이지 상태 관리)

```
Page: login에 Custom State 추가:

1. state_login_error (type: yes/no, default: no)
   → 로그인 실패 시 yes → 에러 박스 + 양쪽 Input 에러 스타일

2. state_phone_error (type: yes/no, default: no)
   → 전화번호 미입력 시 yes

3. state_password_error (type: yes/no, default: no)
   → 비밀번호 미입력 시 yes

4. state_loading (type: yes/no, default: no)
   → 로그인 시도 중 로딩 상태
```

### Conditional 설정

#### Group_LoginError (로그인 실패 에러 박스)

```
When login's state_login_error is "yes":
  → This element is visible: ✅
```

#### Group_ErrorPhone (전화번호 에러 메시지)

```
When login's state_phone_error is "yes":
  → This element is visible: ✅
```

#### Group_ErrorPassword (비밀번호 에러 메시지)

```
When login's state_password_error is "yes":
  → This element is visible: ✅
```

#### Input_Phone (에러 스타일) ★ 두 가지 조건

```
조건 1 — 빈값 에러:
When login's state_phone_error is "yes":
  → Border color: #EF4444
  → Background color: #FEF2F2

조건 2 — 로그인 실패:
When login's state_login_error is "yes":
  → Border color: #EF4444
  → Background color: #FEF2F2
```

#### Input_Password (에러 스타일) ★ 두 가지 조건

```
조건 1 — 빈값 에러:
When login's state_password_error is "yes":
  → Border color: #EF4444
  → Background color: #FEF2F2

조건 2 — 로그인 실패:
When login's state_login_error is "yes":
  → Border color: #EF4444
  → Background color: #FEF2F2
```

#### Button_Login (로딩 상태)

```
When login's state_loading is "yes":
  → Background color: rgba(255,109,77,0.7) (반투명)
  → This element isn't clickable: ✅
  → Text content: "로그인 중..."
```

---

## 6. Workflow (핵심) ★★★

### WF-1: Button_Login 클릭

```
Event: When Button_Login is clicked

── Step 1: 에러 상태 전체 초기화
   Action: Set state of login
     state_login_error = no
     state_phone_error = no
     state_password_error = no

── Step 2: 전화번호 빈값 검증
   Action: Set state of login
     state_phone_error = yes
   Only when: Input_Phone's value is empty

── Step 3: 비밀번호 빈값 검증
   Action: Set state of login
     state_password_error = yes
   Only when: Input_Password's value is empty

── Step 4: 빈값 있으면 여기서 중단
   (Step 5 이후는 Only when 조건으로 빈값 아닌 경우만 실행)

── Step 5: 로딩 상태 시작
   Action: Set state of login
     state_loading = yes
   Only when: Input_Phone's value is not empty 
              AND Input_Password's value is not empty

── Step 6: 로그인 시도
   Only when: Input_Phone's value is not empty 
              AND Input_Password's value is not empty

   Action: Log the user in
     Email: Input_Phone's value:find & replace(Find: "-", Replace by: ""):append"@mama.app"
            ← 하이픈 제거 + 더미 도메인 추가!
            "010-1234-5678" → "01012345678" → "01012345678@mama.app"
     Password: Input_Password's value
```

### WF-2: 로그인 성공 후 분기

```
Event: When Button_Login is clicked 
       (Step 6의 "Log the user in" 성공 후 계속)

── Step 7: 로딩 해제
   Action: Set state of login
     state_loading = no

── Step 8: last_login_at 업데이트
   Action: Make changes to Current User
     last_login_at = Current date/time

── Step 9: 첫 로그인 분기
   Action: Go to page change-password
   Only when: Current User's is_first_login is "yes"

── Step 10: 역할별 라우팅 (첫 로그인 아닌 경우)
   
   Action: Go to page student-dashboard
   Only when: Current User's is_first_login is "no"
              AND Current User's role is STUDENT

   Action: Go to page admin-dashboard
   Only when: Current User's is_first_login is "no"
              AND Current User's role is ACADEMY_ADMIN
   
   (나머지 역할은 MVP에서 불필요, 추후 추가)
```

### WF-3: 로그인 실패 처리

```
Event: When Log the user in results in an error
       (← Bubble 내장 이벤트, Step 6 실패 시 자동 트리거)

── Step 1: 로딩 해제
   Action: Set state of login
     state_loading = no

── Step 2: 에러 표시
   Action: Set state of login
     state_login_error = yes

   ★ state_login_error = yes가 되면 Conditional에 의해 3가지 동시 발생:
   - Group_LoginError 에러 박스 표시 (분홍 배경 + 아이콘 + 메시지)
   - Input_Phone 에러 스타일 (빨간 테두리 + 분홍 배경)
   - Input_Password 에러 스타일 (빨간 테두리 + 분홍 배경)
```

> ⚠️ Bubble에서 "Log the user in" 실패 시 자동으로 이 이벤트가 발생합니다.  
> 별도로 try-catch를 만들 필요 없습니다.

### WF-4: Input 포커스 시 에러 초기화 ★

```
Event: When Input_Phone is focused

── Step 1: 전화번호 에러 초기화
   Action: Set state of login
     state_phone_error = no

── Step 2: 로그인 에러 초기화
   Action: Set state of login
     state_login_error = no
```

```
Event: When Input_Password is focused

── Step 1: 비밀번호 에러 초기화
   Action: Set state of login
     state_password_error = no

── Step 2: 로그인 에러 초기화
   Action: Set state of login
     state_login_error = no
```

### WF-5: Page Load (이미 로그인된 경우)

```
Event: Page is loaded (entire)

── Step 1: 이미 로그인된 사용자 → 대시보드로
   Action: Go to page student-dashboard
   Only when: Current User is logged in
              AND Current User's role is STUDENT

   Action: Go to page admin-dashboard
   Only when: Current User is logged in
              AND Current User's role is ACADEMY_ADMIN
```

---

## 7. 전화번호 → 이메일 변환 정리

```
사용자 입력          →  Bubble email 필드 매칭값
─────────────────────────────────────────────────
"01012345678"       →  "01012345678@mama.app"
"010-1234-5678"     →  "01012345678@mama.app" (하이픈 자동 제거)

Bubble 표현식 (Workflow에서):
  Input_Phone's value:find & replace(Find: "-", Replace by: ""):append"@mama.app"

관리자 학생 생성 시 (Phase B, Day 8):
  email = Input_Phone's value:find & replace(Find: "-", Replace by: ""):append"@mama.app"
  phone = Input_Phone's value:find & replace(Find: "-", Replace by: "")
```

MVP에서는 Placeholder를 `"01012345678"` 로 설정해서 숫자만 입력하도록 유도합니다.  
자동 하이픈 포맷팅은 v1.1에서 JavaScript로 추가합니다.

---

## 8. 반응형 설정

```
Group_LoginWrapper:
  Max width: 440px → 데스크탑에서도 가운데 카드 형태
  Padding: 24px → 모바일에서 좌우 여백

Group_LoginCard:
  Padding: 32px (PC) → 24px (Current page width < 480)

Group_LogoIcon:
  Width/Height: 64px (fixed, 반응형 변화 없음)

Text_LogoTitle:
  Font: 24px (PC) → 22px (Current page width < 480)

Button_Login:
  Width: 100% → 항상 전체 폭

Input_Phone, Input_Password:
  Width: 100% → 항상 전체 폭
```

---

## 9. 테스트 체크리스트

```
□ 1. 정상 로그인 — 테스트학생B (01022220000 / 변경된 비밀번호)
     → student-dashboard로 이동하는가?

□ 2. 첫 로그인 — 테스트학생A (01011110000 / mb1234)
     → change-password로 이동하는가?

□ 3. 관리자 로그인 — 테스트관리자 (01099990000)
     → admin-dashboard로 이동하는가?

□ 4. 로그인 실패 — 틀린 비밀번호
     → 에러 박스 (분홍 배경 + 아이콘 + 메시지) 표시되는가?
     → 전화번호, 비밀번호 Input 모두 빨간 테두리 + 분홍 배경으로 바뀌는가?

□ 5. 빈 값 제출 — 전화번호 비움
     → 아이콘 + "전화번호를 입력해주세요" 표시되는가?
     → Input 빨간 테두리 + 분홍 배경 적용되는가?

□ 6. 빈 값 제출 — 비밀번호 비움
     → 아이콘 + "비밀번호를 입력해주세요" 표시되는가?
     → Input 빨간 테두리 + 분홍 배경 적용되는가?

□ 7. 에러 상태에서 Input 클릭 (포커스)
     → 해당 Input 에러 스타일이 초기화되는가?
     → 로그인 에러 박스도 함께 사라지는가?

□ 8. 하이픈 포함 입력 — "010-1111-0000"으로 입력
     → 하이픈 제거 + @mama.app 추가되어 정상 로그인 되는가?

□ 9. 로그인 버튼 클릭 시 로딩 상태
     → 버튼 텍스트 "로그인 중..."으로 바뀌는가?
     → 로딩 중 버튼 재클릭 방지되는가?
     → 성공/실패 후 로딩 해제되는가?

□ 10. 이미 로그인 상태에서 /login 접속
      → 자동으로 대시보드로 이동하는가?
```

---

## 10. 완성 후 다음 단계

```
login 완성 → change-password 페이지로 진행

change-password는 login보다 더 간단합니다:
- Input 2개 (새 비밀번호 + 확인)
- Button 1개 (변경 완료)
- Workflow: 비밀번호 변경 → is_first_login = no → 역할별 라우팅

login 페이지를 복사해서 수정하면 10~15분 완성 가능
```

---

## 부록 A: 엘리먼트 네이밍 규칙

```
이 프로젝트 전체에서 사용하는 네이밍 규칙:

Group_XXX       → 그룹/컨테이너
Text_XXX        → 텍스트 요소
Input_XXX       → 입력 필드
Button_XXX      → 버튼
Image_XXX       → 이미지
Icon_XXX        → 아이콘
RG_XXX          → Repeating Group
Popup_XXX       → 팝업
FG_XXX          → Floating Group
RE_XXX          → Reusable Element

state_xxx       → Custom State (소문자 스네이크)
```

---

## 부록 B: 목업 ↔ Bubble 엘리먼트 매핑 요약

```
목업 HTML                    → Bubble Element
────────────────────────────────────────────────────────────
.login-wrapper               → Group_LoginWrapper (Column, Center, max 440px)
.logo-area                   → Group_Logo (Column, Center)
.logo-icon                   → Group_LogoIcon (64×64, #FF6D4D, Roundness 16)
.logo-icon > span            → Icon_Logo (school, 32px, white)
h1.logo-title                → Text_LogoTitle (24px, Bold, #1A2E4D Navy)
p.logo-subtitle              → Text_LogoSubtitle (15px, #6B7280)
.login-card                  → Group_LoginCard (Column, Surface, Roundness 16)
.login-error                 → Group_LoginError (Row, #FEF2F2 BG, 숨김)
.login-error > icon          → Icon_ErrorAlert (error_outline, 18px, #EF4444)
.login-error > text          → Text_LoginError (14px, #EF4444)
.form-group (phone)          → Group_InputPhone (Column, gap 6, mb 20)
.form-label (phone)          → Text_LabelPhone (14px, Weight 500)
#phoneInput                  → Input_Phone (Standard, placeholder "01012345678")
.form-error (phone)          → Group_ErrorPhone (Row: Icon 14px + Text 12px, 숨김)
.form-group (pw)             → Group_InputPassword (Column, gap 6, mb 20)
.form-label (pw)             → Text_LabelPassword (14px, Weight 500)
.input-wrapper               → Group_PasswordWrapper (Row)
#passwordInput               → Input_Password (Password, padding-right 48px)
#togglePassword              → Button_TogglePassword (visibility_off, 20px)
.form-error (pw)             → Group_ErrorPassword (Row: Icon 14px + Text 12px, 숨김)
.btn-login                   → Button_Login (Primary, 52px, "로그인" + arrow_forward)
.login-footer                → Text_Copyright (13px, #9CA3AF)
```

---

*— C-02 로그인 페이지 구현 가이드 끝 —*
