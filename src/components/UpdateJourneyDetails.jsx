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
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rating: "",
    address: "",
    city: "",
  });
  const [editAddress, setEditAddress] = useState("");

  const { id, category } = route.params;
  console.log(id);
  console.log("Category:", category, ", ID:", id);

  //  ["id", "!=", id];
  //   const { documents: categoryRequest } = useCollection(category);
  //   const data = db.collection(category).where("id", "==", id);
  //   const data = getDocs(db, category, id);
  //, ["id", "==", id]
  const { documents: attractions } = useCollection(category);
  //   const info = attractions.forEach((item) => console.log(item));
  console.log(attractions, "<<<<<<Attractions");
  let requiredData;
  //

  const getData = () => {
    console.log("Get Data");
    attractions.forEach((item) => {
      if (item["id"] == id) {
        setFormData(item);
        console.log("--------------------------------------------");
        console.log(item.address);
        console.log("--------------------------------------------");
      }
    });
  };
  //   console.log(data1);
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
      console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      getData();
    }
  }, []);

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
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCategory(itemValue)
                  }
                >
                  <Picker.Item label="Please select category" />
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
