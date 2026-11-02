"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApiData<T>(path: string | null) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!path) {
      return;
    }

    let active = true;

    apiFetch<T>(path)
      .then((data) => {
        if (active) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error: Error) => {
        if (active) {
          setState({ data: null, loading: false, error: error.message });
        }
      });

    return () => {
      active = false;
    };
  }, [path, version]);

  const reload = useCallback(() => setVersion((current) => current + 1), []);

  const setData = useCallback(
    (updater: (current: T | null) => T | null) =>
      setState((current) => ({ ...current, data: updater(current.data) })),
    [],
  );

  return { ...state, reload, setData };
}
