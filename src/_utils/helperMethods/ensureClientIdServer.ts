// utils/ensureClientId.server.ts
import { cookies } from "next/headers";

export async function ensureClientIdServer(): Promise<string> {
  const cookieStore = await cookies();
  const clientId = cookieStore.get("client_id")?.value;
  return clientId ?? "";
}
