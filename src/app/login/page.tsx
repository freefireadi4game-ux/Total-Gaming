"use client";

import {
  FormEvent,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, ShieldCheck } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const next =
    searchParams.get("next") ||
    "/admin";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(
        "Invalid email or password."
      );
      setLoading(false);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <ShieldCheck size={28} />
        </div>

        <span className="login-eyebrow">
          TOTAL GAMING
        </span>

        <h1>Admin Login</h1>

        <p>
          Sign in to access the tournament
          management system.
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <label>
            <span>Email</span>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>Password</span>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            <LogIn size={18} />

            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>
        </form>

        <div className="login-security">
          ADMIN ONLY · SECURE ACCESS
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #09090b;
          color: #ffffff;
        }

        .login-card {
          width: 100%;
          max-width: 430px;
          padding: 34px;
          border: 1px solid #27272a;
          border-radius: 18px;
          background: #111114;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
        }

        .login-icon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: #18181b;
          border: 1px solid #3f3f46;
          margin-bottom: 20px;
        }

        .login-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #a1a1aa;
        }

        h1 {
          margin: 7px 0 8px;
          font-size: 30px;
        }

        p {
          margin: 0 0 28px;
          color: #a1a1aa;
          line-height: 1.6;
        }

        .login-form {
          display: grid;
          gap: 18px;
        }

        label {
          display: grid;
          gap: 8px;
        }

        label span {
          font-size: 13px;
          font-weight: 700;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid #3f3f46;
          border-radius: 10px;
          background: #09090b;
          color: #ffffff;
          outline: none;
        }

        input:focus {
          border-color: #71717a;
        }

        button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 16px;
          border: 0;
          border-radius: 10px;
          background: #ffffff;
          color: #09090b;
          font-weight: 800;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .login-error {
          padding: 11px 12px;
          border: 1px solid #7f1d1d;
          border-radius: 9px;
          background: #2a1010;
          color: #fca5a5;
          font-size: 13px;
        }

        .login-security {
          margin-top: 22px;
          text-align: center;
          color: #71717a;
          font-size: 10px;
          letter-spacing: 0.12em;
        }
      `}</style>
    </main>
  );
}
