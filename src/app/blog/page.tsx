import CardList from "@/_components/CardList/CardList";
import Menu from "@/_components/Menu/Menu";
import styles from "./blogPage.module.css";

interface PageProps {
  searchParams: {
    page: string;
    cat: string;
  };
}

function Page({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Blog</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
}

export default Page;
