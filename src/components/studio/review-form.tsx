"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/components/providers/session-provider";
import { apiFetch } from "@/lib/api";

export function ReviewForm({ studioId, ownerEmail }: { studioId: string; ownerEmail: string }) {
  const router = useRouter();
  const { user } = useSession();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <p className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
        <Link
          href={`/login?redirect=/studios/${studioId}`}
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>{" "}
        to share your experience with this studio.
      </p>
    );
  }

  if (user.email === ownerEmail) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating) {
      toast.error("Please select a star rating first.");
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch(`/studios/${studioId}/reviews`, {
        method: "POST",
        body: JSON.stringify({ rating, comment }),
      });
      toast.success("Thanks for your review.");
      setRating(0);
      setComment("");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-5">
      <p className="font-semibold text-foreground">Leave a review</p>
      <div className="mt-3 flex gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} star${value > 1 ? "s" : ""}`}
            onClick={() => setRating(value)}
          >
            <Star
              className={cn(
                "size-7 transition-colors",
                value <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/50",
              )}
            />
          </button>
        ))}
      </div>
      <Textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="What did you shoot, record or teach here? How was the space and the host?"
        className="mt-4 min-h-24"
        required
      />
      <Button type="submit" className="mt-4" disabled={submitting}>
        {submitting && <Spinner />}
        Submit Review
      </Button>
    </form>
  );
}
