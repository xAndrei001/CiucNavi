"""Builds link-preview pages so a shared player or news link shows that player/article on Discord etc.
  p/<slug>/index.html  -> redirects to player.html?p=<slug>
  n/<id>/index.html    -> redirects to news.html?id=<id>
Each page only carries Open Graph tags plus an instant redirect for people (chat apps don't run JS).
Run by the deploy workflow after the stats update. p/ and n/ are generated: rebuilt on every run, never committed."""
import html
import json
import os
import re
import shutil
import struct

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.environ.get('SITE_URL', 'https://xandrei001.github.io/CiucNavi').rstrip('/')


def slug(name):  # same as slug() in js/common.js
    return re.sub(r'[^a-z0-9]', '', str(name).lower())


def en(v):
    return v.get('en', '') if isinstance(v, dict) else (v or '')


def jpeg_size(path):
    """(width, height) from a JPEG's SOF header, or None if it can't be read."""
    try:
        with open(path, 'rb') as f:
            if f.read(2) != b'\xff\xd8':
                return None
            while True:
                b = f.read(1)
                while b and b != b'\xff':
                    b = f.read(1)
                while b == b'\xff':
                    b = f.read(1)
                if not b:
                    return None
                marker = b[0]
                if marker in (0xD8, 0x01) or 0xD0 <= marker <= 0xD7:
                    continue
                length = struct.unpack('>H', f.read(2))[0]
                if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):
                    h, w = struct.unpack('>xHH', f.read(5))
                    return w, h
                f.seek(length - 2, 1)
    except (OSError, struct.error):
        return None


def summary(text, limit=180):
    """Plain-text start of a news text: markdown markers removed, cut on a word, with an ellipsis."""
    text = re.sub(r'^\s*#{1,6}\s+', '', text, flags=re.M)
    text = ' '.join(text.replace('*', '').split())
    return text if len(text) <= limit else text[:limit].rsplit(' ', 1)[0].rstrip(',.;:') + '…'


def image(rel):
    """Absolute URL + size for an image under the site root, falling back to the site card."""
    if not rel or not os.path.isfile(os.path.join(ROOT, rel)):
        rel = 'img/og.jpg'
    return SITE + '/' + rel, jpeg_size(os.path.join(ROOT, rel))


def page(title, desc, url, target, img, card, extra=()):
    a = lambda s: html.escape(str(s), quote=True)
    img_url, size = img
    meta = [('property', 'og:type', 'article' if extra else 'profile'), ('property', 'og:site_name', 'Ciuc Navi'),
            ('property', 'og:title', title), ('property', 'og:description', desc), ('property', 'og:url', url),
            ('property', 'og:image', img_url)]
    if size:
        meta += [('property', 'og:image:width', size[0]), ('property', 'og:image:height', size[1])]
    meta += [('property', 'og:locale', 'en_US'), ('name', 'twitter:card', card), ('name', 'theme-color', '#ffe600'), *extra]
    rel = '../../' + target
    return '\n'.join([
        '<!DOCTYPE html>', "<html lang='en'>", '<head>', "<meta charset='UTF-8'>",
        "<meta name='viewport' content='width=device-width, initial-scale=1'>",
        f'<title>{html.escape(title, quote=False)}</title>', f"<meta name='description' content='{a(desc)}'>",
        f"<link rel='canonical' href='{a(SITE + '/' + target)}'>",
        *[f"<meta {k}='{n}' content='{a(v)}'>" for k, n, v in meta],
        f"<meta http-equiv='refresh' content='0; url={a(rel)}'>",
        f'<script>location.replace({json.dumps(rel)})</script>',
        '</head>', f"<body><p><a href='{a(rel)}'>{html.escape(title, quote=False)}</a></p></body>", '</html>', ''])


def write(folder, name, text):
    os.makedirs(os.path.join(ROOT, folder, name))
    with open(os.path.join(ROOT, folder, name, 'index.html'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)


def build():
    load = lambda p: json.load(open(os.path.join(ROOT, 'data', p), encoding='utf-8'))
    players = load('players.json').get('players', [])
    try:
        stats = load('stats.json')
    except (OSError, ValueError):
        stats = {}
    news = load('news.json').get('news', [])
    for d in ('p', 'n'):
        shutil.rmtree(os.path.join(ROOT, d), ignore_errors=True)
    urls = []

    for p in players:
        s = slug(p.get('name'))
        if not s:
            continue
        st = stats.get(str(p.get('steam64', ''))) or stats.get(str(p.get('vanity', ''))) or {}
        bits = [p.get('role'), {'main': 'Main roster', 'bench': 'Bench'}.get(p.get('status'))]
        if st.get('premier') not in (None, '', '-'):
            bits.append('Premier ' + str(st['premier']))
        if st.get('winrate') not in (None, '', '-'):
            bits.append(str(st['winrate']) + ' win rate')
        desc = ' · '.join(b for b in bits if b) + '. Ciuc Navi, CS2 Premier team from Miercurea Ciuc.'
        icon = 'img/players/' + p['icon'] if p.get('icon') else None
        url = f'{SITE}/p/{s}/'
        write('p', s, page(p['name'] + ' | Ciuc Navi', desc, url, 'player.html?p=' + s, image(icon), 'summary'))
        urls.append(url)

    for n in news:
        nid = str(n.get('id', ''))
        if not re.fullmatch(r'[A-Za-z0-9_-]+', nid):
            print('SKIP news id that cannot be a folder name:', repr(nid))
            continue
        img = 'img/news/' + n['image'] if n.get('image') else None
        extra = [('property', 'article:published_time', n['date'])] if n.get('date') else [('property', 'article:section', 'News')]
        url = f'{SITE}/n/{nid}/'
        write('n', nid, page(en(n.get('title')) or 'Ciuc Navi news', summary(en(n.get('text'))) or 'News from Ciuc Navi.',
                             url, 'news.html?id=' + nid, image(img), 'summary_large_image', extra))
        urls.append(url)

    print(f'{len(urls)} preview pages:')
    print('\n'.join(urls))
    return urls


if __name__ == '__main__':
    assert summary('**Bold** start.\n\n### Head\nmore *it* text') == 'Bold start. Head more it text'
    long = summary('word ' * 100)
    assert long.endswith('…') and len(long) <= 181
    assert slug('REGELE') == 'regele' and slug('cata2PEU') == 'cata2peu'
    assert jpeg_size(os.path.join(ROOT, 'img', 'og.jpg')) == (1200, 630)
    build()
