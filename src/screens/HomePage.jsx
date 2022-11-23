import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuthentication } from "../../utils/hooks/userAuthentication";
import { Button } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import Slideshow from "react-native-image-slider-show";

const auth = getAuth();

const user = auth.currentUser;
if (user !== null) {
	console.log(user.uid);
	console.log(user.displayName);
	console.log(user.email);
}

const dataSource = [
	{
		caption:
			"Are you planning a trip sometime soon? With a travel journal you'll have a permanent record of what you saw, who you met, and what emotions you were feeling during each step of the journey.",
		url: "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg",
	},
	{
		caption:
			"Remember that happiness is a way of travel, not a destination.",
		url: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
	{
		caption:
			"The world is a book and those who do not travel read only one page.",
		url: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
	{
		caption:
			"The world is a book and those who do not travel read only one page.",
		url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
	{
		caption:
			"The world is a book and those who do not travel read only one page.",
		url: "https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
	{
		caption:
			"The world is a book and those who do not travel read only one page.",
		url: "https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
	{
		caption:
			"The world is a book and those who do not travel read only one page.",
		url: "https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
	{
		caption:
			"The world is a book and those who do not travel read only one page.",
		url: "https://images.pexels.com/photos/1457812/pexels-photo-1457812.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
	{
		caption:
			"The world is a book and those who do not travel read only one page.",
		url: "https://images.pexels.com/photos/2914152/pexels-photo-2914152.jpeg?auto=compress&cs=tinysrgb&w=1600",
	},
];

export default function HomeScreen() {
	const [position, setPosition] = useState(0);

	const { user } = useAuthentication();
	const [signOutIsLoadingBtn, setSignOutIsLoadingBtn] = useState(false);

	function signOutBtnFuncCombine() {
		setSignOutIsLoadingBtn(true);
		signOut(auth);
	}

	useEffect(() => {
		const toggle = setInterval(() => {
			setPosition(position === dataSource.length - 1 ? 0 : position + 1);
		}, 6000);

		return () => clearInterval(toggle);
	});

	return (
		<View style={styles.container}>
			<View>
				<Slideshow
					position={position}
					dataSource={dataSource}
					captionStyle={styles.captionStyle}
					titleStyle={styles.titleStyle}
					height={450}
				/>
			</View>
			<Text>Welcome {user?.displayName}!</Text>

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
	captionStyle: {
		color: "white",
    fontSize: 25,
    textAlign: "center"
	},
	slideContainer: {
		minHeight: 20,
	},
});
