import { StyleSheet, Text, View } from "react-native";
import Nav from "./src/components/Nav";
import { Provider as PaperProvider } from "react-native-paper";
import Recommendations from "./src/screens/Recommendations";
import HomePage from "./src/screens/HomePage";
import "./src/config/firebaseConfig";
import RootNavigation from "./src/navigation";

const App = () => {
	return (
		<PaperProvider>
			<RootNavigation />
		</PaperProvider>
	);
};

export default App;

// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import { db } from "./firebaseConfig";

// export default function App() {
// 	return (
// 		<View style={styles.container}>
// 			<Text>Open up App.js to start working on your app!</Text>
// 			<StatusBar style="auto" />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });
