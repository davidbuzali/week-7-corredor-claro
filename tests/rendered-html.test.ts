import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

test("interface contains required simulated and human-authority language", async () => {
  const app = await readFile(resolve(root, "src/App.tsx"), "utf8");
  assert.match(app, /Ejecutar ML simulado/);
  assert.match(app, /No score de conductor/);
  assert.match(app, /Sin recortes automaticos/);
  assert.match(app, /No ocurrio ninguna accion operativa/);
  assert.match(app, /Simulacion hipotetica/);
  assert.match(app, /Registrar escenario candidato/);
});

test("interface does not expose ride-hailing or driver-ranking controls", async () => {
  const app = (await readFile(resolve(root, "src/App.tsx"), "utf8")).toLowerCase();
  const forbidden = ["solicitar viaje", "calificacion del conductor", "aplicar recorte", "sancionar conductor"];
  for (const phrase of forbidden) assert.equal(app.includes(phrase), false, phrase);
});
