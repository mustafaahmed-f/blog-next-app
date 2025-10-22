import { mainModules } from "@/_utils/constants/mainModules";

const mainURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export async function RevalidateTagMethod(
  module: (typeof mainModules)[keyof typeof mainModules],
  method: "allRecords" | "everyRecord" | "singleRecord",
  recordIdentifier?: string,
) {
  const res = await fetch(`${mainURL}/revalidateTag`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({ module, method, recordIdentifier }),
  });

  const jsonResponse = await res.json(); // even if !res.ok, still need this

  if (!res.ok)
    throw new Error(
      jsonResponse.error || `Failed revalidating record : ${res.statusText} `,
    );

  if (jsonResponse.error) {
    throw new Error(jsonResponse.error || "Unknown error from API");
  }

  return {
    success: true,
  };
}
