# Rules for AI assistants

- Work directly in the main folder (`G:\CiucNavi`). Never create, read from or edit git worktrees; ignore `.claude/worktrees/` entirely.
- Commit on `dev`. Don't push, and don't merge into `main`, unless Andrei asks.
- Never commit freshly generated stats to `main` or `dev`; the deploy workflow fetches and publishes stats itself. Never merge the `stats-history` branch.
- There's no build step: plain HTML, CSS and vanilla JS. Match the existing style (single-quoted HTML attributes, compact JS).
- Translations go only in `js/i18n.js`, in all three languages (`en`, `ro`, `hu`), with the same keys in the same order.
- CSS goes in `css/style.css`. Never inject styles from JS.
- Don't bump the `?v=` tags by hand; the deploy stamps them.
- Test changes through the local no-cache server (`python scripts/serve.py`, port 8000) in a headless browser, at desktop width and at 390px. Check the console for errors.
- `_note` keys in the data files describe their format; scripts and pages skip keys starting with `_`.
- For everything else (pages, data formats, the stats pipeline), see `README.md`.
