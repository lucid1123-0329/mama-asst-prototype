# 📚 MAMA-ASST (Matching & Management Assistant)

**AI 기반 B2B K-12 학원 관리 플랫폼**

> 대한민국 K-12 학생과 교습소/학원을 대상으로 하는 AI 기반 학습 관리 SaaS 플랫폼

---

## 🎯 프로젝트 개요

MAMA-ASST는 학원 운영의 전 과정을 디지털화하고, AI 기술을 활용하여 개인화된 학습 경험을 제공하는 B2B SaaS 플랫폼입니다.

### 핵심 기능
- **AI 학습 도우미:** 국어(5단계 학습), 영어(7초 발화 테스트), 수학(Jump/Anchor) 과목별 맞춤 학습
- **성향검사:** 150문항 기반 학습 성향 분석 및 AI 종합 리포트
- **AI 튜터:** Gemini Flash/Pro 기반 실시간 AI 튜터링
- **학원 관리:** 출결, 결제, 상담, 숙제 관리 통합
- **5개 사용자 역할:** 학생, 학부모, 강사, 학원관리자, 슈퍼관리자

### 기술 스택
- **Frontend/Backend:** Bubble.io (노코드 플랫폼)
- **AI:** Google Gemini 2.0 Flash / Pro
- **결제:** 결제선생 (Paymint)
- **알림:** NCP SENS (SMS, 카카오 알림톡)
- **STT:** Web Speech API

---

## 📁 산출물 목록

| 문서 | 버전 | 설명 |
|------|------|------|
| [마스터 기획서](MAMA-ASST_Master_v3_6.md) | v3.6 | 전체 프로젝트 개요 및 로드맵 |
| [정보구조도 (IA)](MAMA-ASST_IA_v3_5.md) | v3.5 | 88개 화면 구조 정의 |
| [기능명세서](MAMA-ASST_FuncSpec_v3_5.md) | v3.5 | 73개 기능 명세 |
| [화면설계서](MAMA-ASST_ScreenSpec_v3_5.md) | v3.5 | 88개 화면 설계 |
| [화면 플로우차트](MAMA-ASST_ScreenFlow_v3_5.md) | v3.5 | 13개 화면 플로우 |
| [시퀀스 다이어그램](MAMA-ASST_Sequence_v3_5.md) | v3.5 | 14개 시퀀스 플로우 |
| [디자인 가이드](MAMA-ASST_DesignGuide_v3_5.md) | v3.5 | 컬러, 타이포그래피 시스템 |
| [Element Styles (v3.5)](MAMA-ASST_ElementStyles_v3_5.md) | v3.5 | 61개 Element Styles (아카이브) |
| [Element Styles (v3.6)](MAMA-ASST_ElementStyles_v3_6.md) | v3.6 | 61개 Element Styles + 44개 Variables (최신) |
| [ERD](MAMA-ASST_ERD_v3_5.md) | v3.5 | 38개 테이블 관계도 |
| [Bubble.io 데이터타입](MAMA-ASST_Bubble_DataType_v3_6.md) | v3.6 | 38개 Data Type 현황 |
| [Bubble.io 개발 상세](MAMA-ASST_Bubble_DevSpec_v3_5.md) | v3.5 | Option Sets + Data Types + Privacy Rules |
| [API 명세서](MAMA-ASST_API_Spec_v3_5.md) | v3.5 | 108개 엔드포인트 |
| [AI 프롬프트 명세서](MAMA-ASST_AI_Prompts_v3_5.md) | v3.5 | 12개 AI 프롬프트 |
| [파이프라인 설계](MAMA-ASST_Pipeline_v3_5.md) | v3.5 | 9개 파이프라인 |
| [개발 로드맵](MAMA-ASST_DevRoadmap_v3_6.md) | v3.6 | 7 Sprint 개발 계획 |
| [테스트 보고서](MAMA-ASST_TestReport_v1_0.md) | v1.0 | 88개 화면 ALL PASS |

---

## 🚀 개발 현황

| Phase | 내용 | 상태 |
|-------|------|------|
| Phase 1-4 | 기획 → 디자인 → 프로토타입 → 테스트 | ✅ 완료 |
| Phase 5 | Bubble.io 구현 (Sprint 1: DB 구축 완료) | 🔄 진행중 |
| Phase 6 | AI 연동 및 테스트 | ⏳ 대기 |
| Phase 7 | 베타 런칭 | ⏳ 대기 |

---

## 📊 프로젝트 규모

- **화면:** 88개
- **기능:** 73개
- **API:** 108개 엔드포인트
- **Data Types:** 38개
- **Option Sets:** 13개
- **AI 프롬프트:** 12개
- **파이프라인:** 9개
- **Element Styles:** 61개 + 44개 Style Variables

---

## ⚠️ 서비스 정책

- 학생/학부모/강사 계정은 **학원 관리자가 생성** (자체 회원가입 없음)
- 학부모 ↔ 학원 관리자 소통, 강사는 수업에 집중
- 첫 로그인 시 초기 비밀번호(0000) 반드시 변경

---

*© 2025 명불허전. All rights reserved.*
