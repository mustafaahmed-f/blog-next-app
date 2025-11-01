import { getCategories } from "@/_features/Categories/services/getCategories";
import { ensureClientId } from "@/_utils/helperMethods/ensureClientId";
import { createContext, useContext, useEffect, useState } from "react";

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
}: {
  children: React.ReactNode;
}) {
  const { 0: finalCategories, 1: setFinalCategories } = useState([]);

  useEffect(() => {
    async function getCategoriesMethod() {
      const clientId = ensureClientId();
      const categories = await getCategories(clientId);
      setFinalCategories(categories?.data);
    }
    getCategoriesMethod();
  }, [setFinalCategories]);

  return (
    <categoriesContext.Provider
      value={{ fetchedCategories: finalCategories, catchedError: "" }}
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
