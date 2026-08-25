import { useAnimate } from "motion/react";
import { useRef } from "react";
import { FiMousePointer } from "react-icons/fi";
import { wall } from "../data/memories";
import { tiltFor } from "../lib/time";

const MemoryWall = () => {
  return (
    <section id="wall" className="bg-paper">
      <MouseImageTrail images={wall.map((w) => w.src)} renderImageBuffer={50} rotationRange={25}>
        <div className="grid h-[80vh] w-full place-content-center px-6 text-center">
          <p className="eyebrow">the memory wall</p>
          <p className="mt-3 flex items-center justify-center gap-3 font-hand text-5xl text-ink sm:text-7xl">
            <FiMousePointer className="text-4xl text-kraftdark" />
            move your cursor to scatter our memories
          </p>
          <p className="mt-4 font-body text-lg text-ink/60">
            har photo ek kahani hai 🫶 &nbsp;(scroll down for the full wall)
          </p>
        </div>
      </MouseImageTrail>

      {/* Static polaroid grid — always visible, mobile-friendly */}
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {wall.map((w, i) => (
            <figure
              key={i}
              className="polaroid transition-transform duration-300 hover:z-10 hover:!rotate-0 hover:scale-105"
              style={{ transform: `rotate(${tiltFor(i)}deg)` }}
            >
              <img src={w.src} alt={w.caption} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <figcaption className="pt-2 text-center font-hand text-lg leading-tight text-ink/80">
                {w.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

const MouseImageTrail = ({ children, images, renderImageBuffer, rotationRange }) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const maybeRender = (x, y) => {
    const distance = calculateDistance(
      x,
      y,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );
    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = x;
      lastRenderPosition.current.y = y;
      renderNextImage();
    }
  };

  const handleMouseMove = (e) => maybeRender(e.clientX, e.clientY);
  const handleTouchMove = (e) => {
    const t = e.touches[0];
    if (t) maybeRender(t.clientX, t.clientY);
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = document.querySelector(selector);
    if (!el) return;

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2 ? `rotate(${rotation}deg)` : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2 ? `rotate(-${rotation}deg)` : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(selector, { opacity: [1, 0] }, { ease: "linear", duration: 0.5, delay: 5 });

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {children}
      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-40 w-auto rounded-md border-[6px] border-cream bg-cream object-cover opacity-0 shadow-polaroid"
          src={img}
          alt={`memory ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default MemoryWall;
