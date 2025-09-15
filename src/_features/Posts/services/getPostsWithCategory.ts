import { _getAllRecords } from "@/_services/CRUD_operations";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getPostsWithCategory(category: string) {
  return _getAllRecords({
    _APIEndpointName: `${mainURLs.Posts}/getPostsWithFilter?category=${category}&`,
    enableCache: false,
  });
}
