#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────
# lab-setup.sh — one-shot bootstrap untuk Codespace mahasiswa.
#
# Cara pakai (jalankan di terminal Codespace):
#   curl -fsSL https://absensi.lab.if.unismuh.ac.id/lab-setup.sh | bash
#
# Yang dilakukan:
#   1. Install lab-help / lab-log / lab-run / lab-live ke /usr/local/bin
#   2. Install yjs deps di /opt/lab-live (untuk lab-live)
#   3. Jalankan lab-live di background (nohup) → muncul di Live Monitor
#   4. Pasang hook di ~/.bashrc supaya lab-live auto-restart tiap kali
#      terminal baru dibuka (jaga-jaga kalau prosesnya mati)
#
# Idempotent: aman dijalankan berkali-kali.
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

DASHBOARD_URL="${LAB_DASHBOARD_URL:-https://absensi.lab.if.unismuh.ac.id}"
YJS_URL="${LAB_YJS_WS_URL:-wss://absensi.lab.if.unismuh.ac.id/yjs}"

# Persist env supaya proses lain (mis. terminal baru) juga lihat.
if ! grep -q 'LAB_YJS_WS_URL' "$HOME/.bashrc" 2>/dev/null; then
  {
    echo ""
    echo "# >>> lab-setup env >>>"
    echo "export LAB_DASHBOARD_URL='$DASHBOARD_URL'"
    echo "export LAB_YJS_WS_URL='$YJS_URL'"
    echo "# <<< lab-setup env <<<"
  } >> "$HOME/.bashrc"
fi
export LAB_DASHBOARD_URL YJS_URL
export LAB_YJS_WS_URL="$YJS_URL"

echo "🔧 LabDash setup (dashboard: $DASHBOARD_URL)"

# 1) lab-help / lab-log / lab-run
install_one() {
  local file="$1" target="$2"
  if [[ -x "$target" ]]; then
    echo "   ✓ $(basename "$target") sudah terpasang"
    return 0
  fi
  echo "   → install $(basename "$target")"
  sudo curl -fsSL "$DASHBOARD_URL/$file" -o "$target"
  sudo chmod +x "$target"
}
install_one "lab-help.sh" "/usr/local/bin/lab-help"
install_one "lab-log.sh"  "/usr/local/bin/lab-log"
install_one "lab-run"     "/usr/local/bin/lab-run"

# 2) lab-live (ESM script + node_modules co-located)
LIVE_DIR="/opt/lab-live"
sudo mkdir -p "$LIVE_DIR"
sudo chown "$(id -u):$(id -g)" "$LIVE_DIR" 2>/dev/null || true

if [[ ! -f "$LIVE_DIR/lab-live.mjs" ]]; then
  echo "   → download lab-live.mjs"
  curl -fsSL "$DASHBOARD_URL/lab-live.mjs" -o "$LIVE_DIR/lab-live.mjs"
fi

if [[ ! -d "$LIVE_DIR/node_modules/yjs" ]]; then
  echo "   → install yjs deps (sekali saja, ~30 detik)"
  pushd "$LIVE_DIR" >/dev/null
  [[ -f package.json ]] || npm init -y --silent >/dev/null
  node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));p.type='module';fs.writeFileSync('package.json',JSON.stringify(p,null,2));"
  npm install --silent --no-audit --no-fund yjs y-websocket ws
  popd >/dev/null
fi

# wrapper
if [[ ! -x /usr/local/bin/lab-live ]]; then
  sudo tee /usr/local/bin/lab-live >/dev/null <<'WRAP'
#!/usr/bin/env bash
while true; do
  node /opt/lab-live/lab-live.mjs "$@"
  rc=$?
  if [ "$rc" -ne 75 ]; then exit "$rc"; fi
  echo "♻️  lab-live restart (self-update)" >&2
  sleep 1
done
WRAP
  sudo chmod +x /usr/local/bin/lab-live
fi

# 3) jalankan lab-live (jaga-jaga kalau sudah jalan, skip)
if pgrep -f /opt/lab-live/lab-live.mjs >/dev/null 2>&1; then
  echo "   ✓ lab-live sudah jalan (pid $(pgrep -f /opt/lab-live/lab-live.mjs | head -n1))"
else
  echo "   → start lab-live (background)"
  nohup lab-live >/tmp/lab-live.log 2>&1 & disown
  sleep 1
  if pgrep -f /opt/lab-live/lab-live.mjs >/dev/null 2>&1; then
    echo "   ✓ lab-live started (pid $(pgrep -f /opt/lab-live/lab-live.mjs | head -n1))"
  else
    echo "   ⚠️  lab-live gagal start. Lihat: tail /tmp/lab-live.log"
  fi
fi

# 4) Auto-restart hook di .bashrc — supaya kalau Codespace di-stop+start,
#    saat terminal baru dibuka lab-live otomatis nyala kembali.
HOOK_MARK="# >>> lab-live auto-start >>>"
if ! grep -q "$HOOK_MARK" "$HOME/.bashrc" 2>/dev/null; then
  cat >> "$HOME/.bashrc" <<'HOOK'

# >>> lab-live auto-start >>>
# Auto-start lab-live tiap kali terminal interaktif dibuka, kalau belum jalan.
if [[ $- == *i* ]] && [[ -x /usr/local/bin/lab-live ]] && [[ -n "${LAB_YJS_WS_URL:-}" ]]; then
  if ! pgrep -f /opt/lab-live/lab-live.mjs >/dev/null 2>&1; then
    nohup lab-live >/tmp/lab-live.log 2>&1 & disown
  fi
fi
# <<< lab-live auto-start <<<
HOOK
  echo "   ✓ hook auto-restart ditambahkan ke ~/.bashrc"
fi

# 5) Pastikan auto-wrapper (npm/node/python lewat lab-run) ter-source
#    di terminal non-login juga. Default VS Code terminal = interactive
#    non-login → /etc/profile.d/* tidak dibaca. Kita source manual.
AUTOWRAP_MARK="# >>> lab-auto-wrap source >>>"
if ! grep -q "$AUTOWRAP_MARK" "$HOME/.bashrc" 2>/dev/null; then
  cat >> "$HOME/.bashrc" <<'AUTOWRAP'

# >>> lab-auto-wrap source >>>
# Default VS Code terminal bukan login shell → /etc/profile.d/* tidak otomatis.
# Source manual supaya npm/node/python dibungkus lab-run → output kelihatan
# di dashboard dosen (Live Monitor → terminal panel).
if [[ -f /etc/profile.d/lab-auto-wrap.sh ]]; then
  source /etc/profile.d/lab-auto-wrap.sh
fi
# <<< lab-auto-wrap source <<<
AUTOWRAP
  echo "   ✓ hook auto-wrap (npm/node/python → lab-run) ditambahkan ke ~/.bashrc"
fi

# 6) Capture SEMUA output terminal (bukan cuma npm/node/python) pakai
#    `script(1)`. Setiap kali terminal interaktif dibuka, kita re-exec
#    bawah `script` yang menulis ke /tmp/lab-terminal.log. lab-live akan
#    push log itu ke dashboard. Transparan: user tidak sadar.
SCRIPTHOOK_MARK="# >>> lab-script-record >>>"
if ! grep -q "$SCRIPTHOOK_MARK" "$HOME/.bashrc" 2>/dev/null; then
  cat >> "$HOME/.bashrc" <<'SCRIPTHOOK'

# >>> lab-script-record >>>
# Rekam seluruh sesi terminal ke /tmp/lab-terminal.log via `script(1)`.
# - hanya untuk shell interaktif
# - skip kalau sudah di dalam script (LAB_SCRIPT_ACTIVE=1) → hindari rekursi
# - skip kalau bukan TTY (mis. ssh non-interactive)
# - skip kalau dijalankan dari editor task (TERM_PROGRAM=vscode kondisi
#   masih dianggap interactive, tetap rekam)
if [[ $- == *i* ]] \
   && [[ -z "${LAB_SCRIPT_ACTIVE:-}" ]] \
   && [[ -t 0 ]] && [[ -t 1 ]] \
   && command -v script >/dev/null 2>&1; then
  export LAB_SCRIPT_ACTIVE=1
  LOG="/tmp/lab-terminal.log"
  # Trim kalau sudah > 1MB (jaga-jaga).
  if [[ -f "$LOG" ]] && [[ $(stat -c%s "$LOG" 2>/dev/null || stat -f%z "$LOG" 2>/dev/null || echo 0) -gt 1048576 ]]; then
    : > "$LOG"
  fi
  # util-linux `script`: -f flush, -q quiet, -a append, -e return exit code
  exec script -f -q -a -e "$LOG" --command "bash"
fi
# <<< lab-script-record <<<
SCRIPTHOOK
  echo "   ✓ hook script-record (capture semua perintah) ditambahkan ke ~/.bashrc"
fi

echo ""
echo "✅ Setup selesai. Dosen sekarang bisa lihat kode kamu di Live Monitor."
echo ""
echo "⚠️  PENTING: Tutup terminal ini dan buka terminal baru (Ctrl+Shift+\`)"
echo "   supaya recording aktif. Setelah itu SEMUA perintah yang kamu"
echo "   jalankan (npm, ls, git, dll) langsung muncul di dashboard dosen."
echo ""
echo "   Log lab-live:   tail -f /tmp/lab-live.log"
echo "   Log terminal:   tail -f /tmp/lab-terminal.log"
echo "   Stop lab-live:  pkill -f /opt/lab-live/lab-live.mjs"
