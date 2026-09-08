"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Swords } from "lucide-react";
import { TOURNAMENTS } from "@/lib/data";

const MAPS = [
  "Bermuda",
  "Purgatory",
  "Alpine",
  "NexTerra",
  "Kalahari",
];

export default function NewMatchPage() {
  const [tournamentId, setTournamentId] = useState(
    TOURNAMENTS[0]?.id ?? ""
  );
  const [matchNumber, setMatchNumber] = useState("1");
  const [date, setDate] = useState("");
  const [map, setMap] = useState(MAPS[0]);
  const [position, setPosition] = useState("1");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!tournamentId) {
      alert("Please create a tournament first.");
      return;
    }

    alert(
      `Match ready to save:\n\nMatch ${matchNumber}\nMap: ${map}\nPosition: #${position}`
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-heading">
        <Link href="/admin/matches" className="admin-back-link">
          <ArrowLeft size={16} />
          Back to Matches
        </Link>

        <span className="admin-eyebrow">
          MATCH MANAGEMENT
        </span>

        <h2>Add Match Result</h2>

        <p>
          Enter the match result. Player kills will be connected
          to this match in the next data layer.
        </p>
      </div>

      <form
        className="admin-form-panel"
        onSubmit={handleSubmit}
      >
        <div className="admin-form-icon">
          <Swords size={24} />
        </div>

        <div className="admin-form-grid">
          <label className="admin-field admin-field-full">
            <span>Tournament</span>

            <select
              value={tournamentId}
              onChange={(event) =>
                setTournamentId(event.target.value)
              }
            >
              {TOURNAMENTS.map((tournament) => (
                <option
                  value={tournament.id}
                  key={tournament.id}
                >
                  {tournament.name}
                </option>
              ))}
            </select>
          </label>

          <label className="admin-field">
            <span>Match Number</span>

            <input
              type="number"
              min="1"
              value={matchNumber}
              onChange={(event) =>
                setMatchNumber(event.target.value)
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Date</span>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              required
            />
          </label>

          <label className="admin-field">
            <span>Map</span>

            <select
              value={map}
              onChange={(event) =>
                setMap(event.target.value)
              }
            >
              {MAPS.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="admin-field">
            <span>Final Position</span>

            <input
              type="number"
              min="1"
              max="12"
              value={position}
              onChange={(event) =>
                setPosition(event.target.value)
              }
              required
            />
          </label>
        </div>

        <div className="admin-form-footer">
          <Link
            href="/admin/matches"
            className="admin-secondary-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-button"
          >
            <Save size={18} />
            Save Match
          </button>
        </div>
      </form>
    </div>
  );
}
