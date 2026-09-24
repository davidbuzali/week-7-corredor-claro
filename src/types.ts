export type EvidenceState = "SUPPORTED" | "REVIEW" | "UNKNOWN";

export type Stop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  highDependence: boolean;
  sampled: boolean;
  boardings: number | null;
  waitP90: number | null;
  source: string;
};

export type Segment = {
  id: string;
  from: string;
  to: string;
  coverage: number;
  speedVariance: number;
  jerkEvents: number;
  manualAgreement: number;
};

export type SegmentResult = Segment & {
  state: EvidenceState;
  confidence: number;
  explanation: string;
};

export type Scenario = {
  id: "baseline" | "coverage";
  name: string;
  description: string;
  gpsCoverage: number;
  boardingCoverage: number;
  manualAgreement: number;
  maxWaitIncrease: number;
  paidDriverHourChange: number;
  transitionPlan: boolean;
};

export type Gate = {
  id: string;
  label: string;
  value: string;
  threshold: string;
  pass: boolean;
  explanation: string;
};
