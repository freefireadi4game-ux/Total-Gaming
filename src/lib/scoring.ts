export const PLACEMENT_POINTS: Record<number, number> = {
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
  12: 0,
};

export const KILL_POINT = 1;

export function getPlacementPoints(position: number): number {
  return PLACEMENT_POINTS[position] ?? 0;
}

export function calculateMatchPoints(
  kills: number,
  position: number
) {
  const killPoints = kills * KILL_POINT;
  const positionPoints = getPlacementPoints(position);

  return {
    killPoints,
    positionPoints,
    totalPoints: killPoints + positionPoints,
  };
}

export function calculateTotalPoints(
  matches: Array<{
    kills: number;
    position: number;
  }>
) {
  return matches.reduce((total, match) => {
    return (
      total +
      calculateMatchPoints(
        match.kills,
        match.position
      ).totalPoints
    );
  }, 0);
}
