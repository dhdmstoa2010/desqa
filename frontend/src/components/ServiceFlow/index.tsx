import { Fragment, useCallback } from "react";
import type { CSSProperties } from "react";
import { FLOW_STEPS, type StepState } from "../../../data/flow.data";
import { useActiveStep } from "./useActiveStep";
import FlowHeader from "./FlowHeader";
import FlowProgress from "./FlowProgress";
import UploadCard from "./cards/UploadCard";
import AnalyzeCard from "./cards/AnalyzeCard";
import DiscoverCard from "./cards/DiscoverCard";
import ImproveCard from "./cards/ImproveCard";
import BuildBetterCard from "./cards/BuildBetterCard";
import {
  Section,
  Inner,
  Layout,
  CardsWrap,
  StackGap,
  Card,
  CardHead,
  CardIndex,
  CardHeadText,
  CardTitle,
  CardDesc,
} from "./ServiceFlow.style";

function stateOf(i: number, active: number): StepState {
  if (i < active) return "completed";
  if (i === active) return "active";
  return "inactive";
}

interface Props {
  onStart?: () => void;
}

export default function ServiceFlow({ onStart }: Props) {
  const { active, setRef } = useActiveStep(FLOW_STEPS.length);

  const jump = useCallback((i: number) => {
    document
      .getElementById(`flow-card-${i}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleStart = useCallback(() => {
    if (onStart) return onStart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [onStart]);

  return (
    <Section aria-label="How it works">
      <Inner>
        <FlowHeader />
      </Inner>

      <Layout>
        <FlowProgress active={active} onJump={jump} />

        <CardsWrap>
          {FLOW_STEPS.map((step, i) => {
            const state = stateOf(i, active);
            const last = i === FLOW_STEPS.length - 1;
            return (
              <Fragment key={step.id}>
                <Card
                  id={`flow-card-${i}`}
                  ref={setRef(i)}
                  data-step-index={i}
                  data-state={state}
                  data-last={last}
                  style={
                    {
                      "--i": i,
                      "--depth": Math.max(1, active - i),
                    } as CSSProperties
                  }
                >
                  <CardHead>
                    <CardIndex>{step.index}</CardIndex>
                    <CardHeadText>
                      <CardTitle>{step.title}</CardTitle>
                      <CardDesc>{step.description}</CardDesc>
                    </CardHeadText>
                  </CardHead>

                  {step.id === "upload" && <UploadCard state={state} />}
                  {step.id === "analyze" && <AnalyzeCard state={state} />}
                  {step.id === "discover" && <DiscoverCard state={state} />}
                  {step.id === "improve" && <ImproveCard state={state} />}
                  {step.id === "build" && (
                    <BuildBetterCard state={state} onStart={handleStart} />
                  )}
                </Card>

                <StackGap data-tail={last} />
              </Fragment>
            );
          })}
        </CardsWrap>
      </Layout>
    </Section>
  );
}
