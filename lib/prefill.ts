export const PREFILL_EVENT = "ederox:prefill";

export type PrefillDetail = { oplossing?: string; bericht?: string };

export function dispatchPrefill(detail: PrefillDetail) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
}
