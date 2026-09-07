# Mashoor & Mirza wedding invitation

A responsive frontend recreation of https://mnm.loymir.com, inspected on September 7–8, 2026.

## Run locally

Requires Node.js 22.13 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Keep the terminal running while viewing the site.

## Production build

```sh
npm run build
npm start
```

Open the local address printed by the production server. The project uses React, TypeScript, Vinext/Vite, Tailwind, and the included Shadcn dialog primitive. The production output is a Cloudflare-compatible Worker in `dist/server/`, with browser assets in `dist/client/`.

## Project files

- `app/page.tsx`: invitation, event details, countdown, wishes form, and envelope composition.
- `app/globals.css`: reference-matched theme, responsive sizes, entrance/hover/petal/envelope animation, and reduced-motion support.
- `app/layout.tsx`: document title, description, language, and favicon.
- `public/assets/`: locally bundled reference artwork. No reference-site analytics or application scripts are included.
- `ASSETS.md`: asset provenance and reuse notes.
- `VALIDATION.md`: browser checks and known differences.

## Wishes behavior

This is a frontend-only recreation. Submitting valid wishes saves them in this browser's local storage under `mnm-wishes` and shows an explicit local-save confirmation. Nothing is sent to the couple or to the original website. The original backend was not accessed or duplicated. To accept live wishes, replace the submit handler in `Wishes` with an authorized backend integration and update the confirmation text.

The countdown targets July 25, 2026 at 11:00 AM India time and stops at zero after that date. Location and creator-credit links preserve the original destinations and open in a new tab.

## Typography and fidelity

Names and dates are original raster artwork. The original page declared Sedan, Roboto Serif, and BrownBulgary, but no web fonts were loaded in the inspected browser. This recreation preserves those font-family declarations and matches the observed Georgia/system-serif fallbacks without requiring remote font services. The main column stays at a maximum of 480px on desktop, as on the original. Small screens below 360px receive slightly tighter controls to prevent overflow. Motion respects the device's reduced-motion preference.
