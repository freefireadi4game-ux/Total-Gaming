import Link from "next/link";

type MatchCardProps = {
  id: string;
  matchNumber: number;
  map: string | null;
  placement: number;
  kills: number;
  points: number;
};

export default function MatchCard({
  id,
  matchNumber,
  map,
  placement,
  kills,
  points,
}: MatchCardProps) {
  return (
    <Link
      href={`/matches/${id}`}
      className="public-match-card"
    >
      <div className="public-match-left">
        <div className="public-position">
          #{placement}
        </div>

        <div>
          <strong>
            Match {matchNumber}
          </strong>

          <span>
            {kills} kills · {map ?? "Map"}
          </span>
        </div>
      </div>

      <div className="public-match-points">
        <strong>{points}</strong>
        <span>POINTS</span>
      </div>
    </Link>
  );
}
