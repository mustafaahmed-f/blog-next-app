import { jsonResponseType } from "@/_types/JsonResponse.type";
import { ensureClientId } from "@/_utils/helperMethods/ensureClientId";

export async function sendPostImg(
  data: FormData,
  draftId?: string,
  token?: string,
) {
  const clientId = ensureClientId();
  let headers: any = {
    "x-client-id": clientId,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/posts/uploadPostImg?draftId=${draftId}`,
    {
      credentials: "include",
      method: "POST",
      body: data,
      headers,
    },
  );

  const jsonResponse: jsonResponseType = await res.json();

  if (!res.ok)
    throw new Error(
      jsonResponse.error || `Failed sending file : ${res.statusText} `,
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
