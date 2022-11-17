import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{ height: "40%", justifyContent:"center", marginHorizontal:23 }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
            alignSelf: "center",
            textAlign: "center"
          }}
        >
          Welcome to your Journey Journal
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          icon="login"
          mode="contained"
          contentStyle={{ height: 50 }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Button>
        <Button
          style={styles.button}
          icon="account"
          mode="contained"
          type="outline"
          contentStyle={{ height: 50 }}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  buttons: {
    flex: 1,
    width: "40%",
    alignSelf: "center",
  },

  button: {
    marginTop: 10,
  },
});

export default Welcome;
