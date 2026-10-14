import http.server
import os

PORT = 8080


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Browser keeps files but re-checks each one, so edits show up on refresh
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


os.chdir(os.path.dirname(os.path.abspath(__file__)))
print(f"Serving on http://localhost:{PORT}")
http.server.ThreadingHTTPServer(("", PORT), NoCacheHandler).serve_forever()
