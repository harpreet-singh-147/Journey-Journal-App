// import { async } from "@firebase/util";
// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, Button } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Location from "expo-location";
import customMapStyle from "../mapStyle.json";
import { fetchCatering } from "../../utils/api";

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

  const [dataJSON, setDataJSON] = useState(null)

  const journeyLocation = "skegness"

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

  function findCateryServices(){
    fetchCatering(journeyLocation).then(({features}) => {
      setDataJSON(features)
    })
  }
  
  const goToLocation = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    userLocation()
    mapRef.current.animateToRegion(currLocation, 3 * 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
        <Button
          style={styles.button}
          isLoading={true}
          onPress={() => findCateryServices()}
          mode="contained"
          contentStyle={{ height: 50 }}
        >
          Catery
        </Button>
        <View>
          <Text>{JSON.stringify(dataJSON, null, 2)}</Text>
        </View>
        {/* <Button
          onPress={handleClickSearch}>
          Find Location Api
        </Button> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 300,
  },
});

export default TestApi;
