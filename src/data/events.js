// ─────────────────────────────────────────────────────────────────
//  EVENTS  ·  the countdown pulls from this list
// ─────────────────────────────────────────────────────────────────
//  ADMIN: naye events yahan add karo (ya website pe "Admin" panel se —
//  woh browser me save hote hain, sirf us device pe dikhte hain).
//  Yahan add kiye events SABKO dikhte hain.
//
//  date format: "YYYY-MM-DDTHH:mm"  (24-hour time)
//  Jo events guzar chuke hain, woh countdown me apne aap chhup jaate hain.
// ─────────────────────────────────────────────────────────────────

const events = [
  {
    id: "sports-day",
    emoji: "🏆",
    title: "Sports Day",
    date: "2026-09-20T08:00",
    note: "House colours on. May the fastest maggi-fueled legs win.",
  },
  {
    id: "annual-function",
    emoji: "🎭",
    title: "Annual Function",
    date: "2026-10-15T17:30",
    note: "Backstage chaos, front-stage magic. Rehearse or perish.",
  },
  {
    id: "final-exams",
    emoji: "📝",
    title: "Final Exams",
    date: "2026-11-09T09:00",
    note: "Deep breaths. You already know more than you think.",
  },
  {
    id: "farewell",
    emoji: "🎓",
    title: "Farewell Party",
    date: "2026-12-18T18:00",
    note: "Dress code: formal + waterproof mascara. See you there.",
  },
];

export default events;
