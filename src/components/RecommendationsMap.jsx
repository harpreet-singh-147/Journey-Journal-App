import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import customMapStyle from "../mapStyle.json";
import { fetchPlaces } from "../../utils/api";
import { Button } from "react-native-paper";

function RecommendationsMap({ placeId, category, locationLonLat }) {
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
      fetchPlaces(placeId, category).then(({ features }) => {
        let markerInfo = [];
        features.map((feature, index) => {
          markerInfo.push({
            id: index,
            title: feature.properties.name,
            coordinates: {
              longitude: feature.geometry.coordinates[0],
              latitude: feature.geometry.coordinates[1],
            },
            addressFormatted: feature.properties.formatted,
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
      <Button
        mode="contained"
        style={styles.button}
        onPress={fetchLocationClick}
      >
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
        onRegionChangeComplete={(region) => setRegion(region)}
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
            description={marker.addressFormatted}
          >
            <Callout tooltip={true} style={styles.callout}>
              <View>
                <Text style={styles.title}>{marker.title}</Text>
                <Text style={styles.description}>
                  {marker.addressFormatted}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
  },
  map: {
    height: 420,
  },
  button: {
    alignSelf: "center",
    marginVertical: 10,
  },
  callout: {
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  title: {
    color: "black",
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  description: {
    color: "#707070",
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
});

export default RecommendationsMap;
