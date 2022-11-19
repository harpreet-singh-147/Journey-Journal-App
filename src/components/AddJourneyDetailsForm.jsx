// import { useState, useEffect } from "react";
// import { TextInput } from "react-native-paper";
// import {
//   Keyboard,
//   Text,
//   View,
//   StyleSheet,
//   Platform,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { useTheme, Button } from "react-native-paper";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { collection, addDoc } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { db } from "../config/firebaseConfig";
// import { useAuthentication } from "../../utils/hooks/userAuthentication";
// import useCollection from "../../utils/hooks/useCollection";

// const AddJourneyDetailsForm = () => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [rating, setRating] = useState(0);
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);
//   const [img, setImg] = useState("");
//   const { documents: trips } = useCollection("Journey");

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setShow(Platform.OS === "ios");
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const handleSubmit = async (e) => {
//     if (!name.trim()) {
//       alert("Please enter name");
//     } else if (!city.trim()) {
//       alert("Please enter city");
//     } else if (!address.trim()) {
//       alert("Please enter address");
//     } else if (!rating || rating > 5 || rating < 1) {
//       alert("Please enter rating between 1 and 5");
//     } else if (!description.trim()) {
//       alert("Please enter a description");
//     }
//     const reference = collection(db, "Accommdation");
//     const addDetails = {
//       uid: user.uid,
//       description: description,
//       city: city,
//       date: date,
//       rating: rating,
//       address: address,
//       name: name,
//     };
//     await addDoc(reference, addDetails);
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.accomodationInput}>
//         <TextInput
//           style={{ marginTop: 10 }}
//           label="Add name"
//           value={name}
//           onChangeText={(text) => setName(text)}
//         />
//       </View>

//       <View style={styles.addressInput}>
//         <TextInput
//           style={{ marginTop: 10 }}
//           label="City"
//           value={city}
//           onChangeText={(text) => setCity(text)}
//         />
//       </View>
//       <View style={styles.accomodationInput}>
//         <TextInput
//           style={{ marginTop: 10 }}
//           label="Add address"
//           value={address}
//           onChangeText={(text) => setAddress(text)}
//         />
//       </View>
//       <View style={styles.accomodationInput}>
//         <TextInput
//           type="number"
//           keyboardType="numeric"
//           style={{ marginTop: 10 }}
//           label="Add rating"
//           value={rating}
//           onChangeText={(text) => setRating(text)}
//         />
//       </View>

//       <View style={styles.accomodationInput}>
//         <TextInput
//           style={{ marginTop: 10 }}
//           label="Add description"
//           value={description}
//           onChangeText={(text) => setDescription(text)}
//         />
//       </View>

//       <View>
//         <Button
//           style={{ marginTop: 10 }}
//           mode="contained"
//           onPress={() => showMode("date")}
//         >
//           Select Date
//         </Button>
//       </View>
//       <View style={styles.date}>
//         {show && (
//           <DateTimePicker
//             testID="dateTimePicker"
//             value={date}
//             mode={mode}
//             is24Hour={true}
//             onChange={onChange}
//           />
//         )}
//       </View>
//       <View>
//         <Button mode="contained" onPress={handleSubmit}>
//           Add
//         </Button>
//       </View>
//     </View>
//   );
// };
// export default AddJourneyDetailsForm;
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,

//     flex: 1,
//     backgroundColor: "gray",
//   },
//   accomodationInput: {
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   ratingInput: {
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   addressInput: {
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   date: {
//     marginTop: 10,
//   },
// });

import React, { useState } from "react";
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
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebaseConfig";
import * as yup from "yup";

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

export default function AddJourneyDetailsForm() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedCategory, "<<<<< cat");
  //     console.log(date);

  const addDetails = async (details) => {
    details.uid = user.uid;
    details.date = date;
    const reference = selectedCategory
      ? collection(db, selectedCategory)
      : alert("please select category");
    await addDoc(reference, details);
    setSelectedCategory("");
    console.log(details);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ padding: 25 }}>
          <Formik
            enableReinitialize
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
              //   actions.resetForm();
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
                  {props.touched.address && props.errors.address}
                </Text>
                <TextInput
                  multiline
                  placeholder="description"
                  onChangeText={props.handleChange("description")}
                  value={props.values.description}
                  onBlur={props.handleBlur("description")}
                />
                <Text style={styles.errorText}>
                  {props.touched.description && props.errors.description}
                </Text>
                <TextInput
                  placeholder="rating (1-5)"
                  onChangeText={props.handleChange("rating")}
                  value={props.values.rating}
                  onBlur={props.handleBlur("rating")}
                />
                <Text style={styles.errorText}>
                  {props.touched.rating && props.errors.rating}
                </Text>
                <View>
                  <Button
                    style={{ marginTop: 10 }}
                    mode="contained"
                    onPress={() => showMode("date")}
                    // placeholder="date"
                    // onChangeText={props.handleChange("date")}
                    // value={props.values.date}
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
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCategory(itemValue)
                  }
                >
                  <Picker.Item label="Accommodation" value="Accommodation" />
                  <Picker.Item label="Catering" value="Catering" />
                  <Picker.Item label="Attractions" value="Attractions" />
                </Picker>
                <Button mode="contained" onPress={props.handleSubmit}>
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

//   const auth = getAuth();
//   const user = auth.currentUser;
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [rating, setRating] = useState(0);
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState("date");
//   const [show, setShow] = useState(false);
//   const [img, setImg] = useState("");
//   const { documents: trips } = useCollection("Journey");
