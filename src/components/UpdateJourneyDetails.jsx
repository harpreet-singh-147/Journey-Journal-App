import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { useTheme, Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebaseConfig";
import * as yup from "yup";
import useCollection from "../../utils/hooks/useCollection";
import { useNavigation } from "@react-navigation/native";

const addDetailsValidationSchema = yup.object({
	name: yup.string().required(),
	description: yup.string().required().max(100),
	rating: yup
		.string()
		.required()
		.test("is-num-1-5", "Rating must be a number between 1 - 5", (val) => {
			return parseInt(val) < 6 && parseInt(val) > 0;
		}),
	address: yup.string().required(),
	city: yup.string().required(),
});

export default function UpdateJourneyDetails({ route }) {
	const auth = getAuth();
	const user = auth.currentUser;
	const [date, setDate] = useState(new Date());
	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({});
	const navigation = useNavigation();


	const { id, category } = route.params;
	console.log("Category: >>>>>>>", category, ", ID:", id);

	//  ["id", "!=", id];
	//   const { documents: categoryRequest } = useCollection(category);
	//   const data = db.collection(category).where("id", "==", id);
	//   const data = getDocs(db, category, id);
	//, ["id", "==", id]
	const { documents: attractions } = useCollection(category);
	//   const info = attractions.forEach((item) => console.log(item));
	//

	const getData = async () => {
		console.log("Get Data");
		await attractions.forEach((item) => {
			if (item["id"] == id) {
				console.log("item: ", item);

				setFormData(item);
			}
		});
	};
	console.log("formData: >>>>>>>>> OUTSIDE FUNCTION", formData);

	const updateDetails = async (details) => {
		// console.log("details: to UPDATE ", details);
		// const reference = collection(db, category);

		// console.log(reference);
		// await updateDoc(reference, details);

		await updateDoc(doc(db, `${category}`, id), details);

		// details.uid = user.uid;
		// details.date = date;

		// //Adding ID to the details
		// details.journey_id = id;

		// console.log("category: ", reference);
		// console.log("reference: ", reference);

		//
		// console.log(details, "DETAILS SEND TO UPDATE");

		// //redirect to the Journey Page
		navigation.navigate("JourneyList");
	};

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	};

	useEffect(() => {
		console.log("UseEffect");
		if (attractions) {
			console.log(getData());
		}
	}, [attractions]);

	return (
		<View>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ padding: 25 }}>
					<Formik
						initialValues={formData}
						enableReinitialize
						// initialValues={{
						//   name: formData.name,
						//   description: "",
						//   rating: "",
						//   address: "",
						//   city: "",
						// }}
						validationSchema={addDetailsValidationSchema}
						onSubmit={(values, actions) => {
							updateDetails(values);
							// actions.resetForm();
						}}
					>
						{(props) => (
							<View>
								<TextInput
									placeholder="name"
									onChangeText={props.handleChange("name")}
									value={props.values.name}
									onBlur={props.handleBlur("name")}
								/>
								<Text style={styles.errorText}>
									{props.touched.name && props.errors.name}
								</Text>
								<TextInput
									placeholder="city"
									onChangeText={props.handleChange("city")}
									value={props.values.city}
									onBlur={props.handleBlur("city")}
								/>
								<Text style={styles.errorText}>
									{props.touched.city && props.errors.city}
								</Text>
								<TextInput
									placeholder="address"
									onChangeText={props.handleChange("address")}
									value={props.values.address}
									onBlur={props.handleBlur("address")}
								/>
								<Text style={styles.errorText}>
									{props.touched.address &&
										props.errors.address}
								</Text>
								<TextInput
									multiline
									placeholder="description"
									onChangeText={props.handleChange(
										"description"
									)}
									value={props.values.description}
									onBlur={props.handleBlur("description")}
								/>
								<Text style={styles.errorText}>
									{props.touched.description &&
										props.errors.description}
								</Text>
								<TextInput
									placeholder="rating (1-5)"
									onChangeText={props.handleChange("rating")}
									value={props.values.rating}
									onBlur={props.handleBlur("rating")}
								/>
								<Text style={styles.errorText}>
									{props.touched.rating &&
										props.errors.rating}
								</Text>
								<View>
									<Button
										style={{ marginTop: 10 }}
										mode="contained"
										onPress={() => showMode("date")}
									>
										Select Date
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
								<Button
									mode="contained"
									onPress={props.handleSubmit}
								>
									Submit
								</Button>
							</View>
						)}
					</Formik>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
}

const styles = StyleSheet.create({
	date: {
		marginTop: 10,
	},
	errorText: {
		color: "crimson",
		fontWeight: "bold",
		marginBottom: 6,
		marginTop: 6,
		textAlign: "center",
	},
});
