import type { Tone } from "../types/board";

export function toneOf(score?: number): Tone {
  if (score == null) return "mid";
  if (score >= 80) return "high";
  if (score >= 65) return "mid";
  return "low";
}
