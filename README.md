# Corredor Claro

Corredor Claro is David Buzali's Week 7 individual build for Business Bending. It is an evidence gate for one invented Mexico City colectivo corridor, not a ride-hailing app and not a driver-scoring system.

## Stack

- React, TypeScript, and Vite
- Leaflet and OpenStreetMap geodata
- Simulated phone GPS and accelerometer telemetry
- Deterministic simulated-ML segment classifier
- Vercel static deployment

All operational records, people, vehicles, and model outputs are invented and labeled simulated. The app stores no personal data and uses no API keys.

## Local development

```bash
pnpm install --ignore-workspace
pnpm dev
```

## Checks

```bash
pnpm test
pnpm build
```

See [docs/PACKET.md](docs/PACKET.md) for the packet-before-code evidence and [docs/IMPLEMENTATION_PROMPT.md](docs/IMPLEMENTATION_PROMPT.md) for acceptance criteria.
