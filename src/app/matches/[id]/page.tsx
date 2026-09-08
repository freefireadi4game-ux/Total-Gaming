import Link from "next/link";
import { notFound } from "next/navigation";
import { MATCHES, PLAYERS, TOURNAMENTS } from "@/lib/data";
import { calculateMatchPoints } from "@/lib/scoring";

interface MatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MatchPage({
  params,
}: MatchPageProps) {
  const { id } = await params;

  const match = MATCHES.find(
    (item) => item.id === id
  );

  if (!match) {
    notFound();
  }

  const kills = match.players.reduce(
    (total, player) => total + player.kills,
    0
  );

  const points = calculateMatchPoints(
    kills,
    match.position
  );

  const tournament = TOURNAMENTS.find(
    (item) => item.id === match.tournamentId
  );

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
              MATCH DETAILS
            </div>

            <h2>Match {match.matchNumber}</h2>

            <p>
              {match.map} · {match.date} ·{" "}
              {tournament?.name ?? "Tournament"}
            </p>
          </section>

          <section className="section">
            <div className="stats">
              <div className="stat">
                <div className="stat-label">
                  POSITION
                </div>
                <div className="stat-value">
                  #{match.position}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  TOTAL KILLS
                </div>
                <div className="stat-value">
                  {kills}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  POSITION POINTS
                </div>
                <div className="stat-value">
                  {points.positionPoints}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  TOTAL POINTS
                </div>
                <div className="stat-value">
                  {points.totalPoints}
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <p>PLAYER PERFORMANCE</p>
              <h3>Match Kills</h3>
            </div>

            <div className="table">
              <div className="table-row table-head">
                <span>#</span>
                <span>PLAYER</span>
                <span className="right">KILLS</span>
                <span className="right">POINTS</span>
              </div>

              {match.players
                .map((matchPlayer) => {
                  const player = PLAYERS.find(
                    (item) =>
                      item.id === matchPlayer.playerId
                  );

                  return {
                    ...matchPlayer,
                    player,
                    points: calculateMatchPoints(
                      matchPlayer.kills,
                      match.position
                    ).totalPoints,
                  };
                })
                .sort((a, b) => b.kills - a.kills)
                .map((player, index) => (
                  <div
                    className="table-row"
                    key={player.playerId}
                  >
                    <span>{index + 1}</span>

                    <span>
                      <strong>
                        {player.player?.name ??
                          "Unknown Player"}
                      </strong>

                      <small
                        style={{
                          display: "block",
                          color: "#71717a",
                          fontSize: "9px",
                          marginTop: "3px",
                        }}
                      >
                        {player.player?.role ?? ""}
                      </small>
                    </span>

                    <span className="right">
                      {player.kills}
                    </span>

                    <span className="right">
                      {player.points}
                    </span>
                  </div>
                ))}
            </div>
          </section>

          <div
            style={{
              marginTop: "28px",
              textAlign: "center",
            }}
          >
            <Link
              href="/matches"
              style={{
                color: "#a1a1aa",
                fontSize: "11px",
              }}
            >
              ← Back to matches
            </Link>
          </div>

          <footer className="footer">
            Total Gaming · Match {match.matchNumber}
          </footer>
        </div>
      </main>
    </>
  );
}
