import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

// hover.dev "DivOrigami" rolodex — logos ki jagah student selfies flip hoti hain
export default function SelfieRolodex({ people = [] }) {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (people.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1);
    }, DELAY_IN_MS);
    return () => clearInterval(intervalRef.current || undefined);
  }, [people.length]);

  if (people.length === 0) return null;

  const current = people[index % people.length];

  return (
    <div
      style={{ transform: "rotateY(-20deg)", transformStyle: "preserve-3d" }}
      className="relative z-0 h-56 w-72 shrink-0 rounded-xl border border-kraftdark/40 bg-kraft/40 shadow-polaroid"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            zIndex: -index,
            backfaceVisibility: "hidden",
          }}
          key={index}
          transition={{ duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut" }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          <SelfieCard person={current} />
        </motion.div>
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            zIndex: index,
            backfaceVisibility: "hidden",
          }}
          key={(index + 1) * 2}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          transition={{ duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2"
        >
          <SelfieCard person={current} />
        </motion.div>
      </AnimatePresence>

      <hr
        style={{ transform: "translateZ(1px)" }}
        className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-kraft"
      />
    </div>
  );
}

function SelfieCard({ person }) {
  return (
    <div className="grid h-48 w-64 place-content-center gap-2 rounded-lg bg-cream p-2 text-center">
      <img
        src={person.photo}
        alt={person.name}
        className="mx-auto h-28 w-28 rounded-md object-cover shadow-note"
        draggable={false}
      />
      <span className="font-marker text-lg text-ink">{person.name}</span>
    </div>
  );
}
