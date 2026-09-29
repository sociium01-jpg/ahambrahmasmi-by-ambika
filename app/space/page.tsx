import React from "react";
import type { Metadata } from "next";
import { SeekerPortal } from "@/components/SeekerPortal";

export const metadata: Metadata = {
  title: "Seeker & Student Portal — Login, Progress, Notes, PDFs & Certificate",
  description:
    "Sign in to your private Ahambrahmasmi Seeker Portal to witness your 5-week coaching progress, save personal notes, download course PDFs, leave a video or written review, and view your Certificate of Completion.",
};

export default function SeekerSpacePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-[14px] sm:px-[24px] lg:px-[80px] pt-[24px] lg:pt-[56px]">
      <SeekerPortal />
    </main>
  );
}
