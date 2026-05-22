#!/usr/bin/env bash
# Auto-snapshot — pushes the current working tree to a `wip/snapshot`
# branch every N seconds so the lab dashboard can show work-in-progress
# without waiting for the student to manually commit.
#
# Usage:
#   bash .devcontainer/auto-snapshot.sh start    # start in background
#   bash .devcontainer/auto-snapshot.sh stop     # stop background loop
#
# Set AUTO_SNAPSHOT_INTERVAL (seconds, default 120) to tune cadence.

set -euo pipefail

CMD="${1:-start}"
INTERVAL="${AUTO_SNAPSHOT_INTERVAL:-120}"
PIDFILE="/tmp/lab-auto-snapshot.pid"
LOGFILE="/tmp/lab-auto-snapshot.log"
BRANCH="wip/snapshot"

snapshot_loop() {
  cd "$(git rev-parse --show-toplevel 2>/dev/null || echo .)"
  while true; do
    if [[ -d .git ]] && [[ -n "$(git status --porcelain)" ]]; then
      git add -A >/dev/null 2>&1 || true
      TREE=$(git write-tree)
      PARENT=$(git rev-parse HEAD 2>/dev/null || echo "")
      MSG="wip: snapshot $(date -u +%FT%TZ)"
      if [[ -n "$PARENT" ]]; then
        SHA=$(git commit-tree "$TREE" -p "$PARENT" -m "$MSG")
      else
        SHA=$(git commit-tree "$TREE" -m "$MSG")
      fi
      git update-ref "refs/heads/$BRANCH" "$SHA"
      git push -f origin "$BRANCH" >/dev/null 2>&1 || true
    fi
    sleep "$INTERVAL"
  done
}

case "$CMD" in
  start)
    if [[ -f "$PIDFILE" ]] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
      echo "auto-snapshot already running (pid $(cat "$PIDFILE"))"
      exit 0
    fi
    snapshot_loop >>"$LOGFILE" 2>&1 &
    echo $! >"$PIDFILE"
    echo "✅ auto-snapshot started (every ${INTERVAL}s, branch $BRANCH)"
    ;;
  stop)
    if [[ -f "$PIDFILE" ]]; then
      kill "$(cat "$PIDFILE")" 2>/dev/null || true
      rm -f "$PIDFILE"
      echo "✅ auto-snapshot stopped"
    fi
    ;;
  *)
    echo "Usage: $0 {start|stop}" >&2
    exit 1
    ;;
esac
