import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";

function AutoCompleteSearchAddress(props) {
  const [formattedCityValues, setFormattedCityValues] = useState({});

  function onClickHandler(formattedOptions, placeId) {
    setFormattedCityValues(formattedOptions);
    props.passSetIsShowingResults(false);
    props.passPlaceId(placeId);
  }

  function onClickClearText() {
    setFormattedCityValues({});
    props.passClearPlaceId("")
  }

  function cityValueProp(text) {
    props.passCityValue(text);
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
            <TextInput.Icon icon="close" onPress={onClickClearText} />
          }
        />
      </View>
      {props.isShowingResults && (
        <FlatList
          data={props.autoCompleteFeatures}
          renderItem={({ item, index }) => {
            const formattedOptions = item.properties.formatted;
            const placeId = item.properties.place_id;
            return (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => onClickHandler(formattedOptions, placeId)}
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
