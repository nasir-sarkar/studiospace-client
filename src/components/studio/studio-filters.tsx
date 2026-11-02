"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studioCategories } from "@/lib/constants";

const categoryItems = [
  { value: "all", label: "All Categories" },
  ...studioCategories.map((item) => ({ value: item.value, label: item.value })),
];

const sortItems = [
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Top Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export function StudioFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [maxRate, setMaxRate] = useState(params.get("maxRate") ?? "");

  const update = useCallback(
    (values: Record<string, string>) => {
      const next = new URLSearchParams(params.toString());
      Object.entries(values).forEach(([key, value]) => {
        if (value && value !== "all") {
          next.set(key, value);
        } else {
          next.delete(key);
        }
      });
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = {
        search: params.get("search") ?? "",
        maxRate: params.get("maxRate") ?? "",
      };
      if (search !== current.search || maxRate !== current.maxRate) {
        update({ search, maxRate });
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [search, maxRate, params, update]);

  const hasFilters = Array.from(params.keys()).length > 0;

  const clearFilters = () => {
    setSearch("");
    setMaxRate("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by studio name or city"
          aria-label="Search studios"
          className="h-10 pl-9"
        />
      </div>

      <Select
        value={params.get("category") ?? "all"}
        items={categoryItems}
        onValueChange={(value) => update({ category: value ?? "all" })}
      >
        <SelectTrigger className="h-10 w-full" aria-label="Filter by category">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categoryItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={params.get("sort") ?? "newest"}
        items={sortItems}
        onValueChange={(value) => update({ sort: value ?? "newest" })}
      >
        <SelectTrigger className="h-10 w-full" aria-label="Sort studios">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        min="0"
        value={maxRate}
        onChange={(event) => setMaxRate(event.target.value)}
        placeholder="Max rate ($ / hr)"
        aria-label="Maximum hourly rate"
        className="h-10"
      />

      <Button
        type="button"
        variant="outline"
        onClick={clearFilters}
        disabled={!hasFilters && !search && !maxRate}
      >
        <X data-icon="inline-start" />
        Clear
      </Button>
    </div>
  );
}
