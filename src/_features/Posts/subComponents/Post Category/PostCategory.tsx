"use client";

import styles from "./PostCategory.module.css";
import { useCategoires } from "@/_context/CategoriesContext";
import Link from "next/link";

interface PostCategoryProps {
  categoryId: string;
}

function PostCategory({ categoryId }: PostCategoryProps) {
  const { fetchedCategories } = useCategoires();
  const postCategory = fetchedCategories.find(
    (item: any) => item.id === categoryId,
  );
  return (
    <div className={`${styles.category} ${styles[postCategory.title]}`}>
      {postCategory.title ?? ""}
    </div>
  );
}

export default PostCategory;
