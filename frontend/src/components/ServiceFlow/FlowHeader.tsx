import { Header, Kicker, HeaderTitle, HeaderSub } from "./ServiceFlow.style";

export default function FlowHeader() {
  return (
    <Header>
      <Kicker>How it works</Kicker>
      <HeaderTitle>
        Your website <span>→</span> Better design
      </HeaderTitle>
      <HeaderSub>복잡한 디자인 분석을 AI가 한눈에 정리해드립니다.</HeaderSub>
    </Header>
  );
}
