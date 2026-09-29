import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReviewForm } from "@/components/ReviewForm";
import { getApprovedReviews } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Seekers' words & Reviews",
  description:
    "Read words from fellow seekers or share your experience of 1-to-1 Law of Attraction coaching with Ambika.",
};

export default async function ReviewsPage() {
  const approvedReviews = await getApprovedReviews();
  const isProd = process.env.NODE_ENV === "production";

  return (
    <main className="mx-auto w-full max-w-[1440px] px-[16px] lg:px-[80px] pt-[24px] lg:pt-[56px]">
      <section className="mx-auto max-w-[1080px] flex flex-col gap-[14px] animate-fade-up">
        <Eyebrow>Seekers’ words</Eyebrow>
        <span className="font-cursive text-[30px] lg:text-[36px] leading-none text-maroon">
          Sacred reflections from the path
        </span>
        <h1 className="m-0 font-serif text-[38px] lg:text-[56px] font-normal leading-[1.06] text-ink">
          What <em className="italic text-maroon">changed</em> for them
        </h1>
        <p className="m-0 max-w-[600px] text-[16px] lg:text-[18px] font-light leading-[1.65] text-body">
          Every journey is personal. Read reflections from fellow seekers who
          walked the 5-week 1-to-1 path, or leave your own words below.
        </p>
      </section>

      {/* Approved Reviews Grid */}
      {approvedReviews.length > 0 ? (
        <section className="mx-auto mt-[36px] lg:mt-[56px] max-w-[1080px] grid grid-cols-1 md:grid-cols-2 gap-[24px] animate-fade-up">
          {approvedReviews.map((review, idx) => (
            <article
              key={review.id}
              className={`flex flex-col justify-between gap-[18px] rounded-[24px] p-[28px] lg:p-[32px] border shadow-soft ${
                idx % 2 === 0
                  ? "bg-lavender border-lavender-border"
                  : "bg-beige-card border-beige-border"
              }`}
            >
              <svg
                width="32"
                height="24"
                viewBox="0 0 36 28"
                fill="#E7B85A"
                aria-hidden="true"
              >
                <path d="M0 28V16C0 7 5 1.5 14 0l1.5 4C10 5.5 7.5 9 7.5 13H14v15H0zm20 0V16c0-9 5-14.5 14-16l1.5 4C30 5.5 27.5 9 27.5 13H34v15H20z" />
              </svg>
              <p className="m-0 font-serif text-[22px] leading-[1.4] text-body">
                {review.written_review}
              </p>
              <div className="flex items-center justify-between gap-[12px] border-t border-divider pt-[14px]">
                <span className="text-[14px] font-medium text-muted">
                  {review.name} ·{" "}
                  {review.course === "The whole path"
                    ? "The 5-Week 1-to-1 Course"
                    : review.course}
                </span>
                {review.video_url && (
                  <a
                    href={review.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/80 px-[12px] py-[6px] text-[12px] font-medium text-maroon no-underline"
                  >
                    ▶ Watch video
                  </a>
                )}
              </div>
            </article>
          ))}
        </section>
      ) : !isProd ? (
        <section className="mx-auto mt-[36px] lg:mt-[56px] max-w-[1080px] grid grid-cols-1 lg:grid-cols-12 gap-[24px] animate-fade-up">
          <div className="lg:col-span-7 flex flex-col gap-[18px] rounded-[24px] bg-lavender border border-lavender-border p-[32px]">
            <svg
              width="36"
              height="28"
              viewBox="0 0 36 28"
              fill="#E7B85A"
              aria-hidden="true"
            >
              <path d="M0 28V16C0 7 5 1.5 14 0l1.5 4C10 5.5 7.5 9 7.5 13H14v15H0zm20 0V16c0-9 5-14.5 14-16l1.5 4C30 5.5 27.5 9 27.5 13H34v15H20z" />
            </svg>
            <p className="m-0 font-serif text-[26px] leading-[1.35] text-body">
              [First seeker’s written review goes here — the Reviews page has
              none yet.]
            </p>
            <span className="text-[15px] text-muted">
              [Name] · The 5-Week 1-to-1 Course
            </span>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-[16px]">
            <div className="relative h-[180px] overflow-hidden rounded-[22px]">
              <Image
                src="/images/review-grateful.jpg"
                alt="A gratitude journal with a pen"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="h-full w-full object-cover"
              />
              <span className="absolute left-[16px] bottom-[16px] rounded-full bg-white px-[14px] py-[8px] text-[13px] font-medium text-ink">
                ▶ [Video review]
              </span>
            </div>
            <div className="flex flex-col justify-between rounded-[22px] bg-beige-card border border-beige-border p-[24px]">
              <span className="text-[16px] leading-[1.5] text-body">
                “[Short written review]”
              </span>
              <span className="text-[14px] text-muted">
                [Name] · The 5-Week 1-to-1 Course
              </span>
            </div>
          </div>
        </section>
      ) : null}

      {/* Leave a Review Form Section */}
      <section
        id="leave-review"
        className="mx-auto mt-[56px] lg:mt-[88px] max-w-[840px] flex flex-col gap-[24px] animate-fade-up"
      >
        <div className="flex flex-col gap-[10px]">
          <Eyebrow>Share your journey</Eyebrow>
          <h2 className="m-0 font-serif text-[32px] lg:text-[44px] font-normal leading-[1.1] text-ink">
            Leave a review
          </h2>
          <p className="m-0 text-[16px] text-body">
            Walked the 5-week path with Ambika? Share your reflection in words or
            link a short video.
          </p>
        </div>

        <ReviewForm />
      </section>
    </main>
  );
}
