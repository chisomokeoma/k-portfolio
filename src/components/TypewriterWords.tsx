"use client";

import { useEffect, useState } from "react";

const WORDS = ["Founder", "Thinker", "Builder"];
const OFFSETS = WORDS.map((_, i) => WORDS.slice(0, i).reduce((n, w) => n + w.length, 0));
const TOTAL = WORDS.join("").length;

const TYPE_MS = 110;
const TYPE_JITTER_MS = 60;
const DELETE_MS = 45;
const WORD_PAUSE_MS = 350;
const HOLD_MS = 2200;
const RESTART_MS = 600;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// The caret sits at the end of the last line that has typed characters.
function caretLine(count: number) {
  const i = OFFSETS.findIndex((offset, idx) => count <= offset + WORDS[idx].length);
  return i === -1 ? WORDS.length - 1 : i;
}

export default function TypewriterWords() {
  const [count, setCount] = useState(0);
  const [idle, setIdle] = useState(true);

  useEffect(() => {
    let alive = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    async function run() {
      await sleep(400);
      if (reduceMotion.matches) {
        if (alive) setCount(TOTAL);
        return;
      }

      let n = 0;
      while (alive) {
        for (const word of WORDS) {
          setIdle(false);
          for (let c = 0; c < word.length; c++) {
            if (!alive) return;
            setCount(++n);
            await sleep(TYPE_MS + Math.random() * TYPE_JITTER_MS);
          }
          setIdle(true);
          await sleep(WORD_PAUSE_MS);
        }
        await sleep(HOLD_MS - WORD_PAUSE_MS);

        setIdle(false);
        while (n > 0) {
          if (!alive) return;
          setCount(--n);
          await sleep(DELETE_MS);
        }
        setIdle(true);
        await sleep(RESTART_MS);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  const activeLine = caretLine(count);

  return (
    <h1 className="text-lead uppercase text-white/90 lg:text-display">
      <span className="sr-only">Founder, Thinker, Builder</span>
      <span aria-hidden className="flex flex-col gap-[13px] lg:gap-[25px]">
        {WORDS.map((word, i) => (
          <span key={word} className="block h-[1lh] whitespace-pre">
            {word.slice(0, Math.min(word.length, Math.max(0, count - OFFSETS[i])))}
            {activeLine === i && (
              <span
                className={`ml-[0.08em] inline-block h-[0.78em] w-[0.06em] min-w-[2px] bg-white/90 align-baseline ${
                  idle ? "animate-caret" : ""
                }`}
              />
            )}
          </span>
        ))}
      </span>
    </h1>
  );
}
