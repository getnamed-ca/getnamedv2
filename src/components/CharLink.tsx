import { useState } from "react";

/**
 * CharLink - navigation text with character-level hover stagger.
 * Each letter lifts independently, top copy rolling up and a twin
 * rolling in beneath - the reference move, adapted to brand type.
 */
export default function CharLink({
  text,
  className = "",
  onClick,
  href,
}: {
  text: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
}) {
  const [hover, setHover] = useState(false);
  const letters = text.split("");

  const inner = (
    <span
      className={`relative inline-block overflow-hidden align-middle ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="flex" aria-hidden="true">
        {letters.map((ch, i) => (
          <span key={i} className="relative inline-block" style={{ height: "1.25em", overflow: "hidden" }}>
            <span
              className="block"
              style={{
                transform: hover ? "translateY(-1.25em)" : "translateY(0)",
                transition: `transform 0.34s cubic-bezier(0.65,0,0.35,1) ${i * 22}ms`,
              }}
            >
              <span className="block" style={{ height: "1.25em", lineHeight: "1.25em" }}>
                {ch === " " ? "\u00A0" : ch}
              </span>
              <span className="block" style={{ height: "1.25em", lineHeight: "1.25em", color: "var(--acc-bright)" }}>
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent border-0 p-0">
      {inner}
    </button>
  );
}
