# MAMA-ASST 프로토타입 코드 정리 + P2 미완 작업

레포: `/home/claude/mama-asst-prototype`
작업 디렉토리: `MAMA-ASST_Prototype_v3.4.2_Updated_1/`

아래 3가지 작업을 순서대로 실행하고, 각 작업 완료 후 개별 커밋해줘.

---

## 작업 1: common.css rgba → HEX 변환 (Step 0 보완)

`assets/css/common.css`에 남아있는 rgba()를 전부 v3.6 설계서 기준 HEX로 변환해.

변환 규칙:
```
rgba(0, 0, 0, 0.05)      → #0000000D
rgba(0, 0, 0, 0.06)      → #0000000F
rgba(0, 0, 0, 0.1)       → #0000001A
rgba(0, 0, 0, 0.04)      → #0000000A
rgba(255, 109, 77, 0.1)  → #FF6D4D1A
rgba(255, 109, 77, 0.3)  → #FF6D4D4D
rgba(255, 109, 77, 0.4)  → #FF6D4D66
rgba(245, 158, 11, 0.2)  → #F59E0B33
rgba(59, 130, 246, 0.2)  → #3B82F633
rgba(34, 197, 94, 0.2)   → #22C55E33
rgba(239, 68, 68, 0.2)   → #EF444433
rgba(26, 46, 77, 0.1)    → #1A2E4D1A
rgba(255, 255, 255, 0.95) → #FFFFFFF2
rgba(255, 255, 255, 0.1) → #FFFFFF1A
rgba(255, 255, 255, 0.7) → #FFFFFFB3
rgba(255, 255, 255, 0.5) → #FFFFFF80
rgba(255, 255, 255, 0.3) → #FFFFFF4D
```

이미 변환된 것(--shadow-card, --shadow-card-hover, --shadow-lg, --shadow-focus 등)은 건드리지 마.
변환 후 `grep -c "rgba(" assets/css/common.css` 결과가 0이어야 해.

커밋: `fix: common.css rgba() 전체 HEX 변환 (v3.6 색상 표기 규칙 준수)`

---

## 작업 2: 인라인 showToast 중복 제거

아래 15개 HTML 파일에 `function showToast`가 인라인으로 정의되어 있는데, 이미 `assets/js/toast.js`를 모든 파일이 참조하고 있어서 중복임. 각 파일의 `<script>` 태그 내에서 `function showToast(...)` 함수 정의 전체를 삭제해줘.

대상 파일:
```
./admin/admin-counseling.html
./admin/admin-daily-evaluations.html
./admin/admin-inquiries.html
./files_teacher/instructor-assignment.html
./files_teacher/instructor-attendance.html
./files_teacher/instructor-briefing.html
./files_teacher/instructor-evaluation.html
./files_teacher/instructor-messages.html
./files_teacher/instructor-observation.html
./korean-step1-reading.html
./math-problem.html
./notifications.html
./planner.html
./subject-korean.html
./super-admin/super-dashboard.html
```

주의사항:
- `showToast(...)` **호출**은 삭제하면 안 됨. `function showToast` **정의**만 삭제
- 함수 정의 전체(function showToast부터 닫는 중괄호까지)를 제거
- toast.js `<script src="...toast.js">` 참조가 이미 있는지 확인하고, 없으면 추가
- 삭제 후 각 파일이 정상 동작하는지 `grep -c "function showToast"` 결과가 0인지 확인

커밋: `refactor: 인라인 showToast 중복 제거 (toast.js 모듈 통합)`

---

## 작업 3: P2 미완 3건 구현

### 3-1. IMP-I03: 강사 브리핑 알림 뱃지

`files_teacher/instructor-dashboard.html`에서 사이드바의 브리핑 메뉴에 빨간 뱃지 추가:

라인 122 근처의 사이드바 브리핑 링크:
```html
<a href="instructor-briefing.html" class="sidebar-item flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
```
이 링크 안에 `<span class="font-medium">학원 브리핑</span>` 뒤에 뱃지 추가:
```html
<span class="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
```

모바일 사이드바(라인 190 근처)에도 동일하게 추가.

하단 탭바(라인 453 근처)의 브리핑 탭에도 이미 `.bottom-tab-bar__badge` 클래스가 있으므로 확인만 해줘.

### 3-2. IMP-I04: 숙제 배정 템플릿/프리셋

`files_teacher/instructor-assignment.html`의 assignmentModal(라인 509) 내부, 폼 상단에 "자주 사용하는 템플릿" 섹션 추가:

assignmentModal의 `<h3 class="text-lg font-bold">새 숙제 배정</h3>` 바로 아래에:
```html
<!-- 빠른 템플릿 -->
<div class="mt-4 mb-2">
  <p class="text-sm font-medium text-text-secondary mb-2">빠른 템플릿</p>
  <div class="flex flex-wrap gap-2">
    <button type="button" onclick="applyTemplate('daily')" class="px-3 py-1.5 text-xs border border-border-light rounded-full hover:bg-primary-light hover:border-primary hover:text-primary transition-all">📝 일일 복습</button>
    <button type="button" onclick="applyTemplate('weekly')" class="px-3 py-1.5 text-xs border border-border-light rounded-full hover:bg-primary-light hover:border-primary hover:text-primary transition-all">📚 주간 과제</button>
    <button type="button" onclick="applyTemplate('workbook')" class="px-3 py-1.5 text-xs border border-border-light rounded-full hover:bg-primary-light hover:border-primary hover:text-primary transition-all">📖 교재 진도</button>
    <button type="button" onclick="applyTemplate('test')" class="px-3 py-1.5 text-xs border border-border-light rounded-full hover:bg-primary-light hover:border-primary hover:text-primary transition-all">✏️ 시험 대비</button>
  </div>
</div>
```

그리고 같은 파일 하단 `<script>` 섹션에 `applyTemplate` 함수 추가:
```javascript
function applyTemplate(type) {
  const templates = {
    daily: { title: '일일 복습 과제', desc: '오늘 배운 내용을 복습하고, 교재 문제를 풀어오세요.' },
    weekly: { title: '주간 종합 과제', desc: '이번 주 학습 내용을 정리하고, 요약 노트를 작성해오세요.' },
    workbook: { title: '교재 진도 과제', desc: '교재 p.__ ~ p.__ 문제를 풀어오세요.' },
    test: { title: '시험 대비 과제', desc: '시험 범위 핵심 개념을 정리하고, 기출문제를 풀어오세요.' }
  };
  const t = templates[type];
  if (!t) return;
  const titleEl = document.querySelector('#assignmentModal input[placeholder*="제목"], #assignmentModal input[type="text"]');
  const descEl = document.querySelector('#assignmentModal textarea');
  if (titleEl) titleEl.value = t.title;
  if (descEl) descEl.value = t.desc;
  showToast('템플릿이 적용되었습니다', 'success');
}
```

### 3-3. IMP-A05: 관리자 첫 사용 가이드 배너

`admin/admin-dashboard.html`의 Content 영역 시작 부분(라인 279 `<div class="p-4 pb-24 lg:p-6 lg:pb-6 space-y-4 lg:space-y-6">` 바로 안쪽 첫 번째 자식으로) 환영 배너 추가:

```html
<!-- 시작 가이드 배너 -->
<div id="welcomeGuide" class="bg-gradient-to-r from-primary to-orange-400 rounded-2xl p-5 lg:p-6 text-white relative overflow-hidden">
  <button onclick="dismissGuide()" class="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-lg transition-all">
    <span class="material-icons-round text-sm">close</span>
  </button>
  <h3 class="text-lg font-bold mb-2">👋 환영합니다! MAMA-ASST 시작 가이드</h3>
  <p class="text-sm text-white/90 mb-4">아래 단계를 따라 학원 운영을 시작해보세요.</p>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
    <a href="admin-students.html" class="bg-white/15 hover:bg-white/25 rounded-xl p-3 text-center transition-all">
      <span class="material-icons-round text-2xl mb-1">person_add</span>
      <p class="text-xs font-medium">1. 학생 등록</p>
    </a>
    <a href="admin-classes.html" class="bg-white/15 hover:bg-white/25 rounded-xl p-3 text-center transition-all">
      <span class="material-icons-round text-2xl mb-1">groups</span>
      <p class="text-xs font-medium">2. 반 생성</p>
    </a>
    <a href="admin-instructors.html" class="bg-white/15 hover:bg-white/25 rounded-xl p-3 text-center transition-all">
      <span class="material-icons-round text-2xl mb-1">school</span>
      <p class="text-xs font-medium">3. 강사 배정</p>
    </a>
    <a href="admin-settings.html" class="bg-white/15 hover:bg-white/25 rounded-xl p-3 text-center transition-all">
      <span class="material-icons-round text-2xl mb-1">settings</span>
      <p class="text-xs font-medium">4. 학원 설정</p>
    </a>
  </div>
</div>
```

같은 파일 `<script>` 섹션에 dismissGuide 함수 추가:
```javascript
function dismissGuide() {
  document.getElementById('welcomeGuide').style.display = 'none';
  localStorage.setItem('mama_guide_dismissed', 'true');
}
// 가이드 닫기 상태 복원
if (localStorage.getItem('mama_guide_dismissed') === 'true') {
  const g = document.getElementById('welcomeGuide');
  if (g) g.style.display = 'none';
}
```

커밋: `feat: P2 UX 개선 - 브리핑 뱃지, 숙제 템플릿, 관리자 가이드 추가`

---

## 완료 후 검증

3개 커밋 완료 후 아래 검증 명령을 실행해서 결과를 보여줘:

```bash
echo "=== 검증 ==="
echo "1. rgba 잔존:" && grep -c "rgba(" assets/css/common.css
echo "2. 인라인 showToast 잔존:" && grep -rl "function showToast" --include="*.html" . | wc -l
echo "3. 브리핑 뱃지:" && grep -c "rounded-full.*items-center.*justify-center" files_teacher/instructor-dashboard.html
echo "4. 숙제 템플릿:" && grep -c "applyTemplate" files_teacher/instructor-assignment.html
echo "5. 관리자 가이드:" && grep -c "welcomeGuide" admin/admin-dashboard.html
```

기대 결과: 1→0, 2→0, 3→2이상, 4→5이상, 5→3이상
