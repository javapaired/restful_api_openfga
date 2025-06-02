import { fgaClient } from "./client.js";

export async function checkPermission({ user, action, object }) {
  console.log("[FGA] Checking permission", { user, action, object });

  try {
    const result = await fgaClient.check({
      user,
      relation: action,
      object,
    });

    console.log("[FGA] Allowed?", result.allowed);
    return result.allowed;
  } catch (err) {
    console.error("[FGA] Check failed:", err.response?.data || err.message);
    throw err;
  }
}
