# Corredor Claro - 3:30 demo script

## 0:00-0:25 - the problem

Open the live URL on the hero.

> My Week 7 slice is Corredor Claro. It attacks one narrow vacuum: before anyone claims that a colectivo corridor can run with a different vehicle allocation, can an authorized planner tell whether the evidence is reliable enough even to support the study? This is not ride-hailing, driver scoring, or automatic service control.

## 0:25-0:55 - the Dragon Stack

Scroll to the map.

> The Dragon Stack is visible here: geodata and maps through Leaflet and OpenStreetMap; simulated ML at the segment level; and a third layer of invented phone GPS and accelerometer telemetry. The route, eight stops, anonymous vehicles, boarding counts, and sensor events are all invented and labeled simulated.

Select a sampled stop, then a stop marked UNKNOWN.

> Every stop keeps provenance. Missing observations remain UNKNOWN instead of being inferred away.

## 0:55-1:35 - baseline evidence check

Keep `Estudio base` selected and click `Ejecutar ML simulado`.

> The model classifies bounded corridor segments, never people. It exposes coverage, confidence, and movement-event counts. Two baseline segments remain UNKNOWN, so the product refuses to call this ready.

Scroll to the five conditions.

> Three evidence conditions fail: usable GPS coverage, represented boarding stops, and agreement with the manual reference. Wait and paid-hour safeguards pass, but that cannot compensate for missing evidence.

## 1:35-2:25 - comparison and shadow clause

Select `Estudio cobertura primero`, then click `Ejecutar ML simulado` again.

> This scenario adds invented observations and a paid transition role; it does not cut vehicles. The persona test caught an important problem here: changing the dropdown originally looked like collecting real evidence. The fix is this provenance panel. It says SIMULACION HIPOTETICA, lists every delta from baseline, and shows the simulated dataset version and date.

Point to the shadow-clause panel.

> The Blueprint boundary remains visible: no driver score, no automatic cuts, no loss of paid hours without equivalent work or compensation, and no hiding the driver's contribution.

## 2:25-3:00 - bounded human action

Enter a note longer than 12 characters and click `Registrar escenario candidato`.

> All gates pass, but the product records only a candidate for human study. It does not change service, send a recommendation, or claim ROI. The local trace identifies an invented authorized-planner role and states that no operational action occurred.

## 3:00-3:30 - what changed my mind

> What changed my mind this week is that better data is not automatically better evidence, and public value is not automatically buyer return. I began by asking whether improved dispatch could create savings. I ended with a stricter question: who accepts the evidence, what is still unknown, and who pays when the spreadsheet says the corridor improved? A useful system must make uncertainty and worker/rider downside as visible as the apparent optimization.
