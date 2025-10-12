"use client";

import styles from "./PostViews.module.css";
import { EyeIcon } from "lucide-react";
import { useEffect } from "react";
import { incViews } from "../../services/incViews";
import { showErrorToast } from "@/_utils/helperMethods/showToasts";

interface PostViewsProps {
  postViews: number;
  postId: string;
  postSlug: string;
}

function PostViews({ postViews, postId, postSlug }: PostViewsProps) {
  useEffect(() => {
    async function incViewsFn() {
      await incViews(postId, postSlug).catch((error: any) => {
        if (error.message !== "You already viewed this post") {
          showErrorToast(error.message);
          console.error(error);
        }
      });
    }
    incViewsFn();
  }, []);

  return (
    <div className={styles.statItem}>
      <EyeIcon className={styles.statIcon} />
      <span>{postViews}</span>
    </div>
  );
}

export default PostViews;
