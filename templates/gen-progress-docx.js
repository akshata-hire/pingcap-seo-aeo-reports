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
  reportDate:     "May 26, 2026",          // e.g. "May 26, 2026"
  baselineDate:   "May 13, 2026",          // prior week date
  aeoScore:       "9.0",                   // current AEO score /10
  seoScore:       "82",                    // current SEO Health /100
  criticalCount:  0,                       // open critical items
  baselineAeo:    "9.0",                   // prior week AEO
  baselineSeo:    "82",                    // prior week SEO
  baselineCritical: 0,                     // prior week critical count

  // ── Headline ─────────────────────────────────────────────────────────────────
  headlineTitle:  "Headline: [Replace with this week's key achievement]",
  headlineBody:   "[Describe the main achievement this week in 2-3 sentences. What changed, what it means for AI/SEO, and why it matters.]",

  // ── Improvements table — add/remove rows as needed ──────────────────────────
  // Format: ["#", "description (use ✅ prefix)", "impact level", "evidence"]
  improvements: [
    ["1", "✅ [Improvement 1]", "HIGH", "[Evidence from audit]"],
    ["2", "✅ [Improvement 2]", "MEDIUM", "[Evidence from audit]"],
  ],

  // ── Regressions table ────────────────────────────────────────────────────────
  // Format: ["#", "description (use ⚠️ prefix)", "impact level", "notes"]
  regressions: [
    ["R1", "⚠️ [Regression 1]", "MEDIUM", "[What happened and what to investigate]"],
  ],

  // ── Scoring table (8 categories — DO NOT change weights) ────────────────────
  // Format: ["Category", "Weight", "Prior score", "This week score", "Delta + notes"]
  // Weights are locked: 19/19/18/15/12/10/4/3
  scoring: [
    ["Technical SEO",              "19%", "XX", "XX", "[delta and reason]"],
    ["Content Quality",            "19%", "XX", "XX", "[delta and reason]"],
    ["On-Page SEO",                "18%", "XX", "XX", "[delta and reason]"],
    ["AI Search Readiness",        "15%", "XX", "XX", "[delta and reason]"],
    ["Brand Authority & Backlinks","12%", "XX", "XX", "[delta — use last brand-authority-pull.js snapshot]"],
    ["Schema",                     "10%", "XX", "XX", "[delta and reason]"],
    ["Performance",                 "4%", "XX", "XX", "[TTFB reading]"],
    ["Visual/Mobile",               "3%", "XX", "XX", "Not re-tested / [result]"],
  ],
  scoringWeightedPrior: "~82",
  scoringWeightedCurrent: "~82",
  scoringWeightedDelta: "+0 — [summary of week]",

  // ── Open items — fill from Prompt 1 resolution table ────────────────────────
  openCritical: [
    // ["#", "Issue", "Since", "Notes"]
    // Leave empty array [] if none
  ],
  openHigh: [
    ["1", "242 articles remain in article-sitemap", "Mar 9", "74% removed (943→242). Last big content-quality lever"],
  ],
  openMedium: [
    ["2", "No /compare/ hub page", "Mar 23", "11 pages now without central landing"],
    ["3", "Glossary at 49 terms (target 50+)", "Mar 23", "CockroachDB has 50+. 1 away from target"],
    ["4", "About page missing leadership", "Mar 9", "No founders/CEO/investors"],
    ["5", "CSP header dropped", "May 13", "Was report-only, now completely absent — regression"],
    ["6", "/.well-known/llms.txt still 404", "Mar 9", "Root llms.txt is 200; well-known path is extra coverage"],
  ],
  openLow: [
    ["7", "/.well-known/llms.txt still 404", "Mar 9", "Easy first-mover when fixed"],
  ],

  // ── Resolved this week ───────────────────────────────────────────────────────
  resolvedThisWeek: [
    // ["#", "Item", "Evidence"]
    // ["1", "data-src images fixed", "Signal 15: 0 (was 10)"],
  ],

  // ── 8-week progress arc — append new row each week, keep last 8 ─────────────
  // Format: ["Date", "AEO", "SEO", "Articles", "Critical", "Key Achievement"]
  progressArc: [
    ["Mar 9",  "3.5",  "52",  "943", "10", "Baseline (34 items)"],
    ["Mar 15", "~6.5", "68",  "943",  "7", "Security, AI rules, glossary"],
    ["Mar 22", "~7.5", "67",  "943",  "6", "Schema, hero, GTM"],
    ["Mar 29", "8.0",  "~67", "560",  "5", "Article cleanup begins"],
    ["Apr 6",  "8.5",  "~75", "242",  "3", "Major cleanup sprint"],
    ["Apr 12", "8.5",  "~77", "242",  "2", "Cache correction"],
    ["Apr 19", "8.5",  "~78", "242",  "1", "Homepage AI-Agents repositioning"],
    ["Apr 30", "9.0",  "~82", "242",  "0", "/what-is-tidb/ LIVE — zero criticals"],
    ["May 13", "9.0",  "~82", "242",  "0", "TTFB recovered 265ms→101ms. CSP dropped."],
    ["May 26", "9.0",  "~82", "242",  "0", "[This week's key achievement]"],
  ],

  // ── Cumulative stats ─────────────────────────────────────────────────────────
  // Format: ["Metric", "Mar 9 value", "Current value", "Change"]
  cumulativeStats: [
    ["Items fixed (of 34)",      "0",     "23",               "68%"],
    ["Critical remaining",       "10",    "0",                "-100%"],
    ["Mass-gen articles",        "943",   "242",              "-74%"],
    ["Render-blocking scripts",  "11",    "5",                "-55%"],
    ["Security headers",         "0/7",   "5/7",              "+5 (CSP regression)"],
    ["Comparison pages",         "4",     "11",               "+175%"],
    ["Glossary terms",           "0",     "49",               "NEW"],
    ["/what-is-tidb/ page",      "404",   "LIVE — 3K words",  "NEW"],
    ["AEO Score",                "3.5/10","9.0/10",           "+157%"],
  ],

  // ── Top 3 actions ────────────────────────────────────────────────────────────
  // Format: ["#", "Action", "Impact", "Effort"]
  topActions: [
    ["1", "Restore CSP header — was report-only Apr 30, now completely absent", "Security + trust signal", "30 min (infra)"],
    ["2", "Push glossary to 50+ terms — 1 term away from matching CockroachDB", "AEO competitive parity", "1–2 hours"],
    ["3", "Push 12th comparison page — stalled at 11 for 2 consecutive audits", "AEO score improvement", "1 day"],
  ],

  // ── Output path ──────────────────────────────────────────────────────────────
  outputPath: process.env.REPORT_OUT ||
    "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/reports-archive/progress-reports/pingcap-seo-aeo-progress-2026-05-26.docx",
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
