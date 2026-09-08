interface MatchCardProps {
  matchNumber: number;
  map: string;
  position: number;
  kills: number;
  points: number;
}

export default function MatchCard({
  matchNumber,
  map,
  position,
  kills,
  points,
}: MatchCardProps) {
  return (
    <div className="match">
      <div className="match-left">
        <div className="position">
          {position}
        </div>

        <div>
          <div className="match-name">
            Match {matchNumber}
          </div>

          <div className="match-kills">
            {kills} kills · {map}
          </div>
        </div>
      </div>

      <div className="match-points">
        <strong>{points}</strong>
        <span>POINTS</span>
      </div>
    </div>
  );
}
