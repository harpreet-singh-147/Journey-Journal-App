import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Nav from "../components/Nav";
import JourneyDetails from "../screens/JourneyDetails";
import AddJourneyDetailsForm from "../components/AddJourneyDetailsForm";
import JourneyList from "../screens/JourneyList";
import UpdateJourneyDetails from "../components/UpdateJourneyDetails";

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Nav} />

        <Stack.Screen name="JourneyDetails" component={JourneyDetails} />
        <Stack.Screen name="JourneyList" component={JourneyList} />
        <Stack.Screen
          name="AddJourneyDetailsForm"
          component={AddJourneyDetailsForm}
        />
        <Stack.Screen name="updateDetails" component={UpdateJourneyDetails} />
        <Stack.Screen name="detailsForm" component={AddJourneyDetailsForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
