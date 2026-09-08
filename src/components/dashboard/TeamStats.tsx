import StatCard from "@/components/ui/StatCard";

interface TeamStatsProps {
  totalPoints: number;
  totalKills: number;
  positionPoints: number;
  matches: number;
  averagePoints: number;
}

export default function TeamStats({
  totalPoints,
  totalKills,
  positionPoints,
  matches,
  averagePoints,
}: TeamStatsProps) {
  return (
    <section className="section">
      <div className="stats">

        <StatCard
          label="TOURNAMENT POINTS"
          value={totalPoints}
          description="Kills + position points"
          featured
        />

        <StatCard
          label="TOTAL KILLS"
          value={totalKills}
          description={`${matches} matches played`}
        />

        <StatCard
          label="POSITION POINTS"
          value={positionPoints}
          description="Placement contribution"
        />

        <StatCard
          label="AVG / MATCH"
          value={averagePoints}
          description="Average tournament points"
        />

      </div>
    </section>
  );
}
