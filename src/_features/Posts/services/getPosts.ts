import { _getAllRecords } from "@/_services/CRUD_operations";
import { mainModules } from "@/_utils/constants/mainModules";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getPosts(
  page?: number,
  size?: number,
  clientId?: string,
) {
  return _getAllRecords({
    _APIEndpointName: `${mainURLs.Posts}/getPosts?`,
    enableCache: false,
    module: mainModules.post,
    page: page || 1,
    size: size || 10,
    clientId: clientId ?? "",
  });
}
