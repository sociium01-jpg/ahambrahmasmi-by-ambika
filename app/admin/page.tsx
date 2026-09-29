import type { Metadata } from "next";
import { AdminPortal } from "@/components/AdminPortal";

export const metadata: Metadata = {
  title: "Ambika’s Coach Admin | Ahambrahmasmi by Ambika",
  description:
    "Coach sanctuary for Ambika Mohan to manage student progress, 1-to-1 schedules, custom session recordings, and seeker reviews.",
};

export default function AdminPage() {
  return (
    <div className="px-[16px] sm:px-[36px] lg:px-[56px] py-[28px] sm:py-[44px]">
      <AdminPortal />
    </div>
  );
}
