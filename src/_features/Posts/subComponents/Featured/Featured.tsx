import ErrorToast from "@/_components/Toasts/ErrorToast";
import Image from "next/image";
import { getFeaturedPosts } from "../../services/getFeaturedPosts";
import styles from "./featured.module.css";

const Featured = async () => {
  //todo: use get featured posts and use the first post
  let featuredPosts: any = null;
  let catchedError: string | null | undefined = null;

  try {
    const response: any = await getFeaturedPosts();
    featuredPosts = await response?.data;
  } catch (error: any) {
    console.log("error", error);
    catchedError = error?.message;
  }

  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}

      <div className={styles.container}>
        <h1 className={styles.title}>
          <b>Hey, lama dev here!</b> Discover my stories and creative ideas.
        </h1>
        {featuredPosts ? (
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
              <button className={styles.button}>Read More</button>
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
