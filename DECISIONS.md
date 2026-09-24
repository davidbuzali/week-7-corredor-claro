# Decision log

## 2026-09-24 - packet and architecture close

- Chose a one-corridor evidence gate because David's Blueprint declaration owns the buyer/evidence case, accepted evidence standard, and rider/worker downside checks.
- Named the product **Corredor Claro** to center transparent evidence rather than optimization or surveillance.
- Selected an invented `Oriente 1` corridor and invented vehicle, boarding, wait, and sensor records. No real personal data is present.
- Selected Swiftly as the global benchmark, then localized the slice around CDMX route context, representative samples, UNKNOWN states, an accepted manual comparison, and the shadow clause.
- Used Leaflet/OpenStreetMap for geodata, simulated GPS plus accelerometer events for phone telemetry, and a deterministic simulated-ML classifier.
- Kept storage in browser session state; authentication and Row Level Security are not applicable because the slice stores no personal data.

### Tomorrow's first move

Ask an authorized SEMOVI planning counterpart what evidence standard and manual reference would be accepted for one funded corridor decision.

## 2026-09-24 - mechanical test close

- First build passed TypeScript and Vite production compilation.
- Mechanical tests exposed two mismatches: the note validator accepted fewer characters than the UI promised, and the explicit `No score de conductor` language was missing from the decision area.
- Corrected both defects; the automated suite now passes 6 of 6 tests.
- Verified that the stable Vercel production alias is public while the generated deployment-specific URL remains protected.

### Tomorrow's first move

Confirm the accepted definitions for usable GPS coverage, representative boarding samples, and manual-reference agreement before changing the proposed thresholds.

## 2026-09-24 - persona and final session close

- The synthetic Lucia test found that choosing a passing scenario could be mistaken for collecting new evidence.
- Added a persistent provenance/delta panel, dataset version, simulated date, and explicit hypothetical label.
- Renamed the passing outcome from evidence ready to **scenario candidate** so a simulated dropdown cannot overstate field validation.
- Preserved the human authority boundary: no operational action, driver score, automatic cut, sanction, or verified ROI claim.
- Connected the Vercel project to the dedicated `davidbuzali/week-7-corredor-claro` repository.

### Tomorrow's first move

Replace the hypothetical coverage-first assumptions only after a field partner supplies a consented sample plan, named manual reference, and written authority to use the result.
