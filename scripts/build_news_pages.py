"""Writes news/<id>.html for every item in data/news.json.

Social sites (Discord, WhatsApp...) do not run JavaScript, so a link to news.html?id=... shows no
preview. These tiny pages carry the Open Graph tags and then send the visitor to the real article.
Run after editing data/news.json:  python scripts/build_news_pages.py
Share the link  <SITE>/news/<id>.html
"""
import html
import json
import os
import re

SITE = 'https://xandrei001.github.io/CiucNavi'  # change if the site moves to another address
FALLBACK_IMAGE = 'img/background/ciucnavi_major_winners.jpg'


def plain(text):
    text = re.sub(r'#{1,6}\s+|\*+', '', text)
    return re.sub(r'\s+', ' ', text).strip()


def en(value):
    return value['en'] if isinstance(value, dict) else value


def page(n):
    title = html.escape(en(n['title']))
    desc = plain(en(n['text']))
    desc = html.escape(desc if len(desc) <= 200 else desc[:197].rsplit(' ', 1)[0] + '...')
    image = SITE + '/' + (('img/news/' + n['image']) if n.get('image') else FALLBACK_IMAGE)
    url = SITE + '/news/' + n['id'] + '.html'
    target = '../news.html?id=' + n['id']
    return f"""<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<title>{title} | Ciuc Navi</title>
<meta name='description' content='{desc}'>
<meta property='og:type' content='article'>
<meta property='og:site_name' content='Ciuc Navi'>
<meta property='og:title' content='{title}'>
<meta property='og:description' content='{desc}'>
<meta property='og:image' content='{image}'>
<meta property='og:url' content='{url}'>
<meta name='twitter:card' content='summary_large_image'>
<meta http-equiv='refresh' content='0;url={target}'>
</head>
<body><p><a href='{target}'>{title}</a></p><script>location.replace('{target}')</script></body>
</html>
"""


def main():
    with open('data/news.json', encoding='utf-8') as f:
        items = json.load(f)['news']
    os.makedirs('news', exist_ok=True)
    keep = set()
    for n in items:
        keep.add(n['id'] + '.html')
        with open('news/' + n['id'] + '.html', 'w', encoding='utf-8', newline='\n') as f:
            f.write(page(n))
    for name in os.listdir('news'):
        if name.endswith('.html') and name not in keep:
            os.remove('news/' + name)
    # self-check: every generated page has its tags
    for n in items:
        s = open('news/' + n['id'] + '.html', encoding='utf-8').read()
        assert "og:title" in s and "og:image" in s and n['id'] in s, n['id']
    print('wrote', len(items), 'pages')


if __name__ == '__main__':
    main()
