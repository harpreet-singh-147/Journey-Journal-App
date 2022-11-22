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
