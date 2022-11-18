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
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { useTheme, Button, TextInput } from "react-native-paper";

export default function AddJourneyDetailsForm() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  console.log(date);

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
      <Formik
        initialValues={{
          name: "",
          description: "",
          rating: "",
          address: "",
          city: "",
          date: date,
        }}
        onSubmit={(values) => console.log(values)}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder="name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
            />
            <TextInput
              placeholder="city"
              onChangeText={props.handleChange("city")}
              value={props.values.city}
            />
            <TextInput
              placeholder="address"
              onChangeText={props.handleChange("address")}
              value={props.values.address}
            />
            <TextInput
              multiline
              placeholder="description"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />
            <TextInput
              placeholder="rating (1-5)"
              onChangeText={props.handleChange("rating")}
              value={props.values.rating}
            />
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

            <Button onPress={props.handleSubmit}>Submit</Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  date: {
    marginTop: 10,
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
