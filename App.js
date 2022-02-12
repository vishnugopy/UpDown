import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Card from "./components/Card";
import { TouchableOpacity, ScrollView } from "react-native-web";
import { useState, useEffect } from "react";

export default function App() {
  const [HomeView, setHomeView] = useState(true);
  const [taskItems, setTaskItems] = useState([]);

  const [loaded] = useFonts({
    RubikBold: require("./assets/fonts/Rubik-Bold.ttf"),
    RubikLight: require("./assets/fonts/Rubik-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text
            style={styles.headerText}
            onClick={() => {
              setHomeView(true);
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text
            style={styles.headerText}
            onClick={() => {
              setHomeView(false);
            }}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {HomeView === true ? (
        <View style={styles.cardContainer}>
          <Text>Home</Text>
        </View>
      ) : (
        <ScrollView style={styles.historyItems}>
          <Card date="11/02/2022" result="50" />
          <Card date="11/02/2022" result="50" />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "RubikBlack",
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerText: {
    fontFamily: "RubikLight",
    fontSize: 24,
    color: "#000",
  },
  historyItems: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginTop: 20,
  },
});
