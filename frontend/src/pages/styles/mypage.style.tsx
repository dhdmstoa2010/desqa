import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  background: #0a0a0b;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 24px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  border-radius: 16px;
  background: #1c1c1f;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  color: #f5f5f5;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RowLabel = styled.span`
  font-size: 13px;
  color: #9a9a9f;
`;

export const RowValue = styled.span`
  font-size: 16px;
  color: #f5f5f5;
  font-weight: 600;
`;

export const StatusText = styled.p`
  color: #9a9a9f;
  font-size: 14px;
  margin: 0;
`;

export const Logout = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  background: #1c1c1f;
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #2a2a2e;
  }
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  margin: 0;
`;
