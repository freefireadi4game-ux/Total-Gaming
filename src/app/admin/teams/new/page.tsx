import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Users,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { createTeam } from "../actions";

import "../../admin.css";

export default function NewTeamPage() {
  return (
    <AdminShell
      title="Create Team"
      subtitle="Add a team to the Total Gaming statistics database."
    >
      <div className="admin-page-heading">
        <Link
          href="/admin/teams"
          className="admin-back-link"
        >
          <ArrowLeft size={16} />
          Back to Teams
        </Link>

        <span className="admin-eyebrow">
          TEAM MANAGEMENT
        </span>

        <h2>New Team</h2>

        <p>
          Team information will be available
          across matches, tournaments and
          statistics.
        </p>
      </div>

      <form
        action={createTeam}
        className="admin-form-panel"
      >
        <div className="admin-form-icon">
          <Users size={24} />
        </div>

        <div className="admin-form-grid">
          <label className="admin-field admin-field-full">
            <span>Team Name</span>

            <input
              type="text"
              name="name"
              placeholder="Total Gaming"
              required
            />
          </label>

          <label className="admin-field">
            <span>Short Name</span>

            <input
              type="text"
              name="shortName"
              placeholder="TG"
            />
          </label>

          <label className="admin-field">
            <span>Country</span>

            <input
              type="text"
              name="country"
              defaultValue="India"
            />
          </label>

          <label className="admin-field admin-field-full">
            <span>Logo URL</span>

            <input
              type="url"
              name="logoUrl"
              placeholder="https://..."
            />
          </label>
        </div>

        <div className="admin-form-footer">
          <Link
            href="/admin/teams"
            className="admin-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button"
          >
            <Save size={18} />
            Create Team
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
