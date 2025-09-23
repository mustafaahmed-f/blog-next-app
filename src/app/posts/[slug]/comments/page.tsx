import ErrorToast from "@/_components/Toasts/ErrorToast";
import { getSinglePost } from "@/_features/Posts/services/getSinglePost";
import styles from "../postPage.module.css";
import CommentsPage from "@/_features/Comments/subComponents/Comments/CommentsPage";
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function Page({ params }: PageProps) {
  const { slug } = await params;
  let catchedError: any = null;
  let response: any = null;

  try {
    response = await getSinglePost(slug);
  } catch (error: any) {
    catchedError = error.message;
  }

  const post: any = response ? response.data : null;

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
        <CommentsPage post={post} postSlug={slug} />
      )}
    </>
  );
}

export default Page;
