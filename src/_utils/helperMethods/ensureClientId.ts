export function ensureClientId() {
  const cookieName = "client_id";
  const existing = document.cookie
    .split("; ")
    .find((c) => c.startsWith(cookieName + "="));
  if (existing) return existing.split("=")[1];

  const cid =
    crypto.randomUUID?.() ??
    Date.now().toString(36) + Math.random().toString(36).slice(2);
  // Set cookie for long time
  document.cookie = `${cookieName}=${cid}; Path=/; Max-Age=${60 * 60 * 24 * 15}; SameSite=Lax`;
  return cid;
}
