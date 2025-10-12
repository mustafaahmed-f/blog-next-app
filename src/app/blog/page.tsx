import CardList from "@/_features/Posts/subComponents/CardList/CardList";
import Menu from "@/_components/Menu/Menu";
import styles from "./blogPage.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts by category",
};

interface PageProps {
  searchParams: Promise<{
    page: string;
    cat: string;
    name: string;
  }>;
}

async function Page({ searchParams }: PageProps) {
  const page = parseInt((await searchParams).page) || 1;
  const { cat, name } = await searchParams;

  if (!cat)
    return (
      <div className={`${styles.container} text-red-500`}>
        No Category Found
      </div>
    );

  return (
    <div className={styles.container}>
      {<h1 className={styles.title}>{name ? name : "Category"} Blog</h1>}
      <div className={styles.content}>
        <CardList page={page} category={cat} />
        <Menu />
      </div>
    </div>
  );
}

export default Page;
