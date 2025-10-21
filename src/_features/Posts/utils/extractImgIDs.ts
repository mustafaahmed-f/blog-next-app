import { Delta } from "quill";

export function extractImgIDs(delta: Delta) {
  const ids: string[] = [];
  const ops = delta.ops;
  ops.forEach((op: any) => {
    const image = op.insert?.image;
    if (image && typeof image === "object" && image.public_id) {
      ids.push(image.public_id);
    }
  });
  return ids;
}
