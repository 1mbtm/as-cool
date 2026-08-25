import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiLock, FiX, FiTrash2, FiPlus } from "react-icons/fi";
import { SITE } from "../config";
import { addStoredEvent, getStoredEvents, removeStoredEvent } from "../lib/store";
import { formatEventDate } from "../lib/time";

const EMOJI_CHOICES = ["🎉", "🎓", "📝", "🎭", "🏆", "🎨", "🎂", "🪔", "🎸", "📸"];

const AdminModal = ({ open, onClose, onChange }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [error, setError] = useState("");
  const [stored, setStored] = useState([]);

  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🎉");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) setStored(getStoredEvents());
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const tryUnlock = (e) => {
    e.preventDefault();
    if (passInput.trim() === SITE.adminPasscode) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Nope — wrong passcode. Try again 🙈");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    addStoredEvent({
      id: `local-${Date.now()}`,
      emoji,
      title: title.trim(),
      date,
      note: note.trim(),
      local: true,
    });
    setStored(getStoredEvents());
    setTitle("");
    setNote("");
    setDate("");
    setEmoji("🎉");
    onChange?.();
  };

  const remove = (id) => {
    removeStoredEvent(id);
    setStored(getStoredEvents());
    onChange?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.94, y: 20, rotate: -1 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative z-10 w-full max-w-lg rounded-2xl bg-cream p-6 shadow-polaroid ring-1 ring-ink/10"
          >
            <span className="tape absolute -top-3 left-8" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-ink/50 transition-colors hover:text-ink"
              aria-label="Close"
            >
              <FiX size={22} />
            </button>

            {!unlocked ? (
              <form onSubmit={tryUnlock} className="pt-2">
                <h3 className="flex items-center gap-2 font-hand text-4xl text-ink">
                  <FiLock className="text-kraftdark" /> Admin only
                </h3>
                <p className="mt-1 font-body text-sm text-ink/60">
                  Enter the passcode to add events. (Psst — it's set in{" "}
                  <code className="rounded bg-paper px-1">src/config.js</code>)
                </p>
                <input
                  type="password"
                  autoFocus
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  placeholder="passcode"
                  className="mt-4 w-full rounded-lg border border-ink/15 bg-paper px-4 py-2.5 font-type text-ink outline-none focus:border-kraftdark"
                />
                {error && <p className="mt-2 font-body text-sm text-faded">{error}</p>}
                <button type="submit" className="btn btn-primary mt-4 w-full">
                  Unlock
                </button>
              </form>
            ) : (
              <div className="pt-2">
                <h3 className="font-hand text-4xl text-ink">Add an event ✎</h3>
                <p className="mt-1 font-body text-sm text-ink/60">
                  Saved in <b>this browser</b> only. To show it for everyone, add it to{" "}
                  <code className="rounded bg-paper px-1">src/data/events.js</code>.
                </p>

                <form onSubmit={submit} className="mt-4 space-y-3">
                  <div className="flex gap-2">
                    <select
                      value={emoji}
                      onChange={(e) => setEmoji(e.target.value)}
                      className="rounded-lg border border-ink/15 bg-paper px-3 py-2.5 text-xl outline-none focus:border-kraftdark"
                    >
                      {EMOJI_CHOICES.map((em) => (
                        <option key={em} value={em}>
                          {em}
                        </option>
                      ))}
                    </select>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Event name (e.g. Class Reunion)"
                      className="flex-1 rounded-lg border border-ink/15 bg-paper px-4 py-2.5 font-body text-ink outline-none focus:border-kraftdark"
                    />
                  </div>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-paper px-4 py-2.5 font-type text-ink outline-none focus:border-kraftdark"
                  />
                  <input
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="A little note (optional)"
                    className="w-full rounded-lg border border-ink/15 bg-paper px-4 py-2.5 font-body text-ink outline-none focus:border-kraftdark"
                  />
                  <button type="submit" className="btn btn-primary w-full">
                    <FiPlus /> Add to countdown
                  </button>
                </form>

                {stored.length > 0 && (
                  <div className="mt-5">
                    <p className="eyebrow mb-2">events you added</p>
                    <ul className="space-y-2">
                      {stored.map((e) => (
                        <li
                          key={e.id}
                          className="flex items-center justify-between rounded-lg bg-paper px-3 py-2 ring-1 ring-ink/10"
                        >
                          <span className="font-body text-sm text-ink">
                            {e.emoji} <b>{e.title}</b>{" "}
                            <span className="text-ink/50">· {formatEventDate(e.date)}</span>
                          </span>
                          <button
                            onClick={() => remove(e.id)}
                            className="text-ink/40 transition-colors hover:text-faded"
                            aria-label="Remove"
                          >
                            <FiTrash2 />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminModal;
