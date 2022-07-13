import React from "react";
import theme from "./src/styles/app.theme";
import Home from "./src/components/Home";
import Header from "./src/components/Header";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import AddExpense from "./src/components/AddExpense";
import Icon from "react-native-vector-icons/FontAwesome";
import {ThemeProvider} from "./src/context/ThemeContext";
import ThemeButton from "./src/components/ThemeButton";

//import AppLogo from "../components/commons/ui/AppLogo";

export type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList>;

const App = () => {
  const darkIcon = <Icon name="rocket" size={30} color="white" />;
  const whiteIcon = <Icon name="rocket" size={30} color="white" />;
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: "center",
            //headerTitle: "Home",
            headerTitleStyle: {fontWeight: "bold"},
            headerStyle: {backgroundColor: "#33BBFF"},
            headerTintColor: "white",
            headerRight: () => <ThemeButton />,
          }}>
          {/* <Stack.Screen name="Header" component={Header} /> */}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
        </Stack.Navigator>
        {/* <View style={styles.container}>
      <Header title="Gastos" />
      {/* <Body title="Test" />  */}
        {/* <View style={[styles.top]} /> */}
        {/* <View style={styles.body}> */}
        {/* <Home title="Test" /> */}
        {/* </View> */}
        {/* <View style={styles.bottom} /> */}
        {/* <View style={[styles.box, {backgroundColor: "yellow"}]} />
      <View style={[styles.box, {backgroundColor: "red"}]} />
      <View style={[styles.box, {backgroundColor: "green"}]} />
      <View style={[styles.box, {backgroundColor: "blue"}]} />
      <View style={[styles.box, {backgroundColor: "orange"}]} /> */}
        {/* <View style={[styles.box, {backgroundColor: "mediumslateblue"}]} /> 
    </View> */}
      </ThemeProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "black",
    //flexDirection: "row",
    //direction: "rtl",
    //alignItems: "center",
    //flexDirection: "row-reverse",
    //justifyContent: "center",
    //flexWrap: "wrap",
    //flexDirection: "row",
    //alignContent: "space-around",
    //maxHeight: 400,
    //padding: 20,
  },
  box: {
    width: 300,
    height: 100,
  },
  top: {flex: 2, backgroundColor: "pink"},
  body: {flex: 6, backgroundColor: "red"},
  bottom: {flex: 1, backgroundColor: "purple"},
});

export default App;
