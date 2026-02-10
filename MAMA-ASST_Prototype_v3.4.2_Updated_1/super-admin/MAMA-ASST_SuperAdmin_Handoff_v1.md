# MAMA-ASST 슈퍼어드민 프로토타입 핸드오프 문서

**작성일:** 2025-01-12  
**버전:** v1.0  
**상태:** Phase 5 완료, Phase 6 계획 수립 완료

---

## 1. 프로젝트 개요

### 1.1 MAMA-ASST란?
AI 기반 B2B SaaS 학원 관리 플랫폼으로, 학생 관리, AI 학습 도우미(국어/영어/수학), 성향검사, 상담 관리, 결제 처리 등을 통합 제공합니다.

### 1.2 슈퍼어드민 인터페이스
플랫폼 전체를 관리하는 최상위 관리자 인터페이스입니다.
- **목적:** 다중 학원 관리, 플랫폼 운영, 매출/정산, 시스템 설정
- **대상 사용자:** MAMA-ASST 운영팀, 슈퍼관리자

---

## 2. 디자인 시스템

### 2.1 슈퍼어드민 전용 컬러
```css
/* Primary - Deep Purple (일반 Admin과 구분) */
--super-primary: #6366F1;
--super-primary-dark: #4F46E5;
--super-primary-light: #A5B4FC;

/* 사이드바 */
--sidebar-bg: linear-gradient(from-slate-900 to-slate-800);

/* 과목별 컬러 (기존 유지) */
--korean: #4285F4;
--english: #34A853;
--math: #FBBC05;
```

### 2.2 공통 디자인 요소
- **폰트:** Pretendard
- **Border Radius:** 12px (카드), 8px (버튼, 입력)
- **그림자:** `shadow-sm`, `shadow-lg` (Tailwind)
- **차트:** Chart.js

---

## 3. 완료된 작업 (Phase 1-5)

### 3.1 파일 위치
```
/mnt/user-data/outputs/super/
├── super-dashboard.html    (34.9KB) - SA-01 플랫폼 대시보드
├── super-academies.html    (63.5KB) - SA-02 학원 관리
├── super-inquiries.html    (52.5KB) - SA-03 도입 문의 관리
├── super-contents.html     (68.6KB) - SA-04 콘텐츠 마스터 관리
├── super-users.html        (43.9KB) - SA-05 사용자 관리
├── super-payments.html     (49.9KB) - SA-06 결제/정산 관리
├── super-ai-usage.html     (37.0KB) - SA-07 AI 모니터링
├── super-settings.html     (45.4KB) - SA-08 시스템 설정
├── super-notices.html      (36.8KB) - SA-09 공지사항
└── super-logs.html         (31.0KB) - SA-10 로그/감사
```

**총 10개 페이지, 약 464KB**

### 3.2 각 페이지 상세

#### SA-01: 플랫폼 대시보드 (`super-dashboard.html`)
- 핵심 KPI 카드 (전체 학원 127개, 총 매출 ₩48.2M, 활성 학생 4,823명, AI 호출 42,350건)
- 월별 매출/성장 추이 차트 (Chart.js)
- 최근 도입 문의 목록
- 주의 필요 학원 목록
- 실시간 활동 로그

#### SA-02: 학원 관리 (`super-academies.html`)
- 학원 목록 테이블 (6개 샘플 데이터)
- **학원 상세 모달** (5개 탭: 기본정보/구독정보/운영현황/결제내역/활동로그)
- **학원 수동 등록 모달**
- 상태 필터, 검색 기능

#### SA-03: 도입 문의 관리 (`super-inquiries.html`)
- 파이프라인 요약 카드 (전체 47건, 신규 12건, 연락중 8건, 데모 5건, 협상 3건, 계약 19건)
- 문의 목록 테이블
- **문의 상세 모달** (기본정보, 상담 히스토리, 데모/미팅 일정)
- 상태별 필터, 담당자 필터

#### SA-04: 콘텐츠 마스터 관리 (`super-contents.html`)
- 콘텐츠 통계 카드 (전체 2,335개, 국어 245개, 영어 1,200개, 수학 890개)
- AI 처리 현황 대시보드
- 과목별 탭 (국어/영어/수학)
- **CSV 업로드 모달**
- 콘텐츠 목록 테이블

#### SA-05: 사용자 관리 (`super-users.html`)
- 사용자 통계 카드 (전체 5,847명, 학생/학부모/강사/관리자)
- 사용자 목록 테이블
- **사용자 상세 모달** (기본정보, 소속 학원, 활동 내역)
- 역할별 필터, 학원별 필터

#### SA-06: 결제/정산 관리 (`super-payments.html`)
- 핵심 KPI (이번 달 매출 ₩48.2M, 미수금 ₩2.15M, 환불 ₩320K, 정산 예정 ₩45.76M)
- 4개 탭: 학원별 매출 / 월별 추이 / 결제 내역 / 정산 내역
- 매출 추이 차트

#### SA-07: AI 모니터링 (`super-ai-usage.html`)
- 핵심 KPI (오늘 API 호출 42,350건, 이번 달 비용 $1,234, 평균 응답시간 0.8s, 성공률 99.7%)
- 시간대별 API 호출량 차트
- 용도별 사용량 도넛 차트
- 모델별 상세 (Flash/Pro)
- 프롬프트별 사용 현황 테이블
- 최근 오류 로그

#### SA-08: 시스템 설정 (`super-settings.html`)
- 5개 설정 탭:
  - 일반 설정 (플랫폼 정보, 학습 기본값, 기능 ON/OFF)
  - 요금제 설정 (Basic ₩3,000 / Pro ₩5,000 / Enterprise ₩6,000)
  - API 설정 (Gemini / NCP SENS / 결제선생)
  - 알림 설정
  - 보안 설정 (로그인 잠금, 세션 타임아웃, 슈퍼관리자 관리)

#### SA-09: 공지사항 (`super-notices.html`)
- 통계 카드 (전체 24개, 게시 중 18개, 상단 고정 3개, 임시저장 3개)
- 공지 목록 테이블 (유형: 공지/업데이트/점검/이벤트/긴급)
- **새 공지 작성 모달**

#### SA-10: 로그/감사 (`super-logs.html`)
- 통계 카드 (오늘 로그 45,230건, 오류 23건, 경고 156건, 보안 이벤트 8건)
- 4개 탭: 활동 로그 / API 로그 / 오류 로그 / 보안 로그
- 활동 로그 샘플 (7개 항목)
- 로그 레벨 색상 구분 (ERROR/WARNING/INFO/SUCCESS)

---

## 4. Phase 6 계획 (상세 기능 구현)

### 4.1 현황
- **완료:** 각 페이지의 기본 UI, 일부 모달 구현
- **미완료:** 클릭 시 동작하는 상세 기능 (상태 변경, 편집, 삭제 확인 등)

### 4.2 Phase 6-1: 비즈니스 핵심 (우선순위 높음)

**super-academies.html 추가 기능:**
| 기능 | 설명 |
|------|------|
| 구독 플랜 변경 모달 | Basic → Pro → Enterprise 변경, 적용일 선택 |
| 학원 정지 확인 모달 | 정지 사유 입력, 정지 기간 설정 |
| 관리자 메모 추가/수정 | 학원 상세 내 메모 CRUD |
| 학원 삭제 확인 모달 | 위험 동작 2단계 확인 |

**super-inquiries.html 추가 기능:**
| 기능 | 설명 |
|------|------|
| 상태 변경 동작 | 신규→연락중→데모→협상→계약/종료 전이 |
| 담당자 배정 | 드롭다운에서 담당자 선택 |
| 데모 일정 설정 | 캘린더 UI로 일정 선택 |
| 상담 히스토리 추가 모달 | 상담 내용 입력, 다음 액션 선택 |
| 학원 등록 전환 모달 | 계약 완료 → 학원 생성 원클릭 |

**예상 작업량:** 약 10개 모달/기능

### 4.3 Phase 6-2: 운영 핵심

**super-payments.html 추가 기능:**
- 학원별 결제 상세 모달
- 정산서 상세 뷰 (PDF 미리보기 스타일)
- 환불 처리 모달
- 수동 청구서 발행 모달

**super-contents.html 추가 기능:**
- 콘텐츠 상세/편집 모달
- AI 재처리 확인 모달
- 삭제 확인 모달
- 일괄 상태 변경 (선택된 콘텐츠 승인/반려)

**예상 작업량:** 약 8개 모달/기능

### 4.4 Phase 6-3: 관리 기능

**super-users.html 추가 기능:**
- 비밀번호 초기화 확인 모달 (SMS 발송 포함)
- 학원 이동 모달
- 계정 정지 모달 (사유, 기간 설정)
- 계정 삭제 확인 모달
- 역할별 필터 클릭 시 테이블 필터 동작

**super-ai-usage.html 추가 기능:**
- 프롬프트 상세 모달 (프롬프트 내용, 사용 통계, 수정)
- 오류 로그 상세 모달 (요청/응답 데이터, 재시도)
- 월간 예산 설정 모달
- Rate Limit 조정 모달

**예상 작업량:** 약 8개 모달/기능

### 4.5 Phase 6-4: 시스템 기능

**super-settings.html 추가 기능:**
- 요금제 수정 모달
- API 키 표시/재발급 (마스킹 해제, 복사 버튼)
- 슈퍼관리자 추가/편집 모달
- 설정 저장 시 토스트 알림

**super-notices.html 추가 기능:**
- 공지 상세 모달 (조회수, 학원별 열람 현황)
- 공지 편집 모달
- 삭제 확인 모달
- 미리보기 기능

**super-logs.html 추가 기능:**
- 로그 상세 모달 (전체 데이터, JSON 뷰)
- API 로그 탭 콘텐츠 채우기
- 오류 로그 탭 콘텐츠 채우기
- 보안 로그 탭 콘텐츠 채우기
- 로그 내보내기 기능 (CSV)

**예상 작업량:** 약 10개 모달/기능

---

## 5. 관련 파일 경로

### 5.1 슈퍼어드민 프로토타입
```
/mnt/user-data/outputs/super/
```

### 5.2 일반 어드민 프로토타입 (참고용)
```
/mnt/user-data/outputs/admin/
```
- 17개 페이지 완료
- 슈퍼어드민과 디자인 패턴 공유

### 5.3 기존 학생/강사 프로토타입 (참고용)
```
/home/claude/mama-asst-prototype/mama-asst-prototype/
```

### 5.4 프로젝트 문서
```
/mnt/project/
├── MAMA-ASST_DesignGuide_v3_1.docx
├── MAMA-ASST_Master_v3_1.docx
├── MAMA-ASST_Pipeline_v3_1.docx
├── MAMA-ASST_ScreenSpec_v3_3_Auth.docx
└── ... (기타 문서)
```

---

## 6. 다음 작업 시작 방법

### 6.1 새 채팅에서 시작할 때 프롬프트 예시

```
슈퍼어드민 프로토타입 Phase 6-1 작업을 시작하려고 합니다.

현재 상태:
- 10개 페이지 기본 UI 완료 (/mnt/user-data/outputs/super/)
- Phase 6-1: 학원 관리 + 도입 문의 상세 기능 구현 필요

작업 내용:
1. super-academies.html에 구독 플랜 변경 모달, 학원 정지 모달, 삭제 확인 모달 추가
2. super-inquiries.html에 상태 변경 동작, 상담 히스토리 추가, 학원 전환 모달 추가

기존 파일을 확인하고 Phase 6-1 구현을 진행해주세요.
```

### 6.2 확인 사항
1. `/mnt/user-data/outputs/super/` 디렉토리에 10개 파일 존재 확인
2. 각 파일의 기존 모달 구조 확인 (일관성 유지)
3. Phase 6-1부터 순차 진행

---

## 7. 기술 참고사항

### 7.1 모달 구현 패턴 (기존 코드 참고)
```html
<!-- 모달 기본 구조 -->
<div id="modalId" class="fixed inset-0 z-50 hidden">
  <div class="fixed inset-0 bg-black/50" onclick="closeModal('modalId')"></div>
  <div class="fixed inset-0 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
      <!-- 헤더 -->
      <div class="p-6 border-b">...</div>
      <!-- 본문 -->
      <div class="p-6 overflow-y-auto">...</div>
      <!-- 푸터 -->
      <div class="p-6 border-t bg-gray-50">...</div>
    </div>
  </div>
</div>
```

### 7.2 토스트 알림 패턴
```javascript
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 
    ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
```

### 7.3 확인 모달 패턴 (위험 동작용)
```html
<!-- 2단계 확인: 체크박스 + 버튼 -->
<label class="flex items-center gap-2 text-sm text-gray-600">
  <input type="checkbox" id="confirmCheck" onchange="toggleDeleteBtn()">
  위 내용을 확인했으며, 삭제에 동의합니다.
</label>
<button id="deleteBtn" disabled class="bg-red-500 text-white px-4 py-2 rounded-lg disabled:opacity-50">
  삭제
</button>
```

---

## 8. 체크리스트

### Phase 6-1 시작 전 확인
- [ ] `/mnt/user-data/outputs/super/super-academies.html` 파일 존재 확인
- [ ] `/mnt/user-data/outputs/super/super-inquiries.html` 파일 존재 확인
- [ ] 기존 모달 구조 파악 (openModal, closeModal 함수)
- [ ] 샘플 데이터 구조 파악

### Phase 6-1 완료 기준
- [ ] 구독 플랜 변경 모달 동작
- [ ] 학원 정지/삭제 확인 모달 동작
- [ ] 문의 상태 변경 드롭다운 동작
- [ ] 상담 히스토리 추가 모달 동작
- [ ] 학원 등록 전환 모달 동작
- [ ] 모든 동작에 토스트 피드백

---

*문서 끝*
