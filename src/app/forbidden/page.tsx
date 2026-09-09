import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#09090b",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          textAlign: "center",
          padding: "40px 28px",
          border: "1px solid #27272a",
          borderRadius: "18px",
          background: "#111114",
        }}
      >
        <ShieldX
          size={48}
          style={{ marginBottom: "18px" }}
        />

        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "30px",
          }}
        >
          Access Denied
        </h1>

        <p
          style={{
            margin: "0 0 24px",
            color: "#a1a1aa",
            lineHeight: 1.6,
          }}
        >
          You do not have permission to access
          the Total Gaming Admin Control Center.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            padding: "12px 18px",
            borderRadius: "10px",
            background: "#fff",
            color: "#09090b",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
