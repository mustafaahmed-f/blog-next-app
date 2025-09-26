"use client";

import Image from "next/image";
import styles from "./featured.module.css";
import ErrorToast from "@/_components/Toasts/ErrorToast";
import { useFeaturedPosts } from "@/_context/FeaturedPostsContext";
import Link from "next/link";

const Featured = () => {
  const { featuredPosts, catchedError } = useFeaturedPosts();
  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <div className={styles.container}>
        <h1 className={styles.title}>
          <b>Hey, lama dev here!</b> Discover my stories and creative ideas.
        </h1>
        {featuredPosts && featuredPosts.length ? (
          <div className={styles.post}>
            <div className={styles.imgContainer}>
              <Image
                src={featuredPosts[0]?.img}
                alt={featuredPosts[0]?.title}
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.textContainer}>
              <h1 className={styles.postTitle}>{featuredPosts[0]?.title}</h1>
              <p className={styles.postDesc}>{featuredPosts[0]?.desc}</p>
              <Link
                href={`/posts/${featuredPosts[0]?.slug}`}
                className={styles.buttons}
              >
                Read More
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center p-2">
            <p>Unable to fetch featured posts</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Featured;
