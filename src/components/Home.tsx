import React from "react";
// import {Button} from "react-native";
import {Input, Text, useTheme, ListItem, Card} from "@rneui/themed";
import {Button} from "@rneui/base";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, StyleSheet, View, Dimensions, Alert} from "react-native";
import AddExpense from "./AddExpense";

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

const Home: React.FC<any | null> = ({navigation, route}) => {
  const {theme} = useTheme();
  const {width, height} = Dimensions.get("screen");

  React.useEffect(() =>{
    if(route.params?.item){
      list.push(route.params?.item);
    }
  },[route.params?.item]);

  // const addItem = (item:any) => {
  //   list.push(item);
  // };

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
              containerStyle={{
                backgroundColor: "white",
                width: width,
                borderBottomWidth: 1,
                marginLeft: 15,
              }}>
              <ListItem.Content style={{color: "white"}}>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle right>{item.date}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content right>
                <ListItem.Title>{item.price}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>
        <Button
          title="Nuevo gasto"
          buttonStyle={{
            backgroundColor: "#33BBFF",
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate("AddExpense", {})}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleCard: {
    fontSize: 40,
  },
});

export default Home;
