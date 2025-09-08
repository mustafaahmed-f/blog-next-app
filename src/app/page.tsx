import CardList from "@/_components/CardList/CardList";
import CategoryList from "@/_features/Categories/subComponents/CategoryList";
import Featured from "@/_features/Posts/subComponents/Featured/Featured";
import Menu from "@/_components/Menu/Menu";
import styles from "./homepage.module.css";
import { Suspense } from "react";
import LoadingSection from "@/_components/Spinner/LoadingSection";

export default async function Home({ searchParams }: { searchParams: any }) {
  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  return (
    <div className={styles.container}>
      <Suspense fallback={<LoadingSection />}>
        <Featured />
      </Suspense>
      <CategoryList />
      <div className={styles.content}>
        {/* //todo : see how to get category */}
        <CardList page={page} cat="" />
        <Menu />
      </div>
    </div>
  );
}
