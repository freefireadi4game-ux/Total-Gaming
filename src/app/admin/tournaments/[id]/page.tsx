import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Pencil,
  Swords,
  Trophy,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";

import {
  getAdminTournament,
  getTournamentMatches,
} from "@/lib/admin/tournaments";

import "../../admin.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatStatus(
  status: string
) {
  return status.toUpperCase();
}

export default async function TournamentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const tournament =
    await getAdminTournament(id);

  if (!tournament) {
    return (
      <AdminShell
        title="Tournament Not Found"
        subtitle="The requested tournament does not exist."
      >
        <Link
          href="/admin/tournaments"
          className="admin-secondary-button"
        >
          <ArrowLeft size={16} />
          Back to Tournaments
        </Link>
      </AdminShell>
    );
  }

  const matches =
    await getTournamentMatches(id);

  const totalKills = matches.reduce(
    (sum, match) =>
      sum + (match.total_kills ?? 0),
    0
  );

  const totalPoints = matches.reduce(
    (sum, match) =>
      sum + (match.total_points ?? 0),
    0
  );

  return (
    <AdminShell
      title={tournament.name}
      subtitle="Tournament control and match overview."
    >
      <div className="admin-page-toolbar">
        <div>
          <Link
            href="/admin/tournaments"
            className="admin-back-link"
          >
            <ArrowLeft size={16} />
            All Tournaments
          </Link>

          <span className="admin-muted-label">
            TOURNAMENT CONTROL
          </span>

          <h2 className="admin-page-title">
            {tournament.name}
          </h2>
        </div>

        <Link
          href={`/admin/tournaments/${id}/edit`}
          className="admin-primary-button"
        >
          <Pencil size={17} />
          Edit Tournament
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>STATUS</span>
            <strong>
              {formatStatus(
                tournament.status
              )}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Swords size={19} />
          </div>

          <div>
            <span>MATCHES</span>
            <strong>
              {matches.length}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>TOTAL KILLS</span>
            <strong>
              {totalKills}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>TOTAL POINTS</span>
            <strong>
              {totalPoints}
            </strong>
          </div>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>TOURNAMENT INFORMATION</span>
            <h2>Overview</h2>
          </div>

          <span className="admin-active-badge">
            {formatStatus(
              tournament.status
            )}
          </span>
        </div>

        <div className="admin-table">
          <div className="admin-table-row">
            <div className="admin-table-main">
              <div className="admin-action-icon">
                <CalendarDays size={17} />
              </div>

              <div>
                <strong>
                  Start Date
                </strong>

                <span>
                  {tournament.start_date ??
                    "Not set"}
                </span>
              </div>
            </div>

            <div className="admin-table-info">
              <span>END DATE</span>
              <strong>
                {tournament.end_date ??
                  "Not set"}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>MATCH CONTROL</span>
            <h2>Matches</h2>
          </div>

          <Link
            href={`/admin/matches/new?tournament=${id}`}
            className="admin-primary-button"
          >
            Add Match
          </Link>
        </div>

        {matches.length === 0 ? (
          <div className="admin-empty-state">
            <Swords size={28} />

            <strong>
              No matches yet
            </strong>

            <span>
              Add the first match from the
              admin panel.
            </span>
          </div>
        ) : (
          <div className="admin-list">
            {matches.map((match) => (
              <div
                className="admin-list-row"
                key={match.id}
              >
                <div className="admin-list-main">
                  <div className="admin-list-icon">
                    <Swords size={18} />
                  </div>

                  <div>
                    <strong>
                      Match{" "}
                      {match.match_number} ·{" "}
                      {match.map ??
                        "Map not set"}
                    </strong>

                    <span>
                      {match.match_date}
                      {" · "}
                      Position #
                      {match.placement}
                      {" · "}
                      {match.total_kills}
                      {" kills"}
                    </span>
                  </div>
                </div>

                <div className="admin-list-right">
                  <div className="admin-points">
                    <strong>
                      {match.total_points}
                    </strong>

                    <span>
                      POINTS
                    </span>
                  </div>

                  <Link
                    href={`/admin/matches/${match.id}`}
                    className="admin-icon-link"
                    aria-label={`Open match ${match.match_number}`}
                  >
                    →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="admin-note">
        <strong>Admin controlled:</strong>{" "}
        This tournament reads directly from
        the central Supabase dataset. Matches
        added through admin will belong to this
        tournament.
      </div>
    </AdminShell>
  );
}
