import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { chapters } from "../data/memories";

const IMG_PADDING = 12;

const Chapters = () => {
  return (
    <section id="chapters" className="bg-paper pt-10">
      <div className="mx-auto mb-6 max-w-3xl px-4 text-center">
        <p className="eyebrow">flip the pages</p>
        <h2 className="mt-2 font-hand text-5xl text-ink sm:text-6xl">Our story, in three chapters</h2>
      </div>
      {chapters.map((c, i) => (
        <TextParallaxContent key={i} imgUrl={c.img} subheading={c.subheading} heading={c.heading} tag={c.tag}>
          <ChapterCopy body={c.body} tag={c.tag} />
        </TextParallaxContent>
      ))}
    </section>
  );
};

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl border-[10px] border-cream shadow-polaroid"
    >
      <motion.div className="absolute inset-0 bg-ink/50" style={{ opacity }} />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center px-4 text-cream"
    >
      <p className="mb-2 text-center font-type text-sm uppercase tracking-[0.3em] sm:text-base">
        {subheading}
      </p>
      <p className="text-center font-hand text-6xl leading-none drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)] md:text-8xl">
        {heading}
      </p>
    </motion.div>
  );
};

const ChapterCopy = ({ body, tag }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <div className="col-span-1 md:col-span-4">
      <span className="inline-block rotate-[-2deg] bg-tape/80 px-3 py-1 font-marker text-sm text-ink shadow-sm">
        {tag}
      </span>
    </div>
    <div className="col-span-1 md:col-span-8">
      {body.map((para, i) => (
        <p key={i} className="mb-4 font-body text-xl leading-relaxed text-ink/80 md:text-2xl">
          {para}
        </p>
      ))}
    </div>
  </div>
);

export default Chapters;
