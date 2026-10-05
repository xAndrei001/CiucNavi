const mainGrid = document.getElementById("main-grid");
const benchGrid = document.getElementById("bench-grid");
const benchEmpty = document.getElementById("bench-empty");
const heroStats = document.getElementById("hero-stats");
const updatedEl = document.getElementById("stats-updated");
document.getElementById("year").textContent = new Date().getFullYear();

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function initials(name) {
  return name.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").filter(Boolean)
    .slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";
}

function statBox(label, value) {
  if (value === undefined || value === null || value === "") return "";
  return `<div class="stat"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`;
}

function playerCard(p) {
  const s = p.stats || {};
  const l = p.links || {};
  const iconSrc = p.icon ? `icons/${encodeURIComponent(p.icon)}` : "";
  const img = iconSrc
    ? `<img src="${iconSrc}" alt="${esc(p.name)}" loading="lazy"
         onerror="this.parentElement.innerHTML='<span class=&quot;initials&quot;>${esc(initials(p.name))}</span>'" />`
    : `<span class="initials">${esc(initials(p.name))}</span>`;

  const links = l.steam
    ? `<a href="${esc(l.steam)}" target="_blank" rel="noopener">Steam Profile</a>`
    : "";

  return `
    <article class="card">
      <div class="card-img">
        <span class="role">${esc(p.role)}</span>
        ${img}
      </div>
      <div class="card-body">
        <h3 class="card-name">${esc(p.name)}</h3>
        <p class="card-real">${esc(p.tag || "")}</p>
        <div class="card-stats">
          ${statBox("Premier", s.premier)}
          ${statBox("K/D", s.kd)}
          ${statBox("HS%", s.hs)}
        </div>
        <div class="card-links">${links}</div>
      </div>
    </article>`;
}

function average(values) {
  const nums = values.map(v => Number(String(v).replace(/,/g, ""))).filter(n => !isNaN(n) && n > 0);
  return nums.length ? Math.round(nums.reduce((a, b) => a + b, 0) / nums.length) : null;
}

const getJson = url => fetch(url, { cache: "no-cache" }).then(r => {
  if (!r.ok) throw new Error(`Could not load ${url}`);
  return r.json();
});

Promise.all([getJson("data/players.json"), getJson("data/stats.json").catch(() => ({}))])
  .then(([data, live]) => {
    const players = (data.players || []).map(p => {
      const auto = live[p.steam64] || live[p.vanity] || {};
      return { ...p, stats: { ...(p.stats || {}), ...auto } };
    });
    const main = players.filter(p => p.status === "main");
    const bench = players.filter(p => p.status === "bench");

    mainGrid.innerHTML = main.map(playerCard).join("");
    benchGrid.innerHTML = bench.map(playerCard).join("");
    benchEmpty.hidden = bench.length > 0;

    const avg = average(main.map(p => p.stats.premier));
    heroStats.innerHTML = `
      <div class="hero-stat"><strong>${main.length}</strong><span>Main players</span></div>
      <div class="hero-stat"><strong>${bench.length}</strong><span>On the bench</span></div>
      <div class="hero-stat"><strong>${avg ? avg.toLocaleString() : "-"}</strong><span>Avg. Premier</span></div>`;

    if (live._updated && updatedEl) updatedEl.textContent = `Career stats updated: ${live._updated}. `;
  })
  .catch(err => {
    mainGrid.innerHTML = `<p class="empty">${esc(err.message)}. If testing locally, use a local server (e.g. VS Code Live Server).</p>`;
  });
