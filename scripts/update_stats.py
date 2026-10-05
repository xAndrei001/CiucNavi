import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

LEETIFY_KEY = os.environ.get('LEETIFY_API_KEY', '')
STEAM_KEY = os.environ.get('STEAM_API_KEY', '')
LEETIFY_URL = 'https://api-public.cs-prod.leetify.com/v3/profile?steam64_id={}'


def http_json(url, headers=None):
    h = {'User-Agent': 'CiucNavi-stats-bot'}
    h.update(headers or {})
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.load(r)


def resolve_vanity(name):
    if not STEAM_KEY:
        return None
    q = urllib.parse.urlencode({'key': STEAM_KEY, 'vanityurl': name})
    r = http_json('https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?' + q)
    r = r.get('response', {})
    return r.get('steamid') if r.get('success') == 1 else None


def leetify_profile(steam64):
    return http_json(LEETIFY_URL.format(steam64), {'_leetify_key': LEETIFY_KEY})


def get(d, path):
    for p in path.split('.'):
        if not isinstance(d, dict) or p not in d:
            return None
        d = d[p]
    return d


def first(d, *paths):
    for path in paths:
        v = get(d, path)
        if v is not None:
            return v
    return None


def pct(v):
    v = float(v)
    return round(v * 100 if v <= 1 else v, 1)


def prim(d):
    if not isinstance(d, dict):
        return {}
    return {k: v for k, v in d.items() if isinstance(v, (int, float, str)) and not isinstance(v, bool)}


with open('data/players.json', encoding='utf-8') as f:
    players = json.load(f)['players']

try:
    with open('data/stats.json', encoding='utf-8') as f:
        out = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    out = {}

shown_debug = False
for p in players:
    vanity = str(p.get('vanity', '')).strip()
    sid = str(p.get('steam64', '')).strip()
    key = sid or vanity
    if not key:
        print('SKIP ' + p['name'] + ': set steam64 or vanity in players.json')
        continue
    try:
        if not sid.isdigit():
            sid = resolve_vanity(vanity)
            if not sid:
                print('FAIL ' + p['name'] + ': could not resolve vanity ' + vanity + ' (is STEAM_API_KEY set?)')
                continue
        data = leetify_profile(sid)
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', 'ignore')[:200]
        print('FAIL ' + p['name'] + ': HTTP ' + str(e.code) + ' ' + body)
        continue
    except Exception as e:
        print('FAIL ' + p['name'] + ': ' + str(e))
        continue

    if not shown_debug:
        print('TOP-LEVEL KEYS:', list(data.keys()))
        print('RANKS:', json.dumps(data.get('ranks'))[:500])
        print('RATING:', json.dumps(data.get('rating'))[:500])
        print('STATS KEYS:', list((data.get('stats') or {}).keys()))
        shown_debug = True

    premier = first(data, 'ranks.premier', 'ranks.premier_rating', 'rating.premier')
    if isinstance(premier, dict):
        premier = first(premier, 'rating', 'value', 'current')
    hs = first(data, 'stats.accuracy_head', 'stats.headshot_accuracy')
    wr = first(data, 'winrate', 'win_rate')

    entry = {}
    if premier:
        entry['premier'] = '{:,}'.format(int(premier))
    if hs is not None:
        entry['hs'] = str(pct(hs)) + '%'
    if wr is not None:
        entry['winrate'] = str(pct(wr)) + '%'
    if data.get('total_matches') is not None:
        entry['matches'] = data['total_matches']
    detail = {'rating': prim(data.get('rating')), 'stats': prim(data.get('stats')), 'ranks': prim(data.get('ranks'))}
    if any(detail.values()):
        entry['detail'] = detail

    if entry:
        out[key] = entry
        print('OK ' + p['name'] + ': ' + str({k: v for k, v in entry.items() if k != 'detail'}))
    else:
        print('EMPTY ' + p['name'] + ': nothing usable returned')
    time.sleep(1)

out['_updated'] = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')

with open('data/stats.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
