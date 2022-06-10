import * as React from "react";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator  } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const AppStack = () => {
    
    <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
      
 
}

export default AppStack;