import type { Post } from "../types/board";

export const POSTS: Post[] = [
  {
    id: 1,
    category: "타이포",
    domain: "folio.hyun.dev",
    title: "폰트 웨이트만 바꿔서 점수 18점 올린 기록",
    author: "hyun",
    authorColor: "#bfff6b",
    date: "09.05",
    views: 512,
    score: 88,
    detail:
      "본문 400 → 500, 헤드라인 600 → 800으로만 조정했습니다. 타이포 위계 점수가 61에서 89로 올랐고 대비 항목도 덤으로 개선됐어요.",
    deltas: [
      { label: "타이포 위계", delta: 28 },
      { label: "대비", delta: 6 },
    ],
    lead: "자동 평가 점수와 실제 체감이 어긋나는 지점을 정리해 봤습니다.",
    body: "처음엔 대비 경고만 보고 색을 바꿨는데 점수가 거의 안 올랐습니다. 결국 폰트 웨이트 3단계(본문 400→500, 소제목 600, 제목 700→800)로 위계를 다시 잡고 줄간격을 1.6 → 1.75로 넓혔더니 타이포 위계 점수가 61 → 89로 뛰었어요. 배경 위 텍스트는 반투명으로 두지 말고 100% 불투명 + 살짝 어두운 레이어를 까는 편이 측정에도 실사용에도 유리했습니다.",
    helpful: 12,
    metrics: [
      { label: "대비 (Contrast)", value: "3.1:1", fill: 44 },
      { label: "타이포 위계", value: "82", fill: 82 },
      { label: "여백 밸런스", value: "71", fill: 71 },
      { label: "터치 타깃", value: "94", fill: 94 },
    ],
    commentList: [
      {
        author: "hyun",
        at: "09.06 14:20",
        text: "배경 위 텍스트는 오버레이 레이어를 하나 깔고 텍스트는 100% 불투명도로 두는 게 측정에도 실사용에도 유리합니다.",
      },
      {
        author: "sora",
        at: "09.06 15:02",
        text: "저도 같은 케이스였는데 히어로만 별도 스코프로 재측정하니 4.8:1 나왔어요.",
      },
    ],
  },
  {
    id: 2,
    category: "레이아웃·여백",
    domain: "app.sora.io",
    title: "모바일 탭바 히트 영역 44px 규칙, 실무에서 지키시나요?",
    author: "sora",
    authorColor: "#ff6b9d",
    date: "09.04",
    views: 180,
    score: 72,
    detail:
      "아이콘은 24px로 두고 터치 타깃만 48px로 키웠습니다. 탭 간 오터치가 줄면서 터치 타깃 점수가 크게 올랐어요.",
    deltas: [
      { label: "터치 타깃", delta: 15 },
      { label: "여백 밸런스", delta: 9 },
    ],
    lead: "아이콘 크기와 터치 타깃을 분리해서 잡는 방식이 맞는지 봐주세요.",
    body: "시각적으로는 24px 아이콘이지만 히트 영역은 48px 정사각형으로 두고, 탭 5개를 flex로 균등 분할했습니다. 라벨을 없애면 밀도는 좋아지지만 접근성 점수가 떨어져서 9px 라벨을 유지했어요. 지금 구조에서 여백 밸런스가 71인데 라벨을 키우면 더 낮아질 것 같아 고민입니다.",
    helpful: 5,
    metrics: [
      { label: "대비 (Contrast)", value: "5.2:1", fill: 74 },
      { label: "타이포 위계", value: "63", fill: 63 },
      { label: "여백 밸런스", value: "71", fill: 71 },
      { label: "터치 타깃", value: "90", fill: 90 },
    ],
    commentList: [
      {
        author: "jaeyoon",
        at: "09.05 10:11",
        text: "라벨 9px는 저시력 사용자에게 거의 안 보입니다. 11px로 올리고 아이콘을 20px로 줄이는 쪽을 추천해요.",
      },
      {
        author: "sora",
        at: "09.05 11:40",
        text: "11px로 올려서 재측정해 볼게요. 감사합니다.",
      },
    ],
  },
  {
    id: 3,
    category: "컬러",
    domain: "nightshift.studio",
    title: "다크 테마에서 액센트 컬러 하나만 쓰는 게 정답일까",
    author: "jaeyoon",
    authorColor: "#8ca2ff",
    date: "09.03",
    views: 331,
    score: 81,
    detail:
      "위험 액션에만 레드를 허용하고 나머지는 라임 하나로 통일했습니다. 컬러 일관성과 대비가 함께 올라갔어요.",
    deltas: [
      { label: "컬러 일관성", delta: 19 },
      { label: "대비", delta: 11 },
    ],
    lead: "액센트를 하나로 통일했더니 상태 구분이 약해졌습니다.",
    body: "라임(#bfff6b) 하나로 CTA, 링크, 포커스 링, 선택 상태를 전부 처리했습니다. 통일감 덕에 컬러 점수는 높은데, 사용자 테스트에서 '삭제' 버튼과 '저장' 버튼이 같은 색이라 헷갈린다는 피드백이 나왔어요. 위험 액션에만 레드를 허용하고 나머지는 라임 유지하는 방향으로 가려고 합니다.",
    helpful: 8,
    metrics: [
      { label: "대비 (Contrast)", value: "6.4:1", fill: 91 },
      { label: "타이포 위계", value: "77", fill: 77 },
      { label: "여백 밸런스", value: "80", fill: 80 },
      { label: "터치 타깃", value: "72", fill: 72 },
    ],
    commentList: [
      {
        author: "hyun",
        at: "09.04 09:30",
        text: "위험 액션 레드 + 나머지 라임 조합이 제일 무난했습니다. 성공 상태는 색 대신 아이콘으로 처리했어요.",
      },
      {
        author: "dahye",
        at: "09.04 13:12",
        text: "포커스 링만 별도 색(하늘)으로 빼면 키보드 내비게이션이 훨씬 명확해집니다.",
      },
    ],
  },
  {
    id: 4,
    category: "레이아웃·여백",
    domain: "—",
    title: "평가 결과 캡처 공유 — SaaS 대시보드 3종 비교",
    author: "designiee",
    authorColor: "#ffcf5c",
    date: "09.02",
    views: 402,
    score: 76,
    badge: "3등 보고",
    detail:
      "간격을 전부 8의 배수로 맞추고 숫자에 tabular-nums를 적용했습니다. 여백 밸런스와 정보 밀도 점수가 같이 올랐어요.",
    deltas: [
      { label: "여백 밸런스", delta: 14 },
      { label: "정보 밀도", delta: 8 },
    ],
    lead: "그리드 정합률이 결국 여백 점수를 갈랐습니다.",
    body: "A안(93점)은 모든 간격이 8의 배수였고, B안(81점)은 6px/10px가 섞여 있었으며, C안(76점, 우리 안)은 카드 안쪽 패딩이 제각각이었습니다. 숫자 타이포는 tabular-nums 적용 여부에서 갈렸어요. 개선안은 스페이싱 토큰을 4/8/12/16/24/32로 고정하는 것부터 시작하려 합니다.",
    helpful: 21,
    metrics: [
      { label: "대비 (Contrast)", value: "4.9:1", fill: 70 },
      { label: "타이포 위계", value: "74", fill: 74 },
      { label: "여백 밸런스", value: "63", fill: 63 },
      { label: "터치 타깃", value: "88", fill: 88 },
    ],
    commentList: [
      {
        author: "sora",
        at: "09.03 16:45",
        text: "스페이싱 토큰 고정만 해도 다음 측정에서 10점은 오를 것 같네요. 점수표 잘 봤습니다.",
      },
      {
        author: "minho",
        at: "09.03 18:02",
        text: "tabular-nums는 진짜 체감이 큽니다. 숫자가 흔들리는 것만 잡아도 정돈돼 보여요.",
      },
    ],
  },
  {
    id: 5,
    category: "컬러",
    domain: "docs.desqa.com",
    title: "여백 점수는 어떤 기준으로 계산되나요?",
    author: "kkyu",
    authorColor: "#5cd6c0",
    date: "09.01",
    views: 96,
    score: 58,
    detail:
      "섹션 간격을 8의 배수로 정리하고 44px 값을 48px로 바꿨습니다. 여백 밸런스가 조금 회복됐어요.",
    deltas: [
      { label: "여백 밸런스", delta: 6 },
      { label: "그리드 정합", delta: 4 },
    ],
    lead: "'여백 리듬 불안정' 경고의 판단 기준이 궁금합니다.",
    body: "우리 페이지는 섹션 간격이 40 / 56 / 44 / 72px로 제각각인데, 이게 표준편차로 감점되는 건지 아니면 8pt 그리드에서 벗어난 값(44px)이 문제인지 모르겠습니다. 콘텐츠 폭 대비 좌우 여백 비율도 보는지 알려주시면 우선순위를 잡겠습니다.",
    helpful: 3,
    metrics: [
      { label: "대비 (Contrast)", value: "3.8:1", fill: 54 },
      { label: "타이포 위계", value: "61", fill: 61 },
      { label: "여백 밸런스", value: "48", fill: 48 },
      { label: "터치 타깃", value: "70", fill: 70 },
    ],
    commentList: [
      {
        author: "jaeyoon",
        at: "09.02 08:20",
        text: "세 가지를 다 봅니다: 8pt 정합률(가중치 최상), 인접 섹션 간격 비율, 콘텐츠 폭 대비 여백. 44px부터 48px로 맞춰 보세요.",
      },
      {
        author: "kkyu",
        at: "09.02 09:05",
        text: "정합률 가중치가 제일 크군요. 바로 8의 배수로 정리해 보겠습니다.",
      },
    ],
  },
  {
    id: 6,
    category: "인터랙션",
    domain: "lab.nara.page",
    title: "버튼 호버 트랜지션이 너무 튀는지 봐주세요",
    author: "nara",
    authorColor: "#c98cff",
    date: "08.30",
    views: 214,
    score: 69,
    detail:
      "이동은 빼고 background 0.14s + 옅은 inset 보더만 남겼습니다. 밀도 높은 화면에서 모션이 안정적으로 바뀌었어요.",
    deltas: [
      { label: "모션 안정성", delta: 12 },
      { label: "반응 속도", delta: 7 },
    ],
    lead: "버튼이 많은 화면에서 호버 모션이 산만하게 느껴집니다.",
    body: "현재는 background 0.2s ease + transform: translateY(-2px)입니다. 툴바처럼 버튼이 6~7개 모이면 마우스가 지나갈 때마다 들썩여서 불안정해 보인다는 피드백이 있었어요. 이동을 제거하고 background만 0.12s로 바꾸는 안을 테스트했는데 반응이 밋밋하다는 의견도 있어서 중간값을 찾고 있습니다.",
    helpful: 7,
    metrics: [
      { label: "대비 (Contrast)", value: "5.6:1", fill: 80 },
      { label: "타이포 위계", value: "70", fill: 70 },
      { label: "여백 밸런스", value: "66", fill: 66 },
      { label: "터치 타깃", value: "62", fill: 62 },
    ],
    commentList: [
      {
        author: "designiee",
        at: "08.31 12:00",
        text: "이동은 빼고 background 0.14s + 아주 옅은 inset 보더만 주는 조합을 써 보세요. 밀도 높은 화면에서 안정적입니다.",
      },
      {
        author: "nara",
        at: "08.31 14:33",
        text: "inset 보더 아이디어 좋네요. 적용해서 다시 올리겠습니다.",
      },
    ],
  },
  {
    id: 7,
    category: "타이포",
    domain: "read.seong.kr",
    title: "제목 letter-spacing 조였는데 가독성 괜찮나요",
    author: "seong",
    authorColor: "#ff8c5c",
    date: "08.29",
    views: 158,
    score: 84,
    detail:
      "제목에만 -3% 자간을 넣고 자간 값을 토큰으로 분리했습니다. 타이포 위계와 가독성 점수가 함께 올랐어요.",
    deltas: [
      { label: "타이포 위계", delta: 22 },
      { label: "가독성", delta: 13 },
    ],
    lead: "48px 이상 제목에만 -3% 자간을 적용했습니다.",
    body: "Pretendard 기준으로 제목 -3%, 소제목 -1.5%, 본문 0%입니다. 영문 혼용 구간에서 특히 정돈돼 보이는데, 받침이 많은 단어('빨랫줄' 같은)에서 약간 답답하다는 의견이 있었어요. 폰트를 바꾸면 이 값도 다시 잡아야 할 텐데, 토큰으로 관리하는 게 나을지 궁금합니다.",
    helpful: 9,
    metrics: [
      { label: "대비 (Contrast)", value: "6.1:1", fill: 87 },
      { label: "타이포 위계", value: "86", fill: 86 },
      { label: "여백 밸런스", value: "78", fill: 78 },
      { label: "터치 타깃", value: "80", fill: 80 },
    ],
    commentList: [
      {
        author: "hyun",
        at: "08.30 09:15",
        text: "토큰으로 빼는 걸 추천합니다. --tracking-title, --tracking-tight 정도로만 관리해도 폰트 교체가 훨씬 편해져요.",
      },
      {
        author: "seong",
        at: "08.30 10:40",
        text: "토큰으로 정리했습니다. 폰트별 프리셋도 같이 만들어 뒀어요.",
      },
    ],
  },
  {
    id: 8,
    category: "인터랙션",
    domain: "flow.minho.dev",
    title: "스크롤 애니메이션 타이밍, 화면 공유합니다",
    author: "minho",
    authorColor: "#8c9bff",
    date: "08.27",
    views: 277,
    score: 63,
    detail:
      "이동 거리를 12px로 줄이고 duration을 0.35s로 낮췄습니다. 빠른 스크롤에서 빈 화면이 사라지고 체감 성능이 올랐어요.",
    deltas: [
      { label: "체감 성능", delta: 10 },
      { label: "진입 애니메이션", delta: 8 },
    ],
    lead: "빠르게 스크롤하면 진입 애니메이션이 밀려 빈 화면이 보입니다.",
    body: "IntersectionObserver로 뷰포트 15% 진입 시 translateY(40px)→0 + opacity 0→1을 0.6s에 재생합니다. 천천히 보면 좋은데, 스크롤을 빠르게 내리면 여러 섹션이 동시에 애니메이션 대기 상태가 되면서 아무것도 안 보이는 구간이 생겨요. 이동 거리를 12px로 줄이고 duration을 0.35s로 낮추는 방향을 보고 있습니다.",
    helpful: 4,
    metrics: [
      { label: "대비 (Contrast)", value: "4.2:1", fill: 60 },
      { label: "타이포 위계", value: "68", fill: 68 },
      { label: "여백 밸런스", value: "64", fill: 64 },
      { label: "터치 타깃", value: "58", fill: 58 },
    ],
    commentList: [
      {
        author: "nara",
        at: "08.28 11:20",
        text: "prefers-reduced-motion도 꼭 걸어 두세요. 그리고 한 번 나타난 요소는 다시 숨기지 않는 게 빠른 스크롤에 안전합니다.",
      },
      {
        author: "minho",
        at: "08.28 12:05",
        text: "reduced-motion 분기 추가했습니다. 이동 12px / 0.35s로 줄이니 확실히 안정적이네요.",
      },
    ],
  },
];

export function getPost(id: number): Post | undefined {
  return POSTS.find((p) => p.id === id);
}
