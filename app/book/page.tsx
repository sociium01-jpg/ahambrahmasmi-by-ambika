import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BookingFlow } from "@/components/BookingFlow";

export const metadata: Metadata = {
  title: "Book your path",
  description:
    "Book your 1-to-1 Law of Attraction coaching path with Ambika Mohan.",
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream font-serif text-[24px] text-ink">
          Preparing your path…
        </div>
      }
    >
      <BookingFlow />
    </Suspense>
  );
}
