# Display Mapping Standard (Client-Facing Labels)

## Purpose
MODA keeps internal program values stable while presenting premium client-facing names.

- Internal values (must not change): `essential`, `growth`, `signature`
- Client-facing labels:
  - `essential` → **Identity System**
  - `growth` → **Brand Engine**
  - `signature` → **Full Operating System**

## Rule of Use
- Databases, enums, webhook payload keys, and phase logic continue using internal values.
- UI rendering layers (website, client portal views, selected operator UI labels) should map the internal values to client-facing labels.
- API contracts should accept and return internal values unless a dedicated `display_name` field is explicitly added.

## Recommended Mapping Snippet
```js
export const OFFER_DISPLAY_MAP = {
  essential: { name: 'Identity System' },
  growth: { name: 'Brand Engine' },
  signature: { name: 'Full Operating System' }
};

export function getOfferDisplayName(offerKey) {
  return OFFER_DISPLAY_MAP[offerKey]?.name ?? offerKey;
}
```

## Surfaces To Apply
1. Public website tier cards and CTA copy
2. Client portal tier labels and progress labels
3. Operator UI labels only where it improves readability (optional), while preserving internal keys in data handling

## Safety Checklist
- [ ] No migration changes to program enums
- [ ] No changes to Supabase stored values
- [ ] No changes to workflow branching based on `essential/growth/signature`
- [ ] UI labels verified for all three tiers
