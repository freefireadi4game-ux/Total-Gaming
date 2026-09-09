import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Swords,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";

import { updateMatch } from "../actions";

import "../../../admin.css";

const MAPS = [
  "Bermuda",
  "Purgatory",
  "Alpine",
  "NexTerra",
  "Kalahari",
];

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMatchPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: match } =
    await supabaseAdmin
      .from("matches")
      .select(
        `
          id,
          tournament_id,
          team_id,
          match_number,
          match_date,
          map,
          placement,
          tournaments (
            id,
            name
          ),
          teams (
            id,
            name
          ),
          match_players (
            player_id,
            kills
          )
        `
      )
      .eq("id", id)
      .maybeSingle();

  if (!match) {
    return (
      <AdminShell
        title="Match Not Found"
        subtitle="The requested match does not exist."
      >
        <Link
          href="/admin/matches"
          className="admin-secondary-button"
        >
          <ArrowLeft size={16} />
          Back to Matches
        </Link>
      </AdminShell>
    );
  }

  const [
    tournamentsResult,
    teamsResult,
    playersResult,
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

    supabaseAdmin
      .from("players")
      .select("id,name,role")
      .eq("team_id", match.team_id)
      .eq("active", true)
      .order("name"),
  ]);

  const tournaments =
    tournamentsResult.data ?? [];

  const teams =
    teamsResult.data ?? [];

  const players =
    playersResult.data ?? [];

  const killMap = new Map(
    (match.match_players ?? []).map(
      (item) => [
        item.player_id,
        item.kills,
      ]
    )
  );

  return (
    <AdminShell
      title={`Edit Match ${match.match_number}`}
      subtitle="Update match information and player results."
    >
      <div className="admin-page-heading">
        <Link
          href={`/admin/matches/${id}`}
          className="admin-back-link"
        >
          <ArrowLeft size={16} />
          Back to Match
        </Link>

        <span className="admin-eyebrow">
          MATCH MANAGEMENT
        </span>

        <h2>
          Edit Match {match.match_number}
        </h2>

        <p>
          Changes are recalculated automatically
          before saving.
        </p>
      </div>

      <form
        action={updateMatch}
        className="admin-form-panel"
      >
        <input
          type="hidden"
          name="matchId"
          value={id}
        />

        <div className="admin-form-icon">
          <Swords size={24} />
        </div>

        <div className="admin-form-grid">
          <label className="admin-field admin-field-full">
            <span>Tournament</span>

            <select
              name="tournamentId"
              defaultValue={
                match.tournament_id
              }
              required
            >
              {tournaments.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} · {item.status}
                </option>
              ))}
            </select>
          </label>

          <label className="admin-field admin-field-full">
            <span>Team</span>

            <select
              name="teamId"
              defaultValue={match.team_id}
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
              defaultValue={
                match.match_number
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Match Date</span>

            <input
              type="date"
              name="matchDate"
              defaultValue={
                match.match_date
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Map</span>

            <select
              name="map"
              defaultValue={
                match.map ?? MAPS[0]
              }
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
              defaultValue={
                match.placement
              }
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
                No active players
              </strong>

              <span>
                No active players exist for
                this team.
              </span>
            </div>
          ) : (
            <div className="admin-form-grid">
              {players.map((player) => (
                <div
                  className="admin-field"
                  key={player.id}
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
                    defaultValue={
                      killMap.get(
                        player.id
                      ) ?? 0
                    }
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
            href={`/admin/matches/${id}`}
            className="admin-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button"
            disabled={
              players.length === 0
            }
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
