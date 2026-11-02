import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyStudios() {
  return (
    <Empty className="border py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle className="text-xl font-semibold">No studios match your search</EmptyTitle>
        <EmptyDescription>
          Try a different keyword, another category or a higher hourly budget. You
          can also list your own space and be the first to host here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center">
        <Button render={<Link href="/studios" />} nativeButton={false}>
          Clear Filters
        </Button>
        <Button render={<Link href="/add-studio" />} nativeButton={false} variant="outline">
          Host Your Space
        </Button>
      </EmptyContent>
    </Empty>
  );
}
