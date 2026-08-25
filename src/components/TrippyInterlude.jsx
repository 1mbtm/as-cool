import { useTransform, useScroll, motion } from "motion/react";
import { useRef } from "react";

// Warm remix of the "trippy scroll" — a short spin down memory lane.
const NUM_SECTIONS = 20;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;
const COLOR_A = "#3b3122"; // ink
const COLOR_B = "#f6edda"; // paper

const TrippyInterlude = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "90deg"]);

  return (
    <div ref={targetRef} className="relative z-0 h-[300vh] bg-paper">
      <div className="sticky top-0 h-screen overflow-hidden bg-cream">
        <Trippy rotate={rotate} />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center mix-blend-difference">
          <p className="font-hand text-5xl text-white sm:text-7xl">
            so many little moments…
          </p>
        </div>
      </div>
    </div>
  );
};

const generateSections = (count, color, rotate) => {
  if (count === NUM_SECTIONS) return <></>;
  const nextColor = color === COLOR_A ? COLOR_B : COLOR_A;
  return (
    <Section rotate={rotate} background={color}>
      {generateSections(count + 1, nextColor, rotate)}
    </Section>
  );
};

const Trippy = ({ rotate }) => {
  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ background: COLOR_A }}>
      {generateSections(0, COLOR_A, rotate)}
    </motion.div>
  );
};

const Section = ({ background, children, rotate }) => {
  return (
    <motion.div
      className="relative h-full w-full origin-center"
      style={{ background, rotate, padding: PADDING }}
    >
      {children}
    </motion.div>
  );
};

export default TrippyInterlude;
