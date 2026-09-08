import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin Control Center | Total Gaming",
  description: "Total Gaming administration panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminShell
      title="Control Center"
      subtitle="Manage tournaments, matches, teams and players."
    >
      {children}
    </AdminShell>
  );
}
