import React, { useState } from "react";
import { View, StyleSheet, FlatList, Linking } from "react-native";
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

const Recommendations = () => {
	const [selectedCity, setSelectedCity] = useState("");
	const [events, setEvents] = useState(null);
	const [date, setDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [mode1, setMode1] = useState("date");
	const [show1, setShow1] = useState(false);

	const formatDate = (date) => {
		const formatted = date.toISOString().substring(0, 19);
		return formatted + "Z";
	};

	const start = formatDate(date);
	const end = formatDate(endDate);

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
			${start}
		&endDateTime=
			${end}
		&size=10&page=1&sort=date,asc&city=${selectedCity}
		`;
		try {
			const response = await fetch(baseURL);
			const data = await response.json();
			const results = data._embedded.events.map((data) => {
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
		<View style={styles.item}>
			<Card>
				<Card.Title title={date} subtitle={city} />
				<Card.Content>
					<Text variant="titleLarge">{`${name}`}</Text>
					<Text variant="titleSmall">{`Address: ${address}`}</Text>
					<Text variant="titleSmall">{`Post Code: ${post_code}`}</Text>
				</Card.Content>
				<Card.Cover source={{ uri: `${image}` }} />
				<Card.Actions>
					<Button
						icon="open-in-new"
						mode="elevated"
						style={{ color: "blue" }}
						onPress={() => Linking.openURL(url)}
					>
						Buy tickets
					</Button>
					<Button>Something else </Button>
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
		<View>
			<Text>Recommendations</Text>
			<TextInput
				label="Enter City"
				value={selectedCity}
				onChangeText={(text) => setSelectedCity(text)}
			/>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<View style={{ maxWidth: 20 }}>
					<Button
						style={{ marginTop: 10 }}
						mode="contained"
						onPress={() => showMode("date")}
					>
						Start Date
					</Button>
				</View>
				<View>
					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							onChange={onChange}
						/>
					)}
				</View>
				<View>
					<Button
						style={{ marginTop: 10 }}
						mode="contained"
						onPress={() => showMode1("date")}
					>
						End Date
					</Button>
				</View>
				<View>
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
				<Button mode="contained" onPress={() => handleClick()}>
					GET LUCKY
				</Button>
			</View>
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

const styles = StyleSheet.create({});

export default Recommendations;
