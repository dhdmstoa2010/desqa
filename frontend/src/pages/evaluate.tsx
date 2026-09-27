import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { listReviewsRequest, type StoredReview } from "../api/review";
import { useAuthStore } from "../store/authStore";
import {
  Wrapper,
  Glow,
  Grid,
  Left,
  Title,
  Form,
  InputWrap,
  Input,
  Button,
  BoardLink,
  Right,
  PanelLabel,
  ReportCard,
  ReportHead,
  ReportMeta,
  ScoreBig,
  Bars,
  Bar,
  Notes,
  RecentList,
  RecentItem,
  EmptyCard,
} from "./styles/evaluate.style";

type RecentState = "loading" | "ready" | "empty" | "error";

function domainOf(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u;
  }
}

function relTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const m = 60_000;
  const h = 60 * m;
  const d = 24 * h;
  if (diff < h) return `${Math.max(1, Math.round(diff / m))}분 전`;
  if (diff < d) return `${Math.round(diff / h)}시간 전`;
  if (diff < 7 * d) return `${Math.round(diff / d)}일 전`;
  return new Date(iso)
    .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/\.$/, "");
}

function RecentReport() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [state, setState] = useState<RecentState>(
    isAuthenticated ? "loading" : "empty",
  );
  const [reviews, setReviews] = useState<StoredReview[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    let active = true;
    listReviewsRequest()
      .then((rows) => {
        if (!active) return;
        setReviews(rows);
        setState(rows.length ? "ready" : "empty");
      })
      .catch(() => {
        if (active) setState("error");
      });

    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  if (state !== "ready") {
    return (
      <Right>
        <PanelLabel>최근 평가</PanelLabel>
        <EmptyCard>
          {state === "loading" && <p>기록을 불러오는 중…</p>}
          {state === "error" && (
            <>
              <p>기록을 불러오지 못했어요.</p>
              <span>잠시 후 다시 시도해 주세요.</span>
            </>
          )}
          {state === "empty" && (
            <>
              <p>아직 평가 기록이 없어요.</p>
              <span>
                {isAuthenticated
                  ? "위에 URL을 넣고 첫 평가를 받아보세요."
                  : "로그인하면 평가 기록이 여기에 쌓여요."}
              </span>
            </>
          )}
        </EmptyCard>
      </Right>
    );
  }

  const [latest, ...rest] = reviews;
  const strength = latest.result.strengths[0];
  const issue = latest.result.issues[0];

  return (
    <Right>
      <PanelLabel>최근 평가</PanelLabel>
      <ReportCard to={`/result?id=${latest.id}`}>
        <ReportHead>
          <ReportMeta>
            <div className="domain">{domainOf(latest.url)}</div>
            <div className="sub">{relTime(latest.createdAt)}</div>
          </ReportMeta>
          <ScoreBig>
            {latest.score}
            <small>/100</small>
          </ScoreBig>
        </ReportHead>

        <Bars>
          {latest.result.categories.map((c) => (
            <Bar key={c.key}>
              <div className="row">
                <span className="label">{c.label}</span>
                <span className="val">{c.score}</span>
              </div>
              <div className="track">
                <div className="fill" style={{ width: `${c.score}%` }} />
              </div>
            </Bar>
          ))}
        </Bars>

        {(strength || issue) && (
          <Notes>
            {strength && (
              <p className="plus">
                <b>+</b> {strength}
              </p>
            )}
            {issue && (
              <p className="minus">
                <b>−</b> {issue.title}
              </p>
            )}
          </Notes>
        )}
      </ReportCard>

      {rest.length > 0 && (
        <RecentList>
          {rest.slice(0, 4).map((r) => (
            <RecentItem key={r.id} to={`/result?id=${r.id}`}>
              <span className="domain">{domainOf(r.url)}</span>
              <span className="date">{relTime(r.createdAt)}</span>
              <span className="score">{r.score}</span>
            </RecentItem>
          ))}
        </RecentList>
      )}
    </Right>
  );
}

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
      <Glow />
      <Grid>
        <Left>
          <Title>
            <span className="en">Paste a URL</span>
            <span className="kr">디자인 점수 받기</span>
          </Title>

          <Form onSubmit={handleSubmit}>
            <InputWrap>
              <Input
                type="url"
                inputMode="url"
                autoFocus
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </InputWrap>
            <Button type="submit" disabled={!url.trim()}>
              평가하기 →
            </Button>
          </Form>

          <BoardLink to="/board">다른 사람들이 받은 평가 구경하기 →</BoardLink>
        </Left>

        <RecentReport />
      </Grid>
    </Wrapper>
  );
}

export default Evaluate;
