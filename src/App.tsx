import { useCallback, useMemo, useState } from "react";
import { MapView } from "./MapView";
import { scenarios, segments, stops } from "./data";
import { allGatesPass, buildGates, classifySegment, evidenceForScenario, validatePlannerNote } from "./logic";
import type { SegmentResult, Stop } from "./types";

type DecisionEntry = {
  time: string;
  outcome: "STOP" | "READY";
  note: string;
};

export function App() {
  const [selectedStop, setSelectedStop] = useState<Stop>(stops[0]);
  const [modelResults, setModelResults] = useState<SegmentResult[] | null>(null);
  const [scenarioId, setScenarioId] = useState("baseline");
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState<string | null>(null);
  const [decisionLog, setDecisionLog] = useState<DecisionEntry[]>([]);

  const selectStop = useCallback((stop: Stop) => setSelectedStop(stop), []);
  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0],
    [scenarioId],
  );
  const gates = useMemo(() => buildGates(scenario), [scenario]);
  const hasUnknown = modelResults?.some((result) => result.state === "UNKNOWN") ?? true;
  const canRecordReady = Boolean(modelResults) && !hasUnknown && allGatesPass(scenario);

  function runModel() {
    setModelResults(evidenceForScenario(segments, scenario.id).map(classifySegment));
  }

  function changeScenario(nextId: string) {
    setScenarioId(nextId);
    setModelResults(null);
  }

  function recordDecision(outcome: DecisionEntry["outcome"]) {
    const error = validatePlannerNote(note);
    if (error) {
      setNoteError(error);
      return;
    }
    if (outcome === "READY" && !canRecordReady) return;
    setNoteError(null);
    setDecisionLog((entries) => [
      {
        time: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
        outcome,
        note: note.trim(),
      },
      ...entries,
    ]);
    setNote("");
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Corredor Claro, inicio">
          <span className="brand-mark">CC</span>
          <span>
            <strong>Corredor Claro</strong>
            <small>Evidencia antes de decidir</small>
          </span>
        </a>
        <nav aria-label="Secciones principales">
          <a href="#corridor">Corredor</a>
          <a href="#evidence">Evidencia</a>
          <a href="#decision">Decision</a>
        </nav>
        <span className="simulated-badge">Datos simulados</span>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">Piloto inventado · Oriente 1 · CDMX</p>
          <h1>¿La evidencia alcanza para informar una decision humana?</h1>
          <p>
            Inspecciona cobertura, muestras y desacuerdos antes de afirmar que un cambio mejora el corredor.
            Este prototipo no controla el servicio ni evalua personas.
          </p>
        </div>
        <div className="hero-status" aria-label="Estado inicial">
          <span>Estado</span>
          <strong>Revision humana requerida</strong>
          <small>Reglas propuestas para el piloto, no politica de SEMOVI.</small>
        </div>
      </section>

      <section className="map-grid" id="corridor" aria-labelledby="corridor-title">
        <div className="map-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Geodata + telemetria de telefono</p>
              <h2 id="corridor-title">Corredor Oriente 1</h2>
            </div>
            <div className="legend" aria-label="Leyenda del mapa">
              <span><i className="line observed" /> Observado</span>
              <span><i className="line gap" /> UNKNOWN</span>
            </div>
          </div>
          <MapView onSelectStop={selectStop} />
        </div>

        <aside className="stop-card" aria-live="polite">
          <p className="eyebrow">Parada seleccionada</p>
          <h2>{selectedStop.name}</h2>
          <dl>
            <div>
              <dt>Dependencia</dt>
              <dd>{selectedStop.highDependence ? "Alta" : "Regular"}</dd>
            </div>
            <div>
              <dt>Muestra de abordaje</dt>
              <dd>{selectedStop.sampled ? `${selectedStop.boardings} observaciones` : "UNKNOWN"}</dd>
            </div>
            <div>
              <dt>Espera P90</dt>
              <dd>{selectedStop.waitP90 ? `${selectedStop.waitP90} min` : "UNKNOWN"}</dd>
            </div>
          </dl>
          <div className="provenance">
            <strong>Procedencia</strong>
            <span>{selectedStop.source}</span>
          </div>
          <p className="small-note">Selecciona otra parada en el mapa para revisar su evidencia.</p>
        </aside>
      </section>

      <section className="evidence-section" id="evidence" aria-labelledby="evidence-title">
        <div className="section-heading wide">
          <div>
            <p className="eyebrow">ML + referencia independiente</p>
            <h2 id="evidence-title">Chequeo de evidencia por segmento</h2>
            <p>El modelo simulado clasifica eventos acotados. Nunca califica a un conductor.</p>
          </div>
          <button className="primary" type="button" onClick={runModel}>
            Ejecutar ML simulado
          </button>
        </div>

        <div className="source-strip" aria-label="Fuentes de evidencia">
          <article><span>01</span><strong>GPS</strong><small>Pings anonimos simulados</small></article>
          <article><span>02</span><strong>Sensores</strong><small>Eventos de movimiento simulados</small></article>
          <article><span>03</span><strong>Abordajes</strong><small>Conteos supervisados inventados</small></article>
          <article><span>04</span><strong>Referencia</strong><small>Comparacion manual inventada</small></article>
        </div>

        {!modelResults ? (
          <div className="empty-model">
            <span className="pulse-dot" />
            <div>
              <strong>Aun no hay resultado</strong>
              <p>Ejecuta el chequeo para ver confianza, desacuerdos y estados UNKNOWN.</p>
            </div>
          </div>
        ) : (
          <div className="segment-grid" aria-live="polite">
            {modelResults.map((result) => (
              <article className={`segment-card state-${result.state.toLowerCase()}`} key={result.id}>
                <div className="segment-top">
                  <span>{result.from} → {result.to}</span>
                  <strong>{result.state}</strong>
                </div>
                <div className="metric-row">
                  <span>Cobertura <b>{Math.round(result.coverage * 100)}%</b></span>
                  <span>Confianza <b>{Math.round(result.confidence * 100)}%</b></span>
                  <span>Eventos <b>{result.jerkEvents}</b></span>
                </div>
                <p>{result.explanation}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="scenario-preview" aria-labelledby="scenario-preview-title">
        <div>
          <p className="eyebrow">Escenario no operativo</p>
          <h2 id="scenario-preview-title">Compara la calidad de la evidencia</h2>
        </div>
        <label>
          Escenario de estudio
          <select value={scenarioId} onChange={(event) => changeScenario(event.target.value)}>
            {scenarios.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </select>
        </label>
        <p>{scenario.description}</p>
      </section>

      <section className="decision-section" id="decision" aria-labelledby="decision-title">
        <div className="decision-heading">
          <div>
            <p className="eyebrow">Puerta de evidencia</p>
            <h2 id="decision-title">Cinco condiciones antes de avanzar</h2>
            <p>Umbrales propuestos para este piloto academico. No son politica vigente de SEMOVI.</p>
          </div>
          <div className={`overall-status ${canRecordReady ? "ready" : "blocked"}`} aria-live="polite">
            <span>Estado del escenario</span>
            <strong>{canRecordReady ? "Evidencia lista para estudio humano" : "Revision humana requerida"}</strong>
            <small>
              {!modelResults
                ? "Ejecuta el ML simulado para completar la revision."
                : hasUnknown
                  ? "Hay segmentos UNKNOWN; se necesitan mas observaciones."
                  : gates.some((gate) => !gate.pass)
                    ? "Una o mas condiciones no alcanzan el umbral propuesto."
                    : "Todas las condiciones pasan; esto no implementa un cambio de servicio."}
            </small>
          </div>
        </div>

        <div className="gate-grid">
          {gates.map((gate) => (
            <article className={`gate-card ${gate.pass ? "pass" : "fail"}`} id={`gate-${gate.id}`} key={gate.id}>
              <div className="gate-state" aria-label={gate.pass ? "Condicion cumplida" : "Condicion no cumplida"}>
                {gate.pass ? "PASA" : "FALTA"}
              </div>
              <h3>{gate.label}</h3>
              <div className="gate-numbers">
                <strong>{gate.value}</strong>
                <span>umbral {gate.threshold}</span>
              </div>
              <p>{gate.explanation}</p>
            </article>
          ))}
        </div>

        <div className="shadow-grid">
          <article className="shadow-card">
            <p className="eyebrow">Shadow clause</p>
            <h3>No desaparecer al conductor para mejorar la hoja de calculo.</h3>
            <ul>
              <li>No score de conductor, ranking ni perfil permanente.</li>
              <li>No recorte automatico de vehiculos, paradas u horas pagadas.</li>
              <li>El conocimiento aportado permanece atribuible y accesible al contribuyente.</li>
              <li>Una transicion exige trabajo equivalente o compensacion acordada.</li>
            </ul>
          </article>
          <article className="authority-card">
            <p className="eyebrow">Autoridad humana</p>
            <h3>Este control registra una postura, no cambia la operacion.</h3>
            <p>
              Una decision real exigiria validacion independiente, evidencia aceptada y firma de la autoridad responsable.
              No se transmite nada desde este prototipo.
            </p>
            <label htmlFor="planner-note">Justificacion del analista</label>
            <textarea
              id="planner-note"
              value={note}
              maxLength={280}
              aria-describedby="note-help note-error"
              aria-invalid={Boolean(noteError)}
              onChange={(event) => {
                setNote(event.target.value);
                if (noteError) setNoteError(null);
              }}
              placeholder="Ej. Falta ampliar la muestra en Santa Martha antes de preparar el estudio."
            />
            <div className="field-meta" id="note-help">
              <span>12-280 caracteres</span>
              <span>{note.length}/280</span>
            </div>
            {noteError && <p className="field-error" id="note-error" role="alert">{noteError}</p>}
            <div className="decision-actions">
              <button className="secondary" type="button" onClick={() => recordDecision("STOP")}>
                Detener y reunir evidencia
              </button>
              <button className="primary" type="button" disabled={!canRecordReady} onClick={() => recordDecision("READY")}>
                Registrar lista para estudio humano
              </button>
            </div>
          </article>
        </div>

        <div className="decision-log" aria-live="polite">
          <div>
            <p className="eyebrow">Traza local de esta sesion</p>
            <h3>Decisiones registradas</h3>
          </div>
          {decisionLog.length === 0 ? (
            <p className="log-empty">Todavia no hay una postura registrada.</p>
          ) : (
            <ol>
              {decisionLog.map((entry, index) => (
                <li key={`${entry.time}-${index}`}>
                  <span>{entry.time}</span>
                  <strong>{entry.outcome === "READY" ? "Lista para estudio humano" : "Detener y reunir evidencia"}</strong>
                  <p>{entry.note}</p>
                  <small>Registrado por: Analista autorizado - rol inventado. No ocurrio ninguna accion operativa.</small>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className="boundary-banner">
        <strong>Sin score de conductor · Sin recortes automaticos</strong>
        <span>La autoridad humana conserva la decision. Los datos incompletos permanecen UNKNOWN.</span>
      </section>

      <footer>
        <span>Corredor Claro · prototipo academico</span>
        <span>Datos, vehiculos y resultados inventados</span>
      </footer>
    </main>
  );
}
