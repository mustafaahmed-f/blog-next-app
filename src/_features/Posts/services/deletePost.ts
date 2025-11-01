import { _deleteSingleRecord } from "@/_services/CRUD_operations";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function deletePost(
  slug: string,
  token: string,
  clientId: string,
) {
  return _deleteSingleRecord({
    recordIdentified: slug,
    _APIEndpointName: `${mainURLs.Posts}/deletePost`,
    token,
    clientId,
  });
}
