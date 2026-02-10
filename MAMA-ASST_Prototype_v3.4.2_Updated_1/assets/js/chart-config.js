/**
 * MAMA-ASST Chart.js Configuration
 * @version 1.0.0
 * @description Chart.js 공통 설정 및 유틸리티
 */

const ChartConfig = {
  // ========================================
  // 컬러 팔레트
  // ========================================
  colors: {
    // 브랜드 컬러
    coral: '#FF6D4D',
    coralLight: 'rgba(255, 109, 77, 0.1)',
    navy: '#1A2E4D',
    navyMedium: '#2C4872',
    
    // 과목 컬러
    korean: '#4285F4',
    koreanLight: 'rgba(66, 133, 244, 0.1)',
    english: '#34A853',
    englishLight: 'rgba(52, 168, 83, 0.1)',
    math: '#FBBC05',
    mathLight: 'rgba(251, 188, 5, 0.1)',
    
    // 슈퍼관리자 컬러
    super: '#6366F1',
    superLight: 'rgba(99, 102, 241, 0.1)',
    
    // 시맨틱 컬러
    success: '#22C55E',
    successLight: 'rgba(34, 197, 94, 0.1)',
    error: '#EF4444',
    errorLight: 'rgba(239, 68, 68, 0.1)',
    warning: '#F59E0B',
    warningLight: 'rgba(245, 158, 11, 0.1)',
    info: '#3B82F6',
    infoLight: 'rgba(59, 130, 246, 0.1)',
    
    // 중립 컬러
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    
    // 그라데이션용 컬러 배열
    palette: [
      '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
      '#EC4899', '#F43F5E', '#FF6D4D', '#F59E0B',
      '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6'
    ]
  },
  
  // ========================================
  // 기본 옵션
  // ========================================
  defaults: {
    // 폰트 설정
    font: {
      family: "'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
      size: 12,
      weight: 400
    },
    
    // 반응형 설정
    responsive: true,
    maintainAspectRatio: false,
    
    // 애니메이션
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    
    // 플러그인 기본값
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 46, 77, 0.95)',
        titleFont: { size: 13, weight: 600 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4
      }
    }
  },
  
  // ========================================
  // 차트 타입별 기본 옵션
  // ========================================
  
  /**
   * 라인 차트 기본 옵션
   * @param {Object} customOptions - 커스텀 옵션
   * @returns {Object} 병합된 옵션
   */
  getLineOptions: function(customOptions = {}) {
    return this._mergeOptions({
      ...this.defaults,
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: this.colors.gray500, padding: 8 }
        },
        y: {
          beginAtZero: true,
          grid: { color: this.colors.gray100 },
          ticks: { color: this.colors.gray500, padding: 8 }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2
        },
        point: {
          radius: 4,
          hoverRadius: 6,
          borderWidth: 2,
          backgroundColor: '#FFFFFF'
        }
      }
    }, customOptions);
  },
  
  /**
   * 바 차트 기본 옵션
   * @param {Object} customOptions - 커스텀 옵션
   * @returns {Object} 병합된 옵션
   */
  getBarOptions: function(customOptions = {}) {
    return this._mergeOptions({
      ...this.defaults,
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: this.colors.gray500, padding: 8 }
        },
        y: {
          beginAtZero: true,
          grid: { color: this.colors.gray100 },
          ticks: { color: this.colors.gray500, padding: 8 }
        }
      },
      elements: {
        bar: {
          borderRadius: 6,
          borderSkipped: false
        }
      }
    }, customOptions);
  },
  
  /**
   * 도넛/파이 차트 기본 옵션
   * @param {Object} customOptions - 커스텀 옵션
   * @returns {Object} 병합된 옵션
   */
  getDoughnutOptions: function(customOptions = {}) {
    return this._mergeOptions({
      ...this.defaults,
      cutout: '70%',
      plugins: {
        ...this.defaults.plugins,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 15,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      }
    }, customOptions);
  },
  
  /**
   * 영역 차트 기본 옵션
   * @param {Object} customOptions - 커스텀 옵션
   * @returns {Object} 병합된 옵션
   */
  getAreaOptions: function(customOptions = {}) {
    return this._mergeOptions(this.getLineOptions(), {
      elements: {
        line: {
          fill: true,
          tension: 0.4
        }
      }
    }, customOptions);
  },
  
  // ========================================
  // 데이터셋 생성 헬퍼
  // ========================================
  
  /**
   * 라인 데이터셋 생성
   * @param {string} label - 레이블
   * @param {Array} data - 데이터
   * @param {string} color - 색상
   * @param {Object} options - 추가 옵션
   * @returns {Object} 데이터셋
   */
  createLineDataset: function(label, data, color, options = {}) {
    return {
      label,
      data,
      borderColor: color,
      backgroundColor: this._hexToRgba(color, 0.1),
      tension: 0.4,
      fill: options.fill || false,
      ...options
    };
  },
  
  /**
   * 바 데이터셋 생성
   * @param {string} label - 레이블
   * @param {Array} data - 데이터
   * @param {string|Array} color - 색상
   * @param {Object} options - 추가 옵션
   * @returns {Object} 데이터셋
   */
  createBarDataset: function(label, data, color, options = {}) {
    return {
      label,
      data,
      backgroundColor: Array.isArray(color) ? color : color,
      borderRadius: 6,
      ...options
    };
  },
  
  /**
   * 도넛 데이터셋 생성
   * @param {Array} data - 데이터
   * @param {Array} colors - 색상 배열
   * @param {Object} options - 추가 옵션
   * @returns {Object} 데이터셋
   */
  createDoughnutDataset: function(data, colors = null, options = {}) {
    return {
      data,
      backgroundColor: colors || this.colors.palette.slice(0, data.length),
      borderWidth: 0,
      ...options
    };
  },
  
  // ========================================
  // 유틸리티
  // ========================================
  
  /**
   * Hex를 RGBA로 변환
   * @param {string} hex - Hex 색상
   * @param {number} alpha - 투명도
   * @returns {string} RGBA 문자열
   */
  _hexToRgba: function(hex, alpha = 1) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;
    
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
  },
  
  /**
   * 옵션 딥 머지
   * @param {...Object} objects - 머지할 객체들
   * @returns {Object} 머지된 객체
   */
  _mergeOptions: function(...objects) {
    const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);
    
    return objects.reduce((prev, obj) => {
      if (!obj) return prev;
      
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];
        
        if (isObject(pVal) && isObject(oVal)) {
          prev[key] = this._mergeOptions(pVal, oVal);
        } else {
          prev[key] = oVal;
        }
      });
      
      return prev;
    }, {});
  },
  
  /**
   * 숫자 포맷팅 콜백 (툴팁, 축 레이블용)
   * @param {string} type - 포맷 타입 (number, currency, percent)
   * @returns {Function} 포맷 함수
   */
  getFormatter: function(type = 'number') {
    switch (type) {
      case 'currency':
        return (value) => '₩' + value.toLocaleString();
      case 'percent':
        return (value) => value + '%';
      case 'compact':
        return (value) => {
          if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
          return value;
        };
      default:
        return (value) => value.toLocaleString();
    }
  },
  
  // ========================================
  // 차트 생성 헬퍼
  // ========================================
  
  /**
   * 차트 생성
   * @param {string} canvasId - 캔버스 ID
   * @param {string} type - 차트 타입
   * @param {Object} data - 데이터
   * @param {Object} options - 옵션
   * @returns {Chart} 차트 인스턴스
   */
  create: function(canvasId, type, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error(`Canvas not found: ${canvasId}`);
      return null;
    }
    
    // 기존 차트가 있으면 제거
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }
    
    // 타입별 기본 옵션 적용
    let defaultOptions;
    switch (type) {
      case 'line':
        defaultOptions = this.getLineOptions();
        break;
      case 'bar':
        defaultOptions = this.getBarOptions();
        break;
      case 'doughnut':
      case 'pie':
        defaultOptions = this.getDoughnutOptions();
        break;
      default:
        defaultOptions = this.defaults;
    }
    
    return new Chart(canvas, {
      type,
      data,
      options: this._mergeOptions(defaultOptions, options)
    });
  },
  
  /**
   * 차트 업데이트
   * @param {Chart} chart - 차트 인스턴스
   * @param {Object} data - 새 데이터
   * @param {boolean} animate - 애니메이션 여부
   */
  update: function(chart, data, animate = true) {
    if (!chart) return;
    
    chart.data = data;
    chart.update(animate ? 'default' : 'none');
  },
  
  /**
   * 차트 제거
   * @param {string|Chart} chartOrId - 차트 인스턴스 또는 캔버스 ID
   */
  destroy: function(chartOrId) {
    let chart;
    if (typeof chartOrId === 'string') {
      const canvas = document.getElementById(chartOrId);
      if (canvas) {
        chart = Chart.getChart(canvas);
      }
    } else {
      chart = chartOrId;
    }
    
    if (chart) {
      chart.destroy();
    }
  }
};

// 전역 등록
window.ChartConfig = ChartConfig;

// Chart.js 글로벌 기본값 설정 (Chart.js가 로드된 경우)
if (typeof Chart !== 'undefined') {
  Chart.defaults.font.family = ChartConfig.defaults.font.family;
  Chart.defaults.font.size = ChartConfig.defaults.font.size;
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(26, 46, 77, 0.95)';
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
  Chart.defaults.plugins.tooltip.padding = 12;
}
