import { _getEveryRecord } from "@/_services/CRUD_operations";
import { mainModules } from "@/_utils/constants/mainModules";

export async function getCategories(clientId: string) {
  return _getEveryRecord(
    "categories/getCategories",
    true,
    mainModules.category,
    clientId,
  );
}
