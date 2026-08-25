import { SITE } from "../config";

const links = [
  { label: "Memories", href: "#chapters" },
  { label: "The Wall", href: "#wall" },
  { label: "Coming Up", href: "#countdown" },
  { label: "Guestbook", href: "#guestbook" },
];

const Nav = ({ onAdmin }) => {
  const go = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          className="flex items-center gap-2 rounded-full bg-cream/85 px-3 py-1.5 shadow-note ring-1 ring-ink/10 backdrop-blur"
        >
          <span className="text-lg leading-none">📸</span>
          <span className="font-marker text-sm tracking-wide text-ink">
            {SITE.batch}
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-cream/85 px-2 py-1.5 shadow-note ring-1 ring-ink/10 backdrop-blur sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              className="rounded-full px-3 py-1 font-body text-sm font-semibold text-ink/70 transition-colors hover:bg-paper hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onAdmin}
            className="ml-1 rounded-full bg-ink px-3 py-1 font-marker text-xs tracking-wide text-cream transition-transform hover:-translate-y-0.5"
          >
            Admin
          </button>
        </div>

        {/* Mobile: just the admin key */}
        <button
          onClick={onAdmin}
          className="rounded-full bg-cream/85 px-3 py-1.5 font-marker text-xs tracking-wide text-ink shadow-note ring-1 ring-ink/10 backdrop-blur sm:hidden"
        >
          Admin
        </button>
      </div>
    </nav>
  );
};

export default Nav;
