import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";
import { useTheme, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import useCollection from "../../utils/hooks/useCollection";

const AddJourneyPageForm = () => {
	const [journeyTitle, setJourneyTitle] = useState("");
	const [city, setCity] = useState("");
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [img, setImg] = useState("");
	const { documents: trips } = useCollection("Journ");
	console.log("documents: ", trips);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(false);
		// for iOS, add a button that closes the picker

		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const handleSubmit = async (e) => {
		const reference = collection(db, "Journ");
		const tripObject = {
			journey_title: journeyTitle,
			city: city,
			date: date,
		};
		await addDoc(reference, tripObject);
		setJourneyTitle("");
		setCity("");
	};
	return (
		<View style={styles.container}>
			<View style={styles.accomodationInput}>
				<TextInput
					style={{ marginTop: 50 }}
					label="Add journey title"
					value={journeyTitle}
					onChangeText={(text) => setJourneyTitle(text)}
				/>
			</View>
			<View style={styles.addressInput}>
				<TextInput
					style={{ marginTop: 10 }}
					label="City"
					value={city}
					onChangeText={(text) => setCity(text)}
				/>
			</View>
			<View style={styles.date}>
				<View>
					<Text>selected: {date.toLocaleString()}</Text>
					{
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={mode}
							is24Hour={true}
							onChange={onChange}
						/>
					}
				</View>
			</View>
			<View>
				<Button mode="contained" onPress={handleSubmit}>
					Press me
				</Button>
			</View>
		</View>
	);
};

export default AddJourneyPageForm;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		marginTop: 50,
		flex: 1,
		backgroundColor: "gray",
	},
	accomodationInput: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	ratingInput: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	addressInput: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	date: {
		backgroundColor: "red",
		margin: 20,
		padding: 20,
		alignItems: "center",
	},
});
