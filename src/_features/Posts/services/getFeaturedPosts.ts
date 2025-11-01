import { _getAllRecords } from "@/_services/CRUD_operations";
import { mainModules } from "@/_utils/constants/mainModules";
import { mainURLs } from "@/_utils/constants/mainURLs";
import { ensureClientIdServer } from "@/_utils/helperMethods/ensureClientIdServer";

export async function getFeaturedPosts() {
  const clientId = await ensureClientIdServer();
  return _getAllRecords({
    _APIEndpointName: `${mainURLs.Posts}/getFeaturedPosts?`,
    enableCache: false,
    module: mainModules.post,
    clientId,
  });
}
