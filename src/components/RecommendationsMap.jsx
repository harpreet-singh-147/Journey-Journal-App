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
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    }
  }, [locationLonLat]);

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
              longitude: feature.geometry.coordinates[0],
              latitude: feature.geometry.coordinates[1],
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
      <Button mode="contained" style={styles.button} onPress={fetchLocationClick}>
        Search
      </Button>
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
        {markers.map((marker, index) => (
          <Marker
            title={marker.title}
            key={index}
            coordinate={marker.coordinates}
            description={category}
          />
        ))}
      </MapView>
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
  button: {
    alignSelf: "center",
    marginVertical: 10,
  }
});

export default RecommendationsMap;
