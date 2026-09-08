/* =========================================
   TOTAL GAMING
   FRONTEND APPLICATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  renderDashboard();
  setupNavigation();
}

/* =========================================
   DASHBOARD
   ========================================= */

function renderDashboard() {
  const tournament = TOURNAMENTS.find(
    (item) => item.status === "ongoing"
  ) || TOURNAMENTS[0];

  if (!tournament) {
    renderEmptyDashboard();
    return;
  }

  const stats = getTournamentStats(tournament.id);

  setText("totalPoints", stats.totalPoints);
  setText("totalKills", stats.kills);
  setText("positionPoints", stats.positionPoints);
  setText("averagePoints", stats.averagePoints);

  setText("matchCount", stats.matches);
  setText("tournamentKills", stats.kills);
  setText("tournamentPoints", stats.totalPoints);

  setText("leaderKills", stats.kills);
  setText("leaderPoints", stats.totalPoints);

  renderMatches(tournament.id);
  renderDailyMVP(tournament.id);
}

/* =========================================
   MATCHES
   ========================================= */

function renderMatches(tournamentId) {
  const container = document.getElementById("matches");

  if (!container) return;

  const matches = getTournamentMatches(tournamentId);

  container.innerHTML = "";

  if (matches.length === 0) {
    container.innerHTML = `
      <div class="card">
        <p style="color:#71717a;font-size:12px;">
          No matches available.
        </p>
      </div>
    `;

    return;
  }

  [...matches].reverse().forEach((match) => {
    const view = getMatchView(match);

    const element = document.createElement("div");

    element.className = "match";

    element.innerHTML = `
      <div class="match-left">

        <div class="position">
          ${match.position}
        </div>

        <div>
          <div class="match-name">
            Match ${match.matchNumber}
          </div>

          <div class="match-kills">
            ${view.kills} kills · ${match.map || "Map"}
          </div>
        </div>

      </div>

      <div class="match-points">
        <strong>${view.totalPoints}</strong>
        <span>POINTS</span>
      </div>
    `;

    container.appendChild(element);
  });
}

/* =========================================
   DAILY MVP
   ========================================= */

function renderDailyMVP(tournamentId) {
  const tournamentMatches =
    getTournamentMatches(tournamentId);

  if (tournamentMatches.length === 0) {
    setText("mvpName", "No MVP");
    setText("mvpKills", 0);
    setText("mvpPoints", 0);
    return;
  }

  const latestDate =
    tournamentMatches[tournamentMatches.length - 1].date;

  const mvp = getDailyMVP(
    latestDate,
    tournamentId
  );

  if (!mvp) {
    setText("mvpName", "No MVP");
    setText("mvpKills", 0);
    setText("mvpPoints", 0);
    return;
  }

  setText("mvpName", mvp.name);
  setText("mvpKills", mvp.kills);
  setText("mvpPoints", mvp.points);

  const roleElement =
    document.querySelector(".mvp-role");

  if (roleElement) {
    roleElement.textContent = mvp.role || "Player";
  }
}

/* =========================================
   MOBILE NAVIGATION
   ========================================= */

function setupNavigation() {
  const nav =
    document.querySelector(".mobile-nav");

  if (!nav) return;

  const navInner =
    nav.querySelector(".mobile-nav-inner");

  if (!navInner) return;

  const items = [
    {
      name: "Overview",
      target: ".hero"
    },
    {
      name: "Matches",
      target: ".matches"
    },
    {
      name: "Tournaments",
      target: ".table"
    },
    {
      name: "Players",
      target: ".mvp"
    }
  ];

  navInner.innerHTML = "";

  items.forEach((item, index) => {
    const button =
      document.createElement("button");

    button.textContent = item.name;

    if (index === 0) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {

      nav
        .querySelectorAll("button")
        .forEach((btn) => {
          btn.classList.remove("active");
        });

      button.classList.add("active");

      const target =
        document.querySelector(item.target);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });

    navInner.appendChild(button);
  });
}

/* =========================================
   EMPTY STATE
   ========================================= */

function renderEmptyDashboard() {
  const ids = [
    "totalPoints",
    "totalKills",
    "positionPoints",
    "averagePoints",
    "matchCount",
    "tournamentKills",
    "tournamentPoints",
    "leaderKills",
    "leaderPoints"
  ];

  ids.forEach((id) => {
    setText(id, 0);
  });

  setText("mvpName", "No data");
  setText("mvpKills", 0);
  setText("mvpPoints", 0);
}

/* =========================================
   HELPER
   ========================================= */

function setText(id, value) {
  const element =
    document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}
