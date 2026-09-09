import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trophy,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { createTournament } from "./actions";

import "../../admin.css";

export default function NewTournamentPage() {
  return (
    <AdminShell
      title="Create Tournament"
      subtitle="Create and publish a tournament from the admin control center."
    >
      <div className="admin-page-heading">
        <Link
          href="/admin/tournaments"
          className="admin-back-link"
        >
          <ArrowLeft size={16} />
          Back to Tournaments
        </Link>

        <span className="admin-eyebrow">
          TOURNAMENT MANAGEMENT
        </span>

        <h2>New Tournament</h2>

        <p>
          Enter the tournament details below.
          Everything is controlled from admin.
        </p>
      </div>

      <form
        action={createTournament}
        className="admin-form-panel"
      >
        <div className="admin-form-icon">
          <Trophy size={24} />
        </div>

        <div className="admin-form-grid">
          <label className="admin-field admin-field-full">
            <span>Tournament Name</span>

            <input
              type="text"
              name="name"
              placeholder="e.g. Total Gaming Championship"
              required
            />
          </label>

          <label className="admin-field">
            <span>Status</span>

            <select
              name="status"
              defaultValue="upcoming"
            >
              <option value="upcoming">
                Upcoming
              </option>

              <option value="ongoing">
                Ongoing
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </label>

          <label className="admin-field">
            <span>Start Date</span>

            <input
              type="date"
              name="startDate"
            />
          </label>

          <label className="admin-field">
            <span>End Date</span>

            <input
              type="date"
              name="endDate"
            />
          </label>
        </div>

        <div className="admin-form-footer">
          <Link
            href="/admin/tournaments"
            className="admin-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button"
          >
            <Save size={18} />
            Create Tournament
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
