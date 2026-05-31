/* Commerce Wealth — mock data shared by dashboards (demo only) */
window.CW = (function () {
  "use strict";

  const student = {
    name: "Aarav Sharma",
    initials: "AS",
    roll: "CW-2026-0042",
    class: "12",
    board: "CBSE",
    batch: "Batch A — Evening",
    attendanceMonth: 86.4,
    attendanceOverall: 91.2,
    quizzesDone: 14,
    quizzesTotal: 18,
    rank: 5,
    rankTotal: 38,
    avgScore: 78.4,
    streak: 4,
  };

  // current-month attendance statuses (index = day 1..30), p/a/l/h/v
  const attendance = [
    "h","p","p","p","p","p","h","h","p","p","l","p","p","h","h",
    "p","a","p","p","p","h","h","p","p","p","v","p","h","h","p"
  ];

  const schedule = [
    { day: "Mon", subject: "Accountancy", time: "4:00 – 5:30 PM", faculty: "Vasu Sir" },
    { day: "Tue", subject: "Economics", time: "4:00 – 5:30 PM", faculty: "Aditya Sir" },
    { day: "Wed", subject: "Business Studies", time: "4:00 – 5:30 PM", faculty: "Aditya Sir" },
    { day: "Thu", subject: "Accountancy", time: "4:00 – 5:30 PM", faculty: "Vasu Sir" },
    { day: "Fri", subject: "Economics", time: "4:00 – 5:30 PM", faculty: "Aditya Sir" },
    { day: "Sat", subject: "Test / Revision", time: "10:00 AM – 12:00 PM", faculty: "Both" },
  ];

  const activity = [
    { ic: "📝", text: 'New Quiz: <b>Macro Economics — Chapter 3</b>', when: "Due 2 Jun 2026" },
    { ic: "📚", text: 'New Notes: <b>Partnership Accounts — Admission</b> by Vasu Sir', when: "2 days ago" },
    { ic: "🏆", text: "Leaderboard update: you moved up to <b>Rank #5</b>!", when: "3 days ago" },
    { ic: "📅", text: "Attendance marked <b>Present</b>", when: "29 May 2026" },
  ];

  const materials = [
    { t: "Partnership Accounts — Complete Notes", sub: "Accountancy", ch: "Ch. 2", type: "Notes", board: "All", by: "Vasu Sir", date: "28 May 2026", size: "2.4 MB" },
    { t: "Macro Economics — Money & Banking", sub: "Economics", ch: "Ch. 3", type: "Notes", board: "CBSE", by: "Aditya Sir", date: "25 May 2026", size: "1.8 MB" },
    { t: "Principles of Management — Solved Case Studies", sub: "Business Studies", ch: "Ch. 2", type: "Solved Examples", board: "All", by: "Aditya Sir", date: "22 May 2026", size: "3.1 MB" },
    { t: "Financial Statements — Practice Sheet Set 1", sub: "Accountancy", ch: "Ch. 8", type: "Practice Sheet", board: "CBSE", by: "Vasu Sir", date: "20 May 2026", size: "1.2 MB" },
    { t: "CBSE 2025 Board Paper — Economics (Solved)", sub: "Economics", ch: "All", type: "Previous Year Paper", board: "CBSE", by: "Aditya Sir", date: "15 May 2026", size: "4.5 MB" },
  ];

  const submissions = [
    { t: "Ch. 2 Assignment — Solved", sub: "Accountancy", on: "27 May 2026", status: "Reviewed", remark: "Good work. Revise Q5 format." },
    { t: "Macro Practice Set 1", sub: "Economics", on: "29 May 2026", status: "Submitted", remark: "—" },
  ];

  const quizzes = [
    { id: "q1", title: "Macro Economics — Money & Banking", ch: "Chapter 3 · Class 12 · CBSE", sub: "Economics", dur: 20, qs: 15, diff: "Medium", due: "2 Jun 2026", top: "14/15 (Ankit S.)" },
    { id: "q2", title: "Partnership — Goodwill Valuation", ch: "Chapter 2 · Class 12 · CBSE", sub: "Accountancy", dur: 25, qs: 20, diff: "Hard", due: "4 Jun 2026", top: "19/20 (Pooja D.)" },
    { id: "q3", title: "Principles of Management", ch: "Chapter 2 · Class 12 · All", sub: "Business Studies", dur: 15, qs: 10, diff: "Easy", due: "5 Jun 2026", top: "10/10 (Rohan K.)" },
  ];

  // a runnable demo quiz
  const demoQuiz = {
    title: "Macro Economics — Money & Banking",
    questions: [
      {
        q: "Which of the following is NOT a function of the Reserve Bank of India?",
        opts: ["Banker to the Government", "Issuing currency notes", "Accepting public deposits for savings", "Lender of last resort"],
        correct: 2,
        exp: "The RBI does not accept deposits from the general public; that is done by commercial banks. The RBI is the banker to banks and the government.",
      },
      {
        q: "The instrument used by the RBI to control the cost of credit is:",
        opts: ["Cash Reserve Ratio", "Repo Rate", "Open Market Operations", "Statutory Liquidity Ratio"],
        correct: 1,
        exp: "The Repo Rate is the rate at which the RBI lends to commercial banks, directly affecting the cost of credit in the economy.",
      },
      {
        q: "Money multiplier is equal to:",
        opts: ["1 / LRR", "LRR / 1", "1 − LRR", "LRR × Deposits"],
        correct: 0,
        exp: "Money multiplier = 1 / Legal Reserve Ratio (LRR). A lower LRR means a higher money multiplier.",
      },
      {
        q: "High-powered money includes:",
        opts: ["Only currency with the public", "Currency held by public + cash reserves of banks", "Demand deposits only", "Time deposits with banks"],
        correct: 1,
        exp: "High-powered money (M0) = currency held by the public + cash reserves of commercial banks held with the RBI.",
      },
      {
        q: "An increase in the CRR by the RBI will:",
        opts: ["Increase the lending capacity of banks", "Decrease the lending capacity of banks", "Have no effect on credit", "Increase money supply"],
        correct: 1,
        exp: "A higher Cash Reserve Ratio means banks must keep more reserves with the RBI, reducing the funds available for lending — contracting money supply.",
      },
    ],
  };

  const quizHistory = [
    { t: "Money & Banking", sub: "Economics", date: "28 May 2026", score: "12/15 (80%)", rank: "#3" },
    { t: "Partnership Fundamentals", sub: "Accountancy", date: "25 May 2026", score: "18/20 (90%)", rank: "#1 🥇" },
    { t: "Principles of Management", sub: "Business Studies", date: "22 May 2026", score: "8/10 (80%)", rank: "#5" },
    { t: "Demand & Supply", sub: "Economics", date: "18 May 2026", score: "14/15 (93%)", rank: "#2 🥈" },
  ];

  const leaderboard = [
    { rank: 1, change: "—", name: "Ankit S.", cls: "12", board: "CBSE", cw: 94.2, quiz: 92, att: 98, streak: "🔥 12d" },
    { rank: 2, change: "↑1", name: "Pooja D.", cls: "12", board: "CBSE", cw: 91.8, quiz: 89, att: 100, streak: "🔥 18d" },
    { rank: 3, change: "↓1", name: "Rohan K.", cls: "12", board: "ICSE", cw: 90.5, quiz: 95, att: 87, streak: "—" },
    { rank: 4, change: "↑2", name: "Sneha R.", cls: "12", board: "CBSE", cw: 88.3, quiz: 88, att: 94, streak: "🔥 7d" },
    { rank: 5, change: "—", name: "You (Aarav S.)", cls: "12", board: "CBSE", cw: 85.7, quiz: 80, att: 91, streak: "🔥 4d", me: true },
    { rank: 6, change: "↓1", name: "Arjun M.", cls: "12", board: "ICSE", cw: 84.1, quiz: 82, att: 89, streak: "—" },
    { rank: 7, change: "↑3", name: "Priya M.", cls: "11", board: "JAK", cw: 82.9, quiz: 85, att: 86, streak: "🔥 5d" },
    { rank: 8, change: "↓2", name: "Kabir N.", cls: "12", board: "CBSE", cw: 80.4, quiz: 78, att: 84, streak: "—" },
  ];

  const badges = [
    { e: "🔥", n: "Streak Master", d: "15+ day streak", earned: false },
    { e: "🧠", n: "Quiz Champion", d: "Top in 5+ quizzes", earned: true },
    { e: "📝", n: "Assignment Pro", d: "100% on-time / month", earned: true },
    { e: "🥇", n: "Subject Topper", d: "#1 in a subject", earned: false },
    { e: "⭐", n: "CW Star", d: "CW Score 90+ / month", earned: false },
    { e: "🎯", n: "Perfect Score", d: "100% on a quiz", earned: true },
    { e: "📚", n: "Bookworm", d: "20+ downloads", earned: true },
    { e: "🚀", n: "Rapid Riser", d: "+5 ranks in a week", earned: false },
  ];

  const chapterStrength = [
    { sub: "Accountancy", ch: "Partnership Fundamentals", n: 3, avg: 92, s: "Strong" },
    { sub: "Accountancy", ch: "Company Accounts", n: 2, avg: 88, s: "Strong" },
    { sub: "Accountancy", ch: "Cash Flow Statement", n: 1, avg: 65, s: "Needs Work" },
    { sub: "Economics", ch: "Demand & Supply", n: 3, avg: 93, s: "Strong" },
    { sub: "Economics", ch: "Money & Banking", n: 2, avg: 80, s: "Average" },
    { sub: "Economics", ch: "National Income", n: 2, avg: 72, s: "Average" },
    { sub: "Business Studies", ch: "Principles of Management", n: 2, avg: 80, s: "Average" },
    { sub: "Business Studies", ch: "Financial Markets", n: 1, avg: 60, s: "Needs Work" },
  ];

  const testHistory = [
    { t: "Monthly Test — May", type: "Cumulative", date: "25 May 2026", acc: "38/40", eco: "32/40", bs: "28/40", total: "98/120 (81.7%)", rank: "#4" },
    { t: "Weekly Test — Wk 3", type: "Chapter", date: "18 May 2026", acc: "18/20", eco: "—", bs: "15/20", total: "33/40 (82.5%)", rank: "#3" },
    { t: "Monthly Test — Apr", type: "Cumulative", date: "27 Apr 2026", acc: "35/40", eco: "30/40", bs: "26/40", total: "91/120 (75.8%)", rank: "#7" },
  ];

  // ----- staff data -----
  const staff = { name: "Vasu Sir", initials: "VS", subject: "Accountancy" };

  const staffToday = [
    { time: "10:00 AM", sub: "Accountancy", cls: "11", board: "CBSE", batch: "A", students: 18, status: "Completed" },
    { time: "2:00 PM", sub: "Economics", cls: "12", board: "CBSE", batch: "A", students: 16, status: "Upcoming" },
    { time: "4:00 PM", sub: "Business Studies", cls: "12", board: "ICSE", batch: "B", students: 14, status: "Upcoming" },
  ];

  const roster = [
    { roll: "CW-2026-0001", name: "Ankit S.", cls: "12", board: "CBSE", batch: "A", status: "Active" },
    { roll: "CW-2026-0002", name: "Sneha R.", cls: "12", board: "CBSE", batch: "A", status: "Active" },
    { roll: "CW-2026-0003", name: "Rohan K.", cls: "12", board: "ICSE", batch: "B", status: "Active" },
    { roll: "CW-2026-0004", name: "Pooja D.", cls: "12", board: "CBSE", batch: "A", status: "Active" },
    { roll: "CW-2026-0005", name: "Arjun M.", cls: "12", board: "ICSE", batch: "B", status: "Active" },
    { roll: "CW-2026-0006", name: "Priya M.", cls: "11", board: "JAK", batch: "A", status: "Active" },
    { roll: "CW-2026-0042", name: "Aarav Sharma", cls: "12", board: "CBSE", batch: "A", status: "Active" },
  ];

  const batchReport = [
    { name: "Ankit S.", att: 98, acc: 92, eco: 90, bs: 88, overall: 90, rank: "#1", trend: "↑" },
    { name: "Pooja D.", att: 100, acc: 94, eco: 85, bs: 87, overall: 88.7, rank: "#2", trend: "—" },
    { name: "Rohan K.", att: 87, acc: 88, eco: 95, bs: 82, overall: 88.3, rank: "#3", trend: "↑" },
    { name: "Sneha R.", att: 94, acc: 90, eco: 86, bs: 84, overall: 86.7, rank: "#4", trend: "↑" },
    { name: "Aarav Sharma", att: 91, acc: 84, eco: 80, bs: 78, overall: 80.7, rank: "#5", trend: "—" },
  ];

  const qbankRows = [
    { q: "Functions of RBI", correct: 93, wrong: "—", diff: "Easy" },
    { q: "Money multiplier formula", correct: 47, wrong: "Option C (53%)", diff: "Hard" },
    { q: "SLR vs CRR", correct: 80, wrong: "—", diff: "Medium" },
  ];

  const announcements = [
    { date: "28 May", title: "Holiday Notice", audience: "All", via: "Dashboard + WhatsApp", status: "Sent" },
    { date: "25 May", title: "Test Reminder", audience: "Class 12", via: "Dashboard", status: "Sent" },
  ];

  // ----- parent data -----
  const parent = { name: "Mr. Sharma", initials: "MS", child: "Aarav Sharma" };

  return {
    student, attendance, schedule, activity, materials, submissions,
    quizzes, demoQuiz, quizHistory, leaderboard, badges, chapterStrength, testHistory,
    staff, staffToday, roster, batchReport, qbankRows, announcements, parent,
  };
})();
