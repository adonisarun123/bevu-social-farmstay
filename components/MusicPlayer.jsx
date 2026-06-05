"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// Background music: tries autoplay; if the browser blocks it, starts on the
// guest's first interaction (tap/scroll/key). Floating button toggles on/off.
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // 1) Attempt straight autoplay.
    const tryPlay = () =>
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => false);

    tryPlay();

    // 2) Fallback: start on first user interaction (unless they muted already).
    const onFirstInteract = () => {
      if (!userPaused.current && audio.paused) {
        tryPlay();
      }
      cleanup();
    };
    const events = ["pointerdown", "touchstart", "keydown", "scroll"];
    const cleanup = () =>
      events.forEach((e) => window.removeEventListener(e, onFirstInteract));
    events.forEach((e) =>
      window.addEventListener(e, onFirstInteract, { once: true, passive: true })
    );

    return cleanup;
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPaused.current = false;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userPaused.current = true;
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/maha-ganapathim.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        className="fixed right-5 top-1/2 z-50 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-[var(--line)] bg-night/70 text-gold shadow-[0_6px_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold sm:right-6"
      >
        {playing ? (
          <span className="relative grid place-items-center">
            <Music className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            {/* gentle pulse ring while playing */}
            <span className="absolute -inset-2 animate-ping rounded-full border border-gold/30" aria-hidden="true" />
          </span>
        ) : (
          <VolumeX className="h-5 w-5 opacity-80" strokeWidth={1.6} aria-hidden="true" />
        )}
      </button>
    </>
  );
}
