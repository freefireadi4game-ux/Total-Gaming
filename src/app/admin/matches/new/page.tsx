import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Swords,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createMatch } from "./actions";

import "../../admin.css";

const MAPS = [
  "Bermuda",
  "Purgatory",
  "Alpine",
  "NexTerra",
  "Kalahari",
];

type Props = {
  searchParams: Promise<{
    tournament?: string;
  }>;
};

export default async function NewMatchPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const [
    tournamentsResult,
    teamsResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("tournaments")
      .select("id,name,status")
      .order("created_at", {
        ascending: false,
      }),

    supabaseAdmin
      .from("teams")
      .select("id,name,short_name")
      .order("name"),
  ]);

  const tournaments =
    tournamentsResult.data ?? [];

  const teams = teamsResult.data ?? [];

  const selectedTournament =
    params.tournament &&
    tournaments.some(
      (item) => item.id === params.tournament
    )
      ? params.tournament
      : tournaments[0]?.id ?? "";

  const selectedTeam =
    teams[0]?.id ?? "";

  const { data: players } =
    selectedTeam
      ? await supabaseAdmin
          .from("players")
          .select("id,name,role")
          .eq("team_id", selectedTeam)
          .eq("active", true)
          .order("name")
      : { data: [] };

  return (
    <AdminShell
      title="Add Match"
      subtitle="Enter the complete match result and player kill data."
    >
      <div className="admin-page-heading">
        <Link
          href="/admin/matches"
          className="admin-back-link"
        >
          <ArrowLeft size={16} />
          Back to Matches
        </Link>

        <span className="admin-eyebrow">
          MATCH MANAGEMENT
        </span>

        <h2>Add Match Result</h2>

        <p>
          All scoring is calculated automatically
          from the central scoring rules.
        </p>
      </div>

      <form
        action={createMatch}
        className="admin-form-panel"
      >
        <div className="admin-form-icon">
          <Swords size={24} />
        </div>

        <div className="admin-form-grid">
          <label className="admin-field admin-field-full">
            <span>Tournament</span>

            <select
              name="tournamentId"
              defaultValue={selectedTournament}
              required
            >
              {tournaments.map((tournament) => (
                <option
                  key={tournament.id}
                  value={tournament.id}
                >
                  {tournament.name} ·{" "}
                  {tournament.status}
                </option>
              ))}
            </select>
          </label>

          <label className="admin-field admin-field-full">
            <span>Team</span>

            <select
              name="teamId"
              defaultValue={selectedTeam}
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
            <span>Match Number</span>

            <input
              type="number"
              name="matchNumber"
              min="1"
              defaultValue="1"
              required
            />
          </label>

          <label className="admin-field">
            <span>Match Date</span>

            <input
              type="date"
              name="matchDate"
              required
            />
          </label>

          <label className="admin-field">
            <span>Map</span>

            <select
              name="map"
              defaultValue={MAPS[0]}
            >
              {MAPS.map((item) => (
                <option
                  value={item}
                  key={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="admin-field">
            <span>Final Position</span>

            <input
              type="number"
              name="placement"
              min="1"
              max="12"
              defaultValue="1"
              required
            />
          </label>
        </div>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>PLAYER RESULTS</span>
              <h2>Kill Breakdown</h2>
            </div>
          </div>

          {players.length === 0 ? (
            <div className="admin-empty-state">
              <strong>
                No active players found
              </strong>

              <span>
                Add players to the selected team
                before entering match kills.
              </span>
            </div>
          ) : (
            <div className="admin-form-grid">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="admin-field"
                >
                  <span>
                    {player.name}
                    {player.role
                      ? ` · ${player.role}`
                      : ""}
                  </span>

                  <input
                    type="hidden"
                    name="player"
                    value={player.id}
                  />

                  <input
                    type="number"
                    name="kills"
                    min="0"
                    defaultValue="0"
                    inputMode="numeric"
                    required
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="admin-form-footer">
          <Link
            href="/admin/matches"
            className="admin-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button"
            disabled={
              tournaments.length === 0 ||
              teams.length === 0 ||
              players.length === 0
            }
          >
            <Save size={18} />
            Save Match
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
