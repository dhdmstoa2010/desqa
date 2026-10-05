import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { skeletonStyle, TONE, type Tone } from "../../components/styles/shared.style";

export const Page = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: clamp(24px, 4vh, 40px) clamp(16px, 4vw, 48px) 96px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 8vh, 80px);
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SectionTitle = styled.h2`
  font-family: var(--display);
  font-size: clamp(24px, 3vw, 30px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

export const SectionDesc = styled.p`
  margin-top: 6px;
  font-size: 12.5px;
  color: var(--ink-2);
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 11.5px;
  color: var(--ink-2);

  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--c);
  }
`;

export const HeadActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(12px, 1.4vw, 18px);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ReviewCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 210px;
  padding: 18px 18px 16px;
  border-radius: 18px;
  background: var(--card);
  color: var(--ink);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px -20px rgba(60, 40, 15, 0.5);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export const ToneTag = styled.span<{ $tone: Tone }>`
  align-self: flex-start;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 800;
  color: ${({ $tone }) => TONE[$tone].fg};
  background: ${({ $tone }) => TONE[$tone].bg};
`;

export const ReviewScore = styled.div<{ $tone: Tone }>`
  font-family: var(--display);
  font-size: clamp(44px, 5vw, 56px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${({ $tone }) => TONE[$tone].fg};
`;

export const ReviewSummary = styled.p`
  flex: 1;
  font-size: 12px;
  line-height: 1.55;
  color: var(--ink-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ReviewFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 11.5px;
  color: var(--ink-3);

  b {
    min-width: 0;
    font-weight: 600;
    color: var(--ink);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    flex-shrink: 0;
  }
`;

export const ReviewSkeleton = styled.div`
  min-height: 210px;
  border-radius: 18px;
  ${skeletonStyle}
`;
