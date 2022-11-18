import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { useTheme, Button, Card, Title, Paragraph } from "react-native-paper";
import useCollection from "../../utils/hooks/useCollection";
import { getAuth } from "firebase/auth";

const JourneyCards = ({ navigation }) => {
  //   console.log("navigation: inside JOURNEY CARDS COMPONENT", navigation);
  const auth = getAuth();
  const user = auth.currentUser;

  const Item = ({ city, title, date }) => (
    <View style={styles.item}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{city}</Title>
          <Paragraph>{title}</Paragraph>
          <Paragraph>{new Date(date * 1000).toDateString()}</Paragraph>
        </Card.Content>
        <Card.Cover
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
        <Card.Actions>
          <Button
            onPress={() => {
              navigation.navigate("JourneyDetails");
            }}
          >
            Journey Details
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );

  const { documents: trips } = useCollection("Journey", [
    "uid",
    "==",
    user.uid,
  ]);

  const renderItem = ({ item }) => (
    <Item
      city={item.city}
      title={item.journey_title}
      date={item.date.seconds}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default JourneyCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

// const JourneyCards = () => {
// 	const { documents: trips } = useCollection("Journ");
// 	console.log("documents: ", trips);
// 	return (
// 		// <FlatList
// 		// 	numColumns={2}
// 		// 	keyExtractor={(trips) => trips.id}
// 		// 	data={trips}
// 		// 	renderItem={({ item }) => (
// 		// 		<SafeAreaView style={styles.container}>
// <Card style={styles.card}>
// 	<Card.Content>
// 		<Title>{item.city}</Title>
// 		<Paragraph>{item.journey_title}</Paragraph>
// 	</Card.Content>
// 	<Card.Cover
// 		source={{
// 			uri: "https://picsum.photos/700",
// 		}}
// 	/>
// 	<Card.Actions>
// 		<Button>Cancel</Button>
// 		<Button>Ok</Button>
// 	</Card.Actions>
// </Card>
// 		// 		</SafeAreaView>
// 		// 	)}
// 		// />
// 	);
// };
