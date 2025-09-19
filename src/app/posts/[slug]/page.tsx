import Image from "next/image";
import styles from "./postPage.module.css";
import Comments from "@/_features/Comments/subComponents/Comments/Comments";
import Menu from "@/_components/Menu/Menu";
import { getSinglePost } from "@/_features/Posts/services/getSinglePost";
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function Page({ params }: PageProps) {
  const { slug } = await params;

  const response = await getSinglePost(slug);

  const post: any = response.data;

  // return <div>Single post</div>;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.user}>
            {post?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={post.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post?.user.userName}</span>
              <span className={styles.date}>{post?.createdAt}</span>
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
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: post?.desc }}
          />
          <hr style={{ marginTop: "3rem" }} />
          <div className={styles.comment}>
            {/* //todo : get comments on client side */}
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default Page;
