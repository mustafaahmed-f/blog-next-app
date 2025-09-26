import { useReducer } from "react";

type initialStateType = {
  desc: string;
  cursor: string;
};
const initialState: initialStateType = {
  desc: "",
  cursor: "",
};

function reducer(state: initialStateType, action: any): initialStateType {
  switch (action.type) {
    case "setDesc":
      return { ...state, desc: action.payload };

    case "setCursor":
      return { ...state, cursor: action.payload };

    default:
      return initialState;
  }
}

function useComments() {
  const {
    0: { desc, cursor },
    1: dispatch,
  } = useReducer(reducer, initialState);

  //// Create actions
  function setDesc(desc: string) {
    dispatch({ type: "setDesc", payload: desc });
  }

  function setCursor(cursor: string) {
    dispatch({ type: "setCursor", payload: cursor });
  }

  return {
    desc,

    cursor,
    setDesc,

    setCursor,
  };
}

export default useComments;
