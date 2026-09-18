/**
 * Copy to intake-config.js for local overrides if needed.
 * Deploy intake-config.js to GitHub Pages (public site key only).
 *
 * Do NOT put STRATEGY_INTAKE_WEBHOOK_SECRET or TURNSTILE_SECRET_KEY here.
 * Edge verifies Turnstile with TURNSTILE_SECRET_KEY (server-only).
 */
window.MODA_SUPABASE_FUNCTIONS_ORIGIN = 'https://YOUR_PROJECT_REF.supabase.co';
window.MODA_STRATEGY_INTAKE_ENDPOINT =
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/strategy-intake-submit';
window.MODA_TURNSTILE_SITE_KEY = 'replace-with-public-turnstile-site-key';
