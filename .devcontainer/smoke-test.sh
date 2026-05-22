#!/usr/bin/env bash
# Smoke test untuk template Codespace praktikum.
# Dijalankan via:
#   bash .devcontainer/smoke-test.sh
# atau lewat task `lab-help smoke` (kalau ditambahkan ke lab-help).
#
# Tujuan: validate guardrail terpasang dengan benar di Codespace mahasiswa.
# Exit 0 = aman, exit 1 = ada yang gagal (instruktur perlu re-seed).

set -u
set -o pipefail

PASS=0
FAIL=0
WARN=0

ok()   { echo "✅ $*"; PASS=$((PASS+1)); }
bad()  { echo "❌ $*" >&2; FAIL=$((FAIL+1)); }
warn() { echo "⚠️  $*"; WARN=$((WARN+1)); }

echo "==> Smoke test: lab-dashboard guardrails"
echo

# 1) Reserved files exist
for f in \
  .devcontainer/devcontainer.json \
  .devcontainer/install-lab-helper.sh \
  .devcontainer/activity-monitor.sh \
  .devcontainer/block-copilot.sh \
  .devcontainer/lab-help \
  .devcontainer/lab-live \
  .github/workflows/autograding.yml
do
  if [[ -f "$f" ]]; then
    ok "exists: $f"
  else
    bad "missing: $f"
  fi
done

# 2) AI hosts blocked via /etc/hosts
echo
for host in \
  api.githubcopilot.com \
  chat.openai.com \
  claude.ai \
  gemini.google.com \
  api.codeium.com
do
  if grep -q "0.0.0.0 $host" /etc/hosts 2>/dev/null; then
    ok "/etc/hosts blocks $host"
  else
    warn "/etc/hosts tidak blokir $host (run: bash .devcontainer/block-copilot.sh)"
  fi
done

# 3) Connectivity check — AI endpoints harus gagal
echo
for host in api.githubcopilot.com chat.openai.com claude.ai; do
  if curl -m 3 -sSf "https://$host" >/dev/null 2>&1; then
    bad "$host masih reachable (DNS block gagal)"
  else
    ok "$host unreachable"
  fi
done

# 4) Connectivity check — lab dashboard harus reachable
echo
if [[ -n "${LAB_DASHBOARD_URL:-}" ]]; then
  if curl -m 5 -sSf "$LAB_DASHBOARD_URL/api/health" >/dev/null 2>&1; then
    ok "LAB_DASHBOARD_URL reachable: $LAB_DASHBOARD_URL"
  else
    warn "LAB_DASHBOARD_URL tidak respon (cek koneksi / status server)"
  fi
else
  warn "LAB_DASHBOARD_URL env tidak di-set (lab-help tidak akan bisa kirim)"
fi

# 5) Pre-commit hook terpasang
echo
if [[ -x .git/hooks/pre-commit ]]; then
  if grep -q "lab-dashboard" .git/hooks/pre-commit 2>/dev/null ||
     grep -q "RESERVED_RE" .git/hooks/pre-commit 2>/dev/null; then
    ok "git pre-commit hook terpasang (tamper-guard + activity log)"
  else
    warn "git pre-commit ada tapi bukan punya lab-dashboard"
  fi
else
  warn "git pre-commit hook belum dipasang (run: bash .devcontainer/activity-monitor.sh install)"
fi

# 6) lab-help binary terpasang
echo
if command -v lab-help >/dev/null 2>&1; then
  ok "lab-help binary tersedia"
else
  warn "lab-help binary belum di-install (cek install-lab-helper.sh)"
fi

# 7) Copilot extension tidak ter-install
echo
if command -v code >/dev/null 2>&1; then
  installed=$(code --list-extensions 2>/dev/null || echo "")
  for ext in github.copilot github.copilot-chat continue.continue codeium.codeium; do
    if echo "$installed" | grep -qi "^$ext$"; then
      bad "extension AI terinstall: $ext"
    else
      ok "extension AI tidak ada: $ext"
    fi
  done
fi

echo
echo "==> Summary: $PASS pass · $WARN warn · $FAIL fail"
if (( FAIL > 0 )); then
  exit 1
fi
exit 0
