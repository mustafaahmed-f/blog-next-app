import CategoryList from "@/_components/HomePage/CategoryList";
import styles from "./homepage.module.css";
import Featured from "@/_components/HomePage/Featured";
import CardList from "@/_components/HomePage/CardList";
import Menu from "@/_components/HomePage/Menu";
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
