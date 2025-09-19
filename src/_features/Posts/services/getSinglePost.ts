import { getSingleRecord } from "@/_services/CRUD_operations";

export async function getSinglePost(slug: string) {
  return getSingleRecord({
    recordIdentified: slug,
    _APIEndpointName: "posts",
    enableCache: false,
  });
}
