/**
 * Lightweight analytics helper.
 *
 * Every CTA on the site pushes a uniquely-named event into the GTM
 * `dataLayer` so the marketing dashboard can compare website clicks against
 * AppExchange / Salesforce trial submissions, installs, and purchases.
 *
 * GTM is loaded in index.html. If it hasn't initialized yet (or is blocked),
 * pushes are simply buffered on the array and picked up once it loads.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type TrackParams = Record<string, string | number | boolean | undefined>;

/**
 * Push a named event to the dataLayer.
 *
 * @param event  Unique event name, e.g. `homepage_edge_connect_trial_click`.
 * @param params Optional extra context (product, cta, location…).
 */
export function track(event: string, params: TrackParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/**
 * Convenience click handler factory for CTAs.
 * Returns a handler that fires the event without blocking navigation.
 */
export function trackClick(event: string, params?: TrackParams) {
  return () => track(event, params);
}
