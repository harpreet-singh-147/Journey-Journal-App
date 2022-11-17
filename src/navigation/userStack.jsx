import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomePage";
import Nav from "../components/Nav";

const Stack = createStackNavigator();

export default function UserStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Nav} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
