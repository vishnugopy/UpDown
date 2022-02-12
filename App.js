import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Card from "./components/Card";
import { TouchableOpacity, ScrollView, Pressable } from "react-native-web";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [HomeView, setHomeView] = useState(true);
  const [History, setHistory] = useState([]);
  const [counter, setCounter] = useState(0);
  const [Alert, setAlert] = useState("");

  React.useEffect(() => {
    GetToDevice();
  }, []);

  React.useEffect(() => {
    AddToDevice(History);
  }, [History]);

  const [loaded] = useFonts({
    RubikBold: require("./assets/fonts/Rubik-Bold.ttf"),
    RubikLight: require("./assets/fonts/Rubik-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

  function AddResult() {
    const date = new Date().toLocaleDateString();
    const result = counter;

    const newHistory = {
      date,
      result,
    };

    if (result === 0) {
      alert("Nahhh , you didn't pushup yet");
    } else {
      setHistory([...History, newHistory]);
      setCounter(0);
    }
  }

  function AddToDevice(History) {
    try {
      const stringifyHistory = JSON.stringify(History);
      AsyncStorage.setItem("@history", stringifyHistory);
    } catch (error) {
      console.log(error);
    }
  }

  function GetToDevice() {
    try {
      const historyItems = AsyncStorage.getItem("@history");
      if (historyItems != null) {
        setHistory(JSON.parse(historyItems));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function AddToCounter() {
    setCounter(counter + 1);
  }

  function ResetResult() {
    setCounter(0);
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
        <View style={styles.TouchController} onClick={AddToCounter}>
          <View style={styles.resultContainer}>
            <Text style={styles.userResult}>{counter}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={ResetResult}>
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={AddResult}>
              <Text style={styles.buttonText}>Finish</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.historyItems}>

          {History == [] ? ( <Text>No History</Text>) : null }

          {History.map((item, index) => {
            return (
              <Card
                key={index}
                date={item.date}
                result={item.result}
                index={index}
              />
            );
          })}
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

  TouchController: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "80%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    gap: 20,
  },
  button: {
    flex: 1,
    textAlign: "center",
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "RubikBold",
    fontSize: 20,
    color: "#FF3162",
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 50,
    width: 350,
    height: 350,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FF316210",
    borderWidth: 25,
    borderRadius: "50%",
    padding: 50,
  },
  userResult: {
    fontFamily: "RubikBold",
    fontSize: 120,
    color: "#FF3162",
    fontWeight: "1000",
  },
});
