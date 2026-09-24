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

## Security-floor pass

- No API keys, credentials, `.env` files, or secrets are used.
- No real personal information exists in fixtures or UI copy.
- No backend or personal-data table exists; authentication and Row Level Security are not applicable.
- The only free-text form has trimming, length bounds, and accessible inline errors.
- Every model output and operational record is labeled simulated.
