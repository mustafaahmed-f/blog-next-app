"use client";

import Spinner from "@/_components/Spinner/Spinner";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/getPosts";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import styles from "./cardList.module.css";

const CardList = ({ page }: { page: number }) => {
  const POST_PER_PAGE = 3;

  const { data, isPending, isFetching, isError, error, isSuccess } = useQuery({
    queryKey: [page, "main_page_recent_posts"],
    queryFn: () => {
      return getPosts(page, POST_PER_PAGE);
    },
    placeholderData: keepPreviousData,
  });

  const posts = !isFetching && data ? data.data : null;

  const hasPrev = page - 1 > 0;
  const hasNext = data?.additionalInfo.hasNext;

  if (isError) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: "center", margin: "50px 0px", color: "red" }}>
          Unable to fetch posts or category undefined
        </p>
        <p style={{ textAlign: "center", margin: "50px 0px", color: "red" }}>
          {error?.message}
        </p>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item: any) => (
          <div key={item.id}>
            <Card item={item} />
          </div>
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
