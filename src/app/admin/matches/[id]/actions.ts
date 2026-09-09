"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { calculateMatchPoints } from "@/lib/scoring";

export async function deleteMatch(
  formData: FormData
) {
  const matchId = String(
    formData.get("matchId") ?? ""
  ).trim();

  if (!matchId) {
    throw new Error("Match ID is required.");
  }

  const { data: match } =
    await supabaseAdmin
      .from("matches")
      .select("tournament_id")
      .eq("id", matchId)
      .maybeSingle();

  if (!match) {
    throw new Error("Match not found.");
  }

  const { error } =
    await supabaseAdmin
      .from("matches")
      .delete()
      .eq("id", matchId);

  if (error) {
    throw new Error(
      `Failed to delete match: ${error.message}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/matches");
  revalidatePath("/admin/tournaments");
  revalidatePath(
    `/admin/tournaments/${match.tournament_id}`
  );

  redirect("/admin/matches");
}

export async function updateMatch(
  formData: FormData
) {
  const matchId = String(
    formData.get("matchId") ?? ""
  ).trim();

  const tournamentId = String(
    formData.get("tournamentId") ?? ""
  ).trim();

  const teamId = String(
    formData.get("teamId") ?? ""
  ).trim();

  const matchNumber = Number(
    formData.get("matchNumber")
  );

  const matchDate = String(
    formData.get("matchDate") ?? ""
  ).trim();

  const map = String(
    formData.get("map") ?? ""
  ).trim();

  const placement = Number(
    formData.get("placement")
  );

  if (
    !matchId ||
    !tournamentId ||
    !teamId ||
    !matchDate
  ) {
    throw new Error(
      "Required match information is missing."
    );
  }

  if (
    !Number.isInteger(matchNumber) ||
    matchNumber < 1
  ) {
    throw new Error("Invalid match number.");
  }

  if (
    !Number.isInteger(placement) ||
    placement < 1
  ) {
    throw new Error("Invalid placement.");
  }

  const playerIds = formData
    .getAll("player")
    .map(String)
    .filter(Boolean);

  const killValues = formData
    .getAll("kills")
    .map((value) => Number(value));

  const players = playerIds.map(
    (playerId, index) => ({
      playerId,
      kills: Number.isFinite(
        killValues[index]
      )
        ? Math.max(0, killValues[index])
        : 0,
    })
  );

  const totalKills = players.reduce(
    (sum, player) =>
      sum + player.kills,
    0
  );

  const scoring = calculateMatchPoints(
    totalKills,
    placement
  );

  const { error: matchError } =
    await supabaseAdmin
      .from("matches")
      .update({
        tournament_id: tournamentId,
        team_id: teamId,
        match_number: matchNumber,
        match_date: matchDate,
        map: map || null,
        placement,
        position_points:
          scoring.positionPoints,
        total_kills: totalKills,
        total_points:
          scoring.totalPoints,
      })
      .eq("id", matchId);

  if (matchError) {
    throw new Error(
      `Failed to update match: ${matchError.message}`
    );
  }

  const { error: deletePlayersError } =
    await supabaseAdmin
      .from("match_players")
      .delete()
      .eq("match_id", matchId);

  if (deletePlayersError) {
    throw new Error(
      `Failed to reset player results: ${deletePlayersError.message}`
    );
  }

  if (players.length > 0) {
    const { error: insertPlayersError } =
      await supabaseAdmin
        .from("match_players")
        .insert(
          players.map((player) => ({
            match_id: matchId,
            player_id: player.playerId,
            kills: player.kills,
            points: player.kills,
          }))
        );

    if (insertPlayersError) {
      throw new Error(
        `Failed to save player results: ${insertPlayersError.message}`
      );
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/matches");
  revalidatePath(
    `/admin/matches/${matchId}`
  );
  revalidatePath(
    `/admin/tournaments/${tournamentId}`
  );

  redirect(
    `/admin/matches/${matchId}`
  );
}
