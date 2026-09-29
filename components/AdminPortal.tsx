"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

interface AdminReviewItem {
  id: string;
  name: string;
  course: string;
  written_review: string;
  photo_url?: string | null;
  video_url?: string | null;
  approved: boolean;
  created_at: string;
}

const SESSION_LIST = [
  { id: "session-1", label: "Session 1 — Watch videos" },
  {
    id: "session-2",
    label: "Session 2 — Live experiment + DIY · 1 to 1 coaching (1hr)",
  },
  { id: "phase-3a", label: "Phase 3A — 1 to 1 coaching (2hrs)" },
  { id: "phase-3b", label: "Phase 3B — 1 to 1 coaching (2hrs)" },
  { id: "session-4", label: "Session 4 — Tools · 1 to 1 coaching (2hrs)" },
  {
    id: "session-5",
    label: "Session 5 — Belief, affirmation, vision board · 1 to 1 coaching (1hr)",
  },
];

export function AdminPortal() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Student Progress & Schedule State
  const [studentName, setStudentName] = useState("Ananya Sharma");
  const [studentEmail, setStudentEmail] = useState("seeker@ahambrahmasmi.in");
  const [completedSessions, setCompletedSessions] = useState<string[]>([
    "session-1",
    "session-2",
  ]);
  const [nextCallSession, setNextCallSession] = useState(
    "Phase 3A — 1 to 1 coaching (2hrs)"
  );
  const [nextCallDate, setNextCallDate] = useState(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [nextCallTime, setNextCallTime] = useState("11:00 AM IST");
  const [meetingLink, setMeetingLink] = useState(
    "https://meet.google.com/aham-brahmasmi-1to1"
  );

  // Custom Recordings for Student
  const [recSession, setRecSession] = useState("Session 2");
  const [recTitle, setRecTitle] = useState("");
  const [recUrl, setRecUrl] = useState("");
  const [recTranscript, setRecTranscript] = useState("");
  const [customRecordings, setCustomRecordings] = useState<
    {
      id: string;
      session: string;
      title: string;
      url: string;
      addedAt: string;
      transcript?: string;
    }[]
  >([]);

  // Shared Student Notes
  const [sharedNotes, setSharedNotes] = useState<
    {
      id: string;
      sessionTag: string;
      title: string;
      content: string;
      createdAt: string;
      sharedWithAmbika?: boolean;
    }[]
  >([]);

  // Reviews Queue
  const [reviews, setReviews] = useState<AdminReviewItem[]>([
    {
      id: "demo-rev-1",
      name: "Meera Krishnan",
      course: "The 5-Week 1-to-1 Course",
      written_review:
        "Ambika’s 48-hour live experiment in Session 2 completely shifted how I see my thoughts. Within one day I witnessed two clear synchronicities!",
      approved: true,
      created_at: "2 days ago",
    },
    {
      id: "demo-rev-2",
      name: "Rohan Verma",
      course: "The 5-Week 1-to-1 Course",
      written_review:
        "The Emotional Guidance Scale and daily 15-minute meditation gave me peace I hadn’t felt in years. Worth every bit of the 5 weeks.",
      approved: false,
      created_at: "Today · Pending Approval",
    },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    // Load local seeker state + fetch from /api/admin/portal
    try {
      const savedProfile = localStorage.getItem("aham_seeker_profile");
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.name) setStudentName(p.name);
        if (p.email) setStudentEmail(p.email);
      }
      const savedProg = localStorage.getItem("aham_seeker_progress");
      if (savedProg) setCompletedSessions(JSON.parse(savedProg));

      const savedSched = localStorage.getItem("aham_seeker_schedule");
      if (savedSched) {
        const s = JSON.parse(savedSched);
        if (s.nextCallSession) setNextCallSession(s.nextCallSession);
        if (s.nextCallDate) setNextCallDate(s.nextCallDate);
        if (s.nextCallTime) setNextCallTime(s.nextCallTime);
        if (s.meetingLink) setMeetingLink(s.meetingLink);
      }

      const savedRecs = localStorage.getItem("aham_seeker_recordings");
      if (savedRecs) setCustomRecordings(JSON.parse(savedRecs));

      const savedNotes = localStorage.getItem("aham_seeker_notes");
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        if (Array.isArray(parsedNotes)) {
          setSharedNotes(
            parsedNotes.filter((n) => n.sharedWithAmbika !== false)
          );
        }
      }
    } catch {
      // ignore
    }

    fetch("/api/admin/portal")
      .then((r) => r.json())
      .then((data) => {
        if (data?.supabaseConnected) setSupabaseConnected(true);
        if (Array.isArray(data?.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        // ignore offline
      });
  }, []);

  const handleToggleSession = (sessionId: string) => {
    const next = completedSessions.includes(sessionId)
      ? completedSessions.filter((s) => s !== sessionId)
      : [...completedSessions, sessionId];
    setCompletedSessions(next);
    try {
      localStorage.setItem("aham_seeker_progress", JSON.stringify(next));
    } catch {
      // ignore
    }
    showToast("✓ Updated student session progress!");
  };

  const handleUnlockAllSessions = () => {
    const allIds = SESSION_LIST.map((s) => s.id);
    setCompletedSessions(allIds);
    try {
      localStorage.setItem("aham_seeker_progress", JSON.stringify(allIds));
    } catch {
      // ignore
    }
    showToast(
      "✦ Unlocked all 6 sessions & Certificate of Completion for student!"
    );
  };

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = localStorage.getItem("aham_seeker_schedule");
      const base = existing ? JSON.parse(existing) : {};
      const updated = {
        ...base,
        enrolledAt:
          base.enrolledAt ||
          new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        nextCallSession,
        nextCallDate,
        nextCallTime,
        meetingLink,
      };
      localStorage.setItem("aham_seeker_schedule", JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast("✓ Synced student’s next 1-to-1 call & meeting link!");
  };

  const handleAddRecording = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recTitle.trim()) return;

    const newRec = {
      id: `custom-rec-${Date.now()}`,
      session: recSession,
      title: recTitle.trim(),
      url: recUrl.trim() || "#custom-voice-note",
      transcript:
        recTranscript.trim() ||
        "Personal coaching recap & alignment reminder shared by Ambika Mohan.",
      addedAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
    };

    const next = [newRec, ...customRecordings];
    setCustomRecordings(next);
    try {
      localStorage.setItem("aham_seeker_recordings", JSON.stringify(next));
    } catch {
      // ignore
    }
    setRecTitle("");
    setRecUrl("");
    setRecTranscript("");
    showToast("✓ Recording / Voice Note published to student’s portal!");
  };

  const handleToggleReviewApproval = async (id: string, current: boolean) => {
    const nextApproved = !current;
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: nextApproved } : r))
    );
    showToast(
      nextApproved
        ? "✓ Review approved & live on /reviews!"
        : "Review moved back to pending."
    );

    try {
      await fetch("/api/admin/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_review_approval",
          reviewId: id,
          approved: nextApproved,
        }),
      });
    } catch {
      // ignore
    }
  };

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-[640px] sacred-double-frame rounded-[28px] p-[28px] sm:p-[42px] flex flex-col gap-[20px] animate-fade-up">
        <div className="flex items-center gap-[14px]">
          <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-white shadow-sm">
            <AnimatedLogo variant="circle" size={56} />
          </div>
          <div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-maroon">
              Ahambrahmasmi · Coach Sanctuary
            </span>
            <h1 className="m-0 font-playfair text-[28px] sm:text-[34px] font-medium text-ink">
              Ambika’s Admin View
            </h1>
          </div>
        </div>

        <p className="m-0 font-sans text-[14px] leading-[1.6] text-body">
          Unlock student sessions, update upcoming 1-to-1 call links, upload
          personal session recordings/voice notes, read shared student logs, and
          approve reviews with one click.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAuthenticated(true);
          }}
          className="flex flex-col gap-[14px]"
        >
          <label className="flex flex-col gap-[6px] font-sans text-[13px] font-semibold text-ink">
            <span>Coach Passcode (or click Instant Preview below)</span>
            <input
              type="password"
              placeholder="Enter coach passcode..."
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="h-[48px] rounded-[12px] border border-beige-border bg-white px-[14px] font-sans text-[14px] text-ink"
            />
          </label>

          <div className="flex flex-wrap items-center gap-[12px]">
            <button
              type="submit"
              className="btn-3d-maroon min-h-[48px] rounded-full px-[28px] py-[12px] font-sans text-[14px] font-semibold text-white cursor-pointer"
            >
              Sign In to Coach Admin →
            </button>
            <button
              type="button"
              onClick={() => setAuthenticated(true)}
              className="min-h-[48px] rounded-full border border-maroon bg-beige-card px-[22px] py-[12px] font-sans text-[13px] font-semibold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
            >
              Instant Admin Preview ✦
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1160px] flex flex-col gap-[26px] animate-fade-up">
      {/* Top Admin Header */}
      <section className="sacred-double-frame rounded-[28px] p-[24px] sm:p-[32px] flex flex-wrap items-center justify-between gap-[18px]">
        <div className="flex items-center gap-[16px]">
          <div className="flex h-[64px] w-[64px] items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-white shadow-sm">
            <AnimatedLogo variant="circle" size={58} />
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-maroon">
              Coach Command Sanctuary ·{" "}
              {supabaseConnected
                ? "Supabase Connected"
                : "Local & Portal Sync Active"}
            </span>
            <h1 className="m-0 font-playfair text-[26px] sm:text-[34px] font-medium text-ink">
              Ambika’s 1-to-1 Seeker &amp; Course Admin
            </h1>
            <span className="font-sans text-[13px] text-body">
              Active Seeker: <strong>{studentName}</strong> ({studentEmail})
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-[10px]">
          <Link
            href="/space"
            className="btn-3d-maroon inline-flex min-h-[44px] items-center justify-center rounded-full px-[22px] py-[10px] font-sans text-[13px] font-semibold text-white no-underline"
          >
            ← View Student Portal (/space)
          </Link>
        </div>
      </section>

      {toast && (
        <div className="rounded-[16px] bg-[#2C1A26] text-white border border-[#E7B85A] px-[20px] py-[12px] font-sans text-[14px] font-semibold shadow-md">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
        {/* Left 6 Cols: Unlock Student Sessions & Update Schedule */}
        <div className="lg:col-span-6 flex flex-col gap-[22px]">
          {/* Card 1: Unlock Sessions */}
          <div className="rounded-[24px] bg-white border border-beige-border p-[24px] shadow-sm flex flex-col gap-[16px]">
            <div className="flex flex-wrap items-center justify-between gap-[10px]">
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-maroon">
                  1. Student Progress &amp; Certificate Control
                </span>
                <h2 className="m-0 font-playfair text-[24px] font-medium text-ink">
                  Unlock {studentName}’s Sessions
                </h2>
              </div>
              <button
                type="button"
                onClick={handleUnlockAllSessions}
                className="rounded-full bg-gold/30 border border-gold px-[14px] py-[7px] font-sans text-[12px] font-bold text-ink hover:bg-maroon hover:text-white cursor-pointer transition-colors"
              >
                ✦ Unlock All 6 &amp; Certificate
              </button>
            </div>

            <div className="flex flex-col gap-[10px]">
              {SESSION_LIST.map((s) => {
                const done = completedSessions.includes(s.id);
                return (
                  <label
                    key={s.id}
                    className={`flex items-center justify-between gap-[12px] rounded-[14px] p-[12px] border cursor-pointer transition-all ${
                      done
                        ? "bg-beige-card/70 border-gold"
                        : "bg-white border-beige-border"
                    }`}
                  >
                    <div className="flex items-center gap-[10px]">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => handleToggleSession(s.id)}
                        className="h-[18px] w-[18px] accent-[#8E1B25]"
                      />
                      <span className="font-sans text-[13px] font-semibold text-ink">
                        {s.label}
                      </span>
                    </div>
                    <span className="font-sans text-[11px] font-bold text-maroon">
                      {done ? "✓ Completed" : "In Progress"}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Card 2: Update Upcoming 1-to-1 Call Schedule */}
          <form
            onSubmit={handleSaveSchedule}
            className="rounded-[24px] bg-lavender/80 border border-lavender-border p-[24px] shadow-sm flex flex-col gap-[14px]"
          >
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-lavender-deep">
              2. 1-to-1 Session Schedule &amp; Meeting Link
            </span>
            <h2 className="m-0 font-playfair text-[24px] font-medium text-ink">
              Set Next Call for {studentName}
            </h2>

            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Upcoming Session Name</span>
              <input
                type="text"
                value={nextCallSession}
                onChange={(e) => setNextCallSession(e.target.value)}
                className="h-[42px] rounded-[10px] border border-lavender-border bg-white px-[12px] text-[13px] text-ink"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
              <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
                <span>Call Date</span>
                <input
                  type="date"
                  value={nextCallDate}
                  onChange={(e) => setNextCallDate(e.target.value)}
                  className="h-[42px] rounded-[10px] border border-lavender-border bg-white px-[12px] text-[13px] text-ink"
                />
              </label>
              <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
                <span>Call Time</span>
                <input
                  type="text"
                  value={nextCallTime}
                  onChange={(e) => setNextCallTime(e.target.value)}
                  className="h-[42px] rounded-[10px] border border-lavender-border bg-white px-[12px] text-[13px] text-ink"
                />
              </label>
            </div>

            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Google Meet / Zoom Link</span>
              <input
                type="url"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className="h-[42px] rounded-[10px] border border-lavender-border bg-white px-[12px] text-[13px] text-ink"
              />
            </label>

            <button
              type="submit"
              className="btn-3d-maroon self-start rounded-full px-[22px] py-[10px] font-sans text-[13px] font-semibold text-white cursor-pointer"
            >
              Sync Call Schedule to Student Portal
            </button>
          </form>
        </div>

        {/* Right 6 Cols: Upload Session Recordings, View Shared Notes, Approve Reviews */}
        <div className="lg:col-span-6 flex flex-col gap-[22px]">
          {/* Card 3: Upload Custom Session Recording / Voice Note */}
          <form
            onSubmit={handleAddRecording}
            className="rounded-[24px] bg-beige-card/90 border border-beige-border p-[24px] shadow-sm flex flex-col gap-[14px]"
          >
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-maroon">
              3. Custom Session Recordings &amp; Voice Notes
            </span>
            <h2 className="m-0 font-playfair text-[24px] font-medium text-ink">
              Share a Recording or Voice Note with {studentName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
              <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
                <span>Session Tag</span>
                <select
                  value={recSession}
                  onChange={(e) => setRecSession(e.target.value)}
                  className="h-[42px] rounded-[10px] border border-beige-border bg-white px-[12px] text-[13px] text-ink"
                >
                  <option value="Session 1">Session 1</option>
                  <option value="Session 2">Session 2</option>
                  <option value="Phase 3A">Phase 3A</option>
                  <option value="Phase 3B">Phase 3B</option>
                  <option value="Session 4">Session 4</option>
                  <option value="Session 5">Session 5</option>
                </select>
              </label>

              <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
                <span>Recording / Voice Note Title</span>
                <input
                  type="text"
                  required
                  placeholder="e.g., Phase 3A Personal Recap"
                  value={recTitle}
                  onChange={(e) => setRecTitle(e.target.value)}
                  className="h-[42px] rounded-[10px] border border-beige-border bg-white px-[12px] text-[13px] text-ink"
                />
              </label>
            </div>

            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Recording Link (Drive / Zoom / Loom — optional)</span>
              <input
                type="text"
                placeholder="https://..."
                value={recUrl}
                onChange={(e) => setRecUrl(e.target.value)}
                className="h-[42px] rounded-[10px] border border-beige-border bg-white px-[12px] text-[13px] text-ink"
              />
            </label>

            <label className="flex flex-col gap-[4px] font-sans text-[12px] font-semibold text-ink">
              <span>Voice Note Message / Summary</span>
              <textarea
                rows={2}
                placeholder="Write a personal note or spoken guidance for the student..."
                value={recTranscript}
                onChange={(e) => setRecTranscript(e.target.value)}
                className="rounded-[10px] border border-beige-border bg-white p-[10px] text-[13px] text-ink"
              />
            </label>

            <button
              type="submit"
              className="btn-3d-maroon self-start rounded-full px-[22px] py-[10px] font-sans text-[13px] font-semibold text-white cursor-pointer"
            >
              Publish to Student’s Meditation &amp; Audio Tab
            </button>
          </form>

          {/* Card 4: Shared Student Notes & 48-Hr Experiment Logs */}
          <div className="rounded-[24px] bg-white border border-beige-border p-[24px] shadow-sm flex flex-col gap-[12px]">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-lavender-deep">
              4. Shared Student Reflections &amp; Experiment Logs
            </span>
            <h2 className="m-0 font-playfair text-[22px] font-medium text-ink">
              Notes Shared by {studentName} ({sharedNotes.length})
            </h2>
            {sharedNotes.length === 0 ? (
              <p className="m-0 font-sans text-[13px] text-muted">
                No shared notes yet.
              </p>
            ) : (
              <div className="max-h-[220px] overflow-y-auto flex flex-col gap-[10px]">
                {sharedNotes.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-[14px] bg-beige-card/60 border border-beige-border p-[14px] flex flex-col gap-[4px]"
                  >
                    <div className="flex items-center justify-between font-sans text-[11px] font-bold text-maroon">
                      <span>{n.sessionTag}</span>
                      <span>{n.createdAt}</span>
                    </div>
                    <div className="font-sans text-[14px] font-bold text-ink">
                      {n.title}
                    </div>
                    <p className="m-0 font-sans text-[13px] text-body whitespace-pre-wrap">
                      {n.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Card 5: 1-Click Review Moderation */}
          <div className="rounded-[24px] bg-white border border-beige-border p-[24px] shadow-sm flex flex-col gap-[14px]">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-maroon">
              5. Seeker Reviews Moderation
            </span>
            <h2 className="m-0 font-playfair text-[22px] font-medium text-ink">
              Approve Reviews with 1 Click ({reviews.length})
            </h2>

            <div className="flex flex-col gap-[12px]">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-[16px] bg-lavender/50 border border-lavender-border p-[16px] flex flex-col gap-[8px]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-[8px]">
                    <div>
                      <span className="font-sans text-[14px] font-bold text-ink">
                        {rev.name}
                      </span>
                      <span className="font-sans text-[11px] text-muted ml-[8px]">
                        {rev.course}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleReviewApproval(rev.id, rev.approved)
                      }
                      className={`rounded-full px-[14px] py-[6px] font-sans text-[12px] font-bold cursor-pointer transition-all ${
                        rev.approved
                          ? "bg-gold/40 text-ink border border-gold"
                          : "bg-maroon text-white"
                      }`}
                    >
                      {rev.approved
                        ? "✓ Approved & Published"
                        : "Approve & Publish"}
                    </button>
                  </div>
                  <p className="m-0 font-sans text-[13px] leading-[1.5] text-body">
                    “{rev.written_review}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
