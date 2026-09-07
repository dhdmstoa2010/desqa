import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Wrapper,
  Inner,
  Title,
  Form,
  Input,
  Button,
  BoardLink,
} from "./styles/evaluate.style";

function Evaluate() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [url, setUrl] = useState(params.get("url")?.trim() ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    navigate(`/result?url=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Wrapper>
      <Inner>
        <Title>
          Drop a link
          <br />
          See the design flaws
        </Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="url"
            inputMode="url"
            autoFocus
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit" disabled={!url.trim()}>
            평가하기 →
          </Button>
        </Form>

        <BoardLink to="/board">다른 사람들이 받은 평가 구경하기 →</BoardLink>
      </Inner>
    </Wrapper>
  );
}

export default Evaluate;
