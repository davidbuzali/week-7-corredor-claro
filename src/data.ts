import type { Scenario, Segment, Stop } from "./types";

export const stops: Stop[] = [
  { id: "s1", name: "Iztapalapa", lat: 19.3572, lng: -99.0931, highDependence: true, sampled: true, boardings: 41, waitP90: 14.2, source: "Conteo supervisado - muestra inventada" },
  { id: "s2", name: "Cerro de la Estrella", lat: 19.3524, lng: -99.0734, highDependence: true, sampled: true, boardings: 37, waitP90: 18.1, source: "Conteo supervisado - muestra inventada" },
  { id: "s3", name: "UAM-I", lat: 19.361, lng: -99.0603, highDependence: false, sampled: true, boardings: 29, waitP90: 11.4, source: "Conteo supervisado - muestra inventada" },
  { id: "s4", name: "Constitucion 1917", lat: 19.3478, lng: -99.041, highDependence: true, sampled: true, boardings: 52, waitP90: 20.3, source: "Conteo supervisado - muestra inventada" },
  { id: "s5", name: "Santa Martha", lat: 19.36, lng: -99.0142, highDependence: true, sampled: false, boardings: null, waitP90: null, source: "Sin muestra - UNKNOWN" },
  { id: "s6", name: "Los Reyes", lat: 19.3627, lng: -98.9918, highDependence: true, sampled: true, boardings: 45, waitP90: 16.8, source: "Conteo supervisado - muestra inventada" },
  { id: "s7", name: "La Paz", lat: 19.3575, lng: -98.9764, highDependence: false, sampled: false, boardings: null, waitP90: null, source: "Sin muestra - UNKNOWN" },
  { id: "s8", name: "Zaragoza", lat: 19.3711, lng: -98.9588, highDependence: false, sampled: true, boardings: 24, waitP90: 10.5, source: "Conteo supervisado - muestra inventada" },
];

export const segments: Segment[] = [
  { id: "seg-1", from: "Iztapalapa", to: "Cerro de la Estrella", coverage: 0.96, speedVariance: 3.2, jerkEvents: 1, manualAgreement: 0.91 },
  { id: "seg-2", from: "Cerro de la Estrella", to: "UAM-I", coverage: 0.9, speedVariance: 11.8, jerkEvents: 5, manualAgreement: 0.83 },
  { id: "seg-3", from: "UAM-I", to: "Constitucion 1917", coverage: 0.62, speedVariance: 7.1, jerkEvents: 2, manualAgreement: 0.58 },
  { id: "seg-4", from: "Constitucion 1917", to: "Santa Martha", coverage: 0.88, speedVariance: 4.6, jerkEvents: 2, manualAgreement: 0.85 },
  { id: "seg-5", from: "Santa Martha", to: "Los Reyes", coverage: 0.71, speedVariance: 9.3, jerkEvents: 4, manualAgreement: 0.67 },
  { id: "seg-6", from: "Los Reyes", to: "La Paz", coverage: 0.93, speedVariance: 5.2, jerkEvents: 1, manualAgreement: 0.88 },
  { id: "seg-7", from: "La Paz", to: "Zaragoza", coverage: 0.87, speedVariance: 4.8, jerkEvents: 2, manualAgreement: 0.82 },
];

export const vehicles = [
  [19.3541, -99.0792],
  [19.3562, -99.048],
  [19.3586, -99.004],
  [19.3641, -98.9687],
] as [number, number][];

export const scenarios: Scenario[] = [
  {
    id: "baseline",
    name: "Estudio base",
    description: "Evalua la evidencia disponible sin cambiar el servicio.",
    gpsCoverage: 0.82,
    boardingCoverage: 0.625,
    manualAgreement: 0.76,
    maxWaitIncrease: 0,
    paidDriverHourChange: 0,
    transitionPlan: true,
  },
  {
    id: "coverage",
    name: "Estudio cobertura primero",
    description: "Agrega observaciones y un rol pagado de transicion; no recorta vehiculos.",
    gpsCoverage: 0.89,
    boardingCoverage: 0.75,
    manualAgreement: 0.84,
    maxWaitIncrease: 2.2,
    paidDriverHourChange: 10,
    transitionPlan: true,
  },
];
