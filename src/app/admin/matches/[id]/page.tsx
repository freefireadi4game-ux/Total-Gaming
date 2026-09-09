import Link from "next/link";
import {
  ArrowLeft,
  Crosshair,
  Map,
  Trophy,
  Users,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import {
  MATCHES,
  PLAYERS,
} from "@/lib/data";
import { calculateMatchPoints } from "@/lib/scoring";

import "../../admin.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MatchDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const match = MATCHES.find(
    (item) => item.id === id
  );

  if (!match) {
    return (
      <AdminShell
        title="Match Not Found"
        subtitle="The requested match does not exist."
      >
        <Link
          href="/admin/matches"
          className="admin-secondary-button"
        >
          <ArrowLeft size={16} />
          Back to Matches
        </Link>
      </AdminShell>
    );
  }

  const killCount = match.players.reduce(
    (total, player) =>
      total + player.kills,
    0
  );

  const points = calculateMatchPoints(
    match.position,
    killCount
  );

  return (
    <AdminShell
      title={`Match ${match.matchNumber}`}
      subtitle={`${match.map} · ${match.date}`}
    >
      <Link
        href="/admin/matches"
        className="admin-secondary-button"
      >
        <ArrowLeft size={16} />
        Back to Matches
      </Link>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Map size={19} />
          </div>

          <div>
            <span>MAP</span>
            <strong>{match.map}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>POSITION</span>
            <strong>{match.position}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Crosshair size={19} />
          </div>

          <div>
            <span>KILLS</span>
            <strong>{killCount}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>TOTAL POINTS</span>
            <strong>{points}</strong>
          </div>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>PLAYER RESULTS</span>
            <h2>Kill Breakdown</h2>
          </div>
        </div>

        <div className="admin-table">
          {match.players.map(
            (matchPlayer) => {
              const player = PLAYERS.find(
                (item) =>
                  item.id ===
                  matchPlayer.playerId
              );

              return (
                <div
                  className="admin-table-row"
                  key={matchPlayer.playerId}
                >
                  <div className="admin-table-main">
                    <div className="admin-action-icon">
                      <Users size={17} />
                    </div>

                    <div>
                      <strong>
                        {player?.name ??
                          matchPlayer.playerId}
                      </strong>

                      <span>
                        {player?.role ?? "Player"}
                      </span>
                    </div>
                  </div>

                  <div className="admin-table-info">
                    <span>KILLS</span>
                    <strong>
                      {matchPlayer.kills}
                    </strong>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      <div className="admin-note">
        <strong>Admin controlled:</strong>{" "}
        Match result data is displayed from the
        central match dataset and scoring rules.
      </div>
    </AdminShell>
  );
}
