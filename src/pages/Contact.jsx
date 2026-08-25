import { motion } from "motion/react";
import { FiGithub, FiInstagram, FiGlobe } from "react-icons/fi";
import { SiSnapchat } from "react-icons/si";
import { SITE } from "../config";

const DURATION = 0.25;
const STAGGER = 0.025;

// hover pe letters flip hote hain (hover.dev pattern, scrapbook-themed)
const FlipLink = ({ children, href, Icon }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-4 overflow-hidden whitespace-nowrap font-marker text-4xl uppercase text-ink sm:text-6xl md:text-7xl"
      style={{ lineHeight: 0.9 }}
    >
      <span className="text-3xl text-kraftdark transition-transform group-hover:-rotate-12 sm:text-5xl">
        <Icon />
      </span>
      <span className="relative block overflow-hidden">
        <div>
          {children.split("").map((l, i) => (
            <motion.span
              variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
              transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
              className="inline-block"
              key={i}
            >
              {l === " " ? " " : l}
            </motion.span>
          ))}
        </div>
        <div className="absolute inset-0 text-faded">
          {children.split("").map((l, i) => (
            <motion.span
              variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
              transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
              className="inline-block"
              key={i}
            >
              {l === " " ? " " : l}
            </motion.span>
          ))}
        </div>
      </span>
    </motion.a>
  );
};

export default function Contact() {
  const { socials } = SITE;
  return (
    <main className="min-h-screen bg-paper px-6 pb-24 pt-28">
      <div className="mx-auto max-w-4xl">
        <header className="mb-14 text-center">
          <p className="eyebrow">Say hi 👋</p>
          <h1 className="font-marker text-5xl text-ink sm:text-6xl">
            Reach out & tag us
          </h1>
          <p className="mx-auto mt-3 max-w-md font-hand text-2xl text-ink/70">
            Photos, memes, ya bas hello — hum sab jagah hain.
          </p>
        </header>

        <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl bg-cream/70 p-8 shadow-note ring-1 ring-ink/10 sm:p-12">
          <FlipLink href={socials.github} Icon={FiGithub}>
            GitHub
          </FlipLink>
          <FlipLink href={socials.instagram} Icon={FiInstagram}>
            Instagram
          </FlipLink>
          <FlipLink href={socials.snapchat} Icon={SiSnapchat}>
            Snapchat
          </FlipLink>
          <FlipLink href={socials.website} Icon={FiGlobe}>
            School Site
          </FlipLink>
        </div>

        <p className="mt-8 text-center font-type text-xs text-ink/50">
          Links config me edit karo → src/config.js (SITE.socials)
        </p>
      </div>
    </main>
  );
}
