"use client";

import React from "react";
import styles from "./cardList.module.css";
import Image from "next/image";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPostsWithCategory } from "../../services/getPostsWithCategory";

const CardList = ({ page, cat }: { page: number; cat: string | null }) => {
  const POST_PER_PAGE = 2;

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: [page, cat, "posts"],
    queryFn: () => {
      return cat ? getPostsWithCategory(cat) : null;
    },
    placeholderData: keepPreviousData,
  });

  console.log("data", data);
  console.log("Category : ", cat);

  const posts = !isFetching && data ? data.data : null;

  const hasPrev = page - 1 > 0;
  const hasNext = true;

  return cat ? (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item: any) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  ) : (
    <div className={styles.container}>
      <p style={{ textAlign: "center", margin: "50px 0px", color: "red" }}>
        Unable to fetch posts or category undefined
      </p>
    </div>
  );
};

export default CardList;
