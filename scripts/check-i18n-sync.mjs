#!/usr/bin/env node
/**
 * i18n 동기화 검증 스크립트
 *
 * en.json을 canonical source로 사용하여 ko/ja/zh.json의
 * missing keys, extra keys, empty values를 검사한다.
 *
 * Exit code:
 *   0 - missing key 없음 (extra/empty 경고는 exit 0 유지)
 *   1 - missing key 1개 이상 발견
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const I18N_DIR = join(__dirname, "..", "src", "i18n");

// ---------------------------------------------------------------------------
// Leaf key path 추출 (dot-notation)
// 배열: 원소 존재 여부 확인을 위해 배열 자체를 leaf로 등록한다.
//   예) features.agent_team_bullets → ["...", "...", ...]
//       → key: "features.agent_team_bullets[0]", "features.agent_team_bullets[1]", ...
// ---------------------------------------------------------------------------

/**
 * JSON 객체를 재귀 순회하여 { dotPath → value } 형태의 flat Map을 반환한다.
 *
 * @param {unknown} node - 순회할 JSON 노드
 * @param {string}  prefix - 현재까지 쌓인 dot-notation prefix
 * @param {Map<string, unknown>} result - 결과 Map (누적)
 * @returns {Map<string, unknown>}
 */
function extractLeafPaths(node, prefix = "", result = new Map()) {
  if (Array.isArray(node)) {
    // 배열: 각 원소를 indexed key로 등록
    node.forEach((item, idx) => {
      const path = prefix ? `${prefix}[${idx}]` : `[${idx}]`;
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        extractLeafPaths(item, path, result);
      } else {
        result.set(path, item);
      }
    });
  } else if (typeof node === "object" && node !== null) {
    // 일반 객체: 재귀 순회
    for (const [key, value] of Object.entries(node)) {
      const path = prefix ? `${prefix}.${key}` : key;
      extractLeafPaths(value, path, result);
    }
  } else {
    // Primitive leaf
    result.set(prefix, node);
  }

  return result;
}

// ---------------------------------------------------------------------------
// JSON 로드 헬퍼
// ---------------------------------------------------------------------------

/**
 * @param {string} filename - i18n 디렉토리 내 파일명
 * @returns {unknown}
 */
function loadJson(filename) {
  const filePath = join(I18N_DIR, filename);
  try {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(`Failed to read ${filename}: ${err.message}`);
    process.exit(2);
  }
}

// ---------------------------------------------------------------------------
// 단일 언어 파일 검사
// ---------------------------------------------------------------------------

/**
 * @typedef {{ filename: string, totalKeys: number, missing: string[], extra: string[], empty: string[] }} CheckResult
 */

/**
 * @param {string}              filename   - 검사할 파일명 (예: "ko.json")
 * @param {Map<string, unknown>} enLeaves  - en.json의 leaf Map
 * @returns {CheckResult}
 */
function checkFile(filename, enLeaves) {
  const data = loadJson(filename);
  const targetLeaves = extractLeafPaths(data);

  const missing = [];
  const empty = [];

  // en에 있는 키가 target에 없는지 확인
  for (const [path, _enVal] of enLeaves) {
    if (!targetLeaves.has(path)) {
      missing.push(path);
    }
  }

  // target에 있는 키가 en에 없는지 확인 (extra)
  const extra = [];
  for (const [path, targetVal] of targetLeaves) {
    if (!enLeaves.has(path)) {
      extra.push(path);
    } else if (targetVal === "") {
      // 빈 문자열 경고
      empty.push(path);
    }
  }

  return {
    filename,
    totalKeys: targetLeaves.size,
    missing,
    extra,
    empty,
  };
}

// ---------------------------------------------------------------------------
// 출력 포맷
// ---------------------------------------------------------------------------

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";

/**
 * 결과를 명확하게 출력한다 (printResult 대체).
 *
 * @param {CheckResult} result
 * @returns {boolean} hasMissing
 */
function printResultClean(result) {
  const { filename, totalKeys, missing, extra, empty } = result;
  const hasMissing = missing.length > 0;
  const hasIssue = hasMissing || extra.length > 0;

  let icon;
  let color;
  if (hasMissing) {
    icon = "❌";
    color = RED;
  } else if (extra.length > 0) {
    icon = "⚠️ ";
    color = YELLOW;
  } else {
    icon = "✅";
    color = GREEN;
  }

  console.log(
    `${icon} ${color}${filename}${RESET}: ${totalKeys} keys, ` +
      `${hasMissing ? color : ""}${missing.length} missing${hasMissing ? RESET : ""}, ` +
      `${extra.length > 0 ? YELLOW : ""}${extra.length} extra${extra.length > 0 ? RESET : ""}`,
  );

  if (missing.length > 0) {
    console.log(`  ${RED}Missing:${RESET} ${missing.join(", ")}`);
  }

  if (extra.length > 0) {
    console.log(`  ${YELLOW}Extra:${RESET} ${extra.join(", ")}`);
  }

  if (empty.length > 0) {
    console.log(
      `  ${YELLOW}Empty values:${RESET} ${empty.join(", ")}`,
    );
  }

  return hasMissing;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const TARGET_FILES = ["ko.json", "ja.json", "zh.json"];

const enData = loadJson("en.json");
const enLeaves = extractLeafPaths(enData);
const enKeyCount = enLeaves.size;

console.log(`\ni18n sync check — canonical source: en.json (${enKeyCount} keys)\n`);

let hasAnyMissing = false;

for (const filename of TARGET_FILES) {
  const result = checkFile(filename, enLeaves);
  const hasMissing = printResultClean(result);
  if (hasMissing) {
    hasAnyMissing = true;
  }
}

console.log("");

if (hasAnyMissing) {
  console.error(`${RED}i18n check failed: one or more locale files have missing keys.${RESET}`);
  console.error("Add the missing translations and re-run `pnpm i18n:check`.\n");
  process.exit(1);
} else {
  console.log(`${GREEN}All locale files are in sync with en.json.${RESET}\n`);
  process.exit(0);
}
