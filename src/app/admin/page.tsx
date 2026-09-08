import Link from "next/link";
import {
  Trophy,
  Swords,
  Users,
  BarChart3,
  ArrowRight,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import {
  MATCHES,
  PLAYERS,
  TOURNAMENTS,
} from "@/lib/data";

import "./admin.css";

export default function AdminDashboardPage() {
  const ongoingTournaments = TOURNAMENTS.filter(
    (tournament) => tournament.status === "ongoing"
  ).length;

  const stats = [
    {
      label: "Tournaments",
      value: TOURNAMENTS.length,
      icon: Trophy,
    },
    {
      label: "Matches",
      value: MATCHES.length,
      icon: Swords,
    },
    {
      label: "Players",
      value: PLAYERS.length,
      icon: Users,
    },
    {
      label: "Live Events",
      value: ongoingTournaments,
      icon: BarChart3,
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <AdminTopbar
          title="Admin Dashboard"
          description="Control tournaments, matches, players and statistics."
        />

        <div className="admin-content">
          <section className="admin-stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="admin-stat-card" key={stat.label}>
                  <div className="admin-stat-icon">
                    <Icon size={19} />
                  </div>

                  <div>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <span>ADMIN ACTIONS</span>
                <h2>Manage Everything</h2>
              </div>

              <div className="admin-live-badge">
                CONTROLLED BY ADMIN
              </div>
            </div>

            <div className="admin-actions-grid">
              <Link
                href="/admin/tournaments"
                className="admin-action-card"
              >
                <div className="admin-action-top">
                  <div className="admin-action-icon">
                    <Trophy size={18} />
                  </div>

                  <ArrowRight size={15} />
                </div>

                <h3>Tournament Management</h3>

                <p>
                  Create tournaments, update status, dates and
                  tournament information.
                </p>
              </Link>

              <Link
                href="/admin/matches"
                className="admin-action-card"
              >
                <div className="admin-action-top">
                  <div className="admin-action-icon">
                    <Swords size={18} />
                  </div>

                  <ArrowRight size={15} />
                </div>

                <h3>Match Management</h3>

                <p>
                  Add match results, positions, kills and scoring
                  information.
                </p>
              </Link>

              <Link
                href="/admin/players"
                className="admin-action-card"
              >
                <div className="admin-action-top">
                  <div className="admin-action-icon">
                    <Users size={18} />
                  </div>

                  <ArrowRight size={15} />
                </div>

                <h3>Player Management</h3>

                <p>
                  Manage the roster, player roles, status and
                  profile information.
                </p>
              </Link>

              <Link href="/" className="admin-action-card">
                <div className="admin-action-top">
                  <div className="admin-action-icon">
                    <BarChart3 size={18} />
                  </div>

                  <ArrowRight size={15} />
                </div>

                <h3>View Public Dashboard</h3>

                <p>
                  Open the public statistics dashboard and verify
                  how visitors see the data.
                </p>
              </Link>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <span>DATA FLOW</span>
                <h2>Admin → Database → Website</h2>
              </div>
            </div>

            <div className="admin-workflow">
              <div className="workflow-step">
                <div>01</div>

                <section>
                  <strong>ADMIN</strong>
                  <span>
                    Creates and controls tournament data
                  </span>
                </section>
              </div>

              <div className="workflow-line" />

              <div className="workflow-step">
                <div>02</div>

                <section>
                  <strong>DATABASE</strong>
                  <span>
                    Stores the official statistics
                  </span>
                </section>
              </div>

              <div className="workflow-line" />

              <div className="workflow-step">
                <div>03</div>

                <section>
                  <strong>PUBLIC SITE</strong>
                  <span>
                    Displays the approved data
                  </span>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
