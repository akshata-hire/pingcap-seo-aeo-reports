const fs=require("fs");const{Document,Packer,Paragraph,TextRun,Table,TableRow,TableCell,AlignmentType,HeadingLevel,BorderStyle,WidthType,ShadingType,PageBreak}=require("docx");
const PW=12240,ML=1260,MR=1260;
const bd={style:BorderStyle.SINGLE,size:1,color:"CCCCCC"};
const bs={top:bd,bottom:bd,left:bd,right:bd};
const cm={top:60,bottom:60,left:100,right:100};
const C={hd:"1A1A2E",sb:"2C3E50",ac:"2E75B6",mu:"888888",hb:"2E75B6",ht:"FFFFFF",cr:"CC0000",hi:"CC7700",fx:"228B22",cb:"FDE8E8",hib:"FFF3E0",fb:"E8F5E9",lb:"F2F7FB",ab:"FFF8E1"};

function b(t,o={}){return new TextRun({text:t,bold:true,font:"Arial",size:20,...o})}
function n(t,o={}){return new TextRun({text:t,font:"Arial",size:20,...o})}
function hc(t,w){return new TableCell({borders:bs,width:{size:w,type:WidthType.DXA},shading:{fill:C.hb,type:ShadingType.CLEAR},margins:cm,children:[new Paragraph({children:[b(t,{color:C.ht,size:18})]})]})}
function dc(ch,w,o={}){return new TableCell({borders:bs,width:{size:w,type:WidthType.DXA},shading:o.f?{fill:o.f,type:ShadingType.CLEAR}:undefined,margins:cm,children:[new Paragraph({spacing:{before:20,after:20},children:Array.isArray(ch)?ch:[n(ch)]})]})}
function tbl(hds,rows,cw){return new Table({width:{size:cw.reduce((a,c)=>a+c,0),type:WidthType.DXA},columnWidths:cw,rows:[new TableRow({children:hds.map((h,i)=>hc(h,cw[i]))}),...rows.map(r=>new TableRow({children:r.map((c,i)=>{if(typeof c==="object"&&c._f)return dc(c.ch||[n(c.t||"")],cw[i],{f:c._f});return dc(c,cw[i])})}))]});}
function h1(t){return new Paragraph({heading:HeadingLevel.HEADING_1,spacing:{before:300,after:160},children:[new TextRun({text:t,bold:true,font:"Arial",size:28,color:C.hd})]})}
function h2(t){return new Paragraph({heading:HeadingLevel.HEADING_2,spacing:{before:240,after:120},children:[new TextRun({text:t,bold:true,font:"Arial",size:24,color:C.sb})]})}
function sp(){return new Paragraph({spacing:{after:80},children:[]})}
function para(...r){return new Paragraph({spacing:{before:60,after:100},children:r})}
function g(t){return{t,ch:[b(t,{size:18,color:C.fx})],_f:C.fb}}
function r(t){return{t,ch:[b(t,{size:18,color:C.cr})],_f:C.cb}}
function w(t){return{t,ch:[b(t,{size:18,color:C.hi})],_f:C.hib}}
function lead(t){return{t,ch:[b(t,{size:18,color:C.hd})],_f:C.lb}}

const p=[];

// Title page
p.push(sp(),sp(),sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:80},children:[new TextRun({text:"PingCAP AEO/GEO",font:"Arial",size:44,bold:true,color:C.hd})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:120},children:[new TextRun({text:"Competitive Analysis",font:"Arial",size:36,bold:true,color:C.ac})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:200},children:[new TextRun({text:"May 14, 2026",font:"Arial",size:24,color:C.mu})]}));
p.push(sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[b("PingCAP leads CockroachDB 7–0 on AEO signals  |  Gap: +1.7 pts",{color:C.fx,size:28})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:40},children:[n("Baseline: April 6, 2026 competitive analysis",{color:C.mu})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,children:[n("Competitors: CockroachDB · YugabyteDB · PlanetScale · SingleStore · Vitess",{color:C.mu,italics:true})]}));
p.push(new Paragraph({children:[new PageBreak()]}));

// TL;DR
p.push(h1("TL;DR"));
p.push(para(b("PingCAP's lead is widening on content signals; CockroachDB is investing in comparison pages. "),n("PingCAP's AEO score jumped from 8.5 to 9.2 in 38 days — the largest single-period gain in the program's history. /what-is-tidb/ is LIVE (the only commercial vendor with a dedicated definitional page), the /compare/ hub launched May 13, and the glossary tripled to 49 terms.")));
p.push(para(b("CockroachDB quietly grew their comparison portfolio from 5 to 9 pages ",{color:C.hi}),n("and added a head-to-head 'tidb-vs-cockroachdb' page directly targeting PingCAP. Vitess's 'What Is Vitess?' page has also returned (was 404 in April).")));
p.push(para(b("Nobody has /.well-known/llms.txt — 0/6 adoption. ",{color:C.fx}),n("This is a true first-mover opportunity that takes <30 minutes to implement.")));
p.push(new Paragraph({children:[new PageBreak()]}));

// Scorecard
p.push(h1("Competitive Scorecard: Apr 6 → May 14"));
p.push(para(n("YES = confirmed · No = not found · Partial = exists but incomplete · — = not checked",{italics:true,color:C.mu})));
p.push(sp());
const sw=[2200,1400,1700,1500,1500,1500,950];
p.push(tbl(["Signal","PingCAP","CockroachDB","YugabyteDB","PlanetScale","SingleStore","Vitess"],
[
  ["AI bot rules",lead("YES (5)"),lead("YES (5)"),"No","No","No","No"],
  ["llms.txt",lead("YES"),"No (404)",lead("YES"),lead("YES →/docs"),lead("YES"),"No"],
  ["/.well-known/llms.txt","No","No","No","No","No","No"],
  ["\"What is?\" page",lead("YES ✅"),"No","Partial","No","No",g("YES (restored)")],
  ["Glossary (main)",lead("49 terms"),w("Thin (/glossary/)"),"No","No","No","No"],
  ["Comparison pages",lead("11 pages"),w("9 pages (↑5)"),"0","0","Partial","0"],
  ["/compare/ hub",lead("YES (new)"),"YES","No","No","Partial","No"],
  ["Org schema",lead("YES"),"No",lead("YES"),lead("YES"),"?","?"],
  ["SoftwareApp schema",lead("YES"),"No","No","No","?","No"],
  ["Named blog authors",lead("YES+schema"),"YES","YES","YES","YES","YES"],
  ["FAQ page",lead("YES"),"No","No","No",lead("YES"),"No"],
  ["Security headers",w("5/6 ⚠️"),"2/6","5/6",lead("6/6"),"3/6","1/6"],
],sw));
p.push(new Paragraph({children:[new PageBreak()]}));

// What changed
p.push(h1("What Changed: Apr 6 → May 14"));
p.push(h2("Competitor Movements"));
const cw=[2200,3500,4020];
p.push(tbl(["Competitor","What Changed","Impact on PingCAP"],
[
  [w("CockroachDB"),w("Comparison pages 5 → 9. Added: cockroachdb-vs-oracle, cockroachdb-vs-singlestore, tidb-vs-cockroachdb, yugabyte-vs-cockroachdb, cockroachdb-vs-mongodb"),"HIGH — CRDB now counter-positions directly against TiDB. Ensure /compare/tidb-vs-cockroachdb/ outranks their page."],
  [g("Vitess"),g("\"What Is Vitess?\" RESTORED. Now live at /docs/22.0/overview/whatisvitess/. Was 404 in April."),"MEDIUM — Vitess reclaims definitional signal. PingCAP still only commercial vendor with this page."],
  ["YugabyteDB","No new AEO signals. /yugabytedb/ is a product page, not definitional.","LOW — No movement."],
  ["PlanetScale","No new AEO signals. llms.txt still redirects to /docs/.","LOW — No movement."],
  ["SingleStore","/comparisons/ section exists (redirects to /comparisons/oracle/)","LOW — Limited scope, no hub."],
],cw));

p.push(sp());
p.push(h2("PingCAP Improvements Since Apr 6"));
const iw=[500,3500,1700,4020];
p.push(tbl(["#","Change","AEO Impact","Notes"],
[
  ["1",g("/what-is-tidb/ LIVE (Apr 30) — 3K words, 7 H2s, FAQ schema"),"+1.0 to AEO","Only commercial vendor with dedicated definitional page"],
  ["2",g("Glossary 17 → 49 terms (May 13)"),"+0.2 to AEO","3× growth; now sole glossary leader (CRDB /docs/ now 404)"],
  ["3",g("/compare/ hub LIVE (May 13)"),"Structural","11 comparison pages now have central landing"],
  ["4","Article sitemap 560 → 242","Quality","74% total reduction since Mar 9"],
  ["5",g("TTFB recovered: 265ms → 94ms"),"Performance","Apr 30 regression fully resolved"],
],iw));

p.push(sp());
p.push(h2("PingCAP Regression Since Apr 6"));
p.push(tbl(["#","Change","Impact","Notes"],
[
  ["1",r("CSP header completely absent"),"HIGH","Was report-only at Apr 30. Now gone entirely. Security headers: 6 → 5."],
],iw));

p.push(new Paragraph({children:[new PageBreak()]}));

// AEO Scores
p.push(h1("Updated AEO Score Comparison"));
const asw=[2000,1400,1600,1000,4220];
p.push(tbl(["Competitor","Apr 6","May 14","Delta","Key Change"],
[
  [lead("PingCAP"),lead("8.5"),lead("9.2"),g("+0.7"),"/what-is-tidb/ LIVE · glossary 3× · /compare/ hub"],
  ["CockroachDB","7.0",w("7.5"),"+0.5","9 comparison pages (up from 5) incl. tidb-vs-cockroachdb"],
  ["YugabyteDB","6.0","5.5","−0.5","No new signals; /yugabytedb/ is product page not definitional"],
  ["SingleStore","2.5","3.0","+0.5","/comparisons/ section live; FAQ page confirmed"],
  ["PlanetScale","3.0","3.0","0","Stable — llms.txt redirects to /docs/"],
  ["Vitess","2.0","2.5","+0.5","\"What Is Vitess?\" restored at v22 docs"],
],asw));

p.push(sp());
p.push(h2("Head-to-Head: PingCAP vs. CockroachDB"));
p.push(para(b("PingCAP leads 7–0 (was 5–2 in April). ",{color:C.fx}),n("CockroachDB's /docs/stable/glossary/ is now 404 — PingCAP's 49-term /glossary/ is the only main-domain glossary in the market. On /compare/ hub both are now tied.")));
const hhw=[3200,2600,2600,1320];
p.push(tbl(["Signal","PingCAP","CockroachDB","Leader"],
[
  ["AI bot rules","YES (5 bots)","YES (5 bots)","Tie"],
  ["llms.txt",lead("YES"),"No",lead("PingCAP")],
  ["\"What is?\" page",lead("YES (/what-is-tidb/)"),"No",lead("PingCAP")],
  ["Glossary",lead("49 terms"),"Thin (/glossary/ 200, limited)",lead("PingCAP (reversed from April)")],
  ["Comparison pages",lead("11 pages"),"9 pages",lead("PingCAP (volume)")],
  ["/compare/ hub",lead("YES (new May 13)"),"YES","Tie"],
  ["Organization schema",lead("YES"),"No",lead("PingCAP")],
  ["SoftwareApp schema",lead("YES"),"No",lead("PingCAP")],
  ["FAQ page",lead("YES"),"No",lead("PingCAP")],
  ["Security headers",w("5/6 ⚠️"),"2/6",w("PingCAP (both need work)")],
],hhw));
p.push(para(n("⚠️ Notable: CockroachDB published \"tidb-vs-cockroachdb\" directly targeting TiDB. Ensure PingCAP's version is richer and outranks CRDB's.",{color:C.hi,italics:true})));
p.push(new Paragraph({children:[new PageBreak()]}));

// Market trend
p.push(h1("Market-Wide AEO Adoption Trend"));
const mw=[2500,2400,2600,2220];
p.push(tbl(["Signal","Apr 6","May 14","Adoption (May 14)"],
[
  ["AI bot rules","PingCAP + CockroachDB","Same","2/6 (33%)"],
  ["llms.txt","PingCAP + YugabyteDB + SingleStore + PlanetScale","Same","4/6 (67%)"],
  [g("/.well-known/llms.txt"),g("Nobody"),g("Nobody — 0% adoption"),g("0/6 — TRUE FIRST MOVER")],
  ["\"What is?\" page","Nobody (Vitess 404'd)",lead("PingCAP + Vitess"),"2/6 (33%)"],
  [g("Glossary (main domain)"),"PingCAP + CockroachDB",g("PingCAP only (CRDB /docs/ now 404)"),g("1/6 — PingCAP sole leader")],
  ["/compare/ hub","CockroachDB only",lead("PingCAP + CockroachDB"),"2/6 (33%)"],
],mw));
p.push(new Paragraph({children:[new PageBreak()]}));

// Top 3 moves
p.push(h1("Top 3 Competitive Moves This Month"));
const tw=[500,4500,1800,900];
p.push(tbl(["#","Action","Why","Effort"],
[
  ["1",r("Restore CSP header — dropped from 6 to 5 while PlanetScale (6/6) and YugabyteDB (5/6) hold steady. Check Cloudflare/CDN config or WP plugin change."),"Security regression competitors don't share","1–2 hrs"],
  ["2",g("Add /.well-known/llms.txt — 0/6 adoption in entire competitive set. Nobody has claimed this path. Copy content from /llms.txt and configure the well-known path."),"True first mover — 0% market adoption","<30 min"],
  ["3","Ensure /compare/tidb-vs-cockroachdb/ outranks CRDB's page — add more depth, cite /what-is-tidb/, add structured data. CRDB is explicitly targeting TiDB with their own version.","Counter CRDB's direct attack on TiDB brand","2–3 hrs"],
],tw));

p.push(sp());
p.push(h2("Score Projection"));
const pw=[3500,1400,1800,2020];
p.push(tbl(["Scenario","PingCAP","CockroachDB","Gap"],
[
  [lead("Current (May 14)"),lead("9.2"),"7.5",g("+1.7")],
  [g("After /.well-known/llms.txt + CSP restore"),g("9.5"),"7.5",g("+2.0")],
  [w("If CRDB adds /what-is-cockroachdb/"),"9.5",w("8.5"),w("+1.0")],
  [w("If CRDB adds both /what-is/ + llms.txt"),"9.5",w("9.0"),w("+0.5")],
],pw));
p.push(para(b("The definitional page advantage is PingCAP's clearest moat. ",{color:C.hd}),n("CockroachDB matching this signal is a matter of time given their pattern. The window where PingCAP is alone on this is valuable — ensure /what-is-tidb/ is deeply linked, cited in every comparison page, and its FAQ schema is fully built out.")));

// Footer
p.push(sp(),sp());
p.push(new Paragraph({alignment:AlignmentType.CENTER,children:[n("Competitive analysis conducted May 14, 2026  ·  All findings verified via live HTTP requests",{color:C.mu,italics:true,size:18})]}));
p.push(new Paragraph({alignment:AlignmentType.CENTER,children:[n("Baseline: pingcap-aeo-geo-competitive-2026-04-06.md  ·  cockroachlabs.com · yugabyte.com · planetscale.com · singlestore.com · vitess.io",{color:C.mu,italics:true,size:18})]}));

const doc=new Document({sections:[{properties:{page:{margin:{top:ML,bottom:MR,left:ML,right:MR}}},children:p}]});
const out=process.env.REPORT_OUT||"reports-archive/competitive/pingcap-aeo-geo-competitive-2026-05-14.docx";
Packer.toBuffer(doc).then(buf=>{fs.writeFileSync(out,buf);console.log("✅ Written:",out,Math.round(buf.length/1024)+"KB");});
