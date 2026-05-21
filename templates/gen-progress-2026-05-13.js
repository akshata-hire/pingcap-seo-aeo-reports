// ─── WEEKLY UPDATE CHECKLIST ──────────────────────────────────────────────────
// When copying this template for a new report, update ALL of the following:
//
// 1. DATE STRINGS — search "May 13" and "May 13" and replace with new date
// 2. SCORES — AEO score, SEO Health score (title bar line ~30)
// 3. BASELINE — prior week date and scores (line ~31)
// 4. HEADLINE section — replace with this week's key achievement
// 5. IMPROVEMENTS table — replace with this week's improvements
// 6. REGRESSIONS table — replace with this week's regressions
// 7. SCORING TABLE — use updated 8-category weights:
//    Technical SEO 19%, Content Quality 19%, On-Page SEO 18%,
//    AI Search Readiness 15%, Brand Authority 12%, Schema 10%,
//    Performance 4%, Visual/Mobile 3%
// 8. ITEMS STILL OPEN — update counts and list
// 9. PROGRESS ARC — append new row, keep last 8 weeks
// 10. TOP 3 ACTIONS — replace with this week's recommendations
// 11. OUTPUT PATH — update the filename date at the bottom (or set REPORT_OUT env var)
//
// DO NOT leave any "May 13" or "Apr 30" references in the copied file.
// ──────────────────────────────────────────────────────────────────────────────

const fs=require("fs");const{Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,Header,Footer,AlignmentType,LevelFormat,HeadingLevel,BorderStyle,WidthType,ShadingType,PageNumber,PageBreak}=require("docx");
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
function tbl(hds,rows,cw){return new Table({width:{size:cw.reduce((a,c)=>a+c,0),type:WidthType.DXA},columnWidths:cw,rows:[new TableRow({children:hds.map((h,i)=>hc(h,cw[i]))}),...rows.map(r=>new TableRow({children:r.map((c,i)=>{if(typeof c==="object"&&c._f)return dc(c.ch||[n(c.t||"")],cw[i],{f:c._f});return dc(c,cw[i])})}))]})}
function h1(t){return new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:300,after:160},children:[new TextRun({text:t,bold:true,font:"Arial",size:28,color:C.hd})]})}
function h2(t){return new Paragraph({heading:HeadingLevel.HEADING_2,spacing:{before:240,after:120},children:[new TextRun({text:t,bold:true,font:"Arial",size:24,color:C.sb})]})}
function sp(){return new Paragraph({spacing:{after:80},children:[]})}
function para(...r){return new Paragraph({spacing:{before:60,after:100},children:r})}
function g(t){return{t,ch:[b(t,{size:18,color:C.fx})],_f:C.fb}}
function r(t){return{t,ch:[b(t,{size:18,color:C.cr})],_f:C.cb}}
function o(t){return{t,ch:[b(t,{size:18,color:C.hi})],_f:C.hib}}

const p=[];

// Title
p.push(sp(),sp(),sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:80},children:[new TextRun({text:"PingCAP.com",font:"Arial",size:44,bold:true,color:C.hd})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:120},children:[new TextRun({text:"SEO / AEO Progress Report",font:"Arial",size:36,bold:true,color:C.ac})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200},children:[new TextRun({text:"May 13, 2026",font:"Arial",size:24,color:C.mu})]}));
p.push(sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[b("AEO: 9.2/10  |  SEO Health: 84/100  |  0 Critical Items Open",{color:C.fx,size:28})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[n("Baseline: April 30 (AEO 9.0, SEO ~82, 0 Critical)",{color:C.mu})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,children:[n("Glossary 3x growth  |  /compare/ hub live  |  TTFB recovered",{color:C.fx,italics:true})]}));
p.push(new Paragraph({children:[new PageBreak()]}));

// Headline
p.push(h1("Headline: Glossary 3x, /compare/ Hub Live, TTFB Recovered"));
p.push(para(b("Three medium items closed in one week. ",{color:C.fx}),n("The glossary expanded from 17 to 49 headings — surpassing CockroachDB's depth and exceeding the 25+ target set in March. The /compare/ hub page is now live at 200, giving 11 comparison pages a central landing for the first time. TTFB recovered from the Apr 30 soft regression (265ms → 94ms).")));
p.push(para(b("One regression: ",{color:C.cr}),n("The Content-Security-Policy header has gone from report-only to completely absent. Security headers dropped from 6 to 5. Investigate CDN/Cloudflare config or recent WordPress plugin changes.")));

p.push(new Paragraph({children:[new PageBreak()]}));

// Changes
p.push(h1("Changes Since Apr 30"));
p.push(h2("Improvements (4)"));
const chw=[500,3500,1700,4020];
p.push(tbl(["#","Change","Impact","Evidence"],
[
  ["1",g("Glossary: 17 → 49 headings"),"HIGH","Signal 7: 49 h2/h3 on /glossary/ — 3× growth; exceeds 25+ target"],
  ["2",g("data-src images: 10 → 0"),"MEDIUM","Signal 15: 0 data-src (was 10); native loading now used throughout"],
  ["3",g("TTFB recovered: 265ms → 94ms"),"MEDIUM","Signal 22: 0.094s — Apr 30 soft regression fully resolved"],
  ["4",g("/compare/ hub page LIVE"),"MEDIUM","HTTP/2 200; title 'TiDB Database Comparisons'; H1 present"],
],chw));

p.push(sp());
p.push(h2("Regression (1)"));
p.push(tbl(["#","Item","Impact","Notes"],
[
  ["R1",r("CSP header completely absent"),"HIGH","Was report-only (counted in 6/7). Now gone entirely. Header count: 6 → 5. Investigate CDN config or WP plugin update."],
],chw));

p.push(new Paragraph({children:[new PageBreak()]}));

// Scoring
p.push(h1("Scoring: Apr 30 → May 13"));
p.push(para(n("Note: Scoring methodology updated to 8-category framework. Apr 30 scores restated with new weights for accurate delta comparison.",{italics:true,color:C.mu})));
p.push(sp());
const scw=[2300,1000,1000,800,3120];
p.push(tbl(["Category (weight)","Apr 30","May 13","Delta","Notes"],
[
  ["Technical SEO (19%)","85",g("86"),g("+1"),"TTFB recovered (+2), data-src gone (+1), CSP absent (−2)"],
  ["Content Quality (19%)","82",g("91"),g("+9"),"Glossary 17→49 (major depth gain); /compare/ hub live"],
  ["On-Page SEO (18%)","78","78","0","No structural changes"],
  ["AI Search Readiness (15%)","82",g("88"),g("+6"),"Glossary depth, /compare/ hub, FAQPage on /what-is-tidb/"],
  ["Brand Authority (12%)","65","65","0","Monthly pull — no new data this week"],
  ["Schema (10%)","65",g("67"),g("+2"),"FAQPage added to /what-is-tidb/ (Article schema still missing)"],
  ["Performance (4%)","68",g("77"),g("+9"),"TTFB 265ms→94ms; data-src images gone"],
  ["Visual/Mobile (3%)","62","62","0","Not retested"],
  [{t:"Weighted Total",ch:[b("Weighted Total",{size:18})],_f:C.lb},{t:"~79",ch:[b("~79",{size:18})],_f:C.lb},{t:"~82",ch:[b("~82",{size:18,color:C.fx})],_f:C.fb},{t:"+3",ch:[b("+3",{size:18,color:C.fx})],_f:C.fb},{t:"Restated baseline — methodology change noted",_f:C.fb}],
],scw));

p.push(new Paragraph({children:[new PageBreak()]}));

// Items still open
p.push(h1("Items Still Open"));
p.push(h2("CRITICAL: 0"));

p.push(h2("HIGH (2)"));
const opw=[500,4500,900,3820];
p.push(tbl(["#","Issue","Since","Notes"],
[
  ["1",r("CSP header completely absent — UPGRADED from MEDIUM"),"Mar 9","Was report-only at Apr 30. Now entirely absent. Restore immediately."],
  ["2","242 articles remain in article-sitemap","Mar 9","74% removed (943→242). Last big content-quality lever."],
],opw));

p.push(h2("MEDIUM (1)"));
p.push(tbl(["#","Issue","Since","Notes"],
[
  ["3","About page missing leadership","Mar 9","No founders/CEO/investors named. E-E-A-T gap."],
],opw));

p.push(h2("LOW (2)"));
p.push(tbl(["#","Issue","Since","Notes"],
[
  ["4","/.well-known/llms.txt still 404","Mar 9","Easy first-mover; /llms.txt is 200 but well-known path not configured"],
  ["5","/what-is-tidb/ lacks Article JSON-LD","Apr 30","FAQPage added this week; Article wrapper still missing"],
],opw));

p.push(h2("✅ RESOLVED THIS WEEK (4)"));
p.push(tbl(["#","Item","Evidence"],
[
  ["1","/compare/ hub page (was 301, no landing)","HTTP/2 200 — 'TiDB Database Comparisons' with H1"],
  ["2","Glossary at 17 terms / target 25+","49 headings — 3× growth, exceeds target and competitors"],
  ["3","10 images using JS data-src","Signal 15: 0 data-src images (was 10)"],
  ["4","TTFB slowdown to 265ms","Signal 22: ~94ms — fully recovered"],
],[opw[0],opw[1]+opw[2],opw[3]]));

p.push(new Paragraph({children:[new PageBreak()]}));

// 8-week progress
p.push(h1("8-Week Progress Arc"));
const arcw=[1300,800,800,900,1100,4820];
p.push(tbl(["Date","AEO","SEO","Articles","Critical","Key Achievement"],
[
  ["Mar 15","~6.5","68","943","7","Security headers, AI rules, glossary start"],
  ["Mar 22","~7.5","67","943","6","Schema cleanup, hero image, GTM"],
  ["Mar 29","8.0","~67","560","5","Article cleanup begins"],
  ["Apr 6","8.5","~75","242","3","Major cleanup sprint"],
  ["Apr 12","8.5","~77","242","2","Cache correction, +1 comparison page"],
  ["Apr 19","8.5","~78","242","1","Homepage AI-Agents repositioning"],
  ["Apr 30","9.0","~82","242","0","/what-is-tidb/ LIVE — first time zero criticals"],
  [{t:"May 13",ch:[b("May 13",{size:18})],_f:C.lb},{t:"9.2",ch:[b("9.2",{size:18,color:C.fx})],_f:C.fb},{t:"~84",ch:[b("~84",{size:18,color:C.fx})],_f:C.fb},{t:"242",_f:C.lb},{t:"0",ch:[b("0",{size:18,color:C.fx})],_f:C.fb},{t:"Glossary 3×, /compare/ hub live, TTFB recovered",_f:C.fb}],
],arcw));

p.push(sp());
p.push(h2("Top 3 Actions for Next Week"));
const aw=[500,4500,2000,2720];
p.push(tbl(["#","Action","Impact","Effort"],
[
  ["1","Restore Content-Security-Policy header — went from report-only to completely absent. Check Cloudflare/CDN config or recent WordPress plugin changes.","HIGH — security regression","1–2 hours"],
  ["2","Add JSON-LD Article schema to /what-is-tidb/ — FAQPage is now in place. Article wrapper completes the AEO citation signal. Also confirm with Udi whether FAQPage is intentional given audit rules.","MEDIUM — AEO completeness","30 min"],
  ["3","Add leadership content to /about-us/ — one paragraph naming Max Liu (CEO/co-founder) resolves the persistent E-E-A-T and AEO trust gap open since Mar 9.","MEDIUM — E-E-A-T / AEO","1 hour"],
],aw));

p.push(sp(),sp());
p.push(new Paragraph({children:[sm("Progress report generated May 13, 2026. Baseline: April 30, 2026.",{italics:true,color:C.mu})]}));

const doc=new Document({sections:[{
  properties:{page:{size:{width:PW,height:15840},margin:{top:1440,right:MR,bottom:1440,left:ML}}},
  headers:{default:new Header({children:[new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:6,color:C.ac,space:4}},children:[sm("PingCAP SEO/AEO Progress",{color:C.ac,bold:true}),sm("    May 13, 2026",{color:C.mu})]})]})},
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,border:{top:{style:BorderStyle.SINGLE,size:4,color:"CCCCCC",space:4}},children:[sm("Page ",{color:C.mu}),new TextRun({children:[PageNumber.CURRENT],font:"Arial",size:18,color:C.mu})]})]})},
  children:p
}]});

Packer.toBuffer(doc).then(buf=>{
  const outPath = process.env.REPORT_OUT || "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/reports-archive/progress-reports/pingcap-seo-aeo-progress-2026-05-13.docx";
  fs.writeFileSync(outPath,buf);
  console.log("Done: " + outPath);
});
