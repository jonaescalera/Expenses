import React from "react";
import {Header as HeaderRNE, Text} from "@rneui/themed";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet} from "react-native";

type HeaderComponentProps = {
  title: string;
  view?: string;
};

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});

const Header: React.FC<HeaderComponentProps> = ({title}) => {
  return (
    <SafeAreaView>
      <HeaderRNE
        //backgroundColor="blue"
        leftComponent={{
          icon: "menu",
          color: "white",
        }}
        centerComponent={{text: title, style: styles.heading}}
        rightComponent={{
          icon: "home",
          color: "white",
        }}
      />
    </SafeAreaView>
  );
};

export default Header;
