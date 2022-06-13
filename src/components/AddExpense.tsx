import {Button, Text} from "@rneui/base";
import {Input} from "@rneui/themed";
import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm, Controller} from "react-hook-form";

type FormData = {
  expense: string;
};

type NavigationProps = {
  name: string;
  params: string;
  merge: boolean;
};

const AddExpense: React.FC<FormData> = ({expense}) => {
  const navigation = useNavigation<NavigationProps>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.contain}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            //style={styles.input}
            placeholder="Add expense"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="expense"
      />
      {errors.expense && <Text style={styles.alertText}>This is required</Text>}

      <Button
        style={styles.button}
        title="submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    //flexWrap: "wrap",
    flexDirection: "column",
    //justifyContent: "center",
    alignItems: "center",
    //alignContent: "space-between",
  },
  input: {
    borderWidth: 1,
    width: 300,
  },
  alertText: {
    color: "red",
  },
  button: {
    alignSelf: "center",
  },
});

export default AddExpense;
