"use client";

import Image from "next/image";
import { useState } from "react";

type Slide = { src: string; alt: string; caption: string };

const INTERVAL_MS = 3000;
const RING = 2 * Math.PI * 21; // circumference of the progress ring (r=21)

/**
 * Full-bleed crossfading background for the home hero, with a slow zoom on
 * the visible photo. Renders two layers: the photos (behind the hero's scrims)
 * and a control dock (above them): a counter, thumbnails, and a next button
 * wrapped in a ring that fills up until the next slide.
 *
 * The ring's CSS animation is the timer: its `animationend` advances the
 * slide, so pausing (hovering the dock, or keyboard focus in it) is just
 * pausing the animation. `.motion-timer` keeps it running under reduced
 * motion; only the zoom and crossfade are dropped there.
 */
export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (step: number) => setIndex((i) => (i + step + n) % n);

  return (
    <>
      <div className="absolute inset-0 -z-20 overflow-hidden bg-navy-dark">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              aria-hidden={!active}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover object-center transition-[opacity,transform] ease-out [transition-duration:1000ms,4000ms] ${
                active ? "scale-[1.06] opacity-100" : "scale-100 opacity-0"
              }`}
            />
          );
        })}
      </div>

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Hero photos"
        className="absolute bottom-5 right-5 z-10 flex items-center gap-3 sm:bottom-8 sm:right-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={(e) => {
          if (e.target.matches(":focus-visible")) setPaused(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {/* Counter */}
        <p className="hidden items-baseline gap-1 font-hand text-white drop-shadow sm:flex">
          <span className="text-4xl leading-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xl text-white/60">
            / {String(n).padStart(2, "0")}
          </span>
        </p>

        <div className="flex items-center gap-2 rounded-full bg-navy-dark/45 p-1.5 ring-1 ring-inset ring-white/15 backdrop-blur-md">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="grid h-11 w-11 place-items-center rounded-full text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Chevron className="h-4 w-4 rotate-180" />
          </button>

          {/* Thumbnails */}
          <div className="hidden items-center gap-1.5 md:flex">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show photo ${i + 1}: ${s.caption}`}
                  aria-current={active}
                  className={`relative h-9 overflow-hidden rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    active
                      ? "w-16 opacity-100 ring-2 ring-white"
                      : "w-9 opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Next, wrapped in the countdown ring */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="relative grid h-11 w-11 place-items-center rounded-full bg-coral text-white shadow-lg transition hover:bg-coral-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"
          >
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[5px] h-[calc(100%+10px)] w-[calc(100%+10px)] -rotate-90"
            >
              <circle
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="3"
              />
              <circle
                // Re-keyed on every slide change so the ring restarts.
                key={index}
                cx="24"
                cy="24"
                r="21"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={RING}
                className="motion-timer"
                style={
                  {
                    "--timer": `${INTERVAL_MS}ms`,
                    "--ring": RING,
                    strokeDashoffset: RING,
                    animation: `ring-progress ${INTERVAL_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  } as React.CSSProperties
                }
                onAnimationEnd={() => go(1)}
              />
            </svg>
            <Chevron className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
