import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { Button, TextInput } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebaseConfig";
import * as yup from "yup";

const addDetailsValidationSchema = yup.object({
  name: yup.string().required("Please enter a name"),
  description: yup.string().max(200),
  rating: yup
    .string()
    .required("Please enter a rating")
    .test("is-num-1-5", "Rating must be a number between 1 - 5", (val) => {
      return parseInt(val) < 6 && parseInt(val) > 0;
    }),
  address: yup.string().required("Please enter an address"),
  city: yup.string().required("Please enter a city"),
});

export default function AddJourneyDetailsForm({ route, navigation }) {
  const { id, category } = route.params;
  console.log("AddJourneyDetailsForm.jsx JourneyID:", category);
  const auth = getAuth();
  const user = auth.currentUser;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const addDetails = async (details) => {
    details.uid = user.uid;
    details.date = date;
    details.journey_id = id;

    const reference = collection(db, category);

    await addDoc(reference, details);

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
  return (
    <View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 25 }}>
            <Formik
              initialValues={{
                name: "",
                description: "",
                rating: "",
                address: "",
                city: "",
              }}
              validationSchema={addDetailsValidationSchema}
              onSubmit={(values, actions) => {
                addDetails(values);
              }}
            >
              {(props) => (
                <View>
                  <TextInput
                    placeholder="Name"
                    onChangeText={props.handleChange("name")}
                    value={props.values.name}
                    onBlur={props.handleBlur("name")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.name && props.errors.name}
                  </Text>
                  <TextInput
                    placeholder="City"
                    onChangeText={props.handleChange("city")}
                    value={props.values.city}
                    onBlur={props.handleBlur("city")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.city && props.errors.city}
                  </Text>
                  <TextInput
                    placeholder="Address"
                    onChangeText={props.handleChange("address")}
                    value={props.values.address}
                    onBlur={props.handleBlur("address")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.address && props.errors.address}
                  </Text>
                  <TextInput
                    multiline
                    placeholder="Description"
                    onChangeText={props.handleChange("description")}
                    value={props.values.description}
                    onBlur={props.handleBlur("description")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.description && props.errors.description}
                  </Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="Rating (1-5)"
                    onChangeText={props.handleChange("rating")}
                    value={props.values.rating}
                    onBlur={props.handleBlur("rating")}
                  />
                  <Text style={styles.errorText}>
                    {props.touched.rating && props.errors.rating}
                  </Text>
                  <View>
                    <Button
                      style={{ marginBottom: 10 }}
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

                  <Button mode="contained" onPress={props.handleSubmit}>
                    Submit
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
