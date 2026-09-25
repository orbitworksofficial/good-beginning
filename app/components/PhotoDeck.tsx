"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Photo = { src: string; caption: string; alt: string };

const AUTOPLAY_MS = 5000;

/**
 * A stack of printed photos. The top print flies off to reveal the next one,
 * and the next two peek out behind it at playful angles.
 *
 * Autoplay is driven by the progress bar's CSS animation (its `animationend`
 * advances the deck), so pausing on hover/focus is just pausing the animation.
 * With reduced motion there is no autoplay; the arrows and dots still work.
 */
export default function PhotoDeck({ photos }: { photos: Photo[] }) {
  const n = photos.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const pointerX = useRef<number | null>(null);

  useEffect(() => {
    setAutoplay(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  const go = (step: number) => setIndex((i) => (i + step + n) % n);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Life at Good Beginnings"
      className="relative mx-auto w-full max-w-md select-none overflow-x-clip px-6 pb-2 pt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Decoration behind the stack */}
      <div
        aria-hidden="true"
        className="absolute -right-2 top-10 h-40 w-40 rounded-full bg-coral/15 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -left-1 bottom-24 h-24 w-24 rounded-full bg-[radial-gradient(theme(colors.coral.DEFAULT)_1.5px,transparent_1.5px)] opacity-40 [background-size:12px_12px]"
      />

      {/* The deck */}
      <div
        className="relative aspect-[4/5] touch-pan-y"
        onPointerDown={(e) => (pointerX.current = e.clientX)}
        onPointerUp={(e) => {
          if (pointerX.current === null) return;
          const dx = e.clientX - pointerX.current;
          pointerX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (pointerX.current = null)}
      >
        {photos.map((p, i) => {
          const offset = (i - index + n) % n;
          const top = offset === 0;
          return (
            <figure
              key={p.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={!top}
              className="absolute inset-0 rounded-md bg-white p-3 pb-14 shadow-[0_2px_4px_rgba(42,29,24,0.08),0_18px_40px_-12px_rgba(42,29,24,0.35)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={cardStyle(offset, n)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-sm bg-slate-100">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 85vw, 400px"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex h-14 items-center justify-center px-4 font-hand text-2xl text-navy">
                {p.caption}
              </figcaption>
              {top ? (
                <span
                  aria-hidden="true"
                  className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-[2px] bg-coral-light/90 shadow-sm"
                />
              ) : null}
            </figure>
          );
        })}
      </div>

      {/* Controls */}
      <div className="relative mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-navy transition hover:border-coral hover:text-coral focus:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          <Chevron className="h-4 w-4 rotate-180" />
        </button>

        <div className="flex flex-1 items-center justify-center gap-1.5">
          {photos.map((p, i) => {
            const active = i === index;
            return (
              <button
                key={p.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1}: ${p.caption}`}
                aria-current={active}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 ${
                  active ? "w-10 bg-coral-light" : "w-1.5 bg-slate-300 hover:bg-slate-500"
                }`}
              >
                {active ? (
                  <span
                    // Re-keyed on every slide change so the bar restarts.
                    key={index}
                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-coral"
                    style={
                      autoplay
                        ? {
                            animation: `deck-progress ${AUTOPLAY_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }
                        : undefined
                    }
                    onAnimationEnd={() => go(1)}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral text-white shadow-sm transition hover:bg-coral-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
        >
          <Chevron className="h-4 w-4" />
        </button>
      </div>

      <p className="sr-only" aria-live={paused || !autoplay ? "polite" : "off"}>
        Photo {index + 1} of {n}: {photos[index].caption}
      </p>
    </div>
  );
}

/** Position of a print in the stack: 0 is on top, n-1 has just flown off. */
function cardStyle(offset: number, n: number): React.CSSProperties {
  if (offset === 0)
    return { transform: "rotate(-2deg)", opacity: 1, zIndex: 30 };
  if (offset === n - 1)
    return {
      transform: "translate(-120%, -6%) rotate(-18deg) scale(0.95)",
      opacity: 0,
      zIndex: 40,
      pointerEvents: "none",
    };
  if (offset === 1)
    return {
      transform: "translate(24px, 8px) rotate(5deg) scale(0.95)",
      opacity: 1,
      zIndex: 20,
      pointerEvents: "none",
    };
  if (offset === 2)
    return {
      transform: "translate(-22px, 14px) rotate(-8deg) scale(0.9)",
      opacity: 1,
      zIndex: 10,
      pointerEvents: "none",
    };
  return {
    transform: "translate(0, 18px) rotate(0deg) scale(0.86)",
    opacity: 0,
    zIndex: 0,
    pointerEvents: "none",
  };
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
