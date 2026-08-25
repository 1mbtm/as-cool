import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "../config";
import { daysSince } from "../lib/time";

const digitVariants = {
  enter: (direction) => ({
    opacity: 0,
    rotateX: direction > 0 ? -88 : 88,
    y: direction > 0 ? "88%" : "-88%",
    filter: "blur(2px)",
  }),
  center: { opacity: 1, rotateX: 0, y: "0%", filter: "blur(0px)" },
  exit: (direction) => ({
    opacity: 0,
    rotateX: direction > 0 ? 88 : -88,
    y: direction > 0 ? "-88%" : "88%",
    filter: "blur(2px)",
  }),
};

const formatUsers = (value) => new Intl.NumberFormat("en-US").format(value);

const AnimatedNumber = ({ value }) => {
  const previous = useRef(value);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (value === previous.current) return;
    setDirection(value > previous.current ? 1 : -1);
    previous.current = value;
  }, [value]);

  const formatted = useMemo(() => formatUsers(value), [value]);
  const characters = useMemo(() => Array.from(formatted), [formatted]);

  return (
    <span
      className="inline-flex items-center font-type text-2xl font-medium tracking-[-0.02em] text-faded"
      aria-label={String(value)}
    >
      <span aria-hidden="true" className="flex items-center [font-variant-numeric:tabular-nums]">
        {characters.map((character, index) => (
          <DigitColumn
            key={`${index}-${character === "," ? "comma" : "digit"}`}
            character={character}
            index={index}
            direction={direction}
          />
        ))}
      </span>
    </span>
  );
};

const DigitColumn = ({ character, direction, index }) => {
  const isComma = character === ",";
  return (
    <motion.span
      initial={{ opacity: 0, rotateX: -56, y: "52%" }}
      animate={{ opacity: 1, rotateX: 0, y: "0%" }}
      transition={{ delay: 0.08 + index * 0.035, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="relative inline-flex h-[1em] overflow-hidden align-baseline"
      style={{ perspective: 360, width: isComma ? "0.28em" : "0.62em" }}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.span
          key={character}
          custom={direction}
          variants={digitVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, delay: index * 0.014, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {character}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

const MIN = 12;
const MAX = 84;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const MemoriesTicker = () => {
  const [online, setOnline] = useState(37);

  useEffect(() => {
    const id = window.setInterval(() => {
      const dir = Math.random() > 0.4 ? 1 : -1;
      const step = Math.floor(Math.random() * 4) + 1;
      setOnline((c) => clamp(c + dir * step, MIN, MAX));
    }, 1900);
    return () => window.clearInterval(id);
  }, []);

  const days = daysSince(SITE.firstDay);

  return (
    <section className="relative z-10 -mt-2 px-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-xl bg-cream px-6 py-5 shadow-note ring-1 ring-ink/10 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-teal opacity-40" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-teal" />
          </span>
          <span className="font-body text-sm font-bold text-ink sm:text-base">
            classmates reliving memories&nbsp;now:
          </span>
          <AnimatedNumber value={online} />
        </div>

        <div className="hidden h-8 w-px bg-ink/10 sm:block" />

        <div className="flex items-baseline gap-2">
          <span className="font-hand text-4xl leading-none text-teal">
            {new Intl.NumberFormat("en-US").format(days)}
          </span>
          <span className="font-body text-sm font-semibold text-ink/70">
            days together (and counting)
          </span>
        </div>
      </div>
    </section>
  );
};

export default MemoriesTicker;
