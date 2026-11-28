"""One-off: rebuild data/history.json from every past version of data/stats.json in git."""
import json
import subprocess
from datetime import datetime, timezone

import history


def git(*args):
    return subprocess.run(['git', *args], capture_output=True, text=True, encoding='utf-8', check=True).stdout


def utc_minute(iso):
    return datetime.fromisoformat(iso).astimezone(timezone.utc).strftime('%Y-%m-%dT%H:%MZ')


# one log over both refs lists each commit once; sort by commit time so points stay in order
commits = sorted((line.split(' ', 1)[1], line.split(' ', 1)[0])
                 for line in git('log', '--format=%H %cI', 'origin/main', 'dev', '--', 'data/stats.json').split('\n') if line)

hist = {}
for when, sha in commits:
    try:
        stats = json.loads(git('show', sha + ':data/stats.json'))
    except (subprocess.CalledProcessError, json.JSONDecodeError):
        continue
    for key, entry in stats.items():
        if key != '_updated' and isinstance(entry, dict):
            history.add(hist, key, entry, utc_minute(when))

current = history.load('data/stats.json')
now = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
for key, entry in current.items():
    if key != '_updated' and isinstance(entry, dict):
        history.add(hist, key, entry, now)

history.save(hist, 'data/history.json')
for key, pts in hist.get('players', {}).items():
    print(key, len(pts), pts[0]['t'], '->', pts[-1]['t'])
print(len(commits), 'commits read')
