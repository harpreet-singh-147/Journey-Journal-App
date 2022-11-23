import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchAutoCompleteApi } from "../../utils/api";
import AutoCompleteSearchAddress from "../components/AutoCompleteSearchAddress";
import RecommendationsMap from "../components/RecommendationsMap";
import RecommendationsCategories from "../components/RecommendationsCategories";

function Recommendations() {
  const [cityValue, setCityValue] = useState("");
  const [autoCompleteFeatures, setAutoCompleteFeatures] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const [category, setCategory] = useState("");
  const [lonLat, setLonLat] = useState([])
  
  function passCityValue(data) {
    setCityValue(data);
  }

  function passSetIsShowingResults(boolean) {
    setIsShowingResults(boolean);
  }

  function passPlaceId(data) {
    setPlaceId(data);
  }

  function passClearPlaceId() {
    setPlaceId("");
  }

  function passCategory(category) {
    setCategory(category);
  }

  function passLonLat(lonLat) {
    setLonLat(lonLat)
  }

  function passClearLonLat() {
    setLonLat([])
  }

  useEffect(() => {
    if (cityValue.length <= 3) {
      setIsShowingResults(false);
    } else if (cityValue.length > 3) {
      setIsShowingResults(true);
      const delayDebounceFn = setTimeout(() => {
        fetchAutoCompleteApi(cityValue)
          .then(({ features }) => {
            if (features.length === 0) {
              setIsShowingResults(false);
            }
            setAutoCompleteFeatures(features);
          })
          .catch((err) => {
            console.log("err: ", err);
          });
      }, 100);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [cityValue]);

  return (
    <SafeAreaView style={styles.recommendationsContainer}>
      <View style={styles.autoCompleteContainer}>
        <AutoCompleteSearchAddress
          passPlaceId={passPlaceId}
          passCityValue={passCityValue}
          passSetIsShowingResults={passSetIsShowingResults}
          isShowingResults={isShowingResults}
          autoCompleteFeatures={autoCompleteFeatures}
          passClearPlaceId={passClearPlaceId}
          passLonLat={passLonLat}
          passClearLonLat={passClearLonLat}
        />
      </View>
      <View style={styles.recCategoryContainer}>
        <RecommendationsCategories passCategory={passCategory}/>
      </View>
      <View>
        <RecommendationsMap placeId={placeId} category={category} locationLonLat={lonLat}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  recommendationsContainer: {
    height: "100%",
  },
  autoCompleteContainer: {
    zIndex: 10,
  },
  recCategoryContainer: {
    height: "15%",
    // backgroundColor: "hotpink",
  },
});

export default Recommendations;
