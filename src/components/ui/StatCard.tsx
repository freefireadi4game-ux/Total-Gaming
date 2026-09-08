interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
}

export default function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>

      <div className="stat-value">
        {value}
      </div>

      {description && (
        <div className="match-kills">
          {description}
        </div>
      )}
    </div>
  );
}
