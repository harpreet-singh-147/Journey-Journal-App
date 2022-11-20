// import { async } from "@firebase/util";
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, Button } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { fetchCatering } from "../../utils/api";

import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import * as Location from "expo-location";
import customMapStyle from "../mapStyle.json";

function TestApi() {
  const mapRef = useRef(null);

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isLoading, setIsLoading] = useState(false)

  const [currLocation, setCurrLocationRegion] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  function userLocation() {
    setIsLoading(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setIsLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setIsLoading(false);
      setCurrLocationRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      });
    })();
  }

  

  const goToLocation = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    userLocation()
    mapRef.current.animateToRegion(currLocation, 3 * 1000);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={location}
        customMapStyle={customMapStyle}
        ref={mapRef}
        provider="google"
        showsUserLocation={true}
      >
        {/* <Marker title="Marker">
          <Callout>
            <Text>Location</Text>
          </Callout>
        </Marker> */}
      </MapView>
      <Button
        style={styles.button}
        isLoading={true}
        onPress={() => goToLocation()}
        icon="arrow-right"
				mode="contained"
				contentStyle={{ height: 50, flexDirection: "row-reverse" }}
				loading={isLoading}
      >
        Get Current Location
      </Button>
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
