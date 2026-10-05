import json
import os
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone

KEY = os.environ.get("STEAM_API_KEY", "")
BASE = "https://api.steampowered.com"


def call(path, **params):
    params["key"] = KEY
    url = f"{BASE}/{path}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(url, headers={"User-Agent": "CiucNavi-stats-bot"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def resolve_vanity(name):
    r = call("ISteamUser/ResolveVanityURL/v1/", vanityurl=name).get("response", {})
    return r.get("steamid") if r.get("success") == 1 else None


def cs_stats(steam64):
    data = call("ISteamUserStats/GetUserStatsForGame/v2/", steamid=steam64, appid=730)
    return {s["name"]: s["value"] for s in data["playerstats"]["stats"]}


with open("data/players.json", encoding="utf-8") as f:
    players = json.load(f)["players"]

try:
    with open("data/stats.json", encoding="utf-8") as f:
        out = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    out = {}

for p in players:
    vanity = str(p.get("vanity", "")).strip()
    sid = str(p.get("steam64", "")).strip()
    key = sid or vanity
    if not key:
        print(f"SKIP {p['name']}: set 'steam64' or 'vanity' in players.json")
        continue
    try:
        if not sid.isdigit():
            sid = resolve_vanity(vanity)
            if not sid:
                print(f"FAIL {p['name']}: vanity '{vanity}' not found")
                continue
        s = cs_stats(sid)
    except Exception as e:
        print(f"FAIL {p['name']}: {e} (profile or game details private?)")
        continue

    kills = s.get("total_kills", 0)
    deaths = s.get("total_deaths", 0)
    hs = s.get("total_kills_headshot", 0)
    played = s.get("total_matches_played", 0)
    won = s.get("total_matches_won", 0)

    entry = {}
    if deaths:
        entry["kd"] = f"{kills / deaths:.2f}"
    if kills:
        entry["hs"] = f"{hs / kills * 100:.1f}%"
    if played:
        entry["winrate"] = f"{won / played * 100:.1f}%"
        entry["matches"] = played
    if s.get("total_time_played"):
        entry["hours"] = round(s["total_time_played"] / 3600)

    if entry:
        out[key] = entry
        print(f"OK {p['name']}: {entry}")
    else:
        print(f"EMPTY {p['name']}: no CS stats returned. Keys: {list(s)[:10]}")
    time.sleep(1)

out["_updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

with open("data/stats.json", "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
