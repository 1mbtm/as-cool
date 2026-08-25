import { useState } from "react";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth, friendlyAuthError } from "../lib/auth";

// Reusable sign-in / sign-up card (Google + Email/Password)
export default function AuthPanel({ title = "Sign in to continue" }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setError("");
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") await signUpWithEmail(email, password);
      else await signInWithEmail(email, password);
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl bg-cream/80 p-7 shadow-note ring-1 ring-ink/10">
      <h2 className="mb-1 text-center font-marker text-2xl text-ink">{title}</h2>
      <p className="mb-6 text-center font-hand text-xl text-ink/60">
        {mode === "signup" ? "Naya account banao" : "Wapas aa gaye? Sign in karo"}
      </p>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogle}
        disabled={busy}
        className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 font-body font-semibold text-ink shadow-note ring-1 ring-ink/10 transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </motion.button>

      <div className="my-4 flex items-center gap-3 text-ink/40">
        <span className="h-px flex-1 bg-ink/15" />
        <span className="font-type text-xs">ya email se</span>
        <span className="h-px flex-1 bg-ink/15" />
      </div>

      <form onSubmit={handleEmail} className="space-y-3">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 font-body text-ink outline-none focus:border-kraftdark"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="password (6+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 font-body text-ink outline-none focus:border-kraftdark"
        />
        {error && (
          <p className="rounded-lg bg-faded/15 px-3 py-2 font-body text-sm text-faded">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary w-full justify-center disabled:opacity-60"
        >
          {busy ? "…" : mode === "signup" ? "Create account" : "Sign in"}
        </button>
      </form>

      <button
        onClick={() => {
          setMode((m) => (m === "signin" ? "signup" : "signin"));
          setError("");
        }}
        className="mt-4 w-full text-center font-body text-sm text-ink/60 underline decoration-dotted hover:text-ink"
      >
        {mode === "signin"
          ? "Naya ho? Account banao →"
          : "Pehle se account hai? Sign in →"}
      </button>
    </div>
  );
}
