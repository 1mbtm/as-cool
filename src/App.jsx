import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AdminModal from "./components/AdminModal";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Selfies from "./pages/Selfies";
import Poll from "./pages/Poll";
import HorizontalScroll from "./pages/HorizontalScroll";

// Route change pe upar scroll (hash ho to Home khud handle karega)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);
  return null;
}

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <ReactLenis root options={{ lerp: 0.06 }}>
      <ScrollToTop />
      <Nav onAdmin={() => setAdminOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/students-selfies" element={<Selfies />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/horizontal-scroll" element={<HorizontalScroll />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />

      {/* Admin modal is reachable from the nav on every page */}
      <AdminModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        onChange={() => window.dispatchEvent(new Event("osd:events-changed"))}
      />
    </ReactLenis>
  );
}
