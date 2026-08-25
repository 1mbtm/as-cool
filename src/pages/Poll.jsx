import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { FiLock } from "react-icons/fi";
import { SITE } from "../config";

const LS_KEY = "osd_poll_v1";
const SESSION_KEY = "osd_poll_unlocked";

const DEFAULT_OPTIONS = [
  { title: "Sports Day", votes: 0, color: "bg-teal" },
  { title: "Farewell", votes: 0, color: "bg-washi" },
  { title: "Annual Function", votes: 0, color: "bg-mustard" },
  { title: "Class Trips", votes: 0, color: "bg-faded" },
];

function loadVotes() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_OPTIONS;
    const saved = JSON.parse(raw);
    // titles match karke merge (config change hone pe safe)
    return DEFAULT_OPTIONS.map((o) => ({
      ...o,
      votes: saved.find((s) => s.title === o.title)?.votes ?? 0,
    }));
  } catch {
    return DEFAULT_OPTIONS;
  }
}

export default function Poll() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "1"
  );

  return (
    <main className="min-h-screen bg-paper px-6 pb-24 pt-28">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <p className="eyebrow">Batch vote 🗳️</p>
          <h1 className="font-marker text-5xl text-ink sm:text-6xl">
            The Class Poll
          </h1>
        </header>

        {unlocked ? (
          <BarPoll />
        ) : (
          <Gate onUnlock={() => setUnlocked(true)} />
        )}
      </div>
    </main>
  );
}

function Gate({ onUnlock }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (pw === SITE.pollPassword || pw === SITE.adminPasscode) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError("Galat password 🙈");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-sm rounded-2xl bg-cream/80 p-7 text-center shadow-note ring-1 ring-ink/10"
    >
      <div className="mx-auto mb-3 grid h-14 w-14 place-content-center rounded-full bg-ink text-cream">
        <FiLock className="text-2xl" />
      </div>
      <h2 className="mb-1 font-marker text-2xl text-ink">Password chahiye</h2>
      <p className="mb-5 font-hand text-xl text-ink/60">
        Poll sirf admin / password waalon ke liye hai
      </p>
      <input
        type="password"
        placeholder="Poll password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="mb-3 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-center font-body text-ink outline-none focus:border-kraftdark"
      />
      {error && (
        <p className="mb-3 font-body text-sm text-faded">{error}</p>
      )}
      <button type="submit" className="btn btn-primary w-full justify-center">
        Unlock poll
      </button>
    </form>
  );
}

// hover.dev BarPoll — scrapbook-themed, votes localStorage me save
function BarPoll() {
  const [votes, setVotes] = useState(loadVotes);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(votes));
  }, [votes]);

  const totalVotes = useMemo(
    () => votes.reduce((acc, cv) => acc + cv.votes, 0),
    [votes]
  );

  const increment = (vote) =>
    setVotes((pv) =>
      pv.map((v) => (v.title === vote.title ? { ...v, votes: v.votes + 1 } : v))
    );

  const reset = () => setVotes((pv) => pv.map((v) => ({ ...v, votes: 0 })));

  return (
    <div className="rounded-2xl bg-cream/70 p-6 shadow-note ring-1 ring-ink/10 sm:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px] md:gap-10">
        {/* Options */}
        <div>
          <h3 className="mb-5 font-marker text-3xl text-ink">
            Sabse yaadgaar din? 🎉
          </h3>
          <div className="mb-5 space-y-2">
            {votes.map((vote) => (
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => increment(vote)}
                key={vote.title}
                className={`w-full rounded-xl ${vote.color} py-2.5 font-body font-bold text-cream shadow-note`}
              >
                {vote.title}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-hand text-xl italic text-ink/60">
              {totalVotes} votes
            </span>
            <button
              onClick={reset}
              className="rounded-lg bg-ink/10 px-3 py-1.5 font-body text-sm font-medium text-ink hover:bg-ink/20"
            >
              Reset count
            </button>
          </div>
        </div>

        {/* Bars */}
        <div
          className="grid min-h-[220px] gap-2"
          style={{ gridTemplateColumns: `repeat(${votes.length}, minmax(0, 1fr))` }}
        >
          {votes.map((vote) => {
            const height = totalVotes
              ? ((vote.votes / totalVotes) * 100).toFixed(2)
              : 0;
            return (
              <div key={vote.title}>
                <div className="relative flex h-full w-full items-end overflow-hidden rounded-2xl bg-kraft/40 ring-1 ring-ink/10">
                  <motion.span
                    animate={{ height: `${height}%` }}
                    className={`relative z-0 w-full ${vote.color}`}
                    transition={{ type: "spring" }}
                  />
                  <span className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 p-2 text-center text-ink">
                    <b className="font-body text-sm">{vote.title}</b>
                    <br />
                    <span className="font-type text-xs text-ink/70">
                      {vote.votes} votes
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
