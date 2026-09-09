import {
  ShieldCheck,
  Database,
  Lock,
  Server,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";

import "../admin.css";

export default function AdminSettingsPage() {
  return (
    <AdminShell
      title="Settings"
      subtitle="System configuration and administrator controls."
    >
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>SYSTEM</span>
            <h2>Admin Settings</h2>
          </div>
        </div>

        <div className="admin-list">
          <div className="admin-list-row">
            <div className="admin-list-main">
              <div className="admin-list-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Admin Access</strong>
                <span>
                  Only authorised administrators
                  can control tournament data.
                </span>
              </div>
            </div>

            <span className="admin-active-badge">
              PROTECTED
            </span>
          </div>

          <div className="admin-list-row">
            <div className="admin-list-main">
              <div className="admin-list-icon">
                <Database size={19} />
              </div>

              <div>
                <strong>Database</strong>
                <span>
                  Supabase is used as the application
                  data layer.
                </span>
              </div>
            </div>

            <span className="admin-active-badge">
              CONNECTED
            </span>
          </div>

          <div className="admin-list-row">
            <div className="admin-list-main">
              <div className="admin-list-icon">
                <Lock size={19} />
              </div>

              <div>
                <strong>Authentication</strong>
                <span>
                  Admin routes require authenticated
                  access.
                </span>
              </div>
            </div>

            <span className="admin-active-badge">
              ENABLED
            </span>
          </div>

          <div className="admin-list-row">
            <div className="admin-list-main">
              <div className="admin-list-icon">
                <Server size={19} />
              </div>

              <div>
                <strong>Environment</strong>
                <span>
                  Production configuration is controlled
                  through environment variables.
                </span>
              </div>
            </div>

            <span className="admin-active-badge">
              SERVER
            </span>
          </div>
        </div>
      </section>

      <div className="admin-note">
        <strong>Admin rule:</strong>{" "}
        tournament, match, team and player
        management remains under administrator
        control.
      </div>
    </AdminShell>
  );
}
