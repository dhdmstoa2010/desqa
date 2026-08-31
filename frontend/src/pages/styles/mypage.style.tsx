import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  background: #0a0a0b;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 64px;
  box-sizing: border-box;
`;

export const Container = styled.div`
  width: 100%;
`;

export const Cover = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
  border-radius: 16px;
  background: linear-gradient(
    100deg,
    #f5a8e0 0%,
    #c8a3f0 28%,
    #7db8f0 55%,
    #22c1dc 100%
  );
`;

export const Actions = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 11, 0.85);
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #f5f5f5;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: #1c1c1f;
  }
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 0 8px;
  margin-top: -60px;
`;

export const Avatar = styled.div`
  flex-shrink: 0;
  width: 148px;
  height: 148px;
  border-radius: 50%;
  border: 4px solid #0a0a0b;
  background: linear-gradient(160deg, #8b6fd4 0%, #7a57c8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 72px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Identity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 72px;
`;

export const Name = styled.h1`
  margin: 0;
  color: #f5f5f5;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
`;

export const Badge = styled.span`
  color: #9a9a9f;
  font-size: 15px;
  font-weight: 600;
`;

export const Stats = styled.div`
  margin-left: auto;
  display: flex;
  gap: 48px;
  padding-top: 72px;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StatLabel = styled.span`
  color: #f5f5f5;
  font-size: 15px;
  font-weight: 600;
`;

export const StatValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #9a9a9f;
  font-size: 14px;
`;

export const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #1fd65f;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 48px;
  margin-top: 40px;
  padding: 0 8px;
  border-bottom: 1px solid #1c1c1f;
`;

export const Tab = styled.button<{ active?: boolean }>`
  padding: 14px 4px;
  border: none;
  background: transparent;
  color: ${({ active }) => (active ? "#f5f5f5" : "#6f6f75")};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ active }) => (active ? "#1fd65f" : "transparent")};
  margin-bottom: -1px;
`;

export const StatusText = styled.p`
  color: #9a9a9f;
  font-size: 14px;
  margin: 24px 0 0;
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 14px;
  margin: 24px 0 0;
`;
