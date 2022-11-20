// import { async } from "@firebase/util";
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, Button } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { fetchCatering } from "../../utils/api";

import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import * as Location from "expo-location";
import customMapStyle from "../mapStyle.json"

function TestApi() {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [errorMsg, setErrorMsg] = useState(null);

  function userLocation() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      });
    })();
  }

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }  

  const goToTokyo = () => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(tokyoRegion, 3 * 1000);
  };

  const goToLocation = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(region, 3 * 1000);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        customMapStyle={customMapStyle}
        ref={mapRef}
        provider="google"
      >
        <Marker coordinate={region} title="Marker">
          <Callout>
            <Text>Location</Text>
          </Callout>
        </Marker>
      </MapView>
      <Button onPress={() => goToTokyo()} title="Go to Tokyo" />
      <Button title="Get Location" onPress={() => userLocation()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

// function TestApi() {
//   // fetchCatering().then(({data}) => {
//   //   console.log(data.features[0].properties);
//   // })
//   return (
//     <SafeAreaView>
//       <Text>Test Api</Text>
//       <View></View>
//     </SafeAreaView>
//   );
// }

export default TestApi;
