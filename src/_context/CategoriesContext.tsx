import { createContext, useContext } from "react";

type contextType = {
  fetchedCategories: any;
  catchedError: any;
};

const initialState: contextType = {
  fetchedCategories: [],
  catchedError: null,
};

const categoriesContext = createContext<contextType>(initialState);

export function CategoriesProvider({
  children,
  fetchedCategories,
  catchedError,
}: {
  children: React.ReactNode;
  fetchedCategories: any;
  catchedError: any;
}) {
  return (
    <categoriesContext.Provider
      value={{ fetchedCategories: fetchedCategories || [], catchedError }}
    >
      {children}
    </categoriesContext.Provider>
  );
}

export function useCategoires() {
  const context = useContext(categoriesContext);
  if (!context) {
    throw new Error(
      "Can't use categoiresContext outside CategoriesProvider !!",
    );
  }
  return context;
}
