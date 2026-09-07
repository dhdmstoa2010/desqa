import type { StepState } from "../../../../data/flow.data";
import { CardStage } from "../ServiceFlow.style";
import {
  DropZone,
  Plus,
  DropLabel,
  UploadFile,
  FileMeta,
  Bar,
} from "./mockup.style";

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
