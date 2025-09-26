"use client";

import React, { TransitionStartFunction } from "react";
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  page,
  hasPrev,
  hasNext,
  startTransition,
}: {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
  startTransition: TransitionStartFunction;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    startTransition(() => {
      router.replace(`${pathName}?${params.toString()}`);
    });
  };

  //todo : reconfigure pagination methods here
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChange(page - 1)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => handleChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
