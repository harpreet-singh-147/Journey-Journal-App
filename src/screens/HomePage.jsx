import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/userAuthentication";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

const auth = getAuth();

// const user = auth.currentUser;
// if (user !== null) {
	// 	console.log(user.uid);
	// 	console.log(user.displayName);
	// 	console.log(user.email);
	// }
	
	export default function HomeScreen() {
	const navigation = useNavigation();
	const { user } = useAuthentication();
	const [signOutIsLoadingBtn, setSignOutIsLoadingBtn] = useState(false);

	function signOutBtnFuncCombine() {
		setSignOutIsLoadingBtn(true);
		signOut(auth);
	}

	return (
		<View style={styles.container}>
			<Text>Welcome {user?.email}!</Text>
			<Button
				style={styles.button}
				onPress={() => navigation.navigate("TestApi")}
				icon="arrow-right"
				mode="contained"
				contentStyle={{ height: 50, flexDirection: "row-reverse" }}
			>
				Test Api
			</Button>
			<Button
				style={styles.button}
				onPress={() => signOutBtnFuncCombine()}
				icon="arrow-right"
				mode="contained"
				contentStyle={{ height: 50, flexDirection: "row-reverse" }}
				loading={signOutIsLoadingBtn}
			>
				Sign Out
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		marginTop: 10,
	},
});
