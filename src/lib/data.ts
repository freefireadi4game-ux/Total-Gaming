import type {
  Match,
  Player,
  Tournament,
  Team,
} from "@/types";

export const TEAM: Team = {
  id: "total-gaming",
  name: "Total Gaming",
  shortName: "TG",
  country: "India",
};

export const PLAYERS: Player[] = [
  {
    id: "player-1",
    name: "Player 1",
    role: "IGL",
    active: true,
  },
  {
    id: "player-2",
    name: "Player 2",
    role: "Rusher",
    active: true,
  },
  {
    id: "player-3",
    name: "Player 3",
    role: "Support",
    active: true,
  },
  {
    id: "player-4",
    name: "Player 4",
    role: "Fragger",
    active: true,
  },
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: "tournament-1",
    name: "Current Tournament",
    status: "ongoing",
    startDate: "2026-09-01",
  },
];

export const MATCHES: Match[] = [
  {
    id: "match-1",
    tournamentId: "tournament-1",
    matchNumber: 1,
    date: "2026-09-08",
    map: "Bermuda",
    position: 1,
    players: [
      {
        playerId: "player-1",
        kills: 4,
      },
      {
        playerId: "player-2",
        kills: 3,
      },
      {
        playerId: "player-3",
        kills: 2,
      },
      {
        playerId: "player-4",
        kills: 1,
      },
    ],
  },
  {
    id: "match-2",
    tournamentId: "tournament-1",
    matchNumber: 2,
    date: "2026-09-08",
    map: "Purgatory",
    position: 3,
    players: [
      {
        playerId: "player-1",
        kills: 3,
      },
      {
        playerId: "player-2",
        kills: 2,
      },
      {
        playerId: "player-3",
        kills: 2,
      },
      {
        playerId: "player-4",
        kills: 1,
      },
    ],
  },
];

export function getTournamentMatches(
  tournamentId: string
) {
  return MATCHES.filter(
    (match) =>
      match.tournamentId === tournamentId
  );
}

export function getPlayerMatches(
  playerId: string
) {
  return MATCHES.filter((match) =>
    match.players.some(
      (player) =>
        player.playerId === playerId
    )
  );
}
