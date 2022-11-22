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

function AutoCompleteSearchAddress(props) {

  const [formattedCityValues, setFormattedCityValues] = useState({});
  // const [cityValue, setCityValue] = useState("");
  // const [autoCompleteFormatted, setAutoCompleteFormatted] = useState([]);
  const [placeId, setPlaceId] = useState(null);

  const [locationInfo, setLocationInfo] = useState("");

  function onClickHandler(formattedOptions) {
    props.passSetIsShowingResults(false);
    setFormattedCityValues(formattedOptions);
    props.passLocationInfo(locationInfo)
  }

  function cityValueProp(text) {
    props.passData(text)
  }

  return (
        <View style={styles.autocompleteContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              label="Enter an address here"
              style={styles.textInput}
              onChangeText={(text) => cityValueProp(text)}
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
          </View>
          {props.isShowingResults && (
            <FlatList
              data={props.autoCompleteFeatures}
              renderItem={({ item, index }) => {
                setLocationInfo(item);
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
});

export default AutoCompleteSearchAddress;
