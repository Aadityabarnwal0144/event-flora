/**
 * EventFlora - LocalStorage Management Engine
 * Handles persistent state for registrations, favorites, theme, and seat counts.
 */

const STORAGE_KEYS = {
  REGISTRATIONS: "eventflora_registrations_v1",
  FAVORITES: "eventflora_favorites_v1",
  THEME: "eventflora_theme_v1",
  SEATS: "eventflora_seats_v1"
};

const StorageService = {
  // ---- THEME STORAGE ----
  getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
    } catch (e) {
      console.warn("Storage not accessible:", e);
      return "dark";
    }
  },

  setTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn("Could not save theme:", e);
    }
  },

  // ---- FAVORITES STORAGE ----
  getFavorites() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Error reading favorites:", e);
      return [];
    }
  },

  isFavorite(eventId) {
    const favs = this.getFavorites();
    return favs.includes(eventId);
  },

  toggleFavorite(eventId) {
    let favs = this.getFavorites();
    const index = favs.indexOf(eventId);
    let added = false;
    if (index > -1) {
      favs.splice(index, 1);
      added = false;
    } else {
      favs.push(eventId);
      added = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    } catch (e) {
      console.warn("Could not save favorites:", e);
    }
    return { added, total: favs.length };
  },

  // ---- DYNAMIC SEATS STORAGE ----
  getSeatAdjustment(eventId) {
    try {
      const seatsData = localStorage.getItem(STORAGE_KEYS.SEATS);
      const parsed = seatsData ? JSON.parse(seatsData) : {};
      return parsed[eventId] || 0;
    } catch (e) {
      return 0;
    }
  },

  adjustSeats(eventId, count) {
    try {
      const seatsData = localStorage.getItem(STORAGE_KEYS.SEATS);
      const parsed = seatsData ? JSON.parse(seatsData) : {};
      parsed[eventId] = (parsed[eventId] || 0) + count;
      localStorage.setItem(STORAGE_KEYS.SEATS, JSON.stringify(parsed));
    } catch (e) {
      console.warn("Could not adjust seats in storage:", e);
    }
  },

  // ---- REGISTRATIONS STORAGE ----
  getRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Error reading registrations:", e);
      return [];
    }
  },

  getRegistrationById(ticketId) {
    const list = this.getRegistrations();
    return list.find((item) => item.ticketId === ticketId);
  },

  saveRegistration(formData, event) {
    const registrations = this.getRegistrations();
    
    // Generate unique Ticket ID: e.g. "EF-2026-78491"
    const randomHex = Math.floor(10000 + Math.random() * 90000);
    const ticketId = `EF-${new Date().getFullYear()}-${randomHex}`;

    const newRegistration = {
      ticketId,
      eventId: event.id,
      eventTitle: event.title,
      eventCategory: event.categoryLabel,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventLocation: event.location,
      eventImage: event.image,
      attendeeName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      ticketType: formData.ticketType || "Standard Admission",
      ticketCount: parseInt(formData.ticketCount, 10) || 1,
      totalPrice: formData.totalPrice || 0,
      specialNotes: formData.specialNotes ? formData.specialNotes.trim() : "",
      registeredAt: new Date().toISOString(),
      qrCodeSeed: `${ticketId}#${event.id}#${formData.email}`
    };

    registrations.unshift(newRegistration);

    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
      // Decrement available seats
      this.adjustSeats(event.id, newRegistration.ticketCount);
    } catch (e) {
      console.warn("Could not save registration:", e);
    }

    return newRegistration;
  },

  cancelRegistration(ticketId) {
    let registrations = this.getRegistrations();
    const target = registrations.find((r) => r.ticketId === ticketId);
    if (!target) return false;

    // Restore seats
    if (target.eventId && target.ticketCount) {
      this.adjustSeats(target.eventId, -target.ticketCount);
    }

    registrations = registrations.filter((r) => r.ticketId !== ticketId);
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.warn("Could not cancel registration in storage:", e);
    }
    return true;
  }
};
