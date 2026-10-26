# Technology 3.1 추가 구간 — Fluid Model (PVT) · Rock–Fluid Properties (SCAL)

작성일: 2026-10-26
경로: `/technology/engineering/re-role`
코드: `src/components/technology/ReservoirFluidsSections.tsx`

## 배경

3.1 Role of Reservoir Engineering의 기존 본문(01~03, 결과물, 의사결정)은 교육 자료 목차를 따릅니다. 이번 두 구간은 사용자 요청("Fluid Model 내용(PVT 분석)과 Relative Permeability 내용(SCLA)")에 따라 추가했습니다. "SCLA"는 특수 코어 분석(SCAL, Special Core Analysis)으로 보고 작성했습니다.

두 구간은 03 Dynamic Model 바로 뒤에 넣었습니다. 둘 다 동적 모델의 입력 자료이기 때문입니다. 그래서 이후 구간 번호가 바뀌었습니다(결과물 06, 의사결정 07). 결과물에는 "Fluid & Rock–Fluid Models"를 추가했습니다.

## 작성 원칙

- 수치, 상관식 계수, 특정 유전의 실험 결과는 넣지 않았습니다.
- 그래프 두 개는 형태만 보여 주는 개념도이며 값이 없습니다.
  - **상평형도:** 기포점·이슬점 곡선, 임계점, 저류층 온도에서의 압력 강하 경로, 분리기 위치를 표시합니다.
  - **상대투과도 곡선:** Swi와 1−Sor 사이 Corey형 곡선입니다. 곡선 모양을 잡을 때만 내부적으로 임의의 값을 썼고, 화면에는 값을 표시하지 않습니다.
- 용어 정의는 아래 SLB Energy Glossary 항목으로 확인했습니다. 시험 절차(CCE·DL·분리기 시험, 정상/비정상 상태, 원심분리)와 모델 선택(블랙오일·조성 모델)은 일반적인 저류공학 개념을 요약한 것입니다. 강의자료와 대조해 확인해야 합니다.
- "곡선의 교차 위치로 습윤성을 가늠한다"는 경험적 해석 방법이므로 "가늠할 수 있다"로 표현했습니다.

## 출처 (SLB Energy Glossary)

| 항목 | 링크 |
|---|---|
| PVT | https://glossary.slb.com/terms/p/pvt |
| Constant composition expansion | https://glossary.slb.com/terms/c/constant_composition_expansion |
| Bubblepoint | https://glossary.slb.com/terms/b/bubblepoint |
| Dewpoint | https://glossary.slb.com/terms/d/dewpoint |
| Oil formation volume factor | https://glossary.slb.com/terms/o/oil_formation_volume_factor |
| Solution gas | https://glossary.slb.com/terms/s/solution_gas |
| GOR | https://glossary.slb.com/terms/g/gor |
| Equation of state | https://glossary.slb.com/terms/e/equation_of_state |
| Viscosity | https://glossary.slb.com/terms/v/viscosity |
| SCAL | https://glossary.slb.com/terms/s/scal |
| Routine core analysis | https://glossary.slb.com/terms/r/routine_core_analysis |
| Relative permeability | https://glossary.slb.com/terms/r/relative_permeability |
| Capillary pressure curve | https://glossary.slb.com/terms/c/capillary_pressure_curve |
| Wettability | https://glossary.slb.com/terms/w/wettability |
| Irreducible water | https://glossary.slb.com/terms/i/irreducible_water |
| Residual oil saturation | https://glossary.slb.com/terms/r/residual_oil_saturation |

페이지 하단 "Sources & Further Reading"에 같은 목록이 있습니다. 링크는 새 탭에서 열립니다.

## 이미지

실험실 사진 3장(`re-pvt-lab`, `re-core-plugs`, `re-coreflood`)은 Codex로 생성합니다(`docs/codex/TASK-re-fluids-scal-images.md`). 생성되기 전에는 점선 placeholder로 표시됩니다.
