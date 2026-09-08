import Avatar from "@/components/ui/Avatar";

interface DailyMVPProps {
  name: string;
  role: string;
  kills: number;
  points: number;
  matches?: number;
  avatarUrl?: string;
}

export default function DailyMVP({
  name,
  role,
  kills,
  points,
  matches = 0,
  avatarUrl,
}: DailyMVPProps) {
  return (
    <div>
      <div className="section-heading">
        <p>DAILY MVP</p>
        <h3>Top Performer</h3>
      </div>

      <div className="card mvp">

        <div className="trophy">
          🏆
        </div>

        <Avatar
          name={name}
          imageUrl={avatarUrl}
          size="medium"
        />

        <div className="mvp-name">
          {name}
        </div>

        <div className="mvp-role">
          {role}
        </div>

        <div className="mvp-stats">

          <div className="mvp-stat">
            <span>KILLS</span>
            <strong>{kills}</strong>
          </div>

          <div className="mvp-stat">
            <span>POINTS</span>
            <strong>{points}</strong>
          </div>

          <div className="mvp-stat">
            <span>MATCHES</span>
            <strong>{matches}</strong>
          </div>

        </div>

      </div>
    </div>
  );
}
