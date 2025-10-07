import { _updateSingleRecord } from "@/_services/CRUD_operations";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function editPost(
  data: FormData,
  slug: string,
  token: string | null,
) {
  return _updateSingleRecord({
    recordIdentified: slug,
    _APIEndpointName: `${mainURLs.Posts}/updatePost`,
    data,
    token,
  });
}
