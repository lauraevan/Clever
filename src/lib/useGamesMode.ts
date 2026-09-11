import { useCallback, useState } from "react";

const STORAGE_KEY = "clever.study-hall";
/** Access code for Study Hall. */
const ACCESS_CODE = "1212";

/**
 * Study Hall state.
 *
 * The code is checked in the browser, so it keeps the portal tidy rather than
 * keeping anybody out — anyone reading the page source can find it. It is a
 * switch, not a lock.
 */
export function useGamesMode() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "open";
    } catch {
      return false;
    }
  });

  const persist = (open: boolean) => {
    try {
      if (open) window.localStorage.setItem(STORAGE_KEY, "open");
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Blocked site data just means it won't survive a reload.
    }
  };

  /** Returns false when the code was wrong, so the form can say so. */
  const unlock = useCallback((code: string) => {
    if (code.trim() !== ACCESS_CODE) return false;
    setUnlocked(true);
    persist(true);
    return true;
  }, []);

  const lock = useCallback(() => {
    setUnlocked(false);
    persist(false);
  }, []);

  return { unlocked, unlock, lock };
}
