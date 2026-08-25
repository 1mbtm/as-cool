import { FiAlertCircle } from "react-icons/fi";

// Firebase keys .env me nahi hain to yeh setup guide dikhata hai
export default function FirebaseNotice() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl bg-mustard/15 p-7 shadow-note ring-1 ring-mustard/40">
      <div className="mb-3 flex items-center gap-2 font-marker text-2xl text-ink">
        <FiAlertCircle className="text-faded" /> Firebase setup pending
      </div>
      <p className="mb-4 font-body text-ink/75">
        Yeh feature Firebase (login + database) use karta hai. Chalane ke liye:
      </p>
      <ol className="list-decimal space-y-2 pl-5 font-body text-sm text-ink/75">
        <li>
          <a
            className="text-kraftdark underline"
            href="https://console.firebase.google.com"
            target="_blank"
            rel="noreferrer"
          >
            console.firebase.google.com
          </a>{" "}
          pe project banao
        </li>
        <li>Authentication → Google + Email/Password enable karo</li>
        <li>Firestore Database create karo</li>
        <li>
          Project ki config <code className="font-type">.env</code> me daalo
          (dekho <code className="font-type">.env.example</code> +{" "}
          <code className="font-type">README-firebase.md</code>)
        </li>
        <li>Dev server restart karo</li>
      </ol>
    </div>
  );
}
