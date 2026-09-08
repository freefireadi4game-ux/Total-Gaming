import Link from "next/link";
import { MATCHES, PLAYERS } from "@/lib/data";
import { calculateMatchPoints } from "@/lib/scoring";

export default function PlayersPage() {
  const playerStats = PLAYERS.map((player) => {
    const playerMatches = MATCHES.filter((match) =>
      match.players.some(
        (matchPlayer) => matchPlayer.playerId === player.id
      )
    );

    const kills = playerMatches.reduce((total, match) => {
      const playerData = match.players.find(
        (item) => item.playerId === player.id
      );

      return total + (playerData?.kills ?? 0);
    }, 0);

    const teamPoints = playerMatches.reduce(
      (total, match) => {
        const playerData = match.players.find(
          (item) => item.playerId === player.id
        );

        const playerKills = playerData?.kills ?? 0;

        return (
          total +
          calculateMatchPoints(
            playerKills,
            match.position
          ).totalPoints
        );
      },
      0
    );

    return {
      ...player,
      matches: playerMatches.length,
      kills,
      points: teamPoints,
    };
  }).sort((a, b) => b.points - a.points);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <h1>TOTAL GAMING</h1>
            <p>Esports Statistics</p>
          </Link>

          <div className="country">🇮🇳 INDIA</div>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="hero">
            <div className="live">
              <span className="live-dot" />
              PLAYER CENTER
            </div>

            <h2>Players</h2>

            <p>
              Individual player performance, kills and points.
            </p>
          </section>

          <section className="section">
            <div className="section-heading">
              <p>ROSTER</p>
              <h3>Total Gaming Players</h3>
            </div>

            <div className="table">
              <div className="table-row table-head">
                <span>#</span>
                <span>PLAYER</span>
                <span className="right">KILLS</span>
                <span className="right">POINTS</span>
              </div>

              {playerStats.map((player, index) => (
                <Link
                  href={`/players/${player.id}`}
                  className="table-row"
                  key={player.id}
                >
                  <span>{index + 1}</span>

                  <span>
                    <strong>{player.name}</strong>
                    <small
                      style={{
                        display: "block",
                        color: "#71717a",
                        fontSize: "9px",
                        marginTop: "3px",
                      }}
                    >
                      {player.role}
                    </small>
                  </span>

                  <span className="right">
                    {player.kills}
                  </span>

                  <span className="right">
                    <strong>{player.points}</strong>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <footer className="footer">
            Total Gaming · India · Player Statistics
          </footer>
        </div>
      </main>
    </>
  );
}
