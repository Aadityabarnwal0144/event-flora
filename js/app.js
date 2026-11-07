/**
 * EventFlora - Main Application Controller
 * Handles UI interactions, rendering, dynamic filters, modals, countdown timers,
 * LocalStorage ticket management, calendar exports, and theme toggling.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---- APPLICATION STATE ----
  const state = {
    events: [...EVENTS_DATA],
    categories: [...EVENT_CATEGORIES],
    currentCategory: "all",
    searchQuery: "",
    dateFilter: "all",
    priceFilter: "all",
    sortBy: "date-asc",
    viewMode: "grid",
    activeEventDetail: null,
    activeRegisterEvent: null,
    countdownTimerId: null
  };

  // ---- DOM ELEMENTS ----
  const elements = {
    // Theme
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    themeIcon: document.getElementById("themeIcon"),

    // Nav & Stats
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    navMenu: document.getElementById("navMenu"),
    myTicketsBtn: document.getElementById("myTicketsBtn"),
    ticketsBadge: document.getElementById("ticketsBadge"),
    heroSearchInput: document.getElementById("heroSearchInput"),
    heroCategorySelect: document.getElementById("heroCategorySelect"),
    heroSearchBtn: document.getElementById("heroSearchBtn"),

    // Featured Countdown
    countdownDays: document.getElementById("countdownDays"),
    countdownHours: document.getElementById("countdownHours"),
    countdownMins: document.getElementById("countdownMins"),
    countdownSecs: document.getElementById("countdownSecs"),
    featuredEventCard: document.getElementById("featuredEventCard"),

    // Filters & Search
    categoryPillsContainer: document.getElementById("categoryPills"),
    searchInput: document.getElementById("searchInput"),
    clearSearchBtn: document.getElementById("clearSearchBtn"),
    dateFilterSelect: document.getElementById("dateFilterSelect"),
    priceFilterSelect: document.getElementById("priceFilterSelect"),
    sortSelect: document.getElementById("sortSelect"),
    resultsCount: document.getElementById("resultsCount"),
    viewGridBtn: document.getElementById("viewGridBtn"),
    viewListBtn: document.getElementById("viewListBtn"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),

    // Events Grid & States
    eventsGrid: document.getElementById("eventsGrid"),
    noResultsState: document.getElementById("noResultsState"),

    // Event Detail Modal
    detailModal: document.getElementById("detailModal"),
    closeDetailModalBtn: document.getElementById("closeDetailModalBtn"),
    detailContent: document.getElementById("detailModalContent"),

    // Registration Modal
    registerModal: document.getElementById("registerModal"),
    closeRegisterModalBtn: document.getElementById("closeRegisterModalBtn"),
    registrationForm: document.getElementById("registrationForm"),
    regEventSelect: document.getElementById("regEventSelect"),
    regFullName: document.getElementById("regFullName"),
    regEmail: document.getElementById("regEmail"),
    regPhone: document.getElementById("regPhone"),
    regTicketType: document.getElementById("regTicketType"),
    regTicketCount: document.getElementById("regTicketCount"),
    regSpecialNotes: document.getElementById("regSpecialNotes"),
    regTermsCheck: document.getElementById("regTermsCheck"),
    priceBreakdownText: document.getElementById("priceBreakdownText"),
    totalAmountText: document.getElementById("totalAmountText"),
    submitRegistrationBtn: document.getElementById("submitRegistrationBtn"),
    registrationFormContainer: document.getElementById("registrationFormContainer"),
    registrationSuccessContainer: document.getElementById("registrationSuccessContainer"),
    digitalPassContainer: document.getElementById("digitalPassContainer"),

    // My Tickets Drawer
    ticketsDrawer: document.getElementById("ticketsDrawer"),
    closeTicketsDrawerBtn: document.getElementById("closeTicketsDrawerBtn"),
    ticketsDrawerList: document.getElementById("ticketsDrawerList"),
    ticketsEmptyState: document.getElementById("ticketsEmptyState"),

    // Toast Container
    toastContainer: document.getElementById("toastContainer")
  };

  // ==========================================
  // 1. INITIALIZATION
  // ==========================================
  function initApp() {
    initTheme();
    renderCategoryFilters();
    populateEventSelects();
    initFeaturedCountdown();
    renderEvents();
    updateTicketsBadge();
    bindEventListeners();
    updateLiveStats();
  }

  // ==========================================
  // 2. THEME ENGINE (Dark / Light Mode)
  // ==========================================
  function initTheme() {
    const savedTheme = StorageService.getTheme();
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    StorageService.setTheme(theme);
    if (elements.themeIcon) {
      if (theme === "light") {
        elements.themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        elements.themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
        elements.themeToggleBtn.setAttribute("aria-label", "Switch to Dark Mode");
      } else {
        elements.themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        elements.themeToggleBtn.setAttribute("title", "Switch to Light Mode");
        elements.themeToggleBtn.setAttribute("aria-label", "Switch to Light Mode");
      }
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} mode`, "info");
  }

  // ==========================================
  // 3. FEATURED EVENT COUNTDOWN TIMER
  // ==========================================
  function initFeaturedCountdown() {
    // Find first featured event
    const featured = state.events.find((e) => e.featured) || state.events[0];
    if (!featured) return;

    const targetDate = new Date(featured.endDate || featured.date).getTime();

    function updateTicker() {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        if (elements.countdownDays) elements.countdownDays.textContent = "00";
        if (elements.countdownHours) elements.countdownHours.textContent = "00";
        if (elements.countdownMins) elements.countdownMins.textContent = "00";
        if (elements.countdownSecs) elements.countdownSecs.textContent = "00";
        clearInterval(state.countdownTimerId);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      if (elements.countdownDays) elements.countdownDays.textContent = String(days).padStart(2, "0");
      if (elements.countdownHours) elements.countdownHours.textContent = String(hours).padStart(2, "0");
      if (elements.countdownMins) elements.countdownMins.textContent = String(mins).padStart(2, "0");
      if (elements.countdownSecs) elements.countdownSecs.textContent = String(secs).padStart(2, "0");
    }

    updateTicker();
    if (state.countdownTimerId) clearInterval(state.countdownTimerId);
    state.countdownTimerId = setInterval(updateTicker, 1000);
  }

  // ==========================================
  // 4. STATS & SELECT POPULATION
  // ==========================================
  function updateLiveStats() {
    const totalEventsCount = state.events.length;
    const totalSeatsLeft = state.events.reduce((acc, evt) => {
      const remaining = getRemainingSeats(evt);
      return acc + remaining;
    }, 0);

    const statsCounter = document.getElementById("statTotalEvents");
    if (statsCounter) statsCounter.textContent = `${totalEventsCount}+`;

    const seatsCounter = document.getElementById("statAvailableSeats");
    if (seatsCounter) seatsCounter.textContent = `${totalSeatsLeft}`;
  }

  function populateEventSelects() {
    // Populate Hero Category Dropdown
    if (elements.heroCategorySelect) {
      elements.heroCategorySelect.innerHTML = `<option value="all">All Categories</option>`;
      state.categories.forEach((cat) => {
        if (cat.id !== "all") {
          const opt = document.createElement("option");
          opt.value = cat.id;
          opt.textContent = cat.label;
          elements.heroCategorySelect.appendChild(opt);
        }
      });
    }

    // Populate Registration Modal Event Dropdown
    if (elements.regEventSelect) {
      elements.regEventSelect.innerHTML = `<option value="">-- Choose an Event to Register --</option>`;
      state.events.forEach((evt) => {
        const remaining = getRemainingSeats(evt);
        const opt = document.createElement("option");
        opt.value = evt.id;
        opt.textContent = `${evt.title} (${formatEventDate(evt.date)}) - ${remaining > 0 ? remaining + " seats left" : "SOLD OUT"}`;
        if (remaining <= 0) opt.disabled = true;
        elements.regEventSelect.appendChild(opt);
      });
    }
  }

  function getRemainingSeats(event) {
    const adjusted = StorageService.getSeatAdjustment(event.id);
    const remaining = event.totalSeats - (event.bookedSeats + adjusted);
    return Math.max(0, remaining);
  }

  // ==========================================
  // 5. CATEGORY CHIPS RENDERING
  // ==========================================
  function renderCategoryFilters() {
    if (!elements.categoryPillsContainer) return;

    elements.categoryPillsContainer.innerHTML = "";
    state.categories.forEach((cat) => {
      const count =
        cat.id === "all"
          ? state.events.length
          : state.events.filter((e) => e.category === cat.id).length;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `category-pill ${state.currentCategory === cat.id ? "active" : ""}`;
      btn.setAttribute("data-category", cat.id);
      btn.innerHTML = `
        <span class="pill-label">${cat.label}</span>
        <span class="pill-count">${count}</span>
      `;

      btn.addEventListener("click", () => {
        state.currentCategory = cat.id;
        document.querySelectorAll(".category-pill").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        renderEvents();
      });

      elements.categoryPillsContainer.appendChild(btn);
    });
  }

  // ==========================================
  // 6. FILTERING & SORTING PIPELINE
  // ==========================================
  function getFilteredAndSortedEvents() {
    let filtered = [...state.events];

    // 1. Category Filter
    if (state.currentCategory !== "all") {
      filtered = filtered.filter((evt) => evt.category === state.currentCategory);
    }

    // 2. Search Query (Title, Venue, Location, Description, Category)
    if (state.searchQuery.trim() !== "") {
      const query = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter((evt) => {
        return (
          evt.title.toLowerCase().includes(query) ||
          evt.venue.toLowerCase().includes(query) ||
          evt.location.toLowerCase().includes(query) ||
          evt.description.toLowerCase().includes(query) ||
          evt.categoryLabel.toLowerCase().includes(query) ||
          evt.speakers.some((s) => s.name.toLowerCase().includes(query))
        );
      });
    }

    // 3. Date Filter
    if (state.dateFilter !== "all") {
      const today = new Date();
      filtered = filtered.filter((evt) => {
        const evtDate = new Date(evt.date);
        if (state.dateFilter === "soon") {
          // next 14 days
          const diffDays = (evtDate - today) / (1000 * 60 * 60 * 24);
          return diffDays >= -1 && diffDays <= 14;
        } else if (state.dateFilter === "month") {
          return evtDate.getMonth() === today.getMonth() && evtDate.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }

    // 4. Price Filter
    if (state.priceFilter === "free") {
      filtered = filtered.filter((evt) => evt.isFree || evt.price === 0);
    } else if (state.priceFilter === "paid") {
      filtered = filtered.filter((evt) => !evt.isFree && evt.price > 0);
    }

    // 5. Sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popularity":
          return (b.bookedSeats || 0) - (a.bookedSeats || 0);
        case "title-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }

  // ==========================================
  // 7. EVENTS RENDERING
  // ==========================================
  function renderEvents() {
    const list = getFilteredAndSortedEvents();

    // Update Result count
    if (elements.resultsCount) {
      elements.resultsCount.textContent = `Showing ${list.length} of ${state.events.length} events`;
    }

    // Toggle Empty State
    if (list.length === 0) {
      if (elements.eventsGrid) elements.eventsGrid.style.display = "none";
      if (elements.noResultsState) elements.noResultsState.style.display = "flex";
      return;
    } else {
      if (elements.eventsGrid) elements.eventsGrid.style.display = state.viewMode === "grid" ? "grid" : "flex";
      if (elements.noResultsState) elements.noResultsState.style.display = "none";
    }

    // Set grid or list layout
    if (elements.eventsGrid) {
      elements.eventsGrid.className = state.viewMode === "grid" ? "events-grid" : "events-list-view";
      elements.eventsGrid.innerHTML = "";

      list.forEach((event, index) => {
        const card = createEventCard(event, index);
        elements.eventsGrid.appendChild(card);
      });
    }
  }

  function createEventCard(event, index) {
    const remainingSeats = getRemainingSeats(event);
    const isSoldOut = remainingSeats <= 0;
    const isSellingFast = remainingSeats > 0 && remainingSeats <= 25;
    const isFav = StorageService.isFavorite(event.id);

    const percentBooked = Math.min(
      100,
      Math.round(((event.totalSeats - remainingSeats) / event.totalSeats) * 100)
    );

    const card = document.createElement("article");
    card.className = `event-card ${event.featured ? "is-featured" : ""}`;
    card.style.animationDelay = `${(index % 8) * 0.05}s`;

    // Date formatted
    const dateObj = new Date(event.date + "T00:00:00");
    const monthStr = dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const dayStr = dateObj.getDate();

    card.innerHTML = `
      <div class="card-media">
        <img src="${event.image}" alt="${event.title}" loading="lazy" class="card-img" />
        <div class="card-media-overlay"></div>
        
        <div class="date-badge">
          <span class="date-month">${monthStr}</span>
          <span class="date-day">${dayStr}</span>
        </div>

        <button class="favorite-btn ${isFav ? "is-favorited" : ""}" 
                data-id="${event.id}" 
                title="${isFav ? "Remove from Saved" : "Save Event"}" 
                aria-label="Save ${event.title}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <div class="card-badges-top">
          <span class="category-chip category-${event.category}">${event.categoryLabel}</span>
          ${event.isFree ? '<span class="price-chip free-chip">FREE</span>' : `<span class="price-chip">$${event.price}</span>`}
          ${isSellingFast ? '<span class="status-chip selling-fast">Selling Fast!</span>' : ""}
          ${isSoldOut ? '<span class="status-chip sold-out">Sold Out</span>' : ""}
        </div>
      </div>

      <div class="card-content">
        <div class="card-meta-line">
          <span class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${event.time}
          </span>
          <span class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${event.location}
          </span>
        </div>

        <h3 class="card-title">${event.title}</h3>
        <p class="card-desc">${event.tagline || event.description.substring(0, 110) + "..."}</p>

        <div class="capacity-bar-wrap">
          <div class="capacity-labels">
            <span>Seats Status</span>
            <span class="${remainingSeats < 20 ? "text-warning" : "text-subtle"}">
              ${isSoldOut ? "0 available" : `${remainingSeats} / ${event.totalSeats} left`}
            </span>
          </div>
          <div class="capacity-track">
            <div class="capacity-fill ${percentBooked > 85 ? "fill-critical" : ""}" style="width: ${percentBooked}%;"></div>
          </div>
        </div>

        <div class="card-actions">
          <button type="button" class="btn btn-outline btn-sm view-detail-btn" data-id="${event.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            View Details
          </button>
          
          <button type="button" class="btn btn-primary btn-sm register-card-btn" data-id="${event.id}" ${isSoldOut ? "disabled" : ""}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7.5" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            ${isSoldOut ? "Sold Out" : "Register Now"}
          </button>
        </div>
      </div>
    `;

    // Bind Favorite Click
    const favBtn = card.querySelector(".favorite-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const res = StorageService.toggleFavorite(event.id);
      favBtn.classList.toggle("is-favorited", res.added);
      const icon = favBtn.querySelector("svg");
      if (res.added) {
        icon.setAttribute("fill", "currentColor");
        showToast(`Saved "${event.title}" to your favorites`, "success");
      } else {
        icon.setAttribute("fill", "none");
        showToast(`Removed from favorites`, "info");
      }
    });

    // Bind Details Click
    const detailBtn = card.querySelector(".view-detail-btn");
    detailBtn.addEventListener("click", () => openDetailModal(event));

    // Bind Register Click
    const regBtn = card.querySelector(".register-card-btn");
    if (regBtn && !isSoldOut) {
      regBtn.addEventListener("click", () => openRegisterModal(event));
    }

    return card;
  }

  // ==========================================
  // 8. EVENT DETAIL MODAL
  // ==========================================
  function openDetailModal(event) {
    state.activeEventDetail = event;
    const remaining = getRemainingSeats(event);
    const isSoldOut = remaining <= 0;

    const formattedDate = formatFullDate(event.date);

    elements.detailContent.innerHTML = `
      <div class="modal-detail-banner">
        <img src="${event.image}" alt="${event.title}" class="detail-banner-img" />
        <div class="detail-banner-gradient"></div>
        <div class="detail-banner-info">
          <div class="banner-tags">
            <span class="category-chip category-${event.category}">${event.categoryLabel}</span>
            <span class="price-chip ${event.isFree ? "free-chip" : ""}">${event.isFree ? "FREE ENTRY" : "$" + event.price}</span>
            ${event.featured ? '<span class="status-chip is-featured-badge">Featured Event</span>' : ""}
          </div>
          <h2 class="detail-title">${event.title}</h2>
          <p class="detail-tagline">${event.tagline || ""}</p>
        </div>
      </div>

      <div class="modal-detail-body">
        <!-- Key Info Grid -->
        <div class="detail-quick-grid">
          <div class="quick-info-box">
            <div class="quick-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <span class="quick-label">Date</span>
              <strong class="quick-val">${formattedDate}</strong>
            </div>
          </div>

          <div class="quick-info-box">
            <div class="quick-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <span class="quick-label">Time & Schedule</span>
              <strong class="quick-val">${event.time}</strong>
            </div>
          </div>

          <div class="quick-info-box">
            <div class="quick-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <span class="quick-label">Venue</span>
              <strong class="quick-val">${event.venue} (${event.location})</strong>
            </div>
          </div>

          <div class="quick-info-box">
            <div class="quick-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <span class="quick-label">Capacity Status</span>
              <strong class="quick-val ${remaining < 25 ? "text-warning" : ""}">${isSoldOut ? "Sold Out" : `${remaining} Seats Remaining`}</strong>
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="detail-section">
          <h3 class="section-heading">About This Event</h3>
          <p class="section-prose">${event.description}</p>
        </div>

        <!-- Agenda Section -->
        ${
          event.agenda && event.agenda.length > 0
            ? `
          <div class="detail-section">
            <h3 class="section-heading">Event Schedule & Agenda</h3>
            <div class="agenda-timeline">
              ${event.agenda
                .map(
                  (item) => `
                <div class="agenda-item">
                  <div class="agenda-time">${item.time}</div>
                  <div class="agenda-dot"></div>
                  <div class="agenda-info">
                    <strong class="agenda-title">${item.title}</strong>
                    <span class="agenda-speaker">${item.speaker}</span>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Speakers Section -->
        ${
          event.speakers && event.speakers.length > 0
            ? `
          <div class="detail-section">
            <h3 class="section-heading">Featured Speakers & Hosts</h3>
            <div class="speakers-grid">
              ${event.speakers
                .map(
                  (spk) => `
                <div class="speaker-card">
                  <img src="${spk.avatar}" alt="${spk.name}" class="speaker-avatar" />
                  <div class="speaker-details">
                    <strong class="speaker-name">${spk.name}</strong>
                    <span class="speaker-role">${spk.role}</span>
                    <span class="speaker-company">${spk.company}</span>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Perks Section -->
        ${
          event.perks && event.perks.length > 0
            ? `
          <div class="detail-section">
            <h3 class="section-heading">What's Included in Your Ticket</h3>
            <ul class="perks-list">
              ${event.perks
                .map(
                  (perk) => `
                <li class="perk-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>${perk}</span>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
        `
            : ""
        }

        <!-- Modal Footer CTA -->
        <div class="detail-modal-footer">
          <div class="detail-pricing-summary">
            <span class="price-prefix">Ticket Price:</span>
            <strong class="price-large">${event.isFree ? "Free Admission" : "$" + event.price}</strong>
            <span class="price-seats-hint">(${remaining} seats available)</span>
          </div>
          
          <div class="detail-footer-btns">
            <button type="button" class="btn btn-secondary share-event-btn" data-id="${event.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
            <button type="button" class="btn btn-primary modal-direct-register-btn" ${isSoldOut ? "disabled" : ""}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7.5" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              ${isSoldOut ? "Sold Out" : "Proceed to Register"}
            </button>
          </div>
        </div>
      </div>
    `;

    // Bind direct register inside modal
    const regBtn = elements.detailContent.querySelector(".modal-direct-register-btn");
    if (regBtn && !isSoldOut) {
      regBtn.addEventListener("click", () => {
        closeDetailModal();
        openRegisterModal(event);
      });
    }

    // Bind share
    const shareBtn = elements.detailContent.querySelector(".share-event-btn");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          showToast("Event link copied to clipboard!", "success");
        } else {
          showToast(`Share: ${event.title}`, "info");
        }
      });
    }

    elements.detailModal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeDetailModal() {
    if (elements.detailModal) elements.detailModal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    state.activeEventDetail = null;
  }

  // ==========================================
  // 9. REGISTRATION MODAL & FORM LOGIC
  // ==========================================
  function openRegisterModal(preSelectedEvent = null) {
    // Reset form & views
    elements.registrationForm.reset();
    resetAllValidationStates();

    elements.registrationFormContainer.style.display = "block";
    elements.registrationSuccessContainer.style.display = "none";

    // Set selected event
    if (preSelectedEvent) {
      state.activeRegisterEvent = preSelectedEvent;
      if (elements.regEventSelect) elements.regEventSelect.value = preSelectedEvent.id;
    } else {
      const selectedId = elements.regEventSelect ? elements.regEventSelect.value : "";
      state.activeRegisterEvent = state.events.find((e) => e.id === selectedId) || null;
    }

    calculateTotalRegistrationPrice();

    elements.registerModal.classList.add("is-open");
    document.body.classList.add("modal-open");

    // Auto-focus name field for great UX
    setTimeout(() => {
      if (elements.regFullName) elements.regFullName.focus();
    }, 150);
  }

  function closeRegisterModal() {
    if (elements.registerModal) elements.registerModal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    state.activeRegisterEvent = null;
  }

  function calculateTotalRegistrationPrice() {
    const eventId = elements.regEventSelect ? elements.regEventSelect.value : "";
    const event = state.events.find((e) => e.id === eventId);
    state.activeRegisterEvent = event;

    if (!event) {
      if (elements.priceBreakdownText) elements.priceBreakdownText.textContent = "Please select an event";
      if (elements.totalAmountText) elements.totalAmountText.textContent = "$0.00";
      return 0;
    }

    const count = parseInt(elements.regTicketCount.value, 10) || 1;
    const tier = elements.regTicketType.value;

    let baseRate = event.price || 0;
    let multiplier = 1;

    if (tier === "vip") {
      multiplier = 1.75;
      baseRate = Math.round(baseRate * multiplier);
      if (baseRate === 0) baseRate = 35; // VIP add-on for free events
    } else if (tier === "student") {
      multiplier = 0.5;
      baseRate = Math.round(baseRate * multiplier);
    }

    const total = event.isFree && tier === "standard" ? 0 : baseRate * count;

    if (elements.priceBreakdownText) {
      if (total === 0) {
        elements.priceBreakdownText.textContent = `Free Admission × ${count} Attendee(s)`;
      } else {
        elements.priceBreakdownText.textContent = `$${baseRate} (${tier.toUpperCase()}) × ${count} ticket(s)`;
      }
    }

    if (elements.totalAmountText) {
      elements.totalAmountText.textContent = total === 0 ? "FREE" : `$${total.toFixed(2)}`;
    }

    return total;
  }

  // Real-time Field Validation Setup
  function setupFieldValidation() {
    const fields = [
      { input: elements.regFullName, errId: "errFullName", name: "fullName" },
      { input: elements.regEmail, errId: "errEmail", name: "email" },
      { input: elements.regPhone, errId: "errPhone", name: "phone" },
      { input: elements.regEventSelect, errId: "errEventSelect", name: "selectedEventId" },
      { input: elements.regTicketCount, errId: "errTicketCount", name: "ticketCount" },
      { input: elements.regTermsCheck, errId: "errTerms", name: "termsCheck" }
    ];

    fields.forEach((f) => {
      if (!f.input) return;
      const errEl = document.getElementById(f.errId);

      const validate = () => {
        const val = f.input.type === "checkbox" ? f.input.checked : f.input.value;
        const res = FormValidator.validateSingle(f.name, val, { checked: f.input.checked });
        if (!res.valid) {
          FormValidator.showError(f.input, errEl, res.message);
          return false;
        } else {
          FormValidator.clearError(f.input, errEl);
          return true;
        }
      };

      f.input.addEventListener("blur", validate);
      f.input.addEventListener("input", () => {
        // If it was already invalid, clear error on user typing
        if (f.input.classList.contains("is-invalid")) {
          validate();
        }
      });
      if (f.input.type === "checkbox" || f.input.tagName === "SELECT") {
        f.input.addEventListener("change", validate);
      }
    });

    // Dynamic price change triggers
    if (elements.regEventSelect) {
      elements.regEventSelect.addEventListener("change", calculateTotalRegistrationPrice);
    }
    if (elements.regTicketType) {
      elements.regTicketType.addEventListener("change", calculateTotalRegistrationPrice);
    }
    if (elements.regTicketCount) {
      elements.regTicketCount.addEventListener("input", calculateTotalRegistrationPrice);
    }
  }

  function resetAllValidationStates() {
    const inputs = elements.registrationForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.classList.remove("is-invalid", "is-valid");
      input.removeAttribute("aria-invalid");
    });
    const errorSpans = elements.registrationForm.querySelectorAll(".form-error-msg");
    errorSpans.forEach((s) => {
      s.textContent = "";
      s.style.display = "none";
    });
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();

    // 1. Validate All Fields
    let hasError = false;

    const fieldsToValidate = [
      { input: elements.regFullName, errId: "errFullName", name: "fullName" },
      { input: elements.regEmail, errId: "errEmail", name: "email" },
      { input: elements.regPhone, errId: "errPhone", name: "phone" },
      { input: elements.regEventSelect, errId: "errEventSelect", name: "selectedEventId" },
      { input: elements.regTicketCount, errId: "errTicketCount", name: "ticketCount" },
      { input: elements.regTermsCheck, errId: "errTerms", name: "termsCheck" }
    ];

    fieldsToValidate.forEach((f) => {
      if (!f.input) return;
      const errEl = document.getElementById(f.errId);
      const val = f.input.type === "checkbox" ? f.input.checked : f.input.value;
      const res = FormValidator.validateSingle(f.name, val, { checked: f.input.checked });

      if (!res.valid) {
        FormValidator.showError(f.input, errEl, res.message);
        if (!hasError) {
          f.input.focus();
          hasError = true;
        }
      } else {
        FormValidator.clearError(f.input, errEl);
      }
    });

    if (hasError) {
      showToast("Please correct the errors in the form before submitting.", "error");
      return;
    }

    // 2. Validate seat availability
    const eventId = elements.regEventSelect.value;
    const event = state.events.find((e) => e.id === eventId);
    if (!event) {
      showToast("Selected event is not found.", "error");
      return;
    }

    const ticketCount = parseInt(elements.regTicketCount.value, 10) || 1;
    const remainingSeats = getRemainingSeats(event);

    if (ticketCount > remainingSeats) {
      showToast(`Only ${remainingSeats} seat(s) remaining for this event!`, "error");
      return;
    }

    // 3. Visual button loading state
    elements.submitRegistrationBtn.disabled = true;
    const originalBtnText = elements.submitRegistrationBtn.innerHTML;
    elements.submitRegistrationBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Processing Registration...
    `;

    setTimeout(() => {
      // 4. Collect Form Data
      const totalPrice = calculateTotalRegistrationPrice();
      const ticketTypeLabel =
        elements.regTicketType.options[elements.regTicketType.selectedIndex].text;

      const formData = {
        fullName: elements.regFullName.value,
        email: elements.regEmail.value,
        phone: elements.regPhone.value,
        ticketType: ticketTypeLabel,
        ticketCount: ticketCount,
        totalPrice: totalPrice,
        specialNotes: elements.regSpecialNotes ? elements.regSpecialNotes.value : ""
      };

      // 5. Save to LocalStorage
      const newRegistration = StorageService.saveRegistration(formData, event);

      // Restore submit button
      elements.submitRegistrationBtn.disabled = false;
      elements.submitRegistrationBtn.innerHTML = originalBtnText;

      // 6. Update App State & UI
      renderEvents();
      updateTicketsBadge();
      updateLiveStats();
      populateEventSelects();

      // 7. Show Digital Ticket Confirmation Pass
      renderDigitalConfirmationPass(newRegistration);

      elements.registrationFormContainer.style.display = "none";
      elements.registrationSuccessContainer.style.display = "block";

      showToast(`🎉 Registration Confirmed! Ticket ${newRegistration.ticketId}`, "success");
    }, 600);
  }

  function renderDigitalConfirmationPass(reg) {
    if (!elements.digitalPassContainer) return;

    elements.digitalPassContainer.innerHTML = `
      <div class="digital-ticket-card">
        <div class="ticket-header">
          <div class="ticket-badge-pill">OFFICIAL PASS</div>
          <span class="ticket-id-tag">${reg.ticketId}</span>
        </div>

        <div class="ticket-body">
          <div class="ticket-event-row">
            <img src="${reg.eventImage}" alt="${reg.eventTitle}" class="ticket-thumb" />
            <div>
              <h3 class="ticket-event-title">${reg.eventTitle}</h3>
              <p class="ticket-venue-meta">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                ${reg.eventVenue} (${reg.eventLocation})
              </p>
            </div>
          </div>

          <div class="ticket-details-grid">
            <div class="ticket-detail-item">
              <span class="detail-label">Attendee</span>
              <strong class="detail-value">${reg.attendeeName}</strong>
            </div>
            <div class="ticket-detail-item">
              <span class="detail-label">Pass Type</span>
              <strong class="detail-value">${reg.ticketType}</strong>
            </div>
            <div class="ticket-detail-item">
              <span class="detail-label">Date & Time</span>
              <strong class="detail-value">${formatEventDate(reg.eventDate)} | ${reg.eventTime}</strong>
            </div>
            <div class="ticket-detail-item">
              <span class="detail-label">Seats Booked</span>
              <strong class="detail-value">${reg.ticketCount} Pass(es)</strong>
            </div>
          </div>
        </div>

        <div class="ticket-divider">
          <div class="notch notch-left"></div>
          <div class="dashed-line"></div>
          <div class="notch notch-right"></div>
        </div>

        <div class="ticket-barcode-wrap">
          <div class="simulated-qr">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <rect x="14" y="14" width="3" height="3"></rect>
              <rect x="18" y="14" width="3" height="3"></rect>
              <rect x="14" y="18" width="3" height="3"></rect>
              <rect x="18" y="18" width="3" height="3"></rect>
            </svg>
          </div>
          <div class="barcode-info">
            <div class="simulated-barcode"></div>
            <span class="barcode-number">${reg.ticketId} • ADMIT ${reg.ticketCount}</span>
          </div>
        </div>
      </div>

      <div class="ticket-action-buttons">
        <button type="button" class="btn btn-outline" id="printTicketBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print / Save Pass
        </button>

        <button type="button" class="btn btn-secondary" id="calendarExportBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Add to Calendar (.ics)
        </button>

        <button type="button" class="btn btn-primary" id="viewAllBookingsBtn">
          View All My Bookings
        </button>
      </div>
    `;

    // Print
    const printBtn = document.getElementById("printTicketBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Calendar .ics download
    const calBtn = document.getElementById("calendarExportBtn");
    if (calBtn) {
      calBtn.addEventListener("click", () => {
        downloadIcsFile(reg);
      });
    }

    // View All Bookings
    const viewBookingsBtn = document.getElementById("viewAllBookingsBtn");
    if (viewBookingsBtn) {
      viewBookingsBtn.addEventListener("click", () => {
        closeRegisterModal();
        openTicketsDrawer();
      });
    }
  }

  // ==========================================
  // 10. "MY TICKETS" DRAWER (LocalStorage Management)
  // ==========================================
  function updateTicketsBadge() {
    const list = StorageService.getRegistrations();
    if (elements.ticketsBadge) {
      elements.ticketsBadge.textContent = list.length;
      elements.ticketsBadge.style.display = list.length > 0 ? "inline-flex" : "none";
    }
  }

  function openTicketsDrawer() {
    renderTicketsDrawer();
    elements.ticketsDrawer.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeTicketsDrawer() {
    elements.ticketsDrawer.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  function renderTicketsDrawer() {
    const list = StorageService.getRegistrations();

    if (list.length === 0) {
      if (elements.ticketsDrawerList) elements.ticketsDrawerList.style.display = "none";
      if (elements.ticketsEmptyState) elements.ticketsEmptyState.style.display = "block";
      return;
    }

    if (elements.ticketsDrawerList) {
      elements.ticketsDrawerList.style.display = "flex";
      elements.ticketsDrawerList.innerHTML = "";
    }
    if (elements.ticketsEmptyState) {
      elements.ticketsEmptyState.style.display = "none";
    }

    list.forEach((reg) => {
      const card = document.createElement("div");
      card.className = "my-ticket-item";
      card.innerHTML = `
        <div class="my-ticket-top">
          <div class="my-ticket-badge">CONFIRMED PASS</div>
          <span class="my-ticket-code">${reg.ticketId}</span>
        </div>

        <div class="my-ticket-info-row">
          <img src="${reg.eventImage}" alt="${reg.eventTitle}" class="my-ticket-img" />
          <div class="my-ticket-meta">
            <h4 class="my-ticket-title">${reg.eventTitle}</h4>
            <p class="my-ticket-date">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              ${formatEventDate(reg.eventDate)} • ${reg.eventTime}
            </p>
            <p class="my-ticket-venue">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              ${reg.eventVenue}
            </p>
          </div>
        </div>

        <div class="my-ticket-details">
          <div><span class="text-subtle">Attendee:</span> <strong>${reg.attendeeName}</strong></div>
          <div><span class="text-subtle">Tickets:</span> <strong>${reg.ticketCount} (${reg.ticketType})</strong></div>
          <div><span class="text-subtle">Total:</span> <strong>${reg.totalPrice === 0 ? "FREE" : "$" + reg.totalPrice}</strong></div>
        </div>

        <div class="my-ticket-actions">
          <button type="button" class="btn btn-outline btn-sm download-ics-btn" data-id="${reg.ticketId}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Calendar
          </button>
          
          <button type="button" class="btn btn-danger-outline btn-sm cancel-ticket-btn" data-id="${reg.ticketId}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Cancel Booking
          </button>
        </div>
      `;

      // Calendar button
      card.querySelector(".download-ics-btn").addEventListener("click", () => {
        downloadIcsFile(reg);
      });

      // Cancel button
      card.querySelector(".cancel-ticket-btn").addEventListener("click", () => {
        if (confirm(`Are you sure you want to cancel booking for "${reg.eventTitle}"? This will release your reserved seats.`)) {
          StorageService.cancelRegistration(reg.ticketId);
          showToast(`Booking ${reg.ticketId} has been cancelled.`, "info");
          renderTicketsDrawer();
          updateTicketsBadge();
          renderEvents();
          updateLiveStats();
          populateEventSelects();
        }
      });

      elements.ticketsDrawerList.appendChild(card);
    });
  }

  // ==========================================
  // 11. ICAL (.ICS) CALENDAR GENERATOR
  // ==========================================
  function downloadIcsFile(reg) {
    const startIso = (reg.eventDate || "2026-11-20").replace(/-/g, "") + "T090000Z";
    const endIso = (reg.eventDate || "2026-11-20").replace(/-/g, "") + "T170000Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//EventFlora//EN",
      "BEGIN:VEVENT",
      `UID:${reg.ticketId}@eventflora.io`,
      `DTSTAMP:${startIso}`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `SUMMARY:${reg.eventTitle}`,
      `DESCRIPTION:EventFlora Pass: ${reg.ticketId}\\nAttendee: ${reg.attendeeName}\\nTickets: ${reg.ticketCount}`,
      `LOCATION:${reg.eventVenue}, ${reg.eventLocation}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eventflora-${reg.ticketId}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Calendar event file (.ics) downloaded!", "success");
  }

  // ==========================================
  // 12. TOAST NOTIFICATION SYSTEM
  // ==========================================
  function showToast(message, type = "info") {
    if (!elements.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.classList.add("toast-leaving");
      setTimeout(() => toast.remove(), 250);
    });

    elements.toastContainer.appendChild(toast);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add("toast-leaving");
        setTimeout(() => toast.remove(), 250);
      }
    }, 4000);
  }

  // ==========================================
  // 13. EVENT LISTENERS BINDING
  // ==========================================
  function bindEventListeners() {
    // Theme toggle
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Mobile nav menu
    if (elements.mobileMenuBtn && elements.navMenu) {
      elements.mobileMenuBtn.addEventListener("click", () => {
        elements.navMenu.classList.toggle("is-active");
        elements.mobileMenuBtn.classList.toggle("is-active");
      });
      // Close mobile menu on nav link click
      elements.navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          elements.navMenu.classList.remove("is-active");
          elements.mobileMenuBtn.classList.remove("is-active");
        });
      });
    }

    // Hero Search Trigger
    if (elements.heroSearchBtn) {
      elements.heroSearchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const query = elements.heroSearchInput ? elements.heroSearchInput.value : "";
        const cat = elements.heroCategorySelect ? elements.heroCategorySelect.value : "all";

        state.searchQuery = query;
        state.currentCategory = cat;

        // Sync main search controls
        if (elements.searchInput) elements.searchInput.value = query;
        document.querySelectorAll(".category-pill").forEach((pill) => {
          pill.classList.toggle("active", pill.getAttribute("data-category") === cat);
        });

        renderEvents();

        // Smooth scroll down to discovery section
        const section = document.getElementById("eventsSection");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      });
    }

    // Main Live Search Input with debounce
    let debounceTimer;
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.searchQuery = e.target.value;
          if (elements.clearSearchBtn) {
            elements.clearSearchBtn.style.display = e.target.value ? "block" : "none";
          }
          renderEvents();
        }, 200);
      });
    }

    if (elements.clearSearchBtn) {
      elements.clearSearchBtn.addEventListener("click", () => {
        if (elements.searchInput) elements.searchInput.value = "";
        state.searchQuery = "";
        elements.clearSearchBtn.style.display = "none";
        renderEvents();
      });
    }

    // Secondary Filters
    if (elements.dateFilterSelect) {
      elements.dateFilterSelect.addEventListener("change", (e) => {
        state.dateFilter = e.target.value;
        renderEvents();
      });
    }

    if (elements.priceFilterSelect) {
      elements.priceFilterSelect.addEventListener("change", (e) => {
        state.priceFilter = e.target.value;
        renderEvents();
      });
    }

    if (elements.sortSelect) {
      elements.sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderEvents();
      });
    }

    // View Toggles
    if (elements.viewGridBtn && elements.viewListBtn) {
      elements.viewGridBtn.addEventListener("click", () => {
        state.viewMode = "grid";
        elements.viewGridBtn.classList.add("active");
        elements.viewListBtn.classList.remove("active");
        renderEvents();
      });

      elements.viewListBtn.addEventListener("click", () => {
        state.viewMode = "list";
        elements.viewListBtn.classList.add("active");
        elements.viewGridBtn.classList.remove("active");
        renderEvents();
      });
    }

    // Reset Filters button
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener("click", () => {
        state.currentCategory = "all";
        state.searchQuery = "";
        state.dateFilter = "all";
        state.priceFilter = "all";
        state.sortBy = "date-asc";

        if (elements.searchInput) elements.searchInput.value = "";
        if (elements.dateFilterSelect) elements.dateFilterSelect.value = "all";
        if (elements.priceFilterSelect) elements.priceFilterSelect.value = "all";
        if (elements.sortSelect) elements.sortSelect.value = "date-asc";
        if (elements.clearSearchBtn) elements.clearSearchBtn.style.display = "none";

        document.querySelectorAll(".category-pill").forEach((pill) => {
          pill.classList.toggle("active", pill.getAttribute("data-category") === "all");
        });

        renderEvents();
        showToast("Filters reset to default", "info");
      });
    }

    // My Tickets button
    if (elements.myTicketsBtn) {
      elements.myTicketsBtn.addEventListener("click", openTicketsDrawer);
    }
    if (elements.closeTicketsDrawerBtn) {
      elements.closeTicketsDrawerBtn.addEventListener("click", closeTicketsDrawer);
    }

    // Detail Modal Close
    if (elements.closeDetailModalBtn) {
      elements.closeDetailModalBtn.addEventListener("click", closeDetailModal);
    }

    // Register Modal Close
    if (elements.closeRegisterModalBtn) {
      elements.closeRegisterModalBtn.addEventListener("click", closeRegisterModal);
    }

    // Registration Form submit
    if (elements.registrationForm) {
      elements.registrationForm.addEventListener("submit", handleRegistrationSubmit);
      setupFieldValidation();
    }

    // Featured Hero card buttons
    const heroExploreBtn = document.getElementById("heroExploreBtn");
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener("click", () => {
        const section = document.getElementById("eventsSection");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      });
    }

    const heroFeaturedRegisterBtn = document.getElementById("heroFeaturedRegisterBtn");
    if (heroFeaturedRegisterBtn) {
      heroFeaturedRegisterBtn.addEventListener("click", () => {
        const featured = state.events.find((e) => e.featured) || state.events[0];
        openRegisterModal(featured);
      });
    }

    // Global Keydown: Escape key closes active modals
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (elements.detailModal && elements.detailModal.classList.contains("is-open")) {
          closeDetailModal();
        } else if (elements.registerModal && elements.registerModal.classList.contains("is-open")) {
          closeRegisterModal();
        } else if (elements.ticketsDrawer && elements.ticketsDrawer.classList.contains("is-open")) {
          closeTicketsDrawer();
        }
      }
    });

    // Backdrop clicks close modals
    [elements.detailModal, elements.registerModal, elements.ticketsDrawer].forEach((modal) => {
      if (!modal) return;
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          if (modal === elements.detailModal) closeDetailModal();
          else if (modal === elements.registerModal) closeRegisterModal();
          else if (modal === elements.ticketsDrawer) closeTicketsDrawer();
        }
      });
    });
  }

  // ==========================================
  // 14. HELPER DATE FORMATTERS
  // ==========================================
  function formatEventDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function formatFullDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  // Start the application
  initApp();
});
