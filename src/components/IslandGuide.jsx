import { useEffect, useRef } from "react";

export const STOPS = ["Hello", "Experience", "Projects", "Contact"];

// The island already listens for ArrowLeft/ArrowRight on window, so the on-screen
// buttons simply drive it through the same keyboard events.
const pressKey = (type, key) => window.dispatchEvent(new KeyboardEvent(type, { key }));

const ArrowButton = ({ dir }) => {
  const timer = useRef(null);
  const key = dir === "left" ? "ArrowLeft" : "ArrowRight";

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
      pressKey("keyup", key);
    }
  };

  const start = (e) => {
    e.preventDefault();
    if (timer.current) return;
    pressKey("keydown", key);
    timer.current = setInterval(() => pressKey("keydown", key), 28); // ~0.55 rad/s: slow enough to land on a stop
  };

  // Keyboard activation (Enter/Space) arrives as a click with detail 0: spin a short burst.
  const onClick = (e) => {
    if (e.detail !== 0) return;
    pressKey("keydown", key);
    let n = 0;
    const id = setInterval(() => {
      pressKey("keydown", key);
      if (++n > 12) {
        clearInterval(id);
        pressKey("keyup", key);
      }
    }, 28);
  };

  useEffect(() => stop, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <button
      type='button'
      aria-label={dir === "left" ? "Spin island left (hold)" : "Spin island right (hold)"}
      title={dir === "left" ? "Hold to spin back" : "Hold to spin to the next stop"}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onClick={onClick}
      className='flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-white text-blue-600 shadow-md transition hover:bg-blue-500 hover:text-white active:scale-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 touch-none'
    >
      <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        {dir === "left" ? <path d='M15 5l-7 7 7 7' /> : <path d='M9 5l7 7-7 7' />}
      </svg>
    </button>
  );
};

/** Always-visible: spin buttons + a 4-dot "you are here" indicator. */
export const IslandControls = ({ stage, lastStage }) => (
  <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/60 px-3 py-2 shadow-lg backdrop-blur'>
    <ArrowButton dir='left' />
    <div className='flex w-36 flex-col items-center gap-1.5' role='status' aria-live='polite'>
      <div className='flex items-center gap-2' aria-hidden='true'>
        {STOPS.map((label, i) => (
          <span
            key={label}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              stage === i + 1
                ? "w-6 bg-blue-500"
                : !stage && lastStage === i + 1
                  ? "w-6 bg-blue-500/40"
                  : "w-2.5 bg-slate-400/60"
            }`}
          />
        ))}
      </div>
      <span className='text-xs font-semibold text-slate-700'>
        {stage ? `${stage}/4 · ${STOPS[stage - 1]}` : "Spinning…"}
      </span>
    </div>
    <ArrowButton dir='right' />
  </div>
);

/** First-visit coach mark with an animated touch dot. */
export const CoachMark = ({ coarse, onClose }) => (
  <div className='pointer-events-none absolute inset-x-0 bottom-28 z-20 flex justify-center px-5'>
    <div
      role='dialog'
      aria-label='How to explore'
      className='hint-in pointer-events-auto relative w-full max-w-sm rounded-2xl bg-white/85 px-6 pb-5 pt-4 text-center shadow-xl backdrop-blur'
    >
      <div className='mx-auto mb-3 flex h-12 w-44 items-center justify-between rounded-full bg-blue-500/10 px-3 text-blue-500' aria-hidden='true'>
        <span className='text-xl font-bold'>‹</span>
        <span className='hint-dot relative block h-6 w-6 rounded-full bg-blue-500 shadow' />
        <span className='text-xl font-bold'>›</span>
      </div>
      <p className='font-poppins text-lg font-semibold text-slate-800'>Explore my island</p>
      <p className='mt-1 text-sm text-slate-600'>
        {coarse ? "Swipe" : "Drag"} sideways to spin it
        {coarse ? "," : ", or use your ← → keys,"} or hold the arrows below.
      </p>
      <p className='mt-1 text-sm text-slate-600'>
        Spin to the <strong>4 stops</strong>: {STOPS.join(" · ")}. Each one opens a part of my story.
      </p>
      <button
        type='button'
        onClick={onClose}
        className='mt-3 rounded-lg bg-blue-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300'
      >
        Got it
      </button>
    </div>
  </div>
);
