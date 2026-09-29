"use client";

import React, { useEffect, useRef, useState } from "react";

export interface CustomRecording {
  id: string;
  session: string;
  title: string;
  url: string;
  addedAt: string;
  transcript?: string;
}

const DEFAULT_VOICE_NOTES: CustomRecording[] = [
  {
    id: "voice-1",
    session: "Session 4 · Meditation",
    title: "Ambika’s Quiet Mind Guidance — Releasing Resistance in 15 Minutes",
    url: "#voice-note-1",
    addedAt: "Included in Course",
    transcript:
      "Sit comfortably, close your eyes gently, and listen to the subtle hum of the room or your breath. You do not need to fight your thoughts. Whenever a thought floats by, gently return your attention to the rhythm of your breathing. For these fifteen minutes, nothing else is required of you.",
  },
  {
    id: "voice-2",
    session: "Session 4 · Pivoting",
    title: "Ambika’s Audio Guide — How to Pivot When Contrast Appears",
    url: "#voice-note-2",
    addedAt: "Included in Course",
    transcript:
      "Whenever you notice tightness, worry, or frustration, remember: your Emotional Guidance System is working perfectly. Pause, take three deep conscious breaths, and ask yourself gently: Knowing what I do not want right now, what is it that I do want, and how do I wish to feel?",
  },
  {
    id: "voice-3",
    session: "Session 5 · Alignment",
    title: "Morning Alignment Reminder — Nothing Is More Important Than Feeling Good",
    url: "#voice-note-3",
    addedAt: "Included in Course",
    transcript:
      "Good morning, dear seeker. Today, before checking your phone or stepping into the world, remember: Aham Brahmasmi — I am the Core from which my life experience emerges. Tend to your emotional state first, and let everything else unfold in divine timing.",
  },
];

export function MeditationAndBreathwork() {
  // 15-Minute Meditation Timer State
  const [durationMins, setDurationMins] = useState<number>(15);
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60);
  const [isMeditating, setIsMeditating] = useState<boolean>(false);
  const [ambientSoundOn, setAmbientSoundOn] = useState<boolean>(true);
  const [breathPhase, setBreathPhase] = useState<"Inhale (4s)" | "Hold Softly (4s)" | "Exhale Slowly (6s)">("Inhale (4s)");

  // Hourly 3-Breath Bell Reminder State
  const [hourlyBellEnabled, setHourlyBellEnabled] = useState<boolean>(false);
  const [threeBreathActive, setThreeBreathActive] = useState<boolean>(false);
  const [breathCount, setBreathCount] = useState<number>(0);

  // Voice notes & custom recordings from Admin
  const [recordings, setRecordings] =
    useState<CustomRecording[]>(DEFAULT_VOICE_NOTES);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Web Audio API refs for Tibetan singing bowl & 432Hz drone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    try {
      const savedRecs = localStorage.getItem("aham_seeker_recordings");
      if (savedRecs) {
        const parsed = JSON.parse(savedRecs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecordings([...parsed, ...DEFAULT_VOICE_NOTES]);
        }
      }
      const savedBell = localStorage.getItem("aham_hourly_bell");
      if (savedBell === "true") setHourlyBellEnabled(true);
    } catch {
      // ignore
    }
  }, []);

  // Helper: Ring a soothing Tibetan Singing Bowl harmonic chime via Web Audio API
  const ringSingingBowl = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const freqs = [432, 864, 1296];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, now);

        const initialGain = idx === 0 ? 0.18 : idx === 1 ? 0.06 : 0.025;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(initialGain, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5 - idx * 1.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 5.6);
      });
    } catch {
      // ignore audio context restrictions
    }
  };

  // Start / Stop soft 432Hz + 216Hz ambient meditation drone
  const startAmbientDrone = () => {
    if (!ambientSoundOn) return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      stopAmbientDrone();

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = "sine";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(216, ctx.currentTime); // Root Om octave
      osc2.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz harmonic

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      droneGainRef.current = gain;
      droneOsc1Ref.current = osc1;
      droneOsc2Ref.current = osc2;
    } catch {
      // ignore
    }
  };

  const stopAmbientDrone = () => {
    try {
      if (droneOsc1Ref.current) {
        droneOsc1Ref.current.stop();
        droneOsc1Ref.current.disconnect();
        droneOsc1Ref.current = null;
      }
      if (droneOsc2Ref.current) {
        droneOsc2Ref.current.stop();
        droneOsc2Ref.current.disconnect();
        droneOsc2Ref.current = null;
      }
      if (droneGainRef.current) {
        droneGainRef.current.disconnect();
        droneGainRef.current = null;
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientDrone();
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Meditation Countdown Effect
  useEffect(() => {
    if (!isMeditating) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsMeditating(false);
          stopAmbientDrone();
          ringSingingBowl();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMeditating]);

  // Breathing Cycle Guide (14-second cycle: 4s Inhale, 4s Hold, 6s Exhale)
  useEffect(() => {
    if (!isMeditating && !threeBreathActive) return;
    let tick = 0;
    const interval = setInterval(() => {
      tick = (tick + 1) % 14;
      if (tick < 4) setBreathPhase("Inhale (4s)");
      else if (tick < 8) setBreathPhase("Hold Softly (4s)");
      else setBreathPhase("Exhale Slowly (6s)");
    }, 1000);
    return () => clearInterval(interval);
  }, [isMeditating, threeBreathActive]);

  // Hourly 3-Breath Bell Reminder Interval
  useEffect(() => {
    if (!hourlyBellEnabled) return;
    const hourlyTimer = setInterval(() => {
      ringSingingBowl();
      setThreeBreathActive(true);
      setBreathCount(1);
    }, 60 * 60 * 1000);
    return () => clearInterval(hourlyTimer);
  }, [hourlyBellEnabled]);

  const handleToggleMeditation = () => {
    if (isMeditating) {
      setIsMeditating(false);
      stopAmbientDrone();
    } else {
      if (secondsLeft === 0) setSecondsLeft(durationMins * 60);
      ringSingingBowl();
      if (ambientSoundOn) startAmbientDrone();
      setIsMeditating(true);
    }
  };

  const handleSelectDuration = (mins: number) => {
    setIsMeditating(false);
    stopAmbientDrone();
    setDurationMins(mins);
    setSecondsLeft(mins * 60);
  };

  const handleStartThreeBreathsNow = () => {
    ringSingingBowl();
    setThreeBreathActive(true);
    setBreathCount(1);
  };

  const handlePlayVoiceNote = (rec: CustomRecording) => {
    if (rec.url && rec.url.startsWith("http")) {
      window.open(rec.url, "_blank", "noopener,noreferrer");
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (playingVoiceId === rec.id) {
        window.speechSynthesis.cancel();
        setPlayingVoiceId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        rec.transcript || rec.title
      );
      utterance.rate = 0.88;
      utterance.pitch = 1.02;
      utterance.onend = () => setPlayingVoiceId(null);
      setPlayingVoiceId(rec.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[22px] items-stretch">
        {/* Left 7 Cols: 15-Minute Quiet Mind Meditation Timer & 432Hz Ambient Player */}
        <div className="lg:col-span-7 rounded-[28px] bg-[#2C1A26] text-white p-[24px] sm:p-[34px] border border-[#E7B85A]/45 shadow-lg flex flex-col justify-between gap-[22px]">
          <div className="flex flex-wrap items-center justify-between gap-[12px]">
            <div className="flex flex-col gap-[4px]">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#E7B85A]">
                Session 4 · Daily Quiet Mind Practice
              </span>
              <h2 className="m-0 font-playfair text-[26px] sm:text-[32px] font-medium text-white">
                Guided Meditation &amp; 432Hz Sanctuary
              </h2>
            </div>

            {/* Duration Presets */}
            <div className="flex items-center gap-[6px]">
              {[5, 10, 15].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => handleSelectDuration(mins)}
                  className={`rounded-full px-[14px] py-[6px] font-sans text-[12px] font-semibold cursor-pointer transition-all ${
                    durationMins === mins
                      ? "bg-[#E7B85A] text-[#2C1A26]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {mins} Min
                </button>
              ))}
            </div>
          </div>

          {/* Center Breathing Lotus Circle + Countdown */}
          <div className="my-[8px] flex flex-col items-center justify-center text-center gap-[14px]">
            <div
              className={`relative flex h-[180px] w-[180px] sm:h-[200px] sm:w-[200px] flex-col items-center justify-center rounded-full border-2 border-[#E7B85A] bg-white/10 shadow-[0_0_50px_rgba(231,184,90,0.22)] transition-transform duration-1000 ${
                isMeditating && breathPhase === "Inhale (4s)"
                  ? "scale-105"
                  : isMeditating && breathPhase === "Exhale Slowly (6s)"
                  ? "scale-95"
                  : "scale-100"
              }`}
            >
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#E7B85A]">
                {isMeditating ? breathPhase : "Quiet the Mind"}
              </span>
              <span className="font-sans text-[42px] sm:text-[48px] font-bold tracking-[0.04em] text-white mt-[4px]">
                {mm}:{ss}
              </span>
              <span className="font-sans text-[11px] text-white/75 mt-[4px]">
                {ambientSoundOn ? "432Hz Om Drone On" : "Silent Bell Mode"}
              </span>
            </div>

            <p className="m-0 max-w-[480px] font-sans text-[14px] leading-[1.6] text-white/85">
              Sit comfortably, soften your shoulders, and allow thoughts to pass
              without resistance. A Tibetan singing bowl chimes gently at the
              beginning and completion.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-[12px]">
            <button
              type="button"
              onClick={handleToggleMeditation}
              className="btn-3d-maroon min-h-[48px] rounded-full px-[28px] py-[12px] font-sans text-[14px] font-semibold text-white cursor-pointer"
            >
              {isMeditating
                ? "Pause Meditation"
                : `Start ${durationMins}-Minute Meditation`}
            </button>

            <button
              type="button"
              onClick={ringSingingBowl}
              className="min-h-[48px] rounded-full border border-[#E7B85A]/60 bg-white/10 px-[20px] py-[12px] font-sans text-[13px] font-semibold text-[#E7B85A] hover:bg-white/20 cursor-pointer transition-colors"
            >
              🔔 Ring Singing Bowl
            </button>

            <button
              type="button"
              onClick={() => {
                const next = !ambientSoundOn;
                setAmbientSoundOn(next);
                if (!next) stopAmbientDrone();
              }}
              className="min-h-[48px] rounded-full border border-white/25 bg-white/5 px-[18px] py-[12px] font-sans text-[12px] font-medium text-white/90 hover:bg-white/15 cursor-pointer transition-colors"
            >
              {ambientSoundOn ? "🔊 432Hz Ambient: ON" : "🔇 432Hz Ambient: OFF"}
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Hourly 3-Breath Bell Reminder */}
        <div className="lg:col-span-5 rounded-[28px] bg-lavender border border-lavender-border p-[24px] sm:p-[30px] shadow-sm flex flex-col justify-between gap-[18px]">
          <div className="flex flex-col gap-[8px]">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-lavender-deep">
              Hourly Conscious Breathwork
            </span>
            <h3 className="m-0 font-playfair text-[24px] sm:text-[28px] font-medium text-ink">
              Hourly 3-Breath Bell Reminder
            </h3>
            <p className="m-0 font-sans text-[14px] leading-[1.6] text-body">
              In Session 4, Ambika teaches taking{" "}
              <strong>3 conscious breaths every hour</strong> to return to your
              body and check your emotional alignment. Enable the hourly chime
              while your portal tab is open, or practise 3 breaths right now.
            </p>
          </div>

          {/* Toggle Hourly Bell */}
          <div className="rounded-[20px] bg-white border border-lavender-border p-[18px] flex items-center justify-between gap-[12px]">
            <div className="flex flex-col">
              <span className="font-sans text-[14px] font-bold text-ink">
                Hourly Singing Bowl Chime
              </span>
              <span className="font-sans text-[12px] text-muted">
                {hourlyBellEnabled
                  ? "Active · Rings gently every 60 minutes"
                  : "Currently paused"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !hourlyBellEnabled;
                setHourlyBellEnabled(next);
                if (next) ringSingingBowl();
                try {
                  localStorage.setItem("aham_hourly_bell", String(next));
                } catch {
                  // ignore
                }
              }}
              className={`rounded-full px-[18px] py-[9px] font-sans text-[12px] font-bold cursor-pointer transition-all ${
                hourlyBellEnabled
                  ? "bg-maroon text-white"
                  : "bg-beige-card text-ink border border-beige-border"
              }`}
            >
              {hourlyBellEnabled ? "✓ Enabled" : "Turn On Hourly Bell"}
            </button>
          </div>

          {/* Interactive 3-Breath Pacer */}
          <div className="rounded-[20px] bg-beige-card/80 border border-beige-border p-[18px] flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-maroon">
                Take 3 Conscious Breaths Now
              </span>
              {threeBreathActive && (
                <span className="rounded-full bg-maroon px-[10px] py-[2px] font-sans text-[11px] font-bold text-white">
                  Breath {breathCount} of 3 · {breathPhase}
                </span>
              )}
            </div>

            {threeBreathActive ? (
              <div className="flex flex-col gap-[10px]">
                <p className="m-0 font-sans text-[14px] font-medium text-ink">
                  {breathPhase} — Soften your jaw, drop your shoulders, and feel
                  appreciation for this moment.
                </p>
                <div className="flex items-center gap-[10px]">
                  {breathCount < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        ringSingingBowl();
                        setBreathCount(breathCount + 1);
                      }}
                      className="btn-3d-maroon rounded-full px-[18px] py-[8px] font-sans text-[12px] font-semibold text-white cursor-pointer"
                    >
                      Next Conscious Breath ({breathCount + 1}/3) →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        ringSingingBowl();
                        setThreeBreathActive(false);
                      }}
                      className="btn-3d-maroon rounded-full px-[18px] py-[8px] font-sans text-[12px] font-semibold text-white cursor-pointer"
                    >
                      ✓ Complete 3-Breath Reset
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartThreeBreathsNow}
                className="btn-3d-maroon w-full min-h-[46px] rounded-full px-[20px] py-[11px] font-sans text-[13px] font-semibold text-white cursor-pointer"
              >
                Start 1-Minute 3-Breath Alignment Reset ✦
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Ambika's Guided Voice Notes & Session Recordings */}
      <div className="rounded-[26px] bg-beige-card/85 border border-beige-border p-[22px] sm:p-[28px] flex flex-col gap-[16px]">
        <div className="flex flex-wrap items-center justify-between gap-[12px]">
          <div>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-maroon">
              Voice Notes &amp; Session Recordings
            </span>
            <h3 className="m-0 font-playfair text-[24px] font-medium text-ink">
              Ambika’s Audio Guides &amp; Personal Session Recaps
            </h3>
          </div>
          <span className="font-sans text-[12px] text-muted">
            Synced with your 1-to-1 journey
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px]">
          {recordings.map((rec) => {
            const isPlaying = playingVoiceId === rec.id;
            return (
              <div
                key={rec.id}
                className="rounded-[20px] bg-white border border-beige-border p-[18px] flex flex-col justify-between gap-[12px] shadow-sm"
              >
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center justify-between gap-[8px]">
                    <span className="rounded-full bg-lavender px-[10px] py-[3px] font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-lavender-deep">
                      {rec.session}
                    </span>
                    <span className="font-sans text-[11px] text-muted">
                      {rec.addedAt}
                    </span>
                  </div>
                  <h4 className="m-0 font-playfair text-[18px] font-medium text-ink">
                    {rec.title}
                  </h4>
                  {rec.transcript && (
                    <p className="m-0 font-sans text-[12px] leading-[1.55] text-body">
                      “{rec.transcript}”
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handlePlayVoiceNote(rec)}
                  className={`min-h-[42px] rounded-full px-[16px] py-[8px] font-sans text-[12px] font-semibold cursor-pointer transition-all ${
                    isPlaying
                      ? "bg-maroon text-white"
                      : "bg-beige-card text-maroon hover:bg-maroon hover:text-white border border-maroon/30"
                  }`}
                >
                  {isPlaying
                    ? "⏹ Stop Audio Guide"
                    : rec.url.startsWith("http")
                    ? "▶ Open Session Recording ↗"
                    : "▶ Listen to Voice Guide"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
