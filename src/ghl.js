export async function pushToGHL(env, contact) {
  const url = "https://rest.gohighlevel.com/v1/contacts/";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.GHL_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL API Error ${res.status}: ${text}`);
  }

  return res.json();
}
