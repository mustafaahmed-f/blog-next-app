import MenuPosts from "../../_features/Posts/subComponents/MenuPosts/MenuPosts";
import MenuCategories from "../MenyCategories/MenuCategories";
import styles from "./menu.module.css";

const Menu = ({ featuredPosts }: { featuredPosts: any }) => {
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
