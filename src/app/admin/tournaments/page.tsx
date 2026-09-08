import Link from "next/link";
import { Plus, Trophy, ArrowRight } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import "@/app/admin/admin.css";

const tournaments = [
  {
    id: "tournament-1",
    name: "Current Tournament",
    status: "ONGOING",
    matches: 2,
    startDate: "01 Sep 2026",
  },
];

export default function AdminTournamentsPage() {
  return (
    <AdminShell
      title="Tournaments"
      subtitle="Create and manage every tournament from the admin panel."
    >
      <div className="admin-page-toolbar">
        <div>
          <span className="admin-muted-label">TOURNAMENT MANAGEMENT</span>
          <h2 className="admin-page-title">All Tournaments</h2>
        </div>

        <Link
          href="/admin/tournaments/new"
          className="admin-primary-button"
        >
          <Plus size={17} />
          New Tournament
        </Link>
      </div>

      <div className="admin-panel">
        <div className="admin-list">
          {tournaments.map((tournament) => (
            <div className="admin-list-row" key={tournament.id}>
              <div className="admin-list-main">
                <div className="admin-list-icon">
                  <Trophy size={19} />
                </div>

                <div>
                  <strong>{tournament.name}</strong>
                  <span>
                    Started {tournament.startDate} ·{" "}
                    {tournament.matches} matches
                  </span>
                </div>
              </div>

              <div className="admin-list-right">
                <span className="admin-active-badge">
                  {tournament.status}
                </span>

                <Link
                  href={`/admin/tournaments/${tournament.id}`}
                  className="admin-icon-link"
                  aria-label={`Open ${tournament.name}`}
                >
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
