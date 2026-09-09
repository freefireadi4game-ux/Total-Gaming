import Link from "next/link";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Pencil,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";

import "../admin.css";

export default async function AdminPlayersPage() {
  const { data: players, error } =
    await supabaseAdmin
      .from("players")
      .select(
        `
          id,
          name,
          role,
          active,
          avatar_url,
          team_id,
          teams (
            id,
            name,
            short_name
          )
        `
      )
      .order("name");

  if (error) {
    throw new Error(
      `Failed to load players: ${error.message}`
    );
  }

  const rows = players ?? [];

  const activePlayers = rows.filter(
    (player) => player.active
  ).length;

  const inactivePlayers =
    rows.length - activePlayers;

  return (
    <AdminShell
      title="Players"
      subtitle="Manage the official roster and player status."
    >
      <div className="admin-page-toolbar">
        <div>
          <span className="admin-muted-label">
            ROSTER CONTROL
          </span>

          <h2 className="admin-page-title">
            Players
          </h2>
        </div>

        <Link
          href="/admin/players/new"
          className="admin-primary-button"
        >
          <Plus size={17} />
          Add Player
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Users size={19} />
          </div>

          <div>
            <span>Total Players</span>
            <strong>{rows.length}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <UserCheck size={19} />
          </div>

          <div>
            <span>Active Players</span>
            <strong>{activePlayers}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <UserX size={19} />
          </div>

          <div>
            <span>Inactive Players</span>
            <strong>{inactivePlayers}</strong>
          </div>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>ROSTER</span>
            <h2>All Players</h2>
          </div>
        </div>

        {!rows.length ? (
          <div className="admin-empty-state">
            <Users size={28} />

            <strong>
              No players yet
            </strong>

            <span>
              Add your first player from the
              admin panel.
            </span>
          </div>
        ) : (
          <div className="admin-table">
            {rows.map((player) => {
              const team =
                Array.isArray(player.teams)
                  ? player.teams[0]
                  : player.teams;

              return (
                <div
                  className="admin-table-row"
                  key={player.id}
                >
                  <div className="admin-table-main">
                    <div className="admin-action-icon">
                      <Users size={17} />
                    </div>

                    <div>
                      <strong>
                        {player.name}
                      </strong>

                      <span>
                        {team?.name ??
                          "No team"}
                      </span>
                    </div>
                  </div>

                  <div className="admin-table-info">
                    <span>ROLE</span>
                    <strong>
                      {player.role ?? "—"}
                    </strong>
                  </div>

                  <div className="admin-table-info">
                    <span>STATUS</span>

                    <strong>
                      {player.active ? (
                        <>
                          <UserCheck size={12} />
                          Active
                        </>
                      ) : (
                        <>
                          <UserX size={12} />
                          Inactive
                        </>
                      )}
                    </strong>
                  </div>

                  <Link
                    href={`/admin/players/${player.id}/edit`}
                    className="admin-secondary-button"
                  >
                    <Pencil size={14} />
                    Edit
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
