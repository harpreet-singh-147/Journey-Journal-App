import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useTheme, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebaseConfig";
import { useAuthentication } from "../../utils/hooks/userAuthentication";
import useCollection from "../../utils/hooks/useCollection";

const AddJourneyPageForm = () => {
	const auth = getAuth();
	const user = auth.currentUser;

	const [journeyTitle, setJourneyTitle] = useState("");
	const [city, setCity] = useState("");
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [img, setImg] = useState("");
	const { documents: trips } = useCollection("Journey");

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	const handleSubmit = async (e) => {
		const reference = collection(db, "Journey");
		const tripObject = {
			uid: user.uid,
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

			<View>
				<Button
					style={{ marginTop: 10 }}
					mode="contained"
					onPress={() => showMode("date")}
				>
					Select Date
				</Button>
			</View>
			<View style={styles.date}>
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
				<Button mode="contained" onPress={handleSubmit}>
					Add
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
