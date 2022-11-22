import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useCollection from "../../utils/hooks/useCollection";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const JourneyDetails = ({ route }) => {
  const { id } = route.params;
  const [accomsModalVisible, setaccomsModalVisible] = useState(false);
  const [eatDrinkModal, setEatDrinkModal] = useState(false);
  const [attractionsModal, setAttractionsModal] = useState(false);

  const navigation = useNavigation();

  const { documents: accoms } = useCollection("Accommodation", [
    "journey_id",
    "==",
    id,
  ]);
  const { documents: eatDrink } = useCollection("Catering", [
    "journey_id",
    "==",
    id,
  ]);
  const { documents: attractions } = useCollection("Attractions", [
    "journey_id",
    "==",
    id,
  ]);

  const handleDelete = async (id) => {
    console.log("deleted", id);

    try {
      await deleteDoc(doc(db, "Accommodation", id));
      await deleteDoc(doc(db, "Catering", id));
      await deleteDoc(doc(db, "Attractions", id));
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const Item = ({ id, address, name, description, rating, test }) => (
    <View style={styles.item}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>
            {address}-{id}
          </Title>
          <Paragraph>{name}</Paragraph>
          <Paragraph>{description}</Paragraph>
          <Paragraph>{rating}</Paragraph>
          <Paragraph>{test}</Paragraph>
        </Card.Content>
        <Card.Cover
          source={{
            uri: "https://picsum.photos/700",
          }}
        />
        <Card.Actions>
          <Button
            onPress={() => {
              setaccomsModalVisible(false);
              setEatDrinkModal(false);
              setAttractionsModal(false);
            }}
          >
            Back
          </Button>
          <Button
            onPress={() => {
              setaccomsModalVisible(false);
              setEatDrinkModal(false);
              setAttractionsModal(false);
              navigation.navigate("updateDetails", {
                id: id,
                category:
                  accomsModalVisible === true
                    ? "Accommodation"
                    : eatDrinkModal === true
                    ? "Catering"
                    : attractionsModal === true
                    ? "Attractions"
                    : "",
              });
            }}
          >
            Edit
          </Button>

          <Button
            onPress={() => {
              handleDelete(id);
            }}
          >
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );

  const renderItemAccoms = ({ item }) => (
    <Item
      address={item.address}
      name={item.name}
      description={item.description}
      rating={item.rating}
      test={item.test}
      id={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <View>
        <Modal visible={accomsModalVisible} animationType="slide">
          <View>
            <Button onPress={() => setaccomsModalVisible(false)}>
              <Text>Close</Text>
            </Button>
          </View>

          <FlatList
            data={accoms}
            renderItem={renderItemAccoms}
            keyExtractor={(item) => item.id}
          />

          <View>
            <Button
              onPress={() => {
                setaccomsModalVisible(false);
                navigation.navigate("AddJourneyDetailsForm", {
                  id: id,
                  category: accomsModalVisible === true ? "Accommodation" : "",
                });
              }}
            >
              <Text>Add Accommodation</Text>
            </Button>
          </View>
        </Modal>

        <TouchableOpacity onPress={() => setaccomsModalVisible(true)}>
          <View style={styles.buttonOpacity}>
            <Text>Accomodation</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Modal visible={eatDrinkModal} animationType="slide">
          <Button onPress={() => setEatDrinkModal(false)}>Close</Button>
          <FlatList
            data={eatDrink}
            renderItem={renderItemAccoms}
            keyExtractor={(item) => item.id}
          />
          <View>
            <Button
              onPress={() => {
                setEatDrinkModal(false);
                navigation.navigate("AddJourneyDetailsForm", {
                  id: id,
                  category: eatDrinkModal === true ? "Catering" : "",
                });
              }}
            >
              <Text>Add EatDrink</Text>
            </Button>
          </View>
        </Modal>

        <Button onPress={() => setEatDrinkModal(true)}>EatDrink</Button>
      </View>
      <View>
        <Modal visible={attractionsModal} animationType="slide">
          <Button onPress={() => setAttractionsModal(false)}>Close</Button>
          <FlatList
            data={attractions}
            renderItem={renderItemAccoms}
            keyExtractor={(item) => item.id}
          />
          <View>
            <Button
              onPress={() => {
                setAttractionsModal(false);
                navigation.navigate("AddJourneyDetailsForm", {
                  id: id,
                  category: attractionsModal === true ? "Attractions" : "",
                });
              }}
            >
              <Text>Add Attractions</Text>
            </Button>
          </View>
        </Modal>

        <Button onPress={() => setAttractionsModal(true)}>Attractions</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
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
  buttonOpacity: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "pink",
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
