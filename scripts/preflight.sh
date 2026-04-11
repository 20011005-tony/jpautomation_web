#!/usr/bin/env bash

set -u

BASE_URL="http://127.0.0.1:8080"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

PASSED=0
FAILED=0
FAIL_MESSAGES=()

pass() {
  PASSED=$((PASSED + 1))
  printf '[PASS] %s\n' "$1"
}

fail() {
  FAILED=$((FAILED + 1))
  FAIL_MESSAGES+=("$1")
  printf '[FAIL] %s\n' "$1"
}

check_http_200() {
  local route="$1"
  local code
  code="$(curl -sS -o /dev/null -m 5 -w '%{http_code}' "${BASE_URL}${route}" || true)"

  if [[ "$code" == "200" ]]; then
    pass "${route} -> 200"
  else
    fail "${route} -> expected 200, got ${code:-curl_error}"
  fi
}

printf 'Running preflight checks against %s\n\n' "$BASE_URL"

# 1) Check local server availability (without starting it)
server_code="$(curl -sS -o /dev/null -m 3 -w '%{http_code}' "${BASE_URL}/" || true)"
if [[ "$server_code" =~ ^[0-9]{3}$ && "$server_code" != "000" ]]; then
  pass "Local server reachable at ${BASE_URL} (status ${server_code})"
else
  fail "Local server not reachable at ${BASE_URL}. Start your local server first."
fi

# 2) Curl key routes and fail on non-200.
#    404 page must be checked via static path /404.html and should return 200.
KEY_ROUTES=(
  "/"
  "/index.html"
  "/servicios.html"
  "/casos.html"
  "/blog.html"
  "/contacto.html"
  "/metodologia.html"
  "/recursos.html"
  "/privacidad.html"
  "/terminos.html"
  "/en/index.html"
  "/en/services.html"
  "/en/cases.html"
  "/en/blog.html"
  "/en/contact.html"
  "/en/methodology.html"
  "/en/resources.html"
  "/en/privacy.html"
  "/en/terms.html"
  "/404.html"
)

for route in "${KEY_ROUTES[@]}"; do
  check_http_200 "$route"
done

# 3) grep html files for href="#" and fail if found in production pages
HREF_ISSUES="$(
  grep -R -n --include='*.html' 'href="#"' "$ROOT_DIR" \
    --exclude='design-home-proposal.html' \
    --exclude='design-*.html' \
    --exclude='prototype-*.html' \
    --exclude-dir='node_modules' || true
)"

if [[ -n "$HREF_ISSUES" ]]; then
  fail "Found placeholder links (href=\"#\") in production HTML files:\n$HREF_ISSUES"
else
  pass 'No placeholder links (href="#") in production HTML files'
fi

# 4) verify presence of legal pages and netlify.toml
REQUIRED_FILES=(
  "$ROOT_DIR/privacidad.html"
  "$ROOT_DIR/terminos.html"
  "$ROOT_DIR/en/privacy.html"
  "$ROOT_DIR/en/terms.html"
  "$ROOT_DIR/netlify.toml"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [[ -f "$file" ]]; then
    pass "Exists: ${file#"$ROOT_DIR/"}"
  else
    fail "Missing required file: ${file#"$ROOT_DIR/"}"
  fi
done

# 5) validate netlify deny redirects for non-public/sensitive paths
NETLIFY_FILE="$ROOT_DIR/netlify.toml"
DENY_REDIRECTS=(
  "/node_modules/*"
  "/.claude/*"
  "/.git/*"
  "/.env*"
  "/scripts/*"
  "/*.md"
  "/*.mjs"
  "/package.json"
  "/package-lock.json"
  "/skills-lock.json"
  "/README*"
)

for deny_path in "${DENY_REDIRECTS[@]}"; do
  if grep -Fq "from = \"${deny_path}\"" "$NETLIFY_FILE"; then
    pass "netlify deny redirect exists: ${deny_path}"
  else
    fail "netlify deny redirect missing: ${deny_path}"
  fi
done

# 6) Print clear summary and set exit code
printf '\n========== PRE-FLIGHT SUMMARY ==========\n'
printf 'PASS: %d\n' "$PASSED"
printf 'FAIL: %d\n' "$FAILED"

if (( FAILED > 0 )); then
  printf '\nFailures:\n'
  for msg in "${FAIL_MESSAGES[@]}"; do
    printf ' - %b\n' "$msg"
  done
  exit 1
fi

printf '\nAll checks passed. Ready to ship.\n'
exit 0
