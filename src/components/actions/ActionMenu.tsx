import type { ReactNode } from "react";

export interface ActionMenuProps {
  children: ReactNode;
  id: string;
}

export function ActionMenu({ children, id }: ActionMenuProps) {
  return (
    <div
      id={id}
      className="mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded bg-stone-700/90 p-3 shadow-2xl backdrop-blur"
    >
      {children}
    </div>
  );
}
