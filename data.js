/* Total Gaming — temporary local data layer */

const POSITION_POINTS = {
  1: 12,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
  11: 0,
  12: 0
};

const TEAM = {
  name: "TOTAL GAMING",
  country: "India",
  shortName: "TG"
};

const PLAYERS = [
  { id: "p1", name: "Player 1", role: "Rusher", active: true },
  { id: "p2", name: "Player 2", role: "IGL", active: true },
  { id: "p3", name: "Player 3", role: "Support", active: true },
  { id: "p4", name: "Player 4", role: "Rusher", active: true }
];

const TOURNAMENTS = [
  {
    id: "ffmic-fall-2026",
    name: "FFMIC Fall 2026",
    status: "ongoing",
    startDate: "2026-09-08"
  }
];

const MATCHES = [
  {
    id: "ffmic-fall-2026-m1",
    tournamentId: "ffmic-fall-2026",
    matchNumber: 1,
    date: "2026-09-08",
    map: "Bermuda",
    position: 1,
    players: [
      { playerId: "p1", kills: 4 },
      { playerId: "p2", kills: 3 },
      { playerId: "p3", kills: 2 },
      { playerId: "p4", kills: 1 }
    ]
  },
  {
    id: "ffmic-fall-2026-m2",
    tournamentId: "ffmic-fall-2026",
    matchNumber: 2,
    date: "2026-09-08",
    map: "Purgatory",
    position: 3,
    players: [
      { playerId: "p1", kills: 3 },
      { playerId: "p2", kills: 2 },
      { playerId: "p3", kills: 2 },
      { playerId: "p4", kills: 1 }
    ]
  },
  {
    id: "ffmic-fall-2026-m3",
    tournamentId: "ffmic-fall-2026",
    matchNumber: 3,
    date: "2026-09-08",
    map: "Alpine",
    position: 5,
    players: [
      { playerId: "p1", kills: 2 },
      { playerId: "p2", kills: 2 },
      { playerId: "p3", kills: 1 },
      { playerId: "p4", kills: 1 }
    ]
  }
];

function getMatchKills(match) {
  return match.players.reduce(
    (total, player) => total + player.kills,
    0
  );
}

function getPositionPoints(position) {
  return POSITION_POINTS[position] ?? 0;
}

function getMatchPoints(match) {
  return (
    getMatchKills(match) +
    getPositionPoints(match.position)
  );
}

function getTournamentMatches(tournamentId) {
  return MATCHES
    .filter((match) => match.tournamentId === tournamentId)
    .sort((a, b) => a.matchNumber - b.matchNumber);
}

function getTournamentStats(tournamentId) {
  const tournamentMatches =
    getTournamentMatches(tournamentId);

  const kills = tournamentMatches.reduce(
    (total, match) => total + getMatchKills(match),
    0
  );

  const positionPoints = tournamentMatches.reduce(
    (total, match) =>
      total + getPositionPoints(match.position),
    0
  );

  return {
    matches: tournamentMatches.length,
    kills,
    positionPoints,
    totalPoints: kills + positionPoints,
    averagePoints: tournamentMatches.length
      ? Number(
          (
            (kills + positionPoints) /
            tournamentMatches.length
          ).toFixed(1)
        )
      : 0
  };
}

function getPlayerStats(tournamentId) {
  const tournamentMatches =
    getTournamentMatches(tournamentId);

  return PLAYERS.map((player) => {
    const kills = tournamentMatches.reduce(
      (total, match) => {
        const entry = match.players.find(
          (item) => item.playerId === player.id
        );

        return total + (entry?.kills ?? 0);
      },
      0
    );

    return {
      ...player,
      matches: tournamentMatches.length,
      kills
    };
  });
}

function getDailyMVP(date, tournamentId) {
  const dailyMatches = MATCHES.filter(
    (match) =>
      match.date === date &&
      match.tournamentId === tournamentId
  );

  const performance = PLAYERS.map((player) => {
    const kills = dailyMatches.reduce(
      (total, match) => {
        const entry = match.players.find(
          (item) => item.playerId === player.id
        );

        return total + (entry?.kills ?? 0);
      },
      0
    );

    return {
      ...player,
      matches: dailyMatches.length,
      kills,
      points: kills
    };
  });

  return (
    performance.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      return b.kills - a.kills;
    })[0] ?? null
  );
}

function getMatchView(match) {
  return {
    ...match,
    kills: getMatchKills(match),
    positionPoints: getPositionPoints(match.position),
    totalPoints: getMatchPoints(match)
  };
}
