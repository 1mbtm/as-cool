import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { wall } from "../data/memories";

// hover.dev HorizontalScrollCarousel — scroll se side me chalte polaroids
export default function HorizontalScroll() {
  return (
    <main className="bg-paper">
      <div className="flex h-[40vh] flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow">a moving reel 🎞️</p>
        <h1 className="mt-2 font-marker text-5xl text-ink sm:text-6xl">
          Scroll Through the Year
        </h1>
        <p className="mt-3 font-hand text-2xl text-ink/60">
          neeche scroll karo — memories side me chalengi →
        </p>
      </div>

      <HorizontalScrollCarousel />

      <div className="flex h-[30vh] items-center justify-center px-6 text-center">
        <p className="font-hand text-3xl text-ink/60">
          …aur bhi bahut kuch. 💛
        </p>
      </div>
    </main>
  );
}

function HorizontalScrollCarousel() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-kraft/30">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6">
          {wall.map((card, i) => (
            <Card key={i} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Card({ card, index }) {
  return (
    <div
      className={`group relative h-[420px] w-[340px] shrink-0 overflow-hidden rounded-sm bg-cream p-3 shadow-polaroid ${
        index % 2 ? "rotate-1.5" : "-rotate-1.5"
      }`}
    >
      <div
        style={{ backgroundImage: `url(${card.src})` }}
        className="h-[340px] w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      />
      <p className="absolute inset-x-3 bottom-3 bg-gradient-to-t from-ink/70 to-transparent p-3 text-center font-hand text-2xl text-cream">
        {card.caption}
      </p>
    </div>
  );
}
