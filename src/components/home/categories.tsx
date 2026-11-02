import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { studioCategories } from "@/lib/constants";

export function Categories() {
  return (
    <section aria-labelledby="categories-heading" className="section-space bg-secondary/60">
      <div className="page-container">
        <div className="text-center">
          <p className="eyebrow">Browse By Category</p>
          <h2 id="categories-heading" className="section-title mt-2">
            Find the right room for your craft
          </h2>
          <p className="section-subtitle mx-auto">
            Pick a category and jump straight into spaces built for that kind
            of work.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {studioCategories.map((category) => (
            <Link
              key={category.value}
              href={`/studios?category=${encodeURIComponent(category.value)}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <category.icon className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {category.label}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Browse
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
