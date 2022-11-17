import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignIn = () => {
	const [value, setValue] = useState({
		email: "",
		password: "",
		error: "",
	});
	const [signInIsLoadingBtn, setSignInIsLoadingBtn] = useState(false);

	async function signIn() {
		if (value.email === "" || value.password === "") {
			setValue({
				...value,
				error: "Email and password are mandatory.",
			});
			return;
		}
		try {
			setSignInIsLoadingBtn(true);
			await signInWithEmailAndPassword(auth, value.email, value.password);
		} catch (error) {
			setSignInIsLoadingBtn(false);
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
					Login
				</Text>
			</View>
			<View style={styles.controls}>
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
					onPress={signIn}
					mode="contained"
					contentStyle={{ height: 50, flexDirection: "row-reverse" }}
					icon="arrow-right"
					loading={signInIsLoadingBtn}
				>
					Login
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

export default SignIn;
