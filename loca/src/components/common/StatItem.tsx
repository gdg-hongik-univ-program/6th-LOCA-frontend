type StatItemProps = {
  value: number;
  label: string;
};

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex-1 text-center">
      <div className="text-base font-extrabold text-[var(--text)]">{value}</div>
      <div className="mt-1 text-[11px] font-medium text-[var(--text-secondary)]">{label}</div>
    </div>
  );
}
