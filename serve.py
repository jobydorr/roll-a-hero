#!/usr/bin/env python3
"""Roll a Hero — the little local server.

You don't need to run this by hand. Double-click **start-roll-a-hero.cmd**.

Why this exists instead of plain `python -m http.server 8000`:

  * It binds to 127.0.0.1. The default binds EVERY network interface, which
    means anyone on your Wi-Fi — the kids' tablets included — can open
    http://<your-laptop-ip>:8000/campaign/docs/ and read the entire campaign.
    The passcode on dm.html wouldn't stop them; they never have to load it.
    Gitignoring campaign/ keeps the story off the internet. This keeps it off
    the living room.

  * It sends `Cache-Control: no-store`, so you never have to remember
    Ctrl+Shift+R after a change. (See the ?v= gotcha in BACKLOG.md.)

  * It opens the DM OS for you, but only once the port is really listening.
"""

import argparse
import http.server
import os
import sys
import webbrowser

HOST = "127.0.0.1"   # loopback only — see the note above. Don't "fix" this.
PORT = 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Local dev should never serve a stale file.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # keep the window calm; real errors still surface


def main():
    ap = argparse.ArgumentParser(description="Serve Roll a Hero locally.")
    ap.add_argument("--port", type=int, default=PORT)
    ap.add_argument("--no-browser", action="store_true",
                    help="don't open a browser (used by tests)")
    args = ap.parse_args()

    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # ThreadingHTTPServer, NOT socketserver.TCPServer. A single-threaded server
    # handles one connection at a time, and a browser opens several and holds
    # them open — so the very next request hangs forever. It looks exactly like
    # the app freezing, which is a terrible thing to discover mid-session.
    # (This is why `python -m http.server` switched to threading in 3.7.)
    try:
        httpd = http.server.ThreadingHTTPServer((HOST, args.port), Handler)
    except OSError as err:
        print(f"\n  Couldn't start on port {args.port}: {err}")
        print("  Is Roll a Hero already running in another window?\n")
        return 1

    url = f"http://{HOST}:{args.port}/"
    print("\n  Roll a Hero is running.\n")
    print(f"    Players         {url}")
    print(f"    Dungeon Master  {url}dm.html\n")
    print("  Only this computer can reach it — your campaign stays yours.")
    print("  Leave this window open while you play. Close it to stop.\n")

    if not args.no_browser:
        webbrowser.open(f"{url}dm.html")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("  Stopped.")
    finally:
        httpd.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
