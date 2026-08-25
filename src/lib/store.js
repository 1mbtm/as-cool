// ─────────────────────────────────────────────────────────────────
//  Local storage helpers for admin-added events + the guestbook.
//  Everything here lives only in the visitor's own browser.
// ─────────────────────────────────────────────────────────────────

const EVENTS_KEY = "osd_events_v1";
const GUEST_KEY = "osd_guestbook_v1";

const safeParse = (raw, fallback) => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const read = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  return safeParse(window.localStorage.getItem(key), fallback);
};

const write = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

/* ── Events (admin-added, this browser only) ── */

export const getStoredEvents = () => read(EVENTS_KEY, []);

export const addStoredEvent = (event) => {
  const events = getStoredEvents();
  events.push(event);
  write(EVENTS_KEY, events);
  return events;
};

export const removeStoredEvent = (id) => {
  const events = getStoredEvents().filter((e) => e.id !== id);
  write(EVENTS_KEY, events);
  return events;
};

/**
 * Merge default (shared) events with admin-added ones, drop anything
 * already in the past, and sort by soonest-first.
 */
export const getAllEvents = (defaults = []) => {
  const now = Date.now();
  return [...defaults, ...getStoredEvents()]
    .filter((e) => new Date(e.date).getTime() > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

/* ── Guestbook ── */

export const getGuestEntries = () => read(GUEST_KEY, []);

export const addGuestEntry = (entry) => {
  const entries = getGuestEntries();
  entries.unshift(entry);
  write(GUEST_KEY, entries);
  return entries;
};
