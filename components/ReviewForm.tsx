"use client";

import React, { useState } from "react";

const COURSE_VALUE = "The whole path" as const;

export function ReviewForm() {
  const [name, setName] = useState("");
  const [writtenReview, setWrittenReview] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoName(null);
      setPhotoDataUrl(null);
      return;
    }
    setPhotoName(file.name);
    if (file.size <= 350 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotoDataUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFileName(null);
      return;
    }
    setVideoFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          course: COURSE_VALUE,
          written_review: writtenReview.trim(),
          photo_url: photoDataUrl || photoName || null,
          video_url: videoUrl.trim() || videoFileName || null,
          website_hp: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not submit your review.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      setSubmitting(false);
    } catch {
      setError("Network error while submitting your review. Please try again.");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-[14px] rounded-[24px] bg-lavender border border-lavender-border p-[28px] lg:p-[36px]">
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gold text-ink">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12l5 5 9-10" />
          </svg>
        </span>
        <h3 className="m-0 font-serif text-[28px] font-normal text-ink">
          Thank you for sharing your words.
        </h3>
        <p className="m-0 text-[16px] leading-[1.6] text-body">
          Your review has been saved for Ambika’s approval and will appear on
          this page once published.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setWrittenReview("");
            setVideoUrl("");
            setPhotoName(null);
            setPhotoDataUrl(null);
            setVideoFileName(null);
          }}
          className="min-h-[44px] rounded-full border-[1.5px] border-maroon px-[22px] py-[10px] text-[14px] font-medium text-maroon hover:bg-maroon hover:text-white cursor-pointer transition-colors"
        >
          Submit another review
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[20px] rounded-[28px] bg-lavender-soft/80 p-[24px] sm:p-[36px] lg:p-[48px] border border-lavender-border shadow-soft"
    >
      {/* Hidden Honeypot Field for Spam Protection */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name="website_hp"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
          <span>Your name</span>
          <input
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-[52px] rounded-[12px] border border-lavender-border bg-white px-[16px] text-[16px] font-normal text-ink"
          />
        </label>

        <div className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
          <span>Programme</span>
          <div className="flex h-[52px] items-center justify-between rounded-[12px] border border-beige-border bg-beige-card px-[16px] text-[15px] font-medium text-ink">
            <span>The 5-Week 1-to-1 Course</span>
            <span className="text-[12px] uppercase tracking-[1.2px] text-maroon">
              1 to 1 · LOA
            </span>
          </div>
        </div>
      </div>

      <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
        <span>Your written review</span>
        <textarea
          required
          minLength={10}
          rows={4}
          placeholder="What shifted or opened up for you on this journey?"
          value={writtenReview}
          onChange={(e) => setWrittenReview(e.target.value)}
          className="resize-y rounded-[12px] border border-lavender-border bg-white px-[16px] py-[14px] text-[16px] font-normal text-ink"
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
        <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
          <span>
            Optional photo{" "}
            <span className="font-normal text-muted">(JPG or PNG)</span>
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="flex min-h-[52px] w-full items-center rounded-[12px] border border-lavender-border bg-white px-[14px] py-[10px] text-[14px] font-normal text-body file:mr-[12px] file:rounded-full file:border-0 file:bg-beige-card file:px-[14px] file:py-[6px] file:text-[13px] file:font-medium file:text-ink"
          />
        </label>

        <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
          <span>
            YouTube / Instagram link{" "}
            <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            type="url"
            placeholder="https://youtube.com/... or https://instagram.com/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="h-[52px] rounded-[12px] border border-lavender-border bg-white px-[16px] text-[16px] font-normal text-ink"
          />
        </label>
      </div>

      <label className="flex flex-col gap-[8px] text-[14px] font-medium text-ink">
        <span>
          Or upload a short video{" "}
          <span className="font-normal text-muted">(optional, MP4/MOV)</span>
        </span>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoFileChange}
          className="flex min-h-[52px] w-full items-center rounded-[12px] border border-lavender-border bg-white px-[14px] py-[10px] text-[14px] font-normal text-body file:mr-[12px] file:rounded-full file:border-0 file:bg-beige-card file:px-[14px] file:py-[6px] file:text-[13px] file:font-medium file:text-ink"
        />
      </label>

      {error && (
        <p role="alert" className="m-0 text-[14px] font-medium text-maroon">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-[16px] pt-[4px]">
        <span className="text-[13px] text-muted">
          Reviews are published after Ambika’s approval.
        </span>
        <button
          type="submit"
          disabled={submitting}
          className="btn-3d-maroon min-h-[52px] rounded-full bg-maroon px-[32px] py-[16px] font-sans text-[16px] font-medium text-white hover:bg-maroon-dark cursor-pointer transition-colors disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Submit review"}
        </button>
      </div>
    </form>
  );
}
