import { _getEveryRecord } from "@/_services/CRUD_operations";
import { mainModules } from "@/_utils/constants/mainModules";

export async function getCategories() {
  return _getEveryRecord(
    "categories/getCategories",
    true,
    mainModules.category,
  );
}
