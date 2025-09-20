import { useReducer } from "react";

interface useCommentsProps {}

type initialStateType = {
  desc: string;
  cursor: string;
  hasMore: boolean;
};
const initialState: initialStateType = {
  desc: "",
  cursor: "",
  hasMore: false,
};

function reducer(state: initialStateType, action: any): initialStateType {
  switch (action.type) {
    case "setDesc":
      return { ...state, desc: action.payload };

    case "setHasMore":
      return { ...state, hasMore: action.payload };

    case "setCursor":
      return { ...state, cursor: action.payload };

    default:
      return initialState;
  }
}

function useComments() {
  const {
    0: { desc, hasMore, cursor },
    1: dispatch,
  } = useReducer(reducer, initialState);

  //// Create actions
  function setDesc(desc: string) {
    dispatch({ type: "setDesc", payload: desc });
  }

  function toggleHasMore(val: boolean) {
    dispatch({ type: "setHasMore", payload: val });
  }

  function setCursor(cursor: string) {
    dispatch({ type: "setCursor", payload: cursor });
  }

  return {
    desc,
    hasMore,
    cursor,
    setDesc,
    toggleHasMore,
    setCursor,
  };
}

export default useComments;
