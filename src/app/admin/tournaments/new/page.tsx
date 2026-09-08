import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import "@/app/admin/admin.css";

export default function NewTournamentPage() {
  return (
    <AdminShell
      title="Create Tournament"
      subtitle="Set up a new tournament before adding teams and matches."
    >
      <div className="admin-form-panel">
        <div className="admin-form-heading">
          <span>TOURNAMENT SETUP</span>
          <h2>Basic Information</h2>
        </div>

        <form className="admin-form">
          <label>
            <span>Tournament Name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter tournament name"
            />
          </label>

          <div className="admin-form-grid">
            <label>
              <span>Status</span>
              <select name="status" defaultValue="upcoming">
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </label>

            <label>
              <span>Start Date</span>
              <input type="date" name="startDate" />
            </label>

            <label>
              <span>End Date</span>
              <input type="date" name="endDate" />
            </label>
          </div>

          <div className="admin-form-actions">
            <Link href="/admin/tournaments" className="admin-cancel-button">
              Cancel
            </Link>

            <button type="submit" className="admin-primary-button">
              Create Tournament
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
