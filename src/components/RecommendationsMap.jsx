import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import customMapStyle from "../mapStyle.json";
import { fetchPlaces } from "../../utils/api";
import { Button } from "react-native-paper";

function RecommendationsMap({ placeId, category, locationLonLat }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currLocation, setCurrLocationRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationDataJSON, setLocationDataJSON] = useState({
    locationsData: [],
  });

  const [markers, setMarkers] = useState([]);
  const [region, setRegion] = useState({});

  const mapRef = useRef(null);

  useEffect(() => {
    if (locationLonLat.length > 0) {
      setRegion({
        latitude: locationLonLat[0].lat,
        longitude: locationLonLat[0].lon,
        latitudeDelta: 17.462712897586556,
        longitudeDelta: 28.30500204116106,
      });
    }
  }, [locationLonLat]);

  // if(placeId.length > 0) {
  //   fetchLocation()
  //   // .then((res) => {

  //   // })
  // }

  // function userLocation() {
  //   setIsLoading(true);
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       setIsLoading(false);
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({
  //       enableHighAccuracy: true,
  //     });
  //     setIsLoading(false);
  //     setCurrLocationRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.0022,
  //       longitudeDelta: 0.0021,
  //     });
  //   })();
  // }

  function fetchLocationClick() {
    if (category && placeId) {
      setLocationDataJSON({ locationsData: [] });
      fetchPlaces(placeId, category).then(({ features }) => {
        setLocationDataJSON({ locationsData: features });
        let markerInfo = [];
        features.map((feature, index) => {
          markerInfo.push({
            id: index,
            title: feature.properties.name,
            coordinates: {
              latitude: feature.geometry.coordinates[0],
              longitude: feature.geometry.coordinates[1],
            },
          });
        });
        setMarkers(markerInfo);
      });
    }
  }

  // const goToLocation = () => {
  //   //Animate the user to new region. Complete this animation in 3 seconds
  //   userLocation();
  //   mapRef.current.animateToRegion(currLocation, 3 * 1000);
  // };
  return (
    <View style={styles.mapContainer}>
      <Button onPress={fetchLocationClick}>Search</Button>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.805998332390864,
          longitude: -2.9876222647726536,
          latitudeDelta: 17.462712897586556,
          longitudeDelta: 28.30500204116106,
        }}
        // onRegionChangeComplete={(region) => setRegion(region)}
        region={region}
        customMapStyle={customMapStyle}
        ref={mapRef}
        provider="google"
        showsUserLocation={true}
      >
        {markers.map((marker) => {
          console.log("marker: ", marker);
          <Marker
            title={marker.title}
            key={marker.id}
            coordinate={marker.coordinates}
            description={category}
          >
            <Callout>
              <Text>Location</Text>
            </Callout>
          </Marker>;
        })}
      </MapView>
      {/* <Text style={styles.text}>Current latitude: {region.latitude}</Text>
      <Text style={styles.text}>Current longitude: {region.longitude}</Text> */}
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
