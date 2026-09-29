"use client";

import React, { useEffect, useState } from "react";

export interface BopaEntry {
  id: string;
  date: string;
  subject: string;
  aspects: string[];
}

interface BopaStreakWidgetProps {
  onSaveToNotes?: (title: string, content: string) => void;
}

export function BopaStreakWidget({ onSaveToNotes }: BopaStreakWidgetProps) {
  const [streakDays, setStreakDays] = useState<number>(7);
  const [subject, setSubject] = useState<string>("");
  const [aspect1, setAspect1] = useState<string>("");
  const [aspect2, setAspect2] = useState<string>("");
  const [aspect3, setAspect3] = useState<string>("");
  const [aspect4, setAspect4] = useState<string>("");
  const [entries, setEntries] = useState<BopaEntry[]>([]);
  const [savedToday, setSavedToday] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aham_seeker_bopa");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.streakDays === "number")
          setStreakDays(parsed.streakDays);
        if (Array.isArray(parsed.entries)) setEntries(parsed.entries);
        const todayStr = new Date().toLocaleDateString("en-IN");
        if (parsed.lastLoggedDate === todayStr) {
          setSavedToday(true);
        }
      } else {
        const starter: BopaEntry[] = [
          {
            id: "bopa-1",
            date: "Yesterday",
            subject: "My Own Body & Physical Instrument",
            aspects: [
              "My heart beats effortlessly thousands of times a day without me asking.",
              "My senses allow me to enjoy warm tea, music, and sunlight.",
              "My emotions give me instant, loving feedback on my thoughts.",
            ],
          },
        ];
        setEntries(starter);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAddBopa = (e: React.FormEvent) => {
    e.preventDefault();
    const list = [aspect1, aspect2, aspect3, aspect4]
      .map((a) => a.trim())
      .filter(Boolean);
    if (!subject.trim() || list.length === 0) return;

    const todayFormatted = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const todayKey = new Date().toLocaleDateString("en-IN");

    const newEntry: BopaEntry = {
      id: `bopa-${Date.now()}`,
      date: todayFormatted,
      subject: subject.trim(),
      aspects: list,
    };

    const nextEntries = [newEntry, ...entries];
    const nextStreak = savedToday ? streakDays : streakDays + 1;

    setEntries(nextEntries);
    setStreakDays(nextStreak);
    setSavedToday(true);

    try {
      localStorage.setItem(
        "aham_seeker_bopa",
        JSON.stringify({
          streakDays: nextStreak,
          lastLoggedDate: todayKey,
          entries: nextEntries,
        })
      );
    } catch {
      // ignore
    }

    if (onSaveToNotes) {
      onSaveToNotes(
        `BOPA — Positive Aspects of ${newEntry.subject}`,
        list.map((item, idx) => `${idx + 1}. ${item}`).join("\n")
      );
    }

    setSubject("");
    setAspect1("");
    setAspect2("");
    setAspect3("");
    setAspect4("");
  };

  return (
    <div className="rounded-[26px] bg-white border border-beige-border p-[22px] sm:p-[28px] shadow-sm flex flex-col gap-[18px]">
      {/* Header + Alignment Streak Badge */}
      <div className="flex flex-wrap items-center justify-between gap-[12px]">
        <div className="flex flex-col gap-[2px]">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-lavender-deep">
            Daily Alignment Ritual · Session 4 Tool
          </span>
          <h3 className="m-0 font-playfair text-[24px] sm:text-[26px] font-medium text-ink">
            Book of Positive Aspects (BOPA)
          </h3>
        </div>

        <div className="flex items-center gap-[10px] rounded-full bg-gradient-to-r from-[#8E1B25] to-[#684F7A] px-[18px] py-[8px] text-white shadow-sm">
          <span className="text-[18px]" aria-hidden="true">
            ✦
          </span>
          <span className="font-sans text-[13px] font-bold tracking-[0.04em]">
            {streakDays} Days in Alignment Streak
          </span>
        </div>
      </div>

      {/* 7-Day Lotus Alignment Row */}
      <div className="grid grid-cols-7 gap-[6px] sm:gap-[10px] rounded-[18px] bg-beige-card/65 border border-beige-border p-[12px] sm:p-[14px]">
        {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"].map(
          (label, idx) => {
            const active = idx < 6 || savedToday;
            return (
              <div
                key={label}
                className={`flex flex-col items-center justify-center rounded-[12px] py-[8px] px-[4px] text-center transition-all ${
                  active
                    ? "bg-white border border-gold shadow-sm text-maroon"
                    : "bg-white/50 border border-beige-border text-muted"
                }`}
              >
                <span className="text-[15px] font-bold">
                  {active ? "🪷" : "○"}
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] font-semibold mt-[2px]">
                  {label}
                </span>
              </div>
            );
          }
        )}
      </div>

      {/* Form to Write 3-4 Positive Aspects */}
      <form onSubmit={handleAddBopa} className="flex flex-col gap-[12px]">
        <label className="flex flex-col gap-[4px] font-sans text-[13px] font-semibold text-ink">
          <span>
            Who or what are you appreciating today? (A person, situation, desire,
            or yourself)
          </span>
          <input
            type="text"
            required
            placeholder="e.g., My home, my career path, my partner, my body..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="h-[44px] rounded-[12px] border border-lavender-border bg-lavender/40 px-[14px] font-sans text-[14px] text-ink"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          <input
            type="text"
            required
            placeholder="1. Positive aspect I genuinely appreciate..."
            value={aspect1}
            onChange={(e) => setAspect1(e.target.value)}
            className="h-[42px] rounded-[12px] border border-beige-border bg-white px-[14px] font-sans text-[13px] text-ink"
          />
          <input
            type="text"
            required
            placeholder="2. Another thing that feels good about this..."
            value={aspect2}
            onChange={(e) => setAspect2(e.target.value)}
            className="h-[42px] rounded-[12px] border border-beige-border bg-white px-[14px] font-sans text-[13px] text-ink"
          />
          <input
            type="text"
            required
            placeholder="3. A third positive aspect..."
            value={aspect3}
            onChange={(e) => setAspect3(e.target.value)}
            className="h-[42px] rounded-[12px] border border-beige-border bg-white px-[14px] font-sans text-[13px] text-ink"
          />
          <input
            type="text"
            placeholder="4. Bonus positive aspect (optional)..."
            value={aspect4}
            onChange={(e) => setAspect4(e.target.value)}
            className="h-[42px] rounded-[12px] border border-beige-border bg-white px-[14px] font-sans text-[13px] text-ink"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[10px] pt-[4px]">
          <span className="font-sans text-[12px] text-muted">
            {savedToday
              ? "✓ Today’s gratitude streak is locked in! Add more anytime."
              : "Write 3 positive aspects to grow your daily alignment streak."}
          </span>
          <button
            type="submit"
            className="btn-3d-maroon rounded-full px-[22px] py-[10px] font-sans text-[13px] font-semibold text-white cursor-pointer"
          >
            Save to Book of Positive Aspects ✦
          </button>
        </div>
      </form>

      {/* Recent BOPA Entries */}
      {entries.length > 0 && (
        <div className="flex flex-col gap-[10px] border-t border-beige-border pt-[14px]">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-maroon">
            Recent Pages in Your Book of Positive Aspects ({entries.length})
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
            {entries.slice(0, 4).map((entry) => (
              <div
                key={entry.id}
                className="rounded-[16px] bg-lavender/60 border border-lavender-border p-[14px] flex flex-col gap-[6px]"
              >
                <div className="flex items-center justify-between font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-lavender-deep">
                  <span>{entry.subject}</span>
                  <span>{entry.date}</span>
                </div>
                <ul className="m-0 pl-[16px] flex flex-col gap-[4px] font-sans text-[13px] text-ink">
                  {entry.aspects.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
