"use client";

import { useEffect, useState } from "react";
import Comments from "./Comments";
import { useRouter } from "next/navigation";
import styles from "@/app/posts/[slug]/postPage.module.css";
import { Button } from "@/_components/ui/button";
import { getImgSrc } from "@/_utils/helperMethods/getImgSrc";

interface CommentsPageProps {
  postSlug: string;
  post: any;
}

function CommentsPage({ postSlug, post }: CommentsPageProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {/* ✅ Post Header */}
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <Button
            onClick={() => router.push(`/posts/${postSlug}`)}
            variant={"link"}
            style={{ cursor: "pointer" }}
          >
            <span style={{ marginRight: "2px" }}>←</span> Back to Post
          </Button>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.user}>
            <div className={styles.userImageContainer}>
              <img
                src={getImgSrc(post?.user?.img)}
                alt={post?.user?.userName}
                className={styles.avatar}
              />
            </div>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post?.user?.userName}</span>
              <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Comments Section */}
      <div className={styles.post}>
        <h2 className="mb-6 text-2xl font-semibold">All Comments</h2>
        <Comments postSlug={postSlug} sizeOfComments={20} fullComments />
      </div>

      {/* ✅ Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 rounded-full bg-gray-800 px-4 py-2 text-white shadow-lg transition hover:bg-gray-700"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}

export default CommentsPage;
