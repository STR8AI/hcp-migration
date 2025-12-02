// Basic logging helper
export function log(message, data) {
  if (data) {
    console.log(`${message}:`, JSON.stringify(data, null, 2));
  } else {
    console.log(message);
  }
}

// Email validation helper
export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone validation helper (must be at least 7 digits)
export function isValidPhone(phone) {
  if (!phone) return false;
  return phone.replace(/[^0-9]/g, "").length >= 7;
}
