import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Nav from "../components/Nav";
import JourneyDetails from "../screens/JourneyDetails";

const Stack = createStackNavigator();

export default function UserStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Nav} />
				<Stack.Screen
					name="JourneyDetails"
					component={JourneyDetails}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
