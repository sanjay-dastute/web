import { useId } from "react";
import { LOCKUP_MARK_PATH, LOCKUP_VIEWBOX, LOCKUP_WORD_PATH, MARK_PATH, MARK_VIEWBOX } from "@/lib/logo";

/** Full lock-up: red hexagon mark + wordmark in the current text colour. */
export function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox={LOCKUP_VIEWBOX} className={className} role="img" aria-label="Creatoos">
      <path d={LOCKUP_MARK_PATH} fill="var(--color-brand)" fillRule="evenodd" />
      <path d={LOCKUP_WORD_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** Hexagon mark on its own; `gradient` fills it with the logo gradient instead of flat red. */
export function LogoMark({ className = "h-8 w-auto", gradient = false }: { className?: string; gradient?: boolean }) {
  const id = useId();
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden>
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff4a4a" />
            <stop offset="55%" stopColor="#ff214f" />
            <stop offset="100%" stopColor="#d6103c" />
          </linearGradient>
        </defs>
      )}
      <path d={MARK_PATH} fill={gradient ? `url(#${id})` : "var(--color-brand)"} fillRule="evenodd" />
    </svg>
  );
}
