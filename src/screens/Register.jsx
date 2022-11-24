import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

const Register = ({ navigation }) => {
  const image = {
    uri: "https://images.unsplash.com/photo-1501868984184-76121ed6a6e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80",
  };
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
  });

  const [signUpIsLoadingBtn, setSignUpIsLoadingBtn] = useState(false);

  async function signUp() {
    if (value.username === "" || value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Username, Email and Password are mandatory.",
      });
      return;
    }
    try {
      setSignUpIsLoadingBtn(true);
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      await updateProfile(auth.currentUser, {
        displayName: value.username,
      }).catch((err) => console.log(err));
      setSignUpIsLoadingBtn(false);
      navigation.navigate("Login");
    } catch (error) {
      setSignUpIsLoadingBtn(false);
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={{ height: "40%", justifyContent: "center" }}></View>
          <View style={styles.controls}>
            <TextInput
              autoCapitalize="none"
              label="Username"
              style={styles.textInput}
              value={value.username}
              onChangeText={(text) => setValue({ ...value, username: text })}
              mode="outlined"
              left={<TextInput.Icon icon="human-greeting-variant" />}
            />
            <TextInput
              autoCapitalize="none"
              label="Email"
              style={styles.textInput}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
            />
            <TextInput
              autoCapitalize="none"
              label="Password"
              style={styles.textInput}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
              mode="outlined"
              left={<TextInput.Icon icon="key" />}
            />
            <Button
              style={styles.button}
              onPress={signUp}
              mode="contained"
              contentStyle={{
                height: 50,
                flexDirection: "row-reverse",
              }}
              icon="arrow-right"
              loading={signUpIsLoadingBtn}
            >
              Sign Up
            </Button>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  controls: {
    width: "85%",
    alignSelf: "center",
    height: "60%",
  },

  textInput: {},

  button: {
    marginTop: 20,
    alignSelf: "center",
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.9,
  },
});

export default Register;
