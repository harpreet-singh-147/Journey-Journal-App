import { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../src/config/firebaseConfig";

const useCollection = (collectionName, _q) => {
  const [documents, setDocuments] = useState(null);

  // set up the query
  const q = useRef(_q).current;

  useEffect(() => {
    let reference = collection(db, collectionName);
    // realtime listener
    if (q) {
      reference = query(reference, where(...q));
    }

    const unsubscribe = onSnapshot(reference, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });
    // cleanup function
    return () => unsubscribe();
  }, [collectionName, q]);
  return { documents };
};

const styles = StyleSheet.create({});

export default useCollection;
