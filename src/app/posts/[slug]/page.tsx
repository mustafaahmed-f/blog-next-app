import Menu from "@/_components/Menu/Menu";
import ErrorToast from "@/_components/Toasts/ErrorToast";
import Comments from "@/_features/Comments/subComponents/Comments/Comments";
import { getSinglePost } from "@/_features/Posts/services/getSinglePost";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./postPage.module.css";
import LikeBtn from "@/_features/Posts/subComponents/LikeBtn/LikeBtn";
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
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>{post?.title}</h1>
                <Link
                  href={`/posts/${post?.slug}/edit`}
                  className={styles.edit}
                >
                  Edit
                </Link>
              </div>
              <div className={styles.user}>
                {post?.user?.image ? (
                  <div className={styles.userImageContainer}>
                    <Image
                      src={post.user.image}
                      alt={post.user.userName}
                      fill
                      className={styles.avatar}
                    />
                  </div>
                ) : (
                  <Image
                    src={"/icons8-avatar-50.png"}
                    alt="User avatar"
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                )}
                <div className={styles.userTextContainer}>
                  <span className={styles.username}>{post?.user.userName}</span>
                  <span className={styles.date}>
                    {post?.createdAt.slice(0, 10)}
                  </span>
                </div>
              </div>
            </div>
            {post?.img && (
              <div className={styles.imageContainer}>
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className={styles.image}
                  style={{ border: "1px solid var(--border)" }}
                />
              </div>
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: post?.html }}
              />
              <LikeBtn />
              <hr style={{ marginTop: "3rem" }} />
              <div className={styles.comment}>
                <Comments postSlug={slug} sizeOfComments={20} />
              </div>
            </div>
            <Menu />
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
