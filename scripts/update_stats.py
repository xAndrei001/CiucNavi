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


def recent_list(data):
    out = []
    for x in (data.get('recent_matches') or []):
        if isinstance(x, dict):
            item = {'m': x.get('map_name'), 'o': x.get('outcome'), 'd': x.get('finished_at'), 's': x.get('data_source'), 'r': x.get('leetify_rating')}
            # score and id are kept when the API returns them (the site shows the score only if present)
            if isinstance(x.get('score'), (list, tuple)) and len(x['score']) == 2:
                item['sc'] = x['score']
            out.append(item)
    return out[:50]


def highlight(role, detail):
    """One extra stat that matters for the player's role, shown on the home page card."""
    st, rt = detail.get('stats') or {}, detail.get('rating') or {}
    role = str(role or '').strip().lower()

    def num(v):
        return v if isinstance(v, (int, float)) and not isinstance(v, bool) else None

    if role == 'awper':
        v = [num(st.get('ct_opening_duel_success_percentage')), num(st.get('t_opening_duel_success_percentage'))]
        v = [x for x in v if x is not None]
        return {'k': 'opening', 'v': round(sum(v) / len(v), 1)} if v else None
    pick = {'entry': ('entry', 't_opening_aggression_success_rate', st), 'support': ('he', 'he_foes_damage_avg', st),
            'rifler': ('trade', 'trade_kills_success_percentage', st), 'igl': ('utility', 'utility', rt)}.get(role)
    if not pick:
        return None
    v = num(pick[2].get(pick[1]))
    return {'k': pick[0], 'v': round(v, 1)} if v is not None else None


with open('data/players.json', encoding='utf-8') as f:
    players = json.load(f)['players']

try:
    with open('data/stats.json', encoding='utf-8') as f:
        out = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    out = {}
os.makedirs('data/stats', exist_ok=True)

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
        print('RANKS:', json.dumps(data.get('ranks'))[:600])
        print('RATING:', json.dumps(data.get('rating'))[:500])
        print('STATS KEYS:', list((data.get('stats') or {}).keys()))
        rm = data.get('recent_matches') or []
        print('RECENT COUNT:', len(rm), 'FIRST:', json.dumps(rm[0])[:400] if rm else None)
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
    detail = {'rating': prim(data.get('rating')), 'stats': prim(data.get('stats')), 'ranks': prim(data.get('ranks')), 'recent': recent_list(data)}
    if any(detail.values()):
        # the heavy part lives in data/stats/<key>.json so the home page only downloads the summary
        with open('data/stats/' + key + '.json', 'w', encoding='utf-8') as f:
            json.dump({'detail': detail}, f, indent=2, ensure_ascii=False)
        entry['hasDetail'] = True
        hl = highlight(p.get('role'), detail)
        if hl:
            entry['hl'] = hl

    if entry:
        # prev = the numbers before the most recent change, so the site can show trend arrows
        old = out.get(key) or {}
        prev = {k: old[k] for k in ('premier', 'hs', 'winrate', 'matches') if k in old and k in entry and old[k] != entry[k]}
        if prev:
            entry['prev'] = prev
        elif old.get('prev'):
            entry['prev'] = old['prev']
        out[key] = entry
        print('OK ' + p['name'] + ': ' + str(entry) + ' recent=' + str(len(detail['recent'])))
    else:
        print('EMPTY ' + p['name'] + ': nothing usable returned')
    time.sleep(1)

out['_updated'] = datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')

with open('data/stats.json', 'w', encoding='utf-8') as f:
    json.dump(out, f, indent=2, ensure_ascii=False)
