import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { createReviewRequest, type DesignReviewResult } from "../api/review";
import {
  Wrapper,
  Content,
  TopBar,
  TargetLink,
  BackLink,
  Status,
  Spinner,
  StatusText,
  ErrorText,
  RetryButton,
  Hero,
  ScoreRing,
  ScoreInner,
  ScoreValue,
  ScoreLabel,
  HeroBody,
  Verdict,
  Summary,
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
  IssueList,
  IssueCard,
  IssueHead,
  SeverityTag,
  IssueTitle,
  IssueRow,
  IssueRowLabel,
  IssueRowText,
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
  "페이지를 불러오는 중…",
  "화면을 캡처하는 중…",
  "레이아웃과 타이포그래피를 분석하는 중…",
  "색 대비와 여백을 살펴보는 중…",
  "리포트를 정리하는 중…",
];

function LoadingView() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1));
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Status>
      <Spinner />
      <StatusText>{LOADING_STEPS[step]}</StatusText>
      <StatusText style={{ fontSize: 13, color: "#6a6a70" }}>
        보통 15~40초 정도 걸립니다
      </StatusText>
    </Status>
  );
}

function ResultView({
  result,
  url,
}: {
  result: DesignReviewResult;
  url: string;
}) {
  return (
    <>
      <Hero>
        <ScoreRing value={result.overallScore}>
          <ScoreInner>
            <ScoreValue>{result.overallScore}</ScoreValue>
            <ScoreLabel>/ 100</ScoreLabel>
          </ScoreInner>
        </ScoreRing>
        <HeroBody>
          <Verdict>{result.verdict}</Verdict>
          <Summary>{result.summary}</Summary>
        </HeroBody>
      </Hero>

      <Section>
        <SectionTitle>카테고리별 점수</SectionTitle>
        <CategoryGrid>
          {result.categories.map((c) => (
            <CategoryCard key={c.key}>
              <CategoryHead>
                <CategoryName>{c.label}</CategoryName>
                <CategoryScore>{c.score}</CategoryScore>
              </CategoryHead>
              <Meter>
                <MeterFill value={c.score} />
              </Meter>
              <CategoryComment>{c.comment}</CategoryComment>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Section>

      {result.strengths.length > 0 && (
        <Section>
          <SectionTitle>Good point</SectionTitle>
          <StrengthList>
            {result.strengths.map((s, i) => (
              <StrengthItem key={i}>{s}</StrengthItem>
            ))}
          </StrengthList>
        </Section>
      )}

      {result.issues.length > 0 && (
        <Section>
          <SectionTitle>improvement point</SectionTitle>
          <IssueList>
            {result.issues.map((issue, i) => (
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
                  <IssueRowLabel $accent>이렇게</IssueRowLabel>
                  <IssueRowText>{issue.fix}</IssueRowText>
                </IssueRow>
              </IssueCard>
            ))}
          </IssueList>
        </Section>
      )}

      <div>
        <TargetLink href={url} target="_blank" rel="noreferrer noopener">
          {url}
        </TargetLink>
      </div>
    </>
  );
}

function ResultPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const url = params.get("url")?.trim() ?? "";

  const [result, setResult] = useState<DesignReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const finalUrlRef = useRef(url);

  useEffect(() => {
    if (!url) return;
    let active = true;
    setLoading(true);
    setError(null);
    setResult(null);

    runReview(url, `${url}::${attempt}`)
      .then((review) => {
        if (!active) return;
        finalUrlRef.current = review.url;
        setResult(review.result);
      })
      .catch((err) => {
        if (!active) return;
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ??
              (err.code === "ECONNABORTED"
                ? "평가 시간이 초과되었습니다"
                : "평가 요청에 실패했습니다"),
          );
        } else {
          setError("알 수 없는 오류가 발생했습니다");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [url, attempt]);

  if (!url) return <Navigate to="/" replace />;

  return (
    <Wrapper>
      <Content>
        <TopBar>
          <BackLink type="button" onClick={() => navigate("/")}>
            ← 새 평가
          </BackLink>
          {!loading && (
            <TargetLink href={url} target="_blank" rel="noreferrer noopener">
              {url}
            </TargetLink>
          )}
        </TopBar>

        {loading && <LoadingView />}

        {!loading && error && (
          <Status>
            <ErrorText>{error}</ErrorText>
            <RetryButton type="button" onClick={() => setAttempt((n) => n + 1)}>
              다시 시도
            </RetryButton>
          </Status>
        )}

        {!loading && !error && result && (
          <ResultView result={result} url={finalUrlRef.current} />
        )}
      </Content>
    </Wrapper>
  );
}

export default ResultPage;
