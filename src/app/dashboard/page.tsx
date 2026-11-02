import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <main className="section-space">
      <div className="page-container">
        <p className="eyebrow">Overview</p>
        <h1 className="section-title mt-2">Your dashboard</h1>
        <p className="section-subtitle">
          Manage host requests, track earnings and revisit the studios you saved.
        </p>
        <div className="mt-10">
          <DashboardView />
        </div>
      </div>
    </main>
  );
}
