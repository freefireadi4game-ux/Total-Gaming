import Link from "next/link";
import {
  LayoutDashboard,
  Trophy,
  Swords,
  Users,
  UserRound,
  Settings,
  ShieldCheck,
} from "lucide-react";

type AdminShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const navItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Tournaments",
    href: "/admin/tournaments",
    icon: Trophy,
  },
  {
    label: "Matches",
    href: "/admin/matches",
    icon: Swords,
  },
  {
    label: "Teams",
    href: "/admin/teams",
    icon: Users,
  },
  {
    label: "Players",
    href: "/admin/players",
    icon: UserRound,
  },
];

export default function AdminShell({
  title,
  subtitle,
  children,
}: AdminShellProps) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">TG</div>

          <div>
            <strong>TOTAL GAMING</strong>
            <span>ADMIN PANEL</span>
          </div>
        </div>

        <div className="admin-section-label">CONTROL</div>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="admin-nav-link"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-section-label">SYSTEM</div>

        <nav className="admin-nav">
          <Link href="/admin/settings" className="admin-nav-link">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-security">
            <ShieldCheck size={18} />
            <div>
              <strong>Admin Control</strong>
              <span>Restricted access</span>
            </div>
          </div>

          <Link href="/" className="admin-back">
            ← View Public Dashboard
          </Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <div className="admin-breadcrumb">ADMIN / CONTROL CENTER</div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <div className="admin-status">
            <span className="admin-status-dot" />
            ADMIN ONLINE
          </div>
        </header>

        <section className="admin-content">{children}</section>
      </main>
    </div>
  );
}
