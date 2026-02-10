/**
 * MAMA-ASST Table Utilities
 * @version 1.0.0
 * @description 테이블, 필터, 페이지네이션 공통 기능
 */

const TableManager = {
  // ========================================
  // 테이블 정렬
  // ========================================
  
  /**
   * 테이블 정렬 초기화
   * @param {string} tableId - 테이블 ID
   * @param {Object} options - 옵션
   */
  initSort: function(tableId, options = {}) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const headers = table.querySelectorAll('th[data-sortable]');
    
    headers.forEach(header => {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => {
        const column = header.dataset.column;
        const currentOrder = header.dataset.order || 'none';
        const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        
        // 다른 헤더 초기화
        headers.forEach(h => {
          h.dataset.order = 'none';
          const icon = h.querySelector('.sort-icon');
          if (icon) icon.textContent = 'unfold_more';
        });
        
        // 현재 헤더 업데이트
        header.dataset.order = newOrder;
        const icon = header.querySelector('.sort-icon');
        if (icon) {
          icon.textContent = newOrder === 'asc' ? 'arrow_upward' : 'arrow_downward';
        }
        
        // 콜백 실행
        if (typeof options.onSort === 'function') {
          options.onSort(column, newOrder);
        }
      });
    });
  },
  
  /**
   * 테이블 데이터 정렬
   * @param {Array} data - 데이터 배열
   * @param {string} column - 정렬 컬럼
   * @param {string} order - 정렬 순서 (asc/desc)
   * @returns {Array} 정렬된 배열
   */
  sortData: function(data, column, order = 'asc') {
    return [...data].sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];
      
      // 숫자 처리
      if (!isNaN(valueA) && !isNaN(valueB)) {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }
      
      // 문자열 처리
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
  },
  
  // ========================================
  // 검색/필터
  // ========================================
  
  /**
   * 검색 필터 초기화
   * @param {string} inputId - 검색 입력 ID
   * @param {Object} options - 옵션
   */
  initSearch: function(inputId, options = {}) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const debounceTime = options.debounce || 300;
    
    let timeout;
    input.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (typeof options.onSearch === 'function') {
          options.onSearch(e.target.value.trim().toLowerCase());
        }
      }, debounceTime);
    });
    
    // 엔터 키 즉시 검색
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        clearTimeout(timeout);
        if (typeof options.onSearch === 'function') {
          options.onSearch(e.target.value.trim().toLowerCase());
        }
      }
    });
  },
  
  /**
   * 데이터 필터링
   * @param {Array} data - 데이터 배열
   * @param {string} query - 검색어
   * @param {Array} fields - 검색 대상 필드
   * @returns {Array} 필터된 배열
   */
  filterData: function(data, query, fields = []) {
    if (!query) return data;
    
    const lowerQuery = query.toLowerCase();
    
    return data.filter(item => {
      // 필드 지정이 없으면 모든 값 검색
      const searchFields = fields.length > 0 ? fields : Object.keys(item);
      
      return searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerQuery);
      });
    });
  },
  
  /**
   * 다중 필터 적용
   * @param {Array} data - 데이터 배열
   * @param {Object} filters - 필터 조건 객체
   * @returns {Array} 필터된 배열
   */
  applyFilters: function(data, filters = {}) {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        // 빈 값이면 필터 통과
        if (value === '' || value === null || value === undefined || value === 'all') {
          return true;
        }
        
        const itemValue = item[key];
        
        // 배열인 경우 포함 여부 확인
        if (Array.isArray(value)) {
          return value.includes(itemValue);
        }
        
        // 정확히 일치
        return String(itemValue).toLowerCase() === String(value).toLowerCase();
      });
    });
  },
  
  // ========================================
  // 페이지네이션
  // ========================================
  
  /**
   * 페이지네이션 상태
   */
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  },
  
  /**
   * 페이지네이션 초기화
   * @param {Object} options - 옵션
   */
  initPagination: function(options = {}) {
    this.pagination = {
      currentPage: options.page || 1,
      itemsPerPage: options.perPage || 10,
      totalItems: options.total || 0
    };
  },
  
  /**
   * 페이지별 데이터 슬라이스
   * @param {Array} data - 전체 데이터
   * @param {number} page - 페이지 번호
   * @param {number} perPage - 페이지당 항목 수
   * @returns {Array} 페이지 데이터
   */
  paginate: function(data, page = 1, perPage = 10) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return data.slice(start, end);
  },
  
  /**
   * 페이지네이션 정보 계산
   * @param {number} totalItems - 전체 항목 수
   * @param {number} currentPage - 현재 페이지
   * @param {number} perPage - 페이지당 항목 수
   * @returns {Object} 페이지네이션 정보
   */
  getPaginationInfo: function(totalItems, currentPage, perPage) {
    const totalPages = Math.ceil(totalItems / perPage);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);
    
    return {
      totalItems,
      totalPages,
      currentPage,
      perPage,
      startItem,
      endItem,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages
    };
  },
  
  /**
   * 페이지네이션 UI 렌더링
   * @param {string} containerId - 컨테이너 ID
   * @param {Object} info - 페이지네이션 정보
   * @param {Function} onChange - 페이지 변경 콜백
   */
  renderPagination: function(containerId, info, onChange) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const { totalPages, currentPage, hasPrev, hasNext, startItem, endItem, totalItems } = info;
    
    // 페이지 버튼 생성
    let pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    container.innerHTML = `
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">
          총 ${totalItems.toLocaleString()}개 중 ${startItem.toLocaleString()}-${endItem.toLocaleString()}
        </p>
        <div class="flex items-center gap-1">
          <button ${!hasPrev ? 'disabled' : ''} onclick="TableManager._changePage(${currentPage - 1})" 
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <span class="material-icons-round text-xl">chevron_left</span>
          </button>
          ${pages.map(page => `
            <button onclick="TableManager._changePage(${page})" 
              class="w-10 h-10 rounded-lg font-medium transition-colors ${page === currentPage ? 'bg-indigo-500 text-white' : 'hover:bg-gray-100 text-gray-700'}">
              ${page}
            </button>
          `).join('')}
          <button ${!hasNext ? 'disabled' : ''} onclick="TableManager._changePage(${currentPage + 1})" 
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            <span class="material-icons-round text-xl">chevron_right</span>
          </button>
        </div>
      </div>
    `;
    
    // 콜백 저장
    this._pageChangeCallback = onChange;
  },
  
  /**
   * 페이지 변경 (내부용)
   * @param {number} page - 페이지 번호
   */
  _changePage: function(page) {
    if (typeof this._pageChangeCallback === 'function') {
      this._pageChangeCallback(page);
    }
  },
  
  // ========================================
  // 체크박스 선택
  // ========================================
  
  /**
   * 선택된 항목 목록
   */
  selectedItems: [],
  
  /**
   * 체크박스 선택 초기화
   * @param {string} tableId - 테이블 ID
   * @param {Object} options - 옵션
   */
  initCheckboxSelection: function(tableId, options = {}) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    this.selectedItems = [];
    
    // 전체 선택 체크박스
    const selectAllCheckbox = table.querySelector('thead input[type="checkbox"]');
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
        checkboxes.forEach(cb => {
          cb.checked = e.target.checked;
          this._updateSelection(cb.value, e.target.checked);
        });
        
        if (typeof options.onSelectionChange === 'function') {
          options.onSelectionChange(this.selectedItems);
        }
      });
    }
    
    // 개별 체크박스
    table.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && e.target.closest('tbody')) {
        this._updateSelection(e.target.value, e.target.checked);
        
        // 전체 선택 상태 업데이트
        if (selectAllCheckbox) {
          const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
          const allChecked = Array.from(checkboxes).every(cb => cb.checked);
          selectAllCheckbox.checked = allChecked;
        }
        
        if (typeof options.onSelectionChange === 'function') {
          options.onSelectionChange(this.selectedItems);
        }
      }
    });
  },
  
  /**
   * 선택 상태 업데이트 (내부용)
   * @param {string} value - 값
   * @param {boolean} selected - 선택 여부
   */
  _updateSelection: function(value, selected) {
    if (selected) {
      if (!this.selectedItems.includes(value)) {
        this.selectedItems.push(value);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(item => item !== value);
    }
  },
  
  /**
   * 선택 초기화
   */
  clearSelection: function() {
    this.selectedItems = [];
  },
  
  // ========================================
  // 행 클릭/상세보기
  // ========================================
  
  /**
   * 행 클릭 이벤트 초기화
   * @param {string} tableId - 테이블 ID
   * @param {Function} onClick - 클릭 콜백
   */
  initRowClick: function(tableId, onClick) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    
    tbody.addEventListener('click', (e) => {
      // 체크박스나 버튼 클릭은 무시
      if (e.target.closest('input, button, a')) return;
      
      const row = e.target.closest('tr');
      if (row && typeof onClick === 'function') {
        const rowId = row.dataset.id || row.dataset.rowId;
        onClick(rowId, row);
      }
    });
  },
  
  // ========================================
  // 드롭다운 필터
  // ========================================
  
  /**
   * 드롭다운 필터 초기화
   * @param {string} selectId - 셀렉트 ID
   * @param {Function} onChange - 변경 콜백
   */
  initDropdownFilter: function(selectId, onChange) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.addEventListener('change', (e) => {
      if (typeof onChange === 'function') {
        onChange(e.target.value);
      }
    });
  }
};

// 전역 등록
window.TableManager = TableManager;
