// 使用 useReducer和context 创建一个左右滚动关联的状态

import { createContext, PropsWithChildren, useContext, useReducer } from "react";

interface IPreviewState {
  previewIndex: number;
  totalPages: number;
  setPreviewIndex: (index: number) => void;
  setTotalPage: (totalPage: number) => void;
}

const initialState: IPreviewState = {
  previewIndex: 0,
  totalPages:0 , 
  setPreviewIndex: () => {},
  setTotalPage: () => {}
};

const PreviewStateContext = createContext<IPreviewState>(initialState);

function previewReducer(state: IPreviewState, action: any) {
  switch (action.type) {
    case "SET_PREVIEW_INDEX":
      return {
        ...state,
        previewIndex: action.payload,
      };
    case "SET_TOTAL_PAGE":
        return {
            ...state,
            totalPages: action.payload,
        }
    default:
      return state;
  }
}

export function usePreviewState() {
  return useContext(PreviewStateContext);
}

export function PreviewStateContainer(props: PropsWithChildren) {
  const [state, dispatch] = useReducer(previewReducer, initialState);
  return (
    <PreviewStateContext.Provider
      value={{
        previewIndex: state.previewIndex,
        totalPages: state.totalPages,
        setTotalPage: (totalPage: number) =>
          dispatch({ type: "SET_TOTAL_PAGE", payload: totalPage }),
        setPreviewIndex: (index: number) =>
          dispatch({ type: "SET_PREVIEW_INDEX", payload: index }),
      }}
    >
      {props.children}
    </PreviewStateContext.Provider>
  );
}
