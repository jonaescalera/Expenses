/* eslint-disable max-len */
import React, {
  FC,
  Dispatch,
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useContext,
} from "react";
import {getTodoItems, getDBConnection, createTable} from "../db-service";
import {asyncer} from "../middleware";
import {Expense} from "../models/Expense";

export interface AppContextInterface {
  theme: boolean;
  handleTheme?: () => void;
  items: Array<Expense>;
  handleItems?: (item: Expense[]) => void;
  getItems?: () => Array<Expense>;
  getTotalMonth: () => number;
}

const list: Array<Expense> = [
  {
    id: 1,
    name: "Cristo Obrero cuota",
    date: "01/06/2022",
    price: 234,
  },
  // {
  //   id: 2,
  //   name: "Reloj smartwatch",
  //   date: "01/06/2022",
  //   price: "1.000",
  // },
  // {
  //   id: 3,
  //   name: "Edesur",
  //   date: "01/06/2022",
  //   price: "4.569",
  // },
  // {
  //   id: 4,
  //   name: "Fibertel",
  //   date: "01/06/2022",
  //   price: "2.091",
  // },
  // {
  //   id: 5,
  //   name: "Personal",
  //   date: "01/06/2022",
  //   price: "10.765",
  // },
];

// interface AppState {
//   items: Expense[];
// }

// const initialState: AppState = {
//   //theme: true,
//   items: [{
//     id: 1,
//     name: "Cristo Obrero cuota",
//     date: "01/06/2022",
//     price: 234,
//   }]
// };

// const defaultTheme = {
//   theme: true,
//   items: list,
//   getTotalMonth: () => 0,
// };

export interface AppState {
  // count:number;
  items: Expense[];
  theme: boolean;
  loading: boolean;
  error: string;
  totalItems: number;
}

const initialState: AppState = {
  //count: 0,
  items: [],
  theme: true,
  loading: false,
  error: "",
  totalItems: 0,
};

export type ACTIONTYPE =
  | {type: "INIT"}
  | {type: "GET_ITEMS"; payload: Array<Expense>}
  | {type: "SET_THEME"}
  | {type: "DELETE_ITEM"; payload: number}
  | {type: "ADD_ITEM"; payload: Expense}
  | {type: "GET_TOTAL_MONTH"}
  | {type: "FETCH_ERROR"; payload: string};

function reducer(state: typeof initialState, action: ACTIONTYPE): AppState {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        loading: true,
      };
    case "GET_ITEMS":
      return {
        ...state,
        items: [...action.payload],
        loading: false,
        error: "",
      };
    case "SET_THEME":
      return {
        ...state,
        theme: !state.theme,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(x => x.id !== action.payload),
        totalItems: state.items.reduce(
          (sum, curr) => sum + (curr.price || 0),
          0,
        ),
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "GET_TOTAL_MONTH":
      return {
        ...state,
        totalItems: state.items.reduce(
          (sum, curr) => sum + (curr.price || 0),
          0,
        ),
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

const ThemeContext = createContext<{
  state: AppState;
  dispatch: Dispatch<ACTIONTYPE>;
}>({
  state: initialState,
  dispatch: () => null,
});

// export const useContextGlobal = () => useContext(ThemeContext);

const ThemeProvider: FC<React.ReactNode> = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // const [theme, setTheme] = useState(defaultTheme.theme);
  // const [items, setItems] = useState(defaultTheme.items);

  //const dispatch = useCallback(asyncer(dispatchBase, state), []);

  // const handleTheme = () => {
  //   setTheme(!theme);
  // };

  // const handleItems = (values: Expense[]) => {
  //   setItems(values);
  // };

  // const getItems = () => {
  //   return items.sort((a, b) => b.id - a.id);
  // };

  // const getTotalMonth = () => {
  //   //let final = 0;
  //   return items && items.reduce((sum, curr) => sum + (curr.price || 0), 0);
  //   //return final;
  // };

  return (
    <ThemeContext.Provider value={{state, dispatch}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeContext, ThemeProvider};
//export default ThemeProvider;
