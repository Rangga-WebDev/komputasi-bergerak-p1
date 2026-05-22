#!/usr/bin/env bash
# Hard-block AI coding assistants di Codespace praktikum.
#
# Strategi berlapis:
#   1. Null-route hostname Copilot / Codeium / Tabnine / Continue dst.
#      via /etc/hosts → request HTTPS gagal di level DNS.
#   2. Uninstall extension Copilot kalau pernah ke-install lewat sync.
#   3. Tulis user-settings.json yang force-disable + ditandai readonly
#      (best-effort) supaya tidak diubah dari UI.
#
# Idempotent: aman di-run berkali-kali (postCreate + postStart).

set -u
set -o pipefail

MARK_BEGIN="# >>> lab-block-copilot >>>"
MARK_END="# <<< lab-block-copilot <<<"

BLOCK_HOSTS=(
  "copilot-proxy.githubusercontent.com"
  "api.githubcopilot.com"
  "api.individual.githubcopilot.com"
  "api.business.githubcopilot.com"
  "api.enterprise.githubcopilot.com"
  "proxy.individual.githubcopilot.com"
  "proxy.business.githubcopilot.com"
  "proxy.enterprise.githubcopilot.com"
  "telemetry.individual.githubcopilot.com"
  "telemetry.business.githubcopilot.com"
  "telemetry.enterprise.githubcopilot.com"
  "default.exp-tas.com"
  "copilot-telemetry.githubusercontent.com"
  "origin-tracker.githubusercontent.com"
  # Pihak ketiga
  "server.codeium.com"
  "inference.codeium.com"
  "api.codeium.com"
  "api.tabnine.com"
  "update.tabnine.com"
  "api.continue.dev"
  "control-plane.continue.dev"
  "sourcegraph.com"
  "cody-gateway.sourcegraph.com"
  "api.blackbox.ai"
  "www.blackbox.ai"
  "api.aminer.cn"
  "codegeex.cn"
  # Web AI chat UIs (kalau mahasiswa buka browser di Codespace forwarded port)
  "chat.openai.com"
  "chatgpt.com"
  "api.openai.com"
  "claude.ai"
  "api.anthropic.com"
  "console.anthropic.com"
  "gemini.google.com"
  "bard.google.com"
  "aistudio.google.com"
  "generativelanguage.googleapis.com"
  "perplexity.ai"
  "www.perplexity.ai"
  "phind.com"
  "www.phind.com"
  "you.com"
  "chat.you.com"
  "poe.com"
  "www.poe.com"
  "deepseek.com"
  "chat.deepseek.com"
  "api.deepseek.com"
  "kimi.moonshot.cn"
  "api.moonshot.cn"
  "x.ai"
  "grok.x.ai"
  "api.x.ai"
  "huggingface.co"
  "chat.mistral.ai"
  "api.mistral.ai"
)

write_hosts_block() {
  if [[ ! -w /etc/hosts ]] && ! sudo -n true >/dev/null 2>&1; then
    echo "⚠️  Tidak bisa edit /etc/hosts (no sudo). Skip DNS block."
    return 0
  fi
  local tmp
  tmp="$(mktemp)"
  # Buang block lama (kalau ada) lalu tulis ulang.
  if [[ -f /etc/hosts ]]; then
    awk -v b="$MARK_BEGIN" -v e="$MARK_END" '
      $0==b {skip=1; next}
      $0==e {skip=0; next}
      !skip {print}
    ' /etc/hosts > "$tmp"
  fi
  {
    echo "$MARK_BEGIN"
    echo "# Ditambahkan oleh lab-dashboard: blok AI coding assistants."
    for h in "${BLOCK_HOSTS[@]}"; do
      echo "0.0.0.0 $h"
    done
    echo "$MARK_END"
  } >> "$tmp"
  if [[ -w /etc/hosts ]]; then
    cat "$tmp" > /etc/hosts
  else
    sudo cp "$tmp" /etc/hosts
  fi
  rm -f "$tmp"
  echo "✅ /etc/hosts: ${#BLOCK_HOSTS[@]} AI host di-blokir."
}

uninstall_extensions() {
  local exts=(
    github.copilot
    github.copilot-chat
    github.copilot-labs
    continue.continue
    codeium.codeium
    tabnine.tabnine-vscode
    sourcegraph.cody-ai
    blackboxapp.blackbox
    aminer.codegeex
    danielsanmedium.dscodegpt
    rubberduck.rubberduck-vscode
    ms-toolsai.vscode-ai
  )
  # `code` CLI tidak selalu ada di Codespace headless; cek dulu.
  if ! command -v code >/dev/null 2>&1; then
    return 0
  fi
  for ext in "${exts[@]}"; do
    code --uninstall-extension "$ext" >/dev/null 2>&1 || true
  done
  echo "✅ Extension AI assistant di-uninstall (kalau ada)."
}

write_user_settings() {
  # User-level settings di Codespace Code Server.
  local dir="$HOME/.vscode-remote/data/Machine"
  mkdir -p "$dir"
  local file="$dir/settings.json"
  cat > "$file" <<'JSON'
{
  "github.copilot.enable": {
    "*": false,
    "plaintext": false,
    "markdown": false,
    "scminput": false
  },
  "github.copilot.editor.enableAutoCompletions": false,
  "github.copilot.chat.enabled": false,
  "chat.commandCenter.enabled": false,
  "chat.agent.enabled": false,
  "inlineChat.enabled": false,
  "chat.experimental.offerSetup": false,
  "telemetry.telemetryLevel": "off"
}
JSON
  echo "✅ User settings.json: AI disabled di $file."
}

main() {
  write_hosts_block
  uninstall_extensions
  write_user_settings
  echo "🚫 lab-dashboard: AI coding assistants di-blokir."
}

main "$@"
