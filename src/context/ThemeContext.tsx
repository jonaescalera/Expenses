import React, {FC, useState, createContext} from "react";
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
  // {
  //   id: 1,
  //   name: "Cristo Obrero cuota",
  //   date: "01/06/2022",
  //   price: 234,
  // },
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

const defaultTheme = {
  theme: true,
  items: list,
  getTotalMonth: () => 0,
};

export const ThemeContext = createContext<AppContextInterface>(defaultTheme);

const ThemeProvider: FC = ({children}) => {
  const [theme, setTheme] = useState(defaultTheme.theme);
  const [items, setItems] = useState(defaultTheme.items);
  const handleTheme = () => {
    setTheme(!theme);
  };

  const handleItems = (values: Expense[]) => {
    setItems(values);
  };

  const getItems = () => {
    return items.sort((a, b) => b.id - a.id);
  };

  const getTotalMonth = () => {
    //let final = 0;
    return items && items.reduce((sum, curr) => sum + (curr.price || 0), 0);
    //return final;
  };

  return (
    <ThemeContext.Provider
      value={{theme, handleTheme, items, handleItems, getItems, getTotalMonth}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeProvider};
export default ThemeProvider;
