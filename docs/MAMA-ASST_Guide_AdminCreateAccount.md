# 계정 생성 페이지 — Bubble 구현 가이드

**페이지**: admin-create-account  
**유형**: Type B (Header/Sidebar 없음, 단독 유틸리티 페이지)  
**소요 시간**: 약 20~30분  
**참조 목업**: `admin_create_account_mockup.html`  
**지원 역할**: STUDENT, ACADEMY_ADMIN, INSTRUCTOR(추후)

---

## 1. 이 페이지의 역할

```
B2B 정책: 관리자가 모든 사용자 계정을 직접 생성
→ 학생/강사 모두 자가 회원가입 불가

지원 역할:
  - STUDENT (학생) — 학습 기능 사용
  - ACADEMY_ADMIN (관리자) — 학원 운영 관리
  - INSTRUCTOR (강사) — 추후 업데이트 예정, UI는 미리 준비

이 페이지에서 하는 일:
  1. 관리자가 사용자 정보 입력 (이름, 전화번호, 학년, 역할)
  2. "계정 생성" 클릭 → Bubble "Sign the user up" 으로 계정 생성
  3. 초기 비밀번호 mb1234 자동 설정
  4. 생성 완료 → 토스트 알림 + 하단 목록에 표시
  5. 이어서 다음 사용자 생성 (폼 초기화)

생성된 사용자는 로그인 시:
  → is_first_login = yes → change-password → 역할별 대시보드
```

### 접근 제어

```
MVP 단계: 접근 제어 생략 가능 (URL 직접 접속)
정식 버전: Current User's role = ACADEMY_ADMIN만 접근 허용

★ MVP에서는 이 페이지로 테스트 계정 3개를 생성한 뒤,
  정식 Phase B 때 admin-students 페이지의 Popup으로 통합됩니다.
```

---

## 2. 페이지 생성

### 2.1 새 페이지 만들기

```
Pages → Add a new page
  Page name: admin-create-account
  Page title: 계정 생성 | MAMA-ASST MVP
  Clone from: (없음 또는 login 복사 후 수정)
  Type of content: (비워둠)
```

### 2.2 Page 속성

```
Layout:
  Container layout: Column
  H Alignment: Center
  Apply gap: ✅ (Row gap: 0)
  
Appearance:
  Background: #F9FAFB

Responsive:
  Min width: 320
  Min height: (Fit height to content ✅)
  ★ login과 달리 콘텐츠가 길어질 수 있으므로 스크롤 가능하게
```

---

## 3. 엘리먼트 트리 (전체 구조)

```
Page: admin-create-account
│
├── Group_PageWrapper (Column, Center, max 480px, padding 24px)
│   │
│   ├── Group_Logo (Column, Center)
│   │   ├── Group_LogoIcon (64×64, Primary, Roundness 16)
│   │   │   └── Icon_Logo (person_add, 32px, white)
│   │   ├── Text_PageTitle ("계정 생성")
│   │   └── Text_PageSubtitle ("학원 구성원의 계정을 등록하세요")
│   │
│   ├── Group_Card (Column, 카드 스타일)
│   │   │
│   │   ├── Group_InfoBox (Row, Info 배경)
│   │   │   ├── Icon_Info (info, 18px, #3B82F6)
│   │   │   └── Text_Info ("초기 비밀번호는 mb1234로 자동 설정됩니다...")
│   │   │
│   │   ├── Group_InputName (Column)
│   │   │   ├── Text_LabelName ("이름 *")
│   │   │   ├── Input_Name
│   │   │   └── Group_ErrorName (Row — 기본 숨김)
│   │   │
│   │   ├── Group_InputPhone (Column)
│   │   │   ├── Text_LabelPhone ("전화번호 *")
│   │   │   ├── Input_Phone
│   │   │   └── Group_ErrorPhone (Row — 기본 숨김)
│   │   │
│   │   ├── Group_InputRole (Column)
│   │   │   ├── Text_LabelRole ("역할 *")
│   │   │   └── Dropdown_Role
│   │   │
│   │   ├── Group_InputGrade (Column) ★ Visible when: Dropdown_Role = STUDENT
│   │   │   ├── Text_LabelGrade ("학년 *")
│   │   │   ├── Dropdown_Grade
│   │   │   └── Group_ErrorGrade (Row — 기본 숨김)
│   │   │
│   │   ├── Group_PasswordPreview (Row)
│   │   │   ├── Text_PasswordLabel ("자동 설정")
│   │   │   └── Text_PasswordValue ("mb1234")
│   │   │
│   │   ├── Shape_Divider (1px 구분선)
│   │   │
│   │   └── Button_Create ("계정 생성" + person_add 아이콘)
│   │
│   ├── Group_CreatedSection (Column — 생성된 계정 목록)
│   │   ├── Group_CreatedHeader (Row)
│   │   │   ├── Text_CreatedTitle ("생성된 계정")
│   │   │   └── Text_CreatedCount ("0명")
│   │   └── RG_CreatedAccounts (Repeating Group, text list)
│   │       └── Group_CreatedItem (Row)
│   │           ├── Group_Avatar (40×40, 원형, 이니셜)
│   │           ├── Group_CreatedInfo (Column)
│   │           │   ├── Text_CreatedName
│   │           │   └── Text_CreatedMeta ("전화번호 · 학년 · 비밀번호: mb1234")
│   │           └── Text_CreatedBadge ("학생" / "관리자")
│   │
│   └── Text_Copyright ("© 2025 MAMA-ASST. All rights reserved.")
│
└── RE_Toast (Reusable Element — 이미 만들어져 있음)
```

---

## 4. 엘리먼트 상세 설정

### 4.1 Group_PageWrapper

```
Type: Group
Layout: Column, H Center
Apply gap: ✅ Row gap: 24

Size: Width 100%, Min height: (auto)
Responsive: Min width 320, Max width 480
Padding: 40px 24px (상하 40, 좌우 24)

  모바일 (< 480px): Padding 24px 16px
```

### 4.2 Group_Logo (login과 동일 구조)

#### Group_LogoIcon
```
Size: 64×64, Background: #FF6D4D, Roundness: 16
Shadow: 0px 4px 12px rgba(255,109,77,0.3)
Margin Bottom: 16px
```

#### Icon_Logo
```
Icon: person_add (Material Icons Round)  ★ login의 school, change-password의 lock과 구분
Size: 32px, Color: #FFFFFF
```

#### Text_PageTitle
```
Content: "계정 생성"
Font: Pretendard 24px, Weight 700, Color: #1A2E4D (Navy)
Margin Bottom: 4px

모바일 (< 480px): 22px
```

#### Text_PageSubtitle
```
Content: "학원 구성원의 계정을 등록하세요"
Font: Pretendard 15px, Weight 400, Color: #6B7280
```

### 4.3 Group_Card

```
login과 동일 카드 스타일:
Background: #FFFFFF, Border: 1px solid #E5E7EB
Roundness: 16, Shadow Card
Padding: 32px → 24px (< 480px)
Width: 100%
```

### 4.4 Group_InfoBox (초기 비밀번호 안내) ★

```
Type: Group
Layout: Row, V Alignment: flex-start (Top)
Apply gap: ✅ Column gap: 10

Appearance:
  Background: #EFF6FF (Info BG)
  Border: 1px solid rgba(59,130,246,0.2)
  Roundness: 8

Padding: 12px 16px
Margin Bottom: 24px
```

#### Icon_Info
```
Icon: info, Size: 18px, Color: #3B82F6 (Info)
```

#### Text_Info
```
Content: "초기 비밀번호는 mb1234로 자동 설정됩니다.\n학생은 첫 로그인 시 비밀번호를 변경합니다."
Font: Pretendard 13px, Weight 400
Color: #1E40AF
Line height: 1.5

★ "mb1234" 부분 Bold: Bubble에서는 전체 텍스트 동일 스타일로 OK (MVP)
```

### 4.5 Group_InputName (이름)

```
Type: Group (Column, gap 6)
Size: Width 100%
Margin Bottom: 20px
```

#### Text_LabelName
```
Content: "이름 *"
Font: Pretendard 14px, Weight 500, Color: #1F2937
★ "*" 부분은 빨간색이 이상적이지만, 
  Bubble에서는 "이름" Text + "＊" Text(#EF4444) 두 개로 분리하거나,
  MVP에서는 "이름 *" 통째로 한 Text에 넣어도 OK
```

#### Input_Name
```
Type: Input
Style: Input - Standard
Placeholder: "이름 입력"
Max length: 20
Content format: Text
Size: Width 100%, Min height 48px
Font: 16px, Padding: 12px 16px
```

#### Group_ErrorName
```
Group (Row, V Center, gap 4)
  Icon: error_outline, 14px, #EF4444
  Text: "이름을 입력해주세요", 12px, #EF4444
기본 숨김 + Collapse when hidden
```

### 4.6 Group_InputPhone (전화번호)

```
이름과 동일 구조
```

#### Input_Phone
```
Type: Input
Placeholder: "01012345678"
Content format: Text
Max length: 13
Size: Width 100%, Min height 48px
```

#### Group_ErrorPhone
```
Text: "전화번호를 입력해주세요" (기본)
★ 검증 종류에 따라 텍스트 변경:
  - 빈값: "전화번호를 입력해주세요"
  - 형식 오류: "올바른 전화번호 형식이 아닙니다"
  - 중복: "이미 등록된 전화번호입니다" (Bubble에서 Sign up 실패 시)
```

### 4.7 Group_InputRole (역할 선택)

```
Type: Group
Layout: Column
Size: Width 100%
Margin Bottom: 20px
```

#### Text_LabelRole
```
Content: "역할"
Font: Pretendard 14px, Weight 500, Color: #374151
★ Required 표시: " *" (빨강 #EF4444)
```

#### Dropdown_Role
```
Type: Dropdown
Choices: Static (또는 Option Set: UserRole)
  학생 (value: STUDENT)
  관리자 (value: ACADEMY_ADMIN)
  강사 (value: INSTRUCTOR) ★ 추후 활성화 예정

Default: 학생 (STUDENT)
Size: Width 100%, Min height 48px
Font: 16px
Roundness: 8

★ MVP에서 강사 선택 시:
  계정은 생성되지만 전용 대시보드가 아직 없으므로
  로그인 후 student-dashboard로 임시 라우팅 (또는 접근 불가 안내)
  Phase B 이후 instructor-dashboard 추가 시 정상 라우팅
```

### 4.8 Group_InputGrade (학년 선택 — 조건부 표시) ★★★

```
Type: Group
Layout: Column
Size: Width 100%
Margin Bottom: 20px

★★★ Conditional Visibility:
  This element is visible when:
    Dropdown_Role's value is "STUDENT"

  → 역할이 관리자/강사일 때 자동으로 숨겨짐
  → Bubble에서 "Collapse when hidden" 체크 ✅
     (아래 비밀번호 표시가 자연스럽게 올라옴)
```

#### Text_LabelGrade
```
Content: "학년"
Font: Pretendard 14px, Weight 500, Color: #374151
★ Required 표시: " *" (빨강 #EF4444) — 보일 때만 필수
```

#### Dropdown_Grade ★
```
Type: Dropdown
Type of choices: GradeLevel (Option Set)

★★★ Option caption: Current option's School_Level
  → "E1" 대신 "초1" 한글로 표시
  → School_Level attribute에 한글 학년명 저장 필요

Placeholder: "학년 선택"
Size: Width 100%, Min height 48px
Font: 16px
Roundness: 8

★ GradeLevel Option Set 구조:
  | Display | Grade_order | School_Level |
  |---------|-------------|--------------|
  | E1      | 1           | 초1          |
  | E2      | 2           | 초2          |
  | ...     | ...         | ...          |
  | H3      | 12          | 고3          |
  
  Sort by: Grade_order (오름차순)
```

### 4.9 Group_PasswordPreview (초기 비밀번호 표시)

```
Type: Group
Layout: Row, Space between, V Center

Appearance:
  Background: #F9FAFB (Background)
  Border: 1px solid #E5E7EB
  Roundness: 8

Padding: 12px 16px
Margin Bottom: 20px → 24px (divider 포함)
```

#### Text_PasswordLabel
```
Content: "자동 설정"
Font: Pretendard 14px, Weight 400, Color: #6B7280
```

#### Text_PasswordValue
```
Content: "mb1234"
Font: Pretendard 16px (또는 JetBrains Mono 16px), Weight 600
Color: #1F2937
Letter spacing: 4px
```

### 4.10 Shape_Divider

```
Type: Shape (Rectangle) 또는 Group
Height: 1px
Background: #E5E7EB
Width: 100%
Margin: 24px 0 (위아래)

★ Bubble에서 구분선: Shape 요소 또는 HTML element로 <hr> 사용
```

### 4.11 Button_Create ★

```
Type: Button
Style: Button - Primary

Content: "계정 생성"

Appearance:
  Background: #FF6D4D, Hover: #E5573D
  Font: Pretendard 16px, Weight 700, #FFFFFF
  Roundness: 12, Min height: 52px
  Width: 100%

아이콘:
  Icon: person_add, 20px, #FFFFFF
  Position: Left of the label
```

### 4.12 Group_CreatedSection (생성된 계정 목록)

```
Type: Group
Layout: Column

★ 기본 숨김:
  This element is visible on page load: 체크 해제
  Conditional: 
    When state_created_accounts:count > 0 → Visible ✅
```

#### Text_CreatedTitle
```
Content: "생성된 계정"
Font: Pretendard 16px, Weight 600, Color: #1A2E4D
```

#### Text_CreatedCount
```
Content: state_created_accounts:count 값 + "명"
Font: Pretendard 13px, Color: #9CA3AF

Dynamic data: admin-create-account's state_created_accounts:count
  :formatted as → 숫자 + "명"
```

#### RG_CreatedAccounts (생성된 계정 목록)

```
Type: Repeating Group
Type of content: text
Data source: admin-create-account's state_created_accounts

Layout: Column
Rows per page: 20

★ 핵심: text list를 데이터소스로 사용
  각 셀의 값: "이름|전화번호|학년표시|역할코드"
  → 구분자 "|"로 split하여 각 필드 표시
```

#### Group_CreatedItem (각 항목)

```
Type: Group (Row, V Center, gap 12)
Padding: 14px 16px
Background: #FFFFFF
Border: 1px solid #E5E7EB
Roundness: 12

★ 텍스트 파싱 방법 (Bubble):
  Current cell's text:split by("|"):item #1  → 이름
  Current cell's text:split by("|"):item #2  → 전화번호
  Current cell's text:split by("|"):item #3  → 학년 (빈 문자열 가능)
  Current cell's text:split by("|"):item #4  → 역할코드
```

#### Group_Avatar (이니셜 원형)
```
Size: 40×40 (fixed)
Roundness: 50%

Text: Current cell's text:split by("|"):item #1:truncated to 1
  → 이름 첫 글자, 15px, Bold, White

Background (Conditional):
  When Current cell's text contains "STUDENT":
    → #FF6D4D (Primary)
  When Current cell's text contains "ACADEMY_ADMIN":
    → #1A2E4D (Navy)
  When Current cell's text contains "INSTRUCTOR":
    → #22C55E (Success)
```

#### Text_CreatedName
```
Font: Pretendard 14px, Weight 600, Color: #1F2937
Dynamic: Current cell's text:split by("|"):item #1
```

#### Text_CreatedMeta
```
Font: Pretendard 12px, Color: #9CA3AF
Dynamic: Current cell's text:split by("|"):item #2
         (학년이 있으면) " · " + :item #3
         " · 비밀번호: mb1234"

★ Bubble 표현식 (학생일 때):
  Current cell's text:split by("|"):item #2
  " · "
  Current cell's text:split by("|"):item #3
  " · 비밀번호: mb1234"

★ Bubble 표현식 (관리자/강사일 때):
  학년(:item #3)이 빈 문자열 → " · " + 학년 부분 생략
  
  팁: Conditional로 분기하거나, 
      :item #3 is not empty → " · " + :item #3 추가
```

#### Text_CreatedBadge
```
Font: Pretendard 11px, Weight 500
Padding: 4px 8px
Roundness: 6

★ Conditional 기반 표시:
  When Current cell's text contains "STUDENT":
    Text: "학생", Background: #FF6D4D, Color: #FFFFFF
  When Current cell's text contains "ACADEMY_ADMIN":
    Text: "관리자", Background: #1A2E4D, Color: #FFFFFF
  When Current cell's text contains "INSTRUCTOR":
    Text: "강사", Background: #22C55E, Color: #FFFFFF
```

### 4.13 Text_Copyright

```
Content: "© 2025 MAMA-ASST. All rights reserved."
Font: Pretendard 13px, Color: #9CA3AF
```

---

## 5. Custom State

```
Page: admin-create-account에 Custom State 추가:

1. state_name_error (type: yes/no, default: no)

2. state_phone_error (type: yes/no, default: no)

3. state_grade_error (type: yes/no, default: no)

4. state_loading (type: yes/no, default: no)

5. state_created_accounts (type: text, list: yes, default: empty)
   → 이 세션에서 생성한 계정 정보를 텍스트로 저장
   → 형식: "이름|전화번호|학년표시|역할코드"
   → 예: "테스트학생A|01011110000|초1|STUDENT"
   → 예: "테스트관리자|01099990000||ACADEMY_ADMIN"
   
   ★ User list 대신 text list를 사용하는 이유:
     Sign the user up → 자동 로그인 → Log the user out 과정에서
     Privacy Rules에 의해 다른 User 데이터 접근이 차단됨.
     텍스트로 저장하면 Privacy Rules 영향을 받지 않음.
```

### Conditional

#### Input_Name 에러 스타일
```
When state_name_error is yes:
  → Border: #EF4444, Background: #FEF2F2
```

#### Input_Phone 에러 스타일
```
When state_phone_error is yes:
  → Border: #EF4444, Background: #FEF2F2
```

#### Dropdown_Grade 에러 스타일
```
When state_grade_error is yes:
  → Border: #EF4444, Background: #FEF2F2
```

#### Group_ErrorName / Group_ErrorPhone / Group_ErrorGrade
```
When 해당 state is yes → Visible ✅
```

#### Button_Create 로딩
```
When state_loading is yes:
  → Background: rgba(255,109,77,0.7)
  → Not clickable: ✅
  → Text: "생성 중..."
```

#### Group_CreatedSection 표시
```
When state_created_accounts:count > 0:
  → Visible ✅
```

---

## 6. Workflow (핵심) ★★★

### WF-1: Button_Create 클릭

```
Event: When Button_Create is clicked

── Step 1: 에러 전체 초기화
   Action: Set state of admin-create-account
     state_name_error = no
     state_phone_error = no
     state_grade_error = no

── Step 2: 이름 빈값 검증
   Action: Set state → state_name_error = yes
   Only when: Input_Name's value is empty

── Step 3: 전화번호 빈값 검증
   Action: Set state → state_phone_error = yes
   Only when: Input_Phone's value is empty

── Step 4: 학년 미선택 검증 (학생일 때만)
   Action: Set state → state_grade_error = yes
   Only when: Dropdown_Role's value is STUDENT
              AND Dropdown_Grade's value is empty

── Step 5: 모든 검증 통과 시 → 로딩 시작
   Action: Set state → state_loading = yes
   Only when: Input_Name's value is not empty
              AND Input_Phone's value is not empty
              AND (Dropdown_Role's value is not STUDENT
                   OR Dropdown_Grade's value is not empty)

── Step 6: 계정 생성 ★★★
   Only when: (Step 5와 동일 조건)
   Action: Sign the user up
     Email: Input_Phone's value:find & replace(Find:"-", Replace by:""):append"@mama.app"
     Password: "mb1234"

── Step 7: 유저 정보 설정
   Action: Make changes to Current User
     phone          = Input_Phone's value:find & replace(Find:"-", Replace by:"")
     name           = Input_Name's value
     role           = Dropdown_Role's value
     is_first_login = yes
     status         = ACTIVE
     academy_id     = (MVP: 비워둠 또는 하드코딩)
   
   ★ grade는 User에 없음! → Step 8에서 StudentProfile로 저장

── Step 8: StudentProfile 생성 (학생일 때만) ★★★ NEW
   Only when: Dropdown_Role's value is "STUDENT"
   Action: Create a new thing → StudentProfile
     user_id  = Current User
     grade    = Dropdown_Grade's value  (GradeLevel Option Set)
   
   ★ 반드시 Log the user out 전에 실행!
     로그아웃하면 Current User 참조가 불가능해짐
   
   ★ 관리자/강사 선택 시: 이 Step은 자동으로 건너뜀 (Only when 조건)
     → InstructorProfile은 Phase B에서 별도 생성

── Step 9: 생성 목록에 추가 (텍스트로 저장) ★★★ 변경
   Action: Set state of admin-create-account
     state_created_accounts add
       Input_Name's value
       :append "|"
       :append Input_Phone's value:find & replace(Find:"-", Replace by:"")
       :append "|"
       :append Dropdown_Grade's value's School_Level (학생일 때) 또는 "" (빈값)
       :append "|"
       :append Dropdown_Role's value
   
   ★ 결과 예시: "테스트학생A|01011110000|초1|STUDENT"
   ★ 결과 예시: "테스트관리자|01099990000||ACADEMY_ADMIN"
   
   ★ Bubble 표현식 팁:
     학년 부분은 Conditional을 사용하거나:
     Dropdown_Role's value is STUDENT
       → Dropdown_Grade's value's School_Level
     Dropdown_Role's value is not STUDENT
       → "" (빈 문자열)

── Step 10: 로그아웃 ★★★
   Action: Log the user out
   (← Sign the user up 시 자동 로그인됨, 다음 계정 생성을 위해 즉시 로그아웃)

── Step 11: 로딩 해제
   Action: Set state → state_loading = no

── Step 12: 토스트 표시
   Action: Show RE_Toast
     (또는 Custom State로 토스트 텍스트 설정 후 표시)
     메시지: "[이름] [역할] 계정이 생성되었습니다"
     예) "테스트학생A 학생 계정이 생성되었습니다"

── Step 13: 폼 초기화
   Action: Reset inputs
   (← Bubble 내장 Action, 모든 Input/Dropdown을 초기 상태로)
   ★ Reset inputs 후 Dropdown_Role도 기본값(STUDENT)으로 복원
   → Group_InputGrade Conditional이 자동으로 학년 다시 표시
```

> ⚠️ **Step 10 (Log the user out)가 가장 중요합니다!**  
> "Sign the user up"은 새 계정을 만들면서 **자동으로 그 계정으로 로그인**합니다.  
> 로그아웃하지 않으면 관리자가 아닌 방금 생성한 계정으로 남게 됩니다.  
> 연속 계정 생성을 위해 반드시 로그아웃 필요.

> ⚠️ **Step 8~9의 타이밍 주의**:  
> StudentProfile 생성(Step 8)과 state 추가(Step 9)는 반드시 Log the user out(Step 10) 전에!  
> 로그아웃 후에는 Current User 참조가 불가능하므로.

> ⚠️ **text list를 사용하는 이유 (Privacy Rules 회피)**:  
> Sign the user up → 새 계정으로 자동 로그인 → Log the user out 과정에서  
> 이전에 생성한 User 데이터에 대한 접근이 Privacy Rules에 의해 차단됩니다.  
> text list로 표시 정보만 저장하면 이 문제를 완전히 회피할 수 있습니다.

### WF-2: Sign the user up 실패 처리

```
Event: When Signup results in an error
       (← 이미 존재하는 이메일로 가입 시도 시 트리거)

── Step 1: 로딩 해제
   Action: Set state → state_loading = no

── Step 2: 전화번호 에러 표시 (중복)
   Action: Set state → state_phone_error = yes

★ 에러 메시지를 "이미 등록된 전화번호입니다"로 변경하려면:
  추가 Custom State state_phone_error_text (text) 사용
  또는 MVP에서는 기본 에러 메시지 "전화번호를 입력해주세요"로 통일
```

### WF-3: Input 포커스 시 에러 초기화

```
Event: When Input_Name is focused
── Set state → state_name_error = no

Event: When Input_Phone is focused
── Set state → state_phone_error = no

Event: When Dropdown_Grade is changed (또는 focused)
── Set state → state_grade_error = no
```

### WF-4: 역할 변경 시 학년 표시/숨김 ★★★

```
Event: When Dropdown_Role's value is changed

★ Bubble에서는 Conditional Visibility로 자동 처리:
  Group_InputGrade:
    This element is visible when:
      Dropdown_Role's value is "STUDENT"
    Collapse when hidden: ✅

  → Workflow 대신 Conditional 하나로 해결!

추가 처리 (Workflow):
── Step 1: 학년 초기화 (역할이 학생이 아닐 때)
   Action: Reset Dropdown_Grade
   Only when: Dropdown_Role's value is not "STUDENT"

── Step 2: 학년 에러 초기화
   Action: Set state → state_grade_error = no
   Only when: Dropdown_Role's value is not "STUDENT"
```

---

## 7. Dropdown 선택지 상세

### Dropdown_Grade (학년)

```
★ Option Set: GradeLevel (이미 생성됨)

  | Display | Grade_order | School_Level |
  |---------|-------------|--------------|
  | E1      | 1           | 초1          |
  | E2      | 2           | 초2          |
  | E3      | 3           | 초3          |
  | E4      | 4           | 초4          |
  | E5      | 5           | 초5          |
  | E6      | 6           | 초6          |
  | M1      | 7           | 중1          |
  | M2      | 8           | 중2          |
  | M3      | 9           | 중3          |
  | H1      | 10          | 고1          |
  | H2      | 11          | 고2          |
  | H3      | 12          | 고3          |

Dropdown 설정:
  Type of choices: GradeLevel
  Option caption: Current option's School_Level  ★ 핵심!
  Sort by: Grade_order (Ascending)
  
  → 드롭다운에 "초1, 초2, ... 고3" 한글 표시
  → 저장되는 값: GradeLevel Option 자체 (내부적으로 E1 등)
```

### Dropdown_Role (역할)

```
Option Set: UserRole (이미 존재할 수 있음)

  | Display   | Value         | 비고 |
  |-----------|---------------|------|
  | 학생      | STUDENT       | 학습 기능 |
  | 관리자    | ACADEMY_ADMIN | 학원 운영 |
  | 강사      | INSTRUCTOR    | 추후 업데이트 |

Default: STUDENT
```

---

## 8. 반응형

```
Group_PageWrapper: Max width 480px, Padding 40px 24px
Group_Card: Padding 32px → 24px (< 480px)
Text_PageTitle: 24px → 22px (< 480px)
Group_InputGrade: Collapse when hidden (역할 변경 시 자연스러운 레이아웃)
Button_Create: Width 100%
Input, Dropdown: Width 100%
```

---

## 9. 테스트 체크리스트

```
□ 1. 정상 생성 — 이름 + 전화번호 + 학년 입력 후 "계정 생성"
     → 토스트 "○○○ 학생 계정이 생성되었습니다" 표시되는가?
     → 하단 생성 목록에 추가되는가?
     → Data 탭: StudentProfile 생성되었는가? (grade = 선택한 학년)

□ 2. 관리자 생성 — 역할 "관리자" 선택 시
     → 학년 필드가 숨겨지는가?
     → 학년 없이 정상 생성되는가?
     → 토스트 "○○○ 관리자 계정이 생성되었습니다" 표시되는가?
     → Data 탭: StudentProfile이 생성되지 않았는가? ★

□ 3. 학년 Dropdown 표시 — 학년 드롭다운 클릭
     → "초1, 초2, ... 고3" 한글로 표시되는가? (E1, E2가 아닌)

□ 4. 빈값 검증 — 이름 비움
     → "이름을 입력해주세요" 표시되는가?

□ 5. 빈값 검증 — 전화번호 비움
     → "전화번호를 입력해주세요" 표시되는가?

□ 6. 빈값 검증 — 학년 미선택 (학생일 때)
     → "학년을 선택해주세요" 표시되는가?

□ 7. 중복 전화번호 — 이미 생성한 전화번호로 재생성 시도
     → Sign up 에러 → 에러 표시되는가?

□ 8. 연속 생성 — 1번째 생성 후 바로 2번째 생성
     → 로그아웃 후 폼 초기화되어 다음 계정 생성 가능한가?
     → 생성 목록에 2명 모두 표시되는가? (Privacy Rules 문제 없는가?)

□ 9. 생성 후 로그인 테스트 — /login에서 방금 생성한 계정으로 로그인
     → 01011110000 / mb1234 → change-password로 이동하는가?

□ 10. 강사 계정 생성 — 역할을 "강사"로 변경 후 생성
     → role = INSTRUCTOR로 저장되는가?
     → 학년 필드가 숨겨져 있는가?
     → Data 탭: StudentProfile이 생성되지 않았는가? ★
     → 뱃지가 초록색으로 표시되는가?

□ 11. 역할 전환 — 학생→관리자→강사→학생 순서로 변경
     → 학년 필드가 학생일 때만 나타나는가?
     → 관리자/강사 선택 시 학년이 부드럽게 사라지는가?

□ 12. 로딩 상태 — 생성 버튼 클릭 시
     → "생성 중..." + 로딩 스피너 표시되는가?
     → 중복 클릭 방지되는가?

□ 13. 생성 목록 — 카운트 정확한가? (n명 표시)
```

### MVP 테스트 계정 생성 순서

```
이 페이지에서 아래 4개 계정을 순서대로 생성:

1차) 이름: 테스트학생A | 전화번호: 01011110000 | 학년: 중1 | 역할: 학생
2차) 이름: 테스트학생B | 전화번호: 01022220000 | 학년: 중2 | 역할: 학생
3차) 이름: 테스트관리자 | 전화번호: 01099990000 | 학년: (미선택) | 역할: 관리자
4차) 이름: 테스트강사  | 전화번호: 01088880000 | 학년: (미선택) | 역할: 강사

모든 계정의 초기 비밀번호: mb1234
생성 완료 후 → /login에서 각 계정 로그인 테스트
```

---

## 10. Data 탭 검증

```
계정 생성 후 Bubble Data 탭에서 확인:

App Data → All Users 검색:

| email                  | phone       | name       | role          | is_first_login | status |
|------------------------|-------------|------------|---------------|----------------|--------|
| 01011110000@mama.app   | 01011110000 | 테스트학생A | STUDENT       | yes            | ACTIVE |
| 01022220000@mama.app   | 01022220000 | 테스트학생B | STUDENT       | yes            | ACTIVE |
| 01099990000@mama.app   | 01099990000 | 테스트관리자 | ACADEMY_ADMIN | yes            | ACTIVE |
| 01088880000@mama.app   | 01088880000 | 테스트강사  | INSTRUCTOR    | yes            | ACTIVE |

★ password는 Data 탭에서 확인 불가 (정상)
★ email이 "전화번호@mama.app" 형태인지 확인

App Data → All StudentProfiles 검색:

| user_id (→User)      | grade (→GradeLevel) |
|-----------------------|---------------------|
| 테스트학생A            | E1 (School_Level: 중1) |
| 테스트학생B            | E2 (School_Level: 중2) |

★ 학생 계정에만 StudentProfile이 생성되어야 함
★ 관리자/강사 계정에는 StudentProfile이 없어야 정상
★ grade 필드가 GradeLevel Option Set 값인지 확인
```

---

## 11. 완성 후 다음 단계

```
계정 생성 → login 테스트 → change-password 테스트

이 페이지는 MVP 테스트 이후:
  → Phase B (Day 8) admin-students 페이지의 
    "구성원 추가" Popup으로 통합될 예정
  → 그때까지는 이 독립 페이지를 계속 사용 가능
```

---

## 부록: 목업 ↔ Bubble 엘리먼트 매핑 요약

```
목업 HTML                       → Bubble Element
──────────────────────────────────────────────────────────────
.page-wrapper                    → Group_PageWrapper (Column, Center, max 480px)
.logo-area                       → Group_Logo (Column, Center)
.logo-icon                       → Group_LogoIcon (64×64, #FF6D4D, Roundness 16)
.logo-icon > span                → Icon_Logo (person_add, 32px, white)
h1.logo-title                    → Text_PageTitle (24px, Bold, #1A2E4D)
p.logo-subtitle                  → Text_PageSubtitle (15px, #6B7280)
.card                            → Group_Card (Column, Surface, Roundness 16)
.info-box                        → Group_InfoBox (Row, #EFF6FF BG)
.info-box > icon                 → Icon_Info (info, 18px, #3B82F6)
.info-box > p                    → Text_Info (13px, #1E40AF)
.form-group (name)               → Group_InputName (Column, gap 6, mb 20)
.form-label (name)               → Text_LabelName (14px, Weight 500, "이름 *")
#nameInput                       → Input_Name (Text, "이름 입력")
.form-error (name)               → Group_ErrorName (Row, 숨김)
.form-group (phone)              → Group_InputPhone (Column, gap 6, mb 20)
#phoneInput                      → Input_Phone (Text, "01012345678")
.form-error (phone)              → Group_ErrorPhone (Row, 숨김)
.form-group (role)               → Group_InputRole (Column, mb 20)
#roleSelect                      → Dropdown_Role (STUDENT / ACADEMY_ADMIN / INSTRUCTOR)
#gradeGroup                      → Group_InputGrade (Column, ★ Visible when Role=STUDENT, Collapse)
#gradeSelect                     → Dropdown_Grade (12 choices, "학년 선택")
.form-error (grade)              → Group_ErrorGrade (Row, 숨김)
.password-preview                → Group_PasswordPreview (Row, BG, "mb1234")
.divider                         → Shape_Divider (1px, #E5E7EB)
.btn-primary                     → Button_Create (Primary, 52px, person_add + "계정 생성")
.created-section                 → Group_CreatedSection (Column, 숨김)
.created-header                  → Group_CreatedHeader (Row, Space between)
.created-title                   → Text_CreatedTitle (16px, Weight 600, Navy)
.created-count                   → Text_CreatedCount (13px, Tertiary, "n명")
.created-list                    → RG_CreatedAccounts (Repeating Group, text list)
.created-item                    → Group_CreatedItem (Row, V Center, gap 12)
.created-avatar                  → Group_Avatar (40×40, 원형, 이니셜)
.created-name                    → Text_CreatedName (14px, Weight 600)
.created-meta                    → Text_CreatedMeta (12px, Tertiary)
.created-badge                   → Text_CreatedBadge (11px, Weight 500, pill)
.toast                           → RE_Toast
.page-footer                     → Text_Copyright (13px, #9CA3AF)
```

---

*— 계정 생성 페이지 구현 가이드 끝 —*
