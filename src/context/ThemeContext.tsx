import React, {FC, useState, createContext} from "react";

const lightTheme = "red";
const darkTheme = "black";

export interface AppContextInterface {
  theme: boolean;
  handleTheme?: () => void;
}

const defaultTheme = {
  theme: true,
};

export const ThemeContext = createContext<AppContextInterface>(defaultTheme);
//  export const ProviderMode = ThemeContext.Provider;
//  export const ConsumerMode = ThemeContext.Consumer;

const ThemeProvider: FC = ({children}) => {
  const [theme, setTheme] = useState(defaultTheme.theme);
  const handleTheme = () => {
    //const button: HTMLButtonElement = e.currentTarget;
    // if (e === lightTheme) {
    //   setTheme(darkTheme);
    // } else if (e === darkTheme) {
    //   setTheme(lightTheme);
    // }
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider value={{theme, handleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export {ThemeProvider};
export default ThemeProvider;

//export default ThemeContext;
