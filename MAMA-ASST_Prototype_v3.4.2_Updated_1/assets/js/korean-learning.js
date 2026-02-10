/* ============================================
   Korean Learning SPA Controller
   MAMA-ASST 국어 5단계 통합 학습
   ============================================ */

const KL = (() => {
  // ── State ──
  const state = {
    currentStep: 1,
    timer: { seconds: 0, interval: null },
    step1: { fontIndex: 1, highlightMode: false, isBookmarked: false },
    step2: { learnedCount: 0, total: 6 },
    step3: { answered: false, firstTry: true },
    step4: { currentQ: 0, correctCount: 0, total: 5, answeredCurrent: false },
    step5: { submitted: false },
    scores: { step1: 0, step2: 0, step3: 0, step4: 0, step5: 0 }
  };

  // ── Data ──
  const fontSizes = [
    { size: 15, label: '작게 (15px)', lineHeight: 1.8 },
    { size: 17, label: '보통 (17px)', lineHeight: 1.9 },
    { size: 19, label: '크게 (19px)', lineHeight: 2.0 },
    { size: 21, label: '아주 크게 (21px)', lineHeight: 2.1 }
  ];

  const vocabData = [
    { word: '딥러닝', eng: 'Deep Learning', para: '1문단', tag: '핵심', tagColor: 'bg-korean text-white', meaning: '인공 신경망을 여러 층으로 쌓아 복잡한 패턴을 학습하는 기계 학습 방법' },
    { word: '자연어 처리', eng: 'Natural Language Processing', para: '1문단', tag: '핵심', tagColor: 'bg-korean text-white', meaning: '컴퓨터가 인간의 언어를 이해하고 처리하는 인공지능 기술' },
    { word: '자동화', eng: 'Automation', para: '2문단', tag: '중요', tagColor: 'bg-blue-100 text-blue-600', meaning: '인간의 개입 없이 기계나 시스템이 스스로 작업을 수행하는 것' },
    { word: '맞춤형', eng: 'Personalized', para: '3문단', tag: '중요', tagColor: 'bg-blue-100 text-blue-600', meaning: '개인의 특성이나 요구에 맞게 특별히 조정된 것' },
    { word: '편향성', eng: 'Bias', para: '4문단', tag: '핵심', tagColor: 'bg-korean text-white', meaning: '한쪽으로 치우친 성질, 특정 방향으로 기울어진 경향' },
    { word: '책임 소재', eng: 'Accountability', para: '4문단', tag: '중요', tagColor: 'bg-blue-100 text-blue-600', meaning: '어떤 일에 대해 책임져야 할 위치나 대상' }
  ];

  const structParagraphs = [
    { num: 1, summary: '인공지능(AI)은 인간의 학습능력...', role: '서론', roleColor: 'text-blue-600' },
    { num: 2, summary: 'AI의 발전은 노동 시장에...', role: '본론', roleColor: 'text-orange-600' },
    { num: 3, summary: '한편, AI는 의료, 교육 등에서...', role: '본론', roleColor: 'text-green-600' },
    { num: 4, summary: '그러나 AI의 부정적인 측면도...', role: '본론', roleColor: 'text-red-600' },
    { num: 5, summary: '따라서 인간 중심의 AI 윤리 원칙...', role: '결론', roleColor: 'text-purple-600', correct: true }
  ];

  const quizData = [
    { q: '인공지능은 인간의 학습능력을 인공적으로 구현한 것이다.', answer: 'O', explanation: '1문단에서 AI의 정의를 설명하고 있어요.' },
    { q: '딥러닝 기술은 AI 발전에 영향을 미치지 않았다.', answer: 'X', explanation: "지문에서 '딥러닝 기술의 발전으로 AI는 성과를 보여주고 있다'고 했어요." },
    { q: 'AI는 의료 분야에서만 긍정적 역할을 할 것으로 기대된다.', answer: 'X', explanation: '의료뿐만 아니라 교육, 환경 등 다양한 분야에서 긍정적 역할이 기대돼요.' },
    { q: 'AI의 발전으로 2030년까지 약 4억 개의 일자리가 사라질 것이다.', answer: 'X', explanation: "'사라진다'가 아닌 '자동화의 영향을 받는다'고 표현했어요. 사라지는 것과 영향을 받는 것은 다릅니다." },
    { q: '글쓴이는 인간 중심의 AI 윤리 원칙 수립이 필요하다고 주장한다.', answer: 'O', explanation: '5문단 결론에서 인간 중심의 AI 윤리 원칙 수립이 시급하다고 했어요.' }
  ];

  // ── Timer ──
  function startTimer() {
    if (state.timer.interval) return;
    state.timer.interval = setInterval(() => {
      state.timer.seconds++;
      const m = String(Math.floor(state.timer.seconds / 60)).padStart(2, '0');
      const s = String(state.timer.seconds % 60).padStart(2, '0');
      const str = m + ':' + s;
      const el = document.getElementById('globalTimer');
      const elM = document.getElementById('globalTimerMobile');
      if (el) el.textContent = str;
      if (elM) elM.textContent = str;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timer.interval);
    state.timer.interval = null;
  }

  function getTimeString() {
    const m = Math.floor(state.timer.seconds / 60);
    const s = state.timer.seconds % 60;
    return m + '분 ' + s + '초';
  }

  // ── Step Navigation ──
  function goToStep(step) {
    if (step < 1 || step > 6) return;
    // Hide all sections
    document.querySelectorAll('.step-section').forEach(el => el.classList.add('hidden'));
    // Show target
    const targetId = step <= 5 ? 'step' + step : 'stepResult';
    const target = document.getElementById(targetId);
    if (target) {
      target.classList.remove('hidden');
      target.style.animation = 'none';
      target.offsetHeight; // reflow
      target.style.animation = '';
    }
    state.currentStep = step;
    updateStepIndicator(step);
    updateBottomNav(step);
    // Scroll content area to top
    const contentArea = document.getElementById('contentArea');
    if (contentArea) contentArea.scrollTop = 0;
    // Step-specific init
    if (step === 2) initStep2();
    if (step === 3) initStep3();
    if (step === 4) initStep4();
    if (step === 6) showResults();
  }

  function updateStepIndicator(step) {
    // Desktop circles
    for (let i = 1; i <= 5; i++) {
      const circle = document.getElementById('stepCircle' + i);
      const label = document.getElementById('stepLabel' + i);
      if (!circle) continue;
      circle.classList.remove('active', 'completed', 'pending');
      if (i < step) {
        circle.classList.add('completed');
        circle.innerHTML = '<span class="material-icons-round text-lg">check</span>';
        if (label) { label.classList.remove('text-text-tertiary'); label.classList.add('text-success'); }
      } else if (i === step && step <= 5) {
        circle.classList.add('active');
        if (label) { label.classList.remove('text-text-tertiary'); label.classList.add('text-korean'); }
      } else {
        circle.classList.add('pending');
        if (label) { label.classList.remove('text-korean', 'text-success'); label.classList.add('text-text-tertiary'); }
      }
    }
    // Desktop connectors
    for (let i = 1; i <= 4; i++) {
      const conn = document.getElementById('stepConn' + i);
      if (!conn) continue;
      conn.classList.remove('completed', 'active');
      if (i < step - 1) conn.classList.add('completed');
      else if (i === step - 1) conn.classList.add('active');
    }
    // Mobile step bars
    const bars = document.querySelectorAll('#mobileStepBars .step-bar');
    bars.forEach((bar, idx) => {
      bar.classList.remove('active', 'completed');
      if (idx < step - 1) bar.classList.add('completed');
      else if (idx === step - 1 && step <= 5) bar.classList.add('active');
    });
    // Mobile step badge
    const badge = document.getElementById('stepBadgeMobile');
    if (badge && step <= 5) badge.textContent = step + '단계';
  }

  function updateBottomNav(step) {
    const nav = document.getElementById('bottomNav');
    const btn = document.getElementById('nextStepBtn');
    const btnText = document.getElementById('nextStepBtnText');
    if (!nav || !btn) return;

    if (step >= 6) { nav.classList.add('hidden'); return; }
    nav.classList.remove('hidden');

    const texts = {
      1: '다 읽었어요! 다음 단계로',
      2: '다음 단계로',
      3: '다음 단계로',
      4: '다음 단계로',
      5: 'AI 피드백 받기'
    };
    btnText.textContent = texts[step] || '다음';

    // Gating
    if (step === 2) {
      btn.disabled = state.step2.learnedCount < state.step2.total;
    } else if (step === 3) {
      btn.disabled = !state.step3.answered;
    } else if (step === 4) {
      btn.disabled = !state.step4.answeredCurrent;
    } else if (step === 5) {
      const input = document.getElementById('summaryInput');
      btn.disabled = !input || input.value.length < 30;
    } else {
      btn.disabled = false;
    }
  }

  function handleNextStep() {
    const step = state.currentStep;
    if (step === 1) {
      state.scores.step1 = 20;
      goToStep(2);
    } else if (step === 2) {
      if (state.step2.learnedCount < state.step2.total) return;
      state.scores.step2 = 15;
      goToStep(3);
    } else if (step === 3) {
      if (!state.step3.answered) return;
      goToStep(4);
    } else if (step === 4) {
      nextQuizQuestion();
    } else if (step === 5) {
      submitSummary();
    }
  }

  // ── Step 1: Reading Tools ──
  function changeFontSize(dir) {
    state.step1.fontIndex = Math.max(0, Math.min(fontSizes.length - 1, state.step1.fontIndex + dir));
    const { size, label, lineHeight } = fontSizes[state.step1.fontIndex];
    document.querySelectorAll('#passageText .paragraph-block p').forEach(p => {
      p.style.fontSize = size + 'px';
      p.style.lineHeight = lineHeight;
    });
    const lbl = document.getElementById('fontSizeLabel');
    if (lbl) lbl.textContent = label;
    showToast('글자 크기: ' + label);
  }

  function toggleHighlight() {
    state.step1.highlightMode = !state.step1.highlightMode;
    const btn = document.getElementById('highlightBtn');
    if (!btn) return;
    if (state.step1.highlightMode) {
      btn.classList.add('bg-yellow-100', 'ring-2', 'ring-yellow-400');
      btn.classList.remove('bg-background');
      showToast('하이라이트 모드 ON');
    } else {
      btn.classList.remove('bg-yellow-100', 'ring-2', 'ring-yellow-400');
      btn.classList.add('bg-background');
      showToast('하이라이트 모드 OFF');
    }
  }

  function toggleBookmark() {
    state.step1.isBookmarked = !state.step1.isBookmarked;
    const btn = document.getElementById('bookmarkBtn');
    if (!btn) return;
    const icon = btn.querySelector('.material-icons-round');
    if (state.step1.isBookmarked) {
      icon.textContent = 'bookmark';
      btn.classList.add('bg-primary-light');
      btn.classList.remove('bg-background');
      let favs = JSON.parse(localStorage.getItem('koreanFavorites') || '[]');
      if (!favs.includes('korean_ai_future_001')) { favs.push('korean_ai_future_001'); localStorage.setItem('koreanFavorites', JSON.stringify(favs)); }
      showToast('즐겨찾기에 추가했어요!');
    } else {
      icon.textContent = 'bookmark_border';
      btn.classList.remove('bg-primary-light');
      btn.classList.add('bg-background');
      let favs = JSON.parse(localStorage.getItem('koreanFavorites') || '[]');
      favs = favs.filter(id => id !== 'korean_ai_future_001');
      localStorage.setItem('koreanFavorites', JSON.stringify(favs));
      showToast('즐겨찾기에서 제거했어요');
    }
  }

  function initHighlightClick() {
    document.querySelectorAll('#passageText .paragraph-block').forEach(para => {
      para.addEventListener('click', function () {
        if (!state.step1.highlightMode) return;
        this.classList.toggle('highlighted');
      });
    });
  }

  function initBookmarkState() {
    const favs = JSON.parse(localStorage.getItem('koreanFavorites') || '[]');
    if (favs.includes('korean_ai_future_001')) {
      state.step1.isBookmarked = true;
      const btn = document.getElementById('bookmarkBtn');
      if (btn) {
        const icon = btn.querySelector('.material-icons-round');
        icon.textContent = 'bookmark';
        btn.classList.add('bg-primary-light');
        btn.classList.remove('bg-background');
      }
    }
  }

  // ── Step 2: Vocabulary ──
  function initStep2() {
    if (document.getElementById('vocabGrid').children.length > 0) return;
    const grid = document.getElementById('vocabGrid');
    vocabData.forEach((v, i) => {
      const card = document.createElement('div');
      card.className = 'vocab-card bg-surface rounded-xl lg:rounded-2xl p-4 lg:p-5 border-2 border-border-light shadow-card relative hover:border-korean cursor-pointer';
      card.dataset.index = i;
      card.dataset.learned = 'false';
      card.innerHTML = `
        <div class="check-icon absolute top-3 right-3 w-6 h-6 bg-success rounded-full hidden items-center justify-center">
          <span class="material-icons-round text-white text-sm">check</span>
        </div>
        <div class="flex items-center gap-2 mb-2 lg:mb-3">
          <span class="px-2 py-0.5 ${v.tagColor} text-[10px] font-bold rounded">${v.tag}</span>
          <span class="text-xs text-text-tertiary">${v.para}</span>
        </div>
        <h4 class="text-lg lg:text-xl font-bold text-text-primary mb-1 lg:mb-2">${v.word}</h4>
        <p class="text-xs lg:text-sm text-text-secondary">${v.eng}</p>
        <div class="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-border-light vocab-meaning hidden">
          <p class="text-sm text-text-primary">${v.meaning}</p>
        </div>
        <div class="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-border-light vocab-hint">
          <p class="text-sm text-korean flex items-center gap-1">
            <span class="material-icons-round text-sm">touch_app</span>
            클릭하여 뜻 확인하기
          </p>
        </div>`;
      card.onclick = () => learnVocab(card);
      grid.appendChild(card);
    });
  }

  function learnVocab(card) {
    if (card.dataset.learned === 'true') return;
    card.dataset.learned = 'true';
    card.classList.add('learned', 'bounce-in');
    card.classList.remove('hover:border-korean');
    card.style.borderColor = '#22C55E';
    card.style.cursor = 'default';
    card.querySelector('.vocab-meaning').classList.remove('hidden');
    card.querySelector('.vocab-hint').classList.add('hidden');
    const checkIcon = card.querySelector('.check-icon');
    checkIcon.classList.remove('hidden');
    checkIcon.classList.add('flex');

    state.step2.learnedCount++;
    const counter = document.getElementById('vocabCount');
    if (counter) counter.textContent = state.step2.learnedCount;

    if (state.step2.learnedCount >= state.step2.total) {
      const btn = document.getElementById('nextStepBtn');
      if (btn) btn.disabled = false;
      const dBtn = document.getElementById('desktopNextBtn2');
      if (dBtn) dBtn.disabled = false;
    }
  }

  // ── Step 3: Structuring ──
  function initStep3() {
    const container = document.getElementById('structParagraphs');
    if (container.children.length > 0) return;
    structParagraphs.forEach(p => {
      const card = document.createElement('div');
      card.className = 'para-card bg-surface rounded-xl p-4 lg:p-5 border-2 border-border-light cursor-pointer';
      card.dataset.num = p.num;
      if (p.correct) card.dataset.correct = 'true';
      card.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-korean-light flex items-center justify-center text-korean font-bold flex-shrink-0">${p.num}</span>
          <div class="flex-1 min-w-0">
            <p class="text-sm lg:text-base text-text-primary truncate">${p.summary}</p>
            <span class="text-[10px] ${p.roleColor} font-medium">${p.role}</span>
          </div>
          <span class="material-icons-round text-text-tertiary text-lg">chevron_right</span>
        </div>`;
      card.onclick = () => selectParagraph(card);
      container.appendChild(card);
    });
  }

  function selectParagraph(card) {
    if (state.step3.answered) return;
    const isCorrect = card.dataset.correct === 'true';
    const allCards = document.querySelectorAll('#structParagraphs .para-card');

    // Remove previous selection
    allCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    setTimeout(() => {
      if (isCorrect) {
        card.classList.remove('selected');
        card.classList.add('correct');
        state.step3.answered = true;
        state.scores.step3 = state.step3.firstTry ? 15 : 10;
        document.getElementById('structResult').classList.remove('hidden');
        // Enable next
        const btn = document.getElementById('nextStepBtn');
        if (btn) btn.disabled = false;
        const dBtn = document.getElementById('desktopNextBtn3');
        if (dBtn) dBtn.disabled = false;
      } else {
        state.step3.firstTry = false;
        card.classList.remove('selected');
        card.classList.add('incorrect', 'shake');
        setTimeout(() => {
          card.classList.remove('incorrect', 'shake');
        }, 1000);
      }
    }, 500);
  }

  // ── Step 4: Quiz O/X ──
  function initStep4() {
    state.step4.answeredCurrent = false;
    loadQuizQuestion();
  }

  function loadQuizQuestion() {
    const q = quizData[state.step4.currentQ];
    if (!q) return;
    const numEl = document.getElementById('quizNum');
    const qEl = document.getElementById('quizQuestion');
    if (numEl) numEl.textContent = state.step4.currentQ + 1;
    if (qEl) qEl.textContent = q.q;

    // Reset buttons
    document.querySelectorAll('.ox-btn').forEach(btn => {
      btn.classList.remove('disabled', 'selected', 'correct', 'incorrect', 'pulse-success', 'shake');
      btn.style.borderColor = '';
    });
    // Hide result
    document.getElementById('quizResult').classList.add('hidden');
    // Update dots
    updateQuizDots();
    // Update score display
    const scoreEl = document.getElementById('quizScore');
    if (scoreEl) scoreEl.textContent = state.step4.correctCount;

    // Update bottom nav
    state.step4.answeredCurrent = false;
    const btn = document.getElementById('nextStepBtn');
    const btnText = document.getElementById('nextStepBtnText');
    if (btn) btn.disabled = true;
    const isLast = state.step4.currentQ >= state.step4.total - 1;
    if (btnText) {
      btnText.textContent = isLast ? '요약하기로 이동' : '다음 문제';
    }
    // Desktop button
    const dBtn = document.getElementById('desktopNextBtn4');
    const dBtnText = document.getElementById('desktopNextBtn4Text');
    if (dBtn) dBtn.disabled = true;
    if (dBtnText) dBtnText.textContent = isLast ? '요약하기로 이동' : '다음 문제';
  }

  function selectAnswer(choice) {
    if (state.step4.answeredCurrent) return;
    state.step4.answeredCurrent = true;

    const q = quizData[state.step4.currentQ];
    const isCorrect = choice === q.answer;
    const oBtn = document.querySelector('#step4 .o-btn');
    const xBtn = document.querySelector('#step4 .x-btn');
    const selectedBtn = choice === 'O' ? oBtn : xBtn;

    oBtn.classList.add('disabled');
    xBtn.classList.add('disabled');
    selectedBtn.classList.add('selected');

    setTimeout(() => {
      const resultEl = document.getElementById('quizResult');
      const iconEl = document.getElementById('quizResultIcon');
      const titleEl = document.getElementById('quizResultTitle');
      const explEl = document.getElementById('quizResultExpl');

      if (isCorrect) {
        state.step4.correctCount++;
        selectedBtn.classList.add('correct', 'pulse-success');
        resultEl.className = 'mt-6 rounded-xl lg:rounded-2xl p-5 lg:p-6 border bg-success-light border-success/30';
        iconEl.className = 'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-success';
        iconEl.innerHTML = '<span class="material-icons-round text-white text-xl">check_circle</span>';
        titleEl.className = 'font-bold text-base mb-1 text-success';
        titleEl.textContent = '정답이에요! 🎉';
      } else {
        selectedBtn.classList.add('incorrect', 'shake');
        const correctBtn = q.answer === 'O' ? oBtn : xBtn;
        correctBtn.classList.add('correct');
        resultEl.className = 'mt-6 rounded-xl lg:rounded-2xl p-5 lg:p-6 border bg-error-light border-error/30';
        iconEl.className = 'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-error';
        iconEl.innerHTML = '<span class="material-icons-round text-white text-xl">cancel</span>';
        titleEl.className = 'font-bold text-base mb-1 text-error';
        titleEl.textContent = '아쉬워요!';
      }
      explEl.textContent = q.explanation;
      resultEl.classList.remove('hidden');

      // Update score
      state.scores.step4 = state.step4.correctCount * 5;
      const scoreEl = document.getElementById('quizScore');
      if (scoreEl) scoreEl.textContent = state.step4.correctCount;

      // Update dots
      updateQuizDots();

      // Enable next button
      const btn = document.getElementById('nextStepBtn');
      if (btn) btn.disabled = false;
      const dBtn = document.getElementById('desktopNextBtn4');
      if (dBtn) dBtn.disabled = false;
    }, 500);
  }

  function nextQuizQuestion() {
    state.step4.currentQ++;
    if (state.step4.currentQ < state.step4.total) {
      state.step4.answeredCurrent = false;
      loadQuizQuestion();
    } else {
      // All done, go to step 5
      goToStep(5);
    }
  }

  function updateQuizDots() {
    const dots = document.querySelectorAll('#quizDots .quiz-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('current', 'correct', 'wrong');
      if (i < state.step4.currentQ) {
        // already answered - we don't track per-question correctness in dots, mark as done
        dot.classList.add('correct');
      } else if (i === state.step4.currentQ) {
        dot.classList.add('current');
      }
    });
  }

  function toggleReference() {
    const panel = document.getElementById('referencePanel');
    if (panel) panel.classList.toggle('hidden');
  }

  // ── Step 5: Summary ──
  function updateCharCount() {
    const input = document.getElementById('summaryInput');
    const counter = document.getElementById('charCount');
    const submitBtn = document.getElementById('summarySubmitBtn');
    if (!input) return;
    const count = input.value.length;
    if (counter) counter.textContent = count;

    // Counter color
    const counterParent = counter ? counter.parentElement : null;
    if (counterParent) {
      counterParent.classList.remove('warning', 'error');
      if (count > 130) counterParent.classList.add('error');
      else if (count > 100) counterParent.classList.add('warning');
    }

    // Enable submit button
    if (submitBtn) submitBtn.disabled = count < 30;

    // Update mobile next button
    const btn = document.getElementById('nextStepBtn');
    if (btn && state.currentStep === 5) {
      btn.disabled = count < 30;
    }
  }

  function submitSummary() {
    if (state.step5.submitted) return;
    state.step5.submitted = true;
    state.scores.step5 = 25;

    const feedbackArea = document.getElementById('summaryFeedback');
    const loading = document.getElementById('summaryLoading');
    const result = document.getElementById('summaryResult');
    const inputArea = document.getElementById('summaryInputArea');
    const submitBtn = document.getElementById('summarySubmitBtn');

    if (inputArea) inputArea.classList.add('opacity-50', 'pointer-events-none');
    if (submitBtn) submitBtn.disabled = true;
    if (feedbackArea) feedbackArea.classList.remove('hidden');
    if (loading) loading.classList.remove('hidden');
    if (result) result.classList.add('hidden');

    // Update mobile button
    const btn = document.getElementById('nextStepBtn');
    const btnText = document.getElementById('nextStepBtnText');
    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = 'AI 분석 중...';

    setTimeout(() => {
      if (loading) loading.classList.add('hidden');
      if (result) result.classList.remove('hidden');
      // Change bottom nav to "complete"
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = '학습 완료하기 🎉';
      // Override next step behavior for completion
      btn.onclick = () => goToStep(6);
      // Show desktop complete button
      const dCompleteBtn = document.getElementById('desktopCompleteBtn');
      if (dCompleteBtn) { dCompleteBtn.classList.remove('hidden'); dCompleteBtn.classList.add('flex'); }
    }, 2000);
  }

  // ── Results ──
  function showResults() {
    stopTimer();
    const total = state.scores.step1 + state.scores.step2 + state.scores.step3 + state.scores.step4 + state.scores.step5;
    const xp = Math.round(total * 0.3) + 10;

    // Hide mobile bottom nav
    const nav = document.getElementById('bottomNav');
    if (nav) nav.classList.add('hidden');

    // Fill scores
    const totalEl = document.getElementById('resultTotal');
    const xpEl = document.getElementById('resultXP');
    const timeEl = document.getElementById('resultTime');
    if (totalEl) totalEl.textContent = total + '점';
    if (xpEl) xpEl.textContent = '+' + xp;
    if (timeEl) timeEl.textContent = getTimeString();

    // Step detail scores
    const stepsContainer = document.getElementById('resultStepScores');
    if (stepsContainer) {
      const stepNames = ['읽기', '어휘', '구조화', 'O/X 검증', '요약'];
      const stepMaxes = [20, 15, 15, 25, 25];
      const stepScores = [state.scores.step1, state.scores.step2, state.scores.step3, state.scores.step4, state.scores.step5];
      stepsContainer.innerHTML = stepNames.map((name, i) => {
        const pct = Math.round((stepScores[i] / stepMaxes[i]) * 100);
        return `
          <div class="flex items-center gap-3">
            <span class="text-sm text-text-secondary w-20 flex-shrink-0">${name}</span>
            <div class="flex-1 h-2 bg-background rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-korean transition-all" style="width:${pct}%"></div>
            </div>
            <span class="text-sm font-bold text-text-primary w-16 text-right">${stepScores[i]}/${stepMaxes[i]}</span>
          </div>`;
      }).join('');
    }

    // XP bar
    const currentXP = 655 + xp;
    const xpCurrent = document.getElementById('resultXPCurrent');
    const xpBar = document.getElementById('resultXPBar');
    if (xpCurrent) xpCurrent.textContent = currentXP;
    if (xpBar) xpBar.style.width = Math.min(100, (currentXP / 800) * 100) + '%';

    // Confetti
    showConfetti();
  }

  function showConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    const colors = ['#FF6D4D', '#4285F4', '#34A853', '#FBBC05', '#9C27B0', '#22C55E'];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      container.appendChild(piece);
    }
    setTimeout(() => { container.innerHTML = ''; }, 5000);
  }

  // ── Toast ──
  function showToast(message) {
    const existing = document.querySelector('.kl-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'kl-toast fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 bg-navy text-white text-sm font-medium transition-opacity duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2000);
  }

  // ── Init ──
  function init() {
    startTimer();
    initHighlightClick();
    initBookmarkState();
    goToStep(1);
  }

  document.addEventListener('DOMContentLoaded', init);

  // Public API
  return {
    goToStep,
    handleNextStep,
    changeFontSize,
    toggleHighlight,
    toggleBookmark,
    learnVocab,
    selectParagraph,
    selectAnswer,
    toggleReference,
    updateCharCount,
    submitSummary
  };
})();
