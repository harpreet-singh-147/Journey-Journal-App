import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";

function AutoCompleteAddresses() {
  return (
    <SafeAreaView>
      <Text>autocomplete</Text>
      <View style={styles.autocompleteContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            
          ></TextInput>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    marginBottom: 20,
    // padding: 20,
    // flex: 1,
    // backgroundColor: "gray",
  },
  inputContainer: {
  },
  button: {
  }
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
