import ErrorToast from "@/_components/Toasts/ErrorToast";
import { getSinglePost } from "@/_features/Posts/services/getSinglePost";
import SinglePostUI from "@/_features/Posts/subComponents/SinglePostPage/SinglePostUI";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import styles from "./postPage.module.css";

export const metadata: Metadata = {
  title: "Post page",
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function Page({ params }: PageProps) {
  const { getToken } = await auth();
  const token = await getToken();
  const { slug } = await params;
  let catchedError: any = null;
  let getSinglePostResponse: any = null;

  try {
    const singlePost = await getSinglePost(slug, token ?? "");

    getSinglePostResponse = singlePost;
  } catch (error: any) {
    catchedError = `Single Post Error : ${error.message}`;
  }

  const post: any = getSinglePostResponse ? getSinglePostResponse.data : null;
  const postViews = post ? post.views : 0;

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}

      {/* changed: always guard against missing post to avoid reading properties of undefined */}
      {!post ? (
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>Unable to fetch post</h1>
              <p>{catchedError ?? "No post data received from the server."}</p>
            </div>
          </div>
        </div>
      ) : (
        <SinglePostUI
          post={post}
          postResponse={getSinglePostResponse}
          postViews={postViews}
        />
      )}
    </>
  );
}

export default Page;
