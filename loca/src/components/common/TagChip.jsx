export function TagChip({ children, active = false, compact = false }) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-4 py-2 text-xs"
      } ${
        active ? "bg-[var(--brand)] text-white" : "bg-zinc-100 text-zinc-600"
      }`}
    >
      {children}
    </span>
  );
}
