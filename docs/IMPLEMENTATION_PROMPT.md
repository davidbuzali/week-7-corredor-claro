# Corredor Claro - implementation prompt

Build a small, deployable React + TypeScript + Vite application named **Corredor Claro** from `docs/PACKET.md`. This is a one-corridor evidence gate for an invented SEMOVI planning pilot. It is not a ride-hailing product, a driver-scoring product, or a service-control system.

## Product objective

An authorized planner must be able to inspect one invented corridor, run a clearly labeled simulated-ML evidence check, compare the digital result with an invented manual reference, review rider and worker safeguards, and record whether evidence is ready for a human planning study. The app must never claim that a route change, vehicle cut, sanction, purchase, savings figure, or ROI has been authorized.

## Build constraints

- Use React, TypeScript, Vite, and Leaflet.
- Use OpenStreetMap raster tiles without an API key.
- Use only local invented records. Store no personal data and call no AI API.
- Label the dataset and every model result **SIMULATED**.
- Implement the evidence calculations as pure TypeScript functions.
- Keep all state in the browser session.
- Validate the planner note: trimmed length from 12 to 280 characters.
- Meet keyboard, focus, contrast, and responsive-layout basics.
- Add automated tests for the evidence gates and rendered safety language.

## Feature 1 - corridor overview

Render an interactive map with:

- one invented route called `Oriente 1`;
- eight stops with dependence level and sampling status;
- four anonymous vehicle markers;
- teal observed route segments and amber dashed coverage gaps;
- a visible legend and a persistent `SIMULATED DATA` badge.

Acceptance criteria:

- Map markers do not contain driver names, device IDs, plates, or identity scores.
- Selecting a stop opens a readable summary of boarding sample, wait observation, and provenance.
- Map failure does not hide the corridor evidence cards; show a textual fallback.

## Feature 2 - evidence sources and simulated ML

Show the four bounded inputs:

1. GPS coverage from simulated phone telemetry.
2. Accelerometer jerk events from simulated phone sensors.
3. Supervised boarding samples.
4. Manual field reference for comparison.

Add a `Run simulated ML check` control. The deterministic classifier must produce segment-level states only: `SUPPORTED`, `REVIEW`, or `UNKNOWN`. Its calculation may combine coverage, sample count, speed variance, jerk events, and manual agreement, but it must show the contributing values and return `UNKNOWN` when coverage is insufficient.

Acceptance criteria:

- The control and result repeat `SIMULATED ML` visibly.
- No output uses the terms good driver, bad driver, risk score, rank, star, sanction, or violation.
- The same input always produces the same output.
- At least one segment is `UNKNOWN` in the initial dataset.

## Feature 3 - decision evidence gate

Calculate and display:

- usable GPS coverage;
- represented-stop boarding coverage;
- manual-reference agreement;
- 90th-percentile wait change at sampled high-dependence stops;
- paid driver-hour change and transition-plan status.

Each gate must show its threshold, observed value, pass/fail state, and short explanation. Overall status is `HUMAN REVIEW REQUIRED` until the model check is run and all conditions pass.

Acceptance criteria:

- A scenario with any failed condition cannot be recorded as evidence ready.
- A failed condition links or scrolls to the evidence that caused it.
- Thresholds are called proposed pilot rules, not SEMOVI policy.

## Feature 4 - scenario comparison and shadow clause

Provide two invented, non-operational scenarios:

- `Baseline study`: no service change; used to inspect evidence quality.
- `Coverage-first study`: adds observations and a paid driver transition role; does not cut vehicles.

Display vehicle allocation only as context. Display wait effects at high-dependence stops and paid driver hours side by side. Include a fixed shadow-clause card: `No driver score. No automatic cuts. No loss of paid hours without equivalent work or compensation.`

Acceptance criteria:

- No button applies, sends, publishes, or implements a service change.
- Changing the scenario recomputes gates but preserves the baseline.
- The interface states that a real decision would require independent validation and authorized human action.

## Feature 5 - bounded human decision

Let the planner write a validated note and record one of two local-session outcomes:

- `Stop and collect more evidence`.
- `Evidence ready for human study` only when every gate passes.

After the persona test, the hypothetical coverage-first path uses the stricter label `Scenario candidate for human study`; it may not imply that invented observations were collected or accepted.

After recording, show a trace entry with time, chosen status, and the statement `No operational action occurred.`

Acceptance criteria:

- Blank, too-short, and overlong notes show accessible inline errors.
- Evidence-ready remains disabled until all conditions pass.
- The log attributes the action to `Authorized planner - invented demo role`, not a real individual.

## Feature 6 - responsive and accessible polish

- Use a restrained civic-technology visual system: deep navy, off-white, teal, amber, and coral.
- Maintain a logical heading structure, clear focus states, descriptive button text, and live status announcements.
- Stack the dashboard into one column at tablet and mobile widths.
- Respect reduced-motion preferences.

## Test requirements

Create Node tests for pure decision logic and rendered HTML checks for required labels and prohibited concepts. The first mechanical test run must document at least one discovered bug. Fix that bug in a separate commit, rerun tests, and describe the result in `docs/TESTING.md`.

## Commit plan

1. `docs: add Week 7 packet before code`
2. `docs: add implementation prompt and acceptance plan`
3. `feat: build corridor map and simulated evidence model`
4. `feat: add human review gates and shadow safeguards`
5. `test: document mechanical pass and first deployment`
6. `fix: clarify persona decision boundary`
7. `docs: finalize submission artifacts and session close`

## Definition of done

- The Vercel URL works without credentials.
- The packet, implementation prompt, decision log, test log, persona log, demo script, and submission checklist exist.
- The repository has at least five Week 7 commits.
- Two Vercel production deployments are documented, with the second after the bug/persona fix.
- Submission PDFs exist for packet, persona log, and build-chat transcript.
- No secret, real personal data, driver identity score, automatic cut, or unverified ROI claim appears in the product.
