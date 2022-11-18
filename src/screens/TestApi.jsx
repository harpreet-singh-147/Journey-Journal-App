import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchCatering } from "../../utils/api";

function TestApi() {
  // fetchCatering().then(({data}) => {
  //   console.log(data.features[0].properties);
  // })
  return (
    <SafeAreaView>
      <Text>Test Api</Text>
      <View></View>
    </SafeAreaView>
  );
}

export default TestApi;
