import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { TouchableOpacity, ScrollView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Card from "./components/Card";

export default function App() {
  const [HomeView, setHomeView] = useState(true);
  const [History, setHistory] = useState([]);
  const [counter, setCounter] = useState(0);

  React.useEffect(() => {
    const GetToDevice = async () => {
      try {
        const history = await AsyncStorage.getItem("@history");
        if (history != null) {
          setHistory(JSON.parse(history));
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetToDevice();
  }, []);

  React.useEffect(() => {
    const AddToDevice = async (History) => {
      try {
        const stringifyHistory = JSON.stringify(History);
        await AsyncStorage.setItem("@history", stringifyHistory);
      } catch (error) {
        console.log(error);
      }
    };

    AddToDevice(History);
  }, [History]);

  const [loaded] = useFonts({
    RubikBold: require("./assets/fonts/Rubik-Bold.ttf"),
    RubikLight: require("./assets/fonts/Rubik-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const AddResult = () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const result = counter;

    const newHistory = {
      date,
      time,
      result,
    };

    if (result === 0) {
      alert("Nahhh , you didn't pushup yet");
    } else {
      setHistory([...History, newHistory]);
      setCounter(0);
    }
  };

  const AddToCounter = () => {
    setCounter(counter + 1);
  };

  const ResetResult = () => {
    setCounter(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text
            style={styles.headerText}
            onPress={() => {
              setHomeView(true);
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text
            style={styles.headerText}
            onPress={() => {
              setHomeView(false);
            }}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {HomeView === true ? (
        <Pressable style={styles.TouchController} onPress={AddToCounter} >
          <View style={styles.resultContainer} >
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
        </Pressable>
      ) : (
        <ScrollView style={styles.historyItems}>
          {History.length === 0 ? (
            <Text style={styles.historyText}>No History</Text>
          ) : (
            History.map((item, index) => {
              return (
                <Card
                  key={index}
                  date={item.date}
                  time={item.time}
                  result={item.result}
                  index={index}
                />
              );
            })
          )}
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
    paddingVertical: 50,
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
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "95%",
  },
  button: {
    marginHorizontal: 10,
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
    textAlign: "center",
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
    borderRadius: 500,
    padding: 50,
  },
  userResult: {
    fontFamily: "RubikBold",
    fontSize: 120,
    color: "#FF3162",
    fontWeight: "700",
  },
  historyText: {
    fontFamily: "RubikLight",
    fontSize: 24,
    marginTop: "80%",
    color: "#FF3162",
    textAlign: "center",
  },
});
