import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";

import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";

const auth = getAuth();

const Register = ({ navigation }) => {
	const [value, setValue] = useState({
		username: "",
		email: "",
		password: "",
		error: "",
	});

	const [signUpIsLoadingBtn, setSignUpIsLoadingBtn] = useState(false);

	async function signUp() {
		if (
			value.username === "" ||
			value.email === "" ||
			value.password === ""
		) {
			setValue({
				...value,
				error: "Username, Email and Password are mandatory.",
			});
			return;
		}
		try {
			setSignUpIsLoadingBtn(true);
			await createUserWithEmailAndPassword(
				auth,
				value.email,
				value.password
			);
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

			<View style={{ height: "40%", justifyContent: "center" }}>
				<Text
					style={{
						fontSize: 25,
						fontWeight: "600",
						alignSelf: "center",
						marginTop: 20,
					}}
				>
					Register
				</Text>
			</View>
			<View style={styles.controls}>
				<TextInput
					autoCapitalize="none"
					label="Username"
					style={styles.textInput}
					value={value.username}
					onChangeText={(text) =>
						setValue({ ...value, username: text })
					}
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
					onChangeText={(text) =>
						setValue({ ...value, password: text })
					}
					secureTextEntry={true}
					mode="outlined"
					left={<TextInput.Icon icon="key" />}
				/>
				<Button
					style={styles.button}
					onPress={signUp}
					mode="contained"
					contentStyle={{ height: 50, flexDirection: "row-reverse" }}
					icon="arrow-right"
					loading={signUpIsLoadingBtn}
				>
					Sign Up
				</Button>
			</View>
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
});

export default Register;
