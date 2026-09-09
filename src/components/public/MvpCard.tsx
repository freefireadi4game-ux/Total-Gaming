type MvpCardProps = {
  name: string;
  role?: string | null;
  kills: number;
  points: number;
  matches: number;
  avatarUrl?: string | null;
};

export default function MvpCard({
  name,
  role,
  kills,
  points,
  matches,
  avatarUrl,
}: MvpCardProps) {
  return (
    <div className="public-mvp-card">
      <div className="public-mvp-badge">
        DAILY MVP
      </div>

      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="public-mvp-avatar"
        />
      ) : (
        <div className="public-mvp-avatar public-mvp-avatar-fallback">
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}

      <h3>{name}</h3>

      <p>{role ?? "Player"}</p>

      <div className="public-mvp-stats">
        <div>
          <span>KILLS</span>
          <strong>{kills}</strong>
        </div>

        <div>
          <span>POINTS</span>
          <strong>{points}</strong>
        </div>

        <div>
          <span>MATCHES</span>
          <strong>{matches}</strong>
        </div>
      </div>
    </div>
  );
}
