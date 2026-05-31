/* Commerce Wealth — Student dashboard rendering & interactions */
(function () {
  "use strict";
  const D = window.CW;
  const $ = (s) => document.querySelector(s);
  const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

  /* ---------- Home ---------- */
  function strengthClass(s){ return s==="Strong"?"green":s==="Average"?"amber":"red"; }

  $("#home-stats").innerHTML = `
    <div class="stat"><div class="ic b1">📅</div><div><div class="val">${D.student.attendanceMonth}%</div><div class="lbl">Attendance (month)</div></div></div>
    <div class="stat"><div class="ic b2">📋</div><div><div class="val">${D.student.quizzesDone}/${D.student.quizzesTotal}</div><div class="lbl">Quizzes completed</div></div></div>
    <div class="stat"><div class="ic b3">🏆</div><div><div class="val">#${D.student.rank}<small style="font-size:.8rem;color:var(--grey-400)"> of ${D.student.rankTotal}</small></div><div class="lbl">Leaderboard rank</div></div></div>
    <div class="stat"><div class="ic b4">📊</div><div><div class="val">${D.student.avgScore}%</div><div class="lbl">Average score</div></div></div>`;

  $("#home-feed").innerHTML = D.activity.map((a) => `
    <li><span class="fic">${a.ic}</span><div style="flex:1">${a.text}<div class="when">${a.when}</div></div></li>`).join("");

  $("#home-schedule").innerHTML = `<thead><tr><th>Day</th><th>Subject</th><th>Faculty</th></tr></thead><tbody>` +
    D.schedule.map((s) => `<tr><td><b>${s.day}</b></td><td>${s.subject}<div class="muted" style="font-size:.8rem">${s.time}</div></td><td>${s.faculty}</td></tr>`).join("") + `</tbody>`;

  /* ---------- Attendance ---------- */
  const statusMap = { p:"present", a:"absent", l:"late", h:"holiday", v:"leave" };
  // May 2026: 1st is a Friday (index 5, Sun=0)
  const firstDow = 5;
  let calHtml = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d)=>`<div class="dow">${d}</div>`).join("");
  for (let i=0;i<firstDow;i++) calHtml += `<div class="cell empty"></div>`;
  D.attendance.forEach((st, i) => {
    const cls = statusMap[st];
    const c = cls==="holiday" ? "" : cls;
    calHtml += `<div class="cell ${c}" title="${cls}">${i+1}</div>`;
  });
  $("#att-cal").innerHTML = calHtml;

  $("#att-summary").innerHTML = `
    <div class="stat"><div class="ic b1">✅</div><div><div class="val">19</div><div class="lbl">Present</div></div></div>
    <div class="stat"><div class="ic b4">❌</div><div><div class="val">2</div><div class="lbl">Absent</div></div></div>
    <div class="stat"><div class="ic b2">⏰</div><div><div class="val">1</div><div class="lbl">Late</div></div></div>
    <div class="stat"><div class="ic b3">📈</div><div><div class="val">${D.student.attendanceOverall}%</div><div class="lbl">Overall</div></div></div>`;

  const subjAtt = [
    { s:"Accountancy", c:8, p:8, a:0, pct:100 },
    { s:"Economics", c:8, p:7, a:1, pct:87.5 },
    { s:"Business Studies", c:6, p:4, a:2, pct:66.7 },
  ];
  $("#att-subjects").innerHTML = `<thead><tr><th>Subject</th><th>Present</th><th>%</th></tr></thead><tbody>` +
    subjAtt.map((r)=>{ const bc = r.pct>=85?"":r.pct>=75?"amber":"red";
      return `<tr><td>${r.s}</td><td>${r.p}/${r.c}</td><td><div class="flex aic gap"><div class="bar ${bc}" style="flex:1"><i style="width:${r.pct}%"></i></div><span class="mono" style="font-size:.82rem">${r.pct}%</span></div></td></tr>`;
    }).join("") + `</tbody>`;

  /* ---------- Notes ---------- */
  function renderNotes() {
    const sub = $("#f-sub").value, type = $("#f-type").value, q = $("#f-search").value.toLowerCase();
    const rows = D.materials.filter((m) =>
      (!sub || m.sub===sub) && (!type || m.type===type) && (!q || m.t.toLowerCase().includes(q)));
    $("#notes-table").innerHTML = `<thead><tr><th>Title</th><th>Subject</th><th>Type</th><th>Board</th><th>By</th><th>Size</th><th></th></tr></thead><tbody>` +
      (rows.length ? rows.map((m)=>`<tr>
        <td><b>${m.t}</b><div class="muted" style="font-size:.78rem">${m.ch} · ${m.date}</div></td>
        <td>${m.sub}</td><td><span class="pill grey">${m.type}</span></td><td>${m.board}</td><td>${m.by}</td><td class="mono">${m.size}</td>
        <td><button class="btn btn-sm btn-outline" onclick="alert('Demo: downloading '+this.dataset.t)" data-t="${m.t}">⬇ Download</button></td></tr>`).join("")
        : `<tr><td colspan="7" class="muted text-center">No materials match your filters.</td></tr>`) + `</tbody>`;
  }
  ["#f-sub","#f-type","#f-search"].forEach((s)=>$(s).addEventListener("input", renderNotes));
  renderNotes();

  const stPill = { Reviewed:"green", Submitted:"blue", "Under Review":"amber", Resubmit:"red" };
  $("#uploads-table").innerHTML = `<thead><tr><th>Title</th><th>Status</th><th>Remarks</th></tr></thead><tbody>` +
    D.submissions.map((u)=>`<tr><td><b>${u.t}</b><div class="muted" style="font-size:.78rem">${u.sub} · ${u.on}</div></td>
      <td><span class="pill ${stPill[u.status]||"grey"}">${u.status}</span></td><td class="muted">${u.remark}</td></tr>`).join("") + `</tbody>`;

  /* ---------- Quizzes ---------- */
  $("#quiz-grid").innerHTML = D.quizzes.map((q)=>`
    <div class="quiz-card">
      <div class="qtag">📝 ${q.sub}</div>
      <h4>${q.title}</h4>
      <div class="qmeta">${q.ch}</div>
      <ul class="qfacts">
        <li>🕐 Duration: ${q.dur} min</li>
        <li>❓ Questions: ${q.qs}</li>
        <li>📊 Difficulty: ${q.diff}</li>
        <li>📅 Due: ${q.due}</li>
        <li>🏆 Top score: ${q.top}</li>
      </ul>
      <button class="btn btn-primary btn-block start-quiz">Start Quiz</button>
    </div>`).join("");
  document.querySelectorAll(".start-quiz").forEach((b)=>b.addEventListener("click", startQuiz));

  const histRankPill = (r)=> r.includes("1")?"gold":r.includes("2")?"grey":r.includes("3")?"grey":"blue";
  $("#quiz-history").innerHTML = `<thead><tr><th>Quiz</th><th>Subject</th><th>Date</th><th>Score</th><th>Rank</th></tr></thead><tbody>` +
    D.quizHistory.map((h)=>`<tr><td><b>${h.t}</b></td><td>${h.sub}</td><td>${h.date}</td><td class="mono">${h.score}</td><td><span class="pill ${histRankPill(h.rank)}">${h.rank}</span></td></tr>`).join("") + `</tbody>`;

  // --- Quiz runner ---
  const quiz = D.demoQuiz;
  let cur = 0, answers = new Array(quiz.questions.length).fill(null), timer = null, remaining = 20*60;

  function startQuiz() {
    cur = 0; answers.fill(null); remaining = 20*60;
    $("#quiz-list-view").classList.add("hide");
    $("#quiz-result-view").classList.add("hide");
    $("#quiz-run-view").classList.remove("hide");
    $("#qr-title").textContent = quiz.title;
    renderQ();
    clearInterval(timer);
    timer = setInterval(tick, 1000);
    updateTimer();
  }
  function tick(){ remaining--; updateTimer(); if (remaining<=0){ clearInterval(timer); finishQuiz(); } }
  function updateTimer(){ const m=String(Math.floor(remaining/60)).padStart(2,"0"); const s=String(remaining%60).padStart(2,"0"); $("#qr-timer").textContent = `${m}:${s}`; }

  function renderQ() {
    const q = quiz.questions[cur];
    $("#qr-progress").textContent = `Question ${cur+1} of ${quiz.questions.length}`;
    $("#qr-bar").style.width = ((cur)/quiz.questions.length*100) + "%";
    $("#qr-question").textContent = q.q;
    $("#qr-options").innerHTML = q.opts.map((o,i)=>`
      <div class="q-opt ${answers[cur]===i?"sel":""}" data-i="${i}">
        <span class="key">${String.fromCharCode(65+i)}</span><span>${o}</span></div>`).join("");
    document.querySelectorAll("#qr-options .q-opt").forEach((opt)=>opt.addEventListener("click",()=>{
      answers[cur] = +opt.dataset.i; renderQ();
    }));
    $("#qr-prev").style.visibility = cur===0 ? "hidden" : "visible";
    $("#qr-next").textContent = cur===quiz.questions.length-1 ? "Submit Quiz ✓" : "Next →";
  }
  $("#qr-prev").addEventListener("click",()=>{ if(cur>0){cur--;renderQ();} });
  $("#qr-next").addEventListener("click",()=>{
    if (cur===quiz.questions.length-1) finishQuiz(); else { cur++; renderQ(); }
  });

  function finishQuiz() {
    clearInterval(timer);
    let correct = 0;
    quiz.questions.forEach((q,i)=>{ if(answers[i]===q.correct) correct++; });
    const total = quiz.questions.length;
    const pct = Math.round(correct/total*100);
    $("#quiz-run-view").classList.add("hide");
    $("#quiz-result-view").classList.remove("hide");
    $("#res-title").textContent = quiz.title;
    $("#res-score").textContent = `${correct} / ${total}`;
    $("#res-detail").innerHTML = `You scored <b>${pct}%</b> · Class average 69.3% · Time taken ${Math.floor((1200-remaining)/60)} min`;
    $("#res-solutions").classList.add("hide");
    $("#res-solutions").innerHTML = quiz.questions.map((q,i)=>{
      const a = answers[i];
      return `<div class="dcard">
        <div class="muted" style="font-size:.8rem">Question ${i+1}</div>
        <div class="q-question" style="font-size:1rem;margin:6px 0 12px">${q.q}</div>
        <div class="q-options">${q.opts.map((o,j)=>{
          let c=""; if(j===q.correct)c="correct"; else if(j===a&&a!==q.correct)c="wrong";
          return `<div class="q-opt ${c}"><span class="key">${String.fromCharCode(65+j)}</span><span>${o}</span>${j===q.correct?'<span style="margin-left:auto;color:var(--green-flag)">✓</span>':(j===a?'<span style="margin-left:auto;color:var(--red)">✗</span>':'')}</div>`;
        }).join("")}</div>
        <div class="alert info" style="margin-top:12px">💡 ${q.exp}</div>
      </div>`;
    }).join("");
  }
  $("#res-review").addEventListener("click",()=>{
    $("#res-solutions").classList.toggle("hide");
    $("#res-review").scrollIntoView({behavior:"smooth"});
  });
  $("#res-back").addEventListener("click",()=>{
    $("#quiz-result-view").classList.add("hide");
    $("#quiz-list-view").classList.remove("hide");
  });

  /* ---------- Leaderboard ---------- */
  const top3 = D.leaderboard.slice(0,3);
  const medals = ["🥇","🥈","🏆"];
  $("#lb-podium").innerHTML = [top3[1], top3[0], top3[2]].map((p, idx)=>{
    const realRank = p.rank; const cls = realRank===1?"p1":realRank===2?"p2":"p3";
    const init = p.name.split(" ").map(w=>w[0]).slice(0,2).join("");
    return `<div class="spot ${cls}"><div class="medal">${medals[realRank-1]}</div><div class="ava">${init}</div>
      <div class="nm">${p.name}</div><div class="muted" style="font-size:.8rem">Class ${p.cls} · ${p.board}</div>
      <div class="sc">${p.cw}</div></div>`;
  }).join("");

  $("#lb-table").innerHTML = `<thead><tr><th>Rank</th><th>Δ</th><th>Student</th><th>Board</th><th>CW Score</th><th>Quiz</th><th>Attend.</th><th>Streak</th></tr></thead><tbody>` +
    D.leaderboard.map((r)=>`<tr class="${r.me?"me":""}">
      <td><b>#${r.rank}</b></td>
      <td>${r.change==="—"?'<span class="muted">—</span>':(r.change[0]==="↑"?`<span style="color:var(--green-flag)">${r.change}</span>`:`<span style="color:var(--red)">${r.change}</span>`)}</td>
      <td>${r.name}</td><td>${r.board}</td><td class="mono"><b>${r.cw}</b></td><td>${r.quiz}%</td><td>${r.att}%</td><td>${r.streak}</td></tr>`).join("") + `</tbody>`;

  $("#lb-badges").innerHTML = D.badges.map((b)=>`
    <div class="badge-card ${b.earned?"":"locked"}"><div class="be">${b.e}</div><div class="bn">${b.n}</div><div class="bd">${b.d}</div></div>`).join("");

  /* ---------- Performance ---------- */
  $("#perf-stats").innerHTML = `
    <div class="stat"><div class="ic b1">📊</div><div><div class="val">82.4%</div><div class="lbl">Overall avg ↑3.2%</div></div></div>
    <div class="stat"><div class="ic b2">🥇</div><div><div class="val">91.2%</div><div class="lbl">Best: Accountancy</div></div></div>
    <div class="stat"><div class="ic b4">🎯</div><div><div class="val">74.6%</div><div class="lbl">Weakest: Bus. Studies</div></div></div>
    <div class="stat"><div class="ic b3">📋</div><div><div class="val">14/18</div><div class="lbl">Quizzes attempted</div></div></div>`;

  $("#perf-chapters").innerHTML = `<thead><tr><th>Subject</th><th>Chapter</th><th>Quizzes</th><th>Avg</th><th>Strength</th></tr></thead><tbody>` +
    D.chapterStrength.map((c)=>`<tr><td>${c.sub}</td><td>${c.ch}</td><td>${c.n}</td><td class="mono">${c.avg}%</td>
      <td><span class="pill ${strengthClass(c.s)}">${c.s}</span></td></tr>`).join("") + `</tbody>`;

  $("#perf-tests").innerHTML = `<thead><tr><th>Test</th><th>Type</th><th>Date</th><th>Acc</th><th>Eco</th><th>BS</th><th>Total</th><th>Rank</th></tr></thead><tbody>` +
    D.testHistory.map((t)=>`<tr><td><b>${t.t}</b></td><td>${t.type}</td><td>${t.date}</td><td class="mono">${t.acc}</td><td class="mono">${t.eco}</td><td class="mono">${t.bs}</td><td class="mono">${t.total}</td><td>${t.rank}</td></tr>`).join("") + `</tbody>`;

  /* ---------- Charts (drawn lazily when Performance panel opens) ---------- */
  let charted = false;
  function drawCharts() {
    if (charted || typeof Chart === "undefined") return;
    charted = true;
    const navy = "#1B2A4A", gold = "#F0A500", emerald = "#1B7A5A";

    new Chart($("#radarChart"), {
      type: "radar",
      data: {
        labels: ["Accountancy","Economics","Indian Eco","Business Studies","Statistics"],
        datasets: [{ label:"Your strength", data:[91,84,80,75,86], fill:true,
          backgroundColor:"rgba(240,165,0,.18)", borderColor:gold, pointBackgroundColor:gold }],
      },
      options: { plugins:{legend:{display:false}}, scales:{ r:{ suggestedMin:50, suggestedMax:100, ticks:{stepSize:10} } }, maintainAspectRatio:false },
    });

    new Chart($("#trendChart"), {
      type: "line",
      data: {
        labels: ["Feb","Mar","Apr","May"],
        datasets: [
          { label:"Accountancy", data:[80,84,88,91], borderColor:navy, tension:.3 },
          { label:"Economics", data:[76,79,82,84], borderColor:emerald, tension:.3 },
          { label:"Business Studies", data:[68,70,72,75], borderColor:gold, tension:.3 },
          { label:"Class Avg", data:[70,71,73,74], borderColor:"#9aa6b6", borderDash:[5,5], tension:.3 },
        ],
      },
      options: { plugins:{legend:{position:"bottom",labels:{boxWidth:12,font:{size:11}}}}, scales:{ y:{ suggestedMin:60, suggestedMax:100 } }, maintainAspectRatio:false },
    });
  }
  document.addEventListener("panelchange", (e)=>{ if (e.detail==="performance") drawCharts(); });
})();
