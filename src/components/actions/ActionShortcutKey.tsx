export interface ActionShortcutKeyProps {
  children: string;
}

export function ActionShortcutKey({ children }: ActionShortcutKeyProps) {
  return (
    <kbd
      className="font-serif h-8 md:h-9 w-6 md:w-8 rounded-xs border-b-4 md:border-b-8 border-stone-400 bg-stone-300 pl-0.5 text-center text-xs md:text-sm font-bold leading-7 text-stone-950 text-shadow-md text-shadow-stone-250/50 outline-1 outline-stone-500"
      aria-label={`${children} key`}
    >
      {children}
    </kbd>
  );
}
