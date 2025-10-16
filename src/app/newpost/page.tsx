import PostEditor from "@/_features/Posts/subComponents/post_editor/PostEditor";
import { randomUUID } from "crypto";

export const metadata = {
  title: "Add new post",
};

function Page() {
  const draftId = randomUUID();
  return <PostEditor draftId={draftId.toString()} editMode={false} />;
}

export default Page;
