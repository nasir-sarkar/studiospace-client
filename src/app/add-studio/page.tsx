import type { Metadata } from "next";
import { StudioForm } from "@/components/studio/studio-form";

export const metadata: Metadata = {
  title: "Add New Studio",
};

export default function AddStudioPage() {
  return (
    <main className="section-space">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <p className="eyebrow">Host A Space</p>
        <h1 className="section-title mt-2">Add a new studio</h1>
        <p className="section-subtitle">
          Share your space with the creative community. Add clear photos, fair
          pricing and the amenities creators care about.
        </p>
        <div className="mt-10">
          <StudioForm mode="add" />
        </div>
      </div>
    </main>
  );
}
