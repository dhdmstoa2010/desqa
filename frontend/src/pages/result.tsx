import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  createReviewRequest,
  getReviewRequest,
  type DesignReviewResult,
  type ReviewIssue,
} from "../api/review";
import { toneOf } from "../utils/board";
import { domainOf } from "../utils/format";
import { GhostAnchor } from "../components/styles/shared.style";
import {
  Wrapper,
  Content,
  TopBar,
  TargetLink,
  BackLink,
  Status,
  StatusCenter,
  ErrorCard,
  Spinner,
  StatusText,
  StatusHint,
  ErrorTag,
  ErrorTitle,
  ErrorSub,
  RetryButton,
  ProgressHead,
  ProgressBar,
  StepList,
  Hero,
  ScoreRing,
  ScoreInner,
  ScoreValue,
  ScoreLabel,
  HeroBody,
  Verdict,
  Summary,
  HeroActions,
  Section,
  SectionTitle,
  CategoryGrid,
  CategoryCard,
  CategoryHead,
  CategoryName,
  CategoryScore,
  Meter,
  MeterFill,
  CategoryComment,
  StrengthList,
  StrengthItem,
  IssueColumns,
  IssueList,
  IssueCard,
  IssueHead,
  SeverityTag,
  IssueTitle,
  IssueRow,
  IssueRowLabel,
  IssueRowText,
  ShareToBoard,
  ShareToBoardLink,
} from "./styles/result.style";

const SEVERITY_LABEL: Record<"high" | "medium" | "low", string> = {
  high: "꼭 고치기",
  medium: "고치면 좋음",
  low: "사소함",
};

const inFlight = new Map<
  string,
  Promise<Awaited<ReturnType<typeof createReviewRequest>>>
>();

function runReview(url: string, key: string) {
  const existing = inFlight.get(key);
  if (existing) return existing;
  const p = createReviewRequest(url).finally(() => inFlight.delete(key));
  inFlight.set(key, p);
  return p;
}

const LOADING_STEPS = [
  "페이지 불러오는 중",
  "스크린샷 캡처 중",
  "레이아웃·타이포 분석 중",
  "대비·여백 분석 중",
  "탐색성 분석 중",
  "리포트 작성 중",
];

function LoadingView({ instant = false, url }: { instant?: boolean; url: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (instant) return;
    const id = window.setInterval(() => {
      setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1));
    }, 4000);
    return () => window.clearInterval(id);
  }, [instant]);

  if (instant) {
    return (
      <StatusCenter>
        <Spinner />
        <StatusText>기록을 불러오는 중...</StatusText>
      </StatusCenter>
    );
  }

  const state = (i: number) => (i < step ? "done" : i === step ? "now" : "todo");

  return (
    <Status>
      <ProgressHead>
        <b>{domainOf(url)} 분석 중</b>
        <span>
          {step + 1} / {LOADING_STEPS.length}
        </span>
      </ProgressHead>
      <ProgressBar aria-hidden="true">
        {LOADING_STEPS.map((_, i) => (
          <i key={i} data-state={state(i)} />
        ))}
      </ProgressBar>
      <StepList>
        {LOADING_STEPS.map((label, i) => (
          <li key={label} data-state={state(i)}>
            {label}
          </li>
        ))}
      </StepList>
      <StatusHint>보통 15~40초 · 단계는 4초마다 바뀝니다</StatusHint>
    </Status>
  );
}

function Categories({
  title,
  items,
}: {
  title: string;
  items: { key: string; label: string; score: number; comment: string }[];
}) {
  return (
    <Section>
      <SectionTitle>
        {title}
        <small>{items.length}개 항목</small>
      </SectionTitle>
      <CategoryGrid $cols={items.length === 4 ? 4 : 3}>
        {items.map((c) => {
          const tone = toneOf(c.score);
          return (
            <CategoryCard key={c.key}>
              <CategoryHead>
                <CategoryName>{c.label}</CategoryName>
                <CategoryScore $tone={tone}>{c.score}</CategoryScore>
              </CategoryHead>
              <Meter>
                <MeterFill value={c.score} $tone={tone} />
              </Meter>
              <CategoryComment>{c.comment}</CategoryComment>
            </CategoryCard>
          );
        })}
      </CategoryGrid>
    </Section>
  );
}

function Issues({
  title,
  tag,
  issues,
}: {
  title: string;
  tag: string;
  issues: ReviewIssue[];
}) {
  return (
    <Section>
      <SectionTitle>
        {title}
        <small>{tag}</small>
      </SectionTitle>
      <IssueList>
        {issues.map((issue, i) => (
          <IssueCard key={i}>
            <IssueHead>
              <SeverityTag level={issue.severity}>
                {SEVERITY_LABEL[issue.severity]}
              </SeverityTag>
              <IssueTitle>{issue.title}</IssueTitle>
            </IssueHead>
            <IssueRow>
              <IssueRowLabel>위치</IssueRowLabel>
              <IssueRowText>{issue.where}</IssueRowText>
            </IssueRow>
            <IssueRow>
              <IssueRowLabel>문제</IssueRowLabel>
              <IssueRowText>{issue.problem}</IssueRowText>
            </IssueRow>
            <IssueRow>
              <IssueRowLabel $accent>해결</IssueRowLabel>
              <IssueRowText>{issue.fix}</IssueRowText>
            </IssueRow>
          </IssueCard>
        ))}
      </IssueList>
    </Section>
  );
}

function ResultView({
  result,
  url,
}: {
  result: DesignReviewResult;
  url: string;
}) {
  const tone = toneOf(result.overallScore);
  const shareHref = `/board/new?url=${encodeURIComponent(url)}&score=${result.overallScore}`;

  return (
    <>
      <Hero>
        <ScoreRing value={result.overallScore} $tone={tone}>
          <ScoreInner>
            <ScoreValue $tone={tone}>{result.overallScore}</ScoreValue>
            <ScoreLabel>/ 100 · 종합</ScoreLabel>
          </ScoreInner>
        </ScoreRing>
        <HeroBody>
          <Verdict>{result.verdict}</Verdict>
          <Summary>{result.summary}</Summary>
          <HeroActions>
            <ShareToBoardLink to={shareHref}>게시판에 공유하기 →</ShareToBoardLink>
            <GhostAnchor
              href={url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {domainOf(url)} 평가
            </GhostAnchor>
          </HeroActions>
        </HeroBody>
      </Hero>

      <Categories title="화면 디자인 (UI)" items={result.categories} />

      {result.uxCategories?.length > 0 && (
        <Categories title="사용성 (UX)" items={result.uxCategories} />
      )}

      {result.strengths.length > 0 && (
        <Section>
          <SectionTitle>잘한 점</SectionTitle>
          <StrengthList>
            {result.strengths.map((s, i) => (
              <StrengthItem key={i}>{s}</StrengthItem>
            ))}
          </StrengthList>
        </Section>
      )}

      {(result.issues.length > 0 || result.uxIssues?.length > 0) && (
        <IssueColumns>
          {result.issues.length > 0 && (
            <Issues title="고쳐야 할 점" tag="UI" issues={result.issues} />
          )}
          {result.uxIssues?.length > 0 && (
            <Issues title="헷갈리는 점" tag="UX" issues={result.uxIssues} />
          )}
        </IssueColumns>
      )}

      <ShareToBoard>
        <div>
          <strong>이 리포트를 게시판에 공유</strong>
          <p>점수가 글에 자동으로 붙습니다. 글쓰기는 로그인이 필요합니다.</p>
        </div>
        <ShareToBoardLink to={shareHref}>게시판에 공유하기 →</ShareToBoardLink>
      </ShareToBoard>
    </>
  );
}

function ResultPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const url = params.get("url")?.trim() ?? "";
  const idParam = params.get("id")?.trim() ?? "";
  const id = /^\d+$/.test(idParam) ? idParam : "";

  const [result, setResult] = useState<DesignReviewResult | null>(null);
  const [error, setError] = useState<{ tag: string; message: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const [finalUrl, setFinalUrl] = useState(url);

  useEffect(() => {
    if (!id && !url) return;
    let active = true;
    /* eslint-disable react-hooks/set-state-in-effect */
    setLoading(true);
    setError(null);
    setResult(null);
    /* eslint-enable react-hooks/set-state-in-effect */

    const task = id
      ? getReviewRequest(id)
      : runReview(url, `${url}::${attempt}`);

    task
      .then((review) => {
        if (!active) return;
        setFinalUrl(review.url);
        setResult(review.result);
      })
      .catch((err) => {
        if (!active) return;
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const timedOut = err.code === "ECONNABORTED";
          setError({
            tag: timedOut ? "TIMEOUT" : status === 404 ? "NOT FOUND" : "ERROR",
            message:
              err.response?.data?.message ??
              (status === 404
                ? "평가 기록을 찾을 수 없습니다"
                : timedOut
                  ? "평가 시간이 초과되었습니다"
                  : "평가 요청에 실패했습니다"),
          });
        } else {
          setError({ tag: "ERROR", message: "알 수 없는 오류가 발생했습니다" });
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, url, attempt]);

  if (!id && !url) return <Navigate to="/" replace />;

  const targetUrl = finalUrl || url;

  return (
    <Wrapper>
      <Content>
        <TopBar>
          <BackLink type="button" onClick={() => navigate("/evaluate")}>
            ← 새 평가
          </BackLink>
          {!loading && !error && targetUrl && (
            <TargetLink
              href={targetUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {targetUrl} ↗
            </TargetLink>
          )}
        </TopBar>

        {loading && <LoadingView instant={Boolean(id)} url={targetUrl} />}

        {!loading && error && (
          <ErrorCard>
            <ErrorTag>{error.tag}</ErrorTag>
            <ErrorTitle>{error.message}</ErrorTitle>
            <ErrorSub>
              {error.tag === "NOT FOUND"
                ? "삭제되었거나 주소가 잘못되었습니다."
                : "잠시 후 다시 시도해 주세요."}
            </ErrorSub>
            <RetryButton type="button" onClick={() => setAttempt((n) => n + 1)}>
              다시 시도
            </RetryButton>
          </ErrorCard>
        )}

        {!loading && !error && result && (
          <ResultView result={result} url={targetUrl} />
        )}
      </Content>
    </Wrapper>
  );
}

export default ResultPage;
