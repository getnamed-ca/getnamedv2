/**
 * The getnamed mark - square brackets with a blinking Named-Green caret.
 * Construction per Brand Guidelines v1.2 (120-unit grid).
 * Brackets are ink or bone only; green lives on the caret alone.
 */
export function Mark({
  size = 34,
  tone = "bone",
  blink = true,
}: {
  size?: number;
  tone?: "bone" | "ink";
  blink?: boolean;
}) {
  const stroke = tone === "bone" ? "#F4F4F2" : "#101114";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-label="getnamed mark" role="img">
      <path d="M46 24 H28 V96 H46" fill="none" stroke={stroke} strokeWidth="11" />
      <path d="M74 24 H92 V96 H74" fill="none" stroke={stroke} strokeWidth="11" />
      <rect className={blink ? "brand-blink" : undefined} x="55" y="38" width="10" height="44" rx="2" fill="#0F7A5A" />
    </svg>
  );
}

/** Wordmark: always lowercase, "named" carries Named Green. */
export function Wordmark({
  tone = "bone",
  className = "",
  style,
}: {
  tone?: "bone" | "ink";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`font-display font-bold ${className}`}
      style={{ color: tone === "bone" ? "#F4F4F2" : "#101114", letterSpacing: "-0.035em", ...style }}
    >
      get<span style={{ color: "#0F7A5A" }}>named</span>
    </span>
  );
}
