import React from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Linking,
} from "react-native";

import BlurView from "@react-native-community/blur";

function SearchDropDown({ autoComplete }) {
  console.log("autoComplete: ", autoComplete);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autoCompleteBox}>
        <Text onPress={() => Linking.openURL("http://google.com")}>
          {autoComplete}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    opacity: 0.5,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    width: "100%",
    alignSelf: "center",
  },
  autoCompleteBox: {
    borderWidth: 1,
    border: "gray",
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
  },
});

export default SearchDropDown;
