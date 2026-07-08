import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { loadSave, persistSave, touchDayStreak, type SaveData } from "./storage";
import { checkBadges, type Badge } from "./achievements";
import { levelFor } from "./xp";
import { playLevelUp } from "./sound";

interface GameCtx {
  save: SaveData;
  /** Aplica una mutación al save, actualiza racha diaria, badges y persiste. */
  update: (fn: (s: SaveData) => SaveData) => void;
  newBadges: Badge[];
  clearNewBadges: () => void;
}

const Ctx = createContext<GameCtx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [save, setSave] = useState<SaveData>(() => loadSave());
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  const update = useCallback((fn: (s: SaveData) => SaveData) => {
    setSave(prev => {
      const prevLevel = levelFor(prev.xp);
      let next = fn(prev);
      next = touchDayStreak(next);
      const { newBadges: earned, badges } = checkBadges(next);
      next = { ...next, badges };
      if (earned.length) setNewBadges(b => [...b, ...earned]);
      if (levelFor(next.xp).minXp > prevLevel.minXp) playLevelUp(next.soundOn);
      persistSave(next);
      return next;
    });
  }, []);

  const clearNewBadges = useCallback(() => setNewBadges([]), []);

  return <Ctx.Provider value={{ save, update, newBadges, clearNewBadges }}>{children}</Ctx.Provider>;
}

export function useGame(): GameCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useGame fuera de GameProvider");
  return ctx;
}
