import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import { Button, TextInput } from "react-native-paper";
import * as Location from "expo-location";
import customMapStyle from "../mapStyle.json";
import { fetchCatering } from "../../utils/api";
import useCollection from "../../utils/hooks/useCollection";
import { getAuth } from "firebase/auth";

function RecommendationsMap({ placeId }) {
  console.log("placeId: ", placeId);
  const mapRef = useRef(null);

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [currLocation, setCurrLocationRegion] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  const [dataJSON, setDataJSON] = useState(null);

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

  const journeyLocation = placeId;

  function findCateryServices() {
    fetchCatering(journeyLocation).then(({ features }) => {
      setDataJSON(features);
    });
  }

  const goToLocation = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    userLocation();
    mapRef.current.animateToRegion(currLocation, 3 * 1000);
  };
  return (
    <View style={styles.mapContainer}>
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
      <View>
        <Text>{JSON.stringify(dataJSON, null, 2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    // flex: 1,
    height: "100%",
  },
  map: {
    // width: "100%",
    height: 300,
  },
});

export default RecommendationsMap;
