import ErrorToast from "@/_components/Toasts/ErrorToast";
import { getSinglePost } from "@/_features/Posts/services/getSinglePost";
import EditPageUI from "@/_features/Posts/subComponents/EditUI/EditPageUI";
import styles from "../postPage.module.css";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Post",
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function Page({ params }: PageProps) {
  const { getToken } = await auth();
  const { slug } = await params;
  let catchedError: any = null;
  let response: any = null;

  try {
    const token = await getToken();
    response = await getSinglePost(slug, (token as string) ?? "");
  } catch (error: any) {
    catchedError = error.message;
  }

  const post: any = response ? response.data : null;
  const finalPost = post
    ? {
        ...post,
        tags: (post?.tags as any[])?.map((tag: any) => tag.name).join(","),
      }
    : null;

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      {!post && catchedError ? (
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>Unable to fetch post</h1>
              <p>{catchedError}</p>
            </div>
          </div>
        </div>
      ) : (
        <EditPageUI post={finalPost} />
      )}
    </>
  );
}

export default Page;
