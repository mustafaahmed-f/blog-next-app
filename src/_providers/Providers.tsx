"use client";

import { CategoriesProvider } from "@/_context/CategoriesContext";
import { FeaturedPostsProvider } from "@/_context/FeaturedPostsContext";
import { ThemeContextProvider } from "@/_context/ThemeContext";
import { queryClient } from "@/_services/TanstackQuery_Client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  fetchedCategories: any;
  featuredPosts: any;
  catchedError: { catgoriesError: string; postsError: string };
}

function Providers({
  children,
  featuredPosts,
  catchedError,
  fetchedCategories,
}: ProvidersProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <FeaturedPostsProvider
          featuredPosts={featuredPosts}
          catchedError={catchedError.postsError}
        >
          <CategoriesProvider
            fetchedCategories={fetchedCategories}
            catchedError={catchedError.catgoriesError}
          >
            {children}
          </CategoriesProvider>
        </FeaturedPostsProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}

export default Providers;
