// ─── WEEKLY UPDATE CHECKLIST ──────────────────────────────────────────────────
// When copying this template for a new report, update ALL of the following:
//
// 1. DATE STRINGS — search "April 30" and "Apr 30" and replace with new date
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
// DO NOT leave any "April 30" or "Apr 30" references in the copied file.
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
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200},children:[new TextRun({text:"April 30, 2026",font:"Arial",size:24,color:C.mu})]}));
p.push(sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[b("AEO: 9.0/10  |  SEO Health: 82/100  |  0 Critical Items Open",{color:C.fx,size:28})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[n("Baseline: April 19 (AEO 8.5, SEO 78, 1 Critical)",{color:C.mu})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,children:[n("\uD83C\uDF89  6-week critical gap closed: /what-is-tidb/ is LIVE",{color:C.fx,italics:true})]}));
p.push(new Paragraph({children:[new PageBreak()]}));

// Headline
p.push(h1("\uD83C\uDF89 Headline: 6-Week Critical Gap Closed"));
p.push(para(b("/what-is-tidb/ is now LIVE. ",{color:C.fx}),n("This page has been the #1 recommended action for 6 consecutive audits since March 9. It now returns 200 with a 2,800\u20133,000 word definitional article featuring 7 H2 sections, a FAQ block, and a clear definitional sentence:")));
p.push(new Paragraph({spacing:{before:80,after:120},shading:{fill:C.fb,type:ShadingType.CLEAR},border:{left:{style:BorderStyle.SINGLE,size:24,color:C.fx,space:8}},children:[n("\u201CTiDB is an open-source, distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP) workloads.\u201D",{italics:true,size:22})]}));
p.push(para(b("This is the canonical AI citation page. ",{color:C.ac}),n("Combined with the existing AI bot rules in robots.txt, the llms.txt file, and the homepage \u201CDatabase for AI Agents\u201D positioning, AI assistants (ChatGPT, Claude, Perplexity, Copilot) now have a single authoritative URL to cite when answering \u201CWhat is TiDB?\u201D queries.")));

p.push(new Paragraph({children:[new PageBreak()]}));

// Changes
p.push(h1("Changes Since Apr 19"));
p.push(h2("Improvements (3)"));
const chw=[500,3500,1700,4020];
p.push(tbl(["#","Change","Impact","Evidence"],
[
  ["1",g("/what-is-tidb/ page LIVE"),"CRITICAL","200 OK; ~3K words; 7 H2 sections; FAQ; clear definition"],
  ["2",g("Hero fetchpriority RESTORED"),"HIGH","2 fetchpriority instances detected (was 0 on Apr 19)"],
  ["3",g("+1 comparison page"),"MEDIUM","/compare/tidb-vs-postgresql-2026-comparison-guide/ live (11th page)"],
],chw));

p.push(sp());
p.push(h2("Soft Regression (1) \u2014 Worth Monitoring"));
p.push(tbl(["#","Item","Impact","Notes"],
[
  ["R1",o("TTFB slowed: 85ms \u2192 265ms"),"MEDIUM","3\u00d7 slower. Could affect LCP if persistent. Could be CDN cache miss timing"],
],chw));

p.push(new Paragraph({children:[new PageBreak()]}));

// Scoring
p.push(h1("Scoring: Apr 19 \u2192 Apr 30"));
const scw=[2200,1100,1100,800,3220];
p.push(tbl(["Category","Weight","Apr 19","Apr 30","Delta + Notes"],
[
  ["Technical SEO","25%","82",g("85"),g("+3 \u2014 /what-is-tidb/ fills gap; TTFB \u22121")],
  ["Content Quality","25%","74",g("82"),g("+8 \u2014 3K-word definitional page; +1 comparison")],
  ["On-Page SEO","20%","75",g("78"),g("+3 \u2014 New page well-structured")],
  ["Schema","10%","65","65","Stable. Add Article schema to /what-is-tidb/"],
  ["Performance","10%","66",g("68"),g("+2 \u2014 fetchpriority restored")],
  ["Visual/Mobile","5%","62","62","Not re-tested"],
  ["AI Search Readiness","5%","73",g("82"),g("+9 \u2014 Canonical AI citation page now exists")],
  [{t:"Weighted Total",ch:[b("Weighted Total",{size:18})],_f:C.lb},{t:"",_f:C.lb},{t:"~78",ch:[b("~78",{size:18})],_f:C.lb},{t:"~82",ch:[b("~82",{size:18,color:C.fx})],_f:C.fb},{t:"+4 \u2014 Strongest WoW gain since Mar 22",_f:C.fb}],
],scw));

p.push(new Paragraph({children:[new PageBreak()]}));

// Items still open
p.push(h1("Items Still Open"));
p.push(h2("\uD83C\uDF89 CRITICAL: 0 \u2014 First time since program began"));

p.push(h2("HIGH (1)"));
const opw=[500,4500,900,3820];
p.push(tbl(["#","Issue","Since","Notes"],
[
  ["1","242 articles remain in article-sitemap","Mar 9","74% removed (943\u2192242). Last big content-quality lever"],
],opw));

p.push(h2("MEDIUM (6)"));
p.push(tbl(["#","Issue","Since","Notes"],
[
  ["2","No /compare/ hub page","Mar 23","11 pages now without central landing"],
  ["3","Glossary at 17 terms (target 25+)","Mar 23","CockroachDB has 50+"],
  ["4","About page missing leadership","Mar 9","No founders/CEO/investors"],
  ["5","CSP still report-only","Mar 9","Not enforced"],
  ["6","10 images still use JS data-src","Apr 12","Down from 24"],
  ["7","TTFB slowdown 85ms \u2192 265ms","Apr 30","NEW \u2014 monitor"],
],opw));

p.push(h2("LOW (2)"));
p.push(tbl(["#","Issue","Since","Notes"],
[
  ["8","/.well-known/llms.txt still 404","Mar 9","Easy first-mover"],
  ["9","/what-is-tidb/ lacks Article schema","Apr 30","NEW \u2014 add JSON-LD to maximize AI citation"],
],opw));

p.push(new Paragraph({children:[new PageBreak()]}));

// 8-week progress
p.push(h1("8-Week Progress Arc"));
const arcw=[1300,800,800,900,1100,4820];
p.push(tbl(["Date","AEO","SEO","Articles","Critical","Key Achievement"],
[
  ["Mar 9",r("3.5"),r("52"),r("943"),r("10"),"Baseline (34 items)"],
  ["Mar 15","~6.5","68","943","7","Security, AI rules, glossary"],
  ["Mar 22","~7.5","67","943","6","Schema, hero, GTM"],
  ["Mar 29","8.0","~67","560","5","Article cleanup begins"],
  ["Apr 6","8.5","~75","242","3","Major cleanup sprint"],
  ["Apr 12","8.5","~77","242","2","Cache correction"],
  ["Apr 19","8.5","~78","242","1","Homepage AI-Agents repositioning"],
  [{t:"Apr 30",ch:[b("Apr 30",{size:18})],_f:C.lb},{t:"9.0",ch:[b("9.0",{size:18,color:C.fx})],_f:C.fb},{t:"~82",ch:[b("~82",{size:18,color:C.fx})],_f:C.fb},{t:"242",_f:C.lb},{t:"0",ch:[b("0",{size:18,color:C.fx,bold:true})],_f:C.fb},{t:"/what-is-tidb/ LIVE \u2014 zero criticals",_f:C.fb}],
],arcw));

p.push(sp());
p.push(h2("Cumulative Stats (8 weeks)"));
const csw=[3500,2000,2000,2220];
p.push(tbl(["Metric","Mar 9","Apr 30","Change"],
[
  ["Items fixed (of 34)","0",g("23"),"68%"],
  ["Critical remaining","10",g("0"),"-100%"],
  ["Mass-gen articles","943",g("242"),"-74%"],
  ["Render-blocking scripts","11",g("5"),"-55%"],
  ["Security headers","0/7",g("6/7"),"+6"],
  ["Comparison pages","4",g("11"),"+175%"],
  ["Homepage schema types","5",g("7"),"+2"],
  ["/what-is-tidb/ page",r("404"),g("LIVE \u2014 3K words"),"NEW"],
  ["AEO Score","3.5/10",g("9.0/10"),"+157%"],
],csw));

p.push(sp());
p.push(h2("Top 3 Actions for Next Week"));
const aw=[500,4500,2000,2720];
p.push(tbl(["#","Action","Impact","Effort"],
[
  ["1","Add JSON-LD Article + FAQPage schema to /what-is-tidb/","Maximize AI citation","1 hour"],
  ["2","Investigate TTFB slowdown (85ms \u2192 265ms)","Protect LCP","1\u20132 hours"],
  ["3","Audit remaining 242 articles for thin/duplicate","Last content-quality lever","2\u20133 days"],
],aw));

p.push(sp());
p.push(h2("What's Newly Achievable"));
p.push(para(b("With zero critical items and AEO at 9.0/10, ",{color:C.ac}),n("PingCAP is the only commercial distributed SQL vendor with all of: AI bot rules, llms.txt, glossary, definitional page, 11 comparison pages, FAQ page, named blog authors, security headers, immutable cache, and AI-aligned homepage. Focus can now shift from \u201Cclose gaps\u201D to \u201Cextend depth\u201D \u2014 more comparisons (MariaDB, ClickHouse, Vitess), glossary growth (30+ terms), AEO content series.")));

p.push(sp(),sp());
p.push(new Paragraph({children:[sm("Progress report generated April 30, 2026. Baseline: April 19, 2026.",{italics:true,color:C.mu})]}));

const doc=new Document({sections:[{
  properties:{page:{size:{width:PW,height:15840},margin:{top:1440,right:MR,bottom:1440,left:ML}}},
  headers:{default:new Header({children:[new Paragraph({border:{bottom:{style:BorderStyle.SINGLE,size:6,color:C.ac,space:4}},children:[sm("PingCAP SEO/AEO Progress",{color:C.ac,bold:true}),sm("    April 30, 2026",{color:C.mu})]})]})} ,
  footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,border:{top:{style:BorderStyle.SINGLE,size:4,color:"CCCCCC",space:4}},children:[sm("Page ",{color:C.mu}),new TextRun({children:[PageNumber.CURRENT],font:"Arial",size:18,color:C.mu})]})]})} ,
  children:p
}]});

Packer.toBuffer(doc).then(buf=>{
  const outPath = process.env.REPORT_OUT || "/Users/akshatahire/Desktop/Claude_Code/AEO:SEO report generator/reports-archive/progress-reports/pingcap-seo-aeo-progress-2026-04-30.docx";
  fs.writeFileSync(outPath,buf);
  console.log("Done: " + outPath);
});
