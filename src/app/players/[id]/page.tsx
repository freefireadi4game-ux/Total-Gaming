import Link from "next/link";
import { notFound } from "next/navigation";
import { MATCHES, PLAYERS } from "@/lib/data";
import { calculateMatchPoints } from "@/lib/scoring";

interface PlayerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlayerPage({
  params,
}: PlayerPageProps) {
  const { id } = await params;

  const player = PLAYERS.find(
    (item) => item.id === id
  );

  if (!player) {
    notFound();
  }

  const playerMatches = MATCHES.filter((match) =>
    match.players.some(
      (matchPlayer) =>
        matchPlayer.playerId === player.id
    )
  );

  const totalKills = playerMatches.reduce(
    (total, match) => {
      const playerData = match.players.find(
        (item) => item.playerId === player.id
      );

      return total + (playerData?.kills ?? 0);
    },
    0
  );

  const totalPoints = playerMatches.reduce(
    (total, match) => {
      const playerData = match.players.find(
        (item) => item.playerId === player.id
      );

      const kills = playerData?.kills ?? 0;

      return (
        total +
        calculateMatchPoints(
          kills,
          match.position
        ).totalPoints
      );
    },
    0
  );

  const average =
    playerMatches.length > 0
      ? (totalPoints / playerMatches.length).toFixed(1)
      : "0.0";

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
              PLAYER PROFILE
            </div>

            <h2>{player.name}</h2>

            <p>
              {player.role} ·{" "}
              {player.active ? "Active Roster" : "Inactive"}
            </p>
          </section>

          <section className="section">
            <div className="stats">
              <div className="stat">
                <div className="stat-label">
                  MATCHES
                </div>
                <div className="stat-value">
                  {playerMatches.length}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  TOTAL KILLS
                </div>
                <div className="stat-value">
                  {totalKills}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  TOTAL POINTS
                </div>
                <div className="stat-value">
                  {totalPoints}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  AVG / MATCH
                </div>
                <div className="stat-value">
                  {average}
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <p>MATCH HISTORY</p>
              <h3>{player.name}'s Results</h3>
            </div>

            <div className="matches">
              {[...playerMatches]
                .reverse()
                .map((match) => {
                  const playerData =
                    match.players.find(
                      (item) =>
                        item.playerId === player.id
                    );

                  const kills =
                    playerData?.kills ?? 0;

                  const points =
                    calculateMatchPoints(
                      kills,
                      match.position
                    ).totalPoints;

                  return (
                    <Link
                      href={`/matches/${match.id}`}
                      className="match"
                      key={match.id}
                    >
                      <div className="match-left">
                        <div className="position">
                          {match.position}
                        </div>

                        <div>
                          <div className="match-name">
                            Match {match.matchNumber}
                          </div>

                          <div className="match-kills">
                            {kills} kills ·{" "}
                            {match.map}
                          </div>
                        </div>
                      </div>

                      <div className="match-points">
                        <strong>{points}</strong>
                        <span>POINTS</span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </section>

          <div
            style={{
              marginTop: "28px",
              textAlign: "center",
            }}
          >
            <Link
              href="/players"
              style={{
                color: "#a1a1aa",
                fontSize: "11px",
              }}
            >
              ← Back to players
            </Link>
          </div>

          <footer className="footer">
            Total Gaming · {player.name} · Player Statistics
          </footer>
        </div>
      </main>
    </>
  );
}
