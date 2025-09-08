import { _getAllRecords } from "@/_services/CRUD_operations";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getFeaturedPosts() {
  return _getAllRecords({
    _APIEndpointName: `${mainURLs.Posts}/getFeaturedPosts`,
    enableCache: false,
  });
}
