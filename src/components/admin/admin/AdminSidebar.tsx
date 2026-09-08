"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Swords,
  Users,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/tournaments",
    label: "Tournaments",
    icon: Trophy,
  },
  {
    href: "/admin/matches",
    label: "Matches",
    icon: Swords,
  },
  {
    href: "/admin/players",
    label: "Players",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-logo">TG</div>

        <div>
          <strong>Total Gaming</strong>
          <span>ADMIN CONTROL</span>
        </div>
      </div>

      <div className="admin-section-label">CONTROL PANEL</div>

      <nav className="admin-nav">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-nav-link ${
                active ? "admin-nav-link-active" : ""
              }`}
            >
              <Icon size={16} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-bottom">
        <div className="admin-security">
          <ShieldCheck size={17} />

          <div>
            <strong>Admin Access</strong>
            <span>Full control enabled</span>
          </div>
        </div>

        <Link href="/" className="admin-back">
          <ArrowLeft size={12} />
          Back to public site
        </Link>
      </div>
    </aside>
  );
}
