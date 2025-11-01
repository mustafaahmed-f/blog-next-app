import { _getAllRecords } from "@/_services/CRUD_operations";
import { mainModules } from "@/_utils/constants/mainModules";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getPostsWithCategory(
  category: string,
  page?: number,
  size?: number,
) {
  return _getAllRecords({
    _APIEndpointName: `${mainURLs.Posts}/getPostsWithFilter?category=${category}&`,
    enableCache: false,
    module: mainModules.post,
    page: page || 1,
    size: size || 10,
  });
}
