import {Button, Text} from "@rneui/base";
import {Input} from "@rneui/themed";
import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {ThemeContext} from "../context/ThemeContext";
import {convertDate} from "../utils/dateHelper";
import {addItem} from "../actions";

type FormData = {
  name: string;
  price: string;
  date: string;
};

interface Props {
  navigation: any;
  route: any;
}

const AddExpense = ({navigation, route}) => {
  //const navigation = useNavigation<NavigationProps>();
  const {state, dispatch} = useContext(ThemeContext);
  const {items} = state;
  const {item} = route.params;
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const [newExpense, setNewExpense] = useState("");
  const onSubmit = (data: FormData) => {
    const dateItem = new Date();
    const obj: FormData = {
      //id: data?.id,
      name: data?.name,
      date: convertDate(dateItem),
      price: data?.price,
    };
    addExpense(obj);
  };

  const addExpense = async (newExpense: FormData) => {
    try {
      const newTodos = {
        id: items.length
          ? items.reduce((acc, cur) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1
          : 1,
        name: newExpense.name,
        date: newExpense.date,
        price: parseInt(newExpense.price),
      };

      addItem(newTodos)
        .then(res => {
          dispatch({type: "ADD_ITEM", payload: newTodos});
        })
        .catch(err => dispatch({type: "FETCH_ERROR", payload: err?.message}));

      setNewExpense("");
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.contain}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        defaultValue={item?.name}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Add expense"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />

      {errors.name && <Text style={styles.alertText}>This is required</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        defaultValue={item?.price}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Add price"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="price"
      />
      {errors.price && <Text style={styles.alertText}>This is required</Text>}

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
    flexDirection: "column",
    alignItems: "center",
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
