# Technology 2.1 — Role of Geology

작성일: 2026-10-26
경로: `/technology/geology/ge-fdp-role`

사용자의 Role of Geology 작성 요청에 따라 공개 전문 자료로 작성한 정성적 개요입니다. 지질 강의자료는 제공되지 않았으므로 강의 내용으로 간주하지 않습니다. 수치·특정 유전의 결과·매장량·생산량을 추가하지 않았습니다. 아래 출처의 내용을 한국어로 요약·종합했으며 직접 인용하지 않았습니다.

## 내용과 근거

- **암석·시추공 자료:** GEUS, Petrophysical reservoir analysis. 코어·암편·검층의 역할과 코어·검층 해석의 결합, 암상과 물성 평가를 요약했습니다.
  https://eng.geus.dk/energy-resources/oil-and-gas/reservoir-characterisation/petrophysical-reservoir-analysis
- **퇴적상:** SLB Energy Glossary, Facies modeling. 퇴적환경과 층서 관계를 통해 퇴적상의 기하와 분포를 모델링한다는 개념을 요약했습니다.
  https://glossary.slb.com/terms/f/facies_modeling
- **모델 통합·불확실성:** GEUS, Reservoir modelling. 구조 골격·물성 모델의 통합, 자료 규모 차이, 시나리오에 의한 불확실성 검토, 연결성 평가를 요약했습니다.
  https://eng.geus.dk/energy-resources/oil-and-gas/reservoir-characterisation/reservoir-modelling
- **정적 모델 → 동적 모델:** SLB Energy Glossary, Reservoir characterization model. 지층 형상·두께·암상·물성 분포를 정적 모델에 담고 동적 시뮬레이션과 개발 계획에 연결하는 역할을 요약했습니다.
  https://glossary.slb.com/terms/r/reservoir_characterization_model
- **층서 골격·모델 검토:** SLB, 3D Geological Model Based on Sequence Stratigraphy Reduces Uncertainty in Deep Carbonate Reservoirs (2015-03-19). 코어·검층·탄성파 통합, 층서 골격 → 퇴적상 → 물성의 단계, 새 시추 결과와 예측의 비교를 참고했습니다. 사례의 수치·성과·지리적 조건은 페이지로 옮기지 않았습니다.
  https://www.slb.com/resource-library/case-study-with-navigation/so/predict-reservoir-facies-kuwait-cs

생애주기별 목록과 FDP 결과물 목록은 위 자료를 기존 Technology 페이지의 구조에 맞게 종합한 편집 구성입니다. 개별 전문 분야의 역할은 협업 관계로 서술하며, 지질 모델만으로 유동 연결성이나 생산량이 확정된다고 설명하지 않습니다.

## 도식

기존 FieldSection을 재사용한 도입 단면과 자체 SVG 개념도 네 개입니다. 실제 검층, 지층 대비 결과, 지도 또는 수치 물성 자료가 아닙니다. 암상 구분과 상대적 물성 변화만 색으로 표현하며 관측 수치를 표시하지 않습니다. 기존 페이지의 문구·스타일·모션 코드는 수정하지 않습니다.

새 페이지는 서버 HTML의 루트 속성을 사전 변경하는 REVEAL_BOOT를 사용하지 않고 RevealScope의 클라이언트 초기화를 이용합니다. 공용 컴포넌트나 기존 토픽의 모션 동작은 변경하지 않습니다.

## 04 Reading Fluids by Depth — MDT / RCI (2026-10-26 추가)

사용자 요청에 따라 와이어라인 지층 시험(MDT·RCI) 구간을 추가했습니다. 깊이별 유체 종류 확인, Contact 측정, Mobility 확인, 시료 취득의 네 항목을 다룹니다. 수치와 특정 유정 자료는 넣지 않았습니다. 압력-깊이 도식은 유체별 기울기의 상대적 차이만 보여 줍니다. 깊이를 아래로 그린 그래프에서 가스 구배가 가장 가파르고 물 구배가 가장 완만합니다.

- **지층 시험기:** SLB Energy Glossary, Wireline formation tester. 케이블로 내려 프로브를 지층에 밀착시키는 장비라는 정의를 요약했습니다.
  https://glossary.slb.com/terms/w/wireline_formation_tester
- **압력 구배:** SLB Energy Glossary, Pressure gradient. 깊이에 따른 압력 변화율이라는 정의와, 유체 밀도에 따라 구배가 달라진다는 점을 요약했습니다.
  https://glossary.slb.com/terms/p/pressure_gradient
- **유체 경계:** SLB Energy Glossary, Fluid contact. 밀도가 다른 유체 사이의 경계라는 정의를 요약했습니다. 구배선의 교점으로 GOC·OWC를 추정하는 일반적인 해석 방법을 함께 설명했습니다.
  https://glossary.slb.com/terms/f/fluid_contact
- **유동도:** SLB Energy Glossary, Mobility. 유효 투과도와 점도의 비라는 정의를 요약했습니다.
  https://glossary.slb.com/terms/m/mobility

프리테스트의 압력 강하·회복, 펌프 아웃 중 오염 감소 확인, 공내 유체 분석(DFA), 지상 PVT 분석으로의 연계는 장비의 일반적인 운용 개념으로 서술했습니다. 강의자료나 현장 자료와 대조해 확인해야 합니다. 함께 추가한 결과물 "Fluid Contacts & Pressure Profile"과 구획화 검토 문장도 같은 범위의 정성적 설명입니다.

## 04 Petrophysics — Reading the Rock Through Logs (2026-10-26 추가)

사용자 요청에 따라 Petrophysics 구간을 추가했습니다. 구성은 세 부분입니다.
- 검층 취득 방법: 와이어라인, LWD
- 검층 방법별 원리·측정·활용 요약표: GR, SP, 비저항, 밀도, 중성자, 음파, NMR, 캘리퍼
- 해석 흐름: 셰일 부피 → 공극률 → 수포화도 → 순저류층·생산 대상 구간

수치, 상수, 컷오프 값은 넣지 않았습니다. Archie 식은 이름과 입력 항목만 언급했습니다. 이 구간을 넣으면서 이후 구간 번호가 하나씩 밀렸습니다(MDT/RCI 05, 결과물 06, 의사결정 07). 결과물에 "Petrophysical Evaluation"을 추가했습니다.

각 장비의 정의는 SLB Energy Glossary로 확인했습니다. 원리와 활용 설명은 일반적인 검층 해석 개념을 요약한 것이므로 강의자료와 대조해 확인해야 합니다.
- Wireline log: https://glossary.slb.com/terms/w/wireline_log
- Gamma ray log: https://glossary.slb.com/terms/g/gamma_ray_log
- Spontaneous potential: https://glossary.slb.com/terms/s/spontaneous_potential
- Resistivity log: https://glossary.slb.com/terms/r/resistivity_log
- Induction: https://glossary.slb.com/terms/i/induction
- Gamma-gamma (density) log: https://glossary.slb.com/terms/g/gamma-gamma_log
- Neutron log: https://glossary.slb.com/terms/n/neutron_log
- Sonic log: https://glossary.slb.com/terms/s/sonic_log
- Nuclear magnetic resonance: https://glossary.slb.com/terms/n/nuclear_magnetic_resonance
- Caliper log: https://glossary.slb.com/terms/c/caliper_log
- Archie equation: https://glossary.slb.com/terms/a/archie_equation
- Water saturation: https://glossary.slb.com/terms/w/water_saturation

툴 스트링 일러스트와 검층 해석 화면 이미지는 Codex로 생성할 예정입니다(`docs/codex/TASK-geology-petrophysics-images.md`). 실제 유정 자료가 아니며, 페이지 캡션에 그렇게 표시합니다.
