import { db } from "./firebaseSetup";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";

export async function writeToDB(data, collectionName) {
    // console.log(data, collectionName)
    try {
        await addDoc(collection(db, collectionName), data);
    }
    catch (err) {
        console.log(err)
    }
}

export async function deleteFromDB(id) {
    try {
        await deleteDoc(doc(db, "goals", id));
    }
    catch (err) {
        console.log(err)
    }
}

export async function updateIswarning(id, isWarning) {
    try {
        await updateDoc(doc(db, "goals", id), {
            isWarning: isWarning,
        });
    }
    catch (err) {
        console.log(err)
    }
}

export async function getAllDocs(collectionName) {
    try {
        console.log(collectionName)
        const querySnapshot = await getDocs(collection(db, collectionName));
        // console.log('query', querySnapshot)
        let array = [];
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            array.push(doc.data());
        });
        return array;
    } catch (error) {
        console.log(error);
    }
}