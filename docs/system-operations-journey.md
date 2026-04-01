# MODA System Layers and Client Journey

## System Layer Model
1. **Website (public layer):** positioning, authority, inquiry entrypoint.
2. **Operator OS (control layer):** onboarding control, project state, approval logic, audit events.
3. **Client Portal (delivery layer):** client-facing milestones, assets, approvals, and deliverable visibility.
4. **Google Drive (storage layer only):** file storage and organized asset repository.
5. **HoneyBook:** contracts + invoicing + payment confirmation.
6. **Zapier:** event bridge between HoneyBook/Tally and Operator OS endpoints.
7. **Calendly:** scheduling layer for strategy sessions and ongoing monthly calls.

## Exact Onboarding Sequence
1. Prospect finds MODA via website and books strategy call.
2. Strategy call completed; tier recommendation selected internally (`essential|growth|signature`).
3. HoneyBook sends contract + invoice.
4. Payment + contract completion triggers Zapier event.
5. Zapier calls Operator OS client-create webhook.
6. Operator OS creates/updates client and marks intake as pending.
7. Client receives intake form (Tally).
8. Tally submission triggers Zapier intake webhook.
9. Operator OS updates intake status and opens build phase readiness checks.
10. Operator activates build phase once requirements are met.

## Responsibility Matrix
- **Website owner:** public messaging and conversion flow.
- **Operator (MODA internal):** source-of-truth updates, gate approvals, timeline control.
- **Client:** uploads required materials, completes approvals, attends scheduled calls.
- **Zapier owner (ops):** event reliability and webhook monitoring.
- **Portal admin:** publish deliverables after internal QA.

## Deliverable Movement Flow
1. Operator finalizes deliverable package.
2. Deliverable exported/uploaded to Google Drive structured folder.
3. Operator records deliverable metadata in Operator OS.
4. Portal sync or manual publish exposes deliverable links/status to client.
5. Client reviews inside portal and submits approvals/revisions.

Google Drive stores files; Operator OS and portal control status and visibility.

## Retainer Activation Logic
- Retainer is activated only after initial build handoff criteria are complete.
- Activation event is recorded in Operator OS with start date and cadence.
- Monthly operating tasks unlock according to retainer state.

## Monthly Retainer Call Scheduling
- **Monthly retainer calls:** recurring check-ins for active retainer clients only.
- Scheduled through dedicated Calendly event type tied to active retainer status.
- Operator OS should flag no-show/reschedule history for continuity.

## Strategy Calls vs Retainer Calls
- **New-client strategy call:** pre-engagement diagnostic to determine right tier and scope.
- **Monthly retainer call:** post-engagement operational rhythm for optimization, governance, and next-cycle priorities.

These calls serve different stages and should remain separate scheduling/event types.
