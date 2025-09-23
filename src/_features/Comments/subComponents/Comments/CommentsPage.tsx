"use client";

import { Button } from "@/_components/ui/button";
import { getProfileImg } from "@/_utils/helperMethods/getProfileImg";
import styles from "@/app/posts/[slug]/postPage.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Comments from "./Comments";

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
                src={getProfileImg(post?.user?.img)}
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
          style={{
            padding: "5px",
            cursor: "pointer",
          }}
          className="fixed right-4 bottom-16 rounded-full bg-gray-800 p-10 text-white shadow-lg transition hover:bg-gray-700"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}

export default CommentsPage;
