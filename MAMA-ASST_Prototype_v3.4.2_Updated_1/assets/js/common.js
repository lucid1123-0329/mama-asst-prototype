/**
 * MAMA-ASST Common Utilities
 * @version 1.0.0
 * @description 전체 프로젝트 공통 유틸리티 함수
 */

const MAMA = {
  // 버전 정보
  version: '1.0.0',
  
  // 환경 설정
  config: {
    apiBaseUrl: '/api/v1',
    toastDuration: 3000,
    modalAnimationDuration: 300,
    dateLocale: 'ko-KR',
  },
  
  // ========================================
  // 유틸리티 함수
  // ========================================
  utils: {
    /**
     * 숫자 포맷 (천 단위 콤마)
     * @param {number} num - 포맷할 숫자
     * @returns {string} 포맷된 문자열
     */
    formatNumber: function(num) {
      if (num === null || num === undefined) return '0';
      return new Intl.NumberFormat('ko-KR').format(num);
    },
    
    /**
     * 통화 포맷 (원화)
     * @param {number} amount - 금액
     * @returns {string} 포맷된 금액 문자열
     */
    formatCurrency: function(amount) {
      if (amount === null || amount === undefined) return '₩0';
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW'
      }).format(amount);
    },
    
    /**
     * 간단한 통화 포맷 (₩ + 숫자)
     * @param {number} amount - 금액
     * @returns {string} 포맷된 금액 문자열
     */
    formatWon: function(amount) {
      if (amount === null || amount === undefined) return '₩0';
      return '₩' + new Intl.NumberFormat('ko-KR').format(amount);
    },
    
    /**
     * 날짜 포맷
     * @param {Date|string} date - 날짜
     * @param {string} format - 포맷 (기본: 'YYYY-MM-DD')
     * @returns {string} 포맷된 날짜 문자열
     */
    formatDate: function(date, format = 'YYYY-MM-DD') {
      const d = new Date(date);
      if (isNaN(d.getTime())) return '';
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      
      return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
    },
    
    /**
     * 상대적 시간 표시 (예: 3분 전, 2시간 전, 1주 전)
     * @param {Date|string} date - 날짜
     * @returns {string} 상대적 시간 문자열
     */
    formatRelativeTime: function(date) {
      const now = new Date();
      const d = new Date(date);
      const diff = Math.floor((now - d) / 1000);
      
      if (diff < 60) return '방금 전';
      if (diff < 3600) return Math.floor(diff / 60) + '분 전';
      if (diff < 86400) return Math.floor(diff / 3600) + '시간 전';
      if (diff < 604800) return Math.floor(diff / 86400) + '일 전';
      if (diff < 2592000) return Math.floor(diff / 604800) + '주 전';
      if (diff < 31536000) return Math.floor(diff / 2592000) + '개월 전';
      
      // 1년 이상이면 날짜 표시
      return this.formatDate(date, 'YYYY-MM-DD');
    },
    
    /**
     * 디바운스 함수
     * @param {Function} func - 실행할 함수
     * @param {number} wait - 대기 시간 (ms)
     * @returns {Function} 디바운스된 함수
     */
    debounce: function(func, wait = 300) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    
    /**
     * 쓰로틀 함수
     * @param {Function} func - 실행할 함수
     * @param {number} limit - 제한 시간 (ms)
     * @returns {Function} 쓰로틀된 함수
     */
    throttle: function(func, limit = 300) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },
    
    /**
     * 쿼리스트링 파싱
     * @returns {Object} 쿼리 파라미터 객체
     */
    parseQueryString: function() {
      return Object.fromEntries(new URLSearchParams(window.location.search));
    },
    
    /**
     * 쿼리스트링 생성
     * @param {Object} params - 파라미터 객체
     * @returns {string} 쿼리스트링
     */
    buildQueryString: function(params) {
      return new URLSearchParams(params).toString();
    },
    
    /**
     * 클립보드 복사
     * @param {string} text - 복사할 텍스트
     * @returns {Promise<boolean>} 성공 여부
     */
    copyToClipboard: async function(text) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
      }
    },
    
    /**
     * 문자열 자르기 (말줄임)
     * @param {string} str - 원본 문자열
     * @param {number} maxLength - 최대 길이
     * @returns {string} 잘린 문자열
     */
    truncate: function(str, maxLength = 50) {
      if (!str) return '';
      if (str.length <= maxLength) return str;
      return str.substring(0, maxLength) + '...';
    },
    
    /**
     * HTML 이스케이프
     * @param {string} str - 원본 문자열
     * @returns {string} 이스케이프된 문자열
     */
    escapeHtml: function(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },
    
    /**
     * UUID 생성
     * @returns {string} UUID
     */
    generateUUID: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    
    /**
     * 빈 값 체크
     * @param {any} value - 체크할 값
     * @returns {boolean} 빈 값 여부
     */
    isEmpty: function(value) {
      if (value === null || value === undefined) return true;
      if (typeof value === 'string') return value.trim() === '';
      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === 'object') return Object.keys(value).length === 0;
      return false;
    },
    
    /**
     * 전화번호 포맷
     * @param {string} phone - 전화번호
     * @returns {string} 포맷된 전화번호
     */
    formatPhone: function(phone) {
      if (!phone) return '';
      const cleaned = phone.replace(/\D/g, '');
      
      // 이미 포맷된 경우 그대로 반환
      if (phone.includes('-') && (phone.match(/-/g) || []).length === 2) {
        return phone;
      }
      
      // 서울 지역번호 (02)
      if (cleaned.startsWith('02')) {
        if (cleaned.length === 10) {
          // 02-XXXX-XXXX (10자리)
          return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        } else if (cleaned.length === 9) {
          // 02-XXX-XXXX (9자리)
          return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
        }
      }
      
      // 휴대폰 (010, 011, 016, 017, 018, 019)
      if (cleaned.length === 11 && cleaned.startsWith('01')) {
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
      
      // 기타 지역번호 (031, 032, 033, 041, 042, 043, 051, 052, 053, 054, 055, 061, 062, 063, 064)
      if (cleaned.length === 11) {
        // 031-XXXX-XXXX (11자리)
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      } else if (cleaned.length === 10) {
        // 031-XXX-XXXX (10자리)
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
      
      // 포맷 불가능한 경우 원본 반환
      return phone;
    }
  },
  
  // ========================================
  // DOM 유틸리티
  // ========================================
  dom: {
    /**
     * 요소 선택 (단일)
     * @param {string} selector - CSS 선택자
     * @param {Element} parent - 부모 요소
     * @returns {Element|null}
     */
    $: function(selector, parent = document) {
      return parent.querySelector(selector);
    },
    
    /**
     * 요소 선택 (복수)
     * @param {string} selector - CSS 선택자
     * @param {Element} parent - 부모 요소
     * @returns {NodeList}
     */
    $$: function(selector, parent = document) {
      return parent.querySelectorAll(selector);
    },
    
    /**
     * 클래스 토글
     * @param {Element} element - 대상 요소
     * @param {string} className - 클래스명
     * @param {boolean} force - 강제 설정
     */
    toggleClass: function(element, className, force) {
      if (element) {
        element.classList.toggle(className, force);
      }
    },
    
    /**
     * 요소에 이벤트 리스너 추가
     * @param {Element|string} target - 대상 요소 또는 선택자
     * @param {string} event - 이벤트 타입
     * @param {Function} handler - 핸들러 함수
     * @param {Object} options - 옵션
     */
    on: function(target, event, handler, options = {}) {
      const element = typeof target === 'string' ? this.$(target) : target;
      if (element) {
        element.addEventListener(event, handler, options);
      }
    },
    
    /**
     * 요소 표시/숨김
     * @param {Element|string} target - 대상 요소 또는 선택자
     * @param {boolean} show - 표시 여부
     */
    toggle: function(target, show) {
      const element = typeof target === 'string' ? this.$(target) : target;
      if (element) {
        element.classList.toggle('hidden', !show);
      }
    }
  },
  
  // ========================================
  // 스토리지 유틸리티
  // ========================================
  storage: {
    /**
     * 로컬 스토리지 저장
     * @param {string} key - 키
     * @param {any} value - 값
     */
    set: function(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage 저장 실패:', e);
      }
    },
    
    /**
     * 로컬 스토리지 조회
     * @param {string} key - 키
     * @param {any} defaultValue - 기본값
     * @returns {any}
     */
    get: function(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('LocalStorage 조회 실패:', e);
        return defaultValue;
      }
    },
    
    /**
     * 로컬 스토리지 삭제
     * @param {string} key - 키
     */
    remove: function(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('LocalStorage 삭제 실패:', e);
      }
    }
  }
};

// ========================================
// 비밀번호 토글 (Password Visibility Toggle)
// ========================================
// 사용법: <button class="password-toggle" data-target="passwordInputId">
//           <span class="material-icons-round">visibility_off</span>
//         </button>
// common.js 로드 시 .password-toggle 버튼을 자동으로 바인딩합니다.

function initPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach(function(btn) {
    // 이미 바인딩된 버튼은 건너뜀
    if (btn.dataset.bound) return;
    btn.dataset.bound = 'true';

    btn.addEventListener('click', function() {
      var targetId = btn.dataset.target;
      var input = document.getElementById(targetId);
      if (!input) return;

      var isVisible = input.type === 'text';
      input.type = isVisible ? 'password' : 'text';

      var icon = btn.querySelector('.material-icons-round');
      if (icon) {
        icon.textContent = isVisible ? 'visibility_off' : 'visibility';
      }

      btn.setAttribute('aria-label', isVisible ? '비밀번호 표시' : '비밀번호 숨기기');
    });
  });
}

// DOM 로드 시 자동 초기화
document.addEventListener('DOMContentLoaded', initPasswordToggles);

// ========================================
// Toast Notification System
// ========================================
MAMA.toast = (function() {
  var _initialized = false;
  var _container = null;

  function _init() {
    if (_initialized) return;
    _initialized = true;

    var style = document.createElement('style');
    style.id = 'mama-toast-styles';
    style.textContent = [
      '.mama-toast-container{position:fixed;top:20px;right:20px;z-index:500;display:flex;flex-direction:column;gap:8px;pointer-events:none;}',
      '@media(max-width:768px){.mama-toast-container{top:auto;bottom:80px;right:16px;left:16px;}}',
      '.mama-toast{pointer-events:auto;display:flex;align-items:center;gap:10px;padding:14px 20px;border-radius:12px;font-family:Pretendard,sans-serif;font-size:14px;font-weight:500;color:#1F2937;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,.12);border:1px solid #E5E7EB;transform:translateX(120%);opacity:0;transition:all .3s ease;max-width:400px;}',
      '.mama-toast.mama-show{transform:translateX(0);opacity:1;}',
      '.mama-toast.mama-hide{transform:translateX(120%);opacity:0;}',
      '.mama-toast--success{border-left:4px solid #22C55E;background:#F0FDF4;}',
      '.mama-toast--error{border-left:4px solid #EF4444;background:#FEF2F2;}',
      '.mama-toast--warning{border-left:4px solid #F59E0B;background:#FFFBEB;}',
      '.mama-toast--info{border-left:4px solid #3B82F6;background:#EFF6FF;}',
      '.mama-toast__icon{flex-shrink:0;width:20px;height:20px;}',
      '.mama-toast__msg{flex:1;line-height:1.4;}',
      '.mama-toast__close{flex-shrink:0;cursor:pointer;color:#9CA3AF;background:none;border:none;padding:4px;font-size:18px;line-height:1;border-radius:4px;}',
      '.mama-toast__close:hover{color:#6B7280;background:#F3F4F6;}'
    ].join('\n');
    document.head.appendChild(style);

    _container = document.createElement('div');
    _container.className = 'mama-toast-container';
    _container.setAttribute('aria-live', 'polite');
    _container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(_container);
  }

  var _icons = {
    success: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#22C55E"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    error: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#EF4444"/><path d="M7 7l6 6M13 7l-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    warning: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#F59E0B"/><path d="M10 6v5M10 13.5v.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
    info: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#3B82F6"/><path d="M10 9v5M10 6.5v.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>'
  };

  function show(message, type, duration) {
    _init();
    type = type || 'info';
    duration = (duration !== undefined) ? duration : 3000;

    var toast = document.createElement('div');
    toast.className = 'mama-toast mama-toast--' + type;
    toast.setAttribute('role', 'status');
    toast.innerHTML =
      '<span class="mama-toast__icon" aria-hidden="true">' + (_icons[type] || _icons.info) + '</span>' +
      '<span class="mama-toast__msg">' + message + '</span>' +
      '<button class="mama-toast__close" aria-label="닫기">&times;</button>';

    toast.querySelector('.mama-toast__close').addEventListener('click', function() {
      _dismiss(toast);
    });

    _container.appendChild(toast);
    requestAnimationFrame(function() {
      toast.classList.add('mama-show');
    });

    if (duration > 0) {
      setTimeout(function() { _dismiss(toast); }, duration);
    }
    return toast;
  }

  function _dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.replace('mama-show', 'mama-hide');
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
  }

  return {
    show: show,
    success: function(msg, dur) { return show(msg, 'success', dur); },
    error: function(msg, dur) { return show(msg, 'error', dur); },
    warning: function(msg, dur) { return show(msg, 'warning', dur); },
    info: function(msg, dur) { return show(msg, 'info', dur); }
  };
})();

// ========================================
// API Helper (Network Error Handler)
// ========================================
MAMA.api = {
  request: function(url, options) {
    options = options || {};
    return fetch(url, Object.assign({
      headers: Object.assign({ 'Content-Type': 'application/json' }, options.headers)
    }, options))
    .then(function(response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .catch(function(error) {
      if (error.message === 'Failed to fetch') {
        MAMA.toast.error('네트워크 연결을 확인해주세요.');
      } else {
        MAMA.toast.error('요청 처리 중 오류가 발생했습니다.');
      }
      throw error;
    });
  }
};

// ========================================
// Form Validation Helpers
// ========================================
MAMA.form = {
  showError: function(inputEl, message) {
    if (!inputEl) return;
    this.clearError(inputEl);
    inputEl.style.borderColor = '#EF4444';
    inputEl.style.backgroundColor = '#FEF2F2';

    var errorEl = document.createElement('p');
    errorEl.className = 'mama-form-error';
    errorEl.style.cssText = 'font-size:12px;color:#EF4444;margin-top:4px;display:flex;align-items:center;gap:4px;';
    errorEl.innerHTML =
      '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="flex-shrink:0" aria-hidden="true"><circle cx="7" cy="7" r="7" fill="#EF4444"/><path d="M7 4v3.5M7 9.5v.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>' +
      MAMA.utils.escapeHtml(message);
    inputEl.parentNode.insertBefore(errorEl, inputEl.nextSibling);
  },

  clearError: function(inputEl) {
    if (!inputEl) return;
    inputEl.style.borderColor = '';
    inputEl.style.backgroundColor = '';
    var next = inputEl.nextElementSibling;
    if (next && next.classList.contains('mama-form-error')) next.remove();
  },

  clearAllErrors: function(formEl) {
    if (!formEl) return;
    formEl.querySelectorAll('.mama-form-error').forEach(function(el) { el.remove(); });
    formEl.querySelectorAll('[style*="border-color"]').forEach(function(el) {
      el.style.borderColor = '';
      el.style.backgroundColor = '';
    });
  }
};

// ========================================
// UI Utilities (Loading Patterns)
// ========================================
MAMA.ui = (function() {
  var _initialized = false;

  function _init() {
    if (_initialized) return;
    _initialized = true;

    var style = document.createElement('style');
    style.id = 'mama-ui-styles';
    style.textContent = [
      '.mama-skeleton{background:linear-gradient(90deg,#E5E7EB 25%,#F3F4F6 50%,#E5E7EB 75%);background-size:200% 100%;animation:mama-sk 1.5s ease-in-out infinite;border-radius:8px;}',
      '.mama-skeleton-text{height:14px;margin-bottom:8px;}',
      '.mama-skeleton-text:last-child{width:60%;}',
      '.mama-skeleton-title{height:24px;width:40%;margin-bottom:12px;}',
      '.mama-skeleton-circle{border-radius:50%;}',
      '@keyframes mama-sk{0%{background-position:200% 0}100%{background-position:-200% 0}}',
      '.mama-btn-loading{position:relative;pointer-events:none;opacity:.7;}',
      '.mama-btn-spinner{display:inline-block;width:16px;height:16px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:mama-sp .6s linear infinite;margin-right:6px;vertical-align:middle;}',
      '@keyframes mama-sp{to{transform:rotate(360deg)}}',
      '.mama-progress-bar{position:fixed;top:0;left:0;width:0;height:3px;background:#FF6D4D;z-index:9999;transition:width .3s ease;box-shadow:0 0 8px rgba(255,109,77,.4);}',
      '.mama-progress-bar.mama-done{width:100%!important;opacity:0;transition:width .2s ease,opacity .4s ease .2s;}'
    ].join('\n');
    document.head.appendChild(style);
  }

  return {
    _init: _init,

    setButtonLoading: function(btn, loading, text) {
      _init();
      if (!btn) return;
      if (loading) {
        btn._originalHTML = btn.innerHTML;
        btn.classList.add('mama-btn-loading');
        btn.disabled = true;
        btn.innerHTML = '<span class="mama-btn-spinner"></span>' + (text || '처리 중...');
      } else {
        btn.classList.remove('mama-btn-loading');
        btn.disabled = false;
        if (btn._originalHTML) btn.innerHTML = btn._originalHTML;
      }
    },

    progressBar: {
      _el: null,
      _timer: null,
      _progress: 0,

      start: function() {
        MAMA.ui._init();
        this.done();
        this._el = document.createElement('div');
        this._el.className = 'mama-progress-bar';
        document.body.appendChild(this._el);
        this._progress = 0;
        var self = this;
        this._timer = setInterval(function() {
          if (self._progress < 90) {
            self._progress += Math.random() * 10 + 2;
            if (self._progress > 90) self._progress = 90;
            self._el.style.width = self._progress + '%';
          }
        }, 300);
      },

      done: function() {
        if (this._timer) {
          clearInterval(this._timer);
          this._timer = null;
        }
        if (this._el) {
          this._el.classList.add('mama-done');
          var el = this._el;
          setTimeout(function() { if (el.parentNode) el.remove(); }, 600);
          this._el = null;
        }
        this._progress = 0;
      }
    }
  };
})();

// 전역 등록
window.MAMA = MAMA;

// 전역 단축 함수 (편의성)
window.$ = (selector) => MAMA.dom.$(selector);
window.$$ = (selector) => MAMA.dom.$$(selector);

// Toast 전역 단축 함수
window.showToast = function(message, type, duration) { return MAMA.toast.show(message, type, duration); };

// UI 스타일 자동 초기화
document.addEventListener('DOMContentLoaded', function() {
  MAMA.ui._init();
});
