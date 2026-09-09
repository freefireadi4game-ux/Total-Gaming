"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createTeam(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const shortName = String(
    formData.get("shortName") ?? ""
  ).trim();
  const country = String(
    formData.get("country") ?? "India"
  ).trim();
  const logoUrl = String(
    formData.get("logoUrl") ?? ""
  ).trim();

  if (!name) {
    throw new Error("Team name is required.");
  }

  const { data, error } = await supabaseAdmin
    .from("teams")
    .insert({
      name,
      short_name: shortName || null,
      country: country || "India",
      logo_url: logoUrl || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(
      error?.message ?? "Failed to create team."
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/teams");
  revalidatePath("/admin/players");

  redirect(`/admin/teams/${data.id}`);
}

export async function updateTeam(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const shortName = String(
    formData.get("shortName") ?? ""
  ).trim();
  const country = String(
    formData.get("country") ?? "India"
  ).trim();
  const logoUrl = String(
    formData.get("logoUrl") ?? ""
  ).trim();

  if (!id || !name) {
    throw new Error("Team ID and name are required.");
  }

  const { error } = await supabaseAdmin
    .from("teams")
    .update({
      name,
      short_name: shortName || null,
      country: country || "India",
      logo_url: logoUrl || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to update team: ${error.message}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/teams");
  revalidatePath(`/admin/teams/${id}`);
  revalidatePath("/admin/players");

  redirect(`/admin/teams/${id}`);
}

export async function deleteTeam(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Team ID is required.");
  }

  const { error } = await supabaseAdmin
    .from("teams")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to delete team: ${error.message}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/teams");
  revalidatePath("/admin/players");
  revalidatePath("/admin/matches");

  redirect("/admin/teams");
}
