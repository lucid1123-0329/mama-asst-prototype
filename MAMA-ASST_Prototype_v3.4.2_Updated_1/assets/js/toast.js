/**
 * MAMA-ASST Toast Notification System
 * @version 1.0.0
 * @description 토스트 알림 관리 시스템
 */

const ToastManager = {
  // 토스트 컨테이너
  container: null,
  
  // 기본 설정
  defaults: {
    duration: 3000,
    position: 'top-right', // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    maxToasts: 5
  },
  
  // 활성 토스트 목록
  activeToasts: [],
  
  // ========================================
  // 초기화
  // ========================================
  
  /**
   * 토스트 컨테이너 초기화
   */
  init: function() {
    if (this.container) return;
    
    // 기존 컨테이너가 있으면 사용
    this.container = document.getElementById('toastContainer');
    
    if (!this.container) {
      // 새로 생성
      this.container = document.createElement('div');
      this.container.id = 'toastContainer';
      this.updatePosition();
      document.body.appendChild(this.container);
    }
  },
  
  /**
   * 컨테이너 위치 업데이트
   */
  updatePosition: function() {
    if (!this.container) return;
    
    const positions = {
      'top-right': 'fixed top-4 right-4 z-[9999] space-y-2',
      'top-left': 'fixed top-4 left-4 z-[9999] space-y-2',
      'bottom-right': 'fixed bottom-4 right-4 z-[9999] space-y-2',
      'bottom-left': 'fixed bottom-4 left-4 z-[9999] space-y-2',
      'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] space-y-2',
      'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999] space-y-2'
    };
    
    this.container.className = positions[this.defaults.position] || positions['top-right'];
  },
  
  // ========================================
  // 토스트 표시
  // ========================================
  
  /**
   * 토스트 표시
   * @param {string} message - 메시지
   * @param {string} type - 타입 (success, error, warning, info)
   * @param {Object} options - 추가 옵션
   */
  show: function(message, type = 'success', options = {}) {
    this.init();
    
    const duration = options.duration || this.defaults.duration;
    const closable = options.closable !== false;
    
    // 최대 토스트 수 초과 시 오래된 것 제거
    while (this.activeToasts.length >= this.defaults.maxToasts) {
      this.remove(this.activeToasts[0].id);
    }
    
    // 타입별 스타일
    const styles = {
      success: {
        bg: 'bg-green-500',
        icon: 'check_circle',
        title: '성공'
      },
      error: {
        bg: 'bg-red-500',
        icon: 'error',
        title: '오류'
      },
      warning: {
        bg: 'bg-yellow-500',
        icon: 'warning',
        title: '경고'
      },
      info: {
        bg: 'bg-blue-500',
        icon: 'info',
        title: '알림'
      }
    };
    
    const style = styles[type] || styles.info;
    const toastId = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // 토스트 요소 생성
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `${style.bg} text-white px-5 py-4 rounded-xl shadow-lg flex items-center gap-3 transform translate-x-full transition-all duration-300 min-w-[300px] max-w-md`;
    
    toast.innerHTML = `
      <span class="material-icons-round text-xl flex-shrink-0">${style.icon}</span>
      <span class="font-medium flex-1">${message}</span>
      ${closable ? `
        <button onclick="ToastManager.remove('${toastId}')" class="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors">
          <span class="material-icons-round text-sm">close</span>
        </button>
      ` : ''}
    `;
    
    // 컨테이너에 추가
    this.container.appendChild(toast);
    
    // 활성 토스트 목록에 추가
    const toastData = {
      id: toastId,
      element: toast,
      timeout: null
    };
    this.activeToasts.push(toastData);
    
    // 애니메이션 (등장)
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full');
      toast.classList.add('translate-x-0');
    });
    
    // 자동 제거 타이머
    if (duration > 0) {
      toastData.timeout = setTimeout(() => {
        this.remove(toastId);
      }, duration);
    }
    
    return toastId;
  },
  
  /**
   * 토스트 제거
   * @param {string} toastId - 토스트 ID
   */
  remove: function(toastId) {
    const index = this.activeToasts.findIndex(t => t.id === toastId);
    if (index === -1) return;
    
    const toastData = this.activeToasts[index];
    const toast = toastData.element;
    
    // 타이머 정리
    if (toastData.timeout) {
      clearTimeout(toastData.timeout);
    }
    
    // 애니메이션 (퇴장)
    toast.classList.remove('translate-x-0');
    toast.classList.add('translate-x-full', 'opacity-0');
    
    // DOM에서 제거
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
    
    // 목록에서 제거
    this.activeToasts.splice(index, 1);
  },
  
  /**
   * 모든 토스트 제거
   */
  clear: function() {
    [...this.activeToasts].forEach(toast => {
      this.remove(toast.id);
    });
  },
  
  // ========================================
  // 단축 메서드
  // ========================================
  
  /**
   * 성공 토스트
   * @param {string} message - 메시지
   * @param {Object} options - 옵션
   */
  success: function(message, options = {}) {
    return this.show(message, 'success', options);
  },
  
  /**
   * 에러 토스트
   * @param {string} message - 메시지
   * @param {Object} options - 옵션
   */
  error: function(message, options = {}) {
    // 에러는 기본 5초 표시
    return this.show(message, 'error', { duration: 5000, ...options });
  },
  
  /**
   * 경고 토스트
   * @param {string} message - 메시지
   * @param {Object} options - 옵션
   */
  warning: function(message, options = {}) {
    return this.show(message, 'warning', options);
  },
  
  /**
   * 정보 토스트
   * @param {string} message - 메시지
   * @param {Object} options - 옵션
   */
  info: function(message, options = {}) {
    return this.show(message, 'info', options);
  },
  
  // ========================================
  // 로딩 토스트 (닫히지 않는)
  // ========================================
  
  /**
   * 로딩 토스트 표시
   * @param {string} message - 메시지
   * @returns {string} 토스트 ID
   */
  loading: function(message = '처리 중...') {
    this.init();
    
    const toastId = 'toast_loading_' + Date.now();
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = 'bg-gray-700 text-white px-5 py-4 rounded-xl shadow-lg flex items-center gap-3 transform translate-x-full transition-all duration-300 min-w-[300px] max-w-md';
    
    toast.innerHTML = `
      <svg class="animate-spin h-5 w-5 text-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="font-medium flex-1">${message}</span>
    `;
    
    this.container.appendChild(toast);
    
    this.activeToasts.push({
      id: toastId,
      element: toast,
      timeout: null
    });
    
    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full');
      toast.classList.add('translate-x-0');
    });
    
    return toastId;
  },
  
  /**
   * 로딩 토스트 완료 처리
   * @param {string} loadingId - 로딩 토스트 ID
   * @param {string} message - 완료 메시지
   * @param {string} type - 완료 타입
   */
  loaded: function(loadingId, message = '완료되었습니다.', type = 'success') {
    this.remove(loadingId);
    this.show(message, type);
  },
  
  // ========================================
  // 프로미스 기반 토스트
  // ========================================
  
  /**
   * Promise 토스트 (로딩 → 결과)
   * @param {Promise} promise - 대상 Promise
   * @param {Object} messages - 메시지 객체
   * @param {Object} options - 추가 옵션
   * @returns {Promise} 결과 또는 에러 정보를 담은 객체
   */
  promise: async function(promise, messages = {}, options = {}) {
    const {
      loading = '처리 중...',
      success = '성공했습니다.',
      error = '실패했습니다.'
    } = messages;
    
    const { rethrow = false } = options;
    
    const loadingId = this.loading(loading);
    
    try {
      const result = await promise;
      this.loaded(loadingId, typeof success === 'function' ? success(result) : success, 'success');
      return { success: true, data: result };
    } catch (err) {
      this.loaded(loadingId, typeof error === 'function' ? error(err) : error, 'error');
      
      // 옵션으로 에러를 다시 throw할지 결정 (기본: 삼킴)
      if (rethrow) {
        throw err;
      }
      
      // 에러 정보를 객체로 반환 (Console 에러 방지)
      return { success: false, error: err };
    }
  }
};

// 전역 등록
window.ToastManager = ToastManager;

// ========================================
// 하위 호환 전역 함수
// ========================================

/**
 * 토스트 표시 (하위 호환)
 * @param {string} message - 메시지
 * @param {string} type - 타입
 */
function showToast(message, type = 'success') {
  ToastManager.show(message, type);
}

// 전역 함수 등록
window.showToast = showToast;
