import CardList from "@/_features/Posts/subComponents/CardList/CardList";
import CategoryList from "@/_features/Categories/subComponents/CategoryList";
import Featured from "@/_features/Posts/subComponents/Featured/Featured";
import Menu from "@/_components/Menu/Menu";
import styles from "./homepage.module.css";
import { Suspense } from "react";
import LoadingSection from "@/_components/Spinner/LoadingSection";
import { getCategories } from "@/_features/Categories/services/getCategories";
import ErrorToast from "@/_components/Toasts/ErrorToast";
import { getRandomInt } from "@/_utils/helperMethods/getRandomNumber";

export default async function Home({ searchParams }: { searchParams: any }) {
  let data: any = null;
  let catchedError: string | null | undefined = null;
  try {
    const response: any = await getCategories();
    data = await response?.data;
  } catch (error: any) {
    console.log("error", error);
    catchedError = error?.message;
  }

  let targetCategoy = data ? data[getRandomInt(0, data.length - 1)] : null;

  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <div className={styles.container}>
        <Suspense fallback={<LoadingSection />}>
          <Featured />
        </Suspense>
        <CategoryList categories={data} />
        <div className={styles.content}>
          {/* //todo : see how to get category */}
          <CardList page={page} cat={targetCategoy.id} />
          <Menu />
        </div>
      </div>
    </>
  );
}
