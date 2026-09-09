"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  calculateMatchPoints,
  getPlacementPoints,
} from "@/lib/scoring";

export async function createMatch(formData: FormData) {
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

  if (!tournamentId || !teamId) {
    throw new Error(
      "Tournament and team are required."
    );
  }

  if (
    !Number.isInteger(matchNumber) ||
    matchNumber < 1
  ) {
    throw new Error("Invalid match number.");
  }

  if (!matchDate) {
    throw new Error("Match date is required.");
  }

  if (
    !Number.isInteger(placement) ||
    placement < 1
  ) {
    throw new Error("Invalid placement.");
  }

  const playerEntries = formData
    .getAll("player")
    .map(String)
    .filter(Boolean);

  const killEntries = formData
    .getAll("kills")
    .map((value) => Number(value));

  const players = playerEntries.map(
    (playerId, index) => ({
      playerId,
      kills: Number.isFinite(killEntries[index])
        ? Math.max(0, killEntries[index])
        : 0,
    })
  );

  const totalKills = players.reduce(
    (sum, player) => sum + player.kills,
    0
  );

  const scoring = calculateMatchPoints(
    totalKills,
    placement
  );

  const { data: match, error: matchError } =
    await supabaseAdmin
      .from("matches")
      .insert({
        tournament_id: tournamentId,
        team_id: teamId,
        match_number: matchNumber,
        match_date: matchDate,
        map: map || null,
        placement,
        position_points:
          getPlacementPoints(placement),
        total_kills: totalKills,
        total_points: scoring.totalPoints,
      })
      .select("id")
      .single();

  if (matchError || !match) {
    throw new Error(
      matchError?.message ??
        "Failed to create match."
    );
  }

  if (players.length > 0) {
    const rows = players.map((player) => ({
      match_id: match.id,
      player_id: player.playerId,
      kills: player.kills,
      points: player.kills,
    }));

    const { error: playerError } =
      await supabaseAdmin
        .from("match_players")
        .insert(rows);

    if (playerError) {
      await supabaseAdmin
        .from("matches")
        .delete()
        .eq("id", match.id);

      throw new Error(
        `Failed to save player results: ${playerError.message}`
      );
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/matches");
  revalidatePath("/admin/tournaments");
  revalidatePath(
    `/admin/tournaments/${tournamentId}`
  );

  redirect(`/admin/matches/${match.id}`);
}
