# Merch photos

Put the t-shirt pictures in this folder. Every player whose `status` is `"main"` in
`data/players.json` needs two files:

- `<name>-front.jpg`
- `<name>-back.jpg`

where `<name>` is the player name in lowercase with only letters a-z and digits 0-9 kept
(the same rule as `slug()` in `js/common.js`). Example: REGELE → `regele-front.jpg`, `regele-back.jpg`.

Tip: keep each picture at most 1200 px on its longest side and about 250 KB.
Until a picture exists, the site shows a drawn placeholder t-shirt.
