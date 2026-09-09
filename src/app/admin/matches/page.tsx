import Link from "next/link";
import {
  Plus,
  Swords,
  ArrowRight,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";

import "@/app/admin/admin.css";

export default async function AdminMatchesPage() {
  const { data: matches, error } =
    await supabaseAdmin
      .from("matches")
      .select(
        `
          id,
          match_number,
          match_date,
          map,
          placement,
          total_kills,
          total_points,
          tournaments (
            id,
            name
          ),
          teams (
            id,
            name,
            short_name
          )
        `
      )
      .order("match_date", {
        ascending: false,
      })
      .order("match_number", {
        ascending: true,
      });

  if (error) {
    throw new Error(
      `Failed to load matches: ${error.message}`
    );
  }

  return (
    <AdminShell
      title="Matches"
      subtitle="Admin-controlled match results and scoring."
    >
      <div className="admin-page-toolbar">
        <div>
          <span className="admin-muted-label">
            RESULT MANAGEMENT
          </span>

          <h2 className="admin-page-title">
            Match Results
          </h2>
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
        {matches?.length ? (
          <div className="admin-list">
            {matches.map((match) => {
              const tournament =
                Array.isArray(match.tournaments)
                  ? match.tournaments[0]
                  : match.tournaments;

              const team =
                Array.isArray(match.teams)
                  ? match.teams[0]
                  : match.teams;

              return (
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
                        Match {match.match_number}
                        {" · "}
                        {match.map ??
                          "Map not set"}
                      </strong>

                      <span>
                        {team?.name ??
                          "Team"}
                        {" · "}
                        {tournament?.name ??
                          "Tournament"}
                        {" · "}
                        {match.match_date}
                        {" · Position "}
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
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="admin-empty-state">
            <Swords size={28} />

            <strong>
              No matches yet
            </strong>

            <span>
              Create the first match from the
              admin control panel.
            </span>
          </div>
        )}
      </div>

      <div className="admin-note">
        <strong>Scoring:</strong>{" "}
        Kill points and placement points are
        calculated automatically.
      </div>
    </AdminShell>
  );
}
