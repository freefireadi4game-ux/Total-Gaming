export type TournamentStatus =
  | "upcoming"
  | "ongoing"
  | "completed";

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  country: string;
  logoUrl?: string;
}

export interface Player {
  id: string;
  name: string;
  role: string;
  active: boolean;
  avatarUrl?: string;
}

export interface Tournament {
  id: string;
  name: string;
  status: TournamentStatus;
  startDate?: string;
  endDate?: string;
}

export interface MatchPlayer {
  playerId: string;
  kills: number;
}

export interface Match {
  id: string;
  tournamentId: string;
  matchNumber: number;
  date: string;
  map: string;
  position: number;
  players: MatchPlayer[];
}

export interface MatchStats {
  kills: number;
  killPoints: number;
  positionPoints: number;
  totalPoints: number;
}

export interface PlayerStats {
  playerId: string;
  matches: number;
  kills: number;
  points: number;
}
