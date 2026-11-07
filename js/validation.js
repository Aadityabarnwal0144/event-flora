/**
 * EventFlora - Robust JavaScript Form Validation Module
 * Real-time feedback, regex validation, sanitization, and accessible error messaging.
 */

const FormValidator = {
  // Regex patterns
  patterns: {
    // Valid name: at least 3 chars, alphabets, spaces, apostrophes, hyphens
    fullName: /^[a-zA-Z\s'.]{3,60}$/,
    // Email standard RFC 5322 simplified
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    // Phone: accepts international (+1, +44, +91 etc.) or standard 10-14 digit numbers
    phone: /^(\+?[0-9]{1,4}[\s-]?)?(\([0-9]{2,5}\)[\s-]?)?[0-9]{3,5}[\s-]?[0-9]{4,6}$/
  },

  // Error messages
  messages: {
    fullNameRequired: "Please enter your full name.",
    fullNameInvalid: "Name must contain at least 3 letters (letters and spaces only).",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address (e.g., user@example.com).",
    phoneRequired: "Please enter your contact phone number.",
    phoneInvalid: "Please enter a valid phone number (10 digits minimum, e.g., +1 555-0199 or 9876543210).",
    eventRequired: "Please select an event to attend.",
    ticketsInvalid: "Please select between 1 and 5 tickets.",
    termsRequired: "You must agree to the Event Code of Conduct and Terms."
  },

  /**
   * Validates a single field by input name and value
   */
  validateSingle(fieldName, value, extra = {}) {
    const val = typeof value === "string" ? value.trim() : value;

    switch (fieldName) {
      case "fullName":
        if (!val) {
          return { valid: false, message: this.messages.fullNameRequired };
        }
        if (!this.patterns.fullName.test(val)) {
          return { valid: false, message: this.messages.fullNameInvalid };
        }
        return { valid: true };

      case "email":
        if (!val) {
          return { valid: false, message: this.messages.emailRequired };
        }
        if (!this.patterns.email.test(val)) {
          return { valid: false, message: this.messages.emailInvalid };
        }
        return { valid: true };

      case "phone":
        if (!val) {
          return { valid: false, message: this.messages.phoneRequired };
        }
        // Count only digits to ensure at least 10 digits
        const digits = val.replace(/\D/g, "");
        if (digits.length < 10 || digits.length > 15 || !this.patterns.phone.test(val)) {
          return { valid: false, message: this.messages.phoneInvalid };
        }
        return { valid: true };

      case "selectedEventId":
        if (!val || val === "") {
          return { valid: false, message: this.messages.eventRequired };
        }
        return { valid: true };

      case "ticketCount":
        const num = parseInt(val, 10);
        if (isNaN(num) || num < 1 || num > 5) {
          return { valid: false, message: this.messages.ticketsInvalid };
        }
        return { valid: true };

      case "termsCheck":
        if (!extra.checked) {
          return { valid: false, message: this.messages.termsRequired };
        }
        return { valid: true };

      default:
        return { valid: true };
    }
  },

  /**
   * Applies accessible error styling & hints to DOM elements
   */
  showError(inputElement, errorElement, message) {
    if (!inputElement) return;
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
    inputElement.setAttribute("aria-invalid", "true");

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  },

  clearError(inputElement, errorElement) {
    if (!inputElement) return;
    inputElement.classList.remove("is-invalid");
    inputElement.classList.add("is-valid");
    inputElement.setAttribute("aria-invalid", "false");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  },

  resetFieldState(inputElement, errorElement) {
    if (!inputElement) return;
    inputElement.classList.remove("is-invalid", "is-valid");
    inputElement.removeAttribute("aria-invalid");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }
};
