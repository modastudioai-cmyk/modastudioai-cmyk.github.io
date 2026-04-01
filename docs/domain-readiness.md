# Website and Domain Readiness

## Goal
Move MODA from a GitHub Pages project URL to a production-grade domain structure.

## Recommended Domain Structure
- `modastudio.ai` → public marketing website
- `ops.modastudio.ai` → operator OS application
- `portal.modastudio.ai` → client delivery portal

## Where Code Changes Stop
Code updates handle:
- Content and label consistency
- Routing assumptions in front-end code
- Environment-based URL configuration

Code updates do **not** complete:
- DNS provisioning
- SSL certificate issuance
- Subdomain hosting attachment
- Redirect policy setup

## Deployment + Domain Setup Steps
1. Register/confirm domain at registrar.
2. Configure DNS records:
   - root/apex for `modastudio.ai`
   - CNAME records for `ops` and `portal`
3. Connect hosting providers for each app surface.
4. Enable SSL/TLS certificates for all three hostnames.
5. Add canonical redirects (e.g., non-www → root).
6. Verify CORS and auth callback URLs for ops/portal.
7. Update any webhook allowlists to new domains.

## GitHub Pages Specific Notes
If public site stays on GitHub Pages temporarily:
- Add `CNAME` file with `modastudio.ai`.
- Configure `A`/`ALIAS` records per GitHub Pages requirements.
- Keep repo deployment action unchanged unless migrating hosts.

## Readiness Checklist
- [ ] Public website served at `https://modastudio.ai`
- [ ] Operator OS served at `https://ops.modastudio.ai`
- [ ] Client portal served at `https://portal.modastudio.ai`
- [ ] SSL valid on all domains
- [ ] Cross-system links use production domains
- [ ] HoneyBook/Zapier callbacks updated
