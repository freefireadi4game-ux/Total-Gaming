import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Swords,
  Trophy,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import {
  TOURNAMENTS,
  getTournamentMatches,
} from "@/lib/data";

import "../../admin.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TournamentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const tournament = TOURNAMENTS.find(
    (item) => item.id === id
  );

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

  const matches = getTournamentMatches(id);

  return (
    <AdminShell
      title={tournament.name}
      subtitle="Tournament overview and match management."
    >
      <Link
        href="/admin/tournaments"
        className="admin-secondary-button"
      >
        <ArrowLeft size={16} />
        Back to Tournaments
      </Link>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>Status</span>
            <strong>
              {tournament.status.toUpperCase()}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Swords size={19} />
          </div>

          <div>
            <span>Matches</span>
            <strong>{matches.length}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <CalendarDays size={19} />
          </div>

          <div>
            <span>Start Date</span>
            <strong>{tournament.startDate}</strong>
          </div>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>TOURNAMENT CONTROL</span>
            <h2>Matches</h2>
          </div>

          <Link
            href="/admin/matches/new"
            className="admin-primary-button"
          >
            Add Match
          </Link>
        </div>

        <div className="admin-list">
          {matches.length === 0 ? (
            <div className="admin-empty">
              No matches added yet.
            </div>
          ) : (
            matches.map((match) => (
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
                      Match {match.matchNumber} ·{" "}
                      {match.map}
                    </strong>

                    <span>
                      {match.date} · Position{" "}
                      {match.position}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/admin/matches/${match.id}`}
                  className="admin-icon-link"
                >
                  →
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </AdminShell>
  );
}
