import MatchCard from "@/components/ui/MatchCard";
import type { Match } from "@/types";

interface RecentMatchesProps {
  matches: Match[];
  tournamentName?: string;
  limit?: number;
}

export default function RecentMatches({
  matches,
  tournamentName,
  limit = 5,
}: RecentMatchesProps) {
  const recentMatches = [...matches]
    .sort(
      (a, b) =>
        b.matchNumber - a.matchNumber
    )
    .slice(0, limit);

  return (
    <div>
      <div className="section-heading">
        <p>RECENT MATCHES</p>
        <h3>Latest Results</h3>
      </div>

      <div className="matches">
        {recentMatches.length === 0 ? (
          <div className="card">
            <p className="match-kills">
              No match results available.
            </p>
          </div>
        ) : (
          recentMatches.map((match) => (
            <MatchCard
              key={match.id}
              matchNumber={match.matchNumber}
              map={match.map}
              position={match.position}
              kills={match.players.reduce(
                (total, player) =>
                  total + player.kills,
                0
              )}
              points={match.players.reduce(
                (total, player) =>
                  total + player.kills,
                0
              )}
              date={match.date}
              tournamentName={tournamentName}
            />
          ))
        )}
      </div>
    </div>
  );
}
