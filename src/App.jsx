import { ReactLenis } from "lenis/react";
import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import MemoriesTicker from "./components/MemoriesTicker";
import Chapters from "./components/Chapters";
import TrippyInterlude from "./components/TrippyInterlude";
import MemoryWall from "./components/MemoryWall";
import Countdown from "./components/Countdown";
import Guestbook from "./components/Guestbook";
import Footer from "./components/Footer";
import AdminModal from "./components/AdminModal";

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <ReactLenis root options={{ lerp: 0.06 }}>
      <Nav onAdmin={() => setAdminOpen(true)} />

      <main>
        <Hero />
        <MemoriesTicker />
        <Chapters />
        <TrippyInterlude />
        <MemoryWall />
        <Countdown />
        <Guestbook />
      </main>

      <Footer />

      {/* Admin modal is also reachable from the nav */}
      <AdminModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        onChange={() => window.dispatchEvent(new Event("osd:events-changed"))}
      />
    </ReactLenis>
  );
}
