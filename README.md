# 🌸 EventFlora — Modern Responsive Event Management Platform

> **K Explore Web Designing Task**: Design and Develop a Modern, Visually Appealing, and Fully Responsive Event Management Website.

![EventFlora Platform Preview](https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80)

---

## 📌 Project Overview

**EventFlora** is an enterprise-grade, responsive event discovery and registration web application designed to connect creators, developers, designers, and professionals with world-class summits, masterclasses, and conferences.

Built using semantic **HTML5**, a modern **CSS3** design system with fluid typography and dark/light modes, and modular **vanilla JavaScript (ES6+)**, EventFlora delivers a seamless app-like experience with zero external dependencies or build tooling.

---

## 🚀 Live Demo & Repository Links

| Resource | Link |
| :--- | :--- |
| **GitHub Repository** | [https://github.com/Aadityabarnwal0144/event-flora](https://github.com/Aadityabarnwal0144/event-flora) |
| **Live Deployed Website (GitHub Pages)** | [https://aadityabarnwal0144.github.io/event-flora/](https://aadityabarnwal0144.github.io/event-flora/) |
| **Alternative Deployed Link (Vercel / Netlify)** | *https://event-flora.vercel.app* |

---

## ✨ Core Features & Highlights

### 1. 🎯 Dynamic Hero Section & Platform Stats
- **Compelling Value Proposition**: Bold gradient typography and ambient backdrop glow.
- **Hero Quick Search Widget**: Integrated search input, category selector dropdown, and instant jump CTA.
- **Live Platform Metrics**: Dynamic counters for upcoming events, available passes, total community members, and satisfaction rating.

### 2. ⏳ Featured Spotlight with Real-Time Countdown Timer
- **Live Ticker Engine**: Dedicated JavaScript countdown calculating days, hours, minutes, and seconds until keynote kickoff.
- **Direct VIP Reservation**: One-click pass reservation CTA opening the pre-configured registration modal.

### 3. 🔍 Discovery Hub: Multi-Faceted Search, Filter & Sort
- **Real-Time Live Search**: Debounced instant search across event titles, venues, locations, descriptions, and speaker names.
- **Category Filter Pills**: Interactive category chips with real-time badge counts:
  - 🌐 *All Events*
  - 🤖 *Technology & AI*
  - 🎨 *Design & UX*
  - 🎵 *Music & Arts*
  - 💼 *Business & Startups*
  - 🎮 *Gaming & Esports*
  - 📚 *Workshops & Masterclasses*
- **Secondary Filters**:
  - **Date Filter**: All Dates, Next 14 Days, This Month.
  - **Price Filter**: All Events, Free Events Only, Paid Passes Only.
  - **Sorting**: Date (Nearest/Furthest), Price (Low-to-High / High-to-Low), Popularity / Seats, Alphabetical.
- **Layout Switcher**: Seamless toggle between **Grid View** and **List View**.
- **Favorite / Bookmark Heart**: Save events to browser LocalStorage with pulse feedback.

### 4. 📋 Interactive Event Details Modal
- **Comprehensive Event Profile**:
  - High-resolution hero banner with date chips and category tags.
  - Key info grid: Date, Time, Venue, Location, and Remaining Seats status.
  - Detailed overview and learning outcomes.
  - **Interactive Agenda Timeline**: Chronological track breakdown with time, session titles, and host names.
  - **Keynote Speakers Cards**: Profiles featuring speaker avatars, roles, and company affiliations.
  - **Perks Checklist**: Included perks (swag, meals, certificates, networking access).
  - Social share action and direct "Proceed to Register" CTA.

### 5. ✍️ Robust Registration Form & Client-Side Validation
- **Structured Fields**:
  - Selected Event (auto pre-selected from card or chosen via dropdown).
  - Attendee Full Name (min 3 characters, alphabetical and standard names only).
  - Email Address (RFC 5322 regex validation).
  - Phone Number (valid international or 10-digit number format).
  - Pass Tier (Standard, VIP All-Access, Student Pass with dynamic discounts).
  - Ticket Quantity (1 to 5 seats with real-time seat boundary checks).
  - Dietary / Accessibility Notes (optional).
  - Terms & Code of Conduct acceptance checkbox.
- **Real-Time Visual Validation**:
  - Green border and checkmark indicator on valid fields (`.is-valid`).
  - Red border, alert icon, and clear helper error messages on invalid input (`.is-invalid`).
  - Capacity check preventing overbooking past remaining seats.
- **Live Price Calculator**: Real-time breakdown calculating total price based on tier and quantity.

### 6. 🎟️ Digital Admission E-Ticket (Pass Generation)
- **Post-Registration Confirmation View**:
  - Celebration badge animation.
  - Official Digital E-Ticket featuring unique ticket ID (e.g., `EF-2026-83921`).
  - Attendee name, event details, venue, time, and seat count.
  - Simulated vector Barcode and QR-Code pass preview.
  - **Print / Save Pass**: Custom `@media print` CSS stylesheet cleanly formatting the ticket for physical badge printing or PDF export.
  - **Add to Calendar (.ics)**: Downloads a standard `.ics` calendar file to import directly into Google Calendar, Apple Calendar, or Outlook.

### 7. 🗄️ LocalStorage-Based Data Management (Bonus Challenge)
- **"My Booked Passes" Slide-Over Drawer**:
  - Dedicated slide-over drawer accessible from the navbar with an active counter badge.
  - Lists all registrations stored in browser `localStorage`.
  - Download `.ics` calendar invitation for any booked pass anytime.
  - **Cancel Registration**: Allows cancelling a booking with confirmation, immediately removing it from LocalStorage and restoring available seat capacity to the event in real-time!
- **Favorites Storage**: Persistently records bookmarked events.
- **Theme Preference Storage**: Stores user dark/light mode preference across page reloads.

### 8. 🌓 Dark / Light Mode (Bonus Challenge)
- Native CSS Custom Properties (`:root` and `:root[data-theme="light"]`).
- Smooth 0.28s theme transitions with glowing neon accents in dark mode and clean editorial styling in light mode.
- Accessible theme toggle button with SVG sun/moon animation.

---

## 🛠️ Technical Stack

- **HTML5**: Semantic landmark tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>`), accessibility ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-label`).
- **CSS3**:
  - Custom Design System Tokens (CSS Variables).
  - CSS Flexbox & CSS Grid layouts.
  - Glassmorphism effects (`backdrop-filter: blur(16px)`).
  - Responsive media queries (mobile, tablet, desktop).
  - Print styling (`@media print`).
- **JavaScript (ES6+)**:
  - Clean modular architecture (`data.js`, `storage.js`, `validation.js`, `app.js`).
  - Event-driven state management.
  - Native browser `localStorage` API.
  - Dynamic DOM manipulation with performance debouncing.
  - Blob & URL Object API for client-side `.ics` calendar file generation.
- **Version Control**: Git & GitHub.

---

## 📂 Project Structure

```text
event-flora/
│
├── index.html              # Main semantic HTML5 webpage
│
├── css/
│   └── styles.css          # Design system, CSS variables, dark/light themes, print rules
│
├── js/
│   ├── data.js             # 12+ realistic mock events dataset across 6 categories
│   ├── storage.js          # LocalStorage CRUD service (tickets, favorites, theme, seats)
│   ├── validation.js       # Form validation engine with regex patterns and error hints
│   └── app.js              # Application controller, filters, modals, countdown, UI logic
│
├── assets/                 # Project icons and imagery assets
│
├── .gitignore              # Standard git exclusion rules
└── README.md               # Detailed project documentation & deployment guide
```

---

## 📋 JavaScript Form Validation Specifications

| Field | Validation Rule | Regex Pattern | Error Feedback |
| :--- | :--- | :--- | :--- |
| **Full Name** | Required, letters and spaces only, min 3 chars | `/^[a-zA-Z\s'.]{3,60}$/` | *"Name must contain at least 3 letters (letters and spaces only)."* |
| **Email Address** | Required, valid email domain format | RFC 5322 pattern | *"Please enter a valid email address (e.g., user@example.com)."* |
| **Phone Number** | Required, valid format with at least 10 digits | `/^(\+?[0-9]{1,4}[\s-]?)?...$/` | *"Please enter a valid phone number (10 digits minimum)."* |
| **Event Selection** | Required, valid event from dropdown | Non-empty string | *"Please select an event to attend."* |
| **Ticket Count** | Integer between 1 and 5, must not exceed seats | `num >= 1 && num <= 5` | *"Please select between 1 and 5 tickets."* |
| **Terms Agreement**| Required checkbox | `checked === true` | *"You must agree to the Event Code of Conduct and Terms."* |

---

## 💻 Local Development Setup

To run and inspect the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aadityabarnwal0144/event-flora.git
   cd event-flora
   ```

2. **Open in Browser**:
   - Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
   - Or run a lightweight local server:
     ```bash
     # Using Python:
     python -m http.server 8000
     ```
   - Open `http://localhost:8000` in your browser.

---

## 🌐 Step-by-Step GitHub Push & Deployment Guide

### Push to GitHub (`main` Branch)
Run the following commands in the project folder:
```bash
git branch -M main
git remote add origin https://github.com/Aadityabarnwal0144/event-flora.git
git push -u origin main
```

### Enable GitHub Pages (1-Click, Free Hosting)
1. On GitHub, navigate to your repository [event-flora](https://github.com/Aadityabarnwal0144/event-flora).
2. Go to the **Settings** tab.
3. Select **Pages** on the left navigation bar.
4. Under **Build and deployment** > **Branch**, choose `main` branch and `/ (root)` folder.
5. Click **Save**.
6. Within 1–2 minutes, your website is live at:
   **`https://aadityabarnwal0144.github.io/event-flora/`**

---

## 🏆 Bonus Challenge Evaluation Matrix

| Challenge Requirement | Implementation in EventFlora | Status |
| :--- | :--- | :---: |
| **Dark / Light Mode** | Custom CSS properties toggle with persistent `localStorage` theme state | ✅ Implemented |
| **Event Countdown Timers** | Real-time live countdown calculating days, hours, mins, secs | ✅ Implemented |
| **Micro-Animations & Transitions** | Ambient glows, card hover lifts, badge pulses, toast alerts, modal slide-ins | ✅ Implemented |
| **LocalStorage Registration Management** | "My Tickets" drawer, unique ticket IDs, seat decrement/restoration, cancel bookings | ✅ Implemented |
| **Digital Pass / Ticket Generator** | Simulated QR Code, Barcode, printable ticket view via `@media print` | ✅ Implemented |
| **Calendar (.ics) Integration** | Dynamic iCalendar `.ics` file generation and download | ✅ Implemented |
| **Favorites / Bookmarking** | Heart toggle button saving favorite events to LocalStorage | ✅ Implemented |

---

## 👨‍💻 Submission Details

- **Task Title**: Design and Develop a Responsive Event Management Website
- **Repository**: [https://github.com/Aadityabarnwal0144/event-flora](https://github.com/Aadityabarnwal0144/event-flora)
- **Deployed Website**: [https://aadityabarnwal0144.github.io/event-flora/](https://aadityabarnwal0144.github.io/event-flora/)
- **Technology Stack**: HTML5, CSS3, Modern JavaScript (ES6+), Git & GitHub
- **Submission Date**: November 2026

*Crafted with precision for the K Explore Web Designing Challenge.*
