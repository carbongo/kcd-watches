import { useEffect } from "react";
import type { ReactNode } from "react";

import { ACTION_CONTROL_CLASS_NAME, ActionButton } from "./ActionButton";
import { ActionMenu } from "./ActionMenu";
import { ActionShortcutKey } from "./ActionShortcutKey";

interface BaseActionProps {
  label: ReactNode;
}

interface ActionLinkProps extends BaseActionProps {
  href: string;
  shortcutKey?: string;
}

interface ActionMenuProps extends BaseActionProps {
  children: ReactNode;
  isOpen: boolean;
  menuId: string;
  shortcutKey?: string;
  onClick: () => void;
}

export type ActionProps = ActionLinkProps | ActionMenuProps;

export function Action(props: ActionProps) {
  const href = "href" in props ? props.href : undefined;
  const onClick = "onClick" in props ? props.onClick : undefined;
  const { shortcutKey } = props;
  const shortcutLabel = props.shortcutKey?.toUpperCase();

  useEffect(() => {
    if (!shortcutKey) {
      return;
    }

    const normalizedShortcutKey = shortcutKey.toLowerCase();

    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.key.toLowerCase() !== normalizedShortcutKey ||
        isEditableElement(event.target)
      ) {
        return;
      }

      event.preventDefault();

      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      onClick?.();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [href, onClick, shortcutKey]);

  if ("href" in props) {
    return (
      <a
        className={ACTION_CONTROL_CLASS_NAME}
        href={props.href}
        rel="noreferrer"
        target="_blank"
        aria-keyshortcuts={shortcutLabel}
      >
        {props.label}
        {shortcutLabel ? (
          <ActionShortcutKey>{shortcutLabel}</ActionShortcutKey>
        ) : null}
      </a>
    );
  }

  return (
    <div className="flex flex-col items-end">
      {props.isOpen ? (
        <ActionMenu id={props.menuId}>{props.children}</ActionMenu>
      ) : null}
      <ActionButton
        controls={props.menuId}
        isOpen={props.isOpen}
        shortcutKey={props.shortcutKey}
        onClick={props.onClick}
      >
        {props.label}
      </ActionButton>
    </div>
  );
}

function isEditableElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.matches("input, select, textarea, [role='textbox']")
  );
}
