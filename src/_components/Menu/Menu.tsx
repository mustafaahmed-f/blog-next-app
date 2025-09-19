"use client";

import MenuPosts from "../../_features/Posts/subComponents/MenuPosts/MenuPosts";
import MenuCategories from "../../_features/Categories/subComponents/MenyCategories/MenuCategories";
import styles from "./menu.module.css";
import { useFeaturedPosts } from "@/_context/FeaturedPostsContext";

const Menu = () => {
  const { featuredPosts } = useFeaturedPosts();
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts featuredPosts={featuredPosts} />
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
    </div>
  );
};

export default Menu;
