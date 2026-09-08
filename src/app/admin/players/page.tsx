"use client";

import { useState } from "react";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { PLAYERS } from "@/lib/data";

import "../admin.css";

export default function AdminPlayersPage() {
  const [players] = useState(PLAYERS);

  const activePlayers = players.filter(
    (player) => player.active
  ).length;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminTopbar
          title="Players"
          description="Manage the official Total Gaming roster."
        />

        <div className="admin-content">
          <section className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <Users size={19} />
              </div>

              <div>
                <span>Total Players</span>
                <strong>{players.length}</strong>
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
          </section>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <span>ROSTER CONTROL</span>
                <h2>Team Players</h2>
              </div>

              <button className="admin-primary-button">
                <Plus size={15} />
                Add Player
              </button>
            </div>

            <div className="admin-table">
              {players.map((player) => (
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

                  <button className="admin-secondary-button">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
