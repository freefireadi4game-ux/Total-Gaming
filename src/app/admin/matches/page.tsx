import Link from "next/link";
import { Plus, Swords, ArrowRight } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import "@/app/admin/admin.css";

const matches = [
  {
    id: "match-1",
    number: 1,
    map: "Bermuda",
    position: 1,
    kills: 10,
    points: 22,
    date: "08 Sep 2026",
  },
  {
    id: "match-2",
    number: 2,
    map: "Purgatory",
    position: 3,
    kills: 8,
    points: 16,
    date: "08 Sep 2026",
  },
];

export default function AdminMatchesPage() {
  return (
    <AdminShell
      title="Matches"
      subtitle="Admin-controlled match results and scoring."
    >
      <div className="admin-page-toolbar">
        <div>
          <span className="admin-muted-label">RESULT MANAGEMENT</span>
          <h2 className="admin-page-title">Match Results</h2>
        </div>

        <Link
          href="/admin/matches/new"
          className="admin-primary-button"
        >
          <Plus size={17} />
          Add Match
        </Link>
      </div>

      <div className="admin-panel">
        <div className="admin-list">
          {matches.map((match) => (
            <div className="admin-list-row" key={match.id}>
              <div className="admin-list-main">
                <div className="admin-list-icon">
                  <Swords size={18} />
                </div>

                <div>
                  <strong>
                    Match {match.number} · {match.map}
                  </strong>

                  <span>
                    {match.date} · Position {match.position} ·{" "}
                    {match.kills} kills
                  </span>
                </div>
              </div>

              <div className="admin-list-right">
                <div className="admin-points">
                  <strong>{match.points}</strong>
                  <span>POINTS</span>
                </div>

                <Link
                  href={`/admin/matches/${match.id}`}
                  className="admin-icon-link"
                  aria-label={`Edit match ${match.number}`}
                >
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-note">
        <strong>Scoring:</strong> Position points and kill points are
        calculated using the central scoring rules. Admin controls the
        submitted match data.
      </div>
    </AdminShell>
  );
                                            }
