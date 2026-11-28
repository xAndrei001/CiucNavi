# Ciuc Navi

A fan-made parody website for **Ciuc Navi**, a CS2 Premier team from Miercurea Ciuc.
It is not affiliated with NAVI.

Live: https://xandrei001.github.io/CiucNavi/

It's plain HTML, CSS and vanilla JavaScript with no build step. Content comes from JSON files in `data/`.

## Pages

| Page | Shows |
|---|---|
| `index.html` | Hero, latest news, about, main roster, bench, team dashboard (charts load when you scroll to it), merch preview |
| `player.html?p=<name>` | One player: Premier, performance gauges, rating over time, skill radar, ranks, maps, recent form and matches. There's also a Settings & Crosshair tab once something is filled in |
| `compare.html?a=<name>&b=<name>` | Two players head to head |
| `coach.html` | The coach profile, from `data/coach.json` |
| `news.html` / `news.html?id=<id>` | All news, or one article |
| `merch.html` / `merch.html?item=<name>` | One T-shirt per main player, or one product page |

`<name>` is the player name in lowercase with only a–z and 0–9 kept (for example `REGELE` → `regele`).

## Folders

- `css/style.css`: all styles
- `js/i18n.js`: all translations (EN, RO, HU)
- `js/common.js`: shared helpers, language switch, footer
- `js/main.js`: home page
- `js/charts.js`: chart and stats panels (loaded on player, compare and coach, and lazily on the home dashboard)
- `js/player.js`, `js/compare.js`, `js/coach.js`, `js/news.js`, `js/merch.js`: one per page
- `data/players.json`: the roster
- `data/player-details.json`: per-player settings and crosshair
- `data/news.json`: news posts
- `data/coach.json`: coach page content
- `data/merch.json`: price, sizes, currency
- `data/stats.json`, `data/stats/<steam64>.json`, `data/history.json`: stats. These are a fallback copy; the live values are produced by the deploy workflow (see below)
- `img/players/`, `img/news/`, `img/merch/`, `img/background/`: images. `img/og.jpg` is the social preview image
- `scripts/`: the stats bot (Python, standard library only) and `serve.py`, the local preview server
- `.github/workflows/update-stats.yml`: build and deploy

## How to

**Add or move a player.** Edit `data/players.json`:

- `name`, `tag`, `role`
- `status`: `"main"` or `"bench"`
- `icon`: a file in `img/players/`
- `steam64`: needed for stats
- `vanity` (optional), `links.steam`

To move a player between main and bench, change `status`.

**Add a news post.** Add an item to `news` in `data/news.json`. The fields are:

- `id`, `date` (YYYY-MM-DD)
- `type`: one of breaking, new-player, transfer, promotion, demotion, announcement
- `image`: a file in `img/news/`
- `title`, `text`: a string, or `{en, ro, hu}`
- `players`: names linked under the article

The `_note` at the top of the file explains the text formatting. For images, see `img/news/README.md`.

**Merch photos.** See `img/merch/README.md`. Every main player needs `<name>-front.jpg` and `<name>-back.jpg`. Price and sizes are in `data/merch.json`.

**Player settings and crosshair.** Fill in `data/player-details.json`. Empty fields are hidden. A group (mouse, video, viewmodel, gear) appears as soon as one of its fields has a value, and the crosshair appears once `code` is filled in. If nothing is filled in, the tab is hidden.

**Translations.** Edit `js/i18n.js` only. Every key must exist in `en`, `ro` and `hu`, in the same order. In code, use `t('key')`, or `data-i18n='key'` in HTML. `~word~` in a title renders the word highlighted in yellow.

Keys starting with `_` in the data files (like `_note`) are documentation and are ignored by the site and scripts.

## Stats pipeline

- `scripts/update_stats.py` reads `data/players.json` and fetches each player's profile from the Leetify API. It uses the Steam API only to turn a `vanity` name into a steam64. It writes `data/stats.json` (summary plus `prev` values for the trend arrows) and `data/stats/<steam64>.json` (details).
- `.github/workflows/update-stats.yml` runs every 6 hours, on every push to `main`, and on demand. It:
  1. downloads the current live `stats.json` from the site, so trend arrows compare against what's live (it falls back to the repo copy);
  2. runs the script;
  3. adds new history points;
  4. deploys the whole site straight to GitHub Pages.

  It does not commit stats to `main` or `dev`.
- **History** lives on the `stats-history` branch as `history.json`: `{"players": {"<steam64>": [{"t": "2026-11-28T07:02Z", "premier": 22469, "hs": 18.0, "winrate": 73.3, "matches": 1703}, …]}}`. A point is only added when one of those values changed. `scripts/history.py` holds the shared logic. `scripts/backfill_history.py` was a one-off that rebuilt the history from old git commits.
- **Required repo secrets:** `LEETIFY_API_KEY` and `STEAM_API_KEY`.
- **Pages setting:** Settings → Pages → Source must be **GitHub Actions**.

## Cache-busting

CSS and JS links carry `?v=…`. The deploy workflow replaces every `?v=` in `*.html` and `js/*.js` with the commit and run number, so browsers always load the newest files. Don't bump it by hand; the value in the repo is only a placeholder.

## Local preview

```
python scripts/serve.py
```

Then open http://localhost:8000 (pass another port as an argument if 8000 is taken). It's a plain static server that tells the browser not to cache, so a normal refresh always shows your latest edits. With `python -m http.server`, the browser can keep old CSS/JS, because the `?v=` tags only change at deploy. Opening the HTML files directly doesn't work, because the pages load their data with `fetch`.

## Branches

- `dev`: work happens here.
- `main`: merging `dev` into `main` deploys the site.
- `stats-history`: written only by the bot. Never merge it.
