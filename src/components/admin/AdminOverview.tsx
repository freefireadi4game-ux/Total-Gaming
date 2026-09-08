import {
  Trophy,
  Swords,
  Users,
  UserRound,
  Plus,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    label: "Active Tournaments",
    value: "1",
    icon: Trophy,
  },
  {
    label: "Total Matches",
    value: "2",
    icon: Swords,
  },
  {
    label: "Teams",
    value: "1",
    icon: Users,
  },
  {
    label: "Players",
    value: "4",
    icon: UserRound,
  },
];

const actions = [
  {
    title: "Create Tournament",
    description: "Add a new tournament and configure its schedule.",
    href: "/admin/tournaments/new",
    icon: Trophy,
  },
  {
    title: "Add Match",
    description: "Enter match results, position and player kills.",
    href: "/admin/matches/new",
    icon: Swords,
  },
  {
    title: "Manage Teams",
    description: "Create, edit or deactivate tournament teams.",
    href: "/admin/teams",
    icon: Users,
  },
  {
    title: "Manage Players",
    description: "Control player profiles, roles and active status.",
    href: "/admin/players",
    icon: UserRound,
  },
];

export default function AdminOverview() {
  return (
    <div className="admin-overview">
      <div className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="admin-stat-card" key={stat.label}>
              <div className="admin-stat-icon">
                <Icon size={20} />
              </div>

              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>ADMIN ACTIONS</span>
            <h2>Control Center</h2>
          </div>

          <div className="admin-live-badge">
            LIVE CONTROL
          </div>
        </div>

        <div className="admin-actions-grid">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <a
                href={action.href}
                className="admin-action-card"
                key={action.title}
              >
                <div className="admin-action-top">
                  <div className="admin-action-icon">
                    <Icon size={21} />
                  </div>

                  <ArrowRight size={18} />
                </div>

                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </a>
            );
          })}
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>QUICK START</span>
            <h2>Recommended Workflow</h2>
          </div>
        </div>

        <div className="admin-workflow">
          <div className="workflow-step">
            <div>01</div>
            <section>
              <strong>Create tournament</strong>
              <span>Set name, status and dates.</span>
            </section>
          </div>

          <div className="workflow-line" />

          <div className="workflow-step">
            <div>02</div>
            <section>
              <strong>Add teams & players</strong>
              <span>Build the tournament roster.</span>
            </section>
          </div>

          <div className="workflow-line" />

          <div className="workflow-step">
            <div>03</div>
            <section>
              <strong>Enter match results</strong>
              <span>Position + kills are calculated automatically.</span>
            </section>
          </div>

          <div className="workflow-line" />

          <div className="workflow-step">
            <div>04</div>
            <section>
              <strong>Publish</strong>
              <span>Public dashboard displays the approved data.</span>
            </section>
          </div>
        </div>
      </div>

      <a href="/admin/tournaments/new" className="admin-primary-button">
        <Plus size={18} />
        Create Your First Tournament
      </a>
    </div>
  );
}
