import { jsonResponseType } from "@/_types/JsonResponse.type";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function incViews(postId: string, slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${mainURLs.Posts}/incViews/${slug}?postId=${postId}`,
    {
      credentials: "include",
      method: "PUT",
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
