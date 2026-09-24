# Corredor Claro - test log

## Mechanical pass 1 - 2026-09-24

### Build check

`tsc -b && vite build` completed successfully. The production bundle rendered the React application and Leaflet map without TypeScript errors.

### First deployment

- Vercel project: `week-7-corredor-claro`
- First production deployment: `https://week-7-corredor-claro-2yyoe39pv-davidbuzali.vercel.app`
- Build: successful
- Public-access check: **failed** because the generated deployment currently redirects to Vercel authentication. This URL is evidence of the first deploy but is not accepted as the final live URL.

### Automated checks

The first test run covers:

1. Baseline scenario remains blocked while the coverage-first scenario passes the five proposed gates.
2. Insufficient segment evidence remains UNKNOWN.
3. Added observations resolve initial UNKNOWN segments in the coverage-first scenario.
4. Planner-note validation matches the displayed 12-280 character rule.
5. Required simulated-data, human-authority, and shadow-clause language exists in the interface.
6. Ride-hailing and driver-ranking controls do not exist.

### Bugs found

The planner form told the user that a note needed at least 12 characters, but the validator accepted 10 or 11 characters. This mismatch allowed a weaker trace entry than the interface promised and made the validation rule misleading.

The rendered-language check also found that the permanent safety boundary appeared only as `No score, ranking...` inside a longer sentence. The clearer promised phrase `No score de conductor` was missing from the decision area, weakening rapid comprehension.

### Required fix

Change the validator minimum from 10 to 12, make the no-driver-score boundary explicit, rerun every test, rebuild, verify the complete user flow visually, and create a second production deployment after the persona fix.

## Mechanical pass 2 - 2026-09-24

- Corrected the planner-note validator to enforce the displayed 12-character minimum.
- Added the explicit boundary `No score de conductor` to the shadow-clause panel.
- Reran 6 automated tests: **6 passed, 0 failed**.
- Rebuilt the production bundle: TypeScript and Vite completed successfully.
- The final redeployment remains pending until the persona test identifies and resolves its most consequential confusion.

## Persona pass - 2026-09-24

- Ran a fresh synthetic-user task as Lucia, an invented SEMOVI corridor-planning analyst.
- Reviewed the initial screen, the baseline simulated-ML result, and the passing coverage-first state in sequence.
- Worst confusion: choosing a scenario appeared to create better evidence without showing whether observations had actually been collected.
- Fix: added the `Que cambio y de donde viene` panel, explicit hypothetical label, dataset version/date, and every delta from baseline.
- Governance fix: changed the passing outcome from `evidence ready` to `scenario candidate` so simulated inputs cannot overstate field validation.
- Captured the fixed state in `docs/assets/persona/03-coverage-first-fixed.png`.

## Second deployment and final verification - 2026-09-24

- Second production deployment: `https://week-7-corredor-claro-ehv22oh9j-davidbuzali.vercel.app`
- Deployment id: `dpl_AvodQPFGsaupwAjwpSLoHeGADUa9`
- Stable public alias: `https://week-7-corredor-claro.vercel.app`
- Vercel production build: successful.
- Public UI check: verified the live page contains `Simulacion hipotetica`, the provenance deltas, and `Registrar escenario candidato`.
- Final local checks: 6 automated tests passed, TypeScript passed, and the Vite production build passed.

## Security-floor pass

- No API keys, credentials, `.env` files, or secrets are used.
- No real personal information exists in fixtures or UI copy.
- No backend or personal-data table exists; authentication and Row Level Security are not applicable.
- The only free-text form has trimming, length bounds, and accessible inline errors.
- Every model output and operational record is labeled simulated.
