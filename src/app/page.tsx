"use client";

import { useMemo } from "react";

type Match = {
  id: string;
  matchNumber: number;
  map: string;
  position: number;
  kills: number;
};

const matches: Match[] = [
  {
    id: "match-1",
    matchNumber: 1,
    map: "Bermuda",
    position: 1,
    kills: 10,
  },
  {
    id: "match-2",
    matchNumber: 2,
    map: "Purgatory",
    position: 3,
    kills: 8,
  },
  {
    id: "match-3",
    matchNumber: 3,
    map: "Alpine",
    position: 5,
    kills: 6,
  },
];

const placementPoints: Record<number, number> = {
  1: 12,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
  11: 0,
  12: 0,
};

export default function Home() {
  const stats = useMemo(() => {
    const kills = matches.reduce(
      (total, match) => total + match.kills,
      0
    );

    const positionPoints = matches.reduce(
      (total, match) =>
        total + (placementPoints[match.position] ?? 0),
      0
    );

    const totalPoints = kills + positionPoints;

    return {
      matches: matches.length,
      kills,
      positionPoints,
      totalPoints,
      average: Number(
        (totalPoints / matches.length).toFixed(1)
      ),
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="brand">
            <h1>TOTAL GAMING</h1>
            <p>Esports Statistics</p>
          </a>

          <div className="country">🇮🇳 INDIA</div>
        </div>
      </header>

      <main>
        <div className="container">

          <section className="hero">
            <div className="live">
              <span className="live-dot" />
              LIVE TOURNAMENT DATA
            </div>

            <h2>Total Gaming</h2>

            <p>
              Match results, tournament points and player
              performance — all in one place.
            </p>
          </section>

          <section className="section">
            <div className="stats">

              <div className="stat">
                <div className="stat-label">
                  TOURNAMENT POINTS
                </div>
                <div className="stat-value">
                  {stats.totalPoints}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  TOTAL KILLS
                </div>
                <div className="stat-value">
                  {stats.kills}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  POSITION POINTS
                </div>
                <div className="stat-value">
                  {stats.positionPoints}
                </div>
              </div>

              <div className="stat">
                <div className="stat-label">
                  AVG / MATCH
                </div>
                <div className="stat-value">
                  {stats.average}
                </div>
              </div>

            </div>
          </section>

          <section className="section">
            <div className="two-columns">

              <div>
                <div className="section-heading">
                  <p>RECENT MATCHES</p>
                  <h3>Latest Results</h3>
                </div>

                <div className="matches">
                  {[...matches]
                    .reverse()
                    .map((match) => {
                      const position =
                        placementPoints[match.position] ?? 0;

                      const total =
                        match.kills + position;

                      return (
                        <div
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
                                {match.kills} kills ·{" "}
                                {match.map}
                              </div>
                            </div>
                          </div>

                          <div className="match-points">
                            <strong>{total}</strong>
                            <span>POINTS</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div>
                <div className="section-heading">
                  <p>DAILY MVP</p>
                  <h3>Top Performer</h3>
                </div>

                <div className="card mvp">
                  <div className="trophy">🏆</div>

                  <div className="avatar">
                    TG
                  </div>

                  <div className="mvp-name">
                    Total Gaming
                  </div>

                  <div className="mvp-role">
                    Team Performance
                  </div>

                  <div className="mvp-stats">
                    <div className="mvp-stat">
                      <span>KILLS</span>
                      <strong>{stats.kills}</strong>
                    </div>

                    <div className="mvp-stat">
                      <span>POINTS</span>
                      <strong>{stats.totalPoints}</strong>
                    </div>

                    <div className="mvp-stat">
                      <span>MATCHES</span>
                      <strong>{stats.matches}</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <footer className="footer">
            Total Gaming · India · Esports Statistics
          </footer>

        </div>
      </main>

      <nav className="mobile-nav">
        <div className="mobile-nav-inner">
          <button className="active">Overview</button>
          <button>Matches</button>
          <button>Tournaments</button>
          <button>Players</button>
        </div>
      </nav>
    </>
  );
}
