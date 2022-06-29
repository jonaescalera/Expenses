import React, {useCallback, useContext, useEffect} from "react";
import {ListItem, Card} from "@rneui/themed";
import {Button} from "@rneui/base";
import {ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {ThemeContext} from "./../context/ThemeContext";
import {
  createTable,
  deleteTodoItem,
  getDBConnection,
  getTodoItems,
  saveTodoItems,
} from "../db-service";
import {Expense} from "../models/Expense";
import {useIsFocused} from "@react-navigation/native";
import {convertValueToMask} from "../utils/maskHelper";

interface CurrentProps {
  title: string;
}

const Home = ({navigation, route}) => {
  //const {theme} = useTheme();
  const {width, height} = Dimensions.get("screen");
  const {theme, items, handleItems, getItems, getTotalMonth} =
    useContext(ThemeContext);
  const expenseItems = getItems?.();
  const totalItems = getTotalMonth();
  //items && items.reduce((sum, curr) => sum + (curr.price || 0), 0);
  const isFocused = useIsFocused();

  const loadDataCallBack = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      console.log(db);
      const storeItems = await getTodoItems(db);
      console.log(storeItems);
      if (storeItems.length) {
        console.log("entro");
        handleItems?.(storeItems);
      } else if (items.length) {
        await saveTodoItems(db, items);
        handleItems?.(storeItems);
      } else {
        handleItems?.(storeItems);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    isFocused && loadDataCallBack();
  }, [loadDataCallBack, isFocused]);

  const styles = StyleSheet.create({
    contain: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    titleCard: {
      fontSize: 40,
      color: theme ? "black" : "white",
    },
    listItem: {
      backgroundColor: theme ? "white" : "black",
      width: width,
      borderBottomWidth: 1,
    },
    colorTheme: {
      color: theme ? "black" : "white",
    },
  });

  const editExpense = (item: Expense) => {
    navigation.navigate("AddExpense", {item});
  };

  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      items.splice(id, 1);
      handleItems?.(items.slice(0));
      loadDataCallBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.contain}>
        <Card
          containerStyle={{
            width: "auto",
            backgroundColor: theme ? "white" : "black",
          }}>
          <Card.Title style={styles.titleCard}>
            $ {convertValueToMask(totalItems)}
          </Card.Title>
        </Card>
        <ScrollView style={{maxHeight: 290}}>
          {expenseItems?.map((item, index) => (
            <ListItem.Swipeable
              key={index}
              bottomDivider
              containerStyle={styles.listItem}
              leftContent={() => (
                <Button
                  title="edit"
                  onPress={() => editExpense(item)}
                  icon={{name: "edit", color: "white"}}
                  buttonStyle={{minHeight: "100%", backgroundColor: "blue"}}
                />
              )}
              rightContent={() => (
                <Button
                  title="Delete"
                  onPress={() => deleteItem(item.id)}
                  icon={{name: "delete", color: "white"}}
                  buttonStyle={{minHeight: "100%", backgroundColor: "red"}}
                />
              )}>
              <ListItem.Content>
                <ListItem.Title style={styles.colorTheme}>
                  {item.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.colorTheme} right>
                  {item.date}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content right>
                <ListItem.Title style={styles.colorTheme}>
                  $ {item.price}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron style={{marginRight: 15}} />
            </ListItem.Swipeable>
          ))}
        </ScrollView>
        <View>
          <Button
            title="Nuevo gasto"
            buttonStyle={{
              backgroundColor: "#33BBFF",
              borderRadius: 3,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate("AddExpense", {})}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
