import Link from "next/link";
import { MATCHES, TOURNAMENTS } from "@/lib/data";
import { calculateMatchPoints } from "@/lib/scoring";

export default function MatchesPage() {
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
              MATCH CENTER
            </div>

            <h2>All Matches</h2>

            <p>
              Complete match results, placements, kills and tournament
              points.
            </p>
          </section>

          <section className="section">
            <div className="section-heading">
              <p>MATCH RESULTS</p>
              <h3>Recent & Completed Matches</h3>
            </div>

            <div className="matches">
              {[...MATCHES].reverse().map((match) => {
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
                          {kills} kills · {match.map}
                        </div>

                        <div className="match-kills">
                          {tournament?.name ?? "Tournament"}
                        </div>
                      </div>
                    </div>

                    <div className="match-points">
                      <strong>{points.totalPoints}</strong>
                      <span>POINTS</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <footer className="footer">
            Total Gaming · India · Match Statistics
          </footer>
        </div>
      </main>
    </>
  );
}
