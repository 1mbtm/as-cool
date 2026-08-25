import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { FiLogOut, FiUploadCloud } from "react-icons/fi";
import { db, isFirebaseConfigured } from "../lib/firebase";
import { useAuth } from "../lib/auth";
import { fileToScaledDataURL } from "../lib/image";
import AuthPanel from "../components/AuthPanel";
import SelfieRolodex from "../components/SelfieRolodex";
import FirebaseNotice from "../components/FirebaseNotice";

export default function Selfies() {
  const { user, loading, ready, logout } = useAuth();
  const [people, setPeople] = useState([]);
  const [fetching, setFetching] = useState(true);

  const load = useCallback(async () => {
    if (!db) return;
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, "selfies"));
      const list = snap.docs.map((d) => d.data());
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      setPeople(list);
    } catch (e) {
      console.error("selfies load failed", e);
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (ready && user) load();
    else setFetching(false);
  }, [ready, user, load]);

  if (!isFirebaseConfigured) {
    return (
      <PageShell>
        <FirebaseNotice />
      </PageShell>
    );
  }

  if (loading) {
    return (
      <PageShell>
        <p className="text-center font-hand text-2xl text-ink/60">Loading…</p>
      </PageShell>
    );
  }

  if (!user) {
    return (
      <PageShell>
        <AuthPanel title="Apni selfie add karo" />
        <p className="mt-6 text-center font-hand text-xl text-ink/60">
          Log in karke apni ek selfie upload karo — batch wall pe lag jayegi 📸
        </p>
      </PageShell>
    );
  }

  const mine = people.find((p) => p.uid === user.uid);

  return (
    <PageShell>
      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="font-hand text-2xl text-ink/70">
          Hi, {user.displayName || user.email} 👋
        </p>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full bg-cream/80 px-4 py-2 font-body text-sm font-semibold text-ink shadow-note ring-1 ring-ink/10 hover:-translate-y-0.5"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      {mine ? (
        <AlreadyUploaded person={mine} />
      ) : (
        <UploadForm uid={user.uid} defaultName={user.displayName || ""} onDone={load} />
      )}

      {/* Gallery */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <p className="eyebrow">The batch</p>
          <h2 className="font-marker text-4xl text-ink">Selfie Rolodex</h2>
        </div>

        {fetching ? (
          <p className="text-center font-hand text-2xl text-ink/60">Loading faces…</p>
        ) : people.length === 0 ? (
          <p className="text-center font-hand text-2xl text-ink/60">
            Abhi tak koi selfie nahi — tum pehle bano! 🎉
          </p>
        ) : (
          <>
            <div className="flex justify-center py-6">
              <SelfieRolodex people={people} />
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {people.map((p, i) => (
                <motion.div
                  key={p.uid}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 8) * 0.04 }}
                  className={`polaroid ${i % 2 ? "rotate-2" : "-rotate-1.5"}`}
                >
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="aspect-square w-full rounded-sm object-cover"
                    draggable={false}
                  />
                  <p className="mt-2 text-center font-hand text-2xl text-ink">
                    {p.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}

function UploadForm({ uid, defaultName, onDone }) {
  const [name, setName] = useState(defaultName);
  const [preview, setPreview] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    try {
      const url = await fileToScaledDataURL(file);
      setDataUrl(url);
      setPreview(url);
    } catch (err) {
      setError(err.message || "Image process nahi hui.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!dataUrl) return setError("Pehle ek photo choose karo.");
    if (!name.trim()) return setError("Apna naam likho.");
    setBusy(true);
    setError("");
    try {
      // doc id = uid → ek student sirf ek hi selfie (dobara karne pe replace)
      await setDoc(doc(db, "selfies", uid), {
        uid,
        name: name.trim(),
        photo: dataUrl,
        createdAt: serverTimestamp(),
      });
      onDone?.();
    } catch (err) {
      console.error(err);
      setError("Upload fail hua — Firestore rules check karo.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-md rounded-2xl bg-cream/80 p-7 shadow-note ring-1 ring-ink/10"
    >
      <h2 className="mb-1 text-center font-marker text-2xl text-ink">
        Apni selfie upload karo
      </h2>
      <p className="mb-5 text-center font-hand text-xl text-ink/60">
        Ek student · ek photo · naam ke saath
      </p>

      <div
        onClick={() => fileRef.current?.click()}
        className="mb-4 grid cursor-pointer place-content-center gap-2 rounded-xl border-2 border-dashed border-kraftdark/50 bg-paper py-8 text-center transition-colors hover:bg-kraft/20"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="mx-auto h-32 w-32 rounded-md object-cover shadow-note"
          />
        ) : (
          <>
            <FiUploadCloud className="mx-auto text-3xl text-kraftdark" />
            <span className="font-body text-sm text-ink/60">
              Tap karke photo choose karo
            </span>
          </>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={pick}
        className="hidden"
      />

      <input
        type="text"
        placeholder="Tumhara naam"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 font-body text-ink outline-none focus:border-kraftdark"
      />

      {error && (
        <p className="mb-3 rounded-lg bg-faded/15 px-3 py-2 font-body text-sm text-faded">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="btn btn-primary w-full justify-center disabled:opacity-60"
      >
        {busy ? "Uploading…" : "Add my selfie"}
      </button>
    </form>
  );
}

function AlreadyUploaded({ person }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-teal/15 p-7 text-center shadow-note ring-1 ring-teal/30">
      <p className="font-marker text-2xl text-ink">You're on the wall! 🎉</p>
      <img
        src={person.photo}
        alt={person.name}
        className="mx-auto my-4 h-32 w-32 rounded-md object-cover shadow-note"
      />
      <p className="font-hand text-2xl text-ink">{person.name}</p>
      <p className="mt-2 font-body text-sm text-ink/60">
        Ek student sirf ek selfie daal sakta hai.
      </p>
    </div>
  );
}

function PageShell({ children }) {
  return (
    <main className="min-h-screen bg-paper px-6 pb-24 pt-28">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <p className="eyebrow">Faces of the batch</p>
          <h1 className="font-marker text-5xl text-ink sm:text-6xl">
            Students' Selfies
          </h1>
        </header>
        {children}
      </div>
    </main>
  );
}
