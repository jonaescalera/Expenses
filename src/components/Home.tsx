import React, {useContext} from "react";
// import {Button} from "react-native";
import {Input, Text, useTheme, ListItem, Card} from "@rneui/themed";
import {Button} from "@rneui/base";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleSheet, View, Dimensions, Alert} from "react-native";
import AddExpense from "./AddExpense";
import {ThemeContext} from "./../context/ThemeContext";

interface CurrentProps {
  title: string;
}

const list = [
  {
    name: "Cristo Obrero cuota",
    date: "01/06/2022",
    price: "234,78",
  },
  {
    name: "Reloj smartwatch",
    date: "01/06/2022",
    price: "1.000",
  },
  {
    name: "Edesur",
    date: "01/06/2022",
    price: "4.569",
  },
  {
    name: "Fibertel",
    date: "01/06/2022",
    price: "2.091",
  },
  {
    name: "Personal",
    date: "01/06/2022",
    price: "10.765",
  },
];

const Home = ({navigation, route}) => {
  //const {theme} = useTheme();
  const {width, height} = Dimensions.get("screen");
  const {theme, handleTheme} = useContext(ThemeContext);

  React.useEffect(() => {
    if (route.params?.item) {
      list.push(route.params?.item);
    }
  }, [route.params?.item]);

  const styles = StyleSheet.create({
    contain: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    titleCard: {
      fontSize: 40,
    },
    listItem: {
      backgroundColor: theme ? "white" : "black",
      width: width,
      borderBottomWidth: 1,
      marginLeft: 15,
    },
    colorTheme: {
      color: theme ? "black" : "white",
    },
  });

  return (
    <ScrollView>
      <View style={styles.contain}>
        <Card
          containerStyle={{
            width: 200,
          }}>
          <Card.Title style={styles.titleCard}>$1.890</Card.Title>
        </Card>
        <ScrollView style={{maxHeight: 290}}>
          {list.map((item, index) => (
            <ListItem
              key={index}
              bottomDivider
              containerStyle={styles.listItem}>
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
                  {item.price}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>
        <View style={{flexDirection: "row"}}>
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
          <Button
            title="Change theme"
            buttonStyle={{
              //backgroundColor: "#33BBFF",
              borderRadius: 3,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={handleTheme}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
