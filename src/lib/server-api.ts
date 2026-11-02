import type { IReview, IStudio } from "@/lib/types/studio";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface StudioFilters {
  search?: string;
  category?: string;
  sort?: string;
  maxRate?: string;
}

export const getStudios = async (
  filters: StudioFilters = {},
): Promise<IStudio[]> => {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  const res = await fetch(`${API_URL}/api/studios?${query.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to load studios");
  }
  return res.json();
};

export const getFeaturedStudios = async (): Promise<IStudio[]> => {
  const res = await fetch(`${API_URL}/api/studios/featured`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to load featured studios");
  }
  return res.json();
};

export const getStudio = async (id: string): Promise<IStudio | null> => {
  const res = await fetch(`${API_URL}/api/studios/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export const getReviews = async (id: string): Promise<IReview[]> => {
  const res = await fetch(`${API_URL}/api/studios/${id}/reviews`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
};
