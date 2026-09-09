import {
  Users,
  UserCheck,
  Trophy,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { TEAM, PLAYERS, MATCHES } from "@/lib/data";

import "../admin.css";

export default function AdminTeamsPage() {
  const activePlayers = PLAYERS.filter(
    (player) => player.active
  ).length;

  const totalKills = MATCHES.reduce(
    (total, match) =>
      total +
      match.players.reduce(
        (sum, player) => sum + player.kills,
        0
      ),
    0
  );

  return (
    <AdminShell
      title="Teams"
      subtitle="Manage registered teams and their performance."
    >
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Users size={19} />
          </div>

          <div>
            <span>Team</span>
            <strong>{TEAM.name}</strong>
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
            <Trophy size={19} />
          </div>

          <div>
            <span>Total Kills</span>
            <strong>{totalKills}</strong>
          </div>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>TEAM MANAGEMENT</span>
            <h2>{TEAM.name}</h2>
          </div>

          <span className="admin-active-badge">
            ACTIVE
          </span>
        </div>

        <div className="admin-list">
          <div className="admin-list-row">
            <div className="admin-list-main">
              <div className="admin-list-icon">
                <Users size={19} />
              </div>

              <div>
                <strong>{TEAM.name}</strong>
                <span>
                  {TEAM.shortName} · {TEAM.country}
                </span>
              </div>
            </div>

            <div className="admin-list-right">
              <span>
                {PLAYERS.length} players
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>ROSTER</span>
            <h2>Team Players</h2>
          </div>
        </div>

        <div className="admin-table">
          {PLAYERS.map((player) => (
            <div
              className="admin-table-row"
              key={player.id}
            >
              <div className="admin-table-main">
                <div className="admin-action-icon">
                  <Users size={17} />
                </div>

                <div>
                  <strong>{player.name}</strong>
                  <span>{player.id}</span>
                </div>
              </div>

              <div className="admin-table-info">
                <span>ROLE</span>
                <strong>{player.role}</strong>
              </div>

              <div className="admin-table-info">
                <span>STATUS</span>
                <strong>
                  {player.active
                    ? "Active"
                    : "Inactive"}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
