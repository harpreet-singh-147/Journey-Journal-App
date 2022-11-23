import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  VirtualizedList,
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
          <Title>{address}</Title>
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
        <Card.Actions style={{ alignSelf: "center" }}>
          <View>
            <Button
              style={styles.buttonCards}
              mode="contained"
              onPress={() => {
                setaccomsModalVisible(false);
                setEatDrinkModal(false);
                setAttractionsModal(false);
              }}
            >
              Back
            </Button>
          </View>
          <View>
            <Button
              style={styles.buttonCards}
              mode="contained"
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
          </View>
          <View>
            <Button
              style={styles.buttonCards}
              mode="contained"
              onPress={() => {
                handleDelete(id);
              }}
            >
              Delete
            </Button>
          </View>
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
        <View>
          <Modal visible={accomsModalVisible} animationType="fade">
            <View>
              <Button
                icon="close-thick"
                onPress={() => setaccomsModalVisible(false)}
              ></Button>
            </View>

            <FlatList
              data={accoms}
              renderItem={renderItemAccoms}
              keyExtractor={(item) => item.id}
            />

            <View
              style={{
                marginBottom: 25,
                marginTop: 25,
                marginLeft: 30,
                marginRight: 30,
              }}
            >
              <Button
                mode="contained"
                onPress={() => {
                  setaccomsModalVisible(false);
                  navigation.navigate("AddJourneyDetailsForm", {
                    id: id,
                    category:
                      accomsModalVisible === true ? "Accommodation" : "",
                  });
                }}
              >
                Add Accommodation
              </Button>
            </View>
          </Modal>
        </View>
      </View>
      <View>
        <Modal visible={eatDrinkModal} animationType="fade">
          <View>
            <Button
              icon="close-thick"
              onPress={() => setEatDrinkModal(false)}
            ></Button>
          </View>

          <FlatList
            data={eatDrink}
            renderItem={renderItemAccoms}
            keyExtractor={(item) => item.id}
          />
          <View
            style={{
              marginBottom: 25,
              marginTop: 25,
              marginLeft: 30,
              marginRight: 30,
            }}
          >
            <Button
              mode="contained"
              onPress={() => {
                setEatDrinkModal(false);
                navigation.navigate("AddJourneyDetailsForm", {
                  id: id,
                  category: eatDrinkModal === true ? "Catering" : "",
                });
              }}
            >
              Add EatDrink
            </Button>
          </View>
        </Modal>
      </View>
      <View>
        <Modal visible={attractionsModal} animationType="fade">
          <View>
            <Button
              icon="close-thick"
              onPress={() => setAttractionsModal(false)}
            ></Button>
          </View>

          <FlatList
            data={attractions}
            renderItem={renderItemAccoms}
            keyExtractor={(item) => item.id}
          />
          <View
            style={{
              marginBottom: 25,
              marginTop: 25,
              marginLeft: 30,
              marginRight: 30,
            }}
          >
            <Button
              mode="contained"
              onPress={() => {
                setAttractionsModal(false);
                navigation.navigate("AddJourneyDetailsForm", {
                  id: id,
                  category: attractionsModal === true ? "Attractions" : "",
                });
              }}
            >
              Add Attractions
            </Button>
          </View>
        </Modal>
        <View>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => setaccomsModalVisible(true)}
          >
            Accommodation
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => setEatDrinkModal(true)}
          >
            EatDrink
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => setAttractionsModal(true)}
          >
            Attractions
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  item: {
    padding: 15,
  },
  button: {
    margin: 4,
    width: "100%",
    alignSelf: "center",
  },
  buttonCards: {
    width: "100%",
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

export default JourneyDetails;
