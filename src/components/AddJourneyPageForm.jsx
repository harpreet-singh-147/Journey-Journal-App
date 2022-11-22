import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebaseConfig";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";

const addJourneyValidationSchema = yup.object({
  journey_title: yup.string().required("please enter a journey"),
  city: yup.string().required("please enter a city"),
});

const AddJourneyPageForm = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [img, setImg] = useState("");

  const addDetails = async (details) => {
    details.uid = user.uid;
    details.date = date;
    const reference = collection(db, "Journey");
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ padding: 25 }}>
          <Formik
            initialValues={{
              journey_title: "",
              city: "",
            }}
            validationSchema={addJourneyValidationSchema}
            onSubmit={(values, actions) => {
              addDetails(values);
              actions.resetForm();
            }}
          >
            {(props) => (
              <View>
                <TextInput
                  placeholder="Add journey title"
                  onChangeText={props.handleChange("journey_title")}
                  value={props.values.journey_title}
                  onBlur={props.handleBlur("journey_title")}
                />
                <Text style={styles.errorText}>
                  {props.touched.journey_title && props.errors.journey_title}
                </Text>
                <TextInput
                  placeholder="Add city"
                  onChangeText={props.handleChange("city")}
                  value={props.values.city}
                  onBlur={props.handleBlur("city")}
                />
                <Text style={styles.errorText}>
                  {props.touched.city && props.errors.city}
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
                  style={{ marginTop: 10 }}
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
};
export default AddJourneyPageForm;
const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // // marginTop: 50,
    // flex: 1,
    // backgroundColor: "gray",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 6,
    textAlign: "center",
  },
  date: {
    // backgroundColor: "red",
    // margin: 20,
    // padding: 20,
    // alignItems: "center",
  },
});
