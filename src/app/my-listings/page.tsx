import Link from "next/link";
import type { Metadata } from "next";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyListingsView } from "@/components/studio/my-listings-view";

export const metadata: Metadata = {
  title: "My Studio Listings",
};

export default function MyListingsPage() {
  return (
    <main className="section-space">
      <div className="page-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Host Tools</p>
            <h1 className="section-title mt-2">My studio listings</h1>
            <p className="section-subtitle">
              Update rates, refresh photos or remove spaces you no longer
              want to host.
            </p>
          </div>
          <Button render={<Link href="/add-studio" />} nativeButton={false}>
            <PlusCircle data-icon="inline-start" />
            Add New Studio
          </Button>
        </div>
        <MyListingsView />
      </div>
    </main>
  );
}
