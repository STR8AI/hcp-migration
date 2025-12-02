// Normalize a single Housecall Pro customer record into HighLevel format
export function normalizeCustomer(c) {
  // Clean phone number to digits only
  const cleanPhone = c.phone_number
    ? c.phone_number.toString().replace(/[^0-9]/g, "")
    : "";

  // Build a clean address record
  const address = c.address || {};

  return {
    firstName: c.first_name || "",
    lastName: c.last_name || "",
    email: c.email || "",
    phone: cleanPhone,
    address1: address.street || "",
    city: address.city || "",
    state: address.state || "",
    postalCode: address.zip || "",
    notes: buildNotes(c)
  };
}

// Build a clean notes string from HCP fields
function buildNotes(c) {
  const parts = [];

  if (c.notes) parts.push(c.notes);
  if (c.company) parts.push(`Company: ${c.company}`);
  if (c.additional_emails) parts.push(`Additional Emails: ${c.additional_emails}`);
  if (c.role) pa
