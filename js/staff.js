/* Commerce Wealth — Staff dashboard rendering */
(function () {
  "use strict";
  const D = window.CW;
  const $ = (s) => document.querySelector(s);

  /* Home stats */
  $("#staff-stats").innerHTML = `
    <div class="stat"><div class="ic b3">👥</div><div><div class="val">38</div><div class="lbl">Active students</div></div></div>
    <div class="stat"><div class="ic b1">📚</div><div><div class="val">3</div><div class="lbl">Today's classes</div></div></div>
    <div class="stat"><div class="ic b2">📄</div><div><div class="val">7</div><div class="lbl">Pending reviews</div></div></div>
    <div class="stat"><div class="ic b4">📝</div><div><div class="val">2</div><div class="lbl">Quizzes live</div></div></div>`;

  const stPill = { Completed:"green", Upcoming:"blue" };
  $("#staff-today").innerHTML = `<thead><tr><th>Time</th><th>Subject</th><th>Class</th><th>Batch</th><th>Students</th><th>Status</th></tr></thead><tbody>` +
    D.staffToday.map((t)=>`<tr><td class="mono">${t.time}</td><td><b>${t.sub}</b></td><td>${t.cls} · ${t.board}</td><td>${t.batch}</td><td>${t.students}</td><td><span class="pill ${stPill[t.status]}">${t.status}</span></td></tr>`).join("") + `</tbody>`;

  /* Attendance roster (interactive) */
  const roster12 = D.roster.filter((r)=>r.cls==="12");
  function rosterRows(allPresent) {
    return roster12.map((r,i)=>`<tr data-i="${i}">
      <td class="mono">${r.roll}</td><td><b>${r.name}</b></td>
      <td><div class="flex gap att-toggle" data-i="${i}">
        <button class="btn btn-sm ${allPresent?'btn-secondary':'btn-outline'}" data-st="P">Present</button>
        <button class="btn btn-sm btn-outline" data-st="A">Absent</button>
        <button class="btn btn-sm btn-outline" data-st="L">Late</button>
      </div></td></tr>`).join("");
  }
  function bindToggles() {
    document.querySelectorAll("#att-roster .att-toggle").forEach((grp)=>{
      grp.querySelectorAll("button").forEach((btn)=>btn.addEventListener("click",()=>{
        grp.querySelectorAll("button").forEach((b)=>{ b.classList.remove("btn-secondary"); b.classList.add("btn-outline"); });
        btn.classList.add("btn-secondary"); btn.classList.remove("btn-outline");
      }));
    });
  }
  $("#att-roster").innerHTML = `<thead><tr><th>Roll No.</th><th>Student</th><th>Status</th></tr></thead><tbody>${rosterRows(true)}</tbody>`;
  bindToggles();
  $("#mark-all").addEventListener("click",()=>{ $("#att-roster tbody").innerHTML = rosterRows(true); bindToggles(); });

  /* Uploaded materials manager */
  $("#uploaded-mgr").innerHTML = `<thead><tr><th>Title</th><th>Class</th><th>Downloads</th><th></th></tr></thead><tbody>` +
    D.materials.slice(0,4).map((m)=>`<tr><td><b>${m.t}</b><div class="muted" style="font-size:.78rem">${m.sub}</div></td><td>${m.ch}</td><td>${10+Math.floor(Math.random()*30)}</td>
      <td><div class="flex gap"><button class="btn btn-sm btn-outline">Edit</button><button class="btn btn-sm btn-outline">Delete</button></div></td></tr>`).join("") + `</tbody>`;

  /* Question analytics */
  $("#qbank-table").innerHTML = `<thead><tr><th>Question</th><th>Correct %</th><th>Common Wrong</th><th>Difficulty</th></tr></thead><tbody>` +
    D.qbankRows.map((q)=>{ const bc=q.correct>=80?"":q.correct>=60?"amber":"red";
      return `<tr><td>${q.q}</td><td><div class="flex aic gap"><div class="bar ${bc}" style="width:70px"><i style="width:${q.correct}%"></i></div><span class="mono">${q.correct}%</span></div></td><td class="muted">${q.wrong}</td><td><span class="pill grey">${q.diff}</span></td></tr>`;
    }).join("") + `</tbody>`;

  /* Batch report */
  $("#batch-report").innerHTML = `<thead><tr><th>Student</th><th>Attend.</th><th>Acc</th><th>Eco</th><th>BS</th><th>Overall</th><th>Rank</th><th>Trend</th></tr></thead><tbody>` +
    D.batchReport.map((r)=>`<tr><td><b>${r.name}</b></td><td>${r.att}%</td><td class="mono">${r.acc}%</td><td class="mono">${r.eco}%</td><td class="mono">${r.bs}%</td><td class="mono"><b>${r.overall}%</b></td><td>${r.rank}</td>
      <td>${r.trend==="↑"?'<span style="color:var(--green-flag)">↑</span>':'<span class="muted">—</span>'}</td></tr>`).join("") + `</tbody>`;

  /* Roster manager */
  $("#roster-table").innerHTML = `<thead><tr><th>Roll No.</th><th>Name</th><th>Class</th><th>Board</th><th>Status</th><th></th></tr></thead><tbody>` +
    D.roster.map((r)=>`<tr><td class="mono">${r.roll}</td><td><b>${r.name}</b></td><td>${r.cls}</td><td>${r.board}</td><td><span class="pill green">${r.status}</span></td>
      <td><button class="btn btn-sm btn-outline">Edit</button></td></tr>`).join("") + `</tbody>`;

  /* Announcement history */
  $("#announce-history").innerHTML = `<thead><tr><th>Title</th><th>Audience</th><th>Date</th><th>Status</th></tr></thead><tbody>` +
    D.announcements.map((a)=>`<tr><td><b>${a.title}</b><div class="muted" style="font-size:.78rem">${a.via}</div></td><td>${a.audience}</td><td>${a.date}</td><td><span class="pill green">${a.status}</span></td></tr>`).join("") + `</tbody>`;
})();
