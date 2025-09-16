import { jsonResponseType } from "@/_types/JsonResponse.type";
import { generateTags } from "@/_utils/helperMethods/generateTags";

export async function getSingleRecord({
  recordIdentified = "",
  _APIEndpointName = "",
  enableCache = true,
}: {
  recordIdentified: string;
  _APIEndpointName: string;
  enableCache: boolean;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${_APIEndpointName}/${recordIdentified}`,
    {
      credentials: "include",
      //// Cache for three hours
      next: {
        revalidate: enableCache ? 60 * 60 * 3 : 0,
        tags: generateTags(_APIEndpointName, "singleRecord", recordIdentified),
      },
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

export async function _getEveryRecord(
  _APIEndpointName: string,
  enableCache = true,
) {
  //// This method is used to get all records from table and apply api feature on the client side
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${_APIEndpointName}`,
    {
      credentials: "include",
      //// Cache for three hours
      next: {
        revalidate: enableCache ? 60 * 60 * 3 : 0,
        tags: generateTags(_APIEndpointName, "everyRecord"),
      },
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

export async function _getAllRecords({
  _APIEndpointName,
  page = 1,
  size = 10,
  sort = "",
  searchTerm = "",
  enableCache = true,
}: {
  _APIEndpointName: string;
  page?: number;
  size?: number;
  sort?: string;
  searchTerm?: string;
  enableCache?: boolean;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${_APIEndpointName}page=${page}&size=${size}&searchTerm=${searchTerm}&sort=${sort}`,
    {
      credentials: "include",
      //// Cache for three hours
      next: {
        revalidate: enableCache ? 60 * 60 * 3 : 0,
        tags: generateTags(_APIEndpointName, "allRecords"),
      },
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

export async function _deleteSingleRecord({
  _APIEndpointName,
  recordIdentified,
}: {
  _APIEndpointName: string;
  recordIdentified: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${_APIEndpointName}/${recordIdentified}`,
    {
      credentials: "include",
      method: "DELETE",
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

export async function _updateSingleRecord({
  _APIEndpointName,
  recordIdentified,
  data,
}: {
  _APIEndpointName: string;
  recordIdentified: string;
  data: any;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${_APIEndpointName}/${recordIdentified}`,
    {
      credentials: "include",
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
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

export async function _createSingleRecord({
  _APIEndpointName,
  data,
}: {
  _APIEndpointName: string;
  data: any;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_BACKEND_URL}/${_APIEndpointName}`,
    {
      credentials: "include",
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    },
  );

  const jsonResponse: jsonResponseType = await res.json();

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
