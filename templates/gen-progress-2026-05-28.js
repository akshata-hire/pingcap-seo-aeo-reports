// ─── WEEKLY UPDATE CHECKLIST ──────────────────────────────────────────────────
// ONLY EDIT THE DATA OBJECT BELOW (lines 20–120)
// Do NOT touch anything below the "DO NOT EDIT BELOW" line
// Run: node templates/gen-progress-docx.js
// ──────────────────────────────────────────────────────────────────────────────

const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak } = require("docx");

// ═══════════════════════════════════════════════════════════════════════════════
// EDIT THIS DATA OBJECT EACH WEEK — nothing else needs changing
// ═══════════════════════════════════════════════════════════════════════════════

const DATA = {

  // ── Dates & scores ──────────────────────────────────────────────────────────
  reportDate:     "May 28, 2026",
  baselineDate:   "April 30, 2026",
  aeoScore:       "9.0",
  seoScore:       "84",
  criticalCount:  0,
  baselineAeo:    "9.0",
  baselineSeo:    "82",
  baselineCritical: 0,

  // ── Headline ─────────────────────────────────────────────────────────────────
  headlineTitle:  "Glossary surges to 49 terms, data-src images cleared, TTFB recovered",
  headlineBody:   "The glossary expanded dramatically from 17 to 49 headings this week — surpassing the 25+ internal target and approaching CockroachDB's 50+ benchmark. All 10 lazy-loaded data-src images on the homepage were eliminated, improving render performance, and TTFB recovered from 265ms to ~103ms. One regression requires attention: the Content-Security-Policy header was completely removed (was present in report-only mode on Apr 30).",

  // ── Improvements table ───────────────────────────────────────────────────────
  improvements: [
    ["1", "✅ Glossary expanded: 17 → 49 headings", "HIGH", "Surpassed 25+ internal target; near CockroachDB 50+ benchmark"],
    ["2", "✅ data-src lazy images: 10 → 0", "MEDIUM", "Homepage fully cleared of JS-dependent lazy loading"],
    ["3", "✅ TTFB recovered: 265ms → ~103ms", "MEDIUM", "Apr 30 soft regression reversed; 3x faster server response"],
  ],

  // ── Regressions table ────────────────────────────────────────────────────────
  regressions: [
    ["R1", "⚠️ CSP header completely removed", "MEDIUM", "Was report-only on Apr 30; now absent entirely. Security headers: 6 → 5"],
    ["R2", "⚠️ Render-blocking scripts: 5 → 6", "LOW", "One additional non-deferred/non-async script. Investigate new script addition"],
  ],

  // ── Scoring table ────────────────────────────────────────────────────────────
  scoring: [
    ["Technical SEO",              "19%", "85", "84", "-1 — CSP removed (-2) offsets TTFB recovery (+1)"],
    ["Content Quality",            "19%", "82", "86", "+4 — Glossary 17 to 49 terms is major content signal"],
    ["On-Page SEO",                "18%", "78", "78", "0 — Stable"],
    ["AI Search Readiness",        "15%", "82", "83", "+1 — Glossary depth improves entity coverage"],
    ["Brand Authority & Backlinks","12%", "--", "--", "No pull this week — use last Apr 30 snapshot"],
    ["Schema",                     "10%", "65", "65", "0 — Stable"],
    ["Performance",                 "4%", "68", "72", "+4 — TTFB recovered, data-src images cleared"],
    ["Visual/Mobile",               "3%", "62", "64", "+2 — data-src elimination improves visual rendering"],
  ],
  scoringWeightedPrior: "~82",
  scoringWeightedCurrent: "~84",
  scoringWeightedDelta: "+2 — Glossary expansion + performance recovery outweigh CSP regression",

  // ── Open items ────────────────────────────────────────────────────────────────
  openCritical: [],
  openHigh: [
    ["1", "242 articles remain in article-sitemap", "Mar 9", "74% removed (943 to 242). Remaining content needs quality audit"],
  ],
  openMedium: [
    ["2", "No /compare/ hub page", "Mar 23", "11 comparison pages with no central landing — 301 redirect only"],
    ["3", "About page missing leadership", "Mar 9", "No founders, CEO, or investors named"],
    ["4", "CSP header fully removed", "May 28", "Was report-only; now gone. Restore and enforce — regression"],
    ["5", "Render-blocking scripts +1", "May 28", "5 to 6 scripts without defer/async. Investigate new script"],
  ],
  openLow: [
    ["6", "/.well-known/llms.txt still 404", "Mar 9", "Root llms.txt is 200; well-known path is an easy first-mover add"],
    ["7", "/what-is-tidb/ lacks JSON-LD Article schema", "Apr 30", "Add Article + FAQPage schema for AEO citation optimization"],
  ],

  // ── Resolved this week ───────────────────────────────────────────────────────
  resolvedThisWeek: [
    ["1", "Glossary below 25+ target", "49 headings (was 17) — surpassed target"],
    ["2", "data-src images (10)", "0 remaining — fully cleared from homepage"],
    ["3", "TTFB slowdown (265ms)", "Recovered to ~103ms — regression reversed"],
  ],

  // ── Progress arc ─────────────────────────────────────────────────────────────
  progressArc: [
    ["Mar 9",  "3.5",  "52",  "943", "10", "Baseline (34 items)"],
    ["Mar 15", "~6.5", "68",  "943",  "7", "Security, AI rules, glossary"],
    ["Mar 22", "~7.5", "67",  "943",  "6", "Schema, hero, GTM"],
    ["Mar 29", "8.0",  "~67", "560",  "5", "Article cleanup begins"],
    ["Apr 6",  "8.5",  "~75", "242",  "3", "Major cleanup sprint"],
    ["Apr 12", "8.5",  "~77", "242",  "2", "Cache correction, +1 comparison"],
    ["Apr 19", "8.5",  "~78", "242",  "1", "Homepage AI-Agents repositioning"],
    ["Apr 30", "9.0",  "~82", "242",  "0", "/what-is-tidb/ LIVE — first zero criticals"],
    ["May 28", "9.0",  "~84", "242",  "0", "Glossary 49 terms, data-src cleared, TTFB recovered"],
  ],

  // ── Cumulative stats ─────────────────────────────────────────────────────────
  cumulativeStats: [
    ["Items fixed (of 34)",      "0",      "26",              "76% resolved"],
    ["Critical remaining",       "10",     "0",               "-100%"],
    ["Mass-gen articles",        "943",    "242",             "-74%"],
    ["Render-blocking scripts",  "11",     "6",               "-45%"],
    ["data-src images",          "~27",    "0",               "-100%"],
    ["Security headers",         "0/7",    "5/7",             "+5 (CSP dropped this week)"],
    ["Comparison pages",         "4",      "11",              "+175%"],
    ["Glossary terms",           "0",      "49",              "NEW — near CockroachDB parity"],
    ["/what-is-tidb/ page",      "404",    "LIVE — 3K words", "NEW"],
    ["AEO Score",                "3.5/10", "9.0/10",          "+157%"],
  ],

  // ── Top 3 actions ─────────────────────────────────────────────────────────────
  topActions: [
    ["1", "Restore Content-Security-Policy header (enforce, not just report-only)", "HIGH — security regression; CSP absent since May 28 audit", "30 min (infra)"],
    ["2", "Add JSON-LD Article + FAQPage schema to /what-is-tidb/", "MEDIUM — maximizes AI citation eligibility and rich results", "1 hour"],
    ["3", "Investigate render-blocking +1 script AND push /.well-known/llms.txt", "MEDIUM — two quick wins in same deploy window", "1–2 hours"],
  ],

  // ── Output path ──────────────────────────────────────────────────────────────
  outputPath: process.env.REPORT_OUT ||
    "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/reports-archive/progress-reports/pingcap-seo-aeo-progress-2026-05-28.docx",
};

// ═══════════════════════════════════════════════════════════════════════════════
// DO NOT EDIT BELOW THIS LINE — rendering engine
// ═══════════════════════════════════════════════════════════════════════════════

const PW=12240,ML=1260,MR=1260;
const bd={style:BorderStyle.SINGLE,size:1,color:"CCCCCC"};
const bs={top:bd,bottom:bd,left:bd,right:bd};
const cm={top:60,bottom:60,left:100,right:100};
const C={hd:"1A1A2E",sb:"2C3E50",ac:"2E75B6",mu:"888888",hb:"2E75B6",ht:"FFFFFF",cr:"CC0000",hi:"CC7700",me:"997700",fx:"228B22",cb:"FDE8E8",hib:"FFF3E0",mb:"FFFDE7",fb:"E8F5E9",lb:"F2F7FB"};

function b(t,o={}){return new TextRun({text:t,bold:true,font:"Arial",size:20,...o})}
function n(t,o={}){return new TextRun({text:t,font:"Arial",size:20,...o})}
function sm(t,o={}){return new TextRun({text:t,font:"Arial",size:18,...o})}
function hc(t,w){return new TableCell({borders:bs,width:{size:w,type:WidthType.DXA},shading:{fill:C.hb,type:ShadingType.CLEAR},margins:cm,children:[new Paragraph({children:[b(t,{color:C.ht,size:18})]})]})}
function dc(ch,w,o={}){return new TableCell({borders:bs,width:{size:w,type:WidthType.DXA},shading:o.f?{fill:o.f,type:ShadingType.CLEAR}:undefined,margins:cm,children:[new Paragraph({spacing:{before:20,after:20},children:Array.isArray(ch)?ch:[n(ch)]})]})}
function tbl(hds,rows,cw){return new Table({width:{size:cw.reduce((a,c)=>a+c,0),type:WidthType.DXA},columnWidths:cw,rows:[new TableRow({children:hds.map((h,i)=>hc(h,cw[i]))}),...rows.map(r=>new TableRow({children:r.map((c,i)=>{if(typeof c==="object"&&c._f)return dc(c.ch||[n(c.t||"")],cw[i],{f:c._f});return dc(c,cw[i])})}))]});}
function h1(t){return new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:300,after:160},children:[new TextRun({text:t,bold:true,font:"Arial",size:28,color:C.hd})]})}
function h2(t){return new Paragraph({heading:HeadingLevel.HEADING_2,spacing:{before:240,after:120},children:[new TextRun({text:t,bold:true,font:"Arial",size:24,color:C.sb})]})}
function sp(){return new Paragraph({spacing:{after:80},children:[]})}
function para(...r){return new Paragraph({spacing:{before:60,after:100},children:r})}
function g(t){return{t,ch:[b(t,{size:18,color:C.fx})],_f:C.fb}}
function rr(t){return{t,ch:[b(t,{size:18,color:C.cr})],_f:C.cb}}
function oo(t){return{t,ch:[b(t,{size:18,color:C.hi})],_f:C.hib}}

// Helper to wrap improvement/regression text with colour
function impCell(text) {
  return text.startsWith("✅") ? g(text) : text.startsWith("⚠️") ? oo(text) : text;
}

const p = [];

// ── Title page ────────────────────────────────────────────────────────────────
p.push(sp(),sp(),sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:80},children:[new TextRun({text:"PingCAP.com",font:"Arial",size:44,bold:true,color:C.hd})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:120},children:[new TextRun({text:"SEO / AEO Progress Report",font:"Arial",size:36,bold:true,color:C.ac})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200},children:[new TextRun({text:DATA.reportDate,font:"Arial",size:24,color:C.mu})]}));
p.push(sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[b(`AEO: ${DATA.aeoScore}/10  |  SEO Health: ${DATA.seoScore}/100  |  ${DATA.criticalCount} Critical Items Open`,{color:DATA.criticalCount===0?C.fx:C.cr,size:28})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[n(`Baseline: ${DATA.baselineDate} (AEO ${DATA.baselineAeo}, SEO ${DATA.baselineSeo}, ${DATA.baselineCritical} Critical)`,{color:C.mu})]}));
p.push(new Paragraph({children:[new PageBreak()]}));

// ── Headline ──────────────────────────────────────────────────────────────────
p.push(h1(`🏆 ${DATA.headlineTitle}`));
p.push(para(n(DATA.headlineBody)));
p.push(new Paragraph({children:[new PageBreak()]}));

// ── Changes ───────────────────────────────────────────────────────────────────
p.push(h1(`Changes Since ${DATA.baselineDate}`));
const chw=[500,3500,1700,4020];

if(DATA.improvements.length>0){
  p.push(h2(`Improvements (${DATA.improvements.length})`));
  p.push(tbl(["#","Change","Impact","Evidence"],DATA.improvements.map(r=>[r[0],impCell(r[1]),r[2],r[3]]),chw));
  p.push(sp());
}

if(DATA.regressions.length>0){
  p.push(h2(`Regressions (${DATA.regressions.length})`));
  p.push(tbl(["#","Item","Impact","Notes"],DATA.regressions.map(r=>[r[0],impCell(r[1]),r[2],r[3]]),chw));
  p.push(sp());
}

p.push(new Paragraph({children:[new PageBreak()]}));

// ── Scoring ───────────────────────────────────────────────────────────────────
p.push(h1(`Scoring: ${DATA.baselineDate} → ${DATA.reportDate}`));
const scw=[2200,800,1100,1100,3220];
const scoringRows = DATA.scoring.map(r=>[r[0],r[1],r[2],r[3],r[4]]);
scoringRows.push([
  {t:"Weighted Total",ch:[b("Weighted Total",{size:18})],_f:C.lb},
  {t:"",_f:C.lb},
  {t:DATA.scoringWeightedPrior,ch:[b(DATA.scoringWeightedPrior,{size:18})],_f:C.lb},
  {t:DATA.scoringWeightedCurrent,ch:[b(DATA.scoringWeightedCurrent,{size:18,color:C.fx})],_f:C.fb},
  {t:DATA.scoringWeightedDelta,_f:C.fb}
]);
p.push(tbl(["Category","Weight","Prior","This Week","Delta + Notes"],scoringRows,scw));
p.push(new Paragraph({children:[new PageBreak()]}));

// ── Open items ────────────────────────────────────────────────────────────────
p.push(h1("Items Still Open"));
const opw=[500,4500,900,3820];

if(DATA.openCritical.length===0){
  p.push(h2("🎉 CRITICAL: 0"));
} else {
  p.push(h2(`CRITICAL (${DATA.openCritical.length})`));
  p.push(tbl(["#","Issue","Since","Notes"],DATA.openCritical,opw));
  p.push(sp());
}

if(DATA.openHigh.length>0){
  p.push(h2(`HIGH (${DATA.openHigh.length})`));
  p.push(tbl(["#","Issue","Since","Notes"],DATA.openHigh,opw));
  p.push(sp());
}

if(DATA.openMedium.length>0){
  p.push(h2(`MEDIUM (${DATA.openMedium.length})`));
  p.push(tbl(["#","Issue","Since","Notes"],DATA.openMedium,opw));
  p.push(sp());
}

if(DATA.openLow.length>0){
  p.push(h2(`LOW (${DATA.openLow.length})`));
  p.push(tbl(["#","Issue","Since","Notes"],DATA.openLow,opw));
  p.push(sp());
}

if(DATA.resolvedThisWeek.length>0){
  p.push(h2(`✅ Resolved This Week (${DATA.resolvedThisWeek.length})`));
  p.push(tbl(["#","Item","Evidence"],DATA.resolvedThisWeek,opw.slice(0,3).concat([opw[3]+opw[2]-900])));
  p.push(sp());
}

p.push(new Paragraph({children:[new PageBreak()]}));

// ── Progress arc ──────────────────────────────────────────────────────────────
p.push(h1("Progress Arc"));
const arcw=[1300,800,800,900,1100,4820];
const arcRows = DATA.progressArc.map((r,i)=>{
  const isLast = i===DATA.progressArc.length-1;
  return isLast
    ? [{t:r[0],ch:[b(r[0],{size:18})],_f:C.lb},{t:r[1],ch:[b(r[1],{size:18,color:C.fx})],_f:C.fb},{t:r[2],ch:[b(r[2],{size:18,color:C.fx})],_f:C.fb},{t:r[3],_f:C.lb},{t:r[4],ch:[b(r[4],{size:18,color:r[4]==="0"?C.fx:C.cr})],_f:r[4]==="0"?C.fb:C.cb},{t:r[5],_f:C.fb}]
    : r;
});
p.push(tbl(["Date","AEO","SEO","Articles","Critical","Key Achievement"],arcRows,arcw));

p.push(sp());
p.push(h2("Cumulative Stats (since Mar 9)"));
const csw=[3500,2000,2000,2220];
p.push(tbl(["Metric","Mar 9","Current","Change"],DATA.cumulativeStats,csw));

p.push(sp());
p.push(h2("Top 3 Actions for Next Week"));
const aw=[500,4500,2000,2720];
p.push(tbl(["#","Action","Impact","Effort"],DATA.topActions,aw));

p.push(sp(),sp());
p.push(new Paragraph({children:[sm(`Progress report generated ${DATA.reportDate}. Baseline: ${DATA.baselineDate}.`,{italics:true,color:C.mu})]}));

// ── Build doc ─────────────────────────────────────────────────────────────────
const doc=new Document({sections:[{
  properties:{page:{size:{width:PW,height:15840},margin:{top:1440,right:MR,bottom:1440,left:ML}}},
  headers:{default:new Header({children:[new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:6,color:C.ac,space:4}},children:[sm("PingCAP SEO/AEO Progress",{color:C.ac,bold:true}),sm(`    ${DATA.reportDate}`,{color:C.mu})]})]})}  ,
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,border:{top:{style:BorderStyle.SINGLE,size:4,color:"CCCCCC",space:4}},children:[sm("Page ",{color:C.mu}),new TextRun({children:[PageNumber.CURRENT],font:"Arial",size:18,color:C.mu})]})]})}  ,
  children:p
}]});

Packer.toBuffer(doc).then(buf=>{
  // Ensure output directory exists
  const dir = require("path").dirname(DATA.outputPath);
  if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(DATA.outputPath, buf);
  console.log("✅ Done: " + DATA.outputPath);
}).catch(err=>{
  console.error("❌ Failed to generate docx:", err.message);
  process.exit(1);
});
