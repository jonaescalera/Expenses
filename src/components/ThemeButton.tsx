import {ThemeContext} from "../context/ThemeContext";
import React, {useContext} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const ThemeButton: React.FC = () => {
  const {state, dispatch} = useContext(ThemeContext);
  const {theme} = state;

  const handleTheme = () => dispatch({type: "SET_THEME"});

  return (
    <Icon
      onPress={handleTheme}
      name={theme ? "nights-stay" : "wb-sunny"}
      size={30}
      color="white"
    />
  );
};

export default ThemeButton;
