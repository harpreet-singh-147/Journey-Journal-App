import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchAutoCompleteApi } from "../../utils/api";
import AutoCompleteSearchAddress from "../components/AutoCompleteSearchAddress";
import RecommendationsMap from "../components/RecommendationsMap";

function Recommendations() {
  const [cityValue, setCityValue] = useState("");
  const [autoCompleteFeatures, setAutoCompleteFeatures] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [placeId, setPlaceId] = useState("");
  
	useEffect(() => {
		if (placeId) {
			console.log(placeId);
		}
	})

  function passCityValue(data) {
    setCityValue(data);
  }

  function passSetIsShowingResults(boolean) {
    setIsShowingResults(boolean);
  }

  function passPlaceId(data) {
    setPlaceId(data);
  }

	function passClearPlaceId(value) {
    setPlaceId(value);
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
    <SafeAreaView>
      <View>
        <AutoCompleteSearchAddress
          passPlaceId={passPlaceId}
          passCityValue={passCityValue}
          passSetIsShowingResults={passSetIsShowingResults}
          isShowingResults={isShowingResults}
          autoCompleteFeatures={autoCompleteFeatures}
					passClearPlaceId={passClearPlaceId}
        />
      </View>
      <View>
        <RecommendationsMap />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dummy: {
    width: 600,
    height: 200,
    backgroundColor: "hotpink",
    marginTop: 20,
  },
});

export default Recommendations;
