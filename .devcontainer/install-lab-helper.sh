#!/usr/bin/env bash
# Installs the `lab-help` CLI into the Codespace.
# Place at .devcontainer/install-lab-helper.sh in your assignment template.

set -euo pipefail

DASHBOARD_URL="${LAB_DASHBOARD_URL:-}"
if [[ -z "$DASHBOARD_URL" ]]; then
  echo "ℹ️  LAB_DASHBOARD_URL tidak diset; lewati instalasi lab-help."
  exit 0
fi

install_one() {
  local script="$1" target="$2" vendored="$3"
  echo "→ Mengunduh $(basename "$target") dari $DASHBOARD_URL"
  if ! sudo curl -fsSL "$DASHBOARD_URL/$script" -o "$target" 2>/dev/null; then
    if [[ -f "$vendored" ]]; then
      sudo cp "$vendored" "$target"
    else
      echo "⚠️  Lewati $(basename "$target") (tidak bisa download & tidak ada copy lokal)." >&2
      return 0
    fi
  fi
  sudo chmod +x "$target"
  echo "✅ $(basename "$target") terpasang di $target"
}

install_one "lab-help.sh" "/usr/local/bin/lab-help" ".devcontainer/lab-help"
install_one "lab-log.sh"  "/usr/local/bin/lab-log"  ".devcontainer/lab-log"
install_one "lab-run"     "/usr/local/bin/lab-run"  ".devcontainer/lab-run"

# Pasang auto-wrapper: setiap kali user mengetik npm / node / python / pip /
# pytest / yarn / pnpm di shell interaktif, command akan otomatis di-jalankan
# lewat `lab-run` sehingga output (termasuk error) muncul di dashboard
# instruktur tanpa user harus menambahkan prefix `lab-run` manual.
WRAPPER_RC="/etc/profile.d/lab-auto-wrap.sh"
sudo tee "$WRAPPER_RC" >/dev/null <<'AUTOWRAP'
# Auto-wrap common commands with lab-run so their output streams to the
# instructor dashboard. Only active in interactive shells, and only when
# lab-run is installed. Skips if already inside lab-run (LAB_RUN_ACTIVE=1).
if [[ $- == *i* ]] && command -v lab-run >/dev/null 2>&1 && [[ -z "${LAB_RUN_ACTIVE:-}" ]]; then
  for __lab_cmd in npm node python python3 pip pip3 pytest yarn pnpm tsx ts-node; do
    if command -v "$__lab_cmd" >/dev/null 2>&1; then
      # shellcheck disable=SC2139
      eval "${__lab_cmd}() { lab-run command ${__lab_cmd} \"\$@\"; }"
    fi
  done
  unset __lab_cmd
fi
AUTOWRAP
sudo chmod +x "$WRAPPER_RC"
echo "✅ Auto-wrapper terpasang ($WRAPPER_RC) — npm/node/python/pytest dll otomatis ditangkap"

# lab-live (ESM) butuh node_modules co-located. Install ke /opt/lab-live/
# lalu buat wrapper kecil di /usr/local/bin/lab-live.
LIVE_DIR="/opt/lab-live"
sudo mkdir -p "$LIVE_DIR"
sudo chown "$(id -u):$(id -g)" "$LIVE_DIR" 2>/dev/null || true

echo "→ Mengunduh lab-live.mjs dari $DASHBOARD_URL"
if ! curl -fsSL "$DASHBOARD_URL/lab-live.mjs" -o "$LIVE_DIR/lab-live.mjs" 2>/dev/null; then
  if [[ -f ".devcontainer/lab-live" ]]; then
    cp ".devcontainer/lab-live" "$LIVE_DIR/lab-live.mjs"
  else
    echo "⚠️  Lewati lab-live (tidak bisa download & tidak ada copy lokal)." >&2
  fi
fi

if [[ -f "$LIVE_DIR/lab-live.mjs" ]]; then
  # Install deps lokal di /opt/lab-live (ESM resolver akan menemukan
  # node_modules di parent directory dari script).
  if [[ -n "${LAB_YJS_WS_URL:-}" ]] && ! [[ -d "$LIVE_DIR/node_modules/yjs" ]]; then
    echo "→ Installing yjs deps di $LIVE_DIR ..."
    pushd "$LIVE_DIR" >/dev/null
    [[ -f package.json ]] || npm init -y --silent >/dev/null 2>&1
    # pastikan type=module supaya dependency tree konsisten
    node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));p.type='module';fs.writeFileSync('package.json',JSON.stringify(p,null,2));" 2>/dev/null || true
    npm install --silent --no-audit --no-fund yjs y-websocket ws 2>/dev/null || \
      echo "⚠️  Gagal install yjs deps di $LIVE_DIR" >&2
    popd >/dev/null
    echo "✅ yjs deps siap di $LIVE_DIR/node_modules"
  fi

  # Wrapper di PATH yang exec ke script asli (mempertahankan cwd & args).
  # Restart loop: kalau lab-live exit 75 (self-updated), respawn otomatis.
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
  echo "✅ lab-live terpasang (wrapper /usr/local/bin/lab-live → $LIVE_DIR/lab-live.mjs)"
fi

cat <<'TIPS'

Cara pakai:
  lab-help "stuck di null pointer line 42"
  lab-log  "TypeError: x is not a function"
  lab-run npm run dev          # output dijepret ke dashboard real-time
  npm test 2>&1 | lab-log -k test -t jest

Real-time code sync (auto-start jika LAB_YJS_WS_URL diset):
  lab-live   # manual start (atau langsung: node /opt/lab-live/lab-live.mjs)
TIPS
