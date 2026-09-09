import Link from "next/link";
import {
  ArrowLeft,
  Crosshair,
  Map,
  Pencil,
  Trophy,
  Users,
  Trash2,
} from "lucide-react";

import AdminShell from "@/components/admin/AdminShell";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { calculateMatchPoints } from "@/lib/scoring";

import { deleteMatch } from "./actions";

import "../../admin.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MatchDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: match, error } =
    await supabaseAdmin
      .from("matches")
      .select(
        `
          id,
          match_number,
          match_date,
          map,
          placement,
          position_points,
          total_kills,
          total_points,
          tournament_id,
          tournaments (
            id,
            name
          ),
          teams (
            id,
            name,
            short_name
          ),
          match_players (
            id,
            player_id,
            kills,
            points,
            players (
              id,
              name,
              role
            )
          )
        `
      )
      .eq("id", id)
      .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load match: ${error.message}`
    );
  }

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

  const tournament =
    Array.isArray(match.tournaments)
      ? match.tournaments[0]
      : match.tournaments;

  const team =
    Array.isArray(match.teams)
      ? match.teams[0]
      : match.teams;

  const players =
    (match.match_players ?? []).map(
      (item) => {
        const player =
          Array.isArray(item.players)
            ? item.players[0]
            : item.players;

        return {
          id: item.id,
          name:
            player?.name ??
            item.player_id,
          role:
            player?.role ??
            "Player",
          kills: item.kills,
          points: item.points,
        };
      }
    );

  const calculated =
    calculateMatchPoints(
      match.total_kills,
      match.placement
    );

  return (
    <AdminShell
      title={`Match ${match.match_number}`}
      subtitle={`${match.map ?? "Map"} · ${match.match_date}`}
    >
      <div className="admin-page-toolbar">
        <div>
          <Link
            href="/admin/matches"
            className="admin-back-link"
          >
            <ArrowLeft size={16} />
            All Matches
          </Link>

          <span className="admin-muted-label">
            MATCH CONTROL
          </span>

          <h2 className="admin-page-title">
            Match {match.match_number}
          </h2>
        </div>

        <Link
          href={`/admin/matches/${id}/edit`}
          className="admin-primary-button"
        >
          <Pencil size={17} />
          Edit Match
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Map size={19} />
          </div>

          <div>
            <span>MAP</span>
            <strong>
              {match.map ?? "—"}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>POSITION</span>
            <strong>
              #{match.placement}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Crosshair size={19} />
          </div>

          <div>
            <span>KILLS</span>
            <strong>
              {match.total_kills}
            </strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <Trophy size={19} />
          </div>

          <div>
            <span>TOTAL POINTS</span>
            <strong>
              {calculated.totalPoints}
            </strong>
          </div>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>RESULT INFORMATION</span>
            <h2>Match Overview</h2>
          </div>
        </div>

        <div className="admin-list">
          <div className="admin-list-row">
            <div className="admin-list-main">
              <div className="admin-list-icon">
                <Trophy size={18} />
              </div>

              <div>
                <strong>
                  {tournament?.name ??
                    "Tournament"}
                </strong>

                <span>
                  {team?.name ??
                    "Team"}
                </span>
              </div>
            </div>

            <div className="admin-list-right">
              <div className="admin-points">
                <strong>
                  {calculated.positionPoints}
                </strong>

                <span>
                  POSITION PTS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>PLAYER RESULTS</span>
            <h2>Kill Breakdown</h2>
          </div>
        </div>

        {players.length === 0 ? (
          <div className="admin-empty-state">
            <Users size={28} />

            <strong>
              No player results
            </strong>

            <span>
              This match has no player kill
              records.
            </span>
          </div>
        ) : (
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
                    <strong>
                      {player.name}
                    </strong>

                    <span>
                      {player.role}
                    </span>
                  </div>
                </div>

                <div className="admin-table-info">
                  <span>KILLS</span>

                  <strong>
                    {player.kills}
                  </strong>
                </div>

                <div className="admin-table-info">
                  <span>POINTS</span>

                  <strong>
                    {player.points}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="admin-note">
        <strong>Calculated:</strong>{" "}
        {match.total_kills} kill points +{" "}
        {match.position_points} placement
        points ={" "}
        {match.total_points} total points.
      </div>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>DANGER ZONE</span>
            <h2>Delete Match</h2>
          </div>
        </div>

        <form action={deleteMatch}>
          <input
            type="hidden"
            name="matchId"
            value={id}
          />

          <button
            type="submit"
            className="admin-secondary-button"
          >
            <Trash2 size={16} />
            Delete This Match
          </button>
        </form>
      </section>
    </AdminShell>
  );
}
