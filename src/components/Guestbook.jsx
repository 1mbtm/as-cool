import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { addGuestEntry, getGuestEntries } from "../lib/store";
import { tiltFor } from "../lib/time";

// A few messages so the wall is never empty.
const SEED = [
  { name: "Ananya", message: "we really thought we'd hate each other in grade 6. jokes on us 🥹", color: "bg-tape/70" },
  { name: "Rohan", message: "canteen samosa > everything. that's the whole message.", color: "bg-teal/25" },
  { name: "Zoya", message: "to whoever kept hiding my water bottle — i knew it was you. love you anyway.", color: "bg-washi/35" },
  { name: "Kabir", message: "last bench forever. we saw everything and understood nothing 😌", color: "bg-mustard/30" },
];

const TINTS = ["bg-tape/70", "bg-teal/25", "bg-washi/35", "bg-mustard/30"];

const Guestbook = () => {
  const [entries, setEntries] = useState(() => getGuestEntries());
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const entry = {
      id: `g-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      color: TINTS[entries.length % TINTS.length],
    };
    setEntries(addGuestEntry(entry));
    setName("");
    setMessage("");
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2500);
  };

  const notes = [...entries, ...SEED];

  return (
    <section id="guestbook" className="bg-paper px-4 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">before you go</p>
        <h2 className="mt-2 font-hand text-5xl text-ink sm:text-6xl">Sign the yearbook</h2>
        <p className="mt-3 font-body text-lg text-ink/60">
          Leave a memory, a thank-you, or an inside joke only we'll get.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="mx-auto mt-8 max-w-xl rotate-[-1deg] rounded-xl bg-cream p-5 shadow-note ring-1 ring-ink/10"
      >
        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={40}
            className="w-full rounded-lg border border-ink/15 bg-paper px-4 py-2.5 font-marker text-ink outline-none focus:border-kraftdark"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something we'll re-read in 20 years..."
            maxLength={220}
            rows={3}
            className="w-full resize-none rounded-lg border border-ink/15 bg-paper px-4 py-2.5 font-hand text-2xl leading-tight text-ink outline-none focus:border-kraftdark"
          />
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-ink/40">saved in your browser · {message.length}/220</span>
            <button type="submit" className="btn btn-primary">
              <FiEdit3 /> {justAdded ? "Added! ✨" : "Sign it"}
            </button>
          </div>
        </div>
      </form>

      {/* Notes wall */}
      <div className="mx-auto mt-12 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {notes.map((n, i) => (
          <figure
            key={n.id || `seed-${i}`}
            className={`break-inside-avoid rounded-lg ${n.color || TINTS[i % TINTS.length]} p-5 shadow-note ring-1 ring-ink/10`}
            style={{ transform: `rotate(${tiltFor(i)}deg)` }}
          >
            <blockquote className="font-hand text-2xl leading-snug text-ink">{n.message}</blockquote>
            <figcaption className="mt-3 font-marker text-sm text-ink/70">— {n.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Guestbook;
