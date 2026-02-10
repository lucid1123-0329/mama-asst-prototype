/**
 * MAMA-ASST Modal System
 * @version 1.0.0
 * @description 통합 모달 관리 시스템
 */

const ModalManager = {
  // 활성 모달 스택
  activeModals: [],
  
  // ESC 키 핸들러 참조
  escKeyHandler: null,
  
  // ========================================
  // 기본 모달 제어
  // ========================================
  
  /**
   * 모달 열기
   * @param {string} modalId - 모달 ID
   * @param {Object} options - 옵션
   */
  open: function(modalId, options = {}) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error(`Modal not found: ${modalId}`);
      return;
    }
    
    // 모달 표시
    modal.classList.remove('hidden');
    modal.classList.add('open');
    
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 활성 모달 스택에 추가
    this.activeModals.push(modalId);
    
    // 애니메이션 적용
    const container = modal.querySelector('.modal-container, [class*="max-w-"]');
    if (container) {
      setTimeout(() => {
        container.classList.add('animate-modal-in');
      }, 10);
    }
    
    // ESC 키 이벤트 등록
    if (!this.escKeyHandler) {
      this.escKeyHandler = (e) => {
        if (e.key === 'Escape' && this.activeModals.length > 0) {
          const topModal = this.activeModals[this.activeModals.length - 1];
          this.close(topModal);
        }
      };
      document.addEventListener('keydown', this.escKeyHandler);
    }
    
    // 포커스 트랩 설정
    if (options.focusTrap !== false) {
      this.setupFocusTrap(modal);
    }
    
    // 콜백 실행
    if (typeof options.onOpen === 'function') {
      options.onOpen(modal);
    }
  },
  
  /**
   * 모달 닫기
   * @param {string} modalId - 모달 ID
   * @param {Object} options - 옵션
   */
  close: function(modalId, options = {}) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // 애니메이션 제거
    const container = modal.querySelector('.modal-container, [class*="max-w-"]');
    if (container) {
      container.classList.remove('animate-modal-in');
    }
    
    // 모달 숨김
    modal.classList.remove('open');
    modal.classList.add('hidden');
    
    // 스택에서 제거
    this.activeModals = this.activeModals.filter(id => id !== modalId);
    
    // 마지막 모달이면 body 스크롤 복원
    if (this.activeModals.length === 0) {
      document.body.style.overflow = '';
      
      // ESC 키 이벤트 제거
      if (this.escKeyHandler) {
        document.removeEventListener('keydown', this.escKeyHandler);
        this.escKeyHandler = null;
      }
    }
    
    // 콜백 실행
    if (typeof options.onClose === 'function') {
      options.onClose(modal);
    }
  },
  
  /**
   * 모달 토글
   * @param {string} modalId - 모달 ID
   */
  toggle: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal && modal.classList.contains('open')) {
      this.close(modalId);
    } else {
      this.open(modalId);
    }
  },
  
  /**
   * 모든 모달 닫기
   */
  closeAll: function() {
    [...this.activeModals].forEach(modalId => {
      this.close(modalId);
    });
  },
  
  // ========================================
  // 포커스 트랩
  // ========================================
  
  /**
   * 포커스 트랩 설정
   * @param {Element} modal - 모달 요소
   */
  setupFocusTrap: function(modal) {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // 첫 번째 요소에 포커스
    setTimeout(() => firstElement.focus(), 100);
    
    // Tab 키 이벤트 처리
    modal.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  },
  
  // ========================================
  // 확인 다이얼로그
  // ========================================
  
  /**
   * 확인 다이얼로그 표시 (Promise 기반)
   * @param {Object} options - 옵션
   * @returns {Promise<boolean>}
   */
  confirm: function(options = {}) {
    return new Promise((resolve) => {
      const {
        title = '확인',
        message = '계속하시겠습니까?',
        confirmText = '확인',
        cancelText = '취소',
        type = 'warning', // warning, danger, info, success
        icon = null
      } = options;
      
      // 타입별 스타일
      const typeStyles = {
        warning: { bg: 'bg-yellow-100', icon: 'warning', iconColor: 'text-yellow-600' },
        danger: { bg: 'bg-red-100', icon: 'error', iconColor: 'text-red-600' },
        info: { bg: 'bg-blue-100', icon: 'info', iconColor: 'text-blue-600' },
        success: { bg: 'bg-green-100', icon: 'check_circle', iconColor: 'text-green-600' }
      };
      
      const style = typeStyles[type] || typeStyles.warning;
      const iconName = icon || style.icon;
      
      // 동적 모달 ID
      const modalId = 'dynamicConfirmModal_' + Date.now();
      
      // 모달 HTML 생성
      const modalHtml = `
        <div id="${modalId}" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/50 transition-opacity" onclick="ModalManager.resolveConfirm('${modalId}', false)"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center transform scale-95 opacity-0 transition-all duration-200" style="animation: modalFadeIn 0.2s ease forwards;">
            <div class="w-16 h-16 mx-auto mb-4 ${style.bg} rounded-full flex items-center justify-center">
              <span class="material-icons-round ${style.iconColor} text-3xl">${iconName}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
            <p class="text-gray-500 mb-6">${message}</p>
            <div class="flex gap-3">
              <button onclick="ModalManager.resolveConfirm('${modalId}', false)" 
                class="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors">
                ${cancelText}
              </button>
              <button onclick="ModalManager.resolveConfirm('${modalId}', true)" 
                class="flex-1 px-4 py-2.5 ${type === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'} text-white rounded-xl font-medium transition-colors">
                ${confirmText}
              </button>
            </div>
          </div>
        </div>
        <style>
          @keyframes modalFadeIn {
            to { transform: scale(1); opacity: 1; }
          }
        </style>
      `;
      
      // DOM에 추가
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      document.body.style.overflow = 'hidden';
      
      // Promise resolve 함수 저장
      this._confirmResolvers = this._confirmResolvers || {};
      this._confirmResolvers[modalId] = resolve;
    });
  },
  
  /**
   * 확인 다이얼로그 결과 처리
   * @param {string} modalId - 모달 ID
   * @param {boolean} result - 결과
   */
  resolveConfirm: function(modalId, result) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.remove();
    }
    
    // 다른 모달이 없으면 스크롤 복원
    if (this.activeModals.length === 0) {
      document.body.style.overflow = '';
    }
    
    // Promise resolve
    if (this._confirmResolvers && this._confirmResolvers[modalId]) {
      this._confirmResolvers[modalId](result);
      delete this._confirmResolvers[modalId];
    }
  },
  
  // ========================================
  // 알림 다이얼로그
  // ========================================
  
  /**
   * 알림 다이얼로그 표시
   * @param {Object} options - 옵션
   * @returns {Promise<void>}
   */
  alert: function(options = {}) {
    return new Promise((resolve) => {
      const {
        title = '알림',
        message = '',
        confirmText = '확인',
        type = 'info'
      } = options;
      
      const typeStyles = {
        warning: { bg: 'bg-yellow-100', icon: 'warning', iconColor: 'text-yellow-600' },
        danger: { bg: 'bg-red-100', icon: 'error', iconColor: 'text-red-600' },
        info: { bg: 'bg-blue-100', icon: 'info', iconColor: 'text-blue-600' },
        success: { bg: 'bg-green-100', icon: 'check_circle', iconColor: 'text-green-600' }
      };
      
      const style = typeStyles[type] || typeStyles.info;
      const modalId = 'dynamicAlertModal_' + Date.now();
      
      const modalHtml = `
        <div id="${modalId}" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/50 transition-opacity"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center transform scale-95 opacity-0 transition-all duration-200" style="animation: modalFadeIn 0.2s ease forwards;">
            <div class="w-16 h-16 mx-auto mb-4 ${style.bg} rounded-full flex items-center justify-center">
              <span class="material-icons-round ${style.iconColor} text-3xl">${style.icon}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">${title}</h3>
            <p class="text-gray-500 mb-6">${message}</p>
            <button onclick="ModalManager.closeAlert('${modalId}')" 
              class="w-full px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors">
              ${confirmText}
            </button>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      document.body.style.overflow = 'hidden';
      
      this._alertResolvers = this._alertResolvers || {};
      this._alertResolvers[modalId] = resolve;
    });
  },
  
  /**
   * 알림 다이얼로그 닫기
   * @param {string} modalId - 모달 ID
   */
  closeAlert: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.remove();
    }
    
    if (this.activeModals.length === 0) {
      document.body.style.overflow = '';
    }
    
    if (this._alertResolvers && this._alertResolvers[modalId]) {
      this._alertResolvers[modalId]();
      delete this._alertResolvers[modalId];
    }
  },
  
  // ========================================
  // 위험 작업 확인 (삭제 등)
  // ========================================
  
  /**
   * 위험 작업 확인 다이얼로그
   * @param {Object} options - 옵션
   * @returns {Promise<boolean>}
   */
  confirmDanger: function(options = {}) {
    const {
      title = '정말 삭제하시겠습니까?',
      message = '이 작업은 되돌릴 수 없습니다.',
      confirmText = '삭제',
      confirmWord = '삭제',
      checkboxText = '위 내용을 이해하고 동의합니다.'
    } = options;
    
    return new Promise((resolve) => {
      const modalId = 'dangerConfirmModal_' + Date.now();
      
      const modalHtml = `
        <div id="${modalId}" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div class="fixed inset-0 bg-black/50 transition-opacity" onclick="ModalManager.resolveDanger('${modalId}', false)"></div>
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform scale-95 opacity-0 transition-all duration-200" style="animation: modalFadeIn 0.2s ease forwards;">
            <div class="p-6 text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span class="material-icons-round text-red-600 text-3xl">warning</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">${title}</h3>
              <p class="text-gray-500">${message}</p>
            </div>
            <div class="px-6 pb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                확인을 위해 <span class="text-red-600 font-bold">"${confirmWord}"</span>를 입력하세요
              </label>
              <input type="text" id="${modalId}_input" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="${confirmWord}" oninput="ModalManager.checkDangerForm('${modalId}', '${confirmWord}')">
            </div>
            <div class="px-6 pb-6">
              <label class="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" id="${modalId}_check" onchange="ModalManager.checkDangerForm('${modalId}', '${confirmWord}')">
                ${checkboxText}
              </label>
            </div>
            <div class="flex items-center justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button onclick="ModalManager.resolveDanger('${modalId}', false)" class="px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                취소
              </button>
              <button id="${modalId}_btn" disabled onclick="ModalManager.resolveDanger('${modalId}', true)" class="px-4 py-2.5 text-white bg-red-500 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                ${confirmText}
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      document.body.style.overflow = 'hidden';
      
      this._dangerResolvers = this._dangerResolvers || {};
      this._dangerResolvers[modalId] = resolve;
    });
  },
  
  /**
   * 위험 작업 폼 검증
   * @param {string} modalId - 모달 ID
   * @param {string} confirmWord - 확인 단어
   */
  checkDangerForm: function(modalId, confirmWord) {
    const input = document.getElementById(modalId + '_input');
    const checkbox = document.getElementById(modalId + '_check');
    const btn = document.getElementById(modalId + '_btn');
    
    if (input && checkbox && btn) {
      btn.disabled = !(input.value === confirmWord && checkbox.checked);
    }
  },
  
  /**
   * 위험 작업 결과 처리
   * @param {string} modalId - 모달 ID
   * @param {boolean} result - 결과
   */
  resolveDanger: function(modalId, result) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.remove();
    }
    
    if (this.activeModals.length === 0) {
      document.body.style.overflow = '';
    }
    
    if (this._dangerResolvers && this._dangerResolvers[modalId]) {
      this._dangerResolvers[modalId](result);
      delete this._dangerResolvers[modalId];
    }
  }
};

// 전역 등록
window.ModalManager = ModalManager;

// ========================================
// 하위 호환 전역 함수
// ========================================

/**
 * 모달 열기 (하위 호환)
 * @param {string} modalId - 모달 ID
 */
function openModal(modalId) {
  ModalManager.open(modalId);
}

/**
 * 모달 닫기 (하위 호환)
 * @param {string} modalId - 모달 ID
 */
function closeModal(modalId) {
  ModalManager.close(modalId);
}

// 전역 함수 등록
window.openModal = openModal;
window.closeModal = closeModal;
