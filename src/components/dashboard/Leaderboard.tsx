interface LeaderboardPlayer {
  id: string;
  name: string;
  kills: number;
  points: number;
  rank: number;
}

interface LeaderboardProps {
  players: LeaderboardPlayer[];
}

export default function Leaderboard({
  players,
}: LeaderboardProps) {
  const sortedPlayers = [...players].sort(
    (a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      return b.kills - a.kills;
    }
  );

  return (
    <div className="section">

      <div className="section-heading">
        <p>PLAYER RANKING</p>
        <h3>Leaderboard</h3>
      </div>

      <div className="table">

        <div className="table-row table-head">
          <span>#</span>
          <span>PLAYER</span>
          <span className="right">KILLS</span>
          <span className="right">POINTS</span>
        </div>

        {sortedPlayers.length === 0 ? (
          <div className="table-row">
            <span>—</span>
            <span>No player data</span>
            <span className="right">0</span>
            <span className="right">0</span>
          </div>
        ) : (
          sortedPlayers.map((player, index) => (
            <div
              className="table-row"
              key={player.id}
            >
              <span>{index + 1}</span>

              <span>
                {player.name}
              </span>

              <span className="right">
                {player.kills}
              </span>

              <span className="right">
                {player.points}
              </span>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
