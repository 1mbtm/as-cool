// ─────────────────────────────────────────────────────────────────
//  MEMORIES  ·  all the photos & captions live here
// ─────────────────────────────────────────────────────────────────
//  These are PLACEHOLDER photos (picsum.photos) so the site always
//  renders. To use your own: just replace the `src` URLs below with
//  your image links (or drop files in /public and use "/photos/x.jpg").
//  Captions ko bhi apne inside-jokes se badal dena. 😄
// ─────────────────────────────────────────────────────────────────

const img = (seed, w = 900, h = 1100) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Big blurry hero backdrop
export const heroBg = `https://picsum.photos/seed/campus-gate/2400/1500`;

// Taped polaroids that float across the hero
export const heroPolaroids = [
  { src: img("gang-lunch"), caption: "the whole gang 💛", size: "w-1/3" },
  { src: img("canteen-days"), caption: "canteen economics 🍟", size: "mx-auto w-2/3" },
  { src: img("last-bench"), caption: "last-bench legends", size: "ml-auto w-1/3" },
  { src: img("field-trip"), caption: "the infamous field trip", size: "ml-24 w-5/12" },
];

// The three "chapters" (sticky parallax storytelling)
export const chapters = [
  {
    img: `https://picsum.photos/seed/friendships/2000/1300`,
    subheading: "Chapter One",
    heading: "The friendships.",
    body: [
      "It started with a shared eraser and a seat swap, and somehow turned into the people who'd cover for you, laugh at your worst jokes, and split one plate of fries four ways.",
      "We didn't know it then, but those random benchmates became the whole reason mornings were worth it.",
    ],
    tag: "day one till forever",
  },
  {
    img: `https://picsum.photos/seed/mischief/2000/1300`,
    subheading: "Chapter Two",
    heading: "The mischief.",
    body: [
      "Notes passed under desks, nicknames that stuck for life, the one substitute period that descended into beautiful chaos, and the group chat that never, ever slept.",
      "Half of it we can't print here. The other half we'll be telling at reunions for the next forty years.",
    ],
    tag: "no comment, teacher",
  },
  {
    img: `https://picsum.photos/seed/lessons/2000/1300`,
    subheading: "Chapter Three",
    heading: "The lessons.",
    body: [
      "Some came from textbooks. Most came from the corridors — how to show up for people, how to lose and try again, how to make a whole day better with one dumb inside joke.",
      "Turns out the syllabus was never the point.",
    ],
    tag: "gyaan, but the good kind",
  },
];

// The Memory Wall — hover to scatter these, plus a static grid below
export const wall = [
  { src: img("assembly-line", 700, 850), caption: "morning assembly ☀️" },
  { src: img("science-lab", 700, 850), caption: "the lab explosion (small one)" },
  { src: img("annual-day", 700, 850), caption: "annual day glow-up ✨" },
  { src: img("rainy-recess", 700, 850), caption: "rainy-day recess 🌧️" },
  { src: img("bus-ride", 700, 850), caption: "back-seat bus crew 🚌" },
  { src: img("library-nap", 700, 850), caption: "'studying' in the library 😴" },
  { src: img("cricket-ground", 700, 850), caption: "lunch-break cricket 🏏" },
  { src: img("art-class", 700, 850), caption: "art class masterpiece 🎨" },
  { src: img("farewell-fits", 700, 850), caption: "farewell fits 🎓" },
  { src: img("classroom-chalk", 700, 850), caption: "chalk-dust afternoons" },
  { src: img("festival-fun", 700, 850), caption: "festival week 🪔" },
  { src: img("group-photo", 700, 850), caption: "one for the yearbook 📖" },
  { src: img("canteen-crew", 700, 850), caption: "samosa summit 🥟" },
  { src: img("sports-meet", 700, 850), caption: "sports meet sprint 🏅" },
  { src: img("music-room", 700, 850), caption: "music room jam 🎸" },
  { src: img("goodbye-gate", 700, 850), caption: "last day at the gate 🥲" },
];

export default { heroBg, heroPolaroids, chapters, wall };
