import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

import AddJourney from "../screens/AddJourney";
import HomePage from "../screens/HomePage";
import JourneyList from "../screens/JourneyList";
import Recommendations from "../screens/Recommendations";
import Events from "../screens/Events";

const Nav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home",
    },
    { key: "addTrip", title: "Add Trip", focusedIcon: "airplane-plus" },
    { key: "tripList", title: "Trips", focusedIcon: "bag-suitcase" },
    {
      key: "recommendations",
      title: "Suggestions",
      focusedIcon: "map-marker-star-outline",
      unfocusedIcon: "map-marker-star-outline",
    },
    { key: "events", title: "Events", focusedIcon: "party-popper" },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomePage,
    tripList: JourneyList,
    addTrip: AddJourney,
    recommendations: Recommendations,
    events: Events,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Nav;
