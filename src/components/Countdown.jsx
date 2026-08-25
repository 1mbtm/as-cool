import { useAnimate } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiPlus, FiClock } from "react-icons/fi";
import defaultEvents from "../data/events";
import { getAllEvents } from "../lib/store";
import { formatEventDate } from "../lib/time";
import AdminModal from "./AdminModal";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const UNITS = [
  { unit: "Day", text: "days" },
  { unit: "Hour", text: "hours" },
  { unit: "Minute", text: "minutes" },
  { unit: "Second", text: "seconds" },
];

const Countdown = () => {
  const [events, setEvents] = useState(() => getAllEvents(defaultEvents));
  const [selectedId, setSelectedId] = useState(() => getAllEvents(defaultEvents)[0]?.id);
  const [adminOpen, setAdminOpen] = useState(false);

  const refresh = () => {
    const next = getAllEvents(defaultEvents);
    setEvents(next);
    setSelectedId((cur) => (next.some((e) => e.id === cur) ? cur : next[0]?.id));
  };

  // Re-filter past events every minute so the list stays honest,
  // and refresh whenever the nav's admin modal changes events.
  useEffect(() => {
    const id = window.setInterval(refresh, MINUTE);
    window.addEventListener("osd:events-changed", refresh);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("osd:events-changed", refresh);
    };
  }, []);

  const selected = useMemo(
    () => events.find((e) => e.id === selectedId) || events[0],
    [events, selectedId]
  );
  const targetTime = selected ? new Date(selected.date).getTime() : null;

  return (
    <section id="countdown" className="bg-paper px-4 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="eyebrow">mark your calendars</p>
        <h2 className="mt-2 font-hand text-5xl text-ink sm:text-6xl">Coming up next</h2>
      </div>

      {/* Event chips */}
      <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-2">
        {events.map((e) => {
          const active = e.id === selected?.id;
          return (
            <button
              key={e.id}
              onClick={() => setSelectedId(e.id)}
              className={`rounded-full px-4 py-2 font-body text-sm font-bold shadow-sm ring-1 transition-colors ${
                active
                  ? "bg-ink text-cream ring-ink"
                  : "bg-cream text-ink/70 ring-ink/10 hover:bg-tape/50 hover:text-ink"
              }`}
            >
              <span className="mr-1.5">{e.emoji}</span>
              {e.title}
            </button>
          );
        })}
        <button
          onClick={() => setAdminOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-tape/60 px-4 py-2 font-marker text-xs tracking-wide text-ink ring-1 ring-kraftdark/30 transition-transform hover:-translate-y-0.5"
        >
          <FiPlus /> add event
        </button>
      </div>

      {/* The countdown card */}
      <div className="mx-auto mt-8 max-w-3xl">
        {selected ? (
          <div className="rounded-2xl bg-kraft/40 p-4 shadow-note ring-1 ring-kraftdark/20">
            <div className="mb-3 flex flex-col items-center gap-1 text-center">
              <p className="font-hand text-3xl text-ink">
                {selected.emoji} {selected.title}
              </p>
              <p className="flex items-center gap-1.5 font-type text-xs uppercase tracking-widest text-kraftdark">
                <FiClock /> {formatEventDate(selected.date)}
              </p>
            </div>

            <div className="mx-auto flex w-full items-stretch overflow-hidden rounded-xl bg-cream ring-1 ring-ink/10">
              {UNITS.map(({ unit, text }) => (
                <CountdownItem key={unit} unit={unit} text={text} targetTime={targetTime} />
              ))}
            </div>

            {selected.note && (
              <p className="mt-4 text-center font-body text-base italic text-ink/70">
                “{selected.note}”
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl bg-cream p-10 text-center shadow-note ring-1 ring-ink/10">
            <p className="font-hand text-3xl text-ink">No upcoming events yet 🍃</p>
            <p className="mt-2 font-body text-ink/60">
              Admin, add the next big day with the{" "}
              <span className="font-bold">add event</span> button.
            </p>
          </div>
        )}
      </div>

      <AdminModal open={adminOpen} onClose={() => setAdminOpen(false)} onChange={refresh} />
    </section>
  );
};

const pad = (unit, value) => (unit === "Day" ? String(value) : String(value).padStart(2, "0"));

const CountdownItem = ({ unit, text, targetTime }) => {
  const { ref, time } = useTimer(unit, targetTime);
  return (
    <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1 border-r border-ink/10 last:border-r-0 md:h-32">
      <div className="relative w-full overflow-hidden text-center">
        <span ref={ref} className="block font-type text-3xl font-medium text-ink md:text-5xl lg:text-6xl">
          {pad(unit, time)}
        </span>
      </div>
      <span className="font-body text-xs font-semibold uppercase tracking-wide text-kraftdark md:text-sm">
        {text}
      </span>
    </div>
  );
};

// Animated shifting digits, counting down to `targetTime` (ms epoch).
const useTimer = (unit, targetTime) => {
  const [ref, animate] = useAnimate();
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!targetTime) return;

    const tick = async () => {
      const distance = Math.max(0, targetTime - Date.now());
      let newTime = 0;
      if (unit === "Day") newTime = Math.floor(distance / DAY);
      else if (unit === "Hour") newTime = Math.floor((distance % DAY) / HOUR);
      else if (unit === "Minute") newTime = Math.floor((distance % HOUR) / MINUTE);
      else newTime = Math.floor((distance % MINUTE) / SECOND);

      if (newTime !== timeRef.current) {
        if (ref.current) {
          await animate(ref.current, { y: ["0%", "-50%"], opacity: [1, 0] }, { duration: 0.35 });
        }
        timeRef.current = newTime;
        setTime(newTime);
        if (ref.current) {
          await animate(ref.current, { y: ["50%", "0%"], opacity: [0, 1] }, { duration: 0.35 });
        }
      }
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [unit, targetTime, animate, ref]);

  return { ref, time };
};

export default Countdown;
