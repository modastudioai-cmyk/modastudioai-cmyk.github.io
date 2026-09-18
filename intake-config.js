/**
 * Public Pages intake config (safe to commit).
 * Do NOT embed STRATEGY_INTAKE_WEBHOOK_SECRET or any server secret here.
 *
 * Set MODA_TURNSTILE_SITE_KEY to the public Cloudflare Turnstile site key
 * after founder provisioning (not done in code PRs).
 */
window.MODA_SUPABASE_FUNCTIONS_ORIGIN = 'https://tdlmogcmicqaiwurboyl.supabase.co';

window.MODA_STRATEGY_INTAKE_ENDPOINT =
  'https://tdlmogcmicqaiwurboyl.supabase.co/functions/v1/strategy-intake-submit';

window.MODA_TURNSTILE_SITE_KEY = '';
