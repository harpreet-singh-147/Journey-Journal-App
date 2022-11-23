import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Button } from "react-native-paper";

function RecommendationsCategories(props) {
  const [buttonAccomodationSelect, setButtonAccomodationSelect] =
    useState(false);
  const [buttonCaterySelect, setButtonCaterySelect] = useState(false);
  const [buttonAttractionsSelect, setButtonAttractionsSelect] = useState(false);

  function categoryAccomodation() {
    props.passCategory("accommodation");
    setButtonAccomodationSelect(true);
    setButtonCaterySelect(false);
    setButtonAttractionsSelect(false);
  }

  function categoryCatery() {
    props.passCategory("catering");
    setButtonCaterySelect(true);
    setButtonAccomodationSelect(false);
    setButtonAttractionsSelect(false);
  }

  function categoryAttractions() {
    props.passCategory("tourism.attraction");
    setButtonAttractionsSelect(true);
    setButtonAccomodationSelect(false);
    setButtonCaterySelect(false);
  }

  return (
    <View style={styles.categoryContainer}>
      <IconButton
        style={styles.button}
        isLoading={true}
        onPress={categoryAccomodation}
        mode="contained"
        size={50}
        icon="room-service"
        selected={buttonAccomodationSelect}
      ></IconButton>
      <IconButton
        style={styles.button}
        isLoading={true}
        onPress={categoryCatery}
        mode="contained"
        size={50}
        icon="food"
        selected={buttonCaterySelect}
      ></IconButton>
      <IconButton
        style={styles.button}
        isLoading={true}
        onPress={categoryAttractions}
        mode="contained"
        size={50}
        icon="eiffel-tower"
        selected={buttonAttractionsSelect}
      ></IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {},
});

export default RecommendationsCategories;
