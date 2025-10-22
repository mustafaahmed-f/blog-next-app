"use client";

import { showErrorToast } from "@/_utils/helperMethods/showToasts";
import { EyeIcon } from "lucide-react";
import { useEffect } from "react";
import { incViews } from "../../services/incViews";
import styles from "./PostViews.module.css";

import { RevalidateTagMethod } from "@/_services/RevalidateTagMethod";
import { mainModules } from "@/_utils/constants/mainModules";

interface PostViewsProps {
  postViews: number;
  postId: string;
  postSlug: string;
}

function PostViews({ postViews, postId, postSlug }: PostViewsProps) {
  useEffect(() => {
    async function incViewsFn() {
      let viewedPosts = JSON.parse(
        localStorage.getItem("blog_app_post_views") ?? "[]",
      );
      if (viewedPosts.includes(postId)) return;
      await incViews(postId, postSlug).catch((error: any) => {
        if (error.message !== "You already viewed this post") {
          showErrorToast(error.message);
          console.error(error);
        }
        RevalidateTagMethod(mainModules.post, "singleRecord", postSlug);
        viewedPosts.push(postId);
        localStorage.setItem(
          "blog_app_post_views",
          JSON.stringify(viewedPosts),
        );
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
