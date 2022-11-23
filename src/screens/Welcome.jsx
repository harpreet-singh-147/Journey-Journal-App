import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { Button } from "react-native-paper";

const Welcome = ({ navigation }) => {
	const image = {
		uri: "https://images.unsplash.com/photo-1501868984184-76121ed6a6e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80",
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				source={image}
				resizeMode="cover"
				style={styles.image}
			>
				<View
					style={{
						// height: "40%",
						justifyContent: "center",
						marginHorizontal: 23,
					}}
				>
					<Text
						style={{
							marginTop: 10,
							fontSize: 25,
							fontWeight: "600",
							alignSelf: "center",
							marginHorizontal: 10,
							textAlign: "center",
							color: "white",
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
			</ImageBackground>
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
		marginTop: 400,
	},

	button: {
		marginTop: 10,
	},
	image: {
		flex: 1,
		justifyContent: "center",
		opacity: 0.9,
	},
});

export default Welcome;
