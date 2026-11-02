import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, MapPin, ShieldCheck, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingModal } from "@/components/booking/booking-modal";
import { RatingBadge } from "@/components/studio/rating-badge";
import { ReviewForm } from "@/components/studio/review-form";
import { ReviewList } from "@/components/studio/review-list";
import { StudioGallery } from "@/components/studio/studio-gallery";
import { WishlistButton } from "@/components/studio/wishlist-button";
import { getReviews, getStudio } from "@/lib/server-api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const studio = await getStudio(id);
  return { title: studio ? studio.title : "Studio Not Found" };
}

export default async function StudioDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [studio, reviews] = await Promise.all([getStudio(id), getReviews(id)]);

  if (!studio) {
    notFound();
  }

  const gallery = studio.gallery?.length ? studio.gallery : [studio.imageUrl];

  return (
    <main className="section-space">
      <div className="page-container">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Explore Studios
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <StudioGallery images={gallery} title={studio.title} />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge>{studio.category}</Badge>
              <RatingBadge rating={studio.rating} count={studio.reviewCount} />
            </div>
            <h1 className="section-title mt-4">{studio.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {studio.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4" />
                Up to {studio.maxCapacity} people
              </span>
            </div>

            <h2 className="mt-10 text-2xl font-semibold text-foreground">Overview</h2>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">
              {studio.overview}
            </p>

            <h2 className="mt-10 text-2xl font-semibold text-foreground">Amenities</h2>
            {studio.amenities.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {studio.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground"
                  >
                    <Check className="size-4 shrink-0 text-primary" />
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-muted-foreground">
                The host has not listed amenities for this studio yet.
              </p>
            )}

            <h2 className="mt-10 text-2xl font-semibold text-foreground">Your Host</h2>
            <div className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <Avatar className="size-14">
                <AvatarImage
                  src={studio.ownerImage}
                  alt={studio.ownerName}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>{studio.ownerName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-lg font-semibold text-foreground">{studio.ownerName}</p>
                <p className="truncate text-sm text-muted-foreground">{studio.ownerEmail}</p>
              </div>
            </div>

            <h2 className="mt-10 text-2xl font-semibold text-foreground">
              Reviews ({reviews.length})
            </h2>
            <div className="mt-4 grid gap-6">
              <ReviewForm studioId={studio._id} ownerEmail={studio.ownerEmail} />
              <ReviewList reviews={reviews} />
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Hourly rate</p>
                <p className="mt-1 text-4xl font-bold text-foreground">
                  ${studio.hourlyRate}
                  <span className="text-base font-normal text-muted-foreground"> / hr</span>
                </p>
              </div>
              <WishlistButton studioId={studio._id} />
            </div>

            <dl className="mt-6 grid gap-3 border-t border-border pt-6 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Security deposit</dt>
                <dd className="font-semibold text-foreground">${studio.securityDeposit}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Max capacity</dt>
                <dd className="font-semibold text-foreground">{studio.maxCapacity} people</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-semibold text-foreground">{studio.category}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <BookingModal studio={studio} />
            </div>

            <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
              Confirmed slots are protected from double-booking and covered by
              the StudioSpace host guarantee.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
