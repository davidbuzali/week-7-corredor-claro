import type { Gate, Scenario, Segment, SegmentResult } from "./types";

export const thresholds = {
  gpsCoverage: 0.85,
  boardingCoverage: 0.7,
  manualAgreement: 0.8,
  maxWaitIncrease: 5,
};

export function classifySegment(segment: Segment): SegmentResult {
  if (segment.coverage < 0.75 || segment.manualAgreement < 0.65) {
    return {
      ...segment,
      state: "UNKNOWN",
      confidence: Math.round(Math.min(segment.coverage, segment.manualAgreement) * 100) / 100,
      explanation: "Cobertura o referencia insuficiente; no se fuerza una clasificacion.",
    };
  }

  const eventPressure = Math.min(1, segment.speedVariance / 15) * 0.55 + Math.min(1, segment.jerkEvents / 6) * 0.45;
  const confidence = Math.round((segment.coverage * 0.55 + segment.manualAgreement * 0.45) * 100) / 100;
  const state = eventPressure >= 0.55 ? "REVIEW" : "SUPPORTED";

  return {
    ...segment,
    state,
    confidence,
    explanation:
      state === "REVIEW"
        ? "La variacion de velocidad y los eventos de movimiento justifican revision humana."
        : "La evidencia del segmento coincide suficientemente con la referencia manual.",
  };
}

export function buildGates(scenario: Scenario): Gate[] {
  return [
    {
      id: "gps",
      label: "Cobertura GPS util",
      value: `${Math.round(scenario.gpsCoverage * 100)}%`,
      threshold: `>= ${thresholds.gpsCoverage * 100}%`,
      pass: scenario.gpsCoverage >= thresholds.gpsCoverage,
      explanation: "Porcentaje del corredor con telemetria util y procedencia visible.",
    },
    {
      id: "boarding",
      label: "Paradas con muestra de abordaje",
      value: `${Math.round(scenario.boardingCoverage * 100)}%`,
      threshold: `>= ${thresholds.boardingCoverage * 100}%`,
      pass: scenario.boardingCoverage >= thresholds.boardingCoverage,
      explanation: "Cobertura de conteos supervisados; no se infieren paradas faltantes.",
    },
    {
      id: "agreement",
      label: "Acuerdo con referencia manual",
      value: `${Math.round(scenario.manualAgreement * 100)}%`,
      threshold: `>= ${thresholds.manualAgreement * 100}%`,
      pass: scenario.manualAgreement >= thresholds.manualAgreement,
      explanation: "Comparacion independiente antes de considerar util la evidencia digital.",
    },
    {
      id: "wait",
      label: "Cambio maximo en espera P90",
      value: `+${scenario.maxWaitIncrease.toFixed(1)} min`,
      threshold: `<= +${thresholds.maxWaitIncrease} min`,
      pass: scenario.maxWaitIncrease <= thresholds.maxWaitIncrease,
      explanation: "Protege paradas de alta dependencia contra esperas trasladadas.",
    },
    {
      id: "worker",
      label: "Horas pagadas y transicion",
      value: `${scenario.paidDriverHourChange >= 0 ? "+" : ""}${scenario.paidDriverHourChange} h`,
      threshold: ">= 0 h o plan equivalente",
      pass: scenario.paidDriverHourChange >= 0 || scenario.transitionPlan,
      explanation: "No cuenta como mejora si elimina trabajo pagado sin rol equivalente o compensacion.",
    },
  ];
}

export function allGatesPass(scenario: Scenario): boolean {
  return buildGates(scenario).every((gate) => gate.pass);
}

export function validatePlannerNote(note: string): string | null {
  const length = note.trim().length;
  if (length < 10) return "Escribe al menos 12 caracteres para dejar una justificacion util.";
  if (length > 280) return "La nota debe tener 280 caracteres o menos.";
  return null;
}
