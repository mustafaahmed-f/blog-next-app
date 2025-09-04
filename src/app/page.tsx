import CardList from "@/_components/CardList/CardList";
import CategoryList from "@/_components/CategoryList/CategoryList";
import Featured from "@/_components/Featured/Featured";
import Menu from "@/_components/Menu/Menu";
import styles from "./homepage.module.css";

export default async function Home({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        {/* //todo : see how to get category */}
        <CardList page={page} cat="" />
        <Menu />
      </div>
    </div>
  );
}
