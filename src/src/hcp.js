export async function fetchHCP(env, endpoint) {
  const url = `https://api.housecallpro.com${endpoint}`;

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${env.HCP_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HCP API Error ${res.status}: ${text}`);
  }

  return res.json();
}
