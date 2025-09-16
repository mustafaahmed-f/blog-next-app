import Menu from "@/_components/Menu/Menu";
import LoadingSection from "@/_components/Spinner/LoadingSection";
import ErrorToast from "@/_components/Toasts/ErrorToast";
import { getCategories } from "@/_features/Categories/services/getCategories";
import CategoryList from "@/_features/Categories/subComponents/CategoryList";
import { getFeaturedPosts } from "@/_features/Posts/services/getFeaturedPosts";
import CardList from "@/_features/Posts/subComponents/CardList/CardList";
import Featured from "@/_features/Posts/subComponents/Featured/Featured";
import { Suspense } from "react";
import styles from "./homepage.module.css";

export default async function Home({ searchParams }: { searchParams: any }) {
  let fetchedCategories: any = null;
  let featuredPosts: any = null;
  let catchedError: { catgoriesError: string; postsError: string } = {
    catgoriesError: "",
    postsError: "",
  };
  try {
    const [featuredPostsResponse, categoriesResponse] = await Promise.all([
      getFeaturedPosts().catch((err: any) => {
        catchedError!.postsError = err?.message;
        console.log("Posts error : ", err);
      }),
      getCategories().catch((err: any) => {
        catchedError!.catgoriesError = err?.message;
        console.log("Categories error : ", err);
      }),
    ]);

    fetchedCategories = categoriesResponse?.data;
    featuredPosts = featuredPostsResponse?.data;
  } catch (error: any) {
    console.log("Unexpected error : ", error);
  }

  const params = await searchParams;
  const page = parseInt(params.page) || 1;
  return (
    <>
      {catchedError.postsError && (
        <ErrorToast error={catchedError.postsError} />
      )}
      {catchedError.catgoriesError && (
        <ErrorToast error={catchedError.catgoriesError} />
      )}
      <div className={styles.container}>
        <Suspense fallback={<LoadingSection />}>
          <Featured
            featuredPosts={featuredPosts}
            catchedError={catchedError.postsError}
          />
        </Suspense>
        <CategoryList categories={fetchedCategories} />
        <div className={styles.content}>
          {/* //todo : see how to get category */}
          <CardList page={page} />
          <Menu featuredPosts={featuredPosts} />
        </div>
      </div>
    </>
  );
}
