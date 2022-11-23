import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useAuthentication } from "../../utils/hooks/userAuthentication";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";

export default function HomeScreen() {
  const { user } = useAuthentication();

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const image = {
    uri: "https://images.unsplash.com/photo-1501868984184-76121ed6a6e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80",
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{ flex: 1, marginTop: 470, padding: 5 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              textAlign: "center",
              color: "#E7F6F2",
              backgroundColor: "#000000",
              opacity: 0.9,
              borderRadius: 25,
              fontFamily: "Poppins_600SemiBold",
              padding: 5,
            }}
          >
            Welcome {user?.displayName}! Are you planning a trip sometime soon?
            With a travel journal you'll have a permanent record of what you
            saw, who you met, and what emotions you were feeling during each
            step of the journey.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.9,
    elevation: 5,

    resizeMode: "cover",
  },
});
