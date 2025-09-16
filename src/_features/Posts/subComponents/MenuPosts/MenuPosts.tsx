import Link from "next/link";
import styles from "./menuPosts.module.css";

const MenuPosts = ({ featuredPosts }: { featuredPosts: any }) => {
  return (
    <div className={styles.items}>
      {featuredPosts &&
        featuredPosts.slice(3, 7).map((item: any) => (
          <Link
            key={item.id}
            href={`/posts/${item.slug}`}
            className={styles.item}
          >
            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles[item.cat.slug]}`}>
                {item.cat.title}
              </span>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <div className={styles.detail}>
                <span className={styles.username}>{item.user.userName}</span>
                <span className={styles.date}>{item.createdAt}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MenuPosts;
