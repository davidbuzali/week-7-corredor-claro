# Corredor Claro - 3:30 demo video script

**Live URL:** https://week-7-corredor-claro.vercel.app

**Final filename:** `DEMO_davidbuzali.mp4`

## Before recording

1. Open the live URL in a desktop browser and reload it so the app begins on `Estudio base` with no recorded decision.
2. Set browser zoom to 90-100% and confirm that the map tiles have loaded.
3. Keep this script on another screen or device.
4. Record the browser window with the cursor visible. Speak calmly; the clicks and short pauses are included in the timing.

## 0:00-0:25 - problem and user

**On screen:** Begin at the hero and slowly point to `Datos simulados` and `Revision humana requerida`.

> My Week 7 slice is Corredor Claro. It addresses one narrow problem: before anyone changes a colectivo corridor, can an authorized planner tell whether the available evidence is reliable enough even to support the study? My user is Lucia, an invented SEMOVI corridor analyst. This is not ride-hailing, driver scoring, or automatic service control.

## 0:25-0:55 - Dragon Stack and corridor evidence

**On screen:** Scroll to the map. Click one sampled stop, then click Santa Martha or La Paz, where the evidence is `UNKNOWN`.

> The Dragon Stack is visible here. I use Leaflet and OpenStreetMap for geodata, a simulated machine-learning check, and invented phone GPS and accelerometer telemetry. The route, eight stops, anonymous vehicles, boarding counts, and sensor events are all invented and labeled simulated. Each stop shows its source. When evidence is missing, the interface keeps it UNKNOWN instead of inventing certainty.

## 0:55-1:35 - baseline evidence check

**On screen:** Scroll to `Chequeo de evidencia por segmento`. Keep `Estudio base` selected and click `Ejecutar ML simulado`. Pause briefly on the segment cards, then scroll to the five conditions.

> The model classifies bounded corridor events, never a driver. It exposes coverage, confidence, and movement-event counts. In the baseline, two segments remain UNKNOWN, so the system refuses to call the evidence ready. Three conditions fail: useful GPS coverage, represented boarding stops, and agreement with the manual reference. The wait and paid-hour protections pass, but those safeguards cannot compensate for incomplete evidence.

## 1:35-2:20 - comparison and persona-test fix

**On screen:** Select `Estudio cobertura primero`, click `Ejecutar ML simulado` again, and point to `Simulacion hipotetica` and `Que cambio y de donde viene`.

> This comparison adds invented observations and a paid transition role; it does not remove vehicles. My persona test found the most important problem in the first version: changing this dropdown looked as if it had collected real evidence. I fixed that by adding a persistent provenance panel. It explicitly says this is a hypothetical simulation, lists every change from the baseline, and shows a simulated dataset version and date. The passing result is now called a candidate for human study, not accepted field evidence.

## 2:20-3:00 - shadow clause and bounded human decision

**On screen:** Point to the `Shadow clause` panel. In the analyst note, enter: `Escenario hipotetico listo para validacion humana; no autoriza cambios.` Click `Registrar escenario candidato`, then point to the new local trace entry.

> The Blueprint boundary also remains visible: no driver score, no automatic cuts, no loss of paid hours without equivalent work or compensation, and no hiding the driver's contribution. Even when all five gates pass, the final action only records a human posture. It does not change service, transmit a recommendation, or claim financial return. The trace confirms that the analyst role is invented and that no operational action occurred.

## 3:00-3:30 - what changed my mind this week

**On screen:** Leave the local trace and the bottom boundary banner visible. Look toward the camera if practical.

> What changed my mind this week is that better data is not automatically better evidence, and public value is not automatically buyer return. I began by asking whether better dispatch could create savings. I ended with stricter questions: who accepts the evidence, what remains unknown, and who carries the cost when a spreadsheet says the corridor improved? A useful system must make uncertainty and rider and worker consequences as visible as the apparent optimization.

## Final recording check

- Runtime is approximately 3 minutes 30 seconds.
- The live URL is visible during the walkthrough.
- The baseline failure and hypothetical passing comparison both appear.
- The persona-test fix is explained on screen.
- The candidate decision is recorded and its non-operational trace is visible.
- The last 30 seconds clearly answer `what changed my mind this week`.
