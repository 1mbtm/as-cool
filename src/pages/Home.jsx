import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import MemoriesTicker from "../components/MemoriesTicker";
import Chapters from "../components/Chapters";
import TrippyInterlude from "../components/TrippyInterlude";
import MemoryWall from "../components/MemoryWall";
import Countdown from "../components/Countdown";
import Guestbook from "../components/Guestbook";

export default function Home() {
  const { hash } = useLocation();

  // Nav ke section-links (/#chapters etc.) yahan scroll karvate hain
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      // thoda delay taaki layout settle ho jaye
      const t = setTimeout(
        () => el.scrollIntoView({ behavior: "smooth" }),
        50
      );
      return () => clearTimeout(t);
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <MemoriesTicker />
      <Chapters />
      <TrippyInterlude />
      <MemoryWall />
      <Countdown />
      <Guestbook />
    </main>
  );
}
