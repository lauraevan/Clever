import { useCallback, useEffect, useState } from "react";

/**
 * A value kept in this browser between visits. Reads and writes are guarded,
 * because private windows and blocked site data both throw.
 */
export function useStoredValue<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return fallback;
      const parsed: unknown = JSON.parse(stored);
      return isValid(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Persistence is a convenience; the UI still works without it.
    }
  }, [key, value]);

  const update = useCallback((next: T) => setValue(next), []);

  return [value, update];
}
