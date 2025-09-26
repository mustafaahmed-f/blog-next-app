import Menu from "@/_components/Menu/Menu";
import CategoryList from "@/_features/Categories/subComponents/CategoryList/CategoryList";
import CardList from "@/_features/Posts/subComponents/CardList/CardList";
import Featured from "@/_features/Posts/subComponents/Featured/Featured";
import styles from "./homepage.module.css";

export default async function Home({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  return (
    <>
      <div className={styles.container}>
        <Featured />

        <CategoryList />
        <div className={styles.content}>
          {/* //todo : see how to get category */}
          <CardList page={page} />
          <Menu />
        </div>
      </div>
    </>
  );
}
