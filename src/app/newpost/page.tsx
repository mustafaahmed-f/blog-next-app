import PostEditor from "@/_features/Posts/subComponents/post_editor/PostEditor";
import styles from "./newPost.module.css";

export const metadata = {
  title: "Add new post",
};

function Page() {
  return <PostEditor />;
}

export default Page;
