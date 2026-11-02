import type { Metadata } from "next";
import { EditStudioView } from "@/components/studio/edit-studio-view";

export const metadata: Metadata = {
  title: "Update Studio",
};

export default async function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="section-space">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <p className="eyebrow">Manage Listing</p>
        <h1 className="section-title mt-2">Update your studio</h1>
        <p className="section-subtitle">
          Keep your rates, photos and amenities current so creators always see
          accurate details.
        </p>
        <div className="mt-10">
          <EditStudioView studioId={id} />
        </div>
      </div>
    </main>
  );
}
