import { StyleSheet, View } from "react-native";
import { IconButton, Button } from "react-native-paper";

function RecommendationsCategories() {
  return (
    <View style={styles.categoryContainer}>
      <IconButton
        style={styles.button}
        isLoading={true}
        onPress={() => findAccomodationServices()}
        mode="contained"
        size={50}
        icon="room-service"
      >
      </IconButton>
      <IconButton
        style={styles.button}
        isLoading={true}
        onPress={() => findCateryServices()}
        mode="contained"
        size={50}
        icon="food"
      >
      </IconButton>
      <IconButton
        style={styles.button}
        isLoading={true}
        onPress={() => findAttractionsServices()}
        mode="contained"
        size={50}
        icon="eiffel-tower"
      >
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
  },
});

export default RecommendationsCategories;
