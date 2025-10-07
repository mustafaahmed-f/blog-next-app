import { _createSingleRecord } from "@/_services/CRUD_operations";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function sendPost(data: FormData, token: string | null) {
  return _createSingleRecord({
    _APIEndpointName: `${mainURLs.Posts}/addPost`,
    data,
    token,
  });
}
