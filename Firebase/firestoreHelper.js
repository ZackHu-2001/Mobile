import { db } from "./firebaseSetup";
import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

export async function writeToDB(goal) {
    try {
        await addDoc(collection(db, "goals"), {
            goal: goal,
            isWarning: false,
        });
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