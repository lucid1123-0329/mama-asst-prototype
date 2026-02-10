# MAMA-ASST JavaScript 모듈 사용 가이드

**버전:** 1.0.0  
**작성일:** 2025-01-14

---

## 📁 모듈 구조

```
assets/js/
├── common.js      (355줄) - 공통 유틸리티
├── modal.js       (465줄) - 모달 시스템
├── toast.js       (332줄) - 토스트 알림
├── table.js       (422줄) - 테이블/필터/페이지네이션
└── chart-config.js(424줄) - Chart.js 공통 설정

총 1,998줄의 재사용 가능한 코드
```

---

## 🔧 HTML 파일에 적용하기

### 기본 적용 (권장)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- ... 기존 head 내용 ... -->
</head>
<body>
  <!-- ... 페이지 내용 ... -->
  
  <!-- 토스트 컨테이너 (필수) -->
  <div id="toastContainer" class="fixed top-4 right-4 z-50 space-y-2"></div>
  
  <!-- Chart.js (차트 사용 시) -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <!-- MAMA-ASST 공통 모듈 -->
  <script src="../assets/js/common.js"></script>
  <script src="../assets/js/modal.js"></script>
  <script src="../assets/js/toast.js"></script>
  <script src="../assets/js/table.js"></script>
  <script src="../assets/js/chart-config.js"></script>
  
  <!-- 페이지 고유 스크립트 -->
  <script>
    // 페이지별 로직만 작성
  </script>
</body>
</html>
```

---

## 📖 모듈별 사용법

### 1. common.js - 공통 유틸리티

```javascript
// 숫자 포맷팅
MAMA.utils.formatNumber(1234567);     // "1,234,567"
MAMA.utils.formatCurrency(50000);     // "₩50,000"
MAMA.utils.formatWon(50000);          // "₩50,000"

// 날짜 포맷팅
MAMA.utils.formatDate(new Date());    // "2025-01-14"
MAMA.utils.formatDate(new Date(), 'YYYY년 MM월 DD일'); // "2025년 01월 14일"
MAMA.utils.formatRelativeTime(someDate); // "3분 전", "2시간 전"

// 전화번호 포맷팅
MAMA.utils.formatPhone('01012345678'); // "010-1234-5678"

// 디바운스/쓰로틀
const debouncedSearch = MAMA.utils.debounce((query) => {
  console.log('검색:', query);
}, 300);

// 클립보드 복사
await MAMA.utils.copyToClipboard('복사할 텍스트');

// 문자열 자르기
MAMA.utils.truncate('긴 문자열입니다...', 10); // "긴 문자열입..."

// 빈 값 체크
MAMA.utils.isEmpty(null);    // true
MAMA.utils.isEmpty('');      // true
MAMA.utils.isEmpty([]);      // true

// DOM 선택 단축
$('#myElement');   // document.querySelector('#myElement')
$$('.items');      // document.querySelectorAll('.items')

// 로컬 스토리지
MAMA.storage.set('key', { data: 'value' });
MAMA.storage.get('key');  // { data: 'value' }
MAMA.storage.remove('key');
```

---

### 2. modal.js - 모달 시스템

```javascript
// 기본 모달 열기/닫기
ModalManager.open('myModal');
ModalManager.close('myModal');
ModalManager.toggle('myModal');
ModalManager.closeAll();

// 하위 호환 함수 (기존 코드와 호환)
openModal('myModal');
closeModal('myModal');

// 확인 다이얼로그 (Promise 기반)
const confirmed = await ModalManager.confirm({
  title: '저장하시겠습니까?',
  message: '변경 사항이 저장됩니다.',
  confirmText: '저장',
  cancelText: '취소',
  type: 'warning'  // warning, danger, info, success
});

if (confirmed) {
  // 저장 로직
}

// 알림 다이얼로그
await ModalManager.alert({
  title: '완료',
  message: '저장되었습니다.',
  type: 'success'
});

// 위험 작업 확인 (삭제 등)
const deleted = await ModalManager.confirmDanger({
  title: '정말 삭제하시겠습니까?',
  message: '이 작업은 되돌릴 수 없습니다.',
  confirmText: '삭제',
  confirmWord: '삭제',
  checkboxText: '모든 연관 데이터가 함께 삭제됨을 이해합니다.'
});

if (deleted) {
  // 삭제 로직
}
```

---

### 3. toast.js - 토스트 알림

```javascript
// 기본 사용
ToastManager.show('메시지', 'success');
ToastManager.show('오류 발생', 'error');
ToastManager.show('주의가 필요합니다', 'warning');
ToastManager.show('알림', 'info');

// 하위 호환 함수
showToast('저장되었습니다.', 'success');

// 단축 메서드
ToastManager.success('저장되었습니다.');
ToastManager.error('오류가 발생했습니다.');
ToastManager.warning('주의가 필요합니다.');
ToastManager.info('참고하세요.');

// 옵션 지정
ToastManager.show('메시지', 'success', {
  duration: 5000,    // 표시 시간 (ms)
  closable: true     // 닫기 버튼 표시
});

// 로딩 토스트
const loadingId = ToastManager.loading('처리 중...');
// ... 작업 수행 ...
ToastManager.loaded(loadingId, '완료되었습니다.', 'success');

// Promise 연동 토스트
await ToastManager.promise(
  fetch('/api/save'),
  {
    loading: '저장 중...',
    success: '저장되었습니다.',
    error: '저장 실패'
  }
);

// 모든 토스트 제거
ToastManager.clear();
```

---

### 4. table.js - 테이블 유틸리티

```javascript
// 검색 필터 초기화
TableManager.initSearch('searchInput', {
  debounce: 300,
  onSearch: (query) => {
    const filtered = TableManager.filterData(data, query, ['name', 'email']);
    renderTable(filtered);
  }
});

// 데이터 필터링
const filtered = TableManager.filterData(
  users, 
  '김',           // 검색어
  ['name', 'email'] // 검색 필드
);

// 다중 필터 적용
const filtered = TableManager.applyFilters(users, {
  status: 'active',
  role: 'admin'
});

// 정렬
const sorted = TableManager.sortData(users, 'name', 'asc');

// 페이지네이션
const pageData = TableManager.paginate(data, 1, 10);

const paginationInfo = TableManager.getPaginationInfo(
  totalItems,    // 전체 항목 수
  currentPage,   // 현재 페이지
  perPage        // 페이지당 항목 수
);

TableManager.renderPagination('paginationContainer', paginationInfo, (page) => {
  loadPage(page);
});

// 체크박스 선택
TableManager.initCheckboxSelection('userTable', {
  onSelectionChange: (selected) => {
    console.log('선택된 항목:', selected);
  }
});

// 행 클릭 이벤트
TableManager.initRowClick('userTable', (rowId, row) => {
  openDetailModal(rowId);
});
```

---

### 5. chart-config.js - Chart.js 설정

```javascript
// 라인 차트 생성
const lineChart = ChartConfig.create('lineCanvas', 'line', {
  labels: ['1월', '2월', '3월', '4월', '5월'],
  datasets: [
    ChartConfig.createLineDataset('매출', [100, 200, 150, 300, 250], ChartConfig.colors.coral),
    ChartConfig.createLineDataset('비용', [80, 150, 120, 200, 180], ChartConfig.colors.info)
  ]
});

// 바 차트 생성
const barChart = ChartConfig.create('barCanvas', 'bar', {
  labels: ['국어', '영어', '수학'],
  datasets: [
    ChartConfig.createBarDataset('점수', [85, 92, 78], [
      ChartConfig.colors.korean,
      ChartConfig.colors.english,
      ChartConfig.colors.math
    ])
  ]
});

// 도넛 차트 생성
const doughnutChart = ChartConfig.create('doughnutCanvas', 'doughnut', {
  labels: ['활성', '비활성', '정지'],
  datasets: [
    ChartConfig.createDoughnutDataset([65, 25, 10], [
      ChartConfig.colors.success,
      ChartConfig.colors.gray400,
      ChartConfig.colors.error
    ])
  ]
});

// 차트 업데이트
ChartConfig.update(lineChart, newData, true);

// 차트 제거
ChartConfig.destroy('lineCanvas');

// 숫자 포맷터
const currencyFormatter = ChartConfig.getFormatter('currency');
const percentFormatter = ChartConfig.getFormatter('percent');

// 커스텀 옵션으로 차트 생성
const customChart = ChartConfig.create('canvas', 'line', data, {
  scales: {
    y: {
      ticks: {
        callback: ChartConfig.getFormatter('currency')
      }
    }
  }
});

// 컬러 팔레트 사용
const colors = ChartConfig.colors.palette; // 12가지 기본 색상
```

---

## 🔄 기존 코드 마이그레이션

### Before (인라인 스크립트)

```html
<script>
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    // ... 40줄의 중복 코드 ...
  }
  
  function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
  }
  
  // ... 페이지 고유 로직 ...
</script>
```

### After (모듈 사용)

```html
<!-- 공통 모듈 로드 -->
<script src="../assets/js/common.js"></script>
<script src="../assets/js/modal.js"></script>
<script src="../assets/js/toast.js"></script>

<script>
  // 페이지 고유 로직만 작성
  function saveData() {
    // API 호출
    showToast('저장되었습니다.', 'success');
    closeModal('editModal');
  }
</script>
```

---

## ✅ 체크리스트

### 모듈 적용 시 확인 사항

- [ ] `toastContainer` div가 body 내에 존재하는지 확인
- [ ] 스크립트 로드 순서: common.js → modal.js → toast.js → table.js → chart-config.js
- [ ] Chart.js가 필요한 페이지에서는 chart-config.js 전에 Chart.js CDN 로드
- [ ] 기존 `showToast`, `openModal`, `closeModal` 함수가 있다면 삭제 (하위 호환 제공됨)

### 점진적 마이그레이션

1. 새 파일 작성 시 모듈 사용
2. 버그 수정이나 기능 추가 시 해당 파일 마이그레이션
3. 전체 파일 일괄 마이그레이션은 충분한 테스트 후 진행

---

## 📋 브라우저 호환성

| 브라우저 | 최소 버전 |
|----------|----------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 11+ |
| Edge | 79+ |

---

*JavaScript 모듈 사용 가이드 끝*
