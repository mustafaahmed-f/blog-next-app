import { _getAllRecords } from "@/_services/CRUD_operations";
import { mainModules } from "@/_utils/constants/mainModules";
import { mainURLs } from "@/_utils/constants/mainURLs";

export async function getComments(
  postSlug: string,
  cursor: string,
  size: number,
) {
  return _getAllRecords({
    _APIEndpointName: `${mainURLs.Comments}/getComments?postSlug=${postSlug}&cursor=${cursor}&limit=${size}&`,
    enableCache: false,
    module: mainModules.comment,
    recordIdentified: postSlug,
  });
}
