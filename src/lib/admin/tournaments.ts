import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminTournament = {
  id: string;
  name: string;
  status: "upcoming" | "ongoing" | "completed";
  start_date: string | null;
  end_date: string | null;
  created_at: string;
};

export async function getAdminTournaments(): Promise<
  AdminTournament[]
> {
  const { data, error } = await supabaseAdmin
    .from("tournaments")
    .select(
      "id,name,status,start_date,end_date,created_at"
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Failed to load tournaments: ${error.message}`
    );
  }

  return data ?? [];
}

export async function getAdminTournament(
  id: string
): Promise<AdminTournament | null> {
  const { data, error } = await supabaseAdmin
    .from("tournaments")
    .select(
      "id,name,status,start_date,end_date,created_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load tournament: ${error.message}`
    );
  }

  return data;
}

export async function getTournamentMatchCount(
  tournamentId: string
): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("matches")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("tournament_id", tournamentId);

  if (error) {
    throw new Error(
      `Failed to count matches: ${error.message}`
    );
  }

  return count ?? 0;
}

export async function getTournamentMatches(
  tournamentId: string
) {
  const { data, error } = await supabaseAdmin
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
        total_points
      `
    )
    .eq("tournament_id", tournamentId)
    .order("match_number", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Failed to load matches: ${error.message}`
    );
  }

  return data ?? [];
}
