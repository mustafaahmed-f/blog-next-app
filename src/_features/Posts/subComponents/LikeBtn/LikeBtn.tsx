"use client";

import { useState } from "react";
import styles from "./LikeBtn.module.css";
import { HeartIcon } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { likePost } from "../../services/likePost";
import {
  showErrorToast,
  showSuccessToast,
} from "@/_utils/helperMethods/showToasts";
import { useRouter } from "next/navigation";

interface LikeBtnProps {
  slug: string;
  isLiked: boolean;
}

function LikeBtn({ slug, isLiked }: LikeBtnProps) {
  const { getToken } = useAuth();
  const router = useRouter();
  const { 0: liked, 1: setLiked } = useState(isLiked ?? false);
  async function handleLike() {
    const token = await getToken();
    const response = await likePost(slug, token as string);
    if (response.error) {
      showErrorToast(response.error);
    } else {
      setLiked(!liked);
      // showSuccessToast(response.message);
      router.refresh();
    }
  }
  return (
    <div
      className={`${styles.likeSection} w-fit cursor-pointer`}
      onClick={handleLike}
    >
      <HeartIcon
        color="black"
        className={`${styles.likeIcon} ${liked ? styles.active : ""}`}
        fill="currentColor"
      />
      <p className="">{liked ? "Unlike" : "Like"}</p>
    </div>
  );
}

export default LikeBtn;
