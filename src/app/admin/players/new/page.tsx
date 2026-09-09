import Link from "next/link";
import {
  ArrowLeft,
  Save,
  UserPlus,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";

import { createPlayer } from "../actions";

import "../../admin.css";

export default async function NewPlayerPage() {
  const { data: teams, error } =
    await supabaseAdmin
      .from("teams")
      .select("id,name,short_name")
      .order("name");

  if (error) {
    throw new Error(
      `Failed to load teams: ${error.message}`
    );
  }

  return (
    <AdminShell
      title="Add Player"
      subtitle="Add a player to a registered team."
    >
      <div className="admin-page-heading">
        <Link
          href="/admin/players"
          className="admin-back-link"
        >
          <ArrowLeft size={16} />
          Back to Players
        </Link>

        <span className="admin-eyebrow">
          ROSTER MANAGEMENT
        </span>

        <h2>New Player</h2>

        <p>
          Player results can be attached to
          matches after the player is created.
        </p>
      </div>

      {!teams?.length ? (
        <section className="admin-panel">
          <div className="admin-empty-state">
            <strong>
              Create a team first
            </strong>

            <span>
              Players must belong to a team.
            </span>

            <Link
              href="/admin/teams/new"
              className="admin-primary-button"
            >
              Create Team
            </Link>
          </div>
        </section>
      ) : (
        <form
          action={createPlayer}
          className="admin-form-panel"
        >
          <div className="admin-form-icon">
            <UserPlus size={24} />
          </div>

          <div className="admin-form-grid">
            <label className="admin-field admin-field-full">
              <span>Team</span>

              <select
                name="teamId"
                required
              >
                {teams.map((team) => (
                  <option
                    key={team.id}
                    value={team.id}
                  >
                    {team.name}
                    {team.short_name
                      ? ` (${team.short_name})`
                      : ""}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Player Name</span>

              <input
                type="text"
                name="name"
                placeholder="Player name"
                required
              />
            </label>

            <label className="admin-field">
              <span>Role</span>

              <select
                name="role"
                defaultValue="Player"
              >
                <option value="IGL">
                  IGL
                </option>

                <option value="Player">
                  Player
                </option>

                <option value="Support">
                  Support
                </option>

                <option value="Rusher">
                  Rusher
                </option>

                <option value="Sniper">
                  Sniper
                </option>

                <option value="Coach">
                  Coach
                </option>
              </select>
            </label>

            <label className="admin-field admin-field-full">
              <span>Avatar URL</span>

              <input
                type="url"
                name="avatarUrl"
                placeholder="https://..."
              />
            </label>
          </div>

          <div className="admin-form-footer">
            <Link
              href="/admin/players"
              className="admin-secondary-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="admin-primary-button"
            >
              <Save size={18} />
              Add Player
            </button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
