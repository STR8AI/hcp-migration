import { fetchHCP } from "./hcp";
import { pushToGHL } from "./ghl";
import { normalizeCustomer } from "./normalize";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/run") {
      return await runMigration(env);
    }

    return new Response("Migration Worker Running");
  }
};

async function runMigration(env) {
  try {
    // Fetch customers from HCP API
    const customers = await fetchHCP(env, "/customers");

    // Normalize data for GHL
    const normalized = customers.map(c => normalizeCustomer(c));

    // Push each customer to GHL
    const results = [];
    for (const record of normalized) {
      const r = await pushToGHL(env, record);
      results.push(r);
    }

    return Response.json({
      message: "Migration completed successfully",
      imported: results.length
    });

  } catch (e) {
    return Response.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
