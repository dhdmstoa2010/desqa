import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES, type PostCategory } from "../types/board";
import { toneOf } from "../utils/board";
import { useBoardStore } from "../store/boardStore";
import { useAuthStore } from "../store/authStore";
import { bodyToHtml, firstImageSrc, stripHtml } from "../utils/html";
import RichEditor from "../components/RichEditor";
import {
  Wrapper,
  Inner,
  Head,
  BackTop,
  Title,
  Layout,
  Form,
  Field,
  FieldLabel,
  Input,
  UrlRow,
  Hint,
  ScoreNote,
  Chips,
  Chip,
  Actions,
  Submit,
  CancelLink,
  Side,
  PreviewLabel,
  PreviewCard,
  PreviewRow,
  PreviewThumb,
  PreviewTitle,
  PreviewMeta,
  PreviewScore,
  PreviewFoot,
  PreviewChip,
  PreviewLead,
  PreviewBodyCard,
  PreviewBody,
  PreviewEmpty,
  Tips,
  TipsTitle,
  TipList,
} from "./styles/boardNew.style";

const POST_CATEGORIES = CATEGORIES.filter(
  (c): c is PostCategory => c !== "전체",
);

function todayLabel(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

function BoardNew() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const addPost = useBoardStore((s) => s.addPost);
  const user = useAuthStore((s) => s.user);

  const [url, setUrl] = useState(params.get("url")?.trim() ?? "");
  const [category, setCategory] = useState<PostCategory>("타이포");
  const [title, setTitle] = useState("");
  const [lead, setLead] = useState("");
  const [body, setBody] = useState("");

  const score = useMemo(() => {
    const raw = params.get("score");
    const n = raw == null ? NaN : Number(raw);
    return Number.isFinite(n) ? Math.round(n) : undefined;
  }, [params]);

  const author = user?.name ?? "게스트";

  const bodyText = stripHtml(body);
  const previewImage = firstImageSrc(body);
  const canSubmit =
    title.trim().length > 0 && (bodyText.length > 0 || Boolean(previewImage));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const id = addPost({
      url,
      category,
      title,
      lead,
      body,
      author,
      authorColor: "#bfff6b",
      score,
    });
    navigate(`/board/${id}`);
  };

  return (
    <Wrapper>
      <Inner>
        <Head>
          <BackTop to="/board">← 게시판</BackTop>
          <Title>화면 공유하기</Title>
        </Head>

        <Layout>
          <Form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel>
                사이트 주소 <em>선택</em>
              </FieldLabel>
              <UrlRow>
                <Input
                  type="url"
                  inputMode="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                {url.trim() && (
                  <Hint>
                    평가 점수부터 받고 싶다면{" "}
                    <a href={`/result?url=${encodeURIComponent(url.trim())}`}>
                      지금 평가 받기 →
                    </a>
                  </Hint>
                )}
              </UrlRow>
            </Field>

            {score != null && (
              <ScoreNote>
                평가 점수 <b>{score}점</b>이 이 게시물에 함께 첨부됩니다.
              </ScoreNote>
            )}

            <Field as="div">
              <FieldLabel>카테고리</FieldLabel>
              <Chips>
                {POST_CATEGORIES.map((c) => (
                  <Chip
                    key={c}
                    type="button"
                    $active={c === category}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </Chip>
                ))}
              </Chips>
            </Field>

            <Field>
              <FieldLabel>제목</FieldLabel>
              <Input
                type="text"
                placeholder="예: 히어로 섹션 좌우 여백, 이 정도면 답답하지 않나요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
              />
            </Field>

            <Field>
              <FieldLabel>
                한 줄 요약 <em>선택</em>
              </FieldLabel>
              <Input
                type="text"
                placeholder="어떤 점을 봐줬으면 하는지 한 문장으로"
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                maxLength={120}
              />
            </Field>

            <Field as="div">
              <FieldLabel>내용</FieldLabel>
              <RichEditor
                value={body}
                onChange={setBody}
                placeholder="시도한 것, 고민 중인 선택지, 받고 싶은 피드백을 적어 주세요. 툴바의 이미지 버튼으로 캡처도 넣을 수 있어요."
              />
            </Field>

            <Actions>
              <Submit type="submit" disabled={!canSubmit}>
                게시물 올리기 →
              </Submit>
              <CancelLink to="/board">취소</CancelLink>
            </Actions>
          </Form>

          <Side>
            <PreviewLabel>미리보기</PreviewLabel>
            <PreviewCard>
              <PreviewRow>
                <PreviewThumb>
                  {previewImage ? (
                    <img src={previewImage} alt="" />
                  ) : (
                    <span>사진 없음</span>
                  )}
                </PreviewThumb>

                <div>
                  <PreviewTitle data-empty={title.trim().length === 0}>
                    {title.trim() || "제목을 입력하세요"}
                  </PreviewTitle>
                  <PreviewMeta>
                    {author}
                    <span className="dot">·</span>
                    {todayLabel()}
                    <span className="dot">·</span>조회 0
                    <span className="dot">·</span>댓글 0
                  </PreviewMeta>
                </div>

                <PreviewScore $tone={toneOf(score)}>
                  {score != null ? (
                    <>
                      <strong>{score}</strong>
                      <span>SCORE</span>
                    </>
                  ) : (
                    <span className="pending">평가 전</span>
                  )}
                </PreviewScore>
              </PreviewRow>

              <PreviewFoot>
                <PreviewChip>{category}</PreviewChip>
                {lead.trim() && <PreviewLead>{lead.trim()}</PreviewLead>}
              </PreviewFoot>
            </PreviewCard>

            <PreviewBodyCard>
              <PreviewLabel>본문</PreviewLabel>
              {bodyText || previewImage ? (
                <PreviewBody
                  dangerouslySetInnerHTML={{ __html: bodyToHtml(body) }}
                />
              ) : (
                <PreviewEmpty>
                  내용을 입력하면 서식이 적용된 모습이 여기에 보여요.
                </PreviewEmpty>
              )}
            </PreviewBodyCard>

            <Tips>
              <TipsTitle>잘 남기는 법</TipsTitle>
              <TipList>
                <li>
                  본문 툴바의 이미지 버튼으로 문제가 보이는 화면을 넣어 주세요.
                </li>
                <li>
                  제목은 "~인가요?", "~봐주세요"처럼 질문형이 반응이 좋아요.
                </li>
                <li>사이트 주소를 넣으면 자동 평가 점수가 함께 붙습니다.</li>
                <li>시도한 것과 고민 중인 선택지를 함께 적어 주세요.</li>
              </TipList>
            </Tips>
          </Side>
        </Layout>
      </Inner>
    </Wrapper>
  );
}

export default BoardNew;
