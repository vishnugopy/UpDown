import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.date}>{props.date}</Text>
      <Text style={styles.date}>{props.time}</Text>
      <Text style={styles.result}>{props.result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FF316220",
    width: "90%",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    marginTop: 10,
  },
  date: {
    fontFamily: "RubikLight",
    color: "#000",
  },
  result: {
    fontFamily: "RubikBold",
    color: "#FF3162",
    fontSize: 20,
    fontWeight: "900",
  },
});

export default Card;
