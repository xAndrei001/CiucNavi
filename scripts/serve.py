"""Local preview server: python scripts/serve.py [port], then open http://localhost:8000.
Same as `python -m http.server`, but tells the browser not to cache, so edits show up on a normal refresh
(the ?v= tags only change at deploy, so a plain server can serve stale CSS/JS from the browser cache)."""
import functools
import http.server
import os
import sys


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
print(f'Serving {root} at http://localhost:{port}')
http.server.ThreadingHTTPServer(('127.0.0.1', port), functools.partial(NoCache, directory=root)).serve_forever()
