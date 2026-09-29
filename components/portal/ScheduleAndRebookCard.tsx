"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EMAIL, getEmailHref } from "@/lib/site";

export interface ScheduleInfo {
  enrolledAt: string; // YYYY-MM-DD
  nextCallDate: string; // YYYY-MM-DD
  nextCallTime: string;
  nextCallSession: string;
  meetingLink: string;
}

interface ScheduleAndRebookCardProps {
  seekerName: string;
  seekerEmail: string;
}

const DEFAULT_SCHEDULE: ScheduleInfo = {
  enrolledAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  nextCallDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  nextCallTime: "11:00 AM IST",
  nextCallSession: "Session 2 — Live experiment + DIY · 1 to 1 coaching (1hr)",
  meetingLink: "https://meet.google.com/aham-brahmasmi-1to1",
};

export function ScheduleAndRebookCard({
  seekerName,
  seekerEmail,
}: ScheduleAndRebookCardProps) {
  const [schedule, setSchedule] = useState<ScheduleInfo>(DEFAULT_SCHEDULE);
  const [editing, setEditing] = useState(false);
  const [followupModal, setFollowupModal] = useState<
    null | { duration: "1 Hour"; price: "Rs. 2,000/-" } | { duration: "30 Minutes"; price: "Rs. 1,000/-" }
  >(null);
  const [preferredSlot, setPreferredSlot] = useState("");
  const [followupNote, setFollowupNote] = useState("");
  const [followupConfirmed, setFollowupConfirmed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aham_seeker_schedule");
      if (saved) {
        setSchedule({ ...DEFAULT_SCHEDULE, ...JSON.parse(saved) });
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("aham_seeker_schedule", JSON.stringify(schedule));
    } catch {
      // ignore
    }
    setEditing(false);
  };

  // Calculate 5-week (35 days) + 7-day grace window = 42 days total
  const enrolledTime = new Date(schedule.enrolledAt).getTime();
  const nowTime = Date.now();
  const elapsedDays = Math.max(
    1,
    Math.floor((nowTime - enrolledTime) / (1000 * 60 * 60 * 24))
  );
  const coreDaysTotal = 35; // 5 weeks
  const totalWithGrace = 42; // 5 weeks + 7-day grace
  const daysRemainingCore = Math.max(0, coreDaysTotal - elapsedDays);
  const daysRemainingWithGrace = Math.max(0, totalWithGrace - elapsedDays);
  const windowPercent = Math.min(
    100,
    Math.round((elapsedDays / totalWithGrace) * 100)
  );

  const formattedNextDate = (() => {
    try {
      const d = new Date(schedule.nextCallDate);
      if (isNaN(d.getTime())) return schedule.nextCallDate;
      return d.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return schedule.nextCallDate;
    }
  })();

  const handleConfirmFollowup = (e: React.FormEvent) => {
    e.preventDefault();
    setFollowupConfirmed(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-[20px]">
      {/* Left 7 Cols: Upcoming 1-to-1 Call + 5-Week & 7-Day Grace Window */}
      <div className="lg:col-span-7 rounded-[24px] bg-white border border-beige-border p-[22px] sm:p-[26px] shadow-sm flex flex-col justify-between gap-[18px]">
        <div className="flex flex-wrap items-start justify-between gap-[12px]">
          <div className="flex flex-col gap-[4px]">
            <span className="inline-flex items-center gap-[6px] font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-maroon">
              <span className="h-[8px] w-[8px] rounded-full bg-maroon animate-pulse" />
              Next 1-to-1 Coaching Call with Ambika
            </span>
            <h3 className="m-0 font-playfair text-[22px] sm:text-[25px] font-medium text-ink">
              {schedule.nextCallSession}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setEditing(!editing)}
            className="rounded-full border border-beige-border bg-beige-card/70 px-[12px] py-[6px] font-sans text-[12px] font-semibold text-ink hover:border-maroon hover:text-maroon cursor-pointer transition-colors"
          >
            {editing ? "Cancel" : "Update Slot"}
          </button>
        </div>

        {editing ? (
          <form
            onSubmit={handleSaveSchedule}
            className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] rounded-[18px] bg-beige-card/60 p-[16px] border border-beige-border"
          >
            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Next Session Title</span>
              <input
                type="text"
                value={schedule.nextCallSession}
                onChange={(e) =>
                  setSchedule({ ...schedule, nextCallSession: e.target.value })
                }
                className="h-[40px] rounded-[10px] border border-beige-border bg-white px-[12px] text-[13px] text-ink"
              />
            </label>
            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Call Date</span>
              <input
                type="date"
                value={schedule.nextCallDate}
                onChange={(e) =>
                  setSchedule({ ...schedule, nextCallDate: e.target.value })
                }
                className="h-[40px] rounded-[10px] border border-beige-border bg-white px-[12px] text-[13px] text-ink"
              />
            </label>
            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Call Time (IST / Local)</span>
              <input
                type="text"
                value={schedule.nextCallTime}
                onChange={(e) =>
                  setSchedule({ ...schedule, nextCallTime: e.target.value })
                }
                placeholder="e.g., 11:00 AM IST"
                className="h-[40px] rounded-[10px] border border-beige-border bg-white px-[12px] text-[13px] text-ink"
              />
            </label>
            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Course Start Date</span>
              <input
                type="date"
                value={schedule.enrolledAt}
                onChange={(e) =>
                  setSchedule({ ...schedule, enrolledAt: e.target.value })
                }
                className="h-[40px] rounded-[10px] border border-beige-border bg-white px-[12px] text-[13px] text-ink"
              />
            </label>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="btn-3d-maroon rounded-full px-[20px] py-[8px] font-sans text-[12px] font-semibold text-white cursor-pointer"
              >
                Save Call Details
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-[14px] rounded-[18px] bg-lavender/70 border border-lavender-border p-[16px] sm:p-[18px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] bg-maroon text-white font-sans font-bold text-[14px] shadow-sm">
                1:1
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[15px] font-bold text-ink">
                  {formattedNextDate} · {schedule.nextCallTime}
                </span>
                <span className="font-sans text-[12px] text-body">
                  Private Google Meet / Zoom Sanctuary with Ambika Mohan
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-[8px]">
              <a
                href={schedule.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d-maroon inline-flex min-h-[42px] items-center justify-center gap-[6px] rounded-full px-[18px] py-[9px] font-sans text-[12px] font-semibold text-white no-underline"
              >
                <span>Join Live 1-to-1 Call →</span>
              </a>
            </div>
          </div>
        )}

        {/* 5-Week + 7-Day Grace Window Progress Bar */}
        <div className="flex flex-col gap-[8px] pt-[4px] border-t border-beige-border">
          <div className="flex flex-wrap items-center justify-between gap-[8px] font-sans text-[12px]">
            <span className="font-semibold text-ink">
              5-Week Programme Window + 7-Day Grace Period
            </span>
            <span className="font-bold text-maroon">
              {daysRemainingCore > 0
                ? `${daysRemainingCore} days left in 5-week core (+ 7 grace days)`
                : `${daysRemainingWithGrace} grace days remaining`}
            </span>
          </div>
          <div className="h-[8px] w-full overflow-hidden rounded-full bg-beige-card border border-beige-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#846B96] via-maroon to-gold transition-all"
              style={{ width: `${windowPercent}%` }}
            />
          </div>
          <span className="font-sans text-[11px] text-muted">
            Day {elapsedDays} of 35-day programme (42 days maximum including the
            7-day grace window).
          </span>
        </div>
      </div>

      {/* Right 5 Cols: Alumni & Follow-Up 1-Click Re-Booking Card */}
      <div className="lg:col-span-5 rounded-[24px] bg-beige-card/90 border border-beige-border p-[22px] sm:p-[26px] shadow-sm flex flex-col justify-between gap-[16px]">
        <div className="flex flex-col gap-[6px]">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-lavender-deep">
            Alumni &amp; Extra 1-to-1 Sessions
          </span>
          <h3 className="m-0 font-playfair text-[22px] sm:text-[24px] font-medium text-ink">
            Book a Follow-Up or Recap Call
          </h3>
          <p className="m-0 font-sans text-[13px] leading-[1.55] text-body">
            After completing your 5-week programme (or if you need a
            Reorientation &amp; Recap session), book a personal 1-to-1 session
            with Ambika in one click:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          <button
            type="button"
            onClick={() => {
              setFollowupConfirmed(false);
              setFollowupModal({
                duration: "1 Hour",
                price: "Rs. 2,000/-",
              });
            }}
            className="rounded-[18px] border-[1.5px] border-maroon/40 bg-white p-[14px] text-left hover:border-maroon hover:shadow-md cursor-pointer transition-all flex flex-col justify-between gap-[6px]"
          >
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-maroon">
              1-Hour 1-to-1 Session
            </span>
            <span className="font-playfair text-[22px] font-semibold text-ink">
              Rs. 2,000/-
            </span>
            <span className="font-sans text-[12px] font-semibold text-maroon underline">
              Book 1-Hr Call →
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFollowupConfirmed(false);
              setFollowupModal({
                duration: "30 Minutes",
                price: "Rs. 1,000/-",
              });
            }}
            className="rounded-[18px] border-[1.5px] border-lavender-frame/60 bg-white p-[14px] text-left hover:border-maroon hover:shadow-md cursor-pointer transition-all flex flex-col justify-between gap-[6px]"
          >
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-lavender-deep">
              30-Min Alignment Check
            </span>
            <span className="font-playfair text-[22px] font-semibold text-ink">
              Rs. 1,000/-
            </span>
            <span className="font-sans text-[12px] font-semibold text-lavender-deep underline">
              Book 30-Min Call →
            </span>
          </button>
        </div>

        {followupModal && (
          <div className="rounded-[18px] bg-white border-2 border-maroon/40 p-[16px] flex flex-col gap-[10px] animate-fade-up">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[13px] font-bold text-maroon">
                {followupModal.duration} Follow-Up ({followupModal.price})
              </span>
              <button
                type="button"
                onClick={() => setFollowupModal(null)}
                className="font-sans text-[12px] text-muted hover:text-ink cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {followupConfirmed ? (
              <div className="flex flex-col gap-[8px] font-sans text-[13px] text-ink">
                <p className="m-0 font-semibold text-maroon">
                  ✓ Request prepared for Ambika!
                </p>
                <div className="flex flex-wrap gap-[8px]">
                  <a
                    href={getEmailHref(
                      `Follow-Up Session Booking (${followupModal.duration} · ${followupModal.price}) — ${seekerName}`
                    )}
                    className="btn-3d-maroon rounded-full px-[16px] py-[8px] font-sans text-[12px] font-semibold text-white no-underline"
                  >
                    Send Booking Email to {EMAIL} →
                  </a>
                  <Link
                    href="/book"
                    className="rounded-full border border-maroon px-[14px] py-[8px] font-sans text-[12px] font-semibold text-maroon no-underline"
                  >
                    Go to Payment Page
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleConfirmFollowup}
                className="flex flex-col gap-[8px]"
              >
                <input
                  type="text"
                  required
                  placeholder="Preferred day & time (e.g., Saturday 11 AM)"
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="h-[38px] rounded-[10px] border border-beige-border px-[12px] font-sans text-[13px] text-ink"
                />
                <input
                  type="text"
                  placeholder="Topic or focus for this call (optional)"
                  value={followupNote}
                  onChange={(e) => setFollowupNote(e.target.value)}
                  className="h-[38px] rounded-[10px] border border-beige-border px-[12px] font-sans text-[13px] text-ink"
                />
                <button
                  type="submit"
                  className="btn-3d-maroon rounded-full px-[18px] py-[9px] font-sans text-[12px] font-semibold text-white cursor-pointer"
                >
                  Confirm {followupModal.duration} Slot ({followupModal.price}) · {seekerEmail || "Seeker"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
