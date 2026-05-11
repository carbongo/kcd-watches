import type { ReactNode } from "react";

import { ActionShortcutKey } from "./ActionShortcutKey";

export const ACTION_CONTROL_CLASS_NAME =
  "font-serif flex items-center gap-4 rounded px-3 py-2 text-sm md:text-xl text-stone-100 text-shadow-md text-shadow-stone-950/50 backdrop-blur transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-stone-400/70";

export interface ActionButtonProps {
  children: ReactNode;
  controls: string;
  isOpen: boolean;
  shortcutKey?: string;
  onClick: () => void;
}

export function ActionButton({
  children,
  controls,
  isOpen,
  shortcutKey,
  onClick,
}: ActionButtonProps) {
  const shortcutLabel = shortcutKey?.toUpperCase();

  return (
    <button
      type="button"
      className={ACTION_CONTROL_CLASS_NAME}
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-keyshortcuts={shortcutLabel}
      onClick={onClick}
    >
      {children}
      {shortcutLabel ? (
        <ActionShortcutKey>{shortcutLabel}</ActionShortcutKey>
      ) : null}
    </button>
  );
}
