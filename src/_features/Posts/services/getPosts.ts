import { _getAllRecords } from "@/_services/CRUD_operations";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getPosts(page?: number, size?: number) {
  return _getAllRecords({
    _APIEndpointName: `${mainURLs.Posts}/getPosts?`,
    enableCache: false,
    page: page || 1,
    size: size || 10,
  });
}
