import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { SITE } from "../config";

const pages = [
  { label: "Home", to: "/" },
  { label: "Selfies", to: "/students-selfies" },
  { label: "Poll", to: "/poll" },
  { label: "Reel", to: "/horizontal-scroll" },
  { label: "Contact", to: "/contact" },
];

const Nav = ({ onAdmin }) => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-1 font-body text-sm font-semibold transition-colors ${
      isActive
        ? "bg-ink text-cream"
        : "text-ink/70 hover:bg-paper hover:text-ink"
    }`;

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink
          to="/"
          className="flex items-center gap-2 rounded-full bg-cream/85 px-3 py-1.5 shadow-note ring-1 ring-ink/10 backdrop-blur"
        >
          <span className="text-lg leading-none">📸</span>
          <span className="font-marker text-sm tracking-wide text-ink">
            {SITE.batch}
          </span>
        </NavLink>

        {/* Desktop */}
        <div className="hidden items-center gap-1 rounded-full bg-cream/85 px-2 py-1.5 shadow-note ring-1 ring-ink/10 backdrop-blur sm:flex">
          {pages.map((p) => (
            <NavLink key={p.to} to={p.to} className={linkClass} end={p.to === "/"}>
              {p.label}
            </NavLink>
          ))}
          <button
            onClick={onAdmin}
            className="ml-1 rounded-full bg-ink px-3 py-1 font-marker text-xs tracking-wide text-cream transition-transform hover:-translate-y-0.5"
          >
            Admin
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="grid h-10 w-10 place-content-center rounded-full bg-cream/85 text-ink shadow-note ring-1 ring-ink/10 backdrop-blur sm:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-4 mt-1 flex flex-col gap-1 rounded-2xl bg-cream/95 p-3 shadow-note ring-1 ring-ink/10 backdrop-blur sm:hidden">
          {pages.map((p) => (
            <NavLink
              key={p.to}
              to={p.to}
              end={p.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 font-body font-semibold ${
                  isActive ? "bg-ink text-cream" : "text-ink/80 hover:bg-paper"
                }`
              }
            >
              {p.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onAdmin();
            }}
            className="mt-1 rounded-xl bg-ink px-4 py-2.5 text-left font-marker text-sm tracking-wide text-cream"
          >
            Admin
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
