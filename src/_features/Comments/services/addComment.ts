import { jsonResponseType } from "@/_types/JsonResponse.type";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function addComment(
  postSlug: string,
  newComment: { desc: string },
  token: string,
) {
  let headers: any = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${mainURLs.Comments}/addComment?postSlug=${postSlug}`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(newComment),
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
