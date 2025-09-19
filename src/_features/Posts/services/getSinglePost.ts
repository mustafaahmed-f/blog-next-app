import { getSingleRecord } from "@/_services/CRUD_operations";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getSinglePost(slug: string) {
  return getSingleRecord({
    recordIdentified: slug,
    _APIEndpointName: `${mainURLs.Posts}/getPost`,
    enableCache: false,
  });
}
