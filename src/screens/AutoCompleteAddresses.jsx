import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { fetchAutoCompleteApi } from "../../utils/api";
import SearchDropDown from "../components/SearchDropDown";

function AutoCompleteAddresses() {
  const [cityValue, setCityValue] = useState("");
  const [formattedCityValues, setFormattedCityValues] = useState({});

  const [autoCompleteFormatted, setAutoCompleteFormatted] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [placeId, setPlaceId] = useState(null);

  const [item, setItem] = useState("");

  function onClickHandler(formattedOptions) {
    setIsShowingResults(false);
    setFormattedCityValues(formattedOptions);
    // setPlaceId({ placeId: item.properties.place_id })
  }

  useEffect(() => {
    if (cityValue.length <= 3) {
      setIsShowingResults(false);
    } else if (cityValue.length > 3) {
      setIsShowingResults(true);
      const delayDebounceFn = setTimeout(() => {
        // Send Axios request here
        fetchAutoCompleteApi(cityValue)
          .then(({ features }) => {
            console.log('features: ', features);
            if (features.length === 0) {
              setIsShowingResults(false);
            }
            setAutoCompleteFormatted(features);
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
      <ScrollView>
        <View style={styles.autocompleteContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              label="Enter an address here"
              style={styles.textInput}
              onChangeText={(text) => setCityValue(text)}
              value={formattedCityValues}
              mode="outlined"
              left={<TextInput.Icon icon="location-enter" />}
              right={
                <TextInput.Icon
                  icon="close"
                  onPress={() => setFormattedCityValues({})}
                />
              }
            />
            {/* <Button mode="contained" onPress={() => setFormattedCityValues({})}>
              X
            </Button> */}
          </View>
          {isShowingResults && (
            <FlatList
              data={autoCompleteFormatted}
              renderItem={({ item, index }) => {
                setItem(item);
                const formattedOptions = item.properties.formatted;
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => onClickHandler(formattedOptions)}
                  >
                    <Text>{formattedOptions}</Text>
                  </TouchableOpacity>
                );
              }}
              // keyExtractor={(index) => index}
              style={styles.searchResultsContainer}
            />
          )}
        </View>
        <View style={styles.dummy}></View>
        <View>
          <Text>{JSON.stringify(item.properties, null, 2)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    width: "90%",
    alignSelf: "center",
    zIndex: 10,
    // padding: 20,
    // flex: 1,
    // backgroundColor: "gray",
  },
  searchResultsContainer: {
    width: 340,
    height: 200,
    backgroundColor: "#fff",
    position: "absolute",
    top: 50,
  },
  resultItem: {
    borderWidth: 1,
    borderColor: "purple",
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
  },
  dummy: {
    width: 600,
    height: 200,
    backgroundColor: "hotpink",
    marginTop: 20,
  },
});

export default AutoCompleteAddresses;
