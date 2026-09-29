import React from "react";
import type { Metadata } from "next";
import { InvestmentAndGuidelines } from "@/components/InvestmentAndGuidelines";

export const metadata: Metadata = {
  title: "Investment & Programme Guidelines",
  description:
    "1 to 1 LOA Coaching Investment: The 5-week course (Rs. 15,000/- introductory price), further sessions (1 hour Rs. 2,000/-, 30 minutes Rs. 1,000/-), and important programme guidelines.",
};

export default function InvestmentPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-[14px] sm:px-[24px] lg:px-[80px] pt-[20px] lg:pt-[48px] pb-[40px]">
      <InvestmentAndGuidelines showLogoHeader={true} />
    </main>
  );
}
