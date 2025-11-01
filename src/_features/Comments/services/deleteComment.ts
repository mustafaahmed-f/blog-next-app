import { jsonResponseType } from "@/_types/JsonResponse.type";
import { mainURLs } from "@/_utils/constants/mainURLs";
import { ensureClientId } from "@/_utils/helperMethods/ensureClientId";

export async function deleteComment(id: string, slug: string, token: string) {
  const clientId = ensureClientId();
  let headers: any = {
    "Content-Type": "application/json",
    "x-client-id": clientId,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${mainURLs.Comments}/deleteComment/${id}?postSlug=${slug}`,
    {
      credentials: "include",
      method: "DELETE",
      headers,
    },
  );

  const jsonResponse: jsonResponseType = await res.json(); // even if !res.ok, still need this

  if (!res.ok)
    throw new Error(
      jsonResponse.error || `Failed getting record : ${res.statusText} `,
    );

  if (jsonResponse.error) {
    throw new Error(
      jsonResponse.error || jsonResponse.message || "Unknown error from API",
    );
  }

  return {
    message: jsonResponse.message ?? "",
    data: jsonResponse.data ?? null,
    error: jsonResponse.error ?? null,
    additionalInfo: jsonResponse.additionalInfo ?? null,
  };
}
