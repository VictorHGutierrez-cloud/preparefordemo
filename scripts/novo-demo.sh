#!/usr/bin/env bash
# Create a new client demo folder inside demo/clientes/
# Usage: ./scripts/novo-demo.sh "Client Name" "client-slug"

set -euo pipefail

CLIENT_NAME="${1:-}"
CLIENT_SLUG="${2:-}"

if [[ -z "$CLIENT_NAME" || -z "$CLIENT_SLUG" ]]; then
  echo "Usage: ./scripts/novo-demo.sh \"Client Name\" \"client-slug\""
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$ROOT/demo/clientes/$CLIENT_SLUG"

if [[ -d "$TARGET" ]]; then
  echo "Folder already exists: $TARGET"
  exit 1
fi

mkdir -p "$TARGET"
cp "$ROOT/demo/TEMPLATE-pre-demo.md" "$TARGET/prep.md"
sed -i '' "s/\[Client Name\]/$CLIENT_NAME/g" "$TARGET/prep.md" 2>/dev/null || \
  sed -i "s/\[Client Name\]/$CLIENT_NAME/g" "$TARGET/prep.md"

echo "Created: $TARGET/prep.md"
echo "Next: fill cliente.config.json and transcricao/reuniao.txt, then run PROMPT-PRE-DEMO.md in Cursor"
