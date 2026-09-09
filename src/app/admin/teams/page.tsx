import Link from "next/link";
import {
  Plus,
  Users,
  UserCheck,
  Trophy,
  ArrowRight,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";

import "../admin.css";

export default async function AdminTeamsPage() {
  const { data: teams, error } = await supabaseAdmin
    .from("teams")
    .select("id,name,short_name,country,logo_url")
    .order("name");

  if (error) {
    throw new Error(
      `Failed to load teams: ${error.message}`
    );
  }

  const teamIds = (teams ?? []).map((team) => team.id);

  const { data: players } = teamIds.length
    ? await supabaseAdmin
        .from("players")
        .select("id,team_id,active")
        .in("team_id", teamIds)
    : { data: [] };

  const playerRows = players ?? [];

  const totalPlayers = playerRows.length;

  const activePlayers = playerRows.filter(
    (player) => player.active
  ).length;

  return (
    <AdminShell
      title="Teams"
      subtitle="Manage registered teams and their rosters."
    >
      <div className="admin-page-toolbar">
        <div>
          <span className="admin-muted-label">
            TEAM MANAGEMENT
          </span>

          <h2 className="admin-page-title">
            Teams
          </h2>
        </div>

        <Link
          href="/admin/teams/new"
          className="admin-primary-button"
        >
          <Plus size={17} />
          Add Team
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Users size={19} />
          </div>

          <div>
            <span>Total Teams</span>
            <strong>{teams?.length ?? 0}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <UserCheck size={19} />
          </div>

          <div>
            <span>Total Players</span>
            <strong>{totalPlayers}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>Active Players</span>
            <strong>{activePlayers}</strong>
          </div>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>REGISTERED TEAMS</span>
            <h2>All Teams</h2>
          </div>
        </div>

        {!teams?.length ? (
          <div className="admin-empty-state">
            <Users size={28} />

            <strong>No teams yet</strong>

            <span>
              Create your first team from the
              admin panel.
            </span>
          </div>
        ) : (
          <div className="admin-list">
            {teams.map((team) => {
              const teamPlayers =
                playerRows.filter(
                  (player) =>
                    player.team_id === team.id
                );

              const activeCount =
                teamPlayers.filter(
                  (player) => player.active
                ).length;

              return (
                <div
                  className="admin-list-row"
                  key={team.id}
                >
                  <div className="admin-list-main">
                    <div className="admin-list-icon">
                      <Users size={18} />
                    </div>

                    <div>
                      <strong>
                        {team.name}
                      </strong>

                      <span>
                        {team.short_name ?? "—"}
                        {" · "}
                        {team.country ?? "India"}
                      </span>
                    </div>
                  </div>

                  <div className="admin-list-right">
                    <div className="admin-points">
                      <strong>
                        {activeCount}
                      </strong>

                      <span>
                        ACTIVE
                      </span>
                    </div>

                    <Link
                      href={`/admin/teams/${team.id}`}
                      className="admin-icon-link"
                      aria-label={`Open ${team.name}`}
                    >
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
