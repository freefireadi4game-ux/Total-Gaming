"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createPlayer(
  formData: FormData
) {
  const teamId = String(
    formData.get("teamId") ?? ""
  ).trim();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const role = String(
    formData.get("role") ?? ""
  ).trim();

  const avatarUrl = String(
    formData.get("avatarUrl") ?? ""
  ).trim();

  if (!teamId || !name) {
    throw new Error(
      "Team and player name are required."
    );
  }

  const { data, error } = await supabaseAdmin
    .from("players")
    .insert({
      team_id: teamId,
      name,
      role: role || null,
      active: true,
      avatar_url: avatarUrl || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(
      error?.message ?? "Failed to create player."
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/players");
  revalidatePath("/admin/teams");

  redirect("/admin/players");
}

export async function updatePlayer(
  formData: FormData
) {
  const id = String(
    formData.get("id") ?? ""
  ).trim();

  const teamId = String(
    formData.get("teamId") ?? ""
  ).trim();

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const role = String(
    formData.get("role") ?? ""
  ).trim();

  const active =
    formData.get("active") === "true";

  const avatarUrl = String(
    formData.get("avatarUrl") ?? ""
  ).trim();

  if (!id || !teamId || !name) {
    throw new Error(
      "Player, team and name are required."
    );
  }

  const { error } = await supabaseAdmin
    .from("players")
    .update({
      team_id: teamId,
      name,
      role: role || null,
      active,
      avatar_url: avatarUrl || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to update player: ${error.message}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/players");
  revalidatePath("/admin/teams");
  revalidatePath("/admin/matches");

  redirect("/admin/players");
}

export async function deletePlayer(
  formData: FormData
) {
  const id = String(
    formData.get("id") ?? ""
  ).trim();

  if (!id) {
    throw new Error("Player ID is required.");
  }

  const { error } = await supabaseAdmin
    .from("players")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete player: ${error.message}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/players");
  revalidatePath("/admin/teams");
  revalidatePath("/admin/matches");

  redirect("/admin/players");
}
