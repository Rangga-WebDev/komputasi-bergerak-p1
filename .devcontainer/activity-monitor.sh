#!/usr/bin/env bash
# Activity monitor — pasang git pre-commit hook yang mencatat kecepatan
# coding & ukuran perubahan ke `.lab/activity.jsonl`. File ini di-commit
# bersama kode mahasiswa supaya dosen bisa scan untuk indikasi AI/copy-paste.
#
# Heuristik yang dicatat per-commit:
#   - timestamp (UTC ISO)
#   - filesChanged
#   - linesAdded / linesDeleted
#   - secondsSincePrev (gap dari commit sebelumnya)
#   - locPerMinute (LOC added / menit) — proxy untuk "muncul mendadak"
#   - longestFileAdded (LOC) — file baru besar = red flag
#
# Mahasiswa secara teknis bisa men-disable hook (rm .git/hooks/pre-commit),
# tapi:
#   1. Auto-snapshot tetap mendorong branch wip/snapshot tiap 2 menit.
#   2. Hilangnya log itu sendiri jadi sinyal (kami flag).
#   3. Server-side scan juga membandingkan dengan timeline push GitHub.

set -euo pipefail

cmd="${1:-install}"

case "$cmd" in
  install)
    if [[ ! -d .git ]]; then
      git init -q
    fi
    mkdir -p .lab .git/hooks
    cat > .git/hooks/pre-commit <<'HOOK'
#!/usr/bin/env bash
set -euo pipefail

# === Tamper guard ===========================================================
# Reject commit yang menyentuh file RESERVED lab-dashboard. Mahasiswa tidak
# diperbolehkan mengubah devcontainer / block-copilot / activity-monitor.
RESERVED_RE='^\.devcontainer/(devcontainer\.json|install-lab-helper\.sh|auto-snapshot\.sh|activity-monitor\.sh|block-copilot\.sh|smoke-test\.sh|lab-help|lab-live|lab-log|lab-run)$|^\.github/workflows/autograding\.yml$|^\.git/hooks/pre-commit$'
if git rev-parse HEAD >/dev/null 2>&1; then
  tamper_base="HEAD"
else
  tamper_base="$(git hash-object -t tree /dev/null)"
fi
tampered=$(git diff --cached --name-only --diff-filter=AMDR "$tamper_base" 2>/dev/null \
  | grep -E "$RESERVED_RE" || true)
if [[ -n "$tampered" ]]; then
  echo "❌ lab-dashboard: commit ditolak — file berikut tidak boleh diubah:" >&2
  echo "$tampered" | sed 's/^/   - /' >&2
  echo "" >&2
  echo "   File ini di-manage oleh instruktur. Hubungi dosen kalau memang perlu update." >&2
  exit 1
fi
# ===========================================================================

ts="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
log=".lab/activity.jsonl"
mkdir -p .lab
# Stats untuk staged changes vs HEAD (atau empty tree kalau initial commit).
if git rev-parse HEAD >/dev/null 2>&1; then
  base="HEAD"
  prev_ts=$(git log -1 --format=%ct 2>/dev/null || echo "0")
else
  base="$(git hash-object -t tree /dev/null)"
  prev_ts=0
fi
stats=$(git diff --cached --shortstat "$base" 2>/dev/null || echo "")
files=$(echo "$stats" | grep -oE '[0-9]+ files? changed' | grep -oE '[0-9]+' || echo 0)
adds=$(echo "$stats" | grep -oE '[0-9]+ insertions?' | grep -oE '[0-9]+' || echo 0)
dels=$(echo "$stats" | grep -oE '[0-9]+ deletions?' | grep -oE '[0-9]+' || echo 0)
now_ts=$(date -u +%s)
gap=$(( now_ts - prev_ts ))
[[ "$prev_ts" == "0" ]] && gap=0
# longest single new file added
longest=0
while IFS= read -r f; do
  [[ -z "$f" ]] && continue
  [[ ! -f "$f" ]] && continue
  loc=$(wc -l < "$f" 2>/dev/null || echo 0)
  (( loc > longest )) && longest=$loc
done < <(git diff --cached --name-only --diff-filter=A "$base" 2>/dev/null)
# locPerMinute (avoid div by 0)
lpm=0
if (( gap > 0 )); then
  lpm=$(( adds * 60 / gap ))
fi
printf '{"ts":"%s","filesChanged":%s,"linesAdded":%s,"linesDeleted":%s,"secondsSincePrev":%s,"locPerMinute":%s,"longestFileAdded":%s}\n' \
  "$ts" "${files:-0}" "${adds:-0}" "${dels:-0}" "$gap" "$lpm" "$longest" >> "$log"
git add "$log" 2>/dev/null || true
HOOK
    chmod +x .git/hooks/pre-commit
    if ! grep -q "^\.lab/activity\.jsonl" .gitignore 2>/dev/null; then
      : # sengaja TIDAK di-ignore — file ini harus ikut commit.
    fi
    echo "✅ activity-monitor terpasang (.git/hooks/pre-commit → .lab/activity.jsonl)"
    ;;
  uninstall)
    rm -f .git/hooks/pre-commit
    echo "🧹 activity-monitor dihapus."
    ;;
  *)
    echo "usage: $0 {install|uninstall}" >&2
    exit 2
    ;;
esac
