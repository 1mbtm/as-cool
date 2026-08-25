// Small time helpers.

const DAY_MS = 1000 * 60 * 60 * 24;

/** Whole days elapsed since a date string (never negative). */
export const daysSince = (dateStr) => {
  const start = new Date(dateStr).getTime();
  if (Number.isNaN(start)) return 0;
  return Math.max(0, Math.floor((Date.now() - start) / DAY_MS));
};

/** Friendly event date, e.g. "Fri, 18 Dec, 6:00 pm". */
export const formatEventDate = (dateStr) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
};

/** Random-ish but stable tilt for scrapbook elements, based on an index. */
export const tiltFor = (i) => {
  const tilts = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5];
  return tilts[i % tilts.length];
};
