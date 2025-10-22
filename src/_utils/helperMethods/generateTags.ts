export function generateTags(
  module: string,
  method: "allRecords" | "everyRecord" | "singleRecord",
  recordIdentifier?: string,
): string[] {
  switch (method) {
    case "allRecords":
      return recordIdentifier
        ? [`all-records-${module}-${recordIdentifier}`]
        : [`all-records-${module}`];

    case "everyRecord":
      return [`every-record-${module}`];

    case "singleRecord":
      return [`single-record-${module}-${recordIdentifier}`];

    default:
      return [];
  }
}
