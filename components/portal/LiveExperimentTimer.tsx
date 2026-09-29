"use client";

import React, { useEffect, useState } from "react";

export interface SynchronicityLog {
  id: string;
  target: string;
  whatHappened: string;
  emotionalFeeling: string;
  loggedAt: string;
}

interface LiveExperimentTimerProps {
  onLogSavedToNotes?: (title: string, content: string) => void;
}

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000;

export function LiveExperimentTimer({
  onLogSavedToNotes,
}: LiveExperimentTimerProps) {
  const [thoughtTarget, setThoughtTarget] = useState(
    "A vibrant blue butterfly & unexpected joyful news"
  );
  const [startTimeMs, setStartTimeMs] = useState<number | null>(null);
  const [nowMs, setNowMs] = useState<number>(Date.now());

  // Synchronicity quick-log modal state
  const [showLogForm, setShowLogForm] = useState(false);
  const [whatHappened, setWhatHappened] = useState("");
  const [emotionalFeeling, setEmotionalFeeling] = useState(
    "Playful, delighted & unattached"
  );
  const [logs, setLogs] = useState<SynchronicityLog[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedExp = localStorage.getItem("aham_seeker_48hr_exp");
      if (savedExp) {
        const parsed = JSON.parse(savedExp);
        if (parsed.thoughtTarget) setThoughtTarget(parsed.thoughtTarget);
        if (parsed.startTimeMs) setStartTimeMs(parsed.startTimeMs);
        if (Array.isArray(parsed.logs)) setLogs(parsed.logs);
      } else {
        // Default active 48-hr experiment started 6 hours ago so demo seekers see it ticking live
        const demoStart = Date.now() - 6 * 60 * 60 * 1000;
        const starterLogs: SynchronicityLog[] = [
          {
            id: "sync-1",
            target: "A vibrant blue butterfly & unexpected joyful news",
            whatHappened:
              "Saw a hand-painted blue butterfly on the cover of a book at a café within 5 hours of starting!",
            emotionalFeeling: "Goosebumps, laughter & pure appreciation",
            loggedAt: "Today · 5 hrs into experiment",
          },
        ];
        setStartTimeMs(demoStart);
        setLogs(starterLogs);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const persistState = (
    nextTarget: string,
    nextStart: number | null,
    nextLogs: SynchronicityLog[]
  ) => {
    try {
      localStorage.setItem(
        "aham_seeker_48hr_exp",
        JSON.stringify({
          thoughtTarget: nextTarget,
          startTimeMs: nextStart,
          logs: nextLogs,
        })
      );
    } catch {
      // ignore
    }
  };

  const handleStart48Hr = () => {
    const start = Date.now();
    setStartTimeMs(start);
    setNowMs(start);
    persistState(thoughtTarget, start, logs);
    setToast("48-Hour Live Experiment started! Hold your focus lightly.");
    setTimeout(() => setToast(null), 3500);
  };

  const handleReset48Hr = () => {
    const start = Date.now();
    setStartTimeMs(start);
    setNowMs(start);
    persistState(thoughtTarget, start, logs);
    setToast("48-Hour Countdown restarted fresh from 48:00:00!");
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogSynchronicity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatHappened.trim()) return;

    const newEntry: SynchronicityLog = {
      id: `sync-${Date.now()}`,
      target: thoughtTarget,
      whatHappened: whatHappened.trim(),
      emotionalFeeling: emotionalFeeling.trim(),
      loggedAt: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const nextLogs = [newEntry, ...logs];
    setLogs(nextLogs);
    persistState(thoughtTarget, startTimeMs, nextLogs);

    if (onLogSavedToNotes) {
      onLogSavedToNotes(
        `48-Hr Experiment Synchronicity (${thoughtTarget})`,
        `Target: ${thoughtTarget}\nEvidence Observed: ${newEntry.whatHappened}\nEmotional State: ${newEntry.emotionalFeeling}`
      );
    }

    setWhatHappened("");
    setShowLogForm(false);
    setToast("✦ Synchronicity logged & saved to your Seeker Journal!");
    setTimeout(() => setToast(null), 3500);
  };

  const endTimeMs = startTimeMs
    ? startTimeMs + FORTY_EIGHT_HOURS_MS
    : nowMs + FORTY_EIGHT_HOURS_MS;
  const remainingMs = Math.max(0, endTimeMs - nowMs);
  const totalHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  const elapsedPercent = startTimeMs
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(((nowMs - startTimeMs) / FORTY_EIGHT_HOURS_MS) * 100)
        )
      )
    : 0;

  return (
    <div className="rounded-[26px] bg-gradient-to-br from-[#FBF5EE] via-[#F7F2FA] to-[#F3E3C8] border-[1.5px] border-lavender-frame/60 p-[22px] sm:p-[30px] shadow-sm flex flex-col gap-[20px]">
      <div className="flex flex-wrap items-start justify-between gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-maroon">
            Session 2 · Live Law of Attraction Experiment
          </span>
          <h3 className="m-0 font-playfair text-[24px] sm:text-[28px] font-medium text-ink">
            48-Hour Live Experiment Countdown
          </h3>
          <p className="m-0 font-sans text-[13px] sm:text-[14px] text-body">
            <em>“Words don’t teach. Only life experience teaches.”</em> Focus on
            your chosen target for 1–2 minutes with playful appreciation, then
            let the Universe surprise you within 48 hours.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          <button
            type="button"
            onClick={() => setShowLogForm(!showLogForm)}
            className="btn-3d-maroon inline-flex min-h-[46px] items-center justify-center gap-[8px] rounded-full px-[22px] py-[10px] font-sans text-[13px] font-semibold text-white cursor-pointer"
          >
            <span>✦ Log a Synchronicity ({logs.length})</span>
          </button>
          <button
            type="button"
            onClick={handleReset48Hr}
            className="min-h-[46px] rounded-full border border-maroon/40 bg-white px-[16px] py-[10px] font-sans text-[12px] font-semibold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
          >
            Restart 48-Hr Clock
          </button>
        </div>
      </div>

      {/* Live Digital Countdown Boxes + Thought Target Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[18px] items-center">
        {/* Countdown Clock */}
        <div className="lg:col-span-5 rounded-[22px] bg-[#2C1A26] p-[20px] text-white flex flex-col items-center justify-center gap-[10px] border border-[#E7B85A]/50 shadow-md">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#E7B85A]">
            48-Hour Manifestation Window
          </span>
          <div className="flex items-center gap-[10px] sm:gap-[14px] font-sans">
            <div className="flex flex-col items-center rounded-[14px] bg-white/10 px-[14px] py-[8px] min-w-[68px]">
              <span className="text-[28px] sm:text-[34px] font-bold leading-none text-white">
                {String(totalHours).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#E7B85A] mt-[4px]">
                Hours
              </span>
            </div>
            <span className="text-[26px] font-bold text-[#E7B85A]">:</span>
            <div className="flex flex-col items-center rounded-[14px] bg-white/10 px-[14px] py-[8px] min-w-[68px]">
              <span className="text-[28px] sm:text-[34px] font-bold leading-none text-white">
                {String(minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#E7B85A] mt-[4px]">
                Mins
              </span>
            </div>
            <span className="text-[26px] font-bold text-[#E7B85A]">:</span>
            <div className="flex flex-col items-center rounded-[14px] bg-white/10 px-[14px] py-[8px] min-w-[68px]">
              <span className="text-[28px] sm:text-[34px] font-bold leading-none text-white">
                {String(seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#E7B85A] mt-[4px]">
                Secs
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[4px] mt-[4px]">
            <div className="h-[6px] w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#E7B85A] transition-all"
                style={{ width: `${elapsedPercent}%` }}
              />
            </div>
            <span className="text-center font-sans text-[11px] text-white/80">
              {elapsedPercent}% of 48-hour window elapsed
            </span>
          </div>
        </div>

        {/* Thought Target Box */}
        <div className="lg:col-span-7 rounded-[22px] bg-white/90 border border-beige-border p-[20px] flex flex-col gap-[12px]">
          <label className="flex flex-col gap-[6px] font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-lavender-deep">
            <span>My Intentional Thought Target (Selected with Ambika)</span>
            <div className="flex flex-col sm:flex-row gap-[8px]">
              <input
                type="text"
                value={thoughtTarget}
                onChange={(e) => {
                  setThoughtTarget(e.target.value);
                  persistState(e.target.value, startTimeMs, logs);
                }}
                placeholder="e.g., Seeing a blue feather, hearing an old song..."
                className="h-[44px] flex-1 rounded-[12px] border border-lavender-border bg-white px-[14px] font-sans text-[14px] font-medium text-ink normal-case tracking-normal"
              />
              <button
                type="button"
                onClick={handleStart48Hr}
                className="rounded-[12px] bg-lavender px-[16px] py-[10px] font-sans text-[12px] font-bold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors shrink-0"
              >
                Lock Target &amp; Start
              </button>
            </div>
          </label>

          {toast && (
            <div className="rounded-[12px] bg-gold/25 border border-gold px-[14px] py-[8px] font-sans text-[13px] font-semibold text-ink">
              {toast}
            </div>
          )}

          {/* Recent Synchronicity Sightings */}
          {logs.length > 0 && (
            <div className="flex flex-col gap-[8px] pt-[4px]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-maroon">
                Spotted Evidence &amp; Synchronicities ({logs.length})
              </span>
              <div className="max-h-[140px] overflow-y-auto flex flex-col gap-[8px] pr-[4px]">
                {logs.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[14px] bg-beige-card/70 border border-beige-border p-[12px] flex flex-col gap-[4px]"
                  >
                    <div className="flex items-center justify-between font-sans text-[11px] text-lavender-deep font-semibold">
                      <span>✦ {item.emotionalFeeling}</span>
                      <span>{item.loggedAt}</span>
                    </div>
                    <p className="m-0 font-sans text-[13px] text-ink">
                      {item.whatHappened}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collapsible Quick-Log Form */}
      {showLogForm && (
        <form
          onSubmit={handleLogSynchronicity}
          className="rounded-[20px] bg-white border-2 border-maroon/35 p-[20px] flex flex-col gap-[14px] animate-fade-up"
        >
          <div className="flex items-center justify-between">
            <h4 className="m-0 font-playfair text-[20px] font-medium text-maroon">
              Record a Live Synchronicity Sighting
            </h4>
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="font-sans text-[12px] text-muted hover:text-ink cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <label className="flex flex-col gap-[4px] font-sans text-[13px] font-semibold text-ink">
              <span>What showed up in your experience?</span>
              <input
                type="text"
                required
                placeholder="e.g., A friend texted me a photo of a blue butterfly!"
                value={whatHappened}
                onChange={(e) => setWhatHappened(e.target.value)}
                className="h-[44px] rounded-[12px] border border-beige-border px-[14px] text-[14px] text-ink"
              />
            </label>

            <label className="flex flex-col gap-[4px] font-sans text-[13px] font-semibold text-ink">
              <span>How did you feel when it appeared?</span>
              <input
                type="text"
                value={emotionalFeeling}
                onChange={(e) => setEmotionalFeeling(e.target.value)}
                className="h-[44px] rounded-[12px] border border-beige-border px-[14px] text-[14px] text-ink"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-3d-maroon rounded-full px-[24px] py-[10px] font-sans text-[13px] font-semibold text-white cursor-pointer"
            >
              Save Synchronicity to Experiment Log &amp; Journal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
