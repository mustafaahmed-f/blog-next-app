import { generateTags } from "@/_utils/helperMethods/generateTags";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { module, method, recordIdentifier } = await req.json();

  revalidateTag(generateTags(module, method, recordIdentifier)[0]);
  return NextResponse.json({ success: true });
}
