import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { useAuthentication } from "../../utils/hooks/userAuthentication";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

const user = auth.currentUser;

export default function HomeScreen() {
  const { user } = useAuthentication();
  const [signOutIsLoadingBtn, setSignOutIsLoadingBtn] = useState(false);

  const image = {
    uri: "https://images.unsplash.com/photo-1501868984184-76121ed6a6e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80",
  };

  // function signOutBtnFuncCombine() {
  //   setSignOutIsLoadingBtn(true);
  //   signOut(auth);
  // }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={{ flex: 1, marginTop: 390, padding: 5 }}>
          <Text
            style={{
              // marginTop: ,
              fontSize: 25,
              fontWeight: "600",
              // alignSelf: "center",
              // marginHorizontal: 10,
              textAlign: "center",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 25,
            }}
          >
            Welcome {user?.displayName}! Are you planning a trip sometime soon?
            With a travel journal you'll have a permanent record of what you
            saw, who you met, and what emotions you were feeling during each
            step of the journey.
          </Text>
        </View>
      </ImageBackground>

      {/* <Button
        style={styles.button}
        onPress={() => signOutBtnFuncCombine()}
        icon="arrow-right"
        mode="contained"
        contentStyle={{ height: 50, flexDirection: "row-reverse" }}
        loading={signOutIsLoadingBtn}
      >
        Sign Out
      </Button> */}
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
