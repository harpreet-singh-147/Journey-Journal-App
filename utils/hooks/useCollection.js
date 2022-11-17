import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../src/config/firebaseConfig";

const useCollection = (collectionName) => {
	const [documents, setDocuments] = useState(null);

	useEffect(() => {
		let reference = collection(db, collectionName);
		// realtime listener
		const unsubscribe = onSnapshot(reference, (snapshot) => {
			let results = [];
			snapshot.docs.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});
			setDocuments(results);
		});
		// cleanup function
		return () => unsubscribe();
	}, [collectionName]);
	return { documents };
};

const styles = StyleSheet.create({});

export default useCollection;
