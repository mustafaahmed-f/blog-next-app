import { createContext, useContext } from "react";

type contextType = {
  featuredPosts: any;
  catchedError: any;
};

const initialState: contextType = {
  featuredPosts: [],
  catchedError: null,
};

const featuredPostsContext = createContext<contextType>(initialState);

export function FeaturedPostsProvider({
  children,
  featuredPosts,
  catchedError,
}: {
  children: React.ReactNode;
  featuredPosts: any;
  catchedError: any;
}) {
  return (
    <featuredPostsContext.Provider
      value={{ featuredPosts: featuredPosts || [], catchedError }}
    >
      {children}
    </featuredPostsContext.Provider>
  );
}

export function useFeaturedPosts() {
  const context = useContext(featuredPostsContext);
  if (!context) {
    throw new Error(
      "Can't use featuredPostsContext outside featuredPostsProvider !!",
    );
  }
  return context;
}
