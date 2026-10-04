import styled from "@emotion/styled";

export const Page = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: clamp(24px, 4vh, 40px) clamp(16px, 4vw, 48px) 96px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  font-family: var(--display);
  font-size: clamp(26px, 3.4vw, 34px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
`;

export const Desc = styled.p`
  margin-top: 6px;
  font-size: 12.5px;
  color: var(--ink-2);
`;

export const Filters = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ $active }) => ($active ? "var(--ink)" : "var(--line)")};
  background: ${({ $active }) => ($active ? "var(--ink)" : "var(--card)")};
  color: ${({ $active }) => ($active ? "var(--card)" : "var(--ink)")};
  font-size: 12.5px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s,
    color 0.15s;

  &:hover {
    border-color: ${({ $active }) => ($active ? "var(--ink)" : "var(--ink-3)")};
  }
`;
