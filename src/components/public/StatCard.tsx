type StatCardProps = {
  label: string;
  value: string | number;
  detail?: string;
};

export default function StatCard({
  label,
  value,
  detail,
}: StatCardProps) {
  return (
    <div className="public-stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </div>
  );
}
