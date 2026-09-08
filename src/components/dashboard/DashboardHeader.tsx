import Badge from "@/components/ui/Badge";

interface DashboardHeaderProps {
  teamName: string;
  subtitle?: string;
  tournamentName?: string;
  status?: "live" | "completed" | "upcoming";
}

export default function DashboardHeader({
  teamName,
  subtitle = "Esports Statistics",
  tournamentName,
  status = "live",
}: DashboardHeaderProps) {
  return (
    <section className="hero">
      <div className="live">
        <span className="live-dot" />
        {status === "live"
          ? "LIVE TOURNAMENT DATA"
          : status === "completed"
            ? "TOURNAMENT DATA"
            : "UPCOMING TOURNAMENT"}
      </div>

      <h2>{teamName}</h2>

      <p>{subtitle}</p>

      {tournamentName && (
        <div style={{ marginTop: "14px" }}>
          <Badge variant={status === "live" ? "live" : "default"}>
            {tournamentName}
          </Badge>
        </div>
      )}
    </section>
  );
}
