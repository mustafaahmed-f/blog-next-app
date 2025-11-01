import { getSingleRecord } from "@/_services/CRUD_operations";
import { mainModules } from "@/_utils/constants/mainModules";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getSinglePost(slug: string, token: string) {
  return getSingleRecord({
    recordIdentified: slug,
    _APIEndpointName: `${mainURLs.Posts}/getPost`,
    enableCache: false,
    token,
    module: mainModules.post,
  });
}
