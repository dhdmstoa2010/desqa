export type FlowStepId =
  | "upload"
  | "analyze"
  | "discover"
  | "improve"
  | "build";

export interface FlowStep {
  id: FlowStepId;
  index: string;
  label: string;
  title: string;
  description: string;
}

export const FLOW_STEPS: readonly FlowStep[] = [
  {
    id: "upload",
    index: "01",
    label: "Upload",
    title: "Upload",
    description: "만든 웹사이트를 올려보세요.",
  },
  {
    id: "analyze",
    index: "02",
    label: "Analyze",
    title: "Analyze",
    description: "AI가 웹사이트의 디자인을 분석합니다.",
  },
  {
    id: "discover",
    index: "03",
    label: "Discover",
    title: "Discover",
    description: "놓치고 있던 문제를 발견합니다.",
  },
  {
    id: "improve",
    index: "04",
    label: "Improve",
    title: "Improve",
    description: "어떻게 개선하면 좋을지 알려드립니다.",
  },
  {
    id: "build",
    index: "05",
    label: "Build Better",
    title: "Build Better.",
    description: "발견한 문제를 직접 개선해보세요.",
  },
] as const;

export type StepState = "inactive" | "active" | "completed";
