"use client";

import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";
import { useCategoires } from "@/_context/CategoriesContext";
import ErrorToast from "@/_components/Toasts/ErrorToast";

const MenuCategories = () => {
  const { fetchedCategories, catchedError } = useCategoires();
  return (
    <>
      {catchedError && <ErrorToast error={catchedError} />}
      <div className={styles.categoryList}>
        {fetchedCategories && fetchedCategories.length ? (
          fetchedCategories?.map((item: any) => (
            <Link
              href={`/blog?cat=${item.id}`}
              className={`${styles.categoryItem} ${styles[item.slug]}`}
              key={item.id}
            >
              {item?.title}
            </Link>
          ))
        ) : (
          <p>No categories yet.</p>
        )}
      </div>
    </>
  );
};

export default MenuCategories;
