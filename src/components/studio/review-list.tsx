import { MessageSquareText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { IReview } from "@/lib/types/studio";
import { RatingBadge } from "./rating-badge";

export function ReviewList({ reviews }: { reviews: IReview[] }) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed border-border px-6 py-10 text-center">
        <MessageSquareText className="size-8 text-muted-foreground" />
        <p className="mt-3 font-semibold text-foreground">No reviews yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Be the first creator to share how this space worked for you.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4">
      {reviews.map((review) => (
        <li key={review._id} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={review.userImage} alt={review.userName} referrerPolicy="no-referrer" />
                <AvatarFallback>{review.userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{review.userName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <RatingBadge rating={review.rating} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
