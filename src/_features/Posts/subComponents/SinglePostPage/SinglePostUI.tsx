"use client";

import Comments from "@/_features/Comments/subComponents/Comments/Comments";
import { SignedIn, useAuth } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useContext, useEffect, useRef } from "react";
import DeletePostBtn from "../DeletePostBtn/DeletePostBtn";
import LikeBtn from "../LikeBtn/LikeBtn";
import PostCategory from "../Post Category/PostCategory";
import PostViews from "../PostViews/PostViews";
import TagSection from "../tagsSection/TagSection";
import styles from "./singlePostUI.module.css";
import { ThemeContext } from "@/_context/ThemeContext";

interface SinglePostUIProps {
  post: any;
  postViews: number;
  postResponse: any;
}

function SinglePostUI({ post, postViews, postResponse }: SinglePostUIProps) {
  const { slug } = useParams();
  const { userId } = useAuth();
  const htmlRenderer = useRef<HTMLDivElement | null>(null);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (htmlRenderer.current) {
      htmlRenderer.current.innerHTML = post.html;
    }
  }, []);
  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <PostCategory categoryId={post.categoryId} />
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{post?.title}</h1>
            <TagSection tags={post?.tags} />

            {/* Likes + Views section */}
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <HeartIcon className={styles.statIcon} />
                <span className={styles.likeNumbers}>
                  {post?._count.Likes ?? 0}
                </span>
              </div>
              <PostViews
                postViews={postViews}
                postId={post?.id}
                postSlug={post?.slug}
              />
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
                  sizes="33vw"
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
              sizes="33vw"
              style={{ border: "1px solid var(--border)" }}
            />
          </div>
        )}
      </div>
      <div className={`${styles.content} `}>
        <div className={styles.post}>
          <div className={`${theme} ${styles.description} ql-snow`}>
            <div className="ql-editor" ref={htmlRenderer} />
          </div>
          <LikeBtn
            slug={post?.slug}
            isLiked={postResponse?.additionalInfo?.userLikedPost ?? false}
          />
          <hr style={{ marginTop: "3rem" }} />
          <div className={styles.comment}>
            <Comments postSlug={slug as string} sizeOfComments={20} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePostUI;
