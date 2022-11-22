import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { fetchAutoCompleteApi } from "../../utils/api";
import SearchDropDown from "../components/SearchDropDown";

function AutoCompleteAddresses() {
  const [cityValue, setCityValue] = useState({});
  const [autoCompleteFormatted, setAutoCompleteFormatted] = useState([]);
  const [searching, setSearching] = useState(false);
  
  // autoCompleteFormatted.map(feature => {
  //   console.log(feature);
  // })

  useEffect(() => {
    if (cityValue.length > 0) {
      setSearching(true);
    } else {
      setSearching(false);
    }
    if (cityValue.length > 3) {
      const delayDebounceFn = setTimeout(() => {
        console.log(cityValue);
        // Send Axios request here
        fetchAutoCompleteApi(cityValue)
          .then(({ features }) => {
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
      <Text>autocomplete</Text>
      <View style={styles.autocompleteContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            label="Enter an address here"
            style={styles.textInput}
            onChangeText={(text) => setCityValue(text)}
            mode="outlined"
            left={<TextInput.Icon icon="human-greeting-variant" />}
          />
        </View>
        {autoCompleteFormatted.map((feature, index) => (
          cityValue && <SearchDropDown key={index} autoComplete={feature.properties.formatted} />
          ))}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    width: '90%',
    alignSelf: 'center',
    // padding: 20,
    // flex: 1,
    // backgroundColor: "gray",
  },
  textInput: {},
  button: {},
  // inputContainerInput: {
  //   flex: 1,
  //   outline: none,
  //   border: 1 solid rgba(0, 0, 0, 0.2),
  //   padding: 10,
  //   padding-right: 31,
  //   font-size: 16,
  // }
});

export default AutoCompleteAddresses;
