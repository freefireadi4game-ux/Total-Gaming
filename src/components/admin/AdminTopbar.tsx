import { ShieldCheck } from "lucide-react";

interface AdminTopbarProps {
  title: string;
  description: string;
}

export default function AdminTopbar({
  title,
  description,
}: AdminTopbarProps) {
  return (
    <header className="admin-header">
      <div>
        <div className="admin-breadcrumb">
          TOTAL GAMING / ADMIN
        </div>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      <div className="admin-status">
        <span className="admin-status-dot" />
        <ShieldCheck size={12} />
        ADMIN MODE
      </div>
    </header>
  );
}
