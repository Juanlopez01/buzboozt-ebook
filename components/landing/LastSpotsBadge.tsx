export default function LastSpotsBadge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold ${className}`}
    >
      Últimos cupos a este precio
    </span>
  );
}
