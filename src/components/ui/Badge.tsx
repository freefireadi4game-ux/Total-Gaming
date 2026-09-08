interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "live" | "success" | "muted";
}

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
}
