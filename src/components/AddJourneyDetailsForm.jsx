import { View, Text, TextInput } from "react-native";
import React from "react";

export default function AddJourneyDetailsForm() {
  return (
    <View>
      <TextInput value=""></TextInput>
    </View>
  );
}

// import React from "react";
// import { Button, TextInput, View } from "react-native";
// import { Formik } from "formik";

// export const AddJourneyDetailsForm = (props) => (
//   <Formik
//     initialValues={{ email: "" }}
//     onSubmit={(values) => console.log(values)}
//   >
//     {({ handleChange, handleBlur, handleSubmit, values }) => (
//       <View>
//         <TextInput
//           onChangeText={handleChange("email")}
//           onBlur={handleBlur("email")}
//           value={values.email}
//         />
//         <Button onPress={handleSubmit} title="Submit" />
//       </View>
//     )}
//   </Formik>
// );
