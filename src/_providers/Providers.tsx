"use client";

import { CategoriesProvider } from "@/_context/CategoriesContext";
import { FeaturedPostsProvider } from "@/_context/FeaturedPostsContext";
import { ThemeContextProvider } from "@/_context/ThemeContext";
import { queryClient } from "@/_services/TanstackQuery_Client";
import { ensureClientId } from "@/_utils/helperMethods/ensureClientId";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ProvidersProps {
  children: React.ReactNode;

  featuredPosts: any;
  catchedError: { catgoriesError: string; postsError: string };
}

function Providers({ children, featuredPosts, catchedError }: ProvidersProps) {
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
          <CategoriesProvider>{children}</CategoriesProvider>
        </FeaturedPostsProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}

export default Providers;
