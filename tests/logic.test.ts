import test from "node:test";
import assert from "node:assert/strict";
import { scenarios, segments } from "../src/data.ts";
import {
  allGatesPass,
  buildGates,
  classifySegment,
  evidenceForScenario,
  validatePlannerNote,
} from "../src/logic.ts";

test("baseline is blocked and coverage-first passes every proposed gate", () => {
  assert.equal(allGatesPass(scenarios[0]), false);
  assert.equal(allGatesPass(scenarios[1]), true);
  assert.equal(buildGates(scenarios[0]).filter((gate) => !gate.pass).length, 3);
});

test("insufficient segment evidence remains UNKNOWN", () => {
  const result = classifySegment(segments[2]);
  assert.equal(result.state, "UNKNOWN");
  assert.match(result.explanation, /no se fuerza/i);
});

test("coverage-first observations resolve the initial UNKNOWN segments", () => {
  const results = evidenceForScenario(segments, "coverage").map(classifySegment);
  assert.equal(results.some((result) => result.state === "UNKNOWN"), false);
});

test("planner note enforces the displayed 12-character minimum", () => {
  assert.ok(validatePlannerNote("once chars!") !== null);
  assert.equal(validatePlannerNote("doce chars!!"), null);
  assert.ok(validatePlannerNote("x".repeat(281)) !== null);
});
