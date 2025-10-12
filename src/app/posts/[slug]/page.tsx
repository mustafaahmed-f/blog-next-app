import Menu from "@/_components/Menu/Menu";
import ErrorToast from "@/_components/Toasts/ErrorToast";
import Comments from "@/_features/Comments/subComponents/Comments/Comments";
import { getSinglePost } from "@/_features/Posts/services/getSinglePost";
import { incViews } from "@/_features/Posts/services/incViews";
import DeletePostBtn from "@/_features/Posts/subComponents/DeletePostBtn/DeletePostBtn";
import LikeBtn from "@/_features/Posts/subComponents/LikeBtn/LikeBtn";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { EyeIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./postPage.module.css";
import TagSection from "@/_features/Posts/subComponents/tagsSection/TagSection";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function Page({ params }: PageProps) {
  const { userId, getToken } = await auth();
  const token = await getToken();
  const { slug } = await params;
  let catchedError: any = null;
  let getSinglePostResponse: any = null;
  let incViewResponse: any = null;

  try {
    const [incView, singlePost] = await Promise.all([
      incViews(slug).catch((error: any) => {
        catchedError =
          error.message !== "You already viewed this post"
            ? `Inc View Error : ${error.message}`
            : null;
      }),
      getSinglePost(slug, token ?? "").catch((error: any) => {
        catchedError = `Single Post Error : ${error.message}`;
      }),
    ]);
    getSinglePostResponse = singlePost;
    incViewResponse = incView;
  } catch (error: any) {
    catchedError = error.message;
  }

  const post: any = getSinglePostResponse ? getSinglePostResponse.data : null;
  const postViews = post ? post.views : 0;

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
                <TagSection tags={post?.tags} />

                {/* Likes + Views section */}
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <HeartIcon className={styles.statIcon} />
                    <span>{post?._count.Likes ?? 0}</span>
                  </div>
                  <div className={styles.statItem}>
                    <EyeIcon className={styles.statIcon} />
                    <span>{postViews}</span>
                  </div>
                </div>

                <SignedIn>
                  {post.user.clerkId === userId && (
                    <div className={styles.crudSection}>
                      <Link
                        href={`/posts/${post?.slug}/edit`}
                        className={styles.edit}
                      >
                        Edit
                      </Link>
                      <DeletePostBtn postSlug={post?.slug} />
                    </div>
                  )}
                </SignedIn>
              </div>

              <div className={styles.user}>
                {post?.user?.img ? (
                  <div className={styles.userImageContainer}>
                    <Image
                      src={post.user.img}
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
              <LikeBtn
                slug={post?.slug}
                isLiked={
                  getSinglePostResponse?.additionalInfo?.userLikedPost ?? false
                }
              />
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
