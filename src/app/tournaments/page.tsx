import Link from "next/link";
import { MATCHES, TOURNAMENTS } from "@/lib/data";
import { calculateMatchPoints } from "@/lib/scoring";

export default function TournamentsPage() {
  const tournaments = TOURNAMENTS.map((tournament) => {
    const matches = MATCHES.filter(
      (match) => match.tournamentId === tournament.id
    );

    const kills = matches.reduce(
      (total, match) =>
        total +
        match.players.reduce(
          (matchTotal, player) =>
            matchTotal + player.kills,
          0
        ),
      0
    );

    const points = matches.reduce((total, match) => {
      const matchKills = match.players.reduce(
        (matchTotal, player) =>
          matchTotal + player.kills,
        0
      );

      return (
        total +
        calculateMatchPoints(
          matchKills,
          match.position
        ).totalPoints
      );
    }, 0);

    return {
      ...tournament,
      matches: matches.length,
      kills,
      points,
    };
  });

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
              TOURNAMENT CENTER
            </div>

            <h2>Tournaments</h2>

            <p>
              Track Total Gaming performance across tournaments.
            </p>
          </section>

          <section className="section">
            <div className="section-heading">
              <p>TOURNAMENTS</p>
              <h3>Competition History</h3>
            </div>

            <div className="matches">
              {tournaments.map((tournament) => (
                <div className="card" key={tournament.id}>
                  <div className="tournament-top">
                    <div>
                      <div className="eyebrow">
                        {tournament.status.toUpperCase()}
                      </div>

                      <div className="title">
                        {tournament.name}
                      </div>
                    </div>

                    <div className="rank-box">
                      <span>TOTAL POINTS</span>
                      <strong>{tournament.points}</strong>
                    </div>
                  </div>

                  <div className="mini-stats">
                    <div className="mini-stat">
                      <span className="eyebrow">
                        MATCHES
                      </span>
                      <strong>{tournament.matches}</strong>
                    </div>

                    <div className="mini-stat">
                      <span className="eyebrow">
                        KILLS
                      </span>
                      <strong>{tournament.kills}</strong>
                    </div>

                    <div className="mini-stat">
                      <span className="eyebrow">
                        STATUS
                      </span>
                      <strong>
                        {tournament.status}
                      </strong>
                    </div>
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <Link
                      href={`/tournaments/${tournament.id}`}
                      style={{
                        color: "#ffffff",
                        fontSize: "11px",
                        textDecoration: "underline",
                      }}
                    >
                      View tournament →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="footer">
            Total Gaming · India · Tournament Statistics
          </footer>
        </div>
      </main>
    </>
  );
}
