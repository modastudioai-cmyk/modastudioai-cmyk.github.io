# Operator OS: Zapier ↔ Supabase Webhook Integration Plan

## Objective
Enable direct HoneyBook/Tally-triggered updates into the Operator OS without adding Google Sheets as a tracker layer.

## Integration Principles
1. Operator OS remains source of truth.
2. Zapier acts as event bridge and formatter.
3. Supabase admin client (service role) is used only in secured server routes.
4. Database enum values remain `essential`, `growth`, `signature`.

## Suggested Secure Routes

### 1) Create client after HoneyBook payment/booking
**Route:** `POST /api/webhooks/honeybook/client-created`

**Expected payload fields**
- `honeybook_project_id`
- `client_email`
- `client_name`
- `selected_offer` (must be `essential|growth|signature`)
- `booking_paid_at`
- `contract_signed_at`

**Actions**
- Validate webhook signature/token.
- Upsert client by email.
- Create onboarding record with `intake_status = 'pending'`.
- Write audit log row (`event_source='honeybook'`).

### 2) Update intake status after Tally submission
**Route:** `POST /api/webhooks/tally/intake-submitted`

**Expected payload fields**
- `submission_id`
- `client_email`
- `intake_completed_at`
- `form_version`

**Actions**
- Validate webhook auth token.
- Locate client by email.
- Set intake status to submitted/complete per current schema.
- Store normalized intake payload in structured JSON column.
- Write audit log row (`event_source='tally'`).

### 3) Update asset gate status
**Route:** `POST /api/webhooks/operator/asset-gate-updated`

**Expected payload fields**
- `client_id` (or `client_email` fallback)
- `gate_name` (brand_assets, approvals, handoff_pack, etc.)
- `gate_status` (blocked|ready|approved)
- `changed_by` (zapier/operator)
- `changed_at`

**Actions**
- Validate shared secret.
- Update asset-gate state in Operator OS tables.
- Trigger downstream notifications (portal status/event feed) if already implemented.
- Write audit log row (`event_source='operator_webhook'`).

## Admin Client Pattern (Node example)
```ts
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
```

## Security Requirements
- Verify source signatures or static webhook secret per route.
- Reject unsigned requests with `401`.
- Add idempotency key handling (e.g., external event id + source).
- Log route-level errors and payload metadata (never sensitive raw payment data).

## Zapier Flow Guidance
1. Trigger: HoneyBook payment completed / contract signed.
2. Formatter: normalize offer key to internal enum.
3. Action: call Operator OS webhook route.
4. Trigger: Tally form submitted.
5. Action: call intake webhook route.
6. Optional action: call asset gate route for milestone updates.

No Google Sheets tracker is required in this design.
