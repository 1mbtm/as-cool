import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { FiArrowDown } from "react-icons/fi";
import { SITE } from "../config";
import { heroBg, heroPolaroids } from "../data/memories";
import { tiltFor } from "../lib/time";

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div id="top" className="relative w-full">
      <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className="relative w-full">
        <CenterImage />
        <TitleCard />
        <ParallaxPolaroids />
        {/* fade into the cream paper below */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-paper/0 to-paper" />
      </div>
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `linear-gradient(to bottom, rgba(59,49,34,0.15), rgba(59,49,34,0.45)), url(${heroBg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const TitleCard = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, -80]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none sticky top-0 z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
    >
      <p className="mb-3 font-type text-sm uppercase tracking-[0.35em] text-cream/90 drop-shadow">
        {SITE.schoolName}
      </p>
      <h1 className="font-hand text-6xl leading-[0.9] text-cream drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)] sm:text-8xl md:text-9xl">
        {SITE.batch}
      </h1>
      <p className="mt-4 max-w-md font-body text-lg text-cream/90 drop-shadow sm:text-xl">
        {SITE.tagline}
      </p>
      <div className="mt-10 flex items-center gap-2 font-type text-xs uppercase tracking-[0.3em] text-cream/80">
        scroll to relive it <FiArrowDown className="animate-bounce" />
      </div>
    </motion.div>
  );
};

const ParallaxPolaroids = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[220px]">
      {heroPolaroids.map((p, i) => (
        <ParallaxPolaroid
          key={i}
          src={p.src}
          caption={p.caption}
          className={p.size}
          start={i % 2 === 0 ? -200 : 200}
          end={i % 2 === 0 ? 200 : -250}
          tilt={tiltFor(i)}
        />
      ))}
    </div>
  );
};

const ParallaxPolaroid = ({ className, src, caption, start, end, tilt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale}) rotate(${tilt}deg)`;

  return (
    <motion.figure ref={ref} style={{ transform, opacity }} className={`polaroid relative ${className}`}>
      <span className="tape absolute -top-3 left-1/2 -translate-x-1/2" />
      <img src={src} alt={caption} className="aspect-[4/5] w-full object-cover" />
      <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-xl text-ink/80">
        {caption}
      </figcaption>
    </motion.figure>
  );
};

export default Hero;
