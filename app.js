/* ==========================================
   TOTAL GAMING — APPLICATION LOGIC
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  setupNavigation();
});

function renderDashboard() {
  const tournament = TOURNAMENTS[0];

  if (!tournament) {
    showEmptyState();
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

function renderMatches(tournamentId) {
  const container = document.getElementById("matches");

  if (!container) return;

  const matches = getTournamentMatches(tournamentId);

  container.innerHTML = "";

  if (!matches.length) {
    container.innerHTML = `
      <div class="card">
        <p style="color:#71717a;font-size:12px;">
          No match results available.
        </p>
      </div>
    `;
    return;
  }

  matches
    .slice()
    .reverse()
    .forEach((match) => {
      const view = getMatchView(match);

      const item = document.createElement("div");
      item.className = "match";

      item.innerHTML = `
        <div class="match-left">

          <div class="position">
            ${match.position}
          </div>

          <div>
            <div class="match-name">
              Match ${match.matchNumber}
            </div>

            <div class="match-kills">
              ${view.kills} kills · ${match.map}
            </div>
          </div>

        </div>

        <div class="match-points">
          <strong>${view.totalPoints}</strong>
          <span>POINTS</span>
        </div>
      `;

      container.appendChild(item);
    });
}

function renderDailyMVP(tournamentId) {
  const today = new Date().toISOString().split("T")[0];

  const mvp = getDailyMVP(today, tournamentId);

  if (!mvp) {
    setText("mvpName", "No MVP yet");
    setText("mvpKills", 0);
    setText("mvpPoints", 0);
    return;
  }

  setText("mvpName", mvp.name);
  setText("mvpKills", mvp.kills);
  setText("mvpPoints", mvp.points);

  const role = document.querySelector(".mvp-role");

  if (role) {
    role.textContent = mvp.role;
  }
}

function setupNavigation() {
  const navigationItems = [
    "Overview",
    "Matches",
    "Tournaments",
    "Players"
  ];

  const nav = document.querySelector(".mobile-nav");

  if (!nav) return;

  const navInner = nav.querySelector(".mobile-nav-inner");

  if (!navInner) return;

  navInner.innerHTML = "";

  navigationItems.forEach((item, index) => {
    const button = document.createElement("button");

    button.textContent = item;

    if (index === 0) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      nav.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      handleNavigation(item);
    });

    navInner.appendChild(button);
  });
}

function handleNavigation(section) {
  const destinations = {
    Overview: ".hero",
    Matches: ".matches",
    Tournaments: ".table",
    Players: ".mvp"
  };

  const selector = destinations[section];

  if (!selector) return;

  const element = document.querySelector(selector);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function showEmptyState() {
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

  ids.forEach((id) => setText(id, 0));

  setText("mvpName", "No data");
  setText("mvpKills", 0);
  setText("mvpPoints", 0);

  const matchesContainer = document.getElementById("matches");

  if (matchesContainer) {
    matchesContainer.innerHTML = `
      <div class="card">
        <p style="color:#71717a;font-size:12px;">
          No matches available.
        </p>
      </div>
    `;
  }
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}
