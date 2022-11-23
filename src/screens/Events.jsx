import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TICKETMASTER_API } from "@env";
import {
  Button,
  Card,
  Text,
  TextInput,
  Title,
  Paragraph,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

// AVAILABLE COUNTRIES
// United States, Canada, Mexico, Australia, New Zealand, United Kingdom, Ireland
// %20 ---- SPACE

const Events = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [events, setEvents] = useState(null);
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [mode1, setMode1] = useState("date");
  const [show1, setShow1] = useState(false);

  const formatDate = (date) => {
    const formatted = date.toISOString().substring(0, 10);
    const dateObj = {
      date1: formatted + "T00:00:00Z",
      date2: formatted + "T23:59:59Z",
    };
    return dateObj;
  };

  // const formatDate1 = (date) => {
  //   const formatted = date.toISOString().substring(0, 10);
  //   return formatted + "T23:59:59Z";
  // };
  const start = formatDate(date);
  // const end = formatDate1(endDate);

  console.log(start.date1, "<<<<<< start");
  // console.log(end, "<<<<<<<<End");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow1(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };

  const handleClick = async () => {
    const baseURL = `https://app.ticketmaster.com/discovery/v2/events?apikey=${TICKETMASTER_API}&locale=*&startDateTime=
			${start.date1}
		&endDateTime=
			${start.date2}
		&size=10&page=1&sort=date,asc&city=${selectedCity}
		`;
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      const results = data._embedded.events.map((data) => {
        // console.log(Object.keys(data));
        // console.log(data.dates);
        return {
          url: data.url,
          name: data.name,
          image_uri: data.images[0].url,
          type: data.type,
          date: data.dates.start.localDate,
          id: data.id,
          address: data._embedded.venues[0].address.line1,
          city: data._embedded.venues[0].city.name,
          post_code: data._embedded.venues[0].postalCode,
        };
      });
      setEvents(results);
      setSelectedCity("");
    } catch (error) {
      console.log(error);
    }
  };

  const Item = ({
    name,
    image,
    type,
    date,
    note,
    url,
    id,
    address,
    city,
    post_code,
  }) => (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={date} subtitle={city} />
        <Card.Content>
          <Text variant="titleLarge">{`${name}`}</Text>
          <Text variant="titleSmall">{`Address: ${address}`}</Text>
          <Text variant="titleSmall">{`Post Code: ${post_code}`}</Text>
        </Card.Content>
        <Card.Cover
          style={{ padding: 10, backgroundColor: "none" }}
          source={{ uri: `${image}` }}
        />
        <Card.Actions>
          <Button
            icon="open-in-new"
            mode="contained"
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(url)}
          >
            Buy tickets
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      name={item.name}
      address={item.address}
      city={item.city}
      post_code={item.post_code}
      image={item.image_uri}
      type={item.type}
      date={item.date}
      note={item.note}
      url={item.url}
      id={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ alignItems: "center" }}>
            <Text variant="titleLarge">Events</Text>
          </View>
          <View>
            <TextInput
              label="Enter City"
              value={selectedCity}
              onChangeText={(text) => setSelectedCity(text)}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Button
              style={{ marginTop: 10, width: "50%", marginRight: 5 }}
              mode="contained"
              onPress={() => showMode("date")}
            >
              Select Date
            </Button>

            <Button
              style={{ marginTop: 10, width: "50%", marginLeft: 5 }}
              mode="contained"
              onPress={() => handleClick()}
            >
              Search
            </Button>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}

            {show1 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode={mode1}
                is24Hour={true}
                onChange={onChange1}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
});

export default Events;
