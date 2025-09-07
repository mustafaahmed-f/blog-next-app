import { _getEveryRecord } from "@/_services/CRUD_operations";

export async function getCategories() {
  return _getEveryRecord("/categories/getCategories", false);
}
