import { jsonResponseType } from "@/_types/JsonResponse.type";

export function getJsonResponse({
  message,
  data,
  additionalInfo,
  error,
}: jsonResponseType): jsonResponseType {
  let finalRespose: any = {};
  if (message) finalRespose.message = message;
  if (data) finalRespose.data = data;
  if (additionalInfo) finalRespose.additionalInfo = additionalInfo;
  if (error) finalRespose.error = error;
  return finalRespose;
}
