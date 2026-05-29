#!/usr/bin/env node
/**
 * upload-report-to-drive.js
 * Uploads the latest weekly SEO/AEO progress report (.md + .docx) to Google Drive.
 *
 * Google Drive folder: SEO_AEO_weekly_report
 * Folder ID: 10n88MEowXKf2ZL6pL5Q46WDiFmZ-HLaO
 *
 * Usage:
 *   node scripts/upload-report-to-drive.js
 *
 * Or specify a date explicitly:
 *   node scripts/upload-report-to-drive.js 2026-05-13
 *
 * Requirements:
 *   npm install googleapis
 *
 * Auth setup (one-time):
 *   1. Go to https://console.cloud.google.com/
 *   2. Create a project → Enable Google Drive API
 *   3. Credentials → Create → OAuth client ID → Desktop app
 *   4. Download as credentials.json → place at:
 *      /Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/credentials.json
 *   5. Run this script once — it prints a URL, open it in browser, approve, paste the code back
 *   6. token.json saved automatically — silent from here on
 */

const fs = require("fs");
const path = require("path");
const http = require("http");
const { google } = require("googleapis");

// ─── Config ───────────────────────────────────────────────────────────────────

const DRIVE_FOLDER_ID = "10n88MEowXKf2ZL6pL5Q46WDiFmZ-HLaO";
const DRIVE_FOLDER_NAME = "SEO_AEO_weekly_report";

const BASE_DIR = "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator";
const REPORTS_DIR = path.join(BASE_DIR, "reports-archive/progress-reports");
const CREDENTIALS_PATH = "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/credentials.json";
const TOKEN_PATH = "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/token.json";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// ─── Auth ─────────────────────────────────────────────────────────────────────

function loadCredentials() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`\n❌ credentials.json not found at:\n   ${CREDENTIALS_PATH}`);
    console.error(`\nSetup:`);
    console.error(`  1. https://console.cloud.google.com/ → Enable Drive API`);
    console.error(`  2. Credentials → OAuth client ID → Desktop app → Download`);
    console.error(`  3. Save as credentials.json at the path above\n`);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  return raw.installed || raw.web;
}

function createOAuthClient() {
  const keys = loadCredentials();
  return new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    "urn:ietf:wg:oauth:2.0:oob" // Desktop out-of-band redirect
  );
}

async function authorize() {
  const oauth2Client = createOAuthClient();

  // Try loading saved token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    oauth2Client.setCredentials(token);

    // Refresh if expired
    if (token.expiry_date && token.expiry_date < Date.now()) {
      console.log("🔄 Token expired — refreshing...");
      const { credentials } = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(credentials);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials));
      console.log("✅ Token refreshed");
    }

    return oauth2Client;
  }

  // First-time flow — print URL and prompt for code
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("\n🔐 First-time Google auth required.");
  console.log("   Open this URL in your browser:\n");
  console.log(`   ${authUrl}\n`);
  console.log('   Approve access, then paste the code shown here:');

  const code = await new Promise((resolve) => {
    const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout });
    rl.question("   Code: ", (answer) => { rl.close(); resolve(answer.trim()); });
  });

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log(`\n✅ Token saved to ${TOKEN_PATH} — won't need to re-auth next time\n`);

  return oauth2Client;
}

// ─── Drive helpers ─────────────────────────────────────────────────────────────

async function uploadFile(drive, filePath, mimeType) {
  const fileName = path.basename(filePath);
  const fileSize = fs.statSync(filePath).size;

  console.log(`\n📤 Uploading ${fileName} (${(fileSize / 1024).toFixed(1)} KB)...`);

  // Check if file already exists — update instead of duplicate
  const existing = await drive.files.list({
    q: `name='${fileName}' and '${DRIVE_FOLDER_ID}' in parents and trashed=false`,
    fields: "files(id, name)",
  });

  if (existing.data.files.length > 0) {
    const fileId = existing.data.files[0].id;
    const res = await drive.files.update({
      fileId,
      media: { mimeType, body: fs.createReadStream(filePath) },
      fields: "id, name, webViewLink",
    });
    console.log(`   ↺ Updated existing file`);
    return res.data;
  } else {
    const res = await drive.files.create({
      requestBody: { name: fileName, parents: [DRIVE_FOLDER_ID] },
      media: { mimeType, body: fs.createReadStream(filePath) },
      fields: "id, name, webViewLink",
    });
    console.log(`   ✓ Created new file`);
    return res.data;
  }
}

// ─── Find latest report files ──────────────────────────────────────────────────

function findReportFiles(dateStr) {
  const files = fs.readdirSync(REPORTS_DIR);

  let targetDate = dateStr;
  if (!targetDate) {
    const dates = files
      .map((f) => f.match(/pingcap-seo-aeo-progress-(\d{4}-\d{2}-\d{2})\.(md|docx)$/))
      .filter(Boolean)
      .map((m) => m[1]);
    const unique = [...new Set(dates)].sort();
    targetDate = unique[unique.length - 1];
  }

  if (!targetDate) {
    console.error(`\n❌ No report files found in ${REPORTS_DIR}`);
    process.exit(1);
  }

  const mdFile = path.join(REPORTS_DIR, `pingcap-seo-aeo-progress-${targetDate}.md`);
  const docxFile = path.join(REPORTS_DIR, `pingcap-seo-aeo-progress-${targetDate}.docx`);
  const docxMime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const found = [];
  if (fs.existsSync(mdFile)) found.push({ path: mdFile, mime: "text/markdown" });
  else console.warn(`⚠️  .md not found: ${mdFile}`);

  if (fs.existsSync(docxFile)) found.push({ path: docxFile, mime: docxMime });
  else console.warn(`⚠️  .docx not found: ${docxFile}`);

  if (found.length === 0) {
    console.error(`\n❌ No files found for date ${targetDate}`);
    process.exit(1);
  }

  return { files: found, date: targetDate };
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const dateArg = process.argv[2] || null;

  console.log(`\n📁 Target: ${DRIVE_FOLDER_NAME}`);
  console.log(`   https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`);

  const { files, date } = findReportFiles(dateArg);
  console.log(`\n📅 Report date: ${date}`);
  console.log(`   Files: ${files.map((f) => path.basename(f.path)).join(", ")}`);

  const auth = await authorize();
  const drive = google.drive({ version: "v3", auth });

  const results = [];
  for (const file of files) {
    const result = await uploadFile(drive, file.path, file.mime);
    results.push(result);
  }

  console.log(`\n━━━ UPLOAD COMPLETE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  results.forEach((r) => {
    console.log(`  ✅ ${r.name}`);
    if (r.webViewLink) console.log(`     ${r.webViewLink}`);
  });
  console.log(`\n  📂 https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}\n`);
}

main().catch((err) => {
  console.error(`\n❌ Upload failed: ${err.message}`);
  if (err.message.includes("invalid_grant")) {
    console.error(`   Token may be revoked — delete ${TOKEN_PATH} and re-run to re-authenticate.`);
  }
  process.exit(1);
});
