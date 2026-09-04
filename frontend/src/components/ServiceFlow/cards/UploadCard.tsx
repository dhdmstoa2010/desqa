import type { StepState } from "../flow.data";
import { CardStage } from "../ServiceFlow.style";
import {
  DropZone,
  Plus,
  DropLabel,
  UploadFile,
  FileMeta,
  Bar,
} from "./mockup.style";

/*
  CARD 01 · Upload
  중앙에 "+  Upload website" 드롭존.
  다음 카드로 넘어가며(completed) 파일이 올라오고 진행바가 차는 짧은 연출.
*/
export default function UploadCard({ state }: { state: StepState }) {
  const inView = state !== "inactive";
  const uploading = state === "completed";

  return (
    <CardStage data-in={inView}>
      <DropZone data-uploading={uploading}>
        <Plus>+</Plus>
        <DropLabel>Upload website</DropLabel>
      </DropZone>

      <UploadFile data-in={uploading}>
        <FileMeta>
          <b>my-portfolio.com</b>
          <span>{uploading ? "100%" : "0%"}</span>
        </FileMeta>
        <Bar data-fill={uploading}>
          <span />
        </Bar>
      </UploadFile>
    </CardStage>
  );
}
