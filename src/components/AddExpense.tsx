import {Text} from "@rneui/base";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";

// interface AppProps {
//     : string;
// }

const AddExpense: React.FC<any | null> = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>Add Expense</Text>
    </SafeAreaView>
  );
};

export default AddExpense;
