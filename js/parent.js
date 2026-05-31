/* Commerce Wealth — Parent dashboard rendering */
(function () {
  "use strict";
  const D = window.CW;
  const $ = (s) => document.querySelector(s);

  /* Home stats */
  $("#parent-stats").innerHTML = `
    <div class="stat"><div class="ic b1">📅</div><div><div class="val">91.2%</div><div class="lbl">Attendance · 🟢 Good</div></div></div>
    <div class="stat"><div class="ic b2">📊</div><div><div class="val">82.4%</div><div class="lbl">Average · 🟢 Good</div></div></div>
    <div class="stat"><div class="ic b4">📝</div><div><div class="val">2</div><div class="lbl">Quizzes pending</div></div></div>
    <div class="stat"><div class="ic b3">🏆</div><div><div class="val">#5<small style="font-size:.8rem;color:var(--grey-400)"> of 38</small></div><div class="lbl">Leaderboard rank</div></div></div>`;

  /* Attendance calendar (read-only, same data) */
  const statusMap = { p:"present", a:"absent", l:"late", h:"holiday", v:"leave" };
  const firstDow = 5;
  let cal = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d)=>`<div class="dow">${d}</div>`).join("");
  for (let i=0;i<firstDow;i++) cal += `<div class="cell empty"></div>`;
  D.attendance.forEach((st,i)=>{ const c = statusMap[st]==="holiday"?"":statusMap[st]; cal += `<div class="cell ${c}" title="${statusMap[st]}">${i+1}</div>`; });
  $("#p-att-cal").innerHTML = cal;

  $("#p-att-summary").innerHTML = `<thead><tr><th>Month</th><th>Present</th><th>Absent</th><th>%</th></tr></thead><tbody>
    <tr><td>May 2026</td><td>19/22</td><td>2</td><td class="mono">86.4%</td></tr>
    <tr><td>April 2026</td><td>23/24</td><td>1</td><td class="mono">95.8%</td></tr>
    <tr><td>March 2026</td><td>18/20</td><td>1</td><td class="mono">90.0%</td></tr></tbody>`;

  /* Performance summary */
  const up = (v)=>`<span style="color:var(--green-flag)">↑ ${v}</span>`;
  $("#p-summary").innerHTML = `<thead><tr><th>Metric</th><th>Current</th><th>Last Month</th><th>Change</th></tr></thead><tbody>
    <tr><td><b>Overall Average</b></td><td class="mono">82.4%</td><td class="mono">79.2%</td><td>${up("3.2%")}</td></tr>
    <tr><td>Accountancy</td><td class="mono">91.2%</td><td class="mono">88.0%</td><td>${up("3.2%")}</td></tr>
    <tr><td>Economics</td><td class="mono">84.0%</td><td class="mono">82.5%</td><td>${up("1.5%")}</td></tr>
    <tr><td>Business Studies</td><td class="mono">74.6%</td><td class="mono">70.8%</td><td>${up("3.8%")}</td></tr>
    <tr><td>Class Rank</td><td>#5 of 38</td><td>#7 of 38</td><td>${up("2 positions")}</td></tr></tbody>`;

  const strengthPill = (s)=> s==="Strong"?"green":s==="Average"?"amber":"grey";
  const accCh = [
    { ch:"Partnership Fundamentals", st:"Completed", quiz:"90%", test:"95%", s:"Strong" },
    { ch:"Admission of Partner", st:"Completed", quiz:"88%", test:"85%", s:"Strong" },
    { ch:"Retirement of Partner", st:"In Progress", quiz:"72%", test:"—", s:"Average" },
    { ch:"Company Accounts", st:"In Progress", quiz:"—", test:"—", s:"—" },
  ];
  $("#p-acc-chapters").innerHTML = `<thead><tr><th>Chapter</th><th>Quiz</th><th>Test</th><th>Strength</th></tr></thead><tbody>` +
    accCh.map((c)=>`<tr><td>${c.ch}<div class="muted" style="font-size:.78rem">${c.st}</div></td><td class="mono">${c.quiz}</td><td class="mono">${c.test}</td>
      <td>${c.s==="—"?'<span class="muted">—</span>':`<span class="pill ${strengthPill(c.s)}">${c.s}</span>`}</td></tr>`).join("") + `</tbody>`;

  $("#p-tests").innerHTML = `<thead><tr><th>Test</th><th>Date</th><th>Acc</th><th>Eco</th><th>BS</th><th>Total</th><th>Rank</th></tr></thead><tbody>
    <tr><td><b>Monthly Test — May</b></td><td>25 May</td><td class="mono">38/40</td><td class="mono">32/40</td><td class="mono">28/40</td><td class="mono">98/120 (81.7%)</td><td>#4</td></tr>
    <tr><td><b>Monthly Test — Apr</b></td><td>27 Apr</td><td class="mono">35/40</td><td class="mono">30/40</td><td class="mono">26/40</td><td class="mono">91/120 (75.8%)</td><td>#7</td></tr>
    <tr><td><b>Monthly Test — Mar</b></td><td>28 Mar</td><td class="mono">32/40</td><td class="mono">28/40</td><td class="mono">24/40</td><td class="mono">84/120 (70.0%)</td><td>#9</td></tr></tbody>`;

  /* Scores (read-only) */
  $("#p-scores").innerHTML = `<thead><tr><th>Title</th><th>Subject</th><th>Date</th><th>Score</th><th>Class Avg</th><th>Rank</th><th>Status</th></tr></thead><tbody>
    <tr><td><b>Money &amp; Banking Quiz</b></td><td>Economics</td><td>28 May</td><td class="mono">12/15 (80%)</td><td class="mono">69.3%</td><td><span class="pill blue">#3</span></td><td><span class="pill green">Completed</span></td></tr>
    <tr><td><b>Partnership Quiz</b></td><td>Accountancy</td><td>25 May</td><td class="mono">18/20 (90%)</td><td class="mono">76.2%</td><td><span class="pill gold">#1 🥇</span></td><td><span class="pill green">Completed</span></td></tr>
    <tr><td><b>Management Principles</b></td><td>Bus. Studies</td><td>22 May</td><td class="mono">8/10 (80%)</td><td class="mono">72.0%</td><td><span class="pill blue">#5</span></td><td><span class="pill green">Completed</span></td></tr>
    <tr><td><b>Macro — Ch. 4</b></td><td>Economics</td><td>—</td><td class="mono">—</td><td class="mono">—</td><td>—</td><td><span class="pill amber">Not Attempted</span></td></tr></tbody>`;

  /* Notes (read-only) */
  $("#p-notes").innerHTML = `<thead><tr><th>Title</th><th>Subject</th><th>Type</th><th>By</th><th>Date</th><th></th></tr></thead><tbody>` +
    D.materials.map((m)=>`<tr><td><b>${m.t}</b></td><td>${m.sub}</td><td><span class="pill grey">${m.type}</span></td><td>${m.by}</td><td>${m.date}</td>
      <td><button class="btn btn-sm btn-outline" onclick="alert('Demo: downloading '+this.dataset.t)" data-t="${m.t}">⬇</button></td></tr>`).join("") + `</tbody>`;

  /* Chart (lazy) */
  let charted = false;
  function drawChart() {
    if (charted || typeof Chart === "undefined") return;
    charted = true;
    new Chart($("#pBarChart"), {
      type: "bar",
      data: {
        labels: ["Accountancy","Economics","Bus. Studies","Overall"],
        datasets: [
          { label:"Last Month", data:[88,82.5,70.8,79.2], backgroundColor:"#9aa6b6" },
          { label:"This Month", data:[91.2,84,74.6,82.4], backgroundColor:"#F0A500" },
        ],
      },
      options: { plugins:{legend:{position:"bottom",labels:{boxWidth:12}}}, scales:{ y:{ suggestedMin:60, suggestedMax:100 } }, maintainAspectRatio:false },
    });
  }
  document.addEventListener("panelchange", (e)=>{ if (e.detail==="performance") drawChart(); });
})();
