import React from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from "react-native";

import BlurView from "@react-native-community/blur";

function SearchDropDown({ autoComplete }) {
  console.log('autoComplete: ', autoComplete);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autoCompleteBox}>
        <Text>{autoComplete}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: 'gray',
    opacity: 0.4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  autoCompleteBox: {

  }
})

export default SearchDropDown;
