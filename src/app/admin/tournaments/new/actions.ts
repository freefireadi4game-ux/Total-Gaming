"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createTournament(
  formData: FormData
) {
  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const status = String(
    formData.get("status") ?? "upcoming"
  );

  const startDateValue = String(
    formData.get("startDate") ?? ""
  );

  const endDateValue = String(
    formData.get("endDate") ?? ""
  );

  if (!name) {
    throw new Error(
      "Tournament name is required."
    );
  }

  const allowedStatuses = [
    "upcoming",
    "ongoing",
    "completed",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error(
      "Invalid tournament status."
    );
  }

  if (
    startDateValue &&
    endDateValue &&
    startDateValue > endDateValue
  ) {
    throw new Error(
      "End date cannot be before start date."
    );
  }

  const { data, error } = await supabaseAdmin
    .from("tournaments")
    .insert({
      name,
      status,
      start_date:
        startDateValue || null,
      end_date:
        endDateValue || null,
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(
      `Failed to create tournament: ${error.message}`
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/tournaments");

  redirect(
    `/admin/tournaments/${data.id}`
  );
}
