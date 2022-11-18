import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import JourneyCards from "../components/JourneyCards";
import { useNavigation } from "@react-navigation/native";

const JourneyList = () => {
  const navigation = useNavigation();
  console.log("navigation: ", navigation);
  return <JourneyCards navigation={navigation}></JourneyCards>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 15,
  },
  text: {
    fontSize: 42,
  },
});

export default JourneyList;
