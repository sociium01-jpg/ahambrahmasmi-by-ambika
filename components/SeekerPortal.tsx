"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { GuidelinesModal } from "@/components/GuidelinesModal";
import { ReviewForm } from "@/components/ReviewForm";
import { EMAIL, getEmailHref } from "@/lib/site";

type PortalTab =
  | "progress"
  | "notes"
  | "materials"
  | "certificate"
  | "review";

interface SessionMilestone {
  id: string;
  badge: string;
  title: string;
  duration: string;
  summary: string;
  reflectionPrompt: string;
}

interface SavedNote {
  id: string;
  sessionTag: string;
  title: string;
  content: string;
  createdAt: string;
}

interface CourseMaterialItem {
  id: string;
  session: string;
  title: string;
  pages: string;
  desc: string;
  tone: "beige" | "lavender";
  pdfBodyHtml: string;
}

const SESSION_MILESTONES: SessionMilestone[] = [
  {
    id: "session-1",
    badge: "Session 1",
    title: "Session 1 — Watch videos",
    duration: "Pre-session foundation",
    summary:
      "Watch The Secret and the curated 18-minute Abraham Hicks foundation talk before your first live call.",
    reflectionPrompt:
      "What stood out to you most while watching The Secret and the foundation video?",
  },
  {
    id: "session-2",
    badge: "Session 2",
    title: "Session 2 — Live experiment + DIY · 1 to 1 coaching (1hr)",
    duration: "1 hr live call + 48-hr experiment",
    summary:
      "Run our 48-hour live Law of Attraction thought experiment and observe how your life mirrors your focus.",
    reflectionPrompt:
      "Record what you focused on during the 48-hour experiment and every synchronicity that showed up.",
  },
  {
    id: "phase-3a",
    badge: "Phase 3A",
    title: "Phase 3A — 1 to 1 coaching (2hrs)",
    duration: "2 hrs 1-to-1 coaching",
    summary:
      "Understand your physical instrument, your Emotional Guidance System, and what happened behind the scenes.",
    reflectionPrompt:
      "How did your emotions guide you this week? Where did you notice alignment vs. resistance?",
  },
  {
    id: "phase-3b",
    badge: "Phase 3B",
    title: "Phase 3B — 1 to 1 coaching (2hrs)",
    duration: "2 hrs 1-to-1 coaching",
    summary:
      "Master the 5-step creative process, the value of Contrast, and subtle vibrational nuances.",
    reflectionPrompt:
      "What piece of Contrast in your life recently helped clarify what you truly desire?",
  },
  {
    id: "session-4",
    badge: "Session 4",
    title: "Session 4 — Tools · 1 to 1 coaching (2hrs)",
    duration: "2 hrs 1-to-1 coaching + 1 week practice",
    summary:
      "Practise meditation, pivoting, hourly breathwork, gratitude journal & Book of Positive Aspects.",
    reflectionPrompt:
      "Which tool shifted your emotional state most effectively today?",
  },
  {
    id: "session-5",
    badge: "Session 5",
    title: "Session 5 — Belief, affirmation, vision board · 1 to 1 coaching (1hr)",
    duration: "1 hr 1-to-1 coaching · Completion",
    summary:
      "Complete your belief self-analysis, craft personal affirmations, build your Vision Board & daily alignment blueprint.",
    reflectionPrompt:
      "Write your top 3 new empowering beliefs and your core Vision Board intention.",
  },
];

const COURSE_MATERIALS: CourseMaterialItem[] = [
  {
    id: "handbook",
    session: "Complete Programme",
    title: "The 5-Week Course & Sacred Guidelines Handbook",
    pages: "Full Overview · PDF",
    desc: "Complete session-by-session roadmap, preparation checklist, and the 6 core programme guidelines.",
    tone: "beige",
    pdfBodyHtml: `
      <h2>The 5-Week 1-to-1 Coaching Roadmap</h2>
      <ul>
        <li><strong>Session 1 — watch videos:</strong> Watch <em>The Secret</em> and the 18-minute Abraham Hicks talk.</li>
        <li><strong>Session 2 — live experiment + DIY · 1 to 1 coaching (1hr):</strong> 48-hour live thought experiment &amp; DIY observation.</li>
        <li><strong>Phase 3A — 1 to 1 coaching (2hrs):</strong> Understanding the instrument &amp; behind-the-scenes creation.</li>
        <li><strong>Phase 3B — 1 to 1 coaching (2hrs):</strong> The 5-step creative process &amp; Emotional Guidance System.</li>
        <li><strong>Session 4 — tools · 1 to 1 coaching (2hrs):</strong> Meditation, pivoting, breathwork &amp; emotional mastery tools.</li>
        <li><strong>Session 5 — belief, affirmation, vision board · 1 to 1 coaching (1hr):</strong> Belief analysis, affirmations &amp; vision board.</li>
        <li><strong>Support:</strong> WhatsApp support for the month · videos, meditations, booklet.</li>
      </ul>
      <h2>Important Programme Guidelines</h2>
      <ul>
        <li>The programme should be completed within 5 weeks. A 7-day grace period is allowed for unexpected situations.</li>
        <li>If you need to postpone a session, it must be completed within the programme period and will depend on available time slots.</li>
        <li>If you stop the programme for a month or more, a Reorientation &amp; Recap Session (Rs. 2,000/- per hour) is required before continuing.</li>
        <li>The programme fee is non-refundable once the programme has started.</li>
      </ul>
    `,
  },
  {
    id: "experiment-log",
    session: "Session 2",
    title: "48-Hour Live Experiment & DIY Observation Sheet",
    pages: "Worksheet · PDF",
    desc: "Structured observation sheet to record your chosen thought target, emotional state, and real-life evidence.",
    tone: "lavender",
    pdfBodyHtml: `
      <h2>Session 2 · 48-Hour Live Thought Experiment</h2>
      <p><em>“Words don’t teach. Only life experience teaches.”</em></p>
      <h3>1. My Intentional Focus Target for the Next 48 Hours</h3>
      <p>Write down the specific symbol, object, or experience you and Ambika selected on your call:</p>
      <div class="box"></div>
      <h3>2. Emotional State While Visualizing (1–2 minutes)</h3>
      <p>How did it feel in your body when you imagined experiencing it lightly and playfully without attachment?</p>
      <div class="box"></div>
      <h3>3. Synchronicities &amp; Evidence Observed Within 48 Hours</h3>
      <p>Record every sighting, conversation, image, or unexpected manifestation:</p>
      <div class="box"></div>
    `,
  },
  {
    id: "emotional-scale",
    session: "Phases 3A & 3B",
    title: "The System of Creation & Emotional Guidance Scale",
    pages: "Reference Guide · PDF",
    desc: "Visual guide to the 22 levels of the Emotional Guidance Scale and the 5-step creative process.",
    tone: "beige",
    pdfBodyHtml: `
      <h2>Phases 3A &amp; 3B · Emotional Guidance Scale &amp; Creation</h2>
      <p>Your emotions are your real-time indicator of the vibrational relationship between your current thought and your Inner Being / Source.</p>
      <h3>Upward Spiral of Alignment</h3>
      <ol>
        <li>Joy · Knowledge · Empowerment · Freedom · Love · Appreciation</li>
        <li>Passion · Enthusiasm · Eagerness · Happiness</li>
        <li>Positive Expectation · Belief · Optimism · Hopefulness</li>
        <li>Contentment · Satisfied Stillness</li>
      </ol>
      <h3>The 5-Step Creative Process</h3>
      <ul>
        <li><strong>Step 1:</strong> Contrast happens and you naturally ask.</li>
        <li><strong>Step 2:</strong> Source / Universe immediately answers and holds the vibrational reality.</li>
        <li><strong>Step 3:</strong> You enter the receiving mode by soothing resistance and tending to how you feel.</li>
        <li><strong>Step 4:</strong> You stabilize in alignment through daily practice even when new contrast arises.</li>
        <li><strong>Step 5:</strong> You welcome new contrast with peace, knowing expansion is eternal.</li>
      </ul>
    `,
  },
  {
    id: "tools-booklet",
    session: "Session 4",
    title: "Emotional Mastery Tools & Daily Practice Booklet",
    pages: "Practice Booklet · PDF",
    desc: "Step-by-step instructions for Meditation, Pivoting, Hourly Breathwork, Gratitude Journal & Book of Positive Aspects.",
    tone: "lavender",
    pdfBodyHtml: `
      <h2>Session 4 · Tools for Emotional Mastery Booklet</h2>
      <h3>1. Daily Quiet Mind Meditation (15 Minutes)</h3>
      <p>Sit comfortably, focus on a gentle rhythmic sound or your breath, and allow thoughts to settle so resistance dissolves naturally.</p>
      <h3>2. The Process of Pivoting</h3>
      <p>When you feel a negative emotion, pause and ask: <em>“Knowing what I don’t want, what is it that I DO want, and how do I want to feel?”</em></p>
      <h3>3. Hourly Conscious Breathwork</h3>
      <p>Once every hour, take 3 deep, conscious breaths to return to your body and check your emotional state.</p>
      <h3>4. Book of Positive Aspects (BOPA)</h3>
      <p>Choose one person, situation, or desire each day and write 10 genuine positive aspects you appreciate about it.</p>
    `,
  },
  {
    id: "vision-blueprint",
    session: "Session 5",
    title: "Belief Self-Analysis, Affirmations & Vision Board Blueprint",
    pages: "Completion Guide · PDF",
    desc: "Framework to gently replace limiting beliefs, write resonant affirmations, and assemble your Vision Board.",
    tone: "beige",
    pdfBodyHtml: `
      <h2>Session 5 · Belief Analysis, Affirmations &amp; Vision Board</h2>
      <p><em>“A belief is only a thought you keep thinking.”</em></p>
      <h3>1. Bridge Belief Exercise</h3>
      <p>Instead of forcing an affirmation you don’t yet believe, use soothing bridge statements:</p>
      <ul>
        <li><em>“It is possible that things are beginning to shift for me…”</em></li>
        <li><em>“I am open to seeing new evidence of ease and clarity today…”</em></li>
        <li><em>“Every day I understand my own creative power a little more deeply.”</em></li>
      </ul>
      <h3>2. My Core Vision Board Themes</h3>
      <div class="box"></div>
      <h3>3. Daily Alignment Reminders</h3>
      <ul>
        <li>Nothing is more important than that I feel good.</li>
        <li>Contrast is a natural and valuable part of creation.</li>
        <li>I am the Core from which my life experience emerges — <em>Aham Brahmasmi</em>.</li>
      </ul>
    `,
  },
];

const VIBRATION_STATES = [
  {
    label: "Joy, Appreciation & Clarity",
    advice:
      "You are in full alignment with your Inner Being. Savour this feeling, write in your Book of Positive Aspects, and let inspired action flow effortlessly.",
  },
  {
    label: "Hopefulness & Contentment",
    advice:
      "You are on the upward spiral! Gently lean into thoughts that feel slightly warmer and notice what is already working well today.",
  },
  {
    label: "Overwhelm or Doubt (Contrast)",
    advice:
      "Remember: Contrast is part of the creative process. Pause, take 3 conscious breaths, and reach for the next slightly better-feeling thought rather than forcing a giant leap.",
  },
];

export function SeekerPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seekerName, setSeekerName] = useState("");
  const [seekerEmail, setSeekerEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<PortalTab>("progress");
  const [completedSessions, setCompletedSessions] = useState<string[]>([
    "session-1",
  ]);
  const [selectedVibeIdx, setSelectedVibeIdx] = useState<number>(0);

  // Notes state
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [noteSessionTag, setNoteSessionTag] = useState<string>("Session 2");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  // Certificate preview override so seeker/admin can preview anytime
  const [previewCertificate, setPreviewCertificate] = useState(false);

  // Load persisted portal state from localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("aham_seeker_profile");
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed?.name && parsed?.email) {
          setSeekerName(parsed.name);
          setSeekerEmail(parsed.email);
          setIsLoggedIn(true);
        }
      }

      const savedProgress = localStorage.getItem("aham_seeker_progress");
      if (savedProgress) {
        setCompletedSessions(JSON.parse(savedProgress));
      }

      const savedNotes = localStorage.getItem("aham_seeker_notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      } else {
        // Starter sample note
        const starter: SavedNote[] = [
          {
            id: "sample-1",
            sessionTag: "Session 1",
            title: "Reflections on The Secret & Aham Brahmasmi",
            content:
              "Realising that life is not happening to me, but being experienced through me — through my thoughts, emotions, and beliefs.",
            createdAt: new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          },
        ];
        setNotes(starter);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const cleanName = seekerName.trim();
    const cleanEmail = seekerEmail.trim();
    if (cleanName.length < 2) {
      setLoginError("Please enter your full name.");
      return;
    }
    if (!cleanEmail.includes("@")) {
      setLoginError("Please enter your registered email address.");
      return;
    }

    try {
      localStorage.setItem(
        "aham_seeker_profile",
        JSON.stringify({ name: cleanName, email: cleanEmail })
      );
    } catch {
      // ignore
    }
    setIsLoggedIn(true);
  };

  const handleDemoLogin = () => {
    const demoName = seekerName.trim() || "Ananya Sharma";
    const demoEmail = seekerEmail.trim() || "seeker@ahambrahmasmi.in";
    setSeekerName(demoName);
    setSeekerEmail(demoEmail);
    try {
      localStorage.setItem(
        "aham_seeker_profile",
        JSON.stringify({ name: demoName, email: demoEmail })
      );
    } catch {
      // ignore
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("aham_seeker_profile");
    } catch {
      // ignore
    }
    setIsLoggedIn(false);
  };

  const toggleSessionComplete = (id: string) => {
    setCompletedSessions((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("aham_seeker_progress", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newNote: SavedNote = {
      id: `note-${Date.now()}`,
      sessionTag: noteSessionTag,
      title: noteTitle.trim() || `${noteSessionTag} Reflection`,
      content: noteContent.trim(),
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    setNoteTitle("");
    setNoteContent("");
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 3000);

    try {
      localStorage.setItem("aham_seeker_notes", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    try {
      localStorage.setItem("aham_seeker_notes", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Helper to open a printable / Save-as-PDF window for Course Materials, Notes, or Certificate
  const openPrintablePdfWindow = (title: string, bodyHtml: string) => {
    const win = window.open("", "_blank", "width=900,height=750");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${title} — Ahambrahmasmi by Ambika</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Great+Vibes&family=Playfair+Display:ital,wght@0,500;1,400&display=swap" />
        <style>
          body {
            margin: 0;
            padding: 32px;
            background: #FBF5EE;
            color: #4E3B2C;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 20px;
            line-height: 1.55;
          }
          .frame {
            max-width: 780px;
            margin: 0 auto;
            padding: 44px 48px;
            border: 2px solid #846B96;
            border-radius: 24px;
            box-shadow: inset 0 0 0 4px #FBF5EE, inset 0 0 0 5.5px #BFAF75;
            background: #FBF5EE;
          }
          .header {
            text-align: center;
            border-bottom: 1.5px solid #C8B87A;
            padding-bottom: 20px;
            margin-bottom: 28px;
          }
          .cursive {
            font-family: 'Great Vibes', cursive;
            font-size: 34px;
            color: #684F7A;
            margin: 0;
          }
          .eyebrow {
            font-family: sans-serif;
            font-size: 11px;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #684F7A;
            margin-top: 8px;
          }
          h1 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 34px;
            color: #8E1B25;
            margin: 8px 0 0;
          }
          h2 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 24px;
            color: #8E1B25;
            margin-top: 24px;
          }
          h3 {
            font-family: 'Playfair Display', Georgia, serif;
            font-size: 20px;
            color: #4E3B2C;
            margin-top: 18px;
          }
          .box {
            min-height: 90px;
            border: 1px dashed #BFAF75;
            border-radius: 12px;
            background: #FFFFFF;
            margin: 10px 0 18px;
            padding: 12px;
          }
          .footer {
            margin-top: 36px;
            padding-top: 16px;
            border-top: 1px solid #E6D3C3;
            text-align: center;
            font-style: italic;
            color: #7D6857;
          }
          @media print {
            body { padding: 0; background: #FFFFFF; }
          }
        </style>
      </head>
      <body>
        <div class="frame">
          <div class="header">
            <p class="cursive">A journey of self discovery</p>
            <div class="eyebrow">1 TO 1 · LOA COACHING · AHAMBRAHMASMI BY AMBIKA</div>
            <h1>${title}</h1>
          </div>
          ${bodyHtml}
          <div class="footer">
            Aham Brahmasmi · by Ambika Mohan · Everything happens in perfect Divine timing.
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() { window.print(); }, 400);
          };
        </script>
      </body>
      </html>
    `);
    win.document.close();
  };

  const handleDownloadNotesPdf = () => {
    const notesHtml =
      notes.length === 0
        ? "<p>No notes saved yet.</p>"
        : notes
            .map(
              (n) => `
          <div style="margin-bottom:20px;padding:16px;border:1px solid #DEC8A2;border-radius:14px;background:#FFFFFF;">
            <div style="font-size:13px;text-transform:uppercase;letter-spacing:0.12em;color:#684F7A;">${n.sessionTag} · ${n.createdAt}</div>
            <h3 style="margin:6px 0;">${n.title}</h3>
            <p style="margin:0;white-space:pre-wrap;">${n.content}</p>
          </div>
        `
            )
            .join("");

    openPrintablePdfWindow(`${seekerName}'s Seeker Journal & Notes`, notesHtml);
  };

  const handleDownloadCertificatePdf = () => {
    const completionDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const certHtml = `
      <div style="text-align:center;padding:20px 10px;">
        <p style="font-size:22px;font-style:italic;margin:0 0 12px;">This sacred certificate is lovingly presented to</p>
        <div style="font-family:'Great Vibes',cursive;font-size:54px;color:#8E1B25;margin:10px 0 16px;border-bottom:1.5px solid #C8B87A;display:inline-block;padding:0 36px 6px;">
          ${seekerName || "Fellow Seeker"}
        </div>
        <p style="font-size:22px;max-width:600px;margin:16px auto;line-height:1.6;">
          for completing the <strong>5-Week 1-to-1 Law of Attraction Coaching Programme</strong> with heart, curiosity, and conscious alignment — remembering that <em>I am the Core from which my life experience emerges</em>.
        </p>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:48px;padding-top:20px;border-top:1px solid #DEC8A2;">
          <div style="text-align:left;">
            <div style="font-size:14px;color:#7D6857;text-transform:uppercase;letter-spacing:0.15em;">Date of Completion</div>
            <div style="font-size:20px;font-weight:600;">${completionDate}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:'Great Vibes',cursive;font-size:36px;color:#8E1B25;">Ambika Mohan</div>
            <div style="font-size:14px;color:#7D6857;text-transform:uppercase;letter-spacing:0.15em;">Founder · Ahambrahmasmi</div>
          </div>
        </div>
      </div>
    `;
    openPrintablePdfWindow("Certificate of Completion", certHtml);
  };

  const totalSessions = SESSION_MILESTONES.length;
  const completedCount = completedSessions.length;
  const progressPercent = Math.round((completedCount / totalSessions) * 100);
  const isCourseCompleted = completedCount === totalSessions;

  // ============================================================================
  // 1. LOGIN VIEW (IF NOT LOGGED IN)
  // ============================================================================
  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-[980px] grid grid-cols-1 lg:grid-cols-12 gap-[28px] lg:gap-[36px] items-stretch animate-fade-up">
        {/* Left Sacred Welcome Column */}
        <div className="lg:col-span-5 sacred-double-frame rounded-[28px] p-[28px] sm:p-[36px] flex flex-col justify-between gap-[24px]">
          <div className="flex flex-col items-start gap-[14px]">
            <div className="flex items-center gap-[14px]">
              <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border border-beige-border bg-white shadow-sm">
                <AnimatedLogo variant="circle" size={56} />
              </div>
              <div className="flex flex-col">
                <span className="font-cursive text-[26px] leading-none text-lavender-deep">
                  A journey of self discovery
                </span>
                <span className="font-inter text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon mt-[4px]">
                  Seeker &amp; Student Sanctuary
                </span>
              </div>
            </div>

            <h1 className="m-0 font-playfair text-[32px] sm:text-[40px] font-medium leading-[1.1] text-ink">
              Welcome to your{" "}
              <em className="italic text-maroon">Seeker’s Space.</em>
            </h1>

            <p className="m-0 font-cormorant text-[20px] leading-[1.55] text-body">
              Your private 5-week companion for 1-to-1 Law of Attraction
              coaching with Ambika Mohan.
            </p>

            <ul className="m-0 mt-[4px] flex flex-col gap-[10px] pl-0 list-none font-cormorant text-[19px] text-ink">
              <li className="flex items-center gap-[10px]">
                <span className="h-[7px] w-[7px] rounded-full bg-maroon" />
                <span>Witness your 5-week session progress</span>
              </li>
              <li className="flex items-center gap-[10px]">
                <span className="h-[7px] w-[7px] rounded-full bg-maroon" />
                <span>Save personal notes &amp; 48-hr experiment logs</span>
              </li>
              <li className="flex items-center gap-[10px]">
                <span className="h-[7px] w-[7px] rounded-full bg-maroon" />
                <span>Download course booklets &amp; worksheets as PDF</span>
              </li>
              <li className="flex items-center gap-[10px]">
                <span className="h-[7px] w-[7px] rounded-full bg-maroon" />
                <span>Share a written or video review with photo</span>
              </li>
              <li className="flex items-center gap-[10px]">
                <span className="h-[7px] w-[7px] rounded-full bg-maroon" />
                <span>View &amp; download your Certificate of Completion</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-[12px] border-t border-beige-border pt-[18px]">
            <Image
              src="/images/ambika.png"
              alt="Ambika Mohan"
              width={48}
              height={48}
              className="h-[48px] w-[48px] rounded-full border-2 border-gold object-cover"
            />
            <div className="flex flex-col text-[13px] text-body">
              <span className="font-semibold text-ink">Need portal access?</span>
              <a
                href={getEmailHref("Seeker Portal Access Request")}
                className="text-maroon underline"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Right Login Form Card */}
        <div className="lg:col-span-7 rounded-[28px] bg-lavender-soft/90 border border-lavender-border p-[26px] sm:p-[42px] shadow-soft flex flex-col justify-between gap-[22px]">
          <form onSubmit={handleLogin} className="flex flex-col gap-[18px]">
            <div className="flex flex-wrap items-center justify-between gap-[12px]">
              <div>
                <span className="font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-lavender-deep">
                  Student Sign In
                </span>
                <h2 className="m-0 mt-[4px] font-playfair text-[28px] sm:text-[32px] font-medium text-ink">
                  Enter your Seeker Portal
                </h2>
              </div>
              <GuidelinesModal buttonLabel="Guidelines" variant="inline" />
            </div>

            <label className="flex flex-col gap-[6px] text-[14px] font-medium text-ink">
              <span>Your Full Name (appears on your Certificate &amp; Journal)</span>
              <input
                type="text"
                required
                placeholder="e.g., Ananya Sharma"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="h-[52px] rounded-[14px] border border-lavender-border bg-white px-[16px] text-[16px] text-ink"
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[14px] font-medium text-ink">
              <span>Registered Email Address</span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={seekerEmail}
                onChange={(e) => setSeekerEmail(e.target.value)}
                className="h-[52px] rounded-[14px] border border-lavender-border bg-white px-[16px] text-[16px] text-ink"
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[14px] font-medium text-ink">
              <span>
                Booking Reference or Passcode{" "}
                <span className="font-normal text-muted">
                  (shared by Ambika upon enrolment)
                </span>
              </span>
              <input
                type="password"
                placeholder="Enter your passcode or booking ID"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="h-[52px] rounded-[14px] border border-lavender-border bg-white px-[16px] text-[16px] text-ink"
              />
            </label>

            {loginError && (
              <p role="alert" className="m-0 text-[14px] font-medium text-maroon">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="btn-3d-maroon animate-gold-shimmer mt-[4px] min-h-[54px] rounded-full px-[32px] py-[15px] font-inter text-[15px] font-semibold text-white cursor-pointer"
            >
              Sign in to Seeker’s Space →
            </button>
          </form>

          {/* Instant Demo Access + New Enrolment Bar */}
          <div className="flex flex-col gap-[12px] border-t border-lavender-border pt-[18px]">
            <div className="flex flex-wrap items-center justify-between gap-[12px]">
              <span className="font-cormorant text-[18px] italic text-body">
                Want to preview the student dashboard right away?
              </span>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="rounded-full border border-maroon/50 bg-beige-card px-[18px] py-[9px] font-inter text-[13px] font-semibold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
              >
                Explore Demo Student Portal ✦
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-[12px] text-[13px] text-muted">
              <span>Haven’t enrolled in the 5-week course yet?</span>
              <Link
                href="/book"
                className="font-semibold text-maroon underline"
              >
                Book the 5-Week Course (Rs. 15,000/-) →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. LOGGED-IN STUDENT PORTAL DASHBOARD
  // ============================================================================
  return (
    <div className="mx-auto max-w-[1160px] flex flex-col gap-[28px] animate-fade-up">
      {/* Top Seeker Header Banner */}
      <section className="sacred-double-frame rounded-[26px] sm:rounded-[32px] p-[22px] sm:p-[34px] flex flex-col lg:flex-row lg:items-center justify-between gap-[22px]">
        <div className="flex items-center gap-[16px]">
          <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-full border-2 border-gold bg-white shadow-sm overflow-hidden">
            <AnimatedLogo variant="circle" size={62} />
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="font-cursive text-[28px] sm:text-[32px] leading-none text-lavender-deep">
              Aham Brahmasmi · Welcome home, {seekerName}
            </span>
            <h1 className="m-0 font-playfair text-[26px] sm:text-[34px] font-medium text-ink">
              Your 5-Week 1-to-1 Coaching Sanctuary
            </h1>
            <span className="font-inter text-[12px] text-muted">
              {seekerEmail} · Enrolled in The 5-Week Course
            </span>
          </div>
        </div>

        {/* Live Progress Ring + Quick Actions */}
        <div className="flex flex-wrap items-center gap-[14px]">
          <div className="flex items-center gap-[12px] rounded-[20px] bg-beige-card border border-beige-border px-[18px] py-[10px]">
            <div className="flex flex-col">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.14em] text-maroon">
                Journey Progress
              </span>
              <span className="font-playfair text-[22px] font-semibold text-ink">
                {completedCount} of {totalSessions} Sessions ({progressPercent}%)
              </span>
            </div>
          </div>

          <GuidelinesModal buttonLabel="Guidelines" variant="inline" />

          <button
            type="button"
            onClick={handleLogout}
            className="min-h-[42px] rounded-full border border-line bg-white/80 px-[16px] py-[8px] font-inter text-[13px] font-medium text-muted hover:text-maroon hover:border-maroon cursor-pointer transition-colors"
          >
            Sign out
          </button>
        </div>
      </section>

      {/* Portal Navigation Tabs */}
      <nav
        aria-label="Seeker portal sections"
        className="flex flex-wrap items-center gap-[8px] sm:gap-[10px] rounded-[22px] bg-lavender/85 border border-lavender-border p-[8px]"
      >
        {[
          { id: "progress", label: "1. Witness Progress" },
          { id: "notes", label: `2. Save Notes (${notes.length})` },
          { id: "materials", label: "3. Course PDFs & Booklet" },
          {
            id: "certificate",
            label: isCourseCompleted
              ? "4. Certificate (Unlocked ✦)"
              : "4. Certificate",
          },
          { id: "review", label: "5. Leave a Review" },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as PortalTab)}
              className={`min-h-[44px] flex-1 sm:flex-initial rounded-[16px] px-[18px] py-[10px] font-inter text-[13px] sm:text-[14px] font-semibold cursor-pointer transition-all ${
                active
                  ? "bg-maroon text-white shadow-md"
                  : "bg-transparent text-ink hover:bg-white/70"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ============================================================
          TAB 1: WITNESS PROGRESS & DAILY ALIGNMENT CHECK-IN
          ============================================================ */}
      {activeTab === "progress" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
          {/* Left 8 Cols: 6 Session Milestones */}
          <div className="lg:col-span-8 flex flex-col gap-[16px]">
            <div className="rounded-[24px] bg-beige-card/85 border border-beige-border p-[22px] sm:p-[28px] flex flex-col gap-[12px]">
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <div>
                  <span className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-maroon">
                    5-Week 1-to-1 Milestones
                  </span>
                  <h2 className="m-0 font-playfair text-[24px] sm:text-[28px] font-medium text-ink">
                    Witness Your Progress
                  </h2>
                </div>
                <span className="font-playfair text-[28px] font-semibold text-maroon">
                  {progressPercent}% Complete
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="h-[12px] w-full overflow-hidden rounded-full bg-white/80 border border-beige-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-maroon via-[#B23A48] to-gold transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="m-0 font-cormorant text-[18px] italic text-body">
                Tick each session below as you complete it with Ambika. Completing
                all 6 unlocks your sacred Certificate of Completion.
              </p>
            </div>

            {SESSION_MILESTONES.map((item, idx) => {
              const done = completedSessions.includes(item.id);
              const isLavender = idx % 2 === 1;
              return (
                <div
                  key={item.id}
                  className={`rounded-[22px] p-[20px] sm:p-[24px] border transition-all ${
                    done
                      ? "bg-white border-gold shadow-sm"
                      : isLavender
                      ? "bg-lavender/75 border-lavender-border"
                      : "bg-beige-card/65 border-beige-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-[14px]">
                    <label className="flex items-start gap-[14px] cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleSessionComplete(item.id)}
                        className="mt-[5px] h-[22px] w-[22px] shrink-0 accent-[#8E1B25] cursor-pointer"
                      />
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex flex-wrap items-center gap-[8px]">
                          <span className="rounded-full bg-white px-[10px] py-[2px] font-inter text-[11px] font-bold uppercase tracking-[0.14em] text-maroon border border-beige-border">
                            {item.badge}
                          </span>
                          <span className="font-inter text-[12px] font-medium text-lavender-deep">
                            {item.duration}
                          </span>
                          {done && (
                            <span className="rounded-full bg-gold/30 px-[10px] py-[2px] font-inter text-[11px] font-semibold text-ink">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <h3 className="m-0 font-playfair text-[20px] sm:text-[22px] font-medium text-ink">
                          {item.title}
                        </h3>
                        <p className="m-0 font-cormorant text-[18px] leading-[1.45] text-body">
                          {item.summary}
                        </p>
                      </div>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setNoteSessionTag(item.badge);
                        setNoteTitle(`${item.badge} Reflection`);
                        setActiveTab("notes");
                      }}
                      className="shrink-0 rounded-full border border-maroon/40 bg-white px-[14px] py-[7px] font-inter text-[12px] font-semibold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
                    >
                      + Add Note
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 4 Cols: Daily Emotional Guidance Check-In + Support */}
          <div className="lg:col-span-4 flex flex-col gap-[20px]">
            <div className="rounded-[24px] bg-lavender border border-lavender-border p-[24px] flex flex-col gap-[14px]">
              <span className="font-cursive text-[28px] leading-none text-lavender-deep">
                Emotional Guidance System
              </span>
              <h3 className="m-0 font-playfair text-[22px] font-medium text-ink">
                How are you feeling in this moment?
              </h3>
              <div className="flex flex-col gap-[8px]">
                {VIBRATION_STATES.map((vibe, i) => (
                  <button
                    key={vibe.label}
                    type="button"
                    onClick={() => setSelectedVibeIdx(i)}
                    className={`rounded-[14px] p-[12px] text-left font-inter text-[13px] font-semibold cursor-pointer transition-all border ${
                      selectedVibeIdx === i
                        ? "bg-maroon text-white border-maroon"
                        : "bg-white/85 text-ink border-lavender-border hover:border-maroon"
                    }`}
                  >
                    {vibe.label}
                  </button>
                ))}
              </div>
              <div className="rounded-[16px] bg-white/85 border border-white p-[16px] font-cormorant text-[18px] italic leading-[1.5] text-ink">
                {VIBRATION_STATES[selectedVibeIdx].advice}
              </div>
            </div>

            <div className="rounded-[24px] bg-beige-card border border-beige-border p-[24px] flex flex-col gap-[12px]">
              <span className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-maroon">
                Monthly Support Included
              </span>
              <h3 className="m-0 font-playfair text-[21px] font-medium text-ink">
                1-to-1 Support &amp; Follow-up
              </h3>
              <p className="m-0 font-cormorant text-[18px] leading-[1.45] text-body">
                Have a question while practising your tools this week, or wish
                to schedule your next call?
              </p>
              <a
                href={getEmailHref(`Seeker Support — ${seekerName}`)}
                className="btn-3d-maroon inline-flex min-h-[46px] items-center justify-center rounded-full px-[20px] py-[11px] font-inter text-[13px] font-semibold text-white no-underline text-center"
              >
                Email Ambika ({EMAIL})
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 2: SAVE NOTES & EXPERIMENT JOURNAL
          ============================================================ */}
      {activeTab === "notes" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] items-start">
          {/* Left: Write a New Note */}
          <form
            onSubmit={handleSaveNote}
            className="lg:col-span-5 rounded-[24px] bg-lavender border border-lavender-border p-[24px] sm:p-[30px] flex flex-col gap-[16px]"
          >
            <span className="font-cursive text-[28px] leading-none text-lavender-deep">
              Personal Seeker Journal
            </span>
            <h2 className="m-0 font-playfair text-[26px] font-medium text-ink">
              Save a New Note
            </h2>

            <label className="flex flex-col gap-[6px] text-[13px] font-semibold text-ink">
              <span>Session / Practice Tag</span>
              <select
                value={noteSessionTag}
                onChange={(e) => setNoteSessionTag(e.target.value)}
                className="h-[48px] rounded-[12px] border border-lavender-border bg-white px-[14px] text-[15px] text-ink"
              >
                <option value="Session 1">Session 1 — Watch videos</option>
                <option value="Session 2">
                  Session 2 — 48-Hr Live Experiment
                </option>
                <option value="Phase 3A">Phase 3A — The Instrument</option>
                <option value="Phase 3B">Phase 3B — System of Creation</option>
                <option value="Session 4">
                  Session 4 — Emotional Mastery Tools
                </option>
                <option value="Session 5">
                  Session 5 — Beliefs, Affirmations &amp; Vision Board
                </option>
                <option value="Daily Gratitude">
                  Daily Gratitude / Book of Positive Aspects
                </option>
              </select>
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-semibold text-ink">
              <span>Note Title</span>
              <input
                type="text"
                placeholder="e.g., What manifested in my 48-hour experiment"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="h-[48px] rounded-[12px] border border-lavender-border bg-white px-[14px] text-[15px] text-ink"
              />
            </label>

            <label className="flex flex-col gap-[6px] text-[13px] font-semibold text-ink">
              <span>Your Reflections &amp; Observations</span>
              <textarea
                required
                rows={5}
                placeholder="Write your thoughts, emotional shifts, affirmations, or synchronicities..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="resize-y rounded-[12px] border border-lavender-border bg-white p-[14px] text-[15px] text-ink"
              />
            </label>

            {noteSavedToast && (
              <span className="text-[13px] font-semibold text-maroon">
                ✓ Saved to your private Seeker Journal!
              </span>
            )}

            <button
              type="submit"
              className="btn-3d-maroon min-h-[50px] rounded-full px-[24px] py-[13px] font-inter text-[14px] font-semibold text-white cursor-pointer"
            >
              Save Note to My Space
            </button>
          </form>

          {/* Right: Saved Notes List + Export as PDF */}
          <div className="lg:col-span-7 flex flex-col gap-[16px]">
            <div className="flex flex-wrap items-center justify-between gap-[12px] rounded-[22px] bg-beige-card border border-beige-border p-[20px] sm:p-[24px]">
              <div>
                <h3 className="m-0 font-playfair text-[22px] font-medium text-ink">
                  Your Saved Reflections ({notes.length})
                </h3>
                <span className="font-cormorant text-[18px] italic text-body">
                  Stored privately in your browser · Export anytime as PDF
                </span>
              </div>
              <button
                type="button"
                onClick={handleDownloadNotesPdf}
                className="rounded-full border border-maroon bg-white px-[18px] py-[10px] font-inter text-[13px] font-semibold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
              >
                Download My Notes as PDF ↓
              </button>
            </div>

            {notes.map((n) => (
              <article
                key={n.id}
                className="rounded-[22px] bg-white border border-beige-border p-[22px] sm:p-[26px] shadow-sm flex flex-col gap-[10px]"
              >
                <div className="flex items-center justify-between gap-[10px]">
                  <span className="rounded-full bg-lavender px-[12px] py-[4px] font-inter text-[11px] font-bold uppercase tracking-[0.14em] text-lavender-deep">
                    {n.sessionTag} · {n.createdAt}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteNote(n.id)}
                    className="bg-transparent border-0 text-[12px] text-muted hover:text-maroon cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
                <h4 className="m-0 font-playfair text-[21px] font-medium text-ink">
                  {n.title}
                </h4>
                <p className="m-0 whitespace-pre-wrap font-cormorant text-[19px] leading-[1.55] text-body">
                  {n.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 3: DOWNLOAD COURSE MATERIALS AS PDF
          ============================================================ */}
      {activeTab === "materials" && (
        <div className="flex flex-col gap-[20px]">
          <div className="rounded-[24px] bg-beige-card/85 border border-beige-border p-[24px] sm:p-[30px] flex flex-wrap items-center justify-between gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span className="font-cursive text-[28px] leading-none text-lavender-deep">
                Sacred Study Library
              </span>
              <h2 className="m-0 font-playfair text-[26px] sm:text-[32px] font-medium text-ink">
                Download Course Materials &amp; Booklets (PDF)
              </h2>
              <p className="m-0 font-cormorant text-[19px] text-body">
                Click any resource below to open its formatted printable sheet
                and save as PDF on your phone or computer.
              </p>
            </div>
            <GuidelinesModal
              buttonLabel="Guidelines · Important to read"
              variant="pill"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
            {COURSE_MATERIALS.map((mat) => {
              const isBeige = mat.tone === "beige";
              return (
                <div
                  key={mat.id}
                  className={`rounded-[24px] p-[24px] sm:p-[28px] border flex flex-col justify-between gap-[18px] shadow-sm ${
                    isBeige
                      ? "bg-beige-card/80 border-beige-border"
                      : "bg-lavender/85 border-lavender-border"
                  }`}
                >
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center justify-between gap-[10px]">
                      <span className="rounded-full bg-white/85 px-[12px] py-[4px] font-inter text-[11px] font-bold uppercase tracking-[0.15em] text-maroon">
                        {mat.session}
                      </span>
                      <span className="font-inter text-[12px] font-semibold text-lavender-deep">
                        {mat.pages}
                      </span>
                    </div>
                    <h3 className="m-0 font-playfair text-[22px] font-medium text-ink">
                      {mat.title}
                    </h3>
                    <p className="m-0 font-cormorant text-[18px] leading-[1.45] text-body">
                      {mat.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openPrintablePdfWindow(mat.title, mat.pdfBodyHtml)
                    }
                    className="btn-3d-maroon self-start inline-flex min-h-[46px] items-center justify-center gap-[8px] rounded-full px-[22px] py-[10px] font-inter text-[13px] font-semibold text-white cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download PDF</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================
          TAB 4: SACRED CERTIFICATE OF COMPLETION
          ============================================================ */}
      {activeTab === "certificate" && (
        <div className="flex flex-col gap-[22px]">
          {!isCourseCompleted && !previewCertificate ? (
            <div className="rounded-[26px] bg-lavender border border-lavender-border p-[28px] sm:p-[40px] text-center flex flex-col items-center gap-[16px]">
              <span className="font-cursive text-[32px] leading-none text-lavender-deep">
                Almost there on your 5-week path
              </span>
              <h2 className="m-0 font-playfair text-[28px] sm:text-[34px] font-medium text-ink">
                Complete all 6 sessions to unlock your Certificate
              </h2>
              <p className="m-0 max-w-[560px] font-cormorant text-[20px] leading-[1.5] text-body">
                You have completed{" "}
                <strong>
                  {completedCount} of {totalSessions}
                </strong>{" "}
                sessions ({progressPercent}%). Mark all sessions complete in the{" "}
                <em>Witness Progress</em> tab once finished, or preview your
                certificate below.
              </p>
              <div className="flex flex-wrap justify-center gap-[12px] pt-[6px]">
                <button
                  type="button"
                  onClick={() => setActiveTab("progress")}
                  className="btn-3d-maroon min-h-[48px] rounded-full px-[26px] py-[12px] font-inter text-[14px] font-semibold text-white cursor-pointer"
                >
                  Go to Progress Tracker
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewCertificate(true)}
                  className="min-h-[48px] rounded-full border border-maroon bg-white px-[24px] py-[12px] font-inter text-[14px] font-semibold text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
                >
                  Preview Certificate Now ✦
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[20px]">
              <div className="sacred-double-frame rounded-[28px] sm:rounded-[36px] p-[28px] sm:p-[52px] lg:p-[68px] text-center flex flex-col items-center">
                <div className="mb-[12px] flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full border-2 border-gold bg-white shadow-md">
                  <AnimatedLogo variant="circle" size={70} />
                </div>

                <span className="font-cursive text-[32px] sm:text-[40px] leading-none text-lavender-deep">
                  A journey of self discovery
                </span>

                <span className="mt-[10px] font-inter text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.26em] text-lavender-deep">
                  AHAMBRAHMASMI BY AMBIKA · 1 TO 1 LOA COACHING
                </span>

                <h2 className="m-0 mt-[8px] font-playfair text-[32px] sm:text-[46px] font-medium text-maroon">
                  Certificate of Completion
                </h2>

                <div className="my-[16px] h-[1.5px] w-[240px] bg-[#C8B87A]" />

                <p className="m-0 font-cormorant text-[21px] sm:text-[24px] italic text-body">
                  This sacred certificate is lovingly presented to
                </p>

                <div className="my-[18px] border-b-2 border-[#C8B87A] px-[32px] pb-[6px] font-cursive text-[44px] sm:text-[60px] leading-tight text-maroon">
                  {seekerName || "Fellow Seeker"}
                </div>

                <p className="m-0 max-w-[680px] font-cormorant text-[20px] sm:text-[23px] leading-[1.6] text-ink">
                  for completing{" "}
                  <strong>
                    The 5-Week 1-to-1 Law of Attraction Coaching Programme
                  </strong>{" "}
                  (Sessions 1, 2, Phases 3A &amp; 3B, Session 4 &amp; Session 5)
                  with curiosity, devotion, and conscious alignment —
                  experiencing firsthand that{" "}
                  <em className="text-maroon">
                    I am the Core from which my life experience emerges
                  </em>
                  .
                </p>

                <div className="mt-[40px] w-full max-w-[680px] flex flex-col sm:flex-row items-center justify-between gap-[20px] border-t border-beige-border pt-[24px]">
                  <div className="flex flex-col sm:items-start">
                    <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-muted">
                      Date of Completion
                    </span>
                    <span className="font-playfair text-[19px] font-medium text-ink">
                      {new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <span className="font-cursive text-[36px] leading-none text-maroon">
                      Ambika Mohan
                    </span>
                    <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-muted">
                      Founder &amp; 1-to-1 Coach · Ahambrahmasmi
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleDownloadCertificatePdf}
                  className="btn-3d-maroon animate-gold-shimmer inline-flex min-h-[54px] items-center justify-center gap-[10px] rounded-full px-[34px] py-[16px] font-inter text-[15px] font-semibold text-white cursor-pointer"
                >
                  <span>Download Certificate as PDF ↓</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          TAB 5: LEAVE A VIDEO OR WRITTEN REVIEW WITH IMAGE UPLOAD
          ============================================================ */}
      {activeTab === "review" && (
        <div className="mx-auto w-full max-w-[840px] flex flex-col gap-[18px]">
          <div className="flex flex-col gap-[6px]">
            <span className="font-cursive text-[30px] leading-none text-lavender-deep">
              Share your light with fellow seekers
            </span>
            <h2 className="m-0 font-playfair text-[28px] sm:text-[36px] font-medium text-ink">
              Leave a Written or Video Review
            </h2>
            <p className="m-0 font-cormorant text-[20px] text-body">
              Share your experience of the 5-week 1-to-1 journey, attach your
              photo, and upload a short video or link.
            </p>
          </div>
          <ReviewForm />
        </div>
      )}
    </div>
  );
}
