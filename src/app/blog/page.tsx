import CardList from "@/_features/Posts/subComponents/CardList/CardList";
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
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}

export default Page;
