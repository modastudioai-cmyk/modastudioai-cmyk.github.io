# Stage 2E — Apply regenerated Soforth public experience to GitHub Pages

**Target repo:** `modastudioai-cmyk/modastudioai-cmyk.github.io`  
**Approved Stage 2E source:** `74d3c2cc3bb246cf5521e54950c8ab39bb22d529`  
**Production baseline used for Strategy Session behavior:** `aabf7326dffa57bf8297e1fc0b09ce86576f149d`  
**This package:** a new deterministic regeneration. These files are not the historical temporary artifact, and their SHA-256 values are new regeneration hashes.

Do not commit these files into `moda-studio` as live Pages. Do not deploy from this package.

## Boundary

| Writable in the monorepo | External / apply manually |
|---|---|
| Stage 2E review fixture (`/design-stage2e`) at the source commit | Production Pages homepage and Strategy Session presentation |

Founder or authorized operator must apply. This regeneration does not push, merge, or deploy.

## Files to copy onto Pages `main`

| File | Action |
|---|---|
| `index.html` | **Replace** production homepage |
| `css/soforth-public.css` | **Add** (create `css/` if needed) |
| `js/soforth-public.js` | **Add** (create `js/` if needed) |
| `strategy-session.html` | **Replace** with presentation-only title/nav/h1 Soforth copy — **intake JS/`window.MODA_*` unchanged** |
| `intake-config.js` | **Do not replace.** This package does not contain it. |
| `intake-config.example.js` | Not included. Leave production as-is. |

## Presentation-only Strategy Session changes

- `<title>` → `Book Strategy Call — SOFORTH`
- Nav logo text → `SOFORTH`
- `<h1>` → `Book a Soforth Strategy Call`

Form fields, required fields, names, values, payloads, inline functional JS, Turnstile, endpoint, validation, submission behavior, source identifier, package keys, and `window.MODA_*` are unchanged from the production baseline.

## Preserve

- Strategy Session destination (`strategy-session.html`)
- Working public email `mailto:modastudio.ai@gmail.com`
- `window.MODA_STRATEGY_INTAKE_ENDPOINT`
- `window.MODA_TURNSTILE_SITE_KEY`
- `window.MODA_SUPABASE_FUNCTIONS_ORIGIN`
- CORS origin `https://modastudioai-cmyk.github.io`
- Technical package keys `identity_system` / `brand_engine` / `full_operating_system`
- Strategy Session offer keys `essential` / `growth` / `signature` inside the frozen intake script

## Display mapping

| Display | Technical key |
|---|---|
| Essential | `identity_system` |
| Growth | `brand_engine` |
| Signature | `full_operating_system` |

## Verify after apply

1. `https://modastudioai-cmyk.github.io/` shows the Soforth narrative
2. Book Strategy Call → `strategy-session.html`
3. Intake still posts to the existing Edge function
4. No legal-entity claim on the public pages
5. The prohibited non-Gmail public address is absent from the public pages
6. `mailto:modastudio.ai@gmail.com` is present
7. Nav label for package depths reads **Work with Soforth** (anchor `#install` unchanged)
8. Microcopy reads **Start with a Strategy Session.**
9. `intake-config.js` on Pages is still the baseline file and was not overwritten by this package

## Review in monorepo

The approved narrative remains previewable from source commit `74d3c2cc3bb246cf5521e54950c8ab39bb22d529` at `/design-stage2e`. That route is a review fixture. This package is the production Pages translation of that source.
