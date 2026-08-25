import { Link } from "react-router-dom";
import { SITE } from "../config";

const signatures = ["Ananya", "Rohan ✌️", "Zoya", "Kabir", "Meher", "Devansh", "Sara", "Aryan"];

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Selfies", to: "/students-selfies" },
  { label: "Poll", to: "/poll" },
  { label: "Reel", to: "/horizontal-scroll" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-ink px-4 py-16 text-cream">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-6 flex w-fit gap-1">
          <span className="tape !bg-washi/70" />
          <span className="tape !bg-teal/70" />
          <span className="tape !bg-mustard/70" />
        </div>

        <h2 className="font-hand text-5xl sm:text-6xl">{SITE.batch}</h2>
        <p className="mt-2 font-body text-cream/70">{SITE.schoolName} · {SITE.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {footerLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-body text-sm font-semibold text-cream/70 transition-colors hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {signatures.map((s, i) => (
            <span
              key={s}
              className="font-hand text-3xl text-cream/80"
              style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (2 + (i % 3))}deg)` }}
            >
              {s}
            </span>
          ))}
        </div>

        <p className="mt-12 font-body text-xs text-cream/40">
          Made with 💛 by the batch, for the batch. &nbsp;·&nbsp; Photos are placeholders —
          swap them in <code className="rounded bg-cream/10 px-1">src/data/memories.js</code>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
