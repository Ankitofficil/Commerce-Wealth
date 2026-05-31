# Commerce Wealth — Website

A complete website for **Commerce Wealth**, a Class 11 & 12 Commerce coaching institute in
Jamshedpur (CBSE · ICSE · JAK Board). Built as a fast, dependency-free static site —
just open the HTML files in a browser, no build step required.

## Quick start

Open `index.html` in any modern browser. That's it.

> Tip: for the dashboards and quiz to load their charts from the CDN reliably, you can
> serve the folder over a tiny local server instead of `file://`:
>
> ```powershell
> # from this folder
> python -m http.server 8000
> # then visit http://localhost:8000
> ```

## Pages

| Page | File | What it covers |
|------|------|----------------|
| Home | `index.html` | Hero, why-us, subjects, boards, founders, testimonials, CTA |
| About | `about.html` | Story, mission, values, founder profiles, comparison, track record |
| Courses | `courses.html` | Accountancy / Economics / Business Studies syllabi, board approach, batches |
| Results | `results.html` | Result highlights, year-wise table, detailed testimonials |
| Contact | `contact.html` | Enquiry form, contact info, Google Map embed, FAQ accordion |
| Blog | `blog.html` | "The Commerce Corner" article grid |
| Login | `login.html` | Three-tab portal: Student / Staff / Parent |
| Student Dashboard | `student-dashboard.html` | Home, attendance calendar, notes, **runnable quiz**, leaderboard, performance charts, settings |
| Staff Dashboard | `staff-dashboard.html` | Mark attendance, upload materials, quiz manager + analytics, reports, student manager, announcements |
| Parent Portal | `parent-dashboard.html` | Attendance, performance report, scores, materials, message faculty, settings |

## Demo login

Credentials are pre-filled on `login.html` — just click any **Login** button to enter
the matching dashboard. (No real authentication; this is a front-end demo.)

## Try these

- **Student → Quizzes → Start Quiz** — a fully working 5-question timed quiz with
  scoring and detailed solutions.
- **Student → My Performance** — radar + trend charts (Chart.js).
- **Staff → Mark Attendance** — toggle Present/Absent/Late per student.
- **Parent → Performance Report** — month-on-month comparison chart.

## Project structure

```
index.html, about.html, courses.html, results.html, contact.html, blog.html
login.html
student-dashboard.html, staff-dashboard.html, parent-dashboard.html
css/
  styles.css       # design system + all public-page styles
  dashboard.css    # dashboard shell, tables, calendar, quiz, leaderboard
js/
  main.js          # public site: nav, FAQ, demo forms
  data.js          # mock data shared by all dashboards
  dashboard.js     # shared sidebar / panel switching / mobile menu
  student.js       # student dashboard rendering + quiz engine
  staff.js         # staff dashboard rendering
  parent.js        # parent dashboard rendering
```

## Tech

- Plain HTML5, CSS3 (custom properties, grid/flex), vanilla JavaScript — no framework, no build.
- [Chart.js](https://www.chartjs.org/) via CDN for performance charts.
- Google Fonts: Poppins, Inter, Roboto Mono.

## Brand

Navy `#1B2A4A` · Gold `#F0A500` · Emerald `#1B7A5A`.

## Notes / next steps

This is the front-end. To make it production-ready you'd add:

- A backend + database for real authentication, attendance, quizzes and uploads.
- Wire the demo forms (`data-demo`) to real endpoints.
- Replace placeholder phone numbers, address, map coordinates and student data.
- File storage for PDF notes/uploads and WhatsApp/SMS notification integration.

Content source: `Commerce_Wealth_Website_Content.md`.
