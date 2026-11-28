import json

NOTE = 'Stats over time per player key: one point each time premier, hs, winrate or matches changed. Written by scripts/update_stats.py.'
FIELDS = {'premier': int, 'hs': float, 'winrate': float, 'matches': int}


def point(entry):
    """'21,737' / '18.9%' strings from stats.json -> plain numbers; missing or unreadable fields are left out."""
    p = {}
    for k, cast in FIELDS.items():
        try:
            p[k] = cast(float(str(entry[k]).replace(',', '').replace('%', '')))
        except (KeyError, ValueError):
            pass
    return p


def add(hist, key, entry, t):
    p = point(entry)
    pts = hist.setdefault('players', {}).setdefault(key, [])
    if p and (not pts or any(pts[-1].get(k) != p.get(k) for k in FIELDS)):
        pts.append(dict(t=t, **p))


def load(path):
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def save(hist, path):
    # compact, but one player per line so git diffs stay readable
    players = hist.get('players', {})
    rows = [json.dumps(k) + ':' + json.dumps(v, separators=(',', ':')) for k, v in players.items()]
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write('{"_note":' + json.dumps(NOTE) + ',"players":{\n' + ',\n'.join(rows) + '\n}}\n')


if __name__ == '__main__':
    h = {}
    add(h, 'a', {'premier': '21,737', 'hs': '18.9%', 'matches': 5}, 't1')
    add(h, 'a', {'premier': '21,737', 'hs': '18.9%', 'matches': 5}, 't2')
    add(h, 'a', {'premier': '21,800', 'hs': '18.9%', 'matches': 6}, 't3')
    add(h, 'a', {'premier': 'n/a'}, 't4')
    assert h['players']['a'] == [
        {'t': 't1', 'premier': 21737, 'hs': 18.9, 'matches': 5},
        {'t': 't3', 'premier': 21800, 'hs': 18.9, 'matches': 6},
    ], h
    print('ok')
