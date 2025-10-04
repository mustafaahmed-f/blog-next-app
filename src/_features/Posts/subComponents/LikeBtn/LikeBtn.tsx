"use client";

import { useState } from "react";
import styles from "./LikeBtn.module.css";
import { HeartIcon } from "lucide-react";

interface LikeBtnProps {}

function LikeBtn({}: LikeBtnProps) {
  const { 0: liked, 1: setLiked } = useState(false);
  function handleLike() {
    setLiked(!liked);
  }
  return (
    <div className={styles.likeSection}>
      <HeartIcon
        color="black"
        className={`${styles.likeIcon} ${liked ? styles.active : ""}`}
        fill="currentColor"
        onClick={handleLike}
      />
    </div>
  );
}

export default LikeBtn;
