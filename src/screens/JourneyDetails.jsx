import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  FlatList,
  Item,
} from "react-native";
import useCollection from "../../utils/hooks/useCollection";
import { getAuth } from "firebase/auth";

import {
  useTheme,
  Button,
  Card,
  Title,
  Paragraph,
  Portal,
} from "react-native-paper";

const JourneyDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const { documents: accoms } = useCollection("Accommodation");

  console.log(accoms);

  const Item = ({ address, name, descriptiion }) => (
    <View style={styles.item}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{address}</Title>
          <Paragraph>{name}</Paragraph>
          <Paragraph>{descriptiion}</Paragraph>
        </Card.Content>
        <Card.Cover
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
        <Card.Actions>
          <Button
            onPress={() => {
              navigation.navigate("JourneyDetails");
            }}
          >
            Journey Details
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      address={item.address}
      name={item.name}
      descriptiion={item.descriptiion}
    />
  );

  return (
    <View style={styles.container}>
      <View>
        <Modal visible={modalVisible} animationType="slide">
          <Button onPress={() => setModalVisible(false)}>Close</Button>
          <FlatList
            data={accoms}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Modal>

        <Button onPress={() => setModalVisible(true)}>Accomodation</Button>
      </View>
      {/* <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>accomodation</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   topButtons: {
//     marginVertical: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 10,
//     alignSelf: "center",
//   },
//   test: {
//     flex: 3,
//   },
// });

export default JourneyDetails;

//   const [accomodation, setAccomodation] = useState(null);
//   const [visible, setVisible] = React.useState(false);

//   const showModal = () => setVisible(true);
//   const hideModal = () => setVisible(false);
//   const containerStyle = { backgroundColor: "white" };

//   const handleAccomodation = () => {};
//   return (
//     <View style={styles.container}>
//     <View style={styles.centeredView}>

//       </View>
//       <View style={styles.modal3}>
//         <Portal>
//           <Modal
//             visible={visible}
//             onDismiss={hideModal}
//             contentContainerStyle={containerStyle}
//           >
//             <Card>
//               <Card.Title title="Card Title" subtitle="Card Subtitle" />
//               <Card.Content>
//                 <Title>Card title</Title>
//                 <Paragraph>Card content</Paragraph>
//               </Card.Content>
//               <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
//               <Card.Actions>
//                 <Button>Cancel</Button>
//                 <Button>Ok</Button>
//               </Card.Actions>
//             </Card>
//             <Text>Example Modal. Click outside this area to dismiss.</Text>
//           </Modal>
//         </Portal>
//       </View>

//       <Button style={{ marginTop: 30 }} onPress={showModal}>
//         Show
//       </Button>
//       <View style={styles.topButtons}>
//         <Button mode="elevated" onPress={handleAccomodation}>
//           Accomodation
//         </Button>
//         <Button mode="elevated">Eat/Drink</Button>
//         <Button mode="elevated">Attractions</Button>
//       </View>
//       <View style={styles.test}>
//         <Button mode="elevated" onPress={handleAccomodation}>
//           Add accomodation
//         </Button>
//       </View>
//     </View>
//   );

{
  /* <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>eatDrink</Text>
        </Pressable>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Attraction</Text>
        </Pressable>
      </View> */
}
